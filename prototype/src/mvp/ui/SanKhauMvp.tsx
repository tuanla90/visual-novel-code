/**
 * Sân khấu bản MVP: nền cảnh (ảnh art/mvp-vu1; bản tối ở cuối ngày nếu có) + dàn chân dung + nội dung.
 * Dùng lại lớp CSS `.stage*`, `.cast-member*`, `.portrait` của prototype; KHÔNG dùng `Stage` của prototype vì
 * component đó chỉ nhận `SceneId`/`CharacterId` đóng băng trong `shared/ids.ts`.
 * Dàn chân dung: nhân vật đã nói trong cảnh đứng lại (người đang nói sáng, người khác lùi nhẹ) — cùng luật
 * `visuals/cast.ts`; đổi cảnh thì dàn trống.
 * Người chơi (`player`, nam — QĐ-084) cũng lên dàn khi nói (user yêu cầu 29/09: có hình nhân vật chính ở các đoạn
 * nói chuyện), ảnh `char-nguoi-choi` (đã tách nền), nhãn là tên người chơi đặt ở màn tạo nhân vật.
 */
import { useState, type CSSProperties, type ReactNode } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { isCharacterId } from '../../shared/ids';
import { Portrait } from '../../shared/ui/Portrait';
import { useVnStore } from '../../shared/vn/vn-store';
import { anhChanDung, anhNen } from './anh-mvp';

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
  /** Tên người chơi (nhãn chân dung của `player`); rỗng → "Bạn". */
  tenNguoiChoi?: string;
  children?: ReactNode;
}

interface ThanhVien {
  nhanVat: string;
  bieuCam: string | undefined;
}
interface DanDien {
  canh: string;
  thanhVien: ThanhVien[];
}

/** Người nói lên dàn chân dung: người chơi, hoặc nhân vật có trong nhan-vat.md không "chỉ qua lời kể" (không phải `narrator`). */
function laNhanVatHien(kb: KichBanMvp, speaker: string | undefined): speaker is string {
  if (speaker === 'player') return true;
  if (!speaker || speaker === 'narrator') return false;
  const nv = kb.nhanVat.find((n) => n.id === speaker);
  return !!nv && !nv.chiQuaLoiKe;
}

function danKe(kb: KichBanMvp, truoc: DanDien | null, canh: string, speaker: string | undefined, expression: string | undefined): DanDien {
  let dan: DanDien = truoc && truoc.canh === canh ? truoc : { canh, thanhVien: [] };
  if (laNhanVatHien(kb, speaker)) {
    const co = dan.thanhVien.find((t) => t.nhanVat === speaker);
    const bieuCam = expression ?? co?.bieuCam;
    if (!co) dan = { canh, thanhVien: [...dan.thanhVien, { nhanVat: speaker, bieuCam }] };
    else if (co.bieuCam !== bieuCam) dan = { canh, thanhVien: dan.thanhVien.map((t) => (t.nhanVat === speaker ? { ...t, bieuCam } : t)) };
  }
  return dan;
}

/** Vị trí đứng theo số người (phong cách VN): 1 giữa; 2 hai bên; 3 đều; nhiều hơn chia đều. */
function viTri(soNguoi: number, i: number): number {
  if (soNguoi <= 1) return 0.5;
  if (soNguoi === 2) return i === 0 ? 0.35 : 0.65;
  if (soNguoi === 3) return [0.22, 0.5, 0.78][i] ?? 0.5;
  return 0.12 + (0.76 * i) / (soNguoi - 1);
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
  // Nhân vật có trong prototype (Tùng, Hà Vy, Minh Anh, Quân, Hoài, bác Thịnh): dùng Portrait (tách nền, nhép môi).
  if (isCharacterId(nhanVat)) {
    return <Portrait character={nhanVat} expression={bieuCam ?? nv?.bieuCam[0] ?? 'neutral'} talking={talking} />;
  }
  const url = anhChanDung(laNguoiChoi ? 'nguoi-choi' : nhanVat, bieuCam);
  return (
    <figure className="portrait portrait--normal mvp-portrait" role="img" aria-label={ten} data-art-source={url ? 'image' : 'placeholder'}>
      {url ? (
        <img className="portrait__img" src={url} alt="" draggable={false} />
      ) : (
        <div className="mvp-portrait__tam" aria-hidden="true">
          <span>{ten}</span>
        </div>
      )}
    </figure>
  );
}

export function SanKhauMvp({ kb, canh, dem = false, speaker, expression, shaking, coDan = true, tenNguoiChoi, children }: SanKhauMvpProps) {
  const [dan, setDan] = useState<DanDien>(() => danKe(kb, null, canh, speaker, expression));
  const moi = danKe(kb, dan, canh, speaker, expression);
  if (moi !== dan) setDan(moi);
  const lineTyping = useVnStore((s) => s.lineTyping);
  const nen = anhNen(canh, dem);
  const tenCanh = kb.canh.find((c) => c.id === canh)?.ten ?? 'Cảnh';

  return (
    <section className={`stage mvp-stage${shaking ? ' is-shaking' : ''}`} data-scene={canh} aria-label={`Cảnh: ${tenCanh}`}>
      <div className="stage__backdrop mvp-stage__backdrop" aria-hidden="true" data-art-source={nen ? 'image' : 'placeholder'}>
        {nen ? <img className="stage__backdrop-img" src={nen} alt="" draggable={false} /> : <div className="mvp-stage__nen-tam" />}
      </div>
      <div className="stage__scene-label">
        <svg className="stage__scene-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="12" cy="10" r="3" fill="#fffdf2" />
        </svg>
        <span className="stage__scene-text">{tenCanh}</span>
      </div>
      <div className="stage__portraits">
        {(coDan ? moi.thanhVien : []).map((t, i) => {
          const dangNoi = t.nhanVat === speaker;
          const pos = viTri(moi.thanhVien.length, i);
          const phai = pos > 0.5;
          const style = { '--cast-x': `${pos * 100}%` } as CSSProperties;
          return (
            <div
              key={t.nhanVat}
              className={`cast-member${dangNoi ? ' cast-member--speaking' : ' cast-member--idle'}${phai ? ' cast-member--side-right' : ' cast-member--side-left'}`}
              style={style}
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
