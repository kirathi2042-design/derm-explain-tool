#!/usr/bin/env bash
# Spin up a local static server for browser/PWA testing.
# Run: npm run serve            (default port 4173)
#      npm run serve -- 8080    (custom port)

set -e
PORT="${1:-4173}"
cd "$(dirname "$0")/.."
echo "Serving https-less PWA preview on http://localhost:$PORT/"
echo "Open in Safari to test service-worker behaviour (Cmd+Opt+I for console)."
echo "Press Ctrl+C to stop."
exec python3 -m http.server "$PORT"
