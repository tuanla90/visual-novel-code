/**
 * Sân khấu bản MVP: nền cảnh (ảnh art/mvp-vu1; bản tối ở cuối ngày nếu có) + dàn chân dung + nội dung.
 * Dùng lại lớp CSS `.stage*`, `.cast-member*`, `.portrait` của prototype; KHÔNG dùng `Stage` của prototype vì
 * component đó chỉ nhận `SceneId`/`CharacterId` đóng băng trong `shared/ids.ts`.
 * Dàn chân dung: nhân vật đã nói trong cảnh đứng lại (người đang nói sáng, người khác lùi nhẹ) — cùng luật
 * `visuals/cast.ts`; đổi cảnh thì dàn trống. Hai hàng (gói B18): HÀNG TRƯỚC tối đa 3 người (`TOI_DA_TREN_DAN`) là những
 * người trong cuộc nói chuyện (`thamGia`) nói gần đây nhất; người thứ tư nói thì người nói lâu nhất trước đó LÙI xuống
 * HÀNG SAU (đứng lùi, nhỏ và tối hơn, không nhép môi) chứ không biến mất; hàng sau tối đa 3 (`TOI_DA_HANG_SAU`), dư thì
 * người cũ nhất rời hẳn; người hàng sau nói lại thì lên hàng trước. Người đang trên dàn mà không thuộc `thamGia` (chuỗi
 * mới không có lời của họ) cũng lùi hàng sau. `[RA x]` rời hẳn; đổi cảnh xóa cả hai hàng. 3 người hàng trước thì mvp.css
 * thu nhỏ chân dung để không ai bị cắt mép; màn dọc điện thoại ẩn hàng sau cho đỡ chật.
 * Người chơi (`player`, nam — QĐ-084) cũng lên dàn khi nói (user yêu cầu 29/09: có hình nhân vật chính ở các đoạn
 * nói chuyện), ảnh `char-nguoi-choi` (đã tách nền), nhãn là tên người chơi đặt ở màn tạo nhân vật.
 */
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { isCharacterId, isExpressionOf } from '../../shared/ids';
import { Portrait } from '../../shared/ui/Portrait';
import { useVnStore } from '../../shared/vn/vn-store';
import type { NhacViecMvp as NhacViec } from '../engine/trang-thai';
import { TalkOverlay } from '../../shared/ui/visuals/TalkOverlay';
import { anhChanDung, anhNen, anhSprite, anhTheoTen } from './anh-mvp';
import { boNhepMoiTheoUrl } from './nhep-moi-mvp';
import { HoatCanhMvp } from './HoatCanhMvp';
import { coHoatCanh } from './hoat-canh-mvp';
import { NhacViecMvp } from './NhacViecMvp';
import { DAO_CU_CANH } from './dao-cu-canh';

export interface SanKhauMvpProps {
  kb: KichBanMvp;
  canh: string;
  /** Cảnh cuối ngày → dùng nền tối nếu có. */
  dem?: boolean;
  speaker?: string;
  expression?: string;
  shaking?: boolean;
  /** `false` = không vẽ dàn chân dung (bản đồ / màn trong địa điểm phủ kín sân khấu). */
  coDan?: boolean;
  /**
   * Đang ở cảnh bấm (khám phá, bản đồ): dàn chân dung xóa trắng, cuộc nói chuyện kế bắt đầu với dàn trống. Model xem thử 06/10:
   * bấm sang chào Hà Vy mà Duy của cuộc nói chuyện trước vẫn đứng giữa hình.
   */
  xoaDan?: boolean;
  /**
   * Câu đang hiện là người chơi NGHĨ THẦM (chữ trong ngoặc đơn): không vì thế mà hình người chơi bước lên dàn. Đã đứng sẵn
   * (đang nói chuyện dở) thì ở lại. Model xem thử 06/10: hình người chơi chắn tờ giấy đang xem, đứng cạnh người chưa bắt chuyện.
   */
  nghi?: boolean;
  /** Người đã rời dàn theo lệnh `[RA x]` của khung (`TrangThaiMvp.raDan`): không vẽ, trừ khi chính người đó đang nói. */
  raDan?: readonly string[];
  /** Người được `[VÀO x]` đưa lên dàn dù chưa nói (`TrangThaiMvp.vaoDan`): đứng im, không sáng. */
  vaoDan?: readonly string[];
  /**
   * Gói B18: người có lời trong chuỗi đang chạy (xem `nguoiThamGia`), cộng `vaoDan`, trừ `raDan`. Ai đang trên dàn mà không
   * thuộc danh sách này thì lùi hàng sau. Bỏ trống / `null` = không biết, ai trên dàn cũng coi là đang tham gia.
   */
  thamGia?: readonly string[] | null;
  /** Tên người chơi (nhãn chân dung của `player`); rỗng → "Bạn". */
  tenNguoiChoi?: string;
  /** Việc đang làm do nhân vật nhắc — góc trên trái (nhãn địa điểm dời sang phải). Bỏ trống = không hiện. */
  nhacViec?: NhacViec | null;
  /** Điền `{{nv.…}}` cho câu nhắc việc. */
  dienTen?: (t: string) => string;
  /** Màn chuyển cảnh thời gian / địa điểm dạng thẻ chữ lớn điện ảnh: ẩn nhãn địa điểm, làm tối cảnh. */
  isCard?: boolean;
  dongHanh?: ReactNode;
  children?: ReactNode;
}

