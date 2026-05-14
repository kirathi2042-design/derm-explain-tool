import type { Context } from "hono";
import type { Env } from "../env";
import { verifyIdToken } from "../liff-verify";
import * as kv from "../kv";
import * as claude from "../claude";
import * as line from "../line";
import { textCard } from "../flex";

export async function handleVision(c: Context<{ Bindings: Env }>) {
  const form = await c.req.formData();
  const idToken = String(form.get("idToken") ?? "");
  const promptIn = String(form.get("prompt") ?? "");
  const file = form.get("image");
  if (!(file instanceof File)) return c.json({ ok: false, error: "image missing" }, 400);

  const verified = await verifyIdToken(c.env, idToken);
  if (!verified) return c.json({ ok: false, error: "id_token invalid" }, 401);

  const userId = verified.sub;
  if (!(await kv.isAllowed(c.env, userId))) {
    return c.json({ ok: false, error: "not allowed" }, 403);
  }

  const q = await kv.bumpQuota(c.env, userId);
  if (!q.ok) return c.json({ ok: false, error: "quota exceeded" }, 429);

  const bytes = await file.arrayBuffer();
  const media =
    file.type === "image/png"
      ? "image/png"
      : file.type === "image/webp"
        ? "image/webp"
        : file.type === "image/gif"
          ? "image/gif"
          : "image/jpeg";

  const userPrompt =
    promptIn.trim() ||
    "用繁體中文描述這張圖的重點。有文字先逐字辨識並翻譯。最後一句話下結論。";

  const answer = await claude.vision(c.env, bytes, media as "image/jpeg", userPrompt, {
    maxTokens: 1024,
  });

  // Push to LINE so user sees it in chat, plus return JSON for the LIFF page.
  await line.push(c.env, userId, [textCard("圖片分析", answer)]);

  return c.json({ ok: true, answer });
}
