// @vitest-environment node
/**
 * Gói B21 — bộ đọc và máy kiểm cho cú pháp mới (docs/mua-1/loi-note-bang-chan-ly.md): chặng (`## Chặng n · … {chặng: n · …}`,
 * `Chốt khi`, `Khi chốt`, `Có mặt`, `[HẾT CHẶNG]`), note có loại / nguồn / keyword, `[ĐỔI LOẠI]`, `[CÁC CÂU NỐI]` + `[NỐI]`,
 * `[ĐỐI CHẤT … · chỉ ô · mẫu]`, nhãn khối tiếng Việt (`du-lieu.md`). Nền: bộ thử `noi-dung-thu-b21/` (đọc sạch, tệp sinh khớp);
 * mỗi test sửa một chỗ trong bộ nhớ rồi xem lỗi.
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { docNoiDungMvp, dinhDangLoi, docTuyChonLenh, type MucMvp, type RawMvp, type TepMvp } from '../../../../tools/noi-dung/doc-mvp.ts';
import { chuyenMvp } from '../../../../tools/noi-dung/chuyen-mvp.ts';
import { kiemLuatMvp } from '../../../../tools/noi-dung/luat-mvp.ts';
import { sinhVanBanThuB21, THU_MUC_NOI_DUNG_THU_B21, THU_MUC_SINH_THU_B21 } from '../../../../tools/noi-dung/sinh-thu-b21.ts';
import { tepLechTrenDia } from '../../../../tools/noi-dung/sinh.ts';
import { gomTepMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';

const GOC = gomTepMvp(THU_MUC_NOI_DUNG_THU_B21, 'noi-dung-thu-b21').tep;
const KB_TEP = 'noi-dung-thu-b21/kich-ban/01-vu-thu.md';
const LICH_TEP = 'noi-dung-thu-b21/lich.md';
const HO_SO_TEP = 'noi-dung-thu-b21/ho-so/01-the.md';
const DTG_TEP = 'noi-dung-thu-b21/dong-thoi-gian.md';
const DL_TEP = 'noi-dung-thu-b21/du-lieu.md';

/** Đọc bộ thử sau khi thay chữ trong một tệp (`sua`: [cũ, mới][]); trả lỗi đọc + lỗi luật đã định dạng và dữ liệu thô. */
function doc(sua: Record<string, [string, string][]> = {}): { loi: string[]; canhBao: string[]; mvp: RawMvp } {
  const tep: TepMvp[] = GOC.map((t) => {
    let noiDung = t.noiDung;
    for (const [cu, moi] of sua[t.duongDan] ?? []) {
      if (!noiDung.includes(cu)) throw new Error(`không thấy "${cu}" trong ${t.duongDan}`);
      noiDung = noiDung.replace(cu, moi);
    }
    return { ...t, noiDung };
  });
  const kq = docNoiDungMvp(tep);
  const luat = kiemLuatMvp(kq.mvp);
  return { loi: [...kq.loi, ...luat.loi].map(dinhDangLoi), canhBao: luat.canhBao.map(dinhDangLoi), mvp: kq.mvp };
}

const nut = (mvp: RawMvp, chuoi: string): MucMvp[] => mvp.chuoi.find((c) => c.id === chuoi)?.items ?? [];
const loiGop = (sua: Record<string, [string, string][]>): string => doc(sua).loi.join('\n');

describe('B21 · bộ thử đọc sạch, tệp sinh khớp', () => {
  it('đọc, kiểm, chuyển không lỗi; kich-ban.gen.ts khớp bản sinh lại (đỏ: `npm run noi-dung:sinh:thu-b21`)', () => {
    const kq = sinhVanBanThuB21();
    expect(kq.loi).toEqual([]);
    expect(tepLechTrenDia(kq.tep, THU_MUC_SINH_THU_B21)).toEqual([]);
    expect(readdirSync(THU_MUC_SINH_THU_B21).filter((t) => t.endsWith('.gen.ts'))).toEqual(['kich-ban.gen.ts']);
  });

  it('không cảnh báo nào', () => {
    expect(doc().canhBao).toEqual([]);
  });
});

