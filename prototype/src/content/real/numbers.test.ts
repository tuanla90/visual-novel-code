/**
 * Số liệu viết cứng trong lời thoại khớp dataset chính (QĐ-010, QĐ-012; ghi chú cuối
 * lich-su-quyet-dinh.md: "test nội dung (gói 5) phải khẳng định các số này").
 * Mỗi khẳng định: (1) câu chữ có thật trong nội dung hiển thị, (2) engine chạy ra đúng số đó.
 */
import { describe, expect, it } from 'vitest';
import { C1_REFERENCE_SQL, C2_REFERENCE_SQL, C3_REFERENCE_SQL, CHALLENGE_SPECS, QUAN_OR_QUERY } from '../../sql-challenge/data/challenges';
import { runQuery } from '../../sql-challenge/engine';
import type { SqlValue } from '../../sql-challenge/types';
import { realContent } from '.';
import { shownStrings } from './testing/shown-strings';

async function run(sql: string): Promise<{ rowCount: number; rows: SqlValue[][]; columns: string[] }> {
  const r = await runQuery(sql);
  if (!r.ok) throw new Error(`chạy lỗi: ${r.message}\n${sql}`);
  return r;
}

/** Mọi chữ người chơi đọc được (lời thoại, câu hỏi, lựa chọn, phản hồi, gợi ý, thẻ…). */
const TEXTS = shownStrings(realContent).map((s) => s.text);
const said = (phrase: string): boolean => TEXTS.some((t) => t.includes(phrase));

describe('lời thoại nói đúng số dòng mà engine chạy ra', () => {
  const CLAIMS: { phrase: string; sql: string; rows: number }[] = [
    // c1: tên bắt đầu bằng H
    { phrase: 'Mười người.', sql: C1_REFERENCE_SQL, rows: 10 },
    { phrase: 'Mười dòng.', sql: C1_REFERENCE_SQL, rows: 10 },
    { phrase: 'Mười dòng này', sql: C1_REFERENCE_SQL, rows: 10 },
    { phrase: 'Thử thách 1 ra mười người tên H', sql: C1_REFERENCE_SQL, rows: 10 },
    { phrase: '10 dòng từ bảng `sinh_vien`', sql: C1_REFERENCE_SQL, rows: 10 },
    // truy vấn OR của Quân
    { phrase: 'Hai mươi tư người', sql: QUAN_OR_QUERY, rows: 24 },
    { phrase: 'Hai mươi tư?', sql: QUAN_OR_QUERY, rows: 24 },
    { phrase: 'Bảo sao ra 24 người.', sql: QUAN_OR_QUERY, rows: 24 },
    { phrase: 'từ 24 dòng', sql: QUAN_OR_QUERY, rows: 24 },
    // cả view / cả bảng lớp
    { phrase: 'Từ bốn mươi người còn hai.', sql: 'SELECT * FROM sinh_vien', rows: 40 },
    { phrase: 'Đây là cả tám lớp.', sql: 'SELECT * FROM lop_sinh_hoat', rows: 8 },
    // c2, c3, truy vấn đã sửa
    { phrase: 'Hai lớp sinh hoạt ở tòa B.', sql: C2_REFERENCE_SQL, rows: 2 },
    { phrase: 'Hai người!', sql: C3_REFERENCE_SQL, rows: 2 },
    { phrase: 'một truy vấn, hai dòng.', sql: C3_REFERENCE_SQL, rows: 2 },
    { phrase: 'Vì sao chỉ còn 2 dòng?', sql: C3_REFERENCE_SQL, rows: 2 },
    { phrase: 'Từ bốn mươi người còn hai.', sql: C3_REFERENCE_SQL, rows: 2 },
    { phrase: 'nối bằng AND: còn hai dòng.', sql: C3_REFERENCE_SQL, rows: 2 },
    { phrase: 'Hai dòng. Đưa lên màn chiếu đi!', sql: C3_REFERENCE_SQL, rows: 2 },
    { phrase: 'còn 2 dòng', sql: C3_REFERENCE_SQL, rows: 2 },
  ];

  it.each(CLAIMS)('"$phrase" ↔ $rows dòng', async ({ phrase, sql, rows }) => {
    expect(said(phrase), `không tìm thấy câu "${phrase}" trong nội dung`).toBe(true);
    expect((await run(sql)).rowCount).toBe(rows);
  });

  it('"Hai mươi tư người, hơn nửa số sinh viên trong view": 24 > 40 / 2', async () => {
    expect(said('Hai mươi tư người, hơn nửa số sinh viên trong view.')).toBe(true);
    const or = (await run(QUAN_OR_QUERY)).rowCount;
    const all = (await run('SELECT * FROM sinh_vien')).rowCount;
    expect(or * 2).toBeGreaterThan(all);
  });
});

