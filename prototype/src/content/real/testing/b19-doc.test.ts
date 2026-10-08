// @vitest-environment node
/**
 * Gói B19 — bộ đọc và máy kiểm cho cú pháp mới (docs/mua-1/brief/b19-vu-1-ban-6.md mục 5): dòng thời gian (`dong-thoi-gian.md`,
 * `[DÒNG THỜI GIAN]`, `[HIỆN DÒNG THỜI GIAN]`), `· tính vạch` (`[SỬA TRUY VẤN]`, `[ĐỐI CHẤT]`, `[HỎI]`, `[SAI LẦN ĐẦU CẢ BUỔI]`,
 * "Khi trình sai"), `[CHẤM VỤ]`, `[RẼ KẾT]` theo rank + "Kết tạm", `[SỔ TỔNG KẾT]`, `[ĐIỂM LƯU VỤ]`, `[GHÉP MẪU]`.
 * Nền: bộ thử `noi-dung-thu-b19/` (đọc sạch, tệp sinh khớp); mỗi test sửa một chỗ trong bộ nhớ rồi xem lỗi.
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { docNoiDungMvp, dinhDangLoi, docTieuDeO, type MucMvp, type RawMvp, type TepMvp } from '../../../../tools/noi-dung/doc-mvp.ts';
import { kiemLuatMvp } from '../../../../tools/noi-dung/luat-mvp.ts';
import { chuyenMvp } from '../../../../tools/noi-dung/chuyen-mvp.ts';
import { tepLechTrenDia } from '../../../../tools/noi-dung/sinh.ts';
import { sinhVanBanThuB19, THU_MUC_NOI_DUNG_THU_B19, THU_MUC_SINH_THU_B19 } from '../../../../tools/noi-dung/sinh-thu-b19.ts';
import { gomTepMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';
import { BoXuatTruyenChu } from '../../../../tools/truyen-chu.ts';

const GOC = gomTepMvp(THU_MUC_NOI_DUNG_THU_B19, 'noi-dung-thu-b19').tep;
const KB_TEP = 'noi-dung-thu-b19/kich-ban/01-vu-thu.md';
const DTG_TEP = 'noi-dung-thu-b19/dong-thoi-gian.md';

/** Đọc bộ thử sau khi thay chữ trong một tệp (`thay`: [cũ, mới][]); trả lỗi đọc + lỗi luật đã định dạng và dữ liệu thô. */
function doc(sua: Record<string, [string, string][]> = {}, them: TepMvp[] = []): { loi: string[]; canhBao: string[]; mvp: RawMvp } {
  const tep = GOC.map((t) => {
    let noiDung = t.noiDung;
    for (const [cu, moi] of sua[t.duongDan] ?? []) {
      if (!noiDung.includes(cu)) throw new Error(`không thấy "${cu}" trong ${t.duongDan}`);
      noiDung = noiDung.replace(cu, moi);
    }
    return { ...t, noiDung };
  });
  const kq = docNoiDungMvp([...tep, ...them]);
  const luat = kiemLuatMvp(kq.mvp);
  return { loi: [...kq.loi, ...luat.loi].map(dinhDangLoi), canhBao: luat.canhBao.map(dinhDangLoi), mvp: kq.mvp };
}

const nut = (mvp: RawMvp, chuoi: string): MucMvp[] => mvp.chuoi.find((c) => c.id === chuoi)?.items ?? [];

describe('B19 · bộ thử đọc sạch, tệp sinh khớp', () => {
  it('đọc, kiểm, chuyển không lỗi; kich-ban.gen.ts khớp bản sinh lại (đỏ: `npm run noi-dung:sinh:thu-b19`)', () => {
    const kq = sinhVanBanThuB19();
    expect(kq.loi).toEqual([]);
    expect(tepLechTrenDia(kq.tep, THU_MUC_SINH_THU_B19)).toEqual([]);
    expect(readdirSync(THU_MUC_SINH_THU_B19).filter((t) => t.endsWith('.gen.ts'))).toEqual(['kich-ban.gen.ts']);
  });

  it('không cảnh báo nào', () => {
    expect(doc().canhBao).toEqual([]);
  });
});

