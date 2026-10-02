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

/** Biến thể chương 1 (ĐÃ CHỐT C, 30/09/2026): ngày 1 theo truyện — một chuỗi, không địa điểm, lựa chọn bằng [RẼ NHÁNH]. */
const THEO_TRUYEN: Record<string, string | ((s: string) => string)> = {
  'dia-diem.md': '',
  'lich.md': (s) => s.replace('## Ngày 1 — Thử {ngày: 1}\n- Dữ kiện chính: dk-chinh\n- Buổi tối: toi-1', '## Ngày 1 — Thử {ngày: 1 · theo truyện}\n- Chuỗi: n1'),
  'kich-ban/01.md': (s) =>
    s.slice(0, s.indexOf('### s-chinh')) +
    [
      '### n1 — Ngày 1 {cảnh: c1}',
      '- [HẬU QUẢ] mở manh mối clue-x',
      '- [RẼ NHÁNH r1] tung: "Đi đâu?"',
      '  - {id: a} Xem thêm. → hậu quả: đi tới s-phu',
      '  - {id: b} Về. → hậu quả: đi tới s-ve',
      '### s-phu — Phụ {cảnh: c1}',
      '- [LƯU BẰNG CHỨNG ev-y]',
      '### s-ve — Về {cảnh: c1}',
      '- **tung** (neutral): Về thôi.',
      '',
    ].join('\n') +
    s.slice(s.indexOf('### hop')),
};
/** Đọc biến thể theo truyện, rồi áp thêm `them` lên kết quả của biến thể. */
const docTheoTruyen = (them: Record<string, (s: string) => string> = {}): string[] =>
  doc(
    Object.fromEntries(
      Object.keys({ ...THEO_TRUYEN, ...them }).map((p) => [
        p,
        (s: string): string => {
          const g = THEO_TRUYEN[p];
          const s1 = g === undefined ? s : typeof g === 'string' ? g : g(s);
          return them[p]?.(s1) ?? s1;
        },
      ]),
    ),
  );

