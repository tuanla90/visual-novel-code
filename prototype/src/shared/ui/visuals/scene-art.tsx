/**
 * Nền cảnh VẼ TẠM bằng SVG (QĐ-060) theo bộ prompt của user `prompts-background-prototype-v0.1.md`:
 * 16:9, không người, không chữ, không logo; vật kể chuyện nằm trong 70% giữa; 35% dưới để trống
 * cho nhân vật + hộp thoại; nền nhạt, ít tương phản hơn nhân vật. Hệ tọa độ 1600×900 (= 2560×1440
 * thu nhỏ), phủ kín sân khấu kiểu `object-fit: cover`, neo giữa — giống hệt ảnh thật khi thay.
 */
import type { ReactElement } from 'react';
import type { SceneId } from '../../ids';
import { HEARING_ROOM_SCREEN, SCENE_VIEWBOX } from './scene-geometry';

/** Đường gạch lát nền phối cảnh: các đường hội tụ về điểm tụ + các hàng ngang giãn dần. */
function FloorGrid({ vx, top, color, rows, cols }: { vx: number; top: number; color: string; rows: number[]; cols: number }) {
  const lines: ReactElement[] = [];
  for (let i = -cols; i <= cols; i++) {
    const xBottom = 800 + i * 150;
    const xTop = vx + (xBottom - vx) * 0.35;
    lines.push(<line key={`c${i}`} x1={xTop} y1={top} x2={xBottom} y2={900} />);
  }
  rows.forEach((y) => lines.push(<line key={`r${y}`} x1={0} y1={y} x2={1600} y2={y} />));
  return (
    <g stroke={color} strokeWidth={2} opacity={0.7}>
      {lines}
    </g>
  );
}

/** Tán phượng: cụm lá xanh + chùm hoa đỏ nhạt (dùng ở cửa sổ phòng CLB và hành lang). */
function FlamboyantCanopy({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const leaves = [
    [0, 0, 120, 60],
    [110, -20, 110, 55],
    [-90, 30, 100, 50],
    [60, 60, 130, 50],
  ] as const;
  const blossoms = [
    [-40, -10, 34],
    [40, 10, 30],
    [120, -30, 28],
    [150, 40, 26],
    [-100, 40, 24],
    [10, 55, 28],
    [80, -45, 22],
  ] as const;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {leaves.map(([dx, dy, rx, ry], i) => (
        <ellipse key={`l${i}`} cx={dx} cy={dy} rx={rx} ry={ry} fill={i % 2 ? '#a9c49b' : '#b7ceaa'} />
      ))}
      {blossoms.map(([dx, dy, r], i) => (
        <circle key={`b${i}`} cx={dx} cy={dy} r={r} fill={i % 2 ? '#dd8a74' : '#d9735e'} opacity={0.85} />
      ))}
    </g>
  );
}

