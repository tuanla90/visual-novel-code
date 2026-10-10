// @vitest-environment node
/**
 * Tạo nhân vật MVP (gói tao-nhan-vat-mvp, QĐ-084): máy dừng ở `[TẠO NHÂN VẬT ten]` (bước chọn ngành bỏ 04/10/2026, ngành cố định),
 * nhận tên hợp lệ (thay `{{nv.nguoi-choi}}` ở câu sau), từ chối tên sai, xúc xắc tất định với hàm ngẫu nhiên giả,
 * ngành lưu vào trạng thái, Lưu/Nạp giữ tên, ô lưu cũ (tên 'Khôi') vẫn nạp được.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { dienTen, khungNhin, kiemTen, NGANH_NGUOI_CHOI, TEN_MAC_DINH, TEN_XUC_XAC, tenNgauNhien, taoTrangThai, xuLy, type KhungNhinMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

/** Bấm "tiếp" qua các lời (và các chỗ của cảnh khám phá) cho tới khi gặp khung nhìn `create-character` có trường `truong`. */
function toiCauHoi(s: TrangThaiMvp, truong: 'ten' | 'nganh'): TrangThaiMvp {
  for (let i = 0; i < 200; i++) {
    const kn = khungNhin(KB, s);
    if (kn.kind === 'create-character' && kn.nut.truong === truong) return s;
    // Sảnh KTX ([KHÁM PHÁ]): bấm lần lượt các chỗ chưa xem (Tùng hiện sau cùng).
    const cho = kn.kind === 'explore' ? kn.diem.find((d) => !d.daXem) : undefined;
    if (cho) {
      s = xuLy(KB, s, { type: 'xem-diem', chuoi: cho.diem.chuoi });
      continue;
    }
    if (kn.kind !== 'line') throw new Error(`Gặp ${kn.kind} trước câu hỏi ${truong}`);
    s = xuLy(KB, s, { type: 'tiep' });
  }
  throw new Error(`Không tới câu hỏi ${truong}`);
}

const cauHoi = (s: TrangThaiMvp): Extract<KhungNhinMvp, { kind: 'create-character' }> => {
  const kn = khungNhin(KB, s);
  if (kn.kind !== 'create-character') throw new Error(`Không ở câu hỏi tạo nhân vật (${kn.kind})`);
  return kn;
};

/** Mọi chữ trong tên / họ tên nhân vật và tên cấm (viết thường). */
const CHU_NHAN_VAT = new Set(
  [...KB.nhanVat.flatMap((n) => [n.ten, n.hoTen ?? '']), ...KB.tenCam].flatMap((t) => t.toLowerCase().split(/[\s-]+/)).filter(Boolean),
);

describe('kiemTen', () => {
  it('bỏ khoảng trắng thừa, nhận chữ có dấu tiếng Việt, khoảng trắng, gạch nối', () => {
    expect(kiemTen('  Nguyễn   Bảo  ')).toEqual({ ok: true, ten: 'Nguyễn Bảo' });
    expect(kiemTen('Anh-Đức')).toEqual({ ok: true, ten: 'Anh-Đức' });
    // Dạng tổ hợp (NFD, như vài bộ gõ trên điện thoại) được chuẩn về NFC.
    expect(kiemTen('Nguyễn')).toEqual({ ok: true, ten: 'Nguyễn' });
    expect(kiemTen('A')).toEqual({ ok: true, ten: 'A' });
    expect(kiemTen('x'.repeat(20))).toEqual({ ok: true, ten: 'x'.repeat(20) });
  });

  it.each([
    ['rỗng', ''],
    ['chỉ khoảng trắng', '    '],
    ['quá dài', 'x'.repeat(21)],
    ['có số', 'Bảo 2'],
    ['ký tự lạ', 'Bảo!'],
    ['emoji', 'Bảo 😀'],
    ['chữ không phải Latin', '小明'],
    ['gạch nối đầu', '-Bảo'],
  ])('từ chối tên %s, có lời báo', (_mo, ten) => {
    const kq = kiemTen(ten);
    expect(kq.ok).toBe(false);
    if (!kq.ok) expect(kq.loi.length).toBeGreaterThan(5);
  });
});

