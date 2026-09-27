#!/usr/bin/env node
/**
 * cdp-flow.mjs - CDP Controller for Google Flow (labs.google/fx/tools/flow)
 * 
 * Zero external dependencies: uses Node 22+ native fetch and WebSocket.
 * 
 * Usage:
 *   node cdp-flow.mjs status [--port 9222]
 *   node cdp-flow.mjs list-tabs [--port 9222]
 *   node cdp-flow.mjs open [--port 9222]
 *   node cdp-flow.mjs screenshot --output <path> [--port 9222]
 *   node cdp-flow.mjs parse --file <prompts.md>
 *   node cdp-flow.mjs generate --file <prompts.md> --id <promptId> --out <destImage> [--port 9222]
 *   node cdp-flow.mjs batch --file <prompts.md> --outDir <dir> [--port 9222]
 */

import fs from 'node:fs';
import path from 'node:path';

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const options = {
    port: 9222,
    host: '127.0.0.1',
    file: null,
    id: null,
    out: null,
    outDir: './generated-assets',
    url: 'https://labs.google/fx/tools/flow',
    timeout: 120000, // 2 minutes
    retries: 2,
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--port' && args[i + 1]) options.port = parseInt(args[++i], 10);
    else if (arg === '--host' && args[i + 1]) options.host = args[++i];
    else if (arg === '--file' && args[i + 1]) options.file = args[++i];
    else if (arg === '--id' && args[i + 1]) options.id = args[++i];
    else if (arg === '--out' && args[i + 1]) options.out = args[++i];
    else if (arg === '--outDir' && args[i + 1]) options.outDir = args[++i];
    else if (arg === '--url' && args[i + 1]) options.url = args[++i];
    else if (arg === '--timeout' && args[i + 1]) options.timeout = parseInt(args[++i], 10);
    else if (arg === '--retries' && args[i + 1]) options.retries = Math.max(0, parseInt(args[++i], 10));
  }

  return { command, options };
}

