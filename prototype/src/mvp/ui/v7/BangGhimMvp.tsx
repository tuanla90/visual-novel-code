/**
 * BẢNG ĐIỀU TRA (ĐÃ CHỐT B.1–B.2, 30/09/2026): bảng ghim tự do — từ 02/10 là bảng tin bọc nỉ xanh khung nhôm (quen ở
 * trường Việt Nam, thay tấm bần; QĐ-094). Loại thẻ phân biệt bằng hình dạng — giấy nhớ vàng
 * (mẩu tin), phiếu trắng có con dấu (kết quả tra), ảnh chụp (vật chứng), giấy tờ (tài liệu, xếp cột bên trái), thẻ tròn "?"
 * (câu hỏi đang mở). Sợi chỉ đỏ do truy vấn vẽ: từ các thẻ đã kéo vào câu sang phiếu kết quả; sợi cam chấm là loại trừ.
 * Người chơi kéo thẻ để sắp lại (vị trí lưu trong trạng thái), bấm thẻ để đọc kỹ.
 * 01/10/2026 (câu 5 đề xuất gameplay): trong hộp xem kỹ có hàng 4 màu đầu ghim (người chơi tự nhóm, ý nghĩa tùy họ; sợi chỉ
 * theo màu ghim của thẻ nguồn) và nút "Gỡ khỏi bảng"; thẻ đã gỡ nằm ở khay "Chưa ghim" góc dưới trái, bấm để ghim lại.
 * 05/10/2026 (gói B14, user: "di chuột lên để chọn màu hơi khó dùng"): dải màu mở bằng BẤM vào đầu ghim và ở lại cho tới khi
 * chọn màu, bấm ra ngoài hoặc Esc; không còn mở theo rê chuột. Chấm màu 44px, đi bằng phím mũi tên / Tab, Enter để chọn.
 *
 * Mặt bảng là khung 1600×900 co theo vùng chứa; màn dọc thì bảng cao vừa màn và cuộn ngang.
 * Dữ liệu dựng ở `engine/bang-dieu-tra.ts`.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import type { KichBanMvp } from '../../../content/mvp/types';
import { CO_THE, KHUNG_BANG, dungBang, gocNghieng, MA_THE_HOI, viTriThe, type TheBang } from '../../engine/bang-dieu-tra';
import { timCauNoi } from '../../engine/may';
import { TEN_NGUON_NOTE } from '../../engine/note';
import { MAU_GHIM, type MauGhimMvp, type TrangThaiMvp, type GhiChuTruyVanMvp, type GhepMauLuuMvp, type PhieuTruyVanMvp } from '../../engine/trang-thai';
import { anhTheoTen } from '../anh-mvp';
import { TheHoSo } from '../TheHoSo';
import { ChuNote, lopGiayNguon } from '../note-ui';
import { chaySql, type GiaTriSql } from '../../engine/sql-mvp';
import { IconTerminal, IconX } from '../../../shared/ui/icons';
import './v7.css';
import '../b19.css';

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
  /** Gói B19: lần ghép mẫu đang diễn (màn `[GHÉP MẪU]`): hai thẻ lên bảng, chỉ đỏ tự kéo, giấy nhớ dán xuống. */
  ghep?: GhepMauLuuMvp;
  /** Tên người ghép theo mã (chữ ký nhỏ dưới giấy nhớ ghép mẫu). */
  tenNguoi?: (ma: string) => string;
  /**
   * Ghép mẫu làm từng bước (user 09/10/2026): 1 = ghim hai thẻ, 2 = nối chỉ đỏ, 3 = dán giấy nhớ. Bàn tay mang tên người ghép
   * làm thao tác của bước đang diễn. Thiếu = diễn cả ba một lần như cũ.
   */
  buocGhep?: 1 | 2 | 3;
  /**
   * Gói B21: nối hai note thành câu hỏi (`[NỐI]`). Có thì bảng có nút "Nối note" (chạm note này rồi chạm note kia) và kéo note này
   * thả lên note kia cũng nối. Cặp có khai → máy ra thẻ câu hỏi và mở đích; cặp lạ → sợi chỉ rơi, không phạt.
   */
  onNoi?: (a: string, b: string) => void;
  /** Gói B21: mở lại màn tra của một câu hỏi đã nối ("→ tra"). */
  onMoTra?: (cauId: string) => void;
}

