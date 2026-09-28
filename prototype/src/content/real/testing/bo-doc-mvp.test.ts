// @vitest-environment node
/**
 * Test BỘ ĐỌC MVP (tools/noi-dung/doc-mvp.ts + luat-mvp.ts, đặc tả §18): lỗi báo đúng `<tệp>:<dòng>` cho các luật
 * chính — chi phí khung của dữ kiện chính, nhân vật nói trước "Xuất hiện từ", true end tham chiếu sai, chuỗi lẻ,
 * tên cấm, [TẠO NHÂN VẬT], `trừ uy tín` ngoài ngày họp, buổi tối không dẫn tới dữ kiện chính, {{nv.nguoi-choi}};
 * luật địa điểm 1–3 phụ/nhiễu (QĐ-089); bộ đọc du-lieu.md và chạy thật số dòng khai bằng sql.js (QĐ-089).
 * Nội dung thật đọc sạch và khớp .gen.ts: xem ../../generated/mvp/mvp.gen.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { danhGiaDieuKien, docDieuKien, docHauQua, docMoc, maTrongDieuKien } from '../../../../tools/noi-dung/dieu-kien.ts';
import { dinhDangLoi, docNoiDungMvp, type TepMvp } from '../../../../tools/noi-dung/doc-mvp.ts';
import { docDuLieuMvp } from '../../../../tools/noi-dung/du-lieu-mvp.ts';
import { kiemLuatMvp } from '../../../../tools/noi-dung/luat-mvp.ts';
import { kiemSoDongMvp } from '../../../../tools/noi-dung/sql-mvp.ts';

/** Bộ MVP tối thiểu hợp lệ: 1 ngày, 2 địa điểm, họp, hai kết. Mỗi test sửa một chỗ rồi xem lỗi. */
const GOC: Record<string, string> = {
  'quy-uoc.md': ['# Game — MVP thử', '- Tên trường: Trường Đại học Thử', '- Tên cấm: Vương Khánh', ''].join('\n'),
  'nhan-vat.md': [
    '### tung — Tùng',
    '- Vai: bạn',
    '- Biểu cảm: neutral',
    '### quan — Quân',
    '- Vai: giám sát',
    '- Biểu cảm: neutral, smug',
    '- Xuất hiện từ: ngày họp',
    '### minh-anh — Minh Anh',
    '- Vai: chủ nhiệm',
    '- Biểu cảm: worried',
    '',
  ].join('\n'),
  'canh.md': ['### c1 — Cảnh một', '### c2 — Cảnh hai', ''].join('\n'),
  'dia-diem.md': [
    '## a — Nơi A {địa điểm: a}',
    '- Cảnh: c1',
    '### dk-chinh — Dữ kiện chính {dữ kiện: chính}',
    '- Chuỗi: s-chinh',
    '- Mở manh mối: clue-x',
    '### dk-phu — Dữ kiện phụ {dữ kiện: phụ}',
    '- Chuỗi: s-phu',
    '- Lưu bằng chứng: ev-y',
    '## b — Phòng máy {địa điểm: b}',
    '- Cảnh: c2',
    '- Tốn khung: vào 1, bên trong 0',
    '### dk-may — Bàn làm việc {dữ kiện: nhiễu}',
    '- Chuỗi: s-may',
    '',
  ].join('\n'),
  'lich.md': [
    '# Vụ thử {vụ: vu0}',
    '## Luật',
    '- Khung giờ: sang "Sáng", trua "Trưa", chieu "Chiều"',
    '- Dữ kiện chính tối đa: 2 khung',
    '- Mỗi địa điểm: 1–3 dữ kiện phụ/nhiễu',
    '- Uy tín: 5 vạch',
    '## Mở đầu',
    '- Chuỗi đầu: md-1',
    '## Ngày 1 — Thử {ngày: 1}',
    '- Dữ kiện chính: dk-chinh',
    '- Buổi tối: toi-1',
    '## Ngày 2 — Họp {ngày họp}',
    '- Chuỗi: hop',
    '## Kết',
    '- Kết thật: ket-that',
    '- Kết thường: ket-thuong',
    '',
  ].join('\n'),
  'kich-ban/01.md': [
    '### md-1 — Mở đầu {cảnh: c1}',
    '- [TẠO NHÂN VẬT ten] tung (neutral): "Cậu tên gì?"',
    '  - xúc xắc: Bấm đi.',
    '- **tung** (neutral): Chào {{nv.nguoi-choi}}.',
    '- [TẠO NHÂN VẬT nganh] tung (neutral): "Ngành gì?"',
    '  - lựa chọn: Kế toán · Marketing',
    '### s-chinh — Chính {cảnh: c1}',
    '- **tung** (neutral): Đây là dữ kiện chính.',
    '### s-phu — Phụ {cảnh: c1}',
    '- **tung** (neutral): Đây là dữ kiện phụ.',
    '### s-may — Máy {cảnh: c2}',
    '- **narrator**: Bàn làm việc.',
    '### toi-1 — Tối {cảnh: c1}',
    '- [THẺ CHỮ] **narrator**: Buổi tối',
    '- [ĐI TỚI s-chinh]',
    '### hop — Họp {cảnh: c2}',
    '- **quan** (smug): Các bạn chỉ đưa ra hai.',
    '- [HỎI q1 · trừ uy tín] quan: "Hai dòng là ai?"',
    '  - (A) {id: a} Cần kiểm tiếp. [ĐÚNG] → phản hồi: **quan** (neutral): Đúng.',
    '  - (B) {id: b} Thủ phạm. → phản hồi: **minh-anh** (worried): Khoan.',
    '- [RẼ KẾT]',
    '### ket-that — Kết thật {cảnh: c2}',
    '- [ĐIỀU KIỆN] có ev-y',
    '- **narrator**: Hết, thật.',
    '- [KẾT THÚC]',
    '### ket-thuong — Kết thường {cảnh: c2}',
    '- **narrator**: Hết, thường.',
    '- [KẾT THÚC]',
    '',
  ].join('\n'),
  'chung/loi-chung.md': ['### Khi mất uy tín {lời chung: mat-uy-tin}', '- **minh-anh** (worried): Cho em làm lại.', '- [HẾT VẠCH] **minh-anh** (worried): Xin hoãn.', ''].join('\n'),
  'ho-so/01.md': ['### clue-x — [X]', '- Tiêu đề: X', '- Nguồn: đâu đó', '- Nội dung: x', '### ev-y — Bằng chứng Y', '- Tiêu đề: Y', '- Nội dung: y', ''].join('\n'),
};

