// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-mua-1/**/*.md bởi `npm run noi-dung:sinh:mua1`
// (tools/noi-dung/sinh-mua1.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung:mua1` rồi
// `npm run noi-dung:sinh:mua1`, commit cả .md lẫn .gen.ts.
import type { KichBanMvp } from '../../mvp/types';
import { themNhieuMvp } from '../../../../tools/noi-dung/nhieu-mvp';
import { HOI_DAP_MUA_1 } from './hoi-dap.gen';

/** Kịch bản Mùa 1: noi-dung-mua-1/. */
const GOC = {
  "tenGame": "CLB Thám Tử Dữ Liệu",
  "tenTruong": "Trường Đại học Chấn Hưng",
  "tenCam": [
    "Vương Khánh"
  ],
  "nhanVat": [
    {
      "id": "tung",
      "ten": "Tùng",
      "hoTen": "Trần Tùng",
      "trongCau": "Tùng",
      "vai": "Năm nhất Du lịch, bạn cùng phòng ký túc xá 408 của người chơi, cháu chú Cường. Tuần đầu năm học mặc áo xanh tình nguyện đứng chỉ đường ở sảnh ký túc xá (các biểu cảm `ao-xanh…`: sơ mi xanh dài tay, mũ tai bèo đeo sau lưng; ngày thường mặc áo thể thao lam). Thích giúp người, nói trước nghĩ sau: buột miệng \"Hoài viết chứ còn ai!\" ở phòng CLB rồi áy náy riêng; hôm nhập học ký phiếu gửi hộ tờ góp ý thang máy của người chơi.",
      "bieuCam": [
        "neutral",
        "happy",
        "worried",
        "surprised",
        "thinking",
        "gai-dau",
        "chi-tay",
        "om-to-roi",
        "ao-xanh",
        "ao-xanh-happy",
        "ao-xanh-worried",
        "ao-xanh-gai-dau",
        "ao-xanh-chi-tay",
        "ao-xanh-surprised",
        "ao-xanh-thinking",
        "ao-xanh-doi-mu"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Tuần đầu năm học đứng đón tân sinh viên ở sảnh ký túc xá.",
        "bietLucGap": [
          "danh-xung",
          "nam",
          "nganh"
        ],
        "danhXung": "Bạn cùng phòng 408",
        "chuaQuen": "Cậu áo xanh",
        "nam": "Năm nhất",
        "nganh": "Du lịch",
        "cauNoi": "Để tớ dẫn cậu một vòng, mười phút là thuộc hết!",
        "loi": "Tân sinh viên ngành Du lịch, ở cùng phòng 408 ký túc xá. Lên trường sớm, thuộc đường, thấy ai lạ là xăng xái chỉ hộ."
      }
    },
    {
      "id": "ha-vy",
      "ten": "Hà Vy",
      "hoTen": "Trần Hà Vy",
      "trongCau": "Hà Vy",
      "vai": "Năm nhất Toán ứng dụng, thành viên CLB từ trước Ngày hội. Mê Sherlock Holmes, nói trọn suy luận \"thấy gì, tức là gì\", rồi hỏi lại người chơi. Ghi sổ nhỏ, đầu mỗi dòng là giờ.",
      "bieuCam": [
        "neutral",
        "thinking",
        "smile",
        "day-kinh"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "bietLucGap": [
          "danh-xung",
          "nam"
        ],
        "danhXung": "Thành viên CLB Thám Tử",
        "chuaQuen": "Bạn đeo kính",
        "nam": "Năm nhất",
        "nganh": "Toán ứng dụng",
        "cauNoi": "Cậu nhìn, nhưng cậu chưa quan sát.",
        "loi": "Học Toán ứng dụng, mê Sherlock Holmes. Ít lời, ghi sổ kỹ, đầu dòng nào cũng có giờ; thường nhìn ra chi tiết người khác bỏ qua rồi chỉ cho người chơi."
      }
    },
    {
      "id": "minh-anh",
      "ten": "Minh Anh",
      "hoTen": "Lê Minh Anh",
      "trongCau": "Minh Anh",
      "vai": "Năm ba Luật kinh tế, chủ nhiệm CLB Thám Tử. Một mình giữ bàn ở Ngày hội. Chia việc, xin phiếu, ký bảo đảm; ở buổi họp ngồi cạnh người chơi, gạch vạch ở lề sổ mỗi lần trình sai, không nói thay đáp án.",
      "bieuCam": [
        "neutral",
        "worried",
        "happy",
        "serious",
        "khoanh-tay"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Tối thứ Ba hằng tuần có mặt ở phòng CLB cho buổi sinh hoạt.",
        "bietLucGap": [
          "danh-xung"
        ],
        "danhXung": "Chủ nhiệm CLB Thám Tử",
        "chuaQuen": "Chị giữ bàn",
        "nam": "Năm ba",
        "nganh": "Luật kinh tế",
        "cauNoi": "Em ghi tên với mã sinh viên vào đây.",
        "loi": "Chủ nhiệm CLB Thám Tử. Làm việc gọn, chia việc rõ, không hứa trước điều chưa có căn cứ, nhưng sẵn lòng cho người mới một chỗ ngồi."
      }
    },
    {
      "id": "duy",
      "ten": "Duy",
      "hoTen": "Nguyễn Đức Duy",
      "trongCau": "Duy",
      "vai": "Năm hai Hành chính học, ở CLB từ năm nhất. Giữ chìa phòng, đồ đạc và laptop của CLB; đồ gì cũng ghi sổ. Ở màn tra chỉ lên tiếng khi được hỏi.",
      "bieuCam": [
        "neutral",
        "smile",
        "serious",
        "dan-chia-khoa"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Giữ chìa phòng CLB, chiều nào cũng có mặt ở phòng CLB.",
        "bietLucGap": [
          "danh-xung",
          "cau-noi"
        ],
        "danhXung": "Thành viên CLB, giữ chìa và đồ đạc",
        "chuaQuen": "Anh áo khoác đen",
        "nam": "Năm hai",
        "nganh": "Hành chính học",
        "cauNoi": "Đưa mã đây anh tra cho.",
        "loi": "Ở CLB từ năm nhất. Giữ chìa khóa, đồ đạc và cái laptop của CLB. Cái gì ra vào phòng cũng có một dòng trong sổ."
      }
    },
    {
      "id": "quan",
      "ten": "Quân",
      "hoTen": null,
      "trongCau": "Quân",
      "vai": "Ban Kiểm tra của Hội sinh viên. Được cử xuống Phòng Công tác sinh viên (ngày 26/09) xem CLB có dùng dữ liệu đúng mục đích không; ghi lại câu Tùng buột miệng; ở buổi họp trình kết luận \"người viết là Lê Thu Hoài\" và tự tra lại bằng câu HOẶC.",
      "bieuCam": [
        "neutral",
        "smug",
        "stunned",
        "chi-man"
      ],
      "xuatHienTu": {
        "kind": "ngay",
        "ngay": 3,
        "khung": "sang"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "bietLucGap": [
          "danh-xung",
          "cau-noi"
        ],
        "danhXung": "Ban Kiểm tra, Hội sinh viên",
        "chuaQuen": "Người ngồi sẵn",
        "nam": null,
        "nganh": null,
        "cauNoi": "Lịch sử tra cứu Hội có lưu lại đấy nhé.",
        "loi": "Được Hội sinh viên cử xuống xem CLB dùng dữ liệu có đúng mục đích không. Sơ mi cài kín cổ, cuốn sổ lúc nào cũng mở, ai nói gì cũng ghi."
      }
    },
    {
      "id": "chu-cuong",
      "ten": "Chú Cường",
      "hoTen": null,
      "trongCau": "chú Cường",
      "vai": "Bảo vệ cổng ký túc xá, chú của Tùng, bố của bé Na. Sáng thứ Hai 16/09, gần lúc giao ca (gần bảy giờ), thấy một cậu đeo balo đen gọi Hoài lại ở cổng, đưa phong bì nâu; cậu kia quay lưng suốt.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Trực chốt cổng ký túc xá.",
        "bietLucGap": [
          "danh-xung",
          "lich"
        ],
        "danhXung": "Bảo vệ ký túc xá",
        "chuaQuen": "Chú bảo vệ",
        "nam": null,
        "nganh": null,
        "cauNoi": "Chỉ đúng được mấy người thì chú không biết.",
        "loi": "Trực cổng ký túc xá, nhớ mặt gần hết sinh viên trong khu. Xin cho Tùng vào đội đón tân sinh viên. Con gái chú là bé Na."
      }
    },
    {
      "id": "bac-tu",
      "ten": "Bác Thịnh",
      "hoTen": null,
      "trongCau": "bác Thịnh",
      "vai": "Bảo vệ sảnh tòa B (mã giữ nguyên `bac-tu`). Bảy giờ sáng mới mở sảnh; chín giờ cô bên Công tác sinh viên xuống thu hộp kiến nghị như mọi ngày.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Trực sảnh tòa B, bảy giờ sáng mở sảnh.",
        "thuongO": [
          {
            "thu": [
              1,
              2,
              3,
              4,
              5,
              6
            ],
            "tu": "07:00",
            "den": "21:00",
            "noi": "toa-b"
          }
        ],
        "bietLucGap": [
          "danh-xung"
        ],
        "danhXung": "Bảo vệ tòa B",
        "chuaQuen": "Bác bảo vệ",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Sảnh này bảy giờ sáng bác mới mở.",
        "loi": "Trực ở phòng trực sảnh tòa B, thẻ tên ghi Thịnh. Giờ giấc đâu ra đấy, việc gì không tận mắt thấy thì không nói."
      }
    },
    {
      "id": "co-hanh",
      "ten": "Cô Hạnh",
      "hoTen": null,
      "trongCau": "cô Hạnh",
      "vai": "Phòng Đào tạo. Ký phiếu xin quyền xem bảng sinh viên cho CLB (ngày 25/09): chỉ được xem tên, ngành, khóa, lớp, để tìm hiểu đúng vụ này; Minh Anh ký bảo đảm.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Giờ hành chính ở Phòng Đào tạo, tòa hành chính.",
        "bietLucGap": [
          "danh-xung",
          "lich"
        ],
        "danhXung": "Phòng Đào tạo",
        "chuaQuen": "Cô cán bộ",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Lâu lắm rồi mới có CLB lên xin phiếu đàng hoàng thế này.",
        "loi": "Cán bộ Phòng Đào tạo, giữ quyền xem các bảng dữ liệu của trường. Đọc phiếu rất lâu rồi mới ký, cho xem đúng phần cần, không hơn."
      }
    },
    {
      "id": "co-lan",
      "ten": "Cô Lan",
      "hoTen": null,
      "trongCau": "cô Lan",
      "vai": "Phòng Công tác sinh viên. Mang thư kiến nghị và phiếu gửi tới phòng CLB (23/09); giữ sổ thu hộp kiến nghị, chín giờ sáng xuống sảnh tòa B thu hộp; nói \"chữ ký chỉ là của người nộp\".",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Giờ hành chính ở Phòng Công tác sinh viên, tòa hành chính.",
        "bietLucGap": [
          "danh-xung",
          "lich"
        ],
        "danhXung": "Phòng Công tác sinh viên",
        "chuaQuen": "Cô cán bộ",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Chữ ký này chỉ là của người nộp thôi.",
        "loi": "Cán bộ Phòng Công tác sinh viên, mặc áo dài xanh. Giữ sổ thu hộp kiến nghị, sáng nào cũng xuống tòa B thu hộp lúc chín giờ."
      }
    },
    {
      "id": "thay-quang",
      "ten": "Thầy Quang",
      "hoTen": null,
      "trongCau": "thầy Quang",
      "vai": "Chủ trì buổi họp rà soát phòng CLB (16:00 thứ Hai 30/09); chỉ điều phối và kết luận, không hỏi câu nào (Khánh hỏi). Lần đầu lên hình ở buổi họp, người chơi biết thầy qua lời Minh Anh kể. Nói chuyện bằng căn cứ. Trước mặt luôn có một cốc trà nóng (\"cậu trà nóng\" của bà bán trà đá, tuyến bí mật của mùa; không giải thích).",
      "bieuCam": [
        "neutral",
        "stern",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "bietLucGap": [
          "danh-xung"
        ],
        "danhXung": "Chủ trì họp rà soát",
        "chuaQuen": "Thầy chủ trì",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Đây là anh Chủ tịch Hội sinh viên, bên Hội chuyển lá thư lên.",
        "loi": "Chủ trì buổi họp rà soát phòng CLB. Nghe hai bên rồi mới hỏi, và chỉ hỏi đúng chỗ cần căn cứ."
      }
    },
    {
      "id": "hoai",
      "ten": "Hoài",
      "hoTen": "Lê Thu Hoài",
      "trongCau": "Hoài",
      "vai": "Năm nhất Báo chí, lớp BC24A. Bạn nữ kéo vali hôm nhập học. Sáng thứ Hai 16/09 ra cổng ký túc xá lúc 6:44, được một bạn trùm mũ, đeo khẩu trang nhờ bỏ phong bì nâu vào hộp ở tòa B, ký tên mình vào phiếu gửi. Chỉ kể ở kết thật.",
      "bieuCam": [
        "neutral",
        "nervous",
        "downcast",
        "relieved"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Sáng nào cũng ra cổng ký túc xá sớm.",
        "bietLucGap": [],
        "danhXung": "Sinh viên lớp BC24A",
        "chuaQuen": "Bạn nữ kéo vali",
        "nam": "Năm nhất",
        "nganh": "Báo chí",
        "cauNoi": "Em không biết trong thư viết gì.",
        "loi": "Tân sinh viên lớp BC24A. Rụt rè, nói nhỏ, câu nào cũng ngập ngừng."
      }
    },
    {
      "id": "be-na",
      "ten": "Bé Na",
      "hoTen": null,
      "trongCau": "Bé Na",
      "vai": "Con gái chú Cường, khoảng năm tuổi. Đêm Trung thu (17/09) cầm một chiếc bánh nướng trên đĩa của CLB trước lúc chia, giấu hai tay sau lưng, đầu ngón tay còn vụn bánh. Không nói câu nào (bản 6: \"lí nhí xin lỗi\" là lời dẫn), không có thẻ giới thiệu. Chân dung char-be-na.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "khanh",
      "ten": "Anh Hội sinh viên",
      "hoTen": null,
      "trongCau": "anh Hội sinh viên",
      "vai": "Chủ tịch Hội sinh viên (mã khanh; họ tên không bao giờ hiện, xem \"Tên cấm\" ở quy-uoc.md). Ở Vụ 1 nói một câu ở Ngày hội (đeo thẻ ban tổ chức, không đeo balo), rồi hỏi bốn lượt ở buổi họp (thầy Quang giới thiệu \"anh Chủ tịch Hội sinh viên\"), thua thì rời phòng trước khi Hoài vào; chưa lộ tên. Người đưa phong bì cho Hoài là câu hỏi lớn của mùa, Vụ 1 không trả lời.",
      "bieuCam": [
        "neutral",
        "ban-to-chuc"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "ba-lua",
      "ten": "Bà bán trà đá",
      "hoTen": null,
      "trongCau": "Bà bán trà đá",
      "vai": "Bán trà đá dưới gốc bàng ngoài cổng chính từ hồi phòng CLB còn là kho chổi. Kể chuyện \"cậu trà nóng\" từng khuân cái tủ sắt lên phòng CLB (lời kể, không phải bằng chứng). Chỉ gặp ở Cảnh 12 (rank A). Mã `ba-lua` giữ nguyên, bà không xưng tên.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Chiều nào cũng bán ở gốc bàng ngoài cổng chính.",
        "bietLucGap": [
          "danh-xung",
          "lich"
        ],
        "danhXung": "Quán trà đá cổng trường",
        "chuaQuen": null,
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Khách của bà, bà nhớ cốc chứ ai nhớ tên.",
        "loi": "Bán trà đá ngoài cổng chính đã lâu. Khách ngồi ghế nào, gọi cốc gì bà nhớ hết; chỉ tên là không nhớ."
      }
    }
  ],
  "canh": [
    {
      "id": "xe-buyt",
      "ten": "Trên xe buýt",
      "anhNen": null
    },
    {
      "id": "cong-truong",
      "ten": "Cổng trường",
      "anhNen": null
    },
    {
      "id": "phong-ktx",
      "ten": "Phòng KTX 408",
      "anhNen": null
    },
    {
      "id": "cong-ktx",
      "ten": "Cổng KTX",
      "anhNen": null
    },
    {
      "id": "cong-ktx-dem",
      "ten": "Cổng KTX",
      "anhNen": null
    },
    {
      "id": "sanh-ktx",
      "ten": "Sảnh ký túc xá",
      "anhNen": null
    },
    {
      "id": "sanh-toa-b",
      "ten": "Sảnh tòa B",
      "anhNen": null
    },
    {
      "id": "cang-tin",
      "ten": "Căng tin",
      "anhNen": null
    },
    {
      "id": "ngoai-phong-may",
      "ten": "Ngoài phòng máy",
      "anhNen": null
    },
    {
      "id": "nha-van-hoa",
      "ten": "Nhà văn hóa",
      "anhNen": null
    },
    {
      "id": "san-ktx-trung-thu",
      "ten": "Sân ký túc xá, đêm Trung thu",
      "anhNen": "bg-mvp-san-ktx-trung-thu"
    },
    {
      "id": "hoi-truong",
      "ten": "Hội trường",
      "anhNen": null
    },
    {
      "id": "phong-clb",
      "ten": "Phòng CLB",
      "anhNen": "bg-clb-room"
    },
    {
      "id": "phong-clb-dem",
      "ten": "Phòng CLB",
      "anhNen": null
    },
    {
      "id": "phong-may",
      "ten": "Trong phòng máy",
      "anhNen": null
    },
    {
      "id": "phong-ctsv",
      "ten": "Phòng Công tác sinh viên",
      "anhNen": null
    },
    {
      "id": "phong-dao-tao",
      "ten": "Phòng Đào tạo",
      "anhNen": null
    },
    {
      "id": "phong-hop",
      "ten": "Phòng họp rà soát",
      "anhNen": null
    },
    {
      "id": "hanh-lang-phong-hop",
      "ten": "Hành lang ngoài phòng họp",
      "anhNen": null
    },
    {
      "id": "ban-do",
      "ten": "Bản đồ trường",
      "anhNen": null
    },
    {
      "id": "xuong-robot",
      "ten": "Xưởng CLB Robotics",
      "anhNen": null
    },
    {
      "id": "thu-vien",
      "ten": "Thư viện trường",
      "anhNen": null
    },
    {
      "id": "thu-vien-dem",
      "ten": "Thư viện trường",
      "anhNen": null
    },
    {
      "id": "tra-da",
      "ten": "Quán trà đá cổng trường",
      "anhNen": null
    },
    {
      "id": "sanh-toa-b-dem",
      "ten": "Sảnh tòa B",
      "anhNen": null
    },
    {
      "id": "phong-ktx-dem",
      "ten": "Phòng KTX 408",
      "anhNen": null
    },
    {
      "id": "san-dem",
      "ten": "Sân trường",
      "anhNen": null
    },
    {
      "id": "sanh-den-pin",
      "ten": "Sảnh tòa B",
      "anhNen": null
    },
    {
      "id": "san-ktx-trung-thu-ba-banh",
      "ten": "Sân ký túc xá, đêm Trung thu",
      "anhNen": null
    },
    {
      "id": "cong-ktx-bong-mo",
      "ten": "Cổng ký túc xá, gần bảy giờ sáng",
      "anhNen": null
    },
    {
      "id": "phong-clb-dem-banh-mi",
      "ten": "Phòng CLB",
      "anhNen": null
    }
  ],
  "diaDiem": [],
  "lich": {
    "vu": {
      "id": "vu1",
      "ten": "Vụ 1 — Chữ ký Hoài"
    },
    "khung": [
      {
        "id": "sang",
        "ten": "Sáng"
      },
      {
        "id": "trua",
        "ten": "Trưa"
      },
      {
        "id": "chieu",
        "ten": "Chiều"
      }
    ],
    "buoiToi": {
      "id": "toi",
      "ten": "Buổi tối"
    },
    "luat": {
      "chinhToiDaKhung": 2,
      "phuNhieuMin": 1,
      "phuNhieuMax": 3,
      "uyTin": null
    },
    "chuoiDau": "md-00-tren-xe",
    "ngayMoDau": "2024-09-08",
    "hanChot": "2024-09-30",
    "viecChot": "Buổi họp rà soát",
    "ngay": [
      {
        "so": 1,
        "ten": "Hoài nào?",
        "chang": {
          "ngayTruyen": "2024-09-23",
          "gio": "16:30",
          "chotKhi": [
            "cau-hoai-nao"
          ],
          "khiChot": null,
          "coMat": [
            {
              "nhanVat": "minh-anh",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "duy",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "bac-tu",
              "noi": "toa-b"
            }
          ]
        },
        "kieu": "theo-truyen",
        "chuoi": "c1-mo",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 2,
        "ten": "Hoài là ai?",
        "chang": {
          "ngayTruyen": "2024-09-25",
          "gio": "17:00",
          "chotKhi": [
            "cau-hoai-ra-luc-nao"
          ],
          "khiChot": "c2-chot",
          "coMat": [
            {
              "nhanVat": "minh-anh",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "duy",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "bac-tu",
              "noi": "toa-b"
            }
          ]
        },
        "kieu": "theo-truyen",
        "chuoi": "c2-mo",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 3,
        "ten": "Sáng 16/09 Hoài làm gì?",
        "chang": {
          "ngayTruyen": "2024-09-27",
          "gio": "18:30",
          "chotKhi": [],
          "khiChot": null,
          "coMat": [
            {
              "nhanVat": "chu-cuong",
              "noi": "ktx"
            },
            {
              "nhanVat": "minh-anh",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "duy",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "bac-tu",
              "noi": "toa-b"
            }
          ]
        },
        "kieu": "theo-truyen",
        "chuoi": "c3-mo",
        "batDauO": "phong-ktx",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      }
    ],
    "ngayHop": {
      "chuoi": "hop-00"
    },
    "ket": {
      "that": "ket-that",
      "thuong": "ket-tam",
      "tam": "ket-tam"
    }
  },
  "chuoi": [
    {
      "id": "md-00-tren-xe",
      "title": "Cảnh 0: trên xe buýt lên Hà Nội",
      "canh": "xe-buyt",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chủ nhật, 08/09/2024 · Trên xe buýt lên Hà Nội"
        },
        {
          "type": "note",
          "text": "Nền bg-mvp-xe-buyt đã vẽ người chơi tựa cửa sổ, khách trong xe, xe máy ngoài đường: lời dẫn không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên đùi là tờ giấy báo nhập học gấp làm tư, mép đã sờn: Ngành Kế toán. Ký túc xá, phòng 408."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Nguyễn Minh Khoa, sinh viên năm nhất. Đọc lên vẫn chưa quen.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mười bốn điểm dừng, đã qua mười hai. Ký túc xá ở cổng nào nhỉ?)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xe chậm dần. Giọng phụ xe vọng xuống: \"Đại học Chấn Hưng! Ai xuống thì chuẩn bị!\""
        },
        {
          "type": "task",
          "text": "Tìm đường vào ký túc xá (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-md-00-cong-truong",
          "asker": {
            "speaker": "player",
            "text": "Xuống xe"
          },
          "choices": [
            {
              "id": "go-md-00-cong-truong",
              "text": "Xuống xe",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-00-cong-truong"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-00-cong-truong",
      "title": "Cảnh 0: xuống xe trước cổng trường",
      "canh": "cong-truong",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Đại học Chấn Hưng · Cổng trường"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cổng trường rộng hơn trong ảnh. Tấm biển chỉ đường đầu tiên ghi: Ký túc xá, 300 m."
        },
        {
          "type": "branch",
          "id": "go-with-md-00-sanh-ktx",
          "asker": {
            "speaker": "player",
            "text": "Theo biển chỉ đường vào ký túc xá"
          },
          "choices": [
            {
              "id": "go-md-00-sanh-ktx",
              "text": "Theo biển chỉ đường vào ký túc xá",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-00-sanh-ktx"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-00-sanh-ktx",
      "title": "Cảnh 1: sảnh ký túc xá, người chơi đứng nhìn cậu áo xanh chỉ đường cho bạn nữ kéo vali",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chủ nhật, 08/09 · Sảnh ký túc xá"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sảnh đông như chợ. Vali kéo lạch cạch trên nền gạch, loa đọc tên khoa nào xếp hàng chỗ nào."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "player"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "hoai"
        },
        {
          "type": "note",
          "text": "Người chơi đứng nhìn: khung có [RA player] ngay trước đoạn này, không bật thẻ giới thiệu ai, hình người chơi không lên sân khấu. Nhãn: \"Bạn nữ kéo vali\", \"Cậu áo xanh\". Hết đoạn này bạn nữ rời hình ([RA hoai]) trước khi người chơi nói với cậu áo xanh."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một bạn nữ kéo chiếc vali to hơn người dừng trước cậu áo xanh, hỏi gì đó rất khẽ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-chi-tay",
          "text": "Khu nhà nữ à? Gần lắm! Cậu cứ đi thẳng cửa sau, thấy mái tôn thì rẽ trái!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cậu áo xanh kéo hộ vali ra tận cửa sau, trả tay cầm rồi vẫy chào. Bạn nữ đi theo hướng tay chỉ."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "hoai"
        },
        {
          "type": "explore",
          "id": "kp-sanh-ktx",
          "diem": [
            {
              "sprite": "vung:lung-ao-xanh",
              "x": 87.5,
              "y": 44,
              "rong": 9,
              "chuoi": "md-00-hoi-duong",
              "sau": [],
              "nhan": "Cậu áo xanh",
              "dau": "chinh"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Cậu ấy rành đường thế. Hỏi luôn nhỉ?)"
        },
        {
          "type": "task",
          "text": "Hỏi đường lên phòng 408 (tạm)"
        }
      ]
    },
    {
      "id": "md-00-hoi-duong",
      "title": "Cảnh 1: hỏi đường cậu áo xanh, hóa ra cùng phòng 408",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Bạn ơi, cho mình hỏi phòng 408 ở đâu thế?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "408? Phòng tớ đây! Thế là mình cùng phòng rồi!"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Tớ là Tùng, năm nhất Du lịch. Cậu học ngành gì?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Kế toán."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Kế toán à? Thế sau này đi chợ cho cả phòng là có người tính tiền rồi!"
        },
        {
          "type": "goto",
          "to": "md-00-thang-may"
        }
      ]
    },
    {
      "id": "md-00-thang-may",
      "title": "Cảnh 1: thang máy hỏng, vác vali bộ; người chơi muốn viết góp ý",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cửa thang máy dán tờ giấy viết tay: \"Thang hỏng, đang chờ thợ\"."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-gai-dau",
          "text": "Từ sáng tới giờ vẫn chưa có thợ à… Đành vác bộ lên tầng bốn."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ngày nhập học mà thang hỏng cả buổi. Phải viết mấy dòng góp ý mới được."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Hộp kiến nghị ở sảnh tòa B. Cất đồ xong tớ dẫn cậu ra, tiện tớ sang đấy lấy thêm tờ danh sách phòng."
        },
        {
          "type": "branch",
          "id": "go-with-md-01-phong-408",
          "asker": {
            "speaker": "player",
            "text": "Vác vali bộ lên tầng bốn"
          },
          "choices": [
            {
              "id": "go-md-01-phong-408",
              "text": "Vác vali bộ lên tầng bốn",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-01-phong-408"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-01-phong-408",
      "title": "Cảnh 1: phòng 408",
      "canh": "phong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "image",
          "imageId": "cg-phong-408"
        },
        {
          "type": "note",
          "text": "Ảnh cg-phong-408 ngay trước đoạn này: giường trên có balo và chiếc áo xanh vắt ngang, giường dưới còn trống. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Để tớ dẫn cậu một vòng, mười phút là thuộc hết! Nhà ăn, nhà xe, tòa B, hộp kiến nghị, bảng tin... cậu cần gì cứ hỏi tớ, cả tuần nay tớ đứng đón tân sinh viên rồi!"
        },
        {
          "type": "biet",
          "nhanVat": "tung",
          "truong": [
            "cau-noi",
            "lich"
          ]
        },
        {
          "type": "task",
          "text": "Cùng Tùng ra hộp kiến nghị ở sảnh tòa B (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-md-01-toa-b",
          "asker": {
            "speaker": "player",
            "text": "Cùng Tùng ra hộp kiến nghị ở sảnh tòa B"
          },
          "choices": [
            {
              "id": "go-md-01-toa-b",
              "text": "Cùng Tùng ra hộp kiến nghị ở sảnh tòa B",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-01-toa-b"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-01-toa-b",
      "title": "Cảnh 1: sảnh tòa B, hộp kiến nghị, bác Thịnh bắt ký phiếu gửi",
      "canh": "sanh-toa-b",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Sảnh tòa B"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sảnh vắng. Cạnh phòng trực treo một chiếc hộp tôn xanh."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Bỏ thư góp ý thì ký vào phiếu gửi. Ai nộp người ấy ký."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Cháu ký cho, bác!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng ký một chữ to đùng vào dòng người nộp, rồi thả tờ góp ý vào khe hộp."
        },
        {
          "type": "branch",
          "id": "go-with-md-01-cong-ktx",
          "asker": {
            "speaker": "player",
            "text": "Đi một vòng trường với Tùng"
          },
          "choices": [
            {
              "id": "go-md-01-cong-ktx",
              "text": "Đi một vòng trường với Tùng",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-01-cong-ktx"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-01-cong-ktx",
      "title": "Cảnh 1: cổng ký túc xá, chú bảo vệ",
      "canh": "cong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cổng ký túc xá"
        },
        {
          "type": "note",
          "text": "Nền cổng ký túc xá, một chú bảo vệ ngồi ghi sổ trong chốt. Tùng gọi \"chú\"; chưa nói đây là chú ruột (để Trung thu)."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Chú ơi, bạn cùng phòng cháu đây!"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Nó lên sớm, chú xin cho vào đội đón tân sinh viên, đỡ ngồi phòng ôm điện thoại."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Chỉ đúng được mấy người thì chú không biết."
        },
        {
          "type": "biet",
          "nhanVat": "chu-cuong",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "branch",
          "id": "go-with-md-08-tuan-cong-dan",
          "asker": {
            "speaker": "player",
            "text": "Sang tuần sinh hoạt công dân"
          },
          "choices": [
            {
              "id": "go-md-08-tuan-cong-dan",
              "text": "Sang tuần sinh hoạt công dân",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-08-tuan-cong-dan"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-08-tuan-cong-dan",
      "title": "Thứ Hai 09/09 tới thứ Sáu 13/09: tuần sinh hoạt công dân, thẻ lịch in theo khoa",
      "canh": "hoi-truong",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "09/09 – 13/09 · Một tuần sinh hoạt công dân. Thẻ lịch học in theo khoa, phát tận tay."
        },
        {
          "type": "task",
          "text": "Đi xem Ngày hội CLB (tạm)"
        },
        {
          "type": "image",
          "imageId": "doc-the-lich-cua-toi"
        },
        {
          "type": "branch",
          "id": "go-with-md-09-ngay-hoi",
          "asker": {
            "speaker": "player",
            "text": "Đi Ngày hội CLB"
          },
          "choices": [
            {
              "id": "go-md-09-ngay-hoi",
              "text": "Đi Ngày hội CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-09-ngay-hoi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-09-ngay-hoi",
      "title": "Cảnh 2: Ngày hội CLB = buổi tuyển, bàn CLB Thám Tử vắng; Minh Anh và Duy giữ bàn, anh sơ mi trắng dừng trước bàn",
      "canh": "nha-van-hoa",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Bảy, 14/09 · Ngày hội CLB"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sân nhà văn hóa đông nghịt. Bàn CLB nào cũng loa, bóng bay. Trừ bàn cuối dãy."
        },
        {
          "type": "image",
          "imageId": "cg-ban-clb-vang"
        },
        {
          "type": "note",
          "text": "Ảnh cg-ban-clb-vang ngay trước đoạn này: bàn CLB Thám Tử vắng, Minh Anh và Duy (ôm laptop CLB) giữ bàn. Anh sơ mi trắng đeo thẻ ban tổ chức (không balo) dừng trước bàn, nói một câu rồi đi; anh chưa lộ tên. Hết đoạn này anh rời hình ([RA khanh])."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "ban-to-chuc",
          "text": "Năm nay vẫn hai người à? Quy định của Hội, dưới năm thành viên là đưa vào diện xét giải thể đấy."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Anh sơ mi trắng gõ nhẹ lên mặt bàn rồi đi sang dãy khác."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "khanh"
        },
        {
          "type": "goto",
          "to": "md-09-ban-tham-tu"
        }
      ]
    },
    {
      "id": "md-09-ban-tham-tu",
      "title": "Cảnh 2: Tùng đăng ký; Duy tra mã Tùng làm mẫu; người chơi tự tra mã mình",
      "canh": "nha-van-hoa",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Chân dung Tùng dáng om-to-roi (ôm xấp tờ rơi, ngậm bánh rán, quạt giấy CLB Guitar kẹp nách)."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "om-to-roi",
          "text": "Giải thể á? Cả sân có mỗi một bàn vắng thế mà cũng bị dồn…"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chị ơi, đây là bàn CLB Thám Tử ạ? Em đăng ký được không?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Được chứ! Chị là Minh Anh, chủ nhiệm. Em ghi tên với mã sinh viên vào đây."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Anh là Duy. Đưa mã đây anh tra cho, đơn có lớp mới duyệt được."
        },
        {
          "type": "biet",
          "nhanVat": "minh-anh",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "projector",
          "id": "md-chieu-ma-tung",
          "source": {
            "kind": "sql",
            "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';"
          },
          "run": true,
          "expectedRowCount": 1,
          "lamMau": true
        },
        {
          "type": "note",
          "text": "Ngay trước đoạn này là màn tra mẫu: Duy gõ mã SV240251 của Tùng, ra một dòng."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "DL24A. DL là Du lịch, 24 là khóa 2024, A là lớp A. Xong."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Cậu cũng in phiếu tham gia đi. Hôm Trung thu đến họp, ký cái là xong."
        },
        {
          "type": "challenge",
          "challengeId": "c-tra-ma-nguoi-choi"
        },
        {
          "type": "note",
          "text": "Ngay trước đoạn này là màn tra: người chơi tự kéo mã của mình vào khối, ra một dòng. Không chấm."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(KT24A. Kế toán, khóa 2024, lớp A.)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Năm tên rồi! Tối thứ Ba CLB ngồi Trung thu ở sân ký túc xá, hai em xuống nhé."
        },
        {
          "type": "task",
          "text": "Tối thứ Ba tới sân ký túc xá xem CLB sinh hoạt (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bảy giờ tối thứ Ba nhé, muộn là hết bánh đấy! (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-md-10-trung-thu",
          "asker": {
            "speaker": "player",
            "text": "Tối thứ Ba, xuống sân ký túc xá"
          },
          "choices": [
            {
              "id": "go-md-10-trung-thu",
              "text": "Tối thứ Ba, xuống sân ký túc xá",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-10-trung-thu"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-10-trung-thu",
      "title": "Cảnh 3: Trung thu ở sân ký túc xá, 19:00, đĩa bốn bánh",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "player"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "tung"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 17/09 · 19:00 · Trung thu ở sân ký túc xá"
        },
        {
          "type": "note",
          "text": "Nền bg-mvp-san-ktx-trung-thu: đèn ông sao dọc hàng rào; trên bàn nhựa một đĩa bốn chiếc bánh nướng, ấm trà. Ảnh cg-nam-ghe ngay sau đoạn này: quanh bàn có năm cái ghế. Lời không nhắc lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bàn nhựa kê năm chiếc ghế. Đĩa bốn chiếc bánh nướng đặt cạnh ấm trà."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Đủ người rồi. Đây là Hà Vy, năm nhất như hai em."
        },
        {
          "type": "image",
          "imageId": "cg-nam-ghe"
        },
        {
          "type": "goto",
          "to": "md-10-vy-soi"
        }
      ]
    },
    {
      "id": "md-10-vy-soi",
      "title": "Trung thu: Hà Vy soi Tùng làm mẫu, rồi nối ba chi tiết thành một suy luận về người",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "tung"
        },
        {
          "type": "note",
          "text": "Hà Vy soi Tùng tự động: kính lúp đi lần lượt từng điểm theo thứ tự viết (áo → băng gạc → bản đồ), người chơi chỉ xem. Tùng đứng yên, tay vẫn cầm tờ bản đồ gấp (chân dung tung happy)."
        },
        {
          "type": "explore",
          "id": "kp-soi-tung",
          "kieu": "quan-sat",
          "nhanVat": "tung",
          "dang": "happy",
          "haVySoi": true,
          "tuDong": true,
          "diem": [
            {
              "sprite": "vung:ao",
              "x": 50,
              "y": 44,
              "rong": 22,
              "chuoi": "md-10-soi-ao",
              "sau": [],
              "nhan": "Cái áo"
            },
            {
              "sprite": "vung:mui",
              "x": 57,
              "y": 21,
              "rong": 14,
              "chuoi": "md-10-soi-mui",
              "sau": [],
              "nhan": "Miếng băng trên mũi"
            },
            {
              "sprite": "vung:ban-do",
              "x": 82,
              "y": 56,
              "rong": 24,
              "chuoi": "md-10-soi-ban-do",
              "sau": [],
              "nhan": "Tờ bản đồ trên tay"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Nối ba cái lại: cậu ấy là kiểu thấy ai cần là lao vào giúp."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ, chuẩn luôn! Sao biết hay thế?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu nhìn, nhưng cậu chưa quan sát. Sherlock Holmes nói thế."
        },
        {
          "type": "goto",
          "to": "md-10-chia-banh"
        }
      ]
    },
    {
      "id": "md-10-soi-ao",
      "title": "Hà Vy soi Tùng: cái áo",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Áo đội tình nguyện, mặc tới tận tối. Tức là cả ngày nay vẫn đi giúp người ta."
        }
      ]
    },
    {
      "id": "md-10-soi-mui",
      "title": "Hà Vy soi Tùng: miếng băng trên mũi",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Miếng băng trên mũi còn mới. Va vào đâu lúc khuân đồ."
        }
      ]
    },
    {
      "id": "md-10-soi-ban-do",
      "title": "Hà Vy soi Tùng: tờ bản đồ trên tay",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tờ bản đồ gấp hằn nếp, mép mềm. Mở ra gấp vào cả trăm lần rồi."
        }
      ]
    },
    {
      "id": "md-10-chia-banh",
      "title": "Trung thu 19:15: đĩa còn ba bánh; người chơi tự soi quanh bàn; Minh Anh làm mẫu nối note thành câu hỏi; bé Na",
      "canh": "san-ktx-trung-thu-ba-banh",
      "canhCat": true,
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "player"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "minh-anh"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "duy"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "19:15"
        },
        {
          "type": "note",
          "text": "Nền bg-mvp-san-ktx-trung-thu-ba-banh: cùng sân, đĩa còn ba chiếc bánh. Ngay sau đoạn này hệ thống thêm giấy nhớ \"Đĩa còn ba lúc 19:15\"."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Ơ. Lúc bảy giờ chị đếm còn bốn, giờ còn ba?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu thử nhìn quanh bàn xem."
        },
        {
          "type": "task",
          "text": "Soi quanh bàn bánh (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mọi người cứ nhìn trên bàn. Cậu thử nhìn cả dưới đất xem. (tạm)"
        },
        {
          "type": "biet",
          "nhanVat": "ha-vy",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-dia-ba-banh"
            }
          ]
        },
        {
          "type": "explore",
          "id": "kp-banh-trung-thu",
          "diem": [
            {
              "sprite": "vung:vun-banh",
              "x": 33,
              "y": 85,
              "rong": 12,
              "chuoi": "md-10-vun-banh",
              "sau": [],
              "nhan": "Nền sân dưới chân bàn",
              "dau": "chinh"
            },
            {
              "sprite": "vung:den-ca-chep",
              "x": 42,
              "y": 66,
              "rong": 14,
              "chuoi": "md-10-den-ca-chep",
              "sau": [],
              "nhan": "Đèn cá chép đỏ",
              "dau": "chinh"
            },
            {
              "sprite": "vung:doi-dep",
              "x": 54,
              "y": 76,
              "rong": 7,
              "chuoi": "md-10-doi-dep",
              "sau": [],
              "nhan": "Đôi dép cạnh đèn",
              "dau": "chinh"
            },
            {
              "sprite": "vung:dau-lan",
              "x": 42,
              "y": 44,
              "rong": 10,
              "chuoi": "md-10-dau-lan",
              "sau": [],
              "nhan": "Đầu lân với cái trống"
            }
          ]
        },
        {
          "type": "note",
          "text": "Người chơi đã soi hết các đầu mối \"!\". Ngay sau đoạn này hệ thống thêm giấy nhớ \"Một bé cầm bánh ra đèn cá chép\"."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Một bé nào đó cầm bánh chạy ra chỗ đèn cá chép rồi."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-be-cam-banh"
            }
          ]
        },
        {
          "type": "ghep-mau",
          "nguoi": "minh-anh",
          "the": [
            "clue-dia-ba-banh",
            "clue-be-cam-banh"
          ],
          "giayNho": "Bé lấy bánh lúc nào?",
          "lamMau": [
            {
              "speaker": "minh-anh",
              "expression": "smile",
              "text": "Hai cái này để cạnh nhau thì nảy ra câu hỏi gì?"
            },
            {
              "speaker": "player",
              "text": "Bé lấy bánh lúc nào ạ?"
            },
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Bảy giờ còn đủ, bảy giờ mười lăm thì thiếu. Bé lấy trong mười lăm phút ấy."
            }
          ]
        },
        {
          "type": "image",
          "imageId": "cg-be-na-den-ca-chep"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "be-na"
        },
        {
          "type": "note",
          "text": "Ảnh cg-be-na-den-ca-chep ngay trước đoạn này: bé Na ngồi xổm cạnh đèn cá chép, hai tay ôm nửa chiếc bánh, má dính vụn, đôi dép vàng bên cạnh. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một bé gái ôm nửa chiếc bánh từ sau cột chạy ra."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Na! Con gái chú Cường tớ đấy!"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Các cháu thông cảm, con bé nhà chú thấy đèn với bánh là không đứng yên được."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Không sao đâu chú. Bé ăn đi, ba cái còn lại bọn cháu chia nhỏ ra là đủ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu có tố chất đấy."
        },
        {
          "type": "note",
          "text": "Người chơi ký phiếu tham gia."
        },
        {
          "type": "task",
          "text": "Thứ Hai tuần sau lên phòng CLB (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-md-11-phong-clb",
          "asker": {
            "speaker": "player",
            "text": "Thứ Hai tuần sau, lên phòng CLB"
          },
          "choices": [
            {
              "id": "go-md-11-phong-clb",
              "text": "Thứ Hai tuần sau, lên phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-11-phong-clb"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-10-vun-banh",
      "title": "Soi: vệt vụn từ chân bàn ra đèn cá chép",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Vụn bánh rơi thành vệt mảnh, từ chân bàn chạy ra tới chỗ đèn cá chép.)"
        }
      ]
    },
    {
      "id": "md-10-den-ca-chep",
      "title": "Soi: đèn cá chép giữa sân",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đèn cá chép đỏ nằm giữa sân. Ai kéo ra đây rồi bỏ đấy nhỉ?)"
        }
      ]
    },
    {
      "id": "md-10-doi-dep",
      "title": "Soi: đôi dép trẻ con cạnh đèn",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đôi dép nhựa trẻ con màu vàng bỏ cạnh đèn. Chủ của nó đi đâu rồi?)"
        }
      ]
    },
    {
      "id": "md-10-dau-lan",
      "title": "Chi tiết ẩn: đội múa lân ngồi quanh trống",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mấy anh chị đội múa lân ngồi quanh cái trống, mải nói chuyện, chẳng ai ngó sang bàn mình.)"
        }
      ]
    },
    {
      "id": "md-11-phong-clb",
      "title": "Cảnh 4: thứ Hai 23/09, Minh Anh mang thư kiến nghị và phiếu gửi về phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "diem-luu-vu",
          "vu": "vu1"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai, 23/09 · 16:30 · Phòng CLB"
        },
        {
          "type": "note",
          "text": "Nền phòng CLB: tủ sắt cũ ở góc, bảng điều tra còn trống. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Minh Anh về muộn, tay cầm một phong bì nâu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Thầy Quang vừa gọi chị lên. Trường nhận được thư kiến nghị thu hồi phòng của CLB mình."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thứ Hai tuần sau họp rà soát. Thầy bảo CLB muốn giữ phòng thì tự đi mà chứng minh."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ai viết thế chị?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thư không ký tên. Chỉ có tờ phiếu gửi, dòng người nộp ký \"Hoài\"."
        },
        {
          "type": "task",
          "text": "Xem kỹ lá thư và tờ phiếu gửi (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-thu-phieu",
          "diem": [
            {
              "sprite": "vung:la-thu",
              "x": 52,
              "y": 47,
              "rong": 7,
              "chuoi": "md-11-la-thu",
              "sau": [],
              "nhan": "Lá thư kiến nghị",
              "dau": "chinh"
            },
            {
              "sprite": "vung:phieu-gui",
              "x": 70,
              "y": 50,
              "rong": 6,
              "chuoi": "md-11-phieu-gui",
              "sau": [],
              "nhan": "Tờ phiếu gửi",
              "dau": "chinh"
            },
            {
              "sprite": "vung:tu-sat",
              "x": 93,
              "y": 55,
              "rong": 9,
              "chuoi": "md-11-tu-sat",
              "sau": [],
              "nhan": "Cái tủ sắt"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thế thì dễ rồi, tìm bạn Hoài là xong!"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bảng sinh viên có sẵn trong máy. Tra thử xem trường có mấy Hoài."
        },
        {
          "type": "task",
          "text": "Tra xem trường có mấy bạn tên Hoài (tạm)"
        }
      ]
    },
    {
      "id": "md-11-la-thu",
      "title": "Quan sát: lá thư kiến nghị không tên người viết",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "show-document",
          "documentId": "doc-thu-kien-nghi"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Thu hồi cả phòng chỉ vì một lá thư không ai ký tên à?) (tạm)"
        }
      ]
    },
    {
      "id": "md-11-phieu-gui",
      "title": "Quan sát: phiếu gửi, dòng người nộp ký \"Hoài\"",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "save-evidence",
          "evidenceId": "ev-phieu-gui-hoai"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Chữ \"Hoài\" ký đủ, không phải ký tắt. Hoài nào đây nhỉ?) (tạm)"
        }
      ]
    },
    {
      "id": "md-11-tu-sat",
      "title": "Chi tiết ẩn: cái tủ sắt cũ ở góc phòng",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Cái tủ sắt nặng thế này, hồi xưa ai khuân được lên tận đây nhỉ?) (tạm)"
        }
      ]
    },
    {
      "id": "c1-mo",
      "title": "Chặng 1: phòng CLB, người chơi tự tra ten = 'Hoài'",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "challenge",
          "challengeId": "c-nam-hoai"
        },
        {
          "type": "note",
          "text": "Màn tra ngay sau M4.2: người chơi tự kéo `ten = 'Hoài'` vào khối, ra 5 dòng. Duy chỉ mở máy, không gợi ý."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm người tên Hoài."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Năm á?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chị ơi, năm người thì khoanh lại kiểu gì ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thư được bỏ ở đâu thì bắt đầu từ đấy. Mai ra sảnh tòa B xem cái hộp."
        },
        {
          "type": "task",
          "text": "Ra sảnh tòa B xem cái hộp kiến nghị"
        },
        {
          "type": "cac-cau-noi",
          "cac": [
            {
              "id": "cau-hoai-nao",
              "the": [
                "ev-nam-hoai",
                "clue-bc24"
              ],
              "cau": "Hoài nào học Báo chí 2024, sáng thứ Hai ở tòa B?",
              "dich": {
                "kind": "hien-truong",
                "ghim": null,
                "chuoi": "c1-thieu-bang-lop"
              }
            }
          ]
        },
        {
          "type": "goto",
          "to": "c1-ban-do"
        }
      ]
    },
    {
      "id": "c1-ban-do",
      "title": "Chặng 1: bản đồ trường (phòng CLB, sảnh tòa B)",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "explore",
          "id": "c1-bd",
          "kieu": "ban-do",
          "gio": "16:30",
          "diem": [
            {
              "sprite": "ghim:phong-clb",
              "x": 45,
              "y": 8,
              "rong": 5,
              "chuoi": "c1-clb",
              "sau": [],
              "nhan": "Phòng CLB",
              "dau": "chinh",
              "co": [
                "minh-anh",
                "duy"
              ]
            },
            {
              "sprite": "ghim:toa-b",
              "x": 48,
              "y": 29,
              "rong": 5,
              "chuoi": "c1-toa-b",
              "sau": [],
              "nhan": "Sảnh tòa B",
              "dau": "chinh",
              "co": [
                "bac-tu"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c1-clb",
      "title": "Chặng 1: phòng CLB; lời Minh Anh đổi theo việc em đã có trong tay",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "clue-bc24"
          },
          "to": "c1-clb-noi"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em ra sảnh tòa B xem cái hộp chưa? Có gì mới thì về đây, chị em mình ghép lại. (tạm)"
        }
      ]
    },
    {
      "id": "c1-clb-noi",
      "title": "Chặng 1: phòng CLB, Minh Anh mời người chơi tự nối hai giấy nhớ thành câu hỏi",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em có hai tờ rồi: năm bạn Hoài, và BC-24 là Báo chí khóa 2024. Để cạnh nhau thì nảy ra câu hỏi gì? (tạm)"
        },
        {
          "type": "task",
          "text": "Nối hai giấy nhớ thành một câu hỏi (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Kéo giấy nhớ này sang giấy nhớ kia xem, hai tờ hợp nhau thì chỉ nối được. (tạm)"
        }
      ]
    },
    {
      "id": "c1-thieu-bang-lop",
      "title": "Chặng 1: bảng sinh viên chỉ có mã lớp; Minh Anh đi xin thầy Quang bảng lớp",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Phòng CLB"
        },
        {
          "type": "note",
          "text": "Người chơi vừa nối \"Cả trường có năm Hoài\" với \"BC-24 là Báo chí khóa 2024\": giấy nhớ \"Hoài nào học Báo chí 2024, sáng thứ Hai ở tòa B?\" hiện ra. Bảng sinh viên chỉ có mã lớp, không có tòa hay buổi."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bảng sinh viên chỉ có mã lớp. Lớp nào học tòa nào, buổi nào thì không có."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Cái đó nằm ở bảng lớp, phải xin thầy Quang. Để chị lên xin, buổi sinh hoạt sau có."
        }
      ]
    },
    {
      "id": "c1-toa-b",
      "title": "Sảnh tòa B, sáng thứ Ba 24/09, 7:50: bác Thịnh, cái hộp kiến nghị",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 24/09 · 7:50 · Sảnh tòa B"
        },
        {
          "type": "note",
          "text": "Nền sảnh tòa B; bác bảo vệ mở cửa sổ phòng trực, thẻ tên ghi Thịnh (chân dung bác đứng ở điểm bấm). Hộp kiến nghị là ảnh vật, hiện sau khi nói chuyện với bác. Hà Vy đi cùng người chơi."
        },
        {
          "type": "explore",
          "id": "kp-toa-b",
          "diem": [
            {
              "sprite": "nv:bac-tu",
              "x": 80,
              "y": 100,
              "rong": 16,
              "chuoi": "c1-bac-thinh",
              "sau": [],
              "nhan": "Bác bảo vệ ở phòng trực",
              "dau": "chinh"
            },
            {
              "sprite": "obj-hop-kien-nghi",
              "x": 35.2,
              "y": 45.5,
              "rong": 3.4,
              "chuoi": "c1-khe-hop",
              "sau": [
                "c1-bac-thinh"
              ],
              "nhan": "Khe hộp kiến nghị",
              "dau": "chinh"
            },
            {
              "sprite": "vung:quat",
              "x": 20,
              "y": 12,
              "rong": 7,
              "chuoi": "c1-toa-b-quat",
              "sau": [],
              "nhan": "Cái quạt treo tường"
            }
          ]
        },
        {
          "type": "task",
          "text": "Về phòng CLB, nối hai giấy nhớ thành một câu hỏi (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mình mang hai tờ này về phòng CLB, đặt cạnh nhau xem. (tạm)"
        }
      ]
    },
    {
      "id": "c1-bac-thinh",
      "title": "Bác Thịnh: bảy giờ mở sảnh, chín giờ có người xuống thu hộp",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cháu chào bác. Bác cho cháu hỏi về cái hộp kiến nghị, hôm thứ Hai tuần trước ạ."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Hộp ấy à? Sảnh này bảy giờ sáng bác mới mở, chín giờ cô bên Công tác sinh viên xuống thu như mọi ngày. Thư nào vào hộp sáng thứ Hai thì cũng vào sau bảy giờ thôi."
        },
        {
          "type": "biet",
          "nhanVat": "bac-tu",
          "truong": [
            "cau-noi",
            "lich"
          ]
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-thinh-7h"
            }
          ]
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-thinh-9h"
            }
          ]
        },
        {
          "type": "note",
          "text": "Lời của bác đổi theo thẻ phiếu gửi (người chơi luôn có thẻ này từ phòng CLB 23/09): bác không nhớ mặt người ký, chỉ nhớ có đưa phiếu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Hôm ấy có phiếu ký tên Hoài. Bác có nhớ mặt người ký không ạ?"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Sáng thứ Hai cả trăm đứa qua sảnh, đứa nào cũng vội. Bác chỉ đưa phiếu, ký xong là bác cất."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bảy giờ mở sảnh, chín giờ thu hộp. Vậy lá thư vào hộp trong hai tiếng ấy."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy cúi sát khe hộp."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Cậu quan sát khe hộp xem. Có một mẩu giấy mắc ở đó. Mép giấy còn mới, không bám bụi, tức là mới bị kẹt gần đây."
        }
      ]
    },
    {
      "id": "c1-khe-hop",
      "title": "Quan sát khe hộp: gỡ mẩu giấy mắc ở mép; Hà Vy đọc mã BC-24",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "image",
          "imageId": "cg-khe-hop-the-lich"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một tấm thẻ lịch học bị xé mất nửa dưới. Còn đọc được: BC-24 · Thứ Hai · Tòa B · Tiết 1."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Dòng tên bị xé mất rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mép rách xơ thế này là bị giật mạnh. Người bỏ thư vội đến mức không buồn gỡ ra."
        },
        {
          "type": "save-evidence",
          "evidenceId": "ev-the-lich-bc24"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "BC-24… viết giống kiểu mã lớp."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Giống mã lớp anh Duy đọc hôm Ngày hội. DL24A là Du lịch, khóa 2024."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Vậy BC là Báo chí, 24 là khóa 2024."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-bc24"
            }
          ]
        }
      ]
    },
    {
      "id": "c1-toa-b-quat",
      "title": "Chi tiết ẩn: cái quạt treo tường",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Quạt treo tường còn chưa bật. Trưa nay kiểu gì cũng có người tranh chỗ ngồi dưới quạt.) (tạm)"
        }
      ]
    },
    {
      "id": "c2-mo",
      "title": "Chặng 2: phòng CLB, bảng lớp về tay; tra hai lần; Tùng buột miệng; người chơi nối câu hỏi",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Tư, 25/09 · Buổi sinh hoạt · Phòng CLB"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bảng lớp đây. Thầy hỏi xin làm gì, chị bảo để tìm đúng người nộp phiếu. Thầy gật."
        },
        {
          "type": "challenge",
          "challengeId": "c-lop-bc24a"
        },
        {
          "type": "note",
          "text": "Ngay trước đoạn này là màn tra bảng lớp: ngành VÀ khóa VÀ tòa VÀ buổi; hoạt cảnh lọc từng bước, số dòng rơi dần, ra 1 dòng BC24A."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Báo chí 2024 có ba lớp. Học tòa B sáng thứ Hai thì chỉ còn BC24A."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mỗi điều kiện gạt bớt một lớp."
        },
        {
          "type": "challenge",
          "challengeId": "c-hoai-bc24a"
        },
        {
          "type": "note",
          "text": "Ngay trước đoạn này là màn tra bảng sinh viên: tên Hoài VÀ lớp BC24A ra 1 dòng, cột nơi ở là Ký túc xá."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Lê Thu Hoài, lớp BC24A. Ở ký túc xá."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hoài ký tên rõ thế, Hoài viết chứ còn ai!"
        },
        {
          "type": "task",
          "text": "Nối \"Lê Thu Hoài ở ký túc xá\" với lời bác Thịnh thành một câu hỏi (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hoài ở ký túc xá, bác Thịnh nói bảy giờ mới mở sảnh. Hai tờ ấy cạnh nhau thì nảy ra câu hỏi gì? (tạm)"
        },
        {
          "type": "cac-cau-noi",
          "cac": [
            {
              "id": "cau-hoai-ra-luc-nao",
              "the": [
                "ev-hoai-bc24a",
                "clue-loi-thinh-7h"
              ],
              "cau": "Sáng 16/09 Hoài ra khỏi ký túc xá lúc nào?",
              "dich": {
                "kind": "hien-truong",
                "ghim": "ktx",
                "chuoi": null
              }
            }
          ]
        },
        {
          "type": "goto",
          "to": "c2-ban-do"
        }
      ]
    },
    {
      "id": "c2-ban-do",
      "title": "Chặng 2: bản đồ trường (phòng CLB, sảnh tòa B đi lại được; cổng ký túc xá chưa mở)",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "explore",
          "id": "c2-bd",
          "kieu": "ban-do",
          "gio": "17:00",
          "diem": [
            {
              "sprite": "ghim:phong-clb",
              "x": 45,
              "y": 8,
              "rong": 5,
              "chuoi": "c2-clb",
              "sau": [],
              "nhan": "Phòng CLB",
              "dau": "chinh",
              "co": [
                "minh-anh",
                "duy"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c2-clb",
      "title": "Chặng 2: phòng CLB, Minh Anh nhắc lại hai tờ cần đặt cạnh nhau",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hoài ở ký túc xá, còn bác Thịnh nói bảy giờ mới mở sảnh. Em đặt hai tờ ấy cạnh nhau, nảy ra câu hỏi gì? (tạm)"
        }
      ]
    },
    {
      "id": "c2-chot",
      "title": "Chặng 2 chốt: Tùng nhắc cổng ký túc xá có máy quẹt thẻ",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "note",
          "text": "Người chơi vừa nối \"Lê Thu Hoài ở ký túc xá\" với \"Bác Thịnh mở sảnh lúc 7:00\": giấy nhớ \"Sáng 16/09 Hoài ra khỏi ký túc xá lúc nào?\" hiện ra."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Cổng có máy quẹt thẻ, chú tớ trực ở đấy!"
        },
        {
          "type": "task",
          "text": "Ra cổng ký túc xá hỏi chú Cường (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Ra cổng ký túc xá hỏi chú tớ nhé."
        }
      ]
    },
    {
      "id": "c3-mo",
      "title": "Chặng 3: chiều thứ Sáu 27/09, ở phòng 408, ra bản đồ",
      "canh": "phong-ktx",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "explore",
          "id": "c3-bd",
          "kieu": "ban-do",
          "gio": "18:30",
          "diem": [
            {
              "sprite": "ghim:ktx",
              "x": 72,
              "y": 30,
              "rong": 5,
              "chuoi": "c3-cong",
              "sau": [],
              "nhan": "Cổng ký túc xá",
              "dau": "chinh",
              "co": [
                "chu-cuong"
              ]
            },
            {
              "sprite": "ghim:phong-clb",
              "x": 45,
              "y": 8,
              "rong": 5,
              "chuoi": "c3-clb",
              "sau": [
                "c3-cong"
              ],
              "nhan": "Phòng CLB",
              "dau": "chinh",
              "co": [
                "minh-anh",
                "duy"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c3-cong",
      "title": "Cổng ký túc xá, 18:30: chú Cường kể, sổ ra vào: 6:44",
      "canh": "cong-ktx",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 27/09 · 18:30 · Cổng ký túc xá"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chú ơi, chú cho bọn cháu xem nhờ giờ quẹt thẻ của một bạn sáng thứ Hai tuần trước được không ạ?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Xem đúng mã bạn ấy, đúng hôm ấy thôi đấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Sáng hôm ấy chú có để ý bạn nữ nào cầm phong bì nâu không ạ?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Gần bảy giờ, chú sắp giao ca. Có cậu đeo balo đen, trùm mũ áo, đeo khẩu trang, dúi cho một con bé cái phong bì nâu ngay trước cổng."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Mặt mũi cậu ấy thì chú chịu."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-chu-cuong"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-ra-vao"
        },
        {
          "type": "biet",
          "nhanVat": "hoai",
          "truong": [
            "lich"
          ]
        },
        {
          "type": "note",
          "text": "Ngay trước đoạn này là màn tra sổ ra vào: `ma_sv = 'SV240317'` VÀ `ngay = '2024-09-16'` → 2 dòng; bấm ô giờ 06:44."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ra cổng 6:44. Tối mới quẹt vào."
        },
        {
          "type": "doi-loai",
          "the": "clue-loi-chu-cuong"
        },
        {
          "type": "note",
          "text": "Lời chú Cường khớp sổ ra vào: giấy nhớ lời chú Cường đổi thành thẻ sự thật (hiệu ứng ngắn), chuyển sang chồng chờ của bảng chân lý."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "6:44 Hoài ra cổng, gần bảy giờ có người dúi phong bì. Lời chú khớp với máy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thế Hoài chỉ cầm hộ à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mới biết có người đưa. Người ấy là ai, có viết thư không, thì chưa biết."
        },
        {
          "type": "task",
          "text": "Về phòng CLB, cả đội dựng bảng chân lý (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Tối mai cả nhà ngồi lại ở phòng CLB, mang đủ các tờ nhé. (tạm)"
        }
      ]
    },
    {
      "id": "c3-clb",
      "title": "Tối thứ Bảy 28/09: cả đội quanh bảng, dựng bảng chân lý sáng thứ Hai 16/09",
      "canh": "phong-clb-dem-banh-mi",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "player"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "minh-anh"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "duy"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "ha-vy"
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "tung"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Tối thứ Bảy, 28/09 · Phòng CLB"
        },
        {
          "type": "note",
          "text": "Cả năm người quanh bảng. Nền bg-mvp-phong-clb-dem-banh-mi: túi bánh mì que, ấm trà, quạt cây, bảng đầy thẻ nối chỉ đỏ. Màn bảng chân lý dtg-vu1 ngay sau đoạn này."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chị kẻ rồi đây: hàng là giờ sáng hôm ấy, cột là từng người. Cái gì chắc rồi thì xếp vào."
        },
        {
          "type": "dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Người đưa phong bì là ai thì để trống. Chưa có căn cứ thì không điền."
        },
        {
          "type": "task",
          "text": "Thứ Hai trình bảng chân lý ở buổi họp rà soát (tạm)"
        },
        {
          "type": "het-chang"
        }
      ]
    },
    {
      "id": "hop-00",
      "title": "Mở họp; thầy Quang giới thiệu anh Chủ tịch Hội; lượt 1 (mẫu): Tùng bật dậy trả lời hộ",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai, 30/09/2024 · 16:00 · Họp rà soát"
        },
        {
          "type": "note",
          "text": "Phòng họp tầng ba: thầy Quang đầu bàn, cốc trà nóng; Chủ tịch Hội một bên; năm người CLB bên kia. Hoài ngồi chờ ngoài hành lang (không lên hình). Bảng chân lý thu nhỏ ở góc."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em chào thầy ạ. CLB Thám Tử có mặt đủ ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Bắt đầu."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Đây là anh Chủ tịch Hội sinh viên, bên Hội chuyển lá thư lên. Anh nói trước."
        },
        {
          "type": "task",
          "text": "Chỉ ô trên bảng chân lý để bác lời anh Chủ tịch Hội (tạm)"
        },
        {
          "type": "hien-dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "text": "Phiếu gửi ký tên Hoài. Người ký là người nộp, người nộp thì chịu trách nhiệm về thư. Theo tôi vậy là rõ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Không rõ đâu ạ. Hôm nhập học em ký phiếu gửi tờ góp ý thang máy, mà tờ ấy là bạn cùng phòng em viết."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Tiếp."
        },
        {
          "type": "goto",
          "to": "hop-01"
        }
      ]
    },
    {
      "id": "hop-01",
      "title": "Lượt 2: màn chiếu câu HOẶC của Khánh; người chơi sửa thành VÀ (câu 1/3)",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Được. Nhưng các bạn tra dữ liệu thế nào? Tôi nhờ người tra thử theo đúng hai thứ các bạn nói: tên Hoài, lớp BC24A."
        },
        {
          "type": "note",
          "text": "Khánh nói như người tra vụng, không như người gài bẫy. Ẩn ý (user 09/10): Khánh CỐ TÌNH chiếu câu HOẶC để CLB lúng túng; không câu nào nói ra, người chơi tự ngộ ra về sau. Màn chiếu ngay sau đoạn này: tên = 'Hoài' HOẶC lớp = 'BC24A', 36 dòng."
        },
        {
          "type": "projector",
          "id": "hop-chieu-or",
          "source": {
            "kind": "sql",
            "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';"
          },
          "run": true,
          "expectedRowCount": 36
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Ra cả lớp người ta. Tra kiểu này thì chỉ vào ai cũng được."
        },
        {
          "type": "task",
          "text": "Sửa câu tra trên màn chiếu cho đúng hai thứ vừa nêu (tạm)"
        },
        {
          "type": "fix-query",
          "challengeId": "c-sua-or-khanh",
          "tinhVach": {
            "cau": {
              "so": 1,
              "tong": 3
            }
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Anh dùng HOẶC nên ra mọi người tên Hoài cộng cả lớp. Bọn em dùng VÀ: vừa tên Hoài, vừa lớp BC24A. Một người."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Một người. Được."
        },
        {
          "type": "task",
          "text": "Chỉ ô trên bảng chân lý để bác lời anh Chủ tịch Hội (tạm)"
        },
        {
          "type": "goto",
          "to": "hop-02"
        }
      ]
    },
    {
      "id": "hop-02",
      "title": "Lượt 3: \"Hoài tự cầm thư từ phòng đi bỏ\" (câu 2/3, chỉ ô)",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "doi-chat",
          "id": "dc-tu-mang",
          "asker": {
            "speaker": "khanh",
            "text": "Vậy Hoài nộp thư. Thư từ phòng Hoài ra, Hoài cầm đi bỏ."
          },
          "cauHoi": "",
          "bangChung": [
            {
              "id": "dtg-vu1:o1+dtg-vu1:o2",
              "muc": "dung",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "6:44 Hoài ra cổng ký túc xá. Gần bảy giờ, ngay trước cổng, có người dúi cho Hoài phong bì nâu. Sổ ra vào và lời chú bảo vệ khớp nhau."
                }
              ],
              "o": [
                "dtg-vu1:o1",
                "dtg-vu1:o2"
              ]
            },
            {
              "id": "dtg-vu1:o3",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Bác bảo vệ mở sảnh thì liên quan gì tới việc thư từ đâu tới tay Hoài?"
                }
              ],
              "o": [
                "dtg-vu1:o3"
              ]
            },
            {
              "id": "dtg-vu1:o4",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Hoài bỏ thư vào hộp thì tôi đã nói rồi. Tôi hỏi thư từ đâu tới tay Hoài."
                }
              ],
              "o": [
                "dtg-vu1:o4"
              ]
            }
          ],
          "chuaDu": [],
          "khac": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Chỗ ấy không nói thư từ đâu tới tay Hoài."
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "chiO": true,
          "tinhVach": {
            "cau": {
              "so": 2,
              "tong": 3
            },
            "saiLanDau": [
              {
                "speaker": "narrator",
                "text": "Hà Vy đẩy kính, nói nhỏ."
              },
              {
                "speaker": "ha-vy",
                "expression": "thinking",
                "text": "Chỉ vào ô cạnh giờ 6:44 xem."
              }
            ]
          }
        },
        {
          "type": "goto",
          "to": "hop-03"
        }
      ]
    },
    {
      "id": "hop-03",
      "title": "Lượt 4: \"Hoài phải quen người đưa\" (câu 3/3, ô trống bắt buộc)",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "doi-chat",
          "id": "dc-nguoi-dung-sau",
          "asker": {
            "speaker": "khanh",
            "text": "Người khác đưa thì Hoài cũng phải quen người ấy. Không quen ai nhờ bỏ hộ."
          },
          "cauHoi": "",
          "bangChung": [
            {
              "id": "dtg-vu1:?",
              "muc": "dung",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Người đưa phong bì là ai, Hoài có quen hay không, bọn em chưa có căn cứ. Chưa có thì bọn em không điền."
                }
              ],
              "o": [
                "dtg-vu1:?"
              ]
            }
          ],
          "chuaDu": [],
          "khac": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Ô ấy cho thấy Hoài quen người đưa ở chỗ nào?"
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "chiO": true,
          "tinhVach": {
            "cau": {
              "so": 3,
              "tong": 3
            },
            "saiLanDau": [
              {
                "speaker": "narrator",
                "text": "Hà Vy đẩy kính, nói nhỏ."
              },
              {
                "speaker": "ha-vy",
                "expression": "thinking",
                "text": "Ô nào chưa có ai?"
              }
            ]
          }
        },
        {
          "type": "goto",
          "to": "hop-cham"
        }
      ]
    },
    {
      "id": "hop-cham",
      "title": "Chấm vụ: đủ căn cứ và dưới 3 vạch là kết thật, không thì kết tạm",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "cham-vu",
          "vu": "vu1",
          "can": [
            "ev-phieu-gui-hoai",
            "doc-thu-kien-nghi",
            "ev-nam-hoai",
            "ev-lop-bc24a",
            "ev-hoai-bc24a",
            "clue-loi-thinh-7h",
            "clue-loi-thinh-9h",
            "ev-the-lich-bc24",
            "clue-bc24",
            "clue-loi-chu-cuong",
            "ev-ra-cong-644",
            "dtg-vu1"
          ]
        },
        {
          "type": "ending-branch"
        }
      ]
    },
    {
      "id": "ket-that",
      "title": "Kết thật (rank A, B): thầy không nhận thư vào hồ sơ; Khánh rời phòng; Hoài vào kể",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy không nhận lá thư này vào hồ sơ."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Em còn họp bên Hội. Em xin phép thầy."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chủ tịch Hội gật đầu chào rồi đi. Cửa đóng lại."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "khanh"
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Minh Anh, em ra mời bạn ngoài hành lang vào."
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "hoai"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một bạn nữ bước vào, hai tay nắm chặt quai túi. Tùng ngẩng lên, khựng lại."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em là Lê Thu Hoài, lớp BC24A?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em kể đi."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Sáng hôm ấy ở cổng, có một bạn trùm mũ, đeo khẩu trang nhờ em. Bạn ấy bảo là đơn của lớp, nhờ em bỏ hộ vào hộp tòa B."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "downcast",
          "text": "Bác bảo vệ bảo ai nộp người ấy ký, nên em ký. Em không biết trong thư viết gì."
        },
        {
          "type": "biet",
          "nhanVat": "hoai",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "goto",
          "to": "ket-bong-mo"
        }
      ]
    },
    {
      "id": "ket-bong-mo",
      "title": "Kết thật: dựng cảnh bóng mờ tự chạy ở cổng ký túc xá gần bảy giờ sáng 16/09",
      "canh": "cong-ktx-bong-mo",
      "canhCat": true,
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai, 16/09 · Gần 7:00 · Cổng ký túc xá"
        },
        {
          "type": "note",
          "text": "Cảnh bóng mờ tự chạy theo lời Hoài: cổng ký túc xá gần bảy giờ, một bóng balo đen trùm mũ, một bóng nhỏ hơn cầm phong bì đi về phía tòa B. Không lời; người chơi xem, rồi bấm ra hành lang."
        },
        {
          "type": "wait",
          "giay": 6
        },
        {
          "type": "branch",
          "id": "go-with-c11-that",
          "asker": {
            "speaker": "player",
            "text": "Ra hành lang"
          },
          "choices": [
            {
              "id": "go-c11-that",
              "text": "Ra hành lang",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "c11-that"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ket-tam",
      "title": "Kết tạm (rank C): thầy giữ thư lại; Khánh ra trước; Hoài ôm túi đi về",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Hôm nay CLB chưa thuyết phục được thầy. Thư thầy giữ lại trong hồ sơ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chủ tịch Hội gấp sổ, chào thầy rồi ra trước."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "khanh"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ngoài hành lang, Hoài ôm túi đi về. Tùng nhìn theo qua khe cửa, khựng lại: bạn nữ kéo vali hôm nhập học. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-c11-tam",
          "asker": {
            "speaker": "player",
            "text": "Ra hành lang"
          },
          "choices": [
            {
              "id": "go-c11-tam",
              "text": "Ra hành lang",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "c11-tam"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c11-that",
      "title": "Cảnh 11 (sau kết thật): hành lang, Tùng nhận ra Hoài là bạn kéo vali",
      "canh": "hanh-lang-phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "note",
          "text": "Nền hành lang tầng ba, nắng chiều."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Hoài là bạn hôm nhập học tớ kéo vali hộ đấy. Thế mà tớ…"
        },
        {
          "type": "branch",
          "id": "r-xin-loi-hoai",
          "asker": {
            "speaker": "tung",
            "text": "Phù… tớ nói linh tinh một câu mà suýt làm Hoài mang tiếng. Cậu bảo tớ có nên sang lớp Hoài xin lỗi không?"
          },
          "choices": [
            {
              "id": "sang-ngay",
              "text": "Nên. Sáng thứ Hai lớp Hoài học ở tòa B.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "dat-co",
                  "co": "vu1-xin-loi-som"
                }
              ]
            },
            {
              "id": "doi",
              "text": "Để Hoài bình tĩnh đã, mấy hôm nữa hẵng sang.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "dat-co",
                  "co": "vu1-xin-loi-sau"
                }
              ]
            }
          ]
        },
        {
          "type": "goto",
          "to": "c11-tiep"
        }
      ]
    },
    {
      "id": "c11-tam",
      "title": "Cảnh 11 (sau kết tạm): hành lang, Tùng nhận ra Hoài là bạn kéo vali",
      "canh": "hanh-lang-phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "note",
          "text": "Nền hành lang tầng ba, nắng chiều."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Hoài là bạn hôm nhập học tớ kéo vali hộ đấy. Thế mà tớ…"
        },
        {
          "type": "branch",
          "id": "r-xin-loi-hoai-tam",
          "asker": {
            "speaker": "tung",
            "text": "Phù… tớ nói linh tinh một câu, giờ Hoài mang tiếng thật rồi. Cậu bảo tớ có nên sang lớp Hoài xin lỗi không?"
          },
          "choices": [
            {
              "id": "sang-ngay",
              "text": "Nên. Sáng thứ Hai lớp Hoài học ở tòa B.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "dat-co",
                  "co": "vu1-xin-loi-som"
                }
              ]
            },
            {
              "id": "doi",
              "text": "Để Hoài bình tĩnh đã, mấy hôm nữa hẵng sang.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "dat-co",
                  "co": "vu1-xin-loi-sau"
                }
              ]
            }
          ]
        },
        {
          "type": "goto",
          "to": "c11-tiep"
        }
      ]
    },
    {
      "id": "c11-tiep",
      "title": "Cảnh 11: xin lỗi suông thì kỳ lắm",
      "canh": "hanh-lang-phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Mà xin lỗi suông thì kỳ lắm. Tớ phải nghĩ xem làm được gì cho Hoài đã."
        },
        {
          "type": "branch",
          "id": "go-with-c11-phong-clb",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB"
          },
          "choices": [
            {
              "id": "go-c11-phong-clb",
              "text": "Về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "c11-phong-clb"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c11-phong-clb",
      "title": "Cảnh 11: phòng CLB chiều muộn, sổ tổng kết đóng dấu, tấm thẻ trắng trên bảng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng CLB, chiều muộn. Minh Anh đóng dấu lên trang tổng kết Vụ 1 trong sổ CLB."
        },
        {
          "type": "note",
          "text": "Khi có sổ tổng kết (B19-MÁY): ngay sau đoạn này trang tổng kết Vụ 1 hiện ra, con dấu đỏ A, B hoặc C đóng xuống; ở lề trang là những vạch nhỏ gạch trong buổi họp, hoặc không có vạch nào. Lời không đọc số vạch."
        },
        {
          "type": "so-tong-ket",
          "vu": "vu1"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Rồi chị quay sang bảng điều tra."
        },
        {
          "type": "note",
          "text": "Ảnh cg-bang-the-trang ngay sau đoạn này: mọi tấm thẻ đã nối chỉ đỏ với nhau; riêng cạnh tấm thẻ \"phong bì nâu\", Minh Anh ghim thêm một tấm thẻ trắng chưa viết gì, sợi chỉ đỏ thả lơ lửng. Không lời giải thích."
        },
        {
          "type": "image",
          "imageId": "cg-bang-the-trang"
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "vu1-rank-a"
          },
          "to": "canh-12"
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "canh-12",
      "title": "Cảnh 12 (chỉ rank A): quán trà đá cổng trường, \"cậu trà nóng\"",
      "canh": "tra-da",
      "canhCat": true,
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Quán trà đá cổng trường"
        },
        {
          "type": "note",
          "text": "Nền quán trà đá dưới gốc bàng ngoài cổng chính."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bà ơi, cho cháu ba cốc trà đá! Hôm nay cháu khao."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Ba cốc chín nghìn. Có chuyện gì vui mà khao thế?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "CLB cháu vừa giữ được phòng ạ!"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Mấy đứa ở cái phòng có tủ sắt bên nhà câu lạc bộ đấy hả?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Vâng ạ. Sao bà biết ạ?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Hồi bà mới ra đây bán, phòng ấy là kho chổi. Có cậu sinh viên xin được chìa, tự khuân cái tủ sắt lên. Chiều nào cũng ra đây ngồi ghi chép."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Hè cũng như đông, cậu ấy chỉ gọi trà nóng. Ra quán trà đá mà gọi trà nóng thì bà nhớ lâu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bà có nhớ tên anh ấy không ạ?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Khách của bà, bà nhớ cốc chứ ai nhớ tên. Bà gọi là \"cậu trà nóng\"."
        },
        {
          "type": "biet",
          "nhanVat": "ba-lua",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy ghi vào sổ: \"cậu trà nóng\". Bên cạnh, một dòng nhỏ hơn: lời bà bán trà đá, chưa có giấy tờ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bên kia đường, một bạn nữ ôm chồng sách đi ngang. Là Hoài."
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "hoai"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Hoài ơi! Đợi tớ với… chuyện hôm trước tớ…"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài giật mình quay lại, gật đầu một cái rồi đi nhanh hơn."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "hoai"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Con trai xin lỗi con gái mà gọi với qua đường như đòi nợ! Mai mời con bé cốc trà mà tạ lỗi cho tử tế."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng nhìn theo hướng Hoài đi, tay vẫn cầm cốc trà chưa uống."
        },
        {
          "type": "end"
        }
      ]
    }
  ],
  "thuThach": {
    "c-lop-bc24a": {
      "id": "c-lop-bc24a",
      "tieuDe": "Bảng lớp: Báo chí 2024, tòa B, sáng thứ Hai",
      "deBai": "Lớp nào học Báo chí khóa 2024, ở tòa B, vào sáng thứ Hai?",
      "manhMoiLienQuan": [
        "clue-bc24"
      ],
      "mucTieuHoc": "Bốn điều kiện nối bằng VÀ: thêm từng điều kiện thấy số dòng rơi, thiếu một điều kiện vẫn còn thừa lớp.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa, buoi FROM lop WHERE nganh = 'Báo chí' AND khoa_hoc = 2024 AND toa = 'B' AND buoi = 'Sáng thứ Hai';",
      "bamO": "ma_lop",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 3
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Báo chí khóa 2024 có ba lớp. Thẻ lịch còn nói tới một chỗ và một buổi nữa. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 2
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Còn hai lớp. Mỗi điều kiện gạt bớt được một lớp, mà mình mới có ba điều. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không còn lớp nào. Chữ phải đúng từng dấu, từng chữ hoa. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Mình có ngành, khóa từ chữ BC-24, có tòa và buổi từ tấm thẻ lịch. Lớp cần tìm phải khớp đủ bốn thứ cùng lúc. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Thêm bốn dòng lọc: cột nganh thả giấy Báo chí, cột khoa_hoc thả giấy 2024, cột toa thả giấy B, cột buoi thả giấy Sáng thứ Hai. Chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 3
          },
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Mới có ngành với khóa thôi. Tấm thẻ lịch còn nói tòa nào, sáng hay chiều. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Thêm hai dòng lọc: cột toa thả giấy B, cột buoi thả giấy Sáng thứ Hai, chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 2
          },
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Vẫn còn thừa một lớp. Xem lại xem còn điều nào trên tấm thẻ mình chưa dùng. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Điều kiện nào chưa có thì thêm một dòng lọc ở cột ấy, thả giấy tương ứng vào, chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": {
        "id": "ev-lop-bc24a",
        "title": "Lớp BC24A học tòa B sáng thứ Hai",
        "description": "Bảng lớp, lọc Báo chí VÀ khóa 2024 VÀ tòa B VÀ sáng thứ Hai: một dòng, lớp BC24A. Báo chí 2024 còn BC24B (tòa C) và BC24C (chiều thứ Hai) nhưng không khớp đủ bốn điều kiện.",
        "giaTri": [
          "BC24A"
        ],
        "chuTrenGiay": [
          "Lớp học tòa B sáng thứ Hai của Báo chí 2024: **BC24A**"
        ]
      },
      "ghiChu": [
        "Hoạt cảnh lọc từng bước: thêm từng điều kiện thì số dòng rơi (3, 2, 1). Bấm ô mã lớp BC24A để chép ra giấy nhớ, rồi ghim lên bảng."
      ]
    },
    "c-ra-vao": {
      "id": "c-ra-vao",
      "tieuDe": "Sổ ra vào ký túc xá",
      "deBai": "Sáng thứ Hai 16/09, bạn Hoài mã SV240317 quẹt thẻ ra cổng lúc mấy giờ?",
      "manhMoiLienQuan": [
        "clue-loi-chu-cuong"
      ],
      "mucTieuHoc": "Hai điều kiện nối bằng VÀ: đúng mã, đúng ngày. Rồi đọc dòng cần trong kết quả.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';",
      "bamO": "gio",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 38
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ba tuần quẹt thẻ của bạn Hoài. Sáng nào cũng ra cổng sớm thật. Mình chỉ cần sáng thứ Hai thôi. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 756
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Sáng thứ Hai cả ký túc xá ra vào hơn bảy trăm lượt cơ à? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 792
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Ơ, sao lại ra nhiều hơn cả lúc lọc mỗi ngày? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không có dòng nào. Mã với ngày phải đúng từng chữ một. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "neutral",
              "text": "Hai lượt: sáng ra, tối mới vào. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "dung-hep"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "neutral",
              "text": "Chỉ còn đúng lượt ra cổng sáng hôm ấy. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Mình có mã của bạn Hoài, và biết đúng sáng hôm nào. Sổ phải khớp cả hai cùng lúc. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Thêm hai dòng lọc: cột ma_sv thả giấy SV240317, cột ngay thả giấy 2024-09-16, chữ nối để là VÀ rồi bấm CHẠY. Ra kết quả thì bấm ô gio của lượt ra cổng. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 38
          },
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Đây là cả ba tuần của bạn ấy. Chú Cường kể chuyện một sáng thôi. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Thêm một dòng lọc cột ngay, thả giấy 2024-09-16 vào, chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 792
          },
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Thế này là gộp cả người khác vào rồi. Cần dòng vừa đúng bạn ấy vừa đúng sáng hôm ấy. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Bấm vào chữ HOẶC giữa hai dòng lọc cho nó đổi thành VÀ, rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": {
        "id": "ev-ra-cong-644",
        "title": "6:44 sáng 16/09, Hoài quẹt thẻ ra cổng ký túc xá",
        "description": "Sổ quẹt thẻ cổng ký túc xá, mã SV240317 VÀ ngày 16/09/2024: hai dòng. Sáng quẹt thẻ ra cổng lúc 06:44; tối 17:52 mới quẹt thẻ vào.",
        "giaTri": [
          "06:44"
        ],
        "chuTrenGiay": [
          "Sáng 16/09 Hoài quẹt thẻ ra cổng lúc **06:44**"
        ]
      },
      "ghiChu": [
        "Màn tra 2: sổ ra vào, mã SV240317 VÀ ngày 2024-09-16 ra hai dòng; bấm ô giờ 06:44 (lượt ra) để chép ra giấy nhớ, rồi ghim lên bảng."
      ]
    },
    "c-tra-ma-tung": {
      "id": "c-tra-ma-tung",
      "tieuDe": "Bảng sinh viên: mã của Tùng",
      "deBai": "Tùng khai mã sinh viên SV240251. Mã ấy thuộc lớp nào?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Một điều kiện: mã sinh viên bằng đúng mã khai. Mỗi mã là một người nên ra đúng một dòng.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';",
      "truyVanNapSan": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';",
      "phanUng": [],
      "vatChung": null,
      "ghiChu": []
    },
    "c-tra-ma-nguoi-choi": {
      "id": "c-tra-ma-nguoi-choi",
      "tieuDe": "Bảng sinh viên: mã của mình",
      "deBai": "Giấy báo nhập học in mã sinh viên của bạn: SV240388. Mã ấy thuộc lớp nào?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Một điều kiện: gõ đúng mã của mình vào ô, bấm CHẠY. Ra một dòng là in phiếu được.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240388';",
      "goGiaTri": true,
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Không ra ai à? Mã phải đúng từng chữ một, chép lại từ giấy báo nhập học. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Mã sinh viên in trên giấy báo nhập học, mỗi người một mã riêng. Em tìm đúng người có mã ấy. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm \"+ thêm điều kiện\", bấm vào tên cột cho tới khi ra ma_sv, gõ mã vào ô bên cạnh rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-nam-hoai": {
      "id": "c-nam-hoai",
      "tieuDe": "Bảng sinh viên: những ai tên Hoài",
      "deBai": "Phiếu gửi ký một chữ: Hoài. Cả trường có những bạn nào tên Hoài?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Lọc bằng một điều kiện: tên đúng bằng Hoài. Mỗi dòng còn lại là một bạn tên Hoài.",
      "soDongKyVong": 5,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Không ra bạn nào à? Rõ ràng phiếu ký tên Hoài cơ mà. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Phiếu gửi ký đúng một chữ. Em cứ tìm hết những ai mang chữ ấy đã. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm \"+ thêm điều kiện\", bấm vào tên cột cho tới khi ra ten, thả giấy Hoài vào ô bên cạnh rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": {
        "id": "ev-nam-hoai",
        "title": "Cả trường có năm Hoài",
        "description": "Bảng sinh viên, lọc tên Hoài: năm dòng, năm bạn ở năm lớp khác nhau, hai bạn cùng học Báo chí khóa 2024 ở hai lớp BC24A và BC24C. Chưa nói bạn nào đã ký phiếu.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-hoai-bc24a": {
      "id": "c-hoai-bc24a",
      "tieuDe": "Bảng sinh viên: Hoài, lớp BC24A",
      "deBai": "Trong năm bạn tên Hoài, bạn nào học lớp BC24A?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Hai điều kiện nối bằng VÀ: đúng tên, đúng lớp. Cột nơi ở cho biết bạn ấy ở đâu.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "bamO": "ma_sv",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "thinking",
              "text": "Vẫn năm bạn Hoài như lúc nãy. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 32
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Ba mươi hai người cùng một lớp. Có tên Hoài trong đấy không nhỉ? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 36
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Ơ, thêm lớp vào mà lại ra nhiều hơn? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Không còn bạn nào cả. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Ra năm là đúng, cả trường có năm Hoài. Muốn còn một thì phải bảo máy thêm hai điều cùng lúc, chứ không phải điều này hoặc điều kia. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm \"+ thêm điều kiện\", chọn cột ma_lop, thả giấy BC24A vào ô bên cạnh, chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 32
          },
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Đấy là cả lớp. Em còn cần đúng người tên Hoài trong lớp ấy. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Thêm một dòng lọc cột ten, thả giấy Hoài vào, chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 36
          },
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Thế này là gộp cả hai nhóm lại rồi. Em cần những dòng khớp cả hai cùng lúc. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm vào chữ HOẶC giữa hai dòng lọc cho nó đổi thành VÀ, rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": {
        "id": "ev-hoai-bc24a",
        "title": "Lê Thu Hoài, BC24A, ở ký túc xá",
        "description": "Bảng sinh viên, lọc tên Hoài VÀ lớp BC24A: một dòng, Lê Thu Hoài, mã SV240317, lớp BC24A, nơi ở Ký túc xá. Mới cho biết đi tìm ai, chưa nói ai bỏ thư.",
        "giaTri": [
          "SV240317"
        ],
        "chuTrenGiay": [
          "Mã sinh viên của Lê Thu Hoài: **SV240317**"
        ]
      },
      "ghiChu": [
        "Màn tra bảng sinh viên: lọc tên Hoài VÀ lớp BC24A, ra một dòng Lê Thu Hoài (SV240317, nơi ở Ký túc xá). Bấm ô mã của dòng ấy để chép ra giấy nhớ, rồi ghim lên bảng."
      ]
    },
    "c-sua-or-khanh": {
      "id": "c-sua-or-khanh",
      "tieuDe": "Câu tra trên màn chiếu",
      "deBai": "CLB ra một dòng. Câu chiếu trên màn ra cả chục dòng. Vì sao hai bên khác số?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "HOẶC giữ dòng khớp một trong hai điều kiện, nên ra nhiều; VÀ chỉ giữ dòng khớp cả hai.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "truyVanNapSan": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';",
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 36
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Vẫn ba mươi sáu dòng như trên màn chiếu. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Câu ấy lấy cả nhóm tên Hoài lẫn cả lớp BC24A. Mình chỉ cần phần trùng nhau thôi. (tạm)"
          },
          "bac2": {
            "speaker": "ha-vy",
            "expression": "neutral",
            "text": "Bấm vào chữ HOẶC giữa hai dòng lọc cho nó đổi thành VÀ, rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "khiTrinhSai": [
        {
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Vẫn chưa ra một dòng. Các bạn xem lại câu tra đi. (tạm)"
        },
        {
          "speaker": "narrator",
          "text": "Minh Anh gạch một vạch nhỏ ở lề sổ. (tạm)"
        }
      ],
      "vatChung": null,
      "ghiChu": []
    }
  },
  "hoSo": {
    "clue-dia-ba-banh": {
      "id": "clue-dia-ba-banh",
      "loai": "clue",
      "heading": "[Đĩa còn ba bánh lúc 19:15]",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "lời kể",
        "Keyword": "thời gian:19:15 · hành động:còn ba",
        "Trên bảng": "Đĩa còn ba lúc 19:15",
        "Nguồn trên bảng": "Minh Anh đếm",
        "Tiêu đề": "Đĩa bánh Trung thu còn ba chiếc lúc 19:15",
        "Nội dung": "Bảy giờ Minh Anh đếm đĩa còn đủ bốn chiếc bánh nướng. Bảy giờ mười lăm chia bánh, trên đĩa chỉ còn ba."
      },
      "quotes": {}
    },
    "clue-be-cam-banh": {
      "id": "clue-be-cam-banh",
      "loai": "clue",
      "heading": "[Một bé cầm bánh ra đèn cá chép]",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "quan sát",
        "Keyword": "người:Một bé · hành động:cầm bánh · địa điểm:đèn cá chép",
        "Trên bảng": "Một bé cầm bánh ra đèn cá chép",
        "Nguồn trên bảng": "Vệt vụn và đôi dép",
        "Tiêu đề": "Một bé cầm bánh chạy ra chỗ đèn cá chép",
        "Nội dung": "Vụn bánh rơi thành vệt từ chân bàn ra tới đèn cá chép giữa sân. Cạnh đèn có đôi dép nhựa trẻ con màu vàng."
      },
      "quotes": {}
    },
    "clue-loi-thinh-7h": {
      "id": "clue-loi-thinh-7h",
      "loai": "clue",
      "heading": "[Lời bác Thịnh: bảy giờ mở sảnh]",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "lời kể",
        "Keyword": "người:bác Thịnh · thời gian:7:00 · hành động:mở sảnh",
        "Trên bảng": "Bác Thịnh mở sảnh lúc 7:00",
        "Nguồn trên bảng": "Lời bác Thịnh",
        "Tiêu đề": "Bảy giờ sáng bác Thịnh mới mở sảnh tòa B",
        "Nội dung": "Sảnh tòa B bảy giờ sáng bác mới mở. Thư nào vào hộp sáng thứ Hai thì cũng vào sau bảy giờ."
      },
      "quotes": {}
    },
    "clue-loi-thinh-9h": {
      "id": "clue-loi-thinh-9h",
      "loai": "clue",
      "heading": "[Lời bác Thịnh: chín giờ thu hộp]",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "lời kể",
        "Keyword": "người:bác Thịnh · thời gian:9:00 · hành động:thu hộp",
        "Trên bảng": "Bác Thịnh: 9:00 thu hộp",
        "Nguồn trên bảng": "Lời bác Thịnh",
        "Tiêu đề": "Chín giờ có người bên Công tác sinh viên xuống thu hộp",
        "Nội dung": "Chín giờ sáng, người bên Công tác sinh viên xuống thu hộp kiến nghị như mọi ngày. Thư vào hộp sáng thứ Hai thì vào trước chín giờ."
      },
      "quotes": {}
    },
    "clue-bc24": {
      "id": "clue-bc24",
      "loai": "clue",
      "heading": "[BC-24 là Báo chí khóa 2024]",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "suy luận",
        "Keyword": "người:Báo chí khóa 2024",
        "Trên bảng": "BC-24 là Báo chí khóa 2024",
        "Nguồn trên bảng": "Hà Vy suy ra",
        "Tiêu đề": "BC-24 là Báo chí khóa 2024",
        "Giá trị cho trình dựng": "Báo chí · 2024",
        "Chữ trên giấy": "Hà Vy suy ra: ngành **Báo chí** · Hà Vy suy ra: khóa **2024**",
        "Nội dung": "Hai chữ đầu là ngành, hai số sau là khóa, giống cách anh Duy đọc mã lớp hôm Ngày hội: BC là Báo chí, 24 là khóa 2024."
      },
      "quotes": {}
    },
    "clue-loi-chu-cuong": {
      "id": "clue-loi-chu-cuong",
      "loai": "clue",
      "heading": "[Lời chú Cường]",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "lời kể",
        "Keyword": "người:cậu balo đen · thời gian:gần 7:00 · hành động:đưa phong bì",
        "Trên bảng": "Gần 7:00 cậu balo đen đưa phong bì cho Hoài",
        "Nguồn trên bảng": "Chú Cường kể",
        "Tiêu đề": "Gần 7:00 sáng 16/09 cậu balo đen đưa phong bì nâu ở cổng",
        "Giá trị cho trình dựng": "2024-09-16",
        "Chữ trên giấy": "Ngày chú Cường thấy phong bì nâu: **2024-09-16**",
        "Nội dung": "Sáng thứ Hai 16/09, lúc chú sắp giao ca (gần bảy giờ), có một cậu đeo balo đen, trùm mũ áo, đeo khẩu trang dúi cho một bạn nữ phong bì nâu ngay trước cổng. Mặt mũi cậu ấy chú không nhìn rõ. Bạn nữ cầm phong bì đi về phía tòa B."
      },
      "quotes": {}
    },
    "doc-thu-kien-nghi": {
      "id": "doc-thu-kien-nghi",
      "loai": "doc",
      "heading": "Thư kiến nghị thu hồi phòng CLB",
      "fields": {
        "Loại": "sự thật",
        "Nguồn": "tài liệu",
        "Keyword": "hành động:thu hồi phòng",
        "Trên bảng": "Thư đòi thu hồi phòng CLB, không ký tên",
        "Nguồn trên bảng": "Thầy Quang chuyển",
        "Tiêu đề": "Thư kiến nghị thu hồi phòng CLB Thám Tử",
        "Ảnh": "doc-thu-kien-nghi",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử. CLB không còn giải quyết được việc gì.",
          "(Cuối thư không có tên người viết.)"
        ]
      }
    },
    "ev-phieu-gui-hoai": {
      "id": "ev-phieu-gui-hoai",
      "loai": "ev",
      "heading": "Phiếu gửi ký \"Hoài\"",
      "fields": {
        "Loại": "sự thật",
        "Nguồn": "tài liệu",
        "Keyword": "người:Hoài · hành động:ký",
        "Trên bảng": "Người nộp thư ký tên \"Hoài\"",
        "Nguồn trên bảng": "Phiếu gửi kèm thư",
        "Tiêu đề": "Phiếu gửi kẹp ngoài phong bì nâu, người nộp ký \"Hoài\"",
        "Ảnh": "doc-phieu-gui-hoai",
        "Giá trị cho trình dựng": "Hoài",
        "Chữ trên giấy": "Người nộp ký trên phiếu gửi: **Hoài**",
        "Nội dung": "Kèm theo thư kiến nghị. Dòng người nộp ký một chữ: Hoài, ký đủ chữ, không ký tắt."
      },
      "quotes": {}
    },
    "ev-the-lich-bc24": {
      "id": "ev-the-lich-bc24",
      "loai": "ev",
      "heading": "Thẻ lịch rách ở khe hộp",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "quan sát",
        "Keyword": "địa điểm:tòa B · thời gian:thứ Hai",
        "Trên bảng": "Thẻ lịch BC-24, thứ Hai, tòa B",
        "Nguồn trên bảng": "Nhặt ở sảnh tòa B",
        "Tiêu đề": "Thẻ lịch BC-24 · thứ Hai · tòa B · tiết 1, mắc ở khe hộp kiến nghị",
        "Ảnh": "doc-the-lich-rach",
        "Giá trị cho trình dựng": "B · Sáng thứ Hai",
        "Chữ trên giấy": "Thẻ lịch mắc ở khe hộp: tòa **B** · Thẻ lịch mắc ở khe hộp: tiết 1 thứ Hai = **Sáng thứ Hai**",
        "Nội dung": "Tấm thẻ lịch học mắc ở mép khe hộp sảnh tòa B, mép giấy còn mới, không bám bụi. Dòng dưới cùng bị xé mất; còn đọc được: BC-24 · Thứ Hai · Tòa B · Tiết 1. Tiết 1 là tiết đầu buổi sáng. Dòng tên bị xé mất."
      },
      "quotes": {}
    }
  },
  "soTay": {
    "and-or": {
      "id": "and-or",
      "ten": "Nối điều kiện: AND và OR",
      "loai": "cú pháp",
      "trangChiLinh": [
        "Hai vòng tròn. AND là phần giao — phải nằm trong cả hai. OR là phần hợp — nằm trong một cái là được."
      ],
      "haVy": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Một vòng là các lớp ở tòa B, một vòng là các lớp ngành Báo chí. Lớp mình cần nằm ở phần chung của hai vòng."
        }
      ],
      "chuThich": "`AND`: phải thỏa cả hai điều kiện (phần giao). `OR`: thỏa một là đủ (phần hợp)."
    },
    "chuan-hoa": {
      "id": "chuan-hoa",
      "ten": "Gọt chữ trước khi so: TRIM và LOWER",
      "loai": "cú pháp",
      "trangChiLinh": [
        "Dữ liệu người gõ tay ít khi sạch. Thừa một dấu cách, lệch một chữ hoa là máy coi như hai thứ khác nhau. Gọt cho về cùng một kiểu rồi mới so."
      ],
      "haVy": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Với mình thì viết hoa hay viết thường vẫn là một phòng. Với máy thì phải khớp từng ký tự, kể cả dấu cách ở đuôi."
        }
      ],
      "chuThich": "`TRIM(cột)`: bỏ dấu cách ở đầu và cuối. `LOWER(cột)`: đổi về chữ thường. Gọt cột rồi mới so với giá trị."
    },
    "kiem-hai-lan": {
      "id": "kiem-hai-lan",
      "ten": "Kiểm hai lần, kết luận một lần",
      "loai": "tâm đắc",
      "trangChiLinh": [
        "Kiểm hai lần, kết luận một lần. Dữ liệu chỉ ra ai cần hỏi, không chỉ ra ai đã làm."
      ],
      "haVy": [],
      "chuThich": null
    },
    "like": {
      "id": "like",
      "ten": "\"Bằng\" và \"bắt đầu bằng\"",
      "loai": "lỗi thường gặp",
      "trangChiLinh": [
        "\"=\" so khớp chính xác cả chữ. Ra 0 dòng thì xem lại dữ liệu trước khi xem lại câu hỏi. Chỉ biết chữ đầu thì dùng LIKE 'H%'."
      ],
      "haVy": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tập rỗng không có nghĩa là không ai. Nó nghĩa là không ai có tên đúng bằng \"H\"."
        }
      ],
      "chuThich": "`=` phải khớp nguyên chữ. Chỉ biết chữ đầu thì dùng \"bắt đầu bằng\": `ten LIKE 'H%'` (dấu % là phần chữ còn lại)."
    },
    "sap-xep": {
      "id": "sap-xep",
      "ten": "Xếp kết quả: ORDER BY",
      "loai": "cú pháp",
      "trangChiLinh": [
        "Lọc xong mà để nguyên thì máy trả dòng theo thứ tự nó tìm thấy. Muốn dò với sổ giấy thì xếp theo đúng cột mà sổ giấy xếp."
      ],
      "haVy": [
        {
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Xếp không thêm bớt dòng nào cả. Nó chỉ đổi chỗ các dòng để mình dò cho dễ."
        }
      ],
      "chuThich": "`ORDER BY cột`: xếp kết quả tăng dần theo cột đó. Thêm `DESC` để xếp giảm dần."
    },
    "where-chu": {
      "id": "where-chu",
      "ten": "So sánh chữ: đặt trong nháy đơn",
      "loai": "cú pháp",
      "trangChiLinh": [
        "Chữ phải đặt trong nháy đơn: `toa_nha = 'B'`, `nganh = 'Báo chí'`.",
        "Thiếu nháy, máy tưởng B là tên một cột, nên báo \"no such column: B\"."
      ],
      "haVy": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Máy phân biệt tên cột với giá trị bằng cái nháy. Không có nháy là nó đi tìm cột."
        }
      ],
      "chuThich": "Chữ đặt trong nháy đơn: `toa_nha = 'B'`. Thiếu nháy, máy tưởng là tên cột."
    },
    "where-so": {
      "id": "where-so",
      "ten": "Lọc dòng với WHERE; so sánh số",
      "loai": "cú pháp",
      "trangChiLinh": [
        "Muốn lấy những dòng thỏa một điều kiện thì thêm WHERE: `WHERE cột = giá trị`.",
        "Số thì viết đúng như dữ liệu đang lưu: cột khóa lưu `2024` thì viết `khoa_hoc = 2024`, không phải \"K24\"."
      ],
      "haVy": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Trước khi lọc, nhìn xem cột ấy thật ra đang lưu cái gì đã."
        }
      ],
      "chuThich": "Lọc dòng: `WHERE cột = giá trị`. Số thì viết đúng như dữ liệu đang lưu: `khoa_hoc = 2024`."
    }
  },
  "loiChung": {
    "matUyTin": {
      "loi": [
        {
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Thầy cho em nó làm lại một lần ạ."
        },
        {
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Em xin nói đỡ: em nó mới học đọc dữ liệu tuần này."
        }
      ],
      "hetVach": {
        "speaker": "minh-anh",
        "expression": "worried",
        "text": "CLB xin phép hoãn buổi hôm nay. Chúng em sẽ quay lại với đủ căn cứ."
      }
    }
  },
  "soDongKhai": [
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa, buoi FROM lop WHERE nganh = 'Báo chí' AND khoa_hoc = 2024 AND toa = 'B' AND buoi = 'Sáng thứ Hai';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-lop.md:3 thẻ c-lop-bc24a, SQL chuẩn",
      "resultId": "ev-lop-bc24a"
    },
    {
      "sql": "SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/c-ra-vao.md:3 thẻ c-ra-vao, SQL chuẩn",
      "resultId": "ev-ra-cong-644"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-sinh-vien.md:3 thẻ c-tra-ma-tung, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240388';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-sinh-vien.md:24 thẻ c-tra-ma-nguoi-choi, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài';",
      "soDong": 5,
      "noi": "noi-dung-mua-1/thu-thach/c-sinh-vien.md:41 thẻ c-nam-hoai, SQL chuẩn",
      "resultId": "ev-nam-hoai"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-sinh-vien.md:61 thẻ c-hoai-bc24a, SQL chuẩn",
      "resultId": "ev-hoai-bc24a"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-sua-or-khanh.md:3 thẻ c-sua-or-khanh, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/kich-ban/00-mo-dau.md:114 [MÀN CHIẾU md-chieu-ma-tung]"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';",
      "soDong": 36,
      "noi": "noi-dung-mua-1/kich-ban/04-hop-va-ket.md:23 [MÀN CHIẾU hop-chieu-or]"
    }
  ],
  "duLieu": {
    "bang": [
      {
        "ten": "sinh_vien",
        "nhan": "Sinh viên",
        "nhanCot": {
          "ma_sv": "Mã sinh viên",
          "ho_dem": "Họ đệm",
          "ten": "Tên",
          "ma_lop": "Mã lớp",
          "noi_o": "Nơi ở"
        },
        "cot": [
          {
            "ten": "ma_sv",
            "kieu": "TEXT"
          },
          {
            "ten": "ho_dem",
            "kieu": "TEXT"
          },
          {
            "ten": "ten",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_lop",
            "kieu": "TEXT"
          },
          {
            "ten": "noi_o",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "SV240317",
            "Lê Thu",
            "Hoài",
            "BC24A",
            "Ký túc xá"
          ],
          [
            "SV240702",
            "Vũ Ngọc",
            "Hoài",
            "BC24C",
            "Ngoại trú"
          ],
          [
            "SV240588",
            "Nguyễn Thị",
            "Hoài",
            "MK24B",
            "Ký túc xá"
          ],
          [
            "SV230264",
            "Phạm Minh",
            "Hoài",
            "KT23A",
            "Ngoại trú"
          ],
          [
            "SV220419",
            "Đỗ Thanh",
            "Hoài",
            "DL22A",
            "Ký túc xá"
          ],
          [
            "SV240251",
            "Trần",
            "Tùng",
            "DL24A",
            "Ký túc xá"
          ],
          [
            "SV240388",
            "Nguyễn Minh",
            "Khoa",
            "KT24A",
            "Ký túc xá"
          ],
          [
            "SV240466",
            "Trần Hà",
            "Vy",
            "TU24A",
            "Ký túc xá"
          ],
          [
            "SV230142",
            "Nguyễn Đức",
            "Duy",
            "HC23A",
            "Ngoại trú"
          ],
          [
            "SV220337",
            "Lê Minh",
            "Anh",
            "LK22B",
            "Ngoại trú"
          ]
        ]
      },
      {
        "ten": "lop",
        "nhan": "Lớp",
        "nhanCot": {
          "ma_lop": "Mã lớp",
          "nganh": "Ngành",
          "khoa_hoc": "Khóa",
          "toa": "Tòa",
          "buoi": "Buổi học"
        },
        "cot": [
          {
            "ten": "ma_lop",
            "kieu": "TEXT"
          },
          {
            "ten": "nganh",
            "kieu": "TEXT"
          },
          {
            "ten": "khoa_hoc",
            "kieu": "INTEGER"
          },
          {
            "ten": "toa",
            "kieu": "TEXT"
          },
          {
            "ten": "buoi",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "BC24A",
            "Báo chí",
            2024,
            "B",
            "Sáng thứ Hai"
          ],
          [
            "BC24B",
            "Báo chí",
            2024,
            "C",
            "Sáng thứ Hai"
          ],
          [
            "BC24C",
            "Báo chí",
            2024,
            "B",
            "Chiều thứ Hai"
          ],
          [
            "BC23A",
            "Báo chí",
            2023,
            "B",
            "Sáng thứ Hai"
          ],
          [
            "KT24B",
            "Kế toán",
            2024,
            "B",
            "Sáng thứ Hai"
          ],
          [
            "KT24A",
            "Kế toán",
            2024,
            "A",
            "Sáng thứ Năm"
          ],
          [
            "KT23A",
            "Kế toán",
            2023,
            "A",
            "Sáng thứ Tư"
          ],
          [
            "MK24B",
            "Marketing",
            2024,
            "A",
            "Sáng thứ Ba"
          ],
          [
            "DL22A",
            "Du lịch",
            2022,
            "C",
            "Chiều thứ Năm"
          ],
          [
            "DL24A",
            "Du lịch",
            2024,
            "C",
            "Sáng thứ Sáu"
          ],
          [
            "TU24A",
            "Toán ứng dụng",
            2024,
            "D",
            "Chiều thứ Ba"
          ],
          [
            "HC23A",
            "Hành chính học",
            2023,
            "A",
            "Chiều thứ Tư"
          ],
          [
            "LK22B",
            "Luật kinh tế",
            2022,
            "D",
            "Sáng thứ Sáu"
          ]
        ]
      },
      {
        "ten": "ra_vao_ktx",
        "cot": [
          {
            "ten": "ma_sv",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "gio",
            "kieu": "TEXT"
          },
          {
            "ten": "chieu",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "SV240317",
            "2024-09-16",
            "06:44",
            "ra"
          ],
          [
            "SV240317",
            "2024-09-16",
            "17:52",
            "vào"
          ]
        ]
      }
    ],
    "bangAo": []
  },
  "dongThoiGian": {
    "dtg-vu1": {
      "id": "dtg-vu1",
      "ten": "Sáng thứ Hai 16/09",
      "kieu": "chinh",
      "nguoiNhac": "ha-vy",
      "keoSai": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thẻ này chưa khớp ô ấy. Xem lại nó nói chuyện lúc nào, ở đâu."
        }
      ],
      "cot": [
        {
          "id": "hoai",
          "nhan": "Hoài"
        },
        {
          "id": "?",
          "nhan": "? (chưa biết)"
        },
        {
          "id": "bac-tu",
          "nhan": "Bác Thịnh"
        }
      ],
      "theTam": [],
      "o": [
        {
          "id": "o1",
          "gio": "6:44",
          "cot": "hoai",
          "noi": "cổng ký túc xá",
          "viec": "ra khỏi cổng ký túc xá",
          "nhan": [
            "ev-ra-cong-644"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ô này cần đúng giờ Hoài ra cổng. Thẻ nào ghi giờ ấy?"
            }
          ],
          "keoVaoTrong": null
        },
        {
          "id": "o2",
          "gio": "~6:50",
          "cot": "?",
          "noi": "cổng ký túc xá",
          "viec": "đưa phong bì nâu cho Hoài",
          "nhan": [
            "clue-loi-chu-cuong"
          ],
          "khoaSan": false,
          "khongDien": "ai",
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ô này là lúc phong bì đến tay Hoài ở cổng. Ai đã nhìn thấy?"
            }
          ],
          "keoVaoTrong": [
            {
              "speaker": "ha-vy",
              "expression": "day-kinh",
              "text": "Người đưa phong bì là ai thì chưa có căn cứ nào. Chỗ ấy để trống."
            }
          ]
        },
        {
          "id": "o3",
          "gio": "7:00",
          "cot": "bac-tu",
          "noi": "sảnh tòa B",
          "viec": "mở cửa sảnh tòa B",
          "nhan": [],
          "khoaSan": true,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o4",
          "gio": "trước 9:00",
          "cot": "hoai",
          "noi": "sảnh tòa B",
          "viec": "bỏ thư vào hộp, ký phiếu",
          "nhan": [
            "doc-thu-kien-nghi",
            "ev-phieu-gui-hoai"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ô này là lúc thư vào hộp. Thẻ nào cho thấy lá thư và người nộp ký phiếu?"
            }
          ],
          "keoVaoTrong": null
        },
        {
          "id": "o5",
          "gio": "9:00",
          "cot": "bac-tu",
          "noi": "sảnh tòa B",
          "viec": "thấy người bên Công tác sinh viên xuống thu hộp",
          "nhan": [],
          "khoaSan": true,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        }
      ]
    }
  },
  "cacCauNoi": [
    {
      "id": "cau-hoai-nao",
      "the": [
        "ev-nam-hoai",
        "clue-bc24"
      ],
      "cau": "Hoài nào học Báo chí 2024, sáng thứ Hai ở tòa B?",
      "dich": {
        "kind": "hien-truong",
        "ghim": null,
        "chuoi": "c1-thieu-bang-lop"
      }
    },
    {
      "id": "cau-hoai-ra-luc-nao",
      "the": [
        "ev-hoai-bc24a",
        "clue-loi-thinh-7h"
      ],
      "cau": "Sáng 16/09 Hoài ra khỏi ký túc xá lúc nào?",
      "dich": {
        "kind": "hien-truong",
        "ghim": "ktx",
        "chuoi": null
      }
    }
  ]
} satisfies KichBanMvp;

/** Bảng dữ liệu = dòng của truyện (ở trên) + dữ liệu nền sinh lại lúc nạp (tools/noi-dung/nhieu-mvp.ts, hạt cố định). */
export const KICH_BAN_MUA_1 = { ...GOC, dieuHuongTuDo: true, hoiDap: HOI_DAP_MUA_1, duLieu: GOC.duLieu ? themNhieuMvp(GOC.duLieu) : GOC.duLieu } satisfies KichBanMvp;
export const KICH_BAN_MVP = KICH_BAN_MUA_1;
