// @vitest-environment node
/**
 * Máy chạy MVP — test thuần (không React) trên dữ liệu sinh thật `KICH_BAN_MVP` (brief gói kien-truc-mvp, mục KIỂM TRA):
 * đi hết mở đầu → 5 ngày → họp → hai kết; hết khung → cuối ngày; đi lại không tốn khung; Lưu/Nạp giữa ngày 3.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { danhSachDiaDiem, khungNhin, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

/** Chiến thuật chơi tự động: chọn gì ở danh sách địa điểm / rẽ nhánh / câu hỏi. */
interface ChienThuat {
  /** Trả dữ kiện muốn xem (theo ngày), hay `null` để kết thúc ngày sớm. */
  chonDuKien: (s: TrangThaiMvp, kn: Extract<KhungNhinMvp, { kind: 'chon-dia-diem' }>) => { diaDiem: string; duKien: string } | null;
  reNhanh?: (id: string) => string;
  /** Mặc định chọn đáp án đúng. */
  traLoi?: (id: string, lan: number) => 'dung' | 'sai';
  /** Tên gõ ở câu hỏi tên (mặc định "Nam"). */
  ten?: string;
}

/** Chơi tự động tới khi gặp `dung(s, kn)` hoặc hết game; ném lỗi khi máy báo `error`. */
function choi(s: TrangThaiMvp, ct: ChienThuat, dung: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean, toiDa = 5000): TrangThaiMvp {
  for (let i = 0; i < toiDa; i++) {
    const kn = khungNhin(KB, s);
    if (kn.kind === 'error') throw new Error(`Máy báo lỗi: ${kn.message} (ngày ${s.ngay}, chuỗi ${s.conTro?.chuoi ?? '-'})`);
    if (dung(s, kn)) return s;
    let hd: HanhDongMvp;
    switch (kn.kind) {
      case 'line':
      case 'feedback':
      case 'show-document':
      case 'effect':
      case 'projector':
      case 'notebook-lookup':
        hd = { type: 'tiep' };
        break;
      case 'trial-filter':
        hd = { type: 'chon-o', giaTri: kn.nut.chon.giaTri };
        break;
      case 'question': {
        const muon = ct.traLoi?.(kn.nut.id, kn.lanThu) ?? 'dung';
        const c = kn.nut.choices.find((x) => x.correct === (muon === 'dung'));
        if (!c) throw new Error(`Câu hỏi ${kn.nut.id} không có lựa chọn ${muon}`);
        hd = { type: 'chon', luaChon: c.id };
        break;
      }
      case 'line-pick': {
        const d = kn.nut.lines.find((x) => x.correct);
        if (!d) throw new Error('Chọn dòng không có dòng đúng');
        hd = { type: 'chon-dong', index: d.index };
        break;
      }
      case 'notebook-copy': {
        const c = KB.soTay[kn.trang]?.chonDoanCode?.find((x) => x.correct);
        if (!c) throw new Error(`Trang ${kn.trang} không có đoạn đúng`);
        hd = { type: 'chon', luaChon: c.id };
        break;
      }
      case 'branch': {
        const id = ct.reNhanh?.(kn.nut.id) ?? kn.luaChon[0]?.id ?? '';
        hd = { type: 'chon', luaChon: id };
        break;
      }
      case 'challenge':
      case 'fix-query':
        hd = { type: 'xong-thu-thach', thuThach: kn.thuThach.id };
        break;
      case 'chon-dia-diem': {
        const chon = ct.chonDuKien(s, kn);
        hd = chon ? { type: 'chon-du-kien', ...chon } : { type: 'ket-thuc-ngay' };
        break;
      }
      case 'create-character':
        hd = kn.nut.truong === 'ten' ? { type: 'dat-ten', ten: ct.ten ?? 'Nam' } : { type: 'chon-nganh', nganh: kn.nut.luaChon[0] ?? '' };
        break;
      case 'end':
        return s;
    }
    const sau = xuLy(KB, s, hd);
    if (sau === s) throw new Error(`Hành động ${hd.type} bị từ chối ở khung nhìn ${kn.kind} (ngày ${s.ngay}, khung ${s.khung})`);
    s = sau;
  }
  throw new Error('Chơi quá số bước tối đa');
}

