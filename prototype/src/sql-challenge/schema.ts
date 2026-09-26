/**
 * Schema view dữ liệu tối thiểu (QĐ-010). Tên bảng/cột giữ tiếng Việt không dấu (QĐ-008).
 * Gói `sql-engine` tạo bảng và dataset theo đúng schema này; gói `trinh-dung-ui` đọc
 * COLUMN_DESCRIPTIONS cho bảng mô tả cột (QĐ-021).
 */

export const TABLE_COLUMNS = {
  sinh_vien: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
  lop_sinh_hoat: ['ma_lop', 'nganh', 'khoa_hoc', 'toa_nha'],
} as const satisfies Record<string, readonly string[]>;

export type TableName = keyof typeof TABLE_COLUMNS;
export const TABLE_NAMES = Object.keys(TABLE_COLUMNS) as TableName[];

export type ColumnOf<T extends TableName> = (typeof TABLE_COLUMNS)[T][number];
export type ColumnName = ColumnOf<TableName>;

export type ColumnType = 'TEXT' | 'INTEGER';

export interface ColumnInfo {
  name: ColumnName;
  type: ColumnType;
  /** Mô tả tiếng Việt cho bảng schema. */
  description: string;
}

export const COLUMN_DESCRIPTIONS: { [T in TableName]: Record<ColumnOf<T>, ColumnInfo> } = {
  sinh_vien: {
    ma_sv: { name: 'ma_sv', type: 'TEXT', description: 'Mã sinh viên' },
    ho_dem: { name: 'ho_dem', type: 'TEXT', description: 'Họ và tên đệm' },
    ten: { name: 'ten', type: 'TEXT', description: 'Tên gọi' },
    ma_lop: { name: 'ma_lop', type: 'TEXT', description: 'Mã lớp sinh hoạt' },
    clb: { name: 'clb', type: 'TEXT', description: 'Câu lạc bộ đang tham gia' },
  },
  lop_sinh_hoat: {
    ma_lop: { name: 'ma_lop', type: 'TEXT', description: 'Mã lớp sinh hoạt' },
    nganh: { name: 'nganh', type: 'TEXT', description: 'Ngành học' },
    khoa_hoc: { name: 'khoa_hoc', type: 'INTEGER', description: 'Khóa (năm nhập học)' },
    toa_nha: { name: 'toa_nha', type: 'TEXT', description: 'Tòa nhà sinh hoạt (A, B, C)' },
  },
};

export const TABLE_DESCRIPTIONS: Record<TableName, string> = {
  sinh_vien: 'Sinh viên trong view tối thiểu: mã, họ đệm, tên, lớp, câu lạc bộ',
  lop_sinh_hoat: 'Lớp sinh hoạt: mã lớp, ngành, khóa, tòa nhà',
};

export function isTableName(value: string): value is TableName {
  return Object.prototype.hasOwnProperty.call(TABLE_COLUMNS, value);
}

export function columnsOf(table: TableName): readonly ColumnName[] {
  return TABLE_COLUMNS[table];
}

export function isColumnOf(table: TableName, column: string): column is ColumnOf<typeof table> {
  return (TABLE_COLUMNS[table] as readonly string[]).includes(column);
}
