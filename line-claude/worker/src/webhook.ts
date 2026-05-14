import type { Env, TaskMessage } from "./env";
import * as line from "./line";
import * as claude from "./claude";
import * as kv from "./kv";
import { textCard, jobAck } from "./flex";

type LineEvent = {
  type: string;
  replyToken?: string;
  source: { userId?: string; type: string };
  message?: {
    id: string;
    type: "text" | "image" | "audio" | "video" | "file" | "sticker" | "location";
    text?: string;
  };
  postback?: { data: string };
};

export async function handleEvents(env: Env, events: LineEvent[], ctx: ExecutionContext) {
  for (const ev of events) {
    ctx.waitUntil(handleOne(env, ev).catch((e) => console.error("event error", e)));
  }
}

async function handleOne(env: Env, ev: LineEvent) {
  const userId = ev.source.userId;
  if (!userId) return;

  if (!(await kv.isAllowed(env, userId))) {
    if (ev.replyToken) {
      await line.reply(env, ev.replyToken, [
        { type: "text", text: "🔒 這個 bot 目前是私人使用。請聯絡擁有者把你加進白名單。" },
      ]);
    }
    return;
  }

  if (ev.type === "follow") {
    if (ev.replyToken) {
      await line.reply(env, ev.replyToken, [
        { type: "text", text: `歡迎！你的 userId 是\n${userId}\n（管理員加白名單會用到）` },
      ]);
    }
    return;
  }

  if (ev.type === "postback") {
    return handlePostback(env, ev, userId);
  }

  if (ev.type !== "message" || !ev.message) return;

  switch (ev.message.type) {
    case "text":
      return handleText(env, ev, userId, ev.message.text ?? "");
    case "image":
      return handleImage(env, ev, userId, ev.message.id);
    case "audio":
      return handleAudio(env, ev, userId, ev.message.id);
    default:
      if (ev.replyToken) {
        await line.reply(env, ev.replyToken, [
          { type: "text", text: "目前支援文字、圖片、語音。" },
        ]);
      }
  }
}

