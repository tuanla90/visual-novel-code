import { describe, expect, it } from 'vitest';
import { NotImplementedError, gradeChallenge, modelToSql, runQuery, sqlToModel } from './index';
import { emptyQueryModel } from '../types';

describe('engine SQL — điểm vào', () => {
  it('runQuery đã hiện thực (không còn stub)', async () => {
    await expect(runQuery('SELECT COUNT(*) FROM sinh_vien')).resolves.toMatchObject({ ok: true, rows: [[40]] });
  });

  it('các hàm chưa hiện thực ném/reject NotImplementedError có ghi tên gói', async () => {
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
