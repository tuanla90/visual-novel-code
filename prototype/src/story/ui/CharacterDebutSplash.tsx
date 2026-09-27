import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { CharacterId } from '../../shared/ids';
import { resolvePortrait } from '../../shared/ui/visuals/art-slots';
import { PortraitArt } from '../../shared/ui/visuals/PortraitArt';
import { usePortraitCutout } from '../../shared/ui/visuals/portrait-cutout';
import { CHARACTER_PROFILES } from '../../evidence/character-profiles';
import './character-debut.css';

export interface CharacterDebutSplashProps {
  characterId: CharacterId;
  /** Nhận id nhân vật để truyền thẳng hàm ổn định của store (không tạo hàm mới mỗi lần render). */
  onDismiss: (id: CharacterId) => void;
}

/**
 * Ảnh giới thiệu: dùng CÙNG ô ảnh + tách nền như chân dung trên sân khấu (luôn có trong bản build).
 * Không hiện hình vẽ tạm trong lúc tách nền rồi đổi sang ảnh (hai hình khác khổ → nhảy): chờ ảnh sẵn
 * sàng rồi mới mờ dần vào. Chỉ khi nhân vật chưa có ảnh thật mới dùng hình vẽ tạm.
 */
function DebutArt({ characterId, expression }: { characterId: CharacterId; expression: string }) {
  const art = resolvePortrait(characterId, expression);
  const cutout = usePortraitCutout(art.url);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  if (!art.url) {
    return (
      <div className="chara-debut__art chara-debut__art--placeholder">
        <PortraitArt character={characterId} expression={expression} />
      </div>
    );
  }
  const src = cutout?.src;
  return (
    <div className="chara-debut__art" data-art-cutout={cutout?.status}>
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          className={`chara-debut__img${loadedSrc === src ? ' is-loaded' : ''}`}
          onLoad={() => setLoadedSrc(src)}
        />
      ) : null}
    </div>
  );
}

export function CharacterDebutSplash({ characterId, onDismiss }: CharacterDebutSplashProps) {
  const profile = CHARACTER_PROFILES[characterId];
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
        onDismissRef.current(characterId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [characterId]);

  // Không có hồ sơ → không chặn màn chơi.
  useEffect(() => {
    if (!profile) onDismissRef.current(characterId);
  }, [profile, characterId]);

  if (!profile) return null;

  return (
    <div
      className="chara-debut"
      onClick={() => onDismiss(characterId)}
      role="dialog"
      aria-modal="true"
      aria-label={`Giới thiệu nhân vật: ${profile.fullName}`}
      style={{ '--debut-accent': profile.accentColor } as CSSProperties}
    >
      <div className="chara-debut__backdrop" />

      <div className="chara-debut__card">
        <div className="chara-debut__visual">
          <div className="chara-debut__spotlight" />
          <DebutArt characterId={profile.id} expression={profile.expressions[0] ?? 'neutral'} />
        </div>

        <div className="chara-debut__content">
          <div className="chara-debut__tag">NHÂN VẬT MỚI</div>

          <h2 className="chara-debut__name">{profile.fullName}</h2>
          <div className="chara-debut__role">{profile.title}</div>
          <div className="chara-debut__meta">
            {profile.year} • {profile.major}
          </div>

          <blockquote className="chara-debut__quote">“{profile.quote}”</blockquote>

          <button
            ref={continueRef}
            type="button"
            className="chara-debut__prompt"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss(characterId);
            }}
          >
            <span>Tiếp tục</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
