// Writes dist/preview.html: a contact sheet of every icon (open it in a browser).
import { readFileSync, writeFileSync } from 'node:fs';
const icons = JSON.parse(readFileSync(new URL('../dist/icons.json', import.meta.url)));
const cells = Object.entries(icons)
  .map(([name, node]) => {
    const body = node.map(([t, a]) => `<${t} ${Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
    return `<figure><svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg><figcaption>${name}</figcaption></figure>`;
  })
  .join('');
writeFileSync(
  new URL('../dist/preview.html', import.meta.url),
  `<!doctype html><meta charset="utf-8"><title>Manthan icons</title><style>body{font:12px system-ui;margin:24px;color:#1f1f29}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}figure{margin:0;display:grid;justify-items:center;gap:8px;padding:16px 4px;border:1px solid #e4e4ec;border-radius:8px}figcaption{color:#666;text-align:center}</style><main>${cells}</main>`,
);
console.log('dist/preview.html written');
