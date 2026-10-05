/**
 * BẢNG ĐIỀU TRA (ĐÃ CHỐT B.1–B.2, 30/09/2026): bảng ghim tự do — từ 02/10 là bảng tin bọc nỉ xanh khung nhôm (quen ở
 * trường Việt Nam, thay tấm bần; QĐ-094). Loại thẻ phân biệt bằng hình dạng — giấy nhớ vàng
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
import { chaySql, type GiaTriSql } from '../../engine/sql-mvp';
import { IconTerminal, IconX } from '../../../shared/ui/icons';
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
  /** Vẽ cả giấy nhớ hỏi ra từ nhân chứng (gói B12; chỉ khung Hồ sơ bật). */
  hoiDap?: boolean;
}

const TEN_MAU: Record<MauGhimMvp, string> = {
  do: 'đỏ (trọng tâm)',
  cam: 'cam (chưa xác định)',
  xanh: 'xanh (tham chiếu)',
  luc: 'lục (đã xác thực)',
  tim: 'tím (nghi vấn)',
};

const boNgoac = (t: string): string => t.replace(/^\[|\]$/g, '');

export function BangGhimMvp({ kb, s, dienTen, them, moi, onDoiCho, children, chuaXem, onXemThe, onDoiMau, onGhim, hoiDap = false }: BangGhimMvpProps) {
  const bang = useMemo(() => dungBang(kb, s, them, { hoiDap }), [kb, s, them, hoiDap]);
  // Local state lưu vị trí người chơi đã kéo, đảm bảo thẻ giữ nguyên vị trí sau khi thả tay, không bị tự động sắp xếp lại hoặc giật về chỗ cũ.
  const [viTriCucBo, setViTriCucBo] = useState<Record<string, { x: number; y: number }>>({});
  useEffect(() => {
    setViTriCucBo({});
  }, [s.batDauLuc]);

  const [keo, setKeo] = useState<{ id: string; x: number; y: number } | null>(null);
  const viTri = useMemo(() => {
    const daKeo = { ...(s.bang?.viTri ?? {}), ...viTriCucBo };
    const vt = viTriThe(bang, daKeo);
    return keo ? { ...vt, [keo.id]: { x: keo.x, y: keo.y } } : vt;
  }, [bang, s.bang?.viTri, viTriCucBo, keo]);
  const [xem, datXem] = useState<string | null>(null);
  const [hienMenuGhim, setHienMenuGhim] = useState(false);
  const setXem = (id: string | null): void => {
    datXem(id);
    setHienMenuGhim(false);
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
  const dangKeo = useRef<{
    id: string;
    x0: number;
    y0: number;
    px: number;
    py: number;
    xHienTai: number;
    yHienTai: number;
    daNhich: boolean;
  } | null>(null);

  const batDauKeo = (t: TheBang) => (e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const p = viTri[t.id];
    if (!p) return;
    dangKeo.current = {
      id: t.id,
      x0: p.x,
      y0: p.y,
      px: e.clientX,
      py: e.clientY,
      xHienTai: p.x,
      yHienTai: p.y,
      daNhich: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const dangDi = (e: ReactPointerEvent<HTMLElement>): void => {
    const k = dangKeo.current;
    if (!k) return;
    const dx = (e.clientX - k.px) / tiLe;
    const dy = (e.clientY - k.py) / tiLe;
    if (!k.daNhich) {
      if (Math.hypot(dx, dy) < 6) return;
      k.daNhich = true;
    }
    if (!onDoiCho) return;
    const c = CO_THE[bang.the.find((t) => t.id === k.id)?.loai ?? 'tin'];
    const xMoi = Math.round(Math.max(0, Math.min(KHUNG_BANG.rong - c.rong, k.x0 + dx)));
    const yMoi = Math.round(Math.max(8, Math.min(KHUNG_BANG.cao - 60, k.y0 + dy)));
    k.xHienTai = xMoi;
    k.yHienTai = yMoi;
    setKeo({ id: k.id, x: xMoi, y: yMoi });
  };
  const thaRa = (e: ReactPointerEvent<HTMLElement>): void => {
    const k = dangKeo.current;
    if (!k) return;
    dangKeo.current = null;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // bỏ qua
    }
    if (!k.daNhich) {
      setXem(k.id);
      return;
    }
    const cuoiX = k.xHienTai;
    const cuoiY = k.yHienTai;
    setKeo(null);
    if (onDoiCho) {
      setViTriCucBo((prev) => ({ ...prev, [k.id]: { x: cuoiX, y: cuoiY } }));
      onDoiCho(k.id, cuoiX, cuoiY);
    }
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
  const anhXem = theXem?.anh && theXem.loai !== 'tai-lieu' ? anhTheoTen(theXem.anh) : undefined;
  const KIEU_DAY: Record<string, string> = { 'truy-van': 'dùng để tra', 'loai-tru': 'loại trừ', nguon: 'nguồn' };
  const noiXem = theXem
    ? bang.day.flatMap((d) => {
        const kia = d.tu === theXem.id ? d.den : d.den === theXem.id ? d.tu : null;
        const t = kia ? bang.the.find((x) => x.id === kia) : undefined;
        return t ? [{ id: t.id, nhan: t.nhan, mau: d.mau, chieu: d.tu === theXem.id ? '→' : '←', kieu: KIEU_DAY[d.kieu] ?? '' }] : [];
      })
    : [];

  const [ketQuaSql, setKetQuaSql] = useState<{ cot: string[]; dong: GiaTriSql[][] } | null>(null);
  useEffect(() => {
    let huy = false;
    if (!theXem?.sql || !kb.duLieu) {
      setKetQuaSql(null);
      return;
    }
    chaySql(kb.duLieu, theXem.sql).then((res) => {
      if (huy) return;
      if (res.ok) setKetQuaSql({ cot: res.cot, dong: res.dong });
      else setKetQuaSql(null);
    });
    return () => {
      huy = true;
    };
  }, [theXem, kb.duLieu]);

  return (
    <div className="bang" role="region" aria-label="Bảng điều tra">
      <div ref={goc} className={`bang__cuon${ngang ? '' : ' is-doc'}`}>
        <div className="bang__khung" style={{ width: KHUNG_BANG.rong * tiLe, height: KHUNG_BANG.cao * tiLe }}>
          <div className="bang__mat" style={{ transform: `scale(${tiLe})`, ['--anh-ban' as string]: `url("${anhTheoTen('ui-bang-ni') ?? ''}")` }}>
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
                      <h3 className="the__nhan">{dienTen(t.tieuDe ?? t.nhan)}</h3>
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
                      <h3 className="the__nhan">{dienTen(t.tieuDe ?? t.nhan)}</h3>
                      {t.phu ? <span className="the__nguon">{dienTen(t.phu)}</span> : null}
                      <span className="the__gia">{t.giaTri.map((g) => <span key={g}>{g}</span>)}</span>
                    </>
                  ) : t.loai === 'vat' || t.loai === 'tai-lieu' ? (
                    <>
                      {anh ? <img className="the__anh" src={anh} alt="" draggable={false} /> : <span className="the__anh the__anh--trong" aria-hidden="true" />}
                      <span className="the__chu">{dienTen(boNgoac(t.tieuDe ?? t.nhan))}</span>
                    </>
                  ) : t.loai === 'hoi' ? (
                    <span className="the__cau">{dienTen(t.tieuDe ?? t.nhan)}</span>
                  ) : (
                    <>
                      {t.tieuDe && boNgoac(t.tieuDe) !== boNgoac(t.nhan) ? (
                        <>
                          <h3 className="the__nhan the__nhan--tieude" title={dienTen(t.tieuDe)}>{dienTen(t.tieuDe)}</h3>
                          <div className="the__chip-hang">
                            <span className="the__chip-ma" title={`Mã: ${dienTen(boNgoac(t.nhan))}`}>{dienTen(boNgoac(t.nhan))}</span>
                          </div>
                        </>
                      ) : (
                        <h3 className="the__nhan">{dienTen(boNgoac(t.nhan))}</h3>
                      )}
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
          className="bang__xem bang__xem--focus"
          role="dialog"
          aria-label="Thẻ đang xem"
          onClick={(e) => {
            if (e.target === e.currentTarget) setXem(null);
          }}
        >
          {/* Nút đóng ngoài cho trợ năng / bàn phím và kiểm thử */}
          <button
            type="button"
            className="bang__xem-dong-ngoai"
            onClick={() => setXem(null)}
            aria-label="Đóng"
            title="Đóng (Esc hoặc bấm ra ngoài thẻ)"
            autoFocus
          >
            <IconX width={16} height={16} aria-hidden="true" />
            <span>Đóng</span>
          </button>

          {/* Tấm thẻ phóng to trực diện (Phương án 3) */}
          <div className={`bang__xem-the-focal${theXem.loai === 'hoi' ? ' bang__xem-the-focal--hoi' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* Đầu ghim: cố định cho thẻ câu hỏi trung tâm, tương tác đổi màu cho các thẻ khác */}
            {theXem.loai === 'hoi' || theXem.id === MA_THE_HOI ? (
              <div className="bang__xem-ghim-khu">
                <div
                  className="bang__xem-ghim-nut bang__xem-ghim-nut--do bang__xem-ghim-nut--tinh"
                  title="Ghim đỏ cố định ở trung tâm bảng"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div
                className="bang__xem-ghim-khu"
                onMouseEnter={() => setHienMenuGhim(true)}
                onMouseLeave={() => setHienMenuGhim(false)}
              >
                <button
                  type="button"
                  className={`bang__xem-ghim-nut bang__xem-ghim-nut--${theXem.mau}`}
                  onClick={() => setHienMenuGhim((prev) => !prev)}
                  aria-label={`Đầu ghim ${TEN_MAU[theXem.mau]} - Bấm để đổi màu hoặc gỡ thẻ`}
                  title={`Đầu ghim ${TEN_MAU[theXem.mau]} - Bấm hoặc rê chuột để đổi màu / gỡ thẻ`}
                  aria-expanded={hienMenuGhim}
                />

                {/* Popover màu ghim và nút gỡ bảng trôi ngay trên đầu ghim */}
                {hienMenuGhim && (onDoiMau || onGhim) ? (
                  <div className="bang__xem-ghim-popover" role="dialog" aria-label="Tùy chọn đầu ghim">
                    <span className="bang__xem-popover-mui" aria-hidden="true" />
                    {onDoiMau ? (
                      <div className="bang__xem-popover-mau" role="radiogroup" aria-label="Chọn màu đầu ghim">
                        {MAU_GHIM.map((m) => (
                          <button
                            key={m}
                            type="button"
                            role="radio"
                            aria-checked={theXem.mau === m}
                            aria-label={`Ghim ${TEN_MAU[m]}`}
                            title={`Ghim ${TEN_MAU[m]}`}
                            className={`bang__mau-nut bang__mau-nut--${m}${theXem.mau === m ? ' is-chon' : ''}`}
                            onClick={() => {
                              onDoiMau(theXem.id, m);
                            }}
                          />
                        ))}
                      </div>
                    ) : null}
                    {onGhim ? (
                      <button
                        type="button"
                        className="bang__go bang__go--popover"
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
              </div>
            )}

            {/* Thân thẻ phóng to */}
            <div className={`bang__xem-the-than${theXem.loai === 'hoi' ? ' bang__xem-the-than--hoi' : ''}`}>
              {theXem.loai === 'hoi' ? (
                <div className="bang__xem-hoi-card">
                  <span className="bang__xem-hoi-dau" aria-hidden="true">?</span>
                  <span className="bang__xem-hoi-loai">Trọng tâm điều tra</span>
                  <p className="bang__xem-hoi">{dienTen(theXem.nhan)}</p>
                  <span className="bang__xem-hoi-nhac">Thu thập manh mối và chạy truy vấn dữ liệu để giải đáp</span>
                </div>
              ) : (
                <>
                  {anhXem ? <img className="bang__xem-anh" src={anhXem} alt="" draggable={false} /> : null}
                  <div className="bang__xem-chu">
                    {theXem.the ? <TheHoSo the={theXem.the} dienTen={dienTen} /> : <p className="bang__xem-hoi">{dienTen(theXem.nhan)}</p>}

                {/* Giá trị truy vấn: hiển thị trực tiếp dạng chip, không cần tiêu đề text rườm rà */}
                {theXem.giaTri.length > 0 ? (
                  <div className="bang__xem-gia-tri-hang" aria-label="Giá trị điều kiện truy vấn">
                    {theXem.giaTri.map((g) => (
                      <span key={g} className={`bang__xem-nho${theXem.gach.includes(g) ? ' is-gach' : ''}`} title="Giá trị điều kiện dùng khi mở laptop">
                        <IconTerminal width={12} height={12} aria-hidden="true" />
                        {g}
                      </span>
                    ))}
                  </div>
                ) : null}

                {theXem.gach.length > 0 ? <p className="bang__xem-ghi">Đã loại: {theXem.gach.join(', ')}</p> : null}

                {theXem.sql ? (
                  <div className="bang__xem-sql-khu">
                    <span className="bang__xem-sql-nhan">Câu truy vấn SQL:</span>
                    <pre className="bang__xem-sql-code"><code>{theXem.sql}</code></pre>
                  </div>
                ) : null}

                {ketQuaSql ? (
                  <div className="bang__xem-bang-khu">
                    <span className="bang__xem-sql-nhan">Kết quả ({ketQuaSql.dong.length} dòng):</span>
                    <div className="bang__xem-bang-cuon">
                      <table className="bang__xem-bang">
                        <thead>
                          <tr>
                            {ketQuaSql.cot.map((c) => (
                              <th key={c} scope="col">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ketQuaSql.dong.slice(0, 10).map((row, r) => (
                            <tr key={r}>
                              {row.map((val, c) => (
                                <td key={c}>{val === null ? '(trống)' : String(val)}</td>
                              ))}
                            </tr>
                          ))}
                          {ketQuaSql.dong.length > 10 ? (
                            <tr>
                              <td colSpan={ketQuaSql.cot.length} className="bang__xem-bang-them">
                                … còn {ketQuaSql.dong.length - 10} dòng nữa
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                {noiXem.length > 0 ? (
                  <div className="bang__xem-noi-hang">
                    <span className="bang__xem-noi-nhan">Dây nối:</span>
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
              </div>
            </>
          )}
        </div>

            {/* Chỉ dẫn đóng tự nhiên */}
            <div className="bang__xem-chi-dan" aria-hidden="true">
              Bấm ra ngoài thẻ hoặc phím Esc để đóng
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
