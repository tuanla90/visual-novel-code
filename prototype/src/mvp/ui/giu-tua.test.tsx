/** Nhấn giữ khung thoại để tua (giu-tua.ts): giữ đủ lâu thì bật `giuTua`, nhấc tay thì tắt và nuốt cú bấm đi kèm. */
import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useVnStore } from '../../shared/vn/vn-store';
import { GIU_TUA_MS, useGiuDeTua } from './giu-tua';

function Khung({ onBam }: { onBam: () => void }) {
  useGiuDeTua();
  return (
    <>
      <div className="dialog-container">
        <div className="dialog" data-testid="khung" onClick={onBam}>
          Lời thoại
        </div>
      </div>
      <button type="button" data-testid="ngoai">
        Nút khác
      </button>
    </>
  );
}

const nhan = (el: Element, kieu: 'pointerDown' | 'pointerUp'): void => {
  fireEvent[kieu](el, { button: 0, isPrimary: true, pointerId: 1 });
};

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  act(() => useVnStore.getState().setGiuTua(false));
});

describe('nhấn giữ khung thoại để tua', () => {
  it('giữ đủ lâu thì tua, nhấc tay thì thôi; cú bấm lúc nhấc tay không qua thêm câu', () => {
    const onBam = vi.fn();
    const { getByTestId } = render(<Khung onBam={onBam} />);
    const khung = getByTestId('khung');
    nhan(khung, 'pointerDown');
    act(() => vi.advanceTimersByTime(GIU_TUA_MS - 50));
    expect(useVnStore.getState().giuTua).toBe(false);
    act(() => vi.advanceTimersByTime(60));
    expect(useVnStore.getState().giuTua).toBe(true);
    act(() => nhan(khung, 'pointerUp'));
    expect(useVnStore.getState().giuTua).toBe(false);
    fireEvent.click(khung);
    expect(onBam).not.toHaveBeenCalled();
    // Cú bấm sau đó là bấm thường.
    fireEvent.click(khung);
    expect(onBam).toHaveBeenCalledTimes(1);
  });

  it('chạm nhanh vẫn là bấm thường, không tua', () => {
    const onBam = vi.fn();
    const { getByTestId } = render(<Khung onBam={onBam} />);
    const khung = getByTestId('khung');
    nhan(khung, 'pointerDown');
    act(() => vi.advanceTimersByTime(100));
    nhan(khung, 'pointerUp');
    fireEvent.click(khung);
    act(() => vi.advanceTimersByTime(GIU_TUA_MS));
    expect(useVnStore.getState().giuTua).toBe(false);
    expect(onBam).toHaveBeenCalledTimes(1);
  });

  it('giữ ngoài khung thoại không tua; trượt tay (pointercancel) thì thôi tua', () => {
    const { getByTestId } = render(<Khung onBam={vi.fn()} />);
    nhan(getByTestId('ngoai'), 'pointerDown');
    act(() => vi.advanceTimersByTime(GIU_TUA_MS * 2));
    expect(useVnStore.getState().giuTua).toBe(false);

    nhan(getByTestId('khung'), 'pointerDown');
    act(() => vi.advanceTimersByTime(GIU_TUA_MS));
    expect(useVnStore.getState().giuTua).toBe(true);
    act(() => {
      fireEvent.pointerCancel(getByTestId('khung'), { pointerId: 1 });
    });
    expect(useVnStore.getState().giuTua).toBe(false);
  });
});
