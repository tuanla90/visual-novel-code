/**
 * NỘI DUNG MẪU — KHÔNG PHẢI KỊCH BẢN THẬT.
 * Mục đích: chạy thử trọn luồng 5 phần với đủ mọi loại node. 1–3 lời mỗi phần.
 * Gói `noi-dung` (gói 5) thay bằng dữ liệu chuyển từ docs/kich-ban-prototype.md.
 */
import type { StoryContent } from '../../story/types';

export const SAMPLE_QUAN_OR_SQL = `SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
   OR ma_lop IN ('KT24A', 'QT24B')
   OR clb = 'Báo chí';`;

export const sampleStory: StoryContent = {
  startSequenceId: 'intro-01',
  sequences: [
    // ---------- Phần 1 — Mở đầu ----------
    {
      id: 'intro-01',
      part: 'intro',
      scene: 'clb-room',
      title: '(MẪU) Phòng CLB, nhận việc',
      nodes: [
        { type: 'task', text: '(MẪU) Nghe Minh Anh kể về vụ việc' },
        { type: 'note', text: '(MẪU) Cảnh phòng CLB tông ấm. Chưa có điểm xem xét.' },
        { type: 'line', speaker: 'narrator', text: '(MẪU) Tuần thứ hai năm nhất. Bạn vừa vào CLB Thám Tử.' },
        { type: 'line', speaker: 'minh-anh', expression: 'worried', text: '(MẪU) Việc hôm nay là giữ lại cái phòng này.' },
        { type: 'line', speaker: 'ha-vy', expression: 'smile', text: '(MẪU) Bảng dữ liệu cũng chỉ là một cái sheet to thôi.' },
        { type: 'goto', to: 'inv-01' },
      ],
    },

    // ---------- Phần 2 — Điều tra ----------
    {
      id: 'inv-01',
      part: 'investigation',
      scene: 'clb-room',
      title: '(MẪU) Xem xét lá thư',
      nodes: [
        { type: 'task', text: '(MẪU) Xem xét lá thư' },
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
      title: '(MẪU) Chữ ký ngoài phong bì',
      nodes: [
        { type: 'show-document', documentId: 'doc-letter' },
        { type: 'line', speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Chữ ký chỉ có một chữ cái. H là họ, hay là tên?' },
        {
          type: 'question',
          question: {
            id: 'q-sig-h',
            asker: { speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Theo cậu, chữ H nhiều khả năng là chữ đầu của gì?' },
            choices: [
              {
                id: 'ho',
                text: '(MẪU) Họ, vì họ đứng đầu tiên.',
                correct: false,
                feedback: [{ speaker: 'ha-vy', expression: 'neutral', text: '(MẪU) Người Việt hay ký bằng tên.' }],
              },
              {
                id: 'ten',
                text: '(MẪU) Tên gọi, vì người Việt hay ký bằng tên.',
                correct: true,
                feedback: [{ speaker: 'ha-vy', expression: 'smile', text: '(MẪU) Mình cũng nghĩ thế.' }],
              },
            ],
          },
        },
        { type: 'line', speaker: 'minh-anh', expression: 'neutral', text: '(MẪU) Thư lấy ra từ hộp góp ý sáng nay. Mà trường có ba hộp.' },
      ],
    },
    {
      id: 'inv-02',
      part: 'investigation',
      scene: 'corridor-b',
      title: '(MẪU) Hành lang giảng đường',
      nodes: [
        { type: 'task', text: '(MẪU) Hỏi bác Tư, xem xét hộp góp ý' },
        { type: 'line', speaker: 'narrator', text: '(MẪU) Hành lang giảng đường. Bác Tư đang lau sàn cạnh một hộp góp ý.' },
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
      title: '(MẪU) Hộp nào được mở sáng nay',
      nodes: [
        { type: 'line', speaker: 'bac-tu', expression: 'neutral', text: '(MẪU) Mỗi hộp này thôi, hộp giảng đường B.' },
        { type: 'line', speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Vậy phải tìm xem lớp nào sinh hoạt ở tòa B.' },
      ],
    },
    {
      id: 'inv-box',
      part: 'investigation',
      scene: 'corridor-b',
      title: '(MẪU) Mẩu bookmark ở khe hộp',
      nodes: [
        { type: 'show-document', documentId: 'doc-bookmark' },
        { type: 'line', speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Bookmark của CLB Báo chí.' },
      ],
    },

    // ---------- Phần 3 — Phân tích ----------
    {
      id: 'ana-01',
      part: 'analysis',
      scene: 'clb-room',
      title: '(MẪU) Mở dữ liệu — thử thách 1',
      nodes: [
        { type: 'task', text: '(MẪU) Tìm sinh viên có tên bắt đầu bằng H' },
        { type: 'line', speaker: 'ha-vy', expression: 'neutral', text: '(MẪU) Bắt đầu từ manh mối dễ nhất: chữ H.' },
        { type: 'challenge', challengeId: 'c1' },
        { type: 'goto', to: 'ana-c2-intro' },
      ],
    },
    {
      id: 'ana-c2-intro',
      part: 'analysis',
      scene: 'clb-room',
      title: '(MẪU) Thử thách 2',
      nodes: [
        { type: 'task', text: '(MẪU) Tìm các lớp sinh hoạt ở giảng đường B' },
        { type: 'challenge', challengeId: 'c2' },
        { type: 'goto', to: 'ana-c3-intro' },
      ],
    },
    {
      id: 'ana-c3-intro',
      part: 'analysis',
      scene: 'clb-room',
      title: '(MẪU) Thử thách 3',
      nodes: [
        { type: 'task', text: '(MẪU) Tìm người khớp cả ba manh mối' },
        { type: 'challenge', challengeId: 'c3' },
        { type: 'goto', to: 'ana-c3-done' },
      ],
    },
    {
      id: 'ana-c3-done',
      part: 'analysis',
      scene: 'clb-room',
      title: '(MẪU) "Tìm ra rồi!"',
      nodes: [
        { type: 'line', speaker: 'minh-anh', expression: 'happy', text: '(MẪU) Hai người! Tìm ra rồi!' },
        { type: 'task', text: '(MẪU) Đến phòng giải trình' },
        { type: 'gate', requires: ['ev-c3-shortlist'], to: 'deb-01' },
      ],
    },

    // ---------- Phần 4 — Giải trình ----------
    {
      id: 'deb-01',
      part: 'debrief',
      scene: 'debrief-room',
      title: '(MẪU) Ban Pháp chế thẩm tra',
      nodes: [
        { type: 'task', text: '(MẪU) Trình bày cách CLB dùng dữ liệu' },
        { type: 'line', speaker: 'quan', expression: 'smug', text: '(MẪU) Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có.' },
        {
          type: 'projector',
          projector: { id: 'proj-quan-or', source: { kind: 'sql', sql: SAMPLE_QUAN_OR_SQL }, run: true, expectedRowCount: 24, caption: '(MẪU) Truy vấn Quân tự chạy' },
        },
        { type: 'task', text: '(MẪU) Chỉ ra dòng lỗi trong truy vấn của Quân' },
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
                  { speaker: 'quan', expression: 'neutral', text: '(MẪU) Đủ cột cả.' },
                  { speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Cột thì ổn. Xem anh ấy nối ba manh mối bằng từ gì.' },
                ],
              },
              { index: 2, sql: 'FROM sinh_vien', correct: false, feedback: [{ speaker: 'quan', expression: 'neutral', text: '(MẪU) Bảng thì đúng.' }] },
              { index: 3, sql: "WHERE ten LIKE 'H%'", correct: false, feedback: [{ speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Điều kiện này đúng.' }] },
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
      title: '(MẪU) Có số liệu đây',
      nodes: [
        { type: 'effect', effectId: 'co-so-lieu-day' },
        { type: 'line', speaker: 'player', text: '(MẪU) Anh nối ba manh mối bằng OR. Phải nối bằng AND.' },
        { type: 'line', speaker: 'quan', expression: 'stunned', text: '(MẪU) …' },
        { type: 'task', text: '(MẪU) Sửa truy vấn của Quân và chạy lại' },
        { type: 'fix-query', challengeId: 'debrief-fix' },
        { type: 'goto', to: 'deb-03' },
      ],
    },
    {
      id: 'deb-03',
      part: 'debrief',
      scene: 'debrief-room',
      title: '(MẪU) Hai dòng nghĩa là gì',
      nodes: [
        { type: 'effect', effectId: 'co-so-lieu-day' },
        {
          type: 'projector',
          projector: { id: 'proj-fixed', source: { kind: 'evidence', evidenceId: 'ev-quan-fixed' }, run: true, expectedRowCount: 2 },
        },
        { type: 'task', text: '(MẪU) Giải thích hai dòng kết quả' },
        {
          type: 'question',
          question: {
            id: 'q-two-rows',
            asker: { speaker: 'quan', expression: 'neutral', text: '(MẪU) Hai dòng này nghĩa là gì?' },
            choices: [
              { id: 'tim-ra-roi', text: '(MẪU) Tìm ra rồi: một trong hai bạn này.', correct: false, feedback: [{ speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Ai cần hỏi tiếp, hay đã đủ để kết luận?' }] },
              { id: 'can-xac-minh', text: '(MẪU) Hai người cần xác minh thêm.', correct: true, feedback: [{ speaker: 'quan', expression: 'neutral', text: '(MẪU) Đúng. Khớp manh mối là một chuyện.' }] },
              { id: 'vo-dung', text: '(MẪU) Chưa nói lên gì.', correct: false, feedback: [{ speaker: 'ha-vy', expression: 'thinking', text: '(MẪU) Từ bốn mươi còn hai. Có ích chứ.' }] },
            ],
          },
        },
        { type: 'task', text: '(MẪU) Trả lời câu hỏi của Quân' },
        {
          type: 'question',
          question: {
            id: 'q-verify',
            asker: { speaker: 'quan', expression: 'neutral', text: '(MẪU) Nếu dữ liệu chưa kết luận được, CLB dựa vào đâu?' },
            choices: [
              { id: 'them-dieu-kien', text: '(MẪU) Thêm điều kiện đến khi còn một dòng.', correct: false, feedback: [{ speaker: 'quan', expression: 'neutral', text: '(MẪU) Cắt nhầm là mất người thật.' }] },
              { id: 'nguon-khac', text: '(MẪU) Tìm một nguồn khác để đối chiếu.', correct: true, feedback: [{ speaker: 'quan', expression: 'neutral', text: '(MẪU) Đó là câu tôi chờ.' }] },
            ],
          },
        },
        { type: 'line', speaker: 'player', text: '(MẪU) Cô phụ trách hộp góp ý.' },
        { type: 'goto', to: 'end-01' },
      ],
    },

    // ---------- Phần 5 — Kết ----------
    {
      id: 'end-01',
      part: 'ending',
      scene: 'debrief-room',
      title: '(MẪU) Sổ bàn giao niêm phong',
      nodes: [
        { type: 'task', text: '(MẪU) Đối chiếu với sổ bàn giao' },
        { type: 'show-document', documentId: 'doc-handover-log' },
        { type: 'line', speaker: 'hoai', expression: 'nervous', text: '(MẪU) Em là Hoài. Em chỉ bỏ hộ thôi ạ.' },
        { type: 'line', speaker: 'hoai', expression: 'relieved', text: '(MẪU) Dạ… Em cứ tưởng mình bị gọi lên vì làm sai.' },
        { type: 'set-flag', flag: 'access-revoked' },
        {
          type: 'annotate-evidence',
          evidenceId: 'ev-c3-shortlist',
          note: '(MẪU) Danh sách cần xác minh, chưa phải kết luận. Đã hủy khi quyền truy cập kết thúc.',
          redact: true,
        },
        { type: 'task', text: '(MẪU) Về phòng CLB' },
        { type: 'gate', requires: ['doc-handover-log'], to: 'end-02' },
      ],
    },
    {
      id: 'end-02',
      part: 'ending',
      scene: 'clb-room',
      title: '(MẪU) Phòng CLB, chiều muộn',
      nodes: [
        {
          type: 'line',
          speaker: 'narrator',
          display: 'card',
          text: '(MẪU) SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu.',
        },
        { type: 'line', speaker: 'minh-anh', expression: 'happy', text: '(MẪU) Em đi tiếp cùng CLB chứ?' },
        { type: 'end' },
      ],
    },
  ],
};