/** Tờ giấy trống ghim trên bảng (không chữ; chỉ vạch mờ gợi dòng). */
function PinnedPaper({ x, y, w, h, rotate, pin }: { x: number; y: number; w: number; h: number; rotate: number; pin: string }) {
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x} y={y} width={w} height={h} fill="#fbf6ea" stroke="#e3d5b8" strokeWidth={2} />
      {[0.35, 0.55, 0.75].map((f) => (
        <line key={f} x1={x + w * 0.15} y1={y + h * f} x2={x + w * 0.85} y2={y + h * f} stroke="#eadfc8" strokeWidth={4} />
      ))}
      <circle cx={x + w / 2} cy={y + 10} r={7} fill={pin} />
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// Phòng CLB: kem ấm, gỗ mật ong, xanh ngọc nhạt, điểm đỏ phượng; nắng chiều qua cửa sổ.
// ---------------------------------------------------------------------------------------------
function ClubRoomArt() {
  return (
    <>
      <defs>
        <linearGradient id="art-club-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcece6" />
          <stop offset="1" stopColor="#f7ecd2" />
        </linearGradient>
        <linearGradient id="art-club-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3d1" stopOpacity={0.55} />
          <stop offset="1" stopColor="#fff3d1" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Tường, trần, dầm */}
      <rect width={1600} height={900} fill="#f4e7cd" />
      <rect width={1600} height={64} fill="#efdfbf" />
      <rect y={60} width={1600} height={16} fill="#e3cfa6" />
      <rect y={470} width={1600} height={86} fill="#ecdab6" />
      <rect y={552} width={1600} height={10} fill="#caa877" />
      {/* Quạt trần gắn đúng dầm giữa */}
      <g fill="#d9c8a6">
        <rect x={796} y={76} width={8} height={40} />
        <ellipse cx={800} cy={120} rx={22} ry={10} fill="#cdb993" />
        <ellipse cx={730} cy={124} rx={70} ry={8} />
        <ellipse cx={870} cy={124} rx={70} ry={8} />
      </g>
      {/* Cửa sổ khung nhôm + tán phượng ngoài trời */}
      <rect x={100} y={122} width={430} height={318} fill="#d8d6cf" />
      <rect x={112} y={134} width={406} height={294} fill="url(#art-club-sky)" />
      <rect x={112} y={300} width={406} height={128} fill="#ece2cc" opacity={0.7} />
      <FlamboyantCanopy x={250} y={200} />
      <g fill="#d8d6cf">
        <rect x={309} y={134} width={12} height={294} />
        <rect x={112} y={262} width={406} height={10} />
      </g>
      <rect x={90} y={436} width={450} height={14} fill="#e5d4b0" />
      {/* Vệt nắng chiều */}
      <polygon points="118,440 520,440 900,900 300,900" fill="url(#art-club-light)" />
      {/* Kệ sách thấp mở */}
      <g>
        <rect x={570} y={392} width={250} height={164} fill="#c99a5e" />
        <rect x={582} y={404} width={226} height={64} fill="#b0824b" />
        <rect x={582} y={480} width={226} height={64} fill="#b0824b" />
        {[
          [592, '#9cc5bb'],
          [616, '#e9dab8'],
          [640, '#c9786a'],
          [664, '#e9dab8'],
          [700, '#9cc5bb'],
          [724, '#d8c7a3'],
        ].map(([x, c]) => (
          <rect key={`f1-${x}`} x={Number(x)} y={414} width={20} height={54} fill={String(c)} />
        ))}
        {[
          [596, '#e9dab8'],
          [620, '#e9dab8'],
          [660, '#9cc5bb'],
          [684, '#d8c7a3'],
          [740, '#e9dab8'],
          [764, '#9cc5bb'],
        ].map(([x, c]) => (
          <rect key={`f2-${x}`} x={Number(x)} y={490} width={20} height={54} fill={String(c)} />
        ))}
      </g>
      {/* Bảng nguyên tắc bằng bần: giấy trống + ghim, một sợi chỉ đỏ nối hai tờ */}
      <rect x={920} y={140} width={330} height={236} rx={6} fill="#b98f5b" />
      <rect x={932} y={152} width={306} height={212} fill="#d8b884" />
      <PinnedPaper x={952} y={172} w={80} h={100} rotate={-3} pin="#c8513f" />
      <PinnedPaper x={1052} y={168} w={90} h={70} rotate={2} pin="#6fa89e" />
      <PinnedPaper x={1160} y={180} w={62} h={86} rotate={-1} pin="#c8513f" />
      <PinnedPaper x={1070} y={258} w={110} h={82} rotate={1} pin="#6fa89e" />
      <polyline points="992,182 1115,268 1191,190" fill="none" stroke="#c8513f" strokeWidth={3} opacity={0.7} />
      {/* Tủ hồ sơ văn phòng thấp: cánh mở + ngăn kéo */}
      <g>
        <rect x={1300} y={366} width={200} height={190} rx={4} fill="#bcd0cb" />
        <rect x={1312} y={380} width={84} height={96} fill="#c9dad5" />
        <rect x={1404} y={380} width={84} height={96} fill="#c9dad5" />
        <rect x={1312} y={488} width={176} height={26} fill="#c9dad5" />
        <rect x={1312} y={520} width={176} height={26} fill="#c9dad5" />
        <g fill="#8fa9a3">
          <rect x={1386} y={416} width={5} height={26} />
          <rect x={1409} y={416} width={5} height={26} />
          <rect x={1380} y={498} width={40} height={5} />
          <rect x={1380} y={530} width={40} height={5} />
        </g>
        <rect x={1320} y={340} width={60} height={26} fill="#e9dab8" />
        <rect x={1386} y={346} width={46} height={20} fill="#c9786a" />
      </g>
      {/* Tủ đựng đồ có khóa sát mép phải (bị cắt khi màn hẹp — không chứa vật kể chuyện) */}
      <rect x={1520} y={250} width={100} height={306} fill="#d3c09c" />
      <rect x={1532} y={262} width={88} height={282} fill="#dccbaa" />
      {/* Sàn gạch men */}
      <rect y={562} width={1600} height={338} fill="#e7d4b0" />
      <FloorGrid vx={800} top={562} color="#dbc49a" rows={[600, 652, 722, 812]} cols={7} />
      {/* Ghế sau bàn (lưng ghế nhựa đúc xanh ngọc) */}
      {[560, 760, 960].map((x) => (
        <g key={`chair-${x}`}>
          <rect x={x} y={470} width={96} height={86} rx={22} fill="#9fc6bc" />
          <rect x={x + 10} y={480} width={76} height={60} rx={16} fill="#afd1c8" />
        </g>
      ))}
      {/* Bàn seminar ghép hai bàn: mặt gỗ mật ong, chân thép sơn tĩnh điện */}
      <polygon points="420,548 1180,548 1262,626 338,626" fill="#d4a86c" />
      <line x1={800} y1={548} x2={800} y2={626} stroke="#c49656" strokeWidth={3} />
      <rect x={338} y={626} width={924} height={22} fill="#b8864a" />
      <g fill="#a39d92">
        <rect x={356} y={648} width={14} height={92} />
        <rect x={1230} y={648} width={14} height={92} />
        <rect x={792} y={648} width={14} height={80} />
      </g>
      {/* Đồ trên bàn: laptop, giấy trống, bìa hồ sơ, cốc */}
      <polygon points="700,560 800,560 792,506 708,506" fill="#c7cdd0" />
      <polygon points="690,562 812,562 822,574 680,574" fill="#b3babd" />
      <rect x={880} y={570} width={96} height={40} fill="#fbf6ea" transform="rotate(-4 928 590)" />
      <rect x={520} y={572} width={110} height={36} fill="#9cc5bb" transform="rotate(3 575 590)" />
      <rect x={540} y={566} width={96} height={34} fill="#fbf6ea" transform="rotate(-2 588 583)" />
      <rect x={1040} y={560} width={26} height={30} rx={4} fill="#c9786a" />
      {/* Ánh chiều ấm phủ nhẹ toàn cảnh */}
      <rect width={1600} height={900} fill="#ffb454" opacity={0.05} />
    </>
  );
}

