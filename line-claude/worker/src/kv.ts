import type { Env } from "./env";

// Allowlist: any LINE userId allowed to use the bot. Owner is always allowed.
const ALLOWLIST_KEY = "allowlist";

export async function isAllowed(env: Env, userId: string): Promise<boolean> {
  if (userId === env.OWNER_USER_ID) return true;
  const raw = await env.KV.get(ALLOWLIST_KEY);
  if (!raw) return false;
  const list = JSON.parse(raw) as string[];
  return list.includes(userId);
}

export async function addAllowed(env: Env, userId: string) {
  const raw = await env.KV.get(ALLOWLIST_KEY);
  const list = raw ? (JSON.parse(raw) as string[]) : [];
  if (!list.includes(userId)) list.push(userId);
  await env.KV.put(ALLOWLIST_KEY, JSON.stringify(list));
}

// Per-user daily quota for heavy tasks (Claude calls, PDFs, etc.).
export async function bumpQuota(env: Env, userId: string): Promise<{ used: number; limit: number; ok: boolean }> {
  const limit = Number(env.MAX_DAILY_TASKS || "50");
  const day = new Date().toISOString().slice(0, 10);
  const key = `quota:${userId}:${day}`;
  const current = Number((await env.KV.get(key)) || "0");
  const next = current + 1;
  if (next > limit) return { used: current, limit, ok: false };
  await env.KV.put(key, String(next), { expirationTtl: 60 * 60 * 36 });
  return { used: next, limit, ok: true };
}

export async function getQuota(env: Env, userId: string): Promise<{ used: number; limit: number }> {
  const limit = Number(env.MAX_DAILY_TASKS || "50");
  const day = new Date().toISOString().slice(0, 10);
  const key = `quota:${userId}:${day}`;
  const used = Number((await env.KV.get(key)) || "0");
  return { used, limit };
}

// Conversation memory: last N user/assistant turns per user (small, fast).
const HISTORY_LIMIT = 8;

export type Turn = { role: "user" | "assistant"; content: string; ts: number };

export async function getHistory(env: Env, userId: string): Promise<Turn[]> {
  const raw = await env.KV.get(`hist:${userId}`);
  if (!raw) return [];
  return JSON.parse(raw) as Turn[];
}

export async function appendHistory(env: Env, userId: string, turn: Turn) {
  const history = await getHistory(env, userId);
  history.push(turn);
  const trimmed = history.slice(-HISTORY_LIMIT);
  await env.KV.put(`hist:${userId}`, JSON.stringify(trimmed), { expirationTtl: 60 * 60 * 24 * 7 });
}

export async function clearHistory(env: Env, userId: string) {
  await env.KV.delete(`hist:${userId}`);
}

// Job state for async tasks.
export type JobState = "queued" | "running" | "done" | "error";

export type Job = {
  id: string;
  userId: string;
  kind: string;
  prompt: string;
  state: JobState;
  result?: string;
  fileUrl?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};

export async function saveJob(env: Env, job: Job) {
  await env.KV.put(`job:${job.id}`, JSON.stringify(job), { expirationTtl: 60 * 60 * 24 * 30 });
}

export async function getJob(env: Env, id: string): Promise<Job | null> {
  const raw = await env.KV.get(`job:${id}`);
  return raw ? (JSON.parse(raw) as Job) : null;
}
