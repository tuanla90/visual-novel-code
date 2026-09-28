import { useEffect, useRef } from 'react';
import type { CharacterId } from '../../shared/ids';
import { Portrait } from '../../shared/ui/Portrait';
import { FullArtImage } from '../../shared/ui/FullArt';
import { resolveFullArt, resolveIntroArt } from '../../shared/ui/visuals/art-slots';
import { CHARACTER_PROFILES } from '../../evidence/character-profiles';
import './character-debut.css';

export interface CharacterDebutSplashProps {
  characterId: CharacterId;
  onDismiss: () => void;
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
  const rootRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    continueRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [onDismiss]);

  if (!profile) return null;

  return (
    <div
      ref={rootRef}
      className="chara-debut"
      data-character={characterId}
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label={`Giới thiệu nhân vật: ${profile.fullName}`}
      style={{ '--debut-accent': profile.accentColor } as React.CSSProperties}
    >
      <div className="chara-debut__backdrop" />

      <div
        className={
          intro.url
            ? `chara-debut__card chara-debut__card--intro is-text-${INTRO_TEXT_SIDE[characterId] ?? 'right'}`
            : 'chara-debut__card'
        }
      >
        {intro.url ? <img className="chara-debut__intro-img" src={intro.url} alt="" draggable={false} data-art-slot={intro.slot} /> : null}
        {/* Khung ảnh Full Picture / Spotlight (khi chưa có ảnh giới thiệu) */}
        {intro.url ? null : (
        <div className="chara-debut__visual">
          <div className="chara-debut__spotlight" />
          {fullArt.url ? (
            <FullArtImage art={fullArt} alt={profile.fullName} className="chara-debut__full-img" />
          ) : (
            <div className="chara-debut__portrait-wrap">
              <Portrait character={profile.id} expression={profile.expressions[0] ?? 'smile'} size="normal" />
            </div>
          )}
        </div>
        )}

        {/* Khung chữ giới thiệu nhân vật phong cách Visual Novel */}
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
              <h2 className="chara-debut__name">{profile.fullName}</h2>
            </div>

            <div className="chara-debut__role">{profile.title}</div>

            <div className="chara-debut__chips">
              <span className="chara-debut__chip">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>{profile.year}</span>
              </span>
              <span className="chara-debut__chip">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{profile.major}</span>
              </span>
            </div>
          </div>

          {/* KHỐI 2: Khung quote vát chéo có icon ngoặc kép */}
          <blockquote className="chara-debut__panel chara-debut__panel--quote">
            <span className="chara-debut__quote-icon" aria-hidden="true">“</span>
            <p className="chara-debut__quote-text">“{profile.quote}”</p>
          </blockquote>

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