const TEN_MAU: Record<MauGhimMvp, string> = {
  do: 'đỏ (trọng tâm)',
  cam: 'cam (chưa xác định)',
  xanh: 'xanh (tham chiếu)',
  luc: 'lục (đã xác thực)',
  tim: 'tím (nghi vấn)',
};

const boNgoac = (t: string): string => t.replace(/^\[|\]$/g, '');

/**
 * Bàn tay của người làm mẫu (ghép mẫu từng bước, user 09/10/2026): mang tên người ghép để người chơi biết ai đang làm. Bước 1 ấn
 * đầu ghim thẻ thứ hai, bước 2 kéo từ đầu ghim thẻ thứ nhất sang thẻ thứ hai (đi cùng sợi chỉ), bước 3 dán giấy nhớ dưới sợi chỉ.
 */
function TayGhep({ buoc, a, b, ten }: { buoc: 1 | 2 | 3; a: { x: number; y: number } | null; b: { x: number; y: number } | null; ten: string }) {
  if (!a || !b) return null;
  // Bước 3: góc dưới phải tờ giấy nhớ (giấy rộng 210, đặt từ giữa sợi chỉ lệch xuống 70), tay không che chữ.
  const dich = buoc === 3 ? { x: (a.x + b.x) / 2 + 96, y: (a.y + b.y) / 2 + 160 } : b;
  const tu = buoc === 2 ? a : { x: dich.x + 40, y: dich.y + 60 };
  const style = { left: dich.x, top: dich.y, ['--dx' as string]: `${tu.x - dich.x}px`, ['--dy' as string]: `${tu.y - dich.y}px` } as CSSProperties;
  return (
    <div key={buoc} className={`bang__tay bang__tay--b${buoc}`} style={style} aria-hidden="true">
      <svg className="bang__tay-hinh" viewBox="0 0 24 24" width="44" height="44">
        <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v1m0 0a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7l-3.3-5a1.6 1.6 0 0 1 2.6-1.8L8 15" fill="#fde7d2" stroke="#3b2a1c" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="bang__tay-ten">{ten}</span>
    </div>
  );
}

