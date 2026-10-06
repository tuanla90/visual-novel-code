// @vitest-environment node
/**
 * Gói B13 (docs/mua-1/brief/b13-dieu-huong-tu-do.md): điều hướng tự do của bộ mùa 1.
 *   A. `[ĐI CÙNG]` chỉ một đường → máy tự đi, không dừng ở khung chọn nhánh một nút.
 *   B. Tới một nơi từ bản đồ → làm xong điểm vẫn ở lại cảnh của nơi đó; chỉ về bản đồ khi người chơi bấm "Về bản đồ".
 *      Rời khi việc chính chưa xong → ghim còn dấu, quay lại làm tiếp, tiến độ hỏi đáp còn nguyên.
 *   C. Màn tra lùi về cảnh đã mở nó; bấm lại chỗ mở màn tra thì vào thẳng màn tra đang dở.
 * Bộ MVP không có cờ `dieuHuongTuDo`: chạy như cũ.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { ChuoiMvp, KichBanMvp, NutMvp } from '../../content/mvp/types';
import { canhLuiThuThach, khungNhin, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import type { CachChoiMvp, TrangThaiMvp } from './trang-thai';
import { choiTuDong, nhayToi, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const MVP = KICH_BAN_MVP as unknown as KichBanMvp;
const CT = { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) };

/** Hành động phải được máy nhận (trạng thái đổi). */
function lam(kb: KichBanMvp, s: TrangThaiMvp, hd: HanhDongMvp): TrangThaiMvp {
  const sau = xuLy(kb, s, hd);
  if (sau === s) throw new Error(`Máy từ chối ${hd.type} ở ${khungNhin(kb, s).kind}`);
  return sau;
}

/** Bấm "tiếp" qua lời, tài liệu, ảnh… tới màn cần người chơi chọn. */
function quaLoi(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  for (let i = 0; i < 300; i++) {
    const k = khungNhin(kb, s).kind;
    if (!['line', 'feedback', 'show-document', 'image', 'effect', 'notebook-lookup', 'projector'].includes(k)) return s;
    s = lam(kb, s, { type: 'tiep' });
  }
  throw new Error('quá nhiều lời');
}

const kp = (kb: KichBanMvp, s: TrangThaiMvp): Extract<KhungNhinMvp, { kind: 'explore' }> => {
  const kn = khungNhin(kb, s);
  if (kn.kind !== 'explore') throw new Error(`đang ở ${kn.kind}, không phải cảnh khám phá`);
  return kn;
};
const daXem = (kn: Extract<KhungNhinMvp, { kind: 'explore' }>, chuoi: string): boolean | undefined => kn.diem.find((d) => d.diem.chuoi === chuoi)?.daXem;

function toiCanh(id: string, cach: CachChoiMvp = 'tu-dong'): TrangThaiMvp {
  const dau = xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-cach-choi', cach });
  return choiTuDong(KB, dau, CT, (_s, kn) => kn.kind === 'explore' && kn.nut.id === id, 20000);
}

describe('A. [ĐI CÙNG] một đường: máy tự đi', () => {
  it('hết lời của chuỗi trên xe là sang chuỗi xuống xe, không có khung chọn nhánh một nút', () => {
    let s = taoTrangThai(KB, 1);
    expect(s.conTro?.chuoi).toBe('md-00-tren-xe');
    for (let i = 0; i < 50 && s.conTro?.chuoi === 'md-00-tren-xe'; i++) {
      expect(khungNhin(KB, s).kind).toBe('line');
      s = lam(KB, s, { type: 'tiep' });
    }
    expect(s.conTro?.chuoi).toBe('md-00-xe-buyt');
    expect(khungNhin(KB, s).kind).toBe('line');
  });

  it('cả Vụ 1 (tới kết thật) không lần nào dừng ở [ĐI CÙNG]; [RẼ NHÁNH] thật vẫn dừng', () => {
    const reNhanh: string[] = [];
    const ket = choiTuDong(KB, taoTrangThai(KB, 1), CT, (_s, kn) => {
      if (kn.kind === 'branch') {
        expect(kn.nut.id.startsWith('go-with-')).toBe(false);
        reNhanh.push(kn.nut.id);
      }
      return kn.kind === 'end';
    }, 20000);
    expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
    expect(reNhanh).toEqual(expect.arrayContaining(['r-ai-lay-banh', 'r-phong-may', 'r-moi-hoai']));
  });

  it('bộ MVP (không cờ): [ĐI CÙNG] vẫn là khung chọn một nút như cũ', () => {
    const diCung: NutMvp = { type: 'branch', id: 'go-with-dich', asker: { speaker: 'player', text: 'Đi' }, choices: [{ id: 'go-dich', text: 'Đi', khi: null, hauQua: [{ kind: 'di-toi', chuoi: 'dich' }] }] } as NutMvp;
    const chuoi = (id: string, nodes: NutMvp[]): ChuoiMvp => ({ id, title: id, canh: 'cong-ktx', mocSomNhat: 0, nodes });
    const loi = (text: string): NutMvp => ({ type: 'line', speaker: 'narrator', text });
    const kb: KichBanMvp = { ...MVP, lich: { ...MVP.lich, chuoiDau: 'goc' }, chuoi: [chuoi('goc', [loi('trước'), diCung]), chuoi('dich', [loi('tới')]), ...MVP.chuoi] };
    const s = lam(kb, taoTrangThai(kb, 1), { type: 'tiep' });
    expect(khungNhin(kb, s)).toMatchObject({ kind: 'branch', nut: { id: 'go-with-dich' } });
    // Cùng kịch bản, bật cờ: máy tự đi.
    const tuDo = { ...kb, dieuHuongTuDo: true };
    expect(lam(tuDo, taoTrangThai(tuDo, 1), { type: 'tiep' }).conTro?.chuoi).toBe('dich');
  });
});

