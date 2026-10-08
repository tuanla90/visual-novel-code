// @vitest-environment node
/**
 * Gói B15 (docs/mua-1/brief/b15-het-ngay-va-quay-lai.md), bộ mùa 1:
 *   A. Ngày có bản đồ (ngày 2, 3, 4 của Vụ 1): hết ngày là do người chơi bấm (`het-ngay`), máy không tự sang buổi tối.
 *   B. Ghim đã ghé vào lại được; nhân chứng đã gặp hỏi lại được, tiến độ giữ.
 *   C. Ngày 3: sau mỗi nơi về lại bản đồ, ghim căng tin rồi ghim phòng CLB lần lượt hiện.
 *   D. Xong việc chính ở một nơi thì lời nhắc việc cũ được gỡ.
 * Ô lưu tạo trước gói (đứng giữa chuỗi từng nối liền sang nơi khác) nạp lên vẫn chơi tới kết. Bộ MVP không đổi.
 */
import { describe, expect, it } from 'vitest';
// B19 (08/10/2026): test cơ chế máy chạy trên bản đông cứng của bộ mùa 1 trước khi Vụ 1 viết lại (testing/mua1-truoc-b19).
import { KICH_BAN_MUA_1 } from './testing/mua1-truoc-b19/kich-ban.gen';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { ChuoiMvp, KichBanMvp, NutMvp } from '../../content/mvp/types';
import { traLoiVietSan } from './dong-hanh-viet-san';
import { giayNhoHoiDap } from './hoi-dap';
import { hetNgayDangCho, khungNhin, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import type { CachChoiMvp, TrangThaiMvp } from './trang-thai';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const MVP = KICH_BAN_MVP as unknown as KichBanMvp;
const CT = { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) };
type KnKhamPha = Extract<KhungNhinMvp, { kind: 'explore' }>;

/** Hành động phải được máy nhận (trạng thái đổi). */
function lam(kb: KichBanMvp, s: TrangThaiMvp, hd: HanhDongMvp): TrangThaiMvp {
  const sau = xuLy(kb, s, hd);
  if (sau === s) throw new Error(`Máy từ chối ${hd.type} ở ${khungNhin(kb, s).kind} (chuỗi ${s.conTro?.chuoi ?? '-'})`);
  return sau;
}

/** Bấm "tiếp" qua lời, tài liệu, ảnh… tới màn cần người chơi chọn; trả cả các câu đã đọc. */
function doc(kb: KichBanMvp, s: TrangThaiMvp): { s: TrangThaiMvp; loi: string[] } {
  const loi: string[] = [];
  for (let i = 0; i < 300; i++) {
    const kn = khungNhin(kb, s);
    if (!['line', 'feedback', 'show-document', 'image', 'effect', 'notebook-lookup', 'projector'].includes(kn.kind)) return { s, loi };
    if (kn.kind === 'line') loi.push(kn.loi.text);
    s = lam(kb, s, { type: 'tiep' });
  }
  throw new Error('quá nhiều lời');
}
const quaLoi = (kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp => doc(kb, s).s;

const kp = (s: TrangThaiMvp): KnKhamPha => {
  const kn = khungNhin(KB, s);
  if (kn.kind !== 'explore') throw new Error(`đang ở ${kn.kind} (chuỗi ${s.conTro?.chuoi ?? '-'}), không phải cảnh khám phá`);
  return kn;
};
const diem = (kn: KnKhamPha, chuoi: string) => kn.diem.find((d) => d.diem.chuoi === chuoi);
const xem = (s: TrangThaiMvp, chuoi: string): TrangThaiMvp => lam(KB, s, { type: 'xem-diem', chuoi });

function toiCanh(id: string, cach: CachChoiMvp = 'tu-dong'): TrangThaiMvp {
  const dau = xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-cach-choi', cach });
  return choiTuDong(KB, dau, CT, (_s, kn) => kn.kind === 'explore' && kn.nut.id === id, 20000);
}

/** Buổi hỏi đang mở: nghe kể hết (cách "xem cả đoạn" lần đầu thì đọc đoạn viết sẵn), chào đi, đọc nốt lời, về cảnh. */
function hoiHet(s: TrangThaiMvp): TrangThaiMvp {
  for (let i = 0; i < 40; i++) {
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'hoi-dap') return quaLoi(KB, s);
    s = lam(KB, s, kn.hoiDap.daRoi ? { type: 'tiep' } : kn.hoiDap.conKe ? { type: 'hoi-dap-ke-tiep' } : { type: 'hoi-dap-roi-di' });
  }
  throw new Error('buổi hỏi không đóng');
}