/** Dữ kiện chưa làm, mở được, chọn lọc theo danh sách mã ưu tiên (theo thứ tự), rồi tới bất kỳ dữ kiện phụ/nhiễu nào nếu `vetCan`. */
function chonTheoUuTien(uuTien: string[], vetCan: boolean): ChienThuat['chonDuKien'] {
  return (_s, kn) => {
    const moDuoc = kn.diaDiem.flatMap((dd) => dd.duKien.filter((k) => !k.daLam && !k.khoa).map((k) => ({ diaDiem: dd.diaDiem.id, duKien: k.duKien.id, nhan: k.duKien.nhan })));
    for (const id of uuTien) {
      const t = moDuoc.find((m) => m.duKien === id);
      if (t) return { diaDiem: t.diaDiem, duKien: t.duKien };
    }
    if (vetCan) {
      const t = moDuoc[0];
      if (t) return { diaDiem: t.diaDiem, duKien: t.duKien };
    }
    return null;
  };
}

/** Đường "tập trung": mỗi ngày làm dữ kiện chính (và dữ kiện nó cần) trước, rồi lấy đủ dữ kiện phụ cho kết thật. */
const DUONG_DU_BANG_CHUNG = [
  'dk-bac-thinh-the-lich',
  'dk-co-hanh-cap-quyen',
  'dk-loc-lop',
  'dk-quy-che-so-niem-phong',
  'dk-loi-chu-cuong',
  'dk-ten-h',
  'dk-nhat-ky-in',
  'dk-nop-hai-ma',
  'dk-loi-dat',
];
/** Chỉ dữ kiện chính (và thứ nó cần): thiếu `ev-nhat-ky-in`, `clue-loi-chu-cuong`, `clue-loi-dat`. */
const DUONG_CHI_CHINH = ['dk-bac-thinh-the-lich', 'dk-co-hanh-cap-quyen', 'dk-loc-lop', 'dk-quy-che-so-niem-phong', 'dk-ten-h', 'dk-nop-hai-ma'];

const toiHop = (s: TrangThaiMvp): boolean => s.giaiDoan === 'hop';
const toiKet = (_s: TrangThaiMvp, kn: KhungNhinMvp): boolean => kn.kind === 'end';

describe('máy MVP: mở đầu', () => {
  it('khởi tạo đứng ở lời đầu chuỗi mở đầu, chưa có tên / ngành (người chơi tự đặt ở [TẠO NHÂN VẬT])', () => {
    const s = taoTrangThai(KB, 1);
    expect(s.giaiDoan).toBe('mo-dau');
    expect(s.conTro?.chuoi).toBe(KB.lich.chuoiDau);
    expect(khungNhin(KB, s).kind).toBe('line');
    expect(s.tenNguoiChoi).toBe('');
    expect(s.nganh).toBe('');
  });

  it('đi hết mở đầu (lọc thử ở Ngày hội, sổ chị Linh, lá thư) → ngày 1 sáng, có manh mối [H.]', () => {
    const s = choi(taoTrangThai(KB, 1), { chonDuKien: () => null }, (st) => st.giaiDoan === 'ngay');
    expect(s.ngay).toBe(1);
    expect(s.khung).toBe(0);
    expect(s.hoSo.manhMoi).toContain('clue-chu-ky-h');
    expect(s.hoSo.taiLieu).toEqual(expect.arrayContaining(['doc-the-lich-cua-toi', 'doc-so-chi-linh', 'doc-bao-cao-yeu', 'doc-thu-che']));
    expect(s.nganh.length).toBeGreaterThan(0);
  });

  it('lọc thử: chọn ô sai thì đứng lại và đếm lần thử, chọn đúng mới qua', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: () => null }, (_st, kn) => kn.kind === 'trial-filter');
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'trial-filter') throw new Error('không tới lọc thử');
    s = xuLy(KB, s, { type: 'chon-o', giaTri: 'SV999999' });
    expect(khungNhin(KB, s).kind).toBe('trial-filter');
    expect(s.lanThu[kn.nut.id]).toBe(1);
    s = xuLy(KB, s, { type: 'chon-o', giaTri: kn.nut.chon.giaTri });
    expect(khungNhin(KB, s).kind).not.toBe('trial-filter');
  });
});