describe('máy MVP: [TẠO NHÂN VẬT ten]', () => {
  it('máy dừng ở câu hỏi tên (lời Tùng), không tự điền tên mặc định', () => {
    const s = toiCauHoi(taoTrangThai(KB, 1), 'ten');
    const kn = cauHoi(s);
    expect(kn.nut.asker.speaker).toBe('tung');
    expect(kn.nut.asker.text).toBe('Thế cậu tên gì?');
    expect(kn.nut.xucXac).toMatch(/xúc xắc/);
    expect(s.tenNguoiChoi).toBe(TEN_MAC_DINH);
    // "tiep" không qua được câu hỏi tên.
    expect(xuLy(KB, s, { type: 'tiep' })).toBe(s);
  });

  it('gõ tên hợp lệ → câu sau hiện đúng tên ở chỗ {{nv.nguoi-choi}}', () => {
    let s = toiCauHoi(taoTrangThai(KB, 1), 'ten');
    s = xuLy(KB, s, { type: 'dat-ten', ten: '  Nguyễn  Bảo ' });
    expect(s.tenNguoiChoi).toBe('Nguyễn Bảo');
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'line') throw new Error(kn.kind);
    expect(kn.loi.text).toContain('{{nv.nguoi-choi}}');
    expect(dienTen(KB, s, kn.loi.text)).toBe('Nguyễn Bảo à. Dễ gọi đấy. Cậu học ngành gì?');
  });

  it.each([[''], ['x'.repeat(21)], ['Bảo 2'], ['Bảo@']])('tên sai (%j) → không tiến, không đổi trạng thái', (ten) => {
    const s = toiCauHoi(taoTrangThai(KB, 1), 'ten');
    expect(xuLy(KB, s, { type: 'dat-ten', ten })).toBe(s);
  });

  it('chọn ngành ở câu hỏi tên bị từ chối (và ngược lại)', () => {
    const s = toiCauHoi(taoTrangThai(KB, 1), 'ten');
    expect(xuLy(KB, s, { type: 'chon-nganh', nganh: 'Kế toán' })).toBe(s);
  });
});

describe('xúc xắc: tenNgauNhien', () => {
  it('danh sách ~30 tên, không trùng nhau, không trùng chữ nào của tên nhân vật / tên cấm, không bắt đầu bằng H', () => {
    expect(TEN_XUC_XAC.length).toBeGreaterThanOrEqual(25);
    expect(new Set(TEN_XUC_XAC).size).toBe(TEN_XUC_XAC.length);
    for (const t of TEN_XUC_XAC) {
      expect(CHU_NHAN_VAT.has(t.toLowerCase()), t).toBe(false);
      expect(t, t).not.toMatch(/^h/i);
      expect(kiemTen(t)).toEqual({ ok: true, ten: t });
    }
  });

  it('hàm ngẫu nhiên giả → tên xác định; mọi tên ra đều hợp lệ và không phải tên nhân vật', () => {
    expect(tenNgauNhien(KB, () => 0)).toBe(TEN_XUC_XAC[0]);
    expect(tenNgauNhien(KB, () => 0.999999)).toBe(TEN_XUC_XAC[TEN_XUC_XAC.length - 1]);
    for (let i = 0; i < 100; i++) {
      const t = tenNgauNhien(KB, () => i / 100);
      expect(TEN_XUC_XAC).toContain(t);
      expect(CHU_NHAN_VAT.has(t.toLowerCase()), t).toBe(false);
    }
  });

  it('lọc theo nhân vật lúc chạy: nội dung thêm nhân vật trùng tên → xúc xắc không ra tên đó', () => {
    const kb2: KichBanMvp = { ...KB, nhanVat: [...KB.nhanVat, { ...KB.nhanVat[0]!, id: 'an', ten: 'An', hoTen: null }] };
    expect(tenNgauNhien(kb2, () => 0)).toBe(TEN_XUC_XAC[1]);
  });

  it('bấm lại luôn ra tên khác tên đang có', () => {
    const dau = tenNgauNhien(KB, () => 0);
    expect(tenNgauNhien(KB, () => 0, dau)).not.toBe(dau);
  });

  it('tên xúc xắc đưa vào dat-ten được nhận', () => {
    const s = toiCauHoi(taoTrangThai(KB, 1), 'ten');
    const ten = tenNgauNhien(KB, () => 0.5);
    expect(xuLy(KB, s, { type: 'dat-ten', ten }).tenNguoiChoi).toBe(ten);
  });
});

