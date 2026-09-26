/**
 * STUB — gói `hinh-giao-dien` (gói 7) thay bằng hiệu ứng "Có số liệu đây!" kiểu truyện tranh
 * (QĐ-025: ~1,2 giây, bấm để bỏ qua, tắt rung khi prefers-reduced-motion). Props đã chốt.
 */
import { effectName } from '../../shared/display-names';
import type { EffectId } from '../../shared/ids';

export interface ObjectionEffectProps {
  effectId: EffectId;
  onDone: () => void;
}

export function ObjectionEffect({ effectId, onDone }: ObjectionEffectProps) {
  return (
    <div className="stub stub--effect" role="dialog" aria-label={effectName(effectId)}>
      <p className="stub__tag">Hiệu ứng (stub — gói hinh-giao-dien)</p>
      <p className="stub__big">{effectName(effectId)}</p>
      <button type="button" className="btn btn--primary" onClick={onDone} autoFocus>
        Tiếp tục (stub)
      </button>
    </div>
  );
}