describe('B. tới một nơi từ bản đồ thì ở lại nơi đó', () => {
  it('ngày 2, Phòng Đào tạo: xong việc với cô Hạnh vẫn ở cảnh phòng, chi tiết ẩn còn bấm được; bấm "Về bản đồ" mới về', () => {
    let s = toiCanh('kp-bd-n2');
    expect(kp(KB, s).roi).toBeNull();
    s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh' }));
    let kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(kn.roi).toEqual({ kieu: 've-ban-do', nhan: 'Về bản đồ' });
    expect(kn.xongChinh).toBe(false);

    // Cách "xem cả đoạn": khung hỏi mở, bấm nghe kể thì đoạn viết sẵn mới chạy.
    s = quaLoi(KB, lam(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh-vao' }), { type: 'hoi-dap-ke-tiep' }));
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(kn.xongChinh).toBe(true);
    expect(daXem(kn, 'n2-co-hanh-vao')).toBe(true);
    expect(daXem(kn, 'n2-co-hanh-an')).toBe(false);
    expect(s.hoSo.manhMoi).toContain('clue-quyen-du-lieu');

    // Chi tiết ẩn: bấm được, xem xong vẫn ở lại.
    s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh-an' }));
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(daXem(kn, 'n2-co-hanh-an')).toBe(true);
    expect(kn.roi?.kieu).toBe('ve-ban-do');

    s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    expect(daXem(kn, 'n2-co-hanh')).toBe(true);
    expect(kn.diem.map((d) => d.diem.chuoi)).toContain('n2-phong');
  });

  it('rời Phòng Đào tạo khi chưa hỏi đủ: ghim còn dấu, quay lại vào thẳng cảnh phòng, tiến độ hỏi đáp còn nguyên', () => {
    let s = toiCanh('kp-bd-n2', 'bam');
    s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh' }));
    // Xem chi tiết ẩn trước, rồi gặp cô Hạnh, hỏi một câu rồi bỏ đi.
    s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh-an' }));
    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh-vao' });
    let hd = khungNhin(KB, s);
    if (hd.kind !== 'hoi-dap') throw new Error(`chưa vào buổi hỏi: ${hd.kind}`);
    const cau = hd.hoiDap.cauBam.find((c) => c.lop !== 'hoi-mo');
    if (!cau) throw new Error('không có câu bấm');
    s = lam(KB, s, { type: 'hoi-dap-hoi', cau: cau.cau, lop: cau.lop });
    const biet = s.tienDoHoiDap?.['n2-co-hanh-vao']?.biet ?? [];
    expect(biet.length).toBeGreaterThan(0);
    for (let i = 0; i < 3 && khungNhin(KB, s).kind === 'hoi-dap'; i++) {
      hd = khungNhin(KB, s);
      s = lam(KB, s, hd.kind === 'hoi-dap' && hd.hoiDap.daRoi ? { type: 'tiep' } : { type: 'hoi-dap-roi-di' });
    }
    s = quaLoi(KB, s);
    let kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(kn.xongChinh).toBe(false);
    expect(daXem(kn, 'n2-co-hanh-vao')).toBe(false);

    s = lam(KB, s, { type: 'roi-canh' });
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    expect(daXem(kn, 'n2-co-hanh')).toBe(false);
    // Ghim phòng CLB (sau: n2-co-hanh) chưa hiện: việc chính ở Phòng Đào tạo chưa xong.
    expect(kn.diem.map((d) => d.diem.chuoi)).not.toContain('n2-phong');

    // Lưu / nạp giữa chừng: trạng thái JSON đi qua được.
    s = xuLy(KB, JSON.parse(JSON.stringify(s)) as TrangThaiMvp, { type: 'sua-con-tro' });
    expect(kp(KB, s).nut.id).toBe('kp-bd-n2');

    // Ghé nơi khác rồi quay lại.
    s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n2-bd-cang-tin' }));
    expect(kp(KB, s).nut.id).toBe('kp-toi-n2-bd-cang-tin');
    s = lam(KB, s, { type: 'roi-canh' });
    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh' });
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-toi-n2-co-hanh');
    expect(daXem(kn, 'n2-co-hanh-an')).toBe(true);
    expect(daXem(kn, 'n2-co-hanh-vao')).toBe(false);

    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n2-co-hanh-vao' });
    expect(khungNhin(KB, s).kind).toBe('hoi-dap');
    expect(s.tienDoHoiDap?.['n2-co-hanh-vao']?.biet).toEqual(biet);
  });

  it('cảnh không vào từ bản đồ (sân Trung thu): xong bốn điểm chính mà còn chỗ chưa xem thì chờ "Đi tiếp"', () => {
    let s = toiCanh('kp-banh-trung-thu');
    for (const c of ['md-10-dia-banh', 'md-10-vun-banh', 'md-10-den-ca-chep', 'md-10-doi-dep']) s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: c }));
    let kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-banh-trung-thu');
    expect(kn.xongChinh).toBe(true);
    expect(kn.roi).toEqual({ kieu: 'di-tiep', nhan: 'Đi tiếp' });
    s = quaLoi(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'md-10-dau-lan' }));
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-banh-trung-thu');
    s = quaLoi(KB, lam(KB, s, { type: 'roi-canh' }));
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'branch', nut: { id: 'r-ai-lay-banh' } });
  });

  it('chưa xong việc chính ở cảnh không vào từ bản đồ thì không có nút rời', () => {
    const s = toiCanh('kp-banh-trung-thu');
    expect(kp(KB, s).roi).toBeNull();
    expect(xuLy(KB, s, { type: 'roi-canh' })).toBe(s);
  });
});

