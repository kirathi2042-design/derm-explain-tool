"use strict";
// Shared utilities: load conditions.js / app.js as modules, locate item() blocks.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function loadModule(filename, exports) {
  const src = fs.readFileSync(path.join(ROOT, filename), "utf8");
  const m = { exports: {} };
  const wrap = src + (exports.length ? `\nmodule.exports = { ${exports.join(", ")} };` : "");
  // Stub browser globals so we can evaluate app.js outside a browser.
  const noop = () => {};
  const stubDocument = { addEventListener: noop, querySelector: () => null, querySelectorAll: () => [] };
  const stubWindow = { addEventListener: noop, setTimeout: noop, clearTimeout: noop };
  const stubNavigator = { serviceWorker: undefined, clipboard: undefined };
  new Function("module", "exports", "document", "window", "navigator", wrap)(
    m, m.exports, stubDocument, stubWindow, stubNavigator
  );
  return m.exports;
}

function loadConditions() {
  return loadModule("conditions.js", ["conditionTemplates", "languageText"]);
}

function loadApp() {
  return loadModule("app.js", ["languages", "treatmentPhrase"]);
}

// Walk every top-level `item("id", ...)` call and return { id → block }.
// Robust against multi-line bodies by tracking paren depth.
function extractItemBlocks() {
  const src = fs.readFileSync(path.join(ROOT, "conditions.js"), "utf8");
  const blocks = {};
  const lines = src.split("\n");
  let curId = null;
  let buf = [];
  let depth = 0;

  for (const line of lines) {
    if (curId === null) {
      const m = line.match(/^\s*item\("([^"]+)"/);
      if (!m) continue;
      curId = m[1];
      buf = [line];
      depth = countParens(line);
      if (depth === 0 && /\)[,;]?\s*$/.test(line)) {
        blocks[curId] = buf.join("\n");
        curId = null;
        buf = [];
      }
    } else {
      buf.push(line);
      depth += countParens(line);
      if (depth === 0) {
        blocks[curId] = buf.join("\n");
        curId = null;
        buf = [];
      }
    }
  }
  return blocks;
}

function countParens(line) {
  // Open minus close, but ignore parens inside double-quoted strings.
  let depth = 0;
  let inStr = false;
  let escape = false;
  for (const ch of line) {
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
  }
  return depth;
}

const FIELDS = ["summary", "explanation", "treatment", "homeCare", "warning", "followUp"];

module.exports = { ROOT, loadConditions, loadApp, extractItemBlocks, FIELDS };
