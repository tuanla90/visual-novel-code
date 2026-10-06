// QUAY MỘT VÁN CHƠI: mở game trong Chrome không cửa sổ, tự chơi Vụ 1 của bộ mùa 1 từ đầu tới kết, chụp màn hình thật
// và ghi lại từng câu chữ. Kết quả là "bảng phân cảnh" để người (hay model khác) đọc như đang xem người ta chơi:
// ảnh nào đi với câu nào, ai đứng trên hình lúc ai nói.
//
// Dùng: bật dev server của prototype (mặc định http://localhost:5174), rồi
//   node tools/quay-van/quay.mjs --ra <thư mục> [--url http://localhost:5174] [--toi-da 2500] [--rong 1600 --cao 900]
// Không cần cài gì thêm: nói chuyện với Chrome qua cổng gỡ lỗi (CDP) bằng WebSocket có sẵn của Node 22+.
//
// Cách chơi: câu thoại thì BẤM nút "Tiếp tục" thật (để thẻ "Nhân vật mới" bật như người chơi thấy); các màn khác đi theo
// máy tự chơi của game (`tu-choi.ts`, đường kết thật), nên màn tra chỉ được chụp lúc mới mở.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

const thamSo = (ten, macDinh) => {
  const i = process.argv.indexOf(`--${ten}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : macDinh;
};
const RA = resolve(thamSo('ra', 'quay-ra'));
const URL_GAME = thamSo('url', 'http://localhost:5174');
const TOI_DA = Number(thamSo('toi-da', '2500'));
const RONG = Number(thamSo('rong', '1600'));
const CAO = Number(thamSo('cao', '900'));
const CONG = Number(thamSo('cong', '9377'));
const DUNG_O = thamSo('dung-o', ''); // mã chuỗi: tới chuỗi này thì dừng (để quay một đoạn)
const CHROME = thamSo('chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe');

const ngu = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(join(RA, 'anh'), { recursive: true });
const hoSo = join(RA, 'chrome-ho-so');
if (existsSync(hoSo)) rmSync(hoSo, { recursive: true, force: true });

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${CONG}`, `--user-data-dir=${hoSo}`, `--window-size=${RONG},${CAO}`,
  '--mute-audio', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank',
], { stdio: 'ignore' });
const dong = () => { try { chrome.kill(); } catch { /* đã tắt */ } };
process.on('exit', dong);

async function trang() {
  for (let i = 0; i < 60; i++) {
    try {
      const ds = await (await fetch(`http://127.0.0.1:${CONG}/json/list`)).json();
      const t = ds.find((x) => x.type === 'page');
      if (t) return t.webSocketDebuggerUrl;
    } catch { /* Chrome chưa lên */ }
    await ngu(250);
  }
  throw new Error('Không nối được Chrome');
}

const ws = new WebSocket(await trang());
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let ma = 0;
const cho = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && cho.has(m.id)) {
    const { r, j } = cho.get(m.id);
    cho.delete(m.id);
    if (m.error) j(new Error(m.error.message)); else r(m.result);
  }
};
const cdp = (method, params = {}) => new Promise((r, j) => { const id = ++ma; cho.set(id, { r, j }); ws.send(JSON.stringify({ id, method, params })); });
const chay = async (bieuThuc) => {
  const kq = await cdp('Runtime.evaluate', { expression: bieuThuc, awaitPromise: true, returnByValue: true });
  if (kq.exceptionDetails) throw new Error(`Lỗi trong trang: ${kq.exceptionDetails.exception?.description ?? kq.exceptionDetails.text}`);
  return kq.result.value;
};

await cdp('Page.enable');
await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: RONG, height: CAO, deviceScaleFactor: 1, mobile: false });
await cdp('Page.navigate', { url: `${URL_GAME}/?bo=mua-1` });
await ngu(4000);