const LOAI: Record<string, TepMvp['loai']> = { 'quy-uoc.md': 'quy-uoc', 'nhan-vat.md': 'nhan-vat', 'canh.md': 'canh', 'dia-diem.md': 'dia-diem', 'lich.md': 'lich' };
const loaiCua = (p: string): TepMvp['loai'] => LOAI[p] ?? (p.startsWith('kich-ban/') ? 'kich-ban' : p.startsWith('chung/') ? 'loi-chung' : p.startsWith('ho-so/') ? 'ho-so' : p.startsWith('so-tay/') ? 'so-tay' : 'thu-thach');

function doc(sua: Record<string, string | ((s: string) => string)> = {}): string[] {
  const tep: TepMvp[] = Object.entries({ ...GOC }).map(([p, s]) => {
    const t = sua[p];
    const noiDung = t === undefined ? s : typeof t === 'string' ? t : t(s);
    return { duongDan: `noi-dung-mvp/${p}`, loai: loaiCua(p), noiDung };
  });
  const kq = docNoiDungMvp(tep);
  return [...kq.loi, ...kiemLuatMvp(kq.mvp).loi].map(dinhDangLoi);
}

describe('bộ MVP: bộ tối thiểu hợp lệ', () => {
  it('đọc sạch, giữ nguyên {{nv.nguoi-choi}} trong lời', () => {
    expect(doc()).toEqual([]);
    const tep: TepMvp[] = Object.entries(GOC).map(([p, s]) => ({ duongDan: `noi-dung-mvp/${p}`, loai: loaiCua(p), noiDung: s }));
    const kq = docNoiDungMvp(tep);
    const md = kq.mvp.chuoi.find((c) => c.id === 'md-1');
    const loi = md?.items.find((it) => it.kind === 'line');
    expect(loi && loi.kind === 'line' ? loi.line.text : '').toBe('Chào {{nv.nguoi-choi}}.');
  });
});

