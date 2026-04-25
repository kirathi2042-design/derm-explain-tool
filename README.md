# 皮膚科多語病情說明與朗讀工具

這是一個可部署到 GitHub Pages 的手機版 PWA，用於皮膚科臨床現場向外籍病人解釋常見皮膚疾病，並產生可貼到 ChatGPT App 朗讀的文字。

定位很單純：固定模板資料庫 + 搜尋 + 多語字幕 + ChatGPT 朗讀稿複製。  
它不是診斷工具，不做即時醫療判斷，不連接 API，不儲存病人個資。

## 功能

- 支援印尼文、英文、越南文、泰文、日文、韓文
- 醫師操作介面使用繁體中文
- 內建 40 個皮膚科常見模板
- 可搜尋中文病名、分類、tag、治療方式關鍵字
- 可切換「只顯示外語」與「中文對照」
- 一鍵複製病人說明
- 一鍵複製 ChatGPT App 朗讀稿
- PWA 支援加入手機主畫面
- 第一次載入後可基本離線使用

## 檔案結構

```text
derm-explain-tool/
├── index.html
├── style.css
├── app.js
├── conditions.js
├── manifest.json
├── service-worker.js
└── README.md
```

## GitHub Pages 部署

1. 建立 GitHub repository，例如 `derm-explain-tool`
2. 將本資料夾內的檔案推送到 repository
3. 到 GitHub repository 的 `Settings` → `Pages`
4. Source 選擇 `Deploy from a branch`
5. Branch 選擇 `main`，資料夾選擇 `/root`
6. 部署完成後網址通常會是：

```text
https://username.github.io/derm-explain-tool/
```

本專案所有路徑都使用 `./` 相對路徑，可在 GitHub Pages 子路徑下運作。

## 新增皮膚病模板

1. 可以用 ChatGPT 產生新的 `conditionTemplates` JavaScript 物件
2. 醫師確認醫療內容與翻譯後，貼到 `conditions.js`
3. 推送到 GitHub 後，GitHub Pages 會更新網站

目前 `conditions.js` 使用 `makeCondition()` 工廠函式建立完整模板，方便大量維護。若你想新增完整手寫物件，也請確保欄位符合既有結構。

## 給 ChatGPT 產生新皮膚病模板的 prompt 範本

```text
請幫我產生一個可放入 conditionTemplates 的皮膚科病情解釋 JavaScript 物件。病名是：[填入病名]。

用途是皮膚科臨床現場向外籍病人做通用型病情解釋。

請使用繁體中文建立原文，並翻譯成印尼文、英文、越南文、泰文、日文、韓文。

語氣要清楚、溫和、病人容易理解，不要過度恐嚇，不要加入個別病人的診斷細節。

請依照皮膚科情境包含：
- 這是什麼病
- 常見原因
- 是否會傳染
- 治療方式
- 居家照護
- 什麼情況要提早回診
- 回診建議

資料結構必須完全符合以下欄位：
id, category, titleZh, severity, tags, contagious, typicalFollowUp, zh, translations。

zh 與 translations 內必須包含：
summary, explanation, treatment, homeCare, warning, followUp。

請只輸出合法 JavaScript 物件，不要額外解釋。
```

## 安全提醒

- 不要存病人個資
- 不要輸入病人姓名、身分證字號、病歷號、生日或其他可識別個資
- 不要把 API key 寫進前端
- 不要把院內帳密或內部系統網址放進 GitHub
- 若 repository 是公開的，所有模板內容都會公開
- 所有醫療內容與翻譯都應由醫師確認後再使用

## 本地測試

可用任一靜態伺服器開啟，例如：

```bash
python3 -m http.server 4173
```

然後開啟：

```text
http://localhost:4173/
```

直接用瀏覽器開 `index.html` 也能看到主要介面，但 PWA 與 service worker 需要透過 HTTP/HTTPS 測試。
