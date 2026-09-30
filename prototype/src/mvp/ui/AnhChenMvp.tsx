/**
 * Ảnh chèn giữa hội thoại (`- [ẢNH <tên tệp>]`): chibi, CG. Ảnh phủ sân khấu, bấm bất kỳ đâu hoặc "Tiếp tục" để đi tiếp.
 * Ảnh tra theo tên tệp trong src/assets/** (`anhTheoTen`); bộ kiểm nội dung đã báo lỗi nếu thiếu tệp.
 */
import { anhTheoTen } from './anh-mvp';

export interface AnhChenMvpProps {
  id: string;
  onTiep: () => void;
}

export function AnhChenMvp({ id, onTiep }: AnhChenMvpProps) {
  const url = anhTheoTen(id);
  return (
    <div className="mvp-anhchen" role="dialog" aria-label="Hình minh họa" onClick={onTiep}>
      {url ? <img className="mvp-anhchen__anh" src={url} alt="" draggable={false} /> : <p className="game__error">Thiếu ảnh "{id}".</p>}
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
