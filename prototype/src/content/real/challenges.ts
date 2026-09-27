/**
 * Thẻ thử thách thật — mục "Nội dung thử thách" của docs/kich-ban-prototype.md, chép NGUYÊN VĂN,
 * ghép với đặc tả engine `CHALLENGE_SPECS[id]` (nguồn DUY NHẤT của SQL chuẩn, cột bắt buộc,
 * dataset ẩn, model nạp sẵn — không chép lại ở đây) thành ChallengeDefinition.
 *
 * Ánh xạ: Tiêu đề → title · Đề bài hiển thị → prompt · Manh mối liên quan → relatedClues ·
 * Mục tiêu học → learningGoal · [BƯỚC n · nổi bật: vùng] → steps · [KHI: mã] → diagnosticLines
 * (`dùng hint-x` → { useStandardHint }) · [GỢI Ý 1..3] → hints · [KHI ĐÚNG] → onCorrect ·
 * [HỎI] → readQuestion · Vật chứng → evidence. [GỢI Ý CHUẨN] → standardHints; "Nhận xét chung"
 * → commonDiagnosticLines.
 *
 * THỨ TỰ KHÓA của `diagnosticLines` và `commonDiagnosticLines` là thứ tự ưu tiên hiển thị
 * (`pickDiagnostic`) — phải đúng thứ tự liệt kê trong kịch bản; test khẳng định trùng với
 * CHALLENGE_DIAGNOSTIC_ORDER / COMMON_DIAGNOSTIC_ORDER của engine (QĐ-047).
 * Biểu cảm người hỏi ở câu đọc kết quả: kịch bản không ghi; lấy biểu cảm lời Hà Vy ngay trước
 * (lời `[KHI ĐÚNG]`), như quy ước ở story/investigation.ts.
 */
import type { ChallengeId } from '../../shared/ids';
import { CHALLENGE_SPECS } from '../../sql-challenge/data/challenges';
import type {
  ChallengeContent,
  ChallengeDefinition,
  CommonDiagnosticLines,
  StandardHints,
} from '../../sql-challenge/types';

// ---------- Ba câu gợi ý chuẩn (§5.2) — giọng Hà Vy ----------

export const realStandardHints: StandardHints = {
  'hint-any-or-all': {
    speaker: 'ha-vy',
    expression: 'thinking',
    text: 'Truy vấn này đang lấy cả người chỉ khớp một manh mối. Cậu muốn khớp bất kỳ, hay khớp đồng thời?',
  },
  'hint-right-columns': {
    speaker: 'ha-vy',
    expression: 'thinking',
    text: 'Kết quả đã có đúng cột cần để trả lời câu hỏi chưa? Đọc lại đề xem cần những cột nào.',
  },
  'hint-ask-or-conclude': {
    speaker: 'ha-vy',
    expression: 'thinking',
    text: 'Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?',
  },
};

// ---------- Nhận xét chung cho mọi thử thách (đúng thứ tự liệt kê) ----------

