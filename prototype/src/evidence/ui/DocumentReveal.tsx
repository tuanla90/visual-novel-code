/**
 * STUB — gói `hinh-giao-dien` (gói 7) thay bằng màn hiện tài liệu có hình (lá thư, bookmark, sổ).
 * Props đã chốt. Chỉ hiện phần nội dung của tài liệu; "Câu hỏi còn mở"/"Lưu ý" ở Hồ sơ (kịch bản).
 */
import type { DocumentCard } from '../types';

export interface DocumentRevealProps {
  document: DocumentCard | undefined;
  onClose: () => void;
}

export function DocumentReveal({ document, onClose }: DocumentRevealProps) {
  return (
    <div className="stub stub--document" role="dialog" aria-labelledby="doc-title">
      <p className="stub__tag">Màn tài liệu (stub — gói hinh-giao-dien)</p>
      <h2 id="doc-title" className="stub__title">
        {document?.title ?? 'Tài liệu chưa có nội dung'}
      </h2>
      {document ? (
        Array.isArray(document.body) ? (
          <blockquote className="card__quote">
            {document.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </blockquote>
        ) : (
          <p>{document.body}</p>
        )
      ) : (
        <p>Thẻ tài liệu này chưa được viết trong nội dung.</p>
      )}
      {document?.extra ? <p className="card__extra">{document.extra}</p> : null}
      <button type="button" className="btn btn--primary" onClick={onClose} autoFocus>
        Tiếp tục (stub)
      </button>
    </div>
  );
}