/** Giải liền các màn tra của chuỗi laptop đang đứng, tới khi về một cảnh khám phá. */
function giaiHet(s: TrangThaiMvp): TrangThaiMvp {
  for (let i = 0; i < 20; i++) {
    s = quaLoi(KB, s);
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'challenge') return s;
    s = lam(KB, s, { type: 'xong-thu-thach', thuThach: kn.thuThach.id });
  }
  throw new Error('quá nhiều màn tra');
}

/** Ngày 2, chỉ làm việc chính: Phòng Đào tạo rồi Phòng CLB, giải xong `c-lop`. Hai ghim "?" chưa ghé. */
function ngay2XongViecChinh(cach: CachChoiMvp = 'tu-dong'): TrangThaiMvp {
  let s = quaLoi(KB, xem(toiCanh('kp-bd-n2', cach), 'n2-co-hanh'));
  s = hoiHet(xem(s, 'n2-co-hanh-vao'));
  s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
  s = quaLoi(KB, xem(s, 'n2-phong'));
  return giaiHet(xem(s, 'n2-phong-duy'));
}

/** Bấm hết ngày rồi đọc hết buổi tối. */
function hetNgay(s: TrangThaiMvp): { s: TrangThaiMvp; loi: string[] } {
  return doc(KB, lam(KB, s, { type: 'het-ngay' }));
}