// Low-level CDP Client via native WebSocket
class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 1;
    this.callbacks = new Map();
    this.eventListeners = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(new Error(`WebSocket error: ${err.message || err}`));
      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.id && this.callbacks.has(msg.id)) {
            const { resolve: res, reject: rej } = this.callbacks.get(msg.id);
            this.callbacks.delete(msg.id);
            if (msg.error) rej(new Error(`CDP Error: ${msg.error.message}`));
            else res(msg.result);
          } else if (msg.method) {
            const listeners = this.eventListeners.get(msg.method) || [];
            listeners.forEach((fn) => fn(msg.params));
          }
        } catch (e) {
          console.error('[CDP] Message parse error:', e);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, handler) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(handler);
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  async evaluate(expression, awaitPromise = true) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise,
    });
    if (res.exceptionDetails) {
      throw new Error(
        `Eval failed: ${res.exceptionDetails.exception?.description || res.exceptionDetails.text}`
      );
    }
    return res.result?.value;
  }

  async clickSelector(selector) {
    const rect = await this.evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`);
    if (!rect) return false;
    await this.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
    await this.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
    return true;
  }

  async clickText(text) {
    const rect = await this.evaluate(`(() => {
      const all = Array.from(document.querySelectorAll('button, [role="button"], [role="radio"], li, div, span'));
      const el = all.find(b => (b.innerText || '').includes(${JSON.stringify(text)}));
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`);
    if (!rect) return false;
    await this.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
    await this.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
    return true;
  }
}

// Helpers for querying Chrome DevTools HTTP JSON API
async function getJsonEndpoint(host, port, pathStr = '/json') {
  const url = `http://${host}:${port}${pathStr}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    throw new Error(`Cannot connect to Chrome on ${url}. Is Chrome running with --remote-debugging-port=${port}? Details: ${err.message}`);
  }
}

async function findGoogleFlowTab(host, port) {
  const tabs = await getJsonEndpoint(host, port, '/json/list');
  return tabs.find(
    (t) =>
      t.type === 'page' &&
      (t.url.includes('flow.google.com') ||
        t.url.includes('labs.google/fx/tools/flow') ||
        t.url.includes('labs.google/flow') ||
        t.title.toLowerCase().includes('flow'))
  );
}

// Parse markdown file with [id: ...], [type: ...], [ref: ...] prompt blocks
function parsePromptFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const codeBlockRegex = /```(?:text)?\s*([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const raw = match[1].trim();
    const idMatch = raw.match(/\[id:\s*([^\]]+)\]/i);
    const typeMatch = raw.match(/\[type:\s*([^\]]+)\]/i);
    const refMatch = raw.match(/\[ref:\s*([^\]]+)\]/i);

    if (idMatch) {
      const id = idMatch[1].trim();
      if (id.includes('<') || id.includes('>')) continue;
      if (blocks.some((block) => block.id.toLowerCase() === id.toLowerCase())) {
        throw new Error(`Duplicate prompt ID: ${id}`);
      }
      blocks.push({
        id,
        type: typeMatch ? typeMatch[1].trim() : 'image',
        ref: refMatch ? refMatch[1].trim() : null,
        prompt: raw,
      });
    }
  }

  return blocks;
}

// Main Command Implementations
async function cmdStatus(options) {
  console.log(`[Flow CDP] Checking Chrome at http://${options.host}:${options.port}...`);
  try {
    const version = await getJsonEndpoint(options.host, options.port, '/json/version');
    console.log(`✓ Chrome is online!`);
    console.log(`  Browser: ${version.Browser}`);
    console.log(`  Protocol: ${version['Protocol-Version']}`);
    console.log(`  V8: ${version['V8-Version']}`);

    const flowTab = await findGoogleFlowTab(options.host, options.port);
    if (flowTab) {
      console.log(`✓ Found Google Flow tab:`);
      console.log(`  Title: ${flowTab.title}`);
      console.log(`  URL:   ${flowTab.url}`);
      console.log(`  ID:    ${flowTab.id}`);
    } else {
      console.log(`! No active Google Flow tab found.`);
      console.log(`  Run 'node cdp-flow.mjs open' to launch Google Flow.`);
    }
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exit(1);
  }
}

async function cmdListTabs(options) {
  try {
    const tabs = await getJsonEndpoint(options.host, options.port, '/json/list');
    console.log(`Available tabs (${tabs.length}):`);
    tabs.forEach((t, idx) => {
      console.log(` [${idx}] ${t.type.padEnd(8)} | ${t.title.slice(0, 45).padEnd(45)} | ${t.url}`);
    });
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exit(1);
  }
}

async function cmdOpen(options) {
  try {
    console.log(`[Flow CDP] Opening Google Flow tab...`);
    const newTab = await getJsonEndpoint(
      options.host,
      options.port,
      `/json/new?${encodeURIComponent(options.url)}`
    );
    console.log(`✓ Tab created:`);
    console.log(`  ID:  ${newTab.id}`);
    console.log(`  URL: ${newTab.url}`);
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exit(1);
  }
}

async function cmdNavigate(options) {
  const targetUrl = options.url || 'https://flow.google.com';
  const flowTab = await findGoogleFlowTab(options.host, options.port);
  if (!flowTab) throw new Error('No Flow tab found');
  const client = new CdpClient(flowTab.webSocketDebuggerUrl);
  await client.connect();
  try {
    await client.send('Page.navigate', { url: targetUrl });
    console.log(`✓ Navigated to ${targetUrl}`);
  } finally {
    client.close();
  }
}

async function cmdClickText(options) {
  const text = options.id || options.text;
  if (!text) throw new Error('--id or text required');
  const flowTab = await findGoogleFlowTab(options.host, options.port);
  if (!flowTab) throw new Error('No Flow tab found');
  const client = new CdpClient(flowTab.webSocketDebuggerUrl);
  await client.connect();
  try {
    const res = await client.evaluate(`
      (() => {
        const els = Array.from(document.querySelectorAll('button, a, [role="button"]'));
        const target = els.find(e => (e.innerText || '').toLowerCase().includes(${JSON.stringify(text.toLowerCase())}));
        if (target) {
          target.click();
          return { clicked: true, text: target.innerText, href: target.href || null };
        }
        return { clicked: false };
      })()
    `);
    console.log('Click result:', res);
  } finally {
    client.close();
  }
}