describe('B19 · bộ đọc: cú pháp mới', () => {
  const { mvp } = doc();

  it('[SỬA TRUY VẤN … · tính vạch · câu 1/4] + [SAI LẦN ĐẦU CẢ BUỔI]', () => {
    const fq = nut(mvp, 'hop-00').find((x) => x.kind === 'fix-query');
    expect(fq).toMatchObject({ kind: 'fix-query', id: 'c-sua-or', tinhVach: { cau: { so: 1, tong: 4 }, saiLanDau: [{ speaker: 'ha-vy', expression: 'thinking', text: 'Nhìn lại chữ HOẶC trên màn chiếu.' }] } });
  });

  it('[ĐỐI CHẤT … · tính vạch]: [ĐÚNG] một hay nhiều thẻ (lời tùy chọn), [SAI] có lời, [KHÁC]', () => {
    const dc = nut(mvp, 'hop-00').filter((x) => x.kind === 'doi-chat');
    expect(dc.map((x) => (x.kind === 'doi-chat' ? x.bangChung.map((b) => [b.id, b.muc, b.feedback.length]) : []))).toEqual([
      [['clue-loi-co-lan', 'dung', 0], ['ev-the-lich', 'sai', 1]],
      [['clue-loi-chu-cuong', 'dung', 1], ['clue-ra-cong', 'dung', 0], ['ev-the-lich', 'sai', 1]],
    ]);
    expect(dc[0]?.kind === 'doi-chat' && dc[0].tinhVach?.saiLanDau?.[0]?.text).toBe('Hôm ấy cô Lan nói gì về chữ ký nhỉ?');
  });

  it('[HỎI … · tính vạch · câu 4/4], [CHẤM VỤ] cần:, [SỔ TỔNG KẾT], [ĐIỂM LƯU VỤ], [GHÉP MẪU], [(HIỆN) DÒNG THỜI GIAN]', () => {
    const q = nut(mvp, 'hop-00').find((x) => x.kind === 'question');
    expect(q).toMatchObject({ truUyTin: false, tinhVach: { cau: { so: 4, tong: 4 }, saiLanDau: null } });
    expect(nut(mvp, 'hop-00').find((x) => x.kind === 'cham-vu')).toEqual({ kind: 'cham-vu', vu: 'vu1', can: ['ev-phieu-gui', 'clue-loi-chu-cuong', 'dtg-vu1'] });
    expect(nut(mvp, 'hop-00').find((x) => x.kind === 'dong-thoi-gian')).toEqual({ kind: 'dong-thoi-gian', id: 'dtg-vu1', chiXem: true });
    expect(nut(mvp, 'sau-hop-hoi').find((x) => x.kind === 'so-tong-ket')).toEqual({ kind: 'so-tong-ket', vu: 'vu1' });
    expect(nut(mvp, 'n1-mo')[0]).toEqual({ kind: 'diem-luu-vu', vu: 'vu1' });
    expect(nut(mvp, 'n1-mo').find((x) => x.kind === 'ghep-mau')).toEqual({ kind: 'ghep-mau', nguoi: 'minh-anh', the: ['ev-phieu-gui', 'ev-the-lich'], giayNho: 'Hoài nào học Báo chí, khóa 2024?' });
    expect(nut(mvp, 'n1-mo').find((x) => x.kind === 'dong-thoi-gian')).toEqual({ kind: 'dong-thoi-gian', id: 'dtg-vu1', chiXem: false });
  });

  it('"## Kết": chỉ "Kết tạm" thì kết thường cũng là kết tạm; [RẼ NHÁNH] "đặt cờ <x>" như "đặt co.<x>"', () => {
    expect(mvp.lich?.ket).toMatchObject({ that: 'ket-that', thuong: 'ket-tam', tam: 'ket-tam' });
    const r = nut(mvp, 'sau-hop-hoi').find((x) => x.kind === 'branch');
    expect(r?.kind === 'branch' && r.branch.choices.map((c) => c.hauQua)).toEqual([[{ kind: 'dat-co', co: 'xin-loi-som' }], [{ kind: 'dat-co', co: 'xin-loi-muon' }]]);
  });

  it('tiêu đề ô: giờ / nơi / việc, bỏ phần thiếu', () => {
    expect(docTieuDeO('o1 · 6:44 · cổng · Hoài ra cổng')).toEqual({ id: 'o1', gio: '6:44', noi: 'cổng', viec: 'Hoài ra cổng' });
    expect(docTieuDeO('o2 · ? · bé Na cầm một chiếc')).toEqual({ id: 'o2', gio: '?', noi: null, viec: 'bé Na cầm một chiếc' });
    expect(docTieuDeO('o3 · sảnh tòa B · mở sảnh')).toEqual({ id: 'o3', gio: null, noi: 'sảnh tòa B', viec: 'mở sảnh' });
    expect(docTieuDeO('o4 · trước 9:00 · Hoài bỏ thư')).toEqual({ id: 'o4', gio: 'trước 9:00', noi: null, viec: 'Hoài bỏ thư' });
    expect(() => docTieuDeO('O 5 · x')).toThrow();
  });

  it('chuyển: lệnh tính vạch, dòng thời gian, "Khi trình sai", kết tạm vào dữ liệu game', () => {
    const luat = kiemLuatMvp(mvp);
    const d = chuyenMvp(mvp, luat);
    expect(d.dongThoiGian && Object.keys(d.dongThoiGian)).toEqual(['dtg-banh', 'dtg-vu1']);
    expect(d.thuThach['c-sua-or']?.khiTrinhSai).toEqual([{ speaker: 'quan', expression: 'smug', text: 'Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?' }]);
    expect((d.lich as { ket: unknown }).ket).toEqual({ that: 'ket-that', thuong: 'ket-tam', tam: 'ket-tam' });
    const hop = d.chuoi.find((c) => c.id === 'hop-00') as { nodes: { type: string }[] };
    expect(hop.nodes.map((n) => n.type)).toEqual(['line', 'fix-query', 'line', 'hien-dong-thoi-gian', 'doi-chat', 'line', 'doi-chat', 'question', 'cham-vu', 'ending-branch']);
  });
});