describe('B21 · chặng (lich.md)', () => {
  const { mvp } = doc();

  it('`## Chặng n · <Tên> {chặng: n · bắt đầu ở … · ngày truyện … · giờ …}` + Chuỗi, Chốt khi, Khi chốt, Có mặt', () => {
    expect(mvp.lich?.ngay.map((n) => [n.so, n.ten, n.kieu, n.chuoi, n.batDauO])).toEqual([
      [1, 'Hoài nào?', 'theo-truyen', 'c1-ban-do', 'phong-clb'],
      [2, 'Hoài ra cổng lúc nào?', 'theo-truyen', 'c2-ban-do', 'phong-clb'],
    ]);
    expect(mvp.lich?.ngay[0]?.chang).toEqual({
      ngayTruyen: '2024-09-23',
      gio: '16:30',
      chotKhi: ['ev-hoai-bc24'],
      khiChot: 'c1-chot',
      coMat: [
        { nhanVat: 'minh-anh', noi: 'phong-clb' },
        { nhanVat: 'bac-thinh', noi: 'sanh-toa-b' },
      ],
    });
  });

  it('"Chốt khi" nhiều mã: `có a, b` hay `có a và có b` (VÀ)', () => {
    const a = doc({ [LICH_TEP]: [['- Chốt khi: có ev-hoai-bc24', '- Chốt khi: có ev-hoai-bc24 và có clue-the-lich']] });
    expect(a.loi).toEqual([]);
    expect(a.mvp.lich?.ngay[0]?.chang?.chotKhi).toEqual(['ev-hoai-bc24', 'clue-the-lich']);
    expect(doc({ [LICH_TEP]: [['- Chốt khi: có ev-hoai-bc24', '- Chốt khi: có ev-hoai-bc24, clue-the-lich']] }).mvp.lich?.ngay[0]?.chang?.chotKhi).toEqual(['ev-hoai-bc24', 'clue-the-lich']);
  });

  it('lỗi: mục lạ trong {chặng: …}; ngày truyện không có thật; "Chốt khi" mã lạ; "Khi chốt" chuỗi lạ; "Khi chốt" không có "Chốt khi"', () => {
    expect(loiGop({ [LICH_TEP]: [['· giờ: 16:30}', '· buổi: sáng}']] })).toMatch(/mục lạ "buổi: sáng"/);
    expect(loiGop({ [LICH_TEP]: [['ngày truyện: 2024-09-23', 'ngày truyện: 2024-02-30']] })).toMatch(/phải là ngày có thật/);
    expect(loiGop({ [LICH_TEP]: [['- Chốt khi: có ev-hoai-bc24', '- Chốt khi: có ev-khong-co']] })).toMatch(/chặng 1, "Chốt khi": không có mã "ev-khong-co"/);
    expect(loiGop({ [LICH_TEP]: [['- Khi chốt: c1-chot', '- Khi chốt: khong-co-chuoi']] })).toMatch(/chặng 1, "Khi chốt": không có chuỗi "khong-co-chuoi"/);
    expect(loiGop({ [LICH_TEP]: [['- Chốt khi: có ev-hoai-bc24\n', '']] })).toMatch(/có "Khi chốt" mà không có "Chốt khi"/);
  });

  it('chặng phải có lối ra: "Chốt khi" hoặc một [HẾT CHẶNG] tới được; "Có mặt" trỏ nhân vật và ghim có thật', () => {
    expect(loiGop({ [LICH_TEP]: [['- Chốt khi: có ev-hoai-bc24\n- Khi chốt: c1-chot\n', '']] })).toMatch(/chặng 1 không có lối ra/);
    expect(loiGop({ [KB_TEP]: [['- [HẾT CHẶNG]', '- [DÀN DỰNG] không hết chặng']] })).toMatch(/chặng 2 không có lối ra/);
    expect(loiGop({ [LICH_TEP]: [['minh-anh ở phong-clb, bac-thinh ở sanh-toa-b', 'ma-la ở phong-clb']] })).toMatch(/không có nhân vật "ma-la"/);
    expect(loiGop({ [LICH_TEP]: [['bac-thinh ở sanh-toa-b', 'bac-thinh ở san-bay']] })).toMatch(/không bản đồ nào có ghim "san-bay"/);
  });

  it('[HẾT CHẶNG] đọc thành nút het-chang; chuyển ghi `chang` vào lịch', () => {
    expect(nut(mvp, 'c2-cong').map((x) => x.kind)).toEqual(['line', 'consequence', 'challenge', 'line', 'doi-loai', 'dong-thoi-gian', 'het-chang']);
    const d = chuyenMvp(mvp, kiemLuatMvp(mvp));
    const ngay = (d.lich as { ngay: { chang?: { chotKhi: string[] } }[] }).ngay;
    expect(ngay[0]?.chang?.chotKhi).toEqual(['ev-hoai-bc24']);
    expect(ngay[1]?.chang).toBeDefined();
  });
});

