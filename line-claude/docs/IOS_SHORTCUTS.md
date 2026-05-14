# iOS Shortcuts — 用 Siri 觸發 Claude

讓你在 iPhone 對 Siri 說「叫 Claude 幫我…」，Claude 跑完之後結果 push 回 LINE。

## 一次性設定

### 1. 設一個 shared secret

```bash
# 在 worker 目錄
SECRET=$(openssl rand -hex 16)
echo "shortcut secret: $SECRET"
wrangler kv:key put --binding=KV "shortcut_secret" "$SECRET"
```

把 `$SECRET` 抄下來，等等捷徑要貼。

### 2. 建立捷徑

iPhone 「捷徑」App → 「+」建立新捷徑：

#### 動作 1：聽寫文字
- 加入「**Dictate Text**」（聽寫文字）動作
- 語言：中文（繁體）或你習慣的

#### 動作 2：URL
- 加入「**URL**」
- 內容：`https://line-claude-worker.<你的子網域>.workers.dev/api/shortcut`

#### 動作 3：取得網頁內容
- 加入「**Get Contents of URL**」（取得網址的內容）
- URL：選上一步的 URL 變數
- **Method**：POST
- **Headers**：
  - `Content-Type`: `application/json`
  - `x-shortcut-secret`: `<你剛才那串 SECRET>`
- **Request Body**：選 `JSON`
  - `prompt`：選「聽寫的文字」變數
  - `mode`：填字串 `task`（長任務）或 `chat`（即時短回應）

#### 動作 4（選用）：通知
- 加入「**Show Notification**」
- 內容：「已送給 Claude，看 LINE。」

#### 加 Siri 語句
- 點捷徑名稱旁邊的 ⓘ
- **Add to Siri** → 錄「叫 Claude」或你想要的句子

### 3. 試試

對 Siri 說「Hey Siri 叫 Claude」→ 它會問你要做什麼 → 講「幫我寫 300 字介紹 LIFF」→ 結束後你 LINE 會收到 Flex 卡片 + 連結。

## chat vs task 模式

| 模式 | 行為 | 適合 |
|---|---|---|
| `chat` | 同步呼叫 Claude，回應立刻 push 到 LINE | 短問答、查資料、口頭備忘 |
| `task` | 排進 queue 非同步處理，先 push「處理中」，完成 push 連結 | 長文、研究、產文件 |

預設用 `task` 較安全，因為 chat 模式如果 Claude 慢，Siri 那邊會撐住等到 timeout。

## 兩個進階模板

### 模板 A：拍照丟給 Claude
1. 「Take Photo」（拍照）
2. 「Get Contents of URL」POST 到 `/api/vision`
   - 但 vision endpoint 是 LIFF 用的（需要 `id_token`）
   - 簡單做法：先把圖存進 iCloud Drive 再分享連結，把連結貼進 prompt 給 Claude

> 真的要從 iOS Shortcut 直接傳圖給 Vision，需要在 worker 加一個 `/api/shortcut-image` 端點，用 multipart + secret。後續可以做。

### 模板 B：定時任務
1. 「捷徑」App → 「自動化」分頁
2. 「個人自動化」→ 「時間」→ 每天早上 8:00
3. Run shortcut → 你的 Claude shortcut
4. Prompt 設成固定字串：「整理今天的天氣與行事曆，三句以內」

## 安全提醒

- `shortcut_secret` 等同於管理員 token——洩漏的話別人可以任意叫你的 Claude
- 不要把 secret 寫進共享的捷徑檔
- 想換 secret：直接覆寫 KV 那個 key 即可，立即生效
- 想暫停：`wrangler kv:key delete --binding=KV shortcut_secret`
