#!/usr/bin/env node
"use strict";
// Dump every translation for one condition, side by side, as Markdown.
// Convenient for: proofreading, sending to a translator, or seeding a
// rewrite. Pipe to a file: `npm run dump viral_warts > viral_warts.md`.
//
// Run: npm run dump <condition_id>

const { loadConditions, FIELDS } = require("./lib.js");

const id = process.argv[2];
if (!id) {
  console.error("Usage: npm run dump <condition_id>");
  console.error("       (use `npm run list` to see all ids)");
  process.exit(2);
}

const { conditionTemplates, languageText } = loadConditions();
const c = conditionTemplates.find((x) => x.id === id);
if (!c) {
  console.error(`No condition with id "${id}". Run \`npm run list\` to see all ids.`);
  process.exit(1);
}

console.log(`# ${c.titleZh}  \`${c.id}\``);
console.log(`\nCategory: **${c.category}**  ·  Severity: ${c.severity || "—"}  ·  Contagious: ${c.contagious}`);
console.log(`Tags: ${c.tags.join(", ")}`);
console.log(`Typical follow-up: ${c.typicalFollowUp || "—"}`);

console.log(`\n## 中文 (zh)`);
for (const f of FIELDS) {
  console.log(`\n### ${f}`);
  console.log(c.zh[f] || "(missing)");
}

for (const lang of Object.keys(languageText)) {
  console.log(`\n## ${lang}`);
  for (const f of FIELDS) {
    console.log(`\n### ${f}`);
    console.log(c.translations[lang]?.[f] || "(missing)");
  }
}