describe('B21 · note có loại, nguồn, keyword; [ĐỔI LOẠI]', () => {
  it('lỗi: Loại lạ; keyword sai quy ước; keyword không có trong chữ hiện trên giấy là cảnh báo (không tô được)', () => {
    expect(loiGop({ [HO_SO_TEP]: [['- Loại: manh mối\n- Nguồn: quan sát', '- Loại: nửa nọ nửa kia\n- Nguồn: quan sát']] })).toMatch(/"Loại" chỉ nhận "manh mối" hoặc "sự thật"/);
    expect(loiGop({ [HO_SO_TEP]: [['- Keyword: địa điểm:tòa B · thời gian:thứ Hai', '- Keyword: màu sắc:xanh']] })).toMatch(/keyword sai quy ước "màu sắc:xanh"/);
    const kq = doc({ [HO_SO_TEP]: [['- Keyword: hành động:thu hồi phòng', '- Keyword: hành động:không có trên giấy']] });
    expect(kq.loi).toEqual([]);
    expect(kq.canhBao.join('\n')).toMatch(/keyword "không có trên giấy" không có trong chữ hiện trên giấy/);
  });

  it('[ĐỔI LOẠI]: thẻ lạ lỗi; thẻ đã là sự thật là dòng thừa; sai cú pháp lỗi', () => {
    expect(loiGop({ [KB_TEP]: [['[ĐỔI LOẠI clue-loi-cuong → sự thật]', '[ĐỔI LOẠI clue-ma → sự thật]']] })).toMatch(/\[ĐỔI LOẠI\]: không có mã "clue-ma"/);
    expect(loiGop({ [KB_TEP]: [['[ĐỔI LOẠI clue-loi-cuong → sự thật]', '[ĐỔI LOẠI doc-thu → sự thật]']] })).toMatch(/đã là sự thật \(dòng thừa\)/);
    expect(loiGop({ [KB_TEP]: [['[ĐỔI LOẠI clue-loi-cuong → sự thật]', '[ĐỔI LOẠI clue-loi-cuong]']] })).toMatch(/\[ĐỔI LOẠI\] sai quy ước/);
  });

  it('bảng chân lý chỉ nhận sự thật: thẻ nhận là manh mối (chưa đổi loại) bị báo', () => {
    expect(loiGop({ [DTG_TEP]: [['- Nhận: doc-thu', '- Nhận: clue-loi-thinh']] })).toMatch(/thẻ "clue-loi-thinh" là manh mối/);
    expect(loiGop({ [KB_TEP]: [['- [ĐỔI LOẠI clue-loi-cuong → sự thật]\n', '']] })).toMatch(/thẻ "clue-loi-cuong" là manh mối/);
  });
});

