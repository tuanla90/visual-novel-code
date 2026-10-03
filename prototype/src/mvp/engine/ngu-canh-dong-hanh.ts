import type { KichBanMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from './trang-thai';
import { dienTen, tenNguoiNoi } from './may';
import { chaySql, type GiaTriSql } from './sql-mvp';
import { ghiNhanTrangThaiDongHanh, type BanDongHanhMvp } from './tri-nho-dong-hanh';

export interface DuKienSqlDongHanh {
  id: string;
  title: string;
  source: 'sqlite-run';
  status: 'available' | 'unavailable';
  columns: string[];
  rows: GiaTriSql[][];
  rowCount: number | null;
  truncated: boolean;
}

/** Reuse the same read-only SQLite instance as the laptop. Only replay queries this character saw. */
export async function taoNguCanhDongHanh(kb: KichBanMvp, state: TrangThaiMvp, ban: BanDongHanhMvp, question: string) {
  const s = ghiNhanTrangThaiDongHanh(kb, state);
  const mem = s.triNhoDongHanh!.nhanVat[ban];
  const thayTen = (text: string): string => dienTen(kb, s, text);
  const nv = kb.nhanVat.find((n) => n.id === ban);
  const gt = nv?.gioiThieu;
  // `vai` is an author-only field and may mention later plot events.
  const selfProfile = [nv?.ten, gt?.danhXung, gt?.nam, gt?.nganh, gt?.cauNoi, gt?.loi, gt?.lich]
    .filter((v): v is string => !!v).map(thayTen).join('\n').slice(0, 1800);
  const daCo = new Set([...s.hoSo.manhMoi, ...s.hoSo.taiLieu, ...s.hoSo.bangChung]);
  const phieuBai = new Set(Object.values(kb.thuThach).flatMap((t) => t.vatChung ? [t.vatChung.id] : []));
  const words = question.toLocaleLowerCase('vi').split(/\s+/).filter((w) => w.length > 2);
  const queries = mem.truyVanDaXem.map((q, i) => ({ q, score: i / Math.max(1, mem.truyVanDaXem.length)
    + words.filter((w) => `${q.nhan} ${q.id}`.toLocaleLowerCase('vi').includes(w)).length }))
    .sort((a, b) => b.score - a.score).slice(0, 4).map(({ q }) => q);
  const databaseFacts: DuKienSqlDongHanh[] = [];
  for (const q of queries) {
    const result = kb.duLieu ? await chaySql(kb.duLieu, q.sql) : null;
    databaseFacts.push({
      id: q.id, title: thayTen(q.nhan).slice(0, 180), source: 'sqlite-run',
      status: result?.ok ? 'available' : 'unavailable',
      columns: result?.ok ? result.cot.slice(0, 8) : [],
      rows: result?.ok ? result.dong.slice(0, 6).map((row) => row.slice(0, 8).map((v) => typeof v === 'string' ? v.slice(0, 100) : v)) : [],
      rowCount: result?.ok ? result.dong.length : null,
      truncated: !!result?.ok && (result.dong.length > 6 || result.cot.length > 8 || result.dong.some((r) => r.some((v) => typeof v === 'string' && v.length > 100))),
    });
  }
  const context = {
    runId: String(s.batDauLuc), selfProfile,
    playerName: s.tenNguoiChoi,
    scene: kb.canh.find((c) => c.id === s.canh)?.ten ?? '', day: s.ngay,
    currentTask: s.triNhoDongHanh!.coMat.includes(ban) ? thayTen(s.nhacViec?.text ?? s.nhiemVu ?? '') : '',
    knownDialogue: mem.loiDaNghe.slice(-30).map((l) => ({ speaker: tenNguoiNoi(kb, l.speaker, s), text: thayTen(l.text).slice(0, 400) })),
    unlockedEvidence: mem.hoSoDaThay.filter((id) => daCo.has(id)).slice(-16).flatMap((id) => {
      const the = kb.hoSo[id];
      if (!the) return [];
      return [{ title: thayTen(the.heading).slice(0, 180), details: phieuBai.has(id) || s.bang?.phieuTruyVan?.[id]
        ? ['Phiếu truy vấn: chỉ dùng kết quả SQLite trong databaseFacts; chưa có kết quả thì chưa biết nội dung.']
        : Object.values(the.fields).filter(Boolean).slice(0, 6).map((v) => thayTen(v).slice(0, 250)) }];
    }),
    databaseFacts,
  };
  // Leave room for the question and chat history under the server's 24 KB request limit.
  const bytes = (): number => new TextEncoder().encode(JSON.stringify(context)).length;
  while (bytes() > 16_000) {
    if (context.knownDialogue.length > 4) context.knownDialogue.shift();
    else if (context.unlockedEvidence.length) context.unlockedEvidence.shift();
    else {
      const fact = [...databaseFacts].reverse().find((f) => f.rows.length > 0);
      if (!fact) break;
      fact.rows.pop(); fact.truncated = true;
    }
  }
  return context;
}