export const realCommonDiagnosticLines: CommonDiagnosticLines = {
  'not-select': {
    line: { speaker: 'ha-vy', expression: 'neutral', text: 'Trong buổi làm việc này CLB chỉ có quyền xem dữ liệu.' },
  },
  'syntax-error': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Máy chưa đọc được câu này. Soát dấu nháy, dấu phẩy, hoặc quay về trình dựng.',
    },
  },
  'no-table': {
    line: { speaker: 'ha-vy', expression: 'neutral', text: 'Hàng FROM còn trống. Mình lấy dữ liệu từ bảng nào?' },
  },
  'no-columns': {
    line: {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Hàng SELECT chưa chọn cột nào. Cậu cần kết quả hiện những cột gì?',
    },
  },
  'no-value': {
    line: {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Có một điều kiện chưa có giá trị. Cậu lọc theo gì? Chọn trong mục "Từ manh mối" nhé.',
    },
  },
  'connector-unset': {
    line: {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Chưa chọn cách nối các điều kiện. Cậu cần người thỏa bất kỳ, hay thỏa đồng thời?',
    },
  },
  'too-many-rows': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Kết quả vượt quá 2000 dòng. Cậu hãy thêm điều kiện lọc để thu hẹp kết quả nhé.',
    },
  },
  // QĐ-054: lời chung cho mã mà thẻ thử thách không có (OR ở c1/c2, sai bảng ở c1, tiền tố mã lớp ở c1/màn sửa).
  'wrong-table': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Thông tin cậu cần nằm ở bảng khác. Mở bảng mô tả cột xem nó ở đâu nhé.',
    },
  },
  'or-connector': { useStandardHint: 'hint-any-or-all' },
  'wrong-column-ho-dem': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Cậu đang lọc theo cột ho_dem. Chữ ký thường là tên gọi, tức cột ten.',
    },
  },
  'like-ends-with': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: '"Kết thúc bằng H" bắt cả tên như Linh, Thanh. Trên chữ ký, H đứng đầu.',
    },
  },
  'like-contains': {
    line: { speaker: 'ha-vy', expression: 'thinking', text: '"Chứa H" bắt cả tên có h ở giữa. Mình cần H đứng đầu tên.' },
  },
  'class-prefix': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Mã lớp giống nhau vài chữ chưa chắc cùng tòa. Cậu lọc bằng đúng danh sách lớp trong hồ sơ.',
    },
  },
  'hardcoded-ids': {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Truy vấn này gọi thẳng mã sinh viên, tức đi từ đáp án. Hãy lọc bằng manh mối.',
    },
  },
  'limit-used': {
    line: { speaker: 'ha-vy', expression: 'thinking', text: 'LIMIT chỉ cắt bớt số dòng, không lọc theo manh mối.' },
  },
  'wrong-value': {
    line: {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Giá trị lọc chưa khớp manh mối trong hồ sơ. Cậu soát lại từng chữ, cả dấu tiếng Việt.',
    },
  },
  'extra-columns': {
    line: { speaker: 'ha-vy', expression: 'smile', text: 'Đúng rồi! Mẹo nhỏ: chỉ cần các cột đề bài hỏi là đủ.' },
  },
  other: {
    line: {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Chưa khớp câu hỏi. So từng điều kiện với manh mối trong hồ sơ xem.',
    },
  },
};

// ---------- c1 — Ai có tên bắt đầu bằng H? ----------

