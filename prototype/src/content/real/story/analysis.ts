/** Phần 3 — Phân tích dữ liệu {part: analysis}. Chuyển NGUYÊN VĂN từ docs/kich-ban-prototype.md. */
import type { Sequence } from '../../../story/types';

export const analysisSequences: Sequence[] = [
  {
    id: 'ana-01',
    part: 'analysis',
    scene: 'clb-room',
    title: 'Mở dữ liệu',
    nodes: [
      { type: 'task', text: 'Tìm sinh viên có tên bắt đầu bằng H' },
      {
        type: 'line',
        speaker: 'narrator',
        text: 'Về phòng CLB. Laptop đã mở sẵn trình dựng truy vấn, nối vào view dữ liệu.',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: 'Ba manh mối rồi. Giờ đến lượt hỏi dữ liệu.' },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'View có hai bảng: sinh_vien và lop_sinh_hoat. Bắt đầu từ manh mối dễ nhất: chữ H.',
      },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'smile',
        text: 'Lần đầu thì mình chỉ từng bước. Chạy sai cứ chạy lại, bao nhiêu lần cũng được.',
      },
      { type: 'challenge', challengeId: 'c1' },
      { type: 'goto', to: 'ana-c2-intro' },
    ],
  },
  {
    id: 'ana-c2-intro',
    part: 'analysis',
    scene: 'clb-room',
    title: 'Manh mối tòa B',
    nodes: [
      { type: 'task', text: 'Tìm các lớp sinh hoạt ở giảng đường B' },
      { type: 'line', speaker: 'minh-anh', expression: 'worried', text: 'Mười người. Đi hỏi từng người thì hết buổi mất.' },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Thêm manh mối tòa B vào. Nhưng bảng sinh_vien không có cột tòa nhà.',
      },
      { type: 'line', speaker: 'ha-vy', expression: 'neutral', text: 'Mở bảng mô tả cột ra xem. Cột tòa nhà nằm ở bảng nào?' },
      {
        type: 'note',
        text: 'Ô FROM để trống như mọi thử thách (QĐ-016): chọn đúng bảng là việc của người chơi.',
      },
      { type: 'challenge', challengeId: 'c2' },
      { type: 'goto', to: 'ana-c3-intro' },
    ],
  },
  {
    id: 'ana-c3-intro',
    part: 'analysis',
    scene: 'clb-room',
    title: 'Ghép ba manh mối',
    nodes: [
      { type: 'task', text: 'Tìm người khớp cả ba manh mối' },
      { type: 'line', speaker: 'ha-vy', expression: 'neutral', text: 'KT24A và QT24B. Hai mã lớp này giờ cũng là manh mối.' },
      { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: 'Chữ ký, tòa B, bookmark. Ai khớp cả ba?' },
      {
        type: 'note',
        text: 'Mục "Từ manh mối" của trình dựng lúc này có: `H` (chữ ký), danh sách `KT24A, QT24B` (vật chứng ev-c2-classes-b), `Báo chí` (bookmark) — QĐ-017.',
      },
      { type: 'challenge', challengeId: 'c3' },
      { type: 'goto', to: 'ana-c3-done' },
    ],
  },
  {
    id: 'ana-c3-done',
    part: 'analysis',
    scene: 'clb-room',
    title: '"Tìm ra rồi!"',
    nodes: [
      { type: 'line', speaker: 'minh-anh', expression: 'happy', text: 'Hai người! Tìm ra rồi! Gửi Phòng CTSV ngay thôi!' },
      {
        type: 'line',
        speaker: 'narrator',
        text: 'Minh Anh gửi kết quả đi. Vài phút sau, điện thoại rung: tin nhắn từ Phòng CTSV.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'worried',
        text: '"Trước khi CTSV liên hệ ai, Ban Pháp chế – Kiểm tra Hội sinh viên sẽ thẩm tra cách CLB dùng dữ liệu."',
      },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Ban của anh Quân. Người gọi CLB mình là "hội trinh thám nghiệp dư".',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'worried', text: 'Mười lăm phút nữa, ở phòng giải trình. Mang theo hồ sơ.' },
      {
        type: 'note',
        text: 'Không nhân vật nào nói hai dòng này là gì trước màn giải trình (QĐ-023). Hà Vy không sửa câu "Tìm ra rồi!" của Minh Anh.',
      },
      { type: 'task', text: 'Đến phòng giải trình' },
      { type: 'gate', requires: ['ev-c3-shortlist'], to: 'deb-01' },
    ],
  },
];
