// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung/*.md bởi `npm run noi-dung:sinh`
// (tools/noi-dung/sinh.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung` rồi
// `npm run noi-dung:sinh`, commit cả .md lẫn .gen.ts. Sửa tay ở đây → test "file sinh khớp nội dung" đỏ.
import type { EvidenceContent } from '../../evidence/types';

/** Thẻ manh mối (clue-…) và tài liệu (doc-…): noi-dung/ho-so/*.md. */
export const HO_SO = {
  "clues": {
    "clue-signature-h": {
      "id": "clue-signature-h",
      "title": "Chữ ký tay (chỉ đọc được chữ H)",
      "source": "Phong bì lá thư, bản chụp do Phòng CTSV chuyển cho CLB",
      "content": "Ngoài phong bì có chữ ký tay: chữ H viết hoa rõ, phần sau là nét lượn không đọc được. Người Việt thường ký bằng tên gọi, nên H nhiều khả năng là chữ đầu của tên (cột `ten`), không phải của họ đệm (`ho_dem`).",
      "builderValue": {
        "label": "H — Chữ ký tay (chỉ đọc được chữ H)",
        "column": "ten",
        "suggestedOp": "startsWith",
        "value": "H"
      },
      "openQuestion": "Trong dữ liệu, những ai có tên bắt đầu bằng H?",
      "caveat": "Chỉ là khả năng. Chữ ký cho biết một chữ cái, không cho biết đó là ai."
    },
    "clue-box-building-b": {
      "id": "clue-box-building-b",
      "title": "Hộp góp ý giảng đường B",
      "source": "Lời bác Tư lao công, hành lang giảng đường B",
      "content": "Sáng nay cô Lan bên Công tác sinh viên chỉ mở một hộp: hộp ở giảng đường B. Hộp tòa A và tòa C tuần này chưa đến lượt mở. Bảng `sinh_vien` không có cột tòa nhà.",
      "builderValue": {
        "label": "B — Hộp góp ý giảng đường B",
        "column": "toa_nha",
        "suggestedOp": "eq",
        "value": "B"
      },
      "openQuestion": "Những lớp nào sinh hoạt ở giảng đường B?",
      "caveat": "Cho biết lá thư được bỏ vào hộp nào, không cho biết ai bỏ."
    },
    "clue-bookmark-baochi": {
      "id": "clue-bookmark-baochi",
      "title": "Nửa bookmark CLB Báo chí",
      "source": "Kẹt sát khe hộp góp ý giảng đường B",
      "content": "Nửa mẩu bookmark bị xé, còn nửa logo ngòi bút và mấy chữ \"…ÁO CHÍ\": bookmark CLB Báo chí phát ở ngày hội CLB.",
      "builderValue": {
        "label": "Báo chí — Nửa bookmark CLB Báo chí",
        "column": "clb",
        "suggestedOp": "eq",
        "value": "Báo chí"
      },
      "openQuestion": "Những sinh viên nào thuộc CLB Báo chí?",
      "caveat": "Bookmark cho biết câu lạc bộ, không cho biết ai làm rơi."
    }
  },
  "documents": {
    "doc-letter": {
      "id": "doc-letter",
      "title": "Bản chụp lá thư",
      "source": "Phòng Công tác sinh viên chuyển cho CLB sáng nay",
      "body": [
        "Kính gửi Phòng Công tác sinh viên.",
        "Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử, vì CLB không còn giải quyết được việc gì.",
        "Đề nghị Phòng phản hồi chính thức."
      ],
      "extra": "Mặt ngoài phong bì: chữ ký tay chỉ đọc được chữ H đầu, không có tên, không có mã sinh viên.",
      "openQuestion": "Lá thư được bỏ vào hộp góp ý ở tòa nào?",
      "caveat": "Thư đánh máy, không có tên người viết. Chữ ký ngoài phong bì là của người gửi, chưa chắc là của người viết."
    },
    "doc-bookmark": {
      "id": "doc-bookmark",
      "title": "Mẩu bookmark bị xé",
      "source": "Nhặt ở khe hộp góp ý giảng đường B",
      "body": "hình nửa bookmark giấy cứng, nửa logo ngòi bút, chữ \"…ÁO CHÍ\" sát mép rách.",
      "openQuestion": "Chủ của mẩu bookmark này là ai?",
      "caveat": "Chỉ còn nửa mẩu; không có tên chủ, không cho biết rơi lúc nào."
    },
    "doc-handover-log": {
      "id": "doc-handover-log",
      "title": "Sổ bàn giao niêm phong — kết quả đối chiếu",
      "source": "Cô Lan, Phòng CTSV, gửi theo đề nghị của CLB",
      "body": [
        "Hộp góp ý giảng đường B, mở sáng thứ Hai: 1 phong bì có yêu cầu phản hồi chính thức. Chữ ký người gửi chỉ đọc được chữ H đầu. Mã sinh viên ghi trên phiếu gửi đã chép vào sổ.",
        "Đối chiếu theo đề nghị: SV240317 — có trong sổ. SV240228 — không có trong sổ.",
        "Ghi chú: Sổ niêm phong để giữ kín người góp ý. Chỉ trả lời có hoặc không cho từng mã được đề nghị đối chiếu."
      ],
      "caveat": "Sổ cho biết ai đã ký gửi phong bì, không cho biết ai viết lá thư."
    }
  }
} satisfies EvidenceContent;