// Mã chạy trong trang: lấy kho trạng thái và máy của game qua cổng dev `window.__clbQuay` (src/mvp/dev/cong-quay.ts).
const CAI = `(async () => {
  if (window.__quay) return 'co-san';
  for (let i = 0; i < 40 && !window.__clbQuay; i++) await new Promise((r) => setTimeout(r, 250));
  const C = window.__clbQuay;
  if (!C) throw new Error('Trang không có cổng quay (__clbQuay): phải chạy bằng dev server');
  const kho = { useKhoMvp: C.kho }, may = C, tu = C, vn = { useVnStore: C.vn };
  const KB = C.KB;
  const CT = { ten: 'Nam', reNhanh: tu.reNhanhTheo(tu.RE_NHANH_KET_THAT) };
  const nut = (chu) => [...document.querySelectorAll('button')].filter((b) => !b.disabled && b.getClientRects().length > 0 && (b.textContent || '').trim().startsWith(chu));
  const theMo = () => document.querySelector('.chara-debut, .chara-debut__card, [class*="chara-debut"]');
  const ten = (id) => id === 'player' ? 'Người chơi' : id === 'narrator' ? 'Lời dẫn' : (KB.nhanVat.find((n) => n.id === id)?.ten ?? id);
  const xem = () => {
    const s = kho.useKhoMvp.getState().trangThai;
    if (!s) return { kind: 'chua-co-van' };
    const kn = may.khungNhin(KB, s);
    const o = { kind: kn.kind, chuoi: s.conTro?.chuoi ?? null, nut: s.conTro?.nut ?? null, canh: s.canh, tenCanh: KB.canh.find((c) => c.id === s.canh)?.ten ?? s.canh,
      ngay: s.ngay, giaiDoan: s.giaiDoan, ngayThang: s.ngayThang ?? null, nhiemVu: s.nhiemVu ?? null,
      dan: [...document.querySelectorAll('.cast-member')].map((e) => ten(e.getAttribute('data-nhan-vat') || '')),
      diCung: [...document.querySelectorAll('.dong-hanh__nguoi')].map((e) => (e.getAttribute('aria-label') || '').replace('Trò chuyện với ', '')),
      the: !!theMo(), dangGo: !!vn.useVnStore.getState().lineTyping };
    if (o.the) o.chuThe = (theMo().textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 200);
    if (kn.kind === 'line' || kn.kind === 'feedback') {
      o.nguoiNoi = ten(kn.loi.speaker); o.maNguoiNoi = kn.loi.speaker; o.tenHien = may.tenNguoiNoi(KB, kn.loi.speaker, s); o.bieuCam = kn.loi.expression ?? null;
      o.chu = may.dienTen(KB, s, kn.loi.text); o.theChu = kn.display === 'card';
    } else if (kn.kind === 'explore') {
      o.kieu = kn.nut.kieu ?? 'canh'; o.maKhamPha = kn.nut.id;
      o.diem = kn.diem.map((d) => ({ nhan: d.diem.nhan ?? d.diem.chuoi, dau: d.diem.dau ?? '', daXem: d.daXem }));
      o.roi = kn.roi?.nhan ?? null;
    } else if (kn.kind === 'branch' || kn.kind === 'question') {
      o.hoi = may.dienTen(KB, s, kn.nut.asker?.text ?? ''); o.luaChon = (kn.luaChon ?? kn.nut.choices).map((c) => may.dienTen(KB, s, c.text));
    } else if (kn.kind === 'challenge' || kn.kind === 'fix-query') {
      o.thuThach = kn.thuThach.id; o.tieuDe = kn.thuThach.title ?? kn.thuThach.tieuDe ?? ''; o.deBai = may.dienTen(KB, s, kn.thuThach.prompt ?? kn.thuThach.deBai ?? '');
    } else if (kn.kind === 'hoi-dap') {
      o.nhanChung = ten(kn.hoiDap.nhanChung); o.cachChoi = kn.hoiDap.cachChoi;
      o.nhatKy = kn.hoiDap.nhatKy.map((d) => ({ ai: ten(d.ai), chu: may.dienTen(KB, s, d.chu) }));
      o.danhSach = kn.hoiDap.danhSach.map((d) => ({ cau: d.cau, xong: d.xong })); o.daRoi = kn.hoiDap.daRoi;
    } else if (kn.kind === 'image') { o.anhChen = kn.imageId ?? kn.nut?.imageId ?? '';
    } else if (kn.kind === 'show-document') { o.taiLieu = kn.taiLieu?.title ?? kn.taiLieu?.id ?? '';
    } else if (kn.kind === 'create-character') { o.hoi = kn.nut.asker?.text ?? '';
    } else if (kn.kind === 'doi-chat') { o.giaThuyet = kn.nut.giaThuyet ?? ''; o.cauHoi = kn.nut.cauHoi ?? '';
    } else if (kn.kind === 'end') { o.ketQua = kn.ketQua;
    } else if (kn.kind === 'error') { o.loi = kn.message; }
    return o;
  };
  const di = (epMay) => {
    const the = theMo();
    if (the) { const b = [...the.querySelectorAll('button')].find((x) => !x.disabled); if (b) { b.click(); return 'dong-the'; } }
    const st = kho.useKhoMvp.getState(); const s = st.trangThai; if (!s) return 'khong-van';
    const kn = may.khungNhin(KB, s);
    if (kn.kind === 'end' || kn.kind === 'error') return 'het';
    if (!epMay && (kn.kind === 'line' || kn.kind === 'feedback')) {
      const b = nut('Tiếp tục')[0];
      if (b) { b.click(); return 'bam'; }
    }
    // Một bước của máy tự chơi: dừng ở lần xét thứ hai.
    let lan = 0;
    const sau = tu.choiTuDong(KB, s, CT, () => lan++ > 0, 5);
    if (sau === s) return 'dung-yen';
    st.datTrangThai ? kho.useKhoMvp.setState({ trangThai: sau }) : kho.useKhoMvp.setState({ trangThai: sau });
    return 'may';
  };
  window.__quay = { xem, di };
  return 'da-cai';
})()`;

