import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./env";

export const MODEL_FAST = "claude-haiku-4-5-20251001";
export const MODEL_DEFAULT = "claude-sonnet-4-6";
export const MODEL_HEAVY = "claude-opus-4-7";

export function client(env: Env) {
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
}

export async function chat(
  env: Env,
  prompt: string,
  opts: { model?: string; system?: string; maxTokens?: number } = {},
): Promise<string> {
  const r = await client(env).messages.create({
    model: opts.model ?? MODEL_DEFAULT,
    max_tokens: opts.maxTokens ?? 1024,
    system: opts.system,
    messages: [{ role: "user", content: prompt }],
  });
  return textOf(r);
}

export async function vision(
  env: Env,
  imageBytes: ArrayBuffer,
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif",
  prompt: string,
  opts: { model?: string; maxTokens?: number } = {},
): Promise<string> {
  const base64 = arrayBufferToBase64(imageBytes);
  const r = await client(env).messages.create({
    model: opts.model ?? MODEL_DEFAULT,
    max_tokens: opts.maxTokens ?? 1024,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
          { type: "text", text: prompt },
        ],
      },
    ],
  });
  return textOf(r);
}

function textOf(r: { content: Array<{ type: string } & Record<string, unknown>> }) {
  return r.content
    .filter((b): b is { type: "text"; text: string } & Record<string, unknown> => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(s);
}
