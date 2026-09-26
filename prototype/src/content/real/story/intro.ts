/**
 * Phần 1 — Mở đầu {part: intro}. Chuyển NGUYÊN VĂN từ docs/kich-ban-prototype.md.
 * Không sửa chữ ở đây: sửa kịch bản trước, rồi chép lại (test trung thành so hai chiều).
 */
import type { Sequence } from '../../../story/types';

export const introSequences: Sequence[] = [
  {
    id: 'intro-01',
    part: 'intro',
    scene: 'clb-room',
    title: 'Phòng CLB, lá thư và việc được nhờ',
    nodes: [
      { type: 'task', text: 'Nghe Minh Anh kể về vụ việc' },
      {
        type: 'note',
        text: 'Cảnh phòng CLB (tông ấm): tủ hồ sơ cũ, bảng trắng, ba cái ghế. Chưa có điểm xem xét. Space/Enter để qua lời.',
      },
      { type: 'line', speaker: 'narrator', text: 'Tuần thứ hai năm nhất. Bạn vừa ghi danh vào CLB Thám Tử được ba ngày.' },
      { type: 'line', speaker: 'minh-anh', expression: 'worried', text: 'Rồi, việc hôm nay là… giữ lại cái phòng này.' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Ngày xưa CLB phá vụ bằng mắt và chân: quan sát hiện trường, hỏi nhân chứng, đọc dấu vết.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'worried',
        text: 'Rồi trường chuyển hết lên hệ thống số. Manh mối nằm trong dữ liệu, mà cả CLB không ai đọc nổi.',
      },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Thế là vụ giải được ít dần, người bỏ đi dần. Giờ còn ba người, tính cả cậu.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'worried',
        text: 'Sáng nay, Phòng Công tác sinh viên chuyển cho CLB bản chụp một lá thư lấy từ hộp góp ý.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Thư đề nghị thu hồi phòng của CLB, vì "CLB không còn giải quyết được việc gì".',
      },
      { type: 'line', speaker: 'ha-vy', expression: 'thinking', text: 'Câu này… hơi đau.' },
      { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: 'Nhưng Phòng CTSV không nhờ mình tìm thủ phạm.' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Họ nhờ xác minh ai đã trực tiếp bỏ lá thư, để hỏi nguồn gốc thư và làm rõ quy trình tiếp nhận.',
      },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'smile',
        text: 'Một CLB "không giải quyết được việc gì" mà làm xong việc này thì…',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'happy', text: '…thì lá thư tự bác chính nó.' },
      { type: 'goto', to: 'intro-02' },
    ],
  },
  {
    id: 'intro-02',
    part: 'intro',
    scene: 'clb-room',
    title: 'Quyền xem dữ liệu trong một buổi',
    nodes: [
      { type: 'line', speaker: 'player', text: 'Vậy mình sẽ được xem dữ liệu sinh viên ạ?' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Một view tối thiểu thôi em: mã sinh viên, họ đệm, tên, lớp, câu lạc bộ.',
      },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Không có ngày sinh, quê quán, số điện thoại hay chỗ ở KTX. Việc cần gì thì cấp nấy.',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'worried', text: 'Quyền chỉ có trong buổi làm việc hôm nay. Hết buổi là hết.' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Em quen Excel đúng không? Hà Vy chỉ cách đọc dữ liệu, em cầm máy.',
      },
      { type: 'line', speaker: 'ha-vy', expression: 'smile', text: 'Yên tâm. Bảng dữ liệu cũng chỉ là một cái sheet to thôi.' },
      { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: 'Nhưng trước khi đụng vào dữ liệu, xem kỹ lá thư đã.' },
      { type: 'goto', to: 'inv-01' },
    ],
  },
];
