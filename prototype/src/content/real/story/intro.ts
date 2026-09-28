/**
 * Phần 1 — Mở đầu {part: intro}. Chuyển NGUYÊN VĂN từ docs/prototype/kich-ban-prototype.md.
 * Không sửa chữ ở đây: sửa kịch bản trước, rồi chép lại (test trung thành so hai chiều).
 */
import type { Sequence } from '../../../story/types';

export const introSequences: Sequence[] = [
  {
    id: 'intro-00',
    part: 'intro',
    scene: 'corridor-b',
    title: 'Dạo quanh khuôn viên cùng Trần Tùng',
    nodes: [
      { type: 'task', text: 'Dạo quanh khuôn viên trường cùng Tùng' },
      {
        type: 'note',
        text: 'Cảnh hành lang thoáng đãng nhìn ra sân trường và hàng phượng vĩ. Tùng cầm cẩm nang bản đồ trường, hồ hởi dẫn đường.',
      },
      { type: 'line', speaker: 'narrator', text: 'Tuần đầu tiên bước chân vào cổng trường Đại học Hoa Phượng.' },
      {
        type: 'line',
        speaker: 'tung',
        expression: 'neutral',
        text: 'Đi một vòng từ sáng tới giờ đã thấy trường mình rộng chưa? Phòng KTX tụi mình ở tầng 3 khu B là thoáng nhất rồi đấy!',
      },
      {
        type: 'line',
        speaker: 'player',
        text: 'Công nhận, từ khu giảng đường A qua khu B mà hoa hết cả mắt.',
      },
      {
        type: 'line',
        speaker: 'tung',
        expression: 'neutral',
        text: 'Phía bên kia là Thư viện trung tâm bốn tầng điều hòa mát rượi, còn đằng sau là Căng tin với sân thể thao.',
      },
      {
        type: 'line',
        speaker: 'player',
        text: 'Cảm ơn cậu đã làm hướng dẫn viên nhiệt tình suốt cả buổi sáng nhé.',
      },
      {
        type: 'line',
        speaker: 'tung',
        expression: 'neutral',
        text: 'Bạn cùng phòng với nhau cả, khách khí làm gì! Cơ mà nghe bảo cậu mới ghi danh vào CLB Thám tử Dữ liệu à?',
      },
      {
        type: 'line',
        speaker: 'player',
        text: 'Đúng rồi, hôm nay là buổi gặp mặt đầu tiên của CLB.',
      },
      {
        type: 'line',
        speaker: 'tung',
        expression: 'neutral',
        text: 'Phòng CLB ở ngay cuối hành lang này này. Cậu vào đi kẻo muộn, tớ lượn sang căng tin làm cốc trà đá đây!',
      },
      {
        type: 'line',
        speaker: 'tung',
        expression: 'neutral',
        text: 'Chiều về KTX nhớ kể tớ nghe xem CLB thám tử có vụ án gì ly kỳ không nhé!',
      },
      { type: 'goto', to: 'intro-01' },
    ],
  },
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
