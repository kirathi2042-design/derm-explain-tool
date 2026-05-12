#!/usr/bin/env node
"use strict";
// Add a new subtitle language to the toolkit.
//
// Two-phase workflow:
//
//   1. scaffold:  generate a translation worksheet at
//      tools/translations/<code>.json plus a side-by-side context document
//      at tools/translations/<code>.context.md. The worksheet defaults all
//      values to the English source string so it is obvious what is still
//      untranslated.
//
//        npm run add-language scaffold uk 烏克蘭文
//
//   2. apply:  read the filled-in worksheet, inject the translations into
//      app.js + conditions.js, and bump the service-worker cache version.
//
//        npm run add-language apply uk
//
// The tool intentionally does not try to translate anything itself — it
// only handles the mechanical injection. Translations should be authored
// by a clinician or a translator.

const fs = require("fs");
const path = require("path");
const { ROOT, loadConditions, loadApp } = require("./lib.js");

const TRANS_DIR = path.join(__dirname, "translations");
const APP_JS = path.join(ROOT, "app.js");
const COND_JS = path.join(ROOT, "conditions.js");
const SW_JS = path.join(ROOT, "service-worker.js");

const FIELDS = ["summary", "explanation", "treatment", "homeCare", "warning", "followUp"];
const CUSTOM_TRANS_IDS = ["viral_warts", "alopecia_areata", "androgenetic_alopecia"];

const [, , cmd, code, label] = process.argv;

if (cmd === "scaffold") {
  if (!code || !label) {
    console.error("Usage: npm run add-language scaffold <code> <label>");
    console.error("  e.g. npm run add-language scaffold uk 烏克蘭文");
    process.exit(2);
  }
  scaffold(code, label);
} else if (cmd === "apply") {
  if (!code) {
    console.error("Usage: npm run add-language apply <code>");
    process.exit(2);
  }
  apply(code);
} else {
  console.error("Usage:");
  console.error("  npm run add-language scaffold <code> <label>");
  console.error("  npm run add-language apply <code>");
  process.exit(2);
}

// =========================================================================
// scaffold
// =========================================================================

function scaffold(code, label) {
  fs.mkdirSync(TRANS_DIR, { recursive: true });
  const out = path.join(TRANS_DIR, `${code}.json`);
  const ctx = path.join(TRANS_DIR, `${code}.context.md`);

  if (fs.existsSync(out)) {
    console.error(`✗ ${out} already exists. Delete it first if you want to re-scaffold.`);
    process.exit(1);
  }

  // Gather every unique 6-key inline object from conditions.js.
  const sixKey = collectSixKey();

  const worksheet = {
    code,
    label,
    languageText: {
      contagiousYes: "TODO: translate — \"It may spread to other parts of your body or to other people.\"",
      contagiousNo: "TODO: translate — \"This condition is usually not contagious.\"",
      chronic: "TODO: translate — \"Treatment often takes time and may need gradual adjustment.\"",
      follow: "TODO: translate — \"Please return as arranged so the treatment can be adjusted.\"",
      urgent: "TODO: translate — \"Come back earlier if you have severe pain, spreading redness or swelling, pus, fever, breathing difficulty, or signs of drug allergy.\""
    },
    templates: {
      summary: "TODO: keep the literal `${d.names." + code + "}` placeholder, e.g. \"Your skin condition is ${d.names." + code + "}.\"",
      commonExplain: "TODO: keep `${names." + code + "}` and `${cause." + code + "}` placeholders, e.g. \"${names." + code + "} is usually related to ${cause." + code + "}.\"",
      commonTreat: "TODO: keep `${kind." + code + "}` placeholder, e.g. \"Treatment may include ${kind." + code + "}.\""
    },
    treatmentPhrase: {
      oral_qd: "TODO: translate — \"If oral medicine is prescribed, take it once a day.\"",
      oral_bid: "TODO: translate — \"If oral medicine is prescribed, take it twice a day.\"",
      oral_tid: "TODO: translate — \"If oral medicine is prescribed, take it three times a day.\"",
      oral_qid: "TODO: translate — \"If oral medicine is prescribed, take it four times a day.\"",
      oral_hs: "TODO: translate — \"If oral medicine is prescribed, take it at bedtime.\"",
      ointment_different: "TODO: translate — \"For topical medicine, use one ointment in the morning and a different ointment at night as directed.\"",
      ointment_same: "TODO: translate — \"For topical medicine, use the same ointment in the morning and at night as directed.\"",
      acne_morning_acne: "TODO: translate — \"Morning: apply acne medicine to acne areas.\"",
      acne_night_acne: "TODO: translate — \"Night: apply acne medicine to acne areas.\"",
      acne_night_comedone: "TODO: translate — \"Night: apply comedone medicine to blackheads, whiteheads, or clogged-pore areas.\"",
      acne_night_mark: "TODO: translate — \"Night: apply acne-mark medicine to acne marks.\"",
      follow_3: "TODO: translate — \"Please return for follow-up in 3 days.\"",
      follow_4: "TODO: translate — \"Please return for follow-up in 4 days.\"",
      follow_5: "TODO: translate — \"Please return for follow-up in 5 days.\"",
      follow_7: "TODO: translate — \"Please return for follow-up in 7 days.\"",
      follow_after_meds: "TODO: translate — \"Please return for follow-up after you finish the ointment.\"",
      follow_prn: "TODO: translate — \"For now, you may observe the condition. If you feel uncomfortable or the symptoms get worse, please come back.\""
    },
    sixKey: Object.fromEntries(Object.keys(sixKey).map((id) => [id, "TODO: " + (sixKey[id].en || sixKey[id].zh || "(no source)")])),
    customTranslations: Object.fromEntries(CUSTOM_TRANS_IDS.map((id) => [id, Object.fromEntries(FIELDS.map((f) => [f, "TODO: translate the " + f + " section for " + id]))]))
  };

  fs.writeFileSync(out, JSON.stringify(worksheet, null, 2) + "\n");
  fs.writeFileSync(ctx, buildContextMd(code, label, sixKey));

  console.log(`✓ Scaffolded: ${path.relative(ROOT, out)}`);
  console.log(`✓ Context:    ${path.relative(ROOT, ctx)}`);
  console.log("");
  console.log("Next steps:");
  console.log(`  1. Fill in all TODO values in ${path.relative(ROOT, out)}.`);
  console.log(`     Use ${path.relative(ROOT, ctx)} as a side-by-side reference of`);
  console.log("     the existing Indonesian / English / Chinese source strings.");
  console.log("  2. Run: npm run add-language apply " + code);
  console.log("  3. Run: npm run validate");
}

