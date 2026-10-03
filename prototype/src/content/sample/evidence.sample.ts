/** NỘI DUNG MẪU — thẻ hồ sơ tối giản. Gói `noi-dung` thay bằng thẻ thật. */
import type { EvidenceContent } from '../../evidence/types';

export const sampleEvidence: EvidenceContent = {
  clues: {
    'clue-signature-h': {
      id: 'clue-signature-h',
      title: '(MẪU) Chữ ký tay (chỉ đọc được chữ H)',
      source: '(MẪU) Phong bì lá thư',
      content: '(MẪU) Ngoài phong bì có chữ ký tay, chỉ đọc được chữ H đầu. H nhiều khả năng là chữ đầu của tên.',
      builderValue: { label: 'H — chữ ký lá thư', column: 'ten', suggestedOp: 'startsWith', value: 'H' },
      openQuestion: '(MẪU) Trong dữ liệu, những ai có tên bắt đầu bằng H?',
      caveat: '(MẪU) Chỉ là khả năng. Chữ ký cho biết một chữ cái, không cho biết đó là ai.',
    },
    'clue-box-building-b': {
      id: 'clue-box-building-b',
      title: '(MẪU) Hộp góp ý giảng đường B',
      source: '(MẪU) Lời bác Tư',
      content: '(MẪU) Sáng nay chỉ mở hộp ở giảng đường B.',
      builderValue: { label: 'B — tòa nhà của hộp góp ý', column: 'toa_nha', suggestedOp: 'eq', value: 'B' },
      openQuestion: '(MẪU) Những lớp nào sinh hoạt ở giảng đường B?',
      caveat: '(MẪU) Cho biết lá thư được bỏ vào hộp nào, không cho biết ai bỏ.',
    },
    'clue-bookmark-baochi': {
      id: 'clue-bookmark-baochi',
      title: '(MẪU) Nửa bookmark CLB Báo chí',
      source: '(MẪU) Khe hộp góp ý',
      content: '(MẪU) Nửa mẩu bookmark bị xé, còn chữ "…ÁO CHÍ".',
      builderValue: { label: 'Báo chí — bookmark', column: 'clb', suggestedOp: 'eq', value: 'Báo chí' },
      openQuestion: '(MẪU) Những sinh viên nào thuộc CLB Báo chí?',
      caveat: '(MẪU) Bookmark cho biết câu lạc bộ, không cho biết ai làm rơi.',
    },
  },
  documents: {
    'doc-letter': {
      id: 'doc-letter',
      title: '(MẪU) Bản chụp lá thư',
      source: '(MẪU) Phòng Công tác sinh viên',
      body: ['(MẪU) Kính gửi Phòng Công tác sinh viên.', '(MẪU) Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử.'],
      extra: '(MẪU) Mặt ngoài phong bì: chữ ký tay, chỉ đọc được chữ H đầu',
      openQuestion: '(MẪU) Lá thư được bỏ vào hộp góp ý ở tòa nào?',
      caveat: '(MẪU) Chữ ký ngoài phong bì là của người gửi, chưa chắc là của người viết.',
    },
    'doc-bookmark': {
      id: 'doc-bookmark',
      title: '(MẪU) Mẩu bookmark bị xé',
      source: '(MẪU) Khe hộp góp ý giảng đường B',
      body: '(MẪU) Hình nửa bookmark giấy cứng, nửa logo ngòi bút.',
      openQuestion: '(MẪU) Chủ của mẩu bookmark này là ai?',
      caveat: '(MẪU) Chỉ còn nửa mẩu; không có tên chủ.',
    },
    'doc-handover-log': {
      id: 'doc-handover-log',
      title: '(MẪU) Sổ bàn giao niêm phong — kết quả đối chiếu',
      source: '(MẪU) Cô Lan, Phòng CTSV',
      body: ['(MẪU) SV240317 — có trong sổ.', '(MẪU) SV240228 — không có trong sổ.'],
      caveat: '(MẪU) Sổ cho biết ai đã ký gửi phong bì, không cho biết ai viết lá thư.',
    },
  },
};
