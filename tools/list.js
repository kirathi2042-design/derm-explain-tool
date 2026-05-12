#!/usr/bin/env node
"use strict";
// List all conditions grouped by category. Optional substring filter.
//
// Run: npm run list           (list every condition)
//      npm run list 病毒       (only categories containing "病毒")

const { loadConditions, extractItemBlocks } = require("./lib.js");

const { conditionTemplates } = loadConditions();
const blocks = extractItemBlocks();

const filter = process.argv[2];
const filtered = filter
  ? conditionTemplates.filter((c) => c.category.includes(filter) || c.id.includes(filter) || c.titleZh.includes(filter))
  : conditionTemplates;

const byCategory = {};
for (const c of filtered) {
  (byCategory[c.category] ||= []).push(c);
}

for (const [cat, items] of Object.entries(byCategory)) {
  console.log(`\n${cat}  (${items.length})`);
  console.log("─".repeat(64));
  for (const c of items) {
    const blk = blocks[c.id] || "";
    const flags = [
      blk.includes("customZh:") ? "zh" : "  ",
      blk.includes("customTranslations:") ? "i18n" : "    ",
      c.contagious ? "⚠ contagious" : ""
    ].filter(Boolean).join("  ");
    console.log(`  ${c.id.padEnd(38)} ${c.titleZh.padEnd(16)} [${flags}]`);
  }
}

console.log(`\nTotal: ${filtered.length}${filter ? ` (filtered from ${conditionTemplates.length})` : ""}`);
console.log("Legend: zh = customZh override, i18n = customTranslations override");
