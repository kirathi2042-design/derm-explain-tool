#!/usr/bin/env node
"use strict";
// Audit which conditions rely on the auto-generated template versus a hand-
// written customZh / customTranslations override. Useful for prioritising
// rewrites — conditions that share generic "請依醫師指示..." boilerplate are
// candidates for a specific customisation.
//
// Run: npm run audit

const { loadConditions, extractItemBlocks } = require("./lib.js");

const { conditionTemplates } = loadConditions();
const blocks = extractItemBlocks();

const generic = [];
const customZhOnly = [];
const fullCustom = [];

for (const c of conditionTemplates) {
  const blk = blocks[c.id] || "";
  const hasZh = blk.includes("customZh:");
  const hasTr = blk.includes("customTranslations:");
  if (hasZh && hasTr) fullCustom.push(c);
  else if (hasZh) customZhOnly.push(c);
  else generic.push(c);
}

function listSection(title, arr) {
  console.log(`\n${title}  (${arr.length})`);
  console.log("─".repeat(64));
  arr.forEach((c) => console.log(`  ${c.id.padEnd(38)} ${c.titleZh}`));
}

listSection("✅ Fully custom (customZh + customTranslations)", fullCustom);
listSection("🟡 Custom Chinese only (foreign langs still templated)", customZhOnly);
listSection("⚪ Generic template (no override)", generic);

console.log("\n" + "─".repeat(64));
console.log(`Total:           ${conditionTemplates.length}`);
console.log(`Fully custom:    ${fullCustom.length}`);
console.log(`Partial:         ${customZhOnly.length}`);
console.log(`Generic:         ${generic.length}`);
console.log("\nNext steps:");
console.log("  • Audit \"Generic\" rows for diseases needing specific safety");
console.log("    emphasis (antibiotics, antifungals, antivirals, etc.).");
console.log("  • Use `npm run dump <id>` to inspect a condition's translations.");