function buildContextMd(code, label, sixKey) {
  const lines = [];
  lines.push(`# Translation worksheet for \`${code}\` (${label})`);
  lines.push("");
  lines.push("This document mirrors the keys in the JSON worksheet. Translate");
  lines.push("each entry into the target language; copy the values into the");
  lines.push(`matching key in \`${code}.json\`. Then run:`);
  lines.push("");
  lines.push("```");
  lines.push(`npm run add-language apply ${code}`);
  lines.push("```");
  lines.push("");

  lines.push("## Disease names and helper phrases (sixKey)");
  lines.push("");
  lines.push("| Indonesian (key) | English | Chinese |");
  lines.push("|---|---|---|");
  for (const [id, refs] of Object.entries(sixKey)) {
    lines.push(`| \`${id}\` | ${escapeMd(refs.en || "")} | ${escapeMd(refs.zh || "")} |`);
  }
  return lines.join("\n") + "\n";
}

function escapeMd(s) {
  return s.replace(/\|/g, "\\|");
}

// =========================================================================
// apply
// =========================================================================

function apply(code) {
  const jsonPath = path.join(TRANS_DIR, `${code}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`✗ ${jsonPath} not found. Run \`npm run add-language scaffold ${code} <label>\` first.`);
    process.exit(1);
  }
  const ws = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  if (!ws.code || ws.code !== code) {
    console.error(`✗ Worksheet code mismatch (got "${ws.code}", expected "${code}").`);
    process.exit(1);
  }
  validateWorksheet(ws);

  const { languageText } = loadConditions();
  const { languages } = loadApp();
  if (languageText[code] || languages[code]) {
    console.error(`✗ Language code "${code}" is already present. Edit it directly, do not re-apply.`);
    process.exit(1);
  }

  applyToAppJs(ws);
  applyToConditionsJs(ws);
  bumpSw();

  console.log("");
  console.log(`✓ Language "${code}" (${ws.label}) applied.`);
  console.log("  Run `npm run validate` and inspect a few diseases with");
  console.log(`  \`npm run dump <id>\` to verify the result.`);
}

function validateWorksheet(ws) {
  const errs = [];
  function check(obj, prefix) {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string" && v.startsWith("TODO:")) errs.push(`${prefix}.${k} still TODO`);
      else if (typeof v === "object" && v) check(v, `${prefix}.${k}`);
    }
  }
  check(ws.languageText, "languageText");
  check(ws.templates, "templates");
  check(ws.treatmentPhrase, "treatmentPhrase");
  check(ws.sixKey, "sixKey");
  check(ws.customTranslations, "customTranslations");

  if (errs.length) {
    console.error(`✗ ${errs.length} field${errs.length === 1 ? "" : "s"} still TODO:`);
    errs.slice(0, 20).forEach((e) => console.error("  -", e));
    if (errs.length > 20) console.error(`  ... and ${errs.length - 20} more`);
    process.exit(1);
  }
}

