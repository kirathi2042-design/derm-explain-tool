# Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       iPhone (your LINE app)                    │
│                                                                 │
│   chat input   Rich Menu   LIFF (camera/voice/qr/share)         │
└──────┬─────────────┬───────────────────┬───────────────────────┘
       │             │                   │
       ▼             ▼                   ▼
  LINE Platform                  Pages (static)
   webhook POST                  https://*.pages.dev
       │                                 │
       ▼                          fetch  │
┌─────────────────────────────────────────────────────────────────┐
│                Cloudflare Worker  (Hono)                        │
│                                                                 │
│  POST /webhook      ─→ webhook.ts ─→ Claude  ─→ LINE reply/push │
│  POST /api/vision   ─→ verify id_token ─→ Claude vision ─→ push │
│  POST /api/voice    ─→ verify id_token ─→ Claude JSON ─→ Notion │
│  POST /api/shortcut ─→ shared-secret  ─→ Claude / queue         │
│  GET  /jobs/:id     ─→ status HTML                              │
│  GET  /files/:key   ─→ R2 + signed token                        │
│                                                                 │
│   long task path:                                               │
│     webhook.ts ──→ TASK_QUEUE ──→ queue handler ──→ jobs.ts     │
│         (ack)                                       │           │
│                                                     ▼           │
│                                       generate HTML doc → R2   │
│                                       push fileCard to LINE     │
└─────────┬──────────────┬───────────────────┬───────────────────┘
          │              │                   │
          ▼              ▼                   ▼
       KV          R2 bucket            Anthropic API
   (allowlist,   (HTML docs,            (Sonnet 4.6 /
    quota,       PDFs, blobs)            Opus 4.7 /
    history,                             Haiku 4.5)
    jobs,
    secrets)
```

## Data flow examples

### A. Chat (synchronous)
1. iPhone → text msg → LINE Platform → POST `/webhook`
2. `verifySignature` → `handleEvents` → `handleText`
3. allowlist check → bump quota → load history from KV
4. Claude API → answer
5. `line.reply()` with `replyToken`
6. iPhone LINE shows answer

### B. Image (multimodal)
- If sent in chat: webhook downloads via `api-data.line.me` → vision → push
- If sent via LIFF camera: LIFF posts multipart → `/api/vision` → vision → push

### C. Long task
- "寫 300 字介紹 X" → `matchLongTask` → save Job → enqueue → ack Flex
- Queue consumer → `processJob` → Claude → save HTML to R2 → fileCard push

### D. Voice
- LIFF records via Web Speech API client-side (no audio leaves device unstructured)
- Transcript posts to `/api/voice` → Claude JSON → Notion API → push summary

### E. Siri Shortcut
- iPhone Shortcut posts to `/api/shortcut` with shared-secret header
- `chat` mode: synchronous reply pushed to LINE
- `task` mode: enqueue + ack (Siri stays brief, LINE shows result later)

## Why this stack

| Choice | Why |
|---|---|
| Cloudflare Workers | Free tier covers personal use, no cold start, global edge, queue+KV+R2 in one account |
| Hono | Small, edge-native router with first-class Workers types |
| Pages for LIFF | Same Cloudflare account, free static hosting with HTTPS |
| KV not D1 | All access patterns are key→value with TTL. D1 is overkill |
| R2 (not Workers cache) | Need persistence + signed URLs |
| Queues | Long tasks exceed Worker invocation CPU budget (30s on free tier) |
| LIFF id_token verification on the server | Don't trust client-supplied userId |
| HTML docs (not PDFs) | CJK fonts in Workers are painful; iOS Safari has "Print → Save to PDF" built-in |
| Owner-only allowlist | This is a personal assistant; multi-user comes later |

## Trust boundaries

- **Untrusted**: any payload from LINE webhook, LIFF fetch body, Shortcut body
- **Auth checks**:
  - Webhook: HMAC signature over raw body (`x-line-signature`)
  - LIFF endpoints: verify `id_token` against LINE's `/oauth2/v2.1/verify` (server-side)
  - Shortcut endpoint: shared secret from KV (rotatable)
- **Allowlist**: `userId === OWNER_USER_ID` or in KV `allowlist`
- **Quota**: per-user per-day counter in KV with TTL

## What's not here yet

- Multi-user (would need OAuth state + tenant separation)
- Streaming responses (LINE Messaging API doesn't support streaming text)
- Group chat support (`source.groupId` ignored; only direct chats)
- Image upload from LIFF directly to R2 (currently round-trips through Worker)
- iOS Shortcuts with image input (would need multipart upload helper)
- LINE Flex Message carousel for richer task results
