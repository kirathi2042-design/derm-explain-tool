import type { Context } from "hono";
import type { Env, TaskMessage } from "../env";
import * as kv from "../kv";
import * as claude from "../claude";
import * as line from "../line";
import { textCard, jobAck } from "../flex";

// Endpoint for iOS Shortcuts. Authenticated by shared secret header + owner userId.
// POST /api/shortcut
// Headers: x-shortcut-secret: <SHORTCUT_SECRET (any value matching KV `shortcut_secret`)>
// Body: { prompt: string, mode?: "chat" | "task" }
export async function handleShortcut(c: Context<{ Bindings: Env }>) {
  const secret = c.req.header("x-shortcut-secret") ?? "";
  const stored = await c.env.KV.get("shortcut_secret");
  if (!stored || stored !== secret) return c.json({ ok: false, error: "unauthorized" }, 401);

  const body = (await c.req.json()) as { prompt: string; mode?: "chat" | "task" };
  const userId = c.env.OWNER_USER_ID;
  const q = await kv.bumpQuota(c.env, userId);
  if (!q.ok) return c.json({ ok: false, error: "quota exceeded" }, 429);

  if (body.mode === "task") {
    const jobId = crypto.randomUUID();
    const job: kv.Job = {
      id: jobId,
      userId,
      kind: "write",
      prompt: body.prompt,
      state: "queued",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await kv.saveJob(c.env, job);
    const message: TaskMessage = {
      jobId,
      userId,
      kind: "write",
      prompt: body.prompt,
      createdAt: Date.now(),
    };
    await c.env.TASK_QUEUE.send(message);
    await line.push(c.env, userId, [jobAck(jobId, `${c.env.PUBLIC_WORKER_URL}/jobs/${jobId}`)]);
    return c.json({ ok: true, jobId });
  }

  // chat mode: synchronous, push answer to LINE
  const answer = await claude.chat(c.env, body.prompt, { maxTokens: 1024 });
  await line.push(c.env, userId, [textCard("Siri 來訊", answer)]);
  return c.json({ ok: true, answer });
}