function applyToAppJs(ws) {
  let src = fs.readFileSync(APP_JS, "utf8");

  // 1. Add to `const languages = { ... }` — insert before closing brace.
  const langRe = /(const languages = \{[\s\S]*?)(\n\};)/;
  const langMatch = src.match(langRe);
  if (!langMatch) throw new Error("Could not find `const languages = { ... }` in app.js");
  // Ensure trailing comma on previous last entry.
  const before = langMatch[1].replace(/(\n  [a-z]{2}: "[^"]+")(\s*)$/, "$1,$2");
  src = src.replace(langRe, `${before}\n  ${ws.code}: ${JSON.stringify(ws.label)}$2`);

  // 2. Add a treatmentPhrase entry — insert before final closing `};` of the object.
  const tpRe = /(const treatmentPhrase = \{[\s\S]*?)(\n\};)/;
  const tpMatch = src.match(tpRe);
  if (!tpMatch) throw new Error("Could not find `const treatmentPhrase = { ... }` in app.js");
  const tp = ws.treatmentPhrase;
  const tpBlock = [
    `  ${ws.code}: {`,
    `    oral: { qd: ${JSON.stringify(tp.oral_qd)}, bid: ${JSON.stringify(tp.oral_bid)}, tid: ${JSON.stringify(tp.oral_tid)}, qid: ${JSON.stringify(tp.oral_qid)}, hs: ${JSON.stringify(tp.oral_hs)} },`,
    `    ointment: { different: ${JSON.stringify(tp.ointment_different)}, same: ${JSON.stringify(tp.ointment_same)} },`,
    `    acne: { morning_acne: ${JSON.stringify(tp.acne_morning_acne)}, night_acne: ${JSON.stringify(tp.acne_night_acne)}, night_comedone: ${JSON.stringify(tp.acne_night_comedone)}, night_mark: ${JSON.stringify(tp.acne_night_mark)} },`,
    `    follow: { "3": ${JSON.stringify(tp.follow_3)}, "4": ${JSON.stringify(tp.follow_4)}, "5": ${JSON.stringify(tp.follow_5)}, "7": ${JSON.stringify(tp.follow_7)}, after_meds: ${JSON.stringify(tp.follow_after_meds)}, prn: ${JSON.stringify(tp.follow_prn)} }`,
    "  }"
  ].join("\n");
  const tpBefore = tpMatch[1].replace(/(\n  \})\s*$/, "$1,");
  src = src.replace(tpRe, `${tpBefore}\n${tpBlock}$2`);

  fs.writeFileSync(APP_JS, src);
  console.log(`  ✓ app.js: ${ws.code} added to languages + treatmentPhrase`);
}

function applyToConditionsJs(ws) {
  let src = fs.readFileSync(COND_JS, "utf8");

  // 1. Append a new block inside `const languageText = { ... };`.
  const ltRe = /(const languageText = \{[\s\S]*?\n  \})(\n\};)/;
  const ltMatch = src.match(ltRe);
  if (!ltMatch) throw new Error("Could not find languageText block in conditions.js");

  const ltBlock = [
    `  ${ws.code}: {`,
    `    contagiousYes: ${JSON.stringify(ws.languageText.contagiousYes)},`,
    `    contagiousNo: ${JSON.stringify(ws.languageText.contagiousNo)},`,
    `    chronic: ${JSON.stringify(ws.languageText.chronic)},`,
    `    follow: ${JSON.stringify(ws.languageText.follow)},`,
    `    urgent: ${JSON.stringify(ws.languageText.urgent)},`,
    `    template: (d) => ({`,
    `      summary: \`${ws.templates.summary.replace(/\\/g, "\\\\").replace(/`/g, "\\`")}\`,`,
    `      explanation: \`\${d.explain.${ws.code}} \${d.contagious ? languageText.${ws.code}.contagiousYes : languageText.${ws.code}.contagiousNo}\`,`,
    `      treatment: d.treat.${ws.code},`,
    `      homeCare: d.care.${ws.code},`,
    `      warning: d.warn.${ws.code},`,
    `      followUp: d.follow.${ws.code}`,
    `    })`,
    `  }`
  ].join("\n");
  src = src.replace(ltRe, `$1,\n${ltBlock}$2`);

  // 2. Add a uk/ru-style line to commonExplain — insert before the closing `};` of the inner return object.
  src = src.replace(
    /(function commonExplain\(names, cause\) \{[\s\S]*?ko: `[^`]+`)(\s*\n  \};)/,
    `$1,\n    ${ws.code}: \`${ws.templates.commonExplain.replace(/`/g, "\\`")}\`$2`
  );

  // 3. Same for commonTreat.
  src = src.replace(
    /(function commonTreat\(kind\) \{[\s\S]*?ko: `[^`]+`)(\s*\n  \};)/,
    `$1,\n    ${ws.code}: \`${ws.templates.commonTreat.replace(/`/g, "\\`")}\`$2`
  );

  // 4. For every 6-key inline object, append `, <code>: "<translation>"` before the closing `}`.
  //    We use the indonesian `id:` value as the lookup key.
  const SIX_KEY = /\{\s*id:\s*"([^"]+)",\s*en:\s*"[^"]+",[^}]*?\}/g;
  let count = 0;
  src = src.replace(SIX_KEY, (match, id) => {
    const tr = ws.sixKey[id];
    if (tr === undefined) {
      console.error(`  ✗ Worksheet sixKey missing entry for id "${id}"`);
      process.exit(1);
    }
    // Strip trailing whitespace + closing brace, then re-add with the new key.
    const trimmed = match.replace(/\s*\}\s*$/, "");
    count++;
    return `${trimmed}, ${ws.code}: ${JSON.stringify(tr)} }`;
  });

  // 5. For customTranslations blocks, insert a new language entry before the closing `}`.
  //    These live inside item(...) calls — find every `customTranslations: {` and walk
  //    forward to the matching closing brace.
  src = injectCustomTranslations(src, ws);

  fs.writeFileSync(COND_JS, src);
  console.log(`  ✓ conditions.js: languageText + commonExplain + commonTreat updated`);
  console.log(`  ✓ conditions.js: ${count} six-key inline objects extended`);
  console.log(`  ✓ conditions.js: customTranslations extended for ${CUSTOM_TRANS_IDS.join(", ")}`);
}

