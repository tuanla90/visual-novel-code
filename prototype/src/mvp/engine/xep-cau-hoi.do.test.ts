// @vitest-environment node
/**
 * Đo máy xếp câu hỏi trên bộ 70 câu thử có nhãn của màn thử (`tools/thu-hoi-dap/du-lieu/cau-thu.json`, do một model khác viết,
 * không biết bác bảo vệ biết gì). Không sửa nhãn của bộ câu thử để đạt.
 *
 * So hai tờ: tờ của màn thử (chỉ dữ kiện + câu mẫu riêng) và tờ bác Thịnh mới (thêm câu mẫu chung `chung.json` và
 * `chuDeKhongBiet`). Chấm như màn thử: lớp con của ngoài lề (hỏi riêng tư, phá game, đòi đáp án) tính là "ngoai-le", chủ đề
 * không biết tính là "khong-ro". "Trả nhầm một dữ kiện" = câu không nhắm dữ kiện nào mà máy trả một dữ kiện sai.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
// B19 (08/10/2026): test cơ chế máy chạy trên bản đông cứng của bộ mùa 1 trước khi Vụ 1 viết lại (testing/mua1-truoc-b19).
import { KICH_BAN_MUA_1 } from './testing/mua1-truoc-b19/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { CHU_DE, NHOM_NGOAI_LE, xepCauHoi } from './hoi-dap';
import { dungMaySoChu, xepCau } from './xep-cau-hoi';

const doc = (duong: string): unknown => JSON.parse(readFileSync(new URL(duong, import.meta.url), 'utf8'));
const CAU_THU = doc('../../../../tools/thu-hoi-dap/du-lieu/cau-thu.json') as { cau: string; nhan: string[] }[];
const LOP_KHAC_MAN_THU = ['chao', 'cam-on', 'hoi-mo', 'tam-biet', 'khong-ro', 'ngoai-le'];

interface KetQuaDo {
  dung: number;
  tong: number;
  duKien: [number, number];
  traNham: number;
  sai: string[];
}

function cham(xep: (cau: string) => string): KetQuaDo {
  const kq: KetQuaDo = { dung: 0, tong: CAU_THU.length, duKien: [0, 0], traNham: 0, sai: [] };
  for (const t of CAU_THU) {
    const goc = xep(t.cau);
    const lop = goc.startsWith(CHU_DE) ? 'khong-ro' : NHOM_NGOAI_LE.has(goc) ? 'ngoai-le' : goc;
    const ok = t.nhan.includes(lop);
    const nhamDuKien = !LOP_KHAC_MAN_THU.includes(t.nhan[0] ?? '');
    if (nhamDuKien) kq.duKien[1]++;
    if (ok) {
      kq.dung++;
      if (nhamDuKien) kq.duKien[0]++;
    } else {
      kq.sai.push(`${t.cau} → ${goc} (cần ${t.nhan.join(' | ')})`);
      if (!LOP_KHAC_MAN_THU.includes(lop) && !nhamDuKien) kq.traNham++;
    }
  }
  return kq;
}

describe('đo máy so chữ trên 70 câu thử', () => {
  // Tờ màn thử: câu mẫu của dữ kiện và của các lớp khác ngay trong tờ, như thu-hoi-dap.html.
  const cu = doc('../../../../tools/thu-hoi-dap/du-lieu/bac-thinh.json') as {
    duKien: { ma: string; cauHoiMau: string[] }[];
    lopKhac: Record<string, { cauHoiMau?: string[] }>;
    tuKhoaTrongChuyen: string[];
  };
  const mayCu = dungMaySoChu([
    ...cu.duKien.flatMap((d) => d.cauHoiMau.map((c) => ({ lop: d.ma, cau: c }))),
    ...Object.entries(cu.lopKhac).flatMap(([l, x]) => (x.cauHoiMau ?? []).map((c) => ({ lop: l, cau: c }))),
  ]);
  const manThu = cham((c) => xepCau(mayCu, c, cu.tuKhoaTrongChuyen).lop);

  const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
  const to = kb.hoiDap!.to['n1-bac-thinh']!;
  const moi = cham((c) => xepCauHoi(kb.hoiDap!, to, c).lop);

  it('in con số', () => {
    const dong = (ten: string, k: KetQuaDo): string =>
      `${ten}: đúng ${k.dung}/${k.tong}; câu nhắm dữ kiện có sẵn ${k.duKien[0]}/${k.duKien[1]}; trả nhầm một dữ kiện cho câu không hỏi tới nó: ${k.traNham}`;
    console.log([dong('Màn thử (tờ cũ)', manThu), dong('Tờ bác Thịnh mới (chung.json + chuDeKhongBiet)', moi), 'Câu sai của tờ mới:', ...moi.sai.map((x) => '  ' + x)].join('\n'));
    expect(moi.tong).toBe(70);
  });

  it('câu nhắm dữ kiện có sẵn: đúng ít nhất 29/31', () => {
    expect(moi.duKien[1]).toBe(31);
    expect(moi.duKien[0]).toBeGreaterThanOrEqual(29);
  });

  it('trả nhầm dữ kiện cho câu không hỏi tới nó: giảm so với màn thử', () => {
    expect(manThu.traNham).toBeGreaterThanOrEqual(12);
    expect(moi.traNham).toBeLessThan(manThu.traNham);
  });
});