const batDau = `(() => {
  // Gói B17: sau "Chơi mới" là màn hai câu hỏi (mức nhập vai, mức SQL); công cụ quay nhận nấc chọn sẵn ("Tự dò" + "Ghép khối") và bấm "Bắt đầu".
  const nutBatDau = document.querySelector('.mvp-chon-muc__xong');
  if (nutBatDau) { nutBatDau.click(); return 'da-bam-bat-dau'; }
  const el = [...document.querySelectorAll('button, [role="button"], a, div, span')].filter((e) => /^\\s*(▶\\s*)?chơi mới\\s*$/i.test(e.textContent || '')).pop();
  if (!el) return 'khong-thay';
  (el.closest('button') ?? el).click();
  return 'da-bam';
})()`;
console.log('Bắt đầu ván:', await chay(batDau));
await ngu(1500);
console.log('Cài mã quay:', await chay(CAI));

const chup = async (so) => {
  const { data } = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
  const ten = `f-${String(so).padStart(4, '0')}.jpg`;
  writeFileSync(join(RA, 'anh', ten), Buffer.from(data, 'base64'));
  return ten;
};

const buoc = [];
let soAnh = 0;
let dauTruoc = '';
let khongAnh = 0;
let khoaTruoc = '';
let ket = 0;
for (let i = 0; i < TOI_DA; i++) {
  // Chờ chữ gõ xong, hình đứng yên.
  let o = null;
  for (let k = 0; k < 40; k++) {
    try { o = await chay('window.__quay ? window.__quay.xem() : null'); } catch { o = null; }
    if (o === null) { await ngu(1500); await chay(CAI).catch(() => {}); continue; } // trang vừa tải lại
    if (!o.dangGo) break;
    await ngu(200);
  }
  if (!o) throw new Error('Mất nối với trang');
  if (o.kind === 'chua-co-van') { await ngu(800); await chay(batDau); await ngu(1200); continue; }
  await ngu(o.kind === 'line' ? 380 : 900);
  o = await chay('window.__quay.xem()');
  const khoa = JSON.stringify([o.kind, o.chuoi, o.nut, o.the, o.nhatKy?.length ?? 0, o.diem?.filter((d) => d.daXem).length ?? 0, o.daRoi ?? false]);
  if (khoa === khoaTruoc) {
    // Đứng yên: thử đi tiếp vài lần rồi mới bỏ cuộc.
    if (++ket > 6) { console.log('KẸT ở', khoa); buoc.push({ ...o, ket: true }); break; }
  } else {
    ket = 0;
    khoaTruoc = khoa;
    // Chụp khi bố cục hình đổi (cảnh, loại màn, người trên dàn, thẻ), hoặc lâu chưa chụp.
    const dau = JSON.stringify([o.kind, o.canh, o.dan, o.the, o.theChu ?? false, o.kind === 'line' ? '' : khoa]);
    let anh = null;
    if (dau !== dauTruoc || khongAnh >= 5) { anh = await chup(++soAnh); dauTruoc = dau; khongAnh = 0; } else khongAnh++;
    buoc.push({ so: buoc.length + 1, anh, ...o });
    if (buoc.length % 50 === 0) console.log(`  ${buoc.length} bước, ${soAnh} ảnh, đang ở ${o.chuoi} (${o.kind})`);
    if (o.kind === 'end' || o.kind === 'error') break;
    if (DUNG_O && o.chuoi === DUNG_O) break;
  }
  const kq = await chay(`window.__quay.di(${ket >= 2})`);
  if (kq === 'het') break;
  await ngu(kq === 'dong-the' ? 700 : 160);
}
writeFileSync(join(RA, 'buoc.json'), JSON.stringify(buoc, null, 1), 'utf8');
console.log(`Xong: ${buoc.length} bước, ${soAnh} ảnh → ${RA}`);
ws.close();
dong();
process.exit(0);
