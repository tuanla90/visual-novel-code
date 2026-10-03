/**
 * Ảnh chèn giữa hội thoại (`- [ẢNH <tên tệp>]`): chibi, CG. Ảnh phủ sân khấu, bấm bất kỳ đâu hoặc "Tiếp tục" để đi tiếp.
 * Ảnh tra theo tên tệp trong src/assets/** (`anhTheoTen`); bộ kiểm nội dung đã báo lỗi nếu thiếu tệp.
 */
import { anhTheoTen } from './anh-mvp';

const CHU_THICH_MEME: Record<string, string> = {
  'cg-minh-anh-dan-tay': 'Chị ngồi xuống nói chuyện này một chút…',
  'cg-bang-chung-day': 'Tới lượt tớ đưa bằng chứng!',
  'cg-quan-bi-bac': 'Kết luận bay màu!',
  'cg-nghi-di-tung': 'THINK, TÙNG, THINK!',
};

export interface AnhChenMvpProps {
  id: string;
  onTiep: () => void;
}

export function AnhChenMvp({ id, onTiep }: AnhChenMvpProps) {
  const url = anhTheoTen(id);
  const chuThich = CHU_THICH_MEME[id];
  return (
    <div className="mvp-anhchen" role="dialog" aria-label={chuThich ?? 'Hình minh họa'} onClick={onTiep}>
      {url ? <img className="mvp-anhchen__anh" src={url} alt="" draggable={false} /> : <p className="game__error">Thiếu ảnh "{id}".</p>}
      {chuThich ? <p className="mvp-anhchen__meme" aria-hidden="true">{chuThich}</p> : null}
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
  );
}
