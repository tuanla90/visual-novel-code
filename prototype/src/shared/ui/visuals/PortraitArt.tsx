/**
 * Chân dung VẼ TẠM bằng SVG (QĐ-060): nửa người, khung 3:4 (= ảnh thật 1200×1600), đầu cùng vị trí
 * cho mọi nhân vật/biểu cảm; viền đậm, màu phẳng hai tầng (GDD §15.1). Trang trí thuần — tên và
 * biểu cảm do `Portrait` đọc cho trình đọc màn hình.
 */
import type { ReactElement } from 'react';
import type { CharacterId } from '../../ids';
import { CHARACTER_LOOKS, faceOf, type Brows, type CharacterLook, type Eyes, type Face, type Mouth } from './portrait-faces';

const INK = '#2b2320';
const EYE_L = 126;
const EYE_R = 174;
const EYE_Y = 150;
const BROW_Y = 124;
const MOUTH_Y = 190;

function Body({ look }: { look: CharacterLook }) {
  return (
    <g stroke={INK} strokeWidth={4} strokeLinejoin="round">
      <rect x={134} y={196} width={32} height={50} fill={look.skinShade} />
      <path d="M22 400 C26 300 70 252 150 246 C230 252 274 300 278 400 Z" fill={look.main} />
      <path d="M70 400 C74 330 96 290 118 272 L150 300 L182 272 C204 290 226 330 230 400" fill="none" stroke={look.mainShade} strokeWidth={5} />
      <path d="M118 250 L150 300 L182 250 C170 262 130 262 118 250 Z" fill={look.inner} />
      {look.straps ? (
        <>
          <path d="M92 266 L108 400" stroke={look.straps} strokeWidth={16} fill="none" />
          <path d="M208 266 L192 400" stroke={look.straps} strokeWidth={16} fill="none" />
        </>
      ) : null}
    </g>
  );
}

function BackHair({ look }: { look: CharacterLook }) {
  switch (look.hairStyle) {
    case 'long-bangs':
      return <path d="M78 130 C70 60 230 60 222 130 L234 300 C200 316 100 316 66 300 Z" fill={look.hair} stroke={INK} strokeWidth={4} />;
    case 'side-ponytail':
      return (
        <g fill={look.hair} stroke={INK} strokeWidth={4}>
          <path d="M84 132 C76 70 224 70 216 132 L220 214 C190 226 110 226 80 214 Z" />
          <path d="M214 120 C262 132 262 214 236 262 C230 226 222 190 206 168 Z" />
        </g>
      );
    default:
      return null;
  }
}

function FrontHair({ look }: { look: CharacterLook }) {
  const common = { fill: look.hair, stroke: INK, strokeWidth: 4, strokeLinejoin: 'round' as const };
  switch (look.hairStyle) {
    case 'side-ponytail':
      return (
        <g>
          <path d="M86 138 C80 70 150 52 196 70 C222 82 222 118 214 138 C196 112 168 100 150 104 C128 100 104 116 86 138 Z" {...common} />
          <rect x={196} y={104} width={20} height={12} rx={4} fill="#c8102e" stroke={INK} strokeWidth={3} transform="rotate(-24 206 110)" />
        </g>
      );
    case 'long-bangs':
      return <path d="M84 140 C78 66 222 66 216 140 C204 124 196 110 188 104 C176 118 160 122 146 116 C132 124 110 124 100 112 C94 122 90 130 84 140 Z" {...common} />;
    case 'short-neat':
      return <path d="M86 132 C80 70 150 56 200 72 C220 82 222 110 214 132 C200 112 176 98 140 100 C118 102 100 114 86 132 Z" {...common} />;
    case 'short-messy':
      return <path d="M84 136 C74 76 120 52 162 60 C204 62 230 96 216 136 L204 116 L196 132 L184 108 L166 122 L156 100 L140 120 L126 102 L112 124 L100 106 Z" {...common} />;
    case 'gray-cap':
      return (
        <g>
          <path d="M86 138 C82 110 88 96 96 90 L204 90 C212 96 218 110 214 138 C204 120 196 112 150 112 C104 112 96 120 86 138 Z" {...common} />
          <path d="M88 96 C92 52 208 52 212 96 Z" fill="#7a6a58" stroke={INK} strokeWidth={4} />
          <path d="M150 92 L236 100 C230 110 180 108 150 104 Z" fill="#6a5a48" stroke={INK} strokeWidth={4} />
        </g>
      );
  }
}

