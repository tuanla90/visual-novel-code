/**
 * QĐ-056: điều kiện mới CHƯA chọn cột; ô giá trị là danh sách chỉ với cột ít giá trị (đếm từ dữ liệu),
 * cột nhiều giá trị dùng ô chữ (IN: nhiều giá trị cách nhau bằng dấu phẩy). Store + nội dung + engine thật.
 */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { distinctValues } from '../engine';
import { columnsOf, TABLE_NAMES } from '../schema';
import { addCondition, isPendingCondition, setConditionColumn, setTable, withoutPending } from './model-edit';
import { challengeState, renderChallenge, resetGame, saveEvidence } from './test-utils';
import { LIST_MAX_DISTINCT, parseListText, usesValueList } from './value-options';
import { emptyQueryModel } from '../types';

function sqlText(): string {
  return screen.getByLabelText('Câu SQL sinh từ trình dựng').textContent ?? '';
}

async function openWithTable(id: 'c1' | 'c3', table: 'sinh_vien' | 'lop_sinh_hoat' = 'sinh_vien') {
  const user = userEvent.setup();
  renderChallenge(id);
  await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), table);
  return user;
}

describe('QĐ-056 — điều kiện mới chưa chọn cột', () => {
  beforeEach(() => resetGame(['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi']));

  it('bấm "Thêm điều kiện": cột "Chọn cột…", chưa có phép/giá trị, không vào SQL, nút Chạy khóa với lời no-value', async () => {
    const user = await openWithTable('c1');
    await user.click(within(screen.getByRole('group', { name: 'SELECT' })).getByLabelText('ten'));
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));

    const col = screen.getByLabelText<HTMLSelectElement>('Cột lọc của điều kiện 1');
    expect(col.value).toBe('');
    expect(col.selectedOptions[0]?.textContent).toBe('Chọn cột…');
    expect(screen.queryByLabelText('Phép so sánh của điều kiện 1')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Giá trị.*điều kiện 1/)).not.toBeInTheDocument();
    expect(screen.getByText('Chọn cột muốn lọc trước, rồi đến phép so sánh và giá trị.')).toBeInTheDocument();
    expect(isPendingCondition(challengeState('c1')!.model.conditions[0]!)).toBe(true);
    expect(sqlText()).toBe('SELECT ten\nFROM sinh_vien;');
    expect(challengeState('c1')?.sql).toBe('SELECT ten\nFROM sinh_vien;');
    expect(screen.getByRole('button', { name: /Chạy truy vấn/ })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Có một điều kiện chưa có giá trị. Cậu lọc theo gì?');
    expect(document.body.textContent).not.toMatch(/no-value|new-\d/);

    // Chọn cột (kể cả cột trùng cột giữ chỗ) → điều kiện thật, phép "bằng" + ô giá trị hiện ra.
    await user.selectOptions(col, 'ma_sv');
    const cond = challengeState('c1')!.model.conditions[0]!;
    expect(isPendingCondition(cond)).toBe(false);
    expect(cond).toMatchObject({ id: 'cond-1', column: 'ma_sv', op: 'eq', value: '' });
    expect(screen.getByLabelText<HTMLSelectElement>('Phép so sánh của điều kiện 1').value).toBe('eq');
    expect(screen.getByLabelText<HTMLSelectElement>('Cột lọc của điều kiện 1')).toBe(col); // cùng ô, không dựng lại
  });

  it('có điều kiện chưa chọn cột thì lời chặn vẫn là no-value (đứng trước connector-unset)', async () => {
    const user = await openWithTable('c3');
    await user.click(within(screen.getByRole('group', { name: 'SELECT' })).getByLabelText(/mọi cột/));
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'startsWith');
    await user.type(screen.getByLabelText('Giá trị (chữ) của điều kiện 1'), 'H');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Có một điều kiện chưa có giá trị.');
    // SQL song song chưa có điều kiện thứ hai (chưa chọn cột) → chưa có chỗ giữ AND/OR
    expect(sqlText()).toBe("SELECT *\nFROM sinh_vien\nWHERE ten LIKE 'H%';");
  });

  it('model-edit: đổi bảng giữ điều kiện chưa chọn cột; bỏ khỏi SQL; id mới không trùng', () => {
    let m = setTable(emptyQueryModel(), 'sinh_vien');
    m = addCondition(m);
    m = addCondition(m);
    expect(m.conditions.map((c) => c.id)).toEqual(['new-1', 'new-2']);
    m = setConditionColumn(m, 'new-2', 'clb');
    expect(m.conditions.map((c) => c.id)).toEqual(['new-1', 'cond-2']);
    m = setTable(m, 'lop_sinh_hoat');
    expect(m.conditions.map((c) => c.id)).toEqual(['new-1']);
    expect(withoutPending(m).conditions).toEqual([]);
    m = addCondition(m);
    expect(new Set(m.conditions.map((c) => c.id)).size).toBe(2);
  });
});

