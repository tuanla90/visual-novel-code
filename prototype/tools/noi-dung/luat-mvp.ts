/**
 * KIỂM CHÉO bộ MVP (đặc tả §18.9): chạy sau khi doc-mvp.ts đọc xong, trên `RawMvp`.
 *
 * Kiểm: tham chiếu tồn tại; mốc thời gian ("Mở từ", "Xuất hiện từ"); mỗi ngày một dữ kiện chính đạt được
 * trong ≤ N khung và buổi tối dẫn tới nó; mỗi địa điểm min–max dữ kiện phụ/nhiễu (không tính chính); true end đạt được và cần dữ kiện
 * phụ; nhân vật không nói trước "Xuất hiện từ"; `trừ uy tín` chỉ ở ngày họp; [TẠO NHÂN VẬT], [RẼ KẾT];
 * chuỗi lẻ; thẻ hồ sơ không ai tạo; tên cấm. Đồng thời GẮN kết quả suy ra vào dữ liệu thô: mốc đã đổi sang
 * `Moc`, mốc sớm nhất của từng chuỗi (`mocChuoi`), câu SQL nạp sẵn cho [MÀN CHIẾU … truy vấn nạp sẵn].
 *
 * Mọi lỗi có `<tệp>:<dòng>`. Không import gì từ `src/`.
 */
import { execFileSync } from 'node:child_process';
import { danhGiaDieuKien, docMoc, maTrongDieuKien, taThuTu, THU_TU_BUOI_TOI, thuTuMoc, type HauQua, type Moc } from './dieu-kien.ts';
import { loiTrongChuoi, type MucMvp, type RawChuoiMvp, type RawDuKien, type RawMvp } from './doc-mvp.ts';
import type { LoiNoiDung, ViTri } from './doc.ts';
import { docPhanUng } from './phan-ung-mvp.ts';

export interface KetQuaLuat {
  loi: LoiNoiDung[];
  /** Mốc đã đọc: nhân vật → Xuất hiện từ; địa điểm / dữ kiện → Mở từ. */
  mocNhanVat: Map<string, Moc>;
  mocDuKien: Map<string, Moc>;
  mocDiaDiem: Map<string, Moc>;
  /** Số thứ tự mốc sớm nhất mà mỗi chuỗi có thể chạy (0 = mở đầu). Chuỗi lẻ không có. */
  mocChuoi: Map<string, number>;
  /** Nhắc, KHÔNG tính lỗi (không chặn sinh): hiện chỉ có "dữ kiện chưa có dòng Ảnh". */
  canhBao: LoiNoiDung[];
}

export interface TuyChonLuatMvp {
  /**
   * Tên (không đuôi) các ảnh vật có trong `src/assets/mvp/vat/` — để kiểm sprite `obj-…` của dòng "Ảnh" tồn tại.
   * Bỏ trống = không kiểm tệp (test dựng nội dung trong bộ nhớ); `kiem-mvp`/`sinh-mvp` luôn truyền.
   */
  spriteVat?: ReadonlySet<string>;
  /** Tên (không đuôi, viết thường) mọi ảnh trong `src/assets/**` — để kiểm `[ẢNH …]`. Bỏ trống = không kiểm tệp. */
  anh?: ReadonlySet<string>;
}

type Producer = { kind: 'du-kien'; id: string } | { kind: 'the'; id: string } | { kind: 'chuoi'; id: string };

export function layCotSqlChuan(sql: string, bangCsdl?: { ten: string; cot: { ten: string }[] }[]): string[] | null {
  if (!bangCsdl) return null;
  const script = `
import initSqlJs from "sql.js";
import fs from "node:fs";
import { createRequire } from "node:module";
const req = createRequire(process.cwd() + "/");
const wasm = fs.readFileSync(req.resolve("sql.js/dist/sql-wasm.wasm"));
const SQL = await initSqlJs({ wasmBinary: wasm });
const db = new SQL.Database();
const { sql, bang } = JSON.parse(fs.readFileSync(0, "utf-8"));
for (const b of bang) {
  db.run(\`CREATE TABLE "\${b.ten}" (\${b.cot.map(c => \`"\${c.ten}" TEXT\`).join(", ")})\`);
}
const st = db.prepare(sql);
console.log(JSON.stringify(st.getColumnNames()));
`;
  try {
    const input = JSON.stringify({ sql, bang: bangCsdl });
    const out = execFileSync(process.execPath, ["--input-type=module", "-e", script], { input, encoding: "utf-8" });
    return JSON.parse(out);
  } catch (_e) {
    return null;
  }
}

