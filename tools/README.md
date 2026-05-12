# 維護工具箱 (`tools/`)

這是 `derm-explain-tool` 的維護工具集。所有命令都透過 `npm run` 執行，
不需要安裝任何依賴（純 Node.js 標準函式庫）。

## 快速參考

| 命令 | 用途 |
|---|---|
| `npm run validate` | 全面檢查：語法 + 翻譯完整性 + 跨檔一致性 |
| `npm run list` | 列出所有疾病、分類、是否有客製翻譯 |
| `npm run list <關鍵字>` | 過濾分類或疾病 ID |
| `npm run audit` | 找出仍依賴通用樣板的疾病（提示可以客製化的對象） |
| `npm run dump <id>` | 把某個疾病的所有語言版本 dump 成 Markdown |
| `npm run bump-sw` | 升 service worker 快取版本號（強制 PWA 重新安裝） |
| `npm run serve` | 啟動本機 HTTP server 預覽（預設 4173 port） |
| `npm run add-language scaffold <code> <label>` | 建立新語言的翻譯工作表 |
| `npm run add-language apply <code>` | 把填好的翻譯注入到 codebase |

## 常見工作流

### 改完內容要上線

```bash
npm run validate         # 確認沒有壞掉
git diff conditions.js   # 看一下實際改動
npm run bump-sw          # 升版本號，讓現有 PWA 用戶能收到更新
git add -A && git commit -m "..." && git push
```

### 想知道哪些疾病還在用通用樣板

```bash
npm run audit
```

輸出三個區塊：
- ✅ **Fully custom** — `customZh` + `customTranslations` 都有，完全客製
- 🟡 **Custom Chinese only** — 中文有客製，但外語版本仍走通用樣板
- ⚪ **Generic** — 完全沒客製，所有語言都是樣板生成

優先處理 ⚪ 區塊中**安全關鍵**的疾病（細菌感染要強調吃完療程、
黴菌感染要強調絕對不能單擦類固醇、帶狀皰疹要強調 72 小時黃金窗等）。

### 想看某個疾病現在所有語言版本長什麼樣

```bash
npm run dump viral_warts > /tmp/viral_warts.md
open /tmp/viral_warts.md
```

### 客製某個疾病的衛教內容

目前沒有自動化工具——直接在 `conditions.js` 找到該 `item("id", ...)`
呼叫，加上或修改 `customZh:` 和 `customTranslations:` 欄位即可。改完跑
`npm run validate`。

### 加一個新的字幕語言

兩階段工作流：

```bash
# 1. 產生空白翻譯工作表
npm run add-language scaffold fr 法文

# 編輯 tools/translations/fr.json，把所有 "TODO: ..." 改成法文翻譯
# 同時可參考 tools/translations/fr.context.md 看到中/英/印尼對照

# 2. 把翻譯注入 codebase
npm run add-language apply fr

# 3. 驗證
npm run validate
npm run dump viral_warts        # 抽樣看看法文版本
```

`apply` 會自動：
- 在 `app.js` 的 `languages` 加上 `fr: "法文"`
- 在 `app.js` 的 `treatmentPhrase` 加上 `fr` 區塊
- 在 `conditions.js` 的 `languageText` 加上 `fr` 區塊
- 在 `commonExplain` 與 `commonTreat` 加上 `fr` 那一行
- 把所有 41 個疾病 + 共用 helper 物件的 6 鍵物件補上 `fr: "..."`
- 把 3 個 `customTranslations` 區塊（病毒疣、圓形禿、雄性禿）補上 `fr`
- 升 service worker 版本

整個過程不需要手動編輯 `conditions.js`。

## 架構說明

### 三層翻譯模型

每個疾病的多語言文字來自三個層級，由 `makeCondition` 函式合併：

1. **`customTranslations.<lang>`** — 完整客製翻譯（最高優先級）
2. **`languageText.<lang>.template(d)`** — 模板組合（中等）
3. **共用 helper 物件**（`causes`, `treatmentKinds`, `careBasic`, ...）— 樣板素材

當你需要對某個疾病強調特殊訊息時，加 `customTranslations` 是最安全的方式
——它完全跳過樣板，所以你寫什麼就是什麼，不會被通用句蓋掉。

### 為什麼有 `customZh` 跟 `customTranslations` 兩個欄位？

- `customZh` 只覆寫繁中版本（醫師端看的版本）
- `customTranslations` 覆寫指定的外語版本（病人看的字幕）

兩者各自獨立。可以單獨覆寫中文（如果只是要改醫師端的解釋），也可以
單獨覆寫某幾個外語版本。

### Service worker 快取問題

iOS 把網站加到主畫面後，service worker 會把所有檔案快取住，新部署不
一定會自動進來。處理方式有二：

1. 用戶端點網頁右上角的「⟳ 強制更新」按鈕（會自動清快取重載）
2. 開發端每次有實質內容更新時跑 `npm run bump-sw` 升版本號，讓 SW 偵測到
   檔案變動主動執行 install/activate 流程

兩者都做最保險。

## 目錄結構

```
tools/
├── README.md              ← 本文件
├── lib.js                 ← 共用：載入 module / 解析 item() 區塊
├── validate.js            ← 全面驗證
├── list.js                ← 列出疾病
├── audit.js               ← 找通用樣板用戶
├── dump-disease.js        ← 單一疾病多語言對照
├── bump-sw.js             ← 升 SW 快取版本
├── serve.sh               ← 本機 dev server
├── add-language.js        ← 新語言 scaffold + apply
└── translations/          ← 各語言的翻譯工作表（由 add-language 產生）
    ├── <code>.json
    └── <code>.context.md
```

## 已知限制

- `add-language apply` 用 regex 注入到 `conditions.js`，依賴特定的程式碼
  格式（每個 `item()` 呼叫保持一致的 6 鍵物件順序）。如果手動改了
  `commonExplain` / `commonTreat` 的函式簽名，apply 邏輯可能要更新。
- 樣板生成的 Slavic 語言（uk/ru）句子在文法詞尾上不完全自然
  （例如「вугри зазвичай пов'язана з закупорка пор」應該用屬格）。
  對 AI 朗讀來說可懂，但要完全自然需要對該疾病加 `customTranslations`。
- 沒有 unit tests——`npm run validate` 是唯一的回歸防護。改動 helper
  函式時務必先跑 validate。
