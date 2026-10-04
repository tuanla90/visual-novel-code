import { useState } from 'react';
import { CHARACTER_IDS, type CharacterId, type ExpressionOf } from '../../shared/ids';
import { soundEngine } from '../../shared/audio/sound-engine';
import { Portrait } from '../../shared/ui/Portrait';
import { FullArtImage } from '../../shared/ui/FullArt';
import { resolveFullArt, resolveBackground, artUrl } from '../../shared/ui/visuals/art-slots';
import { CHARACTER_PROFILES, type CharacterProfile } from '../character-profiles';
import './chara-profile.css';

export interface CharaProfileViewProps {
  initialCharacterId?: CharacterId;
  unlockedCharacters?: CharacterId[];
}

/** Màu sắc chấm chỉ thị cho từng nhân vật theo nguyên mẫu thiết kế */
const CHARACTER_DOT_COLORS: Record<CharacterId, string> = {
  'minh-anh': '#ef4444',
  'ha-vy': '#10b981',
  quan: '#3b82f6',
  hoai: '#8b5cf6',
  'bac-tu': '#d97706',
  tung: '#38bdf8',
};

/** Tên nhãn hiển thị cho các biểu cảm trên giao diện thẻ hồ sơ */
const EXPR_LABELS: Record<string, string> = {
  neutral: 'Normal',
  smile: 'Smile',
  happy: 'Smile',
  worried: 'Worried',
  thinking: 'Thinking',
  smug: 'Smile',
  stunned: 'Surprised',
  nervous: 'Nervous',
  relieved: 'Relieved',
  downcast: 'Sulked',
  warm: 'Warm',
  serious: 'Serious',
  confident: 'Confident',
  caught: 'Surprised',
};

/**
 * Hồ sơ nhân vật phong cách Visual Novel trinh thám học đường.
 * Tái hiện chính xác thiết kế thẻ hồ sơ Polaroid nghệ thuật xếp chồng, bối cảnh thực tế của game,
 * kích thước tối ưu vừa vặn không cần cuộn trang.
 */
