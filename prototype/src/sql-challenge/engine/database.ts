/**
 * Tạo và giữ CSDL SQLite cho từng dataset (chính / ẩn). Mỗi dataset tạo MỘT LẦN rồi dùng lại
 * (QĐ-006): bảng theo đúng schema.ts, nạp dòng từ ../data, rồi bật `PRAGMA query_only = ON`
 * làm lớp bảo vệ thứ hai sau bước kiểm "chỉ một câu SELECT" (guard.ts).
 */
import { MAIN_DATASET } from '../data/main-dataset';
import { HIDDEN_DATASET } from '../data/hidden-dataset';
import type { Dataset, DatasetKind } from '../data/types';
import { createDatabase, type Database } from './sqljs';

export const DATASETS: Record<DatasetKind, Dataset> = {
  main: MAIN_DATASET,
  hidden: HIDDEN_DATASET,
};

const CREATE_TABLES = [
  `CREATE TABLE lop_sinh_hoat (
     ma_lop   TEXT    PRIMARY KEY,
     nganh    TEXT    NOT NULL,
     khoa_hoc INTEGER NOT NULL,
     toa_nha  TEXT    NOT NULL
   )`,
  `CREATE TABLE sinh_vien (
     ma_sv  TEXT PRIMARY KEY,
     ho_dem TEXT NOT NULL,
     ten    TEXT NOT NULL,
     ma_lop TEXT NOT NULL REFERENCES lop_sinh_hoat(ma_lop),
     clb    TEXT NOT NULL
   )`,
];

function populate(db: Database, dataset: Dataset): void {
  for (const ddl of CREATE_TABLES) db.run(ddl);
  const insertClass = db.prepare('INSERT INTO lop_sinh_hoat (ma_lop, nganh, khoa_hoc, toa_nha) VALUES (?, ?, ?, ?)');
  try {
    for (const c of dataset.lop_sinh_hoat) insertClass.run([c.ma_lop, c.nganh, c.khoa_hoc, c.toa_nha]);
  } finally {
    insertClass.free();
  }
  const insertStudent = db.prepare('INSERT INTO sinh_vien (ma_sv, ho_dem, ten, ma_lop, clb) VALUES (?, ?, ?, ?, ?)');
  try {
    for (const s of dataset.sinh_vien) insertStudent.run([s.ma_sv, s.ho_dem, s.ten, s.ma_lop, s.clb]);
  } finally {
    insertStudent.free();
  }
  // Lớp bảo vệ thứ hai (QĐ-006): mọi câu ghi từ đây về sau đều bị SQLite từ chối.
  db.run('PRAGMA query_only = ON');
}

const cache = new Map<DatasetKind, Promise<Database>>();

/** CSDL của một dataset — tạo lần đầu, các lần sau trả cùng instance (nạp lỗi thì lần sau thử lại). */
export function getDatabase(kind: DatasetKind): Promise<Database> {
  let pending = cache.get(kind);
  if (!pending) {
    pending = createDatabase().then((db) => {
      try {
        populate(db, DATASETS[kind]);
      } catch (err) {
        db.close();
        throw err;
      }
      return db;
    });
    pending.catch(() => cache.delete(kind));
    cache.set(kind, pending);
  }
  return pending;
}