// ---------------------------------------------------------------------------------------------
// Hành lang giảng đường B: bê tông kem nhạt, gạch xám mát, xanh công sở nhạt, sáng ngày dịu sau
// mưa; hộp góp ý gắn ở cột trong vùng giữa.
// ---------------------------------------------------------------------------------------------
function HallwayArt() {
  const vx = 780;
  return (
    <>
      <defs>
        <linearGradient id="art-hall-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe2ec" />
          <stop offset="1" stopColor="#eef3f1" />
        </linearGradient>
      </defs>
      {/* Bầu trời + tòa nhà khoa phía xa + mái nhà xe */}
      <rect width={1600} height={900} fill="url(#art-hall-sky)" />
      <rect x={940} y={170} width={560} height={300} fill="#e6e0d2" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => (
          <rect key={`w${r}-${c}`} x={966 + c * 88} y={194 + r * 66} width={56} height={38} fill="#cfdad8" />
        )),
      )}
      <polygon points="930,470 1600,430 1600,470 930,500" fill="#b9c4c6" />
      <FlamboyantCanopy x={1290} y={250} scale={1.25} />
      <rect x={1270} y={300} width={22} height={200} fill="#a89a86" />
      {/* Trần + dầm + đèn tuýp gắn giữa các dầm */}
      <polygon points="0,0 1600,0 1600,70 900,300 700,300" fill="#ece6d8" />
      {[0.15, 0.4, 0.7].map((t, i) => {
        const y = 300 - (300 - 0) * t;
        const xl = vx - (vx - 0) * (1 - (y / 300) * 0.9);
        return <rect key={`beam${i}`} x={xl} y={y} width={1600} height={16 + t * 30} fill="#e0d8c6" />;
      })}
      <rect x={330} y={120} width={220} height={14} rx={6} fill="#fbfaf4" />
      <rect x={640} y={232} width={120} height={9} rx={4} fill="#fbfaf4" />
      {/* Tường trái: bê tông kem, cửa giảng đường rộng xanh công sở, bảng tin giấy trống */}
      <polygon points="0,0 700,300 700,520 0,900" fill="#ebe3d1" />
      <polygon points="0,580 700,470 700,520 0,900" fill="#e1d6bf" />
      <polygon points="70,236 250,300 250,640 70,700" fill="#a9bfb0" />
      <polygon points="84,252 236,308 236,634 84,688" fill="#b7cbbd" />
      <line x1={160} y1={276} x2={160} y2={664} stroke="#9bb3a3" strokeWidth={4} />
      <polygon points="470,366 580,392 580,546 470,560" fill="#a9bfb0" />
      <polygon points="300,330 430,358 430,440 300,428" fill="#d9b989" />
      <polygon points="314,344 360,354 360,410 314,404" fill="#fbf6ea" />
      <polygon points="370,356 418,366 418,420 370,414" fill="#fbf6ea" />
      {/* Biển chỉ dẫn/phòng không chữ */}
      <polygon points="270,250 330,266 330,290 270,276" fill="#9cb5c2" />
      {/* Nền gạch chống trơn, vệt phản chiếu sau mưa nhẹ */}
      <polygon points="0,900 1600,900 1600,560 900,520 700,520" fill="#d9dee0" />
      <FloorGrid vx={vx} top={520} color="#c9d0d3" rows={[560, 620, 700, 800]} cols={6} />
      <polygon points="880,560 960,560 1080,900 900,900" fill="#eef1f2" opacity={0.6} />
      {/* Lan can ngang hông (tường thấp + tay vịn) phía mở */}
      <polygon points="900,520 1600,560 1600,640 900,560" fill="#e3dccb" />
      <polygon points="900,512 1600,548 1600,560 900,520" fill="#b8c1bd" />
      {/* Cột vuông kết cấu; hộp góp ý kim loại gắn ở cột gần, nhãn trống */}
      <rect x={880} y={296} width={40} height={250} fill="#e4dccb" />
      <rect x={1080} y={180} width={130} height={560} fill="#ece4d3" />
      <rect x={1080} y={180} width={16} height={560} fill="#ddd3bf" />
      <rect x={1440} y={0} width={180} height={900} fill="#e8dfcd" />
      <rect x={1440} y={0} width={20} height={900} fill="#d9ceb8" />
      <g>
        <rect x={1100} y={378} width={96} height={104} rx={6} fill="#7f9c8c" />
        <rect x={1100} y={378} width={96} height={20} rx={6} fill="#6f8c7c" />
        <rect x={1118} y={404} width={60} height={7} rx={3} fill="#3e5347" />
        <rect x={1122} y={424} width={52} height={24} rx={3} fill="#f1ece0" />
        <circle cx={1148} cy={464} r={5} fill="#c9c3b3" />
      </g>
      {/* Ánh ngày mát phủ nhẹ */}
      <rect width={1600} height={900} fill="#dfeaf0" opacity={0.08} />
    </>
  );
}