export function CharaProfileView({
  initialCharacterId = 'minh-anh',
  unlockedCharacters = CHARACTER_IDS,
}: CharaProfileViewProps) {
  const [selectedId, setSelectedId] = useState<CharacterId>(initialCharacterId);
  const profile: CharacterProfile = CHARACTER_PROFILES[selectedId] ?? CHARACTER_PROFILES['minh-anh'];
  const fullArt = resolveFullArt(profile.id);
  const bgUrl = resolveBackground('corridor-b').url ?? artUrl('bg-prototype-hallway');
  const [activeExpression, setActiveExpression] = useState<string>(profile.expressions[0] ?? 'neutral');

  // Khi đổi nhân vật, tự động gán lại biểu cảm đầu tiên của nhân vật đó
  const handleSelectCharacter = (id: CharacterId) => {
    soundEngine.playSfx('tab');
    setSelectedId(id);
    const newProfile = CHARACTER_PROFILES[id];
    if (newProfile && newProfile.expressions.length > 0) {
      setActiveExpression(newProfile.expressions[0] ?? 'neutral');
    }
  };

  return (
    <div className="chara-profile" data-character={profile.id}>
      {/* Hoa văn lá trang trí màu nước góc trên và dưới */}
      <div className="chara-profile__foliage chara-profile__foliage--top-right" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M110 10C80 25 55 55 50 85M110 10C95 30 90 55 100 80M110 10C80 15 60 30 45 50"
            stroke="#93c5fd"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          <path
            d="M75 35C65 42 62 55 68 62C75 62 82 52 75 35ZM92 22C85 28 85 40 92 45C98 42 100 30 92 22Z"
            fill="#60a5fa"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      <div className="chara-profile__foliage chara-profile__foliage--bottom-right" aria-hidden="true">
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M130 130C95 105 70 70 65 30M130 130C110 100 105 70 115 40M130 130C95 120 70 100 50 75"
            stroke="#60a5fa"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
          <path
            d="M85 95C72 88 70 72 78 65C87 67 93 80 85 95ZM108 110C98 102 96 88 105 82C113 85 118 98 108 110Z"
            fill="#3b82f6"
            fillOpacity="0.25"
          />
        </svg>
      </div>

      {/* Dải nút chọn nhân vật ở trên cùng */}
      <nav className="chara-profile__nav" aria-label="Danh sách nhân vật">
        {CHARACTER_IDS.map((id) => {
          const char = CHARACTER_PROFILES[id];
          const isUnlocked = unlockedCharacters.includes(id);
          const isSelected = id === selectedId;
          const dotColor = CHARACTER_DOT_COLORS[id] ?? char.accentColor;

          return (
            <button
              key={id}
              type="button"
              className={`chara-profile__tab${isSelected ? ' is-active' : ''}${!isUnlocked ? ' is-locked' : ''}`}
              onClick={() => handleSelectCharacter(id)}
            >
              <span
                className="chara-profile__tab-dot"
                style={{ backgroundColor: dotColor }}
                aria-hidden="true"
              />
              <span className="chara-profile__tab-name">{char.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Thân thẻ hồ sơ 2 cột */}
      <div className="chara-profile__body">
        {/* Cột trái: Khung ảnh Polaroid xếp chồng 2 lớp với băng dính và chữ ký */}
        <div className="chara-profile__showcase">
          <div className="chara-profile__polaroid-stack">
            {/* Khung ảnh phụ phía dưới tạo hiệu ứng 2 ảnh xếp chồng */}
            <div className="chara-profile__polaroid-underlay" aria-hidden="true" />

            {/* Khung ảnh chính hơi nghiêng có viền trắng */}
            <div className="chara-profile__polaroid">
              {/* Miếng băng dính washi tape nghiêng góc trên bên trái */}
              <div className="chara-profile__tape" aria-hidden="true" />

              {/* Vùng chứa ảnh nhân vật đứng trên bối cảnh thực tế */}
              <div
                className="chara-profile__art-wrap"
                style={
                  bgUrl
                    ? {
                        backgroundImage: `url(${bgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
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

              {/* Chữ ký phong cách viết tay mực xanh có lớp viền trắng bao quanh */}
              <div className="chara-profile__signature" aria-hidden="true">
                <span className="chara-profile__signature-text">{profile.name}</span>
                <svg className="chara-profile__signature-leaf" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                    stroke="#1e40af"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="16" y1="8" x2="2" y2="22" stroke="#1e40af" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dải nút chọn biểu cảm */}
          <div className="chara-profile__expressions">
            <div className="chara-profile__expr-label">
              <svg className="chara-profile__expr-sparkle" viewBox="0 0 24 24" fill="none" width="13" height="13">
                <path
                  d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                  fill="#1e40af"
                  opacity="0.9"
                />
              </svg>
              <span>BIỂU CẢM:</span>
            </div>

            <div className="chara-profile__expr-list">
              {profile.expressions.map((expr) => {
                const isActive = expr === activeExpression;
                const label = EXPR_LABELS[expr] ?? expr;

                return (
                  <button
                    key={expr}
                    type="button"
                    className={`chara-profile__expr-btn${isActive ? ' is-active' : ''}`}
                    onClick={() => {
                      soundEngine.playSfx('click');
                      setActiveExpression(expr);
                    }}
                    aria-label={`Biểu cảm: ${expr}`}
                    title={`Biểu cảm: ${label}`}
                  >
                    {isActive && (
                      <span className="chara-profile__expr-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                    <span className="chara-profile__expr-preview">
                      <Portrait
                        character={profile.id}
                        expression={expr as ExpressionOf<typeof profile.id>}
                        size="small"
                      />
                    </span>
                    <span className="chara-profile__expr-name">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin lý lịch, trích dẫn, tiểu sử và ghi chú trinh thám */}
        <div className="chara-profile__info">
          {/* Hàng tên nhân vật phong cách chữ nghiêng nghệ thuật & huy hiệu chức danh */}
          <div className="chara-profile__name-row">
            <h3 className="chara-profile__name">
              <span>{profile.fullName}</span>
              <svg className="chara-profile__name-leaf" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                  stroke="#1e40af"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="16" y1="8" x2="2" y2="22" stroke="#1e40af" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </h3>

            <div className="chara-profile__role-tag">
              <svg className="chara-profile__role-star" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  stroke="#1e40af"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span>{profile.title}</span>
            </div>
          </div>

          {/* Khung thông số cá nhân kẻ viền đứt nét - Đồng nhất màu xanh đậm */}
          <dl className="chara-profile__specs">
            <div className="chara-profile__spec-item">
              <dt>
                <svg className="chara-profile__spec-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                TUỔI:
              </dt>
              <dd>{profile.age}</dd>
            </div>

            <div className="chara-profile__spec-item">
              <dt>
                <svg className="chara-profile__spec-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" />
                </svg>
                KHÓA:
              </dt>
              <dd>{profile.year}</dd>
            </div>

            <div className="chara-profile__spec-item">
              <dt>
                <svg className="chara-profile__spec-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <path d="M3 10h18M3 21h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                CHUYÊN NGÀNH:
              </dt>
              <dd>{profile.major}</dd>
            </div>

            <div className="chara-profile__spec-item chara-profile__spec-item--full">
              <dt>
                <svg className="chara-profile__spec-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                VAI TRÒ VỤ ÁN:
              </dt>
              <dd>{profile.role}</dd>
            </div>
          </dl>

          {/* Khung câu nói đặc trưng màu vàng nhạt có dải cam bên trái */}
          <blockquote className="chara-profile__quote">
            <p className="chara-profile__quote-text">“{profile.quote}”</p>
            <svg className="chara-profile__quote-leaf" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                stroke="#ca8a04"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="16" y1="8" x2="2" y2="22" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </blockquote>

          {/* Tiểu sử & Tính cách */}
          <section className="chara-profile__section">
            <div className="chara-profile__pill-header">TIỂU SỬ & TÍNH CÁCH</div>
            <div className="chara-profile__section-content">
              {profile.bio.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          {/* Ghi chú điều tra */}
          <section className="chara-profile__section">
            <div className="chara-profile__pill-header">GHI CHÚ ĐIỀU TRA</div>
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
