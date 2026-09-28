// @vitest-environment node
/**
 * Test của BỘ ĐỌC NỘI DUNG (tools/noi-dung): báo lỗi đúng `<tệp>:<dòng>`, biến tên, cú pháp mới
 * (màn chiếu, đặt cờ, chú thích hồ sơ, thẻ chữ, truy vấn nạp sẵn), lệnh `kiem-noi-dung`.
 * Nội dung thật đọc được trọn và khớp game: xem faithfulness.test.ts.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { thayBien, type BangTen } from '../../../../tools/noi-dung/bien.ts';
import { dinhDangLoi, docNoiDung, type LoaiTep, type TepNoiDung } from '../../../../tools/noi-dung/doc.ts';
import { kiemNoiDung } from '../../../../tools/noi-dung/kiem.ts';
import { docModelNapSan } from '../../../../tools/noi-dung/nap-san.ts';
import { characterName } from '../../../shared/display-names';
import { CHARACTER_IDS } from '../../../shared/ids';
import { CHARACTER_PROFILES } from '../../../evidence/character-profiles';
import { bangTenTam, tenTrongCau, TRUONG_TAM } from './nguon-ten';

const BANG: BangTen = bangTenTam();

const QUY_UOC: TepNoiDung = { duongDan: 'noi-dung/quy-uoc.md', loai: 'quy-uoc', noiDung: '# Tên game — thử\n\nQuy ước bất kỳ.\n' };
const HO_SO = [
  '## Hồ sơ vật chứng',
  '- [DÀN DỰNG] chỉ dẫn chung',
  '### clue-a — Manh mối A',
  '- Tiêu đề: A',
  '### ev-x — chú thích',
  '- Chú thích: Đã hủy.',
].join('\n');
const THE = [
  '### c1 — Thử {challenge: c1}',
  '- Tiêu đề: Thử thách 1',
  '- SQL chuẩn:',
  '',
  '```sql',
  'SELECT a FROM t;',
  '```',
  '',
  '- Vật chứng lưu vào hồ sơ: ev-x',
  '  - Tiêu đề: X',
  '  - Mô tả: Y',
].join('\n');

function doc(kichBan: string, them: { duongDan: string; loai: LoaiTep; noiDung: string }[] = [], bangTen: BangTen | null = BANG) {
  return docNoiDung(
    [
      QUY_UOC,
      { duongDan: 'noi-dung/kich-ban/chinh/01-thu.md', loai: 'kich-ban', noiDung: kichBan },
      { duongDan: 'noi-dung/thu-thach/c1.md', loai: 'thu-thach', noiDung: THE },
      ...them,
      { duongDan: 'noi-dung/ho-so/01.md', loai: 'ho-so', noiDung: HO_SO },
    ],
    bangTen ? { bangTen } : {},
  );
}
const loiCua = (r: ReturnType<typeof doc>): string[] => r.loi.map(dinhDangLoi);
const KB = (...dong: string[]): string => ['## Phần 1 — Thử {part: intro}', '', '### s-1 — Chuỗi {scene: clb-room}', '', ...dong].join('\n');

describe('báo lỗi <tệp>:<dòng>', () => {
  it('kịch bản mẫu hợp lệ: không lỗi', () => {
    const r = doc(KB('- **ha-vy** (neutral): Chào.', '- [ĐI TỚI s-1]'));
    expect(loiCua(r)).toEqual([]);
    expect(r.script.title).toBe('Tên game — thử');
  });

  it('dòng lạ trong chuỗi → đúng tệp, đúng dòng; đọc tiếp để gom nhiều lỗi một lượt', () => {
    const r = doc(KB('- **ha-vy** (neutral): Chào.', 'dòng viết tự do', '- [KHÔNG CÓ]'));
    expect(loiCua(r)).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:6: dòng không khớp quy ước nào trong phần kể chuyện: "dòng viết tự do"',
      'noi-dung/kich-ban/chinh/01-thu.md:7: dòng không khớp quy ước nào trong phần kể chuyện: "- [KHÔNG CÓ]"',
    ]);
  });

  it('tham chiếu tới chuỗi / thẻ không tồn tại: lỗi ở dòng tham chiếu', () => {
    const r = doc(KB('- [ĐI TỚI khong-co]', '- [THỬ THÁCH c9]', '- [HIỆN TÀI LIỆU doc-z]'));
    expect(loiCua(r)).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:5: không có chuỗi "khong-co"',
      'noi-dung/kich-ban/chinh/01-thu.md:6: không có thẻ thử thách "c9"',
      'noi-dung/kich-ban/chinh/01-thu.md:7: không có thẻ hồ sơ "doc-z"',
    ]);
  });

  it('định danh chuỗi trùng giữa hai tệp', () => {
    const r = doc(KB('- [ĐI TỚI s-1]'), [
      { duongDan: 'noi-dung/kich-ban/chinh/02-thu.md', loai: 'kich-ban', noiDung: '## Phần 2 — B {part: debrief}\n### s-1 — Lại {scene: clb-room}\n' },
    ]);
    expect(loiCua(r)).toEqual(['noi-dung/kich-ban/chinh/02-thu.md:2: chuỗi "s-1" trùng định danh với noi-dung/kich-ban/chinh/01-thu.md:3']);
  });

  it('tệp kịch bản thiếu tiêu đề phần; khối sql không thuộc màn chiếu', () => {
    const r = docNoiDung([QUY_UOC, { duongDan: 'k.md', loai: 'kich-ban', noiDung: '### s — x {scene: a}\n' }]);
    expect(loiCua(r)).toContain('k.md:1: chuỗi nằm trước tiêu đề "## Phần …"');
    expect(loiCua(r)).toContain('k.md:1: tệp kịch bản phải mở đầu bằng "## Phần N — <Tên> {part: <mã>}"');
    const r2 = doc(KB('```sql', 'SELECT 1;', '```'));
    expect(loiCua(r2)).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:5: khối ```sql trong kịch bản phải nằm ngay dưới một [MÀN CHIẾU …] (không ghi "vật chứng" hay "truy vấn nạp sẵn")',
    ]);
  });
});

describe('cú pháp mới (đặc tả 6.3)', () => {
  it('[MÀN CHIẾU] nguồn sql (khối ngay dưới, cho phép dòng trống) và nguồn vật chứng', () => {
    const r = doc(KB('- [MÀN CHIẾU p1 · chạy · 24 dòng]', '', '```sql', 'SELECT a', 'FROM t;', '```', '- [MÀN CHIẾU p2 · vật chứng ev-x · không chạy]'));
    expect(loiCua(r)).toEqual([]);
    expect(r.script.sequences[0]?.items).toEqual([
      { kind: 'projector', id: 'p1', source: { kind: 'sql', sql: 'SELECT a\nFROM t;' }, run: true, rows: 24 },
      { kind: 'projector', id: 'p2', source: { kind: 'evidence', evidenceId: 'ev-x' }, run: false, rows: null },
    ]);
  });

  it('[MÀN CHIẾU … · truy vấn nạp sẵn <thẻ>]: SQL lấy từ "Truy vấn nạp sẵn" của thẻ (viết một chỗ)', () => {
    const the = ['### c2 — B {challenge: c2}', '- Truy vấn nạp sẵn:', '', '```sql', 'SELECT a', 'FROM t;', '```'].join('\n');
    const r = doc(KB('- [MÀN CHIẾU p1 · truy vấn nạp sẵn c2 · chạy · 3 dòng]'), [{ duongDan: 'noi-dung/thu-thach/c2.md', loai: 'thu-thach', noiDung: the }]);
    expect(loiCua(r)).toEqual([]);
    expect(r.script.sequences[0]?.items).toEqual([{ kind: 'projector', id: 'p1', source: { kind: 'sql', sql: 'SELECT a\nFROM t;' }, run: true, rows: 3 }]);
    expect(loiCua(doc(KB('- [MÀN CHIẾU p1 · truy vấn nạp sẵn c1 · chạy]')))).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:5: [MÀN CHIẾU p1]: thẻ "c1" không có "- Truy vấn nạp sẵn:" + khối sql',
    ]);
    expect(loiCua(doc(KB('- [MÀN CHIẾU p1 · truy vấn nạp sẵn c9 · chạy]')))).toEqual(['noi-dung/kich-ban/chinh/01-thu.md:5: không có thẻ thử thách "c9"']);
    expect(loiCua(doc(KB('- [MÀN CHIẾU p1 · vật chứng ev-x · truy vấn nạp sẵn c1 · chạy]')))).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:5: [MÀN CHIẾU]: chỉ một nguồn — "vật chứng <mã>" hoặc "truy vấn nạp sẵn <thẻ>"',
    ]);
  });

  it('[MÀN CHIẾU] thiếu khối sql / thiếu "chạy" / vật chứng không có', () => {
    expect(loiCua(doc(KB('- [MÀN CHIẾU p1 · chạy]', '- **ha-vy** (neutral): A.')))).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:6: [MÀN CHIẾU p1] thiếu khối ```sql ngay dưới',
    ]);
    expect(loiCua(doc(KB('- [MÀN CHIẾU p1 · 2 dòng]')))).toEqual(['noi-dung/kich-ban/chinh/01-thu.md:5: [MÀN CHIẾU]: phải ghi "chạy" hoặc "không chạy"']);
    expect(loiCua(doc(KB('- [MÀN CHIẾU p1 · vật chứng ev-z · chạy]')))).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:5: không thẻ thử thách nào lưu vật chứng "ev-z"',
    ]);
  });

  it('[ĐẶT CỜ], [CHÚ THÍCH HỒ SƠ] (chữ lấy từ thẻ hồ sơ), [THẺ CHỮ], [KẾT THÚC]', () => {
    const r = doc(KB('- [ĐẶT CỜ access-revoked]', '- [CHÚ THÍCH HỒ SƠ ev-x · làm mờ]', '- [THẺ CHỮ] **narrator**: Thông điệp.', '- [KẾT THÚC]'));
    expect(loiCua(r)).toEqual([]);
    expect(r.script.sequences[0]?.items).toEqual([
      { kind: 'set-flag', flag: 'access-revoked' },
      { kind: 'annotate-evidence', id: 'ev-x', note: 'Đã hủy.', redact: true },
      { kind: 'line', line: { speaker: 'narrator', expression: null, text: 'Thông điệp.' }, card: true },
      { kind: 'end' },
    ]);
  });

  it('[CHÚ THÍCH HỒ SƠ] cho thẻ hồ sơ không có dòng "Chú thích:"', () => {
    const r = doc(KB('- [CHÚ THÍCH HỒ SƠ ev-x]'), [
      { duongDan: 'noi-dung/thu-thach/c2.md', loai: 'thu-thach', noiDung: '### c2 — B {challenge: c2}\n- Vật chứng lưu vào hồ sơ: ev-y\n' },
    ]);
    expect(loiCua(r)).toEqual([]);
    const r2 = doc(KB('- [CHÚ THÍCH HỒ SƠ ev-y]'), [
      { duongDan: 'noi-dung/thu-thach/c2.md', loai: 'thu-thach', noiDung: '### c2 — B {challenge: c2}\n- Vật chứng lưu vào hồ sơ: ev-y\n' },
    ]);
    expect(loiCua(r2)).toEqual(['noi-dung/kich-ban/chinh/01-thu.md:5: [CHÚ THÍCH HỒ SƠ ev-y]: thẻ hồ sơ "ev-y" không có dòng "- Chú thích: …"']);
  });
});

describe('truy vấn nạp sẵn (đặc tả 9.1)', () => {
  const OR = ["SELECT ma_sv, ten", 'FROM sinh_vien', "WHERE ten LIKE 'H%'", "   OR ma_lop IN ('KT24A', 'QT24B')", "   OR clb = 'Báo chí';"].join('\n');

  it('dựng model: bảng, cột, phép nối, điều kiện + nguồn', () => {
    expect(docModelNapSan(OR, 'a ← clue-a · b ← ev-x · c ← tu-nhap')).toEqual({
      table: 'sinh_vien',
      columns: ['ma_sv', 'ten'],
      connector: 'OR',
      conditions: [
        { id: 'a', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-a' } },
        { id: 'b', column: 'ma_lop', op: 'in', value: ['KT24A', 'QT24B'], source: { kind: 'evidence', evidenceId: 'ev-x' } },
        { id: 'c', column: 'clb', op: 'eq', value: 'Báo chí', source: { kind: 'manual' } },
      ],
    });
  });

  it('từ chối thứ trình dựng không dựng được', () => {
    expect(() => docModelNapSan("SELECT a FROM t WHERE a = 'x' AND b = 'y' OR c = 'z';", 'p ← tu-nhap · q ← tu-nhap · r ← tu-nhap')).toThrow('MỘT phép nối');
    expect(() => docModelNapSan("SELECT a FROM t WHERE a > 3;", 'p ← tu-nhap')).toThrow('không dựng được');
    expect(() => docModelNapSan("SELECT a FROM t WHERE a = 'x';", '')).toThrow('1 điều kiện trong WHERE nhưng 0 mục');
  });

  it('lỗi trong thẻ báo ở dòng tiêu đề thẻ', () => {
    const the = ['### c2 — B {challenge: c2}', '- Truy vấn nạp sẵn:', '', '```sql', "SELECT a FROM t WHERE a = 'x';", '```', '- Nguồn điều kiện nạp sẵn: p ← doc-khong'].join('\n');
    const r = doc(KB(), [{ duongDan: 'noi-dung/thu-thach/c2.md', loai: 'thu-thach', noiDung: the }]);
    expect(loiCua(r)).toEqual(['noi-dung/thu-thach/c2.md:1: thẻ c2, truy vấn nạp sẵn: nguồn "doc-khong" phải là clue-…, ev-… hoặc tu-nhap']);
  });
});

describe('biến tên (đặc tả 10.4)', () => {
  it('nguồn tạm = CHARACTER_NAMES + họ tên hồ sơ nhân vật; tên trường giữ tên cũ ở bước chuẩn hóa', () => {
    expect(Object.keys(BANG.nv)).toEqual([...CHARACTER_IDS]);
    for (const id of CHARACTER_IDS) {
      expect(BANG.nv[id]).toEqual({ ten: characterName(id), 'ho-ten': CHARACTER_PROFILES[id].fullName, 'trong-cau': tenTrongCau(characterName(id)) });
    }
    expect(BANG.truong).toEqual(TRUONG_TAM);
    expect(TRUONG_TAM['ten-khong-tien-to']).toBe('Đại học Hoa Phượng');
  });

  it('thay đúng: mặc định dạng `ten`, dạng ghi rõ, tên trường', () => {
    expect(thayBien('Hỏi {{nv.bac-tu}} và {{nv.ha-vy.ten}} ở {{truong.ten-ngan}}.', BANG)).toEqual({
      chu: `Hỏi ${characterName('bac-tu')} và ${characterName('ha-vy')} ở ${TRUONG_TAM['ten-ngan']}.`,
      loi: [],
    });
  });

  it('mã / dạng không tồn tại, mã giữ chỗ, biến lạ, ngoặc lẻ', () => {
    expect(thayBien('{{nv.khong-co}}', BANG).loi[0]).toMatch(/^biến "\{\{nv\.khong-co\}\}": không có nhân vật mã "khong-co"/);
    expect(thayBien('{{nv.bac-tu.biet-danh}}', BANG).loi).toEqual(['biến "{{nv.bac-tu.biet-danh}}": nhân vật "bac-tu" không có dạng tên "biet-danh" (có: ten, ho-ten, trong-cau)']);
    expect(thayBien('{{nv.nguoi-choi}}', BANG).loi[0]).toContain('giữ chỗ');
    expect(thayBien('{{truong.ten}}', BANG).loi[0]).toContain('truong.ten-day-du, truong.ten-ngan');
    expect(thayBien('{{so-lop-toa-b}}', BANG).loi[0]).toContain('không tồn tại');
    expect(thayBien('{{nv.tung', BANG).loi).toEqual(['dấu {{ hoặc }} lẻ — biến phải viết liền {{…}}']);
  });

  it('bộ đọc thay biến trước khi đọc; lỗi biến ghi đúng <tệp>:<dòng>', () => {
    const r = doc(KB('- **ha-vy** (neutral): Gặp {{nv.tung}} ở {{truong.ten-day-du}}.', '- **ha-vy** (neutral): {{nv.khong-co}}'));
    const items = r.script.sequences[0]?.items;
    expect(items?.[0]).toEqual({
      kind: 'line',
      line: { speaker: 'ha-vy', expression: 'neutral', text: `Gặp ${characterName('tung')} ở ${TRUONG_TAM['ten-day-du']}.` },
      card: false,
    });
    expect(loiCua(r)).toEqual([
      `noi-dung/kich-ban/chinh/01-thu.md:6: biến "{{nv.khong-co}}": không có nhân vật mã "khong-co" (có: ${CHARACTER_IDS.join(', ')})`,
    ]);
    expect(loiCua(doc(KB('- **ha-vy** (neutral): {{nv.tung}}'), [], null))).toEqual([
      'noi-dung/kich-ban/chinh/01-thu.md:5: có biến {{…}} nhưng không có bảng tên để thay',
    ]);
  });
});

describe('lệnh kiem-noi-dung', () => {
  const tam: string[] = [];
  afterEach(() => {
    for (const d of tam.splice(0)) rmSync(d, { recursive: true, force: true });
  });

  it('nội dung thật: không lỗi', () => {
    const kq = kiemNoiDung();
    expect(kq.loi).toEqual([]);
    expect(kq.tomTat).toBe('noi-dung: 15 tệp, không lỗi — 5 phần, 20 chuỗi, 99 lời thoại, 4 thẻ thử thách, 9 thẻ hồ sơ.');
  });

  it('thư mục có lỗi: tệp lạc chỗ, lỗi từng dòng; README.md bỏ qua', () => {
    const goc = mkdtempSync(join(tmpdir(), 'noi-dung-'));
    tam.push(goc);
    mkdirSync(join(goc, 'kich-ban', 'chinh'), { recursive: true });
    writeFileSync(join(goc, 'quy-uoc.md'), '# T\n');
    writeFileSync(join(goc, 'README.md'), 'hướng dẫn, dòng nào cũng được\n');
    writeFileSync(join(goc, 'lac-cho.md'), 'x\n');
    writeFileSync(join(goc, 'kich-ban', 'chinh', '01-a.md'), '## Phần 1 — A {part: intro}\n### s — x {scene: a}\n- **tung** (neutral): {{nv.khong-co}}\n');
    const kq = kiemNoiDung(goc);
    expect(kq.loi).toEqual([
      'noi-dung/lac-cho.md:1: tệp nằm ngoài các thư mục bộ đọc biết (quy-uoc.md, kich-ban/chinh, thu-thach, chung, ho-so)',
      `noi-dung/kich-ban/chinh/01-a.md:3: biến "{{nv.khong-co}}": không có nhân vật mã "khong-co" (có: ${CHARACTER_IDS.join(', ')})`,
    ]);
    expect(kq.tomTat).toBe('noi-dung: 2 tệp, 2 lỗi.');
  });
});
