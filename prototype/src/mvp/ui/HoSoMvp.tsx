/**
 * Hồ sơ + Sổ cá nhân bản MVP (gói giao-dien-mvp) — mang phong cách "hòm đồ" của prototype (`EvidenceNotebook`):
 * DÙNG LẠI lớp CSS của `evidence/ui/inventory-grid.css` (khung `.inventory-frame`, thanh tab `.inventory-nav`, cột
 * chân dung `.inv-chara-*`, lưới ô `.inv-slots-grid`, cột chi tiết `.inv-details-*`, thẻ nhật ký `.notebook__journal-*`)
 * nhưng là component riêng: `EvidenceNotebook` gắn chặt `EvidenceId`/`GameContent`/nhân vật của prototype.
 *
 * Ba tab trong cùng một khung (như prototype có tab Hồ sơ nhân vật / Hòm đồ / Nhật ký):
 *   - "Nhân vật": thẻ Polaroid các nhân vật đã gặp (`NhanVatMvp`).
 *   - "Hồ sơ": chân dung người chơi + số đếm; lưới ô giấy nhớ / tài liệu / bằng chứng (lọc theo nhóm, QĐ-086/087);
 *     bấm ô → thẻ chi tiết (`TheHoSo`).
 *   - "Sổ cá nhân": các dòng đã học (tự ghi ở `[GHI SỔ]`, QĐ-092) kèm trang chị Linh tương ứng, mỗi trang một thẻ nhật ký.
 * Đóng: nút Đóng, Esc, bấm ra ngoài khung.
 */
