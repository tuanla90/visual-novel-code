/**
 * TRANG TỔNG KẾT VỤ TRONG SỔ CLB (gói B19, `[SỔ TỔNG KẾT <vụ>]` và màn kết của bộ có `[CHẤM VỤ]`): sổ CLB mở, con dấu đỏ A/B/C
 * đóng xuống góc dưới trang phải, các vạch Minh Anh gạch trong buổi họp ở lề trái trang phải (hoặc không có vạch nào).
 * Ảnh: `cg-so-tong-ket` (sổ mở, 1360×768) và `dau-rank-a|b|c` (dấu đỏ nền trong suốt); thiếu ảnh thì vẽ tạm bằng CSS.
 */
import { useEffect } from 'react';
import type { KetQuaChamVuMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import { CHU_RANK } from '../engine/cham-vu';
import { anhTheoTen } from './anh-mvp';
import { CacVach } from './LeSoVachMvp';
import './b19.css';

export interface SoTongKetMvpProps {
  soVu: number;
  tenVu: string;
  /** `null` = vụ chưa chấm (không dấu). */
  ket: KetQuaChamVuMvp | null;
  /** Có thì hiện nút đi tiếp (màn `[SỔ TỔNG KẾT]`); màn kết không truyền. */
  onTiep?: () => void;
  dienTen?: (t: string) => string;
}

export function SoTongKetMvp({ soVu, tenVu, ket, onTiep, dienTen = (t) => t }: SoTongKetMvpProps) {
  const trang = anhTheoTen('cg-so-tong-ket');
  const dau = ket ? anhTheoTen(`dau-rank-${ket.rank}`) : undefined;
  useEffect(() => {
    if (!ket) return;
    const t = setTimeout(() => soundEngine.playSfx('objection'), 650);
    return () => clearTimeout(t);
  }, [ket]);
  const nhan = ket ? `Con dấu ${CHU_RANK[ket.rank]}${ket.vach > 0 ? `, lề có ${ket.vach} vạch` : ', lề không có vạch nào'}` : 'Chưa chấm';
  return (
    <figure className={`so-tk${trang ? ' co-anh' : ''}`} aria-label={`Sổ CLB, trang tổng kết Vụ ${soVu}: ${nhan}`}>
      <figcaption className="so-tk__chu">
        <span className="so-tk__kicker">Sổ CLB · Tổng kết Vụ {soVu}</span>
        <span className="so-tk__ten">{dienTen(tenVu)}</span>
      </figcaption>
      <div className="so-tk__trang">
        {trang ? <img className="so-tk__anh" src={trang} alt="" draggable={false} /> : <div className="so-tk__giay" aria-hidden="true" />}
        <div className="so-tk__le" aria-hidden="true">
          {ket && ket.vach > 0 ? <CacVach so={ket.vach} className="so-tk__vach" /> : null}
        </div>
        {ket ? (
          <div className={`so-tk__dau so-tk__dau--${ket.rank}`} aria-hidden="true">
            {dau ? <img src={dau} alt="" draggable={false} /> : <span className="so-tk__dau-chu">{CHU_RANK[ket.rank]}</span>}
          </div>
        ) : null}
      </div>
      {onTiep ? (
        <button type="button" className="btn btn--primary so-tk__tiep" onClick={onTiep} autoFocus>
          Tiếp tục
        </button>
      ) : null}
    </figure>
  );
}
