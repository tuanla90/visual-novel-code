/**
 * Màn "Nhân vật mới" của bản MVP — cùng giao diện prototype (`CharacterDebutCard`, `character-debut.css`), dữ liệu từ thẻ
 * giới thiệu trong nhan-vat.md (`NhanVatMvp.gioiThieu`). Ảnh: `intro-<mã>` (16:9) nếu có, không thì chân dung trong khung.
 * Chỉ mở sau khi người chơi bấm tiếp ở câu tự giới thiệu; đóng → `da-gioi-thieu`.
 * Gói B18: thẻ chỉ ghi ô người chơi đã biết (`truongDaBietTu`): họ tên chưa biết → tiêu đề là tên gọi, thêm dòng "Họ tên: ?";
 * danh xưng, năm, ngành chưa biết → "?"; câu nói vốn không hiện ở thẻ này. Thẻ không khai "Biết lúc gặp" → như cũ.
 */
import '../../story/ui/character-debut.css';
import type { KichBanMvp, TruongBietMvp } from '../../content/mvp/types';
import { CharacterDebutCard } from '../../story/ui/CharacterDebutSplash';
import { truongDaBietTu } from '../engine/may';
import { anhChanDung, anhTheoTen } from './anh-mvp';
import { mauNhanVat } from './mau-nhan-vat';

/** Nhãn người chơi đọc của từng ô thẻ (dòng báo "Hồ sơ Tùng: biết thêm họ tên"). */
export const NHAN_TRUONG_BIET: Readonly<Record<TruongBietMvp, string>> = {
  'ho-ten': 'họ tên',
  'danh-xung': 'danh xưng',
  nam: 'năm học',
  nganh: 'ngành',
  lich: 'lịch',
  'cau-noi': 'câu nói',
};

export interface GioiThieuMvpProps {
  kb: KichBanMvp;
  nhanVat: string;
  /** `TrangThaiMvp.bietVe`: ô thẻ đã biết thêm nhờ `[BIẾT]` (gói B18). Bỏ trống = chỉ những ô "Biết lúc gặp". */
  bietVe?: Readonly<Record<string, readonly TruongBietMvp[]>> | null;
  onDong: (id: string) => void;
}

export function GioiThieuMvp({ kb, nhanVat, bietVe, onDong }: GioiThieuMvpProps) {
  const nv = kb.nhanVat.find((n) => n.id === nhanVat);
  const gt = nv?.gioiThieu;
  if (!nv || !gt) return null;
  const intro = anhTheoTen(`intro-${nv.id}`);
  const chanDung = anhChanDung(nv.id, nv.bieuCam[0]);
  const biet = truongDaBietTu(gt, bietVe?.[nv.id]);
  const bietHoTen = biet.has('ho-ten');
  return (
    <CharacterDebutCard
      id={nv.id}
      fullName={bietHoTen ? (nv.hoTen ?? nv.ten) : nv.ten}
      subName={null}
      title={biet.has('danh-xung') ? gt.danhXung : '?'}
      year={gt.nam ? (biet.has('nam') ? gt.nam : 'Năm: ?') : null}
      major={gt.nganh ? (biet.has('nganh') ? gt.nganh : 'Ngành: ?') : null}
      accentColor={mauNhanVat(nv.id)}
      intro={intro ? { url: intro } : null}
      textSide="right"
      visual={
        <div className="chara-debut__portrait-wrap mvp-gioithieu__chandung">{chanDung ? <img src={chanDung} alt={nv.ten} draggable={false} /> : null}</div>
      }
      onDismiss={() => onDong(nv.id)}
    />
  );
}