describe('B19 · bộ đọc: lỗi cú pháp', () => {
  it('[THỬ THÁCH … · tính vạch] lỗi; "câu n/m" thiếu "tính vạch" lỗi; câu vượt tổng lỗi', () => {
    expect(doc({ [KB_TEP]: [['- [SỬA TRUY VẤN c-sua-or · tính vạch · câu 1/4]', '- [THỬ THÁCH c-sua-or · tính vạch]']] }).loi.join('\n')).toMatch(/\[THỬ THÁCH c-sua-or\] không có mục thêm/);
    expect(doc({ [KB_TEP]: [['[HỎI q-ai-dung-sau · tính vạch · câu 4/4]', '[HỎI q-ai-dung-sau · câu 4/4]']] }).loi.join('\n')).toMatch(/"câu n\/m" chỉ đi cùng "tính vạch"/);
    expect(doc({ [KB_TEP]: [['câu 4/4]', 'câu 5/4]']] }).loi.join('\n')).toMatch(/"câu 5\/4" sai/);
  });

  it('[ĐÚNG] / [SAI LẦN ĐẦU CẢ BUỔI] ngoài lệnh tính vạch là lỗi', () => {
    expect(doc({ [KB_TEP]: [['[ĐỐI CHẤT dc-phieu-gui · tính vạch · câu 2/4]', '[ĐỐI CHẤT dc-phieu-gui]']] }).loi.join('\n')).toMatch(/\[ĐÚNG\] chỉ dùng trong đối chất "· tính vạch"/);
    expect(doc({ [KB_TEP]: [['[SỬA TRUY VẤN c-sua-or · tính vạch · câu 1/4]', '[SỬA TRUY VẤN c-sua-or]']] }).loi.join('\n')).toMatch(/dòng con không thuộc/);
  });

  it('dong-thoi-gian.md: tiêu đề sai, dòng lạ, thẻ tạm sai quy ước', () => {
    expect(doc({ [DTG_TEP]: [['## dtg-banh — Đĩa bánh Trung thu {kiểu: tập dượt}', '## dtg-banh Đĩa bánh']] }).loi.join('\n')).toMatch(/tiêu đề dòng thời gian sai quy ước/);
    expect(doc({ [DTG_TEP]: [['- Nhận: lk-dem-bon', '- Nhận lk-dem-bon']] }).loi.join('\n')).toMatch(/dòng lạ trong dòng thời gian/);
    expect(doc({ [DTG_TEP]: [['lk-tay-na = Tay bé Na', 'lk-tay-na: Tay bé Na']] }).loi.join('\n')).toMatch(/thẻ tạm phải viết/);
  });
});

