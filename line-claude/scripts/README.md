# Setup Scripts

One-shot scripts to run during initial setup. Most need a `.env` file at the
project root (or env vars exported) with at minimum:

```
LINE_CHANNEL_ACCESS_TOKEN=...
LIFF_BASE_URL=...
PUBLIC_WORKER_URL=...
```

Run with `node scripts/<name>.mjs` (requires Node 20+).
