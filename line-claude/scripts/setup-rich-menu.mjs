#!/usr/bin/env node
// Build and set the default rich menu for your LINE OA.
// Usage:
//   LINE_CHANNEL_ACCESS_TOKEN=... LIFF_BASE_URL=https://your.pages.dev \
//     node scripts/setup-rich-menu.mjs path/to/menu-image.jpg
//
// menu-image must be 2500x1686 (Large) or 2500x843 (Compact), JPEG/PNG.
// Use https://designer.microsoft.com / Canva / Figma to design one, or
// any 2500x1686 image; areas below assume a 2x3 grid (Large):
//
//   ┌─────────┬─────────┬─────────┐
//   │ 📷拍照  │ 🎙語音  │ 🔳掃QR  │
//   ├─────────┼─────────┼─────────┤
//   │ ✍️長文  │ 📊用量  │ ❓說明  │
//   └─────────┴─────────┴─────────┘

import fs from 'node:fs/promises';
import path from 'node:path';

const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LIFF = process.env.LIFF_BASE_URL || '';
if (!TOKEN) { console.error('LINE_CHANNEL_ACCESS_TOKEN missing'); process.exit(1); }

const imgPath = process.argv[2];
if (!imgPath) { console.error('Usage: setup-rich-menu.mjs <image.jpg>'); process.exit(1); }

const W = 2500, H = 1686;
const colW = W / 3, rowH = H / 2;

function area(col, row) {
  return { x: Math.round(col * colW), y: Math.round(row * rowH), width: Math.round(colW), height: Math.round(rowH) };
}

const menu = {
  size: { width: W, height: H },
  selected: false,
  name: 'line-claude-main',
  chatBarText: 'Claude 工具列',
  areas: [
    { bounds: area(0, 0), action: { type: 'uri', label: '拍照', uri: `${LIFF}/camera.html` } },
    { bounds: area(1, 0), action: { type: 'uri', label: '語音', uri: `${LIFF}/voice.html` } },
    { bounds: area(2, 0), action: { type: 'uri', label: '掃QR', uri: `${LIFF}/qr.html` } },
    { bounds: area(0, 1), action: { type: 'message', label: '長文', text: '寫 ' } },
    { bounds: area(1, 1), action: { type: 'message', label: '用量', text: '/quota' } },
    { bounds: area(2, 1), action: { type: 'message', label: '說明', text: '/help' } },
  ],
};

async function api(path, init = {}) {
  const res = await fetch(`https://api.line.me${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json().catch(() => ({}));
}

console.log('Creating rich menu…');
const created = await api('/v2/bot/richmenu', {
  method: 'POST',
  body: JSON.stringify(menu),
});
const id = created.richMenuId;
console.log('richMenuId:', id);

console.log('Uploading image…');
const buf = await fs.readFile(imgPath);
const ext = path.extname(imgPath).toLowerCase();
const ct = ext === '.png' ? 'image/png' : 'image/jpeg';
const up = await fetch(`https://api-data.line.me/v2/bot/richmenu/${id}/content`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': ct },
  body: buf,
});
if (!up.ok) { console.error('Upload failed:', up.status, await up.text()); process.exit(1); }

console.log('Setting as default…');
await api(`/v2/bot/user/all/richmenu/${id}`, { method: 'POST' });
console.log('✓ Done. Open your LINE chat with the bot to see it.');