describe('bộ MVP: lỗi báo đúng <tệp>:<dòng>', () => {
  it('dữ kiện chính tốn hơn N khung → lỗi ở dòng "Dữ kiện chính" của ngày', () => {
    // Dữ kiện chính chuyển sang phòng máy tốn 3 khung khi vào.
    const loi = doc({
      'dia-diem.md': (s) => s.replace('- Tốn khung: vào 1, bên trong 0', '- Tốn khung: vào 3, bên trong 0').replace('### dk-chinh — Dữ kiện chính {dữ kiện: chính}\n- Chuỗi: s-chinh\n- Mở manh mối: clue-x\n', '').replace('### dk-may — Bàn làm việc {dữ kiện: nhiễu}', '### dk-chinh — Dữ kiện chính {dữ kiện: chính}\n- Chuỗi: s-chinh\n- Mở manh mối: clue-x\n### dk-may — Bàn làm việc {dữ kiện: nhiễu}'),
    });
    expect(loi).toEqual([expect.stringMatching(/^noi-dung-mvp\/lich\.md:10: ngày 1: dữ kiện chính "dk-chinh" tốn 3 khung .* tối đa: 2 khung/)]);
  });

  it('nhân vật nói trước "Xuất hiện từ" → lỗi ở dòng lời đó', () => {
    const loi = doc({ 'kich-ban/01.md': (s) => s.replace('- **tung** (neutral): Đây là dữ kiện chính.', '- **quan** (neutral): Tôi ở đây từ ngày 1.') });
    expect(loi).toEqual(['noi-dung-mvp/kich-ban/01.md:8: nhân vật quan nói ở chuỗi tới được từ ngày 1 sáng nhưng "Xuất hiện từ: ngày họp"']);
  });

  it('true end tham chiếu mã không tồn tại → lỗi ở dòng [ĐIỀU KIỆN]', () => {
    const loi = doc({ 'kich-ban/01.md': (s) => s.replace('- [ĐIỀU KIỆN] có ev-y', '- [ĐIỀU KIỆN] có ev-khong-co') });
    expect(loi[0]).toBe('noi-dung-mvp/kich-ban/01.md:23: [ĐIỀU KIỆN]: không có mã "ev-khong-co" (chưa khai ở ho-so/ hay thẻ thử thách)');
  });

  it('true end chỉ cần dữ kiện chính → lỗi (QĐ-086: cần dữ kiện phụ)', () => {
    const loi = doc({ 'kich-ban/01.md': (s) => s.replace('- [ĐIỀU KIỆN] có ev-y', '- [ĐIỀU KIỆN] có clue-x') });
    expect(loi).toEqual(['noi-dung-mvp/kich-ban/01.md:23: điều kiện true end thỏa chỉ với dữ kiện chính — true end phải cần ít nhất một dữ kiện phụ (QĐ-086)']);
  });

  it('chuỗi lẻ, buổi tối không dẫn tới dữ kiện chính', () => {
    const loi = doc({ 'kich-ban/01.md': (s) => s.replace('- [ĐI TỚI s-chinh]', '- [ĐI TỚI s-may]').replace('### s-may — Máy {cảnh: c2}', '### s-le — Lẻ {cảnh: c2}\n- **narrator**: Không ai tới.\n### s-may — Máy {cảnh: c2}') });
    expect(loi).toEqual([
      'noi-dung-mvp/kich-ban/01.md:11: chuỗi "s-le" lẻ: không được lịch, dữ kiện nào nối tới và không có [ĐI TỚI] / "đi tới" nào dẫn tới',
      'noi-dung-mvp/lich.md:9: ngày 1: chuỗi buổi tối "toi-1" không dẫn tới dữ kiện chính "dk-chinh" (cần [ĐI TỚI s-chinh])',
    ]);
  });

  it('tên cấm trong lời thoại; "trừ uy tín" ngoài ngày họp; [TẠO NHÂN VẬT] thiếu dòng con', () => {
    const loi = doc({
      'kich-ban/01.md': (s) =>
        s
          .replace('- **tung** (neutral): Đây là dữ kiện phụ.', '- **tung** (neutral): Vương Khánh làm đấy.\n- [HỎI q2 · trừ uy tín] tung: "Sao?"\n  - (A) {id: a} Ừ. [ĐÚNG] → phản hồi: **tung** (neutral): Ừ.\n  - (B) {id: b} Không. → phản hồi: **tung** (neutral): Không.')
          .replace('  - xúc xắc: Bấm đi.\n', ''),
    });
    expect(loi).toEqual([
      'noi-dung-mvp/kich-ban/01.md:3: [TẠO NHÂN VẬT ten] thiếu dòng con "xúc xắc"',
      'noi-dung-mvp/kich-ban/01.md:10: "trừ uy tín" chỉ dùng ở chuỗi tới được từ ngày họp ("hop")',
      'noi-dung-mvp/kich-ban/01.md:9: lời thoại có tên cấm "Vương Khánh" (quy-uoc.md "Tên cấm")',
    ]);
  });

  it('dòng lạ trong chuỗi, biểu cảm không có, thẻ hồ sơ không ai tạo, địa điểm quá số dữ kiện', () => {
    const loi = doc({
      'kich-ban/01.md': (s) => s.replace('- **tung** (neutral): Đây là dữ kiện chính.', '- **tung** (happy): Đây là dữ kiện chính.\n- [NHẢY MÚA]'),
      'ho-so/01.md': (s) => `${s}### doc-z — Tài liệu Z\n- Tiêu đề: Z\n`,
      'lich.md': (s) => s.replace('- Mỗi địa điểm: 1–3 dữ kiện phụ/nhiễu', '- Mỗi địa điểm: 2–3 dữ kiện phụ/nhiễu'),
    });
    expect(loi).toEqual([
      'noi-dung-mvp/kich-ban/01.md:9: chỉ dẫn "[NHẢY MÚA…]" không có trong đặc tả §18.6 hoặc viết sai chính tả: "- [NHẢY MÚA]"',
      'noi-dung-mvp/dia-diem.md:1: địa điểm a có 1 dữ kiện phụ/nhiễu (không tính 1 chính) — luật "Mỗi địa điểm: 2–3 dữ kiện phụ/nhiễu" (lich.md)',
      'noi-dung-mvp/dia-diem.md:9: địa điểm b có 1 dữ kiện phụ/nhiễu (không tính 0 chính) — luật "Mỗi địa điểm: 2–3 dữ kiện phụ/nhiễu" (lich.md)',
      'noi-dung-mvp/kich-ban/01.md:8: nhân vật tung không có biểu cảm "happy" (có: neutral)',
      'noi-dung-mvp/ho-so/01.md:8: thẻ hồ sơ "doc-z" không được dữ kiện, thẻ thử thách, [HẬU QUẢ], [HIỆN TÀI LIỆU] hay [LƯU BẰNG CHỨNG] nào tạo ra',
    ]);
  });

  it('hai dữ kiện chính một ngày, dữ kiện thiếu Chuỗi/Thử thách, mốc thời gian lạ', () => {
    const loi = doc({
      'lich.md': (s) => s.replace('- Dữ kiện chính: dk-chinh', '- Dữ kiện chính: dk-chinh, dk-phu'),
      'dia-diem.md': (s) => s.replace('- Chuỗi: s-may', '- Mở từ: ngày 1 đêm'),
    });
    expect(loi).toContain('noi-dung-mvp/lich.md:10: ngày 1: chỉ MỘT dữ kiện chính mỗi ngày (QĐ-086); dữ kiện đi kèm khai bằng "Cần" ở dữ kiện chính');
    expect(loi).toContain('noi-dung-mvp/dia-diem.md:12: dữ kiện dk-may phải có đúng một trong hai dòng "- Chuỗi: <chuỗi>" hoặc "- Thử thách: <thẻ>"');
    expect(loi).toContain('noi-dung-mvp/dia-diem.md:12: dữ kiện dk-may, "Mở từ": khung giờ lạ "đêm" — có: sang (Sáng), trua (Trưa), chieu (Chiều)');
  });

  it('luật địa điểm (QĐ-089): chỉ đếm phụ/nhiễu, dữ kiện chính không tính; dòng luật cũ thiếu "phụ/nhiễu" là lỗi', () => {
    // Nơi A có 1 chính + 1 phụ: với "1–1 dữ kiện phụ/nhiễu" vẫn hợp lệ (luật cũ đếm cả chính sẽ ra 2).
    expect(doc({ 'lich.md': (s) => s.replace('- Mỗi địa điểm: 1–3 dữ kiện phụ/nhiễu', '- Mỗi địa điểm: 1–1 dữ kiện phụ/nhiễu') })).toEqual([]);
    expect(doc({ 'lich.md': (s) => s.replace('- Mỗi địa điểm: 1–3 dữ kiện phụ/nhiễu', '- Mỗi địa điểm: 1–4 dữ kiện') })).toEqual([
      'noi-dung-mvp/lich.md:2: "Mỗi địa điểm" phải là "<min>–<max> dữ kiện phụ/nhiễu" (dữ kiện chính không tính, QĐ-089): "1–4 dữ kiện"',
    ]);
  });
});

