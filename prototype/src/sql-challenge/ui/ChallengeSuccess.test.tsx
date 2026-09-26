/**
 * Đúng → lời [KHI ĐÚNG] → câu đọc kết quả (QĐ-043, tự ghi question_answered) → "Lưu vào hồ sơ"
 * → completeChallenge với vật chứng có dữ liệu THẬT → onComplete.
 */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGameStore } from '../../shared/store';
import { challengeState, eventsOf, renderChallenge, resetGame } from './test-utils';

function havyText(): string {
  return document.querySelector('.havy__body')?.textContent ?? '';
}

describe('Thành công → câu đọc kết quả → Lưu vào hồ sơ', () => {
  beforeEach(() => resetGame(['clue-signature-h']));

  it('c1 đúng bằng trình dựng TỪ ĐẦU tới onComplete: vật chứng 10 dòng thật', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    renderChallenge('c1', { onComplete });

    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    const select = screen.getByRole('group', { name: 'SELECT' });
    for (const col of ['ma_sv', 'ho_dem', 'ten']) await user.click(within(select).getByLabelText(col));
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'startsWith');
    await user.selectOptions(screen.getByLabelText('Từ manh mối cho điều kiện 1'), 'H — Chữ ký "H."');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));

    expect(await screen.findByText('Đúng rồi', { selector: '.result__ok' })).toBeInTheDocument();
    expect(screen.getByText('10 dòng')).toBeInTheDocument();
    expect(havyText()).toContain('Truy vấn đầu tiên của cậu đấy! Mười dòng.');
    // trình dựng khóa khi đã đúng, không cho chạy thêm
    expect(screen.getByLabelText('Bảng dữ liệu')).toBeDisabled();
    expect(screen.getByRole('button', { name: /Chạy truy vấn/ })).toBeDisabled();
    // chưa trả lời câu đọc kết quả → chưa có nút lưu
    expect(screen.queryByRole('button', { name: 'Lưu vào hồ sơ' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Những người có tên gọi bắt đầu bằng H.' }));
    expect(screen.getByText(/Chuẩn\. Cột ten, H đứng đầu/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Lưu vào hồ sơ' }));

    expect(onComplete).toHaveBeenCalledTimes(1);
    const ev = useGameStore.getState().evidence.savedQueries['ev-c1-names-h'];
    expect(ev).toMatchObject({ challengeId: 'c1', rowCount: 10, columns: ['ma_sv', 'ho_dem', 'ten'] });
    expect(ev?.rows).toHaveLength(10);
    expect(ev?.rows.every((r) => String(r[2]).startsWith('H'))).toBe(true);
    expect(ev?.sql).toBe("SELECT ma_sv, ho_dem, ten\nFROM sinh_vien\nWHERE ten LIKE 'H%';");
    expect(ev?.before).toBeUndefined();
    expect(useGameStore.getState().evidence.unlocked).toContain('ev-c1-names-h');
    expect(challengeState('c1')?.status).toBe('completed');
    expect(eventsOf('challenge_complete')).toHaveLength(1);
    expect(eventsOf('query_run')[0]).toMatchObject({ status: 'correct', primaryCode: null, rowCount: 10, errorClass: null });
  });

  it('câu đọc kết quả: chọn sai rồi đúng → question_answered đúng attempt/isFirstChoice, thứ tự không xáo lại', async () => {
    const user = userEvent.setup();
    const s = useGameStore.getState();
    s.openChallenge('c1');
    s.updateChallenge('c1', {
      model: {
        table: 'sinh_vien',
        columns: ['ma_sv', 'ho_dem', 'ten'],
        conditions: [{ id: 'cond-1', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'manual' } }],
        connector: null,
      },
    });
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    await screen.findByText('10 dòng');

    const choiceTexts = (): string[] => within(screen.getByRole('group', { name: 'Mười dòng này là những ai?' })).getAllByRole('button').map((b) => b.textContent ?? '');
    const before = choiceTexts();
    await user.click(screen.getByRole('button', { name: 'Những người có họ đệm bắt đầu bằng H.' }));
    expect(screen.getByText(/Điều kiện đặt ở cột ten, không phải ho_dem/)).toBeInTheDocument();
    expect(choiceTexts()).toEqual(before);
    expect(screen.getByText('Chưa đúng cũng không sao — chọn lại thoải mái.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Những người có tên gọi bắt đầu bằng H.' }));

    const answers = eventsOf('question_answered');
    expect(answers).toHaveLength(2);
    expect(answers[0]).toMatchObject({ questionId: 'q-c1-read', choiceId: 'ho-h', attempt: 1, correct: false, isFirstChoice: true });
    expect(answers[1]).toMatchObject({ questionId: 'q-c1-read', choiceId: 'ten-h', attempt: 2, correct: true, isFirstChoice: false });
    expect(screen.getByRole('button', { name: 'Lưu vào hồ sơ' })).toBeEnabled();
    expect(document.body.textContent).not.toMatch(/q-c1-read|ten-h|ho-h/);
  });

  it('cột thừa (`*`) vẫn đúng: lời extra-columns thay cho lời [KHI ĐÚNG]', async () => {
    const user = userEvent.setup();
    const s = useGameStore.getState();
    s.openChallenge('c1');
    s.updateChallenge('c1', {
      model: { table: 'sinh_vien', columns: '*', conditions: [{ id: 'cond-1', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'manual' } }], connector: null },
    });
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    await screen.findByText('10 dòng');
    expect(havyText()).toContain('Đúng rồi! Mẹo nhỏ: chỉ cần các cột đề bài hỏi là đủ.');
    expect(havyText()).not.toContain('Truy vấn đầu tiên');
    expect(eventsOf('query_run')[0]).toMatchObject({ status: 'correct', primaryCode: 'extra-columns' });
  });
});
