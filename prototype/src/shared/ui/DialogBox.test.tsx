import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DialogueLine } from '../../story/types';
import { DialogBox } from './DialogBox';

const LINE: DialogueLine = {
  speaker: 'minh-anh',
  expression: 'neutral',
  text: 'Chào bạn, chúng ta cùng kiểm tra nhé.',
};

describe('DialogBox — chống nhảy cóc thoại (press guard)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('bấm đúp nút Tiếp tục chỉ kích hoạt onAdvance một lần trong 400ms', () => {
    const onAdvance = vi.fn();
    render(<DialogBox line={LINE} onAdvance={onAdvance} />);

    const nextBtn = screen.getByRole('button', { name: /Tiếp tục/ });

    act(() => {
      fireEvent.click(nextBtn, { detail: 1 });
      fireEvent.click(nextBtn, { detail: 2 }); // cú thứ hai của bấm đúp thật (QĐ-066)
    });

    expect(onAdvance).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(401);
      fireEvent.click(nextBtn);
    });

    expect(onAdvance).toHaveBeenCalledTimes(2);
  });

  it('spam phím Space hoặc Enter liên tiếp chỉ kích hoạt onAdvance một lần trong 400ms', () => {
    const onAdvance = vi.fn();
    render(<DialogBox line={LINE} onAdvance={onAdvance} />);
    // QĐ-066: phím trong ~400 ms đầu sau khi lời hiện không được tính (cú bấm lọt từ màn trước).
    act(() => vi.advanceTimersByTime(401));

    act(() => {
      fireEvent.keyDown(window, { key: ' ' });
      fireEvent.keyDown(window, { key: ' ' });
      fireEvent.keyDown(window, { key: 'Enter' });
    });

    expect(onAdvance).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(401);
      fireEvent.keyDown(window, { key: 'Enter' });
    });

    expect(onAdvance).toHaveBeenCalledTimes(2);
  });

  it('bấm hộp thoại rồi nhấn Space ngay sau đó (< 400ms) không bị nhảy cóc', () => {
    const onAdvance = vi.fn();
    const { container } = render(<DialogBox line={LINE} onAdvance={onAdvance} />);

    const dialog = container.querySelector('.dialog')!;
    expect(dialog).toBeDefined();
    act(() => vi.advanceTimersByTime(401)); // QĐ-066: qua khoảng khóa khi lời vừa hiện

    act(() => {
      fireEvent.click(dialog);
      fireEvent.keyDown(window, { key: ' ' });
    });

    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  it('mở hồ sơ không đồng thời chuyển sang câu thoại tiếp theo', () => {
    const onAdvance = vi.fn();
    const onOpenNotebook = vi.fn();
    render(<DialogBox line={LINE} onAdvance={onAdvance} onOpenNotebook={onOpenNotebook} notebookCount={3} />);

    fireEvent.click(screen.getByRole('button', { name: /Hồ sơ/ }));

    expect(onOpenNotebook).toHaveBeenCalledTimes(1);
    expect(onAdvance).not.toHaveBeenCalled();
  });

  it('không còn ký hiệu mũi tên tam giác cuộn (chỉ giữ nút Tiếp tục)', () => {
    const { container } = render(<DialogBox line={LINE} onAdvance={() => {}} />);
    expect(container.querySelector('.dialog__scroll-arrow')).toBeNull();
  });

  it('văn bản dài: cuộn xem tiếp trước khi qua câu thoại mới', () => {
    const onAdvance = vi.fn();
    const LONG_LINE: DialogueLine = {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Khoan. Mình mới đếm có một kiểu: tài khoản nào gửi. Đổi cách đếm xem có thấy gì khác không đã. Chúng ta cần kiểm tra lại toàn bộ danh sách sinh viên.',
    };
    const { container } = render(<DialogBox line={LONG_LINE} onAdvance={onAdvance} />);
    const textEl = container.querySelector('.dialog__text') as HTMLElement;
    expect(textEl).toBeInTheDocument();

    // Giả lập DOM scroll: scrollHeight 200, clientHeight 75, scrollTop 0
    Object.defineProperty(textEl, 'scrollHeight', { configurable: true, value: 200 });
    Object.defineProperty(textEl, 'clientHeight', { configurable: true, value: 75 });
    let currentScrollTop = 0;
    Object.defineProperty(textEl, 'scrollTop', {
      configurable: true,
      get: () => currentScrollTop,
      set: (val) => { currentScrollTop = val; },
    });
    textEl.scrollBy = vi.fn((options?: ScrollToOptions | number) => {
      if (typeof options === 'object' && options?.top) {
        currentScrollTop += options.top;
      }
    }) as unknown as typeof textEl.scrollBy;

    const nextBtn = screen.getByRole('button', { name: /Tiếp tục/ });
    act(() => vi.advanceTimersByTime(401));

    // Bấm lần 1: cuộn tiếp trang sau thay vì gọi onAdvance
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(textEl.scrollBy).toHaveBeenCalled();
    expect(onAdvance).not.toHaveBeenCalled();

    // Cập nhật scrollTop đến cuối văn bản
    currentScrollTop = 130; // 130 + 75 = 205 >= 200 - 6
    act(() => vi.advanceTimersByTime(401));

    // Bấm lần 2: khi đã ở cuối trang thì qua câu mới
    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });
});