describe('B21 · [CÁC CÂU NỐI] / [NỐI]', () => {
  const { mvp } = doc();

  it('đọc cặp, mã mặc định `cau-<a>-<b>`, `· mã:` đặt lại, đích `→ tra` và `→ hiện trường ghim:` / chuỗi', () => {
    const khoi = nut(mvp, 'c1-phong-clb').find((x) => x.kind === 'cac-cau-noi');
    expect(khoi).toMatchObject({
      kind: 'cac-cau-noi',
      dong: true,
      cac: [{ id: 'cau-hoai-nao', the: ['clue-the-lich', 'clue-bc24'], cau: 'Hoài nào học Báo chí, khóa 2024?', dich: { kind: 'tra', thuThach: 'c-hoai-bc' } }],
    });
    const khoi2 = nut(mvp, 'c1-sanh-noi').find((x) => x.kind === 'cac-cau-noi');
    expect(khoi2).toMatchObject({ cac: [{ id: 'cau-ai-bo-thu', dich: { kind: 'hien-truong', ghim: 'cong-ktx', chuoi: null } }] });
    const macDinh = doc({ [KB_TEP]: [[' · mã: cau-hoai-nao', '']] });
    expect(macDinh.mvp.chuoi.flatMap((c) => c.items).find((x) => x.kind === 'cac-cau-noi' && x.cac[0]?.the[0] === 'clue-the-lich')).toMatchObject({ cac: [{ id: 'cau-clue-the-lich-clue-bc24' }] });
    // Chuỗi đích:
    const chuoiDich = doc({ [KB_TEP]: [['→ hiện trường ghim:cong-ktx', '→ hiện trường c1-an-a']] });
    expect(chuoiDich.loi).toEqual([]);
    expect(chuoiDich.mvp.chuoi.flatMap((c) => c.items).find((x) => x.kind === 'cac-cau-noi' && x.cac[0]?.id === 'cau-ai-bo-thu')).toMatchObject({ cac: [{ dich: { kind: 'hien-truong', ghim: null, chuoi: 'c1-an-a' } }] });
  });

  it('chuyển: kb.cacCauNoi gom mọi cặp của cả bộ', () => {
    const d = chuyenMvp(mvp, kiemLuatMvp(mvp));
    expect((d.cacCauNoi as { id: string }[]).map((c) => c.id)).toEqual(['cau-hoai-nao', 'cau-ai-bo-thu']);
  });

  it('lỗi: [NỐI] ngoài khối; khối thiếu [HẾT]; hai thẻ giống nhau; thẻ lạ; thẻ tra lạ; ghim lạ; trùng mã; dòng lạ trong khối', () => {
    expect(loiGop({ [KB_TEP]: [['- [CÁC CÂU NỐI]\n  - [NỐI clue-the-lich', '  - [NỐI clue-the-lich']] })).toMatch(/\[NỐI\] phải nằm trong khối/);
    expect(loiGop({ [KB_TEP]: [['- [HẾT CÁC CÂU NỐI]\n\n### c1-sanh —', '\n### c1-sanh —']] })).toMatch(/thiếu dòng "- \[HẾT CÁC CÂU NỐI\]"/);
    expect(loiGop({ [KB_TEP]: [['[NỐI clue-the-lich + clue-bc24', '[NỐI clue-the-lich + clue-the-lich']] })).toMatch(/hai thẻ phải khác nhau/);
    expect(loiGop({ [KB_TEP]: [['[NỐI clue-the-lich + clue-bc24', '[NỐI clue-the-lich + clue-ma']] })).toMatch(/không có mã "clue-ma"/);
    expect(loiGop({ [KB_TEP]: [['→ tra c-hoai-bc]', '→ tra c-khong-co]']] })).toMatch(/không có thẻ thử thách "c-khong-co" \(→ tra\)/);
    expect(loiGop({ [KB_TEP]: [['ghim:cong-ktx]', 'ghim:san-bay]']] })).toMatch(/không bản đồ nào có ghim "san-bay"/);
    expect(loiGop({ [KB_TEP]: [['· mã: cau-ai-bo-thu', '· mã: cau-hoai-nao']] })).toMatch(/mã câu hỏi "cau-hoai-nao" đã dùng/);
    expect(loiGop({ [KB_TEP]: [['  - [NỐI clue-the-lich', '  - [GHÉP clue-the-lich']] })).toMatch(/\[CÁC CÂU NỐI\] chỉ chứa dòng/);
  });

  it('thẻ nối phải là thẻ hồ sơ / vật chứng; câu nối được tính là mã dùng được ở "Chốt khi" và [NẾU có …]', () => {
    expect(doc({ [LICH_TEP]: [['- Chốt khi: có ev-hoai-bc24', '- Chốt khi: có cau-hoai-nao']] }).loi).toEqual([]);
    expect(doc({ [KB_TEP]: [['[NẾU có clue-the-lich]', '[NẾU có cau-ai-bo-thu]']] }).loi).toEqual([]);
  });

  it('[NẾU có <thẻ>] nhận mã thẻ hồ sơ (lời đổi theo note)', () => {
    const it = nut(mvp, 'c1-sanh')[0];
    expect(it).toMatchObject({ kind: 'jump-if', dieuKien: { kind: 'co', id: 'clue-the-lich' }, chuoi: 'c1-sanh-co-the' });
  });
});

