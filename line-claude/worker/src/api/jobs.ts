import type { Context } from "hono";
import type { Env } from "../env";
import * as kv from "../kv";

export async function jobStatusPage(c: Context<{ Bindings: Env }>) {
  const id = c.req.param("id");
  const job = await kv.getJob(c.env, id);
  if (!job) return c.html(layout("Job not found", "<p>找不到這個 job。</p>"), 404);

  const status = labelOf(job.state);
  const result = job.result
    ? `<pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(job.result)}</pre>`
    : "";
  const file = job.fileUrl
    ? `<p><a href="${escapeHtml(job.fileUrl)}" style="display:inline-block;padding:10px 16px;background:#06c755;color:white;border-radius:8px;text-decoration:none;">下載檔案</a></p>`
    : "";
  const err = job.error ? `<p style="color:#c00;">錯誤：${escapeHtml(job.error)}</p>` : "";

  const html = `
    <h1>Job ${escapeHtml(job.id.slice(0, 8))}</h1>
    <p>狀態：<strong>${status}</strong></p>
    <p style="color:#666;font-size:14px;">指令：${escapeHtml(job.prompt)}</p>
    ${file}${result}${err}
    <p style="color:#888;font-size:12px;">建立：${new Date(job.createdAt).toLocaleString()}</p>
  `;
  return c.html(
    layout(`Job ${job.id.slice(0, 8)}`, html, job.state === "queued" || job.state === "running"),
  );
}

function labelOf(s: string) {
  return { queued: "排隊中 ⏳", running: "處理中 ⚙️", done: "完成 ✅", error: "錯誤 ❌" }[s] ?? s;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function layout(title: string, body: string, autoRefresh = false) {
  return `<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
${autoRefresh ? '<meta http-equiv="refresh" content="3">' : ""}
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:680px;margin:24px auto;padding:0 16px;color:#222;}
  h1{font-size:20px;}
  a{color:#06c755;}
</style></head>
<body>${body}</body></html>`;
}
