# Setup — LINE × Claude Bridge

跑通端到端流程的步驟。預計時間：**首次 60–90 分鐘**（卡關通常在 LINE Console）。

## 你需要的帳號

- LINE 帳號 + 一個 LINE Official Account（OA）
- LINE Developers Console 存取（用 LINE 帳號登入）
- Anthropic API key（[console.anthropic.com](https://console.anthropic.com/)）
- Cloudflare 帳號（免費）
- 你電腦上裝好 Node.js 20+ 與 `wrangler`（`npm i -g wrangler`）
- （選用）Notion 帳號 + Integration

## 流程概觀

```
1. 建 LINE OA + Messaging API channel       → 拿 CHANNEL_ACCESS_TOKEN + SECRET
2. 建 LINE Login channel（給 LIFF 用）       → 拿 LOGIN_CHANNEL_ID
3. 部署 Worker（Cloudflare）                → 拿 worker URL
4. 部署 LIFF 靜態頁（Cloudflare Pages）     → 拿 pages URL
5. 在 Login channel 註冊 LIFF app           → 拿 LIFF_ID（=網址）
6. 設定 Webhook URL → Worker /webhook
7. 把自己加為 OA 好友，送 /whoami 拿 userId
8. wrangler secret put OWNER_USER_ID
9. （選）跑 setup-rich-menu.mjs
10.（選）設 iOS Shortcuts
```

## Step 1 — LINE Messaging API channel

1. 進 [LINE Developers Console](https://developers.line.biz/console/)
2. 建一個 **Provider** → 在裡面建 **Messaging API channel**
3. 把你的 LINE OA 連到這個 channel（Basic settings → Linked LINE Official Account）
4. **Messaging API** 分頁：
   - 點 **Issue** 拿到 `Channel access token (long-lived)`
   - 把 `Auto-reply messages` 關掉、`Greeting messages` 看你
5. **Basic settings** 分頁：複製 `Channel secret`

**先記下**：
- `LINE_CHANNEL_ACCESS_TOKEN`
- `LINE_CHANNEL_SECRET`

## Step 2 — LINE Login channel（給 LIFF）

LIFF 要在 **LINE Login** channel 底下註冊，不是 Messaging API channel。

1. 同一個 Provider 下，建 **LINE Login channel**
2. **Basic settings**：複製 `Channel ID`（純數字）→ 這就是 `LINE_LOGIN_CHANNEL_ID`

LIFF app 等部署完 Pages 拿到 URL 再回來建（Step 5）。

## Step 3 — 部署 Worker

```bash
cd line-claude/worker
npm install

# 建 KV / R2 / Queue
wrangler kv namespace create KV
# → 把回傳的 id 貼進 wrangler.toml 的 [[kv_namespaces]] id
wrangler r2 bucket create line-claude-files
wrangler queues create line-claude-tasks
wrangler queues create line-claude-tasks-dlq

# 設 secrets
wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
wrangler secret put LINE_CHANNEL_SECRET
wrangler secret put LINE_LOGIN_CHANNEL_ID
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put OWNER_USER_ID    # 先填佔位字串，Step 7 會回來改
# 可選：
wrangler secret put NOTION_TOKEN
wrangler secret put NOTION_DATABASE_ID

# 編輯 wrangler.toml 的 [vars]：PUBLIC_WORKER_URL 先空著
# 第一次部署
wrangler deploy
# → 記下 https://line-claude-worker.<your-subdomain>.workers.dev

# 把 worker URL 寫回 wrangler.toml 的 PUBLIC_WORKER_URL
wrangler deploy   # 再部署一次讓 vars 生效
```

本機開發：

```bash
cp .dev.vars.example .dev.vars   # 填值
wrangler dev                      # 配合 ngrok / cloudflared 對外
```

## Step 4 — 部署 LIFF 靜態頁

```bash
cd line-claude/liff
cp config.example.json config.json
# 編輯 config.json：
#   liffId 先填 "" 或佔位
#   workerUrl 填 step 3 拿到的 worker URL
```

部署到 Cloudflare Pages：

```bash
# 一次性：建 Pages project
wrangler pages project create line-claude-liff --production-branch main

# 直接部署這個資料夾
wrangler pages deploy . --project-name=line-claude-liff
# → 記下 https://line-claude-liff.pages.dev
```

把 Pages URL 寫回 `worker/wrangler.toml` 的 `LIFF_BASE_URL`，再 `wrangler deploy`。

## Step 5 — 註冊 LIFF app

回 LINE Developers Console → **LINE Login channel** → LIFF 分頁 → Add：

- Endpoint URL：`https://line-claude-liff.pages.dev/index.html`
- Size：**Full**
- Scope：勾 `profile`、`openid`
- Bot link feature：**On (Aggressive)**（讓 LIFF 能自動關聯到 OA）
- Scan QR：開
- Send messages：開

建好後會給你一個 `liff://app/xxxxxxxxxx-xxxxxxxx`，**LIFF ID** 是 `xxxxxxxxxx-xxxxxxxx` 那段。
寫回 `liff/config.json` 的 `liffId`，重新 `wrangler pages deploy .`。

依樣為 `/camera.html`、`/voice.html`、`/qr.html`、`/share.html` 各建一個 LIFF app（或統一用 `index.html` 當入口，子頁靠相對連結）。

> 簡化做法：只建一個 LIFF app（指 `index.html`），其他頁面用相對連結。`liff.init` 會持續有效。

## Step 6 — 設 Webhook URL

回 **Messaging API channel** → **Messaging API** 分頁：

- **Webhook URL**：`https://line-claude-worker.<sub>.workers.dev/webhook`
- 按 **Verify** 確認 200 OK
- **Use webhook**：開
- **Webhook redelivery**：開（建議）

## Step 7 — 拿到你自己的 userId

1. LINE app 用 OA 的 QR code 加自己為好友（OA QR 在 Basic settings 分頁）
2. 對 bot 傳 `/whoami` → bot 會回你的 `userId`（35 字元的 `Uxxxxxxxx…`）
3. 把這個 userId 設成 owner：
   ```bash
   wrangler secret put OWNER_USER_ID
   ```
4. 此後你會通過白名單，可以正式聊天

## Step 8 — Rich Menu（選用）

設計一張 2500×1686 的選單圖（Canva / Figma），存成 JPEG。

```bash
export LINE_CHANNEL_ACCESS_TOKEN=<your token>
export LIFF_BASE_URL=https://line-claude-liff.pages.dev
node scripts/setup-rich-menu.mjs path/to/menu.jpg
```

腳本會建立 2×3 格、上排接 LIFF（拍照/語音/QR）、下排為文字指令（長文/用量/說明）。

## Step 9 — iOS Shortcuts（選用）

見 `docs/IOS_SHORTCUTS.md`。簡述：

1. 設一個 secret：`wrangler kv:key put --binding=KV "shortcut_secret" "<隨機字串>"`
2. iPhone 開「捷徑」→ 建立新捷徑
3. 加「取得網頁內容」動作：
   - URL：`https://<worker>/api/shortcut`
   - Method：POST
   - Headers：`x-shortcut-secret: <剛才那串>`
   - Body：JSON `{ "prompt": "聽寫文字", "mode": "task" }`
4. 在 Body 把 "聽寫文字" 換成「聽寫文字」變數（內建）
5. 加 Siri 語句：「叫 Claude」

之後對 Siri 說「Hey Siri, 叫 Claude…」→ 講你要做的事 → 結果會 push 回你的 LINE。

## 驗收清單

- [ ] 加 OA 好友後傳 `/whoami` 收到 userId
- [ ] 設好 OWNER_USER_ID 後傳「在嗎？」收到 Claude 回應
- [ ] 傳一張圖收到分析
- [ ] 傳「寫 300 字介紹 Cloudflare Workers」收到任務 ack + 完成連結
- [ ] LIFF：點 Rich Menu「拍照」開啟相機，拍完收到結果
- [ ] LIFF：點「語音」按住說話，收到結構化結果
- [ ] LIFF：點「掃 QR」掃任意 QR，自動進聊天並處理
- [ ]（選）Siri：「叫 Claude…」 → LINE 收到結果

## 常見卡關

| 症狀 | 通常是 |
|---|---|
| webhook Verify 401 | `LINE_CHANNEL_SECRET` 沒設或設錯 |
| LIFF 開啟一片白 | `config.json` 的 `liffId` 沒填 / pages 沒重部署 |
| LIFF 拍照後說 "id_token invalid" | LINE Login channel ID 跟 Messaging channel 混了 |
| 任務送出但沒回 | Queue consumer 沒啟用 / `OWNER_USER_ID` 還是佔位字串 |
| Notion 寫不進去 | DB 沒分享給 Integration / 欄位名跟 `src/notion.ts` 不一致 |
| 圖片下不到 | Worker 的 `LINE_CHANNEL_ACCESS_TOKEN` 過期或誤填短期 token |
