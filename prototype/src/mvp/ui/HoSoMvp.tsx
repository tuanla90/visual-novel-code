/**
 * Hồ sơ + Sổ cá nhân bản MVP (gói giao-dien-mvp) — mang phong cách "hòm đồ" của prototype (`EvidenceNotebook`):
 * DÙNG LẠI lớp CSS của `evidence/ui/inventory-grid.css` (khung `.inventory-frame`, thanh tab `.inventory-nav`, cột
 * chân dung `.inv-chara-*`, lưới ô `.inv-slots-grid`, cột chi tiết `.inv-details-*`, thẻ nhật ký `.notebook__journal-*`)
 * nhưng là component riêng: `EvidenceNotebook` gắn chặt `EvidenceId`/`GameContent`/nhân vật của prototype.
 *
 * Hai tab trong cùng một khung (như prototype có tab Hồ sơ nhân vật / Hòm đồ / Nhật ký):
 *   - "Hồ sơ": chân dung người chơi + số đếm; lưới ô giấy nhớ / tài liệu / bằng chứng (lọc theo nhóm, QĐ-086/087);
 *     bấm ô → thẻ chi tiết (`TheHoSo`).
 *   - "Sổ cá nhân": các trang đã chép (đoạn code đúng + chú thích), mỗi trang một thẻ nhật ký.
 * Đóng: nút Đóng, Esc, bấm ra ngoài khung.
 */
import '../../evidence/ui/inventory-grid.css';
import { useEffect, useState } from 'react';
import type { KichBanMvp, TheHoSoMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';
import { IconBriefcase, IconFileText, IconX, ItemVectorIcon } from '../../shared/ui/icons';
import type { HoSoMvp as HoSo } from '../engine/trang-thai';
import { anhChanDung } from './anh-mvp';
import { TheHoSo } from './TheHoSo';

export type TabHoSoMvp = 'ho-so' | 'so-tay';
type Nhom = 'tat-ca' | TheHoSoMvp['loai'];

export interface HoSoMvpProps {
  kb: KichBanMvp;
  hoSo: HoSo;
  soTay: string[];
  tenNguoiChoi: string;
  nganh: string;
  tab: TabHoSoMvp;
  onDoiTab: (tab: TabHoSoMvp) => void;
  dienTen: (t: string) => string;
  onDong: () => void;
}

const NHAN_NHOM: Record<TheHoSoMvp['loai'], string> = { clue: 'Giấy nhớ', doc: 'Tài liệu', ev: 'Bằng chứng' };
const NHAN_LOAI_SO: Record<string, string> = { 'cú pháp': 'Cú pháp', 'tâm đắc': 'Tâm đắc', 'lỗi thường gặp': 'Lỗi thường gặp' };
/** Số ô tối thiểu của lưới (ô trống bù cho đủ, như hòm đồ prototype); đủ hàng 4 ô. */
const SO_O_TOI_THIEU = 12;

export function HoSoMvp({ kb, hoSo, soTay, tenNguoiChoi, nganh, tab, onDoiTab, dienTen, onDong }: HoSoMvpProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDong();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDong]);

  const tenKhung = tab === 'ho-so' ? 'Hồ sơ' : 'Sổ cá nhân';
  return (
    <aside
      className="notebook inventory-modal mvp-kho"
      aria-label={tenKhung}
      onClick={(e) => {
        if (e.target === e.currentTarget) onDong();
      }}
    >
      <div className={`inventory-frame mvp-kho__khung${tab === 'so-tay' ? ' is-journal-mode' : ''}`} role="dialog" aria-modal="true" aria-label={tenKhung}>
        <header className="inventory-nav">
          <div className="inventory-nav__tabs" role="tablist" aria-label="Chọn ngăn">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'ho-so'}
              className={`inventory-nav__tab${tab === 'ho-so' ? ' is-active' : ''}`}
              onClick={() => onDoiTab('ho-so')}
            >
              <IconBriefcase width={15} height={15} aria-hidden="true" />
              <span>Hồ sơ</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'so-tay'}
              className={`inventory-nav__tab${tab === 'so-tay' ? ' is-active' : ''}`}
              onClick={() => onDoiTab('so-tay')}
            >
              <IconFileText width={15} height={15} aria-hidden="true" />
              <span>Sổ cá nhân</span>
            </button>
          </div>
          <div className="inventory-nav__meta">
            <button
              type="button"
              className="inventory-nav__close"
              onClick={onDong}
              aria-label={`Đóng ${tenKhung.toLowerCase()}`}
              title="Đóng (Esc hoặc bấm ra ngoài)"
              autoFocus
            >
              <IconX width={12} height={12} aria-hidden="true" />
              <span>Đóng</span>
            </button>
          </div>
        </header>
        {tab === 'ho-so' ? (
          <NganHoSo kb={kb} hoSo={hoSo} soTrangSo={soTay.length} tenNguoiChoi={tenNguoiChoi} nganh={nganh} dienTen={dienTen} />
        ) : (
          <NganSoTay kb={kb} soTay={soTay} dienTen={dienTen} />
        )}
      </div>
    </aside>
  );
}