interface ThanhVien {
  nhanVat: string;
  bieuCam: string | undefined;
}
interface DanDien {
  canh: string;
  /** Hàng trước: thứ tự đứng trên dàn (trái → phải). */
  thanhVien: ThanhVien[];
  /** Người hàng trước theo lần nói gần nhất: đầu mảng = nói lâu nhất trước đó, cuối = vừa nói. */
  thuTuNoi: string[];
  /** Hàng sau (gói B18): đầu mảng = xuống lâu nhất, cuối = vừa xuống. Giữ biểu cảm cuối. */
  hangSau: ThanhVien[];
}

/** Tối đa bấy nhiêu người đứng HÀNG TRƯỚC; người thứ tư nói → người nói lâu nhất trước đó lùi hàng sau. */
export const TOI_DA_TREN_DAN = 3;
/** Tối đa bấy nhiêu người hàng sau; dư thì người xuống lâu nhất rời hẳn. */
export const TOI_DA_HANG_SAU = 3;

const danTrong = (canh: string): DanDien => ({ canh, thanhVien: [], thuTuNoi: [], hangSau: [] });

/** Người nói trong một lời (kể cả lời phản hồi) — cho `nguoiThamGia`. */
function nguoiTrongLoi(loi: readonly { speaker: string }[] | undefined): string[] {
  return (loi ?? []).map((l) => l.speaker);
}

/**
 * Gói B18: tập người có lời trong chuỗi `chuoi` (gồm lời trong phản hồi của `[HỎI]`, `[RẼ NHÁNH]`, `[ĐỐI CHẤT]`, nhân chứng của
 * `[HỎI ĐÁP]`) cộng `vaoDan`, trừ `raDan`. Không có chuỗi → `null` (sân khấu coi ai trên dàn cũng đang tham gia).
 */
export function nguoiThamGia(kb: KichBanMvp, chuoi: string | null | undefined, vaoDan: readonly string[] = [], raDan: readonly string[] = []): string[] | null {
  const c = chuoi ? kb.chuoi.find((x) => x.id === chuoi) : undefined;
  if (!c) return null;
  const co = new Set<string>();
  for (const n of c.nodes) {
    switch (n.type) {
      case 'line':
        co.add(n.speaker);
        break;
      case 'question':
        co.add(n.asker.speaker);
        for (const ch of n.choices) for (const x of nguoiTrongLoi(ch.feedback)) co.add(x);
        break;
      case 'branch':
        co.add(n.asker.speaker);
        break;
      case 'doi-chat':
        co.add(n.asker.speaker);
        for (const b of n.bangChung) for (const x of nguoiTrongLoi(b.feedback)) co.add(x);
        for (const x of [...nguoiTrongLoi(n.chuaDu), ...nguoiTrongLoi(n.khac), ...nguoiTrongLoi(n.hetLuot)]) co.add(x);
        break;
      case 'create-character':
        co.add(n.asker.speaker);
        break;
      case 'hoi-dap': {
        const nc = kb.hoiDap?.to[n.ma]?.nhanChung;
        if (nc) co.add(nc);
        break;
      }
      default:
        break;
    }
  }
  for (const x of vaoDan) co.add(x);
  for (const x of raDan) co.delete(x);
  return [...co];
}

