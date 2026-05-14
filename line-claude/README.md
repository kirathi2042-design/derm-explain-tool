# LINE × Claude Bridge

把 iPhone 上的 LINE 變成 Claude 的前端。傳訊息、拍照、錄音、掃 QR、下指令——交給 Claude 處理——結果 push 回 LINE。

## 你會得到什麼

1. **LINE 對話即 Claude**：在 LINE 跟 bot 講話，等同跟 Claude 講話
2. **拍照問 Claude**：LIFF 開相機拍照，Claude Vision 分析
3. **長任務非同步**：「寫篇 X 做成 PDF」→ 立刻 ack → 完成 push 連結
4. **語音待辦**：錄音 → 結構化 → 寫進 Notion
5. **QR 掃描自動處理**：掃到什麼，Claude 處理什麼
6. **Rich Menu 入口**：圖文選單一鍵觸發
7. **Siri 捷徑**：iPhone 內建 Shortcuts App 也能呼叫

## 技術棧

| 層 | 技術 |
|---|---|
| Webhook 後端 | Hono on Cloudflare Workers |
| LIFF 前端 | 純靜態 HTML/JS on Cloudflare Pages |
| 持久層 | Workers KV（設定、白名單、配額）+ R2（檔案） |
| AI | Claude API（Sonnet 4.6 文字、Opus 4.7 重任務、Sonnet 4.6 vision） |
| LINE | Messaging API + LIFF v2 |

## 目錄

```
line-claude/
├── README.md            # 你在看這個
├── SETUP.md             # 一步步設定指南（看這個跑通）
├── worker/              # Cloudflare Worker（webhook + API + jobs）
├── liff/                # LIFF 靜態頁（camera / voice / qr）
├── scripts/             # 一次性工具（Rich Menu 建立、抓 userId）
└── docs/
    ├── ARCHITECTURE.md  # 架構說明
    └── IOS_SHORTCUTS.md # Siri 捷徑設定
```

## 快速開始（簡版）

```bash
cd line-claude/worker
npm install
cp .dev.vars.example .dev.vars     # 填入 LINE token + Anthropic key
npm run dev                         # 本機 wrangler dev

cd ../liff
# 靜態頁，無需 build
```

完整步驟看 `SETUP.md`。

## 注意

- 這是個人助理性質的設計，白名單預設只允許你自己使用
- LINE 免費月配額 200 則 push，重度用會碰到上限
- Claude API 按 token 計費，已加 daily limit 防爆量
- LINE Messaging API 不支援直接傳 PDF，PDF 一律以 R2 連結回傳
