/**
 * Sân khấu bản MVP: nền cảnh (ảnh art/mvp-vu1; bản tối ở cuối ngày nếu có) + dàn chân dung + nội dung.
 * Dùng lại lớp CSS `.stage*`, `.cast-member*`, `.portrait` của prototype; KHÔNG dùng `Stage` của prototype vì
 * component đó chỉ nhận `SceneId`/`CharacterId` đóng băng trong `shared/ids.ts`.
 * Dàn chân dung: nhân vật đã nói trong cảnh đứng lại (người đang nói sáng, người khác lùi nhẹ) — cùng luật
 * `visuals/cast.ts`; đổi cảnh thì dàn trống. Tối đa 3 người (`TOI_DA_TREN_DAN`): người thứ tư nói thì người nói
 * lâu nhất trước đó rời dàn; 3 người thì mvp.css thu nhỏ chân dung để không ai bị cắt mép.
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
  /** Người đã rời dàn theo lệnh `[RA x]` của khung (`TrangThaiMvp.raDan`): không vẽ, trừ khi chính người đó đang nói. */
  raDan?: readonly string[];
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
  /** Thứ tự đứng trên dàn (trái → phải). */
  thanhVien: ThanhVien[];
  /** Người trên dàn theo lần nói gần nhất: đầu mảng = nói lâu nhất trước đó, cuối = vừa nói. */
  thuTuNoi: string[];
}

/** Tối đa bấy nhiêu người đứng trên dàn; người thứ tư nói → người nói lâu nhất trước đó rời dàn. */
export const TOI_DA_TREN_DAN = 3;

/** Cảnh nền kín, người chơi chỉ độc thoại trong lòng: không vẽ chân dung đứng chắn cảnh (xe buýt mở đầu). */
const CANH_KHONG_DAN: ReadonlySet<string> = new Set(['xe-buyt']);

/** Người nói lên dàn chân dung: người chơi, hoặc nhân vật có trong nhan-vat.md không "chỉ qua lời kể" (không phải `narrator`). */
function laNhanVatHien(kb: KichBanMvp, speaker: string | undefined): speaker is string {
  if (speaker === 'player') return true;
  if (!speaker || speaker === 'narrator') return false;
  const nv = kb.nhanVat.find((n) => n.id === speaker);
  return !!nv && !nv.chiQuaLoiKe;
}

/**
 * Dàn sau lời nói này. Không đổi gì → trả lại đúng `truoc` (để không setState vòng lặp).
 * Người mới nói khi dàn đã đủ `TOI_DA_TREN_DAN` người → người nói lâu nhất trước đó rời dàn, người mới đứng
 * vào đúng chỗ đó (người khác không xê dịch).
 */
function danKe(kb: KichBanMvp, truoc: DanDien | null, canh: string, speaker: string | undefined, expression: string | undefined, raDan: readonly string[] = []): DanDien {
  let dan: DanDien = truoc && truoc.canh === canh ? truoc : { canh, thanhVien: [], thuTuNoi: [] };
  // `[RA x]`: người đã rời cảnh xuống khỏi dàn (đang nói thì ở lại).
  const roi = (x: string): boolean => raDan.includes(x) && x !== speaker;
  if (dan.thanhVien.some((t) => roi(t.nhanVat))) dan = { canh, thanhVien: dan.thanhVien.filter((t) => !roi(t.nhanVat)), thuTuNoi: dan.thuTuNoi.filter((x) => !roi(x)) };
  if (!laNhanVatHien(kb, speaker)) return dan;
  const co = dan.thanhVien.find((t) => t.nhanVat === speaker);
  const bieuCam = expression ?? co?.bieuCam;
  let thanhVien = dan.thanhVien;
  if (!co) {
    const moi = { nhanVat: speaker, bieuCam };
    if (thanhVien.length >= TOI_DA_TREN_DAN) {
      const roi = dan.thuTuNoi[0] ?? thanhVien[0]?.nhanVat;
      thanhVien = thanhVien.map((t) => (t.nhanVat === roi ? moi : t));
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
  if (thanhVien === dan.thanhVien && thuTuNoi === dan.thuTuNoi) return dan;
  return { canh, thanhVien, thuTuNoi };
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

export function SanKhauMvp({ kb, canh, dem = false, speaker, expression, shaking, coDan = true, raDan, tenNguoiChoi, nhacViec, dienTen, isCard = false, dongHanh, children }: SanKhauMvpProps) {
  const [dan, setDan] = useState<DanDien>(() => danKe(kb, null, canh, speaker, expression, raDan));
  const moi = danKe(kb, dan, canh, speaker, expression, raDan);
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
      <div className="stage__portraits" data-so-nguoi={coDan && !CANH_KHONG_DAN.has(canh) && !coHoatCanh(canh) ? moi.thanhVien.length : 0}>
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
