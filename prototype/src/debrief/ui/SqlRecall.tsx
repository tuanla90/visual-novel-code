/**
 * Truy vấn của Quân GIỮ TRÊN MÀN CHIẾU, chỉ đọc, trong lúc người chơi đọc phản hồi của một lần chọn
 * dòng sai (QĐ-061-Đ1): Hà Vy đang bảo "xem anh ấy nối ba manh mối bằng từ gì" nên câu SQL không
 * được biến mất khi màn chọn dòng nhường chỗ cho hộp thoại.
 *
 * - Cùng khung màn chiếu (`dbf-screen`) nhưng cao theo nội dung (5 dòng), nằm trên hộp thoại ở đáy
 *   sân khấu; không nút, không chọn được, không nhận chuột (hộp thoại vẫn bấm/Enter được).
 * - Tô màu ĐỒNG ĐỀU bằng `SqlText` (sql-highlight.ts): không lớp riêng cho `OR` — lộ đáp án.
 *   KHÔNG dùng `SqlCode` của màn thử thách (gắn chú thích riêng cho OR/AND/LIKE/IN).
 */
import './debrief.css';
import type { PickableLine } from '../types';
import { SqlText } from './SqlText';

export interface SqlRecallProps {
  lines: PickableLine[];
}

export const SQL_RECALL_LABEL = 'Truy vấn đang xét trên màn chiếu (chỉ đọc)';

export function SqlRecall({ lines }: SqlRecallProps) {
  return (
    <aside className="dbf-screen dbf-recall" aria-label={SQL_RECALL_LABEL}>
      <p className="dbf-screen__eyebrow">Màn chiếu</p>
      <ol className="dbf-listing" aria-label="Câu truy vấn trên màn chiếu">
        {lines.map((line) => (
          <li key={line.index} className="dbf-listing__line">
            <span className="dbf-lineno" aria-hidden="true">
              {line.index}
            </span>
            <code className="dbf-code">
              <SqlText sql={line.sql} />
            </code>
          </li>
        ))}
      </ol>
    </aside>
  );
}