describe('QĐ-056 — danh sách giá trị chỉ cho cột ít giá trị (đếm từ dữ liệu)', () => {
  beforeEach(() => resetGame(['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi']));

  it('ngưỡng tính từ dữ liệu: mã SV/họ đệm/tên nhiều giá trị; lớp, CLB, tòa nhà, ngành, khóa ít giá trị', async () => {
    const counts: Record<string, number> = {};
    for (const t of TABLE_NAMES) for (const c of columnsOf(t)) counts[`${t}.${c}`] = (await distinctValues(t, c)).length;
    const many = Object.keys(counts).filter((k) => !usesValueList(counts[k]!)).sort();
    expect(many).toEqual(['sinh_vien.ho_dem', 'sinh_vien.ma_sv', 'sinh_vien.ten']);
    expect(counts['sinh_vien.ma_sv']).toBe(40);
    expect(LIST_MAX_DISTINCT).toBe(12);
  });

  it('ma_sv + "bằng": ô chữ, KHÔNG có danh sách 40 mã; ho_dem, ten cũng vậy', async () => {
    const user = await openWithTable('c1');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    for (const col of ['ma_sv', 'ho_dem', 'ten']) {
      await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), col);
      const input = await screen.findByLabelText<HTMLInputElement>('Giá trị (chữ) của điều kiện 1');
      expect(input.tagName).toBe('INPUT');
      expect(screen.queryByLabelText('Giá trị của điều kiện 1')).not.toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'SV240105' })).not.toBeInTheDocument();
      expect(screen.queryByRole('group', { name: 'Có trong dữ liệu' })).not.toBeInTheDocument();
    }
    // cột ten vẫn có nhóm "Từ manh mối"
    expect(screen.getByLabelText('Từ manh mối cho điều kiện 1')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Giá trị (chữ) của điều kiện 1'), 'Hoài');
    expect(sqlText()).toContain("WHERE ten = 'Hoài';");
  });

  it('clb + "bằng": vẫn là danh sách 4 CLB + nhóm "Từ manh mối"', async () => {
    const user = await openWithTable('c3');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'clb');
    const value = await screen.findByLabelText<HTMLSelectElement>('Giá trị của điều kiện 1');
    expect(value.tagName).toBe('SELECT');
    const data = await within(value).findByRole('group', { name: 'Có trong dữ liệu' });
    expect(within(data).getAllByRole('option').map((o) => o.textContent)).toEqual(['Báo chí', 'Guitar', 'Robotics', 'Văn học']);
    expect(within(value).getByRole('group', { name: 'Từ manh mối' })).toHaveTextContent('Báo chí — Nửa bookmark CLB Báo chí');
    expect(screen.queryByLabelText('Giá trị (chữ) của điều kiện 1')).not.toBeInTheDocument();
  });

  it('IN trên ma_lop: vẫn là danh sách lớp + "Từ manh mối" (danh sách lớp từ vật chứng c2)', async () => {
    saveEvidence({
      id: 'ev-c2-classes-b',
      challengeId: 'c2',
      sql: "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';",
      columns: ['ma_lop'],
      rows: [['KT24A'], ['QT24B']],
      rowCount: 2,
      savedAt: 1,
    });
    const user = await openWithTable('c3');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ma_lop');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'in');
    const add = await screen.findByLabelText<HTMLSelectElement>('Thêm giá trị vào danh sách của điều kiện 1');
    const data = await within(add).findByRole('group', { name: 'Có trong dữ liệu' });
    expect(within(data).getAllByRole('option')).toHaveLength(8);
    expect(within(add).getByRole('group', { name: 'Từ manh mối' })).toHaveTextContent('KT24A, QT24B — Lớp sinh hoạt ở giảng đường B');
    await user.selectOptions(add, 'KT24A, QT24B — Lớp sinh hoạt ở giảng đường B');
    expect(challengeState('c3')?.model.conditions[0]).toMatchObject({ value: ['KT24A', 'QT24B'], source: { kind: 'evidence', evidenceId: 'ev-c2-classes-b' } });
    expect(screen.queryByLabelText('Danh sách giá trị của điều kiện 1')).not.toBeInTheDocument();
  });

  it('IN trên cột nhiều giá trị (ten): ô chữ nhận nhiều giá trị cách nhau bằng dấu phẩy, có gợi ý cách nhập', async () => {
    const user = await openWithTable('c3');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'in');
    const input = await screen.findByLabelText<HTMLInputElement>('Danh sách giá trị của điều kiện 1');
    expect(input).toHaveAccessibleDescription('nhiều giá trị: cách nhau bằng dấu phẩy');
    expect(input).toHaveAttribute('placeholder', 'giá trị 1, giá trị 2');
    expect(screen.queryByRole('group', { name: 'Có trong dữ liệu' })).not.toBeInTheDocument();

    await user.type(input, 'Hoài, ');
    expect(input.value).toBe('Hoài, '); // dấu phẩy cuối được giữ khi đang gõ
    await user.type(input, 'Hiếu,Hoài');
    expect(challengeState('c3')?.model.conditions[0]?.value).toEqual(['Hoài', 'Hiếu']);
    expect(sqlText()).toContain("WHERE ten IN ('Hoài', 'Hiếu');");

    // "Từ manh mối" viết lại ô chữ
    await user.selectOptions(screen.getByLabelText('Từ manh mối cho điều kiện 1'), 'H — Chữ ký "H."');
    expect(input.value).toBe('H');
    expect(challengeState('c3')?.model.conditions[0]?.value).toEqual(['H']);
    expect(parseListText(' A ,, B , A ')).toEqual(['A', 'B']);
  });
});
