/**
 * Màn chiếu (QĐ-024): engine THẬT (sql.js) trong Vitest.
 * - Nguồn SQL (deb-01): chạy truy vấn OR của Quân → "24 dòng" + 24 dòng bảng; số lấy từ lần chạy.
 * - Chạy lỗi → câu theo lý do; thiếu nguồn → câu theo lý do; vẫn đi tiếp được.
 * - Enter / nút "Tiếp tục" gọi onClose đúng một lần; không lộ định danh thô.
 */
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { realContent } from '../../content/real';
import { QUAN_OR_QUERY } from '../../sql-challenge/data/challenges';
import { runQuery } from '../../sql-challenge/engine';
import type { ProjectorNode } from '../../story/types';
import type { ProjectorSpec } from '../types';
import { Projector } from './Projector';
import { RUN_FAILURE_TEXT } from './projector-text';

// Engine thật: lần nạp sql.js đầu tiên có thể chậm trên máy yếu.
vi.setConfig({ testTimeout: 20_000 });

const projectorOf = (seq: string): ProjectorSpec => {
  const node = realContent.story.sequences.find((s) => s.id === seq)?.nodes.find((n): n is ProjectorNode => n.type === 'projector');
  if (!node) throw new Error(`nội dung thật thiếu màn chiếu ở ${seq}`);
  return node.projector;
};
const QUAN = projectorOf('deb-01');

const sqlSpec = (sql: string, extra: Partial<ProjectorSpec> = {}): ProjectorSpec => ({
  id: 'proj-test',
  source: { kind: 'sql', sql },
  run: true,
  ...extra,
});

const bodyRows = (): HTMLElement[] => within(screen.getByRole('table')).getAllByRole('row').slice(1);

const waitArm = () =>
  act(async () => {
    await new Promise((r) => setTimeout(r, 800));
  });

describe('Projector — nguồn SQL, chạy thật', () => {
  it('deb-01: truy vấn OR của Quân (nội dung thật) → "24 dòng" và 24 dòng bảng', async () => {
    expect(QUAN.source).toEqual({ kind: 'sql', sql: QUAN_OR_QUERY });
    render(<Projector spec={QUAN} evidence={undefined} onClose={() => {}} />);
    expect(await screen.findByText('24 dòng')).toHaveClass('dbf-count');
    expect(bodyRows()).toHaveLength(24);
    expect(within(screen.getByRole('table')).getAllByRole('columnheader').map((h) => h.textContent)).toEqual([
      'ma_sv',
      'ho_dem',
      'ten',
      'ma_lop',
      'clb',
    ]);
    // SQL hiện đủ 5 dòng, có số dòng.
    const listing = screen.getByRole('list', { name: 'Câu truy vấn trên màn chiếu' });
    expect(within(listing).getAllByRole('listitem')).toHaveLength(5);
    expect(document.body.textContent).not.toMatch(/proj-|ev-quan|q-quan/);
  });

  it('số dòng lấy từ LẦN CHẠY, không từ expectedRowCount và không viết cứng', async () => {
    const other = "SELECT ma_sv, ten FROM sinh_vien WHERE clb = 'Báo chí'";
    const truth = await runQuery(other);
    if (!truth.ok) throw new Error('truy vấn kiểm phải chạy được');
    expect(truth.rowCount).not.toBe(24);
    render(<Projector spec={sqlSpec(other, { expectedRowCount: 99 })} evidence={undefined} onClose={() => {}} />);
    expect(await screen.findByText(`${truth.rowCount} dòng`)).toBeInTheDocument();
    expect(bodyRows()).toHaveLength(truth.rowCount);
    expect(screen.queryByText('99 dòng')).toBeNull();
  });

  it('tô màu đồng đều trên màn chiếu: OR cùng lớp với SELECT', async () => {
    render(<Projector spec={QUAN} evidence={undefined} onClose={() => {}} />);
    await screen.findByText('24 dòng');
    const listing = screen.getByRole('list', { name: 'Câu truy vấn trên màn chiếu' });
    const toks = [...listing.querySelectorAll<HTMLElement>('.dbf-code *')];
    const cls = (text: string) => new Set(toks.filter((t) => t.textContent === text).map((t) => t.className));
    expect(cls('OR').size).toBe(1);
    expect([...cls('OR')]).toEqual([...cls('SELECT')]);
  });

  it.each([
    ['no_table', 'SELECT * FROM bang_khong_co'],
    ['no_column', 'SELECT cot_khong_co FROM sinh_vien'],
    ['syntax', 'SELECT ma_sv FROM sinh_vien WHERE'],
    ['not_select', "DELETE FROM sinh_vien WHERE ten = 'Hoài'"],
  ] as const)('chạy lỗi (%s) → câu theo lý do, không bảng, không số dòng, vẫn đi tiếp được', async (kind, sql) => {
    const onClose = vi.fn();
    render(<Projector spec={sqlSpec(sql)} evidence={undefined} onClose={onClose} />);
    expect(await screen.findByRole('alert')).toHaveTextContent(RUN_FAILURE_TEXT[kind]);
    expect(screen.queryByRole('table')).toBeNull();
    expect(document.querySelector('.dbf-count')?.textContent).toBe('');
    // Không in thông điệp gốc của SQLite.
    expect(document.body.textContent).not.toMatch(/no such|syntax error|incomplete input/i);
    await userEvent.click(screen.getByRole('button', { name: /Tiếp tục/ }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('run: false → chỉ hiện SQL, không chạy, không bảng', async () => {
    render(<Projector spec={sqlSpec(QUAN_OR_QUERY, { run: false })} evidence={undefined} onClose={() => {}} />);
    await waitArm();
    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.queryByText(/Đang chạy/)).toBeNull();
    expect(screen.getByRole('list', { name: 'Câu truy vấn trên màn chiếu' })).toBeInTheDocument();
  });

  it('nút "Tiếp tục": bấm đúp chỉ gọi onClose một lần; chú thích hiện qua CodeText', async () => {
    const onClose = vi.fn();
    render(<Projector spec={sqlSpec(QUAN_OR_QUERY, { caption: 'Chạy lại bằng `OR`' })} evidence={undefined} onClose={onClose} />);
    await screen.findByText('24 dòng');
    expect(screen.getByText('OR', { selector: 'code.code-text' })).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('`');
    await userEvent.dblClick(screen.getByRole('button', { name: /Tiếp tục/ }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('phím Enter: chưa nhận khi kết quả vừa hiện; sau một nhịp thì gọi onClose đúng một lần', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Projector spec={QUAN} evidence={undefined} onClose={onClose} />);
    await screen.findByText('24 dòng');
    await user.keyboard('{Enter}');
    expect(onClose).not.toHaveBeenCalled();
    await waitArm();
    await user.keyboard('{Enter}');
    await user.keyboard('{Enter}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Enter không đóng màn chiếu khi ngăn kéo Hồ sơ đang mở', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <>
        <Projector spec={QUAN} evidence={undefined} onClose={onClose} />
        <aside className="notebook" aria-label="Hồ sơ vật chứng" />
      </>,
    );
    await screen.findByText('24 dòng');
    await waitArm();
    await user.keyboard('{Enter}');
    expect(onClose).not.toHaveBeenCalled();
  });
});
