/**
 * Ảnh chèn giữa hội thoại (`- [ẢNH <tên tệp>]`): chibi, CG. Ảnh phủ sân khấu, bấm bất kỳ đâu hoặc "Tiếp tục" để đi tiếp.
 * Ảnh tra theo tên tệp trong src/assets/** (`anhTheoTen`); bộ kiểm nội dung đã báo lỗi nếu thiếu tệp.
 */
import { useEffect } from 'react';
import { soundEngine } from '../../shared/audio/sound-engine';
import { anhTheoTen } from './anh-mvp';

export interface ChuDeLen {
  noiDung: string;
  kieu: 'stamp-do' | 'stamp-vang' | 'stamp-jojo' | 'stamp-phu' | 'bubble-quan' | 'bubble-nvc' | 'bubble-quan-panic';
  nguoiNoi?: string;
}

export interface CauHinhMeme {
  chuThich?: string;
  moTaAria?: string;
  chuDeLen?: ChuDeLen[];
}

const CAU_HINH_MEME: Record<string, CauHinhMeme> = {
  'cg-minh-anh-dan-tay': { chuThich: 'Chị ngồi xuống nói chuyện này một chút…' },
  'cg-bang-chung-day': { chuThich: 'Tới lượt tớ đưa bằng chứng!' },
  'cg-hop-doi-dau': {
    moTaAria: 'Quân và nhân vật chính đối đầu trước buổi họp',
    chuDeLen: [
      {
        noiDung: 'Ồ? Thay vì nhận thua, cậu lại dám bước lên đối chất sao?',
        kieu: 'bubble-quan',
        nguoiNoi: 'Quân',
      },
      {
        noiDung: 'Không bước lên, sao bẻ được câu truy vấn của anh!',
        kieu: 'bubble-nvc',
        nguoiNoi: 'Bạn',
      },
    ],
  },
  'cg-quan-bi-bac': {
    moTaAria: 'Quân bị bác bỏ hoàn toàn kết luận',
    chuDeLen: [
      {
        noiDung: 'Không thể nào! Kết luận của tôi… bay màu rồi?!',
        kieu: 'bubble-quan-panic',
        nguoiNoi: 'Quân',
      },
      {
        noiDung: 'BÁC BỎ HOÀN TOÀN!',
        kieu: 'stamp-do',
      },
    ],
  },
  'cg-nghi-di-tung-ha-vy': { chuThich: 'THINK, TÙNG, THINK!' },
  'cg-reo-ho-manh-moi': { chuThich: 'MANH MỐI CÓ RỒI!' },
};

export interface AnhChenMvpProps {
  id: string;
  onTiep: () => void;
  onBack?: () => void;
}

export function AnhChenMvp({ id, onTiep, onBack }: AnhChenMvpProps) {
  const url = anhTheoTen(id);
  const cauHinh = CAU_HINH_MEME[id];
  const chuThich = cauHinh?.chuThich;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowLeft' || e.key === 'Backspace') && onBack) {
        e.preventDefault();
        soundEngine.playSfx('click');
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const moTaAria = cauHinh?.moTaAria ?? chuThich ?? 'Hình minh họa';

  return (
    <div className={`mvp-anhchen${id.startsWith('chibi-') ? ' mvp-anhchen--chibi' : ''}`} role="dialog" aria-label={moTaAria} onClick={onTiep}>
      <div className="mvp-anhchen__khung">
        {url ? <img className="mvp-anhchen__anh" src={url} alt="" draggable={false} /> : <p className="game__error">Thiếu ảnh "{id}".</p>}
        {cauHinh?.chuDeLen?.map((item, idx) => (
          <span key={idx} className={`mvp-anhchen__de-len mvp-anhchen__de-len--${item.kieu}`} aria-hidden="true">
            {item.nguoiNoi ? <strong className="mvp-anhchen__nguoi-noi">{item.nguoiNoi}</strong> : null}
            <span className="mvp-anhchen__noi-dung">{item.noiDung}</span>
          </span>
        ))}
      </div>
      {chuThich ? <p className="mvp-anhchen__meme" aria-hidden="true">{chuThich}</p> : null}
      <div className="mvp-anhchen__thanh-nut">
        {onBack ? (
          <button
            type="button"
            className="btn mvp-anhchen__nut-lui"
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playSfx('click');
              onBack();
            }}
            title="Lùi lại trước ảnh (Phím tắt: ←)"
          >
            Lùi
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn--primary mvp-anhchen__nut"
          onClick={(e) => {
            e.stopPropagation();
            onTiep();
          }}
          autoFocus
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