import '../../evidence/ui/inventory-grid.css';
import { useCallback, useEffect, useState } from 'react';
import type { KichBanMvp, TheHoSoMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import { CodeText } from '../../shared/ui/CodeText';
import { IconBriefcase, IconFileText, IconUsers, IconX, ItemVectorIcon } from '../../shared/ui/icons';
import type { HoSoMvp as HoSo, TrangThaiMvp, MauGhimMvp } from '../engine/trang-thai';
import { BangGhimMvp } from './v7/BangGhimMvp';
import { phanTramBiMat } from '../engine/may';
import { anhChanDung } from './anh-mvp';
import { NhanVatMvp } from './NhanVatMvp';
import { useTheChuaXem } from './the-moi';
import { TheHoSo } from './TheHoSo';

export type TabHoSoMvp = 'nhan-vat' | 'ho-so' | 'so-tay';
type Nhom = 'tat-ca' | TheHoSoMvp['loai'];

export interface HoSoMvpProps {
  kb: KichBanMvp;
  /** Ván đang chơi — có thì tab "Bảng điều tra" vẽ bảng ghim (thẻ, sợi chỉ); không có thì vẽ lưới ô kiểu cũ. */
  trangThai?: TrangThaiMvp;
  onDoiCho?: (the: string, x: number, y: number) => void;
  /** Đổi màu đầu ghim / gỡ–ghim lại thẻ trên bảng (câu 5 đề xuất gameplay, 01/10). */
  onDoiMau?: (the: string, mau: MauGhimMvp) => void;
  onGhim?: (the: string, ghim: boolean) => void;
  hoSo: HoSo;
  soTay: string[];
  tenNguoiChoi: string;
  nganh: string;
  /** Nhân vật đã gặp (đã hiện màn "Nhân vật mới"), theo thứ tự — danh sách của tab Nhân vật. */
  daGap: readonly string[];
  tab: TabHoSoMvp;
  onDoiTab: (tab: TabHoSoMvp) => void;
  dienTen: (t: string) => string;
  onDong: () => void;
}

const NHAN_NHOM: Record<TheHoSoMvp['loai'], string> = { clue: 'Giấy nhớ', doc: 'Tài liệu', ev: 'Bằng chứng' };
const NHAN_LOAI_SO: Record<string, string> = { 'cú pháp': 'Cú pháp', 'tâm đắc': 'Tâm đắc', 'lỗi thường gặp': 'Lỗi thường gặp' };
/** Số ô tối thiểu của lưới (ô trống bù cho đủ, như hòm đồ prototype); đủ hàng 4 ô. */
const SO_O_TOI_THIEU = 12;

const TEN_TAB: Record<TabHoSoMvp, string> = { 'nhan-vat': 'Nhân vật', 'ho-so': 'Bảng điều tra', 'so-tay': 'Sổ cá nhân' };

export function HoSoMvp({ kb, trangThai, onDoiCho, onDoiMau, onGhim, hoSo, soTay, tenNguoiChoi, nganh, daGap, tab, onDoiTab: doiTab, dienTen, onDong: dong }: HoSoMvpProps) {
  // Nhãn MỚI: chụp danh sách thẻ chưa xem lúc mở khung rồi coi như đã xem hết (mở khung là thấy cả bảng) — nhãn vẫn hiện
  // suốt lần mở này, bấm vào thẻ thì tắt nhãn thẻ đó. (Chụp ở `useState` để chế độ dev dựng hai lần không làm mất nhãn.)
  const [chuaXem, setChuaXem] = useState<readonly string[]>(() => useTheChuaXem.getState().chuaXem);
  const daXemHet = useTheChuaXem((k) => k.daXemHet);
  const daXemThe = useTheChuaXem((k) => k.daXem);
  useEffect(() => {
    daXemHet();
  }, [daXemHet]);
  const xemThe = useCallback(
    (id: string): void => {
      daXemThe(id);
      setChuaXem((c) => (c.includes(id) ? c.filter((x) => x !== id) : c));
    },
    [daXemThe],
  );
  const soMoi = chuaXem.filter((id) => hoSo.manhMoi.includes(id) || hoSo.taiLieu.includes(id) || hoSo.bangChung.includes(id)).length;

  // Tiếng chuyển tab / đóng như hòm đồ prototype.
  const onDoiTab = (t: TabHoSoMvp): void => {
    soundEngine.playSfx('tab');
    doiTab(t);
  };
  const onDong = useCallback((): void => {
    soundEngine.playSfx('cancel');
    dong();
  }, [dong]);
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

  const tenKhung = TEN_TAB[tab];
  return (
    <aside
      className="notebook inventory-modal mvp-kho"
      aria-label={tenKhung}
      onClick={(e) => {
        if (e.target === e.currentTarget) onDong();
      }}
    >
      <div
        className={`inventory-frame mvp-kho__khung${tab === 'so-tay' ? ' is-journal-mode' : ''}${tab === 'nhan-vat' ? ' is-chara-mode' : ''}${tab === 'ho-so' && trangThai ? ' is-bang-mode' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={tenKhung}
      >
        <header className="inventory-nav">
          <div className="inventory-nav__tabs" role="tablist" aria-label="Chọn ngăn">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'nhan-vat'}
              className={`inventory-nav__tab${tab === 'nhan-vat' ? ' is-active' : ''}`}
              onClick={() => onDoiTab('nhan-vat')}
            >
              <IconUsers width={15} height={15} aria-hidden="true" />
              <span>Nhân vật</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'ho-so'}
              className={`inventory-nav__tab${tab === 'ho-so' ? ' is-active' : ''}`}
              onClick={() => onDoiTab('ho-so')}
            >
              <IconBriefcase width={15} height={15} aria-hidden="true" />
              <span>Bảng điều tra</span>
              {soMoi > 0 && tab !== 'ho-so' ? <span className="mvp-nhan-moi mvp-nhan-moi--tab">{soMoi} mới</span> : null}
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
        {tab === 'nhan-vat' ? (
          <div className="notebook__chara-container">
            <NhanVatMvp kb={kb} daGap={daGap} />
          </div>
        ) : tab === 'ho-so' && trangThai ? (
          <div className="mvp-kho__bang">
            <BangGhimMvp kb={kb} s={trangThai} dienTen={dienTen} onDoiCho={onDoiCho} onDoiMau={onDoiMau} onGhim={onGhim} chuaXem={chuaXem} onXemThe={xemThe} />
          </div>
        ) : tab === 'ho-so' ? (
          <NganHoSo
            kb={kb}
            hoSo={hoSo}
            soTrangSo={soTay.length}
            tenNguoiChoi={tenNguoiChoi}
            nganh={nganh}
            dienTen={dienTen}
            chuaXem={chuaXem}
            onXemThe={xemThe}
            phanTramBiMat={trangThai ? phanTramBiMat(kb, trangThai) : undefined}
          />
        ) : (
          <NganSoTay kb={kb} soTay={soTay} dienTen={dienTen} thuThachXong={trangThai?.thuThachXong ?? []} />
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
  chuaXem,
  onXemThe,
  phanTramBiMat,
}: {
  kb: KichBanMvp;
  hoSo: HoSo;
  soTrangSo: number;
  tenNguoiChoi: string;
  nganh: string;
  dienTen: (t: string) => string;
  chuaXem: readonly string[];
  onXemThe: (id: string) => void;
  phanTramBiMat?: number;
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
        {phanTramBiMat !== undefined && (
          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--c-surface-1)', borderRadius: '8px', border: '1px solid var(--c-border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>
              <span>BÍ MẬT CỦA MÙA</span>
              <span>{phanTramBiMat}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--c-surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${phanTramBiMat}%`, background: 'var(--c-primary)' }} />
            </div>
          </div>
        )}
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
            const moi = chuaXem.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`inv-slot${la ? ' is-selected' : ''}`}
                aria-pressed={la}
                aria-label={moi ? `${ten} (mới)` : ten}
                title={ten}
                onClick={() => {
                  setChon(id);
                  onXemThe(id);
                }}
              >
                {moi ? (
                  <span className="mvp-nhan-moi mvp-nhan-moi--o" aria-hidden="true">
                    MỚI
                  </span>
                ) : null}
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

