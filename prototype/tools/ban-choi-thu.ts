/**
 * BẢN CHƠI THỬ DẠNG CHỮ của một vụ (hay nhiệm vụ phụ) — để đưa cho người/model không bấm được game đọc, "chơi" và góp ý.
 *
 *   node --import ./tools/noi-dung/nap-ts.mjs tools/ban-choi-thu.ts <mã vụ | mã nhiệm vụ phụ | chuỗi đầu> [tệp ra]
 *
 * Đi theo chuỗi từ đầu: in lời thoại, nhiệm vụ, thẻ hồ sơ nhận được, câu hỏi và lựa chọn, rẽ nhánh (in từng nhánh một lần),
 * thẻ thử thách (đề bài, bảng dữ liệu, giấy nhớ đang có, SQL chuẩn chạy thật, các lời "Khi …"), đối chất, màn kết.
 * Đọc thẳng tệp sinh `src/content/generated/mvp/kich-ban.gen.ts` (chỉ dữ liệu) và chạy SQL bằng sql.js như bộ kiểm.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { KICH_BAN_MVP } from '../src/content/generated/mvp/kich-ban.gen.ts';
import type { ChuoiMvp, DieuKienMvp, KichBanMvp, LoiMvp, NutMvp, TheThuThachMvp } from '../src/content/mvp/types.ts';
import { demDong, moCsdlMvp } from './noi-dung/sql-mvp.ts';
import type { BoDuLieuMvp } from './noi-dung/du-lieu-mvp.ts';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;
const ten = (id: string): string => (id === 'player' ? 'Bạn (người chơi)' : id === 'narrator' ? 'Người kể' : (kb.nhanVat.find((n) => n.id === id)?.ten ?? id));
const dienTen = (t: string): string => t.replace(/\{\{nv\.([a-z0-9-]+)\}\}/g, (_m, id: string) => (id === 'nguoi-choi' ? 'bạn' : (kb.nhanVat.find((n) => n.id === id)?.trongCau ?? id)));
const canh = (id: string): string => kb.canh.find((c) => c.id === id)?.ten ?? id;
const dk = (d: DieuKienMvp): string => (d.kind === 'co' ? `có ${d.id}` : d.kind === 'khong-co' ? `không có ${d.id}` : `(${d.cac.map(dk).join(d.kind === 'va' ? ' và ' : ' hoặc ')})`);
const loi = (l: LoiMvp): string => `**${ten(l.speaker)}**${l.expression ? ` (${l.expression})` : ''}: ${dienTen(l.text)}`;

const ra: string[] = [];
const out = (s = ''): void => void ra.push(s);
const daIn = new Set<string>();
const theDaCo: string[] = [];
let db: Awaited<ReturnType<typeof moCsdlMvp>> | null = null;
const duLieuTool = kb.duLieu ? ({ bang: kb.duLieu.bang.map((b) => ({ ...b, viTri: { tep: 'du-lieu.md', dong: 1 } })), bangAo: kb.duLieu.bangAo.map((v) => ({ ...v, viTri: { tep: 'du-lieu.md', dong: 1 } })), viTri: { tep: 'du-lieu.md', dong: 1 } } as BoDuLieuMvp) : null;

function theHoSo(id: string, nhan: string): void {
  if (!theDaCo.includes(id)) theDaCo.push(id);
  const t = kb.hoSo[id];
  const tt = Object.values(kb.thuThach).find((x) => x.vatChung?.id === id);
  if (!t && tt?.vatChung) {
    out(`> 🗂️ ${nhan}: **${tt.vatChung.title}** — ${tt.vatChung.description}${tt.vatChung.giaTri.length ? ` (giấy nhớ: ${tt.vatChung.giaTri.join(' · ')})` : ''}`);
    return;
  }
  if (!t) return void out(`> 🗂️ ${nhan}: ${id}`);
  const gt = t.fields['Giá trị cho trình dựng'];
  out(`> 🗂️ ${nhan}: **${dienTen(t.heading)}**${t.fields['Nguồn'] ? ` — nguồn: ${dienTen(t.fields['Nguồn'])}` : ''}`);
  if (t.fields['Nội dung']) out(`> ${dienTen(t.fields['Nội dung'])}`);
  for (const q of Object.values(t.quotes).flat()) out(`> ${dienTen(q)}`);
  if (gt) out(`> (giấy nhớ kéo được vào màn tra: ${gt})`);
}

function sqlNguon(sql: string): string {
  return sql.replace(/\bFROM\s+@([a-z0-9-]+)/gi, (_m, id: string) => {
    const t = Object.values(kb.thuThach).find((x) => x.vatChung?.id === id);
    return t ? `FROM (${sqlNguon(t.sqlChuan).replace(/;\s*$/, '')}) AS "${id}"` : `FROM "${id}"`;
  });
}

function bangCuaThe(t: TheThuThachMvp): string[] {
  const m = /\bFROM\s+([A-Za-z_][A-Za-z0-9_]*)/i.exec(t.sqlChuan);
  const ds = m?.[1] ? [m[1]] : [];
  for (const j of t.sqlChuan.matchAll(/\bJOIN\s+([A-Za-z_][A-Za-z0-9_]*)/gi)) if (j[1]) ds.push(j[1]);
  return ds;
}

function thuThach(t: TheThuThachMvp): void {
  out(`### 💻 Màn tra: ${dienTen(t.tieuDe)} (thẻ \`${t.id}\`)`);
  out(`Đề bài trên màn hình: *${dienTen(t.deBai)}*`);
  if (t.kieuTrinhDung === 'tong-hop') out(`Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim \`${t.nguon ?? ''}\`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.`);
  else if (t.kieuTrinhDung === 'loc-tiep') out(`Cách chơi: nguồn là PHIẾU đã ghim \`${t.nguon ?? ''}\` (câu hiện thành WITH … AS). Kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY.`);
  else out(`Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC${/\b(LOWER|TRIM)\(/i.test(t.sqlChuan) ? ', nút gọt cột (bỏ dấu cách thừa / chữ thường)' : ''}${/\bORDER BY\b/i.test(t.sqlChuan) ? ', hàng "xếp theo"' : ''}${/\bJOIN\b/i.test(t.sqlChuan) ? ', hàng "nối với bảng … theo cột …"' : ''} rồi CHẠY. Chạy sai không bị phạt.`);
  for (const b of bangCuaThe(t)) {
    const bang = kb.duLieu?.bang.find((x) => x.ten === b);
    if (!bang) continue;
    out(`Bảng \`${b}\` (${bang.dong.length} dòng):`);
    out(`| ${bang.cot.map((c) => c.ten).join(' | ')} |`);
    out(`|${bang.cot.map(() => '---').join('|')}|`);
    for (const d of bang.dong) out(`| ${d.map((v) => (v === null ? 'NULL' : String(v).replace(/ (?= |$)/g, '␣'))).join(' | ')} |`);
  }
  const giay = theDaCo.flatMap((id) => {
    const h = kb.hoSo[id];
    const gt = h?.fields['Giá trị cho trình dựng'];
    if (gt) return [`[${gt}]`];
    const tt = Object.values(kb.thuThach).find((x) => x.vatChung?.id === id);
    return tt?.vatChung?.giaTri.length ? [`[${tt.vatChung.giaTri.join(' · ')}]`] : [];
  });
  out(`Giấy nhớ đang có quanh màn hình: ${giay.length ? giay.join(' ') : '(không có)'}`);
  out('Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):');
  out('```sql');
  out(t.sqlChuan.trim());
  out('```');
  if (db) {
    try {
      const sql = sqlNguon(t.sqlChuan).trim().replace(/;\s*$/, '');
      const st = db.prepare(sql);
      const cot = st.getColumnNames();
      const dong: unknown[][] = [];
      while (st.step()) dong.push(st.get() as unknown[]);
      st.free();
      out(`Kết quả: ${dong.length} dòng${t.soDongKyVong !== null && dong.length !== t.soDongKyVong ? ` (!! thẻ khai ${t.soDongKyVong})` : ''}`);
      out(`| ${cot.join(' | ')} |`);
      out(`|${cot.map(() => '---').join('|')}|`);
      for (const d of dong) out(`| ${d.map((v) => String(v ?? 'NULL')).join(' | ')} |`);
    } catch (e) {
      out(`Kết quả: (không chạy được: ${(e as Error).message})`);
    }
  }
  if (t.phanUng.length) {
    out('Lời nhân vật sau mỗi lần chạy:');
    for (const p of t.phanUng) {
      const khi = p.khi.kind === 'so-dong' ? `ra ${p.khi.n} dòng${p.khi.cot ? ` (với cột ${p.khi.cot.join(', ')})` : ''}` : p.khi.kind === 'dung' ? 'đúng' : p.khi.kind === 'sai-thu-tu' ? 'đủ dòng nhưng sai thứ tự' : p.khi.kind === 'loi-cot' ? 'lỗi không có cột' : 'lỗi';
      out(`- Khi ${khi}: ${p.loi.map(loi).join(' / ')}`);
    }
  }
  if (t.vatChung) theHoSo(t.vatChung.id, 'Tra đúng → ghim phiếu lên bảng điều tra');
  out();
}

function chuoi(id: string, sau: number): void {
  const c = kb.chuoi.find((x) => x.id === id);
  if (!c) return void out(`(không có chuỗi ${id})`);
  if (daIn.has(id)) return void out(`*(tiếp theo như chuỗi "${c.title}" đã in ở trên)*\n`);
  daIn.add(id);
  out(`${'#'.repeat(Math.min(6, 2 + sau))} 📍 ${canh(c.canh)} — ${c.title}`);
  out();
  const hoan: { id: string; ghi: string }[] = [];
  for (const n of c.nodes) {
    switch (n.type) {
      case 'line':
        out(n.display === 'card' ? `*[Thẻ chữ]* ${dienTen(n.text)}` : `- ${loi(n)}`);
        break;
      case 'task':
        out(`> 🎯 NHIỆM VỤ: ${dienTen(n.text)}`);
        break;
      case 'reminder':
        out(`> 💭 ${ten(n.speaker)} nhắc: ${dienTen(n.text)}`);
        break;
      case 'note':
        break;
      case 'show-document':
        theHoSo(n.documentId, 'Tài liệu mới');
        break;
      case 'consequence':
        for (const h of n.hauQua) {
          if (h.kind === 'mo-manh-moi') theHoSo(h.id, 'Giấy nhớ mới');
          else if (h.kind === 'hien-tai-lieu') theHoSo(h.id, 'Tài liệu mới');
          else if (h.kind === 'luu-bang-chung') theHoSo(h.id, 'Bằng chứng mới');
          else if (h.kind === 'dat-co') out(`> (máy đặt cờ ${h.co})`);
          else if (h.kind === 'di-toi') hoan.push({ id: h.chuoi, ghi: '' });
        }
        break;
      case 'save-evidence':
        theHoSo(n.evidenceId, 'Bằng chứng mới');
        break;
      case 'challenge':
      case 'fix-query': {
        const t = kb.thuThach[n.challengeId];
        if (t) thuThach(t);
        break;
      }
      case 'question':
        out(`> ❓ ${ten(n.asker.speaker)} hỏi: "${dienTen(n.asker.text)}" (chọn sai thì nghe phản hồi rồi chọn lại)`);
        for (const ch of n.choices) out(`>   - ${dienTen(ch.text)}${ch.correct ? ' ✅' : ''} → ${ch.feedback.map(loi).join(' / ')}`);
        break;
      case 'doi-chat':
        out(`> ⚖️ ĐỐI CHẤT — ${ten(n.asker.speaker)} nêu giả thuyết: "${dienTen(n.asker.text)}". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".`);
        for (const b of n.bangChung) out(`>   - Trình ${b.id} [${b.muc === 'du' ? 'ĐỦ CĂN CỨ' : b.muc === 'ho-tro' ? 'HỖ TRỢ' : 'GỢI Ý'}] → ${b.feedback.map(loi).join(' / ')}`);
        out(`>   - Chưa đủ căn cứ → ${n.chuaDu.map(loi).join(' / ')}`);
        out(`>   - Thẻ khác → ${n.khac.map(loi).join(' / ')}`);
        break;
      case 'branch':
        out(`> 🔀 ${ten(n.asker.speaker)}: "${dienTen(n.asker.text)}"`);
        for (const ch of n.choices) {
          out(`>   - ${dienTen(ch.text)}${ch.khi ? ` (chỉ hiện khi ${dk(ch.khi)})` : ''}`);
          for (const h of ch.hauQua) if (h.kind === 'di-toi') hoan.push({ id: h.chuoi, ghi: `Nếu chọn "${dienTen(ch.text)}"` });
        }
        break;
      case 'jump-if':
        out(`> ⤵ RẼ TỰ ĐỘNG: nếu ${dk(n.dieuKien)} thì sang "${kb.chuoi.find((x) => x.id === n.to)?.title ?? n.to}" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.`);
        hoan.push({ id: n.to, ghi: `Chỉ khi ${dk(n.dieuKien)} (đường rẽ tự động ở trên)` });
        break;
      case 'goto':
        hoan.push({ id: n.to, ghi: '' });
        break;
      case 'condition':
        out(`> (chỉ vào đây khi ${dk(n.dieuKien)})`);
        break;
      case 'end':
        out('> 🏁 KẾT THÚC vụ → màn kết.');
        break;
      case 'notebook-note':
        out(`> 📓 Sổ cá nhân có dòng mới: ${kb.soTay[n.trang]?.chuThich ?? n.trang}`);
        break;
      case 'image':
        out(`*(ảnh: ${n.imageId})*`);
        break;
      default:
        break;
    }
  }
  out();
  for (const h of hoan) {
    if (h.ghi) out(`*— ${h.ghi} —*\n`);
    chuoi(h.id, sau + 1);
  }
}

async function main(): Promise<void> {
  const ma = process.argv[2] ?? '';
  const tep = process.argv[3];
  if (duLieuTool) db = await moCsdlMvp(duLieuTool);
  const vu = (kb.lich.vuSau ?? []).find((v) => v.id === ma);
  const phu = (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === ma);
  const dau = vu?.chuoi ?? phu?.chuoi ?? ma;
  const tieuDe = vu ? `Vụ: ${vu.ten}` : phu ? `Nhiệm vụ phụ: ${phu.ten} (${ten(phu.nguoiGiao)} giao)` : `Chuỗi: ${ma}`;
  out(`# ${tieuDe}`);
  out();
  out('Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.');
  out();
  chuoi(dau, 0);
  const ket = vu ?? phu;
  if (ket) {
    out('## 🏁 Màn kết');
    out(`**${ket.tieuDeKet}** — ${ket.loiKet}`);
  }
  if (db) {
    void demDong;
    db.close();
  }
  const text = ra.join('\n');
  if (tep) writeFileSync(tep, text, 'utf8');
  else process.stdout.write(text);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await main();
