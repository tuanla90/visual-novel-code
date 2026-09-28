/**
 * Phần 2 — Điều tra {part: investigation}. Chuyển NGUYÊN VĂN từ docs/prototype/kich-ban-prototype.md.
 *
 * Biểu cảm của người hỏi ở `[HỎI]`: kịch bản chỉ ghi `ha-vy: "…"` (không biểu cảm) mà kiểu
 * DialogueLine bắt buộc có — quy ước của gói noi-dung: lấy biểu cảm ở lời gần nhất của chính
 * người đó ngay trước câu hỏi (chân dung không đổi khi câu hỏi hiện lên).
 */
import type { Sequence } from '../../../story/types';

export const investigationSequences: Sequence[] = [
  {
    id: 'inv-01',
    part: 'investigation',
    scene: 'clb-room',
    title: 'Phòng CLB: xem xét lá thư',
    nodes: [
      { type: 'task', text: 'Xem xét lá thư' },
      {
        type: 'note',
        text: 'Một điểm xem xét trên bàn, có viền và nhãn rõ; đã xem thì đánh dấu (QĐ-027). Không có vật nào khác bấm được.',
      },
      {
        type: 'explore',
        hotspots: [{ id: 'hs-letter', label: 'Lá thư', unlocksClue: 'clue-signature-h', runSequence: 'inv-letter' }],
      },
      { type: 'gate', requires: ['clue-signature-h'], to: 'inv-02' },
    ],
  },
  {
    id: 'inv-letter',
    part: 'investigation',
    scene: 'clb-room',
    title: 'Chữ ký ngoài phong bì',
    nodes: [
      { type: 'show-document', documentId: 'doc-letter' },
      {
        type: 'line',
        speaker: 'narrator',
        text: 'Thư đánh máy, không có tên người viết. Ngoài phong bì có một chữ ký tay: "H."',
      },
      { type: 'line', speaker: 'ha-vy', expression: 'thinking', text: 'Chữ ký chỉ có một chữ cái. H là họ, hay là tên?' },
      {
        type: 'question',
        question: {
          id: 'q-sig-h',
          asker: { speaker: 'ha-vy', expression: 'thinking', text: 'Theo cậu, chữ H nhiều khả năng là chữ đầu của gì?' },
          choices: [
            {
              id: 'ho',
              text: 'Họ, vì trong họ tên, họ đứng đầu tiên.',
              correct: false,
              feedback: [
                {
                  speaker: 'ha-vy',
                  expression: 'neutral',
                  text: 'Họ đứng đầu thật. Nhưng người Việt được gọi bằng tên, và cũng hay ký bằng tên.',
                },
              ],
            },
            {
              id: 'ten',
              text: 'Tên gọi, vì người Việt hay ký bằng tên.',
              correct: true,
              feedback: [
                { speaker: 'ha-vy', expression: 'smile', text: 'Mình cũng nghĩ thế. Mình ký "Vy.", có bao giờ ký "Lê." đâu.' },
              ],
            },
            {
              id: 'ma-lop',
              text: 'Mã lớp, vì giấy tờ ở trường hay ghi mã lớp.',
              correct: false,
              feedback: [
                {
                  speaker: 'ha-vy',
                  expression: 'neutral',
                  text: 'Mã lớp thì ai lại ký tay. Thử nghĩ xem cậu hay ký bằng chữ gì.',
                },
              ],
            },
          ],
        },
      },
      {
        type: 'note',
        text: 'Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035).',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Vẫn chỉ là khả năng thôi. Nhưng là khả năng đáng thử trước.',
      },
      {
        type: 'note',
        text: 'Vì sao giữ manh mối này: nó quyết định cấu trúc truy vấn — lọc cột `ten` (không phải `ho_dem`) bằng phép "bắt đầu bằng" (`LIKE \'H%\'`); đây là điều kiện của c1 và điều kiện đầu tiên của c3. Sau chuỗi này, mục "Từ manh mối" của trình dựng có giá trị `H`.',
      },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'Thư lấy ra từ hộp góp ý sáng nay. Mà trường có ba hộp, ở ba giảng đường.',
      },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Bác Tư lao công sáng nào cũng đi cả ba tòa. Hỏi bác là nhanh nhất.',
      },
      { type: 'task', text: 'Tìm hộp góp ý đã chứa lá thư' },
    ],
  },
  {
    id: 'inv-02',
    part: 'investigation',
    scene: 'corridor-b',
    title: 'Hành lang giảng đường',
    nodes: [
      { type: 'task', text: 'Hỏi bác Tư, xem xét hộp góp ý' },
      {
        type: 'note',
        text: 'Cảnh hành lang: bác Tư (chân dung nhỏ) đang lau sàn cạnh hộp góp ý. Biển "Giảng đường B" nhỏ trên tường, không nhấn mạnh. Hai điểm xem xét, chọn theo thứ tự nào cũng được.',
      },
      { type: 'line', speaker: 'narrator', text: 'Hành lang giảng đường. Bác Tư đang lau sàn cạnh một hộp góp ý.' },
      {
        type: 'explore',
        hotspots: [
          { id: 'hs-bac-tu', label: 'Bác Tư', unlocksClue: 'clue-box-building-b', runSequence: 'inv-bac-tu' },
          { id: 'hs-box', label: 'Hộp góp ý', unlocksClue: 'clue-bookmark-baochi', runSequence: 'inv-box' },
        ],
      },
      { type: 'gate', requires: ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'], to: 'ana-01' },
    ],
  },
  {
    id: 'inv-bac-tu',
    part: 'investigation',
    scene: 'corridor-b',
    title: 'Hộp nào được mở sáng nay',
    nodes: [
      {
        type: 'line',
        speaker: 'bac-tu',
        expression: 'neutral',
        text: 'CLB Thám Tử đấy à? Lâu lắm rồi mới thấy các cháu đi hỏi chuyện.',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: 'Dạ. Bác ơi, sáng nay hộp góp ý nào được mở ạ?' },
      {
        type: 'line',
        speaker: 'bac-tu',
        expression: 'neutral',
        text: 'Mỗi hộp này thôi, hộp giảng đường B. Cô phụ trách hộp góp ý mở, bác đứng lau ngay đây.',
      },
      { type: 'line', speaker: 'bac-tu', expression: 'neutral', text: 'Hộp tòa A với tòa C tuần này chưa đến lượt mở.' },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Vậy người bỏ thư đã đến tòa B. Lớp nào sinh hoạt ở tòa B thì sinh viên lớp ấy hay qua lại đây.',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'worried', text: 'Nhưng view của mình chỉ có lớp, làm gì có tòa nhà.' },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Thì tìm xem lớp nào sinh hoạt ở tòa B. Chắc phải có bảng ghi chuyện đó.',
      },
      {
        type: 'note',
        text: 'Vì sao giữ manh mối này: nó đổi câu hỏi và cấu trúc truy vấn — bảng `sinh_vien` không có cột tòa nhà, nên phải hỏi bảng `lop_sinh_hoat` trước (c2), rồi dùng kết quả làm điều kiện `ma_lop IN (…)` của c3. Câu "cô phụ trách hộp góp ý" cài sẵn nguồn xác minh độc lập cho cú lật ở deb-04 và end-01.',
      },
    ],
  },
  {
    id: 'inv-box',
    part: 'investigation',
    scene: 'corridor-b',
    title: 'Mẩu bookmark ở khe hộp',
    nodes: [
      { type: 'line', speaker: 'narrator', text: 'Sát khe hộp góp ý có nửa mẩu bookmark bị xé, kẹt ở mép khe.' },
      { type: 'show-document', documentId: 'doc-bookmark' },
      {
        type: 'line',
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Nửa logo ngòi bút, còn mấy chữ "…ÁO CHÍ". Bookmark của CLB Báo chí, họ phát ở ngày hội CLB.',
      },
      { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: 'Kẹt ngay khe hộp. Có thể rơi ra lúc ai đó nhét thư vội.' },
      { type: 'line', speaker: 'ha-vy', expression: 'smile', text: 'Thám tử ngày xưa chắc cũng nhặt được mấy thứ kiểu này.' },
      {
        type: 'note',
        text: 'Vì sao giữ manh mối này: nó thêm điều kiện `clb = \'Báo chí\'` cho c3, và đổi cách diễn giải — bookmark cho biết câu lạc bộ, không cho biết ai làm rơi (ghi ở "Lưu ý" của thẻ, không nói trong thoại để giữ QĐ-023). Sau chuỗi này, mục "Từ manh mối" có giá trị `Báo chí`.',
      },
    ],
  },
];
