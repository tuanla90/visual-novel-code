/**
 * "Sửa SQL trực tiếp" (QĐ-016): ô soạn điền sẵn SQL hiện tại; quay về trình dựng khi phân tích
 * ngược được (nạp model, ghi lại nguồn manh mối), không được thì hộp xác nhận quay về trạng thái
 * trình dựng gần nhất; SQL gõ tay vẫn chạy và được chấm như thường.
 */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { C1_CORRECT, challengeState, eventsOf, presetModel, renderChallenge, resetGame } from './test-utils';

function editor(): HTMLTextAreaElement {
  return screen.getByLabelText<HTMLTextAreaElement>('Câu SQL gõ tay');
}

/** Xóa ô soạn rồi dán cả câu (gõ từng phím một câu dài làm test chậm khi cả bộ chạy song song). */
async function pasteSql(user: ReturnType<typeof userEvent.setup>, sql: string): Promise<void> {
  await user.clear(editor());
  await user.click(editor());
  await user.paste(sql);
}

describe('Sửa SQL trực tiếp ↔ trình dựng', () => {
  beforeEach(() => resetGame(['clue-signature-h']));

  it('khứ hồi ĐƯỢC: ô soạn điền sẵn SQL, sửa tay rồi quay về → model mới, nguồn manh mối được ghi lại', async () => {
    const user = userEvent.setup();
    presetModel('c1', { table: 'sinh_vien', columns: ['ma_sv'], conditions: [], connector: null });
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: 'Sửa SQL trực tiếp' }));
    expect(editor().value).toBe('SELECT ma_sv\nFROM sinh_vien;');
    expect(challengeState('c1')?.mode).toBe('sql');
    expect(screen.getByLabelText('Bảng dữ liệu')).toBeDisabled();

    await pasteSql(user,"select ma_sv, ho_dem, ten from sinh_vien where ten like 'H%'");
    await user.click(screen.getByRole('button', { name: 'Quay về trình dựng' }));

    expect(challengeState('c1')?.mode).toBe('builder');
    const m = challengeState('c1')?.model;
    expect(m).toMatchObject({ table: 'sinh_vien', columns: ['ma_sv', 'ho_dem', 'ten'], connector: null });
    expect(m?.conditions[0]).toMatchObject({ column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } });
    expect(screen.getByLabelText('Câu SQL sinh từ trình dựng').textContent).toBe("SELECT ma_sv, ho_dem, ten\nFROM sinh_vien\nWHERE ten LIKE 'H%';");
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('khứ hồi KHÔNG ĐƯỢC: hộp xác nhận; "Ở lại" giữ SQL; xác nhận → trạng thái trình dựng gần nhất', async () => {
    const user = userEvent.setup();
    presetModel('c1', C1_CORRECT);
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: 'Sửa SQL trực tiếp' }));
    await pasteSql(user,"SELECT ma_sv FROM sinh_vien WHERE (ten LIKE 'H%') ORDER BY ten");
    await user.click(screen.getByRole('button', { name: 'Quay về trình dựng' }));

    const dialog = screen.getByRole('alertdialog', { name: 'Quay về trình dựng?' });
    expect(dialog).toHaveTextContent('trạng thái trình dựng gần nhất');
    await user.click(screen.getByRole('button', { name: 'Ở lại sửa SQL' }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(challengeState('c1')?.mode).toBe('sql');
    expect(editor().value).toContain('ORDER BY ten');

    await user.click(screen.getByRole('button', { name: 'Quay về trình dựng' }));
    await user.click(screen.getByRole('button', { name: 'Quay về trạng thái gần nhất' }));
    expect(challengeState('c1')?.mode).toBe('builder');
    expect(challengeState('c1')?.model).toEqual(C1_CORRECT);
    expect(challengeState('c1')?.sql).toBe("SELECT ma_sv, ho_dem, ten\nFROM sinh_vien\nWHERE ten LIKE 'H%';");
  });

  it('SQL gõ tay vẫn chạy và được chấm như thường (mode sql trong telemetry); Ctrl+Enter chạy', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: 'Sửa SQL trực tiếp' }));
    await pasteSql(user,"SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ho_dem LIKE 'H%'");
    await user.keyboard('{Control>}{Enter}{/Control}');
    await screen.findByText('Lần chạy 1');
    expect(document.querySelector('.havy__body')?.textContent).toContain('Cậu đang lọc theo cột ho_dem.');
    expect(eventsOf('query_run')[0]).toMatchObject({ mode: 'sql', status: 'incorrect', primaryCode: 'wrong-column-ho-dem' });

    await pasteSql(user,"SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%' ORDER BY ten");
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('10 dòng')).toBeInTheDocument();
    expect(eventsOf('query_run')[1]).toMatchObject({ mode: 'sql', status: 'correct' });
  });

  it('câu SQL không chạy được: không có bảng, lời của mã blocking (not-select), không in mã thô', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: 'Sửa SQL trực tiếp' }));
    await pasteSql(user,'DELETE FROM sinh_vien');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText(/Câu này chưa chạy được nên chưa có bảng kết quả/)).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Kết quả' })).queryByRole('table')).not.toBeInTheDocument();
    expect(document.querySelector('.havy__body')?.textContent).toContain('Trong buổi làm việc này CLB chỉ có quyền xem dữ liệu.');
    expect(document.body.textContent).not.toMatch(/not-select|syntax-error/);
    expect(eventsOf('query_run')[0]).toMatchObject({ status: 'error', errorClass: 'syntax', primaryCode: 'not-select', rowCount: null });
  });
});
