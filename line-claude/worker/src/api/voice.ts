import type { Context } from "hono";
import type { Env } from "../env";
import { verifyIdToken } from "../liff-verify";
import * as kv from "../kv";
import * as claude from "../claude";
import * as line from "../line";
import { textCard } from "../flex";
import { saveNote } from "../notion";

// LIFF voice page sends already-transcribed text (via Web Speech API on iOS).
// This endpoint structures it with Claude and optionally writes to Notion.
export async function handleVoice(c: Context<{ Bindings: Env }>) {
  const body = (await c.req.json()) as {
    idToken: string;
    transcript: string;
    saveToNotion?: boolean;
  };
  const verified = await verifyIdToken(c.env, body.idToken);
  if (!verified) return c.json({ ok: false, error: "id_token invalid" }, 401);

  const userId = verified.sub;
  if (!(await kv.isAllowed(c.env, userId))) {
    return c.json({ ok: false, error: "not allowed" }, 403);
  }
  const q = await kv.bumpQuota(c.env, userId);
  if (!q.ok) return c.json({ ok: false, error: "quota exceeded" }, 429);

  const system =
    "你是一個結構化助理。把語音轉成的逐字稿，整理成 JSON：\n" +
    `{"title": "...", "kind": "todo|note|event|idea", "dueAt": "ISO8601 or null", ` +
    `"tags": ["..."], "summary": "一句話", "items": ["bullet 1", "..."]}` +
    "\n只輸出 JSON，不要其他文字。";

  const raw = await claude.chat(c.env, body.transcript, {
    system,
    maxTokens: 512,
  });

  let structured: {
    title: string;
    kind: string;
    dueAt: string | null;
    tags: string[];
    summary: string;
    items: string[];
  };
  try {
    structured = JSON.parse(stripCodeFence(raw));
  } catch {
    return c.json({ ok: false, error: "parse failed", raw }, 500);
  }

  let notionUrl: string | undefined;
  if (body.saveToNotion && c.env.NOTION_TOKEN && c.env.NOTION_DATABASE_ID) {
    try {
      notionUrl = await saveNote(c.env, structured, body.transcript);
    } catch (e) {
      console.error("notion save failed", e);
    }
  }

  const lines = [
    `📝 ${structured.title}`,
    `類型：${structured.kind}`,
    structured.dueAt ? `⏰ ${structured.dueAt}` : null,
    structured.tags.length ? `🏷 ${structured.tags.join(", ")}` : null,
    "",
    structured.summary,
    "",
    ...structured.items.map((x) => `• ${x}`),
    notionUrl ? `\n→ Notion: ${notionUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await line.push(c.env, userId, [textCard("語音紀錄", lines)]);

  return c.json({ ok: true, structured, notionUrl });
}

function stripCodeFence(s: string) {
  return s
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}