async function cmdScreenshot(options) {
  const flowTab = await findGoogleFlowTab(options.host, options.port);
  if (!flowTab) {
    throw new Error('Google Flow tab not found. Use "open" first.');
  }

  const client = new CdpClient(flowTab.webSocketDebuggerUrl);
  await client.connect();

  try {
    await client.send('Page.enable');
    const { data } = await client.send('Page.captureScreenshot', { format: 'png' });
    const outPath = options.out || 'google-flow-screenshot.png';
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    console.log(`✓ Screenshot saved to: ${path.resolve(outPath)}`);
  } finally {
    client.close();
  }
}

async function cmdParse(options) {
  if (!options.file) {
    console.error('Error: --file argument is required.');
    process.exit(1);
  }
  const blocks = parsePromptFile(options.file);
  console.log(`Parsed ${blocks.length} prompt block(s) from ${options.file}:`);
  blocks.forEach((b, i) => {
    console.log(`\n--- [${i + 1}] ID: ${b.id} ---`);
    console.log(`Type: ${b.type} | Ref: ${b.ref || 'none'}`);
    console.log(`Prompt preview:\n${b.prompt.slice(0, 180)}...`);
  });
}

async function injectPromptAndGenerate(client, targetOrPrompt, options) {
  const promptText = typeof targetOrPrompt === 'string' ? targetOrPrompt : targetOrPrompt.prompt;
  const refId = typeof targetOrPrompt === 'object' ? targetOrPrompt.ref : null;

  // 1. Close overlay/account modal if open
  await client.clickSelector('button[aria-label="Close account panel"]');
  await new Promise((r) => setTimeout(r, 300));

  // 2. Handle Reference Ingredient
  if (refId) {
    console.log(`[Flow CDP] Attaching reference ingredient for [${refId}]...`);
    // Check if ingredient is already in prompt box
    const hasIngredient = await client.evaluate(`(() => {
      const box = document.querySelector('div[contenteditable="true"]')?.closest('[class*="prompt"]') || document.body;
      return Boolean(box.querySelector('img[src*="flow"], img[src*="blob"], [class*="chip"] img, [class*="ingredient"]'));
    })()`);

    if (!hasIngredient) {
      await client.clickSelector('button[aria-label*="Add ingredients" i]');
      await new Promise((r) => setTimeout(r, 700));

      // Select matching reference image from the media picker
      await client.evaluate(`(() => {
        const options = Array.from(document.querySelectorAll('[role="option"], .asset-card, [class*="media-item"], mat-list-item'));
        if (options.length === 0) return;
        const refKey = ${JSON.stringify(refId.toLowerCase())};
        let match = options.find(o => {
          const t = (o.innerText || o.getAttribute('aria-label') || '').toLowerCase();
          if (refKey.includes('minh-anh') && (t.includes('female student') || t.includes('minh anh') || t.includes('polo'))) return true;
          if (refKey.includes('ha-vy') && (t.includes('ha vy') || t.includes('math') || t.includes('glasses') || t.includes('cardigan'))) return true;
          if (refKey.includes('quan') && (t.includes('quan') || t.includes('t-shirt') || t.includes('jacket'))) return true;
          if (refKey.includes('hoai') && (t.includes('hoai') || t.includes('cardigan') || t.includes('braid'))) return true;
          if (refKey.includes('bac-tu') && (t.includes('tu') || t.includes('janitor') || t.includes('elderly'))) return true;
          return false;
        });

        // Default to the first/latest valid asset if not explicitly matched
        if (!match) match = options[0];
        if (match) match.click();
      })()`);

      await new Promise((r) => setTimeout(r, 500));
      // Click 'Add to prompt' button
      await client.clickSelector('.detail-add-to-prompt-btn');
      await new Promise((r) => setTimeout(r, 600));
      console.log(`✓ Reference ingredient attached!`);
    } else {
      console.log(`✓ Reference ingredient already active in prompt box.`);
    }
  } else {
    // If NO reference is required (e.g. Anchor generation), remove existing ingredient if present
    await client.evaluate(`(() => {
      const box = document.querySelector('div[contenteditable="true"]')?.closest('[class*="prompt"]') || document.body;
      const removeBtn = box.querySelector('button[aria-label*="remove" i], button[aria-label*="clear" i], button[aria-label*="close" i], [class*="remove"], [class*="close"] button');
      if (removeBtn) removeBtn.click();
    })()`);
    await new Promise((r) => setTimeout(r, 300));
  }

  // 3. Detect desired aspect ratio from promptText
  let desiredRatio = null;
  if (/3:4|portrait/i.test(promptText)) desiredRatio = '3:4';
  else if (/16:9|landscape/i.test(promptText)) desiredRatio = '16:9';
  else if (/1:1|square/i.test(promptText)) desiredRatio = '1:1';
  else if (/9:16/i.test(promptText)) desiredRatio = '9:16';
  else if (/4:3/i.test(promptText)) desiredRatio = '4:3';

  // 4. Configure aspect ratio via settings menu if needed
  if (desiredRatio) {
    const currentSettings = await client.evaluate(`(() => {
      const btn = document.querySelector('button[aria-label="Settings trigger"]');
      return btn ? btn.innerText : '';
    })()`);
    if (currentSettings && !currentSettings.includes(desiredRatio)) {
      console.log(`[Flow CDP] Setting aspect ratio to ${desiredRatio}...`);
      await client.clickSelector('button[aria-label="Settings trigger"]');
      await new Promise((r) => setTimeout(r, 500));
      await client.clickText(desiredRatio);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // 5. Capture list of currently present images so we can detect NEW images
  const existingImages = (await client.evaluate(`(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(i => i.src)
      .filter(s => s && (s.includes('flow-content.google') || s.includes('blob:')));
  })()`)) || [];
  const existingSet = new Set(existingImages);

  console.log(`[Flow CDP] Attaching to DOM and locating prompt input...`);

  // 5. Inject prompt
  const injectionScript = `
    (() => {
      const selectors = [
        'textarea[placeholder*="create" i]',
        'input[placeholder*="create" i]',
        'textarea[placeholder*="change" i]',
        'input[placeholder*="change" i]',
        'div[contenteditable="true"]',
        'textarea'
      ];
      let inputEl = null;
      for (const sel of selectors) {
        const els = Array.from(document.querySelectorAll(sel));
        const visible = els.find(e => e.offsetParent !== null);
        if (visible) {
          inputEl = visible;
          break;
        }
      }

      if (!inputEl) {
        return { success: false, error: 'Could not find visible prompt input element.' };
      }

      inputEl.focus();
      if (inputEl.tagName.toLowerCase() === 'textarea' || inputEl.tagName.toLowerCase() === 'input') {
        inputEl.value = ${JSON.stringify(promptText)};
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        inputEl.innerText = ${JSON.stringify(promptText)};
        inputEl.dispatchEvent(new InputEvent('input', { bubbles: true }));
      }

      return {
        success: true,
        inputTag: inputEl.tagName
      };
    })()
  `;

  const status = await client.evaluate(injectionScript);
  if (!status.success) {
    throw new Error(status.error);
  }
  console.log(`✓ Prompt injected successfully into ${status.inputTag}!`);
  await new Promise((r) => setTimeout(r, 400));

  // 6. Click generate button via native mouse dispatch
  console.log(`[Flow CDP] Clicking generate button...`);
  let clicked = await client.clickSelector('button[aria-label="Start generation"]');
  if (!clicked) {
    clicked = await client.clickText('arrow_forward');
  }
  if (!clicked) {
    await client.evaluate(`(() => {
      const all = Array.from(document.querySelectorAll('button, [role="button"]'));
      const btn = all.find(b => b.querySelector('svg path') && !b.disabled);
      if (btn) btn.click();
    })()`);
  }

  console.log(`[Flow CDP] Generation triggered. Waiting for completion...`);

  // 7. Polling loop to wait for generated image
  const startTime = Date.now();
  let resultImageData = null;

  while (Date.now() - startTime < options.timeout) {
    await new Promise((r) => setTimeout(r, 3000));

    const checkScript = `
      (() => {
        const imgs = Array.from(document.querySelectorAll('img'))
          .filter(img => img.src && (img.src.includes('flow-content.google') || img.src.includes('blob:') || img.naturalWidth > 400));
        
        const existing = ${JSON.stringify(Array.from(existingSet))};
        const newImg = imgs.find(img => !existing.includes(img.src) && (img.naturalWidth > 350 || img.clientWidth > 100));

        if (newImg && (newImg.naturalWidth > 350 || newImg.src.includes('flow-content.google'))) {
          return {
            ready: true,
            src: newImg.src,
            width: newImg.naturalWidth,
            height: newImg.naturalHeight
          };
        }
        return { ready: false };
      })()
    `;

    const poll = await client.evaluate(checkScript);
    if (poll && poll.ready && poll.src) {
      console.log(`✓ Image ready! Resolution: ${poll.width}x${poll.height}`);
      resultImageData = poll;
      break;
    }
    process.stdout.write('.');
  }
  console.log('');

  if (!resultImageData) {
    throw new Error(`Generation timed out after ${options.timeout / 1000}s.`);
  }

  return resultImageData;
}

async function cmdGenerate(options) {
  if (!options.file || !options.id) {
    console.error('Error: --file and --id are required.');
    process.exit(1);
  }

  const blocks = parsePromptFile(options.file);
  const target = blocks.find((b) => b.id.toLowerCase() === options.id.toLowerCase());
  if (!target) {
    console.error(`Prompt ID "${options.id}" not found in ${options.file}.`);
    console.error(`Available IDs: ${blocks.map((b) => b.id).join(', ')}`);
    process.exit(1);
  }

  const flowTab = await findGoogleFlowTab(options.host, options.port);
  if (!flowTab) {
    console.error(`✗ No Google Flow tab found on port ${options.port}. Please run 'node cdp-flow.mjs open' first.`);
    process.exit(1);
  }

  const client = new CdpClient(flowTab.webSocketDebuggerUrl);
  await client.connect();

  try {
    console.log(`[Flow CDP] Generating job: [${target.id}] (Ref: ${target.ref || 'none'})`);
    const result = await injectPromptAndGenerate(client, target, options);

    // Save image
    const outPath = options.out || path.resolve(options.outDir, `${target.id}.png`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    if (result.src.startsWith('data:image')) {
      const base64Data = result.src.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    } else {
      let saved = false;
      try {
        const fetchRes = await fetch(result.src);
        if (fetchRes.ok) {
          const buf = await fetchRes.arrayBuffer();
          fs.writeFileSync(outPath, Buffer.from(buf));
          saved = true;
        }
      } catch (err) {
        // Fallback to in-browser fetch if direct fetch fails
      }

      if (!saved) {
        const base64 = await client.evaluate(`
          (async () => {
            const resp = await fetch(${JSON.stringify(result.src)});
            const blob = await resp.blob();
            return new Promise(resolve => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          })()
        `, true);
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
      }
    }

    console.log(`✓ Image saved successfully to: ${outPath}`);
  } finally {
    client.close();
  }
}

async function cmdBatch(options) {
  if (!options.file) {
    console.error('Error: --file is required for batch.');
    process.exit(1);
  }

  const blocks = parsePromptFile(options.file);
  console.log(`[Flow CDP] Starting batch of ${blocks.length} prompts...`);

  fs.mkdirSync(options.outDir, { recursive: true });

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const outPath = path.resolve(options.outDir, `${b.id}.png`);
    console.log(`\n========================================`);
    console.log(`[${i + 1}/${blocks.length}] Generating: ${b.id}`);
    console.log(`========================================`);

    try {
      await cmdGenerate({
        ...options,
        id: b.id,
        out: outPath,
      });
      // Cooldown pause between prompts
      await new Promise((r) => setTimeout(r, 4000));
    } catch (err) {
      console.error(`✗ Failed generating ${b.id}:`, err.message);
    }
  }
  console.log(`\n✓ Batch processing completed! Output directory: ${path.resolve(options.outDir)}`);
}

async function cmdBatchWithRetries(options) {
  if (!options.file) throw new Error('--file is required for batch.');

  const blocks = parsePromptFile(options.file);
  const failures = [];
  fs.mkdirSync(options.outDir, { recursive: true });
  console.log(`[Flow CDP] Starting batch of ${blocks.length} prompts with ${options.retries} retries per asset...`);

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const outPath = path.resolve(options.outDir, `${block.id}.png`);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 20000 && !options.force) {
      console.log(`[Flow CDP] Skipping ${block.id} (already generated: ${outPath})`);
      continue;
    }

    const maxAttempts = options.retries + 1;
    let succeeded = false;
    let lastError = null;

    console.log(`[${index + 1}/${blocks.length}] Generating: ${block.id}`);
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`[Flow CDP] Attempt ${attempt}/${maxAttempts} for ${block.id}`);
        await cmdGenerate({ ...options, id: block.id, out: outPath });
        succeeded = true;
        break;
      } catch (err) {
        lastError = err;
        console.error(`[Flow CDP] Attempt ${attempt}/${maxAttempts} failed for ${block.id}: ${err.message}`);
        if (attempt < maxAttempts) await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    }

    if (!succeeded) failures.push({ id: block.id, error: lastError?.message || 'Unknown error' });
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }

  if (failures.length > 0) {
    const details = failures.map((failure) => `${failure.id}: ${failure.error}`).join('; ');
    throw new Error(`Batch completed with ${failures.length} failed asset(s): ${details}`);
  }

  console.log(`Batch processing completed successfully. Output directory: ${path.resolve(options.outDir)}`);
}