export function BangGhimMvp({ kb, s, dienTen, them, moi, onDoiCho, children, chuaXem, onXemThe, onDoiMau, onGhim, hoiDap = false, ghep, tenNguoi, buocGhep, onNoi, onMoTra }: BangGhimMvpProps) {
  const bangDu = useMemo(() => dungBang(kb, s, them, { hoiDap, ...(ghep ? { ghep } : {}) }), [kb, s, them, hoiDap, ghep]);
  // Ghép mẫu làm từng bước: chưa tới bước nối thì giấu sợi chỉ của lần ghép này, chưa tới bước viết thì giấu giấy nhớ.
  const bang = useMemo(() => {
    if (!ghep || !buocGhep || buocGhep === 3) return bangDu;
    const laDayGhep = (d: { tu: string; den: string; kieu: string }): boolean => d.kieu === 'ghep' && d.tu === ghep.the[0] && d.den === ghep.the[1];
    return { ...bangDu, day: buocGhep < 2 ? bangDu.day.filter((d) => !laDayGhep(d)) : bangDu.day, giayGhep: (bangDu.giayGhep ?? []).filter((g) => !g.moi) };
  }, [bangDu, ghep, buocGhep]);
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
  // Gói B21: nối note thành câu hỏi. `cheDoNoi`: chạm note này rồi chạm note kia; `noiChon`: note đã chạm; `chiRoi`: sợi chỉ nối sai đang rơi.
  const [cheDoNoi, setCheDoNoi] = useState(false);
  const [noiChon, setNoiChon] = useState<string | null>(null);
  const [chiRoi, setChiRoi] = useState<{ a: string; b: string; k: number } | null>(null);
  const coCauNoi = !!onNoi && (s.cauNoiMo ?? []).length > 0;
  const soCauTruoc = useRef((s.cauNoiXong ?? []).length);
  const [cauMoi, setCauMoi] = useState<string | null>(null);
  useEffect(() => {
    const ds = s.cauNoiXong ?? [];
    if (ds.length > soCauTruoc.current) setCauMoi(ds[ds.length - 1] ?? null);
    soCauTruoc.current = ds.length;
  }, [s.cauNoiXong]);
  useEffect(() => {
    if (!chiRoi) return;
    const h = setTimeout(() => setChiRoi(null), 1100);
    return () => clearTimeout(h);
  }, [chiRoi]);
  /** Thử nối hai note: cặp có khai và chưa nối → hành động; cặp lạ → sợi chỉ rơi (chỉ khi bảng đã có cặp nào mở, kẻo lộ chỗ không phải lúc). */
  const thuNoi = (a: string, b: string): void => {
    if (!onNoi || a === b || a.startsWith('cau:') || b.startsWith('cau:')) return;
    const cau = timCauNoi(kb, s, a, b);
    if (cau && !(s.cauNoiXong ?? []).includes(cau.id)) {
      onNoi(a, b);
      setNoiChon(null);
      return;
    }
    if ((s.cauNoiMo ?? []).length > 0) setChiRoi({ a, b, k: Date.now() });
    setNoiChon(null);
  };
  const [hienMenuGhim, setHienMenuGhim] = useState(false);
  const nutGhim = useRef<HTMLButtonElement>(null);
  const dayMau = useRef<HTMLDivElement>(null);
  /** Đóng dải màu, trả tiêu điểm về đầu ghim (bàn phím không bị lạc). */
  const dongMenuGhim = (): void => {
    setHienMenuGhim(false);
    nutGhim.current?.focus();
  };
  // Dải màu vừa mở: tiêu điểm vào màu đang chọn để phím mũi tên dùng được ngay.
  useEffect(() => {
    if (!hienMenuGhim) return;
    (dayMau.current?.querySelector<HTMLElement>('[aria-checked="true"]') ?? dayMau.current?.querySelector<HTMLElement>('button'))?.focus();
  }, [hienMenuGhim]);
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
  // Điện thoại cầm ngang (vùng bảng thấp dưới 480px): co vừa thì chữ trên note chỉ còn ~4px. Giữ tỉ lệ tối thiểu 0,72 và cho cuộn
  // cả hai chiều (kéo nền bảng để xem chỗ khác; kéo note vẫn là dời note).
  const gon = ngang && co.h < 480;
  const tiLe = gon
    ? Math.max(0.72, Math.min(co.w / KHUNG_BANG.rong, co.h / KHUNG_BANG.cao))
    : ngang
      ? Math.min(co.w / KHUNG_BANG.rong, co.h / KHUNG_BANG.cao)
      : Math.max(0.5, co.h / KHUNG_BANG.cao);

  // Điện thoại cầm ngang: bảng rộng hơn khung nhìn nên thẻ mới ghim / tờ câu hỏi hay nằm ngoài màn (user 10/10: "tờ câu hỏi ở xa tít,
  // bị cắt"). Mở bảng là cuộn sẵn để thẻ ấy ở giữa khung nhìn; người chơi cuộn tiếp tùy ý (chỉ cuộn lại khi đổi thẻ đích).
  const idDich = moi ?? bang.the.find((t) => t.loai === 'hoi')?.id ?? null;
  useLayoutEffect(() => {
    if (!gon || !idDich) return;
    const cuon = goc.current;
    const el = cuon?.querySelector<HTMLElement>(`[data-the="${idDich.replace(/"/g, '\\"')}"]`);
    if (!cuon || !el) return;
    const c = cuon.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    cuon.scrollLeft += r.left + r.width / 2 - (c.left + c.width / 2);
    cuon.scrollTop += r.top + r.height / 2 - (c.top + c.height / 2);
  }, [gon, idDich]);

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
      if (cheDoNoi && coCauNoi) {
        if (noiChon === null) setNoiChon(k.id);
        else if (noiChon === k.id) setNoiChon(null);
        else thuNoi(noiChon, k.id);
        return;
      }
      setXem(k.id);
      return;
    }
    // Gói B21: kéo note thả lên note khác = nối hai note.
    if (coCauNoi && typeof document !== 'undefined' && typeof document.elementsFromPoint === 'function') {
      const dich = document.elementsFromPoint(e.clientX, e.clientY).map((el) => el.closest<HTMLElement>('[data-the]')?.dataset.the).find((id) => !!id && id !== k.id);
      if (dich) thuNoi(k.id, dich);
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

  // Esc khi đang xem kỹ một thẻ: chỉ đóng thẻ (bắt ở pha capture để khung Hồ sơ bên ngoài không đóng theo). Dải màu đang mở
  // thì Esc đóng dải màu trước.
  useEffect(() => {
    if (!xem) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (hienMenuGhim) {
        setHienMenuGhim(false);
        nutGhim.current?.focus();
      } else datXem(null);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [xem, hienMenuGhim]);
  const theXem = xem ? bang.the.find((t) => t.id === xem) : undefined;
  const anhXem = theXem?.anh && theXem.loai !== 'tai-lieu' ? anhTheoTen(theXem.anh) : undefined;
  const KIEU_DAY: Record<string, string> = { 'truy-van': 'dùng để tra', 'loai-tru': 'loại trừ', nguon: 'nguồn', ghep: 'ghép mẫu' };
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
      <div ref={goc} className={`bang__cuon${ngang ? '' : ' is-doc'}${gon ? ' is-gon' : ''}`}>
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
                    key={`${d.tu}>${d.den}:${d.kieu}`}
                    className={`bang__chi bang__chi--${d.kieu} bang__chi--mau-${d.mau}${(moi && d.den === moi) || (d.kieu === 'ghep' && ghep && ghep.the[1] === d.den && ghep.the[0] === d.tu) ? ' is-moi' : ''}`}
                    d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                    pathLength={1}
                  />
                );
              })}
              {chiRoi
                ? (() => {
                    const a = ghim(chiRoi.a);
                    const b = ghim(chiRoi.b);
                    if (!a || !b) return null;
                    const mx = (a.x + b.x) / 2;
                    const my = (a.y + b.y) / 2 + 30;
                    return <path key={chiRoi.k} className="bang__chi bang__chi--roi" d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`} pathLength={1} />;
                  })()
                : null}
            </svg>
            {bang.the.length === 0 ? <p className="bang__trong">Bảng còn trống.</p> : null}
            {ghep && buocGhep ? <TayGhep buoc={buocGhep} a={ghim(ghep.the[0] ?? '')} b={ghim(ghep.the[1] ?? '')} ten={tenNguoi ? tenNguoi(ghep.nguoi) : ghep.nguoi} /> : null}
            {/* Gói B19: giấy nhớ ghép mẫu, dán giữa hai thẻ đã nối, hơi lệch xuống dưới sợi chỉ. */}
            {(bang.giayGhep ?? []).map((g) => {
              const a = ghim(g.tu);
              const b = ghim(g.den);
              if (!a || !b) return null;
              const left = Math.max(8, Math.min(KHUNG_BANG.rong - 222, (a.x + b.x) / 2 - 105));
              const top = Math.max(8, Math.min(KHUNG_BANG.cao - 150, (a.y + b.y) / 2 + 70));
              return (
                <p key={g.id} className={`bang__giay-ghep${g.moi ? ' is-moi' : ''}`} style={{ left, top }} aria-label={`Giấy nhớ ghép mẫu: ${dienTen(g.chu)}`}>
                  {dienTen(g.chu)}
                  {tenNguoi ? <span className="bang__giay-ghep-ky">— {tenNguoi(g.nguoi)}</span> : null}
                </p>
              );
            })}
            {bang.the.map((t) => {
              const p = viTri[t.id];
              if (!p) return null;
              const style = { left: p.x, top: p.y, ['--r' as string]: `${gocNghieng(t.id)}deg` } as CSSProperties;
              const anh = t.anh ? anhTheoTen(t.anh) : undefined;
              const chuaXemThe = chuaXem?.includes(t.id) ?? false;
              return (
                <article
                  key={t.id}
                  data-the={t.id}
                  className={`the the--${t.loai} the--ghim-${t.mau}${t.loaiNote ? ` the--${t.loaiNote === 'su-that' ? 'su-that' : 'manh-moi'} ${lopGiayNguon(t.nguon)}` : ''}${t.daLenBang ? ' is-da-len' : ''}${noiChon === t.id ? ' is-noi-chon' : ''}${cheDoNoi && coCauNoi && t.loai !== 'cau' && t.loai !== 'hoi' ? ' is-noi-duoc' : ''}${t.cau && cauMoi === t.cau.id ? ' is-moi' : ''}${t.phu === 'TỔNG HỢP' ? ' the--tong-hop' : ''}${t.khongDuLieu && t.loai === 'tin' ? ' is-khong-du-lieu' : ''}${moi === t.id ? ' is-moi' : ''}${keo?.id === t.id ? ' is-keo' : ''}${buocGhep && ghep?.the.includes(t.id) ? ' is-ghep-mau' : ''}`}
                  style={style}
                  tabIndex={0}
                  aria-label={`${NHAN_LOAI[t.loai]}: ${dienTen(boNgoac(t.trenBang ?? t.nhan))}${chuaXemThe ? ' (mới)' : ''}${t.daLenBang ? ' (đã đặt lên bảng chân lý)' : ''}`}
                  onPointerDown={batDauKeo(t)}
                  onPointerMove={dangDi}
                  onPointerUp={thaRa}
                  onPointerCancel={thaRa}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (cheDoNoi && coCauNoi) {
                        if (noiChon === null) setNoiChon(t.id);
                        else if (noiChon === t.id) setNoiChon(null);
                        else thuNoi(noiChon, t.id);
                      } else setXem(t.id);
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
                      <span className="the__chu"><ChuNote text={dienTen(boNgoac(t.trenBang ?? t.tieuDe ?? t.nhan))} keyword={t.keyword} /></span>
                    </>
                  ) : t.loai === 'hoi' ? (
                    <span className="the__cau">{dienTen(t.tieuDe ?? t.nhan)}</span>
                  ) : t.loai === 'cau' ? (
                    <>
                      <span className="the__cau-dau" aria-hidden="true">?</span>
                      <span className="the__loai">Câu hỏi</span>
                      <p className="the__cau-chu">{dienTen(t.nhan)}</p>
                      {t.phu ? <span className={`the__cau-dich${t.cau?.daTra ? ' is-xong' : ''}`}>{t.phu}</span> : null}
                    </>
                  ) : t.trenBang ? (
                    <>
                      <h3 className="the__nhan the__nhan--ten-bang">
                        <ChuNote text={dienTen(boNgoac(t.trenBang))} keyword={t.keyword} />
                      </h3>
                      {t.phu ? <span className="the__nguon">{dienTen(t.phu)}</span> : null}
                    </>
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
      {children || coCauNoi ? (
        <div className="bang__nut">
          {coCauNoi ? (
            <button
              type="button"
              className={`bang__mo-may bang__noi-nut${cheDoNoi ? ' is-bat' : ''}`}
              aria-pressed={cheDoNoi}
              title="Nối hai note thành một câu hỏi: chạm note này rồi chạm note kia (trên máy tính kéo note này thả lên note kia cũng được)"
              onClick={() => {
                setCheDoNoi((v) => !v);
                setNoiChon(null);
              }}
            >
              {cheDoNoi ? 'Xong nối' : 'Nối note'}
            </button>
          ) : null}
          {children}
        </div>
      ) : null}
      {cheDoNoi && coCauNoi ? (
        <p className="bang__noi-huong-dan" role="status">
          {noiChon ? 'Chạm note thứ hai để nối.' : 'Chạm một note, rồi chạm note muốn nối với nó.'}
        </p>
      ) : null}
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
            if (e.target !== e.currentTarget) return;
            // Dải màu đang mở: bấm ra ngoài chỉ đóng dải màu, thẻ vẫn mở.
            if (hienMenuGhim) setHienMenuGhim(false);
            else setXem(null);
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
          <div
            className={`bang__xem-the-focal${theXem.loai === 'hoi' ? ' bang__xem-the-focal--hoi' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              // Bấm vào thân thẻ (ngoài khu đầu ghim) cũng là bấm ra ngoài dải màu.
              if (hienMenuGhim && !(e.target as HTMLElement).closest('.bang__xem-ghim-khu')) setHienMenuGhim(false);
            }}
          >
            {/* Đầu ghim: cố định cho thẻ câu hỏi trung tâm, tương tác đổi màu cho các thẻ khác */}
            {theXem.loai === 'hoi' || theXem.loai === 'cau' || theXem.id === MA_THE_HOI ? (
              <div className="bang__xem-ghim-khu">
                <div
                  className="bang__xem-ghim-nut bang__xem-ghim-nut--do bang__xem-ghim-nut--tinh"
                  title="Ghim đỏ cố định ở trung tâm bảng"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div className="bang__xem-ghim-khu">
                <button
                  ref={nutGhim}
                  type="button"
                  className={`bang__xem-ghim-nut bang__xem-ghim-nut--${theXem.mau}${hienMenuGhim ? ' is-mo' : ''}`}
                  onClick={() => setHienMenuGhim((prev) => !prev)}
                  aria-label={`Đầu ghim ${TEN_MAU[theXem.mau]} - Bấm để đổi màu hoặc gỡ thẻ`}
                  title={`Đầu ghim ${TEN_MAU[theXem.mau]} - Bấm để đổi màu / gỡ thẻ`}
                  aria-haspopup="true"
                  aria-expanded={hienMenuGhim}
                />

                {/* Popover màu ghim và nút gỡ bảng trôi ngay trên đầu ghim */}
                {hienMenuGhim && (onDoiMau || onGhim) ? (
                  <div className="bang__xem-ghim-popover" role="dialog" aria-label="Tùy chọn đầu ghim">
                    <span className="bang__xem-popover-mui" aria-hidden="true" />
                    {onDoiMau ? (
                      <div
                        ref={dayMau}
                        className="bang__xem-popover-mau"
                        role="radiogroup"
                        aria-label="Chọn màu đầu ghim"
                        onKeyDown={(e) => {
                          // Phím mũi tên đi giữa các chấm màu (vòng tròn); Enter / phím cách chọn màu đang đứng.
                          const buoc = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
                          if (buoc === 0) return;
                          e.preventDefault();
                          const cac = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')];
                          const i = cac.indexOf(document.activeElement as HTMLElement);
                          cac[(i + buoc + cac.length) % cac.length]?.focus();
                        }}
                      >
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
                              // Chọn xong thì dải màu đóng.
                              onDoiMau(theXem.id, m);
                              dongMenuGhim();
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
              {theXem.loai === 'cau' && theXem.cau ? (
                <div className="bang__xem-hoi-card bang__xem-cau">
                  <span className="bang__xem-hoi-dau" aria-hidden="true">?</span>
                  <span className="bang__xem-hoi-loai">Câu hỏi bạn đã nối</span>
                  <p className="bang__xem-hoi">{dienTen(theXem.nhan)}</p>
                  <span className="bang__xem-hoi-nhac">
                    {theXem.cau.dich === 'tra'
                      ? theXem.cau.daTra
                        ? 'Đã tra xong: kết quả nằm ở phiếu trên bảng.'
                        : 'Đích: tra dữ liệu.'
                      : 'Đích: ra hiện trường — bản đồ đã có thêm một nơi để tìm.'}
                  </span>
                  {theXem.cau.dich === 'tra' && !theXem.cau.daTra && onMoTra ? (
                    <button
                      type="button"
                      className="btn btn--primary bang__xem-cau-tra"
                      onClick={() => {
                        const id = theXem.cau?.id;
                        setXem(null);
                        if (id) onMoTra(id);
                      }}
                    >
                      Mở màn tra
                    </button>
                  ) : null}
                </div>
              ) : theXem.loai === 'hoi' ? (
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

                {theXem.loaiNote && theXem.nguon ? (
                  <p className={`bang__xem-phan-loai ${lopGiayNguon(theXem.nguon)}`}>
                    <b>{theXem.loaiNote === 'su-that' ? 'Sự thật' : 'Manh mối'}</b> · {TEN_NGUON_NOTE[theXem.nguon]}
                    {theXem.daLenBang ? ' · đã đặt lên bảng chân lý' : ''}
                  </p>
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
  cau: 'Câu hỏi nối',
};
