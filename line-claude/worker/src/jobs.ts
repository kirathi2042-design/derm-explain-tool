import type { Env, TaskMessage } from "./env";
import * as claude from "./claude";
import * as kv from "./kv";
import * as line from "./line";
import { textCard, fileCard } from "./flex";
import { generateHtmlDoc } from "./pdf";
import { issueFileToken } from "./api/files";

export async function processJob(env: Env, msg: TaskMessage) {
  const job = await kv.getJob(env, msg.jobId);
  if (!job) {
    console.warn("job vanished", msg.jobId);
    return;
  }
  job.state = "running";
  job.updatedAt = Date.now();
  await kv.saveJob(env, job);

  try {
    if (msg.kind === "pdf") {
      await runPdfJob(env, job);
    } else if (msg.kind === "research") {
      await runResearchJob(env, job);
    } else {
      await runWriteJob(env, job);
    }
    job.state = "done";
  } catch (e) {
    console.error("processJob failed", e);
    job.state = "error";
    job.error = (e as Error).message;
    await line.push(env, job.userId, [
      { type: "text", text: `任務失敗：${job.error}` },
    ]);
  }
  job.updatedAt = Date.now();
  await kv.saveJob(env, job);
}

async function runWriteJob(env: Env, job: kv.Job) {
  const system =
    "你是寫作助理。產出結構清楚的繁體中文長文，使用 markdown（## 小節、- 條列、**重點**）。" +
    "不要寫『以下是…』『希望這對你有幫助』這類客套話，直接給內容。";
  const text = await claude.chat(env, job.prompt, {
    system,
    model: claude.MODEL_DEFAULT,
    maxTokens: 3000,
  });
  job.result = text;

  const url = await saveAsDoc(env, job, deriveTitle(job.prompt), text);
  await line.push(env, job.userId, [
    fileCard(deriveTitle(job.prompt), firstParagraph(text), url, "查看 / 列印"),
  ]);
}

async function runPdfJob(env: Env, job: kv.Job) {
  // Same as write but explicitly framed as a document.
  const system =
    "你是寫作助理。產出結構清楚的繁體中文文件，使用 markdown 標題與條列。" +
    "字數依使用者要求；沒指定則 300–500 字。直接給內容，不要客套。";
  const text = await claude.chat(env, job.prompt, {
    system,
    model: claude.MODEL_DEFAULT,
    maxTokens: 3000,
  });
  job.result = text;
  const url = await saveAsDoc(env, job, deriveTitle(job.prompt), text);
  await line.push(env, job.userId, [
    fileCard(deriveTitle(job.prompt), firstParagraph(text), url, "查看 / 存 PDF"),
  ]);
}

async function runResearchJob(env: Env, job: kv.Job) {
  const system =
    "你是研究助理。把使用者問題拆成 3–5 個子問題，逐一回答，最後給總結。" +
    "用繁體中文與 markdown。標註不確定的地方。";
  const text = await claude.chat(env, job.prompt, {
    system,
    model: claude.MODEL_HEAVY,
    maxTokens: 4000,
  });
  job.result = text;
  const url = await saveAsDoc(env, job, `研究：${deriveTitle(job.prompt)}`, text);
  await line.push(env, job.userId, [
    fileCard(`研究：${deriveTitle(job.prompt)}`, firstParagraph(text), url, "查看完整內容"),
  ]);
}

async function saveAsDoc(env: Env, job: kv.Job, title: string, body: string): Promise<string> {
  const html = generateHtmlDoc(title, body);
  const key = `docs/${job.id}.html`;
  await env.FILES.put(key, html, { httpMetadata: { contentType: "text/html; charset=utf-8" } });
  const token = await issueFileToken(env, key);
  const url = `${env.PUBLIC_WORKER_URL}/files/${encodeURIComponent(key)}?token=${token}`;
  job.fileUrl = url;
  return url;
}

function deriveTitle(prompt: string) {
  const t = prompt.trim().split(/\n/)[0].slice(0, 40);
  return t || "文件";
}

function firstParagraph(text: string) {
  const stripped = text.replace(/^#+\s+.*\n/g, "").trim();
  const para = stripped.split(/\n{2,}/)[0];
  return para.length > 120 ? para.slice(0, 119) + "…" : para;
}
