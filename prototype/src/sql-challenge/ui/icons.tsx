/** Biểu tượng SVG vẽ bằng currentColor (không dùng emoji). Luôn đi kèm nhãn chữ hoặc aria-label ở nút. */

const common = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function IconClose() {
  return (
    <svg {...common}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function IconPlay() {
  return (
    <svg {...common} fill="currentColor" strokeWidth={1.5}>
      <path d="M5 3.5v9l7-4.5z" />
    </svg>
  );
}

export function IconPlus() {
  return (
    <svg {...common}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function IconChevron({ open }: { open: boolean }) {
  return (
    <svg {...common} style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 0.15s' }}>
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
