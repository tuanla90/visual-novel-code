// @vitest-environment node
/**
 * Chọn nhạc nền theo khung nhìn (`nhac.ts`): luật từng loại màn, và một lượt máy tự chơi cả mùa để chắc nhạc không
 * đổi giữa hai câu thoại liền nhau khi bối cảnh không đổi.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { NHAC_NEN, type NhacNen } from '../../shared/audio/nhac-nen';
import { taoTrangThai, type KhungNhinMvp } from './may';
import { chonNhacNen, type NhacTruoc } from './nhac';
import type { TrangThaiMvp } from './trang-thai';
import { choiTuDong, chonTheoUuTien, reNhanhTheo, RE_NHANH_KET_THAT } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

const loi: KhungNhinMvp = { kind: 'line', loi: { speaker: 'narrator', text: '…' } };
const man = (kind: KhungNhinMvp['kind']) => ({ kind }) as unknown as KhungNhinMvp;
const truoc = (nhac: NhacNen, chuoi: string | null = 'x'): NhacTruoc => ({ nhac, chuoi });
type BoiCanh = NonNullable<TrangThaiMvp['conTro']>['boiCanh'];

function trangThai(p: Partial<TrangThaiMvp>): TrangThaiMvp {
  return { ...taoTrangThai(KB, 0), ...p };
}
const trongChuoi = (giaiDoan: TrangThaiMvp['giaiDoan'], boiCanh: BoiCanh, them: Partial<TrangThaiMvp> = {}) =>
  trangThai({ giaiDoan, conTro: { chuoi: 'x', nut: 0, boiCanh }, ...them });

describe('chonNhacNen — luật từng màn', () => {
  it('chưa có ván / mở đầu → nhạc chủ đề; tạo nhân vật giữ bài đang phát', () => {
    expect(chonNhacNen(null, null, null)).toBe('chu-de');
    expect(chonNhacNen(loi, trongChuoi('mo-dau', 'mo-dau'), null)).toBe('chu-de');
    expect(chonNhacNen(man('create-character'), trongChuoi('mo-dau', 'mo-dau'), null)).toBe('chu-de');
    expect(chonNhacNen(man('create-character'), trongChuoi('mo-dau', 'mo-dau'), truoc('dieu-tra'))).toBe('dieu-tra');
  });

  it('màn dài quyết định nhạc', () => {
    const s = trongChuoi('ngay', 'mo-ngay');
    expect(chonNhacNen(man('challenge'), s, truoc('thuong-ngay'))).toBe('phan-tich');
    expect(chonNhacNen(man('chon-dia-diem'), s, truoc('thuong-ngay'))).toBe('dieu-tra');
    expect(chonNhacNen(man('explore'), s, truoc('thuong-ngay'))).toBe('dieu-tra');
    expect(chonNhacNen(man('doi-chat'), s, truoc('doi-chat'))).toBe('cao-trao');
    expect(chonNhacNen(man('end'), s, truoc('cao-trao'))).toBe('ket');
  });

  it('màn ngắn chen giữa thoại và lời phản hồi giữ bài đang phát', () => {
    const s = trongChuoi('ngay', 'mo-ngay');
    expect(chonNhacNen(man('question'), s, truoc('dieu-tra'))).toBe('dieu-tra');
    expect(chonNhacNen(man('feedback'), s, truoc('cao-trao'))).toBe('cao-trao');
    expect(chonNhacNen(man('question'), s, null)).toBe('thuong-ngay');
  });

  it('thoại theo bối cảnh: khám phá / đi điều tra / đầu ngày / buổi họp / kết', () => {
    expect(chonNhacNen(loi, trongChuoi('ngay', 'truyen', { khamPha: { veLai: { chuoi: 'y', nut: 0, boiCanh: 'truyen' }, daXem: [] } }), truoc('dieu-tra'))).toBe('dieu-tra');
    expect(chonNhacNen(loi, trongChuoi('ngay', 'du-kien'), truoc('phan-tich'))).toBe('dieu-tra');
    expect(chonNhacNen(loi, trongChuoi('ngay', 'mo-ngay'), truoc('dieu-tra'))).toBe('thuong-ngay');
    expect(chonNhacNen(loi, trongChuoi('hop', 'ket'), truoc('cao-trao'))).toBe('ket');
    expect(chonNhacNen(loi, trongChuoi('hop', 'hop'), truoc('thuong-ngay'))).toBe('doi-chat');
    // Đã lên cao trào thì thoại trong buổi họp giữ cao trào, kể cả sang chuỗi khác.
    expect(chonNhacNen(loi, trongChuoi('hop', 'hop'), truoc('cao-trao', 'chuoi-khac'))).toBe('cao-trao');
    // Vụ sau họp ở phòng họp cũng là buổi họp.
    expect(chonNhacNen(loi, trongChuoi('vu-sau', 'vu', { canh: 'phong-hop' }), truoc('thuong-ngay'))).toBe('doi-chat');
  });

  it('ngoài buổi họp, cao trào giữ tới hết chuỗi chứa lần đối chất', () => {
    const s = trongChuoi('vu-sau', 'vu', { canh: 'phong-clb' });
    expect(chonNhacNen(loi, s, truoc('cao-trao', 'x'))).toBe('cao-trao');
    expect(chonNhacNen(loi, s, truoc('cao-trao', 'chuoi-truoc'))).toBe('thuong-ngay');
  });
});

describe('chonNhacNen — máy tự chơi cả mùa', () => {
  // Vụ 1 kết thật rồi sang hết các vụ sau; chọn nhạc ở từng bước như ManChoiMvp.
  const buoc: { nhac: NhacNen; kind: KhungNhinMvp['kind']; chuoi: string | null; khamPha: boolean }[] = [];
  let t: NhacTruoc | null = null;
  choiTuDong(
    KB,
    taoTrangThai(KB, 0),
    { chonDuKien: chonTheoUuTien([], true), reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), sangVuSau: true },
    (s, kn) => {
      const nhac = chonNhacNen(kn, s, t);
      t = { nhac, chuoi: s.conTro?.chuoi ?? null };
      buoc.push({ nhac, kind: kn.kind, chuoi: t.chuoi, khamPha: Boolean(s.khamPha) });
      return false;
    },
    20000,
  );

  it('đi qua đủ mọi bài', () => {
    expect(buoc.length).toBeGreaterThan(100);
    expect(new Set(buoc.map((b) => b.nhac))).toEqual(new Set(NHAC_NEN));
  });

  it('giữa hai câu thoại liền nhau, nhạc chỉ đổi khi sang chuỗi khác hay ra/vào cảnh khám phá', () => {
    const doiVoCo: string[] = [];
    for (let i = 1; i < buoc.length; i++) {
      const [a, b] = [buoc[i - 1]!, buoc[i]!];
      if (a.kind === 'line' && b.kind === 'line' && a.nhac !== b.nhac && a.chuoi === b.chuoi && a.khamPha === b.khamPha) {
        doiVoCo.push(`${i} ${b.chuoi}: ${a.nhac} → ${b.nhac}`);
      }
    }
    expect(doiVoCo).toEqual([]);
  });
});