describe('cú pháp nhỏ: điều kiện, hậu quả, mốc', () => {
  it('điều kiện: và ưu tiên hơn hoặc, ngoặc, đánh giá', () => {
    const dk = docDieuKien('có a và (có b hoặc không có c)');
    expect(maTrongDieuKien(dk)).toEqual(['a', 'b', 'c']);
    expect(danhGiaDieuKien(dk, new Set(['a']))).toBe(true);
    expect(danhGiaDieuKien(dk, new Set(['a', 'c']))).toBe(false);
    expect(danhGiaDieuKien(dk, new Set(['a', 'c', 'b']))).toBe(true);
    expect(() => docDieuKien('a')).toThrow(/chỉ nhận "có <mã>"/);
    expect(() => docDieuKien('có a và')).toThrow();
  });

  it('hậu quả và mốc', () => {
    expect(docHauQua('mở manh mối clue-a, đi tới s-1, trừ uy tín')).toEqual([{ kind: 'mo-manh-moi', id: 'clue-a' }, { kind: 'di-toi', chuoi: 's-1' }, { kind: 'tru-uy-tin' }]);
    expect(() => docHauQua('bay lên trời')).toThrow(/hậu quả lạ/);
    const khung = [{ id: 'sang', ten: 'Sáng' }, { id: 'trua', ten: 'Trưa' }];
    expect(docMoc('ngày 3 trưa', khung)).toEqual({ kind: 'ngay', ngay: 3, khung: 'trua' });
    expect(docMoc('ngày 2', khung)).toEqual({ kind: 'ngay', ngay: 2, khung: 'sang' });
    expect(docMoc('mở đầu', khung)).toEqual({ kind: 'mo-dau' });
    expect(() => docMoc('tuần 2', khung)).toThrow(/mốc thời gian lạ/);
  });
});

