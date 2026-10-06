/**
 * DỊCH GỌN LỖI CỦA SQLITE SANG TIẾNG VIỆT (gói B17, nấc "Tự viết"): câu người chơi gõ tay chạy lỗi thì dưới ô gõ hiện một câu ngắn
 * ("Không có bảng tên …", "Thiếu dấu nháy", "Không có cột …"), không chạy hoạt cảnh. Thông điệp không nhận ra thì giữ nguyên chữ của
 * SQLite sau chữ "Chưa chạy được".
 */
import type { KetQuaChay } from './sql-mvp';

export function dichLoiSqlite(chay: Extract<KetQuaChay, { ok: false }>): string {
  const m = chay.thongDiep;
  // Lời của bộ kiểm "một câu SELECT" đã là tiếng Việt.
  if (chay.loai === 'khong-phai-select') return m;
  let x: RegExpExecArray | null;
  if ((x = /no such table:\s*(\S+)/i.exec(m))) return `Không có bảng tên "${x[1]}". Xem lại tên bảng sau FROM.`;
  if ((x = /no such column:\s*(\S+)/i.exec(m))) return `Không có cột "${x[1]}". Bấm "Khảo sát bảng" để xem tên cột.`;
  if ((x = /ambiguous column name:\s*(\S+)/i.exec(m))) return `Cột "${x[1]}" có ở cả hai bảng, phải ghi rõ bảng.cột.`;
  if ((x = /no such function:\s*(\S+)/i.exec(m))) return `Không có hàm tên "${x[1]}".`;
  if ((x = /unrecognized token:\s*"(.*)"\s*$/i.exec(m))) {
    const t = x[1] ?? '';
    if (t.startsWith("'") || t.startsWith('"')) return 'Thiếu dấu nháy: chuỗi chữ mở ra mà chưa đóng lại.';
    return `Có ký tự lạ: ${t}.`;
  }
  if (/incomplete input/i.test(m)) return 'Câu chưa viết xong, hình như còn thiếu phần cuối.';
  if ((x = /near\s+"(.*?)":\s*syntax error/i.exec(m))) return `Lỗi cú pháp gần chữ "${x[1]}".`;
  if (/syntax error/i.test(m)) return 'Lỗi cú pháp.';
  return `Chưa chạy được: ${m}`;
}