describe('A. hết ngày do người chơi bấm', () => {
  it('ngày 2: giải xong c-lop thì vẫn ở phòng CLB, ngày chưa đổi, có nút hết ngày; bấm thì đọc cảnh tối rồi sang ngày 3', () => {
    const truoc = choiTuDong(KB, taoTrangThai(KB, 1), CT, (_s, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-lop', 20000);
    expect(hetNgayDangCho(KB, truoc)).toBeNull();
    expect(xuLy(KB, truoc, { type: 'het-ngay' })).toBe(truoc);

    let s = quaLoi(KB, lam(KB, truoc, { type: 'xong-thu-thach', thuThach: 'c-lop' }));
    const kn = kp(s);
    expect(kn.nut.id).toBe('kp-phong-n2');
    expect(s.ngay).toBe(2);
    expect(s.canh).toBe('phong-clb');
    expect(kn.hetNgay).toEqual({ nhan: 'Về phòng KTX ăn tối', conChuaGhe: 0 });
    expect(kn.roi).toEqual({ kieu: 've-ban-do', nhan: 'Về bản đồ' });
    expect(diem(kn, 'n2-phong-duy')?.daXem).toBe(true);
    // Mấy người còn lại trong phòng (điểm "?") vẫn nói chuyện được.
    expect(diem(kn, 'n2-phong-vy')?.daXem).toBe(false);
    s = quaLoi(KB, xem(s, 'n2-phong-vy'));
    expect(kp(s).nut.id).toBe('kp-phong-n2');
    expect(s.ngay).toBe(2);

    const toi = hetNgay(s);
    expect(toi.loi[0]).toContain('Tối, phòng 408');
    expect(toi.s.ngay).toBe(3);
    expect(toi.s.hetNgay ?? null).toBeNull();
    expect(kp(toi.s).nut.id).toBe('kp-bd-n3');
  });

  it('trước khi việc chính xong: bản đồ và các nơi không có nút hết ngày, máy từ chối het-ngay', () => {
    let s = toiCanh('kp-bd-n2');
    expect(kp(s).hetNgay ?? null).toBeNull();
    expect(xuLy(KB, s, { type: 'het-ngay' })).toBe(s);
    s = quaLoi(KB, xem(s, 'n2-co-hanh'));
    expect(kp(s).hetNgay ?? null).toBeNull();
    expect(s.nhacViec?.text).toBe('Tài khoản xem được gì, vào hỏi cô là rõ.');
    s = hoiHet(xem(s, 'n2-co-hanh-vao'));
    expect(kp(s).xongChinh).toBe(true);
    expect(kp(s).hetNgay ?? null).toBeNull();
    expect(xuLy(KB, s, { type: 'het-ngay' })).toBe(s);
    // D: hỏi cô xong thì câu nhắc "Tới đó hỏi cô là rõ" không còn treo ở ô "Việc đang làm".
    expect(s.nhacViec ?? null).toBeNull();
  });

  it('sau khi việc chính xong: về bản đồ, vào ghim "?" chưa ghé, hỏi xong rồi mới hết ngày; hồ sơ có thêm giấy nhớ của nơi đó', () => {
    let s = ngay2XongViecChinh();
    expect(kp(s).hetNgay).toEqual({ nhan: 'Về phòng KTX ăn tối', conChuaGhe: 2 });
    // Ô "Việc đang làm": một bạn đi cùng nói việc hôm nay xong rồi, bằng lời của nhãn nút.
    expect(s.nhacViec?.nhanVat).toBe('ha-vy');
    expect(s.nhacViec?.text).toBe('Việc chính hôm nay xong rồi. Cậu còn muốn xem chỗ nào thì cứ đi, xong thì mình về phòng KTX ăn tối.');
    // Hỏi bạn đi cùng "việc chính" / "gợi ý" cũng nghe câu ấy (lời viết sẵn, không gọi mạng).
    expect(traLoiVietSan(KB, s, ['tung'], null, 'giờ làm gì')?.loi).toBe('Việc hôm nay xong rồi đấy! Cậu còn muốn ghé đâu thì ghé, không thì mình về phòng KTX ăn tối thôi!');

    s = lam(KB, s, { type: 'roi-canh' });
    let kn = kp(s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    // Bản đồ: không còn "Đi tiếp" (kẻo bỏ mất buổi tối), chỉ có nút hết ngày.
    expect(kn.roi).toBeNull();
    expect(kn.hetNgay?.conChuaGhe).toBe(2);
    expect(diem(kn, 'n2-bd-toa-b')?.daXem).toBe(false);

    s = quaLoi(KB, xem(s, 'n2-bd-toa-b'));
    expect(kp(s).nut.id).toBe('kp-toi-n2-bd-toa-b');
    expect(kp(s).hetNgay?.conChuaGhe).toBe(1);
    expect(giayNhoHoiDap(KB, s).some((g) => g.to === 'n2-bd-toa-b-vao')).toBe(false);
    s = hoiHet(xem(s, 'n2-bd-toa-b-vao'));
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n2-bd-toa-b');
    expect(giayNhoHoiDap(KB, s).some((g) => g.to === 'n2-bd-toa-b-vao')).toBe(true);
    expect(s.ngay).toBe(2);
    // Lời nhắc hết ngày còn nguyên sau khi làm việc tùy chọn.
    expect(s.nhacViec?.text).toContain('về phòng KTX ăn tối');

    // Hết ngày ngay từ nơi đang đứng cũng được.
    const toi = hetNgay(s);
    expect(toi.loi[0]).toContain('Tối, phòng 408');
    expect(toi.s.ngay).toBe(3);
  });

  it('bản đồ đã ghé hết mọi ghim mà chưa bấm hết ngày: vẫn đứng ở bản đồ, không tự sang ngày', () => {
    let s = ngay2XongViecChinh();
    s = lam(KB, s, { type: 'roi-canh' });
    for (const [ghim, nguoi] of [['n2-bd-toa-b', 'n2-bd-toa-b-vao'], ['n2-bd-cang-tin', 'n2-bd-cang-tin-vao']] as const) {
      s = quaLoi(KB, xem(s, ghim));
      s = hoiHet(xem(s, nguoi));
      s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    }
    const kn = kp(s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    expect(kn.diem.every((d) => d.daXem)).toBe(true);
    expect(s.ngay).toBe(2);
    expect(kn.hetNgay).toEqual({ nhan: 'Về phòng KTX ăn tối', conChuaGhe: 0 });
    expect(kn.roi).toBeNull();
  });

  it('lưu và nạp ở trạng thái "chờ hết ngày": khung nhìn như cũ, bấm hết ngày vẫn chạy buổi tối', () => {
    const s = lam(KB, ngay2XongViecChinh(), { type: 'roi-canh' });
    const nap = xuLy(KB, JSON.parse(JSON.stringify(s)) as TrangThaiMvp, { type: 'sua-con-tro' });
    expect(khungNhin(KB, nap)).toEqual(khungNhin(KB, s));
    expect(kp(nap).hetNgay?.nhan).toBe('Về phòng KTX ăn tối');
    // Nạp giữa buổi tối (đã bấm hết ngày): đọc tiếp là sang ngày 3.
    const giuaToi = lam(KB, lam(KB, nap, { type: 'het-ngay' }), { type: 'tiep' });
    const napToi = xuLy(KB, JSON.parse(JSON.stringify(giuaToi)) as TrangThaiMvp, { type: 'sua-con-tro' });
    expect(napToi.conTro?.chuoi).toBe('n2-toi');
    expect(doc(KB, napToi).s.ngay).toBe(3);
  });

  it('ngày 4, cả hai nhánh: xong việc thì về bản đồ chờ hết ngày; bấm thì đọc buổi tối ở phòng CLB rồi sang ngày 5', () => {
    for (const nhanh of ['ghe', 've'] as const) {
      let s = quaLoi(KB, xem(toiCanh('kp-bd-n4'), 'n4-ctsv'));
      s = hoiHet(xem(s, 'n4-ctsv-vao'));
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'branch', nut: { id: 'r-phong-may' } });
      s = giaiHet(lam(KB, s, { type: 'chon', luaChon: nhanh }));
      // Nhánh ghé: còn buổi hỏi bác Thịnh ở sảnh tòa B trước khi xong việc.
      if (khungNhin(KB, s).kind === 'hoi-dap') s = hoiHet(s);
      const kn = kp(s);
      expect(kn.nut.id).toBe('kp-bd-n4');
      expect(s.ngay).toBe(4);
      expect(kn.hetNgay).toEqual({ nhan: 'Về phòng CLB họp nhóm buổi tối', conChuaGhe: 1 });
      expect(kn.roi).toBeNull();
      expect(diem(kn, 'n4-ctsv')).toMatchObject({ daXem: true, vaoLai: true });
      expect(s.hoSo.bangChung.includes('ev-nhat-ky-in')).toBe(nhanh === 'ghe');

      // Vào lại Phòng CTSV: cô Lan hỏi lại được, KHÔNG chạy lại câu rẽ nhánh; khay giấy (chi tiết ẩn) còn bấm được.
      s = xem(s, 'n4-ctsv');
      expect(kp(s).nut.id).toBe('kp-toi-n4-ctsv');
      expect(diem(kp(s), 'n4-ctsv-an')?.daXem).toBe(false);
      s = hoiHet(xem(s, 'n4-ctsv-vao'));
      expect(kp(s).nut.id).toBe('kp-toi-n4-ctsv');
      s = lam(KB, s, { type: 'roi-canh' });
      expect(kp(s).nut.id).toBe('kp-bd-n4');

      const toi = hetNgay(s);
      expect(toi.loi[0]).toContain('Tối thứ Sáu, phòng CLB');
      expect(toi.s.ngay).toBe(5);
    }
  });
});

describe('B. nơi đã ghé vào lại được', () => {
  it('ghim đã ghé: vào thẳng cảnh của nơi đó, không đọc lại lời lúc tới; chi tiết ẩn chưa xem bấm được; "Về bản đồ" về thẳng bản đồ', () => {
    let s = quaLoi(KB, xem(toiCanh('kp-bd-n2'), 'n2-co-hanh'));
    s = hoiHet(xem(s, 'n2-co-hanh-vao'));
    s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    let kn = kp(s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    expect(diem(kn, 'n2-co-hanh')).toMatchObject({ daXem: true, vaoLai: true });
    // Còn tờ lịch treo tường chưa xem: ghim chưa mang dấu "đã xem hết".
    expect(diem(kn, 'n2-co-hanh')?.xemHet).toBeUndefined();
    const manhMoi = [...s.hoSo.manhMoi];

    s = xem(s, 'n2-co-hanh');
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(s.canh).toBe('phong-dao-tao');
    expect(diem(kn, 'n2-co-hanh-vao')).toMatchObject({ daXem: true, vaoLai: true });
    expect(diem(kn, 'n2-co-hanh-an')?.daXem).toBe(false);
    expect(kn.roi).toEqual({ kieu: 've-ban-do', nhan: 'Về bản đồ' });

    const an = doc(KB, xem(s, 'n2-co-hanh-an'));
    expect(an.loi.length).toBeGreaterThan(0);
    s = an.s;
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(diem(kn, 'n2-co-hanh-an')?.daXem).toBe(true);
    // Chi tiết ẩn đã xem thì không bấm lại được (không phải nhân chứng).
    expect(diem(kn, 'n2-co-hanh-an')?.vaoLai).toBeUndefined();
    expect(xuLy(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh-an' })).toBe(s);

    // Lưu / nạp khi đang ở nơi vào lại.
    s = xuLy(KB, JSON.parse(JSON.stringify(s)) as TrangThaiMvp, { type: 'sua-con-tro' });
    expect(kp(s).nut.id).toBe('kp-toi-n2-co-hanh');

    s = lam(KB, s, { type: 'roi-canh' });
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    expect(diem(kn, 'n2-co-hanh')?.daXem).toBe(true);
    // Đã xem hết mọi chỗ ở đó: ghim đổi dấu, vẫn vào lại được.
    expect(diem(kn, 'n2-co-hanh')).toMatchObject({ vaoLai: true, xemHet: true });
    expect(diem(kn, 'n2-phong')).toBeDefined();
    expect(s.hoSo.manhMoi).toEqual(manhMoi);
    // Ra vào lần nữa: chi tiết ẩn vẫn là đã xem.
    expect(diem(kp(xem(s, 'n2-co-hanh')), 'n2-co-hanh-an')?.daXem).toBe(true);
  });

  it('nhân chứng đã hỏi đủ: bấm lại thì mở buổi hỏi, nhân chứng nói một câu "hết chuyện" của tờ; chào đi là về cảnh, không đọc lại lời', () => {
    let s = quaLoi(KB, xem(toiCanh('kp-bd-n2'), 'n2-co-hanh'));
    s = hoiHet(xem(s, 'n2-co-hanh-vao'));
    const biet = [...(s.tienDoHoiDap?.['n2-co-hanh-vao']?.biet ?? [])];
    expect(diem(kp(s), 'n2-co-hanh-vao')).toMatchObject({ daXem: true, vaoLai: true });

    s = xem(s, 'n2-co-hanh-vao');
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'hoi-dap') throw new Error(`chưa mở lại buổi hỏi: ${kn.kind}`);
    const to = KB.hoiDap!.to['n2-co-hanh-vao']!;
    expect(kn.hoiDap.du).toBe(true);
    expect(kn.hoiDap.nhatKy.at(-1)).toMatchObject({ ai: 'co-hanh', chu: to.lopKhac['hoi-mo'].hetKe[0] });
    // Cách "xem cả đoạn": nút nghe kể không chạy lại cả đoạn viết sẵn.
    expect(xuLy(KB, s, { type: 'hoi-dap-ke-tiep' })).toBe(s);

    s = lam(KB, s, { type: 'hoi-dap-roi-di' });
    s = lam(KB, s, { type: 'tiep' });
    expect(kp(s).nut.id).toBe('kp-toi-n2-co-hanh');
    expect(diem(kp(s), 'n2-co-hanh-vao')?.daXem).toBe(true);
    expect(s.tienDoHoiDap?.['n2-co-hanh-vao']?.biet).toEqual(biet);
  });

  it('nhân chứng hỏi dở: bấm lại hỏi tiếp, tiến độ giữ; hỏi đủ thì manh mối mở, việc chính xong, không đọc lại tài liệu và lời', () => {
    let s = quaLoi(KB, xem(toiCanh('kp-bd-n2', 'bam'), 'n2-co-hanh'));
    s = xem(s, 'n2-co-hanh-vao');
    let hd = khungNhin(KB, s);
    if (hd.kind !== 'hoi-dap') throw new Error(`chưa vào buổi hỏi: ${hd.kind}`);
    const cau = hd.hoiDap.cauBam.find((c) => c.lop !== 'hoi-mo')!;
    s = lam(KB, s, { type: 'hoi-dap-hoi', cau: cau.cau, lop: cau.lop });
    const biet = [...(s.tienDoHoiDap?.['n2-co-hanh-vao']?.biet ?? [])];
    expect(biet.length).toBeGreaterThan(0);
    // Bỏ đi khi chưa hỏi đủ (bị giữ lại một lần, vẫn đi).
    for (let i = 0; i < 3 && khungNhin(KB, s).kind === 'hoi-dap'; i++) {
      hd = khungNhin(KB, s);
      s = lam(KB, s, hd.kind === 'hoi-dap' && hd.hoiDap.daRoi ? { type: 'tiep' } : { type: 'hoi-dap-roi-di' });
    }
    s = quaLoi(KB, s);
    expect(kp(s).xongChinh).toBe(false);
    expect(diem(kp(s), 'n2-co-hanh-vao')?.daXem).toBe(false);
    expect(s.nhacViec?.nhanVat).toBe('ha-vy');
    const taiLieu = [...s.hoSo.taiLieu];

    s = xem(s, 'n2-co-hanh-vao');
    hd = khungNhin(KB, s);
    if (hd.kind !== 'hoi-dap') throw new Error(`chưa mở lại buổi hỏi: ${hd.kind}`);
    expect(s.tienDoHoiDap?.['n2-co-hanh-vao']?.biet).toEqual(biet);
    expect(hd.hoiDap.du).toBe(false);
    // Hỏi nốt (nghe kể), chào đi: về thẳng cảnh, không có tài liệu hay dòng lời nào chen vào.
    for (let i = 0; i < 20; i++) {
      hd = khungNhin(KB, s);
      if (hd.kind !== 'hoi-dap' || hd.hoiDap.daRoi) break;
      s = lam(KB, s, hd.hoiDap.conKe ? { type: 'hoi-dap-ke-tiep' } : { type: 'hoi-dap-roi-di' });
    }
    s = lam(KB, s, { type: 'tiep' });
    const kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(kn.xongChinh).toBe(true);
    expect(diem(kn, 'n2-co-hanh-vao')?.daXem).toBe(true);
    expect(s.hoSo.manhMoi).toContain('clue-quyen-du-lieu');
    expect(s.hoSo.taiLieu).toEqual(taiLieu);
    // D: việc ở đây xong rồi thì câu nhắc cũ của Minh Anh không còn.
    expect(s.nhacViec ?? null).toBeNull();
    // Về bản đồ: ghim phòng CLB hiện ra.
    s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    expect(diem(kp(s), 'n2-phong')).toBeDefined();
  });
});

describe('C. ngày 3 không còn kéo liền ba nơi', () => {
  it('sau CTSV về bản đồ thì ghim căng tin hiện; sau căng tin thì ghim phòng CLB hiện; đủ manh mối; hết ngày do người chơi bấm', () => {
    let s = toiCanh('kp-bd-n3');
    let kn = kp(s);
    expect(kn.diem.map((d) => d.diem.chuoi)).toEqual(['n3-noi-ctsv', 'n3-bd-phong-may', 'n3-bd-toa-b']);

    s = xem(s, 'n3-noi-ctsv');
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n3-ctsv');
    expect(kn.diem.map((d) => d.diem.chuoi)).toEqual(['n3-ctsv']);
    s = xem(s, 'n3-ctsv');
    // Buổi hỏi, màn soi Quân, rồi đoạn kết của Quân: xong thì vẫn ở Phòng CTSV.
    for (let i = 0; i < 40; i++) {
      const k = khungNhin(KB, s);
      if (k.kind === 'hoi-dap') s = lam(KB, s, k.hoiDap.daRoi ? { type: 'tiep' } : k.hoiDap.conKe ? { type: 'hoi-dap-ke-tiep' } : { type: 'hoi-dap-roi-di' });
      else if (k.kind === 'explore' && k.nut.kieu === 'quan-sat') s = xem(s, k.diem.find((d) => !d.daXem)!.diem.chuoi);
      else if (k.kind === 'explore') break;
      else s = lam(KB, s, { type: 'tiep' });
    }
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n3-ctsv');
    expect(kn.xongChinh).toBe(true);
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-can-ma-va-can-cu', 'clue-phieu-tra-cuu']));
    // D: lời nhắc cũ của Minh Anh đã thay bằng câu dặn việc kế của Tùng.
    expect(s.nhacViec).toMatchObject({ nhanVat: 'tung', text: 'Có phiếu rồi! Tạt qua căng tin làm cốc trà đá đã, rồi hẵng về phòng CLB.' });
    // Anh Quân thành một điểm "?" để hỏi thêm; cô Lan hỏi lại được.
    expect(diem(kn, 'n3-ctsv-quan')?.daXem).toBe(false);
    expect(diem(kn, 'n3-ctsv')).toMatchObject({ daXem: true, vaoLai: true });
    const quan = doc(KB, xem(s, 'n3-ctsv-quan'));
    expect(quan.loi).toHaveLength(3);
    s = quan.s;
    expect(kp(s).nut.id).toBe('kp-toi-n3-ctsv');

    s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-bd-n3');
    expect(diem(kn, 'n3-noi-ctsv')?.daXem).toBe(true);
    expect(diem(kn, 'n3-noi-cang-tin')?.daXem).toBe(false);
    expect(diem(kn, 'n3-phong')).toBeUndefined();
    expect(kn.hetNgay ?? null).toBeNull();

    s = xem(s, 'n3-noi-cang-tin');
    expect(kp(s).nut.id).toBe('kp-toi-n3-cang-tin');
    s = hoiHet(xem(s, 'n3-cang-tin'));
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-toi-n3-cang-tin');
    expect(kn.xongChinh).toBe(true);
    expect(s.tienDoHoiDap?.['n3-cang-tin']?.biet).toEqual(expect.arrayContaining(['nhom-xin-phong']));
    expect(s.nhacViec).toMatchObject({ nhanVat: 'ha-vy', text: 'Phiếu của cô Lan có rồi. Về phòng CLB mở bảng sinh viên thôi.' });

    s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-bd-n3');
    expect(diem(kn, 'n3-phong')?.daXem).toBe(false);

    s = quaLoi(KB, xem(s, 'n3-phong'));
    expect(kp(s).nut.id).toBe('kp-phong-n3');
    s = giaiHet(xem(s, 'n3-phong-duy'));
    kn = kp(s);
    expect(kn.nut.id).toBe('kp-phong-n3');
    expect(s.ngay).toBe(3);
    expect(s.hoSo.bangChung).toContain('ev-hai-ma');
    expect(kn.hetNgay).toEqual({ nhan: 'Về ký túc xá nghỉ', conChuaGhe: 2 });
    expect(s.nhacViec?.text).toContain('về ký túc xá nghỉ');

    // Ngày 3 không có chuỗi buổi tối: bấm hết ngày là sang sáng ngày 4.
    s = lam(KB, s, { type: 'het-ngay' });
    expect(s.ngay).toBe(4);
    expect(s.conTro?.chuoi).toBe('n4-mo');
  });

  it('ô lưu tạo trước gói, đứng giữa căng tin của đường nối liền cũ: hết chuỗi thì về bản đồ ngày 3 (không nhảy sang ngày 4), chơi tiếp tới kết thật', () => {
    // Trạng thái kiểu cũ: ngày 3, đang đọc lời ở căng tin, không có cảnh khám phá nào mở (đã [ĐI CÙNG] từ CTSV sang).
    const goc = toiCanh('kp-bd-n3');
    const c = KB.chuoi.find((x) => x.id === 'n3-cang-tin')!;
    const cu: TrangThaiMvp = { ...goc, khamPha: null, canhLui: null, conTro: { chuoi: 'n3-cang-tin', nut: c.nodes.findIndex((n) => n.type === 'line'), boiCanh: 'truyen' }, daXemDiem: [...(goc.daXemDiem ?? []), 'n3-ctsv'] };
    const s = quaLoi(KB, xuLy(KB, JSON.parse(JSON.stringify(cu)) as TrangThaiMvp, { type: 'sua-con-tro' }));
    expect(s.ngay).toBe(3);
    expect(kp(s).nut.id).toBe('kp-bd-n3');
    const ket = choiTuDong(KB, s, CT, (_x, k) => k.kind === 'end', 20000);
    expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
    expect(ket.hoSo.bangChung).toContain('ev-hai-ma');
  });

  it('ô lưu tạo trước gói, đứng giữa buổi tối ngày 2 (chưa có lời chờ hết ngày): đọc hết là sang ngày 3 như cũ', () => {
    const cho = ngay2XongViecChinh();
    const cu: TrangThaiMvp = { ...cho, hetNgay: null, khamPha: null, canhLui: null, conTro: { chuoi: 'n2-toi', nut: 0, boiCanh: 'truyen' } };
    const s = quaLoi(KB, xuLy(KB, JSON.parse(JSON.stringify(cu)) as TrangThaiMvp, { type: 'sua-con-tro' }));
    expect(s.ngay).toBe(3);
  });
});

describe('máy tự chơi và bộ MVP', () => {
  it('máy tự chơi tới kết thật: mỗi ngày 2, 3, 4 đều qua trạng thái chờ hết ngày rồi tự bấm', () => {
    const ngayCho = new Set<number>();
    const ket = choiTuDong(KB, taoTrangThai(KB, 1), CT, (s, kn) => {
      if (kn.kind === 'explore' && kn.hetNgay) ngayCho.add(s.ngay);
      return kn.kind === 'end';
    }, 20000);
    expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
    expect([...ngayCho].sort()).toEqual([2, 3, 4]);
  });

  it('bộ MVP: không có lời chờ hết ngày, máy từ chối het-ngay; dòng kiểu [HẾT NGÀY] không cờ thì là khung chọn một nút như [ĐI CÙNG]', () => {
    const s = choiTuDong(MVP, taoTrangThai(MVP, 1), CT, (_s, kn) => kn.kind === 'explore', 20000);
    const kn = khungNhin(MVP, s);
    expect(kn.kind === 'explore' && kn.hetNgay).toBeFalsy();
    expect(xuLy(MVP, s, { type: 'het-ngay' })).toBe(s);
    expect(MVP.chuoi.some((c) => c.nodes.some((n) => n.type === 'branch' && n.id.startsWith('het-ngay-')))).toBe(false);

    const hetNgayNut: NutMvp = { type: 'branch', id: 'het-ngay-dich', asker: { speaker: 'player', text: 'Về' }, choices: [{ id: 'het-ngay', text: 'Về', khi: null, hauQua: [{ kind: 'di-toi', chuoi: 'dich' }] }] } as NutMvp;
    const chuoi = (id: string, nodes: NutMvp[]): ChuoiMvp => ({ id, title: id, canh: 'cong-ktx', mocSomNhat: 0, nodes });
    const loi = (text: string): NutMvp => ({ type: 'line', speaker: 'narrator', text });
    const kb: KichBanMvp = { ...MVP, lich: { ...MVP.lich, chuoiDau: 'goc' }, chuoi: [chuoi('goc', [loi('trước'), hetNgayNut]), chuoi('dich', [loi('tới')]), ...MVP.chuoi] };
    const sau = lam(kb, taoTrangThai(kb, 1), { type: 'tiep' });
    expect(khungNhin(kb, sau)).toMatchObject({ kind: 'branch', nut: { id: 'het-ngay-dich' } });
    expect(lam(kb, sau, { type: 'chon', luaChon: 'het-ngay' }).conTro?.chuoi).toBe('dich');
  });
});