describe('B19 · máy kiểm', () => {
  it('ô "Nhận" thẻ không có; dòng thời gian toàn ô khóa sẵn; ô không có thẻ nhận', () => {
    expect(doc({ [DTG_TEP]: [['- Nhận: clue-ra-cong', '- Nhận: clue-khong-co']] }).loi.join('\n')).toMatch(/"Nhận": không có thẻ "clue-khong-co"/);
    const toanKhoa = doc({ [DTG_TEP]: [['- Nhận: lk-dem-bon', '- Khóa sẵn'], ['- Nhận: lk-tay-na', '- Khóa sẵn'], ['- Nhận: lk-chia-ba', '- Khóa sẵn']] }).loi.join('\n');
    expect(toanKhoa).toMatch(/ô nào cũng "Khóa sẵn"/);
    expect(doc({ [DTG_TEP]: [['- Nhận: ev-phieu-gui\n', '\n']] }).loi.join('\n')).toMatch(/ô o4 \(dòng thời gian dtg-vu1\) cần dòng "- Nhận: <thẻ>"/);
  });

  it('thẻ nhận chưa mở trước chỗ [DÒNG THỜI GIAN] là lỗi', () => {
    const r = doc({ [KB_TEP]: [['- [DÒNG THỜI GIAN dtg-vu1]\n', ''], ['- [ĐIỂM LƯU VỤ vu1]\n', '- [ĐIỂM LƯU VỤ vu1]\n- [DÒNG THỜI GIAN dtg-vu1]\n']] });
    expect(r.loi.join('\n')).toMatch(/\[DÒNG THỜI GIAN dtg-vu1\], ô o1: thẻ "clue-ra-cong" chưa được mở trước chỗ này/);
  });

  it('[HIỆN DÒNG THỜI GIAN] khi chưa dựng; [SỔ TỔNG KẾT] trước [CHẤM VỤ]; [CHẤM VỤ] cần thứ không có', () => {
    expect(doc({ [KB_TEP]: [['- [DÒNG THỜI GIAN dtg-vu1]\n', '']] }).loi.join('\n')).toMatch(/\[HIỆN DÒNG THỜI GIAN dtg-vu1\]: chưa có \[DÒNG THỜI GIAN dtg-vu1\]/);
    expect(doc({ [KB_TEP]: [['- **thay-quang** (stern): Bắt đầu.', '- **thay-quang** (stern): Bắt đầu.\n- [SỔ TỔNG KẾT vu1]']] }).loi.join('\n')).toMatch(/\[SỔ TỔNG KẾT vu1\]: cần \[CHẤM VỤ vu1\] chạy trước/);
    expect(doc({ [KB_TEP]: [['cần: ev-phieu-gui,', 'cần: ev-khong-co, ev-phieu-gui,']] }).loi.join('\n')).toMatch(/"cần": không có thẻ hay dòng thời gian "ev-khong-co"/);
    expect(doc({ [KB_TEP]: [['[CHẤM VỤ vu1]', '[CHẤM VỤ vu9]']] }).loi.join('\n')).toMatch(/\[CHẤM VỤ vu9\]: "vu9" không phải mã vụ/);
  });

  it('tính vạch ngoài vụ có [CHẤM VỤ]; [RẼ KẾT] theo rank cần "Kết tạm"', () => {
    expect(doc({ [KB_TEP]: [['- [CHẤM VỤ vu1] cần: ev-phieu-gui, clue-loi-chu-cuong, dtg-vu1\n', ''], ['- [SỔ TỔNG KẾT vu1]\n', '']] }).loi.join('\n')).toMatch(/"· tính vạch" chỉ dùng trong vụ có \[CHẤM VỤ\]/);
    const lichTep = 'noi-dung-thu-b19/lich.md';
    expect(doc({ [lichTep]: [['- Kết tạm: ket-tam', '- Kết thường: ket-tam']] }).loi.join('\n')).toMatch(/mục "## Kết" cần dòng "- Kết tạm: <chuỗi>"/);
  });

  it('đối chất tính vạch: thiếu [ĐÚNG], thiếu [KHÁC], trộn mức cũ', () => {
    expect(doc({ [KB_TEP]: [['  - {clue-loi-co-lan} [ĐÚNG]\n', '']] }).loi.join('\n')).toMatch(/cần ít nhất một thẻ "\{<mã>\} \[ĐÚNG\]"/);
    expect(doc({ [KB_TEP]: [['  - [KHÁC] → phản hồi: **thay-quang** (stern): Cái này không trả lời câu thầy hỏi.\n', '']] }).loi.join('\n')).toMatch(/thiếu dòng con "\[KHÁC\] → phản hồi: …"/);
    expect(doc({ [KB_TEP]: [['  - {clue-ra-cong} [ĐÚNG]', '  - {clue-ra-cong} [GỢI Ý] → phản hồi: **quan** (neutral): Ừ.']] }).loi.join('\n')).toMatch(/không dùng \[ĐỦ CĂN CỨ\] \/ \[HỖ TRỢ\] \/ \[GỢI Ý\]/);
  });

  it('[GHÉP MẪU]: thẻ không có, thẻ chưa mở, người ghép lạ; [ĐIỂM LƯU VỤ] hai lần', () => {
    expect(doc({ [KB_TEP]: [['ev-phieu-gui + ev-the-lich', 'ev-phieu-gui + ev-khong-co']] }).loi.join('\n')).toMatch(/\[GHÉP MẪU\]: không có thẻ "ev-khong-co"/);
    expect(doc({ [KB_TEP]: [['ev-phieu-gui + ev-the-lich', 'ev-phieu-gui + clue-ra-cong']] }).loi.join('\n')).toMatch(/\[GHÉP MẪU\]: thẻ "clue-ra-cong" chưa được mở trước chỗ ghép/);
    expect(doc({ [KB_TEP]: [['[GHÉP MẪU] minh-anh:', '[GHÉP MẪU] chi-linh:']] }).loi.join('\n')).toMatch(/\[GHÉP MẪU\]: không có nhân vật "chi-linh"/);
    expect(doc({ [KB_TEP]: [['- **minh-anh** (neutral): Thứ Hai em trình dòng thời gian.', '- [ĐIỂM LƯU VỤ vu1]']] }).loi.join('\n')).toMatch(/\[ĐIỂM LƯU VỤ vu1\] xuất hiện hơn một lần/);
  });

  it('thẻ thử thách: "Khi trình sai" sai quy ước là lỗi; lệnh tính vạch thiếu lời trình sai là cảnh báo', () => {
    const the = 'noi-dung-thu-b19/thu-thach/c-sua-or.md';
    expect(doc({ [the]: [['- Khi trình sai: **quan** (smug):', '- Khi trình sai: quan:']] }).loi.join('\n')).toMatch(/dòng "Khi trình sai"/);
    expect(doc({ [the]: [['- Khi trình sai: **quan** (smug): Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?\n', '']] }).canhBao.join('\n')).toMatch(/chưa có dòng "- Khi trình sai: …"/);
  });
});

