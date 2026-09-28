import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { RunSuccess } from '../types';
import { SuccessPanel } from './SuccessPanel';

const RUN: RunSuccess = {
  ok: true,
  columns: ['ma_sv', 'ten'],
  rows: [['SV01', 'An']],
  rowCount: 1,
};

describe('SuccessPanel — chống bấm đúp Lưu vào hồ sơ', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('bấm đúp nút Lưu vào hồ sơ chỉ kích hoạt onSave một lần trong 400ms', () => {
    const onSave = vi.fn();
    render(
      <SuccessPanel
        attempt={1}
        run={RUN}
        table="sinh_vien"
        conditionCount={1}
        question={null}
        saving={false}
        disabled={false}
        onSave={onSave}
      />,
    );

    const saveBtn = screen.getByRole('button', { name: 'Lưu vào hồ sơ' });

    act(() => {
      fireEvent.click(saveBtn, { detail: 1 });
      fireEvent.click(saveBtn, { detail: 2 }); // cú thứ hai của bấm đúp thật (QĐ-066)
    });

    expect(onSave).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(401);
      fireEvent.click(saveBtn);
    });

    expect(onSave).toHaveBeenCalledTimes(2);
  });
});
