import type { Env } from "./env";

// Verify a LIFF-issued ID token against LINE's verify endpoint.
// https://developers.line.biz/en/reference/line-login/#verify-id-token
export async function verifyIdToken(env: Env, idToken: string): Promise<{ sub: string } | null> {
  if (!idToken) return null;
  const params = new URLSearchParams();
  params.set("id_token", idToken);
  params.set("client_id", env.LINE_LOGIN_CHANNEL_ID);
  const res = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) {
    console.error("LIFF id_token verify failed", res.status, await res.text());
    return null;
  }
  const j = (await res.json()) as { sub: string };
  return j;
}