const c1: ChallengeContent = {
  id: 'c1',
  title: 'Thử thách 1 — Ai có tên bắt đầu bằng H?',
  prompt:
    'Trong dữ liệu có những sinh viên nào có tên (tên gọi, không phải họ) bắt đầu bằng chữ H? Kết quả cần có: mã sinh viên, họ đệm, tên.',
  relatedClues: ['clue-signature-h'],
  learningGoal: '`SELECT`, `FROM`, `WHERE`, `LIKE` và ký hiệu `%`.',
  steps: [
    {
      step: 1,
      highlight: 'from',
      line: {
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Hàng FROM trước: lấy dữ liệu từ bảng nào. Người mình tìm nằm trong bảng sinh_vien.',
      },
    },
    {
      step: 2,
      highlight: 'preview',
      line: {
        speaker: 'ha-vy',
        expression: 'smile',
        text: 'Muốn nhìn bảng trước thì bấm "Xem 5 dòng đầu". Như liếc qua sheet trước khi lọc.',
      },
    },
    {
      step: 3,
      highlight: 'select',
      line: {
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Hàng SELECT: chọn cột muốn hiện. Đề bài cần ma_sv, ho_dem và ten.',
      },
    },
    {
      step: 4,
      highlight: 'where',
      line: {
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Hàng WHERE là bộ lọc, như nút Filter trong Excel. Chọn cột ten, phép "bắt đầu bằng", giá trị H trong mục "Từ manh mối".',
      },
    },
    {
      step: 5,
      highlight: 'run',
      line: {
        speaker: 'ha-vy',
        expression: 'smile',
        text: 'Bên cạnh là câu SQL tự viết theo lựa chọn của cậu. Dấu % nghĩa là "sau đó là gì cũng được". Bấm Chạy nào!',
      },
    },
  ],
  diagnosticLines: {
    'no-filter': {
      line: { speaker: 'ha-vy', expression: 'neutral', text: 'Đây là cả bảng, chưa lọc gì. Như mở sheet mà chưa bật Filter.' },
    },
    'missing-columns': { useStandardHint: 'hint-right-columns' },
  },
  hints: [
    {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Mình đang tìm người có tên gọi bắt đầu bằng chữ trên chữ ký. Chỉ cần một điều kiện lọc.',
    },
    {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Bảng sinh_vien. Lọc cột ten, phép "bắt đầu bằng", giá trị H. Hiện ba cột ma_sv, ho_dem, ten.',
    },
    {
      speaker: 'ha-vy',
      expression: 'smile',
      text: "Gần như đáp án đây: `SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%';`",
    },
  ],
  onCorrect: { speaker: 'ha-vy', expression: 'smile', text: 'Truy vấn đầu tiên của cậu đấy! Mười dòng.' },
  readQuestion: {
    id: 'q-c1-read',
    asker: { speaker: 'ha-vy', expression: 'smile', text: 'Mười dòng này là những ai?' },
    choices: [
      {
        id: 'chua-h',
        text: 'Những người có chữ H trong cả họ tên.',
        correct: false,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'thinking',
            text: "'H%' chỉ khớp khi H đứng đầu. H ở giữa hay ở cuối đều không tính.",
          },
        ],
      },
      {
        id: 'ten-h',
        text: 'Những người có tên gọi bắt đầu bằng H.',
        correct: true,
        feedback: [
          { speaker: 'ha-vy', expression: 'smile', text: 'Chuẩn. Cột ten, H đứng đầu, phía sau là gì cũng được.' },
        ],
      },
      {
        id: 'ho-h',
        text: 'Những người có họ đệm bắt đầu bằng H.',
        correct: false,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'thinking',
            text: 'Điều kiện đặt ở cột ten, không phải ho_dem. Người họ Hoàng mà tên Lan sẽ không có ở đây.',
          },
        ],
      },
    ],
  },
  evidence: {
    id: 'ev-c1-names-h',
    title: 'Sinh viên có tên bắt đầu bằng H',
    description:
      "10 dòng từ bảng `sinh_vien`, lọc `ten LIKE 'H%'`. Nguồn: truy vấn của bạn ở thử thách 1.",
  },
};

// ---------- c2 — Lớp nào sinh hoạt ở giảng đường B? ----------

const c2: ChallengeContent = {
  id: 'c2',
  title: 'Thử thách 2 — Lớp nào sinh hoạt ở giảng đường B?',
  prompt: 'Những lớp sinh hoạt nào thuộc giảng đường B? Kết quả cần có: mã lớp.',
  relatedClues: ['clue-box-building-b'],
  learningGoal:
    'chọn đúng bảng, chọn đúng cột; kết quả của một truy vấn có thể thành đầu vào cho câu hỏi tiếp theo.',
  steps: [],
  diagnosticLines: {
    'wrong-table': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Bảng sinh_vien không có cột tòa nhà. Xem mô tả cột: toa_nha nằm ở bảng nào?',
      },
    },
    'class-prefix': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Mã lớp có chữ B chưa chắc sinh hoạt ở tòa B. Tòa nhà nằm ở cột toa_nha.',
      },
    },
    'no-filter': {
      line: { speaker: 'ha-vy', expression: 'neutral', text: 'Đây là cả tám lớp. Lọc lại, chỉ giữ lớp ở tòa B thôi.' },
    },
    'wrong-value': {
      line: {
        speaker: 'ha-vy',
        expression: 'neutral',
        text: 'Soát lại giá trị tòa nhà. Bác Tư nói hộp được mở ở giảng đường B.',
      },
    },
    'missing-columns': { useStandardHint: 'hint-right-columns' },
  },
  hints: [
    {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Mình cần biết lớp nào sinh hoạt ở tòa B, để lát nữa lọc sinh viên theo lớp.',
    },
    {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Bảng lop_sinh_hoat có cột toa_nha. Lọc toa_nha bằng B, rồi hiện cột ma_lop.',
    },
    {
      speaker: 'ha-vy',
      expression: 'smile',
      text: "Gần như đáp án: `SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';`",
    },
  ],
  onCorrect: { speaker: 'ha-vy', expression: 'smile', text: 'KT24A và QT24B. Hai lớp sinh hoạt ở tòa B.' },
  readQuestion: {
    id: 'q-c2-read',
    asker: { speaker: 'ha-vy', expression: 'smile', text: 'Hai mã lớp này dùng để làm gì tiếp?' },
    choices: [
      {
        id: 'loc-sinh-vien',
        text: 'Làm điều kiện lọc lớp trong bảng sinh_vien.',
        correct: true,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'smile',
            text: 'Đúng. Kết quả của truy vấn này thành đầu vào cho truy vấn sau.',
          },
        ],
      },
      {
        id: 'dem-toa-b',
        text: 'Đếm xem tòa B có bao nhiêu sinh viên.',
        correct: false,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'thinking',
            text: 'Bảng lớp không chứa sinh viên. Muốn biết ai, phải mang hai mã này sang bảng sinh_vien.',
          },
        ],
      },
      {
        id: 'bo-qua',
        text: 'Bỏ qua, vì bảng sinh_vien không có tòa nhà.',
        correct: false,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'thinking',
            text: 'Không có cột tòa nhà, nhưng có cột ma_lop. Hai mã này chính là cầu nối.',
          },
        ],
      },
    ],
  },
  evidence: {
    id: 'ev-c2-classes-b',
    title: 'Lớp sinh hoạt ở giảng đường B',
    description:
      "2 dòng: `KT24A`, `QT24B`. Từ bảng `lop_sinh_hoat`, lọc `toa_nha = 'B'`. Dùng làm giá trị \"Từ manh mối\" cho điều kiện lớp ở thử thách 3.",
  },
};