/** Cảnh nền kín, người chơi chỉ độc thoại trong lòng: không vẽ chân dung đứng chắn cảnh (xe buýt mở đầu). */
const CANH_KHONG_DAN: ReadonlySet<string> = new Set(['xe-buyt']);

/** Người nói lên dàn chân dung: người chơi, hoặc nhân vật có trong nhan-vat.md không "chỉ qua lời kể" (không phải `narrator`). */
function laNhanVatHien(kb: KichBanMvp, speaker: string | undefined): speaker is string {
  if (speaker === 'player') return true;
  if (!speaker || speaker === 'narrator') return false;
  const nv = kb.nhanVat.find((n) => n.id === speaker);
  return !!nv && !nv.chiQuaLoiKe;
}

/** Đưa một người xuống cuối hàng sau (bỏ bản cũ của người đó nếu có); hàng sau dư `TOI_DA_HANG_SAU` thì người xuống lâu nhất rời hẳn. */
function xuongHangSau(hangSau: ThanhVien[], tv: ThanhVien): ThanhVien[] {
  return [...hangSau.filter((t) => t.nhanVat !== tv.nhanVat), tv].slice(-TOI_DA_HANG_SAU);
}

/**
 * Dàn sau lời nói này. Không đổi gì → trả lại đúng `truoc` (để không setState vòng lặp).
 * Người mới nói khi hàng trước đã đủ `TOI_DA_TREN_DAN` người → người nói lâu nhất trước đó lùi hàng sau, người mới đứng
 * vào đúng chỗ đó (người khác không xê dịch). Người hàng trước không thuộc `thamGia` (và không đang nói) cũng lùi hàng sau.
 */
function danKe(
  kb: KichBanMvp,
  truoc: DanDien | null,
  canh: string,
  speaker: string | undefined,
  expression: string | undefined,
  raDan: readonly string[] = [],
  nghi = false,
  vaoDan: readonly string[] = [],
  thamGia: readonly string[] | null = null,
): DanDien {
  let dan: DanDien = truoc && truoc.canh === canh ? truoc : danTrong(canh);
  const trenDan = (d: DanDien, x: string): boolean => d.thanhVien.some((t) => t.nhanVat === x) || d.hangSau.some((t) => t.nhanVat === x);
  // `[VÀO x]`: người chưa nói nhưng đang có mặt trong cuộc nói chuyện đứng vào dàn (đứng im); hàng trước kín thì đứng hàng sau.
  for (const x of vaoDan) {
    if (raDan.includes(x) || !laNhanVatHien(kb, x) || trenDan(dan, x)) continue;
    const tv = { nhanVat: x, bieuCam: undefined };
    dan =
      dan.thanhVien.length < TOI_DA_TREN_DAN
        ? { ...dan, thanhVien: [...dan.thanhVien, tv], thuTuNoi: [x, ...dan.thuTuNoi] }
        : { ...dan, hangSau: xuongHangSau(dan.hangSau, tv) };
  }
  // `[RA x]`: người đã rời cảnh xuống khỏi cả hai hàng (đang nói thì ở lại).
  const roi = (x: string): boolean => raDan.includes(x) && x !== speaker;
  if (dan.thanhVien.some((t) => roi(t.nhanVat)) || dan.hangSau.some((t) => roi(t.nhanVat))) {
    dan = { canh, thanhVien: dan.thanhVien.filter((t) => !roi(t.nhanVat)), thuTuNoi: dan.thuTuNoi.filter((x) => !roi(x)), hangSau: dan.hangSau.filter((t) => !roi(t.nhanVat)) };
  }
  // Người hàng trước không còn trong cuộc nói chuyện (chuỗi mới không có lời của họ) → lùi hàng sau, người nói lâu nhất xuống trước.
  if (thamGia) {
    const ngoai = (x: string): boolean => !thamGia.includes(x) && x !== speaker;
    if (dan.thanhVien.some((t) => ngoai(t.nhanVat))) {
      const thuTu = [...dan.thuTuNoi, ...dan.thanhVien.map((t) => t.nhanVat).filter((x) => !dan.thuTuNoi.includes(x))];
      let hangSau = dan.hangSau;
      for (const x of thuTu) {
        const tv = dan.thanhVien.find((t) => t.nhanVat === x);
        if (tv && ngoai(x)) hangSau = xuongHangSau(hangSau, tv);
      }
      dan = { canh, thanhVien: dan.thanhVien.filter((t) => !ngoai(t.nhanVat)), thuTuNoi: dan.thuTuNoi.filter((x) => !ngoai(x)), hangSau };
    }
  }
  if (!laNhanVatHien(kb, speaker)) return dan;
  const co = dan.thanhVien.find((t) => t.nhanVat === speaker);
  if (nghi && speaker === 'player' && !co) return dan;
  const oSau = dan.hangSau.find((t) => t.nhanVat === speaker);
  const bieuCam = expression ?? co?.bieuCam ?? oSau?.bieuCam;
  let thanhVien = dan.thanhVien;
  let hangSau = dan.hangSau;
  if (!co) {
    const moi = { nhanVat: speaker, bieuCam };
    if (oSau) hangSau = hangSau.filter((t) => t.nhanVat !== speaker);
    if (thanhVien.length >= TOI_DA_TREN_DAN) {
      const lui = dan.thuTuNoi[0] ?? thanhVien[0]?.nhanVat;
      const tvLui = thanhVien.find((t) => t.nhanVat === lui);
      thanhVien = thanhVien.map((t) => (t.nhanVat === lui ? moi : t));
      if (tvLui) hangSau = xuongHangSau(hangSau, tvLui);
    } else {
      thanhVien = [...thanhVien, moi];
    }
  } else if (co.bieuCam !== bieuCam) {
    thanhVien = thanhVien.map((t) => (t.nhanVat === speaker ? { ...t, bieuCam } : t));
  }
  const thuTuNoi =
    dan.thuTuNoi[dan.thuTuNoi.length - 1] === speaker
      ? dan.thuTuNoi
      : [...dan.thuTuNoi.filter((x) => x !== speaker && thanhVien.some((t) => t.nhanVat === x)), speaker];
  if (thanhVien === dan.thanhVien && thuTuNoi === dan.thuTuNoi && hangSau === dan.hangSau) return dan;
  return { canh, thanhVien, thuTuNoi, hangSau };
}

