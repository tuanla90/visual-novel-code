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
      "vai": "Năm nhất Du lịch, bạn cùng phòng ký túc xá 408 của người chơi, cháu chú Cường. Tuần đầu năm học mặc áo xanh tình nguyện đứng chỉ đường ở sảnh ký túc xá (các biểu cảm `ao-xanh…`: sơ mi xanh dài tay, mũ tai bèo đeo sau lưng; ngày thường mặc áo thể thao lam). Thích giúp người, nói trước nghĩ sau: buột miệng nghi Hoài trước mặt Ban Kiểm tra.",
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
          "nam",
          "nganh"
        ],
        "danhXung": "Thành viên CLB Thám Tử",
        "chuaQuen": "Bạn đeo kính",
        "nam": "Năm nhất",
        "nganh": "Toán ứng dụng",
        "cauNoi": "Cậu nhìn, nhưng cậu không quan sát.",
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
        "cauNoi": "Tới muộn thì hết bánh.",
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
          "nam",
          "nganh",
          "cau-noi",
          "lich"
        ],
        "danhXung": "Thành viên CLB, giữ chìa và đồ đạc",
        "chuaQuen": "Anh áo khoác đen",
        "nam": "Năm hai",
        "nganh": "Hành chính học",
        "cauNoi": "Em cần gì cứ bảo anh, nhưng có ghi sổ đấy nhé.",
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
      "vai": "Bảo vệ sảnh tòa B (mã giữ nguyên `bac-tu`). Bảy giờ sáng mới mở sảnh; chín giờ cô Lan xuống thu hộp kiến nghị như mọi ngày.",
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
        "thuongO": [
          {
            "thu": [
              1,
              2,
              3,
              4,
              5
            ],
            "tu": "08:00",
            "den": "17:00",
            "noi": "toa-hanh-chinh"
          }
        ],
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
        "thuongO": [
          {
            "thu": [
              1,
              2,
              3,
              4,
              5
            ],
            "tu": "08:00",
            "den": "17:00",
            "noi": "toa-hanh-chinh"
          }
        ],
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
      "vai": "Chủ trì buổi họp rà soát phòng CLB (16:00 thứ Hai 30/09). Nói chuyện bằng căn cứ. Trước mặt luôn có một cốc trà nóng (\"cậu trà nóng\" của bà bán trà đá, tuyến bí mật của mùa; không giải thích).",
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
        "cauNoi": "Thầy chỉ hỏi một câu: phiếu gửi do ai ký?",
        "loi": "Chủ trì buổi họp rà soát phòng CLB. Nghe hai bên rồi mới hỏi, và chỉ hỏi đúng chỗ cần căn cứ."
      }
    },
    {
      "id": "hoai",
      "ten": "Hoài",
      "hoTen": "Lê Thu Hoài",
      "trongCau": "Hoài",
      "vai": "Năm nhất Báo chí, lớp BC24A. Bạn nữ kéo vali hôm nhập học. Sáng thứ Hai 16/09 ra cổng ký túc xá lúc 6:44, được một người không quen nhờ bỏ phong bì nâu vào hộp ở tòa B, ký tên mình vào phiếu gửi. Chỉ kể ở kết thật.",
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
        "cauNoi": "Em không nghĩ là thư như thế.",
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
      "ten": "Anh sơ mi trắng",
      "hoTen": null,
      "trongCau": "anh sơ mi trắng",
      "vai": "Chủ tịch Hội sinh viên (mã khanh; họ tên không bao giờ hiện, xem \"Tên cấm\" ở quy-uoc.md). Ở Vụ 1 chỉ xuất hiện một câu ở Ngày hội, đeo thẻ ban tổ chức, không đeo balo; chưa lộ tên. Người đưa phong bì cho Hoài là câu hỏi lớn của mùa, Vụ 1 không trả lời.",
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
        "ten": "Hộp kiến nghị",
        "kieu": "theo-truyen",
        "chuoi": "n1-mo",
        "batDauO": "phong-ktx",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 2,
        "ten": "Phòng Đào tạo",
        "kieu": "theo-truyen",
        "chuoi": "n2-mo",
        "batDauO": "phong-ktx",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 3,
        "ten": "Phòng Công tác sinh viên",
        "kieu": "theo-truyen",
        "chuoi": "n3-mo",
        "batDauO": "phong-ktx",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 4,
        "ten": "Cổng ký túc xá",
        "kieu": "theo-truyen",
        "chuoi": "n4-mo",
        "batDauO": "phong-ktx",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 5,
        "ten": "Tối thứ Bảy ở phòng CLB",
        "kieu": "theo-truyen",
        "chuoi": "n5-toi",
        "batDauO": "phong-clb-dem-banh-mi",
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
          "text": "Xe vào nội thành lúc đầu giờ chiều. Tiếng còi xe máy dồn lên mỗi lúc một dày."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên đùi là tờ giấy báo nhập học gấp làm tư, mép đã sờn: Ngành Kế toán. Ký túc xá, phòng 408."
        },
        {
          "type": "create-character",
          "truong": "ten",
          "asker": {
            "speaker": "player",
            "text": "(Dòng đầu tờ giấy báo là họ tên mình.)"
          },
          "xucXac": "(Thôi, để xúc xắc chọn hộ một cái tên.)",
          "luaChon": []
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
          "type": "line",
          "speaker": "player",
          "text": "(Toàn người lạ. Hỏi ai bây giờ?)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Giữa sảnh, một cậu áo xanh tình nguyện đứng chỉ đường, tay chỉ, miệng nói không ngừng."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "player"
        },
        {
          "type": "note",
          "text": "Khung có [RA player] ngay trước đoạn này: người chơi đứng ngoài nhìn, trên dàn chỉ có bạn nữ kéo vali và cậu áo xanh. Không bật thẻ giới thiệu ai. Hết đoạn này bạn nữ rời hình ([RA hoai])."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Bạn ơi… cho mình hỏi, phòng làm thẻ ký túc xá ở đâu ạ?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-chi-tay",
          "text": "Phòng làm thẻ gần lắm! Vali to thế để tớ kéo hộ ra tới góc kia, từ đấy bạn cứ đi thẳng, thấy mái tôn là tới!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cậu kéo vali ra tới góc sảnh, trả lại tay cầm, vẫy chào. Bạn nữ đi thẳng. Phía trước là mái tôn của nhà xe."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "hoai"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Cậu ấy rành đường thế. Hỏi luôn nhỉ?)"
        },
        {
          "type": "task",
          "text": "Hỏi đường lên phòng 408 (tạm)"
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
            },
            {
              "sprite": "obj-thong-bao-thang-may",
              "x": 10.5,
              "y": 38.5,
              "rong": 3.6,
              "chuoi": "md-00-thang-may",
              "sau": [],
              "nhan": "Tờ giấy trên cửa thang máy"
            }
          ]
        }
      ]
    },
    {
      "id": "md-00-thang-may",
      "title": "Chi tiết ẩn: tờ giấy trên cửa thang máy",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Cửa thang máy dán tờ giấy tạm dừng. Thôi, đi thang bộ vậy.) (tạm)"
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
          "text": "Ờ… bạn ơi, cho mình hỏi thang bộ lên tầng bốn ở đâu thế?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Khuất sau hành lang kia kìa, lần đầu ai cũng tìm không ra. Cậu lên phòng mấy?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Phòng 408."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-surprised",
          "text": "408? Phòng tớ đây! Thế là mình cùng phòng rồi!"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cùng phòng á? Cậu cũng năm nhất à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Năm nhất như cậu! Tớ là Tùng, Du lịch. Cậu học ngành gì?"
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
          "type": "branch",
          "id": "go-with-md-01-phong-408",
          "asker": {
            "speaker": "player",
            "text": "Lên phòng 408"
          },
          "choices": [
            {
              "id": "go-md-01-phong-408",
              "text": "Lên phòng 408",
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
          "text": "Đi một vòng trường với Tùng (tạm)"
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
      "title": "Cảnh 1: cổng ký túc xá, chú Cường",
      "canh": "cong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Nền cổng ký túc xá, một chú bảo vệ ngồi ghi sổ trong chốt."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Chú ơi, bạn cùng phòng cháu đây!"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Chú Cường là chú tớ đấy, trực cổng này."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Nó lên sớm, chú xin cho vào đội đón tân sinh viên, đỡ ngồi phòng ôm điện thoại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-gai-dau",
          "text": "Thế mà cháu chỉ đường cả sáng đấy chú!"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Ừ. Chỉ đúng được mấy người thì chú không biết."
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
          "text": "Thứ Hai 09/09 tới thứ Sáu 13/09 · Tuần sinh hoạt công dân"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cả tuần ngồi hội trường nghe nội quy. Thứ Tư, hàng ghế cuối, cuốn sổ của Tùng mới chép được đúng dòng tiêu đề."
        },
        {
          "type": "image",
          "imageId": "chibi-ngu-gat"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Buổi cuối, mỗi người được phát một tấm thẻ lịch in theo khoa, dưới cùng có dòng Họ tên, Lớp để tự viết."
        },
        {
          "type": "image",
          "imageId": "doc-the-lich-cua-toi"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Viết tên vào luôn nhỉ, kẻo lẫn với thẻ của ai?)"
        },
        {
          "type": "task",
          "text": "Đi xem Ngày hội CLB (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-md-09-ngay-hoi",
          "asker": {
            "speaker": "player",
            "text": "Đi xem Ngày hội CLB với Tùng"
          },
          "choices": [
            {
              "id": "go-md-09-ngay-hoi",
              "text": "Đi xem Ngày hội CLB với Tùng",
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
      "title": "Cảnh 2: Ngày hội CLB, bàn CLB Thám Tử vắng tanh, anh sơ mi trắng dừng trước bàn",
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
          "type": "note",
          "text": "Nền sân nhà văn hóa đông nghịt, dãy bàn CLB nào cũng loa, bóng bay. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Đi xem cho biết thôi nhé. Năm nhất phải lo học, tớ không đăng ký CLB nào đâu."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "tung"
        },
        {
          "type": "note",
          "text": "Khung có [RA tung] ngay trước đoạn này: Tùng đi xem các bàn. Mười phút sau Tùng quay lại (chuỗi md-09-ban-tham-tu) với dáng om-to-roi: ôm xấp tờ rơi, ngậm bánh rán, quạt giấy CLB Guitar kẹp nách (user 08/10: dùng chân dung thay ảnh nhóm). Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mười phút sau. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Bàn cuối dãy kia sao vắng thế nhỉ?)"
        },
        {
          "type": "image",
          "imageId": "cg-ban-clb-vang"
        },
        {
          "type": "note",
          "text": "Ảnh cg-ban-clb-vang ngay trước đoạn này: bàn CLB Thám Tử vắng tanh, một chị ngồi một mình; một anh sơ mi trắng đeo thẻ ban tổ chức (không balo) dừng trước bàn. Anh chưa lộ tên. Hết câu, anh rời hình ([RA khanh]); ảnh cg-phieu-trang theo sau: chị giữ bàn lật xấp phiếu đăng ký, tờ nào cũng trắng."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "ban-to-chuc",
          "text": "Minh Anh vẫn giữ bàn một mình à? Cố lên nhé. Mà nhớ là dưới năm người thì Hội phải đưa ra xét giải thể, anh cũng không giữ được đâu."
        },
        {
          "type": "stage",
          "action": "ra",
          "nhanVat": "khanh"
        },
        {
          "type": "image",
          "imageId": "cg-phieu-trang"
        },
        {
          "type": "goto",
          "to": "md-09-ban-tham-tu"
        }
      ]
    },
    {
      "id": "md-09-ban-tham-tu",
      "title": "Cảnh 2: Tùng đăng ký; chị giữ bàn là Minh Anh, mời tới Trung thu",
      "canh": "nha-van-hoa",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "om-to-roi",
          "text": "Giải thể á? Cả sân có mỗi một bàn vắng thế mà cũng bị dồn…"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "om-to-roi",
          "text": "Hay mình vào đi? Thiếu người thì mình vào cho đủ, có mất gì đâu!"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu vừa bảo không đăng ký CLB nào mà?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thì đây là đi giúp, không phải đăng ký!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng đã đứng trước bàn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chị ơi, em đăng ký ạ!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chị giữ bàn ngẩng lên, hơi sững một giây, rồi kéo vội hai chiếc ghế ra."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Thật à? Ngồi đi, hai em ngồi đi! Hôm nay em là người đầu tiên đấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ghi tên, ngành với mã sinh viên vào phiếu này nhé."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chị đưa ra hai tờ phiếu. Tùng điền một mạch. Tờ của {{nv.nguoi-choi}} vẫn để trắng."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị là Minh Anh, chủ nhiệm CLB. Em vừa nghe rồi đấy, còn thiếu đúng một người. Em có muốn tham gia không? Tối thứ Ba tuần sau CLB sinh hoạt lần đầu ở sân ký túc xá, em đến xem trước rồi quyết cũng được."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Còn thiếu một… tức là tính cả Tùng thì CLB đang có bốn ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bốn. Chị, Duy năm hai, Hà Vy năm nhất, với Tùng từ phút này."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tối thứ Ba là Trung thu đấy! Có bánh không chị?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Có. Bảy giờ. Tới muộn thì hết bánh."
        },
        {
          "type": "biet",
          "nhanVat": "minh-anh",
          "truong": [
            "cau-noi"
          ]
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
          "text": "Thứ Ba, 17/09 · Trung thu ở sân ký túc xá"
        },
        {
          "type": "note",
          "text": "Nền bg-mvp-san-ktx-trung-thu: đèn ông sao dọc hàng rào; trên bàn nhựa một đĩa bốn chiếc bánh nướng, ấm trà. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Hai em tới đúng giờ."
        },
        {
          "type": "image",
          "imageId": "cg-nam-ghe"
        },
        {
          "type": "note",
          "text": "Ảnh cg-nam-ghe ngay trước đoạn này: quanh bàn nhựa có năm cái ghế, một cái còn trống. Lời không nhắc lại."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Cảm ơn mọi người đã tới. Tối thứ Ba hằng tuần mình gặp nhau ở phòng CLB. Hôm nay thì ăn bánh trước đã."
        },
        {
          "type": "biet",
          "nhanVat": "minh-anh",
          "truong": [
            "lich"
          ]
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mọi người tới cả rồi đấy. Hai em đi chào một vòng đi, lát chị gọi chia bánh."
        },
        {
          "type": "task",
          "text": "Đi chào mọi người trong CLB (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-lam-quen",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 30,
              "y": 100,
              "rong": 15,
              "chuoi": "md-10-gap-duy",
              "sau": [],
              "nhan": "Anh áo khoác đen",
              "dau": "chinh"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 80,
              "y": 100,
              "rong": 14,
              "chuoi": "md-10-gap-ha-vy",
              "sau": [],
              "nhan": "Bạn đeo kính",
              "dau": "chinh"
            }
          ]
        },
        {
          "type": "goto",
          "to": "md-10-vy-soi"
        }
      ]
    },
    {
      "id": "md-10-gap-duy",
      "title": "Trung thu: chào anh áo khoác đen dán băng dính lên chìa khóa",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Chân dung Duy dáng dan-chia-khoa: một anh áo khoác đen dán băng dính có ghi chữ lên chiếc chìa khóa (user 08/10: Duy không đeo kính; chân dung thay ảnh nhóm). Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "dan-chia-khoa",
          "text": "Anh là Duy, năm hai Hành chính học. Chìa phòng với đồ đạc CLB anh giữ, em cần gì cứ bảo anh, nhưng có ghi sổ đấy nhé."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ghi cả… cái bánh ạ?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Bánh thì không. Bốn cái, mua bằng quỹ CLB, chiều nay anh ghi rồi."
        }
      ]
    },
    {
      "id": "md-10-gap-ha-vy",
      "title": "Trung thu: chào bạn đeo kính ghi sổ nhỏ",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "image",
          "imageId": "cg-so-ha-vy-gio"
        },
        {
          "type": "note",
          "text": "Ảnh cg-so-ha-vy-gio ngay trước đoạn này: cận tay bạn nữ đeo kính ghi sổ nhỏ, đầu mỗi dòng là giờ (19:00, 19:05, 19:10). Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hà Vy, Toán ứng dụng. Cậu là bạn cùng phòng của Tùng à?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ừ. Sao cậu biết?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Tùng kể trong nhóm chat. Ba lần."
        }
      ]
    },
    {
      "id": "md-10-vy-soi",
      "title": "Trung thu: Tùng đố, Hà Vy soi Tùng làm mẫu",
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
          "text": "Tùng chạy lại chỗ Hà Vy, tay vẫn cầm tờ bản đồ gấp (chân dung tung happy)."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Vy, cậu nhìn tớ thì đoán được gì không? Trúng thì tớ nhường miếng bánh to nhất."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Đứng yên một chút để tớ nhìn đã."
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
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ, đúng thật! Cả tuần nhập học tớ đứng ở sảnh ký túc xá. Thôi, miếng to nhất là của cậu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mình gặp Tùng đúng hôm ấy. Sao Vy chỉ nhìn qua mà cũng ra được nhỉ?)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "19:00. Minh Anh đếm đĩa bánh: bốn. Cả nhóm ngồi xuống, Duy rót trà."
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
          "text": "Áo thể thao lam, không in tên khoa, cũng chẳng in tên đội nào. Cái áo này không nói được gì."
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
          "text": "Miếng băng trên sống mũi. Cậu va vào đâu đấy à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hôm khuân đồ cho tân sinh viên, tớ đập mặt vào cổng sắt ký túc xá!"
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
          "text": "Xuống sân ký túc xá thôi mà cậu vẫn cầm tờ bản đồ trường. Bản đồ gấp đến hằn nếp, mép sờn cả, tức là ngày nào cũng mở ra gấp vào."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Cậu vừa kể khuân đồ cho tân sinh viên. Thêm tờ bản đồ này nữa, tớ đoán hôm nhập học cậu ở đội tình nguyện, đứng chỉ đường cho tân sinh viên, đúng không?"
        }
      ]
    },
    {
      "id": "md-10-chia-banh",
      "title": "Trung thu 19:15: chia bánh còn ba cái; người chơi tự soi quanh bàn",
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
          "type": "note",
          "text": "Nền bg-mvp-san-ktx-trung-thu-ba-banh: cùng sân, đĩa còn ba chiếc bánh."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "19:15. Minh Anh cầm dao chia bánh."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Ba cái. Lúc bảy giờ chị đếm còn bốn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hay mèo tha? Ký túc xá mình có con mèo vàng to lắm!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mèo nhảy lên bàn thì đĩa phải xô lệch, chén trà đổ. Bàn vẫn ngay ngắn."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy đẩy kính, quay sang {{nv.nguoi-choi}}."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Sherlock Holmes nói: \"Cậu nhìn, nhưng cậu không quan sát.\" Sự khác biệt rất rõ ràng đấy."
        },
        {
          "type": "biet",
          "nhanVat": "ha-vy",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Ban nãy tớ nhìn Tùng từ cái áo tới tờ bản đồ. Giờ cậu thử nhìn quanh bàn xem, chỗ nào lạ thì soi kỹ."
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
          "type": "explore",
          "id": "kp-banh-trung-thu",
          "diem": [
            {
              "sprite": "vung:dia-banh",
              "x": 11,
              "y": 69,
              "rong": 14,
              "chuoi": "md-10-dia-banh",
              "sau": [],
              "nhan": "Đĩa bánh trên bàn",
              "dau": "chinh"
            },
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
          "type": "goto",
          "to": "md-10-hoi-banh"
        }
      ]
    },
    {
      "id": "md-10-dia-banh",
      "title": "Soi: đĩa còn ba bánh",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đĩa còn ba chiếc. Chỗ trống trên đĩa còn dính vụn.)"
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
      "id": "md-10-hoi-banh",
      "title": "Đoán ai lấy bánh từ những gì vừa soi",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "branch",
          "id": "r-ai-lay-banh",
          "asker": {
            "speaker": "ha-vy",
            "text": "Theo cậu, ai lấy chiếc bánh?"
          },
          "choices": [
            {
              "id": "tre-con",
              "text": "Một đứa trẻ.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-10-doan-dung"
                }
              ]
            },
            {
              "id": "tung",
              "text": "Tùng.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-10-doan-tung"
                }
              ]
            },
            {
              "id": "mua-lan",
              "text": "Một người trong đội múa lân.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-10-doan-mua-lan"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-10-doan-tung",
      "title": "Đoán Tùng: chưa có căn cứ",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Tùng lấy chăng? Lúc ấy cậu ấy đứng gần bàn nhất."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ơ kìa, tớ rót trà còn chưa kịp uống ngụm nào!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đứng gần bàn thì chưa đủ đâu. Vệt vụn kia dẫn về phía nào?"
        },
        {
          "type": "goto",
          "to": "md-10-hoi-banh"
        }
      ]
    },
    {
      "id": "md-10-doan-mua-lan",
      "title": "Đoán đội múa lân: vệt vụn không chạy về phía ấy",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Hay ai bên đội múa lân sang lấy?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Họ ngồi quanh cái trống từ nãy, chưa ai đứng dậy. Mà vệt vụn đâu có chạy về phía ấy."
        },
        {
          "type": "goto",
          "to": "md-10-hoi-banh"
        }
      ]
    },
    {
      "id": "md-10-doan-dung",
      "title": "Người chơi tìm ra bé Na cạnh đèn cá chép; dòng thời gian tập dượt; ký phiếu",
      "canh": "san-ktx-trung-thu-ba-banh",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Vụn bánh rơi thành vệt từ chân bàn ra tới đèn cá chép, cạnh đèn lại có đôi dép trẻ con. Tớ nghĩ một bé nào đó cầm bánh chạy ra đấy, rồi bỏ dép chạy chân đất."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Dép còn nằm đây thì bé chưa đi xa đâu."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Từ sau cái trống, một bé gái chân đất chạy ra, ngồi xổm cạnh chiếc đèn cá chép."
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
          "text": "Ảnh cg-be-na-den-ca-chep ngay trước đoạn này: bé Na ngồi xổm, hai tay ôm nửa chiếc bánh, má dính vụn, đôi dép vàng bên cạnh. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Na! Con gái chú Cường tớ đấy!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lúc bảy giờ đĩa còn đủ bốn, bảy giờ mười lăm còn ba. Bé cầm bánh vào lúc nào? Cậu xếp lại xem từng việc xảy ra lúc nào."
        },
        {
          "type": "dong-thoi-gian",
          "id": "dtg-banh"
        },
        {
          "type": "note",
          "text": "Ngay trước đoạn này là màn dòng thời gian tập dượt ba ô (dtg-banh): 19:00 đĩa đủ bốn, ? bé Na cầm một chiếc, 19:15 chia còn ba; kéo lời kể vào ô."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bé Na lí nhí xin lỗi. Chú Cường từ chốt cổng chạy sang, xoa đầu con."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Chú! Na lớn thế rồi à?"
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
          "speaker": "duy",
          "expression": "neutral",
          "text": "Anh ghi sổ: bốn cái, một cái tặng bé Na."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy nhìn tờ phiếu còn trắng trong tay {{nv.nguoi-choi}}."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu có tố chất thám tử đấy. Có muốn tham gia không?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tham gia đi cho vui! Cậu định trơ mắt nhìn CLB giải thể à?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Vệt vụn với đôi dép nằm ngay giữa sân, chịu nhìn kỹ là thấy. Hay mình thử thật nhỉ?)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thôi được… cho tớ mượn cái bút."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Minh Anh đọc tờ phiếu một lượt, kẹp vào sổ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Năm. Sáng mai chị nộp danh sách cho Hội."
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
      "id": "md-11-phong-clb",
      "title": "Cảnh 4: thứ Hai 23/09, cô Lan mang thư kiến nghị và phiếu gửi tới phòng CLB",
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
          "text": "Thứ Hai, 23/09 · Phòng CLB"
        },
        {
          "type": "note",
          "text": "Nền phòng CLB: tủ sắt cũ ở góc, bảng điều tra còn trống. Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "16:30. Có tiếng gõ cửa. Một cô mặc áo dài xanh đứng ở cửa, tay cầm tờ giấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em chào cô Lan ạ. Cô bên Công tác sinh viên tìm CLB có việc gì ạ?"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Phòng nhận được một thư kiến nghị thu hồi phòng của CLB các em."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Thu hồi phòng ạ? Thư nói lý do gì cô?"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Phòng thu được thư này sáng thứ Hai tuần trước. Thư viết CLB \"không còn giải quyết được việc gì\". Thứ Hai tuần sau, 30/09, bốn giờ chiều, thầy Quang chủ trì họp rà soát. CLB chuẩn bị ý kiến."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Kèm theo thư là một tờ phiếu gửi. Dòng người nộp ký một chữ: Hoài."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hoài? Thế là xong, tìm Hoài là được!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Cả trường có bao nhiêu Hoài thì mình chưa biết đâu, Tùng. Ngồi xuống đã, chị chia việc. Sáng mai Vy với em ra tòa B, chiều chị lên Phòng Đào tạo xin phiếu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Xin phiếu gì ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Phiếu xin quyền xem bảng sinh viên. Bảng ấy không phải muốn xem là được: phải có lý do, có người bảo đảm, và chỉ xem đúng phần cần cho vụ này."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thư không có tên người viết. Chỉ tờ phiếu gửi là có chữ ký."
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
          "type": "task",
          "text": "Sáng mai ra sảnh tòa B với Hà Vy (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Sáng mai mình ra tòa B xem cái hộp kiến nghị nhé. (tạm)"
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
      "id": "n1-mo",
      "title": "Sáng thứ Ba 24/09: ra sảnh tòa B",
      "canh": "phong-ktx",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 24/09/2024"
        },
        {
          "type": "task",
          "text": "Ra sảnh tòa B xem cái hộp kiến nghị (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Sáng nay mình ra tòa B hỏi bác bảo vệ về cái hộp nhé. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-bd-n1",
          "kieu": "ban-do",
          "gio": "07:45",
          "diem": [
            {
              "sprite": "ghim:toa-b",
              "x": 48,
              "y": 29,
              "rong": 5,
              "chuoi": "n1-toa-b",
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
      "id": "n1-toa-b",
      "title": "Sảnh tòa B, 7:50: bác Thịnh, cái hộp kiến nghị",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "7:50 · Sảnh tòa B"
        },
        {
          "type": "note",
          "text": "Nền sảnh tòa B; bác bảo vệ mở cửa sổ phòng trực, thẻ tên ghi Thịnh (chân dung bác đứng ở điểm bấm). Hộp kiến nghị là ảnh vật, hiện sau khi nói chuyện với bác."
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
              "chuoi": "n1-bac-thinh",
              "sau": [],
              "nhan": "Bác bảo vệ ở phòng trực",
              "dau": "chinh"
            },
            {
              "sprite": "obj-hop-kien-nghi",
              "x": 35.2,
              "y": 45.5,
              "rong": 3.4,
              "chuoi": "n1-khe-hop",
              "sau": [
                "n1-bac-thinh"
              ],
              "nhan": "Khe hộp kiến nghị",
              "dau": "chinh"
            },
            {
              "sprite": "vung:quat",
              "x": 20,
              "y": 12,
              "rong": 7,
              "chuoi": "n1-toa-b-quat",
              "sau": [],
              "nhan": "Cái quạt treo tường"
            }
          ]
        },
        {
          "type": "task",
          "text": "Chiều về phòng CLB kể cho chị Minh Anh (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Năm giờ chiều mình mang tấm thẻ về phòng CLB nhé. (tạm)"
        },
        {
          "type": "branch",
          "id": "het-ngay-n1-clb",
          "asker": {
            "speaker": "player",
            "text": "Chiều về phòng CLB"
          },
          "choices": [
            {
              "id": "het-ngay",
              "text": "Chiều về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n1-clb"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n1-bac-thinh",
      "title": "Bác Thịnh: bảy giờ mở sảnh, chín giờ cô Lan thu hộp",
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
          "text": "Hộp ấy à? Sảnh này bảy giờ sáng bác mới mở, chín giờ cô Lan xuống thu như mọi ngày. Thư nào vào hộp sáng thứ Hai thì cũng vào sau bảy giờ thôi."
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
              "id": "clue-loi-bac-thinh"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bảy giờ mở sảnh, chín giờ cô Lan thu. Vậy lá thư vào hộp trong hai tiếng ấy."
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
      "id": "n1-khe-hop",
      "title": "Quan sát khe hộp: gỡ mẩu giấy mắc ở mép",
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
          "text": "Một tấm thẻ lịch học, dòng dưới cùng bị xé mất nửa. Còn đọc được: Khoa Báo chí, khóa 2024."
        },
        {
          "type": "save-evidence",
          "evidenceId": "ev-the-lich-bc24"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Khoa Báo chí, khóa 2024. Dòng tên bị xé mất rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mép rách xơ thế này là bị giật mạnh. Người bỏ thư vội đến mức không buồn gỡ ra."
        }
      ]
    },
    {
      "id": "n1-toa-b-quat",
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
      "id": "n1-clb",
      "title": "17:00 phòng CLB: Minh Anh ghép hai mảnh trên bảng điều tra",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng CLB, 17:00. Minh Anh cầm tấm thẻ lịch, đi ra bảng điều tra."
        },
        {
          "type": "ghep-mau",
          "nguoi": "minh-anh",
          "the": [
            "ev-phieu-gui-hoai",
            "ev-the-lich-bc24"
          ],
          "giayNho": "Hoài nào học Báo chí, khóa 2024?",
          "lamMau": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Một bên là phiếu gửi, người nộp ký \"Hoài\". Một bên là tấm thẻ lịch khoa Báo chí, khóa 2024, mắc ở khe hộp. Chị ghim hai tờ cạnh nhau đã."
            },
            {
              "speaker": "minh-anh",
              "expression": "serious",
              "text": "Chưa chắc hai tờ nói về cùng một người. Nhưng nếu đúng là một người thì sao? Chị nối một sợi chỉ để khỏi quên hai tờ này có thể dính nhau."
            },
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Nối rồi thì ghi luôn câu mình cần trả lời, mai lên Phòng Đào tạo là hỏi đúng câu ấy."
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Phải xem bảng sinh viên mới biết ạ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Phiếu chị nộp rồi, sáng mai cô Hạnh ký. Chín giờ mình gặp nhau ở Phòng Đào tạo."
        },
        {
          "type": "task",
          "text": "Chín giờ sáng mai lên Phòng Đào tạo (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "n2-mo",
      "title": "Sáng thứ Tư 25/09: lên Phòng Đào tạo",
      "canh": "phong-ktx",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Tư, 25/09/2024"
        },
        {
          "type": "task",
          "text": "Lên Phòng Đào tạo nhận phiếu xin quyền xem bảng sinh viên (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chín giờ gặp nhau ở Phòng Đào tạo nhé. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-bd-n2",
          "kieu": "ban-do",
          "gio": "08:55",
          "diem": [
            {
              "sprite": "ghim:toa-hanh-chinh",
              "x": 21,
              "y": 54,
              "rong": 5,
              "chuoi": "n2-dao-tao",
              "sau": [],
              "nhan": "Phòng Đào tạo",
              "dau": "chinh",
              "co": [
                "co-hanh"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n2-dao-tao",
      "title": "Phòng Đào tạo, 9:00: Duy ôm laptop CLB đi sau cùng",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "9:00 · Phòng Đào tạo"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "9:00. Duy ôm laptop CLB đi sau cùng."
        },
        {
          "type": "explore",
          "id": "kp-dao-tao",
          "diem": [
            {
              "sprite": "nv:co-hanh",
              "x": 40,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-co-hanh",
              "sau": [],
              "nhan": "Cô ở quầy",
              "dau": "chinh"
            },
            {
              "sprite": "vung:lich-tuong",
              "x": 69,
              "y": 25,
              "rong": 5,
              "chuoi": "n2-dao-tao-an",
              "sau": [],
              "nhan": "Tờ lịch treo tường"
            }
          ]
        },
        {
          "type": "task",
          "text": "Mai sang Phòng Công tác sinh viên hỏi cô Lan (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mai mình sang Công tác sinh viên gặp cô Lan nhé. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        },
        {
          "type": "branch",
          "id": "het-ngay-ngay-ke",
          "asker": {
            "speaker": "player",
            "text": "Về ký túc xá nghỉ"
          },
          "choices": [
            {
              "id": "het-ngay",
              "text": "Về ký túc xá nghỉ",
              "khi": null,
              "hauQua": []
            }
          ]
        }
      ]
    },
    {
      "id": "n2-co-hanh",
      "title": "Cô Hạnh ký phiếu; màn tra bảng sinh viên hai bước",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em chào cô Hạnh ạ. Bọn em lên nhận phiếu xin quyền xem bảng sinh viên ạ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô Hạnh đọc phiếu rất lâu, rồi mới cầm bút."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Cô chỉ cấp cho CLB xem tên, ngành, khóa và lớp, để tìm hiểu vụ này thôi nhé. Có vấn đề gì thì Minh Anh phải chịu trách nhiệm đấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Vâng, em ký bảo đảm ạ."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Lâu lắm rồi mới có CLB lên xin phiếu đàng hoàng thế này."
        },
        {
          "type": "biet",
          "nhanVat": "co-hanh",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-sv-hoai"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bốn bạn tên Hoài. Bốn ngành khác nhau."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Bốn á? Tớ tưởng tên Hoài hiếm lắm."
        },
        {
          "type": "challenge",
          "challengeId": "c-sv-hoai-bc24"
        },
        {
          "type": "biet",
          "nhanVat": "hoai",
          "truong": [
            "ho-ten",
            "danh-xung",
            "nam",
            "nganh"
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ra một dòng. Lê Thu Hoài, mã SV240317, lớp BC24A."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Một dòng! Tìm ra Hoài rồi!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Tên khớp, khoa khớp, khóa khớp. Nhưng mấy thứ ấy mới cho mình biết đi tìm ai, chưa nói ai bỏ thư. Mai mình sang Công tác sinh viên hỏi cô Lan."
        }
      ]
    },
    {
      "id": "n2-dao-tao-an",
      "title": "Chi tiết ẩn: tờ lịch treo tường",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Tờ lịch treo tường khoanh đỏ kín ngày thi. Học kỳ mới bắt đầu mà đã thế này rồi.) (tạm)"
        }
      ]
    },
    {
      "id": "n3-mo",
      "title": "Sáng thứ Năm 26/09: sang Phòng Công tác sinh viên",
      "canh": "phong-ktx",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Năm, 26/09/2024"
        },
        {
          "type": "task",
          "text": "Sang Phòng Công tác sinh viên hỏi cô Lan về sổ thu hộp (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hôm nay mình sang Công tác sinh viên hỏi cô Lan nhé. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-bd-n3",
          "kieu": "ban-do",
          "gio": "09:00",
          "diem": [
            {
              "sprite": "ghim:toa-hanh-chinh",
              "x": 21,
              "y": 54,
              "rong": 5,
              "chuoi": "n3-ctsv",
              "sau": [],
              "nhan": "Phòng Công tác sinh viên",
              "dau": "chinh",
              "co": [
                "co-lan"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n3-ctsv",
      "title": "Phòng Công tác sinh viên: người ngồi sẵn là Quân, Ban Kiểm tra",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Phòng Công tác sinh viên"
        },
        {
          "type": "note",
          "text": "Một người ngồi sẵn ở bàn, sơ mi cài kín cổ, cuốn sổ mở trước mặt (chân dung Quân). Lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi là Quân, Ban Kiểm tra của Hội sinh viên. Tôi được cử xuống đây để xem các bạn có dùng dữ liệu đúng mục đích không. Lịch sử tra cứu Hội có lưu lại đấy nhé."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Phiếu của CLB đây, cô Hạnh ký hôm qua."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân đọc phiếu, chép số phiếu vào sổ của mình."
        },
        {
          "type": "task",
          "text": "Hỏi cô Lan về sổ thu hộp sáng thứ Hai 16/09 (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-ctsv",
          "diem": [
            {
              "sprite": "nv:co-lan",
              "x": 30,
              "y": 100,
              "rong": 15,
              "chuoi": "n3-co-lan",
              "sau": [],
              "nhan": "Cô Lan ở bàn",
              "dau": "chinh"
            },
            {
              "sprite": "vung:khay-giay",
              "x": 88.5,
              "y": 50,
              "rong": 10,
              "chuoi": "n3-ctsv-an",
              "sau": [],
              "nhan": "Khay giấy trên quầy"
            }
          ]
        },
        {
          "type": "task",
          "text": "Mai ra cổng ký túc xá hỏi chú Cường (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "worried",
          "text": "Mai ra cổng ký túc xá hỏi chú tớ thử xem. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        },
        {
          "type": "branch",
          "id": "het-ngay-ngay-ke",
          "asker": {
            "speaker": "player",
            "text": "Về ký túc xá nghỉ"
          },
          "choices": [
            {
              "id": "het-ngay",
              "text": "Về ký túc xá nghỉ",
              "khi": null,
              "hauQua": []
            }
          ]
        }
      ]
    },
    {
      "id": "n3-co-lan",
      "title": "Cô Lan: sổ thu hộp sáng 16/09; chữ ký chỉ là của người nộp; Tùng buột miệng, Quân ghi lại",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "quan"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Cô cho bọn em xem sổ thu hộp sáng thứ Hai 16/09 được không ạ?"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Sổ đây các em. Sáng thứ Hai 16/09, chín giờ, cô thu được ba phong bì. Hai cái kêu wifi với nhà ăn. Cái thứ ba là phong bì nâu này, phiếu gửi kẹp ngoài."
        },
        {
          "type": "show-document",
          "documentId": "doc-so-thu-hop"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cô ơi, phiếu gửi thì ai ký ạ? Người viết thư, hay người mang thư đến hộp?"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Thường thì người viết sẽ tự đi nộp. Nhưng vẫn có trường hợp nộp hộ. Chữ ký này chỉ là của người nộp thôi."
        },
        {
          "type": "biet",
          "nhanVat": "co-lan",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-co-lan"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Ơ, thì Hoài ký tên rõ ràng thế kia, Hoài viết chứ còn ai! Để tớ đi tìm Hoài hỏi luôn cho nhanh!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân viết một dòng vào sổ, không ngẩng lên."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Bạn Tùng, thành viên CLB Thám Tử. Tôi ghi lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Minh Anh liếc sang Tùng. Tùng ngồi im."
        }
      ]
    },
    {
      "id": "n3-ctsv-an",
      "title": "Chi tiết ẩn: khay giấy trên quầy",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Khay giấy trên quầy chồng toàn đơn xin ở ký túc xá. Đợt hai chắc đông lắm.) (tạm)"
        }
      ]
    },
    {
      "id": "n4-mo",
      "title": "Chiều thứ Sáu 27/09: ra cổng ký túc xá",
      "canh": "phong-ktx",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 27/09/2024"
        },
        {
          "type": "task",
          "text": "Ra cổng ký túc xá hỏi chú Cường (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chiều nay ra cổng hỏi chú tớ nhé. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-bd-n4",
          "kieu": "ban-do",
          "gio": "18:30",
          "diem": [
            {
              "sprite": "ghim:ktx",
              "x": 72,
              "y": 30,
              "rong": 5,
              "chuoi": "n4-cong",
              "sau": [],
              "nhan": "Cổng ký túc xá",
              "dau": "chinh",
              "co": [
                "chu-cuong"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n4-cong",
      "title": "Cổng ký túc xá: Tùng vẫy tay với người trong chốt bảo vệ",
      "canh": "cong-ktx",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cổng ký túc xá"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng đi trước, vẫy tay từ xa với người trong chốt bảo vệ. Là bố của bé Na."
        },
        {
          "type": "explore",
          "id": "kp-cong-ktx",
          "diem": [
            {
              "sprite": "nv:chu-cuong",
              "x": 70,
              "y": 100,
              "rong": 15,
              "chuoi": "n4-chu-cuong",
              "sau": [],
              "nhan": "Chú Cường ở chốt",
              "dau": "chinh"
            },
            {
              "sprite": "vung:day-co",
              "x": 50,
              "y": 18,
              "rong": 12,
              "chuoi": "n4-cong-an",
              "sau": [],
              "nhan": "Dây cờ trên cổng"
            }
          ]
        },
        {
          "type": "task",
          "text": "Tối mai cả đội họp ở phòng CLB, dựng lại sáng thứ Hai (tạm)"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Tối mai cả đội họp ở phòng CLB nhé. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        },
        {
          "type": "branch",
          "id": "het-ngay-ngay-ke",
          "asker": {
            "speaker": "player",
            "text": "Về phòng 408 nghỉ"
          },
          "choices": [
            {
              "id": "het-ngay",
              "text": "Về phòng 408 nghỉ",
              "khi": null,
              "hauQua": []
            }
          ]
        }
      ]
    },
    {
      "id": "n4-chu-cuong",
      "title": "Chú Cường: phong bì nâu trao tay ở cổng gần bảy giờ; sổ ra vào: 6:44",
      "canh": "cong-ktx",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chú Cường ơi! Bạn cháu muốn hỏi chuyện sáng thứ Hai tuần trước!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Sáng thứ Hai 16/09, chú có để ý ai cầm một cái phong bì nâu đi qua cổng không ạ?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Sáng nào chẳng có người đưa đồ cho nhau ở cổng, chú để ý làm gì. Nhưng cái phong bì nâu to thế thì chú nhớ. Lúc ấy chú sắp giao ca, tức là gần bảy giờ."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ai cầm phong bì ạ?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Một bạn nữ sáng nào cũng ra cổng sớm, chú nhớ mặt. Bạn ấy vừa quẹt thẻ ra cổng thì có cậu đeo balo đen gọi lại, đưa phong bì. Cậu kia quay lưng về phía chú suốt, rồi đi luôn. Còn bạn ấy cầm phong bì đi về phía tòa B."
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
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bạn ấy vừa quẹt thẻ, tức là sổ ra vào có ghi giờ. Cậu xem bạn Hoài ra cổng lúc mấy giờ?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chú ơi, chú cho bọn cháu xem nhờ sổ ra vào một tí được không ạ? (tạm)"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Xem ở máy trong chốt này. Đúng mã bạn ấy, đúng sáng hôm ấy thôi đấy. (tạm)"
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
          "type": "line",
          "speaker": "player",
          "text": "Hoài ra cổng lúc sáu giờ bốn mươi tư, đúng lúc chú sắp giao ca. Phong bì đến tay Hoài ở cổng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thế… người đưa phong bì là ai?"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Không ai trả lời."
        }
      ]
    },
    {
      "id": "n4-cong-an",
      "title": "Chi tiết ẩn: dây cờ đón tân sinh viên trên cổng",
      "canh": "cong-ktx",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Dây cờ đón tân sinh viên vẫn chưa ai gỡ, gió thổi phần phật.) (tạm)"
        }
      ]
    },
    {
      "id": "n5-toi",
      "title": "Tối thứ Bảy: cả đội quanh bảng điều tra",
      "canh": "phong-clb-dem-banh-mi",
      "mocSomNhat": 51,
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
          "text": "Thứ Bảy, 28/09/2024 · Tối · Phòng CLB"
        },
        {
          "type": "note",
          "text": "Nền bg-mvp-phong-clb-dem-banh-mi: phòng CLB buổi tối, túi bánh mì que, ấm trà, quạt cây, bảng đầy thẻ nối chỉ đỏ; cả đội hiện bằng chân dung (user 08/10). Lời không tả lại."
        },
        {
          "type": "task",
          "text": "Dựng lại sáng thứ Hai 16/09 trên bảng (tạm)"
        },
        {
          "type": "dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "note",
          "text": "Khi có dòng thời gian (B19-MÁY): ngay trước đoạn này là màn dòng thời gian 5 ô (dtg-vu1): 6:44 Hoài ra cổng, ? ai đưa phong bì, 7:00 mở sảnh, trước 9:00 Hoài bỏ thư, 9:00 cô Lan thu hộp; kéo bằng chứng vào ô."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Hay ghi tạm là \"một anh balo đen\"? Chú Cường nói thế mà!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Sherlock Holmes nói: \"Tôi không bao giờ đoán mò. Đó là một thói quen tồi tệ, làm hủy hoại tư duy logic.\" Cậu cứ để trống đi, mình sẽ điều tra sau."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Lại Sherlock à? Lần thứ bảy rồi đấy!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thứ Hai em trình dòng thời gian. Chị ngồi cạnh, có gì chị đỡ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Thầy Quang nói chuyện bằng căn cứ. Em nói sai là thầy không chấp nhận đâu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Em ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em là người tra ra bốn Hoài với giờ sáu bốn mươi tư. Em trình là hợp lý nhất."
        },
        {
          "type": "task",
          "text": "Thứ Hai trình dòng thời gian ở buổi họp rà soát (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "hop-00",
      "title": "Cảnh 10: mở họp, Quân trình kết luận và chiếu câu HOẶC; câu 1/4 sửa câu tra; trình dòng thời gian; câu 2/4 phiếu gửi do ai ký",
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
          "text": "Nền phòng họp tầng ba: thầy Quang ở đầu bàn, trước mặt một tờ giấy và một cốc trà nóng; Minh Anh ngồi cạnh người chơi, sổ CLB mở. Lời không tả lại."
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
          "speaker": "quan",
          "expression": "neutral",
          "text": "Kết luận của Ban Kiểm tra: người viết là Lê Thu Hoài, lớp BC24A. Chính bạn Tùng, thành viên CLB Thám Tử, cũng đã xác nhận điều này."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng cúi gằm."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "chi-man",
          "text": "Ban Kiểm tra được giao đối chiếu thông tin của CLB với dữ liệu gốc. Tôi đã tự tra lại."
        },
        {
          "type": "note",
          "text": "Màn chiếu ngay sau đoạn này: tên = 'Hoài' HOẶC ngành = 'Báo chí', 276 dòng (bản 6 ghi số tạm 41)."
        },
        {
          "type": "projector",
          "id": "hop-chieu-or",
          "source": {
            "kind": "sql",
            "sql": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' OR nganh = 'Báo chí';"
          },
          "run": true,
          "expectedRowCount": 276
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "CLB ra một dòng. Hội ra hai trăm bảy mươi sáu. Vì sao?"
        },
        {
          "type": "task",
          "text": "Sửa câu tra trên màn chiếu cho thầy thấy vì sao hai bên khác số (tạm)"
        },
        {
          "type": "image",
          "imageId": "cg-hop-doi-dau"
        },
        {
          "type": "fix-query",
          "challengeId": "c-sua-or-quan",
          "tinhVach": {
            "cau": {
              "so": 1,
              "tong": 4
            }
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Câu của anh Quân dùng HOẶC nên ra 276 dòng. Đổi thành VÀ thì còn một dòng. Số liệu đây ạ."
        },
        {
          "type": "effect",
          "effectId": "co-so-lieu-day"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân nhìn màn chiếu một lúc, rồi gạch một dòng trong sổ của mình."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi ghi nhận, số đúng là một. Kết luận của Ban Kiểm tra không đổi."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thưa thầy, em xin trình dòng thời gian ạ."
        },
        {
          "type": "note",
          "text": "Khi có dòng thời gian (B19-MÁY): ngay sau đoạn này người chơi đọc từng ô của dòng thời gian đã dựng: 6:44 Hoài ra cổng, ? có người đưa phong bì, 7:00 mở sảnh, trước 9:00 Hoài bỏ thư, 9:00 cô Lan thu hộp."
        },
        {
          "type": "task",
          "text": "Trả lời thầy Quang bằng căn cứ trong hồ sơ (tạm)"
        },
        {
          "type": "hien-dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "doi-chat",
          "id": "dc-phieu-gui",
          "asker": {
            "speaker": "thay-quang",
            "text": "Thầy nghe hai bên rồi. Thầy chỉ hỏi một câu: **phiếu gửi do ai ký?**"
          },
          "cauHoi": "Phiếu gửi do ai ký? Chọn căn cứ trong hồ sơ.",
          "bangChung": [
            {
              "id": "clue-loi-co-lan",
              "muc": "dung",
              "feedback": []
            },
            {
              "id": "ev-the-lich-bc24",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Tấm thẻ cho biết có một bạn Báo chí tới gần hộp. Thầy hỏi phiếu do ai ký."
                }
              ]
            },
            {
              "id": "ev-mot-hoai",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Mã ấy của Hoài, thầy biết rồi. Thầy hỏi người ký phiếu là ký với tư cách gì."
                }
              ]
            }
          ],
          "chuaDu": [],
          "khac": [
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Thầy hỏi người ký phiếu, ký với tư cách gì. (tạm)"
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "tinhVach": {
            "cau": {
              "so": 2,
              "tong": 4
            },
            "saiLanDau": [
              {
                "speaker": "narrator",
                "text": "Hà Vy đẩy kính, nói nhỏ."
              },
              {
                "speaker": "ha-vy",
                "expression": "day-kinh",
                "text": "Hôm ấy cô Lan nói gì về chữ ký nhỉ?"
              }
            ]
          }
        },
        {
          "type": "biet",
          "nhanVat": "thay-quang",
          "truong": [
            "cau-noi"
          ]
        },
        {
          "type": "goto",
          "to": "hop-01"
        }
      ]
    },
    {
      "id": "hop-01",
      "title": "Câu 3/4: Hoài có tự mang thư đi không",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Phiếu gửi do người nộp ký ạ. Cô Lan nói người viết thường tự đi nộp, nhưng vẫn có trường hợp nộp hộ. Chữ ký trên phiếu chỉ cho biết Hoài là người nộp."
        },
        {
          "type": "doi-chat",
          "id": "dc-tu-mang",
          "asker": {
            "speaker": "quan",
            "text": "Người nộp là Hoài. **Thư cũng do Hoài tự mang đi bỏ.** Không có người thứ hai nào trong hồ sơ."
          },
          "cauHoi": "Thư có phải Hoài tự mang từ phòng đi không? Chọn căn cứ trong hồ sơ.",
          "bangChung": [
            {
              "id": "clue-loi-chu-cuong",
              "muc": "dung",
              "feedback": []
            },
            {
              "id": "ev-ra-cong-644",
              "muc": "dung",
              "feedback": []
            },
            {
              "id": "doc-so-thu-hop",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Sổ ấy nói thư vào hộp lúc nào. Không nói ai mang thư tới."
                }
              ]
            },
            {
              "id": "ev-the-lich-bc24",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "smug",
                  "text": "Thẻ của một bạn Báo chí mắc ở hộp. Thế thì càng là Hoài tự mang đi."
                }
              ]
            }
          ],
          "chuaDu": [],
          "khac": [
            {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Cái ấy không nói ai mang thư tới hộp. (tạm)"
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "tinhVach": {
            "cau": {
              "so": 3,
              "tong": 4
            },
            "saiLanDau": [
              {
                "speaker": "narrator",
                "text": "Hà Vy đẩy kính, nói nhỏ."
              },
              {
                "speaker": "ha-vy",
                "expression": "day-kinh",
                "text": "Sáng hôm ấy, ở cổng ký túc xá, chú Cường thấy gì nhỉ? (tạm)"
              }
            ]
          }
        },
        {
          "type": "goto",
          "to": "hop-02"
        }
      ]
    },
    {
      "id": "hop-02",
      "title": "Câu 4/4: vậy ai đứng sau lá thư",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Sáu giờ bốn mươi tư Hoài ra cổng. Chú Cường thấy một cậu đeo balo đen gọi Hoài lại, đưa phong bì nâu, rồi Hoài đi về phía tòa B. Phong bì đến tay Hoài ở cổng, không phải Hoài mang từ phòng đi."
        },
        {
          "type": "question",
          "id": "q-ai-dung-sau",
          "asker": {
            "speaker": "thay-quang",
            "text": "Vậy ai đứng sau lá thư?"
          },
          "choices": [
            {
              "id": "hoai",
              "text": "Lê Thu Hoài",
              "correct": false,
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "stern",
                  "text": "Vừa nãy em nói Hoài chỉ là người nộp. Giờ em nói Hoài đứng sau?"
                }
              ]
            },
            {
              "id": "balo-den",
              "text": "Cậu đeo balo đen",
              "correct": false,
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Trường này bao nhiêu người đeo balo đen? Chú Cường có nhìn thấy mặt không?"
                }
              ]
            },
            {
              "id": "chua-du",
              "text": "Chưa đủ căn cứ",
              "correct": true,
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Chưa đủ căn cứ ạ. Bọn em chỉ biết có người đưa phong bì, chưa biết người ấy là ai."
                }
              ]
            }
          ],
          "truUyTin": false,
          "tinhVach": {
            "cau": {
              "so": 4,
              "tong": 4
            },
            "saiLanDau": [
              {
                "speaker": "narrator",
                "text": "Hà Vy đẩy kính, nói nhỏ."
              },
              {
                "speaker": "ha-vy",
                "expression": "day-kinh",
                "text": "Mình biết có người đưa phong bì. Mình đã biết người ấy là ai chưa? (tạm)"
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
            "ev-the-lich-bc24",
            "clue-loi-bac-thinh",
            "ev-mot-hoai",
            "clue-loi-co-lan",
            "doc-so-thu-hop",
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
      "title": "Kết thật (rank A, B): thầy không nhận thư vào hồ sơ; Hoài kể",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thư này không đưa vào hồ sơ. Phòng CLB giữ tới hết học kỳ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thầy quay sang cô Lan."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Cô mời bạn ngoài hành lang vào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài bước vào, hai tay nắm chặt quai túi. Tùng ngẩng lên, khựng lại: bạn nữ kéo vali hôm nhập học."
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "hoai"
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
          "text": "Em không quen anh ấy ạ. Anh ấy hỏi em có học tòa B không… em bảo có. Thế là… em cầm luôn. Em không nghĩ là thư như thế."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "downcast",
          "text": "Ở hộp có tờ phiếu gửi… ghi người nộp phải ký… nên em ký tên em. Em xin lỗi ạ…"
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
          "text": "Cảnh bóng mờ tự chạy theo lời Hoài: cổng ký túc xá gần bảy giờ, một bóng balo đen, một bóng nhỏ hơn cầm phong bì đi về phía tòa B. Không lời; người chơi xem, rồi bấm trở lại phòng họp."
        },
        {
          "type": "wait",
          "giay": 6
        },
        {
          "type": "branch",
          "id": "go-with-ket-that-quan",
          "asker": {
            "speaker": "player",
            "text": "Trở lại phòng họp"
          },
          "choices": [
            {
              "id": "go-ket-that-quan",
              "text": "Trở lại phòng họp",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "ket-that-quan"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ket-that-quan",
      "title": "Kết thật: Quân rút kết luận",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "quan",
          "expression": "stunned",
          "text": "Ban Kiểm tra rút kết luận. Tôi ghi lại: người nộp là Lê Thu Hoài, người viết chưa xác định."
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
      "title": "Kết tạm (rank C): thầy giữ thư lại; Hoài ôm túi đi về",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thầy Quang nhìn tờ giấy trước mặt một lúc lâu."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Một buổi mà CLB trình sai ba lần. Thầy chưa thể coi hồ sơ này là chắc."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phòng CLB giữ tới hết học kỳ, có điều kiện. Mỗi tháng CLB nộp thầy một bản báo cáo."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thầy kẹp lá thư cùng phong bì nâu vào tập hồ sơ, rồi gập lại."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "smug",
          "text": "Ban Kiểm tra giữ nguyên kết luận."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ngoài hành lang, Hoài vẫn ngồi chờ. Cô Lan bước ra, cúi xuống nói gì đó. Hoài gật đầu, ôm túi đi về. Tùng nhìn theo qua khe cửa, khựng lại: bạn nữ kéo vali hôm nhập học."
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
          "text": "Rồi chị quay sang bảng điều tra. (tạm)"
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
    "c-sv-hoai": {
      "id": "c-sv-hoai",
      "tieuDe": "Bảng sinh viên: những ai tên Hoài",
      "deBai": "Phiếu gửi ký một chữ: Hoài. Cả trường có những bạn nào tên Hoài?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Lọc bằng một điều kiện: tên đúng bằng Hoài. Mỗi dòng còn lại là một bạn tên Hoài.",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài';",
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
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 4077
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Hơn bốn nghìn dòng, cả trường luôn à? (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Phiếu gửi ký đúng một chữ. Cứ tìm hết những ai mang chữ ấy đã. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm \"+ thêm điều kiện\", bấm vào tên cột cho tới khi ra ten, thả giấy Hoài vào ô bên cạnh rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-sv-hoai-bc24": {
      "id": "c-sv-hoai-bc24",
      "tieuDe": "Bảng sinh viên: Hoài, Báo chí, khóa 2024",
      "deBai": "Hoài nào học Báo chí, khóa 2024?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Ba điều kiện nối bằng VÀ: dòng nào khớp cả ba mới được giữ.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí' AND khoa_hoc = 2024;",
      "bamO": "ma_sv",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 4
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "thinking",
              "text": "Vẫn bốn bạn Hoài như lúc nãy. (tạm)"
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
              "speaker": "tung",
              "expression": "surprised",
              "text": "Hai bạn Hoài cùng khóa 2024, mà một bạn học Marketing. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 69
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Sáu mươi chín bạn Báo chí khóa 2024? Thế này thì tìm Hoài kiểu gì? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 276
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Ơ, thêm vào mà lại ra nhiều hơn? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1218
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Hơn một nghìn dòng… càng thêm càng nhiều. (tạm)"
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
            "text": "Ra bốn là đúng, cả trường có bốn Hoài. Muốn còn một thì phải bảo máy thêm hai điều cùng lúc, chứ không phải điều này hoặc điều kia."
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm \"+ thêm điều kiện\" hai lần: một dòng cột nganh thả giấy Báo chí, một dòng cột khoa_hoc thả giấy 2024. Chữ nối giữa các dòng để là VÀ, rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 2
          },
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Hai bạn cùng khóa mà khác ngành. Tấm thẻ lịch còn nói một điều nữa. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Thêm một dòng lọc cột nganh, thả giấy Báo chí vào, chữ nối để là VÀ rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 276
          },
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Thế này là gộp cả hai nhóm lại rồi. Cần những dòng khớp cả hai cùng lúc. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm vào chữ HOẶC giữa các dòng lọc cho nó đổi thành VÀ, rồi bấm CHẠY. (tạm)"
          }
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1218
          },
          "bac1": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Nối thế này thì dòng nào khớp một điều thôi cũng được giữ. Cần khớp cả ba. (tạm)"
          },
          "bac2": {
            "speaker": "duy",
            "expression": "neutral",
            "text": "Bấm vào từng chữ HOẶC giữa các dòng lọc cho nó đổi thành VÀ, rồi bấm CHẠY. (tạm)"
          }
        }
      ],
      "vatChung": {
        "id": "ev-mot-hoai",
        "title": "Chỉ một người: Lê Thu Hoài, lớp BC24A",
        "description": "Bảng sinh viên, lọc tên Hoài VÀ ngành Báo chí VÀ khóa 2024: một dòng, Lê Thu Hoài, mã SV240317, lớp BC24A. Tên, khoa, khóa khớp; mới cho biết đi tìm ai, chưa nói ai bỏ thư.",
        "giaTri": [
          "SV240317"
        ],
        "chuTrenGiay": [
          "Mã sinh viên của Lê Thu Hoài: **SV240317**"
        ]
      },
      "ghiChu": [
        "Bước 2 của màn tra 1: lọc tên Hoài, thêm ngành Báo chí và khóa 2024, ra một dòng Lê Thu Hoài (SV240317, BC24A). Bấm ô mã của dòng ấy để chép ra giấy nhớ, rồi ghim lên bảng."
      ]
    },
    "c-sua-or-quan": {
      "id": "c-sua-or-quan",
      "tieuDe": "Câu tra trên màn chiếu",
      "deBai": "CLB ra một dòng. Câu của anh Quân ra hai trăm bảy mươi sáu dòng. Vì sao hai bên khác số?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "HOẶC giữ dòng khớp một trong hai điều kiện, nên ra nhiều; VÀ chỉ giữ dòng khớp cả hai.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí';",
      "truyVanNapSan": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' OR nganh = 'Báo chí';",
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 276
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Vẫn hai trăm bảy mươi sáu dòng như anh Quân chiếu. (tạm)"
            }
          ]
        }
      ],
      "goiY": [
        {
          "bac1": {
            "speaker": "ha-vy",
            "expression": "thinking",
            "text": "Câu ấy lấy cả nhóm tên Hoài lẫn cả nhóm học Báo chí. Mình chỉ cần phần trùng nhau thôi. (tạm)"
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
          "speaker": "quan",
          "expression": "neutral",
          "text": "Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?"
        },
        {
          "speaker": "narrator",
          "text": "Minh Anh gạch một vạch nhỏ ở lề sổ."
        }
      ],
      "vatChung": null,
      "ghiChu": []
    }
  },
  "hoSo": {
    "clue-loi-bac-thinh": {
      "id": "clue-loi-bac-thinh",
      "loai": "clue",
      "heading": "[Lời bác Thịnh]",
      "fields": {
        "Trên bảng": "Sảnh mở 7:00, hộp thu 9:00",
        "Nguồn trên bảng": "Bác Thịnh kể",
        "Tiêu đề": "Bảy giờ mở sảnh tòa B, chín giờ cô Lan thu hộp",
        "Nguồn": "Lời bác Thịnh, sảnh tòa B, sáng 24/09",
        "Nội dung": "Sảnh tòa B bảy giờ sáng bác mới mở. Chín giờ cô Lan xuống thu hộp kiến nghị như mọi ngày. Thư vào hộp sáng thứ Hai thì vào sau bảy giờ, trước chín giờ."
      },
      "quotes": {}
    },
    "clue-loi-co-lan": {
      "id": "clue-loi-co-lan",
      "loai": "clue",
      "heading": "[Lời cô Lan]",
      "fields": {
        "Trên bảng": "Ai nộp thư thì người ấy ký phiếu",
        "Nguồn trên bảng": "Cô Lan kể",
        "Tiêu đề": "Chữ ký trên phiếu gửi chỉ là của người nộp",
        "Nguồn": "Lời Cô Lan, Phòng Công tác sinh viên, 26/09",
        "Nội dung": "Thường thì người viết tự đi nộp, nhưng vẫn có trường hợp nộp hộ. Chữ ký trên phiếu gửi chỉ là của người nộp."
      },
      "quotes": {}
    },
    "clue-loi-chu-cuong": {
      "id": "clue-loi-chu-cuong",
      "loai": "clue",
      "heading": "[Lời chú Cường]",
      "fields": {
        "Trên bảng": "Gần 7:00, cậu balo đen đưa Hoài phong bì nâu",
        "Nguồn trên bảng": "Chú Cường kể",
        "Tiêu đề": "Phong bì nâu trao tay ở cổng ký túc xá, gần 7:00 sáng 16/09",
        "Giá trị cho trình dựng": "2024-09-16",
        "Chữ trên giấy": "Ngày chú Cường thấy phong bì nâu: **2024-09-16**",
        "Nguồn": "Lời Chú Cường, cổng ký túc xá, 27/09",
        "Nội dung": "Sáng thứ Hai 16/09, lúc chú sắp giao ca (gần bảy giờ): một bạn nữ sáng nào cũng ra cổng sớm, chú nhớ mặt, vừa quẹt thẻ ra cổng thì có cậu đeo balo đen gọi lại, đưa phong bì nâu. Cậu kia quay lưng về phía chú suốt, rồi đi luôn. Bạn nữ cầm phong bì đi về phía tòa B."
      },
      "quotes": {}
    },
    "doc-thu-kien-nghi": {
      "id": "doc-thu-kien-nghi",
      "loai": "doc",
      "heading": "Thư kiến nghị thu hồi phòng CLB",
      "fields": {
        "Trên bảng": "Thư đòi thu hồi phòng CLB, không ký tên",
        "Nguồn trên bảng": "Hộp kiến nghị tòa B",
        "Tiêu đề": "Thư kiến nghị thu hồi phòng CLB Thám Tử",
        "Ảnh": "doc-thu-kien-nghi",
        "Nguồn": "Hộp kiến nghị sảnh tòa B, cô Lan thu sáng thứ Hai 16/09; cô mang tới phòng CLB chiều 23/09",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử. CLB không còn giải quyết được việc gì.",
          "(Cuối thư không có tên người viết.)"
        ]
      }
    },
    "doc-so-thu-hop": {
      "id": "doc-so-thu-hop",
      "loai": "doc",
      "heading": "Sổ thu hộp kiến nghị",
      "fields": {
        "Trên bảng": "9:00 thu hộp, trong có phong bì nâu",
        "Nguồn trên bảng": "Sổ thu hộp",
        "Tiêu đề": "Sổ thu hộp kiến nghị, sáng thứ Hai 16/09",
        "Ảnh": "doc-so-thu-hop",
        "Nguồn": "Cô Lan, Phòng Công tác sinh viên",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Thứ Hai 16/09/2024, 9:00, hộp sảnh tòa B: ba phong bì.",
          "Hai phong bì kiến nghị wifi và nhà ăn. Phong bì thứ ba màu nâu, phiếu gửi kẹp ngoài."
        ]
      }
    },
    "ev-phieu-gui-hoai": {
      "id": "ev-phieu-gui-hoai",
      "loai": "ev",
      "heading": "Phiếu gửi ký \"Hoài\"",
      "fields": {
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
        "Trên bảng": "Thẻ lịch Báo chí 2024 mắc ở khe hộp",
        "Nguồn trên bảng": "Nhặt ở sảnh tòa B",
        "Tiêu đề": "Thẻ lịch khoa Báo chí, khóa 2024, mắc ở khe hộp kiến nghị",
        "Ảnh": "doc-the-lich-rach",
        "Giá trị cho trình dựng": "Báo chí · 2024",
        "Chữ trên giấy": "Thẻ lịch mắc ở khe hộp: khoa **Báo chí** · Thẻ lịch mắc ở khe hộp: khóa **2024**",
        "Nội dung": "Tấm thẻ lịch học mắc ở mép khe hộp sảnh tòa B, mép giấy còn mới, không bám bụi. Dòng dưới cùng bị xé mất nửa; còn đọc được: Khoa Báo chí, khóa 2024. Dòng tên bị xé mất."
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
      "sql": "SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/c-ra-vao.md:3 thẻ c-ra-vao, SQL chuẩn",
      "resultId": "ev-ra-cong-644"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài';",
      "soDong": 4,
      "noi": "noi-dung-mua-1/thu-thach/c-sinh-vien.md:3 thẻ c-sv-hoai, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí' AND khoa_hoc = 2024;",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-sinh-vien.md:20 thẻ c-sv-hoai-bc24, SQL chuẩn",
      "resultId": "ev-mot-hoai"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-sua-or-quan.md:3 thẻ c-sua-or-quan, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' OR nganh = 'Báo chí';",
      "soDong": 276,
      "noi": "noi-dung-mua-1/kich-ban/06-hop-va-ket.md:16 [MÀN CHIẾU hop-chieu-or]"
    }
  ],
  "duLieu": {
    "bang": [
      {
        "ten": "sinh_vien",
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
            "ten": "nganh",
            "kieu": "TEXT"
          },
          {
            "ten": "khoa_hoc",
            "kieu": "INTEGER"
          },
          {
            "ten": "ma_lop",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "SV240317",
            "Lê Thu",
            "Hoài",
            "Báo chí",
            2024,
            "BC24A"
          ],
          [
            "SV240588",
            "Nguyễn Thị",
            "Hoài",
            "Marketing",
            2024,
            "MK24B"
          ],
          [
            "SV230264",
            "Phạm Minh",
            "Hoài",
            "Kế toán",
            2023,
            "KT23A"
          ],
          [
            "SV220419",
            "Đỗ Thanh",
            "Hoài",
            "Du lịch",
            2022,
            "DL22A"
          ],
          [
            "SV240251",
            "Trần",
            "Tùng",
            "Du lịch",
            2024,
            "DL24A"
          ],
          [
            "SV240466",
            "Trần Hà",
            "Vy",
            "Toán ứng dụng",
            2024,
            "TU24A"
          ],
          [
            "SV230142",
            "Nguyễn Đức",
            "Duy",
            "Hành chính học",
            2023,
            "HC23A"
          ],
          [
            "SV220337",
            "Lê Minh",
            "Anh",
            "Luật kinh tế",
            2022,
            "LK22B"
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
    "dtg-banh": {
      "id": "dtg-banh",
      "ten": "Đĩa bánh Trung thu",
      "kieu": "tap-duot",
      "nguoiNhac": "ha-vy",
      "keoSai": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chưa khớp giờ. Lời này nói chuyện lúc nào? (tạm)"
        }
      ],
      "cot": [],
      "theTam": [
        {
          "id": "lk-dem-bon",
          "chu": "Minh Anh: \"Lúc bảy giờ chị đếm còn bốn.\""
        },
        {
          "id": "lk-tay-na",
          "chu": "Bé Na ôm nửa chiếc bánh cạnh đèn cá chép"
        },
        {
          "id": "lk-chia-ba",
          "chu": "Minh Anh: \"Ba cái.\""
        }
      ],
      "o": [
        {
          "id": "o1",
          "gio": "19:00",
          "cot": null,
          "noi": null,
          "viec": "đĩa đủ bốn chiếc",
          "nhan": [
            "lk-dem-bon"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Lúc bảy giờ đĩa còn đủ. Chỗ này cần lời ai đếm bánh lúc ấy. (tạm)"
            }
          ],
          "keoVaoTrong": null
        },
        {
          "id": "o2",
          "gio": "?",
          "cot": null,
          "noi": null,
          "viec": "bé Na cầm một chiếc",
          "nhan": [
            "lk-tay-na"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Chỗ này là lúc bánh rời đĩa. Ai đang cầm bánh? (tạm)"
            }
          ],
          "keoVaoTrong": null
        },
        {
          "id": "o3",
          "gio": "19:15",
          "cot": null,
          "noi": null,
          "viec": "chia còn ba",
          "nhan": [
            "lk-chia-ba"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Lúc chia thì đã thiếu rồi. Chỗ này cần cái gì xảy ra lúc chia cơ. (tạm)"
            }
          ],
          "keoVaoTrong": null
        }
      ]
    },
    "dtg-vu1": {
      "id": "dtg-vu1",
      "ten": "Sáng thứ Hai 16/09",
      "kieu": "chinh",
      "nguoiNhac": "ha-vy",
      "keoSai": [
        {
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thẻ này chưa khớp ô ấy. Xem lại nó nói chuyện lúc nào, ở đâu. (tạm)"
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
              "text": "Ô này cần đúng giờ Hoài ra cổng. Thẻ nào ghi giờ ấy? (tạm)"
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
              "text": "Ô này là lúc phong bì đến tay Hoài ở cổng. Ai đã nhìn thấy? (tạm)"
            }
          ],
          "keoVaoTrong": [
            {
              "speaker": "ha-vy",
              "expression": "day-kinh",
              "text": "Người đưa phong bì là ai thì chưa có căn cứ nào. Chỗ ấy để trống. (tạm)"
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
            "ev-phieu-gui-hoai",
            "ev-the-lich-bc24",
            "clue-loi-co-lan"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ô này là lúc thư vào hộp. Thẻ nào cho thấy Hoài là người nộp? (tạm)"
            }
          ],
          "keoVaoTrong": null
        },
        {
          "id": "o5",
          "gio": "9:00",
          "cot": "bac-tu",
          "noi": "sảnh tòa B",
          "viec": "thấy hộp được thu",
          "nhan": [
            "doc-so-thu-hop",
            "clue-loi-bac-thinh"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ô này là lúc cô Lan thu hộp. Thẻ nào ghi chín giờ? (tạm)"
            }
          ],
          "keoVaoTrong": null
        }
      ]
    }
  }
} satisfies KichBanMvp;

/** Bảng dữ liệu = dòng của truyện (ở trên) + dữ liệu nền sinh lại lúc nạp (tools/noi-dung/nhieu-mvp.ts, hạt cố định). */
export const KICH_BAN_MUA_1 = { ...GOC, dieuHuongTuDo: true, hoiDap: HOI_DAP_MUA_1, duLieu: GOC.duLieu ? themNhieuMvp(GOC.duLieu) : GOC.duLieu } satisfies KichBanMvp;
export const KICH_BAN_MVP = KICH_BAN_MUA_1;