describe('máy MVP: nhịp ngày × khung', () => {
  it('(6) đi lại không tốn khung: danh sách địa điểm không đổi khung; xem dữ kiện mới tốn', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: () => null }, (st, kn) => st.giaiDoan === 'ngay' && kn.kind === 'chon-dia-diem');
    expect(s.khung).toBe(0);
    const ds = danhSachDiaDiem(KB, s);
    // Ngày 1 sáng: phòng CLB, tòa B, cổng KTX mở; phòng máy / đào tạo / CTSV / căng tin chưa.
    expect(ds.map((d) => d.diaDiem.id).sort()).toEqual(['cong-ktx', 'phong-clb', 'toa-b']);
    // "Đi" tới địa điểm khác chỉ là nhìn danh sách — không có hành động nào, khung vẫn 0.
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'chon-dia-diem', khungConLai: 3 });
    // Xem tờ rơi (nhiễu) tốn 1 khung.
    s = xuLy(KB, s, { type: 'chon-du-kien', diaDiem: 'toa-b', duKien: 'dk-to-roi-guitar' });
    expect(s.khung).toBe(1);
    s = choi(s, { chonDuKien: () => null }, (_st, kn) => kn.kind === 'chon-dia-diem');
    expect(s.khung).toBe(1);
    expect(s.duKienDaLam).toContain('dk-to-roi-guitar');
    // Sang địa điểm khác xem dữ kiện: vẫn chỉ tốn khung của dữ kiện (cổng KTX vào 0).
    s = xuLy(KB, s, { type: 'chon-du-kien', diaDiem: 'cong-ktx', duKien: 'dk-lich-cat-nuoc' });
    expect(s.khung).toBe(2);
  });

  it('(5) hết 3 khung chưa có dữ kiện chính → chuỗi cuối ngày dẫn tới dữ kiện chính, vẫn đạt, ngày tăng', () => {
    // Ngày 1: đốt 3 khung vào phụ/nhiễu (tờ rơi, thông báo họp, lịch cắt nước), không tới bác Thịnh.
    const phiPham = ['dk-to-roi-guitar', 'dk-thong-bao-hop', 'dk-lich-cat-nuoc', 'dk-so-chi-linh'];
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(phiPham, false) }, (st) => st.conTro?.boiCanh === 'toi');
    expect(s.khung).toBe(3);
    expect(s.chinhXong).toBe(false);
    expect(s.conTro?.chuoi).toBe('toi-1');
    expect(s.conTro?.boiCanh).toBe('toi');
    // Đi hết cuối ngày → dữ kiện chính ghi nhận, sang ngày 2.
    s = choi(s, { chonDuKien: () => null }, (st) => st.ngay === 2);
    expect(s.duKienDaLam).toContain('dk-bac-thinh-the-lich');
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-toa-b', 'clue-bao-chi-k24']));
    expect(s.hoSo.bangChung).toContain('ev-the-lich');
    expect(s.khung).toBe(0);
    expect(s.chinhXong).toBe(false);
  });

  it('có dữ kiện chính sớm rồi hết khung → hết ngày, không chạy cuối ngày', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(['dk-bac-thinh-the-lich'], false) }, (st) => st.chinhXong);
    expect(s.ngay).toBe(1);
    expect(s.khung).toBe(1);
    s = choi(s, { chonDuKien: chonTheoUuTien(['dk-to-roi-guitar', 'dk-thong-bao-hop'], false) }, (st) => st.ngay === 2);
    expect(s.duKienDaLam).toEqual(expect.arrayContaining(['dk-bac-thinh-the-lich', 'dk-to-roi-guitar', 'dk-thong-bao-hop']));
  });

  it('kết thúc ngày sớm khi đã có dữ kiện chính → sang ngày sau', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(['dk-bac-thinh-the-lich'], false) }, (st, kn) => st.chinhXong && kn.kind === 'chon-dia-diem');
    s = xuLy(KB, s, { type: 'ket-thuc-ngay' });
    expect(s.ngay).toBe(2);
  });

  it('phòng máy: vào tốn 1 khung, dữ kiện bên trong 0; dữ kiện có `Cần` hiện khóa khi chưa đủ', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(['dk-bac-thinh-the-lich'], false) }, (st, kn) => st.ngay === 2 && kn.kind === 'chon-dia-diem');
    let ds = danhSachDiaDiem(KB, s);
    const pm = ds.find((d) => d.diaDiem.id === 'phong-may');
    expect(pm?.duKien.find((k) => k.duKien.id === 'dk-loc-lop')).toMatchObject({ khoa: true, tonKhung: 1 });
    s = xuLy(KB, s, { type: 'chon-du-kien', diaDiem: 'phong-dao-tao', duKien: 'dk-co-hanh-cap-quyen' });
    s = choi(s, { chonDuKien: () => null }, (_st, kn) => kn.kind === 'chon-dia-diem');
    expect(s.hoSo.manhMoi).toContain('clue-quyen-du-lieu');
    ds = danhSachDiaDiem(KB, s);
    expect(ds.find((d) => d.diaDiem.id === 'phong-may')?.duKien.find((k) => k.duKien.id === 'dk-loc-lop')).toMatchObject({ khoa: false, tonKhung: 1 });
    s = xuLy(KB, s, { type: 'chon-du-kien', diaDiem: 'phong-may', duKien: 'dk-loc-lop' });
    expect(s.khung).toBe(2);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-loc-lop' } });
    s = xuLy(KB, s, { type: 'xong-thu-thach', thuThach: 'c-loc-lop' });
    expect(s.hoSo.bangChung).toContain('ev-lop-bc24a');
    expect(s.chinhXong).toBe(true);
    expect(s.khung).toBe(2);
    // Đã vào phòng máy hôm nay: dữ kiện khác trong đó tốn 0.
    ds = danhSachDiaDiem(KB, s);
    expect(ds.find((d) => d.diaDiem.id === 'phong-may')?.duKien.every((k) => k.tonKhung === 0)).toBe(true);
  });
});