// ---------- c3 — Ai khớp cả ba manh mối? ----------

const c3: ChallengeContent = {
  id: 'c3',
  title: 'Thử thách 3 — Ai khớp cả ba manh mối?',
  prompt:
    'Ai đồng thời khớp cả ba manh mối: tên bắt đầu bằng H, học một lớp sinh hoạt ở giảng đường B, thuộc CLB Báo chí? Kết quả cần có: mã sinh viên, họ đệm, tên. Nên thêm lớp và câu lạc bộ để dễ đối chiếu.',
  relatedClues: ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'],
  learningGoal: '`AND`, `IN` và ý nghĩa của việc thỏa đồng thời nhiều điều kiện.',
  steps: [],
  diagnosticLines: {
    'or-connector': { useStandardHint: 'hint-any-or-all' },
    'same-column-and': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Một bạn không thể học hai lớp cùng lúc. Hãy dùng danh sách lớp trong mục manh mối.',
      },
    },
    'missing-condition': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Còn nhiều người quá. Đã đủ ba manh mối chưa: chữ ký, tòa B, bookmark?',
      },
    },
    'class-prefix': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Mã lớp có chữ B chưa chắc ở tòa B. Dùng đúng danh sách lớp từ thử thách 2.',
      },
    },
    'class-subset': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Tòa B có hai lớp sinh hoạt. Cậu mới lọc một lớp, hãy chọn cả hai lớp nhé.',
      },
    },
    'missing-columns': { useStandardHint: 'hint-right-columns' },
  },
  hints: [
    {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Ghép cả ba manh mối vào một truy vấn: chữ ký, tòa B, bookmark. Người cần tìm phải khớp hết.',
    },
    {
      speaker: 'ha-vy',
      expression: 'thinking',
      text: 'Bảng sinh_vien: ten bắt đầu bằng H, ma_lop thuộc danh sách tòa B, clb bằng Báo chí. Như lọc ba cột một lúc trong Excel.',
    },
    {
      speaker: 'ha-vy',
      expression: 'smile',
      text: "Gần như đáp án: `SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí';`",
    },
  ],
  onCorrect: { speaker: 'ha-vy', expression: 'smile', text: 'Ba manh mối, một truy vấn, hai dòng.' },
  readQuestion: {
    id: 'q-c3-read',
    asker: { speaker: 'ha-vy', expression: 'smile', text: 'Vì sao chỉ còn 2 dòng?' },
    choices: [
      {
        id: 'chi-hai-ten-h',
        text: "Vì LIKE 'H%' chỉ tìm được hai người tên H.",
        correct: false,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'thinking',
            text: 'Thử thách 1 ra mười người tên H cơ mà. Có gì đó đã lọc bớt họ.',
          },
        ],
      },
      {
        id: 'in-ca-hai-lop',
        text: 'Vì IN chỉ lấy người thuộc cả hai lớp một lúc.',
        correct: false,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'thinking',
            text: 'IN nghĩa là thuộc một lớp bất kỳ trong danh sách. Mỗi người chỉ học một lớp thôi.',
          },
        ],
      },
      {
        id: 'and-dong-thoi',
        text: 'Vì AND giữ người khớp cả ba điều kiện cùng lúc.',
        correct: true,
        feedback: [
          {
            speaker: 'ha-vy',
            expression: 'smile',
            text: 'Đúng. Như bật Filter ở ba cột cùng lúc: trượt một cột là rơi khỏi bảng.',
          },
        ],
      },
    ],
  },
  evidence: {
    id: 'ev-c3-shortlist',
    title: 'Người khớp cả ba manh mối',
    description:
      "2 dòng: Lê Thị Hoài — SV240317 — QT24B — Báo chí; Phạm Minh Hiếu — SV240228 — KT24A — Báo chí. Truy vấn: `ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'`.",
  },
};

