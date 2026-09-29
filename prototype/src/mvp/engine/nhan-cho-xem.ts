/**
 * Nhãn người chơi thấy cho một chỗ xem xét (dữ kiện) trong địa điểm.
 *
 * `moTa` của dữ kiện là dòng viết cho tác giả ("Bác Thịnh kể lúc mở hộp 9h sáng thứ Hai; thẻ lịch rách ở khe")
 * nên KHÔNG được hiện: nó kể trước nội dung manh mối. Nhãn ở đây dựng từ dữ liệu có sẵn, chỉ nói người chơi
 * sẽ làm gì (nói với ai, xem tài liệu nào), không nói sẽ biết được gì. Thứ tự ưu tiên:
 * thử thách → người ngoài nhóm nói trong chuỗi → tài liệu được hiện → chỉ lời kể → còn lại "Xem xét quanh đây".
 */
import type { DuKienMvp, KichBanMvp } from '../../content/mvp/types';

/** Người chơi và bạn đồng hành: có mặt ở hầu hết cảnh nên không dùng để phân biệt chỗ xem xét. */
const NHOM = new Set(['player', 'narrator', 'tung', 'ha-vy', 'minh-anh', 'duy']);

export function nhanChoXem(kb: KichBanMvp, dk: DuKienMvp): string {
  if (dk.hanhDong.kind === 'thu-thach') return 'Ngồi vào máy tính';

  const tenChuoi = dk.hanhDong.chuoi;
  const chuoi = kb.chuoi.find((c) => c.id === tenChuoi);
  const nguoiNoi = new Set<string>();
  for (const nut of chuoi?.nodes ?? []) if (nut.type === 'line') nguoiNoi.add(nut.speaker);
  const nguoiNgoai = [...nguoiNoi].find((s) => !NHOM.has(s));
  if (nguoiNgoai) return `Nói chuyện với ${kb.nhanVat.find((n) => n.id === nguoiNgoai)?.trongCau ?? 'người ở đây'}`;

  const taiLieu = dk.hienTaiLieu[0];
  const tieuDe = taiLieu ? kb.hoSo[taiLieu]?.fields['Tiêu đề'] : undefined;
  if (tieuDe) return `Xem: ${tieuDe}`;

  if (nguoiNoi.size === 1 && nguoiNoi.has('narrator')) return 'Nghe ngóng xung quanh';
  return 'Xem xét quanh đây';
}

/** Nhãn cho cả danh sách trong một địa điểm; nhãn trùng thì đánh số để còn phân biệt được. */
export function nhanChoXemDs(kb: KichBanMvp, ds: DuKienMvp[]): string[] {
  const nhan = ds.map((dk) => nhanChoXem(kb, dk));
  const dem = new Map<string, number>();
  for (const n of nhan) dem.set(n, (dem.get(n) ?? 0) + 1);
  const daGap = new Map<string, number>();
  return nhan.map((n) => {
    if ((dem.get(n) ?? 0) < 2) return n;
    const i = (daGap.get(n) ?? 0) + 1;
    daGap.set(n, i);
    return `${n} (${i})`;
  });
}
