import type { TelemetryStorageStatus } from '../shared/telemetry/local-sink';

/** Bảng người quan sát mở bằng `?facilitator=1` (QĐ-030); người chơi không thấy. */
export function isFacilitatorMode(search: string): boolean {
  return new URLSearchParams(search).get('facilitator') === '1';
}

/** Nhãn dễ đọc cho loại màn (bảng người quan sát hiện cả id). */
const VIEW_LABELS: Record<string, string> = {
  title: 'Màn tiêu đề',
  line: 'Lời thoại',
  feedback: 'Phản hồi sau lựa chọn',
  explore: 'Xem xét',
  gate: 'Điều kiện qua cảnh',
  question: 'Câu hỏi',
  'line-pick': 'Chọn dòng trên màn chiếu',
  'show-document': 'Xem tài liệu',
  challenge: 'Thử thách SQL',
  'fix-query': 'Sửa truy vấn',
  effect: 'Hiệu ứng',
  projector: 'Màn chiếu',
  end: 'Màn kết',
  error: 'Lỗi nội dung',
};

export function viewLabel(kind: string): string {
  return VIEW_LABELS[kind] ?? 'Màn khác';
}

/** Câu trạng thái lưu theo LÝ DO thật. */
export function storageMessage(status: TelemetryStorageStatus | null): { tone: 'ok' | 'warn' | 'error'; text: string } {
  if (!status) return { tone: 'warn', text: 'Dữ liệu chỉ nằm trong bộ nhớ của tab này (chưa bật lưu bền).' };
  const pct = status.maxChars > 0 ? Math.round((status.usedChars / status.maxChars) * 100) : 0;
  switch (status.problem) {
    case null:
      return {
        tone: pct >= 80 ? 'warn' : 'ok',
        text:
          pct >= 80
            ? `Đã dùng ${pct}% chỗ dành cho dữ liệu thử nghiệm — nên xuất rồi xóa.`
            : `Đang lưu vào bộ nhớ trình duyệt (đã dùng ${pct}% chỗ dành cho dữ liệu thử nghiệm).`,
      };
    case 'unavailable':
      return { tone: 'error', text: 'Không đọc/ghi được bộ nhớ trình duyệt (bị chặn). Dữ liệu chỉ còn đến khi đóng tab — hãy xuất trước khi tải lại trang.' };
    case 'quota':
      return { tone: 'error', text: 'Bộ nhớ trình duyệt đã đầy: sự kiện mới chưa được lưu bền. Hãy xuất ngay rồi xóa dữ liệu cũ.' };
    case 'budget':
      return {
        tone: 'error',
        text:
          status.droppedEvents > 0
            ? `Phiên này vượt giới hạn số sự kiện (đã bỏ ${status.droppedEvents} sự kiện). Hãy xuất ngay.`
            : 'Đã chạm giới hạn dung lượng dành cho dữ liệu thử nghiệm: sự kiện mới chưa được lưu bền. Hãy xuất rồi xóa.',
      };
    case 'write-failed':
      return { tone: 'error', text: 'Ghi vào bộ nhớ trình duyệt bị lỗi: sự kiện mới có thể chưa được lưu bền. Hãy xuất ngay.' };
  }
}
