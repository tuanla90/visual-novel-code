// @vitest-environment node
/**
 * Gói B17 (docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md): hai mức đầu ván của bộ mùa 1 — luật máy.
 *   A. Đặt mức (`doi-muc`), mặc định khi thiếu (ô lưu cũ): "Tự dò" + "Ghép khối"; cách hỏi nhân chứng mặc định theo mức; đổi cách
 *      trong khung hỏi không đổi mức và chỉ áp cho buổi hỏi đó.
 *   B. Bạn đi cùng ở buổi hỏi: "Như thật" không tự lên tiếng sau hai câu trượt; mức khác vẫn như B12.
 *   C. Bảng nhãn / thay chữ của màn tra, câu SQL che giá trị, dịch lỗi SQLite.
 *   D. Máy tự chơi hết Vụ 1 tới kết thật ở cả chín tổ hợp (3 × 3); ô lưu không có hai trường nạp lên là mặc định.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { dichLoiSqlite } from './dich-loi-sqlite';
import { cachChoiCua, khungHoiDap } from './hoi-dap';
import { khungNhin, taoTrangThai, xuLy, type HanhDongMvp } from './may';
import { CACH_HOI_THEO_MUC, dauTheoMuc, datMuc, giayNhacDan, MUC_NHAP_VAI, MUC_SQL, mucNhapVaiCua, mucSqlCua, tuGoiY } from './muc-choi';
import { cheGiaTriSql, NHAN_SQL, nhanManTra, thayChuGoiY } from './nhan-man-tra';
import type { MucNhapVaiMvp, MucSqlMvp, TrangThaiMvp } from './trang-thai';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;

function lam(s: TrangThaiMvp, ...hds: HanhDongMvp[]): TrangThaiMvp {
  for (const hd of hds) {
    const sau = xuLy(KB, s, hd);
    if (sau === s) throw new Error(`Máy từ chối ${hd.type} ở ${khungNhin(KB, s).kind}`);
    s = sau;
  }
  return s;
}

/** Đứng ở buổi hỏi bác Thịnh (ngày 1) như hoi-dap.test. */
function vaoBacThinh(s0: TrangThaiMvp): TrangThaiMvp {
  const c = KB.chuoi.find((x) => x.id === 'n1-toa-b')!;
  const s = xuLy(KB, { ...s0, giaiDoan: 'ngay', ngay: 1, conTro: { chuoi: 'n1-toa-b', nut: c.nodes.findIndex((n) => n.type === 'explore'), boiCanh: 'truyen' } }, { type: 'sua-con-tro' });
  return xuLy(KB, s, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
}
const hd = (s: TrangThaiMvp) => {
  const kn = khungNhin(KB, s);
  if (kn.kind !== 'hoi-dap') throw new Error(`đang ở ${kn.kind}`);
  return kn.hoiDap;
};
const hoi = (cau: string): HanhDongMvp => ({ type: 'hoi-dap-hoi', cau });

describe('A. đặt mức, mặc định, cách hỏi theo mức', () => {
  it('ván mới không có hai trường: coi như "Tự dò" + "Ghép khối"; cách hỏi mặc định vẫn là gõ (như B12)', () => {
    const s = taoTrangThai(KB, 1);
    expect(s.mucNhapVai).toBeUndefined();
    expect(s.mucSql).toBeUndefined();
    expect(mucNhapVaiCua(s)).toBe('tu-do');
    expect(mucSqlCua(s)).toBe('ghep');
    expect(cachChoiCua(s)).toBe('go');
  });

  it('doi-muc đặt hai trường, áp ngay không đổi con trỏ; giá trị lạ bị từ chối', () => {
    const s0 = taoTrangThai(KB, 1);
    const s = xuLy(KB, s0, { type: 'doi-muc', nhapVai: 'dan', sql: 'tu-viet' });
    expect(s).toMatchObject({ mucNhapVai: 'dan', mucSql: 'tu-viet' });
    expect(s.conTro).toEqual(s0.conTro);
    expect(xuLy(KB, s0, { type: 'doi-muc', nhapVai: 'sieu' as MucNhapVaiMvp })).toBe(s0);
    expect(xuLy(KB, s, { type: 'doi-muc', nhapVai: 'dan', sql: 'tu-viet' })).toBe(s);
  });

  it('cách hỏi mặc định theo mức: dẫn = xem cả đoạn, tự dò = bấm câu hỏi, như thật = gõ', () => {
    for (const m of MUC_NHAP_VAI) {
      const s = xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-muc', nhapVai: m });
      expect(cachChoiCua(s)).toBe(CACH_HOI_THEO_MUC[m]);
      expect(hd(vaoBacThinh(s)).cachChoi).toBe(CACH_HOI_THEO_MUC[m]);
    }
  });

  it('đổi cách trong khung hỏi không đổi mức; đóng buổi hỏi thì buổi sau lại theo mức', () => {
    let s = vaoBacThinh(xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-muc', nhapVai: 'tu-do' }));
    s = lam(s, { type: 'doi-cach-choi', cach: 'go' });
    expect(hd(s).cachChoi).toBe('go');
    expect(s.mucNhapVai).toBe('tu-do');
    s = lam(s, { type: 'hoi-dap-roi-di' }, { type: 'hoi-dap-roi-di' }, { type: 'tiep' });
    expect(khungNhin(KB, s).kind).toBe('explore');
    expect(s.cachChoi).toBeUndefined();
    expect(cachChoiCua(s)).toBe('bam');
  });

  it('đổi mức nhập vai thì cách hỏi mặc định mới áp ngay (quên cách đã đổi tại chỗ)', () => {
    const s = datMuc({ ...taoTrangThai(KB, 1), cachChoi: 'go' }, { nhapVai: 'dan' });
    expect(s.cachChoi).toBeUndefined();
    expect(cachChoiCua(s)).toBe('tu-dong');
    // Chỉ đổi mức SQL thì cách hỏi giữ.
    expect(datMuc({ ...taoTrangThai(KB, 1), cachChoi: 'go' }, { sql: 'ghep-sql' }).cachChoi).toBe('go');
  });

  it('bảng dấu và bạn đi cùng theo mức đúng đề bài', () => {
    expect(dauTheoMuc('dan')).toEqual({ ghim: true, nguoi: true, vat: true, cham: true });
    expect(dauTheoMuc('tu-do')).toEqual({ ghim: true, nguoi: true, vat: false, cham: false });
    expect(dauTheoMuc('that')).toEqual({ ghim: false, nguoi: false, vat: false, cham: false });
    expect([tuGoiY('dan'), tuGoiY('tu-do'), tuGoiY('that')]).toEqual([true, true, false]);
    expect([giayNhacDan('dan'), giayNhacDan('tu-do'), giayNhacDan('that')]).toEqual([40_000, null, null]);
  });
});

describe('B. bạn đi cùng ở buổi hỏi theo mức', () => {
  it('"Như thật": trượt hai câu liền (cách gõ) bạn KHÔNG tự gợi ý; bấm ảnh mặt thì có, bậc 1 rồi mới bậc 2', () => {
    let s = vaoBacThinh(xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-muc', nhapVai: 'that' }));
    s = lam(s, hoi('trời hôm nay nóng quá'), hoi('bác ăn cơm chưa'), hoi('wifi trường pass là gì'));
    expect(hd(s).bong).toBeNull();
    s = lam(s, { type: 'hoi-dap-goi-y' });
    expect(hd(s).bong?.kieu).toBe('goi-y-1');
    s = lam(s, { type: 'hoi-dap-goi-y' });
    expect(hd(s).bong?.kieu).toBe('goi-y-2');
  });

  it('"Tự dò" đổi sang gõ: trượt hai câu liền thì bạn gợi ý bậc 1 (như B12)', () => {
    let s = vaoBacThinh(xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-muc', nhapVai: 'tu-do' }));
    s = lam(s, { type: 'doi-cach-choi', cach: 'go' }, hoi('trời hôm nay nóng quá'), hoi('bác ăn cơm chưa'));
    expect(hd(s).bong?.kieu).toBe('goi-y-1');
  });
});

describe('C. nhãn màn tra, thay chữ gợi ý, che giá trị, dịch lỗi', () => {
  it('nấc "chữ SQL" đổi đúng các nhãn đề bài; nấc khác giữ chữ', () => {
    const nh = nhanManTra('ghep-sql');
    expect(nh('1. NGUỒN BẢNG')).toBe('FROM');
    expect(nh('2. ĐIỀU KIỆN LỌC')).toBe('WHERE');
    expect(nh('3. CỘT & SẮP XẾP')).toBe('SELECT · ORDER BY');
    expect(nh('LẤY CỘT')).toBe('SELECT');
    expect(nh('bằng')).toBe('=');
    expect(nh('bắt đầu bằng')).toBe("LIKE 'x%'");
    expect(nh('là một trong')).toBe('IN');
    expect([nh('VÀ'), nh('HOẶC'), nh('CHẠY')]).toEqual(['AND', 'OR', 'RUN']);
    expect(nh('ma_lop')).toBe('ma_lop');
    expect(nhanManTra('ghep')('CHẠY')).toBe('CHẠY');
    expect(nhanManTra('tu-viet')('LẤY CỘT')).toBe('LẤY CỘT');
    expect(nhanManTra(undefined)('bằng')).toBe('bằng');
    for (const k of Object.keys(NHAN_SQL)) expect(k).not.toMatch(/—|→/);
  });

  it('lời gợi ý bậc 2 đổi chữ trên màn theo nhãn mới, chữ thường chỉ đổi trong ngoặc kép', () => {
    const loi = 'Ở hàng LẤY CỘT, bấm cho sáng hai cột ma_lop và toa_nha, các cột khác để tắt, rồi bấm CHẠY.';
    expect(thayChuGoiY('ghep-sql', loi)).toBe('Ở hàng SELECT, bấm cho sáng hai cột ma_lop và toa_nha, các cột khác để tắt, rồi bấm RUN.');
    expect(thayChuGoiY('ghep-sql', 'Ở dòng ten_tep, bấm vào chữ "bằng" cho nó đổi thành "bắt đầu bằng", rồi bấm CHẠY.')).toBe(
      'Ở dòng ten_tep, bấm vào chữ "=" cho nó đổi thành "LIKE \'x%\'", rồi bấm RUN.',
    );
    expect(thayChuGoiY('ghep-sql', 'Bấm vào chữ HOẶC giữa hai dòng lọc cho nó đổi thành VÀ, rồi bấm CHẠY.')).toBe('Bấm vào chữ OR giữa hai dòng lọc cho nó đổi thành AND, rồi bấm RUN.');
    expect(thayChuGoiY('ghep', loi)).toBe(loi);
    expect(thayChuGoiY('tu-viet', loi)).toBe(loi);
  });

  it('che giá trị của câu SQL chuẩn, giữ cấu trúc', () => {
    expect(cheGiaTriSql("SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';")).toBe("SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE '…' AND ma_lop = '…'");
    expect(cheGiaTriSql('SELECT * FROM don WHERE so_luong > 3 AND kho = 0')).toBe('SELECT * FROM don WHERE so_luong > … AND kho = …');
  });

  it('dịch lỗi SQLite gọn sang tiếng Việt', () => {
    const loi = (thongDiep: string, loai: 'cu-phap' | 'khong-co-bang' | 'khong-co-cot' | 'khac' = 'khac') => dichLoiSqlite({ ok: false, loai, thongDiep });
    expect(loi('no such table: sinhvien', 'khong-co-bang')).toMatch(/^Không có bảng tên "sinhvien"/);
    expect(loi('no such column: tenn', 'khong-co-cot')).toMatch(/^Không có cột "tenn"/);
    expect(loi('unrecognized token: "\'BC24A"', 'cu-phap')).toMatch(/^Thiếu dấu nháy/);
    expect(loi('near "FORM": syntax error', 'cu-phap')).toBe('Lỗi cú pháp gần chữ "FORM".');
    expect(loi('incomplete input', 'cu-phap')).toMatch(/chưa viết xong/);
    expect(dichLoiSqlite({ ok: false, loai: 'khong-phai-select', thongDiep: 'Chỉ chấp nhận một câu SELECT (hoặc WITH … SELECT).' })).toBe('Chỉ chấp nhận một câu SELECT (hoặc WITH … SELECT).');
  });
});

describe('D. máy tự chơi hết Vụ 1 ở cả chín tổ hợp', () => {
  for (const nhapVai of MUC_NHAP_VAI) {
    for (const sql of MUC_SQL) {
      it(`${nhapVai} + ${sql}: tới kết thật, hai mức còn nguyên trong trạng thái`, () => {
        const dau = xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-muc', nhapVai, sql });
        const ket = choiTuDong(KB, dau, { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) }, (_s, kn) => kn.kind === 'end', 20000);
        expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
        expect(ket.mucNhapVai).toBe(nhapVai);
        expect(ket.mucSql).toBe(sql);
        expect(ket.cachChoi).toBeUndefined();
      });
    }
  }

  it('ô lưu cũ (JSON không có hai trường) nạp lên là mặc định; ván có mức lưu / nạp giữ nguyên', () => {
    const cu = JSON.parse(JSON.stringify(taoTrangThai(KB, 1))) as TrangThaiMvp;
    expect(mucNhapVaiCua(cu)).toBe('tu-do');
    expect(mucSqlCua(cu)).toBe('ghep');
    const moi = xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-muc', nhapVai: 'that', sql: 'tu-viet' as MucSqlMvp });
    const nap = JSON.parse(JSON.stringify(moi)) as TrangThaiMvp;
    expect(nap.mucNhapVai).toBe('that');
    expect(nap.mucSql).toBe('tu-viet');
    expect(cachChoiCua(nap)).toBe('go');
    expect(khungHoiDap(KB, vaoBacThinh(nap), 'n1-bac-thinh')?.cachChoi).toBe('go');
  });
});
