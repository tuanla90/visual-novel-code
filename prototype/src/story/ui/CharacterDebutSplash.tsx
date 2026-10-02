import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import type { CharacterId } from '../../shared/ids';
import { Portrait } from '../../shared/ui/Portrait';
import { FullArtImage } from '../../shared/ui/FullArt';
import { resolveFullArt, resolveIntroArt } from '../../shared/ui/visuals/art-slots';
import { CHARACTER_PROFILES } from '../../evidence/character-profiles';
import './character-debut.css';

export interface CharacterDebutSplashProps {
  characterId: CharacterId;
  /** Nhận id nhân vật để truyền thẳng hàm ổn định của store (không tạo hàm mới mỗi lần render). */
  onDismiss: (id: CharacterId) => void;
}

/**
 * Ảnh giới thiệu (prompt E, prompts-assets-prototype-full-v0.1.md) đặt nhân vật ở một bên và chừa
 * ~40% khung bên kia cho tên: chữ đi vào phía còn trống. Mặc định nhân vật bên trái → chữ bên phải.
 */
const INTRO_TEXT_SIDE: Partial<Record<CharacterId, 'left' | 'right'>> = {
  'ha-vy': 'left',
  quan: 'left',
};

export function CharacterDebutSplash({ characterId, onDismiss }: CharacterDebutSplashProps) {
  const profile = CHARACTER_PROFILES[characterId];
  const fullArt = resolveFullArt(characterId);
  const intro = resolveIntroArt(characterId);
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  // Không có hồ sơ → không chặn màn chơi.
  useEffect(() => {
    if (!profile) onDismissRef.current(characterId);
  }, [profile, characterId]);

  if (!profile) return null;

  return (
    <CharacterDebutCard
      id={characterId}
      fullName={profile.fullName}
      title={profile.title}
      year={profile.year}
      major={profile.major}
      quote={profile.quote}
      accentColor={profile.accentColor}
      intro={intro.url ? { url: intro.url, slot: intro.slot } : null}
      textSide={INTRO_TEXT_SIDE[characterId] ?? 'right'}
      visual={
        fullArt.url ? (
          <FullArtImage art={fullArt} alt={profile.fullName} className="chara-debut__full-img" />
        ) : (
          <div className="chara-debut__portrait-wrap">
            <Portrait character={profile.id} expression={profile.expressions[0] ?? 'smile'} size="normal" />
          </div>
        )
      }
      onDismiss={() => onDismiss(characterId)}
    />
  );
}

export interface CharacterDebutCardProps {
  /** Mã nhân vật (thuộc tính `data-character`; đổi mã = mở lại màn). */
  id: string;
  fullName: string;
  title: string;
  /** Hai "chip" dưới chức danh; `null` = bỏ chip đó (nhân vật không phải sinh viên). */
  year: string | null;
  major: string | null;
  /** Câu nói đặc trưng; bỏ trống → không vẽ khung trích (MVP: lúc mới gặp chưa có căn cứ để biết câu ấy). */
  quote?: string;
  accentColor: string;
  /** Ảnh giới thiệu 16:9 (prompt E); có thì thay khung chân dung. */
  intro: { url: string; slot?: string } | null;
  textSide: 'left' | 'right';
  /** Khung ảnh khi chưa có ảnh giới thiệu (ảnh toàn thân / chân dung). */
  visual: ReactNode;
  onDismiss: () => void;
}

/** Màn "Nhân vật mới" — phần hiển thị, dùng chung cho prototype (`CharacterDebutSplash`) và bản MVP. */
export function CharacterDebutCard({ id, fullName, title, year, major, quote, accentColor, intro, textSide, visual, onDismiss }: CharacterDebutCardProps) {
  const continueRef = useRef<HTMLButtonElement>(null);
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    continueRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        onDismissRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [id]);

  return (
    <div
      className="chara-debut"
      data-character={id}
      onClick={() => onDismiss()}
      role="dialog"
      aria-modal="true"
      aria-label={`Giới thiệu nhân vật: ${fullName}`}
      style={{ '--debut-accent': accentColor } as CSSProperties}
    >
      <div className="chara-debut__backdrop" />

      <div className={intro ? `chara-debut__card chara-debut__card--intro is-text-${textSide}` : 'chara-debut__card'}>
        {intro ? <img className="chara-debut__intro-img" src={intro.url} alt="" draggable={false} data-art-slot={intro.slot} /> : null}
        {/* Khung ảnh Full Picture / Spotlight (khi chưa có ảnh giới thiệu) */}
        {intro ? null : (
          <div className="chara-debut__visual">
            <div className="chara-debut__spotlight" />
            {visual}
          </div>
        )}

        <div className="chara-debut__content">
          {/* KHỐI 1: Khối thông tin nhân vật nền đậm, vát góc chéo */}
          <div className="chara-debut__panel chara-debut__panel--header">
            <div className="chara-debut__header-top">
              <div className="chara-debut__tag">
                <span className="chara-debut__tag-sparkle" aria-hidden="true">✦</span>
                <span>NHÂN VẬT MỚI</span>
              </div>
            </div>

            <div className="chara-debut__name-row">
              <h2 className="chara-debut__name">{fullName}</h2>
            </div>

            <div className="chara-debut__role">{title}</div>

            <div className="chara-debut__chips">
              {year ? (
                <span className="chara-debut__chip">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <span>{year}</span>
                </span>
              ) : null}
              {major ? (
                <span className="chara-debut__chip">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{major}</span>
                </span>
              ) : null}
            </div>
          </div>

          {/* KHỐI 2: Khung quote vát chéo có icon ngoặc kép */}
          {quote ? (
            <blockquote className="chara-debut__panel chara-debut__panel--quote">
              <span className="chara-debut__quote-icon" aria-hidden="true">“</span>
              <p className="chara-debut__quote-text">“{quote}”</p>
            </blockquote>
          ) : null}

          {/* KHỐI 3: Button Tiếp tục dạng gradient theo từng nhân vật */}
          <button
            ref={continueRef}
            type="button"
            className="chara-debut__prompt"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss();
            }}
          >
            <span className="chara-debut__prompt-chat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </span>
            <span className="chara-debut__prompt-text">Tiếp tục</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
