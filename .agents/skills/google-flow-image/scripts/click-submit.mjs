import fs from 'node:fs';

async function main() {
  const tabs = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
  const flowTab = tabs.find(t => t.url.includes('flow.google.com'));
  if (!flowTab) {
    console.error('No Google Flow tab found');
    process.exit(1);
  }

  const ws = new WebSocket(flowTab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  function evalJs(code) {
    return new Promise((resolve, reject) => {
      const id = Date.now();
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result?.value);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression: code, returnByValue: true } }));
    });
  }

  // Find all buttons inside or near the prompt container
  const buttonInfo = await evalJs(`
    (() => {
      const allButtons = Array.from(document.querySelectorAll('button, [role="button"]'));
      return allButtons.map(b => {
        const rect = b.getBoundingClientRect();
        return {
          tag: b.tagName,
          role: b.getAttribute('role'),
          ariaLabel: b.getAttribute('aria-label'),
          className: b.className,
          text: b.innerText,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height, bottom: rect.bottom, right: rect.right }
        };
      }).filter(b => b.rect.bottom > window.innerHeight - 200);
    })()
  `);

  console.log('Buttons near bottom:', JSON.stringify(buttonInfo, null, 2));

  // Click the rightmost button (the submit arrow)
  const clickRes = await evalJs(`
    (() => {
      const allButtons = Array.from(document.querySelectorAll('button, [role="button"]'));
      const candidate = allButtons
        .filter(b => {
          const r = b.getBoundingClientRect();
          return r.bottom > window.innerHeight - 200 && r.width > 20 && r.height > 20;
        })
        .sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right)[0];

      if (candidate) {
        candidate.click();
        return { clicked: true, ariaLabel: candidate.getAttribute('aria-label'), text: candidate.innerText };
      }
      return { clicked: false };
    })()
  `);

  console.log('Click result:', clickRes);
  ws.close();
}

main().catch(console.error);
