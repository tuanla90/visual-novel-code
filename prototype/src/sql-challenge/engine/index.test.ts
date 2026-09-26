import { describe, expect, it } from 'vitest';
import { NotImplementedError, gradeChallenge, modelToSql, runQuery, sqlToModel } from './index';
import { emptyQueryModel } from '../types';

describe('stub engine SQL (gói sql-engine thay thế)', () => {
  it('mọi hàm ném/reject NotImplementedError có ghi tên gói', async () => {
    await expect(runQuery('SELECT 1')).rejects.toBeInstanceOf(NotImplementedError);
    await expect(
      gradeChallenge(
        {
          id: 'c1',
          table: 'sinh_vien',
          referenceSql: 'SELECT 1',
          requiredColumns: ['ma_sv'],
          encouragedColumns: [],
          runHiddenDataset: false,
          expectedRowCount: 0,
        },
        'SELECT 1',
        null,
      ),
    ).rejects.toThrow(/gói sql-engine/);
    expect(() => modelToSql(emptyQueryModel())).toThrow(NotImplementedError);
    expect(() => sqlToModel('SELECT 1')).toThrow(/chưa hiện thực/);
  });
});