/**
 * Vị trí đứng theo số người (phong cách VN): 1 giữa; 2 hai bên; 3 đều (khung ngang). Màn dọc: 3 người thì
 * mvp.css đặt lại vị trí theo `data-vi-tri` (một phần ba mỗi người).
 */
function viTri(soNguoi: number, i: number): number {
  if (soNguoi <= 1) return 0.5;
  if (soNguoi === 2) return i === 0 ? 0.35 : 0.65;
  return [0.22, 0.5, 0.78][i] ?? 0.5;
}

/**
 * Vị trí hàng sau (gói B18) theo số người hàng trước và hàng sau: đứng ở khe giữa hai người hàng trước hoặc hai mép, không che
 * mặt hàng trước. Người thứ `i` của hàng sau (0 = xuống lâu nhất) đứng từ trái sang.
 */
export function viTriHangSau(soTruoc: number, soSau: number, i: number): number {
  const bang: Record<number, Record<number, number[]>> = {
    0: { 1: [0.5], 2: [0.35, 0.65], 3: [0.22, 0.5, 0.78] },
    1: { 1: [0.18], 2: [0.18, 0.82], 3: [0.14, 0.5, 0.86] },
    2: { 1: [0.5], 2: [0.1, 0.9], 3: [0.1, 0.5, 0.9] },
    3: { 1: [0.36], 2: [0.06, 0.94], 3: [0.06, 0.5, 0.94] },
  };
  const hang = bang[Math.min(3, Math.max(0, soTruoc))] ?? bang[3];
  return (hang?.[Math.min(3, Math.max(1, soSau))] ?? [0.5])[i] ?? 0.5;
}