function eyeShape(kind: Eyes, cx: number, iris: string, key: string): ReactElement {
  const y = EYE_Y;
  switch (kind) {
    case 'wide':
      return (
        <g key={key}>
          <ellipse cx={cx} cy={y} rx={14} ry={17} fill="#fff" stroke={INK} strokeWidth={3.5} />
          <circle cx={cx} cy={y} r={4} fill={INK} />
        </g>
      );
    case 'happy':
      return <path key={key} d={`M${cx - 12} ${y + 5} Q${cx} ${y - 12} ${cx + 12} ${y + 5}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
    case 'down':
      return <path key={key} d={`M${cx - 11} ${y + 2} Q${cx} ${y + 9} ${cx + 11} ${y + 2}`} fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />;
    case 'relieved':
      return <path key={key} d={`M${cx - 12} ${y} Q${cx} ${y + 11} ${cx + 12} ${y}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />;
    case 'soft':
      return (
        <g key={key}>
          <ellipse cx={cx} cy={y + 3} rx={10} ry={8} fill={iris} />
          <path d={`M${cx - 13} ${y - 1} Q${cx} ${y - 8} ${cx + 13} ${y - 1}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        </g>
      );
    case 'half':
      return (
        <g key={key}>
          <ellipse cx={cx + 2} cy={y + 3} rx={9} ry={9} fill={iris} />
          <path d={`M${cx - 13} ${y - 1} L${cx + 13} ${y - 1}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        </g>
      );
    case 'side':
    case 'open': {
      const dx = kind === 'side' ? -5 : 0;
      const dy = kind === 'side' ? -3 : 0;
      return (
        <g key={key}>
          <ellipse cx={cx} cy={y} rx={12} ry={14} fill="#fff" stroke={INK} strokeWidth={3.5} />
          <ellipse cx={cx + dx} cy={y + 2 + dy} rx={8} ry={10} fill={iris} />
          <circle cx={cx + dx - 3} cy={y - 3 + dy} r={3} fill="#fff" />
        </g>
      );
    }
  }
}

function browPath(kind: Brows, cx: number, side: -1 | 1): string {
  // side = -1 (mày trái), 1 (mày phải); "trong" là phía giữa mặt.
  const inner = cx - side * 13;
  const outer = cx + side * 13;
  const y = BROW_Y;
  switch (kind) {
    case 'flat':
      return `M${outer} ${y} L${inner} ${y}`;
    case 'worried':
      return `M${outer} ${y + 3} L${inner} ${y - 7}`;
    case 'raised':
      return `M${outer} ${y - 8} Q${cx} ${y - 18} ${inner} ${y - 9}`;
    case 'soft':
      return `M${outer} ${y + 1} Q${cx} ${y - 6} ${inner} ${y}`;
    case 'stern':
      return `M${outer} ${y - 3} L${inner} ${y + 4}`;
    case 'one-up':
      return side === -1 ? `M${outer} ${y - 6} Q${cx} ${y - 17} ${inner} ${y - 8}` : `M${outer} ${y + 1} L${inner} ${y + 3}`;
  }
}

function mouthShape(kind: Mouth): ReactElement {
  const y = MOUTH_Y;
  const line = { fill: 'none', stroke: INK, strokeWidth: 4.5, strokeLinecap: 'round' as const };
  switch (kind) {
    case 'flat':
      return <path d={`M140 ${y} L160 ${y}`} {...line} />;
    case 'small-smile':
      return <path d={`M140 ${y - 2} Q150 ${y + 6} 160 ${y - 2}`} {...line} />;
    case 'smile':
      return <path d={`M136 ${y - 4} Q150 ${y + 10} 164 ${y - 4}`} {...line} />;
    case 'grin':
      return (
        <g>
          <path d={`M132 ${y - 8} Q150 ${y + 22} 168 ${y - 8} Z`} fill="#8c2b2b" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d={`M140 ${y + 6} Q150 ${y + 0} 160 ${y + 6} Q150 ${y + 12} 140 ${y + 6} Z`} fill="#e07a73" />
        </g>
      );
    case 'frown':
      return <path d={`M140 ${y + 4} Q150 ${y - 5} 160 ${y + 4}`} {...line} />;
    case 'wavy':
      return <path d={`M134 ${y + 1} q5 -6 10 0 t10 0 t10 0`} {...line} />;
    case 'o':
      return <ellipse cx={150} cy={y + 2} rx={9} ry={12} fill="#8c2b2b" stroke={INK} strokeWidth={4} />;
    case 'smirk':
      return <path d={`M138 ${y + 2} Q154 ${y + 4} 164 ${y - 7}`} {...line} />;
  }
}

function Glasses() {
  return (
    <g fill="none" stroke={INK} strokeWidth={3.5}>
      <rect x={EYE_L - 19} y={EYE_Y - 16} width={38} height={30} rx={12} fill="#e8f6f4" fillOpacity={0.25} />
      <rect x={EYE_R - 19} y={EYE_Y - 16} width={38} height={30} rx={12} fill="#e8f6f4" fillOpacity={0.25} />
      <path d={`M${EYE_L + 19} ${EYE_Y - 4} Q150 ${EYE_Y - 10} ${EYE_R - 19} ${EYE_Y - 4}`} />
    </g>
  );
}

function Head({ look, face }: { look: CharacterLook; face: Face }) {
  const extras = face.extras ?? [];
  return (
    <g>
      <ellipse cx={90} cy={156} rx={11} ry={16} fill={look.skin} stroke={INK} strokeWidth={4} />
      <ellipse cx={210} cy={156} rx={11} ry={16} fill={look.skin} stroke={INK} strokeWidth={4} />
      <path d="M88 128 C88 70 212 70 212 128 C212 186 186 216 150 218 C114 216 88 186 88 128 Z" fill={look.skin} stroke={INK} strokeWidth={4} />
      {extras.includes('gloom') ? <path d="M92 118 C96 90 204 90 208 118 L208 150 L92 150 Z" fill="#6a5a9a" opacity={0.28} /> : null}
      {extras.includes('blush') ? (
        <g fill="#ef8a80" opacity={0.5}>
          <ellipse cx={116} cy={176} rx={13} ry={6} />
          <ellipse cx={184} cy={176} rx={13} ry={6} />
        </g>
      ) : null}
      {eyeShape(face.eyes, EYE_L, look.iris, 'l')}
      {eyeShape(face.eyes, EYE_R, look.iris, 'r')}
      <g fill="none" stroke={look.hairShade === '#8b8d92' ? '#6f7176' : INK} strokeWidth={look.mustache ? 7 : 5} strokeLinecap="round">
        <path d={browPath(face.brows, EYE_L, -1)} />
        <path d={browPath(face.brows, EYE_R, 1)} />
      </g>
      <path d="M150 160 L146 174 L152 175" fill="none" stroke={look.skinShade} strokeWidth={3} strokeLinecap="round" />
      {look.mustache ? <path d="M128 182 Q150 170 172 182 Q150 190 128 182 Z" fill={look.hair} stroke={INK} strokeWidth={3} /> : null}
      {mouthShape(face.mouth)}
      {look.glasses ? <Glasses /> : null}
      <FrontHair look={look} />
    </g>
  );
}

function Extras({ face, look }: { face: Face; look: CharacterLook }) {
  const extras = face.extras ?? [];
  return (
    <g>
      {extras.includes('sweat') ? (
        <path d="M222 96 C214 110 212 122 222 124 C232 122 230 110 222 96 Z" fill="#a9d8f2" stroke={INK} strokeWidth={3} />
      ) : null}
      {extras.includes('shock') ? (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round">
          <path d="M64 70 L80 88" />
          <path d="M52 104 L74 110" />
          <path d="M236 70 L220 88" />
          <path d="M248 104 L226 110" />
        </g>
      ) : null}
      {extras.includes('sparkle') ? (
        <path d="M242 70 L247 84 L261 89 L247 94 L242 108 L237 94 L223 89 L237 84 Z" fill="#fcd34d" stroke={INK} strokeWidth={2.5} />
      ) : null}
      {extras.includes('puff') ? (
        <g fill="#eef4f8" stroke={INK} strokeWidth={2.5}>
          <circle cx={196} cy={206} r={8} />
          <circle cx={210} cy={200} r={10} />
          <circle cx={224} cy={208} r={7} />
        </g>
      ) : null}
      {extras.includes('hand-chin') ? (
        <g stroke={INK} strokeWidth={4} strokeLinejoin="round">
          <path d="M190 400 L186 262 C186 240 200 232 210 240 L214 300 Z" fill={look.main} />
          <path d="M168 204 C166 190 180 184 190 190 L204 212 C208 228 196 240 182 236 C172 232 168 220 168 204 Z" fill={look.skin} />
        </g>
      ) : null}
    </g>
  );
}

export function PortraitArt({ character, expression }: { character: CharacterId; expression: string }) {
  const look = CHARACTER_LOOKS[character];
  const face = faceOf(character, expression);
  const headTransform = face.tilt || face.drop ? `translate(0 ${face.drop ?? 0}) rotate(${face.tilt ?? 0} 150 214)` : undefined;
  return (
    <svg className="portrait-art" viewBox="0 0 300 400" aria-hidden="true" focusable="false">
      <g transform={headTransform}>
        <BackHair look={look} />
      </g>
      <Body look={look} />
      <g transform={headTransform}>
        <Head look={look} face={face} />
      </g>
      <Extras face={face} look={look} />
    </svg>
  );
}