/**
 * Các bảng dữ liệu đã mở (bảng của mọi thẻ thử thách đã xong), kèm tên cột: phần HÀ VY GHI trong sổ (user chốt 02/10/2026 —
 * cấu trúc bảng mới thì Hà Vy ghi; chi tiết lụm lặt là giấy nhớ của người chơi ở tab Hồ sơ).
 */
function bangDaMo(kb: KichBanMvp, thuThachXong: readonly string[]): { ten: string; cot: string[] }[] {
  const ten: string[] = [];
  for (const id of thuThachXong) {
    const sql = kb.thuThach[id]?.sqlChuan ?? '';
    for (const m of sql.matchAll(/\b(?:FROM|JOIN)\s+([a-z_][a-z0-9_]*)/gi)) if (m[1] && !ten.includes(m[1])) ten.push(m[1]);
  }
  return ten.flatMap((t) => {
    const b = kb.duLieu?.bang.find((x) => x.ten === t);
    return b ? [{ ten: t, cot: b.cot.map((c) => c.ten) }] : [];
  });
}

function NganSoTay({ kb, soTay, dienTen, thuThachXong }: { kb: KichBanMvp; soTay: string[]; dienTen: (t: string) => string; thuThachXong: readonly string[] }) {
  const bang = bangDaMo(kb, thuThachXong);
  return (
    <div className="notebook__journal-container mvp-kho__so">
      {bang.length > 0 ? (
        <div className="notebook__journal-card mvp-kho__bang-da-mo">
          <div className="notebook__journal-header">
            <span className="notebook__journal-pill">
              <IconFileText width={16} height={16} aria-hidden="true" /> BẢNG ĐÃ MỞ
            </span>
            <span className="notebook__journal-time">{bang.length} bảng dữ liệu</span>
          </div>
          <div className="mvp-kho__bang-ds" role="group" aria-label="Các bảng đã mở">
            {bang.map((b) => (
              <p key={b.ten}>
                <code>{b.ten}</code>
                <span>{b.cot.join(' · ')}</span>
              </p>
            ))}
          </div>
        </div>
      ) : null}
      {soTay.length === 0 ? (
        <div className="notebook__journal-card">
          <div className="notebook__journal-header">
            <span className="notebook__journal-pill">
              <IconFileText width={16} height={16} aria-hidden="true" /> SỔ CÁ NHÂN
            </span>
          </div>
          <p className="mvp-kho__trong">Sổ còn trống. Mỗi khi bạn học xong một mảng kiến thức ở phòng máy, một dòng sẽ tự ghi vào đây.</p>
        </div>
      ) : (
        <ul className="mvp-kho__trang-ds" aria-label="Các dòng đã học">
          {soTay.map((id, i) => {
            const t = kb.soTay[id];
            if (!t) return null;
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
                  {t.chuThich ? (
                    <div className="notebook__journal-entry">
                      <h4>ĐÃ HỌC</h4>
                      <p className="mvp-kho__code">
                        <CodeText text={dienTen(t.chuThich)} />
                      </p>
                    </div>
                  ) : null}
                  {t.trangChiLinh.length > 0 ? (
                    <div className="notebook__journal-entry">
                      <h4>SỔ CLB</h4>
                      {t.trangChiLinh.map((d, k) => (
                        <p key={k}>
                          <CodeText text={dienTen(d)} />
                        </p>
                      ))}
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