describe('B19 · khám phá kiểu dàn', () => {
  it('[KHÁM PHÁ … · dàn]: người không cần x / y / rộng, có nhãn và dấu', () => {
    const kp = nut(doc().mvp, 'md-00').find((x) => x.kind === 'explore');
    expect(kp?.kind === 'explore' && kp.kieu).toBe('dan');
    expect(kp?.kind === 'explore' && kp.diem.map((d) => [d.sprite, d.chuoi, d.nhan, d.dau])).toEqual([
      ['nv:minh-anh/worried', 'tt-minh-anh', 'Minh Anh', 'chinh'],
      ['nv:ha-vy/thinking', 'tt-ha-vy', 'Hà Vy', 'chinh'],
      ['nv:tung', 'tt-tung', 'Tùng', 'phu'],
    ]);
  });

  it('dàn chỉ có người; người phải có ảnh chân dung đúng biểu cảm (máy kiểm có danh sách ảnh)', () => {
    expect(doc({ [KB_TEP]: [['  - nv:tung → tt-tung', '  - obj-ghe → tt-tung']] }).loi.join('\n')).toMatch(/dòng con phải là "nv:<mã>/);
    const { mvp } = doc();
    const thieuAnh = kiemLuatMvp(mvp, { anh: new Set(['char-minh-anh-worried', 'char-tung']) }).loi.map(dinhDangLoi).join('\n');
    expect(thieuAnh).toMatch(/không có ảnh chân dung "ha-vy" biểu cảm "thinking"/);
    expect(thieuAnh).not.toMatch(/"tung"/);
    expect(kiemLuatMvp(mvp, { anh: new Set(['char-minh-anh-worried', 'char-ha-vy-thinking', 'char-tung-anchor']) }).loi).toEqual([]);
  });
});

describe('B19 · truyện chữ in lệnh mới', () => {
  it('dòng thời gian in bản đã dựng; trắc nghiệm in câu đúng và lời khi sai; chấm in ba nhánh A/B/C; rẽ kết theo rank', async () => {
    const { mvp } = doc();
    const bo = new BoXuatTruyenChu(chuyenMvp(mvp, kiemLuatMvp(mvp)), new Map(mvp.canh.map((c) => [c.id, { ten: c.ten, moTa: c.moTa ?? null }])));
    await bo.khoiTaoDb();
    const vb = bo.xuatVuHoacViec('vu1');
    bo.dongDb();
    expect(vb).toContain('| 6:44 | cổng ký túc xá | Hoài ra cổng | Hoài ra cổng lúc 6:44 |');
    expect(vb).toContain('| ? | cổng ký túc xá | **?** đưa phong bì nâu cho Hoài | Có người đưa phong bì cho Hoài ở cổng |');
    expect(vb).toContain('| 7:00 | sảnh tòa B | bác Thịnh mở sảnh | (có sẵn) |');
    expect(vb).toContain('| 19:00 |  | đĩa đủ bốn chiếc | Minh Anh: "Lúc bảy giờ chị đếm còn bốn." |');
    expect(vb).toContain('Bạn đọc lại dòng thời gian');
    expect(vb).toMatch(/Câu tính vạch 1\/4\*\*: Chạy thử bao nhiêu lần cũng được/);
    expect(vb).toContain('❌ Nếu trình sai → **Quân**');
    expect(vb).toContain('↳ Nếu đây là lần sai đầu tiên của cả buổi → **Hà Vy**');
    expect(vb).toContain('"Chưa đủ căn cứ" ✅');
    expect(vb).toContain('"Lê Thu Hoài" ❌ → **Thầy Quang**');
    expect(vb).toContain('✅ Trình "Phiếu gửi do người nộp ký"');
    expect(vb).toContain('❌ Trình "Thẻ lịch rách" →');
    expect(vb).toContain('**A**: đủ căn cứ, 0 vạch → kết thật');
    expect(vb).toContain('**B**: đủ căn cứ, 1–2 vạch → kết thật.');
    expect(vb).toContain('**C**: thiếu căn cứ hoặc từ 3 vạch → kết tạm.');
    expect(vb).toMatch(/Rẽ kết: kết thật.*rank A hoặc B/);
    expect(vb).toMatch(/Rẽ kết: kết tạm.*rank C/);
    expect(vb).toContain('ghép trên bảng điều tra');
    expect(vb).toContain('trang tổng kết Vụ 1');
    expect(vb).toContain('Điểm lưu đầu Vụ 1');
  });
});
