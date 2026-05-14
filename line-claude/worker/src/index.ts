import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env, TaskMessage } from "./env";
import * as line from "./line";
import { handleEvents } from "./webhook";
import { handleVision } from "./api/vision";
import { handleVoice } from "./api/voice";
import { handleShortcut } from "./api/shortcut";
import { jobStatusPage } from "./api/jobs";
import { handleFileDownload } from "./api/files";
import { processJob } from "./jobs";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors({ origin: (origin) => origin ?? "*", credentials: false }));

app.get("/", (c) => c.text("line-claude-worker ok"));

app.get("/health", (c) =>
  c.json({
    ok: true,
    liff: c.env.LIFF_BASE_URL,
    worker: c.env.PUBLIC_WORKER_URL,
    ts: Date.now(),
  }),
);

// LINE webhook
app.post("/webhook", async (c) => {
  const raw = await c.req.text();
  const signature = c.req.header("x-line-signature") ?? null;
  const valid = await line.verifySignature(c.env.LINE_CHANNEL_SECRET, raw, signature);
  if (!valid) return c.text("invalid signature", 401);

  const body = JSON.parse(raw) as { events: Parameters<typeof handleEvents>[1] };
  await handleEvents(c.env, body.events, c.executionCtx);
  return c.text("ok");
});

// LIFF endpoints
app.post("/api/vision", handleVision);
app.post("/api/voice", handleVoice);

// iOS Shortcuts entry
app.post("/api/shortcut", handleShortcut);

// Job status (linked from ack Flex)
app.get("/jobs/:id", jobStatusPage);

// R2 file download proxy (signed token)
app.get("/files/:key", handleFileDownload);

export default {
  fetch: app.fetch,
  async queue(batch: MessageBatch<TaskMessage>, env: Env): Promise<void> {
    for (const msg of batch.messages) {
      try {
        await processJob(env, msg.body);
        msg.ack();
      } catch (e) {
        console.error("queue job failed", e);
        msg.retry();
      }
    }
  },
};
