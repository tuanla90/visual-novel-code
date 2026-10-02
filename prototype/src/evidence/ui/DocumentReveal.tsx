/**
 * Màn hình thu được tài liệu / vật chứng chuẩn hóa (DocumentReveal).
 * Chuẩn hóa giao diện nhận vật phẩm theo phong cách Visual Novel trinh thám:
 * - Header: Huy hiệu "✦ BẰNG CHỨNG MỚI ĐÃ THU THẬP ✦", Tiêu đề và Nguồn thu thập.
 * - Thân 2 cột chuẩn mực:
 *   + Cột trái (Pedestal): Bệ trưng bày hiện vật thực địa có spotlight và bóng đổ 3D.
 *   + Cột phải (Dossier): Thẻ trích lục nội dung giấy da và ghi chú giám định.
 * - Footer: Nút bấm "Cất vào hồ sơ" phong cách ruy băng hoàng kim.
 */
import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react';
import { CodeText } from '../../shared/ui/CodeText';
import { IconSearch } from '../../shared/ui/icons';
import { usePressGuard } from '../../shared/ui/use-press-guard';
import { artDataAttributes, resolveDocument } from '../../shared/ui/visuals/art-slots';
import { BookmarkArt, EnvelopeArt, LedgerPaperArt, LetterPaperArt, SealArt } from '../../shared/ui/visuals/DocumentArt';
import { soundEngine } from '../../shared/audio/sound-engine';
import type { DocumentCard } from '../types';

export interface DocumentRevealProps {
  document: DocumentCard | undefined;
  onClose: () => void;
}

function paragraphs(body: DocumentCard['body']): string[] {
  return Array.isArray(body) ? body : [body];
}

/** Tờ giấy hiện vật trong ô ảnh hoặc SVG vẽ tạm */
function Paper({
  doc,
  art,
  className,
  children,
}: {
  doc: DocumentCard;
  art: ReactNode;
  className: string;
  children: ReactNode;
}) {
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
  const rootRef = useRef<HTMLDivElement>(null);
  const guard = usePressGuard(document?.id ?? null);

  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
    soundEngine.playSfx('clue_unlock');

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        soundEngine.playSfx('page');
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [document?.id, onClose]);

  return (
    <div
      className="docview-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget && guard.click(e)) {
          soundEngine.playSfx('page');
          onClose();
        }
      }}
    >
      <div ref={rootRef} className="docview" role="dialog" aria-labelledby={titleId} tabIndex={-1}>
        {/* 1. Header chuẩn hóa đồng bộ popup */}
        <header className="docview__head">
          <div className="docview__head-bar">
            <div className="docview__banner" aria-hidden="true">
              <span className="docview__banner-sparkle">✦</span>
              <span>BẰNG CHỨNG MỚI ĐÃ THU THẬP</span>
              <span className="docview__banner-sparkle">✦</span>
            </div>
            <button
              type="button"
              className="docview__close-btn"
              onClick={(e) => {
                if (guard.click(e)) {
                  soundEngine.playSfx('page');
                  onClose();
                }
              }}
              aria-label="Đóng"
            >
              ×
            </button>
          </div>
          <h2 id={titleId} className="docview__title">
            {document?.title ?? 'Tài liệu chưa có nội dung'}
          </h2>
          {document ? (
            <p className="docview__source">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Nguồn: {document.source}</span>
            </p>
          ) : null}
        </header>

        {/* 2. Thân hiển thị 2 cột chuẩn hóa */}
        {document ? (
          <DocumentStandardBody doc={document} />
        ) : (
          <p className="docview__missing">Thẻ tài liệu này chưa được viết trong nội dung.</p>
        )}

        {/* 3. Footer nút hành động */}
        <div className="docview__actions">
          <button
            type="button"
            className="docview__btn-collect btn btn--primary"
            onKeyDown={guard.holdKey}
            onClick={(e) => {
              if (guard.click(e)) {
                soundEngine.playSfx('page');
                onClose();
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Cất vào hồ sơ</span>
            <span className="docview__btn-key" aria-hidden="true">(Space / Enter)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Thân hiển thị chuẩn hóa cho mọi tài liệu:
 * Cột trái: Bệ trưng bày hiện vật (Pedestal Showcase)
 * Cột phải: Thẻ hồ sơ trích lục (Dossier Record)
 */
function DocumentStandardBody({ doc }: { doc: DocumentCard }) {
  const text = paragraphs(doc.body);
  const slot = resolveDocument(doc.id);

  return (
    <div className={`docview__body docview__body--standard docview__body--${doc.id}`}>
      {/* CỘT 1: KHUNG TRƯNG BÀY HIỆN VẬT (Pedestal) */}
      <div className="docview__pedestal">
        <div className="docview__pedestal-glow" aria-hidden="true" />
        <div className="docview__pedestal-stage">
          {doc.id === 'doc-letter' && (
            <div className="docview__specimen docview__specimen--letter">
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
          )}

          {doc.id === 'doc-bookmark' && (
            <figure className="docview__specimen docview__specimen--bookmark">
              <div
                className="docview__bookmark"
                {...artDataAttributes(slot)}
                style={slot.url ? { backgroundImage: `url("${slot.url}")` } : undefined}
              >
                {slot.url ? null : <BookmarkArt />}
                {text.join(' ').match(/"([^"]+)"/)?.[1] && (
                  <span className="docview__bookmark-print" aria-hidden="true">
                    {text.join(' ').match(/"([^"]+)"/)?.[1]}
                  </span>
                )}
              </div>
              <figcaption className="docview__caption">
                <CodeText text={text.join(' ')} />
              </figcaption>
            </figure>
          )}

          {doc.id === 'doc-handover-log' && (
            <div className="docview__specimen docview__specimen--ledger">
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
          )}
        </div>
        <div className="docview__pedestal-plate" aria-hidden="true">
          <span>HIỆN VẬT THỰC ĐỊA</span>
        </div>
      </div>

      {/* CỘT 2: BẢN TRÍCH LỤC HỒ SƠ (Dossier Record Card) */}
      <div className="docview__dossier">
        <div className="docview__dossier-card">
          <div className="docview__dossier-header">
            <span className="docview__dossier-tag">BẢN TRÍCH LỤC TÀI LIỆU</span>
            <span className="docview__dossier-sub">CLB THÁM TỬ DỮ LIỆU</span>
          </div>
          <div className="docview__dossier-body">
            {text.map((p, i) => (
              <p key={i} className="docview__dossier-paragraph">
                <CodeText text={p} />
              </p>
            ))}
          </div>
        </div>

        {/* Khung phụ chú thám tử */}
        {doc.extra ? (
          <div className="docview__extra-note">
            <IconSearch className="docview__extra-note-icon" />
            <div className="docview__extra-note-content">
              <strong>Ghi chú bổ sung: </strong>
              <CodeText text={doc.extra} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
