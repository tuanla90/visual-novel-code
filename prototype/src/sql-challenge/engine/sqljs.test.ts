import { describe, expect, it } from 'vitest';
import { createDatabase, loadSqlJs } from './sqljs';

describe('sql.js loader (smoke)', () => {
  it('nạp một lần và dùng lại cùng một instance', async () => {
    const a = await loadSqlJs();
    const b = await loadSqlJs();
    expect(a).toBe(b);
    expect(typeof a.Database).toBe('function');
  });

  it('CREATE/INSERT/SELECT chuỗi tiếng Việt có dấu, LIKE H% khớp đúng tên', async () => {
    const db = await createDatabase();
    try {
      db.run('CREATE TABLE sinh_vien (ma_sv TEXT PRIMARY KEY, ho_dem TEXT, ten TEXT)');
      db.run(
        "INSERT INTO sinh_vien VALUES ('SV1', 'Lê Thị', 'Hoài'), ('SV2', 'Nguyễn Thu', 'Hà'), ('SV3', 'Trần Mỹ', 'Linh')",
      );

      const all = db.exec('SELECT ho_dem, ten FROM sinh_vien ORDER BY ma_sv');
      expect(all[0]?.columns).toEqual(['ho_dem', 'ten']);
      expect(all[0]?.values).toEqual([
        ['Lê Thị', 'Hoài'],
        ['Nguyễn Thu', 'Hà'],
        ['Trần Mỹ', 'Linh'],
      ]);

      const h = db.exec("SELECT ten FROM sinh_vien WHERE ten LIKE 'H%' ORDER BY ma_sv");
      expect(h[0]?.values.map((row) => row[0])).toEqual(['Hoài', 'Hà']);

      const linh = db.exec("SELECT COUNT(*) FROM sinh_vien WHERE ten = 'Linh' AND ten LIKE 'H%'");
      expect(linh[0]?.values[0]?.[0]).toBe(0);
    } finally {
      db.close();
    }
  });
});
