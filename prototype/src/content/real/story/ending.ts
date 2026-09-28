/**
 * Phần 5 — Kết {part: ending}. Chuyển NGUYÊN VĂN từ docs/prototype/kich-ban-prototype.md.
 *
 * Hiệu ứng phụ trong `[DÀN DỰNG]` thành node tường minh (ARCHITECTURE.md §5), `note` vẫn giữ:
 * - end-03: hết quyền xem dữ liệu → `set-flag access-revoked` + `annotate-evidence` cho MỌI thẻ kết quả
 *   truy vấn có dữ liệu cá nhân (QĐ-062): `ev-c1-names-h`, `ev-c3-shortlist`, `ev-quan-fixed` (chú thích
 *   nguyên văn mục "Hồ sơ vật chứng › ev-…", `redact`: không render tên/mã). `ev-c2-classes-b` chỉ có mã lớp.
 * - end-04: thông điệp kết của narrator hiện dạng thẻ chữ lớn (`display: 'card'`).
 */
import type { Sequence } from '../../../story/types';

/** Chú thích gắn sau màn giải trình cho ev-c3-shortlist (mục "Hồ sơ vật chứng" của kịch bản); không nêu mã sinh viên (QĐ-062). */
export const SHORTLIST_ANNOTATION =
  'Đây là danh sách người cần xác minh, chưa phải kết luận. Theo sổ bàn giao, một người trong danh sách đã ký gửi hộ lá thư; người còn lại vô can. Danh sách đã hủy khi quyền truy cập kết thúc.';

/** Chú thích gắn sau màn giải trình cho ev-c1-names-h và ev-quan-fixed (mục "Hồ sơ vật chứng" của kịch bản). */
export const PERSONAL_DATA_ANNOTATION = 'Dữ liệu cá nhân trong thẻ đã hủy khi quyền truy cập kết thúc.';

