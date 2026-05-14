// Shared LIFF helpers loaded on every page after the LIFF SDK.
// Reads ./config.json (deployed alongside the static pages) for runtime config.

window.LC = (() => {
  let cfg = null;
  let initPromise = null;

  async function loadConfig() {
    if (cfg) return cfg;
    const r = await fetch('./config.json', { cache: 'no-store' });
    cfg = await r.json();
    return cfg;
  }

  async function ready() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      const c = await loadConfig();
      await liff.init({ liffId: c.liffId });
      if (!liff.isLoggedIn()) {
        liff.login();
        await new Promise(() => {}); // halt; redirect imminent
      }
      return c;
    })();
    return initPromise;
  }

  async function api(path, init) {
    const c = await ready();
    const idToken = liff.getIDToken();
    const headers = new Headers(init?.headers);
    if (!(init?.body instanceof FormData)) {
      headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json');
    }
    if (idToken) headers.set('x-liff-id-token', idToken);
    const res = await fetch(c.workerUrl + path, { ...init, headers });
    return res;
  }

  function setStatus(el, text, spinning = false) {
    if (!el) return;
    el.innerHTML = (spinning ? '<span class="spinner"></span> ' : '') + escapeHtml(text);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  return { ready, api, setStatus, escapeHtml, loadConfig };
})();