describe('dữ liệu cố định (du-lieu.md) và chạy thật số dòng khai (QĐ-089)', () => {
  const DU_LIEU = [
    '# Dữ liệu thử {dữ liệu: vu0}',
    '## lop {bảng}',
    '- Cột: ma_lop TEXT, toa INTEGER',
    '| ma_lop | toa |',
    '|---|---|',
    '| A1 | 1 |',
    '| A2 | 2 |',
    '<!-- chú thích',
    '     nhiều dòng -->',
    '| B1 | 1 |',
    '## lop_toa_1 {bảng ảo}',
    '- Ghi chú: lớp ở tòa 1',
    '```sql',
    'SELECT ma_lop FROM lop WHERE toa = 1',
    '```',
    '',
  ].join('\n');
  const tep =(noiDung: string) => ({ duongDan: 'noi-dung-mvp/du-lieu.md', noiDung });

  it('đọc bảng, kiểu cột, bảng ảo; chú thích nhiều dòng bỏ qua', () => {
    const kq = docDuLieuMvp(tep(DU_LIEU));
    expect(kq.loi).toEqual([]);
    expect(kq.duLieu.bang).toEqual([
      {
        ten: 'lop',
        cot: [
          { ten: 'ma_lop', kieu: 'TEXT' },
          { ten: 'toa', kieu: 'INTEGER' },
        ],
        dong: [
          ['A1', 1],
          ['A2', 2],
          ['B1', 1],
        ],
        viTri: { tep: 'noi-dung-mvp/du-lieu.md', dong: 2 },
      },
    ]);
    expect(kq.duLieu.bangAo.map((v) => [v.ten, v.sql])).toEqual([['lop_toa_1', 'SELECT ma_lop FROM lop WHERE toa = 1']]);
  });

  it('lỗi dữ liệu báo đúng <tệp>:<dòng>: tiêu đề cột lệch, ô không phải số, thiếu ô, ô trống, bảng trùng', () => {
    const sai = DU_LIEU.replace('| ma_lop | toa |', '| ma_lop | toa_nha |')
      .replace('| A2 | 2 |', '| A2 | hai |')
      .replace('| B1 | 1 |', '| B1 |\n| | 3 |')
      .replace('## lop_toa_1 {bảng ảo}', '## lop {bảng ảo}');
    expect(docDuLieuMvp(tep(sai)).loi.map(dinhDangLoi)).toEqual([
      'noi-dung-mvp/du-lieu.md:4: bảng lop: hàng tiêu đề phải đúng tên cột theo thứ tự "- Cột:" (ma_lop, toa); đang là: ma_lop, toa_nha',
      'noi-dung-mvp/du-lieu.md:7: bảng lop, cột toa (INTEGER): "hai" không phải số nguyên',
      'noi-dung-mvp/du-lieu.md:10: bảng lop: hàng có 1 ô, bảng có 2 cột',
      'noi-dung-mvp/du-lieu.md:11: bảng lop, cột ma_lop: ô trống — ghi NULL nếu cố ý để rỗng',
      'noi-dung-mvp/du-lieu.md:12: bảng "lop" khai hai lần (lần đầu ở dòng 2)',
    ]);
  });

  it('chạy thật: khớp thì không lỗi; lệch số dòng hay SQL lỗi báo <tệp>:<dòng> của chỗ khai', async () => {
    const { duLieu } = docDuLieuMvp(tep(DU_LIEU));
    const kq = await kiemSoDongMvp(duLieu, [
      { sql: 'SELECT * FROM lop_toa_1;', soDong: 2, noi: 'noi-dung-mvp/kich-ban/01.md:12 [LỌC THỬ lt-1]' },
      { sql: "SELECT * FROM lop WHERE toa = 1 OR ma_lop = 'A2'", soDong: 2, noi: 'noi-dung-mvp/kich-ban/06.md:8 [MÀN CHIẾU mc-or]' },
      { sql: 'SELECT ten FROM lop', soDong: 1, noi: 'noi-dung-mvp/thu-thach/c1.md:5 thẻ c1, SQL chuẩn' },
      { sql: 'DELETE FROM lop', soDong: 0, noi: 'noi-dung-mvp/thu-thach/c1.md:9 thẻ c2, SQL chuẩn' },
    ]);
    expect(kq.ketQua.map((k) => k.soDongThat)).toEqual([2, 3, null, null]);
    expect(kq.loi).toEqual([
      "noi-dung-mvp/kich-ban/06.md:8: [MÀN CHIẾU mc-or]: khai 2 dòng nhưng chạy thật trên noi-dung-mvp/du-lieu.md ra 3 dòng — SELECT * FROM lop WHERE toa = 1 OR ma_lop = 'A2'",
      'noi-dung-mvp/thu-thach/c1.md:5: thẻ c1, SQL chuẩn: câu SQL lỗi khi chạy trên noi-dung-mvp/du-lieu.md: no such column: ten — SELECT ten FROM lop',
      'noi-dung-mvp/thu-thach/c1.md:9: thẻ c2, SQL chuẩn: câu SQL lỗi khi chạy trên noi-dung-mvp/du-lieu.md: chỉ chạy được câu SELECT — DELETE FROM lop',
    ]);
  });

  it('có câu khai số dòng mà thiếu du-lieu.md là lỗi', async () => {
    const kq = await kiemSoDongMvp(null, [{ sql: 'SELECT 1', soDong: 1, noi: 'noi-dung-mvp/kich-ban/01.md:12 [LỌC THỬ lt-1]' }]);
    expect(kq.loi).toEqual(['noi-dung-mvp/kich-ban/01.md:12: [LỌC THỬ lt-1]: khai 1 dòng nhưng noi-dung-mvp/ thiếu du-lieu.md để chạy thật (QĐ-089)']);
  });
});
