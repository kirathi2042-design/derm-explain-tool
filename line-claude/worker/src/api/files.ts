import type { Context } from "hono";
import type { Env } from "../env";

// GET /files/:key?token=...
// `token` must match KV entry `filetoken:<key>` (one-shot, deleted on use).
export async function handleFileDownload(c: Context<{ Bindings: Env }>) {
  const key = c.req.param("key");
  const token = c.req.query("token") ?? "";
  const stored = await c.env.KV.get(`filetoken:${key}`);
  if (!stored || stored !== token) return c.text("forbidden", 403);

  const obj = await c.env.FILES.get(key);
  if (!obj) return c.text("not found", 404);

  return new Response(obj.body, {
    headers: {
      "Content-Type": obj.httpMetadata?.contentType ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${key.split("/").pop()}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}

export async function issueFileToken(env: Env, key: string): Promise<string> {
  const token = crypto.randomUUID().replace(/-/g, "");
  await env.KV.put(`filetoken:${key}`, token, { expirationTtl: 60 * 60 * 24 * 7 });
  return token;
}