export function kiemLuatMvp(mvp: RawMvp, tuyChon: TuyChonLuatMvp = {}): KetQuaLuat {
  const loi: LoiNoiDung[] = [];
  const canhBao: LoiNoiDung[] = [];
  const mocNhanVat = new Map<string, Moc>();
  const mocDuKien = new Map<string, Moc>();
  const mocDiaDiem = new Map<string, Moc>();
  const mocChuoi = new Map<string, number>();
  const kq: KetQuaLuat = { loi, mocNhanVat, mocDuKien, mocDiaDiem, mocChuoi, canhBao };
  const lich = mvp.lich;
  if (!lich) return kq;
  const khung = lich.khung;
  const err = (vt: ViTri, thongBao: string): void => void loi.push({ ...vt, thongBao });

  // ---------- Bảng tra ----------
  const nhanVat = new Map(mvp.nhanVat.map((n) => [n.id, n]));
  const canh = new Set(mvp.canh.map((c) => c.id));
  const diaDiem = new Map(mvp.diaDiem.map((d) => [d.id, d]));
  const duKien = new Map<string, RawDuKien>();
  for (const d of mvp.diaDiem) for (const k of d.duKien) duKien.set(k.id, k);
  const chuoi = new Map(mvp.chuoi.map((c) => [c.id, c]));
  /**
   * Chuỗi của một chỗ bấm [KHÁM PHÁ] có mang đầu mối nhiệm vụ không: mở manh mối / tài liệu / bằng chứng, vào màn tra, hay đi tiếp
   * truyện ([ĐI TỚI], [HẬU QUẢ] đi tới, [NẾU] → đi tới). Xét cả chuỗi của các chỗ soi lồng bên trong (không theo [ĐI TỚI] đi xa).
   * Trả câu mô tả để báo lỗi, hoặc null.
   */
  const dauMoiCua = (id: string, sau = 0): string | null => {
    const c = chuoi.get(id);
    if (!c || sau > 2) return null;
    for (const it of c.items) {
      if (it.kind === 'show-document') return `mở tài liệu ${it.id}`;
      if (it.kind === 'save-evidence') return `lưu bằng chứng ${it.id}`;
      if (it.kind === 'challenge' || it.kind === 'trial-filter') return `vào màn tra ${it.id}`;
      if (it.kind === 'goto' || it.kind === 'jump-if') return 'đi tiếp truyện';
      if (it.kind === 'consequence') {
        for (const h of it.hauQua) {
          if (h.kind === 'mo-manh-moi') return `mở manh mối ${h.id}`;
          if (h.kind === 'hien-tai-lieu') return `mở tài liệu ${h.id}`;
          if (h.kind === 'luu-bang-chung') return `lưu bằng chứng ${h.id}`;
          if (h.kind === 'di-toi') return 'đi tiếp truyện';
        }
      }
      if (it.kind === 'explore') {
        for (const d of it.diem) {
          const con = dauMoiCua(d.chuoi, sau + 1);
          if (con) return con;
        }
      }
    }
    return null;
  };
  const the = new Map(mvp.challenges.map((c) => [c.id, c]));
  const soTay = new Map(mvp.soTay.map((s) => [s.id, s]));
  /** Mọi mã vật phẩm khai báo (clue-, doc- ở hồ sơ; ev- ở hồ sơ hoặc thẻ thử thách). */
  const vatPham = new Map<string, ViTri>();
  for (const d of mvp.dossier) {
    if (!/^(clue|doc|ev)-/.test(d.id)) err(d.viTri, `thẻ hồ sơ "${d.id}" phải bắt đầu bằng clue- (giấy nhớ), doc- (tài liệu) hoặc ev- (bằng chứng)`);
    vatPham.set(d.id, d.viTri);
  }
  // Phản ứng sau mỗi lần chạy ("Khi …", QĐ-092): đúng quy ước, người nói có thật, biểu cảm có.
  for (const c of mvp.challenges) {
    const pu = docPhanUng(c.fields);
    for (const l of pu.loi) err(c.viTri, `thẻ ${c.id}: ${l}`);
    for (const p of pu.phanUng)
      for (const l of p.loi) {
        if (l.speaker === 'player' || l.speaker === 'narrator') continue;
        const n = nhanVat.get(l.speaker);
        if (!n) err(c.viTri, `thẻ ${c.id}: phản ứng có người nói lạ "${l.speaker}"`);
        else if (l.expression !== null && !n.bieuCam.includes(l.expression)) err(c.viTri, `thẻ ${c.id}: nhân vật ${l.speaker} không có biểu cảm "${l.expression}"`);
      }
  }
  for (const c of mvp.challenges) {
    const ev = c.evidence?.id;
    // Bài giữa chuỗi phòng máy (QĐ-092) không lưu gì vào hồ sơ: thẻ được phép không có vật chứng.
    if (!ev) continue;
    if (!ev.startsWith('ev-')) err(c.viTri, `vật chứng của thẻ ${c.id} phải có mã ev-…: "${ev}"`);
    const truoc = vatPham.get(ev);
    if (truoc) err(c.viTri, `bằng chứng "${ev}" khai ở cả thẻ ${c.id} lẫn hồ sơ ${truoc.tep}:${truoc.dong} — chỉ một chỗ`);
    else vatPham.set(ev, c.viTri);
  }
  // Thẻ có JOIN: "Nối được với" chỉ gồm bảng có thật, và phải chứa bảng JOIN của SQL chuẩn.
  for (const c of mvp.challenges) {
    const ds = (c.fields['Nối được với'] ?? '').split('·').map((x) => x.trim()).filter(Boolean);
    if (ds.length === 0) continue;
    const bang = new Set((mvp.duLieu?.bang ?? []).map((b) => b.ten));
    for (const b of ds) if (!bang.has(b)) err(c.viTri, `thẻ ${c.id}, "Nối được với": không có bảng "${b}" trong du-lieu.md`);
    const sql = c.sql['SQL chuẩn'] ?? '';
    for (const m of sql.matchAll(/\bJOIN\s+([A-Za-z_][A-Za-z0-9_]*)/gi)) if (m[1] && !ds.includes(m[1])) err(c.viTri, `thẻ ${c.id}, "Nối được với": thiếu bảng "${m[1]}" mà SQL chuẩn nối tới`);
  }
  // Kiểm Cột nộp (S12): Cột nộp phải có trong các cột của SQL chuẩn.
  for (const c of mvp.challenges) {
    const cotNopStr = c.fields['Cột nộp'];
    if (!cotNopStr) continue;
    const cotNopDs = cotNopStr.split(',').map((x) => x.trim()).filter(Boolean);
    const sql = c.sql['SQL chuẩn'] ?? '';
    const cotHopLe = layCotSqlChuan(sql, mvp.duLieu?.bang);
    if (cotHopLe && cotHopLe.length > 0) {
      for (const cot of cotNopDs) {
        if (!cotHopLe.includes(cot)) {
          err(c.viTri, `thẻ ${c.id}: Cột nộp "${cot}" không có trong các cột của SQL chuẩn (${cotHopLe.join(', ')})`);
        }
      }
    }
  }
  // V2 aggregate cards may use only a result card from an earlier challenge.
  const evidenceOwner = new Map(mvp.challenges.flatMap((c, i) => c.evidence ? [[c.evidence.id, { c, i }] as const] : []));
  for (const [i, c] of mvp.challenges.entries()) {
    const kind = c.fields['Kiểu'];
    const sourceId = c.fields['Nguồn'];
    const groupBy = c.fields['Nhóm theo'];
    const tongHop = kind === 'tổng hợp';
    const locTiep = kind === 'lọc tiếp';
    if (kind && !tongHop && !locTiep) err(c.viTri, `thẻ ${c.id}: "Kiểu" chỉ hỗ trợ "tổng hợp" (nhóm và đếm trên phiếu) hoặc "lọc tiếp" (lọc tiếp trên phiếu)`);
    if (!tongHop && !locTiep) {
      if (sourceId !== undefined || groupBy !== undefined) err(c.viTri, `thẻ ${c.id}: "Nguồn" và "Nhóm theo" chỉ dùng với "Kiểu: tổng hợp" hoặc "Kiểu: lọc tiếp"`);
      continue;
    }
    if (locTiep && groupBy !== undefined) err(c.viTri, `thẻ ${c.id}: "Kiểu: lọc tiếp" không có "Nhóm theo"`);
    if (!sourceId) { err(c.viTri, `thẻ ${c.id}: "Kiểu: ${kind}" cần "Nguồn: <mã-vật-chứng-của-phiếu-trước>"`); continue; }
    const owner = evidenceOwner.get(sourceId);
    if (!owner) err(c.viTri, `thẻ ${c.id}: nguồn "${sourceId}" không phải vật chứng của thẻ thử thách`);
    else if (owner.i >= i) err(c.viTri, `thẻ ${c.id}: nguồn "${sourceId}" phải thuộc thẻ thử thách đứng trước`);
    else if (!owner.c.sql['SQL chuẩn']) err(c.viTri, `thẻ ${c.id}: thẻ nguồn "${owner.c.id}" thiếu "SQL chuẩn"`);
    else if (!/^\d+$/.test(owner.c.fields['Số dòng kỳ vọng'] ?? '')) err(c.viTri, `thẻ ${c.id}: thẻ nguồn "${owner.c.id}" cần "Số dòng kỳ vọng" để máy kiểm chạy phiếu trước`);
    if (groupBy !== undefined && !/^[a-z_][a-z0-9_]*$/.test(groupBy)) err(c.viTri, `thẻ ${c.id}: "Nhóm theo" phải là một tên cột SQL đơn giản`);
    if (!c.sql['SQL chuẩn']) err(c.viTri, `thẻ ${c.id}: kiểu tổng hợp cần "SQL chuẩn"`);
    const sql = c.sql['SQL chuẩn'] ?? '';
    const placeholders = [...sql.matchAll(/\bFROM\s+@([a-z0-9-]+)/gi)].map((m) => m[1]);
    if (placeholders.length !== 1 || placeholders[0] !== sourceId) err(c.viTri, `thẻ ${c.id}: "SQL chuẩn" phải có đúng một FROM @${sourceId}`);
    if (tongHop && !/\bCOUNT\s*\(\s*\*\s*\)/i.test(sql)) err(c.viTri, `thẻ ${c.id}: SQL tổng hợp phải dùng COUNT(*)`);
    if (groupBy && !new RegExp(`\\bGROUP\\s+BY\\s+${groupBy}\\s*;?\\s*$`, 'i').test(sql.trim())) err(c.viTri, `thẻ ${c.id}: SQL tổng hợp phải GROUP BY đúng một cột "${groupBy}"`);
  }
  // Cờ đặt bằng "[HẬU QUẢ] đặt co.<x>" (hay hậu quả của một lựa chọn [RẼ NHÁNH]) dùng được trong [NẾU] / [KHI] / [ĐIỀU KIỆN].
  for (const c of mvp.chuoi) {
    for (const it of c.items) {
      const cac = it.kind === 'consequence' ? it.hauQua : it.kind === 'branch' ? it.branch.choices.flatMap((ch) => ch.hauQua) : [];
      for (const h of cac) if (h.kind === 'dat-co' && !vatPham.has(h.co)) vatPham.set(h.co, c.viTri);
    }
  }
  // Mức đạt của mỗi [ĐỐI CHẤT] là hai mã cờ dùng được trong [ĐIỀU KIỆN] / [KHI]: <mã>-du, <mã>-ho-tro.
  for (const c of mvp.chuoi) {
    for (const it of c.items) {
      if (it.kind !== 'doi-chat') continue;
      for (const duoi of ['-du', '-ho-tro']) {
        const ma = it.id + duoi;
        if (!vatPham.has(ma)) vatPham.set(ma, c.viTri);
      }
    }
  }
  // Cờ máy tự đặt khi một vụ tới [KẾT THÚC] (engine/may.ts `coKhiKet`): <mã vụ>-hoan-tat; vụ gốc thêm -ket-that / -ket-thuong.
  // Chỉ khai khi lịch có vụ sau (bộ một vụ không có ai đọc các cờ này).
  const coVu: string[] = lich.vuSau.length > 0 ? [`${lich.vu.id}-hoan-tat`, `${lich.vu.id}-ket-that`, `${lich.vu.id}-ket-thuong`, ...lich.vuSau.map((v) => `${v.id}-hoan-tat`)] : [];
  for (const ma of coVu) if (!vatPham.has(ma)) vatPham.set(ma, lich.viTri);
  const canVatPham = (id: string, vt: ViTri, tienTo: string | null, noi: string): void => {
    if (!vatPham.has(id)) err(vt, `${noi}: không có mã "${id}" (chưa khai ở ho-so/ hay thẻ thử thách)`);
    else if (tienTo && !id.startsWith(tienTo)) err(vt, `${noi}: "${id}" phải là mã ${tienTo}…`);
  };

  // ---------- Mốc thời gian ----------
  const docMocTai = (chu: string, vt: ViTri, noi: string): Moc | null => {
    try {
      return docMoc(chu, khung);
    } catch (e) {
      err(vt, `${noi}: ${(e as Error).message}`);
      return null;
    }
  };
  for (const n of mvp.nhanVat) {
    const m = docMocTai(n.xuatHienTu, n.viTri, `nhân vật ${n.id}, "Xuất hiện từ"`);
    if (m) mocNhanVat.set(n.id, m);
  }
  for (const d of mvp.diaDiem) {
    const m = docMocTai(d.moTu, d.viTri, `địa điểm ${d.id}, "Mở từ"`) ?? { kind: 'ngay', ngay: 1, khung: khung[0]?.id ?? '' };
    mocDiaDiem.set(d.id, m);
    for (const k of d.duKien) {
      const mk = k.moTu === null ? m : docMocTai(k.moTu, k.viTri, `dữ kiện ${k.id}, "Mở từ"`) ?? m;
      if (thuTuMoc(mk, khung) < thuTuMoc(m, khung)) err(k.viTri, `dữ kiện ${k.id} mở (${k.moTu ?? ''}) trước khi địa điểm ${d.id} mở (${d.moTu})`);
      mocDuKien.set(k.id, mk);
    }
  }
  const thuTuDK = (id: string): number => thuTuMoc(mocDuKien.get(id) ?? { kind: 'mo-dau' }, khung);

  // ---------- Tham chiếu: địa điểm, dữ kiện ----------
  const producers = new Map<string, Producer[]>();
  const them = (id: string, p: Producer): void => void (producers.get(id) ?? producers.set(id, []).get(id))?.push(p);
  for (const d of mvp.diaDiem) {
    if (!canh.has(d.canh)) err(d.viTri, `địa điểm ${d.id}: không có cảnh "${d.canh}" trong canh.md`);
    // QĐ-089: chỉ đếm dữ kiện phụ/nhiễu; dữ kiện chính không tính vào con số của luật.
    const n = d.duKien.filter((k) => k.nhan !== 'chinh').length;
    if (n < lich.luat.phuNhieuMin || n > lich.luat.phuNhieuMax) {
      const chinh = d.duKien.length - n;
      err(d.viTri, `địa điểm ${d.id} có ${n} dữ kiện phụ/nhiễu (không tính ${chinh} chính) — luật "Mỗi địa điểm: ${lich.luat.phuNhieuMin}–${lich.luat.phuNhieuMax} dữ kiện phụ/nhiễu" (lich.md)`);
    }
    for (const k of d.duKien) {
      if (k.chuoi !== null && !chuoi.has(k.chuoi)) err(k.viTri, `dữ kiện ${k.id}: không có chuỗi "${k.chuoi}"`);
      if (k.thuThach !== null && !the.has(k.thuThach)) err(k.viTri, `dữ kiện ${k.id}: không có thẻ thử thách "${k.thuThach}"`);
      for (const id of k.moManhMoi) {
        canVatPham(id, k.viTri, 'clue-', `dữ kiện ${k.id}, "Mở manh mối"`);
        them(id, { kind: 'du-kien', id: k.id });
      }
      for (const id of k.hienTaiLieu) {
        canVatPham(id, k.viTri, 'doc-', `dữ kiện ${k.id}, "Hiện tài liệu"`);
        them(id, { kind: 'du-kien', id: k.id });
      }
      for (const id of k.luuBangChung) {
        canVatPham(id, k.viTri, 'ev-', `dữ kiện ${k.id}, "Lưu bằng chứng"`);
        them(id, { kind: 'du-kien', id: k.id });
      }
      if (k.thuThach !== null) {
        const ev = the.get(k.thuThach)?.evidence?.id;
        if (ev) them(ev, { kind: 'du-kien', id: k.id });
      }
      if (k.can) for (const id of maTrongDieuKien(k.can)) canVatPham(id, k.viTri, null, `dữ kiện ${k.id}, "Cần"`);
    }
  }

  // ---------- Ảnh vật tương tác (dòng "- Ảnh:", QĐ-089) ----------
  for (const d of mvp.diaDiem) {
    const cungVat = new Map<string, RawDuKien>();
    for (const k of d.duKien) {
      const a = k.anh;
      if (!a) {
        canhBao.push({ ...k.viTri, thongBao: `dữ kiện ${k.id} chưa có dòng "- Ảnh:" — chỉ chọn được qua danh sách chữ` });
        continue;
      }
      const noi = `dữ kiện ${k.id}, "Ảnh"`;
      if (a.sprite.startsWith('nv:')) {
        const nv = a.sprite.slice(3).split('/')[0] ?? '';
        if (!nhanVat.has(nv)) err(k.viTri, `${noi}: không có nhân vật "${nv}" trong nhan-vat.md`);
      } else if (tuyChon.spriteVat && !tuyChon.spriteVat.has(a.sprite)) {
        err(k.viTri, `${noi}: không có ảnh vật "${a.sprite}" trong src/assets/mvp/vat/`);
      }
      for (const [ten, v] of [['x', a.x], ['y', a.y], ['rộng', a.rong]] as const) {
        if (!(v >= 0 && v <= 100)) err(k.viTri, `${noi}: ${ten} phải trong 0–100%: ${v}%`);
      }
      if (a.rong === 0) err(k.viTri, `${noi}: rộng phải lớn hơn 0%`);
      // Hai dữ kiện dùng chung một vật trong cùng nơi: runtime gộp thành MỘT điểm → phải cùng tọa độ.
      const truoc = cungVat.get(a.sprite);
      if (truoc?.anh && (truoc.anh.x !== a.x || truoc.anh.y !== a.y || truoc.anh.rong !== a.rong)) {
        err(k.viTri, `${noi}: vật "${a.sprite}" đã đặt ở dữ kiện ${truoc.id} với tọa độ khác — dùng chung một vật thì cùng x, y, rộng`);
      } else if (!truoc) cungVat.set(a.sprite, k);
    }
  }

  // ---------- Tham chiếu trong chuỗi + cạnh đồ thị ----------
  const canhChuoi = new Map<string, Set<string>>(); // chuỗi → chuỗi đi tới
  const chuaThuThach = new Map<string, Set<string>>(); // chuỗi → thẻ [THỬ THÁCH]/[SỬA TRUY VẤN]
  const reKet: ViTri[] = [];
  const taoNhanVat: { truong: 'ten' | 'nganh'; chuoi: string; idx: number; vt: ViTri }[] = [];
  const truUyTin: { chuoi: string; vt: ViTri }[] = [];
  /** Cạnh BẮT BUỘC (người chơi không tránh được): [ĐI TỚI], [HẬU QUẢ] đi tới, mọi chỗ bấm của [KHÁM PHÁ]. Không gồm lựa chọn [RẼ NHÁNH]. */
  const canhBatBuoc = new Map<string, Set<string>>();
  /** Vật phẩm một chuỗi tự tạo khi chạy qua (không tính vật phẩm của một lựa chọn [RẼ NHÁNH]). */
  const taoTrongChuoi = new Map<string, Set<string>>();
  for (const c of mvp.chuoi) {
    const dt = new Set<string>();
    const tt = new Set<string>();
    const bb = new Set<string>();
    const tao = new Set<string>();
    canhChuoi.set(c.id, dt);
    chuaThuThach.set(c.id, tt);
    canhBatBuoc.set(c.id, bb);
    taoTrongChuoi.set(c.id, tao);
    if (!canh.has(c.canh)) err(c.viTri, `chuỗi ${c.id}: không có cảnh "${c.canh}" trong canh.md`);
    c.items.forEach((it, k) => {
      const vt: ViTri = { tep: c.viTri.tep, dong: c.itemDong[k] ?? c.viTri.dong };
      const canChuoi = (id: string, noi: string): void => {
        if (!chuoi.has(id)) err(vt, `${noi}: không có chuỗi "${id}"`);
        else dt.add(id);
      };
      switch (it.kind) {
        case 'goto':
          canChuoi(it.to, '[ĐI TỚI]');
          bb.add(it.to);
          break;
        case 'go-with':
          canChuoi(it.to, '[ĐI CÙNG]');
          bb.add(it.to);
          if (c.items.indexOf(it) !== c.items.length - 1) err(vt, `[ĐI CÙNG] phải là dòng cuối của chuỗi`);
          break;
        case 'show-document':
          canVatPham(it.id, vt, 'doc-', '[HIỆN TÀI LIỆU]');
          them(it.id, { kind: 'chuoi', id: c.id });
          tao.add(it.id);
          break;
        case 'image':
          if (tuyChon.anh && !tuyChon.anh.has(it.id.toLowerCase())) err(vt, `[ẢNH ${it.id}]: không có tệp ảnh "${it.id}" (webp/png/jpg) trong src/assets/`);
          break;
        case 'save-evidence':
          canVatPham(it.id, vt, 'ev-', '[LƯU BẰNG CHỨNG]');
          them(it.id, { kind: 'chuoi', id: c.id });
          tao.add(it.id);
          break;
        case 'challenge':
        case 'fix-query': {
          const t = the.get(it.id);
          if (!t) err(vt, `[${it.kind === 'challenge' ? 'THỬ THÁCH' : 'SỬA TRUY VẤN'} ${it.id}]: không có thẻ thử thách "${it.id}"`);
          else {
            tt.add(it.id);
            if (t.evidence) {
              them(t.evidence.id, { kind: 'chuoi', id: c.id });
              tao.add(t.evidence.id);
            }
            if (it.kind === 'fix-query' && t.sql['Truy vấn nạp sẵn'] === undefined) err(vt, `[SỬA TRUY VẤN ${it.id}]: thẻ phải có "- Truy vấn nạp sẵn:" + khối sql`);
          }
          break;
        }
        case 'projector':
          if (it.source.kind === 'evidence') {
            const ev = it.source.evidenceId;
            if (!mvp.challenges.some((t) => t.evidence?.id === ev)) err(vt, `[MÀN CHIẾU ${it.id}]: không thẻ thử thách nào lưu vật chứng "${ev}"`);
          } else if (it.source.kind === 'preload') {
            const t = the.get(it.source.challengeId);
            const sql = t?.sql['Truy vấn nạp sẵn'];
            if (!t) err(vt, `[MÀN CHIẾU ${it.id}]: không có thẻ thử thách "${it.source.challengeId}"`);
            else if (sql === undefined) err(vt, `[MÀN CHIẾU ${it.id}]: thẻ "${t.id}" không có "- Truy vấn nạp sẵn:" + khối sql`);
            else it.source = { kind: 'sql', sql };
          }
          break;
        case 'question':
          if (it.choices.filter((x) => x.correct).length !== 1) err(vt, `[HỎI ${it.id}] phải có đúng một lựa chọn [ĐÚNG]`);
          if (it.choices.length < 2) err(vt, `[HỎI ${it.id}] cần ít nhất hai lựa chọn`);
          if (it.truUyTin) truUyTin.push({ chuoi: c.id, vt });
          break;
        case 'line-pick':
          if (it.truUyTin) truUyTin.push({ chuoi: c.id, vt });
          break;
        case 'doi-chat':
          // Cờ mức đạt do chuỗi này tạo (xét true end); "chính" hay không tính sau, theo các thẻ đủ căn cứ.
          them(`${it.id}-du`, { kind: 'chuoi', id: c.id });
          them(`${it.id}-ho-tro`, { kind: 'chuoi', id: c.id });
          if (!it.bangChung.some((b) => b.muc === 'du')) err(vt, `[ĐỐI CHẤT ${it.id}] cần ít nhất một thẻ [ĐỦ CĂN CỨ]`);
          if (!it.cauHoi) err(vt, `[ĐỐI CHẤT ${it.id}] thiếu dòng con "[CÂU HỎI] <câu hỏi cụ thể người chơi trả lời bằng thẻ>"`);
          {
            const dau = it.asker.text.split('**').length - 1;
            if (dau === 0 || dau % 2 !== 0) err(vt, `[ĐỐI CHẤT ${it.id}] giả thuyết phải đánh dấu chỗ cần bác bằng một cặp **…**`);
          }
          if (!it.chuaDu) err(vt, `[ĐỐI CHẤT ${it.id}] thiếu dòng con "[CHƯA ĐỦ] → phản hồi: …"`);
          if (!it.khac) err(vt, `[ĐỐI CHẤT ${it.id}] thiếu dòng con "[KHÁC] → phản hồi: …"`);
          if (!it.hetLuot) err(vt, `[ĐỐI CHẤT ${it.id}] thiếu dòng con "[HẾT LƯỢT] → phản hồi: …" (lời khi trình sai đủ số lần cho phép)`);
          for (const b of it.bangChung) canVatPham(b.id, vt, null, `[ĐỐI CHẤT ${it.id}]`);
          if (new Set(it.bangChung.map((b) => b.id)).size !== it.bangChung.length) err(vt, `[ĐỐI CHẤT ${it.id}] có thẻ khai hai lần`);
          if (it.truUyTin) truUyTin.push({ chuoi: c.id, vt });
          break;
        case 'branch':
          if (it.branch.choices.length < 2) err(vt, `[RẼ NHÁNH ${it.branch.id}] cần ít nhất hai lựa chọn`);
          {
            const cacDich = it.branch.choices.map(ch => ch.hauQua.find(h => h.kind === 'di-toi')?.chuoi);
            if (cacDich.length > 0 && cacDich.every(d => d !== undefined && d === cacDich[0])) {
              err(vt, `[RẼ NHÁNH ${it.branch.id}] mọi lựa chọn cùng dẫn về một chuỗi`);
            }
            for (const ch of it.branch.choices) {
              if (ch.text === '(Tiếp tục)' || ch.text === '(tạm)') {
                err(vt, `[RẼ NHÁNH ${it.branch.id}] có lựa chọn giả "${ch.text}"`);
              }
            }
          }
          for (const ch of it.branch.choices) {
            for (const h of ch.hauQua) kiemHauQua(h, vt, `[RẼ NHÁNH ${it.branch.id}]`, c.id, canChuoi);
            if (ch.khi) for (const id of maTrongDieuKien(ch.khi)) canVatPham(id, vt, null, `[RẼ NHÁNH ${it.branch.id}], [KHI]`);
          }
          break;
        case 'consequence':
          for (const h of it.hauQua) {
            kiemHauQua(h, vt, '[HẬU QUẢ]', c.id, canChuoi);
            if (h.kind === 'di-toi') bb.add(h.chuoi);
            else if (h.kind === 'mo-manh-moi' || h.kind === 'hien-tai-lieu' || h.kind === 'luu-bang-chung') tao.add(h.id);
          }
          break;
        case 'condition':
          for (const id of maTrongDieuKien(it.dieuKien)) canVatPham(id, vt, null, '[ĐIỀU KIỆN]');
          break;
        case 'jump-if':
          // Không phải cạnh bắt buộc: chuỗi đích chỉ chạy khi điều kiện thỏa.
          for (const id of maTrongDieuKien(it.dieuKien)) canVatPham(id, vt, null, '[NẾU]');
          canChuoi(it.chuoi, '[NẾU]');
          break;
        case 'notebook-lookup': {
          const tr = soTay.get(it.trang);
          if (!tr) err(vt, `[TRA SỔ ${it.trang}]: không có trang sổ "${it.trang}" trong so-tay/`);
          else if (tr.loai !== it.phan) err(vt, `[TRA SỔ ${it.trang} · ${it.phan}]: trang này là "${tr.loai}"`);
          break;
        }
        case 'notebook-note': {
          const tr = soTay.get(it.trang);
          if (!tr) err(vt, `[GHI SỔ ${it.trang}]: không có trang sổ "${it.trang}" trong so-tay/`);
          else if (!tr.chuThich) err(vt, `[GHI SỔ ${it.trang}]: trang phải có mục "## Vào sổ cá nhân" với dòng "- Chú thích: …"`);
          break;
        }
        case 'create-character':
          taoNhanVat.push({ truong: it.tao.truong, chuoi: c.id, idx: k, vt });
          break;
        case 'ending-branch':
          reKet.push(vt);
          if (lich.ket) {
            dt.add(lich.ket.that);
            dt.add(lich.ket.thuong);
          }
          break;
        case 'stage':
          if (!nhanVat.has(it.nhanVat)) err(vt, `[${it.action === 'vao' ? 'VÀO' : 'RA'} ${it.nhanVat}]: không có nhân vật "${it.nhanVat}"`);
          break;
        case 'explore': {
          const noi = `[KHÁM PHÁ ${it.id}]`;
          // Bản đồ phải có giờ khi có nhân vật khai "Thường ở": ảnh mặt trên ghim tính theo thứ (ngày trong truyện) và giờ này.
          if (it.kieu === 'ban-do' && !it.gio && mvp.nhanVat.some((n) => n.gioiThieu?.thuongO)) err(vt, `${noi}: bản đồ cần giờ trong truyện, vd "[KHÁM PHÁ ${it.id} · bản đồ · giờ 15:00]" (lịch nhân vật tính theo thứ và giờ)`);
          if (it.kieu === 'quan-sat' && !nhanVat.has(it.nhanVat ?? '')) err(vt, `${noi}: "quan sát ${it.nhanVat}" không phải nhân vật trong nhan-vat.md`);
          if (it.kieu === 'quan-sat' && it.dang && !(nhanVat.get(it.nhanVat ?? '')?.bieuCam ?? []).includes(it.dang)) err(vt, `${noi}: nhân vật ${it.nhanVat} không có dáng / biểu cảm "${it.dang}"`);
          if (it.diem.length === 0) err(vt, `${noi}: cần ít nhất một dòng con "  - <sprite> · x … · y … · rộng … → <chuỗi>"`);
          const cacChuoi = new Set(it.diem.map((d) => d.chuoi));
          if (cacChuoi.size !== it.diem.length) err(vt, `${noi}: hai chỗ bấm trỏ cùng một chuỗi`);
          if (it.diem.length > 0 && it.diem.every((d) => d.sau.length > 0)) err(vt, `${noi}: phải có ít nhất một chỗ hiện ngay (không "sau:")`);
          for (const d of it.diem) {
            if (d.chuoi === c.id) err(vt, `${noi}: chỗ bấm không được trỏ về chính chuỗi chứa nó`);
            canChuoi(d.chuoi, noi);
            bb.add(d.chuoi);
            for (const s of d.sau) if (!cacChuoi.has(s) || s === d.chuoi) err(vt, `${noi}: "sau: ${s}" phải là chuỗi của một chỗ bấm khác trong cùng [KHÁM PHÁ]`);
            for (const n of d.co) if (!nhanVat.has(n)) err(vt, `${noi}: "có: ${n}" không phải nhân vật trong nhan-vat.md`);
            if (d.sprite.startsWith('ghim:') || d.sprite.startsWith('vung:')) {
              if (!d.nhan) err(vt, `${noi}: điểm "${d.sprite}" cần "nhãn:" (tên nơi đến / chi tiết để người chơi đọc)`);
            } else if (d.sprite.startsWith('nv:')) {
              const nv = d.sprite.slice(3).split('/')[0] ?? '';
              if (!nhanVat.has(nv)) err(vt, `${noi}: không có nhân vật "${nv}" trong nhan-vat.md`);
            } else if (tuyChon.spriteVat && !tuyChon.spriteVat.has(d.sprite)) {
              err(vt, `${noi}: không có ảnh vật "${d.sprite}" trong src/assets/mvp/vat/`);
            }
            for (const [ten, v] of [['x', d.x], ['y', d.y], ['rộng', d.rong]] as const) {
              if (!(v >= 0 && v <= 100)) err(vt, `${noi}: ${ten} phải trong 0–100%: ${v}%`);
            }
            if (d.rong === 0) err(vt, `${noi}: rộng phải lớn hơn 0%`);
          }
          // Dấu theo vai trò (user 04/10/2026): "!" = đầu mối của nhiệm vụ đang làm (bắt buộc, hoặc mở manh mối / tài liệu /
          // bằng chứng / màn tra); "?" = chuyện thêm, đầu mối việc phụ; KHÔNG dấu = chỉ chi tiết ẩn (không bắt buộc, không mở gì).
          // Màn soi chân dung (quan sát) không dùng dấu: mọi vòng soi đều phải xem.
          if (it.kieu !== 'quan-sat' && it.diem.length > 0) {
            const coDau = it.diem.some((d) => d.dau);
            for (const d of it.diem) {
              const ten = d.nhan ?? d.sprite;
              const moGi = dauMoiCua(d.chuoi);
              // Đi tiếp truyện thì luôn là "!"; mở manh mối / tài liệu thì "!" (nhiệm vụ chính) hoặc "?" (việc phụ, tuyến bí mật
              // như mẩu chuyện quán trà đá) — chỉ không được để trống, vì không dấu là chi tiết ẩn.
              if (moGi === 'đi tiếp truyện' && d.dau !== 'chinh') err(vt, `${noi}: chỗ bấm "${ten}" đi tiếp truyện nên phải có "· dấu: !" (đầu mối nhiệm vụ)`);
              else if (moGi && !d.dau) err(vt, `${noi}: chỗ bấm "${ten}" ${moGi} nên phải có dấu: "!" nếu là đầu mối nhiệm vụ chính, "?" nếu là việc phụ`);
              // Không có dấu nào thì máy bắt xem hết mọi chỗ: chỗ bắt buộc mà không có "!" thì người chơi không biết phải tìm.
              if (!coDau) err(vt, `${noi}: chỗ bấm "${ten}" là bắt buộc (cảnh không có dấu nào) nên phải có "· dấu: !"; chỗ tùy chọn ghi "· dấu: ?", chi tiết ẩn để trống`);
            }
          }
          break;
        }
        default:
          break;
      }
    });
  }
  function kiemHauQua(h: HauQua, vt: ViTri, noi: string, chuoiId: string, canChuoi: (id: string, noi: string) => void): void {
    switch (h.kind) {
      case 'mo-manh-moi':
        canVatPham(h.id, vt, 'clue-', `${noi} mở manh mối`);
        them(h.id, { kind: 'chuoi', id: chuoiId });
        break;
      case 'hien-tai-lieu':
        canVatPham(h.id, vt, 'doc-', `${noi} hiện tài liệu`);
        them(h.id, { kind: 'chuoi', id: chuoiId });
        break;
      case 'luu-bang-chung':
        canVatPham(h.id, vt, 'ev-', `${noi} lưu bằng chứng`);
        them(h.id, { kind: 'chuoi', id: chuoiId });
        break;
      case 'di-toi':
        canChuoi(h.chuoi, `${noi} đi tới`);
        break;
      default:
        break;
    }
  }

  // ---------- Lịch: tham chiếu ----------
  const canChuoiLich = (id: string, vt: ViTri, noi: string): boolean => {
    if (chuoi.has(id)) return true;
    err(vt, `${noi}: không có chuỗi "${id}"`);
    return false;
  };
  canChuoiLich(lich.chuoiDau, lich.viTri, '"Chuỗi đầu"');
  const soNgay = lich.ngay.map((n) => n.so).sort((a, b) => a - b);
  soNgay.forEach((s, i) => {
    if (s !== i + 1) err(lich.ngay.find((n) => n.so === s)?.viTri ?? lich.viTri, `ngày phải đánh số liên tục từ 1 (gặp ngày ${s})`);
  });
  for (const n of lich.ngay) {
    if (n.kieu === 'theo-truyen') {
      if (n.chuoi) canChuoiLich(n.chuoi, n.viTri, `ngày ${n.so}, "Chuỗi"`);
      continue;
    }
    if (n.moNgay !== null) canChuoiLich(n.moNgay, n.viTri, `ngày ${n.so}, "Mở ngày"`);
    if (n.buoiToi !== '') canChuoiLich(n.buoiToi, n.viTri, `ngày ${n.so}, "Buổi tối"`);
    const dk = duKien.get(n.duKienChinh);
    if (n.duKienChinh !== '' && !dk) err({ ...n.viTri, dong: n.dongChinh }, `ngày ${n.so}: không có dữ kiện "${n.duKienChinh}" trong dia-diem.md`);
    else if (dk && dk.nhan !== 'chinh') err({ ...n.viTri, dong: n.dongChinh }, `ngày ${n.so}: dữ kiện "${dk.id}" không gắn nhãn {dữ kiện: chính}`);
  }
  if (lich.ngayHop) canChuoiLich(lich.ngayHop.chuoi, lich.ngayHop.viTri, 'ngày họp, "Chuỗi"');
  if (lich.ket) {
    canChuoiLich(lich.ket.that, lich.ket.viTri, '"Kết thật"');
    canChuoiLich(lich.ket.thuong, lich.ket.viTri, '"Kết thường"');
  }
  for (const v of lich.vuSau) canChuoiLich(v.chuoi, v.viTri, `vụ sau ${v.id}, "Chuỗi"`);
  // Nhiệm vụ phụ: người giao là nhân vật có thật; "Mở sau" là mã vụ gốc hay một vụ sau (không phải nhiệm vụ phụ khác).
  for (const v of lich.vuSau.filter((x) => x.phu)) {
    if (v.nguoiGiao !== null && !nhanVat.has(v.nguoiGiao)) err(v.viTri, `nhiệm vụ phụ ${v.id}, "Người giao": không có nhân vật "${v.nguoiGiao}" trong nhan-vat.md`);
    const vuChinh = [lich.vu.id, ...lich.vuSau.filter((x) => !x.phu).map((x) => x.id)];
    if (v.moSau !== null && !vuChinh.includes(v.moSau)) err(v.viTri, `nhiệm vụ phụ ${v.id}, "Mở sau": "${v.moSau}" không phải mã một vụ chính (có: ${vuChinh.join(', ')})`);
  }
  if (lich.vuSau.length > 0 && !lich.ket) err(lich.viTri, 'lịch có "{vụ sau: …}" nhưng vụ gốc không có mục "## Kết" để chơi tiếp từ đó');

  // ---------- Đồ thị chuỗi: mốc sớm nhất, chuỗi lẻ ----------
  const goc: { id: string; t: number }[] = [{ id: lich.chuoiDau, t: 0 }];
  for (const n of lich.ngay) {
    if (n.kieu === 'theo-truyen') {
      if (n.chuoi) goc.push({ id: n.chuoi, t: n.so * 10 + 1 });
      continue;
    }
    if (n.moNgay) goc.push({ id: n.moNgay, t: n.so * 10 + 1 });
    goc.push({ id: n.buoiToi, t: THU_TU_BUOI_TOI(n.so) });
  }
  for (const k of duKien.values()) if (k.chuoi) goc.push({ id: k.chuoi, t: thuTuDK(k.id) });
  if (lich.ngayHop) goc.push({ id: lich.ngayHop.chuoi, t: 1000 });
  if (lich.ket) goc.push({ id: lich.ket.that, t: 1000 }, { id: lich.ket.thuong, t: 1000 });
  // Vụ sau chạy sau khi vụ gốc kết: cùng mốc "ngày họp" (mọi nhân vật đã xuất hiện).
  for (const v of lich.vuSau) {
    goc.push({ id: v.chuoi, t: 1000 });
    for (const d of v.cacNgay) {
      canChuoiLich(d.chuoi, v.viTri, `vụ ${v.id}, ngày ${d.ngay}`);
      goc.push({ id: d.chuoi, t: 1000 });
    }
  }
  for (const l of lich.viecNgayLe ?? []) {
    canChuoiLich(l.chuoi, l.viTri, `việc ngày lễ ${l.id}, "Chuỗi"`);
    canChuoiLich(l.khiLo, l.viTri, `việc ngày lễ ${l.id}, "Khi lỡ"`);
    goc.push({ id: l.chuoi, t: 1000 }, { id: l.khiLo, t: 1000 });
  }
  for (const n of lich.nguoiQuen ?? []) {
    for (const v of n.viec) if (chuoi.has(v.id)) goc.push({ id: v.id, t: 1000 });
  }
  for (const c of mvp.chuoi) {
    for (const it of c.items) {
      if (it.kind === 'doi-chat' && it.nguoiQuen) {
        canChuoiLich(it.nguoiQuen.noiThay, c.viTri, `đối chất ${it.id}, nói thay`);
        goc.push({ id: it.nguoiQuen.noiThay, t: 1000 });
      }
    }
  }
  for (const g of goc) if (chuoi.has(g.id)) mocChuoi.set(g.id, Math.min(mocChuoi.get(g.id) ?? Infinity, g.t));
  let doi = true;
  while (doi) {
    doi = false;
    for (const [id, t] of mocChuoi) {
      for (const den of canhChuoi.get(id) ?? []) {
        if ((mocChuoi.get(den) ?? Infinity) > t) {
          mocChuoi.set(den, t);
          doi = true;
        }
      }
    }
  }
  for (const c of mvp.chuoi) {
    if (!mocChuoi.has(c.id)) err(c.viTri, `chuỗi "${c.id}" lẻ: không được lịch, dữ kiện nào nối tới và không có [ĐI TỚI] / "đi tới" nào dẫn tới`);
  }
  /** Chuỗi tới được từ một chuỗi (theo cạnh đi tới). */
  const toiDuoc = (tu: string): Set<string> => {
    const s = new Set<string>();
    const stack = [tu];
    while (stack.length) {
      const x = stack.pop() ?? '';
      if (s.has(x)) continue;
      s.add(x);
      for (const y of canhChuoi.get(x) ?? []) stack.push(y);
    }
    return s;
  };
  const tuHop = lich.ngayHop ? toiDuoc(lich.ngayHop.chuoi) : new Set<string>();
  // Mỗi vụ sau phải tới được ít nhất một [KẾT THÚC]; chuỗi của vụ sau không được hết nút mà không [ĐI TỚI] / [KẾT THÚC].
  for (const v of lich.vuSau) {
    if (!chuoi.has(v.chuoi)) continue;
    const den = [...toiDuoc(v.chuoi)].map((id) => chuoi.get(id)).filter((c): c is RawChuoiMvp => !!c);
    if (!den.some((c) => c.items.some((it) => it.kind === 'end'))) err(v.viTri, `vụ sau ${v.id}: từ chuỗi "${v.chuoi}" không tới được [KẾT THÚC] nào`);
    for (const c of den) {
      const cuoi = c.items[c.items.length - 1];
      const tuDi = cuoi && (cuoi.kind === 'end' || cuoi.kind === 'goto' || (cuoi.kind === 'consequence' && cuoi.hauQua.some((h) => h.kind === 'di-toi')) || (cuoi.kind === 'branch' && cuoi.branch.choices.every((ch) => ch.hauQua.some((h) => h.kind === 'di-toi'))));
      // Chuỗi của một chỗ bấm [KHÁM PHÁ] được hết nút (máy quay về cảnh khám phá).
      const laDiemKhamPha = den.some((x) => x.items.some((it) => it.kind === 'explore' && it.diem.some((d) => d.chuoi === c.id)));
      if (!tuDi && !laDiemKhamPha) err(c.viTri, `chuỗi "${c.id}" (vụ sau ${v.id}) phải kết bằng [ĐI TỚI …], [RẼ NHÁNH] có "đi tới" ở mọi lựa chọn, hoặc [KẾT THÚC]`);
    }
  }
  if (lich.vuSau.some((v) => tuHop.has(v.chuoi))) err(lich.viTri, 'chuỗi của vụ sau không được nối từ chuỗi ngày họp (vụ sau bắt đầu từ màn kết của vụ trước)');

  // ---------- Người nói: tồn tại, biểu cảm, Xuất hiện từ, chỉ qua lời kể ----------
  const kiemNguoiNoi = (speaker: string, expression: string | null, vt: ViTri, t: number | null): void => {
    if (speaker === 'player' || speaker === 'narrator') {
      if (expression !== null) err(vt, `${speaker} không ghi biểu cảm`);
      return;
    }
    const n = nhanVat.get(speaker);
    if (!n) return void err(vt, `không có nhân vật "${speaker}" trong nhan-vat.md`);
    if (n.chiQuaLoiKe) return void err(vt, `nhân vật ${speaker} "Chỉ qua lời kể: có" nên không được nói`);
    if (expression !== null && !n.bieuCam.includes(expression)) err(vt, `nhân vật ${speaker} không có biểu cảm "${expression}" (có: ${n.bieuCam.join(', ')})`);
    const xh = mocNhanVat.get(speaker);
    if (t !== null && xh) {
      const tx = thuTuMoc(xh, khung);
      if (tx > t) err(vt, `nhân vật ${speaker} nói ở chuỗi tới được từ ${taThuTu(t, khung)} nhưng "Xuất hiện từ: ${n.xuatHienTu}"`);
    }
  };
  for (const c of mvp.chuoi) {
    const t = mocChuoi.get(c.id) ?? null;
    for (const { line, dong } of loiTrongChuoi(c)) kiemNguoiNoi(line.speaker, line.expression, { tep: c.viTri.tep, dong }, t);
    c.items.forEach((it, k) => {
      const vt: ViTri = { tep: c.viTri.tep, dong: c.itemDong[k] ?? c.viTri.dong };
      if (it.kind === 'stage' && it.action === 'vao') kiemNguoiNoi(it.nhanVat, null, vt, t);
      // Người nhắc việc phải là nhân vật có hình (người kể / nhân vật chỉ qua lời kể không có mặt để hiện).
      if (it.kind === 'reminder') {
        if (it.speaker === 'narrator') err(vt, '[NHẮC VIỆC] phải do một nhân vật có hình nhắc, không phải người kể');
        else kiemNguoiNoi(it.speaker, it.expression, vt, t);
      }
    });
  }
  for (const s of mvp.soTay) for (const l of s.haVy) kiemNguoiNoi(l.speaker, l.expression, s.viTri, null);
  if (mvp.loiChung.matUyTin) {
    for (const l of [...mvp.loiChung.matUyTin.loi, mvp.loiChung.matUyTin.hetVach]) kiemNguoiNoi(l.speaker, l.expression, mvp.loiChung.matUyTin.viTri, null);
  }

  // ---------- Thẻ hồ sơ không ai tạo ----------
  for (const d of mvp.dossier) {
    if (!producers.has(d.id)) err(d.viTri, `thẻ hồ sơ "${d.id}" không được dữ kiện, thẻ thử thách, [HẬU QUẢ], [HIỆN TÀI LIỆU] hay [LƯU BẰNG CHỨNG] nào tạo ra`);
  }
  for (const c of mvp.challenges) {
    const ev = c.evidence?.id;
    if (ev && !producers.has(ev)) err(c.viTri, `thẻ ${c.id} không được dữ kiện ("Thử thách:") hay chuỗi ([THỬ THÁCH]/[SỬA TRUY VẤN]) nào mở`);
  }

  // ---------- Từng ngày: chi phí khung, dữ kiện chính, buổi tối ----------
  /** Dữ kiện tạo ra vật phẩm (đệ quy qua "Cần"), chỉ tính thẻ/chuỗi khi không có dữ kiện. */
  const duKienTao = (id: string): RawDuKien[] =>
    (producers.get(id) ?? []).filter((p): p is Producer & { kind: 'du-kien' } => p.kind === 'du-kien').map((p) => duKien.get(p.id)).filter((k): k is RawDuKien => !!k);
  const daGan = new Map<string, number>(); // dữ kiện chính → ngày
  const vatPhamChinh = new Set<string>(); // vật phẩm chỉ từ đường đi bắt buộc
  for (const n of lich.ngay) {
    const dk = duKien.get(n.duKienChinh);
    if (!dk || dk.nhan !== 'chinh') continue;
    const vtChinh: ViTri = { ...n.viTri, dong: n.dongChinh };
    const cuoiNgay = n.so * 10 + khung.length;
    if (thuTuDK(dk.id) > cuoiNgay) err(vtChinh, `ngày ${n.so}: dữ kiện chính "${dk.id}" chỉ mở từ ${taThuTu(thuTuDK(dk.id), khung)} — sau ngày ${n.so}`);
    // Bao đóng "Cần" trong cùng ngày; chi phí khung.
    const tham = new Set<string>();
    const diaDiemGhe = new Set<string>();
    let chiPhi = 0;
    const di = (k: RawDuKien): void => {
      if (tham.has(k.id)) return;
      tham.add(k.id);
      const dd = diaDiem.get(k.diaDiem);
      if (dd) {
        if (!diaDiemGhe.has(dd.id)) {
          diaDiemGhe.add(dd.id);
          chiPhi += dd.tonKhung.vao;
        }
        chiPhi += dd.tonKhung.moiDuKien;
      }
      for (const v of k.moManhMoi) vatPhamChinh.add(v);
      for (const v of k.hienTaiLieu) vatPhamChinh.add(v);
      for (const v of k.luuBangChung) vatPhamChinh.add(v);
      const evThe = k.thuThach ? the.get(k.thuThach)?.evidence?.id : undefined;
      if (evThe) vatPhamChinh.add(evThe);
      if (k.nhan === 'chinh') {
        const truoc = daGan.get(k.id);
        if (truoc !== undefined && truoc !== n.so) err(vtChinh, `dữ kiện chính "${k.id}" đã thuộc ngày ${truoc}, nay lại cần cho ngày ${n.so}`);
        daGan.set(k.id, n.so);
      }
      if (!k.can) return;
      for (const id of maTrongDieuKien(k.can)) {
        const nguon = duKienTao(id);
        if (nguon.length === 0 && !producers.has(id) && vatPham.has(id)) err(k.viTri, `dữ kiện ${k.id} "Cần" có ${id} nhưng không ai tạo ra "${id}"`);
        for (const p of nguon) {
          const ngayP = Math.floor(thuTuDK(p.id) / 10);
          if (ngayP === n.so) di(p);
          else if (ngayP > n.so) err(k.viTri, `dữ kiện ${k.id} (ngày ${n.so}) cần "${id}" nhưng ${p.id} chỉ mở từ ngày ${ngayP}`);
        }
      }
    };
    di(dk);
    if (chiPhi > lich.luat.chinhToiDaKhung) {
      err(vtChinh, `ngày ${n.so}: dữ kiện chính "${dk.id}" tốn ${chiPhi} khung (qua ${[...tham].join(' → ')}) — luật "Dữ kiện chính tối đa: ${lich.luat.chinhToiDaKhung} khung"`);
    }
    if (chiPhi > khung.length) err(vtChinh, `ngày ${n.so}: ${chiPhi} khung nhiều hơn ${khung.length} khung của một ngày`);
    // Buổi tối phải dẫn tới dữ kiện chính.
    if (chuoi.has(n.buoiToi)) {
      const den = toiDuoc(n.buoiToi);
      const toi = dk.chuoi !== null ? den.has(dk.chuoi) : [...den].some((c) => chuaThuThach.get(c)?.has(dk.thuThach ?? ''));
      if (!toi) err(n.viTri, `ngày ${n.so}: chuỗi buổi tối "${n.buoiToi}" không dẫn tới dữ kiện chính "${dk.id}" (cần [ĐI TỚI ${dk.chuoi ?? '…'}]${dk.thuThach ? ` hoặc [THỬ THÁCH ${dk.thuThach}]` : ''})`);
    }
  }
  // Vật phẩm trên đường chạy bắt buộc (mở đầu, ngày theo truyện, ngày họp): cũng coi như "chính" khi xét true end.
  {
    const goc = [lich.chuoiDau, ...lich.ngay.flatMap((n) => (n.kieu === 'theo-truyen' && n.chuoi ? [n.chuoi] : [])), ...(lich.ngayHop ? [lich.ngayHop.chuoi] : [])];
    const da = new Set<string>();
    const stack = [...goc];
    while (stack.length) {
      const x = stack.pop() ?? '';
      if (da.has(x) || !chuoi.has(x)) continue;
      da.add(x);
      for (const v of taoTrongChuoi.get(x) ?? []) vatPhamChinh.add(v);
      for (const y of canhBatBuoc.get(x) ?? []) stack.push(y);
    }
    // Cờ của [ĐỐI CHẤT] trên đường bắt buộc chỉ "chính" khi MỌI thẻ ở mức đó cũng chính (thẻ phụ → cờ cần dữ kiện phụ).
    for (const x of da) {
      for (const it of chuoi.get(x)?.items ?? []) {
        if (it.kind !== 'doi-chat') continue;
        for (const [muc, duoi] of [['du', '-du'], ['ho-tro', '-ho-tro']] as const) {
          const the = it.bangChung.filter((b) => b.muc === muc);
          if (the.length > 0 && the.every((b) => vatPhamChinh.has(b.id))) vatPhamChinh.add(it.id + duoi);
        }
      }
    }
  }
  for (const k of duKien.values()) {
    if (k.nhan === 'chinh' && !daGan.has(k.id)) err(k.viTri, `dữ kiện chính "${k.id}" không thuộc ngày nào (không là "Dữ kiện chính" của ngày nào, cũng không được dữ kiện chính nào "Cần")`);
  }

  // ---------- Lịch nhân vật: nơi "Thường ở" phải là một ghim có trên bản đồ ----------
  {
    const ghim = new Set<string>();
    for (const c of mvp.chuoi) for (const it of c.items) if (it.kind === 'explore') for (const d of it.diem) if (d.sprite.startsWith('ghim:')) ghim.add(d.sprite.slice(5));
    for (const n of mvp.nhanVat) for (const q of n.gioiThieu?.thuongO ?? []) if (!ghim.has(q.noi)) err(n.viTri, `nhân vật ${n.id}, "Thường ở": không bản đồ nào có ghim "${q.noi}" (có: ${[...ghim].sort().join(', ')})`);
  }

  // ---------- Kết, true end ----------
  if (lich.ket && chuoi.has(lich.ket.that) && chuoi.has(lich.ket.thuong)) {
    const that = chuoi.get(lich.ket.that) as RawChuoiMvp;
    const thuong = chuoi.get(lich.ket.thuong) as RawChuoiMvp;
    const dkThat = that.items[0];
    if (!dkThat || dkThat.kind !== 'condition') err(that.viTri, `chuỗi kết thật "${that.id}" phải mở đầu bằng "- [ĐIỀU KIỆN] …" (điều kiện true end)`);
    if (thuong.items.some((it) => it.kind === 'condition')) err(thuong.viTri, `chuỗi kết thường "${thuong.id}" không có [ĐIỀU KIỆN]`);
    // Chuỗi kết được [ĐI TỚI] chuỗi khác để đổi cảnh, miễn là cuối đường vẫn tới [KẾT THÚC] (máy ghi kết ngay lúc rẽ).
    const toiKet = (c: RawChuoiMvp): boolean => {
      const daQua = new Set<string>();
      let d: RawChuoiMvp | undefined = c;
      while (d && !daQua.has(d.id)) {
        daQua.add(d.id);
        const cuoi: RawChuoiMvp['items'][number] | undefined = d.items[d.items.length - 1];
        if (cuoi?.kind === 'end') return true;
        d = cuoi?.kind === 'goto' ? chuoi.get(cuoi.to) : undefined;
      }
      return false;
    };
    for (const c of [that, thuong]) if (!toiKet(c)) err(c.viTri, `chuỗi kết "${c.id}" phải kết thúc bằng [KẾT THÚC]`);
    if (dkThat && dkThat.kind === 'condition') {
      const vt: ViTri = { tep: that.viTri.tep, dong: that.itemDong[0] ?? that.viTri.dong };
      const ma = maTrongDieuKien(dkThat.dieuKien);
      const datDuoc = new Set(ma.filter((id) => producers.has(id)));
      for (const id of ma) if (vatPham.has(id) && !producers.has(id)) err(vt, `true end cần "${id}" nhưng không dữ kiện, thẻ hay chuỗi nào tạo ra nó`);
      if (!danhGiaDieuKien(dkThat.dieuKien, datDuoc, 100)) err(vt, 'điều kiện true end không thể thỏa dù có đủ mọi thứ đạt được');
      else if (danhGiaDieuKien(dkThat.dieuKien, new Set([...vatPhamChinh].filter((v) => datDuoc.has(v))), 0)) {
        err(vt, 'điều kiện true end thỏa chỉ với dữ kiện chính / đường chạy bắt buộc — true end phải cần ít nhất một dữ kiện phụ hay một lựa chọn [RẼ NHÁNH] (QĐ-086)');
      }
    }
    if (reKet.length !== 1) err(reKet[1] ?? lich.ket.viTri, `[RẼ KẾT] phải xuất hiện đúng một lần trong game (hiện ${reKet.length})`);
    for (const vt of reKet) {
      const c = mvp.chuoi.find((x) => x.viTri.tep === vt.tep && x.items.some((_, k) => x.itemDong[k] === vt.dong && x.items[k]?.kind === 'ending-branch'));
      if (c && lich.ngayHop && !tuHop.has(c.id)) err(vt, `[RẼ KẾT] phải nằm ở chuỗi tới được từ ngày họp ("${lich.ngayHop.chuoi}")`);
    }
  } else if (reKet.length > 0) err(reKet[0] as ViTri, '[RẼ KẾT] nhưng lich.md không có mục "## Kết"');

  // ---------- Uy tín ----------
  for (const u of truUyTin) {
    if (!lich.ngayHop || !tuHop.has(u.chuoi)) err(u.vt, `"trừ uy tín" chỉ dùng ở chuỗi tới được từ ngày họp${lich.ngayHop ? ` ("${lich.ngayHop.chuoi}")` : ' — lich.md chưa có "{ngày họp}"'}`);
    if (lich.luat.uyTin === null) err(u.vt, '"trừ uy tín" nhưng "## Luật" của lich.md không có "- Uy tín: <n> vạch"');
  }
  if (lich.luat.uyTin !== null && !mvp.loiChung.matUyTin) err(lich.viTri, 'lịch có "Uy tín" nhưng chung/loi-chung.md không có "### Khi mất uy tín {lời chung: mat-uy-tin}"');

  // ---------- Tạo nhân vật ----------
  for (const truong of ['ten', 'nganh'] as const) {
    const ds = taoNhanVat.filter((t) => t.truong === truong);
    // Ngành tùy chọn từ 04/10/2026 (ngành cố định ở may.ts); tên vẫn bắt buộc.
    if (truong === 'ten' ? ds.length !== 1 : ds.length > 1) err(ds[1]?.vt ?? lich.viTri, `[TẠO NHÂN VẬT ${truong}] phải xuất hiện ${truong === 'ten' ? 'đúng' : 'tối đa'} một lần trong game (hiện ${ds.length})`);
    for (const t of ds) if ((mocChuoi.get(t.chuoi) ?? 1) !== 0) err(t.vt, `[TẠO NHÂN VẬT ${truong}] phải ở mở đầu (chuỗi tới được từ "Chuỗi đầu" trước ngày 1)`);
  }
  const ten = taoNhanVat.find((t) => t.truong === 'ten');
  const nganh = taoNhanVat.find((t) => t.truong === 'nganh');
  if (ten && nganh && ten.chuoi === nganh.chuoi && ten.idx > nganh.idx) err(nganh.vt, '[TẠO NHÂN VẬT nganh] phải đứng sau [TẠO NHÂN VẬT ten]');

  // ---------- Tên cấm trong chữ hiển thị ----------
  if (mvp.tenCam.length > 0) {
    const co = (chu: string): string | null => mvp.tenCam.find((t) => chu.includes(t)) ?? null;
    const bao = (chu: string, vt: ViTri, noi: string): void => {
      const t = co(chu);
      if (t) err(vt, `${noi} có tên cấm "${t}" (quy-uoc.md "Tên cấm")`);
    };
    for (const c of mvp.chuoi) {
      for (const { line, dong } of loiTrongChuoi(c)) bao(line.text, { tep: c.viTri.tep, dong }, 'lời thoại');
      c.items.forEach((it: MucMvp, k) => {
        const vt: ViTri = { tep: c.viTri.tep, dong: c.itemDong[k] ?? c.viTri.dong };
        if (it.kind === 'task') bao(it.text, vt, 'nhiệm vụ');
        if (it.kind === 'reminder') bao(it.text, vt, 'nhắc việc');
        if (it.kind === 'question') for (const ch of it.choices) bao(ch.text, vt, 'lựa chọn');
        if (it.kind === 'doi-chat') {
          bao(it.asker.text, vt, 'giả thuyết đối chất');
          if (it.cauHoi) bao(it.cauHoi, vt, 'câu hỏi đối chất');
        }
        if (it.kind === 'branch') for (const ch of it.branch.choices) bao(ch.text, vt, 'lựa chọn');
      });
    }
    for (const d of mvp.dossier) for (const [k, v] of Object.entries(d.fields)) bao(v, d.viTri, `thẻ hồ sơ ${d.id}, "${k}"`);
    for (const d of mvp.dossier) for (const q of Object.values(d.quotes).flat()) bao(q, d.viTri, `thẻ hồ sơ ${d.id}`);
    for (const t of mvp.challenges) for (const [k, v] of Object.entries(t.fields)) bao(v, t.viTri, `thẻ ${t.id}, "${k}"`);
    for (const s of mvp.soTay) for (const l of [...s.trangChiLinh, ...s.haVy.map((x) => x.text)]) bao(l, s.viTri, `trang sổ ${s.id}`);
  }

  // ---------- Luật Mùa 1 (B1, B2) ----------
  const dsVu = [lich.vu.id, ...lich.vuSau.filter((x) => !x.phu).map((x) => x.id)];
  const thuTuVu = (id: string): number => {
    const idx = dsVu.indexOf(id);
    return idx >= 0 ? idx : 999;
  };
  const timVuCuaChuoi = (chuoiId: string): string | null => {
    for (const v of lich.vuSau) {
      if (toiDuoc(v.chuoi).has(chuoiId)) return v.id;
      for (const d of v.cacNgay) {
        if (toiDuoc(d.chuoi).has(chuoiId)) return v.id;
      }
    }
    if (toiDuoc(lich.chuoiDau).has(chuoiId)) return lich.vu.id;
    for (const n of lich.ngay) {
      if (n.chuoi && toiDuoc(n.chuoi).has(chuoiId)) return lich.vu.id;
      if (n.moNgay && toiDuoc(n.moNgay).has(chuoiId)) return lich.vu.id;
    }
    if (lich.ngayHop && toiDuoc(lich.ngayHop.chuoi).has(chuoiId)) return lich.vu.id;
    if (lich.ket) {
      if (toiDuoc(lich.ket.that).has(chuoiId)) return lich.vu.id;
      if (toiDuoc(lich.ket.thuong).has(chuoiId)) return lich.vu.id;
    }
    return null;
  };

  // B1. Vụ có hạn chót và ngày
  for (const v of lich.vuSau) {
    if (v.ngay && v.hanChot && v.hanChot < v.ngay) {
      err(v.viTri, `vụ ${v.id}: Hạn chót "${v.hanChot}" trước Ngày "${v.ngay}"`);
    }
    if (v.cacNgay && v.cacNgay.length > 0 && !v.hanChot) {
      err(v.viTri, `vụ ${v.id}: vụ thiếu Hạn chót`);
    }
    for (const d of v.cacNgay) {
      const cacChuoiCuaNgay = toiDuoc(d.chuoi);
      let coXong = false;
      let soViecChinh = 0;
      for (const cid of cacChuoiCuaNgay) {
        const ch = chuoi.get(cid);
        if (!ch) continue;
        for (const it of ch.items) {
          if (it.kind === 'xong-viec-chinh') coXong = true;
          if (it.kind === 'explore') {
            for (const diem of it.diem) {
              if (diem.dau === 'chinh') soViecChinh++;
            }
          }
        }
      }
      if (!coXong) err(v.viTri, `vụ ${v.id}, ngày ${d.ngay}: một ngày không có [XONG VIỆC CHÍNH]`);
      if (soViecChinh > 2) err(v.viTri, `vụ ${v.id}, ngày ${d.ngay}: một ngày có hơn 2 việc chính (${soViecChinh})`);
    }
  }

  // B1. Việc ngày lễ
  const ngayLeDaCo = new Map<string, string>();
  for (const le of lich.viecNgayLe ?? []) {
    const da = ngayLeDaCo.get(le.ngay);
    if (da) err(le.viTri, `hai việc ngày lễ cùng ngày "${le.ngay}": ${da} và ${le.id}`);
    else ngayLeDaCo.set(le.ngay, le.id);

    if (!nhanVat.has(le.nguoiGiao)) err(le.viTri, `việc ngày lễ ${le.id}, "Người giao": không có nhân vật "${le.nguoiGiao}" trong nhan-vat.md`);
    if (!chuoi.has(le.chuoi)) err(le.viTri, `việc ngày lễ ${le.id}, "Chuỗi": không có chuỗi "${le.chuoi}"`);
    if (!chuoi.has(le.khiLo)) err(le.viTri, `việc ngày lễ ${le.id}, "Khi lỡ": không có chuỗi "${le.khiLo}"`);

    const vuChinh = lich.vuSau.find((x) => x.id === le.thuocVu) ?? (lich.vu.id === le.thuocVu ? lich.vu : null);
    if (!vuChinh) {
      err(le.viTri, `việc ngày lễ ${le.id}, "Thuộc vụ": "${le.thuocVu}" không phải vụ hợp lệ`);
    } else if ('ngay' in vuChinh && vuChinh.ngay && 'hanChot' in vuChinh && vuChinh.hanChot) {
      if (le.ngay < vuChinh.ngay || le.ngay > vuChinh.hanChot) {
        err(le.viTri, `việc ngày lễ ${le.id}: Ngày "${le.ngay}" nằm ngoài khoảng ngày của Thuộc vụ ${le.thuocVu} (${vuChinh.ngay} → ${vuChinh.hanChot})`);
      }
    }
  }

  // B2. Người quen
  for (const nq of lich.nguoiQuen ?? []) {
    if (nq.viec.length !== 3) {
      err(nq.viTri, `người quen ${nq.id}: người quen có ít hơn hoặc hơn 3 việc (có ${nq.viec.length})`);
    }
    if (nq.moSau && !dsVu.includes(nq.moSau)) {
      err(nq.viTri, `người quen ${nq.id}, "Mở sau": "${nq.moSau}" không phải mã một vụ chính`);
    }
    for (const v of nq.viec) {
      if (!dsVu.includes(v.moSau)) {
        err(nq.viTri, `người quen ${nq.id}, việc ${v.id}: "mở sau ${v.moSau}" không phải mã một vụ chính`);
      }
    }
    let dcFound: (MucMvp & { kind: 'doi-chat' }) | null = null;
    let dcChuoiId: string | null = null;
    for (const c of mvp.chuoi) {
      for (const it of c.items) {
        if (it.kind === 'doi-chat' && it.id === nq.giupO) {
          dcFound = it;
          dcChuoiId = c.id;
          break;
        }
      }
      if (dcFound) break;
    }
    if (!dcFound) {
      err(nq.viTri, `người quen ${nq.id}: "Giúp ở" trỏ tới đối chất không tồn tại "${nq.giupO}"`);
    } else {
      if (!dcFound.nguoiQuen || dcFound.nguoiQuen.ma !== nq.id) {
        err(nq.viTri, `người quen ${nq.id}: "Giúp ở" trỏ tới đối chất "${nq.giupO}" không có dòng "[NGƯỜI QUEN ${nq.id}]" tương ứng`);
      }
      if (nq.viec.length === 3 && dcChuoiId) {
        const vuCuaDc = timVuCuaChuoi(dcChuoiId);
        const v3MoSau = nq.viec[2]?.moSau ?? '';
        if (vuCuaDc && v3MoSau && thuTuVu(v3MoSau) > thuTuVu(vuCuaDc)) {
          err(nq.viTri, `người quen ${nq.id}: mở sau của việc 3 (${v3MoSau}) muộn hơn vụ của nhịp người ấy giúp (${vuCuaDc})`);
        }
      }
    }
  }

  // B2. Đối chất có [NGƯỜI QUEN]
  for (const c of mvp.chuoi) {
    for (const it of c.items) {
      if (it.kind !== 'doi-chat') continue;
      const vt: ViTri = { tep: c.viTri.tep, dong: c.itemDong[c.items.indexOf(it)] ?? c.viTri.dong };
      if (it.nguoiQuen) {
        const duCards = it.bangChung.filter((b) => b.muc === 'du');
        if (duCards.length === 0) {
          err(vt, `[ĐỐI CHẤT ${it.id}] có [NGƯỜI QUEN] mà không có thẻ ĐỦ CĂN CỨ`);
        } else {
          const vuCuaDc = timVuCuaChuoi(c.id);
          if (vuCuaDc) {
            const coTheVuChinh = duCards.some((b) => {
              const prods = producers.get(b.id) ?? [];
              return prods.some((p) => {
                if (p.kind === 'du-kien') return true;
                if (p.kind === 'the') return true;
                if (p.kind === 'chuoi') return timVuCuaChuoi(p.id) === vuCuaDc;
                return false;
              });
            });
            if (!coTheVuChinh) {
              err(vt, `[ĐỐI CHẤT ${it.id}] có [NGƯỜI QUEN] nhưng không có thẻ ĐỦ CĂN CỨ kiếm được trong vụ chính`);
            }
          }
        }
      }
    }
  }

  // B1. Manh mối bắt buộc chỉ kiếm được ở chuỗi tùy chọn
  const chuoiTuyChon = new Set<string>();
  for (const c of mvp.chuoi) {
    for (const it of c.items) {
      if (it.kind === 'explore') {
        for (const d of it.diem) {
          if (d.dau === 'phu') {
            for (const r of toiDuoc(d.chuoi)) chuoiTuyChon.add(r);
          }
        }
      }
    }
  }
  const kiemManhMoiBatBuoc = (id: string, vt: ViTri, ten: string): void => {
    const prods = producers.get(id) ?? [];
    if (prods.length > 0) {
      const chiTuyChon = prods.every((p) => (p.kind === 'chuoi' ? chuoiTuyChon.has(p.id) : false));
      if (chiTuyChon) {
        err(vt, `${ten}: manh mối bắt buộc "${id}" chỉ kiếm được ở chuỗi tùy chọn`);
      }
    }
  };
  if (lich.ket?.that) {
    const cThat = chuoi.get(lich.ket.that);
    const dkNode = cThat?.items.find((it) => it.kind === 'condition');
    if (dkNode && dkNode.kind === 'condition') {
      for (const id of maTrongDieuKien(dkNode.dieuKien)) {
        kiemManhMoiBatBuoc(id, cThat?.viTri ?? lich.ket.viTri, 'điều kiện true end');
      }
    }
  }
  for (const c of mvp.chuoi) {
    for (const it of c.items) {
      if (it.kind === 'doi-chat') {
        for (const b of it.bangChung) {
          if (b.muc === 'du') {
            kiemManhMoiBatBuoc(b.id, c.viTri, `[ĐỐI CHẤT ${it.id}]`);
          }
        }
      }
    }
  }

  return kq;
}
