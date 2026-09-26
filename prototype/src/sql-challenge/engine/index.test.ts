import { describe, expect, it } from 'vitest';
import { gradeChallenge, modelToSql, runQuery, sqlToModel, validateModel } from './index';
import { emptyQueryModel } from '../types';

describe('engine SQL — điểm vào', () => {
  it('runQuery, modelToSql, sqlToModel, validateModel đã hiện thực (không còn stub)', async () => {
    await expect(runQuery('SELECT COUNT(*) FROM sinh_vien')).resolves.toMatchObject({ ok: true, rows: [[40]] });
    expect(modelToSql(emptyQueryModel())).toBe('SELECT\nFROM;');
    expect(sqlToModel('SELECT * FROM sinh_vien')).toEqual({ table: 'sinh_vien', columns: '*', conditions: [], connector: null });
    expect(validateModel(emptyQueryModel())[0]?.code).toBe('no-table');
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
  });
});
