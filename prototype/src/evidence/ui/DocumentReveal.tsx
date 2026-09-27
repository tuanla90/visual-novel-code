/**
 * Màn hiện tài liệu (lá thư, bookmark, sổ bàn giao) khi kịch bản đưa tài liệu vào Hồ sơ.
 * Hình (QĐ-026, QĐ-060): nền giấy lấy từ ô ảnh `doc-letter` / `doc-bookmark` / `doc-handover-log`
 * nếu có, không thì hình vẽ tạm; CHỮ luôn do giao diện chồng lên (không nướng vào ảnh).
 * Props giữ nguyên. Chỉ hiện phần nội dung của tài liệu; "Câu hỏi còn mở"/"Lưu ý" ở Hồ sơ.
 */
import { useId, type CSSProperties, type ReactNode } from 'react';
import { CodeText } from '../../shared/ui/CodeText';
import { usePressGuard } from '../../shared/ui/use-press-guard';
import { artDataAttributes, resolveDocument } from '../../shared/ui/visuals/art-slots';
import { BookmarkArt, EnvelopeArt, LedgerPaperArt, LetterPaperArt, SealArt } from '../../shared/ui/visuals/DocumentArt';
import type { DocumentCard } from '../types';

export interface DocumentRevealProps {
  document: DocumentCard | undefined;
  onClose: () => void;
}

function paragraphs(body: DocumentCard['body']): string[] {
  return Array.isArray(body) ? body : [body];
}

/** Tờ giấy: ảnh thật trong ô (nền phủ kín) hoặc hình vẽ tạm; chữ nằm trên. */
function Paper({ doc, art, className, children }: { doc: DocumentCard; art: ReactNode; className: string; children: ReactNode }) {
  const slot = resolveDocument(doc.id);
  const style: CSSProperties | undefined = slot.url ? { backgroundImage: `url("${slot.url}")` } : undefined;
  return (
    <div className={`docview__paper ${className}`} style={style} {...artDataAttributes(slot)}>
      {slot.url ? null : art}
      <div className="docview__paper-text">{children}</div>
    </div>
  );
}

export function DocumentReveal({ document, onClose }: DocumentRevealProps) {
  const titleId = useId();
  const guardedClose = usePressGuard(onClose);
  return (
    <div className="docview" role="dialog" aria-labelledby={titleId}>
      <header className="docview__head">
        <h2 id={titleId} className="docview__title">
          {document?.title ?? 'Tài liệu chưa có nội dung'}
        </h2>
        {document ? <p className="docview__source">Nguồn: {document.source}</p> : null}
      </header>
      {document ? <DocumentBody doc={document} /> : <p className="docview__missing">Thẻ tài liệu này chưa được viết trong nội dung.</p>}
      <div className="docview__actions">
        <button type="button" className="btn btn--primary" onClick={guardedClose} autoFocus>
          Cất vào hồ sơ
        </button>
      </div>
    </div>
  );
}

function DocumentBody({ doc }: { doc: DocumentCard }) {
  const text = paragraphs(doc.body);
  switch (doc.id) {
    case 'doc-letter':
      return (
        <div className="docview__body docview__body--letter">
          <Paper doc={doc} art={<LetterPaperArt />} className="docview__paper--letter">
            {text.map((p, i) => (
              <p key={i}>
                <CodeText text={p} />
              </p>
            ))}
          </Paper>
          {doc.extra ? (
            <figure className="docview__envelope">
              <EnvelopeArt />
              <figcaption>
                <CodeText text={doc.extra} />
              </figcaption>
            </figure>
          ) : null}
        </div>
      );
    case 'doc-bookmark': {
      const description = text.join(' ');
      // Chữ in trên bookmark lấy từ chính nội dung (đoạn trong ngoặc kép), chồng lên hình.
      const printed = /"([^"]+)"/.exec(description)?.[1];
      const slot = resolveDocument(doc.id);
      return (
        <figure className="docview__body docview__body--bookmark">
          <div className="docview__bookmark" {...artDataAttributes(slot)} style={slot.url ? { backgroundImage: `url("${slot.url}")` } : undefined}>
            {slot.url ? null : <BookmarkArt />}
            {printed ? (
              <span className="docview__bookmark-print" aria-hidden="true">
                {printed}
              </span>
            ) : null}
          </div>
          <figcaption className="docview__caption">
            <CodeText text={description} />
          </figcaption>
        </figure>
      );
    }
    case 'doc-handover-log':
      return (
        <div className="docview__body docview__body--ledger">
          <Paper doc={doc} art={<LedgerPaperArt />} className="docview__paper--ledger">
            {text.map((p, i) => (
              <p key={i}>
                <CodeText text={p} />
              </p>
            ))}
            <SealArt />
          </Paper>
          {doc.extra ? (
            <p className="docview__caption">
              <CodeText text={doc.extra} />
            </p>
          ) : null}
        </div>
      );
  }
}
