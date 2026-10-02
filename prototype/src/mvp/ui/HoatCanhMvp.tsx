/**
 * HOẠT CẢNH KIỂU TRUYỆN TRANH ĐỘNG (user chốt 02/10/2026, mẫu: cảnh cắt 2D của inFAMOUS): ảnh tĩnh tách lớp, nhân vật GIỮ NGUYÊN
 * DÁNG và trượt trên nền; nền trôi chậm hơn; thêm vệt tốc độ, đèn pin chớp, tiếng bước chân. Không dùng video (video AI ra nét 3D).
 *
 * Một cảnh có hoạt cảnh khi mã cảnh có trong `HOAT_CANH`: sân khấu vẽ thành phần này thay cho ảnh nền tĩnh. Ảnh nền là
 * `bg-mvp-<mã cảnh>` (không có nhân vật); mỗi lớp nhân vật là một ảnh cắt nền trong `src/assets/mvp/hoat-canh/`, đặt theo % của
 * ảnh nền (số do `art/nguon/.../xu-ly-3.py` in ra). Chuyển động khai bằng biến CSS, chạy bằng keyframes trong mvp.css.
 * Người chơi bật "giảm chuyển động" thì các lớp đứng yên ở vị trí đầu.
 */
import { useEffect, type CSSProperties } from 'react';
import { soundEngine } from '../../shared/audio/sound-engine';
import { anhNen, anhTheoTen } from './anh-mvp';
import { HOAT_CANH, type LopHoatCanh } from './hoat-canh-mvp';


export function HoatCanhMvp({ canh }: { canh: string }) {
  const hc = HOAT_CANH[canh];
  const nen = anhNen(canh);

  useEffect(() => {
    if (!hc?.buocChan) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let chan = 0;
    const id = window.setInterval(() => soundEngine.playBuocChan((chan += 1) % 2 === 0), hc.buocChan);
    // Hết hoạt cảnh thì thôi tiếng chân (người chơi còn đọc lời / chọn đường).
    const het = window.setTimeout(() => window.clearInterval(id), hc.giay * 1000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(het);
    };
  }, [hc]);

  if (!hc || !nen) return null;
  const veLop = (l: LopHoatCanh) => {
    const url = anhTheoTen(l.anh);
    if (!url) return null;
    const [sangDau, sangSau] = l.sang ?? [1, 1];
    const kieu = { left: `${l.trai}%`, top: `${l.tren}%`, width: `${l.rong}%`, '--hc-dx': `${l.dx}cqw`, '--hc-dy': `${l.dy}cqh`, '--hc-co': String(l.co), '--hc-tre': `${l.tre ?? 0}s`, '--hc-sang-dau': String(sangDau), '--hc-sang-sau': String(sangSau), '--hc-sang-luc': `${l.sangLuc ?? 0}s` } as CSSProperties;
    return (
      <div key={l.anh} className="mvp-hc__lop" style={kieu}>
        <img className="mvp-hc__nv" src={url} alt="" draggable={false} />
      </div>
    );
  };
  const bien = { '--hc-ti-le': String(hc.tiLe), '--hc-tam-x': `${hc.tam[0]}%`, '--hc-tam-y': `${hc.tam[1]}%`, '--hc-phong': String(hc.phong), '--hc-giay': `${hc.giay}s` } as CSSProperties;
  return (
    <div className="mvp-hc" style={bien} data-hoat-canh={canh}>
      <div className="mvp-hc__khung">
        <div className="mvp-hc__nen">
          <img className="stage__backdrop-img" src={nen} alt="" draggable={false} />
          {hc.den ? <span className="mvp-hc__den" style={{ left: `${hc.den[0]}%`, top: `${hc.den[1]}%` }} /> : null}
        </div>
        {hc.lop.filter((l) => !l.tienCanh).map(veLop)}
        {hc.chum ? (
          <div className="mvp-hc__chum" style={{ left: `${hc.chum.x}%`, top: `${hc.chum.y}%`, '--hc-chum-tu': `${hc.chum.tu}deg`, '--hc-chum-den': `${hc.chum.den}deg`, '--hc-chum-giay': `${hc.chum.giay}s` } as CSSProperties} />
        ) : null}
        {hc.lop.filter((l) => l.tienCanh).map(veLop)}
        {hc.vetTocDo ? <div className="mvp-hc__vet" /> : null}
      </div>
      <div className="mvp-hc__vien" />
    </div>
  );
}
