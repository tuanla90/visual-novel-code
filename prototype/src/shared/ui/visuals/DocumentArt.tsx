/**
 * Hình VẼ TẠM của ba tài liệu (QĐ-026, QĐ-060): chỉ là NỀN giấy/vật thể — mọi chữ tiếng Việt do
 * giao diện chồng lên (đọc được bằng trình đọc màn hình). Trang trí thuần (aria-hidden).
 * Khi có ảnh thật trong ô `doc-letter` / `doc-bookmark` / `doc-handover-log`, ảnh thay lớp nền này.
 */

const INK = '#2b2118';

/** Bản chụp lá thư: giấy trắng ngà, nếp gấp ba, viền bản chụp xám, lốm đốm mực máy chụp. */
export function LetterPaperArt() {
  return (
    <svg className="doc-art" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <rect width={400} height={520} fill="#fbfaf5" />
      <rect x={4} y={4} width={392} height={512} fill="none" stroke="#cfcbc0" strokeWidth={8} />
      <line x1={0} y1={173} x2={400} y2={173} stroke="#e4ded0" strokeWidth={3} />
      <line x1={0} y1={346} x2={400} y2={346} stroke="#e4ded0" strokeWidth={3} />
      <g fill="#d9d4c8" opacity={0.7}>
        <circle cx={372} cy={40} r={2} />
        <circle cx={30} cy={470} r={2.5} />
        <circle cx={352} cy={488} r={1.5} />
        <circle cx={22} cy={96} r={1.5} />
      </g>
    </svg>
  );
}

/** Mặt ngoài phong bì với chữ ký tay "H." (nét vẽ, không phải chữ — dòng mô tả đọc thay). */
export function EnvelopeArt() {
  return (
    <svg className="doc-art doc-art--envelope" viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <rect x={6} y={6} width={308} height={198} rx={6} fill="#f3e7cc" stroke={INK} strokeWidth={4} />
      <path d="M6 12 L160 118 L314 12" fill="none" stroke="#c9b58c" strokeWidth={4} />
      <rect x={236} y={22} width={58} height={44} fill="#efe2c4" stroke="#b59d70" strokeWidth={3} strokeDasharray="6 4" />
      {/* Chữ ký "H." viết tay */}
      <g fill="none" stroke="#1e3a8a" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M112 118 C110 140 108 160 104 178" />
        <path d="M150 112 C148 136 146 158 144 180" />
        <path d="M100 150 C118 144 134 146 156 140" />
        <path d="M168 176 l3 1" strokeWidth={9} />
      </g>
    </svg>
  );
}

/** Nửa bookmark giấy cứng CLB Báo chí: mép rách răng cưa, nửa logo ngòi bút. */
export function BookmarkArt() {
  return (
    <svg className="doc-art doc-art--bookmark" viewBox="0 0 200 420" aria-hidden="true" focusable="false">
      <path
        d="M20 10 L180 10 L180 250 L168 262 L176 276 L160 290 L172 304 L150 318 L162 332 L138 344 L150 360 L120 372 L128 390 L96 398 L100 412 L20 412 Z"
        fill="#fdf6e3"
        stroke={INK}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <rect x={20} y={10} width={160} height={46} fill="#1e3a5f" />
      <circle cx={100} cy={96} r={10} fill="none" stroke="#1e3a5f" strokeWidth={4} />
      {/* Nửa logo ngòi bút: nửa phải bị xé mất */}
      <path d="M100 118 L70 190 L100 250 L100 118 Z" fill="#1e3a5f" />
      <path d="M100 150 L100 232" stroke="#fdf6e3" strokeWidth={4} />
      <path d="M100 118 L118 160" stroke="#1e3a5f" strokeWidth={4} strokeDasharray="4 6" opacity={0.5} />
    </svg>
  );
}

/** Sổ bàn giao niêm phong: giấy kẻ dòng, lề đỏ, dấu niêm phong đỏ. */
export function LedgerPaperArt() {
  return (
    <svg className="doc-art" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <rect width={400} height={520} fill="#fbf4e2" />
      <rect width={400} height={34} fill="#e9dcbc" />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} x1={0} y1={62 + i * 30} x2={400} y2={62 + i * 30} stroke="#d9e3ea" strokeWidth={2} />
      ))}
      <line x1={42} y1={34} x2={42} y2={520} stroke="#e6a3a3" strokeWidth={3} />
    </svg>
  );
}

/** Dấu niêm phong (vòng tròn đỏ, sao giữa — không chữ). */
export function SealArt() {
  return (
    <svg className="doc-seal" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx={50} cy={50} r={44} fill="none" stroke="#b91c1c" strokeWidth={6} opacity={0.85} />
      <circle cx={50} cy={50} r={33} fill="none" stroke="#b91c1c" strokeWidth={3} opacity={0.85} />
      <path d="M50 28 L56 44 L73 44 L59 54 L64 71 L50 61 L36 71 L41 54 L27 44 L44 44 Z" fill="#b91c1c" opacity={0.85} />
    </svg>
  );
}
