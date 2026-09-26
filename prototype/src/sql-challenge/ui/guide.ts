/**
 * Hướng dẫn từng bước (chỉ c1, QĐ-021): bước tự chuyển khi người chơi làm xong thao tác của vùng
 * đang nổi bật; không khóa thao tác. Bước "Xem 5 dòng đầu" là tùy chọn: người chơi đã làm tiếp bước
 * sau thì coi như qua. Bước chỉ đi tới, không lùi.
 */
import type { BuilderRegion, GuideStep, QueryModel } from '../types';

export interface GuideFacts {
  model: QueryModel;
  /** Đã bấm "Xem 5 dòng đầu" ít nhất một lần. */
  previewed: boolean;
  /** Đã chạy một câu có ít nhất một điều kiện lọc. */
  ranWithFilter: boolean;
}

function hasValue(v: string | string[]): boolean {
  return Array.isArray(v) ? v.some((x) => x.trim() !== '') : v.trim() !== '';
}

export function regionDone(region: BuilderRegion, f: GuideFacts): boolean {
  switch (region) {
    case 'from':
      return f.model.table !== null;
    case 'preview':
      return f.previewed;
    case 'select':
      return f.model.columns === '*' || f.model.columns.length > 0;
    case 'where':
      return f.model.conditions.some((c) => hasValue(c.value));
    case 'run':
      return f.ranWithFilter;
  }
}

/** Bước kế tiếp (1-based); 0 = hết hướng dẫn. `current` = 0 giữ nguyên 0. */
export function nextGuideStep(steps: readonly GuideStep[], current: number, f: GuideFacts): number {
  if (current <= 0 || steps.length === 0) return 0;
  let s = current;
  while (s <= steps.length) {
    const step = steps[s - 1];
    if (!step) break;
    const later = steps.slice(s).some((x) => x.highlight !== 'preview' && regionDone(x.highlight, f));
    const done = regionDone(step.highlight, f) || (step.highlight === 'preview' && later);
    if (!done) break;
    s += 1;
  }
  return s > steps.length ? 0 : s;
}
