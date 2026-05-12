#!/usr/bin/env node
"use strict";
// Validate conditions.js, app.js, service-worker.js for syntax and translation
// completeness. Exits non-zero on any failure.
//
// Run: npm run validate

const fs = require("fs");
const path = require("path");
const { ROOT, FIELDS } = require("./lib.js");

const errors = [];
const warnings = [];

function syntaxCheck(filename) {
  try {
    new Function(fs.readFileSync(path.join(ROOT, filename), "utf8"));
    return true;
  } catch (e) {
    errors.push(`${filename}: syntax error — ${e.message}`);
    return false;
  }
}

const okConditions = syntaxCheck("conditions.js");
const okApp = syntaxCheck("app.js");
const okSw = syntaxCheck("service-worker.js");

if (!okConditions || !okApp) {
  report();
  process.exit(1);
}

// Reload as modules now that syntax is known good.
const { loadConditions, loadApp } = require("./lib.js");
const { conditionTemplates, languageText } = loadConditions();
const { languages, treatmentPhrase } = loadApp();

const langKeys = Object.keys(languageText);
const appLangKeys = Object.keys(languages);
const treatLangKeys = Object.keys(treatmentPhrase);

// Cross-file language consistency.
for (const k of langKeys) {
  if (!appLangKeys.includes(k)) errors.push(`languageText has "${k}" but app.js languages does not`);
}
for (const k of appLangKeys) {
  if (!langKeys.includes(k)) errors.push(`app.js languages has "${k}" but conditions.js languageText does not`);
}
for (const k of [...appLangKeys, "zh"]) {
  if (!treatLangKeys.includes(k)) warnings.push(`treatmentPhrase missing "${k}" — treatment controls will not render for this language`);
}

// Per-condition completeness.
for (const c of conditionTemplates) {
  for (const k of ["id", "category", "titleZh", "tags", "zh", "translations"]) {
    if (!c[k]) errors.push(`Condition "${c.id || "(unknown)"}" missing top-level field "${k}"`);
  }
  for (const f of FIELDS) {
    if (!c.zh?.[f]) errors.push(`${c.id}: zh.${f} missing or empty`);
  }
  for (const lang of langKeys) {
    if (!c.translations?.[lang]) {
      errors.push(`${c.id}: translations.${lang} missing`);
      continue;
    }
    for (const f of FIELDS) {
      const v = c.translations[lang][f];
      if (!v) errors.push(`${c.id}: translations.${lang}.${f} missing or empty`);
      else if (typeof v === "string" && v.includes("undefined")) errors.push(`${c.id}: translations.${lang}.${f} contains "undefined"`);
    }
  }
}

// service-worker.js — has a CACHE_NAME constant?
const swSrc = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");
if (!/CACHE_NAME\s*=\s*"derm-explain-tool-v\d+"/.test(swSrc)) {
  errors.push("service-worker.js: CACHE_NAME constant not found in expected form");
}

report();

function report() {
  console.log(`Files:        conditions.js, app.js, service-worker.js`);
  console.log(`Languages:    ${langKeys ? langKeys.join(", ") : "(unknown)"}`);
  console.log(`Conditions:   ${conditionTemplates ? conditionTemplates.length : "(unknown)"}`);

  if (warnings.length) {
    console.log("\nWarnings:");
    warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  }
  if (errors.length) {
    console.log(`\n✗ ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    errors.forEach((e) => console.log(`  - ${e}`));
    process.exit(1);
  }
  console.log("\n✓ All checks pass");
}
