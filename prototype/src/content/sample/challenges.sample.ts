/**
 * NỘI DUNG MẪU — thẻ thử thách tối giản. SQL chuẩn/cột bắt buộc lấy từ
 * prototype-scope-down-v0.1.md §4.3–4.4 và QĐ-019 (gói sql-engine cần đúng các giá trị này);
 * lời thoại là mẫu, gói `noi-dung` thay bằng lời thật.
 */
import type { ChallengeId } from '../../shared/ids';
import type { ChallengeDefinition, CommonDiagnosticLines, StandardHints } from '../../sql-challenge/types';
import type { DialogueLine } from '../../story/types';

const hv = (expression: 'neutral' | 'thinking' | 'smile', text: string): DialogueLine => ({ speaker: 'ha-vy', expression, text });

export const sampleStandardHints: StandardHints = {
  'hint-any-or-all': hv('thinking', '(MẪU) Cậu muốn khớp bất kỳ, hay khớp đồng thời?'),
  'hint-right-columns': hv('thinking', '(MẪU) Kết quả đã có đúng cột cần để trả lời câu hỏi chưa?'),
  'hint-ask-or-conclude': hv('thinking', '(MẪU) Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?'),
};

export const sampleCommonDiagnosticLines: CommonDiagnosticLines = {
  'not-select': { line: hv('neutral', '(MẪU) Trong buổi làm việc này CLB chỉ có quyền xem dữ liệu.') },
  'syntax-error': { line: hv('thinking', '(MẪU) Máy chưa đọc được câu này.') },
  'no-table': { line: hv('neutral', '(MẪU) Hàng FROM còn trống.') },
  'connector-unset': { line: hv('neutral', '(MẪU) Chưa chọn cách nối các điều kiện.') },
  'extra-columns': { line: hv('smile', '(MẪU) Đúng rồi! Chỉ cần các cột đề bài hỏi là đủ.') },
  other: { line: hv('thinking', '(MẪU) Chưa khớp câu hỏi.') },
};