describe('ngành cố định (04/10/2026: bỏ bước chọn ngành)', () => {
  it('trạng thái đầu đã có ngành; cả mở đầu không còn câu hỏi ngành; Tùng hỏi bằng lời, người chơi đáp đúng ngành', () => {
    const s0 = taoTrangThai(KB, 1);
    expect(s0.nganh).toBe(NGANH_NGUOI_CHOI);
    const nut = KB.chuoi.flatMap((c) => c.nodes).filter((n) => n.type === 'create-character');
    expect(nut.map((n) => (n.type === 'create-character' ? n.truong : ''))).toEqual(['ten']);
    let s = xuLy(KB, toiCauHoi(s0, 'ten'), { type: 'dat-ten', ten: 'Bảo' });
    const loi: string[] = [];
    for (let i = 0; i < 4; i++) {
      const kn = khungNhin(KB, s);
      if (kn.kind !== 'line') break;
      loi.push(dienTen(KB, s, kn.loi.text));
      s = xuLy(KB, s, { type: 'tiep' });
    }
    expect(loi[0]).toBe('Bảo à. Dễ gọi đấy. Cậu học ngành gì?');
    expect(loi[1]).toBe(`${NGANH_NGUOI_CHOI}.`);
  });
});

describe('Lưu / Nạp và ô lưu cũ', () => {
  it('Lưu/Nạp (JSON) giữ tên và ngành', () => {
    const s = xuLy(KB, toiCauHoi(taoTrangThai(KB, 1), 'ten'), { type: 'dat-ten', ten: 'Lê Văn Việt' });
    const nap = JSON.parse(JSON.stringify(s)) as TrangThaiMvp;
    expect(nap).toEqual(s);
    expect(nap.tenNguoiChoi).toBe('Lê Văn Việt');
    expect(nap.nganh).toBe(NGANH_NGUOI_CHOI);
    expect(dienTen(KB, nap, 'Chào {{nv.nguoi-choi}}.')).toBe('Chào Lê Văn Việt.');
  });

  it('ô lưu cũ (trước gói, tên mặc định "Khôi", đã qua mở đầu) vẫn nạp và hiện tên cũ', () => {
    const cu = { ...taoTrangThai(KB, 1), tenNguoiChoi: TEN_MAC_DINH, nganh: 'Kế toán', conTro: null, giaiDoan: 'ngay' as const, ngay: 1 };
    const nap = JSON.parse(JSON.stringify(cu)) as TrangThaiMvp;
    expect(khungNhin(KB, nap).kind).toBe('chon-dia-diem');
    expect(dienTen(KB, nap, '{{nv.nguoi-choi}}')).toBe(TEN_MAC_DINH);
  });

  it('chưa có tên (trạng thái hỏng) → {{nv.nguoi-choi}} dùng tên dự phòng, không để trống', () => {
    expect(dienTen(KB, taoTrangThai(KB, 1), '{{nv.nguoi-choi}} à')).toBe(`${TEN_MAC_DINH} à`);
  });
});

describe('tên cố định Khoa (10/10/2026)', () => {
  it('ván mới có sẵn tên Khoa; ván lưu cũ có tên gõ tay hoặc rỗng được đổi về Khoa khi nạp (sua-con-tro)', () => {
    expect(taoTrangThai(KB, 1).tenNguoiChoi).toBe('Khoa');
    for (const cu of ['Bảo', '']) {
      const nap = xuLy(KB, { ...taoTrangThai(KB, 1), tenNguoiChoi: cu }, { type: 'sua-con-tro' });
      expect(nap.tenNguoiChoi).toBe('Khoa');
    }
  });
});
