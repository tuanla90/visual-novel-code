/**
 * LỀ SỔ MINH ANH (gói B19, mục 5.2): ở các lệnh `· tính vạch` của buổi chấm, góc trái có một mẩu lề sổ CLB; mỗi lần trình sai
 * Minh Anh gạch thêm một vạch nhỏ (vạch mới vẽ ra như nét bút). Không hiện con số — người chơi chỉ thấy các vạch. Có "câu n/m" thì
 * ghi trên mẩu lề.
 */
import { useEffect, useState } from 'react';
import { soundEngine } from '../../shared/audio/sound-engine';
import './b19.css';

/** Toạ độ một vạch thứ `i` (0-based) trong khung 44×(…): bốn vạch đứng rồi một vạch chéo gạch ngang, như đếm tay. */
function vachThu(i: number): { x1: number; y1: number; x2: number; y2: number } {
  const nhom = Math.floor(i / 5);
  const trong = i % 5;
  const y0 = 8 + nhom * 34;
  if (trong === 4) return { x1: 4, y1: y0 + 22, x2: 40, y2: y0 + 4 };
  const x = 8 + trong * 9;
  return { x1: x, y1: y0, x2: x - 2, y2: y0 + 26 };
}

/** Các vạch (SVG) — dùng ở lề sổ buổi họp và trang tổng kết. `moi`: vạch vừa gạch (vẽ ra). */
export function CacVach({ so, moi = -1, className = '' }: { so: number; moi?: number; className?: string }) {
  const cao = Math.max(40, 8 + Math.ceil(Math.max(so, 1) / 5) * 34);
  return (
    <svg className={`vach ${className}`} viewBox={`0 0 44 ${cao}`} aria-hidden="true" style={{ aspectRatio: `44 / ${cao}` }}>
      {Array.from({ length: so }, (_x, i) => {
        const v = vachThu(i);
        return <line key={i} className={`vach__net${i === moi ? ' is-moi' : ''}`} x1={v.x1} y1={v.y1} x2={v.x2} y2={v.y2} pathLength={1} />;
      })}
    </svg>
  );
}

export function LeSoVachMvp({ vach, cau }: { vach: number; cau?: { so: number; tong: number } }) {
  // Vạch vừa gạch (vẽ ra như nét bút): so với số vạch lần vẽ trước.
  const [truoc, setTruoc] = useState(vach);
  const [moi, setMoi] = useState(-1);
  if (vach !== truoc) {
    setTruoc(vach);
    setMoi(vach > truoc ? vach - 1 : -1);
  }
  useEffect(() => {
    if (moi >= 0) soundEngine.playSfx('page');
  }, [moi]);
  return (
    <aside className="le-so" role="img" aria-label={`Lề sổ của Minh Anh${cau ? `, câu ${cau.so} trên ${cau.tong}` : ''}${vach > 0 ? `: ${vach} vạch` : ': chưa có vạch'}`} title="Lề sổ CLB của Minh Anh">
      {cau ? (
        <span className="le-so__cau" aria-hidden="true">
          Câu {cau.so}/{cau.tong}
        </span>
      ) : null}
      <span className="le-so__giay" aria-hidden="true">
        <CacVach so={vach} moi={moi} />
      </span>
    </aside>
  );
}
