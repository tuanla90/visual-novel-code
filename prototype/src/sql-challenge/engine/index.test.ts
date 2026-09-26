import { describe, expect, it } from 'vitest';
import { CHALLENGE_SPECS } from '../data/challenges';
import { emptyQueryModel } from '../types';
import { gradeChallenge, modelToSql, runQuery, sqlToModel, validateModel } from './index';

describe('engine SQL — điểm vào (chữ ký cố định của ARCHITECTURE.md §2.4)', () => {
  it('runQuery, gradeChallenge, modelToSql, sqlToModel, validateModel đều là bản thật', async () => {
    await expect(runQuery('SELECT COUNT(*) FROM sinh_vien')).resolves.toMatchObject({ ok: true, rows: [[40]] });
    await expect(gradeChallenge(CHALLENGE_SPECS.c2, CHALLENGE_SPECS.c2.referenceSql, null)).resolves.toMatchObject({ status: 'correct' });
    expect(modelToSql(emptyQueryModel())).toBe('SELECT\nFROM;');
    expect(sqlToModel('SELECT * FROM sinh_vien')).toEqual({ table: 'sinh_vien', columns: '*', conditions: [], connector: null });
    expect(validateModel(emptyQueryModel())[0]?.code).toBe('no-table');
  });
});