// Entrypoint
async function main() {
  const { command, options } = parseArgs();

  switch (command) {
    case 'status':
      await cmdStatus(options);
      break;
    case 'list-tabs':
      await cmdListTabs(options);
      break;
    case 'open':
      await cmdOpen(options);
      break;
    case 'navigate':
      await cmdNavigate(options);
      break;
    case 'click-text':
      await cmdClickText(options);
      break;
    case 'screenshot':
      await cmdScreenshot(options);
      break;
    case 'parse':
      await cmdParse(options);
      break;
    case 'generate':
      await cmdGenerate(options);
      break;
    case 'batch':
      await cmdBatchWithRetries(options);
      break;
    case 'sync': {
      const { syncSession } = await import('./sync-flow-session.mjs');
      syncSession();
      break;
    }
    case 'help':
    default:
      console.log(`
Google Flow CDP Automation CLI
------------------------------
Commands:
  status        Check Chrome CDP port and Google Flow tab
  list-tabs     List all open Chrome tabs
  open          Open Google Flow (labs.google/fx/tools/flow) in Chrome
  screenshot    Capture a screenshot of current Google Flow tab
  parse         Parse [id], [type], [ref] blocks from markdown prompt file
  generate      Generate a single image by ID from prompt file
  batch         Sequentially generate all prompts in file
  sync          Cleanly clone session/cookies/avatar from Profile 1 to CDP Chrome

Options:
  --port <num>      CDP port (default: 9222)
  --host <ip>       CDP host (default: 127.0.0.1)
  --file <path>     Path to markdown file containing prompts
  --id <string>     Prompt ID to generate (e.g. bg-prototype-club-room)
  --out <path>      Output file path for generated image
  --outDir <path>   Output directory for batch generation
  --timeout <ms>    Wait timeout in milliseconds (default: 120000)
  --retries <num>   Retries after the first attempt in batch mode (default: 2)
`);
      break;
  }
}

main().catch((err) => {
  console.error('[Flow CDP Fatal Error]', err.message);
  process.exit(1);
});