function NganHoSo({
  kb,
  hoSo,
  soTrangSo,
  tenNguoiChoi,
  nganh,
  dienTen,
}: {
  kb: KichBanMvp;
  hoSo: HoSo;
  soTrangSo: number;
  tenNguoiChoi: string;
  nganh: string;
  dienTen: (t: string) => string;
}) {
  const [nhom, setNhom] = useState<Nhom>('tat-ca');
  // Theo thứ tự nhận trong từng nhóm: giấy nhớ → tài liệu → bằng chứng.
  const tatCa = [...hoSo.manhMoi, ...hoSo.taiLieu, ...hoSo.bangChung];
  const [chon, setChon] = useState<string | null>(() => tatCa[0] ?? null);
  // Nhóm theo ngăn máy đã xếp (không theo thẻ: vài bằng chứng chưa có thẻ trong ho-so/).
  const nhomCua = (id: string): TheHoSoMvp['loai'] => (hoSo.manhMoi.includes(id) ? 'clue' : hoSo.taiLieu.includes(id) ? 'doc' : 'ev');
  const loc = nhom === 'tat-ca' ? tatCa : tatCa.filter((id) => nhomCua(id) === nhom);
  const dangChon = chon && loc.includes(chon) ? chon : (loc[0] ?? null);
  const theChon = dangChon ? kb.hoSo[dangChon] : undefined;
  const soO = Math.max(SO_O_TOI_THIEU, Math.ceil(loc.length / 4) * 4);
  const anh = anhChanDung('nguoi-choi', undefined);
  const dem: Record<Nhom, number> = { 'tat-ca': tatCa.length, clue: hoSo.manhMoi.length, doc: hoSo.taiLieu.length, ev: hoSo.bangChung.length };

  return (
    <div className="inventory-body mvp-kho__than">
      <div className="inv-chara-col">
        <div className="inv-chara-card">
          <span className="inv-chara-badge">TÂN SINH VIÊN</span>
          <div className="inv-chara-art">{anh ? <img src={anh} alt={tenNguoiChoi ? `Chân dung ${tenNguoiChoi}` : 'Chân dung nhân vật của bạn'} /> : null}</div>
          <div className="mvp-kho__ten">
            <strong>{tenNguoiChoi || 'Chưa đặt tên'}</strong>
            {nganh ? <span>{nganh}</span> : null}
          </div>
        </div>
        <div className="inv-stats-box">
          <div className="inv-stat-item">
            <span className="inv-stat-label">GIẤY NHỚ</span>
            <span className="inv-stat-val">{dem.clue}</span>
          </div>
          <div className="inv-stat-item">
            <span className="inv-stat-label">TÀI LIỆU</span>
            <span className="inv-stat-val">{dem.doc}</span>
          </div>
          <div className="inv-stat-item">
            <span className="inv-stat-label">BẰNG CHỨNG</span>
            <span className="inv-stat-val">{dem.ev}</span>
          </div>
          <div className="inv-stat-item">
            <span className="inv-stat-label">TRANG SỔ</span>
            <span className="inv-stat-val">{soTrangSo}</span>
          </div>
        </div>
      </div>

      <div className="inv-grid-col">
        <div className="inv-grid-header">
          <h2 className="inv-grid-title">HỒ SƠ</h2>
          <div className="inv-filter-pills" role="group" aria-label="Lọc theo nhóm">
            {(['tat-ca', 'clue', 'doc', 'ev'] as const).map((n) => (
              <button
                key={n}
                type="button"
                className={`inv-filter-btn${nhom === n ? ' is-active' : ''}`}
                aria-pressed={nhom === n}
                onClick={() => setNhom(n)}
              >
                {n === 'tat-ca' ? 'Tất cả' : NHAN_NHOM[n]} ({dem[n]})
              </button>
            ))}
          </div>
        </div>
        <div className="inv-slots-grid" role="group" aria-label="Các mục trong hồ sơ">
          {loc.map((id) => {
            const the = kb.hoSo[id];
            const ten = the ? dienTen(the.heading) : 'Mục chưa có thẻ hồ sơ';
            const la = id === dangChon;
            return (
              <button
                key={id}
                type="button"
                className={`inv-slot${la ? ' is-selected' : ''}`}
                aria-pressed={la}
                aria-label={ten}
                title={ten}
                onClick={() => setChon(id)}
              >
                <span className="inv-slot__icon" aria-hidden="true">
                  <ItemVectorIcon id={id} size={34} />
                </span>
                <span className="inv-slot__name" aria-hidden="true">
                  {ten}
                </span>
              </button>
            );
          })}
          {Array.from({ length: soO - loc.length }).map((_, i) => (
            <div key={`trong-${i}`} className="inv-slot is-empty" aria-hidden="true" />
          ))}
        </div>
      </div>

      <div className="inv-details-col">
        <div className="inv-details-header">
          <span className="inv-details-tag">{dangChon ? NHAN_NHOM[nhomCua(dangChon)] : 'Chi tiết'}</span>
          <span className="mvp-kho__phu">HỒ SƠ</span>
        </div>
        <div className="inv-details-preview" aria-hidden="true">
          <span className="inv-details-big-icon">
            <ItemVectorIcon id={dangChon ?? undefined} size={68} />
          </span>
        </div>
        <div className="inv-details-content">
          {theChon ? (
            <TheHoSo the={theChon} dienTen={dienTen} />
          ) : dangChon ? (
            <p className="notebook__empty">Mục này chưa có thẻ hồ sơ.</p>
          ) : (
            <p className="notebook__empty">Hồ sơ còn trống. Giấy nhớ, tài liệu và bằng chứng bạn nhận sẽ nằm ở đây.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function NganSoTay({ kb, soTay, dienTen }: { kb: KichBanMvp; soTay: string[]; dienTen: (t: string) => string }) {
  return (
    <div className="notebook__journal-container mvp-kho__so">
      {soTay.length === 0 ? (
        <div className="notebook__journal-card">
          <div className="notebook__journal-header">
            <span className="notebook__journal-pill">
              <IconFileText width={16} height={16} aria-hidden="true" /> SỔ CÁ NHÂN
            </span>
          </div>
          <p className="mvp-kho__trong">Chưa chép trang nào. Khi Hà Vy bảo "chép vào sổ", đoạn đúng sẽ nằm ở đây.</p>
        </div>
      ) : (
        <ul className="mvp-kho__trang-ds" aria-label="Các trang đã chép">
          {soTay.map((id, i) => {
            const t = kb.soTay[id];
            if (!t) return null;
            const dung = t.chonDoanCode?.find((c) => c.correct);
            return (
              <li key={id} className="notebook__journal-card mvp-kho__trang">
                <div className="notebook__journal-header">
                  <span className="notebook__journal-pill">
                    <IconFileText width={16} height={16} aria-hidden="true" /> {NHAN_LOAI_SO[t.loai] ?? t.loai}
                  </span>
                  <span className="notebook__journal-time">Trang {i + 1}</span>
                </div>
                <h3 className="notebook__journal-title">{dienTen(t.ten)}</h3>
                <div className="notebook__journal-body">
                  {dung ? (
                    <div className="notebook__journal-entry">
                      <h4>ĐOẠN ĐÃ CHÉP</h4>
                      <p className="mvp-kho__code">
                        <CodeText text={dienTen(dung.text)} />
                      </p>
                    </div>
                  ) : null}
                  {t.chuThich ? (
                    <div className="notebook__journal-entry">
                      <h4>GHI CHÚ</h4>
                      <p>{dienTen(t.chuThich)}</p>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