function injectCustomTranslations(src, ws) {
  const openings = [];
  const marker = "customTranslations: {";
  let idx = 0;
  while ((idx = src.indexOf(marker, idx)) !== -1) {
    openings.push(idx);
    idx += marker.length;
  }
  // Walk backwards so earlier insertions don't shift later indices.
  for (let i = openings.length - 1; i >= 0; i--) {
    const start = openings[i] + marker.length;
    let depth = 1;
    let pos = start;
    while (pos < src.length && depth > 0) {
      const ch = src[pos];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      if (depth === 0) break;
      pos++;
    }
    if (depth !== 0) throw new Error("Unbalanced braces in customTranslations block");

    // Find which condition this belongs to (search backwards for `item("ID"`).
    const back = src.slice(0, openings[i]);
    const itemMatch = [...back.matchAll(/item\("([^"]+)"/g)].pop();
    const condId = itemMatch ? itemMatch[1] : null;
    const trans = condId && ws.customTranslations[condId];
    if (!trans) {
      console.error(`  ✗ Worksheet customTranslations missing entry for "${condId}"`);
      process.exit(1);
    }
    const entry = `,\n      ${ws.code}: { ${FIELDS.map((f) => `${f}: ${JSON.stringify(trans[f])}`).join(", ")} }`;
    src = src.slice(0, pos) + entry + src.slice(pos);
  }
  return src;
}

function bumpSw() {
  const src = fs.readFileSync(SW_JS, "utf8");
  const re = /const CACHE_NAME = "derm-explain-tool-v(\d+)"/;
  const m = src.match(re);
  if (!m) return;
  const next = parseInt(m[1], 10) + 1;
  fs.writeFileSync(SW_JS, src.replace(re, `const CACHE_NAME = "derm-explain-tool-v${next}"`));
  console.log(`  ✓ service-worker.js: cache version → v${next}`);
}

// =========================================================================
// shared
// =========================================================================

function collectSixKey() {
  const src = fs.readFileSync(COND_JS, "utf8");
  const result = {};
  // Single-line: { id: "...", en: "...", vi: ..., th: ..., ja: ..., ko: ... }
  const SINGLE = /\{\s*id:\s*"([^"]+)",\s*en:\s*"([^"]+)"[^}]*?\}/g;
  let m;
  while ((m = SINGLE.exec(src)) !== null) {
    if (!result[m[1]]) result[m[1]] = { en: m[2] };
  }

  // Try to associate Chinese context via the item() call's third arg (titleZh).
  // For helper objects (causes, treatmentKinds, careBasic, ...) there's no
  // titleZh; we leave zh undefined.
  const ITEM = /item\("[^"]+", "[^"]+", "([^"]+)", \{\s*id:\s*"([^"]+)"/g;
  while ((m = ITEM.exec(src)) !== null) {
    if (result[m[2]]) result[m[2]].zh = m[1];
  }
  return result;
}
