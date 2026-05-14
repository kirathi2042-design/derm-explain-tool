// Generate a printable HTML document.
// Why HTML and not PDF: Cloudflare Workers can't embed large CJK fonts cheaply.
// HTML renders CJK perfectly using the device's system font, and iOS Safari
// has a built-in "Print > Save to PDF" (the share sheet) for users who want
// an actual PDF file.

export function generateHtmlDoc(title: string, markdown: string): string {
  const safe = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

  const html = mdToHtml(markdown);

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${safe(title)}</title>
<style>
  :root { color-scheme: light; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC",
                 "Hiragino Sans", "Microsoft JhengHei", sans-serif;
    line-height: 1.7;
    color: #222;
    max-width: 720px;
    margin: 32px auto;
    padding: 0 20px 80px;
  }
  h1 { font-size: 24px; border-bottom: 2px solid #06c755; padding-bottom: 8px; }
  h2 { font-size: 18px; margin-top: 28px; }
  h3 { font-size: 16px; }
  p, li { font-size: 15px; }
  pre, code { font-family: ui-monospace, Menlo, monospace; background: #f5f5f7; padding: 2px 6px; border-radius: 4px; }
  pre { padding: 12px; overflow-x: auto; }
  blockquote { border-left: 3px solid #ccc; margin: 16px 0; padding: 0 16px; color: #555; }
  .meta { color: #888; font-size: 13px; margin-bottom: 24px; }
  .hint { background: #f7faff; border: 1px solid #d9e6ff; padding: 12px 14px; border-radius: 8px; font-size: 13px; color: #345; margin: 20px 0; }
  @media print { .hint { display: none; } body { margin: 0; max-width: none; } }
</style>
</head>
<body>
<h1>${safe(title)}</h1>
<div class="meta">由 Claude 產生 · ${new Date().toLocaleString("zh-TW")}</div>
<div class="hint">📱 想存成 PDF：點右下分享 → 列印 → 雙指放大預覽 → 分享 → 儲存到檔案。</div>
${html}
</body>
</html>`;
}

// Minimal markdown → HTML. Not a full parser; covers headings, lists, code,
// bold/italic/links, paragraphs.
function mdToHtml(md: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

  const lines = md.split(/\n/);
  const out: string[] = [];
  let inCode = false;
  let inList = false;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    out.push(`<p>${inlineFormat(para.join(" "))}</p>`);
    para = [];
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw;
    if (line.trim().startsWith("```")) {
      flushPara();
      closeList();
      if (inCode) {
        out.push("</code></pre>");
        inCode = false;
      } else {
        out.push("<pre><code>");
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      out.push(escapeHtml(line));
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length + 1;
      out.push(`<h${level}>${inlineFormat(h[2])}</h${level}>`);
      continue;
    }
    const li = line.match(/^\s*[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inlineFormat(li[1])}</li>`);
      continue;
    }
    if (line.trim().length === 0) {
      flushPara();
      closeList();
      continue;
    }
    closeList();
    para.push(line);
  }
  flushPara();
  closeList();
  if (inCode) out.push("</code></pre>");
  return out.join("\n");
}

function inlineFormat(s: string): string {
  const escape = (x: string) =>
    x.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
  return escape(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, u) => `<a href="${u}">${t}</a>`);
}
