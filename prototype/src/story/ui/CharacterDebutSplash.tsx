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
          <div className="chara-debut__tag">NHÂN VẬT MỚI</div>

          <h2 className="chara-debut__name">{profile.fullName}</h2>
          <div className="chara-debut__role">{profile.title}</div>
          <div className="chara-debut__meta">{profile.year} • {profile.major}</div>

          <blockquote className="chara-debut__quote">
            “{profile.quote}”
          </blockquote>

          <button
            ref={continueRef}
            type="button"
            className="chara-debut__prompt"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss();
            }}
          >
            <span>Tiếp tục</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