function ChanDungMvp({
  kb,
  nhanVat,
  bieuCam,
  talking,
  tenNguoiChoi,
}: {
  kb: KichBanMvp;
  nhanVat: string;
  bieuCam: string | undefined;
  talking: boolean;
  tenNguoiChoi: string | undefined;
}) {
  const laNguoiChoi = nhanVat === 'player';
  const nv = kb.nhanVat.find((n) => n.id === nhanVat);
  const ten = laNguoiChoi ? tenNguoiChoi || 'Bạn' : (nv?.ten ?? 'Nhân vật');
  // Nhân vật có trong prototype (Tùng, Hà Vy, Minh Anh, Quân, Hoài, bác Thịnh): dùng Portrait (tách nền, nhép môi)
  // — trừ khi biểu cảm là biểu cảm riêng của MVP (ngoài `CHARACTER_EXPRESSIONS`, vd Tùng `worried`) và có ảnh
  // `char-<mã>-<biểu cảm>` riêng: ô ảnh của prototype không biết biểu cảm đó (sẽ mượn ảnh neo), nên vẽ thẳng ảnh MVP.
  // Ảnh MVP cùng khung 768×1360 với ảnh neo → nhân vật không nhảy chỗ khi đổi biểu cảm.
  let url: string | undefined;
  if (isCharacterId(nhanVat)) {
    const bc = bieuCam ?? nv?.bieuCam[0] ?? 'neutral';
    url = isExpressionOf(nhanVat, bc) ? undefined : anhTheoTen(`char-${nhanVat}-${bc}`);
    if (!url) return <Portrait character={nhanVat} expression={bc} talking={talking} />;
  } else {
    url = anhChanDung(laNguoiChoi ? 'nguoi-choi' : nhanVat, bieuCam);
  }
  // Ảnh riêng của MVP có bộ miếng (nhep-moi-mvp.ts) → nhép môi + chớp mắt như Portrait; mặt nạ alpha là chính ảnh PNG đã tách nền.
  const rig = boNhepMoiTheoUrl(url);
  return (
    <figure className="portrait portrait--normal mvp-portrait" role="img" aria-label={ten} data-art-source={url ? 'image' : 'placeholder'}>
      {url ? (
        <>
          <img className="portrait__img" src={url} alt="" draggable={false} />
          {rig ? <TalkOverlay rig={rig} talking={talking} cutoutSrc={url} /> : null}
        </>
      ) : (
        <div className="mvp-portrait__tam" aria-hidden="true">
          <span>{ten}</span>
        </div>
      )}
    </figure>
  );
}

