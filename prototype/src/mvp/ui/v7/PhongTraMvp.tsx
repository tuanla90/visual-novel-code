/**
 * HAI MẶT CỦA PHÒNG (user chốt 30/09): bảng điều tra là mặt chính của phòng CLB; mở laptop thì sang màn tra v7, thẻ trên
 * bảng thành giấy nhớ dán quanh màn hình; tra đúng thì quay về bảng, phiếu mới được ghim và sợi chỉ tự vẽ từ các thẻ đã dùng.
 *
 *   'bang' → (mở laptop) → 'may' → (tra đúng, bấm ghim) → 'ghim' → (tiếp tục) → onXong
 *
 * Phòng máy không có bảng trên tường nên vào thẳng màn máy; phiếu vẫn ghim lên bảng sau khi tra đúng.
 * Buổi họp (`fix-query`) là màn chiếu: không có bảng, xong là đi tiếp.
 */
import { useState } from 'react';
import type { BoDuLieuMvp, KichBanMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import type { TrangThaiMvp } from '../../engine/trang-thai';
import { BangGhimMvp } from './BangGhimMvp';
import { ManTraV7, type CanhTra } from './ManTraV7';

export interface PhongTraMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  duLieu: BoDuLieuMvp | null;
  the: TheThuThachMvp;
  mode: 'challenge' | 'fix-query';
  giayNho: GiaTriHoSo[];
  dienTen: (t: string) => string;
  /** Tên cảnh đang đứng (vd "Phòng CLB", "Trong phòng máy"). */
  noi?: string;
  onDoiCho: (the: string, x: number, y: number) => void;
  onXong: (dung: string[]) => void;
}

type Pha = { ten: 'bang' } | { ten: 'may' } | { ten: 'ghim'; dung: string[] };

export function PhongTraMvp({ kb, s, duLieu, the, mode, giayNho, dienTen, noi, onDoiCho, onXong }: PhongTraMvpProps) {
  const laPhongMay = noi !== undefined && /phòng máy/i.test(noi);
  const canh: CanhTra = mode === 'fix-query' ? 'man-chieu' : laPhongMay ? 'phong-may' : 'phong-clb';
  const [pha, setPha] = useState<Pha>(() => (mode === 'fix-query' || laPhongMay ? { ten: 'may' } : { ten: 'bang' }));
  const [xong, setXong] = useState(false);

  if (pha.ten === 'bang') {
    return (
      <div className="phong-tra" data-pha="bang">
        <BangGhimMvp kb={kb} s={s} dienTen={dienTen} onDoiCho={onDoiCho}>
          <button
            type="button"
            className="bang__mo-may"
            onClick={() => {
              soundEngine.playSfx('select');
              setPha({ ten: 'may' });
            }}
            autoFocus
          >
            <span aria-hidden="true">💻</span> Mở laptop
          </button>
        </BangGhimMvp>
      </div>
    );
  }
  if (pha.ten === 'ghim' && the.vatChung) {
    return (
      <div className="phong-tra" data-pha="ghim">
        <BangGhimMvp kb={kb} s={s} dienTen={dienTen} them={{ id: the.vatChung.id, dung: pha.dung }} moi={the.vatChung.id} onDoiCho={onDoiCho}>
          <button
            type="button"
            className="bang__mo-may bang__mo-may--tiep"
            disabled={xong}
            onClick={() => {
              if (xong) return;
              setXong(true);
              onXong(pha.dung);
            }}
            autoFocus
          >
            Tiếp tục
          </button>
        </BangGhimMvp>
      </div>
    );
  }
  return (
    <div className="phong-tra" data-pha="may">
      <ManTraV7
        kb={kb}
        duLieu={duLieu}
        the={the}
        mode={mode}
        canh={canh}
        giayNho={giayNho}
        dienTen={dienTen}
        onXong={(dung) => {
          if (the.vatChung && mode !== 'fix-query') {
            soundEngine.playSfx('clue_unlock');
            setPha({ ten: 'ghim', dung });
          } else onXong(dung);
        }}
      />
    </div>
  );
}