async function handleText(env: Env, ev: LineEvent, userId: string, text: string) {
  const cmd = text.trim();

  if (cmd === "/help" || cmd === "?" || cmd === "說明") {
    return ev.replyToken && line.reply(env, ev.replyToken, [helpMessage(env)]);
  }
  if (cmd === "/whoami") {
    return ev.replyToken && line.reply(env, ev.replyToken, [{ type: "text", text: userId }]);
  }
  if (cmd === "/quota") {
    const q = await kv.getQuota(env, userId);
    return (
      ev.replyToken &&
      line.reply(env, ev.replyToken, [{ type: "text", text: `今日用量：${q.used} / ${q.limit}` }])
    );
  }
  if (cmd === "/reset" || cmd === "/clear") {
    await kv.clearHistory(env, userId);
    return ev.replyToken && line.reply(env, ev.replyToken, [{ type: "text", text: "對話記憶已清空。" }]);
  }

  // Long-task triggers
  const longTask = matchLongTask(cmd);
  if (longTask) {
    const q = await kv.bumpQuota(env, userId);
    if (!q.ok) {
      return (
        ev.replyToken &&
        line.reply(env, ev.replyToken, [
          { type: "text", text: `已達今日上限（${q.limit}）。明天再試，或調整 MAX_DAILY_TASKS。` },
        ])
      );
    }
    const jobId = crypto.randomUUID();
    const job: kv.Job = {
      id: jobId,
      userId,
      kind: longTask.kind,
      prompt: longTask.prompt,
      state: "queued",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await kv.saveJob(env, job);
    const message: TaskMessage = {
      jobId,
      userId,
      kind: longTask.kind,
      prompt: longTask.prompt,
      createdAt: Date.now(),
    };
    await env.TASK_QUEUE.send(message);
    if (ev.replyToken) {
      await line.reply(env, ev.replyToken, [
        jobAck(jobId, `${env.PUBLIC_WORKER_URL}/jobs/${jobId}`),
      ]);
    }
    return;
  }

  // Regular chat path: quota + history + Claude reply
  const q = await kv.bumpQuota(env, userId);
  if (!q.ok) {
    return (
      ev.replyToken &&
      line.reply(env, ev.replyToken, [
        { type: "text", text: `已達今日上限（${q.limit}）。明天再試。` },
      ])
    );
  }

  const history = await kv.getHistory(env, userId);
  const system =
    "你是 LINE 上的個人助理 Claude。回答精煉、用繁體中文，必要時用 emoji 區隔段落。" +
    "如果使用者要長任務（>500 字、做檔案、研究、PDF），告訴他改用『寫 …』或『研究 …』指令觸發非同步流程。";
  const prompt = buildPrompt(history, text);

  try {
    const answer = await claude.chat(env, prompt, { system, maxTokens: 1024 });
    await kv.appendHistory(env, userId, { role: "user", content: text, ts: Date.now() });
    await kv.appendHistory(env, userId, { role: "assistant", content: answer, ts: Date.now() });
    if (ev.replyToken) {
      await line.reply(env, ev.replyToken, [{ type: "text", text: clip(answer, 4900) }]);
    } else {
      await line.push(env, userId, [{ type: "text", text: clip(answer, 4900) }]);
    }
  } catch (e) {
    console.error("claude chat failed", e);
    if (ev.replyToken) {
      await line.reply(env, ev.replyToken, [{ type: "text", text: "出錯了，再試一次。" }]);
    }
  }
}

async function handleImage(env: Env, ev: LineEvent, userId: string, messageId: string) {
  const q = await kv.bumpQuota(env, userId);
  if (!q.ok) {
    return (
      ev.replyToken &&
      line.reply(env, ev.replyToken, [{ type: "text", text: `已達今日上限（${q.limit}）。` }])
    );
  }

  // Ack first since vision call may exceed reply token validity.
  if (ev.replyToken) {
    await line.reply(env, ev.replyToken, [{ type: "text", text: "看一下這張圖 🔍" }]);
  }

  try {
    const bytes = await line.getMessageContent(env, messageId);
    const prompt =
      "用繁體中文描述這張圖的重點。如果有文字（菜單、招牌、文件、錯誤訊息），先逐字辨識再翻譯/解釋。如果是植物、食物、商品，告訴我品名/種類/用途。最後用一句話下結論。";
    const answer = await claude.vision(env, bytes, "image/jpeg", prompt, { maxTokens: 1024 });
    await line.push(env, userId, [textCard("圖片分析", answer)]);
  } catch (e) {
    console.error("vision failed", e);
    await line.push(env, userId, [{ type: "text", text: "圖片分析失敗，再試一次。" }]);
  }
}

async function handleAudio(env: Env, ev: LineEvent, userId: string, _messageId: string) {
  if (ev.replyToken) {
    await line.reply(env, ev.replyToken, [
      {
        type: "text",
        text: "語音輸入請從 Rich Menu 開「錄音」LIFF，會用 Web Speech 即時轉文字。直接傳語音訊息暫時不處理。",
      },
    ]);
  }
}

async function handlePostback(env: Env, ev: LineEvent, _userId: string) {
  const data = ev.postback?.data ?? "";
  const params = new URLSearchParams(data);
  const action = params.get("action");
  if (action === "help" && ev.replyToken) {
    await line.reply(env, ev.replyToken, [helpMessage(env)]);
  }
}

function matchLongTask(cmd: string): { kind: "write" | "research" | "pdf"; prompt: string } | null {
  const writers = [/^寫\s*[:：]?\s*(.+)$/u, /^write\s*[:：]?\s*(.+)$/iu];
  const researchers = [/^研究\s*[:：]?\s*(.+)$/u, /^research\s*[:：]?\s*(.+)$/iu];
  const pdfs = [/^pdf\s*[:：]?\s*(.+)$/iu, /^做\s*pdf\s*[:：]?\s*(.+)$/iu];

  for (const r of pdfs) {
    const m = cmd.match(r);
    if (m) return { kind: "pdf", prompt: m[1] };
  }
  for (const r of writers) {
    const m = cmd.match(r);
    if (m) return { kind: "write", prompt: m[1] };
  }
  for (const r of researchers) {
    const m = cmd.match(r);
    if (m) return { kind: "research", prompt: m[1] };
  }
  return null;
}

function buildPrompt(history: kv.Turn[], current: string): string {
  if (history.length === 0) return current;
  const ctx = history
    .map((t) => `${t.role === "user" ? "USER" : "ASSISTANT"}: ${t.content}`)
    .join("\n");
  return `[最近對話]\n${ctx}\n\nUSER: ${current}`;
}

function clip(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

function helpMessage(env: Env) {
  return textCard(
    "怎麼用",
    [
      "💬 直接傳訊息聊天",
      "📷 傳圖片我幫你看",
      "✍️ 「寫 一篇 LIFF 介紹」→ 長文非同步",
      "📄 「pdf 三百字介紹 Cloudflare」→ 完成回連結",
      "🔍 「研究 …」→ 深度查找",
      "🧹 /reset 清對話記憶",
      "📊 /quota 查今日用量",
      "🆔 /whoami 看自己 userId",
    ].join("\n"),
    `LIFF: ${env.LIFF_BASE_URL}`,
  );
}