describe('C. màn tra có đường lùi', () => {
  it('ngày 2: rời màn tra về phòng CLB, Duy còn dấu việc chính; bấm lại vào thẳng màn đang dở, màn đã giải không lặp lại', () => {
    const dau = choiTuDong(KB, taoTrangThai(KB, 1), CT, (_s, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-bang-lop', 20000);
    expect(canhLuiThuThach(KB, dau)).toMatchObject({ canh: 'phong-clb', diem: 'n2-phong-duy', quaNhay: true });

    let s = lam(KB, dau, { type: 'roi-thu-thach' });
    let kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-phong-n2');
    expect(daXem(kn, 'n2-phong-duy')).toBe(false);
    expect(kn.roi?.kieu).toBe('ve-ban-do');

    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n2-phong-duy' });
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-bang-lop' } });

    // Giải màn đầu, tới màn chọn cột, rời lần nữa rồi về hẳn bản đồ.
    s = quaLoi(KB, lam(KB, s, { type: 'xong-thu-thach', thuThach: 'c-bang-lop' }));
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-cot-lop' } });
    s = lam(KB, s, { type: 'roi-thu-thach' });
    expect(kp(KB, s).nut.id).toBe('kp-phong-n2');
    s = lam(KB, s, { type: 'roi-canh' });
    kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-bd-n2');
    expect(daXem(kn, 'n2-phong')).toBe(false);

    // Lưu / nạp rồi quay lại: ghim phòng CLB → cảnh phòng → Duy → đúng màn chọn cột.
    s = xuLy(KB, JSON.parse(JSON.stringify(s)) as TrangThaiMvp, { type: 'sua-con-tro' });
    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n2-phong' });
    expect(kp(KB, s).nut.id).toBe('kp-phong-n2');
    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n2-phong-duy' });
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-cot-lop' } });
    expect(s.thuThachXong).toContain('c-bang-lop');

    // Chơi tiếp bình thường tới kết thật.
    const ket = choiTuDong(KB, s, CT, (_x, k) => k.kind === 'end', 20000);
    expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
  });

  // Gói B15 (mục C) đổi hành vi: phòng CLB ngày 3 nay là một ghim trên bản đồ (không còn nối liền từ căng tin), nên cảnh phòng có
  // nút "Về bản đồ" như ngày 2. Trước gói B15 test này khẳng định "không có nút rời cảnh" (`roi` là null).
  it('ngày 3 (phòng CLB nay vào từ bản đồ): rời màn tra về phòng, Duy còn dấu việc chính, có nút "Về bản đồ"', () => {
    const dau = choiTuDong(KB, taoTrangThai(KB, 1), CT, (_s, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-ten-h', 20000);
    const s = lam(KB, dau, { type: 'roi-thu-thach' });
    const kn = kp(KB, s);
    expect(kn.nut.id).toBe('kp-phong-n3');
    expect(daXem(kn, 'n3-phong-duy')).toBe(false);
    expect(kn.roi).toEqual({ kieu: 've-ban-do', nhan: 'Về bản đồ' });
    expect(kn.hetNgay ?? null).toBeNull();
    expect(khungNhin(KB, lam(KB, s, { type: 'xem-diem', chuoi: 'n3-phong-duy' }))).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-ten-h' } });
  });

  it('buổi họp (sửa truy vấn) và bộ MVP: không có đường lùi', () => {
    const hop = nhayToi(KB, 'hop-sua-or', 1);
    expect(canhLuiThuThach(KB, hop)).toBeNull();
    expect(xuLy(KB, hop, { type: 'roi-thu-thach' })).toBe(hop);
    const mvp = nhayToi(MVP, 'lop', 1);
    expect(khungNhin(MVP, mvp).kind).toBe('challenge');
    expect(canhLuiThuThach(MVP, mvp)).toBeNull();
    expect(xuLy(MVP, mvp, { type: 'roi-thu-thach' })).toBe(mvp);
  });
});