describe('bộ MVP: ngày theo truyện', () => {
  it('đọc sạch: ngày một chuỗi, dia-diem.md rỗng; vật phẩm của một lựa chọn [RẼ NHÁNH] đủ làm điều kiện true end', () => {
    expect(docTheoTruyen()).toEqual([]);
  });

  it('true end chỉ cần vật phẩm trên đường bắt buộc (không qua lựa chọn) → lỗi', () => {
    const loi = docTheoTruyen({ 'kich-ban/01.md': (s) => s.replace('- [ĐIỀU KIỆN] có ev-y', '- [ĐIỀU KIỆN] có clue-x') });
    expect(loi).toEqual([expect.stringMatching(/kich-ban\/01\.md:\d+: điều kiện true end thỏa chỉ với dữ kiện chính \/ đường chạy bắt buộc/)]);
  });

  it('thiếu "Chuỗi", có dòng của ngày địa điểm, chuỗi không có → lỗi ở lich.md', () => {
    expect(docTheoTruyen({ 'lich.md': (s) => s.replace('- Chuỗi: n1', '- Dữ kiện chính: dk-chinh') })).toEqual(
      expect.arrayContaining([expect.stringMatching(/lich\.md:\d+: ngày 1 \(theo truyện\) có dòng lạ: Dữ kiện chính/), expect.stringMatching(/lich\.md:\d+: ngày 1 \(theo truyện\) thiếu dòng "- Chuỗi: …"/)]),
    );
    expect(docTheoTruyen({ 'lich.md': (s) => s.replace('- Chuỗi: n1', '- Chuỗi: khong-co') })).toEqual(expect.arrayContaining([expect.stringMatching(/lich\.md:\d+: ngày 1, "Chuỗi": không có chuỗi "khong-co"/)]));
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
    expect(loi).toEqual([
      'noi-dung-mvp/kich-ban/01.md:23: điều kiện true end thỏa chỉ với dữ kiện chính / đường chạy bắt buộc — true end phải cần ít nhất một dữ kiện phụ hay một lựa chọn [RẼ NHÁNH] (QĐ-086)',
    ]);
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

describe('dòng "- Ảnh:" của dữ kiện (vật tương tác trên nền, QĐ-089)', () => {
  const docDu = (sua: Record<string, (s: string) => string>, spriteVat?: ReadonlySet<string>) => {
    const tep: TepMvp[] = Object.entries(GOC).map(([p, s]) => ({ duongDan: `noi-dung-mvp/${p}`, loai: loaiCua(p), noiDung: sua[p]?.(s) ?? s }));
    const kq = docNoiDungMvp(tep);
    const luat = kiemLuatMvp(kq.mvp, spriteVat ? { spriteVat } : {});
    return { mvp: kq.mvp, loi: [...kq.loi, ...luat.loi].map(dinhDangLoi), canhBao: luat.canhBao.map(dinhDangLoi) };
  };
  const VAT = new Set(['obj-ban-may']);
  /** Chèn một dòng ngay sau tiêu đề dữ kiện `dk` (tiêu đề giữ số dòng; lỗi của dữ kiện báo ở dòng tiêu đề). */
  const themAnh = (dk: string, dong: string) => (s: string) => s.replace(new RegExp(`(### ${dk} — [^\\n]+\\n)`), `$1${dong}\n`);

  it('đúng cú pháp: đọc ra sprite + x, y, rộng; không lỗi; dữ kiện thiếu Ảnh chỉ CẢNH BÁO', () => {
    const kq = docDu({ 'dia-diem.md': (s) => themAnh('dk-phu', '- Ảnh: nv:tung · x 30% · y 90% · rộng 12,5%')(themAnh('dk-may', '- Ảnh: obj-ban-may · x 62% · y 48% · rộng 9%')(s)) }, VAT);
    expect(kq.loi).toEqual([]);
    const tatCa = kq.mvp.diaDiem.flatMap((d) => d.duKien);
    expect(tatCa.find((k) => k.id === 'dk-may')?.anh).toEqual({ sprite: 'obj-ban-may', x: 62, y: 48, rong: 9 });
    expect(tatCa.find((k) => k.id === 'dk-phu')?.anh).toEqual({ sprite: 'nv:tung', x: 30, y: 90, rong: 12.5 });
    expect(kq.canhBao).toEqual(['noi-dung-mvp/dia-diem.md:3: dữ kiện dk-chinh chưa có dòng "- Ảnh:" — chỉ chọn được qua danh sách chữ']);
  });

  it('sai cú pháp, sprite không tồn tại, nhân vật lạ, ngoài 0–100, hai dòng Ảnh → lỗi <tệp>:<dòng>', () => {
    const mot = (dong: string): string[] => docDu({ 'dia-diem.md': themAnh('dk-may', dong) }, VAT).loi;
    expect(mot('- Ảnh: obj-ban-may x 62 y 48')).toEqual([expect.stringMatching(/^noi-dung-mvp\/dia-diem\.md:12: dữ kiện dk-may: "Ảnh" phải là/)]);
    expect(mot('- Ảnh: obj-khong-co · x 62% · y 48% · rộng 9%')).toEqual(['noi-dung-mvp/dia-diem.md:12: dữ kiện dk-may, "Ảnh": không có ảnh vật "obj-khong-co" trong src/assets/mvp/vat/']);
    expect(mot('- Ảnh: nv:ai-do · x 62% · y 48% · rộng 9%')).toEqual(['noi-dung-mvp/dia-diem.md:12: dữ kiện dk-may, "Ảnh": không có nhân vật "ai-do" trong nhan-vat.md']);
    expect(mot('- Ảnh: obj-ban-may · x 162% · y 48% · rộng 0%')).toEqual([
      'noi-dung-mvp/dia-diem.md:12: dữ kiện dk-may, "Ảnh": x phải trong 0–100%: 162%',
      'noi-dung-mvp/dia-diem.md:12: dữ kiện dk-may, "Ảnh": rộng phải lớn hơn 0%',
    ]);
    expect(mot('- Ảnh: obj-ban-may · x 62% · y 48% · rộng 9%\n- Ảnh: obj-ban-may · x 10% · y 48% · rộng 9%')).toEqual([expect.stringMatching(/^noi-dung-mvp\/dia-diem\.md:14: .*"Ảnh" lặp lại/)]);
    // Không truyền danh sách ảnh vật (test trong bộ nhớ) → không kiểm tệp.
    expect(docDu({ 'dia-diem.md': themAnh('dk-may', '- Ảnh: obj-khong-co · x 62% · y 48% · rộng 9%') }).loi).toEqual([]);
  });

  it('hai dữ kiện cùng nơi dùng chung một vật phải cùng tọa độ', () => {
    const cung = (x2: string): string[] =>
      docDu({ 'dia-diem.md': (s) => themAnh('dk-phu', `- Ảnh: obj-ban-may · x ${x2}% · y 48% · rộng 9%`)(themAnh('dk-chinh', '- Ảnh: obj-ban-may · x 62% · y 48% · rộng 9%')(s)) }, VAT).loi;
    expect(cung('62')).toEqual([]);
    expect(cung('10')).toEqual(['noi-dung-mvp/dia-diem.md:7: dữ kiện dk-phu, "Ảnh": vật "obj-ban-may" đã đặt ở dữ kiện dk-chinh với tọa độ khác — dùng chung một vật thì cùng x, y, rộng']);
  });
});

describe('[KHÁM PHÁ] trong chuỗi (cảnh bấm vật, sảnh KTX của mở đầu)', () => {
  /** Chèn một [KHÁM PHÁ] vào cuối md-1 (sau [TẠO NHÂN VẬT]) cùng hai chuỗi con x-a, x-b. Dòng [KHÁM PHÁ] là dòng 7. */
  const themKham = (dongCon: string[]) => (s: string) =>
    s.replace(
      '  - lựa chọn: Kế toán · Marketing\n',
      ['  - lựa chọn: Kế toán · Marketing', '- [KHÁM PHÁ kp1]', ...dongCon, '### x-a — A {cảnh: c1}', '- **narrator**: A.', '### x-b — B {cảnh: c1}', '- **narrator**: B.', ''].join('\n'),
    );
  const docKham = (dongCon: string[], spriteVat?: ReadonlySet<string>) => {
    const tep: TepMvp[] = Object.entries(GOC).map(([p, s]) => ({ duongDan: `noi-dung-mvp/${p}`, loai: loaiCua(p), noiDung: p === 'kich-ban/01.md' ? themKham(dongCon)(s) : s }));
    const kq = docNoiDungMvp(tep);
    const luat = kiemLuatMvp(kq.mvp, spriteVat ? { spriteVat } : {});
    return { mvp: kq.mvp, loi: [...kq.loi, ...luat.loi].map(dinhDangLoi), mocChuoi: luat.mocChuoi };
  };

  it('đọc chỗ bấm: tọa độ, chuỗi, "sau:", "nhãn:"; chuỗi con nối vào mở đầu (không lẻ)', () => {
    const kq = docKham(['  - obj-a · x 10% · y 50% · rộng 5% → x-a · nhãn: Xem tờ giấy', '  - nv:tung · x 80% · y 100% · rộng 15% → x-b · sau: x-a'], new Set(['obj-a']));
    expect(kq.loi).toEqual([]);
    const kham = kq.mvp.chuoi.find((c) => c.id === 'md-1')?.items.find((it) => it.kind === 'explore');
    expect(kham).toEqual({
      kind: 'explore',
      id: 'kp1',
      kieu: 'canh',
      nhanVat: null,
      gio: null,
      diem: [
        { sprite: 'obj-a', x: 10, y: 50, rong: 5, chuoi: 'x-a', sau: [], nhan: 'Xem tờ giấy', dau: null, co: [] },
        { sprite: 'nv:tung', x: 80, y: 100, rong: 15, chuoi: 'x-b', sau: ['x-a'], nhan: null, dau: null, co: [] },
      ],
    });
    expect(kq.mocChuoi.get('x-a')).toBe(0);
    expect(kq.mocChuoi.get('x-b')).toBe(0);
  });

  it('lỗi: dòng con sai cú pháp, chuỗi không có, "sau:" lạ, mọi chỗ đều "sau:", ảnh vật không có', () => {
    expect(docKham(['  - obj-a x 10 y 50 → x-a']).loi).toEqual(expect.arrayContaining([expect.stringMatching(/^noi-dung-mvp\/kich-ban\/01\.md:8: \[KHÁM PHÁ\]: "Ảnh" phải là/)]));
    expect(docKham(['  - obj-a · x 10% · y 50% · rộng 5% → khong-co', '  - obj-a · x 20% · y 50% · rộng 5% → x-b']).loi).toEqual(
      expect.arrayContaining(['noi-dung-mvp/kich-ban/01.md:7: [KHÁM PHÁ kp1]: không có chuỗi "khong-co"']),
    );
    expect(docKham(['  - obj-a · x 10% · y 50% · rộng 5% → x-a · sau: x-b', '  - obj-a · x 20% · y 50% · rộng 5% → x-b · sau: x-a']).loi).toEqual(
      expect.arrayContaining(['noi-dung-mvp/kich-ban/01.md:7: [KHÁM PHÁ kp1]: phải có ít nhất một chỗ hiện ngay (không "sau:")']),
    );
    expect(docKham(['  - obj-a · x 10% · y 50% · rộng 5% → x-a', '  - obj-a · x 20% · y 50% · rộng 5% → x-b · sau: la']).loi).toEqual(
      expect.arrayContaining(['noi-dung-mvp/kich-ban/01.md:7: [KHÁM PHÁ kp1]: "sau: la" phải là chuỗi của một chỗ bấm khác trong cùng [KHÁM PHÁ]']),
    );
    expect(docKham(['  - obj-khong · x 10% · y 50% · rộng 5% → x-a', '  - obj-a · x 20% · y 50% · rộng 5% → x-b'], new Set(['obj-a'])).loi).toEqual([
      'noi-dung-mvp/kich-ban/01.md:7: [KHÁM PHÁ kp1]: không có ảnh vật "obj-khong" trong src/assets/mvp/vat/',
    ]);
  });
});

describe('thẻ giới thiệu nhân vật (nhan-vat.md: Danh xưng, Năm, Ngành, Câu nói, Giới thiệu)', () => {
  const docNv = (them: string) => {
    const tep: TepMvp[] = Object.entries(GOC).map(([p, s]) => ({
      duongDan: `noi-dung-mvp/${p}`,
      loai: loaiCua(p),
      noiDung: p === 'nhan-vat.md' ? s.replace('- Biểu cảm: neutral\n', `- Biểu cảm: neutral\n${them}`) : s,
    }));
    const kq = docNoiDungMvp(tep);
    return { mvp: kq.mvp, loi: [...kq.loi, ...kiemLuatMvp(kq.mvp).loi].map(dinhDangLoi) };
  };

  it('đủ dòng → đọc ra thẻ; không có dòng nào → null', () => {
    const kq = docNv('- Danh xưng: Bạn cùng phòng\n- Năm: Năm nhất\n- Câu nói: Tớ cá.\n- Giới thiệu: Hay đùa.\n');
    expect(kq.loi).toEqual([]);
    expect(kq.mvp.nhanVat.find((n) => n.id === 'tung')?.gioiThieu).toEqual({ lich: null, danhXung: 'Bạn cùng phòng', nam: 'Năm nhất', nganh: null, cauNoi: 'Tớ cá.', loi: 'Hay đùa.' });
    expect(kq.mvp.nhanVat.find((n) => n.id === 'quan')?.gioiThieu).toBeNull();
  });

  it('thiếu dòng bắt buộc → lỗi ở tiêu đề nhân vật', () => {
    expect(docNv('- Danh xưng: Bạn cùng phòng\n').loi).toEqual(['noi-dung-mvp/nhan-vat.md:1: nhân vật tung có thẻ giới thiệu nhưng thiếu dòng: Câu nói, Giới thiệu']);
  });
});

describe('[GHI SỔ] và thẻ thử thách không vật chứng (QĐ-092)', () => {
  const SO = ['# so1 — Trang thử {trang sổ: so1}', '- Loại: cú pháp', '## Trang chị Linh', 'Lọc bằng WHERE.', '## Vào sổ cá nhân', '- Chú thích: Lọc dòng dùng WHERE.', ''].join('\n');
  const docVoi = (suaKichBan: (s: string) => string, soTay: string = SO) => {
    const tep: TepMvp[] = [
      ...Object.entries(GOC).map(([p, s]) => ({ duongDan: `noi-dung-mvp/${p}`, loai: loaiCua(p), noiDung: p === 'kich-ban/01.md' ? suaKichBan(s) : s })),
      { duongDan: 'noi-dung-mvp/so-tay/so1.md', loai: 'so-tay' as const, noiDung: soTay },
    ];
    const kq = docNoiDungMvp(tep);
    return { mvp: kq.mvp, loi: [...kq.loi, ...kiemLuatMvp(kq.mvp).loi].map(dinhDangLoi) };
  };
  const themVaoMay = (dong: string) => (s: string) => s.replace('- **narrator**: Bàn làm việc.\n', `- **narrator**: Bàn làm việc.\n${dong}\n`);

  it('[GHI SỔ so1] đọc được; trang không có dòng "Vào sổ cá nhân" → lỗi; [CHÉP SỔ] → lỗi chỉ sang [GHI SỔ]', () => {
    const tot = docVoi(themVaoMay('- [GHI SỔ so1]'));
    expect(tot.loi).toEqual([]);
    expect(tot.mvp.chuoi.find((c) => c.id === 's-may')?.items).toContainEqual({ kind: 'notebook-note', trang: 'so1' });
    expect(docVoi(themVaoMay('- [GHI SỔ so1]'), SO.replace(/## Vào sổ cá nhân\n- Chú thích: .*\n/, '')).loi).toEqual([
      expect.stringMatching(/\[GHI SỔ so1\]: trang phải có mục "## Vào sổ cá nhân"/),
    ]);
    expect(docVoi(themVaoMay('- [CHÉP SỔ so1]')).loi).toEqual([expect.stringMatching(/\[CHÉP SỔ\] đã bỏ \(QĐ-092\)/)]);
    expect(docVoi((s) => s, SO.replace('## Vào sổ cá nhân', '## Chọn đoạn code\n- (A) {id: a} `x` [ĐÚNG]\n\n## Vào sổ cá nhân')).loi).toEqual([
      expect.stringMatching(/"## Chọn đoạn code" đã bỏ/),
    ]);
  });
});

describe('phản ứng sau mỗi lần chạy ("Khi …" trong thẻ thử thách, QĐ-092)', () => {
  const THE = (dong: string) =>
    ['### c1 — Thử {challenge: c1}', '- Tiêu đề: T', '- Đề bài hiển thị: Đ', '- SQL chuẩn:', '', '```sql', 'SELECT 1;', '```', '', dong, '- Vật chứng lưu vào hồ sơ: ev-z', '  - Tiêu đề: Z', '  - Mô tả: z', ''].join('\n');
  const docThe = (dong: string) => {
    const tep: TepMvp[] = [
      ...Object.entries(GOC).map(([p, s]) => ({ duongDan: `noi-dung-mvp/${p}`, loai: loaiCua(p), noiDung: p === 'kich-ban/01.md' ? s.replace('- **narrator**: Bàn làm việc.\n', '- **narrator**: Bàn làm việc.\n- [THỬ THÁCH c1]\n') : s })),
      { duongDan: 'noi-dung-mvp/thu-thach/c1.md', loai: 'thu-thach' as const, noiDung: THE(dong) },
    ];
    const kq = docNoiDungMvp(tep);
    return [...kq.loi, ...kiemLuatMvp(kq.mvp).loi].map(dinhDangLoi);
  };

  it('đúng quy ước → không lỗi; nhãn lạ, người nói lạ, biểu cảm không có → lỗi ở thẻ', () => {
    expect(docThe('- Khi chạy ra 0 dòng: **tung** (neutral): Không ai. <br> **minh-anh** (worried): Xem lại.')).toEqual([]);
    expect(docThe('- Khi lỗi không có cột: **tung**: Máy tìm cột.')).toEqual([]);
    expect(docThe('- Khi chạy ra nhiều dòng: **tung**: X.')).toEqual([expect.stringMatching(/thẻ c1: dòng "Khi chạy ra nhiều dòng" lạ/)]);
    expect(docThe('- Khi đúng: **ai-do**: X.')).toEqual([expect.stringMatching(/thẻ c1: phản ứng có người nói lạ "ai-do"/)]);
    expect(docThe('- Khi đúng: **tung** (smug): X.')).toEqual([expect.stringMatching(/thẻ c1: nhân vật tung không có biểu cảm "smug"/)]);
  });
});

describe('bộ MVP: [ẢNH …] chèn giữa hội thoại', () => {
  const tepVoi = (dong: string): TepMvp[] =>
    Object.entries(GOC).map(([p, s]) => ({
      duongDan: `noi-dung-mvp/${p}`,
      loai: loaiCua(p),
      noiDung: p === 'kich-ban/01.md' ? s.replace('- **tung** (neutral): Đây là dữ kiện phụ.', `- **tung** (neutral): Đây là dữ kiện phụ.
${dong}`) : s,
    }));
  it('đọc thành nút ảnh; có tệp thì sạch, thiếu tệp thì lỗi ở đúng dòng', () => {
    const kq = docNoiDungMvp(tepVoi('- [ẢNH chibi-408-vali]'));
    expect(kq.loi).toEqual([]);
    const phu = kq.mvp.chuoi.find((c) => c.id === 's-phu');
    expect(phu?.items.some((it) => it.kind === 'image' && it.id === 'chibi-408-vali')).toBe(true);
    expect(kiemLuatMvp(kq.mvp, { anh: new Set(['chibi-408-vali']) }).loi).toEqual([]);
    expect(kiemLuatMvp(kq.mvp, { anh: new Set(['khac']) }).loi.map(dinhDangLoi)).toEqual([
      expect.stringMatching(/kich-ban\/01\.md:\d+: \[ẢNH chibi-408-vali\]: không có tệp ảnh "chibi-408-vali"/),
    ]);
  });
});