// ---------------------------------------------------------------------------------------------
// Phòng giải trình: xanh xám lạnh, kem nhạt, xanh than nhạt, gỗ óc chó; màn chiếu TRỐNG ở giữa
// (giao diện truy vấn chồng lên bằng code — vùng `HEARING_ROOM_SCREEN`).
// ---------------------------------------------------------------------------------------------
function HearingRoomArt() {
  const s = HEARING_ROOM_SCREEN;
  const sx = s.x0 * 1600;
  const sy = s.y0 * 900;
  const sw = (s.x1 - s.x0) * 1600;
  const sh = (s.y1 - s.y0) * 900;
  return (
    <>
      <rect width={1600} height={900} fill="#d3dbe3" />
      <rect width={1600} height={40} fill="#e3e8ed" />
      <rect y={500} width={1600} height={60} fill="#c7d0da" />
      {/* Rèm lá dọc hai bên */}
      {[0, 1].map((side) => (
        <g key={`blind${side}`}>
          <rect x={side ? 1360 : 40} y={90} width={200} height={380} fill="#eef2f4" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={(side ? 1368 : 48) + i * 21.5} y={96} width={14} height={368} fill="#e0e6ea" />
          ))}
        </g>
      ))}
      {/* Đồng hồ treo tường không số */}
      <circle cx={1270} cy={120} r={34} fill="#f2f4f6" stroke="#a9b6c3" strokeWidth={5} />
      <line x1={1270} y1={120} x2={1270} y2={98} stroke="#6c7c8f" strokeWidth={4} />
      <line x1={1270} y1={120} x2={1286} y2={128} stroke="#6c7c8f" strokeWidth={4} />
      {/* Máy chiếu gắn trần */}
      <rect x={784} y={0} width={10} height={26} fill="#b4bec9" />
      <rect x={756} y={24} width={66} height={22} rx={5} fill="#c3ccd6" />
      {/* Màn chiếu trống */}
      <rect x={sx - 12} y={sy - 14} width={sw + 24} height={14} rx={4} fill="#9eabb9" />
      <rect x={sx} y={sy} width={sw} height={sh} fill="#f3f5f7" stroke="#b9c4cf" strokeWidth={4} />
      {/* Bàn chủ trì phía xa chính giữa */}
      <rect x={700} y={470} width={200} height={70} fill="#9d826b" />
      <rect x={700} y={470} width={200} height={12} fill="#b09780" />
      <rect x={770} y={430} width={60} height={44} rx={12} fill="#6d7d93" />
      {/* Tủ văn phòng thấp + bìa xếp gọn */}
      <rect x={60} y={480} width={190} height={80} fill="#c2ccd6" />
      <rect x={72} y={454} width={20} height={26} fill="#e9e4d8" />
      <rect x={96} y={454} width={20} height={26} fill="#8fa3bb" />
      <rect x={120} y={454} width={20} height={26} fill="#e9e4d8" />
      {/* Sàn */}
      <rect y={560} width={1600} height={340} fill="#c9d1d9" />
      <FloorGrid vx={800} top={560} color="#bcc6d0" rows={[600, 660, 740, 840]} cols={6} />
      {/* Bàn họp dài: hai phía đối diện nhau, ghế bọc vải xanh than nhạt */}
      {[0, 1].map((side) =>
        [0, 1, 2].map((i) => {
          const x = side ? 930 + i * 120 : 560 - i * 120;
          const y = 560 + i * 26;
          return <rect key={`ch${side}-${i}`} x={x} y={y} width={92} height={90} rx={16} fill="#6f7f95" />;
        }),
      )}
      <polygon points="600,580 1000,580 1260,700 340,700" fill="#a88c73" />
      <polygon points="340,700 1260,700 1260,722 340,722" fill="#8e7560" />
      <rect x={560} y={600} width={80} height={34} fill="#eef0f2" transform="rotate(-6 600 617)" />
      <rect x={960} y={606} width={80} height={34} fill="#eef0f2" transform="rotate(5 1000 623)" />
      {/* Ánh đèn huỳnh quang lạnh phủ nhẹ */}
      <rect width={1600} height={900} fill="#e8f0f8" opacity={0.08} />
    </>
  );
}

const SCENE_ART: Record<SceneId, () => ReactElement> = {
  'clb-room': ClubRoomArt,
  'corridor-b': HallwayArt,
  'debrief-room': HearingRoomArt,
};

/** SVG nền tạm của một cảnh; trang trí thuần (aria-hidden) — tên cảnh do sân khấu đọc. */
export function SceneArt({ scene }: { scene: SceneId }) {
  const Art = SCENE_ART[scene];
  return (
    <svg
      className="scene-art"
      viewBox={`0 0 ${SCENE_VIEWBOX.width} ${SCENE_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Art />
    </svg>
  );
}