// ---------- debrief-fix — Sửa truy vấn của Quân ----------

const debriefFix: ChallengeContent = {
  id: 'debrief-fix',
  title: 'Sửa truy vấn của Quân',
  prompt:
    'Truy vấn của Quân đã nạp sẵn. Sửa để chỉ lấy những người khớp đồng thời cả ba manh mối, rồi chạy. Kết quả cần có: mã sinh viên, họ đệm, tên (giữ lớp và câu lạc bộ để đối chiếu).',
  relatedClues: ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'],
  learningGoal: '`OR` lấy người thỏa bất kỳ điều kiện nào; `AND` lấy người thỏa đồng thời mọi điều kiện.',
  steps: [],
  diagnosticLines: {
    'or-connector': { useStandardHint: 'hint-any-or-all' },
    'missing-condition': {
      line: {
        speaker: 'ha-vy',
        expression: 'thinking',
        text: 'Bớt manh mối thì danh sách rộng ra. Giữ đủ ba điều kiện, chỉ đổi cách nối.',
      },
    },
    'missing-columns': { useStandardHint: 'hint-right-columns' },
  },
  hints: [
    {
      speaker: 'ha-vy',
      expression: 'neutral',
      text: 'Truy vấn của anh Quân lấy cả người chỉ khớp một manh mối. Mình cần người khớp cả ba.',
    },
    { speaker: 'ha-vy', expression: 'thinking', text: 'Giữ nguyên ba điều kiện. Chỉ đổi phép nối giữa chúng.' },
    {
      speaker: 'ha-vy',
      expression: 'smile',
      text: "Đổi OR thành AND: `WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'`.",
    },
  ],
  onCorrect: { speaker: 'ha-vy', expression: 'smile', text: 'Hai dòng. Đưa lên màn chiếu đi!' },
  readQuestion: null,
  evidence: {
    id: 'ev-quan-fixed',
    title: 'Truy vấn của Quân, đã sửa',
    description:
      'Cùng ba điều kiện, đổi `OR` thành `AND`: từ 24 dòng còn 2 dòng.',
  },
};

// ---------- Ghép với đặc tả engine ----------

export const realChallengeContents: Record<ChallengeId, ChallengeContent> = {
  c1,
  c2,
  c3,
  'debrief-fix': debriefFix,
};

export const realChallenges: Record<ChallengeId, ChallengeDefinition> = {
  c1: { spec: CHALLENGE_SPECS.c1, content: c1 },
  c2: { spec: CHALLENGE_SPECS.c2, content: c2 },
  c3: { spec: CHALLENGE_SPECS.c3, content: c3 },
  'debrief-fix': { spec: CHALLENGE_SPECS['debrief-fix'], content: debriefFix },
};