describe('B21 · [ĐỐI CHẤT … · chỉ ô · mẫu / tính vạch]', () => {
  const { mvp } = doc();

  it('tùy chọn lệnh: chỉ ô đi cùng tính vạch hoặc mẫu; mẫu không tính vạch', () => {
    expect(docTuyChonLenh(' · chỉ ô · tính vạch · câu 1/2', 'x', true, true)).toMatchObject({ chiO: true, mau: false, tinhVach: { cau: { so: 1, tong: 2 } } });
    expect(docTuyChonLenh(' · chỉ ô · mẫu', 'x', true, true)).toMatchObject({ chiO: true, mau: true, tinhVach: null });
    expect(() => docTuyChonLenh(' · chỉ ô', 'x', true, true)).toThrow(/"chỉ ô" đi cùng "tính vạch"/);
    expect(() => docTuyChonLenh(' · mẫu', 'x', true, true)).toThrow(/"mẫu" chỉ đi cùng "chỉ ô"/);
    expect(() => docTuyChonLenh(' · chỉ ô · mẫu · tính vạch', 'x', true, true)).toThrow(/không tính vạch/);
    expect(() => docTuyChonLenh(' · chỉ ô · tính vạch', 'x', true, false)).toThrow(/mục lạ "chỉ ô"/);
  });

  it('đọc đáp án ô: một ô, hai ô nối bằng " + ", ô trống bắt buộc `{dtg:?}`', () => {
    const dc = nut(mvp, 'hop-00').filter((x) => x.kind === 'doi-chat');
    expect(dc.map((x) => x.kind === 'doi-chat' && [x.id, x.chiO, x.mau])).toEqual([
      ['dc-mau', true, true],
      ['dc-chi-o', true, false],
      ['dc-trong', true, false],
    ]);
    const chiO = dc[1];
    expect(chiO?.kind === 'doi-chat' && chiO.bangChung.map((b) => [b.id, b.o, b.muc])).toEqual([
      ['dtg-vu1:o1+dtg-vu1:o2', ['dtg-vu1:o1', 'dtg-vu1:o2'], 'dung'],
      ['dtg-vu1:o3', ['dtg-vu1:o3'], 'sai'],
    ]);
    const trong = dc[2];
    expect(trong?.kind === 'doi-chat' && trong.bangChung.map((b) => b.o)).toEqual([['dtg-vu1:?']]);
  });

  it('lượt mẫu thành lời viết sẵn khi chuyển: người hỏi rồi phản hồi của đáp án [ĐÚNG]', () => {
    const d = chuyenMvp(mvp, kiemLuatMvp(mvp));
    const hop = d.chuoi.find((c) => c.id === 'hop-00') as { nodes: { type: string; speaker?: string; text?: string }[] };
    expect(hop.nodes.slice(0, 5).map((n) => [n.type, n.speaker])).toEqual([
      ['line', 'thay-quang'],
      ['hien-dong-thoi-gian', undefined],
      ['line', 'khanh'],
      ['line', 'tung'],
      ['line', 'thay-quang'],
    ]);
    expect(hop.nodes[2]?.text).toBe('Hoài tự cầm thư từ phòng đi bỏ vào hộp.');
  });

  it('lỗi: ô không có trong bảng; bảng không có; {dtg:?} khi bảng không có ô trống bắt buộc; thiếu [KHÁC]; đáp án kiểu thẻ; mẫu có [SAI]', () => {
    expect(loiGop({ [KB_TEP]: [['{dtg-vu1:o3} [SAI]', '{dtg-vu1:o9} [SAI]']] })).toMatch(/bảng dtg-vu1 không có ô "o9"/);
    expect(loiGop({ [KB_TEP]: [['{dtg-vu1:o3} [SAI]', '{dtg-ma:o1} [SAI]']] })).toMatch(/không có dòng thời gian "dtg-ma"/);
    expect(loiGop({ [DTG_TEP]: [['- Không điền được: ai\n', '']] })).toMatch(/không có ô "Không điền được"/);
    expect(loiGop({ [KB_TEP]: [['  - [KHÁC] → phản hồi: **khanh** (neutral): Chỗ ấy không nói Hoài đưa thư cho ai.\n', '']] })).toMatch(/thiếu dòng con "\[KHÁC\]/);
    expect(loiGop({ [KB_TEP]: [['{dtg-vu1:o3} [SAI]', '{clue-loi-thinh} [SAI]']] })).toMatch(/đáp án phải là ô/);
    expect(loiGop({ [KB_TEP]: [['{dtg-vu1:o1} [ĐÚNG] → phản hồi: **tung**', '{dtg-vu1:o1} [SAI] → phản hồi: **tung**']] })).toMatch(/cần đáp án \[ĐÚNG\]/);
  });

  it('bảng chân lý phải dựng trước lượt chỉ ô', () => {
    expect(loiGop({ [KB_TEP]: [['- [DÒNG THỜI GIAN dtg-vu1]\n', '']] })).toMatch(/chưa được dựng/);
  });
});

describe('B21 · nhãn khối tiếng Việt (du-lieu.md)', () => {
  it('`{bảng · nhãn: …}` và `- Nhãn: cột=chữ` vào dữ liệu; câu SQL vẫn là tên thật', () => {
    const { mvp } = doc();
    const sv = mvp.duLieu?.bang.find((b) => b.ten === 'sinh_vien');
    expect(sv).toMatchObject({ nhan: 'Sinh viên', nhanCot: { ma_sv: 'Mã sinh viên', ho_dem: 'Họ đệm', ten: 'Tên', ma_lop: 'Mã lớp', noi_o: 'Nơi ở' } });
    expect(sv?.cot.map((c) => c.ten)).toEqual(['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'noi_o']);
    const d = chuyenMvp(mvp, kiemLuatMvp(mvp));
    const b = d.duLieu?.bang.find((x) => x.ten === 'lop') as { nhan?: string; nhanCot?: Record<string, string> };
    expect(b.nhan).toBe('Lớp');
    expect(b.nhanCot?.buoi).toBe('Buổi học');
  });

  it('lỗi: nhãn cho cột không có; nhãn sai quy ước; nhãn lặp', () => {
    expect(loiGop({ [DL_TEP]: [['ma_sv=Mã sinh viên, ho_dem=Họ đệm', 'ma_sinh_vien=Mã sinh viên, ho_dem=Họ đệm']] })).toMatch(/nhãn cho cột "ma_sinh_vien" mà bảng không có cột ấy/);
    expect(loiGop({ [DL_TEP]: [['ma_sv=Mã sinh viên, ho_dem=Họ đệm', 'Mã sinh viên, ho_dem=Họ đệm']] })).toMatch(/nhãn phải viết/);
    expect(loiGop({ [DL_TEP]: [['- Nhãn: ma_lop=Mã lớp, nganh=Ngành,', '- Nhãn: ma_lop=Mã lớp\n- Nhãn: nganh=Ngành,']] })).toMatch(/dòng "- Nhãn:" lặp lại/);
  });
});
