#!/usr/bin/env node
"use strict";
// Increment the service worker cache version. Forces PWAs on the home
// screen to install the new bundle on next launch.
//
// Run: npm run bump-sw

const fs = require("fs");
const path = require("path");
const { ROOT } = require("./lib.js");

const SW = path.join(ROOT, "service-worker.js");
const src = fs.readFileSync(SW, "utf8");
const re = /const CACHE_NAME = "derm-explain-tool-v(\d+)"/;
const m = src.match(re);
if (!m) {
  console.error("Could not find CACHE_NAME in service-worker.js");
  process.exit(1);
}

const cur = parseInt(m[1], 10);
const next = cur + 1;
fs.writeFileSync(SW, src.replace(re, `const CACHE_NAME = "derm-explain-tool-v${next}"`));
console.log(`✓ Service worker cache: v${cur} → v${next}`);
console.log("  Commit + push, then click the in-app ⟳ button on any device");
console.log("  still showing the old version.");