export const endingSequences: Sequence[] = [
  {
    id: 'end-01',
    part: 'ending',
    scene: 'debrief-room',
    title: 'Sổ bàn giao niêm phong',
    nodes: [
      { type: 'task', text: 'Đối chiếu với sổ bàn giao' },
      {
        type: 'note',
        text: 'Bước 7 của QĐ-024; theo §2.1, phần Kết bắt đầu từ bước xác minh độc lập. Cô phụ trách hộp góp ý không lên hình, chỉ xuất hiện qua lời kể và tài liệu. Không dùng hiệu ứng "Có số liệu đây!" ở đây: khoảnh khắc này dẫn tới nhân chứng, cần nhẹ nhàng.',
      },
      {
        type: 'line',
        speaker: 'narrator',
        text: 'Hai mươi phút sau, cô phụ trách hộp góp ý gửi lên kết quả đối chiếu.',
      },
      { type: 'show-document', documentId: 'doc-handover-log' },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Sổ niêm phong, không ai được xem. Cô chỉ trả lời mã nào có, mã nào không.',
      },
      { type: 'line', speaker: 'quan', expression: 'neutral', text: 'SV240317 có trong sổ. Phòng CTSV sẽ mời bạn ấy lên.' },
      { type: 'line', speaker: 'quan', expression: 'neutral', text: 'Nói trước: bạn ấy đến để kể lại, không phải để bị xét.' },
      { type: 'goto', to: 'end-02' },
    ],
  },
  {
    id: 'end-02',
    part: 'ending',
    scene: 'debrief-room',
    title: 'Người bỏ hộ lá thư',
    nodes: [
      { type: 'task', text: 'Nghe nhân chứng kể lại' },
      {
        type: 'note',
        text: 'Hoài xuất hiện lần đầu (một mẫu chân dung, ba biểu cảm), bước vào, ôm balo trước ngực. Không tiêu đề "lời khai", không nhạc thẩm vấn. Không ai gọi Hoài là thủ phạm.',
      },
      { type: 'line', speaker: 'hoai', expression: 'nervous', text: 'Em là Hoài, lớp QT24B. Em… có làm gì sai không ạ?' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Không ai trách em cả. Bọn chị chỉ muốn biết lá thư từ đâu đến.',
      },
      { type: 'line', speaker: 'hoai', expression: 'downcast', text: 'Em không viết thư đó. Em chỉ bỏ hộ thôi ạ.' },
      {
        type: 'line',
        speaker: 'hoai',
        expression: 'downcast',
        text: 'Chiều thứ Sáu, một anh năm cuối đeo huy hiệu Robotics nhờ em. Anh ấy đang vội.',
      },
      {
        type: 'line',
        speaker: 'hoai',
        expression: 'nervous',
        text: 'Phiếu gửi phải ký và ghi mã. Anh ấy bảo em ký giúp. Em không đọc thư.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Cảm ơn em. Chuyện ký hộ là quy trình phải sửa, không phải lỗi của em.',
      },
      { type: 'line', speaker: 'hoai', expression: 'relieved', text: 'Dạ… Em cứ tưởng mình bị gọi lên vì làm sai.' },
      { type: 'goto', to: 'end-03' },
    ],
  },
  {
    id: 'end-03',
    part: 'ending',
    scene: 'debrief-room',
    title: 'Khép buổi làm việc',
    nodes: [
      {
        type: 'note',
        text: 'Bước 8 của QĐ-024. Hoài cúi chào rồi ra về trước khi Quân nói về người còn lại.',
      },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'neutral',
        text: 'Bạn Hiếu, SV240228, không có trong sổ. Bạn ấy vô can, CTSV sẽ không liên hệ.',
      },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'neutral',
        text: 'Tìm được người bỏ thư chưa phải là tìm được người viết thư, CLB Thám Tử.',
      },
      { type: 'line', speaker: 'ha-vy', expression: 'neutral', text: 'Chúng em biết.' },
      {
        type: 'line',
        speaker: 'narrator',
        text: 'Năm giờ chiều. Quyền xem dữ liệu của CLB hết hạn. Danh sách hai người được hủy.',
      },
      {
        type: 'note',
        text: 'Thẻ ev-c1-names-h, ev-c3-shortlist và ev-quan-fixed được gắn chú thích sau giải trình (mục Hồ sơ vật chứng); tên và mã trong các thẻ bị làm mờ; nút mở trình dựng truy vấn bị khóa. Quân chứng kiến việc hủy.',
      },
      { type: 'set-flag', flag: 'access-revoked' },
      { type: 'annotate-evidence', evidenceId: 'ev-c1-names-h', note: PERSONAL_DATA_ANNOTATION, redact: true },
      { type: 'annotate-evidence', evidenceId: 'ev-c3-shortlist', note: SHORTLIST_ANNOTATION, redact: true },
      { type: 'annotate-evidence', evidenceId: 'ev-quan-fixed', note: PERSONAL_DATA_ANNOTATION, redact: true },
      { type: 'task', text: 'Về phòng CLB' },
      { type: 'gate', requires: ['doc-handover-log'], to: 'end-04' },
    ],
  },
  {
    id: 'end-04',
    part: 'ending',
    scene: 'clb-room',
    title: 'Phòng CLB, chiều muộn',
    nodes: [
      { type: 'line', speaker: 'minh-anh', expression: 'happy', text: 'Giá mà còn quyền, chị tra ngay CLB Robotics.' },
      { type: 'line', speaker: 'ha-vy', expression: 'smile', text: 'Quyền cấp cho việc này thôi chị. Hết việc là hết quyền.' },
      {
        type: 'line',
        speaker: 'narrator',
        display: 'card',
        text: 'SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu.',
      },
      {
        type: 'note',
        text: 'Câu trên là thông điệp kết của §4.5, giữ nguyên văn, hiện dạng thẻ chữ lớn giữa màn hình.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'happy',
        text: 'Rồi, việc hôm nay xong. Anh năm cuối đeo huy hiệu Robotics… để vụ sau. Em đi tiếp cùng CLB chứ?',
      },
      {
        type: 'note',
        text: 'Sau `[KẾT THÚC]`, gói khác hiện khảo sát cuối game (QĐ-031); kịch bản này không viết khảo sát.',
      },
      { type: 'end' },
    ],
  },
];
