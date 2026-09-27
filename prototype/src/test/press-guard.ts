/**
 * Tiện ích test: chờ hết khoảng khóa chống bấm đúp (QĐ-066, `use-press-guard.ts`) — như người chơi thật:
 * nội dung vừa hiện → đọc → mới bấm. Dùng trước cú bấm lên lựa chọn / hộp thoại / nút tài liệu vừa hiện.
 * Chạy được cả khi test đang dùng đồng hồ giả (`vi.useFakeTimers`): khi đó tua đồng hồ thay vì chờ thật.
 */
import { act } from '@testing-library/react';
import { vi } from 'vitest';
import { PRESS_GUARD_MS } from '../shared/ui/use-press-guard';

export async function passPressGuard(): Promise<void> {
  const ms = PRESS_GUARD_MS + 30;
  await act(async () => {
    if (vi.isFakeTimers()) await vi.advanceTimersByTimeAsync(ms);
    else await new Promise((resolve) => setTimeout(resolve, ms));
  });
}
