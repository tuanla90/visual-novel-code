import type { GameContent } from '../content/types';
import type { ChallengeId } from '../shared/ids';
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

// ---------- Nhãn dễ đọc cho tóm tắt (bảng người quan sát hiện id KÈM nhãn) ----------

function shorten(text: string, max = 48): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Chữ của một lựa chọn (câu hỏi trong chuỗi truyện hoặc câu đọc kết quả của thử thách). */
export function choiceText(content: GameContent, questionId: string, choiceId: string): string {
  const questions = [
    ...content.story.sequences.flatMap((s) => s.nodes.flatMap((n) => (n.type === 'question' ? [n.question] : []))),
    ...Object.values(content.challenges).flatMap((c) => (c.content.readQuestion ? [c.content.readQuestion] : [])),
  ];
  const choice = questions.find((q) => q.id === questionId)?.choices.find((c) => c.id === choiceId);
  return choice ? shorten(choice.text) : 'Lựa chọn không còn trong nội dung';
}

/** Chữ của một dòng trên màn chiếu (chọn dòng lỗi). */
export function pickedLineText(content: GameContent, pickId: string, lineIndex: number): string {
  for (const s of content.story.sequences) {
    for (const n of s.nodes) {
      if (n.type === 'line-pick' && n.pick.id === pickId) {
        const line = n.pick.lines.find((l) => l.index === lineIndex);
        return line ? shorten(line.sql.trim()) : `Dòng ${lineIndex}`;
      }
    }
  }
  return `Dòng ${lineIndex}`;
}

export function challengeTitle(content: GameContent, id: ChallengeId): string {
  return content.challenges[id]?.content.title ?? 'Thử thách';
}

/** "27/09 10:32" theo giờ máy. */
export function formatClock(ms: number | null): string {
  if (ms === null) return '—';
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