describe('máy MVP: buổi họp và hai kết', () => {
  it('(1) đủ ev-nhat-ky-in + lời chú Cường/Đạt, chọn tự kể → kết thật, còn đủ 5 vạch', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false) }, toiHop);
    expect(s.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-the-lich', 'ev-lop-bc24a', 'ev-hai-ma', 'ev-nhat-ky-in']));
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-loi-chu-cuong', 'clue-loi-dat', 'clue-hoai-nguoi-nop']));
    expect(s.uyTin).toBe(5);
    s = choi(s, { chonDuKien: () => null, reNhanh: () => 'tu-ke' }, toiKet);
    expect(khungNhin(KB, s)).toEqual({ kind: 'end', ketQua: 'that' });
    expect(s.conTro?.chuoi).toBe('ket-that');
    expect(s.uyTin).toBe(5);
    expect(s.hoSo.bangChung).toContain('ev-hai-dong-sua');
  });

  it('(2) cùng đường nhưng thiếu dữ kiện phụ → kết thường', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(DUONG_CHI_CHINH, false) }, toiHop);
    expect(s.hoSo.bangChung).not.toContain('ev-nhat-ky-in');
    s = choi(s, { chonDuKien: () => null, reNhanh: () => 'tu-ke' }, toiKet);
    expect(khungNhin(KB, s)).toEqual({ kind: 'end', ketQua: 'thuong' });
    expect(s.conTro?.chuoi).toBe('ket-thuong');
  });

  it('(3) chọn đối chất → mất 1 vạch + kết thường dù đủ bằng chứng', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false) }, toiHop);
    s = choi(s, { chonDuKien: () => null, reNhanh: () => 'doi-chat' }, toiKet);
    expect(s.uyTin).toBe(4);
    expect(khungNhin(KB, s)).toEqual({ kind: 'end', ketQua: 'thuong' });
  });

  it('(4) chọn dừng → kết thường, không mất vạch', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false) }, toiHop);
    s = choi(s, { chonDuKien: () => null, reNhanh: () => 'dung' }, toiKet);
    expect(s.uyTin).toBe(5);
    expect(khungNhin(KB, s)).toEqual({ kind: 'end', ketQua: 'thuong' });
  });

  it('[HỎI · trừ uy tín] sai → mất 1 vạch, lời Minh Anh, hỏi lại; đúng mới đi tiếp', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false) }, (_st, kn) => kn.kind === 'question');
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'question') throw new Error('không tới câu hỏi');
    expect(kn.nut.truUyTin).toBe(true);
    const sai = kn.nut.choices.find((c) => !c.correct);
    if (!sai) throw new Error('không có lựa chọn sai');
    s = xuLy(KB, s, { type: 'chon', luaChon: sai.id });
    expect(s.uyTin).toBe(4);
    // Phản hồi của lựa chọn + lời Minh Anh lần 1.
    const phanHoi = s.hoiDap?.phanHoi ?? [];
    expect(phanHoi.length).toBe(sai.feedback.length + 1);
    expect(phanHoi[phanHoi.length - 1]).toEqual(KB.loiChung.matUyTin?.loi[0]);
    for (let i = 0; i < phanHoi.length; i++) s = xuLy(KB, s, { type: 'tiep' });
    // Quay lại chính câu hỏi đó.
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'question', nut: { id: kn.nut.id }, lanThu: 1 });
  });

  it('hết vạch → lời [HẾT VẠCH] rồi hoãn: về đầu chuỗi ngày họp với đủ vạch, hồ sơ giữ nguyên', () => {
    let s = choi(taoTrangThai(KB, 1), { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false) }, (_st, kn) => kn.kind === 'question');
    const hoSoTruoc = s.hoSo;
    for (let lan = 0; lan < 5; lan++) {
      const kn = khungNhin(KB, s);
      if (kn.kind !== 'question') throw new Error(`lần ${lan}: không ở câu hỏi mà ở ${kn.kind}`);
      const sai = kn.nut.choices.find((c) => !c.correct);
      s = xuLy(KB, s, { type: 'chon', luaChon: sai?.id ?? '' });
      expect(s.uyTin).toBe(4 - lan);
      if (lan === 4) {
        const cuoi = s.hoiDap?.phanHoi[s.hoiDap.phanHoi.length - 1];
        expect(cuoi).toEqual(KB.loiChung.matUyTin?.hetVach);
      }
      const n = s.hoiDap?.phanHoi.length ?? 0;
      for (let i = 0; i < n; i++) s = xuLy(KB, s, { type: 'tiep' });
    }
    expect(s.giaiDoan).toBe('hop');
    // Về đầu chuỗi ngày họp (máy đã chạy qua nhiệm vụ/ghi chú tới lời đầu).
    expect(s.conTro).toMatchObject({ chuoi: 'hop-00', boiCanh: 'hop' });
    expect(khungNhin(KB, s).kind).toBe('line');
    expect(s.uyTin).toBe(5);
    expect(s.hoSo).toEqual(hoSoTruoc);
  });
});

describe('máy MVP: Lưu / Nạp', () => {
  it('(8) lưu giữa ngày 3 rồi nạp lại: đúng ngày/khung/hồ sơ/cờ, chơi tiếp tới kết thật y như không nạp', () => {
    const giuaNgay3 = (st: TrangThaiMvp, kn: KhungNhinMvp): boolean => st.ngay === 3 && st.khung === 1 && kn.kind === 'chon-dia-diem';
    const ct: ChienThuat = { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false), reNhanh: () => 'tu-ke' };
    const truoc = choi(taoTrangThai(KB, 1), ct, giuaNgay3);
    const goi = JSON.stringify(truoc);
    const sau = JSON.parse(goi) as TrangThaiMvp;
    expect(sau).toEqual(truoc);
    expect(sau.ngay).toBe(3);
    expect(sau.khung).toBe(1);
    expect(sau.hoSo.manhMoi).toContain('clue-can-ma-va-can-cu');
    const ketA = choi(truoc, ct, toiKet);
    const ketB = choi(sau, ct, toiKet);
    expect(khungNhin(KB, ketB)).toEqual({ kind: 'end', ketQua: 'that' });
    expect(ketB).toEqual(ketA);
  });
});
