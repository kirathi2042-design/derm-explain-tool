---
title: "專文解析索引（MOC）"
類型: MOC
說明: 文獻專文解析的總索引，依領域分類
更新日期: 2026-06-22
tags:
  - MOC
  - 索引
  - 文獻解析
---

# 📚 專文解析索引（MOC）

> [!info] 關於這份索引
> 這是所有「文獻專文解析」的地圖（Map of Content）。每篇解析都放在對應領域的子資料夾，並以 `category` / `tags` 標註，可在 Obsidian 以資料夾、標籤或關係圖（Graph）三種方式瀏覽。

## 🤖 AI 對齊與安全
- [[朝向廣泛且持久有益模型的強化學習-專文解析]]
  - OpenAI《Reinforcement Learning Towards Broadly and Persistently Beneficial Models》(2026)
  - 主題：對齊泛化、湧現失準的正向鏡像、對齊持久性
  - `#AI對齊` `#強化學習` `#emergent-misalignment`

## 🧠 醫學 / 神經科學
- [[高糖基化是阿茲海默症的代謝驅動因子-文獻交叉解析]]
  - *Nature Metabolism*《Hyperglycosylation is a metabolic driver of Alzheimer's disease》(2026)
  - 主題：高糖基化、己糖胺路徑、葡萄糖胺爭議（PubMed 交叉比對）、O-GlcNAc
  - `#阿茲海默症` `#葡萄糖胺` `#O-GlcNAc`

---

## 🔎 依分類瀏覽（Dataview 選用）

> [!tip] 若你的 Vault 安裝了 Dataview 外掛
> 下面的查詢會自動列出所有 `類型: 文獻解析` 的筆記並依 `category` 分組；沒裝外掛則忽略此區塊即可。

```dataview
TABLE category AS "分類", 原文標題 AS "原文", 發表日期 AS "發表"
FROM "feature-articles"
WHERE 類型 = "文獻解析"
SORT category ASC
```

---

## 🗂️ 分類規則（給未來新增文章參考）
- 每篇解析放入 `feature-articles/<領域>/` 子資料夾。
- frontmatter 必填：`title`、`類型: 文獻解析`、`category`、`tags`、`解析撰寫日期`。
- 醫學類請保留 `文獻交叉來源: PubMed` 並在內文附 DOI 連結。
- 新增後，回到本 MOC 補一條連結。
