/**
 * Màn "Nhân vật mới" của bản MVP — cùng giao diện prototype (`CharacterDebutCard`, `character-debut.css`), dữ liệu từ thẻ
 * giới thiệu trong nhan-vat.md (`NhanVatMvp.gioiThieu`). Ảnh: `intro-<mã>` (16:9) nếu có, không thì chân dung trong khung.
 * Chỉ mở sau khi người chơi bấm tiếp ở câu tự giới thiệu; đóng → `da-gioi-thieu`.
 */
import '../../story/ui/character-debut.css';
import type { KichBanMvp } from '../../content/mvp/types';
import { CharacterDebutCard } from '../../story/ui/CharacterDebutSplash';
import { anhChanDung, anhTheoTen } from './anh-mvp';
import { mauNhanVat } from './mau-nhan-vat';

/** Ảnh giới thiệu đặt nhân vật một bên, chữ đi vào phía còn trống (như prototype). */
const CHU_BEN_TRAI = new Set(['ha-vy', 'quan']);

export function GioiThieuMvp({ kb, nhanVat, onDong }: { kb: KichBanMvp; nhanVat: string; onDong: (id: string) => void }) {
  const nv = kb.nhanVat.find((n) => n.id === nhanVat);
  const gt = nv?.gioiThieu;
  if (!nv || !gt) return null;
  const intro = anhTheoTen(`intro-${nv.id}`);
  const chanDung = anhChanDung(nv.id, nv.bieuCam[0]);
  return (
    <CharacterDebutCard
      id={nv.id}
      fullName={nv.hoTen ?? nv.ten}
      title={gt.danhXung}
      year={gt.nam}
      major={gt.nganh}
      quote={gt.cauNoi}
      accentColor={mauNhanVat(nv.id)}
      intro={intro ? { url: intro } : null}
      textSide={CHU_BEN_TRAI.has(nv.id) ? 'left' : 'right'}
      visual={
        <div className="chara-debut__portrait-wrap mvp-gioithieu__chandung">{chanDung ? <img src={chanDung} alt={nv.ten} draggable={false} /> : null}</div>
      }
      onDismiss={() => onDong(nv.id)}
    />
  );
}
