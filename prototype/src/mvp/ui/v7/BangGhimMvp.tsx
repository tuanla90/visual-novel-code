/**
 * BẢNG ĐIỀU TRA (ĐÃ CHỐT B.1–B.2, 30/09/2026): bảng bần ghim tự do. Loại thẻ phân biệt bằng hình dạng — giấy nhớ vàng
 * (mẩu tin), phiếu trắng có con dấu (kết quả tra), ảnh chụp (vật chứng), giấy tờ (tài liệu, xếp cột bên trái), thẻ tròn "?"
 * (câu hỏi đang mở). Sợi chỉ đỏ do truy vấn vẽ: từ các thẻ đã kéo vào câu sang phiếu kết quả; sợi cam chấm là loại trừ.
 * Người chơi kéo thẻ để sắp lại (vị trí lưu trong trạng thái), bấm thẻ để đọc kỹ.
 * 01/10/2026 (câu 5 đề xuất gameplay): trong hộp xem kỹ có hàng 4 màu đầu ghim (người chơi tự nhóm, ý nghĩa tùy họ; sợi chỉ
 * theo màu ghim của thẻ nguồn) và nút "Gỡ khỏi bảng"; thẻ đã gỡ nằm ở khay "Chưa ghim" góc dưới trái, bấm để ghim lại.
 *
 * Mặt bảng là khung 1600×900 co theo vùng chứa; màn dọc thì bảng cao vừa màn và cuộn ngang.
 * Dữ liệu dựng ở `engine/bang-dieu-tra.ts`.
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import type { KichBanMvp } from '../../../content/mvp/types';
import { CO_THE, KHUNG_BANG, dungBang, gocNghieng, MA_THE_HOI, viTriThe, type TheBang } from '../../engine/bang-dieu-tra';
import { MAU_GHIM, type MauGhimMvp, type TrangThaiMvp, type GhiChuTruyVanMvp, type PhieuTruyVanMvp } from '../../engine/trang-thai';
import { anhTheoTen } from '../anh-mvp';
import { TheHoSo } from '../TheHoSo';
import './v7.css';

export interface BangGhimMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  dienTen: (t: string) => string;
  /** Phiếu kết quả vừa tra xong, chưa vào hồ sơ: vẽ thêm lên bảng kèm sợi chỉ từ các thẻ đã dùng. */
  them?: { id: string; dung: string[]; phieu?: PhieuTruyVanMvp; ghiChu?: GhiChuTruyVanMvp[] };
  /** Thẻ vừa ghim: rơi xuống, sợi chỉ tới nó tự vẽ. */
  moi?: string | null;
  /** Người chơi kéo một thẻ tới chỗ khác. */
  onDoiCho?: (the: string, x: number, y: number) => void;
  /** Nút / ghi chú đặt ở góc dưới phải (mở laptop, tiếp tục…). */
  children?: ReactNode;
  /** Thẻ người chơi chưa xem — gắn nhãn "MỚI" (khung Hồ sơ truyền vào). */
  chuaXem?: readonly string[];
  /** Người chơi mở xem kỹ một thẻ (để tắt nhãn MỚI). */
  onXemThe?: (id: string) => void;
  /** Đổi màu đầu ghim của thẻ (có → hiện hàng màu trong hộp xem kỹ). */
  onDoiMau?: (the: string, mau: MauGhimMvp) => void;
  /** Gỡ thẻ khỏi bảng / ghim lại (có → nút "Gỡ khỏi bảng" và khay "Chưa ghim"). */
  onGhim?: (the: string, ghim: boolean) => void;
}

const TEN_MAU: Record<MauGhimMvp, string> = { do: 'đỏ', xanh: 'xanh dương', luc: 'lục', tim: 'tím' };

const boNgoac = (t: string): string => t.replace(/^\[|\]$/g, '');