describe('màn chiếu và đặc tả: số dòng kỳ vọng = số dòng chạy thật', () => {
  it('mọi màn chiếu chạy thật có expectedRowCount đúng bằng engine', async () => {
    const projectors = realContent.story.sequences.flatMap((s) => s.nodes).flatMap((n) => (n.type === 'projector' ? [n.projector] : []));
    expect(projectors.map((p) => p.id)).toEqual(['proj-quan-or', 'proj-fixed']);
    for (const p of projectors) {
      expect(p.run, p.id).toBe(true);
      let sql: string;
      if (p.source.kind === 'sql') sql = p.source.sql;
      else {
        // Vật chứng truy vấn đã sửa: SQL thật là của người chơi; đại diện bằng SQL chuẩn của thử thách tạo ra nó.
        const evidenceId = p.source.evidenceId;
        const def = Object.values(realContent.challenges).find((d) => d.content.evidence.id === evidenceId);
        if (!def) throw new Error(`không thử thách nào tạo ${evidenceId}`);
        sql = def.spec.referenceSql;
      }
      expect((await run(sql)).rowCount, p.id).toBe(p.expectedRowCount);
    }
  });

  it('màn chiếu deb-01 dùng đúng hằng QUAN_OR_QUERY (không chép lại)', () => {
    const p = realContent.story.sequences.find((s) => s.id === 'deb-01')?.nodes.find((n) => n.type === 'projector');
    expect(p?.type === 'projector' && p.projector.source.kind === 'sql' ? p.projector.source.sql : null).toBe(QUAN_OR_QUERY);
  });

  it('expectedRowCount của 4 đặc tả = số dòng SQL chuẩn', async () => {
    for (const spec of Object.values(CHALLENGE_SPECS)) {
      expect((await run(spec.referenceSql)).rowCount, spec.id).toBe(spec.expectedRowCount);
    }
  });
});

describe('tên, mã, lớp nêu trong lời và thẻ khớp dữ liệu', () => {
  it('ev-c2-classes-b "2 dòng: `KT24A`, `QT24B`" và lời "KT24A và QT24B" = kết quả c2', async () => {
    const r = await run(C2_REFERENCE_SQL);
    expect(r.rows.map((row) => row[0])).toEqual(['KT24A', 'QT24B']);
    expect(realContent.challenges.c2.content.evidence.description).toContain('2 dòng: `KT24A`, `QT24B`.');
    expect(said('KT24A và QT24B.')).toBe(true);
  });

  it('ev-c3-shortlist nêu đúng hai dòng của c3 (họ tên — mã — lớp — CLB)', async () => {
    const r = await run(C3_REFERENCE_SQL);
    const described = r.rows.map(([maSv, hoDem, ten, maLop, clb]) => `${String(hoDem)} ${String(ten)} — ${String(maSv)} — ${String(maLop)} — ${String(clb)}`);
    const desc = realContent.challenges.c3.content.evidence.description;
    expect(described).toHaveLength(2);
    for (const d of described) expect(desc).toContain(d);
  });

  it('Hoài = SV240317, lớp QT24B; Hiếu = SV240228 (end-01, end-02, end-03, sổ bàn giao)', async () => {
    const r = await run("SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ma_sv IN ('SV240317', 'SV240228') ORDER BY ma_sv");
    expect(r.rows).toEqual([
      ['SV240228', 'Phạm Minh', 'Hiếu', 'KT24A', 'Báo chí'],
      ['SV240317', 'Lê Thị', 'Hoài', 'QT24B', 'Báo chí'],
    ]);
    expect(said('Em là Hoài, lớp QT24B.')).toBe(true);
    expect(said('Bạn Hiếu, SV240228, không có trong sổ.')).toBe(true);
    expect(said('SV240317 có trong sổ.')).toBe(true);
  });
});
