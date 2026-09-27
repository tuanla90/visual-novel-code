import { useState } from 'react';
import { CHARACTER_IDS, type CharacterId, type ExpressionOf } from '../../shared/ids';
import { Portrait } from '../../shared/ui/Portrait';
import { FullArtImage } from '../../shared/ui/FullArt';
import { resolveFullArt } from '../../shared/ui/visuals/art-slots';
import { CHARACTER_PROFILES, type CharacterProfile } from '../character-profiles';
import './chara-profile.css';

export interface CharaProfileViewProps {
  initialCharacterId?: CharacterId;
  unlockedCharacters?: CharacterId[];
}

export function CharaProfileView({
  initialCharacterId = 'minh-anh',
  unlockedCharacters = CHARACTER_IDS,
}: CharaProfileViewProps) {
  const [selectedId, setSelectedId] = useState<CharacterId>(initialCharacterId);
  const profile: CharacterProfile = CHARACTER_PROFILES[selectedId] ?? CHARACTER_PROFILES['minh-anh'];
  const fullArt = resolveFullArt(profile.id);
  const [activeExpression, setActiveExpression] = useState<string>(profile.expressions[0] ?? 'smile');

  // Khi đổi nhân vật, tự động gán lại biểu cảm đầu tiên của nhân vật đó
  const handleSelectCharacter = (id: CharacterId) => {
    setSelectedId(id);
    const newProfile = CHARACTER_PROFILES[id];
    if (newProfile && newProfile.expressions.length > 0) {
      setActiveExpression(newProfile.expressions[0] ?? 'smile');
    }
  };

  return (
    <div className="chara-profile" data-character={profile.id}>
      {/* Thanh Header phong cách VN */}
      <header className="chara-profile__header">
        <div className="chara-profile__title-badge">CHARA PROFILE</div>
        <nav className="chara-profile__nav" aria-label="Danh sách nhân vật">
          {CHARACTER_IDS.map((id) => {
            const char = CHARACTER_PROFILES[id];
            const isUnlocked = unlockedCharacters.includes(id);
            const isSelected = id === selectedId;
            return (
              <button
                key={id}
                type="button"
                className={`chara-profile__tab${isSelected ? ' is-active' : ''}${!isUnlocked ? ' is-locked' : ''}`}
                onClick={() => handleSelectCharacter(id)}
                style={{ '--char-accent': char.accentColor } as React.CSSProperties}
              >
                <span className="chara-profile__tab-dot" />
                {char.name}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Thân thẻ hồ sơ 2 cột chuẩn mẫu Naomi Sato */}
      <div className="chara-profile__body">
        {/* Cột trái: Ảnh nhân vật to toàn thân + bộ nút chuyển biểu cảm */}
        <div className="chara-profile__showcase">
          <div className="chara-profile__art-wrap">
            {fullArt.url ? (
              <div className="chara-profile__full-art">
                <FullArtImage art={fullArt} alt={`${profile.name} toàn thân`} className="chara-profile__full-img" />
              </div>
            ) : (
              <div className="chara-profile__portrait-large">
                <Portrait
                  character={profile.id}
                  expression={activeExpression as ExpressionOf<typeof profile.id>}
                  size="normal"
                />
              </div>
            )}
          </div>

          {/* Dải nút chọn biểu cảm (Expression Hexagonal / Pill Buttons) */}
          <div className="chara-profile__expressions">
            <span className="chara-profile__expr-label">Biểu cảm:</span>
            <div className="chara-profile__expr-list">
              {profile.expressions.map((expr) => {
                const isActive = expr === activeExpression;
                return (
                  <button
                    key={expr}
                    type="button"
                    className={`chara-profile__expr-btn${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveExpression(expr)}
                    aria-label={`Biểu cảm: ${expr}`}
                    title={`Biểu cảm: ${expr}`}
                  >
                    <span className="chara-profile__expr-preview">
                      <Portrait
                        character={profile.id}
                        expression={expr as ExpressionOf<typeof profile.id>}
                        size="small"
                      />
                    </span>
                    <span className="chara-profile__expr-name">{expr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin lý lịch, tiểu sử và ghi chú trinh thám */}
        <div className="chara-profile__info">
          <div className="chara-profile__name-block">
            <h3 className="chara-profile__name" style={{ color: profile.accentColor }}>
              {profile.fullName}
            </h3>
            <span className="chara-profile__role-tag" style={{ borderColor: profile.accentColor }}>
              {profile.title}
            </span>
          </div>

          {/* Dòng tóm tắt thông số cá nhân */}
          <dl className="chara-profile__specs">
            <div className="chara-profile__spec-item">
              <dt>Tuổi:</dt>
              <dd>{profile.age}</dd>
            </div>
            <div className="chara-profile__spec-item">
              <dt>Khóa:</dt>
              <dd>{profile.year}</dd>
            </div>
            <div className="chara-profile__spec-item">
              <dt>Chuyên ngành:</dt>
              <dd>{profile.major}</dd>
            </div>
            <div className="chara-profile__spec-item chara-profile__spec-item--full">
              <dt>Vai trò vụ án:</dt>
              <dd>{profile.role}</dd>
            </div>
          </dl>

          {/* Câu nói đặc trưng */}
          <blockquote className="chara-profile__quote">
            “{profile.quote}”
          </blockquote>

          {/* Tiểu sử & Tính cách */}
          <section className="chara-profile__section">
            <h4 className="chara-profile__section-title">Tiểu sử & Tính cách</h4>
            <div className="chara-profile__section-content">
              {profile.bio.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          {/* Ghi chú điều tra */}
          <section className="chara-profile__section chara-profile__section--notes">
            <h4 className="chara-profile__section-title">Ghi chú điều tra</h4>
            <ul className="chara-profile__notes-list">
              {profile.detectiveNote.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
