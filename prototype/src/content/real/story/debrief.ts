/**
 * Phần 4 — Giải trình {part: debrief}. Chuyển NGUYÊN VĂN từ docs/prototype/kich-ban-prototype.md.
 *
 * Hai hiệu ứng phụ nằm trong `[DÀN DỰNG]` thành node tường minh (ARCHITECTURE.md §5), `note`
 * vẫn giữ nguyên văn ngay trước:
 * - deb-01: màn chiếu truy vấn OR của Quân — SQL lấy từ hằng QUAN_OR_QUERY (nguồn duy nhất,
 *   không chép lại), chạy thật, 24 dòng.
 * - deb-03: màn chiếu truy vấn người chơi đã sửa (vật chứng ev-quan-fixed), 2 dòng.
 * Biểu cảm của người hỏi ở `[HỎI]`: lấy ở lời gần nhất của chính người đó ngay trước câu hỏi
 * (xem story/investigation.ts).
 */
import { QUAN_OR_QUERY } from '../../../sql-challenge/data/challenges';
import type { Sequence } from '../../../story/types';

export const debriefSequences: Sequence[] = [
  {
    id: 'deb-01',
    part: 'debrief',
    scene: 'debrief-room',
    title: 'Ban Pháp chế thẩm tra',
    nodes: [
      { type: 'task', text: 'Trình bày cách CLB dùng dữ liệu' },
      {
        type: 'note',
        text: 'Cảnh phòng giải trình (tông lạnh). Quân ngồi một bên bàn, hồ sơ xếp thẳng mép. Minh Anh, Hà Vy, người chơi ngồi bên kia. Màn chiếu sau lưng Quân. Bước 1 của QĐ-024.',
      },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'neutral',
        text: 'Tôi là Quân, Ban Pháp chế – Kiểm tra Hội sinh viên. Tôi không xét nội dung lá thư.',
      },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'neutral',
        text: 'CLB là bên bị đề nghị thu hồi phòng, lại tự tra người bỏ thư. Tôi cần xem CLB dùng dữ liệu thế nào.',
      },
      { type: 'line', speaker: 'quan', expression: 'smug', text: 'Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có.' },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'neutral',
        text: 'Tôi đã tự chạy lại ba manh mối của CLB, trên đúng view CLB được cấp.',
      },
      {
        type: 'note',
        text: 'Màn chiếu hiện truy vấn của Quân nguyên văn (5 dòng, §4.4), chạy thật trên dataset chính: bảng kết quả 24 dòng, dòng đếm "24 dòng" (QĐ-012).',
      },
      {
        type: 'projector',
        projector: { id: 'proj-quan-or', source: { kind: 'sql', sql: QUAN_OR_QUERY }, run: true, expectedRowCount: 24 },
      },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'smug',
        text: 'Hai mươi tư người, hơn nửa số sinh viên trong view. Manh mối kiểu này thì vô dụng.',
      },
      { type: 'line', speaker: 'quan', expression: 'neutral', text: 'Vậy danh sách hai người của CLB từ đâu ra?' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'worried',
        text: 'Hai mươi tư? Cùng ba manh mối mà sao lệch nhiều thế…',
      },
      { type: 'line', speaker: 'ha-vy', expression: 'thinking', text: 'Có gì đó sai. Đọc kỹ từng dòng truy vấn của anh ấy.' },
      { type: 'task', text: 'Chỉ ra dòng lỗi trong truy vấn của Quân' },
      {
        type: 'note',
        text: 'Bước 2 của QĐ-024. Năm dòng SQL trên màn chiếu thành năm vùng chạm được. Dòng 4 và dòng 5 đều đúng (cùng một lỗi `OR`). Chạm sai không phạt, không giới hạn số lần.',
      },
      {
        type: 'line-pick',
        pick: {
          id: 'q-quan-lines',
          lines: [
            {
              index: 1,
              sql: 'SELECT ma_sv, ho_dem, ten, ma_lop, clb',
              correct: false,
              feedback: [
                { speaker: 'quan', expression: 'neutral', text: 'Đủ cột cả: mã, họ tên, lớp, câu lạc bộ.' },
                {
                  speaker: 'ha-vy',
                  expression: 'thinking',
                  text: 'Cột thì ổn. Xem anh ấy nối ba manh mối bằng từ gì: "và" hay "hoặc"?',
                },
              ],
            },
            {
              index: 2,
              sql: 'FROM sinh_vien',
              correct: false,
              feedback: [
                { speaker: 'quan', expression: 'neutral', text: 'Người cần tìm nằm trong bảng này. Không sai.' },
                {
                  speaker: 'ha-vy',
                  expression: 'thinking',
                  text: 'Bảng thì đúng. Xem anh ấy nối ba manh mối bằng từ gì: "và" hay "hoặc"?',
                },
              ],
            },
            {
              index: 3,
              sql: "WHERE ten LIKE 'H%'",
              correct: false,
              feedback: [
                { speaker: 'quan', expression: 'neutral', text: 'Điều kiện này lấy đúng từ chữ ký CLB đưa ra.' },
                {
                  speaker: 'ha-vy',
                  expression: 'thinking',
                  text: 'Điều kiện này đúng. Xem nó được nối với hai điều kiện kia bằng từ gì.',
                },
              ],
            },
            { index: 4, sql: "OR ma_lop IN ('KT24A', 'QT24B')", correct: true, feedback: [] },
            { index: 5, sql: "OR clb = 'Báo chí';", correct: true, feedback: [] },
          ],
        },
      },
      { type: 'goto', to: 'deb-02' },
    ],
  },
  {
    id: 'deb-02',
    part: 'debrief',
    scene: 'debrief-room',
    title: 'Có số liệu đây: bất kỳ hay đồng thời',
    nodes: [
      { type: 'effect', effectId: 'co-so-lieu-day' },
      { type: 'note', text: 'Bước 3 của QĐ-024, lần dùng hiệu ứng thứ nhất (QĐ-025).' },
      {
        type: 'line',
        speaker: 'player',
        text: 'Anh nối ba manh mối bằng OR. Chỉ cần khớp một manh mối là đã vào danh sách.',
      },
      {
        type: 'line',
        speaker: 'player',
        text: 'Tên bắt đầu bằng H, hoặc học lớp tòa B, hoặc ở CLB Báo chí. Bảo sao ra 24 người.',
      },
      { type: 'line', speaker: 'player', text: 'Người bỏ thư phải khớp cả ba cùng lúc. Phải nối bằng AND.' },
      { type: 'line', speaker: 'quan', expression: 'stunned', text: '…' },
      {
        type: 'line',
        speaker: 'quan',
        expression: 'neutral',
        text: 'Nói thì dễ. Sửa ngay trên truy vấn của tôi, rồi chạy cho mọi người cùng xem.',
      },
      { type: 'task', text: 'Sửa truy vấn của Quân và chạy lại' },
      {
        type: 'note',
        text: 'Bước 4 của QĐ-024: trình dựng mở với truy vấn của Quân nạp sẵn (thẻ debrief-fix).',
      },
      { type: 'fix-query', challengeId: 'debrief-fix' },
      { type: 'goto', to: 'deb-03' },
    ],
  },
  {
    id: 'deb-03',
    part: 'debrief',
    scene: 'debrief-room',
    title: 'Hai dòng nghĩa là gì',
    nodes: [
      { type: 'effect', effectId: 'co-so-lieu-day' },
      {
        type: 'note',
        text: 'Lần dùng hiệu ứng thứ hai, cũng là lần cuối (QĐ-025). Màn chiếu hiện truy vấn đã sửa và kết quả 2 dòng.',
      },
      {
        type: 'projector',
        projector: { id: 'proj-fixed', source: { kind: 'evidence', evidenceId: 'ev-quan-fixed' }, run: true, expectedRowCount: 2 },
      },
      { type: 'line', speaker: 'player', text: 'Vẫn ba manh mối ấy, nối bằng AND: còn hai dòng.' },
      { type: 'line', speaker: 'quan', expression: 'stunned', text: '…Lần này là tôi đọc vội.' },
      { type: 'line', speaker: 'quan', expression: 'neutral', text: 'Tôi công nhận truy vấn. Giờ đến câu quan trọng hơn.' },
      { type: 'task', text: 'Giải thích hai dòng kết quả' },
      {
        type: 'note',
        text: 'Bước 5 của QĐ-024. Đây là lần đầu game hỏi ranh giới giữa nghi vấn và kết luận (QĐ-023).',
      },
      {
        type: 'question',
        question: {
          id: 'q-two-rows',
          asker: { speaker: 'quan', expression: 'neutral', text: 'Hai dòng này nghĩa là gì?' },
          choices: [
            {
              id: 'tim-ra-roi',
              text: 'Tìm ra rồi: người bỏ thư là một trong hai bạn này.',
              correct: false,
              feedback: [
                {
                  speaker: 'ha-vy',
                  expression: 'thinking',
                  text: 'Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?',
                },
              ],
            },
            {
              id: 'can-xac-minh',
              text: 'Hai người cần xác minh thêm, chưa phải người bỏ thư.',
              correct: true,
              feedback: [
                {
                  speaker: 'quan',
                  expression: 'neutral',
                  text: 'Đúng. Khớp manh mối là một chuyện. Đã bỏ thư là chuyện khác.',
                },
              ],
            },
            {
              id: 'vo-dung',
              text: 'Chưa nói lên gì, vì manh mối nào cũng có thể trùng hợp.',
              correct: false,
              feedback: [
                {
                  speaker: 'ha-vy',
                  expression: 'thinking',
                  text: 'Từ bốn mươi người còn hai. Thu hẹp được thế là có ích chứ. Nhưng ích đến đâu?',
                },
              ],
            },
          ],
        },
      },
      {
        type: 'note',
        text: 'Ba lựa chọn dài 11–13 chữ, cùng giọng thường; lựa chọn `tim-ra-roi` nối tiếp câu "Tìm ra rồi!" của Minh Anh, `vo-dung` nối tiếp kết luận của Quân (QĐ-035). Phản hồi của `tim-ra-roi` là câu gợi ý chuẩn hint-ask-or-conclude (§5.2).',
      },
      {
        type: 'note',
        text: 'Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-two-rows: đo chỉ số "trả lời đúng rằng kết quả truy vấn chưa tự chứng minh hành vi" (§10).',
      },
      { type: 'goto', to: 'deb-04' },
    ],
  },
  {
    id: 'deb-04',
    part: 'debrief',
    scene: 'debrief-room',
    title: 'Cú lật: dựa vào đâu?',
    nodes: [
      { type: 'line', speaker: 'quan', expression: 'neutral', text: 'Vậy tôi hỏi thẳng.' },
      { type: 'task', text: 'Trả lời câu hỏi của Quân' },
      {
        type: 'note',
        text: 'Bước 6 của QĐ-024, cú lật chính (§4.4). Câu hỏi của Quân giữ nguyên văn.',
      },
      {
        type: 'question',
        question: {
          id: 'q-verify',
          asker: {
            speaker: 'quan',
            expression: 'neutral',
            text: 'Nếu dữ liệu chưa kết luận được, CLB dựa vào đâu để biết ai đã bỏ thư?',
          },
          choices: [
            {
              id: 'them-dieu-kien',
              text: 'Thêm điều kiện vào truy vấn cho đến khi chỉ còn một dòng.',
              correct: false,
              feedback: [
                {
                  speaker: 'quan',
                  expression: 'neutral',
                  text: 'Thêm điều kiện nào? Không có manh mối đứng sau thì chỉ là cắt cho gọn. Cắt nhầm là mất người thật.',
                },
              ],
            },
            {
              id: 'chon-dang-ngo',
              text: 'Chọn bạn trông đáng ngờ hơn trong hai bạn để hỏi trước.',
              correct: false,
              feedback: [
                {
                  speaker: 'quan',
                  expression: 'neutral',
                  text: 'Đáng ngờ theo cột nào? Bảng này không có cột "đáng ngờ".',
                },
              ],
            },
            {
              id: 'goi-ca-hai',
              text: 'Mời cả hai bạn lên, hỏi thẳng xem ai đã bỏ thư.',
              correct: false,
              feedback: [
                {
                  speaker: 'minh-anh',
                  expression: 'worried',
                  text: 'Gọi cả hai lên thì người vô can cũng bị làm phiền. CLB tìm sự thật, không để làm ai bẽ mặt.',
                },
              ],
            },
            {
              id: 'nguon-khac',
              text: 'Tìm một nguồn khác ngoài dữ liệu để đối chiếu hai bạn này.',
              correct: true,
              feedback: [{ speaker: 'quan', expression: 'neutral', text: 'Đó là câu tôi chờ. Nguồn nào?' }],
            },
          ],
        },
      },
      {
        type: 'note',
        text: 'Bốn lựa chọn dài 12–13 chữ, cùng giọng thường. Lựa chọn đúng không nêu nguồn cụ thể: người chơi tự nối với lời bác Tư ở inv-bac-tu (QĐ-035).',
      },
      {
        type: 'note',
        text: 'Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)…(D) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-verify (câu "dữ liệu đã đủ kết luận chưa?", §9.3); cho chọn lại không giới hạn.',
      },
      { type: 'line', speaker: 'player', text: 'Cô phụ trách hộp góp ý. Bác Tư bảo sáng nay cô mở hộp B.' },
      {
        type: 'line',
        speaker: 'minh-anh',
        expression: 'neutral',
        text: 'CLB chỉ xin cô đối chiếu đúng hai mã này thôi, không hơn.',
      },
      { type: 'line', speaker: 'quan', expression: 'neutral', text: 'Tôi sẽ chuyển đề nghị ngay.' },
      { type: 'goto', to: 'end-01' },
    ],
  },
];
