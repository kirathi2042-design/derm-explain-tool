import type { Env } from "./env";

const API = "https://api.line.me/v2/bot";
const DATA_API = "https://api-data.line.me/v2/bot";

export type LineTextMessage = { type: "text"; text: string };
export type LineImageMessage = {
  type: "image";
  originalContentUrl: string;
  previewImageUrl: string;
};
export type LineFlexMessage = { type: "flex"; altText: string; contents: unknown };
export type LineMessage = LineTextMessage | LineImageMessage | LineFlexMessage;

async function authedFetch(env: Env, url: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(url, { ...init, headers });
}

export async function reply(env: Env, replyToken: string, messages: LineMessage[]) {
  const res = await authedFetch(env, `${API}/message/reply`, {
    method: "POST",
    body: JSON.stringify({ replyToken, messages: messages.slice(0, 5) }),
  });
  if (!res.ok) {
    console.error("LINE reply failed", res.status, await res.text());
  }
}

export async function push(env: Env, to: string, messages: LineMessage[]) {
  const res = await authedFetch(env, `${API}/message/push`, {
    method: "POST",
    body: JSON.stringify({ to, messages: messages.slice(0, 5) }),
  });
  if (!res.ok) {
    console.error("LINE push failed", res.status, await res.text());
  }
}

export async function getMessageContent(env: Env, messageId: string): Promise<ArrayBuffer> {
  const res = await authedFetch(env, `${DATA_API}/message/${messageId}/content`);
  if (!res.ok) throw new Error(`LINE getMessageContent failed: ${res.status}`);
  return res.arrayBuffer();
}

export async function getProfile(env: Env, userId: string) {
  const res = await authedFetch(env, `${API}/profile/${userId}`);
  if (!res.ok) return null;
  return res.json() as Promise<{
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
    language?: string;
  }>;
}

// HMAC-SHA256 over raw body with channel secret. Base64-compare with x-line-signature.
export async function verifySignature(
  secret: string,
  body: string,
  signatureHeader: string | null,
): Promise<boolean> {
  if (!signatureHeader) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  const expected = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return timingSafeEqual(expected, signatureHeader);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