export function SanKhauMvp({ kb, canh, dem = false, speaker, expression, shaking, coDan = true, xoaDan = false, raDan, vaoDan, thamGia = null, nghi = false, tenNguoiChoi, nhacViec, dienTen, isCard = false, dongHanh, children }: SanKhauMvpProps) {
  const [dan, setDan] = useState<DanDien>(() => danKe(kb, null, canh, speaker, expression, raDan, nghi, vaoDan, thamGia));
  const moi = xoaDan
    ? dan.thanhVien.length === 0 && dan.hangSau.length === 0 && dan.canh === canh
      ? dan
      : danTrong(canh)
    : danKe(kb, dan, canh, speaker, expression, raDan, nghi, vaoDan, thamGia);
  if (moi !== dan) setDan(moi);
  const lineTyping = useVnStore((s) => s.lineTyping);
  const nen = anhNen(canh, dem);
  const tenCanh = kb.canh.find((c) => c.id === canh)?.ten ?? 'Cảnh';
  const [diaDiem, setDiaDiem] = useState({ canh, mo: false });
  if (diaDiem.canh !== canh) setDiaDiem({ canh, mo: false });
  const moDiaDiem = diaDiem.canh === canh && diaDiem.mo;

  useEffect(() => {
    if (!moDiaDiem) return;
    const timer = setTimeout(() => setDiaDiem({ canh, mo: false }), 3500);
    return () => clearTimeout(timer);
  }, [canh, moDiaDiem]);

  const daoCu = coDan ? DAO_CU_CANH[canh] : undefined;

  return (
    <section className={`stage mvp-stage${shaking ? ' is-shaking' : ''}${nhacViec ? ' co-nhac' : ''}${isCard ? ' is-the-chu' : ''}`} data-scene={canh} aria-label={`Cảnh: ${tenCanh}`}>
      <div className="stage__backdrop mvp-stage__backdrop" aria-hidden="true" data-art-source={nen ? 'image' : 'placeholder'}>
        {coHoatCanh(canh) ? (
          <HoatCanhMvp key={canh} canh={canh} />
        ) : nen ? (
          daoCu && daoCu.length > 0 ? (
            <div className="mvp-stage__lop-canh">
              <img className="stage__backdrop-img" src={nen} alt="" draggable={false} />
              {daoCu.map((dc) => {
                const url = anhSprite(dc.sprite);
                if (!url) return null;
                return (
                  <img
                    key={dc.sprite}
                    className="mvp-stage__dao-cu"
                    src={url}
                    alt=""
                    draggable={false}
                    style={{
                      left: `${dc.x}%`,
                      top: `${dc.y}%`,
                      width: `${dc.rong}%`,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <img className="stage__backdrop-img" src={nen} alt="" draggable={false} />
          )
        ) : (
          <div className="mvp-stage__nen-tam" />
        )}
      </div>
      {!isCard ? (
        <div className="mvp-stage__canh-trai">
        <button
          type="button"
          className={`stage__scene-label stage__scene-label--btn${moDiaDiem ? ' is-expanded' : ''}`}
          onClick={() => setDiaDiem({ canh, mo: !moDiaDiem })}
          aria-label={`Địa điểm: ${tenCanh}`}
          aria-expanded={moDiaDiem}
          title={`Địa điểm: ${tenCanh}`}
        >
          <svg className="stage__scene-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="12" cy="10" r="3" fill="#fffdf2" />
          </svg>
          <span className="stage__scene-text">{tenCanh}</span>
        </button>
        {nhacViec ? <NhacViecMvp kb={kb} nhac={nhacViec} dienTen={dienTen ?? ((t) => t)} tenNguoiChoi={tenNguoiChoi} /> : null}
        </div>
      ) : null}
      {!isCard && dongHanh ? <div className="mvp-stage__canh-ban">{dongHanh}</div> : null}
      {/* Cảnh có hoạt cảnh: nhân vật đã nằm trong ảnh tách lớp, không vẽ thêm nhân vật đứng (hộp thoại vẫn ghi tên người nói). */}
      <div className="stage__portraits" data-so-nguoi={coDan && !CANH_KHONG_DAN.has(canh) && !coHoatCanh(canh) ? moi.thanhVien.length : 0} data-so-hang-sau={coDan && !CANH_KHONG_DAN.has(canh) && !coHoatCanh(canh) ? moi.hangSau.length : 0}>
        {/* Hàng sau (gói B18): đứng lùi, nhỏ và tối hơn, không nhép môi, giữ biểu cảm cuối; vẽ trước để nằm dưới hàng trước. */}
        {(coDan && !CANH_KHONG_DAN.has(canh) && !coHoatCanh(canh) ? moi.hangSau : []).map((t, i) => {
          const pos = viTriHangSau(moi.thanhVien.length, moi.hangSau.length, i);
          const phai = pos > 0.5;
          const style = { '--cast-x': `${pos * 100}%` } as CSSProperties;
          return (
            <div
              key={t.nhanVat}
              className={`cast-member cast-member--idle cast-member--hang-sau${phai ? ' cast-member--side-right' : ' cast-member--side-left'}`}
              style={style}
              data-nhan-vat={t.nhanVat}
              data-hang="sau"
              data-vi-tri={i}
              data-speaking="false"
            >
              <ChanDungMvp kb={kb} nhanVat={t.nhanVat} bieuCam={t.bieuCam} talking={false} tenNguoiChoi={tenNguoiChoi} />
            </div>
          );
        })}
        {(coDan && !CANH_KHONG_DAN.has(canh) && !coHoatCanh(canh) ? moi.thanhVien : []).map((t, i) => {
          const dangNoi = t.nhanVat === speaker;
          const pos = viTri(moi.thanhVien.length, i);
          const phai = pos > 0.5;
          const style = { '--cast-x': `${pos * 100}%` } as CSSProperties;
          return (
            <div
              key={t.nhanVat}
              className={`cast-member${dangNoi ? ' cast-member--speaking' : ' cast-member--idle'}${phai ? ' cast-member--side-right' : ' cast-member--side-left'}`}
              style={style}
              data-nhan-vat={t.nhanVat}
              data-hang="truoc"
              data-vi-tri={i}
              data-speaking={dangNoi ? 'true' : 'false'}
            >
              <ChanDungMvp kb={kb} nhanVat={t.nhanVat} bieuCam={t.bieuCam} talking={dangNoi && lineTyping} tenNguoiChoi={tenNguoiChoi} />
            </div>
          );
        })}
      </div>
      <div className="stage__content">{children}</div>
    </section>
  );
}
