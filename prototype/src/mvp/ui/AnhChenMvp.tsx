/**
 * Ảnh chèn giữa hội thoại (`- [ẢNH <tên tệp>]`): chibi, CG. Ảnh phủ sân khấu, bấm bất kỳ đâu hoặc "Tiếp tục" để đi tiếp.
 * Ảnh tra theo tên tệp trong src/assets/** (`anhTheoTen`); bộ kiểm nội dung đã báo lỗi nếu thiếu tệp.
 */
import { useEffect } from 'react';
import { soundEngine } from '../../shared/audio/sound-engine';
import { anhTheoTen } from './anh-mvp';

export interface ChuDeLen {
  noiDung: string;
  kieu: 'stamp-do' | 'stamp-vang' | 'stamp-jojo' | 'stamp-phu';
}

export interface CauHinhMeme {
  chuThich: string;
  chuDeLen?: ChuDeLen[];
}

const CAU_HINH_MEME: Record<string, CauHinhMeme> = {
  'cg-minh-anh-dan-tay': { chuThich: 'Chị ngồi xuống nói chuyện này một chút…' },
  'cg-bang-chung-day': { chuThich: 'Tới lượt tớ đưa bằng chứng!' },
  'cg-hop-doi-dau': {
    chuThich: 'Ồ? Thay vì nhận thua, cậu lại dám tiến lại gần tôi sao?',
    chuDeLen: [
      { noiDung: 'ゴゴゴ MENACING…', kieu: 'stamp-jojo' },
      { noiDung: 'Không bước lại gần sao bẻ được câu lệnh của anh!', kieu: 'stamp-phu' },
    ],
  },
  'cg-quan-bi-bac': {
    chuThich: 'KHÔNG THỂ NÀO! KẾT LUẬN CỦA TÔI… BAY MÀU RỒI?!',
    chuDeLen: [
      { noiDung: 'BÁC BỎ HOÀN TOÀN!', kieu: 'stamp-do' },
      { noiDung: 'IT SHOULD HAVE BEEN ME!', kieu: 'stamp-vang' },
      { noiDung: '595 DÒNG → 2 DÒNG!', kieu: 'stamp-phu' },
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

  return (
    <div className={`mvp-anhchen${id.startsWith('chibi-') ? ' mvp-anhchen--chibi' : ''}`} role="dialog" aria-label={chuThich ?? 'Hình minh họa'} onClick={onTiep}>
      <div className="mvp-anhchen__khung">
        {url ? <img className="mvp-anhchen__anh" src={url} alt="" draggable={false} /> : <p className="game__error">Thiếu ảnh "{id}".</p>}
        {cauHinh?.chuDeLen?.map((item, idx) => (
          <span key={idx} className={`mvp-anhchen__de-len mvp-anhchen__de-len--${item.kieu}`} aria-hidden="true">
            {item.noiDung}
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
