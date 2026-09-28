/**
 * Thẻ hồ sơ thật — mục "Hồ sơ vật chứng" của docs/prototype/kich-ban-prototype.md, chép NGUYÊN VĂN.
 *
 * Ánh xạ dòng của kịch bản → trường (QĐ-037):
 *   Tiêu đề → title · Nguồn → source · Nội dung / Nội dung hiển thị → content | body
 *   (đoạn trích nhiều đoạn → mảng, mỗi đoạn một phần tử) · Mặt ngoài phong bì → extra
 *   · Giá trị cho trình dựng → builderValue (không hiện trên thẻ) · Câu hỏi còn mở → openQuestion
 *   · Lưu ý → caveat.
 * Chữ trong dấu `…` là mã (tên cột, tên bảng) — giữ nguyên dấu để giao diện hiện dạng mã.
 * Tiêu đề/mô tả thẻ `ev-…` nằm ở thẻ thử thách (real/challenges.ts); chú thích sau giải trình
 * của ev-c1-names-h, ev-c3-shortlist, ev-quan-fixed (QĐ-062) nằm ở các node annotate-evidence của
 * end-03 (real/story/ending.ts).
 */
import type { BuilderValue, ClueCard, EvidenceContent } from '../../evidence/types';

/**
 * Kịch bản không ghi nhãn cho ô chọn "Từ manh mối"; nhãn ghép từ hai phần có sẵn nguyên văn:
 * giá trị + tiêu đề thẻ ("H — Chữ ký "H.""), không thêm chữ mới.
 */
function builderValue(card: Pick<ClueCard, 'title'>, value: Omit<BuilderValue, 'label'>): BuilderValue {
  const shown = Array.isArray(value.value) ? value.value.join(', ') : value.value;
  return { label: `${shown} — ${card.title}`, ...value };
}

const SIGNATURE_TITLE = 'Chữ ký "H."';
const BOX_TITLE = 'Hộp góp ý giảng đường B';
const BOOKMARK_TITLE = 'Nửa bookmark CLB Báo chí';

export const realEvidence: EvidenceContent = {
  clues: {
    'clue-signature-h': {
      id: 'clue-signature-h',
      title: SIGNATURE_TITLE,
      source: 'Phong bì lá thư, bản chụp do Phòng CTSV chuyển cho CLB',
      content:
        'Ngoài phong bì có chữ ký tay "H.". Người Việt thường ký bằng tên gọi, nên H nhiều khả năng là chữ đầu của tên (cột `ten`), không phải của họ đệm (`ho_dem`).',
      builderValue: builderValue({ title: SIGNATURE_TITLE }, { column: 'ten', suggestedOp: 'startsWith', value: 'H' }),
      openQuestion: 'Trong dữ liệu, những ai có tên bắt đầu bằng H?',
      caveat: 'Chỉ là khả năng. Chữ ký cho biết một chữ cái, không cho biết đó là ai.',
    },
    'clue-box-building-b': {
      id: 'clue-box-building-b',
      title: BOX_TITLE,
      source: 'Lời bác Tư lao công, hành lang giảng đường B',
      content:
        'Sáng nay cô phụ trách hộp góp ý chỉ mở một hộp: hộp ở giảng đường B. Hộp tòa A và tòa C tuần này chưa đến lượt mở. Bảng `sinh_vien` không có cột tòa nhà.',
      builderValue: builderValue({ title: BOX_TITLE }, { column: 'toa_nha', suggestedOp: 'eq', value: 'B' }),
      openQuestion: 'Những lớp nào sinh hoạt ở giảng đường B?',
      caveat: 'Cho biết lá thư được bỏ vào hộp nào, không cho biết ai bỏ.',
    },
    'clue-bookmark-baochi': {
      id: 'clue-bookmark-baochi',
      title: BOOKMARK_TITLE,
      source: 'Kẹt sát khe hộp góp ý giảng đường B',
      content:
        'Nửa mẩu bookmark bị xé, còn nửa logo ngòi bút và mấy chữ "…ÁO CHÍ": bookmark CLB Báo chí phát ở ngày hội CLB.',
      builderValue: builderValue({ title: BOOKMARK_TITLE }, { column: 'clb', suggestedOp: 'eq', value: 'Báo chí' }),
      openQuestion: 'Những sinh viên nào thuộc CLB Báo chí?',
      caveat: 'Bookmark cho biết câu lạc bộ, không cho biết ai làm rơi.',
    },
  },
  documents: {
    'doc-letter': {
      id: 'doc-letter',
      title: 'Bản chụp lá thư',
      source: 'Phòng Công tác sinh viên chuyển cho CLB sáng nay',
      body: [
        'Kính gửi Phòng Công tác sinh viên.',
        'Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử, vì CLB không còn giải quyết được việc gì.',
        'Đề nghị Phòng phản hồi chính thức.',
      ],
      extra: 'Mặt ngoài phong bì: chữ ký tay "H.", không có tên, không có mã sinh viên.',
      openQuestion: 'Lá thư được bỏ vào hộp góp ý ở tòa nào?',
      caveat:
        'Thư đánh máy, không có tên người viết. Chữ ký ngoài phong bì là của người gửi, chưa chắc là của người viết.',
    },
    'doc-bookmark': {
      id: 'doc-bookmark',
      title: 'Mẩu bookmark bị xé',
      source: 'Nhặt ở khe hộp góp ý giảng đường B',
      body: 'hình nửa bookmark giấy cứng, nửa logo ngòi bút, chữ "…ÁO CHÍ" sát mép rách.',
      openQuestion: 'Chủ của mẩu bookmark này là ai?',
      caveat: 'Chỉ còn nửa mẩu; không có tên chủ, không cho biết rơi lúc nào.',
    },
    'doc-handover-log': {
      id: 'doc-handover-log',
      title: 'Sổ bàn giao niêm phong — kết quả đối chiếu',
      source: 'Cô phụ trách hộp góp ý, gửi qua Phòng CTSV theo đề nghị của CLB',
      body: [
        'Hộp góp ý giảng đường B, mở sáng thứ Hai: 1 phong bì có yêu cầu phản hồi chính thức. Người gửi ký "H.". Mã sinh viên ghi trên phiếu gửi đã chép vào sổ.',
        'Đối chiếu theo đề nghị: SV240317 — có trong sổ. SV240228 — không có trong sổ.',
        'Ghi chú: Sổ niêm phong để giữ kín người góp ý. Chỉ trả lời có hoặc không cho từng mã được đề nghị đối chiếu.',
      ],
      caveat: 'Sổ cho biết ai đã ký gửi phong bì, không cho biết ai viết lá thư.',
    },
  },
};