export const sampleChallenges: Record<ChallengeId, ChallengeDefinition> = {
  c1: {
    spec: {
      id: 'c1',
      table: 'sinh_vien',
      referenceSql: "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%';",
      requiredColumns: ['ma_sv', 'ho_dem', 'ten'],
      encouragedColumns: [],
      runHiddenDataset: true,
      expectedRowCount: 10,
    },
    content: {
      id: 'c1',
      title: '(MẪU) Thử thách 1 — Ai có tên bắt đầu bằng H?',
      prompt: '(MẪU) Những sinh viên nào có tên bắt đầu bằng chữ H? Kết quả cần có: mã sinh viên, họ đệm, tên.',
      relatedClues: ['clue-signature-h'],
      learningGoal: '(MẪU) SELECT, FROM, WHERE, LIKE và %.',
      steps: [
        { step: 1, highlight: 'from', line: hv('neutral', '(MẪU) Hàng FROM trước: bảng sinh_vien.') },
        { step: 2, highlight: 'preview', line: hv('smile', '(MẪU) Bấm "Xem 5 dòng đầu" để liếc qua bảng.') },
        { step: 3, highlight: 'select', line: hv('neutral', '(MẪU) Hàng SELECT: ma_sv, ho_dem, ten.') },
        { step: 4, highlight: 'where', line: hv('neutral', '(MẪU) Hàng WHERE: cột ten, "bắt đầu bằng", giá trị H.') },
        { step: 5, highlight: 'run', line: hv('smile', '(MẪU) Bấm Chạy nào!') },
      ],
      hints: [hv('neutral', '(MẪU) Gợi ý 1.'), hv('thinking', '(MẪU) Gợi ý 2.'), hv('smile', '(MẪU) Gợi ý 3, gần như đáp án.')],
      diagnosticLines: {
        'no-filter': { line: hv('neutral', '(MẪU) Đây là cả bảng, chưa lọc gì.') },
        'missing-columns': { useStandardHint: 'hint-right-columns' },
      },
      onCorrect: hv('smile', '(MẪU) Truy vấn đầu tiên của cậu đấy! Mười dòng.'),
      readQuestion: {
        id: 'q-c1-read',
        asker: hv('neutral', '(MẪU) Mười dòng này là những ai?'),
        choices: [
          { id: 'chua-h', text: '(MẪU) Người có chữ H trong cả họ tên.', correct: false, feedback: [hv('thinking', "(MẪU) 'H%' chỉ khớp khi H đứng đầu.")] },
          { id: 'ten-h', text: '(MẪU) Người có tên gọi bắt đầu bằng H.', correct: true, feedback: [hv('smile', '(MẪU) Chuẩn.')] },
        ],
      },
      evidence: { id: 'ev-c1-names-h', title: '(MẪU) Sinh viên có tên bắt đầu bằng H', description: '(MẪU) 10 dòng từ bảng sinh_vien.' },
    },
  },
  c2: {
    spec: {
      id: 'c2',
      table: 'lop_sinh_hoat',
      referenceSql: "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';",
      requiredColumns: ['ma_lop'],
      encouragedColumns: [],
      runHiddenDataset: false,
      expectedRowCount: 2,
    },
    content: {
      id: 'c2',
      title: '(MẪU) Thử thách 2 — Lớp nào sinh hoạt ở giảng đường B?',
      prompt: '(MẪU) Những lớp sinh hoạt nào thuộc giảng đường B? Kết quả cần có: mã lớp.',
      relatedClues: ['clue-box-building-b'],
      learningGoal: '(MẪU) Chọn đúng bảng, đúng cột.',
      steps: [],
      hints: [hv('neutral', '(MẪU) Gợi ý 1.'), hv('thinking', '(MẪU) Gợi ý 2.'), hv('smile', '(MẪU) Gợi ý 3.')],
      diagnosticLines: {
        'wrong-table': { line: hv('thinking', '(MẪU) Bảng sinh_vien không có cột tòa nhà.') },
        'missing-columns': { useStandardHint: 'hint-right-columns' },
      },
      onCorrect: hv('smile', '(MẪU) KT24A và QT24B.'),
      readQuestion: {
        id: 'q-c2-read',
        asker: hv('neutral', '(MẪU) Hai mã lớp này dùng để làm gì tiếp?'),
        choices: [
          { id: 'loc-sinh-vien', text: '(MẪU) Làm điều kiện lọc lớp trong bảng sinh_vien.', correct: true, feedback: [hv('smile', '(MẪU) Đúng.')] },
          { id: 'bo-qua', text: '(MẪU) Bỏ qua.', correct: false, feedback: [hv('thinking', '(MẪU) Hai mã này chính là cầu nối.')] },
        ],
      },
      evidence: { id: 'ev-c2-classes-b', title: '(MẪU) Lớp sinh hoạt ở giảng đường B', description: '(MẪU) 2 dòng: KT24A, QT24B.' },
    },
  },
  c3: {
    spec: {
      id: 'c3',
      table: 'sinh_vien',
      referenceSql: "SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí';",
      requiredColumns: ['ma_sv', 'ho_dem', 'ten'],
      encouragedColumns: ['ma_lop', 'clb'],
      runHiddenDataset: true,
      expectedRowCount: 2,
    },
    content: {
      id: 'c3',
      title: '(MẪU) Thử thách 3 — Ai khớp cả ba manh mối?',
      prompt: '(MẪU) Ai đồng thời khớp cả ba manh mối? Kết quả cần có: mã sinh viên, họ đệm, tên.',
      relatedClues: ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'],
      learningGoal: '(MẪU) AND, IN.',
      steps: [],
      hints: [hv('neutral', '(MẪU) Gợi ý 1.'), hv('thinking', '(MẪU) Gợi ý 2.'), hv('smile', '(MẪU) Gợi ý 3.')],
      diagnosticLines: {
        'or-connector': { useStandardHint: 'hint-any-or-all' },
        'missing-condition': { line: hv('thinking', '(MẪU) Đã đủ ba manh mối chưa?') },
        'missing-columns': { useStandardHint: 'hint-right-columns' },
      },
      onCorrect: hv('smile', '(MẪU) Ba manh mối, một truy vấn, hai dòng.'),
      readQuestion: {
        id: 'q-c3-read',
        asker: hv('neutral', '(MẪU) Vì sao chỉ còn 2 dòng?'),
        choices: [
          { id: 'in-ca-hai-lop', text: '(MẪU) Vì IN chỉ lấy người thuộc cả hai lớp.', correct: false, feedback: [hv('thinking', '(MẪU) IN nghĩa là thuộc một lớp bất kỳ trong danh sách.')] },
          { id: 'and-dong-thoi', text: '(MẪU) Vì AND giữ người khớp cả ba điều kiện.', correct: true, feedback: [hv('smile', '(MẪU) Đúng.')] },
        ],
      },
      evidence: { id: 'ev-c3-shortlist', title: '(MẪU) Người khớp cả ba manh mối', description: '(MẪU) 2 dòng.' },
    },
  },
  'debrief-fix': {
    spec: {
      id: 'debrief-fix',
      table: 'sinh_vien',
      referenceSql: "SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí';",
      requiredColumns: ['ma_sv', 'ho_dem', 'ten'],
      encouragedColumns: ['ma_lop', 'clb'],
      runHiddenDataset: true,
      expectedRowCount: 2,
      initialModel: {
        table: 'sinh_vien',
        columns: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
        conditions: [
          { id: 'cond-h', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } },
          { id: 'cond-lop', column: 'ma_lop', op: 'in', value: ['KT24A', 'QT24B'], source: { kind: 'evidence', evidenceId: 'ev-c2-classes-b' } },
          { id: 'cond-clb', column: 'clb', op: 'eq', value: 'Báo chí', source: { kind: 'clue', clueId: 'clue-bookmark-baochi' } },
        ],
        connector: 'OR',
      },
    },
    content: {
      id: 'debrief-fix',
      title: '(MẪU) Sửa truy vấn của Quân',
      prompt: '(MẪU) Truy vấn của Quân đã nạp sẵn. Sửa để chỉ lấy người khớp đồng thời cả ba manh mối.',
      relatedClues: ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'],
      learningGoal: '(MẪU) OR lấy bất kỳ; AND lấy đồng thời.',
      steps: [],
      hints: [hv('neutral', '(MẪU) Gợi ý 1.'), hv('thinking', '(MẪU) Chỉ đổi phép nối.'), hv('smile', '(MẪU) Đổi OR thành AND.')],
      diagnosticLines: {
        'or-connector': { useStandardHint: 'hint-any-or-all' },
        'missing-condition': { line: hv('thinking', '(MẪU) Giữ đủ ba điều kiện, chỉ đổi cách nối.') },
        'missing-columns': { useStandardHint: 'hint-right-columns' },
      },
      onCorrect: hv('smile', '(MẪU) Hai dòng. Đưa lên màn chiếu đi!'),
      readQuestion: null,
      evidence: { id: 'ev-quan-fixed', title: '(MẪU) Truy vấn của Quân, đã sửa', description: '(MẪU) Từ 24 dòng còn 2 dòng.' },
    },
  },
};