export function BangGhimMvp({ kb, s, dienTen, them, moi, onDoiCho, children, chuaXem, onXemThe, onDoiMau, onGhim }: BangGhimMvpProps) {
  const bang = useMemo(() => dungBang(kb, s, them), [kb, s, them]);
  const [keo, setKeo] = useState<{ id: string; x: number; y: number } | null>(null);
  const viTri = useMemo(() => {
    const vt = viTriThe(bang, s.bang?.viTri);
    return keo ? { ...vt, [keo.id]: { x: keo.x, y: keo.y } } : vt;
  }, [bang, s.bang, keo]);
  const [xem, datXem] = useState<string | null>(null);
  const setXem = (id: string | null): void => {
    datXem(id);
    if (id) onXemThe?.(id);
  };

  const goc = useRef<HTMLDivElement>(null);
  const [co, setCo] = useState<{ w: number; h: number }>({ w: KHUNG_BANG.rong, h: KHUNG_BANG.cao });
  useEffect(() => {
    const el = goc.current;
    if (!el) return;
    const do_ = (): void => {
      if (el.clientWidth > 0 && el.clientHeight > 0) setCo({ w: el.clientWidth, h: el.clientHeight });
    };
    do_();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(do_);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const ngang = co.w / co.h >= 1.15;
  const tiLe = ngang ? Math.min(co.w / KHUNG_BANG.rong, co.h / KHUNG_BANG.cao) : Math.max(0.5, co.h / KHUNG_BANG.cao);

  // Kéo thẻ bằng con trỏ (chuột lẫn cảm ứng); nhích dưới 6px coi là bấm → mở thẻ.
  const dangKeo = useRef<{ id: string; x0: number; y0: number; px: number; py: number; daNhich: boolean } | null>(null);
  const batDauKeo = (t: TheBang) => (e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const p = viTri[t.id];
    if (!p) return;
    dangKeo.current = { id: t.id, x0: p.x, y0: p.y, px: e.clientX, py: e.clientY, daNhich: false };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const dangDi = (e: ReactPointerEvent<HTMLElement>): void => {
    const k = dangKeo.current;
    if (!k) return;
    const dx = (e.clientX - k.px) / tiLe;
    const dy = (e.clientY - k.py) / tiLe;
    if (!k.daNhich && Math.hypot(dx, dy) < 6) return;
    k.daNhich = true;
    if (!onDoiCho) return;
    const c = CO_THE[bang.the.find((t) => t.id === k.id)?.loai ?? 'tin'];
    setKeo({ id: k.id, x: Math.max(0, Math.min(KHUNG_BANG.rong - c.rong, k.x0 + dx)), y: Math.max(8, Math.min(KHUNG_BANG.cao - 60, k.y0 + dy)) });
  };
  const thaRa = (): void => {
    const k = dangKeo.current;
    dangKeo.current = null;
    if (!k) return;
    if (!k.daNhich) {
      setXem(k.id);
      return;
    }
    if (keo && onDoiCho) onDoiCho(keo.id, keo.x, keo.y);
    setKeo(null);
  };

  /** Đầu ghim của thẻ (giữa mép trên) — sợi chỉ buộc vào đây. */
  const ghim = (id: string): { x: number; y: number } | null => {
    const p = viTri[id];
    const t = bang.the.find((x) => x.id === id);
    if (!p || !t) return null;
    return { x: p.x + CO_THE[t.loai].rong / 2, y: p.y + 4 };
  };

  // Esc khi đang xem kỹ một thẻ: chỉ đóng thẻ (bắt ở pha capture để khung Hồ sơ bên ngoài không đóng theo).
  useEffect(() => {
    if (!xem) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      datXem(null);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [xem]);

  const theXem = xem ? bang.the.find((t) => t.id === xem) : undefined;
  const anhXem = theXem?.anh ? anhTheoTen(theXem.anh) : undefined;
  const KIEU_DAY: Record<string, string> = { 'truy-van': 'dùng để tra', 'loai-tru': 'loại trừ', nguon: 'nguồn' };
  const noiXem = theXem
    ? bang.day.flatMap((d) => {
        const kia = d.tu === theXem.id ? d.den : d.den === theXem.id ? d.tu : null;
        const t = kia ? bang.the.find((x) => x.id === kia) : undefined;
        return t ? [{ id: t.id, nhan: t.nhan, mau: d.mau, chieu: d.tu === theXem.id ? '→' : '←', kieu: KIEU_DAY[d.kieu] ?? '' }] : [];
      })
    : [];

  return (
    <div className="bang" role="region" aria-label="Bảng điều tra">
      <div ref={goc} className={`bang__cuon${ngang ? '' : ' is-doc'}`}>
        <div className="bang__khung" style={{ width: KHUNG_BANG.rong * tiLe, height: KHUNG_BANG.cao * tiLe }}>
          <div className="bang__mat" style={{ transform: `scale(${tiLe})`, ['--anh-ban' as string]: `url("${anhTheoTen('ui-bang-ban') ?? ''}")` }}>
            <svg className="bang__day" viewBox={`0 0 ${KHUNG_BANG.rong} ${KHUNG_BANG.cao}`} aria-hidden="true">
              {bang.day.map((d) => {
                const a = ghim(d.tu);
                const b = ghim(d.den);
                if (!a || !b) return null;
                // Chỉ hơi chùng xuống giữa hai đầu ghim.
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2 + Math.min(46, Math.hypot(b.x - a.x, b.y - a.y) * 0.1);
                return (
                  <path
                    key={`${d.tu}>${d.den}`}
                    className={`bang__chi bang__chi--${d.kieu} bang__chi--mau-${d.mau}${moi && d.den === moi ? ' is-moi' : ''}`}
                    d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                    pathLength={1}
                  />
                );
              })}
            </svg>
            {bang.the.length === 0 ? <p className="bang__trong">Bảng còn trống.</p> : null}
            {bang.the.map((t) => {
              const p = viTri[t.id];
              if (!p) return null;
              const style = { left: p.x, top: p.y, ['--r' as string]: `${gocNghieng(t.id)}deg` } as CSSProperties;
              const anh = t.anh ? anhTheoTen(t.anh) : undefined;
              const chuaXemThe = chuaXem?.includes(t.id) ?? false;
              return (
                <article
                  key={t.id}
                  className={`the the--${t.loai} the--ghim-${t.mau}${t.phu === 'TỔNG HỢP' ? ' the--tong-hop' : ''}${t.khongDuLieu && t.loai === 'tin' ? ' is-khong-du-lieu' : ''}${moi === t.id ? ' is-moi' : ''}${keo?.id === t.id ? ' is-keo' : ''}`}
                  style={style}
                  tabIndex={0}
                  aria-label={`${NHAN_LOAI[t.loai]}: ${dienTen(boNgoac(t.nhan))}${chuaXemThe ? ' (mới)' : ''}`}
                  onPointerDown={batDauKeo(t)}
                  onPointerMove={dangDi}
                  onPointerUp={thaRa}
                  onPointerCancel={thaRa}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setXem(t.id);
                    }
                  }}
                >
                  <span className="the__ghim" aria-hidden="true" />
                  {chuaXemThe ? (
                    <span className="the__moi" aria-hidden="true">
                      MỚI
                    </span>
                  ) : null}
                  {t.loai === 'phieu' ? (
                    <>
                      <span className="the__loai">Phiếu tra cứu</span>
                      <h3 className="the__nhan">{dienTen(t.nhan)}</h3>
                      {t.phu ? <span className="the__dau">{t.phu.toUpperCase()}</span> : null}
                      {t.giaTri.length > 0 ? (
                        <span className="the__gia">
                          {t.giaTri.map((g) => (
                            <span key={g} className={t.gach.includes(g) ? 'is-gach' : undefined}>
                              {g}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </>
                  ) : t.loai === 'note' ? (
                    <>
                      <span className="the__loai">Giấy nhớ truy vấn</span>
                      <h3 className="the__nhan">{dienTen(t.nhan)}</h3>
                      {t.phu ? <span className="the__nguon">{dienTen(t.phu)}</span> : null}
                      <span className="the__gia">{t.giaTri.map((g) => <span key={g}>{g}</span>)}</span>
                    </>
                  ) : t.loai === 'vat' || t.loai === 'tai-lieu' ? (
                    <>
                      {anh ? <img className="the__anh" src={anh} alt="" draggable={false} /> : <span className="the__anh the__anh--trong" aria-hidden="true" />}
                      <span className="the__chu">{dienTen(boNgoac(t.nhan))}</span>
                    </>
                  ) : t.loai === 'hoi' ? (
                    <span className="the__cau">{dienTen(t.nhan)}</span>
                  ) : (
                    <>
                      <span className="the__nhan">{dienTen(boNgoac(t.nhan))}</span>
                      {t.phu ? <span className="the__nguon">{dienTen(t.phu)}</span> : null}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
      {children ? <div className="bang__nut">{children}</div> : null}
      {onGhim && bang.boGhim.length > 0 ? (
        <div className="bang__chua-ghim" role="group" aria-label={`Chưa ghim (${bang.boGhim.length} thẻ)`}>
          <span className="bang__chua-ghim-nhan">Chưa ghim</span>
          {bang.boGhim.map((t) => (
            <button key={t.id} type="button" className={`bang__ghim-lai bang__ghim-lai--${t.loai}`} title={`Ghim lại lên bảng: ${dienTen(boNgoac(t.nhan))}`} aria-label={`Ghim lại: ${dienTen(boNgoac(t.nhan))}`} onClick={() => onGhim(t.id, true)}>
              {dienTen(boNgoac(t.nhan))}
            </button>
          ))}
        </div>
      ) : null}
      {theXem ? (
        <div
          className="bang__xem"
          role="dialog"
          aria-label="Thẻ đang xem"
          onClick={(e) => {
            if (e.target === e.currentTarget) setXem(null);
          }}
        >
          <div className="bang__xem-hop">
            {anhXem ? <img className="bang__xem-anh" src={anhXem} alt="" draggable={false} /> : null}
            <div className="bang__xem-chu">
              {theXem.the ? <TheHoSo the={theXem.the} dienTen={dienTen} /> : <p className="bang__xem-hoi">{dienTen(theXem.nhan)}</p>}
              {theXem.giaTri.length > 0 ? (
                <div className="bang__xem-muc">
                  <span className="bang__xem-muc-nhan">Giấy nhớ mang sang laptop</span>
                  <span className="bang__xem-the-nho">
                    {theXem.giaTri.map((g) => (
                      <span key={g} className={`bang__xem-nho${theXem.gach.includes(g) ? ' is-gach' : ''}`}>
                        {g}
                      </span>
                    ))}
                  </span>
                </div>
              ) : null}
              {theXem.gach.length > 0 ? <p className="bang__xem-ghi">Đã loại: {theXem.gach.join(', ')}</p> : null}
              {noiXem.length > 0 ? (
                <div className="bang__xem-muc">
                  <span className="bang__xem-muc-nhan">Nối dây với</span>
                  <ul className="bang__xem-noi">
                    {noiXem.map((n) => (
                      <li key={n.id}>
                        <button type="button" className={`bang__xem-noi-nut bang__xem-noi-nut--${n.mau}`} onClick={() => setXem(n.id)}>
                          <span aria-hidden="true">{n.chieu}</span> {dienTen(boNgoac(n.nhan))}
                          <small>{n.kieu}</small>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {theXem.id !== MA_THE_HOI && (onDoiMau || onGhim) ? (
                <div className="bang__xem-ghim">
                  {onDoiMau ? (
                    <span className="bang__mau-nhan">Màu ghim và dây</span>
                  ) : null}
                  {onDoiMau ? (
                    <span className="bang__mau" role="radiogroup" aria-label="Màu đầu ghim">
                      {MAU_GHIM.map((m) => (
                        <button
                          key={m}
                          type="button"
                          role="radio"
                          aria-checked={theXem.mau === m}
                          aria-label={`Ghim ${TEN_MAU[m]}`}
                          title={`Ghim ${TEN_MAU[m]}`}
                          className={`bang__mau-nut bang__mau-nut--${m}${theXem.mau === m ? ' is-chon' : ''}`}
                          onClick={() => onDoiMau(theXem.id, m)}
                        />
                      ))}
                    </span>
                  ) : null}
                  {onGhim ? (
                    <button
                      type="button"
                      className="btn btn--ghost bang__go"
                      title="Gỡ thẻ khỏi bảng (vẫn còn trong hồ sơ, ghim lại được ở khay Chưa ghim)"
                      onClick={() => {
                        onGhim(theXem.id, false);
                        setXem(null);
                      }}
                    >
                      Gỡ khỏi bảng
                    </button>
                  ) : null}
                </div>
              ) : null}
              <button type="button" className="btn btn--primary" onClick={() => setXem(null)} autoFocus>
                Đóng
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const NHAN_LOAI: Record<TheBang['loai'], string> = {
  tin: 'Mẩu tin',
  phieu: 'Phiếu kết quả',
  note: 'Giấy nhớ truy vấn',
  vat: 'Vật chứng',
  'tai-lieu': 'Tài liệu',
  hoi: 'Câu hỏi đang mở',
};
