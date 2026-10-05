// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-mua-1/**/*.md bởi `npm run noi-dung:sinh:mua1`
// (tools/noi-dung/sinh-mua1.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung:mua1` rồi
// `npm run noi-dung:sinh:mua1`, commit cả .md lẫn .gen.ts.
import type { KichBanMvp } from '../../mvp/types';
import { themNhieuMvp } from '../../../../tools/noi-dung/nhieu-mvp';

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
      "vai": "Năm 1 Du lịch, bạn cùng phòng KTX 408 của người chơi, cháu chú Cường, tình nguyện viên đón tân sinh viên tuần đầu (áo xanh tình nguyện: mặc hôm nhập học và mặc lại ở Vụ 5 khi đón Hoài tới buổi họp; ảnh là các biểu cảm `ao-xanh…`: sơ mi xanh dài tay, cờ đỏ sao vàng ở ngực, mũ tai bèo xanh lá đeo sau lưng, riêng `ao-xanh-doi-mu` đội mũ; ngày thường mặc áo thể thao lam). Dẫn đường, nhắc lịch. \"Tớ cá là…\"",
      "bieuCam": [
        "neutral",
        "happy",
        "worried",
        "surprised",
        "thinking",
        "gai-dau",
        "chi-tay",
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
        "lich": "Đi đâu cũng cầm bản đồ trường. Chiều hay ở phòng CLB, tối đá bóng ở sân cạnh nhà CLB.",
        "danhXung": "Bạn cùng phòng 408",
        "chuaQuen": "Cậu bạn áo xanh",
        "nam": "Năm nhất",
        "nganh": "Du lịch",
        "cauNoi": "Tớ cá là mười phút là tới nơi.",
        "loi": "Tân sinh viên ngành Du lịch, ở cùng phòng 408 ký túc xá. Mới nhập học mà đã thuộc đường khắp trường. Hay đùa, hay cá cược, nhưng nhắc lịch thì chưa quên bao giờ."
      }
    },
    {
      "id": "ha-vy",
      "ten": "Hà Vy",
      "hoTen": "Trần Hà Vy",
      "trongCau": "Hà Vy",
      "vai": "Năm 1 Toán ứng dụng. Đăng ký CLB qua form online nên không có mặt ở Ngày hội. Thích logic, thần tượng Sherlock Holmes. \"Khoan, tính lại đã.\" / \"Đừng cá. Tính.\"",
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
        "lich": "Chiều ở phòng CLB. Tối thứ Hai nào cũng ngồi học ở thư viện tới khuya.",
        "danhXung": "Thành viên mới của CLB Thám Tử",
        "chuaQuen": "Bạn nữ đeo kính",
        "nam": "Năm nhất",
        "nganh": "Toán ứng dụng",
        "cauNoi": "Khoan, tính lại đã.",
        "loi": "Đăng ký CLB qua form online, mê Sherlock Holmes từ hồi cấp hai. Thích mọi chuyện phải có lý do, nói ít nhưng hay nhìn ra chi tiết người khác bỏ qua."
      }
    },
    {
      "id": "minh-anh",
      "ten": "Minh Anh",
      "hoTen": "Lê Minh Anh",
      "trongCau": "Minh Anh",
      "vai": "Năm 3 Luật kinh tế, chủ nhiệm CLB. \"Nói có sách, mách có chứng.\" Ở buổi họp: đổi sắc mặt và giải cứu khi người chơi mất vạch, không nói thay đáp án.",
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
        "lich": "Chiều thứ Hai, thứ Tư, thứ Sáu ở phòng CLB. Buổi sáng có tiết ở tòa A.",
        "thuongO": [
          {
            "thu": [
              1,
              3,
              5
            ],
            "tu": "13:30",
            "den": "18:00",
            "noi": "nha-clb"
          }
        ],
        "danhXung": "Chủ nhiệm CLB Thám Tử",
        "chuaQuen": "Chị khóa trên",
        "nam": "Năm ba",
        "nganh": "Luật kinh tế",
        "cauNoi": "Nói có sách, mách có chứng.",
        "loi": "Một mình giữ bàn CLB Thám Tử ở Ngày hội CLB. Làm việc nghiêm túc, không thích đùa lúc đang bận, nhưng sẵn lòng cho người mới một cơ hội."
      }
    },
    {
      "id": "duy",
      "ten": "Duy",
      "hoTen": "Nguyễn Đức Duy",
      "trongCau": "Duy",
      "vai": "Năm 2 Hành chính học, thành viên từ năm nhất. Giữ tài sản CLB: chìa khóa, tủ hồ sơ, sổ tài sản, máy tính cũ. Giải thích quy trình rà soát. Ngồi cùng người chơi ở phòng máy, ký sổ mượn máy (đơn xin quyền dữ liệu do Minh Anh đứng tên, thầy Quang duyệt).",
      "bieuCam": [
        "neutral",
        "smile",
        "serious"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Giữ chìa khóa nên chiều nào cũng ở phòng CLB. Sáng thứ Ba, thứ Năm có tiết.",
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
            "tu": "13:30",
            "den": "18:00",
            "noi": "nha-clb"
          }
        ],
        "danhXung": "Thành viên CLB, giữ tài sản",
        "chuaQuen": "Anh khóa trên",
        "nam": "Năm hai",
        "nganh": "Hành chính học",
        "cauNoi": "Đồ ra khỏi phòng là phải có tên.",
        "loi": "Ở CLB từ năm nhất. Giữ chìa khóa phòng, tủ hồ sơ và sổ tài sản. Việc gì cũng làm theo đúng quy trình, giấy tờ nào cũng biết nằm ở ngăn nào."
      }
    },
    {
      "id": "quan",
      "ten": "Quân",
      "hoTen": null,
      "trongCau": "Quân",
      "vai": "Trưởng ban Pháp chế – Kiểm tra Hội sinh viên. Gặp CLB lần đầu ở CTSV ngày 3 (giám sát), chất vấn ở buổi họp ngày 6.",
      "bieuCam": [
        "neutral",
        "smug",
        "stunned",
        "chi-man"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "danhXung": "Ban Pháp chế – Kiểm tra, Hội sinh viên",
        "chuaQuen": "Anh sinh viên đeo kính",
        "nam": null,
        "nganh": null,
        "cauNoi": "Biết ai nộp chưa có nghĩa là biết ai viết.",
        "loi": "Được Hội sinh viên cử xuống giám sát việc CLB lập căn cứ. Nói ngắn, bám quy chế, không bỏ qua câu nào thiếu chứng cứ."
      }
    },
    {
      "id": "chu-cuong",
      "ten": "Chú Cường",
      "hoTen": null,
      "trongCau": "chú Cường",
      "vai": "Bảo vệ KTX, chú của Tùng. Tuần 1 trực tối; tuần 2 đổi ca sáng (Tùng nhắc, chú không tự nói). Nhân chứng 6:45 sáng thứ Hai.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Trực cổng ký túc xá ca tối.",
        "danhXung": "Bảo vệ ký túc xá",
        "chuaQuen": "Chú bảo vệ",
        "nam": null,
        "nganh": null,
        "cauNoi": "Chịu khó hỏi từng người rồi đối chiếu giấy tờ thôi.",
        "loi": "Trực cổng ký túc xá, biết mặt gần hết sinh viên trong khu. Nhớ nhiều chuyện cũ của trường, kể cả thời CLB Thám Tử còn nổi tiếng."
      }
    },
    {
      "id": "bac-tu",
      "ten": "Bác Thịnh",
      "hoTen": null,
      "trongCau": "bác Thịnh",
      "vai": "Bảo vệ tòa B, giữ sổ ký giấy vào phòng máy tối Chủ nhật. Cùng cô Lan mở hộp kiến nghị lúc 9h sáng thứ Hai.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Trực sảnh tòa B từ thứ Hai tới thứ Bảy, mở cửa 7 giờ sáng, khóa các phòng học 9 giờ tối; lối lên thư viện tầng ba để tới 11 giờ đêm rồi mới khóa sảnh. Chủ nhật ghé từ 8 giờ tối, giữ sổ ký phòng máy và khóa sảnh lúc 23 giờ 30.",
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
            "den": "23:00",
            "noi": "toa-b"
          },
          {
            "thu": [
              0
            ],
            "tu": "20:00",
            "den": "23:30",
            "noi": "toa-b"
          }
        ],
        "danhXung": "Bảo vệ giảng đường B",
        "chuaQuen": "Bác bảo vệ",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Mép hộp sắc đấy, đừng thò tay vào.",
        "loi": "Trực ở chân cầu thang tòa B. Ít lời, giờ giấc đâu ra đấy, việc gì không tận mắt thấy thì không nói."
      }
    },
    {
      "id": "co-hanh",
      "ten": "Cô Hạnh",
      "hoTen": null,
      "trongCau": "cô Hạnh",
      "vai": "Phòng Đào tạo, quản lý tài khoản, máy in và máy chủ của trường. Tạo tài khoản tra cứu của CLB trên laptop (ngày 2): chỉ xem bảng lớp; bảng có thông tin cá nhân phải có phiếu yêu cầu tra cứu.",
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
        "danhXung": "Phòng Đào tạo",
        "chuaQuen": "Cô cán bộ",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Tài khoản này chỉ xem được bảng lớp. Muốn xem gì thêm thì mang phiếu sang.",
        "loi": "Cán bộ Phòng Đào tạo, phụ trách tài khoản, máy in và máy chủ của trường. Cấp quyền rất chặt: xin gì cho nấy, dùng xong là khóa lại. Sắp nghỉ hưu: cô làm ở trường gần ba mươi năm, những năm đầu đứng lớp, sau mới về Phòng Đào tạo."
      }
    },
    {
      "id": "co-lan",
      "ten": "Cô Lan",
      "hoTen": null,
      "trongCau": "cô Lan",
      "vai": "Phòng Công tác sinh viên (CTSV). Gọi Minh Anh lên nhận thông báo; giải thích quy chế phiếu gửi, giữ sổ niêm phong hộp kiến nghị và cùng bác Thịnh mở hộp lúc 9h sáng thứ Hai.",
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
        "danhXung": "Phòng Công tác sinh viên",
        "chuaQuen": "Cô cán bộ",
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Sổ đó niêm phong. Cô cũng không được tự mở.",
        "loi": "Cán bộ Phòng Công tác sinh viên, giữ sổ niêm phong hộp kiến nghị và giải thích cho CLB các quy chế về phiếu gửi."
      }
    },
    {
      "id": "thay-quang",
      "ten": "Thầy Quang",
      "hoTen": null,
      "trongCau": "thầy Quang",
      "vai": "Phó hiệu trưởng phụ trách sinh viên. Chủ trì buổi họp rà soát, quyết định.",
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
        "danhXung": "Phó hiệu trưởng phụ trách sinh viên",
        "chuaQuen": "Thầy chủ trì",
        "nam": null,
        "nganh": null,
        "cauNoi": "Các em còn gì trình thêm không?",
        "loi": "Chủ trì buổi họp rà soát phòng CLB. Nghe hết các bên rồi mới quyết, và chỉ quyết dựa trên căn cứ."
      }
    },
    {
      "id": "hoai",
      "ten": "Hoài",
      "hoTen": "Lê Thu Hoài",
      "trongCau": "Hoài",
      "vai": "Lớp BC24A, người nộp thư hộ. Theo quy chế, ngồi chờ ngoài phòng họp; người chơi chọn cách mời vào (tự kể / đối chất / không mời). Không nêu tên người nhờ.",
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
        "lich": "Tan học là lên thư viện, ngồi bàn cạnh cửa sổ tới chiều muộn.",
        "thuongO": [
          {
            "thu": [
              1,
              2,
              3,
              4,
              5
            ],
            "tu": "14:00",
            "den": "17:30",
            "noi": "thu-vien"
          }
        ],
        "danhXung": "Sinh viên lớp BC24A",
        "chuaQuen": "Bạn nữ kéo vali",
        "nam": "Năm nhất",
        "nganh": null,
        "cauNoi": "Dạ… vâng ạ.",
        "loi": "Tân sinh viên lớp BC24A. Rụt rè, nói nhỏ, trả lời câu nào cũng ngập ngừng."
      }
    },
    {
      "id": "hieu",
      "ten": "Hiếu",
      "hoTen": "Trần Minh Hiếu",
      "trongCau": "Hiếu",
      "vai": "Lớp BC24A. Công khai đồng ý với lá thư (nghi phạm giả). Lên hình 2–3 cảnh.",
      "bieuCam": [
        "neutral",
        "annoyed",
        "surprised"
      ],
      "xuatHienTu": {
        "kind": "ngay",
        "ngay": 3,
        "khung": "sang"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "danhXung": "Sinh viên lớp BC24A",
        "chuaQuen": "Cậu bàn bên",
        "nam": "Năm nhất",
        "nganh": null,
        "cauNoi": "Tôi nói thẳng vậy thôi.",
        "loi": "Sinh viên lớp BC24A, nói gì cũng thẳng. Nhóm của Hiếu vừa xin phòng làm bài nhóm mà không được."
      }
    },
    {
      "id": "nam",
      "ten": "Nam",
      "hoTen": null,
      "trongCau": "Nam",
      "vai": "Thành viên CLB Robotics, trực kênh và giữ sổ sách của xưởng. Xuất hiện từ Vụ 2 (tin đồn): trông đáng ngờ vì là người trực kênh, tới Vụ 3 mới được gỡ nghi. Không nói học năm mấy (dàn ý mùa 1).",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Chiều nào cũng ở xưởng Robotics. Tối thứ Hai học ở thư viện tới lúc đóng cửa.",
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
            "tu": "14:00",
            "den": "18:00",
            "noi": "xuong"
          },
          {
            "thu": [
              1
            ],
            "tu": "21:30",
            "den": "23:15",
            "noi": "thu-vien"
          }
        ],
        "danhXung": "Thành viên CLB Robotics",
        "chuaQuen": "Cậu trực kênh",
        "nam": null,
        "nganh": null,
        "cauNoi": "Tớ không bắt các cậu tin. Tớ chỉ chỗ để các cậu tự kiểm.",
        "loi": "Trực kênh và giữ sổ sách cho xưởng của CLB Robotics. Ít nói, hỏi gì đáp nấy, việc gì cũng có ghi chép."
      }
    },
    {
      "id": "khanh",
      "ten": "Khánh",
      "hoTen": null,
      "trongCau": "Khánh",
      "vai": "Chủ tịch Hội sinh viên, kiêm trưởng CLB Robotics (năm 4). Người đứng sau lá thư, tin đồn và ba đơn mượn tên Nam: lấy tiền quỹ CLB Thám Tử cho việc riêng, ghi thành linh kiện. Lên hình thoáng qua ở Vụ 2 (xưởng) và cuối Vụ 4 (phòng CLB), đối chất ở Vụ 5 (phòng họp); nhận theo từng nhịp chứng cứ, không bị bêu, không nêu việc riêng. Không gọi họ tên đầy đủ.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "danhXung": "Chủ tịch Hội sinh viên, trưởng CLB Robotics",
        "chuaQuen": "Anh khóa trên",
        "nam": null,
        "nganh": null,
        "cauNoi": "Tôi duyệt là đúng thẩm quyền.",
        "loi": "Chủ tịch Hội sinh viên, trưởng CLB Robotics. Nói chắc, bám thẩm quyền, ít khi phải giải thích với ai."
      }
    },
    {
      "id": "bach",
      "ten": "Bách",
      "hoTen": null,
      "trongCau": "Bách",
      "vai": "Phó CLB Robotics (năm 3). Một trong ba người giữ chìa phòng văn phòng xưởng. Lên hình ở cuối Vụ 3.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "danhXung": "Phó CLB Robotics",
        "chuaQuen": "Anh khóa trên",
        "nam": null,
        "nganh": null,
        "cauNoi": "Vé xe anh còn giữ.",
        "loi": "Phó CLB Robotics. Nói ít, giữ giấy tờ kỹ."
      }
    },
    {
      "id": "thao",
      "ten": "Thảo",
      "hoTen": null,
      "trongCau": "Thảo",
      "vai": "Phụ trách kỹ thuật CLB Robotics (năm 3). Một trong ba người giữ chìa phòng văn phòng xưởng; tối Chủ nhật hay ra phòng máy in sơ đồ mạch. Lên hình ở cuối Vụ 3 và sau buổi họp Vụ 5.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": null,
        "danhXung": "Kỹ thuật CLB Robotics",
        "chuaQuen": "Chị khóa trên",
        "nam": null,
        "nganh": null,
        "cauNoi": "Chị không chối.",
        "loi": "Lo kỹ thuật của xưởng. Thẳng, hơi cẩu thả với chìa khóa."
      }
    },
    {
      "id": "ba-lua",
      "ten": "Bà bán trà đá",
      "hoTen": null,
      "trongCau": "Bà bán trà đá",
      "vai": "Bán trà đá ở gốc cây ngoài cổng chính từ hồi phòng CLB còn là kho. Kể bốn mẩu chuyện về \"cậu trà nóng\" (thầy Quang thời sinh viên, bà không nhớ tên), song song với bốn mẩu giấy trong sổ CLB. Xuất hiện ở cảnh sau kết thật Vụ 1 và ở ghim \"Quán trà đá\" trên bản đồ Vụ 2, 3, 5.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "lich": "Chiều nào cũng dọn hàng ở gốc cây ngoài cổng chính, ngồi tới chín giờ tối. Sáng thứ Bảy, Chủ nhật bán từ sớm.",
        "thuongO": [
          {
            "thu": [
              1,
              2,
              3,
              4,
              5
            ],
            "tu": "13:00",
            "den": "21:00",
            "noi": "tra-da"
          },
          {
            "thu": [
              0,
              6
            ],
            "tu": "06:30",
            "den": "21:00",
            "noi": "tra-da"
          }
        ],
        "danhXung": "Quán trà đá cổng trường",
        "chuaQuen": null,
        "khongXungTen": true,
        "nam": null,
        "nganh": null,
        "cauNoi": "Khách của bà, bà nhớ cốc chứ nhớ gì tên.",
        "loi": "Bán trà đá ngoài cổng chính đã hai chục năm. Sinh viên khóa nào ngồi ghế nào, gọi cốc gì, bà nhớ hết; chỉ tên là không nhớ."
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
      "id": "ghe-da-tui-do",
      "ten": "Ghế đá cạnh lối đi",
      "anhNen": "bg-mvp-ghe-da-tui-do"
    }
  ],
  "diaDiem": [],
  "lich": {
    "vu": {
      "id": "vu1",
      "ten": "Vụ 1 — Chữ ký H"
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
        "ten": "Sảnh tòa B",
        "kieu": "theo-truyen",
        "chuoi": "n1-mo",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 2,
        "ten": "Tài khoản CLB",
        "kieu": "theo-truyen",
        "chuoi": "n2-mo",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 3,
        "ten": "Phiếu tra cứu",
        "kieu": "theo-truyen",
        "chuoi": "n3-mo",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 4,
        "ten": "Sổ niêm phong",
        "kieu": "theo-truyen",
        "chuoi": "n4-mo",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 5,
        "ten": "Cổng KTX",
        "kieu": "theo-truyen",
        "chuoi": "n5-mo",
        "batDauO": "cong-ktx",
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
      "thuong": "ket-thuong"
    },
    "vuSau": [
      {
        "id": "vu-tin-don",
        "ten": "Tin đồn",
        "chuoi": "tin-mo",
        "ngay": "2024-10-08",
        "hanChot": "2024-10-15",
        "viecChot": "Buổi giải trình chiều 15/10",
        "cacNgay": [
          {
            "ngay": "2024-10-08",
            "chuoi": "tin-mo",
            "batDauO": "phong-clb"
          },
          {
            "ngay": "2024-10-09",
            "chuoi": "tin-n2-mo",
            "batDauO": "phong-clb"
          },
          {
            "ngay": "2024-10-10",
            "chuoi": "tin-n3-mo",
            "batDauO": "phong-ktx"
          },
          {
            "ngay": "2024-10-14",
            "chuoi": "tin-n5-mo",
            "batDauO": "phong-ktx"
          },
          {
            "ngay": "2024-10-15",
            "chuoi": "tin-n6-mo",
            "batDauO": "hoi-truong"
          }
        ],
        "tieuDeKet": "Một tài khoản, chưa phải một người",
        "loiKet": "Tin gốc đi từ tài khoản kênh của CLB Robotics, lúc 22:40 tối thứ Hai. Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi."
      },
      {
        "id": "vu3",
        "ten": "Tranh cãi trong nhóm",
        "chuoi": "v3-qua-2010",
        "ngay": "2024-10-22",
        "batDauO": "phong-clb",
        "tieuDeKet": "Nam ở thư viện lúc tin được gửi",
        "loiKet": "Bản ghi quẹt thẻ của thư viện và trí nhớ của Hà Vy là hai nguồn riêng, cùng đặt Nam ở thư viện lúc 22:40. Người gửi tin ngồi máy văn phòng xưởng, là ai thì chưa biết."
      },
      {
        "id": "vu4",
        "ten": "Giúp Nam",
        "chuoi": "v4-mo",
        "ngay": "2024-11-04",
        "batDauO": "phong-clb",
        "tieuDeKet": "Có người mượn tên Nam",
        "loiKet": "Ba đơn đứng tên Nam được tạo ban đêm từ máy văn phòng xưởng, cùng cái máy đã gửi tin đồn, một đơn đúng tối Nam ở thư viện. Máy thì biết, tay thì chưa. Ba người có chìa phòng."
      },
      {
        "id": "vu5",
        "ten": "Sổ quỹ",
        "chuoi": "v5-qua-2011",
        "ngay": "2024-11-16",
        "batDauO": "phong-clb",
        "tieuDeKet": "Mỗi bước là một phiếu",
        "loiKet": "Ba khoản chi không có hàng được ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Người nhận là người nói \"vì sao\". Mùa 1 khép lại ở chỗ chứng cứ dừng."
      }
    ],
    "nhiemVuPhu": [
      {
        "id": "so-phong",
        "ten": "Bốn mục trong sổ đã ký",
        "chuoi": "v2-mo",
        "nguoiGiao": "duy",
        "moSau": "vu-tin-don",
        "ngay": "2024-11-01",
        "tieuDeKet": "Bốn mục có trong sổ, không hơn",
        "loiKet": "Bản xuất và sổ giấy là hai nguồn riêng, cùng ra bốn buổi đã ký. Hồ sơ ghi đúng điều đó: không nói ai tới dự, không nói buổi nào có ích."
      },
      {
        "id": "micro",
        "ten": "Chiếc micro ở tủ chung",
        "chuoi": "p-mic-mo",
        "nguoiGiao": "duy",
        "moSau": "vu4",
        "ngay": "2024-11-15",
        "tieuDeKet": "Micro không mất, chỉ đổi chỗ",
        "loiKet": "Phiếu PX-17 đã có người nhận, chuyển micro không dây sang tủ thiết bị dùng chung; mã dán trên micro trong tủ khớp với mã trên phiếu. Bảng không nói ai quên báo, và hồ sơ cũng không nói thay."
      },
      {
        "id": "hoan-tien",
        "ten": "Một lần hoàn tiền, hai dòng ghi",
        "chuoi": "p-hoan-mo",
        "nguoiGiao": "minh-anh",
        "moSau": "vu5",
        "ngay": "2024-11-29",
        "tieuDeKet": "Một khoản hoàn, bản xuất ghi hai lần",
        "loiKet": "Phiếu PH-04 có hai dòng hoàn tiền cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Báo cáo được sửa, bản cũ được giữ. Ai nhập trùng thì bảng không ghi."
      },
      {
        "id": "dan-lac",
        "ten": "Một lần dẫn lạc",
        "chuoi": "p-lac-mo",
        "nguoiGiao": "tung",
        "moSau": "vu3",
        "ngay": "2024-10-25",
        "tieuDeKet": "Chín lượt, một lượt nhầm",
        "loiKet": "Sổ đón ghi chín lượt Tùng dẫn: tám lượt tới ký túc xá, một lượt tới nhà xe, là lượt của Hoài. Sổ chỉ ghi nơi tới; vì sao nhầm là điều Tùng tự nhớ lại và tự nói ra."
      },
      {
        "id": "hoc-tro-cu",
        "ten": "Học trò cũ của cô",
        "chuoi": "p-hoc-mo",
        "nguoiGiao": "co-hanh",
        "moSau": "vu4",
        "ngay": "2024-11-20",
        "tieuDeKet": "Hai mươi sáu tên, bốn tên xuất hiện hai lần",
        "loiKet": "Từ bốn trăm dòng lớp cũ, 30 dòng ghi ra trường, gom lại còn 26 tên không trùng; bốn tên có hai dòng. Danh sách chỉ cho biết tên trùng, không cho biết là một người hay hai người trùng tên, việc đó cô Hạnh nhận ra từ trí nhớ. Danh sách cũng không cho biết ai còn liên lạc được hay sẽ tới."
      },
      {
        "id": "tui-do",
        "ten": "Túi đồ trên ghế đá",
        "chuoi": "p-tui-mo",
        "nguoiGiao": "tung",
        "moSau": "vu-tin-don",
        "ngay": "2024-10-30",
        "tieuDeKet": "Túi về tay chủ, đơn tới muộn hay kịp",
        "loiKet": "Chiếc túi vải trên ghế đá là của Hiếu, lớp BC24A; trong túi có đơn học bổng hạn nộp 17 giờ ngày 30/10. Túi nào cũng về đúng người, chỉ khác tờ đơn tới Phòng Công tác sinh viên lúc nào. Lịch học và danh sách đăng ký nói được ai học lớp nào, không nói ai là người đánh rơi."
      }
    ],
    "viecNgayLe": [
      {
        "id": "le-hoi-sv",
        "ten": "Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam",
        "ngay": "2024-10-15",
        "thuocVu": "vu-tin-don",
        "chuoi": "le-hsv-mo",
        "nguoiGiao": "quan",
        "khiLo": "le-hsv-lo"
      }
    ]
  },
  "chuoi": [
    {
      "id": "md-00-tren-xe",
      "title": "Chủ nhật tuần 1: trên chuyến xe buýt lên Hà Nội",
      "canh": "xe-buyt",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chủ nhật, 08/09/2024 · Xe buýt lên Hà Nội"
        },
        {
          "type": "note",
          "text": "Ảnh bg-mvp-xe-buyt đã vẽ người chơi tựa cửa sổ, vali xanh dưới chân, khách trong xe, xe máy ngoài đường: lời dẫn không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xe vào nội thành lúc đầu giờ chiều. Tiếng còi xe máy dồn lên mỗi lúc một dày."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Vậy là lên Hà Nội thật rồi.)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xe chậm dần. Giọng phụ xe vọng xuống: \"Chấn Hưng! Ai xuống cổng Chấn Hưng chuẩn bị!\""
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Tới rồi. Xuống thôi.)"
        },
        {
          "type": "branch",
          "id": "go-with-md-00-xe-buyt",
          "asker": {
            "speaker": "player",
            "text": "Xuống xe"
          },
          "choices": [
            {
              "id": "go-md-00-xe-buyt",
              "text": "Xuống xe",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-00-xe-buyt"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-00-xe-buyt",
      "title": "Chủ nhật tuần 1: xuống xe buýt trước cổng trường",
      "canh": "cong-truong",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Tìm đường vào ký túc xá"
        },
        {
          "type": "reminder",
          "speaker": "player",
          "text": "Không biết ký túc xá ở chỗ nào nhỉ?"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Đại học Chấn Hưng · Cổng trường"
        },
        {
          "type": "note",
          "text": "Nền bg-mvp-cong-truong: cổng hai trụ, thanh chắn hạ, chốt bảo vệ, mái chờ xe buýt và quán nước bên trái; trên ảnh KHÔNG có người, KHÔNG có vali (người chơi là góc nhìn). Lời không nhắc vali, không nhắc người khác ở cổng."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Trường rộng thế này… Thôi, cứ theo đường chính vào xem.)"
        },
        {
          "type": "branch",
          "id": "go-with-md-00-cong-ktx",
          "asker": {
            "speaker": "player",
            "text": "Tới cổng ký túc xá"
          },
          "choices": [
            {
              "id": "go-md-00-cong-ktx",
              "text": "Tới cổng ký túc xá",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-00-cong-ktx"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-00-cong-ktx",
      "title": "Đi qua sân trường tới cổng ký túc xá",
      "canh": "cong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Nền bg-mvp-cong-ktx: cổng sắt xanh mở, dây cờ đuôi nheo, nhà xe bên trái, phòng trực bên phải; không có người, không có vali."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Dây cờ giăng tận cổng thế kia, chắc ký túc xá đây rồi.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Phòng mình là 408, tức là tầng bốn. Mong là có thang máy.)"
        },
        {
          "type": "branch",
          "id": "go-with-md-00-sanh-ktx",
          "asker": {
            "speaker": "player",
            "text": "Vào sảnh"
          },
          "choices": [
            {
              "id": "go-md-00-sanh-ktx",
              "text": "Vào sảnh",
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
      "title": "Sảnh tầng một dãy nhà giữa: dạy bấm vật",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Tìm đường lên phòng 408"
        },
        {
          "type": "reminder",
          "speaker": "player",
          "text": "Tầng bốn. Thang máy hay thang bộ đây?"
        },
        {
          "type": "note",
          "text": "Sảnh tầng một đông người ngày nhập học: tân sinh viên kéo vali, phụ huynh bê thùng. Bên trái là thang máy, trên tường là bảng tin của khu nhà. Lẫn trong đám đông bên phải có một tấm lưng áo xanh tình nguyện, mũ tai bèo đeo sau lưng: chi tiết ẩn, không có dấu, xem xong thang máy và bảng tin thì mới bấm được."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mát hẳn. Mà đông thế này… Giờ lên tầng bốn kiểu gì đây?)"
        },
        {
          "type": "explore",
          "id": "kp-sanh-ktx",
          "diem": [
            {
              "sprite": "obj-thong-bao-thang-may",
              "x": 10.5,
              "y": 38.5,
              "rong": 3.6,
              "chuoi": "md-00-thang-may",
              "sau": [],
              "nhan": "Xem tờ giấy trên cửa thang máy",
              "dau": "chinh"
            },
            {
              "sprite": "obj-so-do-ktx",
              "x": 44,
              "y": 35.5,
              "rong": 10,
              "chuoi": "md-00-so-do",
              "sau": [
                "md-00-thang-may"
              ],
              "nhan": "Xem bảng tin",
              "dau": "chinh"
            },
            {
              "sprite": "vung:lung-ao-xanh",
              "x": 87.5,
              "y": 44,
              "rong": 9,
              "chuoi": "md-00-thay-tung",
              "sau": [
                "md-00-thang-may",
                "md-00-so-do"
              ],
              "nhan": "Tấm lưng áo xanh giữa đám đông",
              "dau": "chinh"
            }
          ]
        }
      ]
    },
    {
      "id": "md-00-thang-may",
      "title": "Tờ giấy dán trên cửa thang máy",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tờ giấy dán ngay giữa cửa thang máy: \"Thang máy bảo trì đến hết tuần. Sinh viên vui lòng đi thang bộ.\""
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Hết tuần… Nghĩa là cả tuần leo bộ.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Thang bộ ở đâu nhỉ? Chắc bảng tin đằng kia có sơ đồ.)"
        }
      ]
    },
    {
      "id": "md-00-so-do",
      "title": "Sơ đồ khu nhà trên bảng tin",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bảng tin dán sơ đồ khu ký túc xá: ba dãy nhà, dãy giữa tô đỏ, có chấm \"Bạn đang ở đây\"."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Ơ, thế thang bộ nằm ở chỗ nào?)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Chịu rồi, phải hỏi thôi. Mà hỏi ai giữa đám đông này?)"
        },
        {
          "type": "task",
          "text": "Tìm người hỏi đường lên tầng bốn"
        },
        {
          "type": "reminder",
          "speaker": "player",
          "text": "Hỏi ai trong sảnh này được nhỉ?"
        }
      ]
    },
    {
      "id": "md-00-thay-tung",
      "title": "Chi tiết ẩn đầu tiên: một tấm lưng áo xanh giữa đám đông",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Ai cũng mới tới như mình. Có hỏi thì họ cũng chịu.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Khoan. Có một cái lưng áo xanh giữa đám đông, không kéo vali.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Nhìn kỹ xem đã.)"
        },
        {
          "type": "goto",
          "to": "md-00-tung-chi-duong"
        }
      ]
    },
    {
      "id": "md-00-tung-chi-duong",
      "title": "Thấy Tùng chỉ đường cho bạn nữ",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Bạn ơi... tòa KTX nữ đi đường nào ạ?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-chi-tay",
          "text": "À, KTX. Cậu cứ đi thẳng tới cuối đường, rẽ trái hai lần là tới nhé. Cứ kéo vali theo đường đấy là thấy!"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "relieved",
          "text": "Tớ cảm ơn."
        },
        {
          "type": "note",
          "text": "Bạn nữ kéo vali lạch cạch đi về hướng Tùng vừa chỉ."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Khoan. Hướng đó ra nhà xe cơ mà? Cậu áo xanh kia chỉ nhầm lối rồi.)"
        },
        {
          "type": "goto",
          "to": "md-00-soi-tung"
        }
      ]
    },
    {
      "id": "md-00-soi-tung",
      "title": "Soi cậu bạn áo xanh trước khi hỏi: bấm vào người rồi bấm vào áo",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-soi-tung-sanh",
          "kieu": "quan-sat",
          "nhanVat": "tung",
          "dang": "ao-xanh",
          "diem": [
            {
              "sprite": "vung:ao",
              "x": 66,
              "y": 45,
              "rong": 22,
              "chuoi": "md-00-soi-ao",
              "sau": [],
              "nhan": "Cái áo xanh"
            },
            {
              "sprite": "vung:mu",
              "x": 22,
              "y": 30,
              "rong": 20,
              "chuoi": "md-00-soi-mu",
              "sau": [],
              "nhan": "Cái mũ sau lưng"
            },
            {
              "sprite": "vung:to-giay",
              "x": 84,
              "y": 57,
              "rong": 22,
              "chuoi": "md-00-soi-to-giay",
              "sau": [],
              "nhan": "Tờ giấy trên tay"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Áo tình nguyện, mũ đi nắng, cầm sẵn sơ đồ. Người này biết đường. Hỏi cậu ấy.)"
        },
        {
          "type": "goto",
          "to": "md-00-gap-tung"
        }
      ]
    },
    {
      "id": "md-00-soi-ao",
      "title": "Soi cậu bạn áo xanh: cái áo",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Sơ mi xanh dài tay, trên ngực gắn lá cờ nhỏ. Áo của đội tình nguyện.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Ngày nhập học thì đây chắc là người đón tân sinh viên.)"
        }
      ]
    },
    {
      "id": "md-00-soi-mu",
      "title": "Soi cậu bạn áo xanh: cái mũ tai bèo",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mũ tai bèo đeo sau lưng, dây hằn trên cổ áo. Chắc cậu ấy đứng ngoài nắng cả buổi rồi.)"
        }
      ]
    },
    {
      "id": "md-00-soi-to-giay",
      "title": "Soi cậu bạn áo xanh: tờ giấy trên tay",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Một tờ sơ đồ gấp đôi, mép đã quăn. Cậu ấy cầm để chỉ đường cho người khác.)"
        }
      ]
    },
    {
      "id": "md-00-gap-tung",
      "title": "Hỏi đường cậu bạn áo xanh: tạo nhân vật",
      "canh": "sanh-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu ơi, cho tớ hỏi thang bộ ở đâu thế? Thang máy đang bảo trì."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Khuất sau hành lang kia kìa. Lần đầu ai cũng tìm không ra. Cậu lên tầng mấy?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tầng bốn, phòng 408."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-thinking",
          "text": "408 à… Để tớ dò danh sách đã."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cậu ấy lật mặt sau tờ sơ đồ. Một bảng xếp phòng in chữ bé tí, ngón tay dò từ dòng đầu xuống."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Dòng gần cuối kìa. 408, hai tên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-surprised",
          "text": "…Ơ, tên tớ đây. Thế là cùng phòng thật! Tớ là Tùng, học Du lịch."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cùng phòng á? Tớ tưởng cậu là anh năm hai, năm ba gì đấy, mặc áo tình nguyện thế kia."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Tớ năm nhất thôi. Nhập học đợt một, lên đây từ cuối tháng Tám."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Đội thiếu người dẫn đường khu ký túc, chú tớ làm bảo vệ nên giới thiệu tớ mượn áo ra phụ hai hôm."
        },
        {
          "type": "create-character",
          "truong": "ten",
          "asker": {
            "speaker": "tung",
            "expression": "ao-xanh",
            "text": "Thế cậu tên gì?"
          },
          "xucXac": "Ngại nghĩ thì để tớ gieo xúc xắc đặt hộ cho. Đảm bảo không xui.",
          "luaChon": []
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "{{nv.nguoi-choi}} à. Dễ gọi đấy. Cậu học ngành gì?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "{{nv.nguoi-choi.nganh}}."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Lại dân kinh tế à? Thế là phòng mình chẳng mống nào học Toán rồi, sau này biết bấu víu ai đây."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Du lịch mà cũng cần vở Toán à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-gai-dau",
          "text": "Kỳ hai dính môn Xác suất Thống kê mới cay chứ. Chưa học đã thấy điềm trượt rồi. Thôi, xách vali lên phòng đã!"
        },
        {
          "type": "branch",
          "id": "go-with-md-01-ktx",
          "asker": {
            "speaker": "player",
            "text": "Lên phòng 408"
          },
          "choices": [
            {
              "id": "go-md-01-ktx",
              "text": "Lên phòng 408",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-01-ktx"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-01-ktx",
      "title": "Phòng KTX 408, Chủ nhật chiều",
      "canh": "phong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Nhận phòng KTX"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Cất đồ xong tớ dẫn đi một vòng trường."
        },
        {
          "type": "note",
          "text": "Hai người khiêng vali lên tới tầng bốn, cùng thở dốc. Tùng đẩy cửa phòng 408."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thang bộ hẹp, mỗi tầng hai đợt dốc."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-chi-tay",
          "text": "Tớ cá là ba phút là tới tầng bốn. Thua tớ khao trà đá!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bảy phút sau, cả hai mới tới chiếu nghỉ tầng ba, đứng thở."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba phút của cậu dài nhỉ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-gai-dau",
          "text": "Vali cậu đựng gạch à? …Thôi, tớ nợ cậu một cốc trà đá."
        },
        {
          "type": "note",
          "text": "Tùng đẩy cửa phòng 408."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Tới nơi rồi. Cất đồ xong tớ dẫn đi một vòng trường."
        },
        {
          "type": "image",
          "imageId": "chibi-408-vali"
        },
        {
          "type": "image",
          "imageId": "chibi-vali-tho"
        },
        {
          "type": "branch",
          "id": "go-with-md-03-toa-b",
          "asker": {
            "speaker": "player",
            "text": "Ra sảnh tòa B"
          },
          "choices": [
            {
              "id": "go-md-03-toa-b",
              "text": "Ra sảnh tòa B",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-03-toa-b"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-03-toa-b",
      "title": "Sảnh tòa B: cái hộp tôn cũ",
      "canh": "sanh-toa-b",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Đi một vòng trường với Tùng"
        },
        {
          "type": "note",
          "text": "Sảnh tòa B, chiều Chủ nhật (nền sanh-toa-b, trên ảnh chưa có hộp). Bác Thịnh đứng ở chân cầu thang. Ảnh cái hộp CHỈ hiện sau khi Tùng chỉ tay (04/10: hiện ngay khi vào cảnh thì đột ngột, người chơi chưa biết vì sao mình ở đây)."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng dẫn đi hết dãy giảng đường, chỉ từng tòa như hướng dẫn viên. Chiều Chủ nhật, cả tòa B im phăng phắc, chỉ nghe tiếng dép hai đứa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-chi-tay",
          "text": "Tòa B đây. Học đại cương kiểu gì cậu cũng mòn gót ở đây."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Ơ, cái hộp cạnh cửa kia vẫn còn à?"
        },
        {
          "type": "image",
          "imageId": "obj-hop-kien-nghi-trong"
        },
        {
          "type": "note",
          "text": "Ngay sau ảnh obj-hop-kien-nghi-trong (khe trống, chưa có thẻ lịch): ảnh cho thấy cái hộp, lời không tả lại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Hộp kiến nghị đấy. Trường số hóa hết rồi mà vẫn treo cái hộp này nhỉ."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Hai cháu tìm phòng nào? Chiều Chủ nhật tòa này khóa hết lớp rồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Dạ không ạ, cháu dẫn bạn đi xem trường thôi."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Xem thì cứ xem. Mép hộp sắc đấy, đừng thò tay vào."
        },
        {
          "type": "branch",
          "id": "go-with-md-07-cong-ktx-toi",
          "asker": {
            "speaker": "player",
            "text": "Tới cổng KTX buổi tối"
          },
          "choices": [
            {
              "id": "go-md-07-cong-ktx-toi",
              "text": "Tới cổng KTX buổi tối",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-07-cong-ktx-toi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-07-cong-ktx-toi",
      "title": "Cổng KTX, tối: chú Cường",
      "canh": "cong-ktx-dem",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Tối. Hai người quẹt thẻ ở phòng trực cổng KTX. Nền tối bg-mvp-cong-ktx-dem (DX-02)."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Về tới cổng ký túc xá thì trời đã tối. Đèn phòng trực vẫn sáng."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Giờ này mới về à? Tùng dẫn bạn đi đâu cả buổi thế?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Bọn cháu đi xem trường ạ. Chú tớ đấy, {{nv.nguoi-choi}}. Chú trực ở đây lâu lắm rồi."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Chú là Cường. Cần gì thì cứ ra phòng trực gọi chú."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Chú ơi, qua nhà văn hóa cháu thấy poster CLB Thám Tử. Chú biết CLB đấy không?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "CLB đấy ngày xưa ghê lắm. Vụ mất xe, vụ gian lận thi, chúng nó đều moi ra bằng chứng."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Chẳng thần thánh gì, chịu khó đi hỏi rồi đối chiếu giấy tờ thôi. Nhưng giờ số hóa hết, ai nhờ sinh viên đi tra nữa."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Thứ Bảy có Ngày hội CLB, thích thì ra xem."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Thứ Bảy đi với tớ nhé?"
        },
        {
          "type": "image",
          "imageId": "chibi-chuyen-that"
        },
        {
          "type": "branch",
          "id": "go-with-md-08-tuan-cong-dan",
          "asker": {
            "speaker": "player",
            "text": "Đi sinh hoạt công dân"
          },
          "choices": [
            {
              "id": "go-md-08-tuan-cong-dan",
              "text": "Đi sinh hoạt công dân",
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
      "title": "Chuyển cảnh: tuần sinh hoạt công dân",
      "canh": "hoi-truong",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai 09/09 → thứ Sáu 13/09/2024 · Tuần sinh hoạt công dân"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tuần này tớ ngồi hàng ghế đầu, chép đủ từng chữ. Tớ cá luôn."
        },
        {
          "type": "image",
          "imageId": "chibi-ngu-gat"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Tư. Hàng ghế cuối. Tùng ngủ gục, cuốn sổ trên đùi mới chép được đúng dòng tiêu đề, bút vẫn kẹp trong tay."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Sáu, cả hội trường xếp hàng chụp ảnh thẻ. Ai cũng bảo ảnh mình xấu, rồi lén xem ảnh người đứng sau."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cả tuần ngồi hội trường nghe nội quy. Buổi cuối, mỗi người được phát một tấm thẻ lịch in theo khoa, dưới cùng có dòng \"Họ tên / Lớp\" để tự viết."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Viết tên vào luôn, kẻo lẫn với thẻ của ai.)"
        },
        {
          "type": "show-document",
          "documentId": "doc-the-lich-cua-toi"
        },
        {
          "type": "branch",
          "id": "go-with-md-09-ngay-hoi",
          "asker": {
            "speaker": "player",
            "text": "Dự ngày hội CLB"
          },
          "choices": [
            {
              "id": "go-md-09-ngay-hoi",
              "text": "Dự ngày hội CLB",
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
      "title": "Ngày hội CLB, thứ Bảy: lọc thử một lần",
      "canh": "nha-van-hoa",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Ghé bàn CLB Thám Tử"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Bàn Thám Tử ở góc kia. Tớ cá là vắng nhất sân."
        },
        {
          "type": "note",
          "text": "Nền nhà văn hóa ngày hội, sân đông sinh viên: gian Robotics bên trái đông nhất (bàn gấp trơn, xe robot tự chế, biển bìa vẽ tay bánh răng nhỏ), dọc bậc thềm là mấy gian CLB khác bàn trơn, mỗi gian vài người; bàn Thám Tử khăn trắng bên phải, một ghế gấp, bảng trống, không ai đứng gần."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sân nhà văn hóa đông nghịt. Gian Robotics có chiếc xe robot tự chế trên bàn, mấy bạn đứng chen nhau xem."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một anh đứng sau bàn rao to: \"Đang xin mở rộng xưởng thực hành, vào đội là có chỗ ngồi hàn mạch!\""
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bàn CLB Thám Tử nằm tận trong góc, chỉ có một chị ngồi trực."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tớ chỉ đi xem thôi nhé. Không đăng ký CLB nào đâu, năm nhất phải lo học."
        },
        {
          "type": "image",
          "imageId": "chibi-ngay-hoi"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mười phút sau, trên tay Tùng có bốn tờ đăng ký, một cái quạt giấy của CLB Guitar và nửa cái bánh rán của CLB Nấu ăn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chị ơi, đây là bàn CLB Thám Tử ạ? Chị là thành viên ở đây ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ừ. Chị trực bàn hôm nay."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "CLB mình đang điều tra vụ nào không chị?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Không em ạ. Hồ sơ giờ tra trên hệ thống là ra hết. Mấy kiểu điều tra ngày xưa hết đất diễn rồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thế giờ CLB chuyên điều tra… mật khẩu Wi-Fi ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Tấu hài giỏi đấy em. Muốn diễn hài thì sang bàn CLB Kịch Nghệ bên kia, còn muốn giải mã thật thì điền phiếu này."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ghi rõ ngành với mã sinh viên vào nhé."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thẻ bọn em đang đeo là thẻ tạm, chưa in mã chị ạ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Đoàn trường có gửi danh sách tân sinh viên khóa này, mã nằm trong đấy. Tra xong là chị xóa khỏi máy."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng cúi xuống gõ phím vài giây rồi điền một mạch."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Mã này của một bạn Tùng học Kế toán. Phiếu em lại ghi ngành Du lịch?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Dạ vâng, em Tùng Du lịch ạ… Tên trong này na ná nhau, em nhìn nhầm dòng."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Để chị dò lại từng dòng vậy."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chị cho em thử lọc một cái được không ạ?"
        },
        {
          "type": "trial-filter",
          "id": "lt-ngay-hoi",
          "sql": "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE nganh = 'Du lịch' AND ten = 'Tùng';",
          "soDong": 1,
          "chon": {
            "cot": "ma_sv",
            "giaTri": "SV240251"
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ngành Du lịch lọc ra còn mấy chục bạn. Thêm tên Tùng thì đúng một người. Mã ở ô đầu: SV240251."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng dán tờ giấy ghi mã lên phiếu, chép lại từng số."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "…Nhanh thật. Tối thứ Ba Trung thu, CLB liên hoan ở sân ký túc xá. Hai em tới nhé."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Lại cậu. Hôm nhập học tớ dò bảng xếp phòng cũng chậm hơn cậu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bảy giờ tối nhé. Tới muộn thì hết bánh đấy."
        },
        {
          "type": "branch",
          "id": "go-with-md-10-trung-thu",
          "asker": {
            "speaker": "player",
            "text": "Xuống sân phá cỗ Trung thu"
          },
          "choices": [
            {
              "id": "go-md-10-trung-thu",
              "text": "Xuống sân phá cỗ Trung thu",
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
      "id": "md-10-gap-duy",
      "title": "Trung thu: người chơi tự tới chào anh đang buộc chân bàn gấp",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-soi-duy",
          "kieu": "quan-sat",
          "nhanVat": "duy",
          "diem": [
            {
              "sprite": "vung:chia-khoa",
              "x": 45,
              "y": 90,
              "rong": 14,
              "chuoi": "md-10-soi-duy-chia",
              "sau": [],
              "nhan": "Chùm chìa khóa"
            },
            {
              "sprite": "vung:ho-so",
              "x": 31,
              "y": 68,
              "rong": 22,
              "chuoi": "md-10-soi-duy-ho-so",
              "sau": [],
              "nhan": "Tập bìa giấy"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Rảnh tay thì giữ hộ anh cái chân bàn này với. Buộc mãi nó vẫn sụp."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Vâng, để em giữ."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Được rồi đấy. Anh là Duy, năm hai, ở CLB từ năm nhất."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Anh đi liên hoan mà cũng mang cả tập hồ sơ ạ?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Sổ mượn đồ. Bàn này của phòng CLB, mai phải trả đủ bốn chân."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Trà ở đầu bàn, mấy đứa tự rót nhé."
        }
      ]
    },
    {
      "id": "md-10-soi-duy-chia",
      "title": "Quan sát Duy: chùm chìa khóa ở thắt lưng",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Chùm chìa khóa móc ở thắt lưng. Cái nào cũng dán một mẩu băng dính ghi chữ.)"
        }
      ]
    },
    {
      "id": "md-10-soi-duy-ho-so",
      "title": "Quan sát Duy: tập bìa giấy kẹp nách",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Tập bìa giấy kẹp nách, mép vuốt phẳng phiu. Đi liên hoan mà vẫn mang theo.)"
        }
      ]
    },
    {
      "id": "md-10-gap-ha-vy",
      "title": "Trung thu: người chơi tự tới chào bạn nữ đứng tách ra cạnh bảng tin",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-soi-ha-vy",
          "kieu": "quan-sat",
          "nhanVat": "ha-vy",
          "diem": [
            {
              "sprite": "vung:sach",
              "x": 57,
              "y": 56,
              "rong": 26,
              "chuoi": "md-10-soi-vy-sach",
              "sau": [],
              "nhan": "Tập giấy trên tay"
            },
            {
              "sprite": "vung:kinh",
              "x": 52,
              "y": 24,
              "rong": 30,
              "chuoi": "md-10-soi-vy-kinh",
              "sau": [],
              "nhan": "Cặp kính"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu nhìn tớ lâu thế. Từ tập giấy tới cái kính rồi đấy."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "À… cậu cũng vào CLB à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mới đăng ký. Tớ là Hà Vy, Toán ứng dụng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hôm Ngày hội tớ không thấy cậu ở bàn CLB."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tớ điền form trên mạng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Toán! Thế là tớ có người cho mượn vở rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mượn thì được, chép thì không."
        }
      ]
    },
    {
      "id": "md-10-soi-vy-sach",
      "title": "Quan sát Hà Vy: tập giấy ôm trước ngực",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mấy tờ giấy in ôm sát trước ngực. Qua mép giấy thấy dòng tiêu đề in đậm: \"Sherlock Holmes\".)"
        }
      ]
    },
    {
      "id": "md-10-soi-vy-kinh",
      "title": "Quan sát Hà Vy: cặp kính",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Gọng kính mảnh. Bạn ấy nhìn ai cũng lâu hơn người khác một nhịp.)"
        }
      ]
    },
    {
      "id": "md-10-trung-thu",
      "title": "Sân KTX, thứ Ba 17/09 19h: CLB gặp mặt lần đầu",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Tới sân ký túc xá gặp CLB tối Trung thu"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bảy giờ tối thứ Ba, sân ký túc xá. Nhớ tới ăn bánh."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 17/09/2024 · 19:00 · Sân ký túc xá"
        },
        {
          "type": "note",
          "text": "Ảnh nền đã có dây đèn lồng, bàn bánh, đèn cá chép, gian Robotics: lời dẫn không tả lại (04/10). Sau câu Minh Anh, người chơi tự bấm vào Duy (cạnh bàn bánh) và Hà Vy (mép phải sân) để làm quen."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tiếng trống lân tập dồn từng nhịp, át cả tiếng nói chuyện."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Hai em tới đúng giờ. Chị là Minh Anh, chủ nhiệm CLB."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mọi người tới cả rồi đấy. Đi chào một vòng đi, lát chị gọi."
        },
        {
          "type": "task",
          "text": "Đi chào mọi người trong CLB"
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
              "nhan": "Anh cạnh bàn bánh",
              "dau": "chinh"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 86,
              "y": 100,
              "rong": 14,
              "chuoi": "md-10-gap-ha-vy",
              "sau": [],
              "nhan": "Bạn nữ đeo kính",
              "dau": "chinh"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thế cậu đoán được tớ học ngành gì không?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Để xem. Cậu thử nhìn đồ Tùng mang theo đi."
        },
        {
          "type": "explore",
          "id": "kp-soi-tung",
          "kieu": "quan-sat",
          "nhanVat": "tung",
          "haVySoi": true,
          "diem": [
            {
              "sprite": "vung:ban-do",
              "x": 82,
              "y": 56,
              "rong": 24,
              "chuoi": "md-10-soi-ban-do",
              "sau": [],
              "nhan": "Tờ giấy trên tay"
            },
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
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cầm bản đồ nhàu, thuộc đường, thích dẫn người khác đi. Du lịch chứ gì."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ đúng! Sao cậu biết?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Bản đồ thì có ích. Còn cái áo không in tên khoa thì tớ chịu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Còn cậu… {{nv.nguoi-choi.nganh}} đúng không?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ơ, Tùng mách cậu à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tùng còn đang bận nhìn cái đĩa bánh."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Phiếu đăng ký cậu gấp trong túi áo, ô ngành học vẫn lộ ra một góc."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Đúng là dân Toán, mắt tinh như cú vọ. Tớ nhìn lướt qua chẳng thấy gì."
        },
        {
          "type": "goto",
          "to": "md-10-gap-hoai"
        }
      ]
    },
    {
      "id": "md-10-gap-hoai",
      "title": "Hoài xuất hiện hỏi đường",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Cậu áo xanh ơi..."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Cậu gọi tớ à?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "Hôm nhập học cậu chỉ tớ ra nhà xe, nhưng tớ hỏi người khác tìm được đường lên phòng rồi. Cảm ơn cậu nhé."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ơ... tớ chỉ nhầm à? Tớ xin lỗi, tớ không cố ý đâu!"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Cho tớ hỏi... phòng máy in của trường ở đâu vậy? Tớ cần in bài tập."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Máy in à? Ờ... cậu vòng ra sau dãy nhà này, rẽ phải, đi qua căng tin là tới phòng Đào tạo. Có máy in ở đó."
        },
        {
          "type": "note",
          "text": "Hà Vy khẽ nheo mắt nhìn Tùng."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "relieved",
          "text": "Tớ là Hoài, lớp BC24A. Cảm ơn cậu nhiều."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tớ là Tùng. Lần này tớ thề tớ không chỉ nhầm nữa đâu."
        },
        {
          "type": "image",
          "imageId": "chibi-clb-nhom"
        },
        {
          "type": "goto",
          "to": "md-10-mat-banh"
        }
      ]
    },
    {
      "id": "md-10-mat-banh",
      "title": "Một chiếc bánh nướng biến mất khỏi đĩa của CLB",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Tìm chiếc bánh nướng của CLB"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Ai cũng nhìn quanh bàn thôi. Thử để ý dưới đất xem."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Ơ, đĩa bánh ban nãy chị nhớ có bốn cái cơ mà? Thiếu mất một cái rồi này."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ơ tớ thề tớ mới rót trà chứ chưa kịp đụng vào bánh đâu nhé!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đừng đoán vội. Cứ tìm xung quanh xem có rơi rớt đâu không."
        },
        {
          "type": "explore",
          "id": "kp-banh-trung-thu",
          "diem": [
            {
              "sprite": "vung:dia-banh",
              "x": 11,
              "y": 70,
              "rong": 15,
              "chuoi": "md-10-dia-banh",
              "sau": [],
              "nhan": "Đĩa bánh trên bàn gấp",
              "dau": "chinh"
            },
            {
              "sprite": "vung:vun-banh",
              "x": 36,
              "y": 81,
              "rong": 10,
              "chuoi": "md-10-vun-banh",
              "sau": [],
              "nhan": "Nền sân gần bàn",
              "dau": "chinh"
            },
            {
              "sprite": "vung:den-ca-chep",
              "x": 42,
              "y": 68,
              "rong": 15,
              "chuoi": "md-10-den-ca-chep",
              "sau": [],
              "nhan": "Đèn cá chép đỏ",
              "dau": "chinh"
            },
            {
              "sprite": "vung:doi-dep",
              "x": 46,
              "y": 80,
              "rong": 8,
              "chuoi": "md-10-doi-dep",
              "sau": [],
              "nhan": "Đôi dép bên chiếc đèn",
              "dau": "chinh"
            },
            {
              "sprite": "vung:dau-lan",
              "x": 42,
              "y": 44,
              "rong": 9,
              "chuoi": "md-10-dau-lan",
              "sau": [],
              "nhan": "Đầu lân trên sân khấu"
            },
            {
              "sprite": "vung:gian-robotics",
              "x": 74,
              "y": 50,
              "rong": 17,
              "chuoi": "md-10-gian-robotics",
              "sau": [],
              "nhan": "Gian đèn ông sao",
              "dau": "phu"
            },
            {
              "sprite": "vung:balo-banh-rang",
              "x": 77,
              "y": 70,
              "rong": 8,
              "chuoi": "md-10-balo-banh-rang",
              "sau": [],
              "nhan": "Balo trên ghế xanh"
            },
            {
              "sprite": "vung:ap-phich",
              "x": 89,
              "y": 38,
              "rong": 9,
              "chuoi": "md-10-ap-phich",
              "sau": [],
              "nhan": "Áp phích trên bảng tin"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 58,
              "y": 100,
              "rong": 14,
              "chuoi": "md-10-ha-vy-goi",
              "sau": [],
              "nhan": "Hà Vy",
              "dau": "phu"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Có vài thứ hơi lạ. Cậu thử xâu chuỗi lại xem."
        },
        {
          "type": "goto",
          "to": "md-10-hoi-banh"
        }
      ]
    },
    {
      "id": "md-10-hoi-banh",
      "title": "Đoán ai lấy bánh từ những gì vừa thấy",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "branch",
          "id": "r-ai-lay-banh",
          "asker": {
            "speaker": "ha-vy",
            "text": "Theo cậu, ai lấy chiếc bánh nướng?"
          },
          "choices": [
            {
              "id": "tre-con",
              "text": "Một đứa trẻ lấy.",
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
              "text": "Tùng lấy.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-10-doan-tung"
                }
              ]
            },
            {
              "id": "robotics",
              "text": "Người ở gian Robotics lấy.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "md-10-doan-robotics"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "md-10-doan-tung",
      "title": "Tùng bị nghi oan",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Tùng lấy chăng? Cậu ấy đứng cạnh bàn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ơ kìa. Tớ chia trà còn chưa uống ngụm nào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng đặt cốc xuống, quay mặt đi. Cả nhóm nhìn nhau, chẳng ai ăn tiếp."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Căn cứ vào đâu? Đứng gần bàn chưa đủ đâu."
        },
        {
          "type": "goto",
          "to": "md-10-hoi-banh"
        }
      ]
    },
    {
      "id": "md-10-doan-robotics",
      "title": "Chủ gian Robotics bị nghi oan",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Hay có bạn nào bên gian Robotics sang lấy? Gian đấy ngay sát bàn mình."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Bên họ đang đông khách, ai cũng bận tay bận chân. Đừng đoán mò khi chưa có chứng cứ."
        },
        {
          "type": "goto",
          "to": "md-10-hoi-banh"
        }
      ]
    },
    {
      "id": "md-10-doan-dung",
      "title": "Chiếc bánh và chiếc đèn cá chép",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Đôi dép bé tí cạnh đèn cá chép, với vệt vụn bánh kéo từ bàn ra. Một đứa trẻ đã lấy bánh."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đúng lúc ấy, một bé gái kéo chiếc đèn cá chép chạy từ sau sân khấu ra. Má dính vụn bánh, tay cầm nửa chiếc bánh nướng."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Na! Bố dặn muốn ăn thì xin các anh chị cơ mà."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Bé cứ cầm ăn đi nhé. Nãy giờ bọn chị cứ thắc mắc mãi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Phù, may quá giải oan cho tớ rồi nhé! Tí chia bánh tớ phải được miếng to nhất."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Quan sát tốt đấy. Lần theo vệt vụn bánh với đôi dép là ra ngay."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thứ Hai tới, bốn giờ qua phòng CLB dọn tủ nhé. Buổi sinh hoạt thứ hai của mình."
        },
        {
          "type": "branch",
          "id": "go-with-md-11-phong-clb",
          "asker": {
            "speaker": "player",
            "text": "Tới phòng CLB"
          },
          "choices": [
            {
              "id": "go-md-11-phong-clb",
              "text": "Tới phòng CLB",
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
      "title": "Thứ Hai 23/09, 16h: dọn phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Dọn tủ hồ sơ cùng CLB"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ngăn dưới cùng của tủ hồ sơ từ năm ngoái chưa ai mở."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai, 23/09/2024 · 16:00 · Phòng CLB"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hôm nay dọn tủ hồ sơ. Ngăn dưới cùng từ năm ngoái chưa ai đụng tới."
        },
        {
          "type": "explore",
          "id": "kp-phong-md11",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 15,
              "y": 100,
              "rong": 15,
              "chuoi": "md-11-duy",
              "sau": [],
              "nhan": "Duy: máy bàn",
              "dau": "phu"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 38,
              "y": 100,
              "rong": 15,
              "chuoi": "md-11-vy",
              "sau": [],
              "nhan": "Hà Vy: cuốn sổ",
              "dau": "phu"
            },
            {
              "sprite": "nv:minh-anh",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "md-11-minh-anh",
              "sau": [],
              "nhan": "Minh Anh: tờ lịch",
              "dau": "phu"
            },
            {
              "sprite": "nv:tung",
              "x": 82,
              "y": 100,
              "rong": 15,
              "chuoi": "md-11-tung",
              "sau": [],
              "nhan": "Tùng",
              "dau": "phu"
            },
            {
              "sprite": "vung:tu-ho-so",
              "x": 95.5,
              "y": 60,
              "rong": 7,
              "chuoi": "md-11-tu",
              "sau": [],
              "nhan": "Tủ hồ sơ",
              "dau": "chinh"
            }
          ]
        },
        {
          "type": "show-document",
          "documentId": "doc-so-chi-linh"
        },
        {
          "type": "notebook-lookup",
          "trang": "kiem-hai-lan",
          "phan": "tâm đắc"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Sổ của CLB đấy, khóa nào cũng chép thêm vài trang. Mấy trang đầu mực xanh là từ hồi mới lập. Năm nay em giữ."
        },
        {
          "type": "show-document",
          "documentId": "doc-bao-cao-yeu"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Báo cáo năm ngoái đây. Kết luận đúng hai chữ: \"hoạt động yếu\"."
        },
        {
          "type": "goto",
          "to": "md-11-la-thu"
        }
      ]
    },
    {
      "id": "md-11-duy",
      "title": "Phòng CLB: Duy gõ máy bàn",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Anh đang chép lại sổ mượn đồ hôm Trung thu. Bàn gấp trả đủ bốn chân, ghế nhựa thì thiếu một cái."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Ai cầm về phòng thì mai mang trả nhé. Anh không ghi tên đâu… lần này thôi."
        }
      ]
    },
    {
      "id": "md-11-vy",
      "title": "Phòng CLB: Hà Vy ghi sổ",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tớ chép lại vụ chiếc bánh hôm Trung thu. Ai đứng đâu, lúc mấy giờ."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ghi cả giờ á?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Không ghi thì một tuần nữa mỗi người nhớ một kiểu."
        }
      ]
    },
    {
      "id": "md-11-minh-anh",
      "title": "Phòng CLB: Minh Anh soạn lịch sinh hoạt",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị đang soạn lịch sinh hoạt. Từ tháng sau, thứ Tư nào cũng họp, bốn giờ chiều."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Đông thế này thì năm nay phòng không còn vắng nữa."
        }
      ]
    },
    {
      "id": "md-11-tung",
      "title": "Phòng CLB: Tùng ngồi trông ghế",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Dọn tủ cứ để anh Duy với cậu. Tớ mà gặp bụi là hắt xì cả buổi."
        }
      ]
    },
    {
      "id": "md-11-tu",
      "title": "Phòng CLB: ngăn dưới cùng của tủ hồ sơ",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Ngăn dưới cùng không kéo ra được. Khóa.)"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Khóa đấy, để anh mở cho."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy tháo chùm chìa ở thắt lưng, dò mấy mẩu băng dính, tới chìa thứ ba mới mở được. Một đám bụi bay lên làm Tùng ho sặc."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ngăn này anh chưa kiểm kê. Cứ lôi hết ra bàn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Lôi cả mấy tờ lót dưới đáy ngăn ra nữa nhé."
        }
      ]
    },
    {
      "id": "md-11-la-thu",
      "title": "Phòng CLB, 16h40: bản sao lá thư và giấy mời",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Minh Anh ra ngoài rồi quay lại với hai tờ giấy: thông báo lịch họp rà soát và bản chụp thư đã che thông tin. Nhà trường đã tiếp nhận thư sáng 16/09 và xử lý trước khi chuyển bản sao cho CLB."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bốn rưỡi, cô Lan bên Phòng Công tác sinh viên gọi chị Minh Anh lên. Mười phút sau chị quay về, tay cầm hai tờ giấy có đóng dấu."
        },
        {
          "type": "note",
          "text": "Chị Minh Anh ngồi xuống ghế, hai tay đan trước mặt; tờ thư đặt ngay trên bàn."
        },
        {
          "type": "image",
          "imageId": "cg-minh-anh-dan-tay"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Thứ Hai tuần sau, 30/09, phòng mình bị đưa ra họp rà soát."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Trường nhận được thư ở hộp kiến nghị sáng 16/09. Giờ họ mới chuyển bản sao cho CLB, kèm giấy mời họp. Tên người gửi bị che."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "serious",
          "text": "Nếu mất phòng, CLB sẽ vào diện chờ giải thể. Hết học kỳ mà chưa có phòng thì giải tán, nộp sổ sách về Hội sinh viên."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy xoay laptop sang. Mục đặt phòng tháng tới trên hệ thống bị phủ xám, báo dòng \"Chờ kết quả rà soát\"."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Chưa họp mà đã chặn đặt phòng rồi?"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tờ lịch sinh hoạt chị Minh Anh vừa viết còn nằm cạnh bàn phím."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Em vừa nhận mail, chị ạ. Cả sao kê quỹ cũng phải gửi cho Hội sinh viên kiểm tra."
        },
        {
          "type": "image",
          "imageId": "chibi-la-thu"
        },
        {
          "type": "show-document",
          "documentId": "doc-thu-che"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chữ ký lượn thế này, đọc được mỗi chữ H… mà lại còn \"đề nghị phản hồi chính thức\"."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Cuối trang còn sót một dòng chữ bé tí, bị xén mất nửa. Trông như tên tệp.)"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-chu-ky-h"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Đủ năm người thì CLB chưa bị giải thể ngay. Nhưng phòng vẫn bị xét: báo cáo đã yếu, giờ thêm lá thư này."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thầy Quang, phó hiệu trưởng, đồng ý cho CLB tới buổi họp tuần sau để tự tìm căn cứ bảo vệ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Thế giờ mình bắt đầu từ đâu ạ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Khoan, tính lại đã. Trong tay mình mới có một chữ H với cái hộp kiến nghị."
        },
        {
          "type": "note",
          "text": "Chị Minh Anh nhìn Tùng, chỉ hai ngón tay vào thái dương như nhắc cậu nghĩ kỹ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Thì bắt đầu từ cái hộp. Nói có sách, mách có chứng. Mai ra sảnh tòa B."
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Một tuần tìm căn cứ. Mai bắt đầu từ cái hộp ở tòa B."
        }
      ]
    },
    {
      "id": "md-10-soi-ban-do",
      "title": "Quan sát Tùng: tờ bản đồ trên tay",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Bản đồ trường gấp nhiều nếp, có mấy chỗ khoanh bút đỏ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mới học một tuần mà bản đồ đã nhàu thế kia. Cậu ấy dùng nó hằng ngày để dẫn đường."
        }
      ]
    },
    {
      "id": "md-10-soi-ao",
      "title": "Quan sát Tùng: cái áo",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Áo thể thao màu lam, không in tên khoa nào."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Áo này thì chịu, chẳng đoán được gì."
        }
      ]
    },
    {
      "id": "md-10-soi-mui",
      "title": "Quan sát Tùng: miếng băng trên mũi",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Miếng băng cá nhân trên sống mũi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hôm khuân đồ cho tân sinh viên tớ đập mặt vào cổng sắt ký túc. Đội tình nguyện đón tân sinh viên mà!"
        }
      ]
    },
    {
      "id": "md-10-dia-banh",
      "title": "Đĩa bánh hụt một chiếc",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đĩa trên bàn gấp chỉ còn ba chiếc bánh. Chỗ trống trên đĩa còn dính vụn.)"
        }
      ]
    },
    {
      "id": "md-10-vun-banh",
      "title": "Vệt vụn trên sân",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Vụn bánh rơi thành vệt mảnh từ chân bàn chạy ra chỗ đèn cá chép.)"
        }
      ]
    },
    {
      "id": "md-10-den-ca-chep",
      "title": "Đèn cá chép nằm lệch",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đèn cá chép đỏ nằm lệch trên sân. Dây kéo căng về phía sau sân khấu.)"
        }
      ]
    },
    {
      "id": "md-10-doi-dep",
      "title": "Đôi dép nhựa nhỏ",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đôi dép nhựa trẻ con màu vàng để cạnh chiếc đèn. Quanh đây có trẻ nhỏ chạy chơi à?)"
        }
      ]
    },
    {
      "id": "md-10-dau-lan",
      "title": "Đầu lân chờ biểu diễn",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Đầu lân quẳng chỏng chơ giữa sân khấu, chắc đội múa lân lại kéo nhau đi mua nước rồi."
        }
      ]
    },
    {
      "id": "md-10-gian-robotics",
      "title": "Gian Robotics bán đèn LED",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Gian Robotics đông khách phết. Mấy cái đèn ông sao họ tự hàn mạch LED nhấp nháy bán chạy ghê."
        }
      ]
    },
    {
      "id": "md-10-balo-banh-rang",
      "title": "Balo đen trên ghế nhựa xanh",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Balo đen đặt trên ghế nhựa. Quai có huy hiệu kim loại hình bánh răng, sứt một răng.)"
        }
      ]
    },
    {
      "id": "md-10-ap-phich",
      "title": "Áp phích trên bảng tin",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Áp phích Trung thu dán chèn cả lên bảng tin trường. Dán vội thế này khéo mai lại bong ra."
        }
      ]
    },
    {
      "id": "md-10-ha-vy-goi",
      "title": "Hà Vy đứng bên mép sân",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đám đông mải nhìn lên sân khấu. Cậu thử cúi xuống tìm dấu vết xem."
        }
      ]
    },
    {
      "id": "n1-mo",
      "title": "Sáng ngày 1: Tùng rủ ra tòa B",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 24/09/2024"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Hộp kiến nghị tòa B thì nhớ rồi! Hôm đầu tới trường tớ với {{nv.nguoi-choi}} vừa đi qua nó."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ngồi đây đoán thì được gì. Ra tận nơi xem đã."
        },
        {
          "type": "branch",
          "id": "go-with-n1-toa-b",
          "asker": {
            "speaker": "player",
            "text": "Đi cùng Tùng ra tòa B"
          },
          "choices": [
            {
              "id": "go-n1-toa-b",
              "text": "Đi cùng Tùng ra tòa B",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n1-toa-b"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n1-toa-b",
      "title": "Sảnh tòa B: cái hộp, bác bảo vệ, tờ thông báo",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "task",
          "text": "Ai đã bỏ lá thư vào cái hộp này?"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Chưa biết là ai, lớp nào. Quanh hộp này có manh mối gì không?"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều thứ Ba, sảnh tòa B vắng tanh. Bác bảo vệ đứng ở chân cầu thang. Cạnh cái hộp tôn có một tờ giấy mới dán."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Nhiều thứ quá… Bắt đầu từ đâu đây.)"
        },
        {
          "type": "explore",
          "id": "kp-toa-b",
          "diem": [
            {
              "sprite": "obj-hop-kien-nghi",
              "x": 35.2,
              "y": 45.5,
              "rong": 3.4,
              "chuoi": "n1-hop",
              "sau": [],
              "nhan": "Soi khe hộp kiến nghị",
              "dau": "chinh"
            },
            {
              "sprite": "nv:bac-tu",
              "x": 78,
              "y": 100,
              "rong": 16,
              "chuoi": "n1-bac-thinh",
              "sau": [],
              "nhan": "Hỏi bác bảo vệ",
              "dau": "chinh"
            },
            {
              "sprite": "obj-thong-bao-hop",
              "x": 40.5,
              "y": 43.5,
              "rong": 2.6,
              "chuoi": "n1-thong-bao-hop",
              "sau": [],
              "nhan": "Đọc thông báo dán trên bảng tin",
              "dau": "chinh"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Sáng thứ Hai chỉ có sinh viên sinh hoạt ở đây ra vào. Thẻ lịch lại của khoa Báo chí."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Lớp nào vừa sinh hoạt ở tòa B, vừa học Báo chí? Khoanh được lớp là bớt được cả trường."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tìm kiểu gì? CLB mình làm gì có danh sách sinh viên!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chị Minh Anh làm đơn rồi. Mai có tài khoản."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lớp nào vừa ở tòa B, vừa học Báo chí? Mai có tài khoản rồi tính."
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "n1-hop",
      "title": "Khe hộp: mẩu thẻ lịch rách",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "note",
          "text": "Mắc ở mép tôn khe hộp là một tấm thẻ lịch, phần in còn nguyên \"Khoa Báo chí – Truyền thông · K24\", dòng viết tay \"Họ tên / Lớp\" bị xé mất."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mắc ở mép khe hộp là một góc thẻ lịch. Phần in còn rõ: \"Khoa Báo chí – Truyền thông · K24\". Dòng ghi \"Họ tên / Lớp\" đã bị xé mất."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thẻ lịch Tuần sinh hoạt công dân… giống hệt thẻ của tớ, chỉ khác mỗi tên khoa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là tên chủ thẻ nằm đúng ở mẩu bị rách! Đen thật."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoan, tính lại đã. Thẻ mắc ở khe chưa chắc là của người bỏ thư."
        },
        {
          "type": "save-evidence",
          "evidenceId": "ev-the-lich"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-bao-chi-k24"
            }
          ]
        }
      ]
    },
    {
      "id": "n1-bac-thinh",
      "title": "Bác Thịnh kể lúc mở hộp",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Cháu hỏi cái hộp à? Chín giờ sáng thứ Hai, bác với cô Lan bên Công tác sinh viên mở. Thư nằm trên cùng."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Nằm trên cùng… tức là được bỏ vào sau cùng ạ?"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Chắc thế. Mười một rưỡi đêm Chủ nhật bác khóa cửa, ngó qua khe thấy trống trơn."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Bảy giờ sáng thứ Hai bác mới mở cửa tòa này."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Từ đó tới lúc mở hộp, toàn sinh viên các lớp sinh hoạt ở đây ra vào thôi."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Đứa nào bỏ thì bác chịu. Đông thế bác nhớ sao nổi."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-toa-b"
            }
          ]
        }
      ]
    },
    {
      "id": "n1-thong-bao-hop",
      "title": "Thông báo lịch họp rà soát",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Họp rà soát phòng sinh hoạt CLB: 16:00 thứ Hai 30/09.\" Dán ngay cạnh hộp luôn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Dán tơ hơ thế này! Ai đi qua cũng đọc được. Cả trường sắp biết CLB mình bị đòi phòng rồi."
        },
        {
          "type": "show-document",
          "documentId": "doc-thong-bao-hop"
        }
      ]
    },
    {
      "id": "n2-mo",
      "title": "Sáng ngày 2: lên phòng Đào tạo",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "task",
          "text": "Sang Phòng Đào tạo nhận tài khoản tra cứu"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Tư, 25/09/2024"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Đơn xin quyền tra cứu, thầy Quang duyệt rồi. Lát nữa sang Phòng Đào tạo, cô Hạnh sẽ cấp tài khoản."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Laptop CLB đây. Em cầm theo rồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Có tài khoản là tra được hết hả chị? Tớ cá là tìm ra ngay!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Được xem đúng quyền thôi. Tới đó hỏi cô là rõ."
        },
        {
          "type": "explore",
          "id": "kp-bd-n2",
          "kieu": "ban-do",
          "gio": "09:30",
          "diem": [
            {
              "sprite": "ghim:toa-hanh-chinh",
              "x": 21,
              "y": 54,
              "rong": 5,
              "chuoi": "n2-co-hanh",
              "sau": [],
              "nhan": "Phòng Đào tạo",
              "dau": "chinh",
              "co": [
                "co-hanh"
              ]
            },
            {
              "sprite": "ghim:toa-b",
              "x": 48,
              "y": 29,
              "rong": 5,
              "chuoi": "n2-bd-toa-b",
              "sau": [],
              "nhan": "Sảnh tòa B",
              "dau": "phu",
              "co": [
                "bac-tu"
              ]
            },
            {
              "sprite": "ghim:cang-tin",
              "x": 88,
              "y": 41,
              "rong": 5,
              "chuoi": "n2-bd-cang-tin",
              "sau": [],
              "nhan": "Căng tin",
              "dau": "phu"
            },
            {
              "sprite": "ghim:nha-clb",
              "x": 45,
              "y": 17,
              "rong": 5,
              "chuoi": "n2-phong",
              "sau": [
                "n2-co-hanh"
              ],
              "nhan": "Phòng CLB",
              "dau": "chinh"
            }
          ]
        }
      ]
    },
    {
      "id": "n2-co-hanh",
      "title": "Cô Hạnh tạo tài khoản CLB (chỉ bảng lớp)",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "task",
          "text": "Tài khoản của CLB được xem những gì?"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Được xem đúng quyền thôi. Tới đó hỏi cô là rõ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên đường sang tòa hành chính."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Đi tắt qua sân bóng rổ, nhanh hơn ba phút. Tớ dẫn đường cho!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu đo cả thời gian đi bộ à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Hướng dẫn viên thì phải thuộc đường chứ. Còn cậu đi sau cứ lẩm nhẩm, tớ cá là lại đếm bậc cầu thang!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hai mươi hai bậc. Tật từ bé rồi, đi đâu cũng đếm."
        },
        {
          "type": "explore",
          "id": "kp-toi-n2-co-hanh",
          "diem": [
            {
              "sprite": "nv:co-hanh",
              "x": 40,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-co-hanh-vao",
              "sau": [],
              "nhan": "Cô ở quầy",
              "dau": "chinh"
            },
            {
              "sprite": "vung:lich",
              "x": 69,
              "y": 25,
              "rong": 5,
              "chuoi": "n2-co-hanh-an",
              "sau": [],
              "nhan": "Tờ lịch treo tường"
            }
          ]
        }
      ]
    },
    {
      "id": "n2-co-hanh-vao",
      "title": "Tới nơi: Cô Hạnh tạo tài khoản CLB (chỉ bảng lớp)",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Cô tạo cho CLB một tài khoản, tên là clb_tham_tu."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Tài khoản này chỉ xem được bảng lớp sinh hoạt: mã lớp, ngành, khóa, tòa nhà. Trong đấy không có tên ai cả."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bảng lớp sinh hoạt là một tệp Excel to hả cô?"
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Gần thế. Em cứ hình dung cuốn sổ điểm danh: kẻ sẵn mấy cột trên đầu, mỗi dòng bên dưới là một lớp. Cột nói lớp ấy có gì: mã lớp, ngành, khóa, tòa nhà. Có lớp mới thì thêm một dòng, chứ cột không đổi."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Trường có vài chục bảng như thế, mỗi bảng ghi một loại việc: bảng lớp, bảng sinh viên, nhật ký in, quẹt thẻ thư viện… Lúc tra, máy không đọc lần từng trang như người. Em nói cho nó ba điều: lấy bảng nào, xem cột nào, giữ lại những dòng nào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Giống xếp hàng lấy cơm căng tin cô nhỉ. Mỗi đứa một dòng, cột là món."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Và cột cuối là số tiền cậu còn nợ."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Bảng sinh viên có thông tin cá nhân. Muốn xem thì mang phiếu yêu cầu tra cứu, có chữ ký của đơn vị lo vụ việc. Vụ hộp kiến nghị là của Phòng Công tác sinh viên."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Tra gì máy cũng ghi lại. Cuối vụ cô xem nhật ký."
        },
        {
          "type": "show-document",
          "documentId": "doc-van-ban-thay-quang"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-quyen-du-lieu"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Xem được lớp là khoanh vùng được rồi ạ. Em cảm ơn cô."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Mới khoanh vùng thôi đấy. Lớp thì không tự bỏ thư được đâu."
        }
      ]
    },
    {
      "id": "n2-co-hanh-an",
      "title": "Chi tiết ẩn: Tờ lịch treo tường",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Tờ lịch tháng 9. Ô ngày 30 khoanh đỏ: \"Họp rà soát phòng CLB\".)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lịch họp ghi lên tận đây rồi. Hạn chót là thật đấy."
        }
      ]
    },
    {
      "id": "n2-bd-toa-b",
      "title": "Bản đồ ngày 2 (tùy chọn): ghé sảnh tòa B hỏi bác Thịnh",
      "canh": "sanh-toa-b",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-n2-bd-toa-b",
          "diem": [
            {
              "sprite": "nv:bac-tu",
              "x": 78,
              "y": 100,
              "rong": 16,
              "chuoi": "n2-bd-toa-b-vao",
              "sau": [],
              "nhan": "Bác bảo vệ",
              "dau": "chinh"
            },
            {
              "sprite": "vung:bang-tin",
              "x": 43.3,
              "y": 37.4,
              "rong": 9.4,
              "chuoi": "n2-bd-toa-b-an",
              "sau": [],
              "nhan": "Bảng tin cạnh cột"
            }
          ]
        }
      ]
    },
    {
      "id": "n2-bd-toa-b-vao",
      "title": "Tới nơi: Bản đồ ngày 2 (tùy chọn): ghé sảnh tòa B hỏi bác Thịnh",
      "canh": "sanh-toa-b",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "smile",
          "text": "Lại mấy cháu CLB Thám Tử à? Cô Lan niêm phong hộp lại rồi, không soi được nữa đâu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bọn cháu qua chào bác thôi ạ. Bác trực ở đây cả tuần hả bác?"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Thứ Hai tới thứ Bảy. Bảy giờ sáng bác mở cửa, thư viện đóng lúc mười một giờ đêm thì bác khóa. Chủ nhật bác chỉ ghé buổi tối để khóa cửa, có việc thì sang cổng ký túc tìm chú Cường."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tức là cả ngày Chủ nhật sảnh này không có ai trông."
        }
      ]
    },
    {
      "id": "n2-bd-toa-b-an",
      "title": "Chi tiết ẩn: Bảng tin cạnh cột",
      "canh": "sanh-toa-b",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Góc bảng tin còn tờ danh sách CLB năm ngoái: \"Phòng 204: CLB Thám Tử\". Có ai vẽ thêm cái kính lúp."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Năm ngoái đã có người nghịch thế rồi. Hay là chính người trong CLB vẽ?)"
        }
      ]
    },
    {
      "id": "n2-bd-cang-tin",
      "title": "Bản đồ ngày 2 (tùy chọn): tạt qua căng tin",
      "canh": "cang-tin",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-n2-bd-cang-tin",
          "diem": [
            {
              "sprite": "nv:tung",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-bd-cang-tin-vao",
              "sau": [],
              "nhan": "Tùng",
              "dau": "chinh"
            },
            {
              "sprite": "vung:bang-den",
              "x": 48,
              "y": 20,
              "rong": 9,
              "chuoi": "n2-bd-cang-tin-an",
              "sau": [],
              "nhan": "Tấm bảng đen trên quầy"
            }
          ]
        }
      ]
    },
    {
      "id": "n2-bd-cang-tin-vao",
      "title": "Tới nơi: Bản đồ ngày 2 (tùy chọn): tạt qua căng tin",
      "canh": "cang-tin",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Giữa buổi sáng, căng tin còn vắng tanh."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Giờ này vắng. Trưa ra đây á, tớ cá là chen bẹp ruột!"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tối thứ Hai đi đá bóng về tớ toàn thấy cậu ở thư viện tới lúc đóng cửa đấy, Hà Vy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu soi kỹ thật đấy. Ừ, tối thứ Hai tớ rảnh."
        }
      ]
    },
    {
      "id": "n2-bd-cang-tin-an",
      "title": "Chi tiết ẩn: Tấm bảng đen trên quầy",
      "canh": "cang-tin",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bảng đen trên quầy ghi giá bằng phấn: trà đá 3 nghìn, chè đậu đen 10 nghìn. Góc dưới có ai viết thêm: \"Nợ quá ba cốc thì ghi tên vào đây\"."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ chưa bao giờ nợ quá ba cốc. …Ở căng tin này."
        }
      ]
    },
    {
      "id": "n2-phong",
      "title": "Phòng CLB buổi chiều: bốn người, mỗi người một việc",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "task",
          "text": "Về phòng CLB, mở laptop"
        },
        {
          "type": "reminder",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Laptop anh để trên bàn. Muốn tra thì tìm anh."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Về tới phòng CLB. Mỗi người một góc: Duy bên cái laptop, Hà Vy trước tấm bảng, chị Minh Anh xếp lại giấy tờ, Tùng ngồi vắt vẻo trên bàn."
        },
        {
          "type": "explore",
          "id": "kp-phong-n2",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 20,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-phong-duy",
              "sau": [],
              "nhan": "Duy: mở laptop",
              "dau": "chinh"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 41,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-phong-vy",
              "sau": [],
              "nhan": "Hà Vy: câu hỏi trên bảng",
              "dau": "phu"
            },
            {
              "sprite": "nv:tung",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-phong-tung",
              "sau": [],
              "nhan": "Tùng: chuyện ngoài lề",
              "dau": "phu"
            },
            {
              "sprite": "nv:minh-anh",
              "x": 83,
              "y": 100,
              "rong": 15,
              "chuoi": "n2-phong-minh-anh",
              "sau": [],
              "nhan": "Minh Anh: xin dữ liệu",
              "dau": "phu"
            }
          ]
        }
      ]
    },
    {
      "id": "n2-phong-duy",
      "title": "Duy mở laptop (việc chính)",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Máy đây. Anh đăng nhập tài khoản cô Hạnh vừa tạo rồi, ngồi vào đi."
        },
        {
          "type": "goto",
          "to": "n2-laptop"
        }
      ]
    },
    {
      "id": "n2-phong-vy",
      "title": "Hà Vy đọc lại câu hỏi ghim trên bảng",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tớ ghim câu hỏi lên bảng rồi: lớp nào vừa ở tòa B vừa học Báo chí?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hai tờ giấy nhớ là hai điều mình biết chắc. Còn lại thì chưa."
        }
      ]
    },
    {
      "id": "n2-phong-tung",
      "title": "Tùng kể chuyện ngoài lề",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Cậu biết không, cô Hạnh ở Phòng Đào tạo chỉ làm giờ hành chính thôi. Muốn gặp cô thì đừng đi buổi tối."
        }
      ]
    },
    {
      "id": "n2-phong-minh-anh",
      "title": "Minh Anh: muốn xin dữ liệu thì qua chị",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Tài khoản hôm nay chỉ mở một bảng. Muốn xem thêm bảng nào thì phải có căn cứ, rồi chị đứng ra xin."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Chiều thứ Hai, thứ Tư, thứ Sáu chị ở phòng này. Khi nào em thấy đủ căn cứ để kết luận thì tìm chị."
        }
      ]
    },
    {
      "id": "n2-laptop",
      "title": "Laptop phòng CLB: lớp nào vừa ở tòa B vừa học Báo chí?",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "task",
          "text": "Xem tài khoản CLB tra được bảng nào"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cứ mở bảng xem thử đã. Chưa biết cột nào thì lọc kiểu gì."
        },
        {
          "type": "note",
          "text": "Phòng CLB buổi chiều. Laptop CLB đã đăng nhập tài khoản mới. Giấy nhớ [Tòa B], [Báo chí K24] trên bàn."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cái laptop cũ khởi động mất gần hai phút."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tài khoản cô Hạnh tạo chỉ mở được đúng một bảng."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cứ mở bảng xem thử đã. Chưa biết cột nào thì lọc kiểu gì."
        },
        {
          "type": "challenge",
          "challengeId": "c-bang-lop"
        },
        {
          "type": "task",
          "text": "Chỉ lấy cột cần xem"
        },
        {
          "type": "reminder",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Hàng LẤY CỘT: bấm cột nào thì cột ấy hiện ra. Lấy mã lớp với tòa nhà."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Một trăm mười hai lớp, bốn cột. Nhìn hơi rối."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Không cần xem hết đâu. Hàng LẤY CỘT ở trên: muốn xem cột nào thì bấm cột ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cái hộp nằm ở tòa B. Vậy trước hết xem lớp nào ở tòa nào đã."
        },
        {
          "type": "challenge",
          "challengeId": "c-cot-lop"
        },
        {
          "type": "task",
          "text": "Lớp nào vừa ở tòa B vừa học Báo chí?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Hai tờ giấy nhớ trên bàn: Tòa B, Báo chí K24. Lớp nào khớp?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Giờ lọc. Mỗi dòng có mã lớp, ngành, khóa học, tòa nhà."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tòa B hoặc Báo chí, cứ dính một cái là lấy hết cho chắc. Tớ cá kiểu gì chẳng trúng!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đừng cá vội. Holmes bảo chưa có dữ liệu mà đã đoán là sai từ gốc đấy. Tính đã nào."
        },
        {
          "type": "image",
          "imageId": "cg-nghi-di-tung-ha-vy"
        },
        {
          "type": "challenge",
          "challengeId": "c-lop"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hai lớp: BC24A với BC23A."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "BC23A là khóa trước mà? Thẻ lịch ghi K24."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ừ, thẻ lịch nghiêng về BC24A. Nhưng cứ giữ cả hai lớp, loại sau cũng chưa muộn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Hai lớp vẫn đông lắm. Mà mình đâu có xem được danh sách sinh viên."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cô Hạnh bảo rồi đấy: phải có phiếu của Phòng Công tác sinh viên."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hai lớp: BC24A, BC23A. Muốn xem người thì cần phiếu của Phòng Công tác sinh viên."
        },
        {
          "type": "branch",
          "id": "go-with-n2-toi",
          "asker": {
            "speaker": "player",
            "text": "Về phòng KTX ăn tối"
          },
          "choices": [
            {
              "id": "go-n2-toi",
              "text": "Về phòng KTX ăn tối",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n2-toi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n2-toi",
      "title": "Tối ngày 2, phòng 408: mì tôm và nhóm chat của CLB (không khí ký túc xá, không có manh mối)",
      "canh": "phong-ktx-dem",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tối, phòng 408. Tùng bóc hai gói mì, bẻ đôi nhét vừa cái bát inox."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bí kíp này: đổ nước sôi ngập, úp đĩa lên, đếm chuẩn một trăm tám mươi giây."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu đếm thật à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là cậu chưa đếm tới năm mươi đã mở ra gắp rồi!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Điện thoại rung. Chị Minh Anh vừa lập nhóm chat \"CLB Thám Tử (5)\"."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy gửi ảnh cái tủ hồ sơ đã khóa kín: \"Đã kiểm. Ngủ sớm.\""
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy gửi một trang vở chi chít số, kèm nhãn dán con mèo đeo kính."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ kìa, Hà Vy mà cũng dùng nhãn dán á?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Lo mà úp mì đi. Nở bung bét rồi kìa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Chết dở! Trôi mất một trăm tám mươi giây của tớ!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mì nhão. Hai đứa vẫn ăn sạch, húp cả nước."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tối mai gặm bánh mì đi. Quỹ bay sạch vào hai gói mì này rồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Mai ra căng tin mà ăn nợ. Khoan, cuối tuần còn phải nạp tiền thẻ sinh viên nữa!"
        },
        {
          "type": "image",
          "imageId": "chibi-mi-tom"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "n3-mo",
      "title": "Sáng ngày 3: sang Phòng CTSV",
      "canh": "phong-clb",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "task",
          "text": "Sang Phòng Công tác sinh viên xin phiếu tra cứu"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Năm, 26/09/2024"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Sáng nay tớ có tiết Triết, nhờ thằng cùng lớp điểm danh hộ rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Điểm danh hộ là sửa dữ liệu đầu vào đấy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Trời đất, cậu nói nghe nghiêm trọng như tớ vừa phạm pháp không bằng."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Chị coi như chưa nghe thấy nhé. Lần sau lo mà đi học đầy đủ đấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị báo cô Lan rồi. Cầm kết quả hôm qua sang, đó là căn cứ xin phiếu."
        },
        {
          "type": "explore",
          "id": "kp-bd-n3",
          "kieu": "ban-do",
          "gio": "09:30",
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
                "co-lan",
                "co-hanh"
              ]
            },
            {
              "sprite": "ghim:phong-may",
              "x": 73,
              "y": 45,
              "rong": 5,
              "chuoi": "n3-bd-phong-may",
              "sau": [],
              "nhan": "Phòng máy",
              "dau": "phu"
            },
            {
              "sprite": "ghim:toa-b",
              "x": 48,
              "y": 29,
              "rong": 5,
              "chuoi": "n3-bd-toa-b",
              "sau": [],
              "nhan": "Sảnh tòa B",
              "dau": "phu",
              "co": [
                "bac-tu"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n3-ctsv",
      "title": "CTSV: sổ niêm phong, phiếu yêu cầu tra cứu; Quân giám sát",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "task",
          "text": "Làm sao để được xem bảng sinh viên?"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Kết quả hai lớp hôm qua là căn cứ để xin phiếu tra cứu."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Lại con đường tắt qua sân bóng rổ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hôm qua ba phút, hôm nay tớ cá là hai phút rưỡi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đừng cá nữa. Để tớ bấm giờ cho."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Hai phút bốn mươi. Coi như Tùng thua mười giây."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tại cậu ấy dừng lại đọc bảng tin!"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Hộp kiến nghị là bên cô quản. Người gửi muốn được trả lời thì phải ghi mã sinh viên của mình vào phiếu gửi. Mã đó được chép vào sổ niêm phong."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Sổ đó niêm phong. Cô cũng không được tự mở."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Vậy làm sao biết được ai gửi ạ?"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Chỉ khi có căn cứ bằng văn bản cho một mã cụ thể, cô mới tra và trả lời có hoặc không."
        },
        {
          "type": "note",
          "text": "Một anh sinh viên đeo kính, mặc gi lê len xanh than, kẹp cái bìa da, đứng ở cửa từ lúc nào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ở cửa có một anh sinh viên đeo kính, mặc gi lê len xanh than, kẹp cái bìa da, đứng từ lúc nào không ai để ý."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người lạ kìa. Nhìn kỹ một chút trước khi anh ấy mở lời đã."
        },
        {
          "type": "explore",
          "id": "kp-soi-quan",
          "kieu": "quan-sat",
          "nhanVat": "quan",
          "haVySoi": true,
          "diem": [
            {
              "sprite": "vung:kinh",
              "x": 55,
              "y": 19,
              "rong": 26,
              "chuoi": "n3-soi-kinh",
              "sau": [],
              "nhan": "Cặp kính"
            },
            {
              "sprite": "vung:gi-le",
              "x": 50,
              "y": 46,
              "rong": 24,
              "chuoi": "n3-soi-gi-le",
              "sau": [],
              "nhan": "Áo gi lê len"
            },
            {
              "sprite": "vung:tay",
              "x": 14,
              "y": 80,
              "rong": 20,
              "chuoi": "n3-soi-tay",
              "sau": [],
              "nhan": "Hai tay chắp sau lưng"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi là Quân, bên Ban Pháp chế – Kiểm tra Hội sinh viên. Tôi được cử xuống giám sát việc này."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Hai lớp các em lọc ra hôm qua là căn cứ được. Cô ký phiếu tra cứu: bảng sinh viên, bốn cột, mã, họ đệm, tên, mã lớp. Không hơn."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi ký giám sát. Các bạn tra những gì, bên tôi xem hết."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-can-ma-va-can-cu"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-phieu-tra-cuu"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Các bạn chỉ được lập căn cứ. Tra sổ là việc của cô Lan, không phải của CLB."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy là cần mã cụ thể. Và căn cứ cho từng mã."
        },
        {
          "type": "branch",
          "id": "go-with-n3-cang-tin",
          "asker": {
            "speaker": "player",
            "text": "Tạt qua căng tin"
          },
          "choices": [
            {
              "id": "go-n3-cang-tin",
              "text": "Tạt qua căng tin",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n3-cang-tin"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n3-bd-phong-may",
      "title": "Bản đồ ngày 3 (tùy chọn): phòng máy khóa cửa, tờ giấy giờ mở cửa",
      "canh": "ngoai-phong-may",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-n3-bd-phong-may",
          "diem": [
            {
              "sprite": "nv:ha-vy",
              "x": 68,
              "y": 100,
              "rong": 15,
              "chuoi": "n3-bd-phong-may-vao",
              "sau": [],
              "nhan": "Hà Vy",
              "dau": "chinh"
            },
            {
              "sprite": "vung:dep",
              "x": 15.5,
              "y": 81,
              "rong": 11,
              "chuoi": "n3-bd-phong-may-an",
              "sau": [],
              "nhan": "Hai đôi dép trước cửa"
            }
          ]
        }
      ]
    },
    {
      "id": "n3-bd-phong-may-vao",
      "title": "Tới nơi: Bản đồ ngày 3 (tùy chọn): phòng máy khóa cửa, tờ giấy giờ mở cửa",
      "canh": "ngoai-phong-may",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng máy đang có lớp thực hành, cửa khép. Trên cửa dán một tờ giấy: mở cửa từ 7 rưỡi sáng tới 9 giờ tối. Tối Chủ nhật mở cho sinh viên in bài, vào phải ký sổ với bác trực sảnh tòa B."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Tối Chủ nhật vẫn mở. Thư kia in tối nào nhỉ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chưa rõ. Nhớ kỹ: vào phải ký sổ."
        }
      ]
    },
    {
      "id": "n3-bd-phong-may-an",
      "title": "Chi tiết ẩn: Hai đôi dép trước cửa",
      "canh": "ngoai-phong-may",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hai đôi dép lê xếp ngay ngắn trước cửa phòng máy. Phòng trải thảm, vào là phải bỏ giày."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Trốn tiết nhìn dép là biết. Phòng máy tự điểm danh luôn."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cạnh khung cửa dán tờ danh sách lớp thực hành tuần trước. Ba cái tên bị khoanh đỏ, bên cạnh ghi tay: \"Vắng quá 20%, không đủ điều kiện dự thi. Học lại kỳ sau.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "…Thằng phòng bên nằm trong ba cái tên kia là thằng phòng bên. Hôm trước nó còn khoe trốn tiết đi đá bóng."
        }
      ]
    },
    {
      "id": "n3-bd-toa-b",
      "title": "Bản đồ ngày 3 (tùy chọn): bác Thịnh ở sảnh tòa B",
      "canh": "sanh-toa-b",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-n3-bd-toa-b",
          "diem": [
            {
              "sprite": "nv:bac-tu",
              "x": 78,
              "y": 100,
              "rong": 16,
              "chuoi": "n3-bd-toa-b-vao",
              "sau": [],
              "nhan": "Bác bảo vệ",
              "dau": "chinh"
            },
            {
              "sprite": "vung:binh-cuu-hoa",
              "x": 38.7,
              "y": 55,
              "rong": 3,
              "chuoi": "n3-bd-toa-b-an",
              "sau": [],
              "nhan": "Bình cứu hỏa"
            }
          ]
        }
      ]
    },
    {
      "id": "n3-bd-toa-b-vao",
      "title": "Tới nơi: Bản đồ ngày 3 (tùy chọn): bác Thịnh ở sảnh tòa B",
      "canh": "sanh-toa-b",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "smile",
          "text": "Hộp vẫn niêm phong nguyên đấy. Nay đi đâu đông thế?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bọn cháu sang Phòng Công tác sinh viên ạ. Cô Lan với cô Hạnh ở cùng tòa nhỉ?"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Ừ, cùng tầng. Giờ hành chính là có người."
        }
      ]
    },
    {
      "id": "n3-bd-toa-b-an",
      "title": "Chi tiết ẩn: Bình cứu hỏa",
      "canh": "sanh-toa-b",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tem kiểm định trên bình cứu hỏa ghi tháng 9 năm nay, bên cạnh có chữ ký tắt: \"T.\""
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Bác Thịnh kiểm cả cái bình này. Ở sảnh này cái gì cũng có người ghi lại.)"
        }
      ]
    },
    {
      "id": "n3-soi-kinh",
      "title": "Quan sát Quân: cặp kính",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Kính gọng mảnh, lau sạch bóng."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người kỹ tính. Mình viết gì anh ấy cũng sẽ soi từng chữ."
        }
      ]
    },
    {
      "id": "n3-soi-gi-le",
      "title": "Quan sát Quân: áo gi lê len",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Gi lê len, sơ mi cài kín cổ. Mặt còn trẻ quá, không phải thầy cô."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Sinh viên, mà ăn mặc như đi họp. Người của một ban nào đó trong Hội."
        }
      ]
    },
    {
      "id": "n3-soi-tay",
      "title": "Quan sát Quân: hai tay chắp sau lưng",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Đứng thẳng, hai tay chắp sau lưng, không cầm bút, không cầm sổ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Anh ấy tới để xem mình làm, chứ không phải để giúp đâu."
        }
      ]
    },
    {
      "id": "n3-cang-tin",
      "title": "Căng tin: Hiếu nói xấu CLB",
      "canh": "cang-tin",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "note",
          "text": "Căng tin, ngay sau khi rời Phòng CTSV. Hiếu ngồi bàn bên, nói to."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ra khỏi Phòng Công tác sinh viên, cả nhóm tạt vào căng tin. Bàn bên có một cậu đang nói to về tờ thông báo họp rà soát."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Thấy thông báo chưa? CLB Thám Tử chiếm nguyên cái phòng chả để làm gì."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Nhóm tôi xin phòng làm bài không được, phải chui rúc thư viện."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Gắt thế… cậu ta gửi thư à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ghét với gửi thư là hai việc khác nhau."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Nhìn gì? Tôi là Hiếu, lớp BC24A. Có gì hỏi thẳng đây, đừng xì xào sau lưng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Có tiếng gọi từ quầy: \"Hiếu ơi, lấy cơm này!\" Cậu ta đứng dậy, bỏ đi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thôi, chuyện thư từ để nhóm mình tự kiểm tra. Tớ ra lấy trà đá, ai uống không?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Khoan, ví còn đúng tiền cơm tối. Thêm cốc trà đá là tối nay nhịn."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Để tớ mời. Cốc hôm khiêng vali thì cậu vẫn nợ đấy."
        },
        {
          "type": "branch",
          "id": "go-with-n3-phong",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB"
          },
          "choices": [
            {
              "id": "go-n3-phong",
              "text": "Về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n3-phong"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n3-phong",
      "title": "Phòng CLB buổi chiều ngày 3: ai có việc nấy",
      "canh": "phong-clb",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Về phòng CLB. Phiếu tra cứu của cô Lan nằm trên bàn, cạnh cái laptop."
        },
        {
          "type": "explore",
          "id": "kp-phong-n3",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 20,
              "y": 100,
              "rong": 15,
              "chuoi": "n3-phong-duy",
              "sau": [],
              "nhan": "Duy: mở laptop",
              "dau": "chinh"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 45,
              "y": 100,
              "rong": 15,
              "chuoi": "n3-phong-vy",
              "sau": [],
              "nhan": "Hà Vy: câu hỏi trên bảng",
              "dau": "phu"
            },
            {
              "sprite": "nv:minh-anh",
              "x": 72,
              "y": 100,
              "rong": 15,
              "chuoi": "n3-phong-minh-anh",
              "sau": [],
              "nhan": "Minh Anh: chuyện anh Quân",
              "dau": "phu"
            }
          ]
        }
      ]
    },
    {
      "id": "n3-phong-duy",
      "title": "Duy mở laptop (việc chính)",
      "canh": "phong-clb",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Có phiếu của cô Lan rồi, máy mở thêm được bảng sinh viên. Bốn cột, không hơn."
        },
        {
          "type": "goto",
          "to": "n3-laptop"
        }
      ]
    },
    {
      "id": "n3-phong-vy",
      "title": "Hà Vy đọc câu hỏi mới trên bảng",
      "canh": "phong-clb",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Câu hỏi mới trên bảng: trong hai lớp ấy, lấy danh sách lớp, rồi tự dò bằng mắt xem ai tên chữ H."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tùng cá là Hiếu rồi đấy. Tớ thì chưa dám nói gì."
        }
      ]
    },
    {
      "id": "n3-phong-minh-anh",
      "title": "Minh Anh nói về việc bị giám sát",
      "canh": "phong-clb",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Anh Quân ký giám sát, nghĩa là mình tra gì bên Hội cũng xem được."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Cứ làm đúng. Mình không sai thì họ soi cũng không sao."
        }
      ]
    },
    {
      "id": "n3-laptop",
      "title": "Laptop phòng CLB: ai trong hai lớp có tên bắt đầu bằng H?",
      "canh": "phong-clb",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "task",
          "text": "Trong hai lớp ấy, ai có thể là người ký chữ H?"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là Hiếu! Xem trong hai lớp có ai tên H."
        },
        {
          "type": "note",
          "text": "Phòng CLB. Phiếu tra cứu đã mở bảng sinh viên. Trên bàn: [H], phiếu hai lớp."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Cậu gắt ở căng tin tên Hiếu. Chữ H đấy! Tớ cá là Hiếu!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cá thì để sau. Xem dữ liệu nói gì đã."
        },
        {
          "type": "challenge",
          "challengeId": "c-ten-h"
        },
        {
          "type": "image",
          "imageId": "chibi-0-dong"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Hai người: Hiếu và Hoài. Cùng lớp BC24A."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thấy chưa, có Hiếu!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Có cả Hoài. Mới khớp được lớp và tên H thôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Thế giờ làm gì?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mai mang hai mã này sang cô Lan. Tra sổ là rõ."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hiếu và Hoài, cùng BC24A. Mai mang hai mã sang Phòng Công tác sinh viên."
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "n4-mo",
      "title": "Sáng ngày 4: nộp hai mã",
      "canh": "phong-clb",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "task",
          "text": "Mang hai mã sang Phòng Công tác sinh viên"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 27/09/2024"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị ghi hai mã và các bước lọc vào phiếu yêu cầu rồi. Các em cầm qua Phòng Công tác sinh viên nhé."
        },
        {
          "type": "explore",
          "id": "kp-bd-n4",
          "kieu": "ban-do",
          "gio": "09:30",
          "diem": [
            {
              "sprite": "ghim:toa-hanh-chinh",
              "x": 21,
              "y": 54,
              "rong": 5,
              "chuoi": "n4-ctsv",
              "sau": [],
              "nhan": "Phòng Công tác sinh viên",
              "dau": "chinh",
              "co": [
                "co-lan",
                "co-hanh"
              ]
            },
            {
              "sprite": "ghim:toa-b",
              "x": 48,
              "y": 29,
              "rong": 5,
              "chuoi": "n4-bd-toa-b",
              "sau": [],
              "nhan": "Sảnh tòa B",
              "dau": "phu",
              "co": [
                "bac-tu"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n4-ctsv",
      "title": "CTSV tra sổ niêm phong",
      "canh": "phong-ctsv",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "task",
          "text": "Mã nào có trong sổ niêm phong?"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "worried",
          "text": "Hai mã. Sổ niêm phong có mã nào đây…"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên đường, không ai nói gì một lúc lâu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nếu cả hai mã đều không có trong sổ thì sao?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thì chứng tỏ mình sai ở đâu đó. Cũng là một manh mối."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu lúc nào cũng bình tĩnh thế à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Không. Tớ đang đếm bậc cầu thang cho đỡ run."
        },
        {
          "type": "explore",
          "id": "kp-toi-n4-ctsv",
          "diem": [
            {
              "sprite": "nv:co-lan",
              "x": 35,
              "y": 100,
              "rong": 15,
              "chuoi": "n4-ctsv-vao",
              "sau": [],
              "nhan": "Cô Lan",
              "dau": "chinh"
            },
            {
              "sprite": "vung:khay-giay",
              "x": 88.5,
              "y": 50,
              "rong": 10,
              "chuoi": "n4-ctsv-an",
              "sau": [],
              "nhan": "Khay giấy trên quầy"
            }
          ]
        }
      ]
    },
    {
      "id": "n4-ctsv-vao",
      "title": "Tới nơi: CTSV tra sổ niêm phong",
      "canh": "phong-ctsv",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Cô tra rồi. SV240317 có trong sổ. SV240228 thì không."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Vậy SV240317 là người nộp thư ạ?"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Sổ niêm phong chỉ xác nhận mã đó có mặt. Cô không kết luận thêm."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Mã của Hiếu không có… Tớ cá trượt rồi à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Trượt cũng chẳng sao. Ít ra mình loại được thêm một người."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-hoai-nguoi-nop"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Biết ai nộp chưa có nghĩa là biết ai viết."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Theo quy chế, sinh viên có mã trong sổ sẽ được mời đến buổi họp. Có gọi vào hay không do buổi họp quyết định."
        },
        {
          "type": "branch",
          "id": "r-phong-may",
          "asker": {
            "speaker": "tung",
            "text": "Mà thư đánh máy thì phải in ở đâu chứ nhỉ? Phòng Đào tạo ngay cạnh đây, tiện đường ghé hỏi cô Hạnh không?"
          },
          "choices": [
            {
              "id": "ghe",
              "text": "Ghé Phòng Đào tạo hỏi cô Hạnh về nhật ký in.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n4-phong-may"
                }
              ]
            },
            {
              "id": "ve",
              "text": "Thôi, về CLB báo chị Minh Anh đã.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n4-ve"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n4-ctsv-an",
      "title": "Chi tiết ẩn: Khay giấy trên quầy",
      "canh": "phong-ctsv",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên khay là phiếu yêu cầu tra cứu của CLB, chữ ký cô Lan còn tươi mực."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Phiếu của mình. Cô Lan ký rồi kìa."
        }
      ]
    },
    {
      "id": "n4-phong-may",
      "title": "Phòng Đào tạo: nhật ký in",
      "canh": "phong-dao-tao",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "task",
          "text": "Lá thư được in từ tài khoản nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chân trang thư là tên tệp. Nhật ký in sẽ ghi tài khoản nào in nó."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng Đào tạo ngay cạnh đó. Cô Hạnh nhận phiếu yêu cầu."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Máy in trường lưu tài khoản, giờ in, tên tệp. Cô mở đúng bảng nhật ký in cho các em xem."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Dưới chân bản in thường có tên tệp. Thư của các em có không?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Có ạ. Nhưng bản chụp bị xén, chỉ đọc được chữ: kien-nghi…"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thư đánh máy thì phải in. Hôm Trung thu Hoài hỏi tớ đường ra phòng máy in đấy. Chắc chắn Hoài in rồi!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Hỏi đường chưa phải là in. Cứ kiểm tra nhật ký đã."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ten-tep"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-in"
        },
        {
          "type": "image",
          "imageId": "cg-reo-ho-manh-moi"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "23 giờ 10 tối Chủ nhật. Tệp kien-nghi-phong-clb.docx, in từ tài khoản clb_robotics."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Không phải mã sinh viên cá nhân. Đây là tài khoản CLB."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Robotics á? Vậy người in không phải Hoài rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thư in từ tài khoản Robotics, nhưng Hoài mang nộp. Có khi là hai người khác nhau."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Nhật ký chỉ ghi tài khoản. Cô không có căn cứ nói ai trực tiếp ngồi máy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tối Chủ nhật vào phòng máy phải ký sổ! Xem sổ là biết ngay ai ngồi giờ đó!"
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Sổ ký giấy bác Thịnh tòa B giữ. Nhưng muốn mở phải có chữ ký người có thẩm quyền."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thư in từ tài khoản CLB Robotics. Người nộp là Hoài. Hai việc, có khi là hai người."
        },
        {
          "type": "branch",
          "id": "go-with-n4-sanh-toa-b",
          "asker": {
            "speaker": "player",
            "text": "Sang tòa B gặp bác Thịnh"
          },
          "choices": [
            {
              "id": "go-n4-sanh-toa-b",
              "text": "Sang tòa B gặp bác Thịnh",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n4-sanh-toa-b"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n4-sanh-toa-b",
      "title": "Sảnh tòa B: hỏi bác Thịnh về sổ ký",
      "canh": "sanh-toa-b",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều cùng ngày, cả nhóm ghé sảnh tòa B. Bác Thịnh đang ngồi ở ghế đá cạnh cửa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Bác ơi, cho bọn cháu xem sổ ký vào phòng máy tối Chủ nhật được không ạ?"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Sổ ghi tên người. Không có chữ ký người có thẩm quyền thì bác không mở."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Vâng ạ. Bọn cháu chỉ ghi lại nhật ký in trước."
        },
        {
          "type": "branch",
          "id": "go-with-n4-toi",
          "asker": {
            "speaker": "player",
            "text": "Tối họp nhóm bạn ở CLB"
          },
          "choices": [
            {
              "id": "go-n4-toi",
              "text": "Tối họp nhóm bạn ở CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n4-toi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n4-ve",
      "title": "Về phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chị ơi, sổ niêm phong có mã của Hoài, không có Hiếu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Nói có sách, mách có chứng. Mới biết ai nộp chứ chưa biết ai viết."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Và cũng chưa biết thư đó được in từ đâu…"
        },
        {
          "type": "branch",
          "id": "go-with-n4-toi",
          "asker": {
            "speaker": "player",
            "text": "Tối họp nhóm bạn ở CLB"
          },
          "choices": [
            {
              "id": "go-n4-toi",
              "text": "Tối họp nhóm bạn ở CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n4-toi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n4-bd-toa-b",
      "title": "Bản đồ ngày 4 (tùy chọn): bác Thịnh kể có người xuống xem hộp",
      "canh": "sanh-toa-b",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-n4-bd-toa-b",
          "diem": [
            {
              "sprite": "nv:bac-tu",
              "x": 30,
              "y": 100,
              "rong": 15,
              "chuoi": "n4-bd-toa-b-vao",
              "sau": [],
              "nhan": "Bác bảo vệ",
              "dau": "chinh"
            },
            {
              "sprite": "vung:ghe-da",
              "x": 26,
              "y": 63,
              "rong": 10,
              "chuoi": "n4-bd-toa-b-an",
              "sau": [],
              "nhan": "Ghế đá"
            }
          ]
        }
      ]
    },
    {
      "id": "n4-bd-toa-b-vao",
      "title": "Tới nơi: Bản đồ ngày 4 (tùy chọn): bác Thịnh kể có người xuống xem hộp",
      "canh": "sanh-toa-b",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Sáng nay có cậu đeo kính bên Hội xuống đứng nhìn cái hộp một lúc rồi đi. Không hỏi bác câu nào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Anh Quân đấy bác ạ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Anh ấy kiểm bọn mình, kiểm cả cái hộp."
        }
      ]
    },
    {
      "id": "n4-bd-toa-b-an",
      "title": "Chi tiết ẩn: Ghế đá",
      "canh": "sanh-toa-b",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên ghế đá là ca nhựa và ấm trà của bác Thịnh, nắp vẫn còn ấm."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bác trực suốt ngày, chắc phải uống hết hai ấm này."
        }
      ]
    },
    {
      "id": "n4-toi",
      "title": "Tối thứ Sáu, phòng CLB: hộp bánh quy và trò \"ba dữ kiện\" (không khí nhóm bạn, không có manh mối)",
      "canh": "phong-clb-dem",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tối thứ Sáu, phòng CLB. Duy cắm ấm đun nước. Minh Anh lôi từ ngăn kéo ra hộp bánh quy từ kỳ trước."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Nhắc lại luật CLB: ai ăn cái cuối cùng thì mua hộp mới nhé."
        },
        {
          "type": "image",
          "imageId": "chibi-duy-hop-banh"
        },
        {
          "type": "image",
          "imageId": "chibi-banh-quy"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chơi trò \"ba dữ kiện\" đi! Tớ tả một người qua ba điều, mọi người đoán nhé."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Một: đeo kính. Hai: hay ôm vở. Ba: từ đầu tuần tới giờ chưa thấy cười."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Ba điều ấy khớp với cả chục người trên thư viện. Dữ kiện quá lỏng."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Đấy, vừa cười xong. Điều thứ ba sai rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Em không cười. Em đang chỉnh kính."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tới lượt tớ. Một: thuộc đường. Hai: thích cá cược. Ba: cá mười thua chín."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ! Thế là vu khống có số liệu à!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Đã có số liệu thì không gọi là vu khống nữa đâu em."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chín giờ tối, hộp bánh hết. Người ăn cái cuối là Duy. Cậu lẳng lặng mở sổ, ghi: \"Nợ CLB một hộp bánh.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Ghi sổ rồi nhé, nhân chứng đầy đủ! Mai anh Duy nhớ mua loại sô-cô-la đấy!"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Được. Anh mua hộp mới, bù lại tối nay em đi rửa ấm trà."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chốt luôn! Em ghi vào biên bản đây."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng vừa lật sổ ghi xong thì Duy đặt ngay ấm nước ra trước mặt."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Đòi nợ liền tay thế hả anh? Em tưởng biên bản chỉ để tham khảo!"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "n5-mo",
      "title": "Sáng ngày 5: cổng KTX",
      "canh": "cong-ktx",
      "mocSomNhat": 51,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Bảy, 28/09/2024"
        },
        {
          "type": "note",
          "text": "Sáng sớm ở cổng KTX. Chú Cường vừa đi tuần về, tay cầm đèn pin."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sáng sớm ở cổng ký túc xá. Chú Cường vừa đi một vòng kiểm tra về, đèn pin còn cầm trên tay."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Sáng thứ Hai 16/09 chú tớ trực cổng. Hỏi chú xem hôm nộp thư có gì lạ không."
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Sáng thứ Hai ai ra cổng sớm, chú tớ hay để ý lắm."
        },
        {
          "type": "goto",
          "to": "n5-chu-cuong"
        }
      ]
    },
    {
      "id": "n5-chu-cuong",
      "title": "Chú Cường kể chuyện sáng thứ Hai",
      "canh": "cong-ktx",
      "mocSomNhat": 51,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chú ơi, sáng thứ Hai chú có để ý ai ra cổng sớm không ạ? Bọn cháu đang lần xem lá thư ở hộp tòa B từ đâu mà ra."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Sáng thứ Hai à… 6 giờ 45, chú thấy một cậu sinh viên, balo đeo huy hiệu bánh răng, đứng ngoài cổng đưa phong bì nâu cho một bạn nữ."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Con bé cầm xong là đi thẳng về phía tòa B luôn."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Còn cậu kia, chú có nhìn rõ mặt không ạ?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Không. Cậu ấy đứng xa, trời lại mới sáng, chú chỉ để ý cái huy hiệu thôi. Cái bánh răng sứt mất một răng, trông lệch lệch nên chú nhớ."
        },
        {
          "type": "image",
          "imageId": "cg-bong-huy-hieu"
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
          "speaker": "tung",
          "expression": "surprised",
          "text": "Huy hiệu bánh răng? Hôm Ngày hội CLB, biển của bọn Robotics vẽ đúng hình đấy!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Huy hiệu thì thành viên nào cũng có. Mới khoanh được là người của Robotics thôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Nhưng Robotics thì liên quan gì tới phòng của mình?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đừng đoán bừa vội. Cứ ghi lại đã, tính sau."
        },
        {
          "type": "branch",
          "id": "go-with-n5-toi",
          "asker": {
            "speaker": "player",
            "text": "Tối về phòng CLB"
          },
          "choices": [
            {
              "id": "go-n5-toi",
              "text": "Tối về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n5-toi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "n5-toi",
      "title": "Tối: Hà Vy tóm tắt trước buổi họp",
      "canh": "phong-clb-dem",
      "mocSomNhat": 51,
      "nodes": [
        {
          "type": "task",
          "text": "Soát lại hồ sơ trước buổi họp"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thứ Hai họp. Chỉ nói đúng những gì có chứng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Tối thứ Bảy"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tối, phòng CLB. Hà Vy ghim hết giấy tờ lên bảng, Tùng căng chỉ nối từng tờ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Tổng hợp lại. Thẻ lịch Báo chí ra hai lớp. Lọc tên H có Hiếu với Hoài. Sổ niêm phong có mã của Hoài."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nhỡ người ta vặn hỏi ai là người viết thư thì sao?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Có chứng cứ thì trình. Không có thì bảo chưa biết."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Rõ rồi. Tối mai tớ ngủ sớm, thứ Hai tỉnh như sáo."
        },
        {
          "type": "image",
          "imageId": "chibi-bang-ghim"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "hop-00",
      "title": "Nhịp 1–2: câu HOẶC của Quân → VÀ → \"Số liệu đây!\"",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Buổi họp rà soát"
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Nói có sách, mách có chứng. Trình đúng những gì đã tra."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Hai, ba giờ rưỡi chiều, hành lang tầng ba. Tùng ngáp tới cái thứ tư."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "\"Ngủ sớm\" của cậu là mấy giờ?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Hai giờ sáng. Tớ nằm tập nói \"dạ thưa thầy\" tới lúc quên cả cách thở."
        },
        {
          "type": "note",
          "text": "Thầy Quang ngồi giữa; Cô Lan và Quân một bên, CLB một bên. Hoài ngồi chờ ngoài hành lang theo quy chế, chưa được mời vào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Hai 30/09, bốn giờ chiều. Phòng họp tầng ba. Thầy Quang ngồi giữa, cô Lan và anh Quân một bên, CLB một bên. Ngoài hành lang, Hoài ngồi chờ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy là Quang, phó hiệu trưởng phụ trách sinh viên, chủ trì buổi rà soát này. Hôm nay thầy phải chốt phương án xếp lại phòng cho các CLB. Trước khi sang bên xưởng thực hành, thầy nghe phần của CLB Thám Tử. Mời các em trình bày căn cứ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Dạ, bọn em xin trình bày cách bọn em lọc ra danh sách ạ."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "chi-man",
          "text": "Bên tôi lọc lại cho chắc: tên là Hoài hoặc học lớp BC24A, ra ba mươi hai dòng. Hồ sơ các bạn nộp chỉ có một người."
        },
        {
          "type": "projector",
          "id": "hop-chieu-or",
          "source": {
            "kind": "sql",
            "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';"
          },
          "run": true,
          "expectedRowCount": 32
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ… ba mươi hai người! Thế này là cả lớp BC24A rồi còn gì!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Đừng cuống. Hồ sơ của mình có căn cứ rõ ràng, bình tĩnh xem lại xem."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Danh sách này bị gộp hai nhóm lại rồi. Họ lấy cả hai thay vì chỉ lấy phần trùng nhau."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Để tớ lên giải thích cho thầy. Anh Quân đang chọn nhầm điều kiện."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Gần sáu trăm dòng… câu của anh Quân lấy rộng ở chỗ nào?"
        },
        {
          "type": "note",
          "text": "Nhân vật chính xin phép thầy Quang, bước lên cạnh máy chiếu để chỉ ra chỗ nhầm lẫn."
        },
        {
          "type": "image",
          "imageId": "cg-hop-doi-dau"
        },
        {
          "type": "fix-query",
          "challengeId": "c-sua-or-quan"
        },
        {
          "type": "effect",
          "effectId": "co-so-lieu-day"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Anh đang gộp chung người tên Hoài và cả lớp BC24A. Bọn em chỉ tìm người vừa tên Hoài, vừa học BC24A."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "…Một dòng. Vâng. Mời các bạn nói tiếp."
        },
        {
          "type": "goto",
          "to": "hop-01"
        }
      ]
    },
    {
      "id": "hop-01",
      "title": "Nhịp 3: bạn này là người viết thư?",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-thu-pham",
          "asker": {
            "speaker": "thay-quang",
            "text": "Vậy bạn này là người viết thư?"
          },
          "choices": [
            {
              "id": "khong-so-niem-phong",
              "text": "Dạ, chưa nói được ạ. Người có mã trong sổ chưa chắc đã là người soạn thư.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Tách được người có mã trong sổ với người viết thư. Được, thầy ghi nhận."
                }
              ]
            },
            {
              "id": "co",
              "text": "Có ạ. Bạn ấy khớp cả tên lẫn lớp của người ký.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "worried",
                  "text": "Thầy cho em nói lại ạ: dữ liệu chỉ giúp thu hẹp thôi."
                }
              ]
            },
            {
              "id": "khong-lien-quan",
              "text": "Không ạ. Hai bạn ấy chỉ trùng tên với lớp thôi.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Chưa loại được đâu. Mã của Hoài có trong sổ mà."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "branch",
          "id": "r-moi-hoai",
          "asker": {
            "speaker": "thay-quang",
            "text": "Trong hai bạn, sổ chỉ có mã của em Hoài. Em ấy đang ngồi chờ ngoài hành lang. Các em đề nghị bước tiếp theo thế nào?"
          },
          "choices": [
            {
              "id": "dung",
              "text": "Mã trong sổ mới cho biết bạn ấy có nộp, chưa đủ để gọi bạn ấy vào. Xin dừng ở đây.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "ket-thuong"
                }
              ]
            },
            {
              "id": "tu-ke",
              "text": "Mời bạn ấy vào, để bạn ấy tự kể chuyện nộp thư.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "hop-02"
                }
              ]
            },
            {
              "id": "doi-chat",
              "text": "Mời bạn ấy vào, chiếu dòng có tên bạn ấy lên để bạn ấy xác nhận luôn cho nhanh.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "hop-doi-chat"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "hop-02",
      "title": "Mời Hoài vào hỏi chuyện nộp thư",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "note",
          "text": "Hoài được mời vào, đứng nép cạnh cửa, rồi ngồi xuống ghế khi thầy bảo."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài được gọi vào. Bạn ấy đứng nép cạnh cửa, hai tay nắm chặt quai túi."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Hoài. Em kể lại lúc nộp thư giúp thầy."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ… em là Hoài, lớp BC24A ạ. Sáng thứ Hai em mang phong bì bỏ vào hộp ở tòa B ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Chỉ có vậy thôi à em?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ… vâng ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Được, em ngồi xuống đi. Các em còn gì trình thêm không?"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "chi-man",
          "text": "Thưa thầy, bên em có kết luận."
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Anh Quân bảo Hoài viết. Trong hồ sơ, thẻ nào bác được câu ấy?"
        },
        {
          "type": "doi-chat",
          "id": "dc-ai-viet",
          "asker": {
            "speaker": "quan",
            "text": "Mã trong sổ là của Hoài. Thư do Hoài mang tới hộp. Chữ ký bắt đầu bằng H, Hoài cũng H. Bên tôi kết luận: **Hoài là người viết lá thư này.**"
          },
          "cauHoi": "Hoài mang thư tới hộp. Nhưng lá thư được in ra bằng tài khoản của ai? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "ev-nhat-ky-in",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Thưa thầy, bọn em có nhật ký in của phòng máy ạ. Tệp kiến nghị đòi phòng, một trang, in lúc 23:10 tối Chủ nhật — từ tài khoản dùng chung của một CLB, không phải của Hoài."
                },
                {
                  "speaker": "quan",
                  "expression": "stunned",
                  "text": "…Tài khoản CLB?"
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Tài khoản in thư không phải của người nộp thư. Vậy câu \"Hoài viết\" chưa đứng được."
                }
              ]
            },
            {
              "id": "clue-loi-chu-cuong",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Sáng thứ Hai, bác bảo vệ ký túc xá thấy một cậu sinh viên đeo huy hiệu bánh răng đưa phong bì cho một bạn nữ, rồi bạn ấy đi thẳng về phía tòa B ạ."
                },
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Lời kể thôi. Bác ấy không nhìn rõ mặt, cũng không biết trong phong bì có gì."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Thầy ghi nhận. Nhưng mới là một lời kể, chưa đủ để nói ai viết."
                }
              ]
            },
            {
              "id": "clue-hoai-nguoi-nop",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "smug",
                  "text": "Chính thẻ này nói Hoài là người nộp. Các bạn đang củng cố cho bên tôi đấy."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Người nộp thôi. Thẻ này chưa nói ai viết."
                }
              ]
            },
            {
              "id": "ev-hai-ma",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Hai mã khớp chữ H và lớp — Hoài hoặc Hiếu, mà sổ chỉ có Hoài."
                },
                {
                  "speaker": "tung",
                  "expression": "worried",
                  "text": "Ờ… phiếu này chỉ thu hẹp được thôi."
                }
              ]
            },
            {
              "id": "ev-mot-dong-sua",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Một dòng, một người. Vẫn không nói ai viết."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Đúng, phiếu này chỉ cho biết chỗ cần đến."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, đến đây bọn em chỉ nói được ai nộp. Ai viết thì bọn em chưa có căn cứ ạ."
            },
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Biết dừng ở chỗ chứng cứ dừng. Được."
            }
          ],
          "khac": [
            {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Cái này thì liên quan gì tới việc ai viết thư?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ đã ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "quan",
              "expression": "smug",
              "text": "Thưa thầy, ba lần đưa ra ba tờ chẳng dính gì tới việc ai viết thư. Bên tôi xin giữ kết luận."
            },
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Các em trình lạc đề ba lần rồi. Thầy ghi nhận tới đây thôi."
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Dạ. Bọn em xin dừng ở chỗ đã có căn cứ ạ."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "ending-branch"
        }
      ]
    },
    {
      "id": "hop-doi-chat",
      "title": "Hỏi thẳng: Hoài co người lại",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "note",
          "text": "Hoài được gọi vào, đứng nép cạnh cửa, nhìn lên màn chiếu có tên mình."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài bước vào. Màn chiếu vẫn đang hiện một dòng có tên bạn ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Khoan… chiếu tên bạn ấy lên rồi gọi vào, khác gì hỏi cung."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Không ai đối chất với sinh viên năm nhất ở đây. Thầy hỏi, các em nghe."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Hoài, lá thư có chữ ký này là em bỏ vào hộp đúng không?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ… vâng ạ. Em mang nộp ạ."
        },
        {
          "type": "note",
          "text": "Hoài cúi gằm, không nói thêm."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài cúi gằm, không dám nói thêm câu nào."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "smug",
          "text": "Vậy là chính bạn ấy nộp."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mới biết là mang nộp thôi. Chưa có chứng cứ bạn ấy viết."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Hoài đang rất căng. Hôm nay thầy không hỏi thêm em ở đây."
        },
        {
          "type": "goto",
          "to": "ket-thuong"
        }
      ]
    },
    {
      "id": "ket-that",
      "title": "True end: Hoài kể chuyện được nhờ; mẩu giấy trong sổ CLB",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "condition",
          "dieuKien": {
            "kind": "co",
            "id": "dc-ai-viet-du"
          }
        },
        {
          "type": "note",
          "text": "Thầy Quang quay sang Hoài."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Hoài, nhật ký in nói lá thư in từ tài khoản của một CLB, không phải của em. Phong bì em bỏ vào hộp là từ đâu ra?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ… có một anh em không quen nhờ em nộp hộ bản kiến nghị. Anh ấy bảo đang gấp, cứ ký như bình thường vào phiếu gửi, rồi ghi mã sinh viên của em để thầy cô tiện phản hồi. Em không mở phong bì ra xem ạ. Mặt anh ấy em không nhớ rõ ạ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Vậy là cậu ghi mã của mình vì được dặn. Còn người soạn thư thì không đứng tên ở đâu trên phiếu."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Nhật ký in không đặt em vào việc soạn thư, và lời em cho thầy một hướng để hỏi tiếp. Hiện chưa có căn cứ nào nói em là người viết. Thầy không nêu tên em trong hồ sơ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Mã trên phiếu là để thầy cô tra cứu và phản hồi người gửi. Ở đây người viết giấu tên, mượn chữ ký và mã của một bạn năm nhất. Thư như vậy thầy không nhận vào hồ sơ rà soát."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em làm theo lời nhờ nên không bị xử lý gì cả."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "smile",
          "text": "CLB được sinh hoạt đến hết học kỳ, không kèm điều kiện."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Còn thư do ai soạn, thầy sẽ cho hỏi lại. Chưa có căn cứ thì chưa nêu tên ai ở đây."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "relieved",
          "text": "Em xin lỗi vì làm mọi người mất công ạ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Không sao đâu em. Cảm ơn thầy ạ."
        },
        {
          "type": "image",
          "imageId": "cg-quan-bi-bac"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "stunned",
          "text": "…Hóa ra người nộp còn không biết trong thư viết gì. Em xin lỗi thầy, xin lỗi các bạn. Bên em lọc rộng rồi vội nghi cả lớp ạ."
        },
        {
          "type": "note",
          "text": "Tùng thì thầm với Hà Vy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Giữ được phòng rồi! Tối nay tớ khao trà đá."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Tớ nhớ đấy nhé."
        },
        {
          "type": "branch",
          "id": "go-with-ket-that-clb",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB"
          },
          "choices": [
            {
              "id": "go-ket-that-clb",
              "text": "Về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "ket-that-clb"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ket-that-clb",
      "title": "Chiều muộn ở phòng CLB: mẩu giấy trong sổ CLB",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-nhan-linh-1"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều muộn, cả nhóm về phòng CLB dọn bảng. Từ cuốn sổ CLB rơi ra một mẩu giấy gấp tư."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mực xanh, ngả màu cả rồi. Sổ này năm nào cũng kiểm, chưa thấy tờ này bao giờ."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Căn phòng này giữ nhiều hơn em nghĩ.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Giữ gì cơ? Phòng có mỗi cái tủ với cái bảng."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Đừng cá. Chưa có gì để tính cả."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thế thì đi uống trà đá thôi. Tớ hứa rồi mà."
        },
        {
          "type": "branch",
          "id": "go-with-ket-tra-da",
          "asker": {
            "speaker": "player",
            "text": "Ra quán trà đá cùng Tùng"
          },
          "choices": [
            {
              "id": "go-ket-tra-da",
              "text": "Ra quán trà đá cùng Tùng",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "ket-tra-da"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ket-tra-da",
      "title": "Sau kết thật: Tùng khao trà đá; bà Lụa kể về cái tủ sắt",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Gốc cây ngoài cổng chính. Một cái ô bạc màu, mấy cái ghế nhựa, cái ấm nhôm to bằng cái xô."
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
          "text": "Ba cốc chín nghìn. Khao thế thì bà cũng khao được."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu cá thua tớ bao nhiêu lần rồi, trả bằng trà đá thì còn lâu mới hết."
        },
        {
          "type": "image",
          "imageId": "chibi-ghi-la-ghi"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Lần này tớ chừa. Hôm ở chỗ cô Hạnh tớ lỡ mồm nghi cho Hoài. Bạn ấy chỉ hỏi đường thôi mà tớ... Suýt nữa làm bạn ấy mang tiếng."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu cứ khăng khăng \"chắc chắn Hoài in\". Nhật ký in thì nói khác."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ừ. Giờ gặp bạn ấy chẳng biết mở lời thế nào."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Mấy đứa ở phòng tầng hai nhà câu lạc bộ đấy hả? Phòng có cái tủ sắt."
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
          "text": "Hồi bà mới ra đây, phòng ấy là kho chổi. Có cậu sinh viên xin được chìa, tự khuân tủ sắt lên. Chiều nào cũng ra đây ghi chép."
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
          "text": "Khách của bà, bà nhớ cốc chứ nhớ gì tên. Bà gọi là \"cậu trà nóng\"."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tra-da-1"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Cái tủ ấy! \"Căn phòng này giữ nhiều hơn em nghĩ.\""
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Một người kể, chưa có giấy tờ gì. Cứ ghi lại đã, ghi rõ là lời kể."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tớ ghi vào sổ. Nguồn: bà bán trà đá ngoài cổng."
        },
        {
          "type": "note",
          "text": "Thấy bóng Hoài ôm cặp đi qua bên kia đường, Tùng hấp tấp nhổm dậy va vào bàn suýt đổ cốc nước."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ơ Hoài ơi! Đợi tớ… chuyện hôm trước tớ…"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Ơ… tớ chào các cậu nhé. Tớ phải về kẻo muộn."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài giật mình quay lại, gật đầu một cái rồi đi nhanh hơn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu định xin lỗi người ta hay tính bắc loa dọa bạn ấy đấy?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Oan cho tớ, tớ còn chưa kịp nói xong chữ \"xin\" mà…"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Con trai con lứa xin lỗi con gái mà gọi với qua đường như đòi nợ! Mai mời con bé cốc trà mà tạ lỗi."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "ket-thuong",
      "title": "Kết thường: chỉ là một ý kiến sinh viên",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Dạ… bọn em chỉ xác minh được đến đó ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Được. Với những gì trình bày ở buổi họp này, thầy chưa đủ căn cứ để biết ai viết thư. Còn em Hoài, em ấy không bị xử lý gì cả."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thư vẫn được tính là một ý kiến sinh viên trong hồ sơ. Chưa thu phòng ngay. CLB được sinh hoạt đến hết học kỳ, nộp báo cáo hoạt động hằng tháng."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Dạ, tháng nào bọn em cũng sẽ nộp đủ ạ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Một dòng chỉ cho ta chỗ cần đến. Phần còn lại cần thêm bằng chứng, và biết hỏi đúng lúc, đúng cách."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "tin-mo",
      "title": "Tin đồn về CLB; lọc các tin mang câu đó",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "image",
          "imageId": "obj-hop-banh-quy"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 08/10/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hơn một tuần sau buổi họp rà soát. Chiều thứ Ba, phòng CLB."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên bàn có một hộp bánh quy mới, nắp dán nhãn viết tay: \"Tài sản CLB. BQ-04. Người mua: Duy.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "BQ-04? Hôm trước mới là hộp đầu tiên mà."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ba hộp kia hết trong tuần mấy đứa kiểm tra giữa kỳ. Anh ăn cái cuối cả ba lần."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Từ tối thứ Hai, kênh sinh viên chuyền nhau một tin về CLB mình. Sáng nay cô Lan gọi chị lên hỏi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Tin gì thế ạ?"
        },
        {
          "type": "note",
          "text": "Hiếu lớp Báo chí ló đầu vào cửa, tay cầm điện thoại."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Tin này này. Tối thứ Hai mình còn bấm chuyển tiếp. Hồi lá thư mình cũng gật ầm ầm, giờ nghĩ lại thấy chưa kiểm gì cả. Gỡ rồi, sang báo một tiếng."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cảm ơn cậu. Cậu thấy nó đầu tiên ở đâu?"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Trong kênh sinh viên. Ai gửi đầu thì tớ không để ý."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thế sao tối thứ Hai cậu lại bấm chuyển làm gì? (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Tin này có từ lâu rồi, lớp nào cũng có, ai cũng chuyển thì tớ bấm theo thôi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Có từ lâu là từ bao giờ? (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Thì tớ nghe bảo thế chứ ngày nào thì ai nhớ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Tớ báo một câu thế thôi, tớ về lớp đây. (tạm)"
        },
        {
          "type": "image",
          "imageId": "chibi-v2-hieu-cua"
        },
        {
          "type": "show-document",
          "documentId": "doc-tin-don"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-noi-dung-tin"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-sao-ke-cuoi-ky"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"CLB Thám Tử soi dữ liệu sinh viên.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ơ, mình có soi ai đâu. Tra gì cũng có phiếu, lại có anh Quân ngồi giám sát mà."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Cuối kỳ là đợt rà soát phòng, cũng là lúc Phòng Kế hoạch gửi sao kê quỹ về các CLB. Chị không muốn tin này treo tới lúc đó."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Thế nên chị mới cần biết tin này bắt đầu từ đâu. Cô Lan cho mình bản xuất các tin công khai của kênh, từ tối thứ Hai tới trưa nay."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tin công khai, ai vào kênh cũng đọc được. Em nạp vào laptop rồi chị. Bản xuất ghi nguyên văn từng tin, kể cả tin bấm chuyển tiếp: bấm chuyển thì chữ giữ y nguyên."
        },
        {
          "type": "task",
          "text": "Những tin nào trong kênh mang câu tin đồn?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lọc ra các tin mang câu đó trước đã. Chưa vội đọc tên ai."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Cô Lan báo thêm: chiều thứ Ba tuần sau, 15/10, Hội Sinh viên mời CLB mình lên giải trình. Ngay sau lễ kỷ niệm buổi sáng ở hội trường. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Lên giải trình là mình phải nói gì hở chị? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Nói tin này từ đâu ra, bằng những thứ mình tra được. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy khoanh ngày 15/10 trên tờ lịch dán cạnh laptop. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-phong-v2",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 20,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-phong-duy",
              "sau": [],
              "nhan": "Duy: mở laptop",
              "dau": "chinh"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 41,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-phong-vy",
              "sau": [],
              "nhan": "Hà Vy: câu hỏi trên bảng",
              "dau": "phu"
            },
            {
              "sprite": "nv:tung",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-phong-tung",
              "sau": [],
              "nhan": "Tùng: chuyện ở căng tin",
              "dau": "phu"
            },
            {
              "sprite": "nv:minh-anh",
              "x": 83,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-phong-minh-anh",
              "sau": [],
              "nhan": "Minh Anh: xin dữ liệu",
              "dau": "phu"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-tin-bang"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Không có tin nào đúng y câu ấy. Chắc là tin còn đoạn sau. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy thử xem tin nào bắt đầu bằng câu đó, phía sau viết gì cũng được. (tạm)"
        },
        {
          "type": "goto",
          "to": "tin-tra-bat-dau"
        }
      ]
    },
    {
      "id": "tin-phong-duy",
      "title": "Vụ 2: Duy mở laptop (việc chính)",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bản xuất của cô Lan anh nạp vào máy rồi. Ngồi vào đi."
        },
        {
          "type": "image",
          "imageId": "chibi-duy-ok"
        }
      ]
    },
    {
      "id": "tin-phong-vy",
      "title": "Vụ 2: Hà Vy và câu hỏi trên bảng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Câu hỏi tớ ghim rồi: những tin nào mang đúng câu ấy?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tin đồn cũng để lại dấu chân. Chưa đọc tên ai vội."
        }
      ]
    },
    {
      "id": "tin-phong-tung",
      "title": "Vụ 2: Tùng kể chuyện nghe ở căng tin",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Trưa nay ở căng tin, hai bàn liền nhắc chuyện này. Mà chẳng ai nói được bọn mình soi cái gì."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là đa số chỉ bấm chuyển tiếp chứ có đọc đâu."
        },
        {
          "type": "image",
          "imageId": "chibi-tung-tinh-nham"
        }
      ]
    },
    {
      "id": "tin-phong-minh-anh",
      "title": "Vụ 2: Minh Anh nói về việc xin dữ liệu",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Cô Lan cho bản xuất này vì toàn tin công khai. Thứ gì không công khai thì chị phải đứng ra xin, và phải có căn cứ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Mình bị đồn là soi dữ liệu. Vậy càng phải tra đúng thứ mình được phép tra."
        }
      ]
    },
    {
      "id": "tin-tra-bat-dau",
      "title": "Thử bắt đầu bằng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "challenge",
          "challengeId": "c-tin-bat-dau"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm tin mang câu đó, từ năm tài khoản. Bốn cái là mã sinh viên. Một cái là clb_robotics."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Lại Robotics! Hôm trước là cái huy hiệu bánh răng, giờ là tài khoản. Tớ cá là…"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Đừng cá. Mới biết có năm tin mang câu đó. Tin nào có trước thì phiếu chưa nói."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Kênh của Robotics thì phải có người trực. Các em sang xưởng hỏi xem."
        },
        {
          "type": "task",
          "text": "Sang xưởng Robotics hỏi người trực kênh"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Chiều nay xưởng bên ấy sinh hoạt thành viên tới năm giờ chị ạ. Tờ lịch nhà văn hóa ghim trên bảng ghi thế. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Vậy mai hẵng sang. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hôm nay làm cho gọn danh sách tin này đã. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm tin bắt đầu bằng câu này. Mà nhỡ có người gõ thêm gì đằng trước thì sao? (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Lại còn thế nữa. Tìm tiếp đi cậu. (tạm)"
        },
        {
          "type": "goto",
          "to": "tin-tra-chua"
        }
      ]
    },
    {
      "id": "tin-tra-chua",
      "title": "Thử chứa",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "challenge",
          "challengeId": "c-tin-chua"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Lên tám tin. Hai tin có chữ gõ thêm đằng trước câu ấy. Còn một tin nói chuyện khác: \"Nghe nói CLB Thám Tử soi điểm\". (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Tin chuyện điểm không phải câu tin đồn, phải loại ra. Chỉ giữ tin có đúng câu ấy, dù người ta gõ thêm gì đằng trước, đằng sau. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy tìm theo đoạn dài hơn của câu ấy, đoạn mà tin chuyện điểm không có. (tạm)"
        },
        {
          "type": "goto",
          "to": "tin-n1-chot"
        }
      ]
    },
    {
      "id": "tin-n1-chot",
      "title": "Cuối chiều 08/10: khép danh sách, hẹn mai",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Trong mấy tin vừa ra có một tin nói chuyện khác hẳn, phải bỏ ra. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Còn hai tin gõ thêm chữ, mai xem là của ai. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mai ba giờ chiều, đủ mặt nhé. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy đậy nắp hộp bánh quy BQ-04, gạch thêm một vạch lên nhãn dán. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Đói quá rồi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Về phòng ăn tối không? (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-n1-toi",
          "asker": {
            "speaker": "player",
            "text": "Về phòng KTX ăn tối"
          },
          "choices": [
            {
              "id": "go-tin-n1-toi",
              "text": "Về phòng KTX ăn tối",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-n1-toi"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n1-toi",
      "title": "Tối 08/10, phòng 408: mất nước nóng, điện thoại rung (không khí ký túc xá, không có manh mối)",
      "canh": "phong-ktx-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tối, phòng 408. Cả tầng lại mất nước nóng. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng xách xô xuống vòi tầng dưới. Mười phút sau quay lên, xô vẫn rỗng. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Hàng xô xếp tới tận cầu thang. Thôi, tắm nước lạnh vậy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Điện thoại của Tùng rung trên giường. Rồi rung tiếp. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nhóm lớp, nhóm quê, đứa nào cũng gửi cái tin kia, kèm cái mặt cười. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng tắt tiếng, úp điện thoại xuống gối. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu có trả lời ai không? (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Định cãi, rồi thôi. Cãi bằng gì bây giờ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng lôi cuốn sổ nợ ra, lật tới dòng chín. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Nửa gói mì, chủ nợ là cậu. Cho tớ khất tới thứ Sáu nhé. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Mà tớ cá mai có nước nóng lại. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mười một giờ, đèn hành lang tắt. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Ở nhà giờ này là mẹ tớ quát đi ngủ rồi đấy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hai đứa cười trong bóng tối. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "tin-n2-mo",
      "title": "Chiều 09/10, phòng CLB: Minh Anh ở chỗ cô Lan về",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Tư, 09/10/2024"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị vừa ở chỗ cô Lan về, cô hỏi CLB mình đã tới đâu rồi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy chỉ lên bảng. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hôm qua còn lẫn một tin chuyện khác. Hai tin gõ thêm chữ thì chưa biết của ai. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Sáng nay có bạn cùng lớp hỏi đùa tớ: có tra điểm tớ không đấy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ cười trừ, chẳng biết đáp sao. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Vậy hôm nay gom cho xong mấy tin đó đã. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-phong-n2-v2",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 20,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-n2-duy",
              "sau": [],
              "nhan": "Duy: mở laptop",
              "dau": "chinh"
            },
            {
              "sprite": "nv:tung",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-n2-tung",
              "sau": [],
              "nhan": "Tùng: điện thoại rung",
              "dau": "phu"
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n2-duy",
      "title": "Duy chỉ mấy tin lệch chữ (việc chính)",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy mở lại bản xuất tin công khai trên màn hình. (tạm)"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Các em nhìn hai tin này đi, chữ khác hẳn các tin kia. (tạm)"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Như có người ngồi gõ lại bằng tay. (tạm)"
        },
        {
          "type": "goto",
          "to": "tin-tra-sach"
        }
      ]
    },
    {
      "id": "tin-n2-tung",
      "title": "Tùng đọc tin nhắn nhóm lớp",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nhóm lớp tớ có đứa định đăng ký CLB mình. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Giờ nó nhắn vào nhóm: thôi để sau. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy không nói gì. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chỉ mở vở, ghi thêm một dòng. (tạm)"
        }
      ]
    },
    {
      "id": "tin-tra-sach",
      "title": "Thử chứa cả đoạn dài",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "challenge",
          "challengeId": "c-tin-sach"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Còn bảy tin. Tin chuyện điểm không còn nữa. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Hai mã sinh viên này lạ, gửi tầm trưa hôm qua. Xem riêng tin của hai mã ấy đi. (tạm)"
        },
        {
          "type": "goto",
          "to": "tin-tra-in"
        }
      ]
    },
    {
      "id": "tin-tra-in",
      "title": "Thử IN hai tài khoản",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "challenge",
          "challengeId": "c-tin-in"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Hai tin này ghi loại là trả lời. Hai mã sinh viên đều K24 khoa Kế toán, cùng khoa tớ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Trả lời bên dưới tin người khác à. Tớ cá là hai bạn ấy... (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Khoan cá đã. Hai bạn ấy cũng chỉ gõ lại câu cũ thôi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Việc hôm nay là tìm xem tin này bắt đầu từ đâu. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Các em sang xưởng Robotics, hỏi người trực kênh bên đó. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-bd-v2",
          "kieu": "ban-do",
          "gio": "16:30",
          "diem": [
            {
              "sprite": "ghim:xuong",
              "x": 21,
              "y": 24,
              "rong": 5,
              "chuoi": "tin-gap-nam",
              "sau": [],
              "nhan": "Xưởng Robotics",
              "dau": "chinh"
            },
            {
              "sprite": "ghim:cang-tin",
              "x": 88,
              "y": 41,
              "rong": 5,
              "chuoi": "tin-bd-cang-tin",
              "sau": [],
              "nhan": "Căng tin",
              "dau": "phu"
            },
            {
              "sprite": "ghim:tra-da",
              "x": 41,
              "y": 86,
              "rong": 5,
              "chuoi": "tin-bd-tra-da",
              "sau": [],
              "nhan": "Quán trà đá",
              "dau": "phu",
              "co": [
                "ba-lua"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-bd-cang-tin",
      "title": "Bản đồ Vụ 2 (tùy chọn): căng tin giờ tan học",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-tin-bd-cang-tin",
          "diem": [
            {
              "sprite": "nv:tung",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-bd-cang-tin-vao",
              "sau": [],
              "nhan": "Tùng",
              "dau": "chinh"
            },
            {
              "sprite": "vung:bang-den",
              "x": 48,
              "y": 20,
              "rong": 9,
              "chuoi": "tin-bd-cang-tin-an",
              "sau": [],
              "nhan": "Tấm bảng đen trên quầy"
            }
          ]
        }
      ]
    },
    {
      "id": "tin-bd-cang-tin-vao",
      "title": "Tới nơi: Bản đồ Vụ 2 (tùy chọn): căng tin giờ tan học",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Căng tin giờ tan học. Điện thoại Tùng rung liền mấy tiếng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nhóm lớp tớ cũng vừa có đứa chuyển tiếp cái tin ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chuyển tiếp thì dễ. Mình đi tìm người gửi đầu tiên."
        }
      ]
    },
    {
      "id": "tin-bd-cang-tin-an",
      "title": "Chi tiết ẩn: Tấm bảng đen trên quầy",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Dòng phấn \"Nợ quá ba cốc thì ghi tên vào đây\" giờ có thêm hai cái tên. Một cái viết nét to, gạch đi rồi viết lại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Không phải tớ. Tớ chỉ… ghé xem thôi."
        }
      ]
    },
    {
      "id": "tin-bd-tra-da",
      "title": "Bản đồ Vụ 2 (tùy chọn): quán trà đá, chuyện hai cuốn sổ",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-tin-bd-tra-da",
          "diem": [
            {
              "sprite": "nv:ba-lua",
              "x": 46,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-bd-tra-da-vao",
              "sau": [],
              "nhan": "Bà bán trà đá",
              "dau": "chinh"
            },
            {
              "sprite": "vung:xe-dap",
              "x": 62.5,
              "y": 53,
              "rong": 16,
              "chuoi": "tin-bd-tra-da-an",
              "sau": [],
              "nhan": "Chiếc xe đạp cũ"
            }
          ]
        }
      ]
    },
    {
      "id": "tin-bd-tra-da-vao",
      "title": "Tới nơi: Bản đồ Vụ 2 (tùy chọn): quán trà đá, chuyện hai cuốn sổ",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quán trà đá cổng trường, giờ tan học. Khách vừa vãn, ghế nhựa còn trống mấy cái."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Mấy đứa ở phòng tầng hai nhà câu lạc bộ, cái phòng có tủ sắt, phải không? Ngồi đi, ba trà đá."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bà nhớ bọn cháu này!"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Bà nhớ cái phòng. Hồi xưa có một cậu sinh viên trông phòng ấy, chiều nào cũng ra đây. Hè cũng gọi trà nóng nên bà gọi là \"cậu trà nóng\"."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Cậu ấy có hai cuốn sổ. Một cuốn bìa cứng đã sờn, một cuốn mới tinh. Ngồi đúng cái ghế cháu đang ngồi, chép từ cuốn cũ sang cuốn mới, chép cả tháng trời."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chép lại cả cuốn ạ? Sao anh ấy không dùng luôn cuốn cũ?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Bà cũng hỏi thế. Cậu ấy bảo: \"Cuốn cũ có chỗ cháu không muốn người sau chép theo.\""
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chép lại mà bỏ đi một chỗ. Tớ muốn biết chỗ bị bỏ."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tra-da-2"
            }
          ]
        },
        {
          "type": "note",
          "text": "Trong cổng, Hoài ôm cặp đi về phía giảng đường B. Tùng nhổm dậy nửa chừng rồi lại ngồi xuống."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cậu định gọi à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Lần trước tớ gọi giật, bạn ấy đi nhanh gấp đôi. Để hôm khác. Tớ chưa nghĩ ra câu mở đầu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Câu mở đầu là \"xin lỗi\". Có hai chữ."
        }
      ]
    },
    {
      "id": "tin-bd-tra-da-an",
      "title": "Chi tiết ẩn: Chiếc xe đạp cũ",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiếc xe đạp cũ dựng cạnh tường, giỏ xe đựng một cuốn sổ bìa xanh quăn mép."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Sổ ghi nợ của quán. Thời nào cũng có một cuốn sổ như thế."
        }
      ]
    },
    {
      "id": "tin-gap-nam",
      "title": "Xưởng Robotics: gặp Nam, tìm tin gốc",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đường sang nhà văn hóa, ngang qua sân bóng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là tới nơi sẽ có một ông mặt gian gian ngồi sẵn cạnh máy tính."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu vừa kết án một người chưa gặp, bằng một cái máy chưa thấy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Thì tớ đoán cho vui."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Đoán cho vui thì được. Đừng ghi vào hồ sơ là được."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Câu ấy thì tớ cho ghi."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xưởng của CLB Robotics nằm cuối dãy nhà văn hóa. Một cậu đang dán nhãn hộp linh kiện, ngẩng lên khi thấy cả nhóm."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người lạ đấy. Mình nhìn một lượt trước rồi hẵng hỏi."
        },
        {
          "type": "explore",
          "id": "kp-soi-nam",
          "kieu": "quan-sat",
          "nhanVat": "nam",
          "haVySoi": true,
          "diem": [
            {
              "sprite": "vung:hop",
              "x": 76,
              "y": 66,
              "rong": 26,
              "chuoi": "tin-soi-hop",
              "sau": [],
              "nhan": "Cái hộp trên tay"
            },
            {
              "sprite": "vung:but",
              "x": 42,
              "y": 52,
              "rong": 13,
              "chuoi": "tin-soi-but",
              "sau": [],
              "nhan": "Cây bút dạ"
            },
            {
              "sprite": "vung:tay-ao",
              "x": 10,
              "y": 62,
              "rong": 18,
              "chuoi": "tin-soi-tay-ao",
              "sau": [],
              "nhan": "Tay áo"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Mấy em tìm ai? Ban chủ nhiệm chiều nay đi họp cả rồi."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bọn em bên CLB Thám Tử. Kênh của Robotics do ai trực ạ?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh. Anh là Nam. Bài tuyển thành viên, lịch xưởng, đều anh đăng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thế cái tin \"CLB Thám Tử soi dữ liệu sinh viên\" cũng là anh đăng à?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tin nào cơ? Cho anh xem."
        },
        {
          "type": "note",
          "text": "Nam đọc phiếu năm tin."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Năm dòng này lẫn cả tin chuyển tiếp. Chuyển tiếp thì ai cũng bấm được. Muốn biết nó bắt đầu từ đâu thì tìm tin gốc ấy. Kênh có ghi loại của từng tin."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Năm tin này mình in ra từ hôm qua. Giờ tìm lại trong cả kênh, vẫn đoạn dài của câu ấy, chỉ giữ tin tự viết."
        },
        {
          "type": "task",
          "text": "Trong năm tin đó, tin nào là tin gốc?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vẫn đoạn dài của câu tin đồn như lúc nãy, chỉ giữ tin tự viết."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tin-goc"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-tin-goc"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Một tin gốc. 22 giờ 40 tối thứ Hai, mùng 7. Tài khoản clb_robotics."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "…Từ kênh của bọn anh thật à."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Kênh của anh, tài khoản của anh. Thế thì còn ai vào đây nữa?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh chỉ đăng bài buổi chiều. 22 giờ 40 thì anh không ngồi kênh."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ai trực kênh mà chẳng nói thế."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Thế em tưởng mỗi mình anh có mật khẩu à? Cả ban chủ nhiệm đều biết. Giờ đó xưởng còn mở, ai chả vào máy được, sao cứ đổ cho anh."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Xưởng mở giờ đó á? Ngoài cửa có dán bảng đăng ký kia kìa."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Còn mật khẩu nhiều người biết thì kênh có ghi ai đăng nhập không? Không có thì bọn em nhờ bên quản trị trường mở."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "…Khỏi nhờ. Anh là quản trị kênh, anh mở nhật ký đăng nhập được. Mai các em qua mà xem, xem cả bảng ngoài cửa luôn."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Vậy là hai chỗ kiểm được. Xem cả hai, hay xem một rồi về báo chị Minh Anh, tùy mình."
        },
        {
          "type": "image",
          "imageId": "chibi-v2-tung-chi-nam"
        },
        {
          "type": "note",
          "text": "Cửa xưởng mở. Một anh áo sơ mi trắng bước vào, thẻ Hội sinh viên đeo ở cổ, đi thẳng tới kệ hồ sơ."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Nam, ban tổ chức cho đội mình lùi hạn lệ phí tới hết tháng 11 rồi, anh vừa xin được. Cứ tập tiếp đi. Anh lấy tập hồ sơ giải rồi quay lại họp. Có khách à?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Các bạn bên CLB Thám Tử ạ. Hỏi chuyện cái tin trong kênh."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Anh là Khánh, trưởng CLB. Tin ấy anh có nghe. Kênh thì Nam trực, các em cần xem gì cứ để Nam mở, bên anh không giấu. Hỏi nhẹ thôi nhé, em nó sắp thi đấu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Anh Khánh chủ tịch Hội sinh viên đấy."
        },
        {
          "type": "note",
          "text": "Khánh kẹp tập hồ sơ, vỗ vai Nam rồi đi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh Khánh lo cho đội lắm. Kinh phí đi giải năm nay toàn anh ấy chạy."
        },
        {
          "type": "image",
          "imageId": "cg-v2-khanh-xuong"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ngay-gui"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Giờ anh phải dọn chỗ. Tối nay đội ở lại tập tới chín giờ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Chiều mai các em qua, anh mở sẵn cho mà xem. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ra tới cửa, Hà Vy nhìn tờ bảng đăng ký dán ở đó một lúc, không nói gì. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-n2-het",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB báo chị Minh Anh"
          },
          "choices": [
            {
              "id": "go-tin-n2-het",
              "text": "Về phòng CLB báo chị Minh Anh",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-n2-het"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-soi-hop",
      "title": "Quan sát Nam: cái hộp linh kiện",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Hộp các tông đựng linh kiện, túi nào cũng dán nhãn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người giữ sổ sách của xưởng. Chuyện giấy tờ, giờ giấc thì hỏi cậu này."
        }
      ]
    },
    {
      "id": "tin-soi-but",
      "title": "Quan sát Nam: cây bút dạ",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Bút dạ còn mở nắp."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Đang dán nhãn dở. Mình tới bất ngờ, cậu ấy không chuẩn bị gì trước."
        }
      ]
    },
    {
      "id": "tin-soi-tay-ao",
      "title": "Quan sát Nam: tay áo xắn",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Tay áo khoác xắn tới khuỷu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Người làm việc ở xưởng, không phải người ngồi họp."
        }
      ]
    },
    {
      "id": "tin-n2-het",
      "title": "Cuối chiều 09/10, phòng CLB: báo giờ gửi, hẹn mai sang xưởng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mai chị báo cô Lan được một điều chắc: giờ gửi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Gửi từ đâu thì mình chưa biết. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thế còn anh Nam hả chị? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chị chưa nói tên ai cả. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chỗ đó để ngỏ, mai tính tiếp. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy viết \"22:40\" lên góc bảng. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bên cạnh con số, Duy chừa một khoảng trống. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "tin-n3-mo",
      "title": "Sáng 10/10, phòng 408: Hiếu nhắn hẹn ra căng tin",
      "canh": "phong-ktx",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Năm, 10/10/2024"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hiếu nhắn tớ này: \"Trưa ra căng tin, tớ có chuyện.\" (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Khéo Hiếu định cãi chuyện bấm chuyển hôm nọ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chưa gặp mà cậu đã định cá à? (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Cá luôn. Tớ cá Hiếu ra xin lỗi bọn mình. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Trưa nay ra sớm một tí, kẻo hết chỗ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ra sớm thì được. Cá thì tớ không theo. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-n3-cang-tin",
          "asker": {
            "speaker": "player",
            "text": "Đi cùng Tùng ra căng tin"
          },
          "choices": [
            {
              "id": "go-tin-n3-cang-tin",
              "text": "Đi cùng Tùng ra căng tin",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-n3-cang-tin"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n3-cang-tin",
      "title": "Căng tin giờ trưa: Hiếu ngồi bàn trong",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Giờ trưa, căng tin đông nghịt. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bàn nào cũng có người cúi vào điện thoại. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hiếu ngồi một mình ở bàn trong cùng, khay cơm còn nguyên. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-toi-n3-cang-tin",
          "diem": [
            {
              "sprite": "nv:hieu",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "tin-n3-hieu",
              "sau": [],
              "nhan": "Hiếu",
              "dau": "chinh"
            },
            {
              "sprite": "vung:bang-den",
              "x": 48,
              "y": 20,
              "rong": 9,
              "chuoi": "tin-n3-cang-tin-an",
              "sau": [],
              "nhan": "Tấm bảng đen trên quầy"
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n3-hieu",
      "title": "Đối chất Hiếu: tin có từ lâu, ai cũng chuyển",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Sáng nay lớp tớ bàn cái tin ấy suốt giờ giải lao. (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Nghe xong tớ càng nghĩ các cậu đang lo thừa. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Cậu đã xem bọn tớ tìm được gì đâu. (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Thế các cậu tìm được gì nào? (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy đặt điện thoại xuống bàn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu đưa bạn ấy xem thứ mình có đi. (tạm)"
        },
        {
          "type": "doi-chat",
          "id": "dc-tin-hieu",
          "asker": {
            "speaker": "hieu",
            "text": "Lớp tớ ai cũng bảo thế. **Tin này có từ lâu rồi, ai cũng chuyển**, các cậu làm to chuyện làm gì."
          },
          "cauHoi": "Tin này bắt đầu từ lúc nào, từ một chỗ hay từ khắp nơi? Trình thẻ cho thấy điều đó.",
          "bangChung": [
            {
              "id": "ev-tin-goc",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Cả bản xuất chỉ có đúng một tin tự viết mang câu ấy, gửi lúc 22 giờ 40 tối thứ Hai. Mấy tin còn lại đều chép lại nó. (tạm)"
                },
                {
                  "speaker": "player",
                  "text": "Tin có từ lâu thì tin đầu tiên đã phải là tin chuyển tiếp rồi. (tạm)"
                },
                {
                  "speaker": "hieu",
                  "expression": "surprised",
                  "text": "Tối thứ Hai tuần này á? Thế mà lớp tớ cứ tưởng chuyện từ năm ngoái. (tạm)"
                }
              ]
            },
            {
              "id": "clue-tin-goc",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Kênh ghi loại của từng tin: tin tự viết, tin bấm chuyển, tin gõ trả lời. (tạm)"
                },
                {
                  "speaker": "hieu",
                  "expression": "annoyed",
                  "text": "Thì đấy, bấm chuyển nhiều thế còn gì. (tạm)"
                },
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Biết có mấy loại tin là một chuyện. Tin tự viết gửi lúc nào thì phải có phiếu. (tạm)"
                }
              ]
            },
            {
              "id": "ev-tin-don",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "hieu",
                  "expression": "neutral",
                  "text": "Đấy, mấy tài khoản cùng mang một câu. Đúng là ai cũng chuyển. (tạm)"
                },
                {
                  "speaker": "tung",
                  "expression": "gai-dau",
                  "text": "Ơ, tờ này lại đứng về phía cậu ấy. (tạm)"
                }
              ]
            },
            {
              "id": "doc-tin-don",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "hieu",
                  "expression": "neutral",
                  "text": "Ảnh chụp ghi chuyển tiếp nhiều lần. Đúng ý tớ còn gì. (tạm)"
                },
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Ảnh chỉ nói từ tối thứ Hai. Trước đó có hay không thì ảnh chưa nói. (tạm)"
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Bọn tớ chưa chỉ ra được nó bắt đầu từ đâu. (tạm)"
            },
            {
              "speaker": "hieu",
              "expression": "neutral",
              "text": "Thế thì tớ vẫn nghĩ như cũ. (tạm)"
            }
          ],
          "khac": [
            {
              "speaker": "hieu",
              "expression": "annoyed",
              "text": "Cái này thì dính gì tới tin đồn? (tạm)"
            }
          ],
          "hetLuot": [
            {
              "speaker": "hieu",
              "expression": "annoyed",
              "text": "Thôi, các cậu cứ tra tiếp đi. Tớ ăn cho xong bữa. (tạm)"
            },
            {
              "speaker": "ha-vy",
              "expression": "neutral",
              "text": "Mình về đọc lại hồ sơ đã. (tạm)"
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-tin-hieu-du"
          },
          "to": "tin-n3-hieu-du"
        },
        {
          "type": "goto",
          "to": "tin-n3-hieu-chua"
        }
      ]
    },
    {
      "id": "tin-n3-hieu-du",
      "title": "Hiếu gửi tin đính chính vào nhóm lớp",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hiếu mở nhóm lớp, gõ một dòng. Xóa đi. Gõ lại. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Lần này Hiếu bấm gửi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Lát sau, bàn bên có đứa đọc to dòng đính chính ấy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Hôm ấy tớ thấy là bấm chuyển luôn, chẳng kiểm gì. (tạm)"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Tớ sai. Cảm ơn các cậu đã cho xem. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-n3-xuong",
          "asker": {
            "speaker": "player",
            "text": "Đi cùng Tùng sang xưởng Robotics"
          },
          "choices": [
            {
              "id": "go-tin-n3-xuong",
              "text": "Đi cùng Tùng sang xưởng Robotics",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-n3-xuong"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n3-hieu-chua",
      "title": "Hiếu trả khay, bàn bên vẫn đọc to cái tin",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hiếu cầm khay đứng dậy, đi trả. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bàn bên có mấy đứa đọc to cái tin kia, cười ồ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng chống tay định đứng lên. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hà Vy giữ tay áo Tùng lại. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Kệ đi. Về phòng đã. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-n3-xuong",
          "asker": {
            "speaker": "player",
            "text": "Đi cùng Tùng sang xưởng Robotics"
          },
          "choices": [
            {
              "id": "go-tin-n3-xuong",
              "text": "Đi cùng Tùng sang xưởng Robotics",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-n3-xuong"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n3-cang-tin-an",
      "title": "Chi tiết ẩn: dòng phấn bị xóa nhòe",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên bảng đen, dòng phấn \"Nợ quá ba cốc thì ghi tên vào đây\" vẫn còn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bên dưới có ai viết thêm \"CLB soi\", rồi lấy tay quẹt nhòe. (tạm)"
        }
      ]
    },
    {
      "id": "tin-n3-xuong",
      "title": "Chiều 10/10, xưởng Robotics: Nam mở sẵn nhật ký",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Nhật ký đăng nhập anh mở sẵn trên máy xưởng số hai rồi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Biển trên cửa ghi mã phòng này: XR-01. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng liếc sang tờ bảng đăng ký dán ngay bên dưới. (tạm)"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Hai chỗ đều sẵn cả rồi đấy. (tạm)"
        },
        {
          "type": "branch",
          "id": "r-tin-tuyen",
          "asker": {
            "speaker": "ha-vy",
            "text": "Hai chỗ anh Nam chỉ hôm qua. Xem chỗ nào trước?"
          },
          "choices": [
            {
              "id": "may",
              "text": "Nhật ký đăng nhập của kênh.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-tuyen-may"
                }
              ]
            },
            {
              "id": "xuong",
              "text": "Bảng đăng ký dùng xưởng ngoài cửa.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-tuyen-xuong"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-tuyen-may",
      "title": "Tuyến dữ liệu: nhật ký đăng nhập của kênh",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Ngày 07/10, tài khoản kênh đăng nhập những lần nào, từ máy nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tài khoản thì có trên phiếu tin gốc. Ngày là mùng 7. Lần nào khớp giờ tin gửi thì so sau."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Bảng này ghi tài khoản nào đăng nhập, từ máy nào, ngày nào, giờ nào. Anh chỉ mở ra thôi, không lọc gì."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Mã máy thì thế này: MAY-XUONG-01 và 02 là hai máy bàn ngoài xưởng, ai tập cũng dùng. MAY-VP-XUONG là máy trong phòng văn phòng nhỏ của xưởng, chỗ ban chủ nhiệm ngồi. DIEN-THOAI là đăng nhập bằng điện thoại."
        },
        {
          "type": "challenge",
          "challengeId": "c-tin-may"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ngày mùng 7 có hai lần. 15 giờ 10 từ máy xưởng số 2. 22 giờ 31 từ máy văn phòng xưởng."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Lần buổi chiều là anh, anh hay ngồi máy số 2. Lần buổi tối thì không phải anh. Phòng văn phòng là phòng riêng, thường khóa, chìa thì ban chủ nhiệm giữ. Anh có vào đó bao giờ đâu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Đăng nhập 22:31, tin gửi 22:40. Khớp giờ. Nhưng mới biết máy nào, chưa biết ai ngồi máy."
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "ev-tin-xuong"
          },
          "to": "tin-may-doi-chieu"
        },
        {
          "type": "branch",
          "id": "r-tin-sau-may",
          "asker": {
            "speaker": "ha-vy",
            "text": "Còn chỗ thứ hai Nam chỉ: bảng đăng ký dùng xưởng. Xem nốt, hay về báo chị Minh Anh?"
          },
          "choices": [
            {
              "id": "di-not",
              "text": "Ra cửa xem nốt bảng đăng ký.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-tuyen-xuong"
                }
              ]
            },
            {
              "id": "ve",
              "text": "Về báo chị Minh Anh.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-ket"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-may-doi-chieu",
      "title": "Đã xem bảng xưởng rồi mới xem nhật ký: Tùng đối chiếu hai nguồn",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Khoan! Bảng xưởng ghi tối đó đội thi đấu tập tới 23 giờ, anh bảo anh về sớm. Mà 22 giờ 31 tài khoản của anh đăng nhập ngay trong phòng văn phòng xưởng thì sao?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "…Tài khoản của kênh, không phải của anh. Anh về trước 22 giờ. Phòng văn phòng thường khóa, chìa ban chủ nhiệm giữ, anh không có."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khớp giờ, khớp máy. Nhưng lịch là đăng ký, không phải điểm danh. Hai bảng ấy chẳng bảng nào có tên người, Tùng ạ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…Ừ thì chưa có tên."
        },
        {
          "type": "branch",
          "id": "go-with-tin-ket",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB báo chị Minh Anh"
          },
          "choices": [
            {
              "id": "go-tin-ket",
              "text": "Về phòng CLB báo chị Minh Anh",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-ket"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-tuyen-xuong",
      "title": "Tuyến hiện trường: bảng đăng ký dùng xưởng",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cạnh cửa xưởng dán tờ bảng đăng ký dùng xưởng, ô nào cũng chi chít chữ viết tay. Góc tờ ghi \"bản sao từ lịch đặt xưởng trên máy\"."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Khoan, góc bảng ghi \"bản sao từ lịch đặt xưởng trên máy\". Cổng tra cứu lịch của nhà văn hóa mở cho sinh viên, để anh tải bản gốc về laptop tra cho chắc. Chữ tay dễ chép nhầm."
        },
        {
          "type": "task",
          "text": "Tối 07/10, xưởng được đăng ký từ mấy giờ tới mấy giờ, cho hoạt động nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ngày là mùng 7. Lịch đặt xưởng ghi theo ngày."
        },
        {
          "type": "show-document",
          "documentId": "doc-lich-xuong"
        },
        {
          "type": "challenge",
          "challengeId": "c-tin-xuong"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-xuong-toi"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thứ Hai mùng 7, từ 19 giờ tới 23 giờ: xưởng đăng ký cho đội thi đấu tập."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tối đó đội ở lại tập. Anh cũng trong đội, nhưng anh về sớm."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Về sớm thì ai làm chứng cho anh?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Bọn nó cắm mặt hàn mạch, có ai ngẩng lên xem anh về lúc nào. Với lại máy văn phòng đặt trong phòng riêng, thường khóa. Chìa do ban chủ nhiệm giữ, thành viên như anh không có quyền đụng vào. Anh về rồi thì ai vào đó ngồi, anh chịu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lịch đăng ký tới 23 giờ, tin gửi 22:40. Nhưng đăng ký chưa chắc đã có mặt."
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "ev-tin-may"
          },
          "to": "tin-xuong-doi-chieu"
        },
        {
          "type": "branch",
          "id": "r-tin-sau-xuong",
          "asker": {
            "speaker": "ha-vy",
            "text": "Còn chỗ thứ nhất Nam chỉ: nhật ký đăng nhập của kênh. Xem nốt, hay về báo chị Minh Anh?"
          },
          "choices": [
            {
              "id": "di-not",
              "text": "Xem nốt nhật ký đăng nhập.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-tuyen-may"
                }
              ]
            },
            {
              "id": "ve",
              "text": "Về báo chị Minh Anh.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-ket"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-xuong-doi-chieu",
      "title": "Đã xem nhật ký rồi mới xem bảng xưởng: Tùng đối chiếu hai nguồn",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Khoan! Nhật ký kênh ghi 22 giờ 31 tài khoản đăng nhập từ máy văn phòng xưởng. Giờ bảng này ghi tối đó xưởng mở tới 23 giờ cho đội tập. Anh bảo anh về sớm?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Về trước 22 giờ. Còn phòng văn phòng thì thường khóa, chìa ban chủ nhiệm giữ, anh không có."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khớp giờ, khớp máy. Nhưng lịch là đăng ký, không phải điểm danh. Hai bảng ấy chẳng bảng nào có tên người, Tùng ạ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…Ừ thì chưa có tên."
        },
        {
          "type": "branch",
          "id": "go-with-tin-ket",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB báo chị Minh Anh"
          },
          "choices": [
            {
              "id": "go-tin-ket",
              "text": "Về phòng CLB báo chị Minh Anh",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-ket"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-ket",
      "title": "Về phòng CLB báo lại",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "va",
            "cac": [
              {
                "kind": "co",
                "id": "ev-tin-may"
              },
              {
                "kind": "co",
                "id": "ev-tin-xuong"
              }
            ]
          },
          "to": "tin-ket-du"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thế nào rồi?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tin gốc gửi lúc 22:40 tối thứ Hai, từ tài khoản kênh của CLB Robotics ạ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Anh Nam nói ra hai chỗ kiểm được. Bọn em mới xem một, chỗ kia chưa xem."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Một nguồn thì chị chưa nói với cô Lan được. Nói có sách, mách có chứng: chứng phải hai. Các em quay lại xưởng, xem nốt chỗ kia rồi về."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Biết thế xem luôn cho rồi."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "dat-co",
              "co": "tin-ve-som"
            }
          ]
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "ev-tin-may"
          },
          "to": "tin-ket-quay-xuong"
        },
        {
          "type": "goto",
          "to": "tin-ket-quay-may"
        }
      ]
    },
    {
      "id": "tin-ket-quay-may",
      "title": "Chưa xem nhật ký: quay lại xưởng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "branch",
          "id": "go-with-tin-tuyen-may",
          "asker": {
            "speaker": "player",
            "text": "Quay lại xưởng xem nhật ký đăng nhập"
          },
          "choices": [
            {
              "id": "go-tin-tuyen-may",
              "text": "Quay lại xưởng xem nhật ký đăng nhập",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-tuyen-may"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-ket-quay-xuong",
      "title": "Chưa xem bảng đăng ký: quay lại xưởng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "branch",
          "id": "go-with-tin-tuyen-xuong",
          "asker": {
            "speaker": "player",
            "text": "Quay lại xưởng xem bảng đăng ký"
          },
          "choices": [
            {
              "id": "go-tin-tuyen-xuong",
              "text": "Quay lại xưởng xem bảng đăng ký",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-tuyen-xuong"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-ket-du",
      "title": "Về phòng CLB báo lại, đủ hai hướng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thế nào rồi?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tin gốc gửi lúc 22:40 tối thứ Hai, từ tài khoản kênh của CLB Robotics ạ. Tài khoản ấy đăng nhập lúc 22:31 từ máy văn phòng xưởng. Tối đó xưởng đăng ký mở tới 23 giờ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Anh Nam nói ra hai chỗ kiểm được, bọn em xem cả hai. Giờ và chỗ khớp nhau, còn tên người thì không nguồn nào có."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hai nguồn riêng cùng khớp. Còn ai ngồi máy thì bảng không trả lời được. Đúng cái \"kiểm hai lần\" ở trang đầu sổ CLB."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nhắc mới nhớ. Trang \"Kiểm hai lần\" trong sổ… khoan đã."
        },
        {
          "type": "note",
          "text": "Duy lật sổ CLB. Nếu nhóm đi đủ hai hướng ngay từ đầu, một mẩu giấy rơi ra."
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "tin-ve-som"
          },
          "to": "tin-n3-phong"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-nhan-linh-2"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Kẹp ở trang \"Kiểm hai lần\". Một mẩu giấy, vẫn thứ mực xanh cũ ấy."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Sổ này chép lại từ một cuốn cũ hơn. Cuốn cũ vẫn nằm trong phòng này.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thế cuốn cũ nằm đâu?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tớ cũng chưa biết. Cứ cất vào hồ sơ đã."
        },
        {
          "type": "image",
          "imageId": "chibi-v2-manh-giay-linh"
        },
        {
          "type": "goto",
          "to": "tin-n3-phong"
        }
      ]
    },
    {
      "id": "tin-n3-phong",
      "title": "Cuối chiều 10/10, phòng CLB: giấy mời giải trình",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Minh Anh đặt tờ giấy mời lên bàn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Hai giờ chiều thứ Ba, 15/10, phòng Công tác sinh viên. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Ban Pháp chế Hội Sinh viên chủ trì, cô Lan cũng dự. (tạm)"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tuần này có hai bạn rút đơn đăng ký thành viên mới. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Chuyện ở căng tin trưa nay, lát em kể chị sau ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Cuối tuần này CLB nghỉ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chiều thứ Hai lên phòng, mình tập trước với nhau. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Vâng ạ. Thế cuối tuần em về quê một chuyến. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "tin-n5-mo",
      "title": "Trưa 14/10, phòng 408: sau ba ngày cuối tuần",
      "canh": "phong-ktx",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai, 14/10/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ba ngày cuối tuần, CLB nghỉ. Kênh sinh viên vẫn có người chuyển cái tin ấy, thưa dần. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trưa thứ Hai, Tùng ở quê lên, xách theo một túi bánh. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Mẹ tớ gói cả rổ bánh khúc, bắt mang đi bằng được. Cậu ăn không? (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cho tớ một cái. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chiều nay tập ở phòng CLB đấy. Mai là lên giải trình rồi. (tạm)"
        },
        {
          "type": "explore",
          "id": "kp-bd-n5",
          "kieu": "ban-do",
          "gio": "14:00",
          "diem": [
            {
              "sprite": "ghim:nha-clb",
              "x": 45,
              "y": 17,
              "rong": 5,
              "chuoi": "tin-n5-phong",
              "sau": [],
              "nhan": "Phòng CLB",
              "dau": "chinh"
            },
            {
              "sprite": "ghim:toa-b",
              "x": 48,
              "y": 29,
              "rong": 5,
              "chuoi": "tin-n5-toa-b",
              "sau": [],
              "nhan": "Sảnh tòa B",
              "dau": "phu",
              "co": [
                "bac-tu"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n5-toa-b",
      "title": "Bản đồ 14/10 (tùy chọn): sảnh tòa B treo băng rôn",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-n5-toa-b",
          "diem": [
            {
              "sprite": "nv:bac-tu",
              "x": 78,
              "y": 100,
              "rong": 16,
              "chuoi": "tin-n5-toa-b-vao",
              "sau": [],
              "nhan": "Bác bảo vệ",
              "dau": "phu"
            },
            {
              "sprite": "vung:bang-tin",
              "x": 43.3,
              "y": 37.4,
              "rong": 9.4,
              "chuoi": "tin-n5-toa-b-an",
              "sau": [],
              "nhan": "Bảng tin cạnh cột"
            }
          ]
        }
      ]
    },
    {
      "id": "tin-n5-toa-b-vao",
      "title": "Tới nơi: bác Thịnh hỏi chuyện tin đồn",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bác Thịnh đứng trên ghế, đang treo băng rôn lễ kỷ niệm ngày mai. (tạm)"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Mấy đứa CLB Thám Tử đấy à? Giữ hộ bác đầu băng rôn này cái. (tạm)"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Mà các cháu soi điểm sinh viên thật đấy à? Thằng cháu bác ở quê cũng gửi cho bác cái tin ấy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Không có đâu bác ơi! (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mấy bạn đi ngang sảnh quay lại nhìn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bọn cháu tra gì cũng phải có phiếu, có người ngồi giám sát bác ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "smile",
          "text": "Bác hỏi cho biết thôi. Kéo căng đầu bên ấy lên tí nào. (tạm)"
        }
      ]
    },
    {
      "id": "tin-n5-toa-b-an",
      "title": "Chi tiết ẩn: tờ thông báo lễ kỷ niệm",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên bảng tin có tờ thông báo mới: lễ kỷ niệm Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam, 15/10. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tờ ấy dán đè lên góc tờ danh sách CLB năm ngoái, che mất nửa cái kính lúp ai vẽ thêm. (tạm)"
        }
      ]
    },
    {
      "id": "tin-n5-phong",
      "title": "Chiều 14/10, phòng CLB: tập trước buổi giải trình",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy mở hộp bánh quy BQ-05, đặt ra giữa bàn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Hộp trước hết từ hôm thứ Năm. Anh không hỏi ai ăn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Tập nhé. Chị hỏi như mai người ta sẽ hỏi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Tin này bắt đầu từ đâu, gửi từ đâu? (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Mười giờ bốn mươi tối thứ Hai tuần trước, từ tài khoản kênh của Robotics. Vào kênh bằng máy văn phòng xưởng ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thế ai gửi? (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Anh Nam chứ ai ạ! (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu lại cá đấy. Từ đầu năm cậu trật bốn lần rồi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thì anh ấy trực kênh mà. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Mai chị không đỡ lời cho em được đâu, Tùng. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Mai ai cũng chỉ nói điều có giấy tờ làm chứng. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thế câu \"ai gửi\" thì trả lời sao hả chị? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Câu đó mai em tự trả lời. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Duy xếp các tờ kết quả theo thứ tự ngày, kẹp ghim lại. (tạm)"
        },
        {
          "type": "xong-viec-chinh"
        }
      ]
    },
    {
      "id": "tin-n6-mo",
      "title": "Sáng 15/10, hội trường: lễ kỷ niệm",
      "canh": "hoi-truong",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 15/10/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sáng, hội trường kín ghế. Băng rôn lễ kỷ niệm Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam căng ngang sân khấu. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chủ tịch Hội Sinh viên đang phát biểu trên bục. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân ôm một tập giấy, chạy qua chạy lại bên sân khấu. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hai giờ chiều, phòng Công tác sinh viên. Đừng ai tới muộn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Giấy tờ hôm qua chị cầm đủ chưa ạ? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Đủ. Duy kẹp theo thứ tự ngày rồi. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-gt-mo",
          "asker": {
            "speaker": "player",
            "text": "Đi cùng chị Minh Anh sang phòng Công tác sinh viên"
          },
          "choices": [
            {
              "id": "go-tin-gt-mo",
              "text": "Đi cùng chị Minh Anh sang phòng Công tác sinh viên",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-gt-mo"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "le-hsv-mo",
      "title": "Việc ngày lễ 15/10 (tạm): Quân nhờ xem danh sách bốc thăm quà",
      "canh": "hoi-truong",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Các bạn bên CLB Thám Tử. Tôi nhờ một việc nhỏ, chiều tôi mới rảnh. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Danh sách bốc thăm quà của buổi lễ sáng nay đây. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Mỗi người gõ tên mình một kiểu. Hoa thường lẫn lộn, có tên còn thừa cả dấu cách. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi cần biết những ai trúng trước buổi chiều. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Để bọn em, anh ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu nhận nhanh thế. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Ăn trưa xong làm một lèo là xong ấy mà. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng đón tờ danh sách từ tay Quân. (tạm)"
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "le-hsv-lo",
      "title": "Lỡ việc ngày lễ 15/10",
      "canh": "hoi-truong",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tờ danh sách bốc thăm vẫn kẹp dưới tập giấy của Quân, mép đã quăn. (tạm)"
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "tin-gt-mo",
      "title": "Chiều 15/10, phòng Công tác sinh viên: buổi giải trình, Quân hai nhịp",
      "canh": "phong-ctsv",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng Công tác sinh viên. Cô Lan ngồi đầu bàn, Quân ngồi cạnh, tập biên bản mở sẵn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Phòng nhận được đơn của sinh viên hỏi về cái tin trên kênh. Hôm nay cô mời các em lên nói cho rõ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Em xin phép bắt đầu, thưa cô. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi đọc lại nguyên văn: \"CLB Thám Tử soi dữ liệu sinh viên.\" (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Từ hôm tin này xuất hiện, CLB các bạn đã làm gì? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bọn em xin cô Lan bản xuất các tin công khai của kênh, rồi tra trong đó ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Đúng, bản ấy Phòng cấp. Toàn tin ai vào kênh cũng đọc được. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tra ra được gì? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Tin ấy bắt đầu từ một tin duy nhất, gửi tối thứ Hai mùng 7 ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân ghi một dòng, không ngẩng lên. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng ngồi thẳng lưng, hai tay giấu dưới gầm bàn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Một tin, một buổi tối. Tôi ghi nhận. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Nhưng biết giờ chưa phải là biết chỗ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân đặt bút xuống, nhìn sang dãy ghế đối diện. (tạm)"
        },
        {
          "type": "doi-chat",
          "id": "dc-tin-quan-may",
          "asker": {
            "speaker": "quan",
            "text": "Mật khẩu kênh cả ban chủ nhiệm Robotics đều biết. **Tin ấy có thể gửi từ điện thoại của bất kỳ ai, ở bất cứ đâu.** Các bạn khoanh được chỗ nào?"
          },
          "cauHoi": "Ngay trước giờ tin gốc, tài khoản kênh vào từ máy nào? Trình thẻ cho thấy điều đó.",
          "bangChung": [
            {
              "id": "ev-tin-may",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Nhật ký đăng nhập của kênh ghi 22 giờ 31 tối mùng 7, tài khoản kênh vào từ máy văn phòng xưởng. Chín phút sau, tin gốc được gửi. (tạm)"
                },
                {
                  "speaker": "quan",
                  "expression": "stunned",
                  "text": "Một máy để bàn trong xưởng. Không phải điện thoại. (tạm)"
                },
                {
                  "speaker": "co-lan",
                  "expression": "neutral",
                  "text": "Cô ghi lại: một máy, một giờ. (tạm)"
                }
              ]
            },
            {
              "id": "ev-tin-xuong",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Thưa cô, tối đó xưởng đăng ký mở tới 23 giờ cho đội tập ạ. (tạm)"
                },
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Xưởng mở thì có người. Có người ở xưởng chưa nói tin gửi từ xưởng. (tạm)"
                }
              ]
            },
            {
              "id": "ev-tin-goc",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "smug",
                  "text": "Tờ này cho tôi giờ gửi và tài khoản. Máy nào thì không. (tạm)"
                },
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Giờ thì có rồi. Chỗ thì phải tìm ở tờ khác. (tạm)"
                }
              ]
            },
            {
              "id": "clue-ngay-gui",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Ngày gửi thì bên tôi biết rồi. Tôi hỏi chỗ gửi. (tạm)"
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Thưa cô, bọn em chưa khoanh được tin gửi từ máy nào ạ. (tạm)"
            },
            {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Vậy bên tôi ghi: gửi từ một tài khoản nhiều người biết mật khẩu, chưa rõ nơi gửi. (tạm)"
            }
          ],
          "khac": [
            {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Tờ này liên quan gì tới chỗ tin được gửi? (tạm)"
            }
          ],
          "hetLuot": [
            {
              "speaker": "quan",
              "expression": "smug",
              "text": "Ba lần trình, chưa tờ nào chỉ ra máy nào. Bên tôi ghi là chưa rõ. (tạm)"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Dạ, bọn em xin sang ý sau ạ. (tạm)"
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân lật biên bản sang trang mới. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Cái máy văn phòng ấy đặt ở chỗ nào trong xưởng, Minh Anh? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Dạ, trong phòng riêng ở cuối xưởng ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Phòng riêng. Không phải ai đi ngang cũng ngồi vào được. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân gõ đầu bút xuống trang giấy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "smug",
          "text": "Vậy thì bên tôi thấy đã rõ. (tạm)"
        },
        {
          "type": "doi-chat",
          "id": "dc-tin-quan-nguoi",
          "asker": {
            "speaker": "quan",
            "text": "Tài khoản của Robotics, máy trong xưởng Robotics, người trực kênh là Nam. Bên tôi kết luận: **Nam là người gửi tin.**"
          },
          "cauHoi": "Trong các bản ghi đang có, chỗ nào cho biết ai ngồi máy lúc 22 giờ 40? Trình thẻ để chỉ ra bản ghi dừng ở đâu.",
          "bangChung": [
            {
              "id": "ev-tin-may",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Nhật ký đăng nhập ghi tài khoản, máy, ngày, giờ. Không chỗ nào ghi tên người ngồi máy. (tạm)"
                },
                {
                  "speaker": "player",
                  "text": "Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi. (tạm)"
                },
                {
                  "speaker": "quan",
                  "expression": "stunned",
                  "text": "Các bạn tự chỉ ra chỗ hồ sơ của mình dừng lại. (tạm)"
                },
                {
                  "speaker": "co-lan",
                  "expression": "neutral",
                  "text": "Cô ghi: một tài khoản, chưa phải một người. (tạm)"
                }
              ]
            },
            {
              "id": "ev-tin-goc",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Tin gốc chỉ có tài khoản clb_robotics và giờ gửi. Tên người gửi không có trên phiếu. (tạm)"
                },
                {
                  "speaker": "player",
                  "text": "Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi. (tạm)"
                },
                {
                  "speaker": "quan",
                  "expression": "stunned",
                  "text": "Vậy là chưa phải Nam. Chưa phải ai cả. (tạm)"
                }
              ]
            },
            {
              "id": "ev-tin-xuong",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Bảng xưởng là lịch đăng ký, không phải điểm danh ạ. Tối đó ai có mặt, bảng không ghi. (tạm)"
                },
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Đúng. Nhưng vẫn chưa nói ai ngồi máy. (tạm)"
                }
              ]
            },
            {
              "id": "clue-tin-goc",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "smug",
                  "text": "Tờ này nói tin gốc là tin tự viết. Tự viết thì càng phải có người viết. (tạm)"
                },
                {
                  "speaker": "tung",
                  "expression": "worried",
                  "text": "Ờ, tờ này không đỡ được mình. (tạm)"
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Thưa cô, bọn em chưa có gì để nói ngược lại ý đó ạ. (tạm)"
            },
            {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Vậy biên bản ghi tên Nam ở mục người cần làm rõ. (tạm)"
            }
          ],
          "khac": [
            {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Tôi hỏi ai ngồi máy. Tờ này trả lời câu khác. (tạm)"
            }
          ],
          "hetLuot": [
            {
              "speaker": "quan",
              "expression": "smug",
              "text": "Không tờ nào nói ngược lại. Bên tôi giữ tên Nam trong biên bản. (tạm)"
            },
            {
              "speaker": "co-lan",
              "expression": "neutral",
              "text": "Cô ghi nhận tới đây. (tạm)"
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-tin-quan-nguoi-du"
          },
          "to": "tin-gt-ket-du"
        },
        {
          "type": "goto",
          "to": "tin-gt-ket-chua"
        }
      ]
    },
    {
      "id": "tin-gt-ket-du",
      "title": "Biên bản ghi một tài khoản, chưa phải một người",
      "canh": "phong-ctsv",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân gạch một dòng trong biên bản, viết lại ngay bên dưới. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Biên bản ghi: tin gửi từ tài khoản kênh Robotics, chưa xác định người gửi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Chiều nay Phòng đăng đính chính lên kênh. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "smile",
          "text": "Các em về được rồi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Phiếu xin dữ liệu lần này các bạn nộp đủ. Lần sau cũng thế. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bọn em cảm ơn cô ạ. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ra tới hành lang, Tùng mới thở ra. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Trong ấy tớ không dám nhúc nhích luôn. (tạm)"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu chưa cá câu nào suốt buổi. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Thì có ai hỏi tớ đâu. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-ket-luan",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB"
          },
          "choices": [
            {
              "id": "go-tin-ket-luan",
              "text": "Về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-ket-luan"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-gt-ket-chua",
      "title": "Biên bản ghi tên Nam ở mục người cần làm rõ",
      "canh": "phong-ctsv",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quân viết tên Nam vào mục người cần làm rõ. Nét bút đậm, ngồi bên này bàn cũng đọc được. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Đính chính chiều nay chỉ đăng một ý: CLB Thám Tử không soi dữ liệu sinh viên. (tạm)"
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Còn ai gửi tin thì Phòng chưa nói gì. (tạm)"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Bên tôi sẽ mời bạn Nam lên làm việc sau. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Minh Anh gật đầu, đứng dậy. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Suốt dọc hành lang, Minh Anh không nói câu nào. (tạm)"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Chị ơi, có phải tại em không? (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Không phải tại em. (tạm)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Tại mình chưa nói ra được giấy tờ của mình dừng ở đâu. (tạm)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phía sau, cửa phòng đóng lại. Tập biên bản vẫn nằm trên bàn. (tạm)"
        },
        {
          "type": "branch",
          "id": "go-with-tin-ket-luan",
          "asker": {
            "speaker": "player",
            "text": "Về phòng CLB"
          },
          "choices": [
            {
              "id": "go-tin-ket-luan",
              "text": "Về phòng CLB",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "tin-ket-luan"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "tin-ket-luan",
      "title": "Nói chắc được điều gì; cả nhóm bắt đầu chia ý về Nam",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-tin-ket-luan",
          "asker": {
            "speaker": "minh-anh",
            "text": "Vậy tới giờ, mình nói chắc được điều gì?"
          },
          "choices": [
            {
              "id": "tai-khoan",
              "text": "Tin gốc gửi từ tài khoản kênh của CLB Robotics, 22:40 tối 07/10. Ai ngồi gửi thì chưa biết.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Đúng chừng ấy. Chị báo cô Lan cũng đúng chừng ấy."
                }
              ]
            },
            {
              "id": "nam-gui",
              "text": "Nam là người gửi, vì Nam trực kênh.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Trực kênh là việc được giao. Trên phiếu có dòng nào ghi ai ngồi gửi không?"
                }
              ]
            },
            {
              "id": "robotics-hai",
              "text": "CLB Robotics cố tình tung tin để hại CLB mình.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "day-kinh",
                  "text": "Phiếu ghi một tài khoản với một giờ gửi. \"Cố tình\" với \"cả CLB\" thì cột nào nói?"
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Nhưng mà anh Nam trực kênh. Tớ vẫn cá là anh Nam."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chị không nói là Nam. Nhưng Nam là đầu mối duy nhất mình đang có. Phải hỏi cho ra."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Còn một chuyện mới: phòng văn phòng xưởng thường khóa, chìa ban chủ nhiệm giữ. Người ngồi máy đó tối thứ Hai có chìa, hoặc được mở cửa cho."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoan. Mật khẩu thì cả ban chủ nhiệm đều biết mà."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Em thì chờ thêm một nguồn nữa rồi mới nói."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Một tài khoản chưa phải là một con người. Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi."
        },
        {
          "type": "xong-viec-chinh"
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v3-qua-2010",
      "title": "Ngày Phụ nữ Việt Nam 20/10",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "set-date",
          "date": "2024-10-20"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chủ nhật, 20/10/2024 · Ngày Phụ nữ Việt Nam"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Cả nhà ơi cứu nguy! Hôm nay 20/10 rồi, mua quà gì tặng bạn nữ bây giờ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bạn nào?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Thì… bạn Hoài bên Báo chí ấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Bạn nộp thư hôm họp rà soát à. Thế em biết gì về bạn ấy rồi?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Biết… bạn ấy nói bé lắm. Hôm họp ngồi chờ ngoài cửa mà tay vẫn ghi ghi chép chép gì đấy."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "serious",
          "text": "Chết thật, 20/10 rồi á? Còn chưa kịp đặt hoa gửi về cho mẹ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ra cổng mua gửi luôn đi em. Chiều là ngoài sạp người ta tranh nhau sạch đấy."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Tùng nhờ chọn quà. Hoài là người thế nào nhỉ?)"
        },
        {
          "type": "image",
          "imageId": "chibi-khao-tra-da"
        },
        {
          "type": "branch",
          "id": "qua-2010-hoai",
          "asker": {
            "speaker": "tung",
            "text": "Tớ nên tặng gì đây?"
          },
          "choices": [
            {
              "id": "qua-hong",
              "text": "Bông hồng sáp sặc sỡ",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "v3-qua-hong"
                }
              ]
            },
            {
              "id": "qua-gau",
              "text": "Con gấu bông đội mũ cử nhân",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "v3-qua-gau"
                }
              ]
            },
            {
              "id": "qua-so",
              "text": "Một cuốn sổ tay phóng viên và cây bút mực",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "v3-qua-so"
                }
              ]
            }
          ]
        },
        {
          "type": "set-date",
          "date": "2024-10-22"
        },
        {
          "type": "goto",
          "to": "v3-mo"
        }
      ]
    },
    {
      "id": "v3-qua-hong",
      "title": "Tặng hoa hồng sáp",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Hoa hồng sáp đi. Đẹp, lại để được lâu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chuẩn. Cửa hàng đối diện cổng có cả hộp gói sẵn."
        },
        {
          "type": "note",
          "text": "Tối hôm ấy, sân ký túc xá."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài nhận hộp hoa, nói \"Cảm ơn cậu.\" Hai người đứng thêm một lúc, không ai tìm ra câu thứ hai. Hoài bảo còn bài tập, về trước."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "…Đẹp mà nhỉ?"
        },
        {
          "type": "set-date",
          "date": "2024-10-22"
        },
        {
          "type": "goto",
          "to": "v3-mo"
        }
      ]
    },
    {
      "id": "v3-qua-gau",
      "title": "Tặng gấu bông",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Gấu bông đội mũ cử nhân? Dễ thương, khó mà chê."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Ừ nhỉ. Ai chẳng thích gấu."
        },
        {
          "type": "note",
          "text": "Tối hôm ấy, sân ký túc xá."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài cầm con gấu, cười một cái rất lịch sự: \"Dễ thương. Cảm ơn cậu.\" Suốt quãng đường về, con gấu bị kẹp chặt dưới nách, như sợ ai trông thấy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Bạn ấy cười rồi đấy. Chắc là… được."
        },
        {
          "type": "set-date",
          "date": "2024-10-22"
        },
        {
          "type": "goto",
          "to": "v3-mo"
        }
      ]
    },
    {
      "id": "v3-qua-so",
      "title": "Tặng sổ tay",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Một cuốn sổ tay nhỏ với cây bút. Học Báo chí, đi đâu cũng phải ghi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ừ ha! Bạn ấy ghi chép suốt mà."
        },
        {
          "type": "note",
          "text": "Tối hôm ấy, sân ký túc xá."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hoài lật cuốn sổ, thử bút ngay trang đầu, rồi bật cười: \"Để tớ ghi luôn chuyện đầu tiên nhé. Hôm nhập học có người dẫn tớ ra tận nhà xe.\""
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng đứng im mất mấy giây."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…Nhà xe á?"
        },
        {
          "type": "set-date",
          "date": "2024-10-22"
        },
        {
          "type": "goto",
          "to": "v3-mo"
        }
      ]
    },
    {
      "id": "v3-mo",
      "title": "Phòng CLB: bốn người, bốn cách đọc một phiếu",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Ba, 22/10/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều thứ Ba. Phiếu tin gốc vẫn ghim giữa bảng. Bốn người, bốn cách đọc."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tài khoản kênh của Robotics. Anh Nam trực kênh. Tối đó xưởng mở, anh Nam bảo về sớm mà chẳng ai làm chứng. Còn gì nữa?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chị không nói là Nam. Nhưng Nam là đầu mối duy nhất mình có, và cô Lan đang chờ. Chị cần biết đã đủ để mời Nam lên hỏi chưa."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoan. Mình mới đếm có một kiểu: tài khoản nào gửi. Đổi cách đếm xem có thấy gì khác không đã."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Em thì chờ một nguồn nữa, ngoài kênh, rồi mới nói."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-kenh-robotics"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Đổi cách đếm là đếm cái gì ạ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Kênh của Robotics đăng bao nhiêu bài trong tháng, từ máy nào, buổi nào. Nếu bài tin đồn khác hẳn thói quen của kênh thì cũng là một điều đáng ghi."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Được. Sang xưởng. Nhưng lần này hỏi thẳng Nam: tối đó cậu ấy ở đâu, có gì chứng minh."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bản xuất bài đăng thì gồm mọi kênh. Lấy riêng bài của kênh Robotics trước, rồi mới gom theo thiết bị mà đếm."
        },
        {
          "type": "task",
          "text": "Kênh Robotics tháng 10 hay đăng bài từ thiết bị nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chín bài nhìn hoa mắt. Giá mà gom những bài cùng một thiết bị vào một cục rồi đếm."
        },
        {
          "type": "explore",
          "id": "kp-bd-v3",
          "kieu": "ban-do",
          "gio": "15:00",
          "diem": [
            {
              "sprite": "ghim:xuong",
              "x": 21,
              "y": 24,
              "rong": 5,
              "chuoi": "v3-xuong",
              "sau": [],
              "nhan": "Xưởng Robotics",
              "dau": "chinh",
              "co": [
                "nam"
              ]
            },
            {
              "sprite": "ghim:thu-vien",
              "x": 62,
              "y": 40,
              "rong": 5,
              "chuoi": "v3-bd-thu-vien",
              "sau": [],
              "nhan": "Thư viện",
              "dau": "phu"
            },
            {
              "sprite": "ghim:tra-da",
              "x": 41,
              "y": 86,
              "rong": 5,
              "chuoi": "v3-bd-tra-da",
              "sau": [],
              "nhan": "Quán trà đá",
              "dau": "phu",
              "co": [
                "ba-lua"
              ]
            },
            {
              "sprite": "ghim:cang-tin",
              "x": 88,
              "y": 41,
              "rong": 5,
              "chuoi": "v3-bd-cang-tin",
              "sau": [],
              "nhan": "Căng tin",
              "dau": "phu"
            }
          ]
        },
        {
          "type": "goto",
          "to": "v3-xuong"
        }
      ]
    },
    {
      "id": "v3-xuong",
      "title": "Xưởng Robotics: Nam mở bản xuất bài đăng của kênh",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên đường sang xưởng, Tùng đi trước một quãng."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu ấy giận tớ vì hôm qua tớ bảo cậu ấy đừng cá."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tùng không giận lâu đâu. Tới cổng xưởng là quên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ nghe thấy đấy nhé! Mà đúng, tớ quên rồi."
        },
        {
          "type": "explore",
          "id": "kp-toi-v3-xuong",
          "diem": [
            {
              "sprite": "nv:nam",
              "x": 48,
              "y": 100,
              "rong": 15,
              "chuoi": "v3-xuong-vao",
              "sau": [],
              "nhan": "Nam",
              "dau": "chinh"
            },
            {
              "sprite": "vung:bang-trang",
              "x": 73,
              "y": 30.5,
              "rong": 16,
              "chuoi": "v3-xuong-an",
              "sau": [],
              "nhan": "Bảng trắng trên tường"
            }
          ]
        }
      ]
    },
    {
      "id": "v3-xuong-vao",
      "title": "Tới nơi: Xưởng Robotics: Nam mở bản xuất bài đăng của kênh",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Lại mấy em. Hôm nay định hỏi gì nữa?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Em hỏi thẳng nhé: tối thứ Hai anh ở đâu?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Thư viện. Tối thứ Hai nào cũng thế, tới khi họ đóng cửa. Nhưng mấy em đâu có tin."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chưa tin, chưa không tin. Anh cho bọn em xem bản xuất bài đăng của kênh được không? Cả tháng, mọi kênh cũng được, bọn em tự lọc."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Bản xuất của mục kênh thì ai quản trị cũng tải được. Đây, mấy em cứ lọc."
        },
        {
          "type": "challenge",
          "challengeId": "c-bai-dang"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chín bài của kênh Robotics trong tháng 10."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chín bài. Mình muốn biết kênh này hay đăng từ máy nào."
        },
        {
          "type": "task",
          "text": "Chín bài đó đăng từ những thiết bị nào, mỗi thiết bị mấy bài?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lấy phiếu chín bài làm nguồn, nhóm theo thiết bị."
        },
        {
          "type": "challenge",
          "challengeId": "c-bai-thiet-bi"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tám bài từ điện thoại trực kênh. Một bài từ máy văn phòng xưởng."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Bài thì anh đăng bằng điện thoại trực. Máy xưởng số 2 anh chỉ đăng nhập để xem thống kê kênh, không đăng gì từ đó."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Điện thoại trực là cái anh giữ. Anh đăng toàn buổi chiều, bằng cái đó."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Điện thoại anh giữ thì chứng minh được gì? Hôm đó anh đổi sang máy bàn thì sao?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Thì anh đã bảo tối đó anh ở thư viện. Cửa từ thư viện ghi giờ vào giờ ra của từng thẻ. Trên cổng sinh viên, ai cũng tải được bản ghi của chính mình. Anh tải rồi gửi vào nhóm cho mấy em."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Đấy, thế là có một nguồn ngoài kênh. Lên thư viện thôi."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ten-nam"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-toi-07"
            }
          ]
        },
        {
          "type": "goto",
          "to": "v3-len-thu-vien"
        }
      ]
    },
    {
      "id": "v3-xuong-an",
      "title": "Chi tiết ẩn: Bảng trắng trên tường",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bảng trắng kẻ lịch trực kênh của xưởng. Ô nào cũng ghi \"Nam\", riêng tối thứ Hai để trống."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Riêng tối thứ Hai để trống. Nhớ lấy chỗ này đã."
        }
      ]
    },
    {
      "id": "v3-len-thu-vien",
      "title": "Sảnh tòa B: bác Tư ở chân cầu thang",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thư viện trường nằm trên tầng ba giảng đường B. Bác Thịnh ngồi ở ghế đá cạnh cửa sảnh."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "smile",
          "text": "Lại mấy đứa CLB Thám Tử. Lên thư viện à? Tối thứ Hai trên ấy vắng lắm, chỉ có vài đứa quen mặt. Thư viện có mỗi một cửa, ra vào đều phải quẹt thẻ."
        },
        {
          "type": "goto",
          "to": "v3-thu-vien"
        }
      ]
    },
    {
      "id": "v3-thu-vien",
      "title": "Thư viện: bản ghi quẹt thẻ của chính Nam",
      "canh": "thu-vien",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bàn cạnh cửa sổ. Ở bàn bên, Hoài ngẩng lên khỏi chồng sách."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Tớ chào các cậu. Lá thư hôm ấy tớ chỉ nộp hộ. Tớ vẫn nghĩ mãi về cái anh đã nhờ tớ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Nhớ thêm được gì thì bảo bọn tớ nhé."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "Ừ. Tớ mà gặp lại cái balo ấy là tớ nhận ra."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "Mà cậu là bạn áo xanh tình nguyện tuần đầu đúng không? Hôm ấy cậu dẫn tớ lạc sang tận nhà xe."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ dẫn đúng hướng, chỉ sai tòa thôi. Áo thì tớ vẫn cất trong tủ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Nam mở cổng sinh viên trên điện thoại, tải toàn bộ bản ghi cửa từ của mình từ lúc vào trường tới giờ, gửi vào nhóm."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tớ cũng tải bản của tớ, gộp chung vào một tệp cho dễ tra. Tên ai thì ghi tên người đó."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Anh cũng hay lên thư viện tra tài liệu, để anh xuất bản của anh gộp chung vào luôn cho khách quan."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Lọc ra của anh rồi xem."
        },
        {
          "type": "task",
          "text": "Nam vào thư viện những ngày nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tệp có nhiều người. Lọc đúng tên anh Nam."
        },
        {
          "type": "challenge",
          "challengeId": "c-nam-thu-vien"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba mươi hai lần. Ngày với thứ ghi sẵn từ năm ngoái tới giờ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ba mươi hai dòng, nhìn là thấy thứ Hai nhiều. Nhưng \"nhiều\" là mấy? Thói quen thì phải đếm được."
        },
        {
          "type": "task",
          "text": "Nam quẹt thẻ thư viện vào thứ mấy nhiều nhất, mấy lần?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cùng một cục phiếu, gom theo thứ rồi đếm."
        },
        {
          "type": "challenge",
          "challengeId": "c-nam-thu"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thứ Hai hai mươi bảy lần, tối thứ Hai nào có trong tệp cũng thế. Thứ Năm năm lần."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tối thứ Hai thư viện vắng. Anh ngồi bàn cạnh cửa sổ, làm bài tới khi họ đuổi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "…Bàn cạnh cửa sổ. Tối thứ Hai."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Sao thế?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tối thứ Hai nào tớ cũng ở thư viện. Tớ nhớ có một người tuần nào cũng tới muộn, ngồi bàn cạnh cửa sổ. Tớ không để ý mặt."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nhớ thì nhớ. Nhưng tối mùng 7 cụ thể thì bản ghi nói gì? Lọc đúng ngày đó, cả hai tên."
        },
        {
          "type": "task",
          "text": "Tối 07/10 ai quẹt thẻ, vào và ra lúc mấy giờ?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ngày là mùng 7. Tệp có cả bản của tớ."
        },
        {
          "type": "challenge",
          "challengeId": "c-toi-07"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tối mùng 7 có hai người. Hà Vy vào 20 giờ, ra 23 giờ. Anh Nam vào 21 giờ 50, ra 23 giờ 05."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Quẹt vào rồi trèo cửa sổ ra thì sao? Cửa từ chỉ biết lúc vào với lúc ra."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Tớ ngồi cách anh Nam hai bàn. Chuông 22 giờ 30 nhắc sắp đóng cửa, anh ấy còn đang xếp sách. Tớ nhớ vì tớ cũng đang xếp."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Cửa từ một nguồn, lời Vy một nguồn. Nhưng lời Vy thì ai làm chứng? Thẻ của Vy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Cậu nhớ nhầm sang hôm khác thì sao? Tối thứ Hai nào chuông chả reo lúc 22 giờ 30."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Có thể tớ nhầm thật. Nên đừng tin mỗi lời tớ. Cửa từ ghi anh Nam vào 21 giờ 50, ra 23 giờ 05, mà thư viện chỉ có một cửa."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh đã bảo mà."
        },
        {
          "type": "image",
          "imageId": "cg-v3-thu-vien-dem"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ten-vy"
            }
          ]
        },
        {
          "type": "goto",
          "to": "v3-the-vy"
        }
      ]
    },
    {
      "id": "v3-the-vy",
      "title": "Lời chứng cũng phải đếm được: thói quen của Hà Vy",
      "canh": "thu-vien",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Được. Lời chứng của tớ cũng phải đếm được như của anh Nam. Bản của tớ có sẵn trong tệp."
        },
        {
          "type": "task",
          "text": "Hà Vy vào thư viện những ngày nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lọc đúng tên tớ."
        },
        {
          "type": "challenge",
          "challengeId": "c-vy-thu-vien"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm lần. Bốn tối thứ Hai, một tối thứ Tư."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hai người như nhau. Đúng là hai cái máy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thói quen chỉ cho thấy tớ có lý do ngồi đó. Còn tối ấy thì cửa từ ghi rồi. Về CLB."
        },
        {
          "type": "image",
          "imageId": "chibi-v3-hai-cai-may"
        },
        {
          "type": "goto",
          "to": "v3-doi-chat"
        }
      ]
    },
    {
      "id": "v3-doi-chat",
      "title": "Phòng CLB: Tùng nêu giả thuyết, người chơi trình thẻ",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Lúc 22:40 tối 07/10 Nam ở đâu? Trình thẻ chứng minh"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng CLB. Mọi phiếu đã ghim lên bảng. Minh Anh chờ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Tùng nói trước. Rồi các em trình cái gì có trong hồ sơ."
        },
        {
          "type": "doi-chat",
          "id": "dc-nam",
          "asker": {
            "speaker": "tung",
            "text": "Tài khoản kênh của Robotics gửi tin lúc 22:40. Nam trực kênh. Tối đó xưởng mở, Nam bảo về sớm mà **không ai làm chứng**. Tớ cá là Nam gửi."
          },
          "cauHoi": "Lúc 22:40 tối 07/10, khi tin được gửi, Nam đang ở đâu? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "ev-toi-07",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Tối 07/10, cửa từ thư viện ghi Nam vào 21:50, ra 23:05. Tin gửi 22:40."
                },
                {
                  "speaker": "tung",
                  "expression": "surprised",
                  "text": "Quẹt vào rồi trèo cửa sổ ra thì sao?"
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Tớ ngồi cách cậu ấy hai bàn, cùng tối đó. Tớ nhớ lúc chuông 22 giờ 30 nhắc sắp đóng cửa, cậu ấy còn đang xếp sách. Thẻ của tớ ghi tớ ở đó tới 23 giờ."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Và máy gửi tin nằm trong phòng văn phòng xưởng, cách thư viện cả một sân trường."
                },
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Cửa từ là nguồn độc lập, có giờ vào giờ ra; lời Vy khớp đúng quãng giữa; chỗ gửi tin thì cách xa. Đủ để không mời Nam lên."
                }
              ]
            },
            {
              "id": "ev-nam-thu",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Hai mươi bảy tối thứ Hai có trong tệp, tối nào Nam cũng ở thư viện. Một thói quen từ năm ngoái. Thói quen thì chưa phải bằng chứng cho đúng tối đó."
                },
                {
                  "speaker": "tung",
                  "expression": "gai-dau",
                  "text": "Thì có thể tối đó cậu ấy nghỉ một hôm."
                }
              ]
            },
            {
              "id": "ev-vy-thu-vien",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Tối thứ Hai nào tớ cũng ở thư viện, thẻ của tớ ghi thế. Nên lời tớ kể về tối đó không phải nhớ bừa."
                },
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Lời chứng mà đếm được thì nặng hơn lời chứng suông."
                }
              ]
            },
            {
              "id": "ev-bai-thiet-bi",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Tám bài từ điện thoại trực, một bài từ máy văn phòng xưởng. Bài tin đồn khác hẳn thói quen đăng của kênh."
                },
                {
                  "speaker": "tung",
                  "expression": "worried",
                  "text": "Khác thói quen thôi. Ai cấm Nam đổi máy một hôm."
                }
              ]
            },
            {
              "id": "ev-tin-goc",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "tung",
                  "expression": "chi-tay",
                  "text": "Chính phiếu này nói tài khoản Robotics gửi. Cậu đang củng cố cho tớ đấy."
                },
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Tài khoản. Chưa phải người."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "serious",
              "text": "Chưa đủ để nói Nam không làm, cũng chưa đủ để nói Nam làm. Vậy chị mời Nam lên hỏi."
            },
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Mời lên hỏi thì cũng là một nguồn. Nhưng mình đang thiếu nguồn, không phải thiếu người để hỏi."
            }
          ],
          "khac": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Cái này thì liên quan gì tới tối thứ Hai?"
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Xem lại hồ sơ đã."
            }
          ],
          "hetLuot": [
            {
              "speaker": "tung",
              "expression": "chi-tay",
              "text": "Ba lần rồi nhé! Đưa toàn thứ chẳng liên quan, thế là cậu cũng chịu tớ đúng không?"
            },
            {
              "speaker": "minh-anh",
              "expression": "serious",
              "text": "Thôi. Trình lạc đề nữa thì chẳng ai nghe mình nói. Dừng ở đây đã."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-nam-du"
          },
          "to": "v3-ket-du"
        },
        {
          "type": "task",
          "text": "Nói lại cho cả nhóm: mình chắc được điều gì?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Vậy chị mời Nam lên."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều hôm đó, Nam lên phòng CLB. Không nói nhiều, Nam đặt lên bàn tờ bản ghi quẹt thẻ thư viện của mình."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tối mùng 7, 21 giờ 50 vào, 23 giờ 05 ra. Có cả tờ này rồi mà vẫn gọi em lên."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "…Tối đó tớ cũng ở đấy. Tớ nhớ ra muộn quá."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Em xin lỗi anh."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Không sao. Lần sau đọc kỹ hồ sơ trước đã."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "dat-co",
              "co": "v3-moi-nam-len"
            }
          ]
        },
        {
          "type": "goto",
          "to": "v3-ket-luan"
        }
      ]
    },
    {
      "id": "v3-ket-du",
      "title": "Không mời Nam lên; Tùng xin lỗi; mẩu giấy thứ ba trong sổ CLB",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Nói lại cho cả nhóm: mình chắc được điều gì?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Không mời Nam lên. Chị báo cô Lan: tối đó Nam ở thư viện, có bản ghi và có người cùng ngồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Khỉ thật… tại cái tài khoản ghi lù lù tên kênh của anh ấy. Tớ cá trượt, mà lần này trượt đau. Tớ nợ anh Nam một lời xin lỗi. Lần sau đợi đủ bài mới lật."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Cá thì không sao. Kết tội mới sao."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tớ cũng suýt nữa. Nhìn tài khoản thấy tên kênh, nhìn kênh thấy người trực. Mỗi bước nhảy một tí là tới một con người."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hai nguồn riêng cùng khớp một quãng giờ. Lại là \"kiểm hai lần\" trong sổ CLB."
        },
        {
          "type": "goto",
          "to": "v3-ket-ky"
        }
      ]
    },
    {
      "id": "v3-ket-ky",
      "title": "Hai thói quen, hai người làm chứng cho nhau: mẩu giấy thứ ba",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nhắc mới nhớ. Trang \"Kiểm hai lần\" ấy… hôm trước có một mẩu, để anh xem lại."
        },
        {
          "type": "note",
          "text": "Duy lật trang, một mẩu giấy nữa."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-nhan-linh-3"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mẩu thứ ba rồi. Vẫn đúng nét chữ ấy."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Vụ đầu tiên của CLB kết luận sai. Cuốn cũ ghi lại nó.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Vụ đầu tiên của CLB? Từ hồi nào?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chưa biết. Nhưng người viết ghi \"kết luận sai\". Giống chuyện hôm nay."
        },
        {
          "type": "goto",
          "to": "v3-ket-luan"
        }
      ]
    },
    {
      "id": "v3-ket-luan",
      "title": "Không phải Nam thì là ai?",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-v3-ket-luan",
          "asker": {
            "speaker": "minh-anh",
            "text": "Vậy giờ mình nói chắc được điều gì?"
          },
          "choices": [
            {
              "id": "khong-nam",
              "text": "Tối 07/10 Nam ở thư viện lúc tin được gửi. Người gửi là ai thì chưa biết, chỉ biết người đó ngồi máy văn phòng xưởng.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Đúng chừng ấy. Nam không phải người gửi; còn lại vẫn là câu hỏi."
                }
              ]
            },
            {
              "id": "ban-chu-nhiem",
              "text": "Người gửi chắc chắn là một trong ban chủ nhiệm, vì chỉ họ biết mật khẩu.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "\"Chỉ họ biết\" là lời Nam nói, chưa có bảng nào ghi. Và mật khẩu thì truyền tai được."
                }
              ]
            },
            {
              "id": "nam-noi-doi",
              "text": "Nam vẫn đáng ngờ, vì Nam nói về sớm mà không ai làm chứng.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Giờ đã có người làm chứng, và có cả thẻ. Cậu đang giữ nghi ngờ cũ sau khi bằng chứng đã đổi."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "task",
          "text": "Không phải Nam thì nói chắc được điều gì?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Không phải anh Nam. Thế thì ai ngồi máy văn phòng xưởng tối đó?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Máy trong phòng văn phòng, giờ xưởng mở. Ai vào được phòng đó thì mình chưa biết."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Và tên anh Nam vẫn nằm trên tài khoản kênh. Ai muốn người ta nghĩ là anh Nam, thì đã được như ý."
        },
        {
          "type": "note",
          "text": "Duy ghim hai tờ giấy lên bảng: \"16/9: thư đòi thu phòng\" và \"07/10: tin 'soi dữ liệu'\"."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Lá thư không làm mình mất phòng. Ba tuần sau lại có cái tin bảo mình soi dữ liệu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Cuối kỳ là lúc sao kê về. Nếu tới lúc ấy ai cũng ngại tin mình, thì mình có hỏi đúng cũng khó được nghe."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Có thể liên quan, cũng có thể không. Ghim hai mốc lên đã."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chuyện này không chỉ là tin đồn về mình nữa. Các em sang xưởng lần nữa, hỏi xem ai vào được phòng ấy. Hỏi thôi, chưa nghi ai."
        },
        {
          "type": "image",
          "imageId": "chibi-v3-ghim-hai-moc"
        },
        {
          "type": "goto",
          "to": "v3-chia"
        }
      ]
    },
    {
      "id": "v3-chia",
      "title": "Xưởng, chiều muộn: tờ giao chìa, ba người cần hỏi",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Ai có chìa khóa văn phòng xưởng?"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều muộn, xưởng Robotics. Nam dẫn cả nhóm tới cửa phòng văn phòng. Trên cửa dán một tờ giấy đã ngả màu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Giao chìa phòng văn phòng.\" Ba tên: Khánh, Bách, Thảo."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh Khánh đang họp bên Hội. Anh Bách với chị Thảo thì ở kia."
        },
        {
          "type": "line",
          "speaker": "thao",
          "expression": "neutral",
          "text": "Chị là Thảo, lo kỹ thuật của xưởng. Phòng ấy chị mở nhiều nhất. Nhưng chìa của chị nằm ngăn bàn ngoài xưởng cả tháng nay, ai mở ngăn cũng lấy được. Chị không chối."
        },
        {
          "type": "line",
          "speaker": "bach",
          "expression": "neutral",
          "text": "Anh là Bách, phó CLB. Tối mùng 7 anh về quê, vé xe còn giữ. Chìa anh không cho ai mượn."
        },
        {
          "type": "line",
          "speaker": "thao",
          "expression": "neutral",
          "text": "Còn hỏi chuyện in ấn thì tối Chủ nhật nào chị cũng ra phòng máy in sơ đồ mạch. Tuần nào cũng thế, chị không nhớ nổi từng tuần."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tối Chủ nhật, phòng máy… Lần này tớ không cá đâu, tớ ghi lại thôi."
        },
        {
          "type": "image",
          "imageId": "cg-v3-to-giao-chia"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-giao-chia"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-thao-in-so-do"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ghi ba tên. Người cần hỏi, chưa phải người bị nghi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Thứ Ba 12 tháng sau anh kiểm kê kho. Ban tổ chức giải bắt đội nào cũng nộp biên bản kiểm kê trước khi đóng lệ phí, nên lịch anh Khánh phải ký từ mùng 9. Anh cũng hỏi cả đội về tối mùng 7 rồi: cửa phòng văn phòng quay vào kho, đứa nào cũng cắm mặt hàn mạch, không ai để ý ai vào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Lần này tớ ghi tên mà không khoanh ai cả."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Nhóm theo cách khác thì thấy chuyện khác. Thói quen đếm được, và đôi khi thói quen của người này là lời chứng cho người kia."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v3-bd-thu-vien",
      "title": "Bản đồ Vụ 3 (tùy chọn): ghé thư viện",
      "canh": "thu-vien",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-v3-bd-thu-vien",
          "diem": [
            {
              "sprite": "nv:ha-vy",
              "x": 45,
              "y": 100,
              "rong": 15,
              "chuoi": "v3-bd-thu-vien-vao",
              "sau": [],
              "nhan": "Hà Vy",
              "dau": "chinh"
            },
            {
              "sprite": "vung:quay",
              "x": 58,
              "y": 40,
              "rong": 8,
              "chuoi": "v3-bd-thu-vien-an",
              "sau": [],
              "nhan": "Quầy thủ thư"
            }
          ]
        }
      ]
    },
    {
      "id": "v3-bd-thu-vien-vao",
      "title": "Tới nơi: Bản đồ Vụ 3 (tùy chọn): ghé thư viện",
      "canh": "thu-vien",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thư viện buổi chiều. Cửa từ kêu tít mỗi lần có người quẹt thẻ đi qua."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Tối thứ Hai nào tớ cũng ngồi bàn cạnh cửa sổ kia."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Vào ra đều phải quẹt thẻ nhỉ. Thế là cái cửa này nhớ giờ của từng người."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ở bàn cạnh cửa sổ, Hoài đang cúi xuống chồng sách, chưa thấy ba đứa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…Để lát nữa tớ chào."
        }
      ]
    },
    {
      "id": "v3-bd-thu-vien-an",
      "title": "Chi tiết ẩn: Quầy thủ thư",
      "canh": "thu-vien",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sổ mượn sách mở trên quầy thủ thư. Dòng cuối có tên Hoài: \"Nhập môn báo chí\", hạn trả thứ Sáu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "…Bạn ấy học chăm thật."
        }
      ]
    },
    {
      "id": "v3-bd-tra-da",
      "title": "Bản đồ Vụ 3 (tùy chọn): quán trà đá, chuyện một kết luận sai",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-v3-bd-tra-da",
          "diem": [
            {
              "sprite": "nv:ba-lua",
              "x": 46,
              "y": 100,
              "rong": 15,
              "chuoi": "v3-bd-tra-da-vao",
              "sau": [],
              "nhan": "Bà bán trà đá",
              "dau": "chinh"
            },
            {
              "sprite": "vung:xe-dap",
              "x": 62.5,
              "y": 53,
              "rong": 16,
              "chuoi": "v3-bd-tra-da-an",
              "sau": [],
              "nhan": "Chiếc xe đạp cũ"
            }
          ]
        }
      ]
    },
    {
      "id": "v3-bd-tra-da-vao",
      "title": "Tới nơi: Bản đồ Vụ 3 (tùy chọn): quán trà đá, chuyện một kết luận sai",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quán trà đá, đầu giờ chiều. Nắng xiên qua tán cây, ghế còn trống nhiều."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Bà ơi, lỡ nói sai cho một người rồi thì làm thế nào ạ?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Hỏi đúng người rồi đấy. Ngày xưa có cậu sinh viên trông cái phòng tủ sắt của các cháu, bà gọi là \"cậu trà nóng\". Có một dạo cậu ấy ngồi đây cả buổi chiều, sổ mở mà không viết chữ nào."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Bà hỏi thì bảo: \"Cháu kết luận sai cho một người, bà ạ. Cả câu lạc bộ tin cháu.\""
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Rồi anh ấy làm gì ạ?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Hôm sau dẫn một cậu khác ra đây, mời cốc trà, xin lỗi ngay trước mặt bà. Xong ngồi gạch cái gì đó trong sổ, gạch mạnh tới rách cả giấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Kết luận sai, rồi tự tay gạch. Ghi lại. Vẫn là lời kể."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tra-da-3"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Mời trà, xin lỗi trước mặt người khác. Nghe thì dễ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu đang nghĩ tới Hoài à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ có nói gì đâu. …Ừ."
        }
      ]
    },
    {
      "id": "v3-bd-tra-da-an",
      "title": "Chi tiết ẩn: Chiếc xe đạp cũ",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Giỏ xe đạp hôm nay có thêm túi đá viên, bà vừa đạp đi mua về, đá còn bốc hơi lạnh."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Quán trà đá mà đá phải đạp xe đi mua. Thảo nào bà dậy sớm thế.)"
        }
      ]
    },
    {
      "id": "v3-bd-cang-tin",
      "title": "Bản đồ Vụ 3 (tùy chọn): chè đậu đen ở căng tin, sổ nợ của Tùng",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-v3-bd-cang-tin",
          "diem": [
            {
              "sprite": "nv:tung",
              "x": 62,
              "y": 100,
              "rong": 15,
              "chuoi": "v3-bd-cang-tin-vao",
              "sau": [],
              "nhan": "Tùng",
              "dau": "chinh"
            },
            {
              "sprite": "vung:bang-den",
              "x": 48,
              "y": 20,
              "rong": 9,
              "chuoi": "v3-bd-cang-tin-an",
              "sau": [],
              "nhan": "Tấm bảng đen trên quầy"
            }
          ]
        }
      ]
    },
    {
      "id": "v3-bd-cang-tin-vao",
      "title": "Tới nơi: Bản đồ Vụ 3 (tùy chọn): chè đậu đen ở căng tin, sổ nợ của Tùng",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Căng tin giữa buổi chiều, chỉ còn quầy nước với nồi chè."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chè đậu đen, ba cốc! Hôm nay tớ…"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Khao à? Hôm qua cậu vừa than cuối tháng nhà mới gửi tiền."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…định nói là hôm nay tớ quên ví."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tớ trả. Ghi sổ nợ: Tùng, một cốc chè, lãi là một lần dẫn đường không lạc."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Lãi suất hợp lý đấy."
        },
        {
          "type": "image",
          "imageId": "chibi-lai-suat"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chuông báo tiết reo. Tùng vơ vội cốc chè, đứng dậy."
        }
      ]
    },
    {
      "id": "v3-bd-cang-tin-an",
      "title": "Chi tiết ẩn: Tấm bảng đen trên quầy",
      "canh": "cang-tin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Dòng phấn ghi nợ trên bảng đen giờ chỉ còn một tên, gạch hẳn, bên cạnh ghi: \"đã trả\"."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Có người trả nợ rồi. Chắc chắn không phải Tùng.)"
        }
      ]
    },
    {
      "id": "v4-mo",
      "title": "Nam tới phòng CLB với một rắc rối của chính mình",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai, 04/11/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đầu tuần. Ba đứa leo cầu thang lên phòng CLB, Tùng đi trước, hai bậc một."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là hôm nay chị Minh Anh tới trước bọn mình."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Từ đầu năm cậu cá trật bốn lần. Tớ có đếm."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Cậu đếm cả cái đấy à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Cái gì đếm được thì tớ đếm."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Lần này Tùng thắng. Cửa mở sẵn rồi kìa."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trong phòng không chỉ có chị Minh Anh. Lần này không phải nhóm sang xưởng, mà Nam tự tới phòng CLB, tay cầm một tờ giấy."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Có người đang mượn tên em, mà không phải chỉ mỗi cái tin đồn."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ngồi xuống đã. Chuyện gì?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ban kiểm tra của Hội sinh viên gửi giấy yêu cầu giải trình ngân sách xưởng. Họ tạm dừng giải ngân, vì em đứng tên năm đơn trong hai tháng, cộng lại hơn hai triệu rưỡi, có đơn gần một triệu. Trong năm đơn ấy em chỉ đặt hai: cảm biến với bánh xe, mấy trăm nghìn. Ba đơn kia em không đặt."
        },
        {
          "type": "note",
          "text": "Quân bước vào sau Nam, tay cầm cặp hồ sơ."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Giấy ấy ban tôi lập. Hôm thứ Sáu chủ tịch Hội chuyển xuống danh sách năm đơn, bảo làm đúng quy trình. Lần trước tôi lọc rộng rồi nghi vội cả một lớp. Lần này tôi mang sổ tới để các bạn tự tra, tra ra gì tôi ghi đúng thế. Theo quy chế, danh sách đơn vượt mức gửi lên thì ban tôi buộc tạm khóa tài khoản người đứng tên, để giữ nguyên sổ."
        },
        {
          "type": "show-document",
          "documentId": "doc-thu-hoi-don"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-da-duyet"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ba đơn lạ thế thì ai đặt?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Đơn đặt trên máy xưởng, ai đăng nhập cũng điền tên người đặt được. Ban kiểm tra gửi kèm bản sổ đặt hàng của xưởng, có cả đơn còn chờ duyệt. Giấy của họ ghi kỳ này duyệt tám đơn. Mọi người xem hộ em."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chưa đọc tên vội. Đếm trước: mỗi người đứng tên mấy đơn, rồi mới xem đơn của anh Nam."
        },
        {
          "type": "task",
          "text": "Sổ đặt hàng của xưởng có những đơn nào đã duyệt?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chỉ lấy đơn đã duyệt. Trạng thái ghi ở cột trang_thai."
        },
        {
          "type": "explore",
          "id": "kp-phong-v4",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 20,
              "y": 100,
              "rong": 15,
              "chuoi": "v4-phong-duy",
              "sau": [],
              "nhan": "Duy: mở laptop",
              "dau": "chinh"
            },
            {
              "sprite": "nv:nam",
              "x": 48,
              "y": 100,
              "rong": 15,
              "chuoi": "v4-phong-nam",
              "sau": [],
              "nhan": "Nam: hai đơn đặt thật",
              "dau": "phu"
            },
            {
              "sprite": "nv:quan",
              "x": 76,
              "y": 100,
              "rong": 15,
              "chuoi": "v4-phong-quan",
              "sau": [],
              "nhan": "Quân: việc giám sát",
              "dau": "phu"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-don-da-duyet"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tám đơn đã duyệt."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tám đơn, gom theo người đặt rồi đếm. Xem anh Nam đứng tên bao nhiêu so với người khác."
        },
        {
          "type": "task",
          "text": "Mỗi người đứng tên bao nhiêu đơn đã duyệt?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu tám đơn làm nguồn, gom theo người đặt."
        },
        {
          "type": "challenge",
          "challengeId": "c-don-theo-nguoi"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Anh Nam năm đơn. Anh Bách, chị Thảo, anh Khánh mỗi người một."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Năm. Mà anh chỉ đặt hai: cảm biến dò line với bánh xe. Động cơ servo, mạch điều khiển, khung nhôm thì anh không đặt. Anh Bách là phó CLB, chị Thảo lo kỹ thuật, anh Khánh là trưởng CLB."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thế ba đơn kia ai gõ tên anh vào?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Sổ không ghi ai gõ. Nhưng mỗi đơn có một cột mã phiên: phiên đăng nhập của máy lúc tạo đơn. Máy xưởng có bảng phiên đăng nhập không?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Có. Phần mềm đặt hàng ghi mỗi phiên là máy nào, giờ nào. Nhưng tài khoản quản trị của tớ bị khóa từ sáng nay, chờ giải trình xong. Thứ Ba 12 là hôm tớ kiểm kê kho, lịch với sổ đều nằm trong tài khoản ấy. Lịch ấy ban tổ chức giải bắt nộp, muốn dời sát ngày phải ghi lý do. Khóa tài khoản rồi thì chỉ còn cách đếm tay."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Khóa là phải. Bảng ấy mà do Nam xuất thì ai cũng bảo Nam sửa được. Chị nhờ thầy Quang đề nghị cô Hạnh bên Phòng Đào tạo xuất thẳng cho CLB mình. Máy chủ của trường do phòng cô quản lý."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy là hai bảng. Đơn thì ở sổ đặt hàng, máy thì ở bảng phiên. Chung nhau cái mã phiên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Đơn cảm biến ghi PH-11. Bên bảng phiên mà cũng có một dòng PH-11 thì đấy là cái máy tạo ra đơn ấy, đúng không?"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ma-phien"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-nguoi-dat-nam"
            }
          ]
        },
        {
          "type": "goto",
          "to": "v4-noi"
        }
      ]
    },
    {
      "id": "v4-noi",
      "title": "Mã phiên dẫn sang bảng phiên đăng nhập: phải nối hai bảng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "show-document",
          "documentId": "doc-phien-dang-nhap"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều. Cô Hạnh tự mang bản xuất sang phòng CLB."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Bảng phiên đăng nhập của phần mềm đặt hàng. Cô xuất nguyên bản từ máy chủ theo đề nghị của thầy Quang, chưa lọc dòng nào."
        },
        {
          "type": "task",
          "text": "Năm đơn đứng tên Nam được tạo từ máy nào, lúc mấy giờ?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Hai bảng chung nhau một cột. Nối đúng cột đó thì mỗi đơn kéo theo đúng máy của nó."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Chọn sai cột là đơn kéo theo máy của người khác đấy."
        },
        {
          "type": "challenge",
          "challengeId": "c-don-nam-may"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm đơn của anh Nam. Hai đơn buổi chiều từ máy xưởng số 2. Ba đơn còn lại từ máy văn phòng xưởng, 21 giờ 50, 22 giờ 10 và 22 giờ 05."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Máy xưởng số 2 buổi chiều là anh. Máy văn phòng ban đêm thì anh chưa bao giờ ngồi. Phòng đó khóa."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Năm dòng này gom theo máy rồi đếm, cho chắc."
        },
        {
          "type": "task",
          "text": "Năm đơn đứng tên Nam chia theo máy ra sao?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu năm đơn làm nguồn, gom theo máy."
        },
        {
          "type": "challenge",
          "challengeId": "c-don-nam-theo-may"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Máy văn phòng xưởng ba đơn. Máy xưởng số 2 hai đơn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Máy văn phòng xưởng. Lại nó. Tin đồn cũng gửi từ đó."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Và đơn ngày 07/10 tạo lúc 22 giờ 05. Tối đó anh Nam ở thư viện tới 23 giờ 05, mình đã có bản ghi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Hai việc xảy ra trên cùng một máy, cùng một tối. Chưa biết có cùng một người làm không."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nam, chuyện này không còn là chuyện riêng của CLB nào. Điều tra cùng bọn chị không?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Em xin. Tên em, em phải tự đi tìm xem ai đang dùng."
        },
        {
          "type": "image",
          "imageId": "chibi-v4-cung-mot-may"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-may-vp"
            }
          ]
        },
        {
          "type": "goto",
          "to": "v4-may-vp"
        }
      ]
    },
    {
      "id": "v4-may-vp",
      "title": "Mọi đơn từ máy văn phòng xưởng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nếu máy văn phòng là chỗ người ta làm việc đó, thì xem mọi đơn từ máy ấy, không chỉ đơn mang tên Nam."
        },
        {
          "type": "task",
          "text": "Máy văn phòng xưởng đã tạo những đơn nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vẫn nối hai bảng theo mã phiên, nhưng lần này lọc theo máy."
        },
        {
          "type": "challenge",
          "challengeId": "c-may-vp"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bốn đơn. Ba đơn đứng tên anh Nam, ban đêm. Một đơn ốc vít đứng tên anh Khánh, 10 giờ 15 sáng."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ốc vít thì đúng là anh Khánh đặt, hôm đó anh thấy. Trưởng CLB ngồi máy văn phòng ban ngày là chuyện thường."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ban ngày máy đó có người dùng hợp lệ. Mình mới biết máy, chưa biết tay."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mà bảng phiên ghi máy văn phòng có năm phiên, nối xong chỉ ra bốn đơn. Một phiên sáng 02/10 không tạo đơn nào: có người mở phần mềm rồi thôi. Nối kiểu này thì phiên không có đơn không hiện ra."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tờ giao chìa hôm trước: ba người có chìa. Đừng vội."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-nhan-linh-4"
            }
          ]
        },
        {
          "type": "task",
          "text": "Chốt điều nói được với Ban kiểm tra"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tên một người, tay một người khác… trong sổ có kẹp một câu. Để anh xem."
        },
        {
          "type": "note",
          "text": "Duy lật sổ CLB tới trang cuối."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Cái tên trên bản ghi và người ngồi ở đó là hai chuyện. Vụ đầu tiên, không ai hỏi câu ấy. Mặt trước thì các em đọc mỗi buổi họp rồi.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Giống hệt chuyện anh Nam."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mực này cũ hơn bọn mình nhiều. Cuốn sổ cũ mà mấy mẩu giấy nhắc, chắc kể đúng chuyện này."
        },
        {
          "type": "goto",
          "to": "v4-ket"
        }
      ]
    },
    {
      "id": "v4-ket",
      "title": "Nam điều tra cùng; ba người có chìa",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-v4-ket-luan",
          "asker": {
            "speaker": "minh-anh",
            "text": "Vậy mình nói chắc được điều gì với Ban kiểm tra của Hội?"
          },
          "choices": [
            {
              "id": "muon-ten",
              "text": "Ba đơn đứng tên Nam được tạo ban đêm từ máy văn phòng xưởng; đơn 07/10 tạo đúng lúc Nam ở thư viện. Ai ngồi máy thì bảng này chưa nói.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Đúng chừng ấy. Chị gửi kèm phiếu nối bảng để họ tự kiểm. Ai ngồi máy thì phải có nguồn khác."
                }
              ]
            },
            {
              "id": "nam-tu-dat",
              "text": "Nam tự đặt cả năm đơn rồi chối.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Một trong ba đơn đó tạo lúc 22:05 tối 07/10. Tối đó Nam ở thư viện, mình vừa chứng minh xong ở vụ trước."
                }
              ]
            },
            {
              "id": "ban-chu-nhiem",
              "text": "Ban chủ nhiệm Robotics cố tình đổ nợ cho Nam.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Máy văn phòng thì ban chủ nhiệm giữ chìa, nhưng \"cố tình\" và \"cả ban\" thì bảng nào nói? Mình mới có máy và giờ."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Phiếu bốn đơn từ máy văn phòng chị gửi kèm luôn: ba đơn đêm đứng tên Nam, một đơn ngày đứng tên trưởng CLB. Đủ để Ban kiểm tra thấy máy đó ban ngày ai dùng, ban đêm đứng tên ai."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Và ba người giữ chìa phòng đó. Mình ghi tên, không ghi tội."
        },
        {
          "type": "task",
          "text": "Chốt điều nói được với Ban kiểm tra"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Giấy giải trình đề ngày 01/11, mười ngày sau hôm mình gỡ nghi cho Nam. Anh ghi lại thôi, chưa nói gì."
        },
        {
          "type": "note",
          "text": "Có tiếng gõ cửa. Khánh đứng ở cửa phòng CLB, balo khoác một bên vai."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Nam ở đây à. Danh sách Ban kiểm tra cầm là anh chuyển. Đủ cả năm đơn, kể cả hai đơn em đặt thật, để họ khỏi bảo mình chọn lọc. Cứ giải trình đúng sự thật, anh sẽ nói đỡ một câu. Còn bên Thám Tử, cần giấy tờ gì qua Hội thì cứ gửi anh, anh ký chuyển cho."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Vâng anh."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Anh ấy chưa đi ngay. Nhìn cho kỹ."
        },
        {
          "type": "explore",
          "id": "kp-soi-khanh",
          "kieu": "quan-sat",
          "nhanVat": "khanh",
          "haVySoi": true,
          "diem": [
            {
              "sprite": "vung:the",
              "x": 58,
              "y": 60,
              "rong": 16,
              "chuoi": "v4-soi-the",
              "sau": [],
              "nhan": "Tấm thẻ đeo cổ"
            },
            {
              "sprite": "vung:balo",
              "x": 10,
              "y": 80,
              "rong": 20,
              "chuoi": "v4-soi-balo",
              "sau": [],
              "nhan": "Cái balo"
            },
            {
              "sprite": "vung:quai",
              "x": 31,
              "y": 38,
              "rong": 14,
              "chuoi": "v4-soi-huy-hieu",
              "sau": [],
              "nhan": "Thứ gài trên quai balo"
            }
          ]
        },
        {
          "type": "image",
          "imageId": "cg-v4-huy-hieu-sut"
        },
        {
          "type": "note",
          "text": "Khánh quay đi. Cái huy hiệu bánh răng trên quai balo lắc lư."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tớ thấy cái huy hiệu rồi. Nãy giờ tớ nín thở luôn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nín là đúng đấy. Nói ra lúc ấy thì cũng như cá thôi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Huy hiệu làm ba chục cái hồi đầu năm. Cái sứt là lỗi khuôn, anh Khánh xin giữ. Nhưng balo anh ấy hay để ở xưởng, ai cũng cầm ra cổng được. Anh không nói là anh ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Biết balo chưa phải biết người. Ghi thẻ, không kết."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Lần này tớ biết mà vẫn không cá."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Muốn nói với thầy Quang thì cần một nguồn thứ hai, không dính gì tới cái huy hiệu. Và phải biết ba đơn kia tiền ở đâu ra, trả bằng quỹ nào, ai duyệt."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Sao kê thì cuối kỳ mới tự về. Chủ quỹ xin giữa kỳ cũng được, nhưng giấy phải qua chủ tịch Hội ký chuyển. Chị chưa xin lần nào, nên giờ chị mới biết điều đó. Và người ký chuyển vừa đứng ở cửa, tự mời mình gửi giấy."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tức là muốn xem sổ thì phải hỏi đúng người mình chưa được nói tên. Còn một đường nữa: thầy Quang."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Mình không nghi ai cả. Nhưng mình muốn biết là ai."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Thì mình hỏi sổ thôi."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Hai bảng nối nhau bằng một cột chung. Nối đúng cột thì mỗi dòng kéo theo đúng phần còn lại của nó. Nghi ngờ mạnh vẫn chưa phải bằng chứng: càng chắc trong lòng, càng phải tìm nguồn thứ hai."
        },
        {
          "type": "image",
          "imageId": "chibi-v4-khong-ca"
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v4-phong-duy",
      "title": "Vụ 4: Duy mở laptop (việc chính)",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bản sổ đặt hàng Ban kiểm tra gửi kèm, anh nạp vào máy rồi. Cả sổ, từ hồi xưởng mới số hóa."
        }
      ]
    },
    {
      "id": "v4-phong-nam",
      "title": "Vụ 4: Nam kể hai đơn mình đặt thật",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Hai đơn anh đặt thật là cảm biến dò line với bánh xe. Anh đặt buổi chiều, ở máy xưởng số 2, lúc đang trực."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ba đơn còn lại anh chưa từng thấy cho tới khi cầm tờ giấy này."
        }
      ]
    },
    {
      "id": "v4-phong-quan",
      "title": "Vụ 4: Quân nói về việc giám sát",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Lần này tôi không lọc thay các bạn. Tôi ký giám sát, và tôi đọc từng phiếu."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Phiếu nào các bạn ghim mà thiếu căn cứ, tôi sẽ hỏi lại đúng câu thầy Quang hỏi tôi hôm họp."
        }
      ]
    },
    {
      "id": "v4-soi-the",
      "title": "Quan sát Khánh: tấm thẻ đeo cổ",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Thẻ đeo cổ dây xanh, loại thẻ của cán bộ Hội."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chủ tịch Hội. Giấy nào qua Hội cũng qua tay anh ấy."
        }
      ]
    },
    {
      "id": "v4-soi-balo",
      "title": "Quan sát Khánh: cái balo",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Balo khoác một bên vai, to, cũ."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Balo ấy anh Khánh hay để ở xưởng cả ngày."
        }
      ]
    },
    {
      "id": "v4-soi-huy-hieu",
      "title": "Quan sát Khánh: huy hiệu bánh răng sứt",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Trên quai balo gài một cái huy hiệu bánh răng. Sứt mất một răng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Bánh răng sứt một răng… Chú Cường tả đúng cái này."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-huy-hieu-sut"
            }
          ]
        }
      ]
    },
    {
      "id": "v5-qua-2011",
      "title": "Sắp tới 20/11",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "set-date",
          "date": "2024-11-16"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Tuần sau 20/11 rồi. CLB mình tri ân thầy cô thế nào đây?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thầy Quang trước đi chị! Thầy toàn hỏi \"căn cứ vào đâu\". Tặng thầy cuốn sổ ghi chữ Căn Cứ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Để rồi thầy hỏi: \"Căn cứ vào đâu các em nghĩ thầy cần sổ?\" à."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Cứ hoa tươi là trang trọng nhất. Để em đặt cúc họa mi đầu mùa nhé."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nhớ cả phần cô Hạnh nữa. Năm nay là năm cuối cô còn đi làm trước khi nghỉ hưu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Quà tính sau. Trước 20/11 còn một việc đang chờ ở xưởng.)"
        },
        {
          "type": "goto",
          "to": "v5-mo"
        }
      ]
    },
    {
      "id": "v5-mo",
      "title": "Nam đếm kho: ba linh kiện không có một cái",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Bảy, 16/11/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xưởng Robotics, cuối tuần. Nam đứng giữa các kệ linh kiện, tay cầm bảng kiểm kê, mặt khó coi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Biên bản kiểm kê hôm thứ Ba 12 đây. Tài khoản khóa nên anh đếm tay từng loại, hai lần."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thế rồi sao anh?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ba đơn mang tên anh: động cơ servo, mạch điều khiển, khung nhôm. Trong kho không có lấy một cái. Sổ ghi đã duyệt, mà lúc anh kiểm kê, kho không có."
        },
        {
          "type": "show-document",
          "documentId": "doc-kiem-ke"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-so-luong-co-0"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy phải so sổ đặt hàng với bảng kiểm kê. Hai bảng, chung nhau tên linh kiện."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nối theo tên linh kiện rồi lọc thứ nào trong kho đang là số không."
        },
        {
          "type": "task",
          "text": "Đơn nào đặt mua thứ mà trong kho không có một cái?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nối sổ đặt hàng với bảng kiểm kê theo tên linh kiện. Kho không có là số không."
        },
        {
          "type": "challenge",
          "challengeId": "c-dat-ma-khong-co"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba đơn. Đúng ba đơn đứng tên anh Nam từ máy văn phòng xưởng."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Linh kiện chỉ là cái cớ để ghi vào sổ. Còn tiền có thật sự đi đâu không, sổ đặt hàng không nói."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Tiền thì nằm trong sổ quỹ. Sổ quỹ khối CLB không phải của mình, chị không tự mở được. Phải xin thầy Quang."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Thầy Quang thì lại \"căn cứ vào đâu\"."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thì mình mang căn cứ đi là được."
        },
        {
          "type": "goto",
          "to": "v5-thay-quang"
        }
      ]
    },
    {
      "id": "v5-thay-quang",
      "title": "Phòng Đào tạo: \"Căn cứ vào đâu?\"",
      "canh": "phong-dao-tao",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng Đào tạo. Thầy Quang nghe Minh Anh trình bày, không ngắt lời, rồi hỏi đúng một câu."
        },
        {
          "type": "doi-chat",
          "id": "dc-xin-so-quy",
          "asker": {
            "speaker": "thay-quang",
            "text": "Các em muốn thầy cho xuất sổ quỹ của khối CLB, một sổ không thuộc CLB các em. **Căn cứ vào đâu?**"
          },
          "cauHoi": "Ba đơn linh kiện đã được duyệt chi tiền. Hàng của ba đơn ấy có trong kho không? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "ev-dat-ma-khong-co",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Thưa thầy, ba đơn linh kiện ghi đã duyệt, trên đơn tổng hai triệu tư, nhưng kiểm kê xưởng không có một cái nào. Đơn đã duyệt mà hàng không có, nên bọn em cần xác minh tiền ấy có xuất khỏi quỹ nào không, ai duyệt."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Đơn đã duyệt mà không có hàng. Căn cứ ấy đủ để thầy cho đối chiếu ba mã đơn này với sổ chi khối CLB. Chúng ghi vào quỹ nào thì chủ quỹ ấy được xem các dòng của quỹ mình. Thầy cho xuất, các em chỉ được xem các khoản liên quan ba đơn này và quỹ CLB Thám Tử."
                }
              ]
            },
            {
              "id": "ev-don-nam-may",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Ba đơn ấy tạo ban đêm từ máy văn phòng xưởng, đứng tên Nam mà Nam không đặt ạ."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Đơn mượn tên là chuyện của xưởng Robotics. Chuyện tiền thì thầy cần căn cứ về tiền."
                }
              ]
            },
            {
              "id": "ev-toi-07",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Em Nam ở thư viện tối đó. Thầy ghi nhận, nhưng điều ấy liên quan gì tới sổ quỹ?"
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Chưa đủ căn cứ thì thầy chưa mở sổ của người khác cho các em xem. Về làm rõ đã."
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Dạ. Bọn em về đếm lại kho ạ."
            }
          ],
          "khac": [
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Cái này nói gì về tiền?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Thầy hỏi căn cứ, các em đưa ba thứ chẳng nói gì về tiền. Thầy chưa thể mở sổ của người khác cho các em xem."
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Dạ, bọn em xin phép dừng ạ."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-xin-so-quy-du"
          },
          "to": "v5-nhan-so"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cả nhóm ra khỏi phòng Đào tạo, chưa có sổ quỹ. Minh Anh dừng ở hành lang."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Thầy nói đúng. Mình phải mang căn cứ về tiền và hàng, không phải về người. Xem lại hồ sơ rồi vào lại."
        },
        {
          "type": "goto",
          "to": "v5-thay-quang"
        }
      ]
    },
    {
      "id": "v5-nhan-so",
      "title": "Cô Hạnh đưa bản xuất, cô Lan in quy chế",
      "canh": "phong-dao-tao",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Thầy Quang ký rồi. Cô đối chiếu ba mã đơn với sổ chi: cả ba ghi vào quỹ CLB Thám Tử. Em Minh Anh là chủ quỹ nên được xem các dòng của quỹ mình. Bản xuất cô gửi về laptop CLB, các em chỉ xem đúng dòng liên quan thôi nhé."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Ba khoản lớn là tạm ứng tiền mặt, người duyệt ký nhận. Quy chế cho bổ sung chứng từ trong ba mươi ngày, nên cột mã đơn là điền sau."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Cô bên Công tác sinh viên in kèm quy chế quỹ khối CLB. Khoản dưới một triệu thì chủ tịch Hội duyệt thẳng. Tổng một người duyệt từ MỘT quỹ trong một học kỳ vượt một triệu thì người đó phải giải trình; Phòng Kế hoạch soát ngưỡng ấy lúc đối chiếu cuối kỳ, cùng lúc gửi sao kê. Phần về CLB chờ giải thể ở trang sau, các em tự đọc."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em cảm ơn hai cô ạ."
        },
        {
          "type": "task",
          "text": "Mang bản xuất sổ quỹ về phòng CLB"
        },
        {
          "type": "explore",
          "id": "kp-bd-v5",
          "kieu": "ban-do",
          "gio": "15:00",
          "diem": [
            {
              "sprite": "ghim:nha-clb",
              "x": 45,
              "y": 17,
              "rong": 5,
              "chuoi": "v5-so-quy",
              "sau": [],
              "nhan": "Phòng CLB",
              "dau": "chinh",
              "co": [
                "duy",
                "minh-anh"
              ]
            },
            {
              "sprite": "ghim:tra-da",
              "x": 41,
              "y": 86,
              "rong": 5,
              "chuoi": "v5-bd-tra-da",
              "sau": [],
              "nhan": "Quán trà đá",
              "dau": "phu",
              "co": [
                "ba-lua"
              ]
            }
          ]
        },
        {
          "type": "goto",
          "to": "v5-so-quy"
        }
      ]
    },
    {
      "id": "v5-so-quy",
      "title": "Sổ quỹ khối CLB: khoản nào ghi vào quỹ CLB Thám Tử",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đường từ tòa hành chính về nhà câu lạc bộ. Minh Anh ôm tập giấy đi trước, không nói gì."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Chị ấy im thế là giận hay là sợ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Là đang tính. Quỹ mang tên CLB mình, mà chữ ký duyệt thì chị ấy chưa thấy bao giờ."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thầy Quang hỏi \"căn cứ vào đâu\". Giờ căn cứ nằm trong tập giấy kia."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều, phòng CLB. Bản xuất cô Hạnh gửi đã nằm trong laptop: chỉ gồm các khoản chi ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mỗi khoản chi có mã quỹ. Bảng quỹ cho biết mã nào là quỹ của CLB nào. Lại hai bảng."
        },
        {
          "type": "task",
          "text": "Khoản chi nào ghi vào quỹ CLB Thám Tử?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nối sổ chi với bảng quỹ theo mã quỹ, rồi lọc quỹ của CLB mình."
        },
        {
          "type": "show-document",
          "documentId": "doc-so-quy"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-quy-tham-tu"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-han-muc"
            }
          ]
        },
        {
          "type": "explore",
          "id": "kp-phong-v5",
          "diem": [
            {
              "sprite": "nv:duy",
              "x": 20,
              "y": 100,
              "rong": 15,
              "chuoi": "v5-phong-duy",
              "sau": [],
              "nhan": "Duy: mở laptop",
              "dau": "chinh"
            },
            {
              "sprite": "nv:ha-vy",
              "x": 48,
              "y": 100,
              "rong": 15,
              "chuoi": "v5-phong-vy",
              "sau": [],
              "nhan": "Hà Vy: câu hỏi trên bảng",
              "dau": "phu"
            },
            {
              "sprite": "nv:minh-anh",
              "x": 76,
              "y": 100,
              "rong": 15,
              "chuoi": "v5-phong-minh-anh",
              "sau": [],
              "nhan": "Minh Anh: ba khoản chị duyệt",
              "dau": "phu"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-chi-tham-tu"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản nhỏ chị Minh Anh duyệt. Ba khoản lớn là tạm ứng, người duyệt và ký nhận ghi là Khánh, xuất ngày 10, 11 và 12 tháng 9. Cột mã đơn điền sau, ghi đúng mã ba đơn linh kiện kho không có hàng."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Ba khoản chị duyệt là văn phòng phẩm, chị nhớ. Ba khoản kia chị chưa từng thấy."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Đơn sớm nhất trong ba đơn ấy tạo ngày 27 tháng 9. Tiền tạm ứng trước, đơn viết sau, vừa kịp hạn ba mươi ngày bổ sung chứng từ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Gom theo người duyệt rồi đếm. Nhưng lần này đếm số dòng chưa đủ: ba khoản nhỏ với ba khoản lớn đếm ra bằng nhau. Phải cộng tiền."
        },
        {
          "type": "task",
          "text": "Mỗi người duyệt bao nhiêu khoản, tổng bao nhiêu tiền?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Gom theo người duyệt; ngoài đếm, tính thêm tổng của cột tiền."
        },
        {
          "type": "challenge",
          "challengeId": "c-chi-theo-nguoi-duyet"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chị Minh Anh: ba khoản, tổng bốn trăm năm mươi nghìn. Anh Khánh: ba khoản, tổng hai triệu tư."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Tờ quy chế cô Lan in đây: khoản dưới một triệu thì chủ tịch Hội duyệt thẳng, không cần trưởng CLB chủ quỹ ký. Chị là chủ quỹ mà không biết ba khoản này, là vì thế. Sao kê tổng thì Phòng Kế hoạch giữ, cuối kỳ mới gửi."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nhưng tổng các khoản một người duyệt từ một quỹ trong học kỳ mà vượt một triệu thì cuối kỳ Phòng Kế hoạch đòi người đó giải trình."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Và tính thêm trung bình mỗi khoản. Xem từng khoản to cỡ nào so với mức duyệt thẳng."
        },
        {
          "type": "task",
          "text": "Người duyệt nào có tổng chi vượt ngưỡng giải trình một triệu? Mỗi khoản trung bình bao nhiêu?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Gom như vừa rồi, tính thêm trung bình, rồi chỉ giữ nhóm có tổng lớn hơn một triệu."
        },
        {
          "type": "challenge",
          "challengeId": "c-chi-vuot-muc"
        },
        {
          "type": "image",
          "imageId": "chibi-so-lieu-day"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Còn một dòng. Anh Khánh: ba khoản, tổng hai triệu tư, trung bình tám trăm nghìn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Trung bình tám trăm nghìn một khoản, dưới mức một triệu. Nhìn lại phiếu sáu khoản: tám trăm, chín trăm, bảy trăm. Từng khoản đều dưới mức duyệt thẳng, cộng lại thì vượt ngưỡng giải trình."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ba khoản nhỏ vừa đủ lọt… ghi vào quỹ CLB mình, cho ba đơn kho không có hàng."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh Khánh. Trưởng CLB của mình. Hôm ở xưởng anh ấy còn bảo mọi người hỏi mình nhẹ thôi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bảng nói được ai duyệt, bao nhiêu. Vì sao thì không."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chị gửi thầy Quang. Việc còn lại là của thầy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Tiền bị lấy từ đúng quỹ của CLB mà lá thư đòi thu phòng, bốn ngày trước lá thư. Với căn cứ ấy chị xin thầy Quang cho mở trang sổ ký phòng máy tối Chủ nhật 15/9. Hồi tháng 9 Tùng đòi xem, bác Thịnh không cho."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Hồi ấy tớ đòi mở để truy người viết thư. Bác không cho là phải."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Thầy Quang ký rồi. Bác Thịnh mở đúng một trang ấy."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-so-phong-may"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-in-toi-15-9"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tối Chủ nhật 15/9, bảy dòng. Năm bạn vào in bài. Hai người của Robotics: chị Thảo vào 20 giờ 10, ra 21 giờ 30. Anh Khánh vào 22 giờ 40, ra 23 giờ 20. Cô Hạnh gửi nhật ký in của tài khoản Robotics tối ấy: hai lệnh, 20 giờ 40 và 23 giờ 10."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "23 giờ 10 là lá thư. Trong phòng lúc ấy, người của Robotics chỉ có một. Mới là cơ hội và thời gian, chưa phải ai bấm in."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Sổ ký là giấy, nhật ký in là máy. Hai nguồn riêng. Mang cả hai lên."
        },
        {
          "type": "set-date",
          "date": "2024-11-26"
        },
        {
          "type": "goto",
          "to": "v5-doi-chat"
        }
      ]
    },
    {
      "id": "v5-doi-chat",
      "title": "Phòng họp, nhịp một: \"đúng thẩm quyền\"",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "image",
          "imageId": "cg-v5-ao-xanh-don-hoai"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Hai tuần sau. Thầy Quang mời cả Hoài lên dự buổi họp. Hoài nhắn cho Tùng đúng một dòng: \"Cậu mặc cái áo xanh ra cổng đón tớ được không? Đông người lạ, tớ nhìn cái áo cho dễ.\""
        },
        {
          "type": "note",
          "text": "Cổng tòa nhà hành chính. Tùng mặc chiếc áo xanh tình nguyện, đứng chờ. Hoài đi tới, tay ôm cặp."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Tớ vẫn không nhớ mặt người đưa thư. Vào đấy tớ có phải chỉ ai không?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-doi-mu",
          "text": "Không. Cậu nhớ gì thì nói chừng ấy. Hôm nay tớ xem biển rồi, không dẫn nhầm tòa nữa đâu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mặc áo ấy thì cậu ngồi cạnh Hoài, không ngồi với bọn tớ. Và không được chỉ cho bạn ấy nhìn cái gì."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-gai-dau",
          "text": "Tớ biết. Bạn ấy thấy gì thì bạn ấy tự thưa."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng họp. Thầy Quang chủ trì, cô Lan ngồi bên. Khánh ngồi một phía, mặt không đổi, balo dựng cạnh chân ghế. Nam ngồi cạnh nhóm CLB Thám Tử. Quân ngồi cuối bàn ghi biên bản. Tùng áo xanh ngồi hàng ghế cạnh cửa với Hoài và chú Cường."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Trước khi bắt đầu. Giấy giải trình của Ban kiểm tra vẫn đứng tên em Nam, giải ngân của xưởng vẫn dừng."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Hạn lệ phí giải là cuối tháng này ạ. Còn chưa tới hai tuần."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Buổi này không rõ ai lập ba đơn thì thầy chưa có căn cứ gỡ tên em ấy."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Em hiểu ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy mời em Khánh tới vì sổ quỹ. CLB Thám Tử trình bày, em Khánh trả lời. Ai nói gì thì kèm căn cứ."
        },
        {
          "type": "task",
          "text": "Trình phiếu cho thấy Khánh phải giải trình"
        },
        {
          "type": "doi-chat",
          "id": "dc-khanh",
          "asker": {
            "speaker": "khanh",
            "text": "Ba khoản đó là chi cho đội robot trước giải quốc gia. **Khoản dưới một triệu, chủ tịch Hội duyệt là đúng thẩm quyền.** Các bạn có gì mà nói tôi sai?"
          },
          "cauHoi": "Từng khoản dưới một triệu. Cộng cả ba khoản thì bao nhiêu, ghi vào quỹ nào, có vượt ngưỡng phải giải trình không? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "ev-chi-vuot-muc",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Từng khoản thì đúng thẩm quyền ạ. Nhưng sổ chi ghi ba khoản ấy vào quỹ CLB Thám Tử, không phải quỹ Robotics. Cộng lại hai triệu tư, vượt ngưỡng phải giải trình, người duyệt là anh Khánh. Em là chủ quỹ mà chưa từng thấy."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Vượt ngưỡng thì phải giải trình. Em Khánh, giải trình đi."
                }
              ]
            },
            {
              "id": "ev-chi-theo-nguoi-duyet",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Sổ quỹ CLB Thám Tử có hai người duyệt: chị Minh Anh ba khoản nhỏ, và anh ba khoản lớn."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Khoản dưới một triệu thì chủ tịch Hội duyệt được. Thế thì sai chỗ nào?"
                }
              ]
            },
            {
              "id": "ev-dat-ma-khong-co",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "nam",
                  "expression": "neutral",
                  "text": "Ba đơn đó không có cái linh kiện nào trong kho. Em đếm hai lần."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Chuyện hàng nói sau. Tôi đang hỏi về thẩm quyền."
                }
              ]
            },
            {
              "id": "ev-don-nam-may",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Đơn đứng tên Nam thì hỏi Nam. Tôi đang hỏi về thẩm quyền duyệt chi."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, bọn em chỉ nói được tới đây: ba khoản chi gắn với ba đơn kho không có hàng, ghi vào quỹ CLB Thám Tử. Ai chi vào việc gì, bọn em không có căn cứ."
            },
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Biết dừng ở chỗ chứng cứ dừng. Phần còn lại thầy làm việc với Hội sinh viên."
            }
          ],
          "khac": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Cái này thì liên quan gì tới quỹ?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Thưa thầy, ba lần rồi, các bạn ấy vẫn chưa đưa được gì về thẩm quyền."
            },
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Trình lạc đề ba lần thì thầy phải dừng phần này. Các em nói tới đâu thầy ghi tới đó."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-du"
          },
          "to": "v5-doi-chat-2"
        },
        {
          "type": "goto",
          "to": "v5-ket-thieu"
        }
      ]
    },
    {
      "id": "v5-doi-chat-2",
      "title": "Nhịp hai: \"đơn do Nam lập, tôi chỉ duyệt\"",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Em giải trình được ạ."
        },
        {
          "type": "task",
          "text": "Trình phiếu cho thấy ba đơn không phải do Nam lập"
        },
        {
          "type": "doi-chat",
          "id": "dc-khanh-don",
          "asker": {
            "speaker": "khanh",
            "text": "Giải trình thì đơn giản. Hàng đặt gia công bên ngoài, chưa về kho. Còn **ba đơn ấy do Nam lập**, tên Nam còn trên sổ. Tôi chỉ duyệt theo đề xuất của thành viên. Ghi nhầm mã quỹ là lỗi nhập liệu."
          },
          "cauHoi": "Ba đơn được tạo lúc nào, từ máy nào? Lúc ấy Nam có thể ngồi ở máy đó không? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "ev-don-nam-may",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Ba đơn ấy tạo ban đêm từ cùng một máy trong phòng văn phòng xưởng. Chìa thì bọn em không dựa vào, chị Thảo để chìa ở ngăn bàn. Bọn em dựa vào giờ: đơn ngày 07/10 tạo lúc 22 giờ 05."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Tối đó cửa từ thư viện ghi Nam ở trong tới 23 giờ 05. Em ngồi cách Nam hai bàn."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Vậy ba đơn lập từ một máy, và ít nhất một đơn chắc chắn không phải em Nam lập."
                }
              ]
            },
            {
              "id": "ev-may-vp",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Máy văn phòng xưởng tạo bốn đơn. Một đơn ban ngày đứng tên anh. Ba đơn ban đêm đứng tên Nam. Chìa thì bọn em không dựa vào; bọn em dựa vào giờ."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Đơn đêm 07/10 tạo lúc 22 giờ 05. Cửa từ thư viện ghi Nam ở trong tới 23 giờ 05."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Vậy ba đơn lập từ một máy, và ít nhất một đơn chắc chắn không phải em Nam lập."
                }
              ]
            },
            {
              "id": "ev-chi-tham-tu",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Anh nói anh duyệt theo đề xuất của Nam. Sổ chi ghi ba khoản ấy là tạm ứng, xuất ngày 10, 11 và 12 tháng 9. Mã đơn điền bổ sung sau, đúng ngày ba đơn được tạo: 27/9, 4/10 và 7/10."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Tiền tạm ứng trước, mã đơn điền sau. Lúc anh ký nhận tiền thì trên máy chưa có đơn nào của Nam để duyệt theo."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Đơn lập sau chưa chứng minh là không có đề xuất trước. Em Khánh, hồi ấy em có đề xuất viết tay nào của em Nam không? Và giấy giao việc gia công?"
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "…Không ạ."
                }
              ]
            },
            {
              "id": "ev-toi-07",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Tối 07/10 Nam ở thư viện từ 21 giờ 50 tới 23 giờ 05."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Thư viện thì liên quan gì tới đơn đặt hàng? Đơn tạo lúc nào, ở đâu, các bạn có không?"
                }
              ]
            },
            {
              "id": "ev-dat-ma-khong-co",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "nam",
                  "expression": "neutral",
                  "text": "Gia công ngoài thì phải có biên nhận giao việc. Anh có không ạ?"
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Sẽ bổ sung. Nhưng đơn vẫn là đơn của em."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, ai lập ba đơn ấy thì bọn em chưa có căn cứ để nói. Bọn em dừng ở chỗ ba khoản vượt ngưỡng."
            },
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Vậy dừng ở đó. Phần còn lại thầy làm việc với Hội sinh viên."
            }
          ],
          "khac": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Cái này nói gì về người lập đơn?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Đấy, thầy xem. Ba tờ giấy, chẳng tờ nào nói ai lập đơn."
            },
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Thầy dừng phần này ở đây. Ai lập đơn, thầy sẽ tự hỏi lại."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-don-du"
          },
          "to": "v5-nhan-tien"
        },
        {
          "type": "goto",
          "to": "v5-ket-thieu"
        }
      ]
    },
    {
      "id": "v5-ket-thieu",
      "title": "Chưa đủ căn cứ: chưa ngã ngũ",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Các em dừng đúng chỗ. Chuyện ba khoản chi, thầy chuyển Phòng Kế hoạch yêu cầu Hội sinh viên giải trình. Có kết luận thầy sẽ thông báo."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Em sẽ giải trình với Phòng Kế hoạch. Không phải ở đây."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một tuần sau, chưa có kết luận. Khánh vẫn là chủ tịch Hội sinh viên. Phòng CLB vẫn giữ tới hết học kỳ như thầy Quang đã hứa; sau đó thế nào thì chờ đợt rà soát cuối kỳ."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Không biết anh ấy sẽ nói gì với Phòng Kế hoạch. Nhưng mọi người đã dừng ở đúng chỗ. Sổ sách của xưởng, từ giờ mình giữ cho rõ."
        },
        {
          "type": "line",
          "speaker": "thao",
          "expression": "neutral",
          "text": "Lệ phí giải thì chị với Bách góp tạm, đội vẫn đi. Tên em thì chờ Phòng Kế hoạch."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chưa ngã ngũ thì hồ sơ ghi \"chưa ngã ngũ\". Mình không viết thêm."
        },
        {
          "type": "goto",
          "to": "v5-ket-luan"
        }
      ]
    },
    {
      "id": "v5-nhan-tien",
      "title": "Khánh nhận phần tiền; nhịp ba: lá thư",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Khánh. Hàng gia công ngoài thì phải có giấy giao việc, em chưa trình tờ nào. Nhầm mã quỹ thì nhầm ba lần liền, cả ba cùng rơi vào một quỹ. Ba đơn lập từ một máy, một đơn chắc chắn không phải em Nam lập, và tiền tạm ứng thì chính em ký nhận. Em giải thích mối liên hệ này thế nào?"
        },
        {
          "type": "note",
          "text": "Khánh nhìn tờ phiếu một dòng trên bàn một lúc lâu."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "…Ba khoản đó không chi cho đội ạ. Đơn là em lập. Tiền em dùng vào việc riêng. Em sẽ trả lại."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Anh lấy tên em."
        },
        {
          "type": "note",
          "text": "Khánh không nhìn sang Nam."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Quân ghi biên bản: tên em Nam được gỡ khỏi giấy giải trình, giải ngân của xưởng mở lại từ hôm nay."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "CLB Thám Tử còn đề nghị hỏi lại chuyện lá thư hồi tháng 9. Em Hoài, chú Cường, mời hai người lên gần đây."
        },
        {
          "type": "note",
          "text": "Hoài đứng dậy, đi ngang qua chân ghế của Khánh thì khựng lại. Tay cô níu lấy tay áo xanh của Tùng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh",
          "text": "Tớ không nói hộ được. Cậu thấy gì thì thưa với thầy."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Thưa thầy, cái huy hiệu sứt một răng trên balo kia. Đúng cái em thấy sáng hôm ấy. Mặt người thì em vẫn không dám chắc ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy ghi đúng như em nói: một cái balo, chưa phải một người."
        },
        {
          "type": "task",
          "text": "Trình một nguồn nối lá thư với một người, không dính tới cái huy hiệu"
        },
        {
          "type": "image",
          "imageId": "cg-v5-huy-hieu-hoai"
        },
        {
          "type": "doi-chat",
          "id": "dc-khanh-thu",
          "asker": {
            "speaker": "khanh",
            "text": "Tiền thì tôi nhận. Nhưng lá thư với cái tin thì đừng gán cho tôi. Huy hiệu phát ba chục người, tài khoản in với tài khoản kênh cả ban chủ nhiệm dùng. **Phiếu nào của các bạn có tên tôi?**"
          },
          "cauHoi": "Lá thư in lúc 23:10 tối Chủ nhật 15/9. Lúc ấy những ai ở trong phòng máy? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "clue-so-phong-may",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Nhật ký in ghi lá thư in lúc 23 giờ 10 tối Chủ nhật 15/9, bằng tài khoản của Robotics. Sổ ký vào phòng tối đó có bảy dòng, chỉ hai người của Robotics. Chị Thảo ra lúc 21 giờ 30. Anh vào 22 giờ 40, ra 23 giờ 20."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Em vào in sơ đồ cho đội ạ."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Hợp lý."
                }
              ]
            },
            {
              "id": "clue-loi-chu-cuong",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Sáng thứ Hai 16/9, người đưa phong bì ở cổng ký túc xá đeo balo có huy hiệu bánh răng sứt một răng."
                },
                {
                  "speaker": "chu-cuong",
                  "expression": "neutral",
                  "text": "Đúng cái huy hiệu trên balo kia. Mặt thì chú không dám nói, hôm ấy trời mới sáng."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Balo tôi hay để ở xưởng, ai cầm chả được. Một cái huy hiệu thôi à?"
                },
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Đúng, mới một nguồn. Cần một nguồn không dính gì tới cái huy hiệu."
                }
              ]
            },
            {
              "id": "clue-huy-hieu-sut",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "nam",
                  "expression": "neutral",
                  "text": "Cái sứt là lỗi khuôn, chỉ có một cái, anh xin giữ."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Và balo anh để ở xưởng cả ngày, em cũng biết thế."
                }
              ]
            },
            {
              "id": "ev-nhat-ky-in",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "Lá thư in từ tài khoản dùng chung của Robotics, 23 giờ 10 tối Chủ nhật."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Dùng chung. Chính các bạn nói tài khoản chưa phải là người."
                },
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Tài khoản thì chung. Nhưng phòng máy tối Chủ nhật thì phải ký sổ mới vào được."
                }
              ]
            },
            {
              "id": "clue-giao-chia",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Ba người có chìa. Thảo còn để chìa ngoài ngăn bàn. Mà lá thư đâu có in ở xưởng."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, phần lá thư bọn em không có căn cứ nào gắn với một người. Bọn em dừng ở phần tiền."
            },
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Dừng đúng chỗ. Phần ấy thầy sẽ hỏi riêng."
            }
          ],
          "khac": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Cái này thì liên quan gì tới lá thư?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Ba lần rồi mà vẫn không có tên tôi. Thôi thì đừng gán lá thư cho tôi nữa."
            },
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Thầy ghi nhận phần tiền. Phần lá thư dừng ở đây."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-thu-du"
          },
          "to": "v5-so-do"
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phần tiền em Khánh đã nhận. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên. Phần lá thư thì chưa có căn cứ gắn với một người, thầy sẽ hỏi riêng. Cảm ơn chú Cường và em Hoài đã tới."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "downcast",
          "text": "Em xin lỗi, em không giúp được gì ạ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em tới là giúp rồi. Chưa đủ thì ghi là chưa đủ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phòng của CLB Thám Tử giữ nguyên. Thầy nhận hồ sơ của các em vào đợt rà soát cuối kỳ."
        },
        {
          "type": "goto",
          "to": "v5-ket-luan"
        }
      ]
    },
    {
      "id": "v5-so-do",
      "title": "Khánh thắng một nhịp: \"em vào in sơ đồ\"",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "image",
          "imageId": "cg-bang-chung-day"
        },
        {
          "type": "doi-chat",
          "id": "dc-khanh-so-do",
          "asker": {
            "speaker": "thay-quang",
            "text": "Em Khánh nói **vào phòng máy để in sơ đồ cho đội**. Nghe hợp lý. Các em còn gì về tối hôm ấy không? Không thì thầy dừng phần lá thư ở đây."
          },
          "cauHoi": "Tối 15/9, tài khoản Robotics in những lệnh nào, lúc mấy giờ? Lúc Khánh ở trong phòng có lệnh in sơ đồ nào không? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "clue-in-toi-15-9",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Sơ đồ tôi in thì các bạn đâu có tra."
                },
                {
                  "speaker": "player",
                  "text": "Em tra rồi ạ. Tối 15/9 tài khoản Robotics in đúng hai lệnh: 20 giờ 40 và 23 giờ 10."
                },
                {
                  "speaker": "ha-vy",
                  "expression": "neutral",
                  "text": "20 giờ 40 là sơ đồ mạch, lúc ấy chị Thảo còn trong phòng. 23 giờ 10 là lá thư. Còn cả phòng máy, từ 22 giờ 40 tới 23 giờ 20, chỉ có ba lệnh in: một đồ án, một báo cáo nhóm của hai bạn khác, và lá thư. Không có sơ đồ nào, bằng tài khoản nào cũng không."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Em Khánh, vậy sơ đồ của em đâu?"
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "…"
                }
              ]
            },
            {
              "id": "clue-thao-in-so-do",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Sơ đồ của đội thì tối Chủ nhật nào chị Thảo cũng in. Tối ấy chị ấy ra trước khi anh vào hơn một tiếng."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Thảo in bộ của Thảo. Tôi in thêm một bộ."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Thói quen của người khác chưa bác được lời em Khánh. Có gì ghi lại các lệnh in tối ấy không?"
                }
              ]
            },
            {
              "id": "clue-so-phong-may",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Trang này thầy xem rồi. Nó đặt em Khánh trong phòng, và em ấy đã nói vào làm gì. Còn gì khác không?"
                }
              ]
            },
            {
              "id": "ev-nhat-ky-in",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Phiếu ấy chỉ có một dòng về lá thư."
                },
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Đúng, phiếu này chỉ lọc tên tệp lá thư. Cô Hạnh còn gửi kèm một trang khác về cả tối hôm ấy."
                }
              ]
            },
            {
              "id": "clue-loi-chu-cuong",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Cái huy hiệu thầy ghi rồi. Thầy đang hỏi về tối Chủ nhật ở phòng máy."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, bọn em không còn gì về tối hôm ấy ạ."
            },
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Vậy phần lá thư dừng ở đây. Thầy sẽ hỏi riêng."
            }
          ],
          "khac": [
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Cái này nói gì về tối 15/9?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Thầy hỏi về tối Chủ nhật, các em đưa ba thứ khác. Thầy dừng phần lá thư ở đây."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-so-do-du"
          },
          "to": "v5-gioi-han"
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phần tiền em Khánh đã nhận. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên. Phần lá thư thầy dừng ở đây và sẽ hỏi riêng. Cảm ơn chú Cường và em Hoài đã tới."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chưa đủ thì ghi là chưa đủ ạ."
        },
        {
          "type": "goto",
          "to": "v5-ket-luan"
        }
      ]
    },
    {
      "id": "v5-gioi-han",
      "title": "Người chơi tự nói giới hạn của chứng cứ",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-v5-gioi-han",
          "asker": {
            "speaker": "thay-quang",
            "text": "Em là người trình trang sổ ấy. Theo em, tới đây chứng cứ đủ nói đến đâu?"
          },
          "choices": [
            {
              "id": "chac-chan",
              "text": "Anh Khánh chắc chắn là người in lá thư.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Sổ ghi ai ở trong phòng. Cột nào ghi ai bấm in?"
                }
              ]
            },
            {
              "id": "co-mat",
              "text": "Anh Khánh có mặt lúc lá thư được in, và lý do anh nêu không khớp nhật ký in. Còn ai bấm in thì em chưa chứng minh được.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Tôi vừa nhận lấy tiền của CLB các bạn đấy. Thế mà vẫn \"chưa chứng minh được\" à?"
                },
                {
                  "speaker": "player",
                  "text": "Vâng. Phần nào chưa rõ thì em vẫn phải ghi là chưa rõ."
                }
              ]
            },
            {
              "id": "vo-ich",
              "text": "Trang sổ ấy không giúp được gì.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Nó đặt một người vào phòng đúng giờ, và bác được một lý do. Thế là có giúp."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "goto",
          "to": "v5-vi-sao"
        }
      ]
    },
    {
      "id": "v5-vi-sao",
      "title": "Khánh nhận lá thư; nhịp bốn: lá thư liên quan gì tới ba khoản chi",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy ghi đúng như em nói. Em Khánh, thầy chỉ hỏi: em có in lá thư ấy không? Em có thể trả lời, hoặc để thầy xác minh tiếp."
        },
        {
          "type": "note",
          "text": "Khánh im lặng một lúc lâu. Anh nhìn sang Hoài."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Nếu em không trả lời thì thầy xác minh tiếp ạ?"
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Đúng."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "…Thế là em lại lùi thêm một lần nữa, còn em Hoài thì lại phải ngồi đây nhớ một khuôn mặt em ấy không nhớ. Lá thư là em in ạ. Hoài chỉ nộp hộ."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Anh xin lỗi em, Hoài. Anh nhờ một bạn năm nhất vì nghĩ năm nhất thì không ai hỏi lại."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Vâng ạ."
        },
        {
          "type": "task",
          "text": "Trình thứ cho thấy lá thư liên quan gì tới ba khoản chi"
        },
        {
          "type": "doi-chat",
          "id": "dc-khanh-vi-sao",
          "asker": {
            "speaker": "thay-quang",
            "text": "Thầy chưa hiểu một điều. **Một lá thư đòi thu phòng thì liên quan gì tới ba khoản chi?** Các em có gì cho thấy mối liên hệ ấy không?"
          },
          "cauHoi": "Sổ quỹ của từng CLB bao giờ mới có người đọc? Lá thư tới trước hay sau lúc ấy? Trình thẻ cho biết điều đó.",
          "bangChung": [
            {
              "id": "ev-chi-tham-tu",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Tiền rời quỹ ngày 10, 11 và 12 tháng 9. Lá thư đòi thu phòng tới ngày 16. Đơn đầu tiên mãi ngày 27 mới có, sau buổi họp bọn em giữ được phòng."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Tiền trước, thư sau, đơn sau cùng. Nhưng thư thì giúp gì được cho tiền? Có gì nói về chuyện ai được đọc sổ, và bao giờ, không?"
                }
              ]
            },
            {
              "id": "clue-sao-ke-cuoi-ky",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Sao kê quỹ chỉ tự về các CLB vào cuối kỳ, cùng đợt rà soát phòng; ngưỡng một triệu cũng tới lúc ấy mới được soát. Muốn xem sớm hơn thì giấy phải qua chủ tịch Hội."
                },
                {
                  "speaker": "player",
                  "text": "Tức là tới cuối kỳ mới có người đọc ba khoản ấy. Mà lá thư đòi thu phòng lại tới ngay tuần đầu."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Thư đi trước ngày có người đọc sổ. Thầy thấy rồi."
                }
              ]
            },
            {
              "id": "ev-chi-vuot-muc",
              "muc": "ho-tro",
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Phiếu này nói bao nhiêu và ai duyệt. Còn bao giờ, và bao giờ mới có người đọc, thì phiếu khác nói."
                }
              ]
            },
            {
              "id": "clue-loi-nhan-linh-1",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "…Mẩu giấy này để sau buổi họp."
                },
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Dạ. Em xin lỗi thầy."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, lá thư để làm gì thì bọn em không có căn cứ ạ."
            },
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Vậy phần ấy thầy hỏi riêng."
            }
          ],
          "khac": [
            {
              "speaker": "thay-quang",
              "expression": "neutral",
              "text": "Cái này nói gì về lá thư và ba khoản chi?"
            },
            {
              "speaker": "minh-anh",
              "expression": "worried",
              "text": "Em xem lại hồ sơ ạ."
            }
          ],
          "hetLuot": [
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Ba lần rồi, thầy vẫn chưa thấy lá thư dính gì tới ba khoản chi. Phần ấy thầy hỏi riêng."
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-vi-sao-du"
          },
          "to": "v5-vi-sao-hoi"
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phần tiền và phần lá thư em Khánh đã nhận. Vì sao thì thầy hỏi riêng. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phòng của CLB Thám Tử giữ nguyên. Em Hoài, em Nam: tên hai em không dính gì tới việc này nữa."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "relieved",
          "text": "Em cảm ơn thầy ạ."
        },
        {
          "type": "goto",
          "to": "v5-ket-luan"
        }
      ]
    },
    {
      "id": "v5-vi-sao-hoi",
      "title": "Người chơi tự nối: lá thư để làm gì",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-v5-vi-sao",
          "asker": {
            "speaker": "thay-quang",
            "text": "Vậy theo các em, lá thư đòi thu phòng là để làm gì?"
          },
          "choices": [
            {
              "id": "cai-so",
              "text": "Để CLB mất phòng, hết kỳ thì phải giải thể, và không còn chủ quỹ nào ngồi đọc sao kê của quỹ ấy.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "co-lan",
                  "expression": "neutral",
                  "text": "Quy chế đúng thế. Mất phòng thì sao kê với yêu cầu giải trình đều về Hội, chủ tịch Hội ký thay chủ quỹ."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Đấy là các em suy ra. Đúng hay không thì em Khánh nói."
                },
                {
                  "speaker": "nam",
                  "expression": "neutral",
                  "text": "Em cứ tưởng anh muốn cái phòng. Anh muốn cái sổ."
                }
              ]
            },
            {
              "id": "lay-phong",
              "text": "Để lấy căn phòng ấy cho CLB Robotics.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Xưởng bọn tôi rộng gấp ba cái phòng ấy."
                }
              ]
            },
            {
              "id": "tra-dua",
              "text": "Để trả đũa CLB Thám Tử.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Tháng 9 mình đã tra gì ai đâu mà trả đũa."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "goto",
          "to": "v5-ket-du"
        }
      ]
    },
    {
      "id": "v5-ket-du",
      "title": "Không phải cái phòng, là cái sổ",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Nghe Khánh trả lời"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Đúng. Anh cần thêm thời gian để bù. Giấy về chỗ anh thì không ai hỏi sớm."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Sao lại là tên em?"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Người duyệt không được tự đứng tên đề xuất. Em là đứa không ai nghi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Còn cái tin trong kênh?"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Thư không thành thì còn đợt rà cuối kỳ. Anh cần người ta ngại các em trước lúc ấy. Kênh có người trực, ai hỏi thì hỏi em."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Hôm ấy anh còn bảo mọi người hỏi em nhẹ thôi."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Câu ấy anh nói thật. Bốn năm anh dựng cái xưởng ấy. Anh sợ nhất là ra trường mà người ta nhớ anh bằng đúng một dòng trong sổ chi. Anh tính bù xong trước ngày có người đọc sổ, rồi không ai phải biết, kể cả em."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Xưởng mình cũng có quỹ. Sao anh không lấy ở đó?"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Quỹ đội thì ban tổ chức giải soát từng khoản trước ngày đóng lệ phí. Quỹ bên ấy cả năm chi mỗi giấy với bút, anh nghĩ không ai mở ra đọc."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "…Anh nghĩ đúng. Em đã không mở."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Còn ba cái đơn, và danh sách chuyển xuống Ban kiểm tra?"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Tạm ứng quá ba mươi ngày không chứng từ là bị hỏi, nên em viết đơn. Danh sách thì em tưởng tài khoản khóa là Nam không kịp nộp kiểm kê."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "stunned",
          "text": "Em lại cầm một danh sách đi nghi người khác. Lần thứ hai."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên, không bàn ở đây. Việc riêng của em Khánh, thầy không hỏi trước mọi người."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phòng của CLB Thám Tử giữ nguyên. Hoàn quỹ đi theo thủ tục, mất vài tháng; từ giờ tới đó quỹ CLB tạm đóng."
        },
        {
          "type": "goto",
          "to": "v5-ket-luan"
        }
      ]
    },
    {
      "id": "v5-ket-luan",
      "title": "Biên bản buổi họp: nói chắc được tới đâu",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Chốt biên bản buổi họp"
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Phần của CLB Thám Tử, biên bản ghi thế này: ba khoản tạm ứng gắn với ba đơn kho không có hàng, ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Mỗi bước có phiếu kèm, ai cũng tự kiểm được."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thưa thầy, lời anh Khánh tự nhận thì em xin ghi riêng vào mục lời khai, không ghi lẫn với phiếu ạ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Đúng thế."
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-don-du"
          },
          "to": "v5-sau-hop"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em xin một bản sao biên bản để kẹp vào hồ sơ cuối kỳ ạ."
        },
        {
          "type": "set-date",
          "date": "2024-11-27"
        },
        {
          "type": "goto",
          "to": "v5-chot"
        }
      ]
    },
    {
      "id": "v5-sau-hop",
      "title": "Hành lang sau buổi họp: chiếc chìa",
      "canh": "hanh-lang-phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hành lang ngoài phòng họp. Khánh dừng trước Nam, lấy trong túi ra một chiếc chìa."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Chìa phòng văn phòng. Robotics anh xin thôi. Anh sẽ đề nghị CLB bầu em."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Em không nhận vì anh đưa. CLB bầu thì em nhận. Và sổ của xưởng từ giờ dán ngoài cửa, ai cũng xem được, kể cả anh."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Có những việc anh giúp đội thật. Cái hạn lệ phí anh xin lùi cũng là thật. Nhưng chuyện anh lấy tên em thì em vẫn phải ghi đúng vào biên bản."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Ừ. Em giữ sổ tốt hơn anh."
        },
        {
          "type": "note",
          "text": "Khánh đặt chiếc chìa lên bậu cửa sổ. Rồi anh gỡ cái huy hiệu sứt khỏi quai balo, đặt xuống cạnh chiếc chìa, và đi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-worried",
          "text": "Tớ chắc là anh ấy từ hôm thấy cái huy hiệu. Thế mà trúng rồi tớ chả thấy vui gì cả."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Lệ phí giải hạn cuối tháng này. Kinh phí năm nay toàn anh ấy chạy. Giờ anh phải tự đi xin lại từ đầu."
        },
        {
          "type": "line",
          "speaker": "thao",
          "expression": "neutral",
          "text": "Tiền giải thì chị với Bách đi xin cùng em. Chìa của chị cũng treo lên móc rồi."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "Tùng ơi, cái áo xanh ấy… CLB các cậu còn nhận người không?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "ao-xanh-happy",
          "text": "Đơn ở chỗ anh Duy. Chiều thứ Tư, phòng CLB. Lần này tớ dẫn đúng tòa."
        },
        {
          "type": "image",
          "imageId": "cg-v5-chia-va-huy-hieu"
        },
        {
          "type": "image",
          "imageId": "cg-v5-hoai-hoi-tung"
        },
        {
          "type": "set-date",
          "date": "2024-11-27"
        },
        {
          "type": "goto",
          "to": "v5-chot"
        }
      ]
    },
    {
      "id": "v5-chot",
      "title": "Phòng CLB: đóng hồ sơ mùa",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Đóng hồ sơ mùa"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều thứ Tư, phòng CLB. Hoài tới sớm, mang theo một xấp giấy nháp còn trắng một mặt."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Quỹ đóng thì vẫn họp. Giấy còn nửa tập, bút còn ba cái."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Bánh quy thì tới hộp BQ-11, còn nguyên. Hôm nay có khách nên chưa ai dám bóc."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Qua được một lúc thôi, xong phải về lo tiền giải với anh Bách, chị Thảo. Cảm biến của xưởng ghi mỗi giây một dòng, mình đang muốn tự viết chương trình đọc nó."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tớ cá là kỳ sau CLB mình đông gấp đôi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Lần cá thứ hai mươi ba. Trật hai mươi mốt."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Tuần trước cậu bảo mới có bốn!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Tuần này cậu cá với anh Duy suốt giải bóng toàn trường. Tớ chỉ ngồi đếm."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "…Tớ cá theo Tùng được không?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Thế thì lần này tớ phải thắng."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Từ một chữ H tới một sổ quỹ. Mỗi bước là một phiếu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hồ sơ cuối kỳ xong. Em là người kéo phiếu đầu tiên của vụ này, em đóng dấu đi."
        },
        {
          "type": "note",
          "text": "Bạn đóng dấu lưu trữ lên bìa hồ sơ. Duy ghim cái huy hiệu sứt lên bảng điều tra, cạnh tờ giấy nhớ ghi lời chú Cường."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nam bảo để lại đây. Và cuốn sổ này giữ nhiều mẩu giấy hơn mình tưởng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Dữ liệu chỉ ra ai cần hỏi. Người trả lời mới là người nói \"vì sao\". Mùa 1 khép lại ở chỗ chứng cứ dừng."
        },
        {
          "type": "image",
          "imageId": "chibi-v5-hoai-vao-clb"
        },
        {
          "type": "image",
          "imageId": "chibi-v5-dong-dau"
        },
        {
          "type": "image",
          "imageId": "cg-ket-vu5"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Tối hôm ấy · liên hoan cuối kỳ"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thông báo nhé. Từ tuần sau CLB tạm nghỉ sinh hoạt tới hết kỳ thi. Phòng vẫn giữ, chìa chị cầm."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nghỉ thật à? Tớ vừa quen ngồi đây."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Không ôn thì tháng sau họp ở phòng thi lại."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Ôn đi. Đề thi cũng là một bộ dữ liệu."
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "bi-mat",
            "muc": 70
          },
          "to": "v5-ngan-tu"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Căn phòng này còn nhiều chỗ mình chưa nhìn kỹ. Thôi, để sau kỳ thi."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Mùa 1 khép lại. Có những thứ vẫn nằm yên chỗ cũ, chờ người để ý."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v5-ngan-tu",
      "title": "Cảnh sau kết (khi bí mật >= 70%): ngăn tủ khóa trong phòng CLB",
      "canh": "phong-clb-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "set-date",
          "date": "2025-01-15"
        },
        {
          "type": "task",
          "text": "Tìm chìa ngăn tủ khóa"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Giữa tháng 01/2025, thi xong · Phòng CLB"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Buổi đầu tiên sau kỳ thi. Duy bày mấy mẩu giấy rơi ra từ cuốn sổ CLB lên bàn."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Giấy thì đủ cả rồi. Mà trong ngăn dưới tủ hồ sơ còn một hộc nhỏ có khóa. Chùm chìa của anh không chìa nào vừa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thì cạy ra!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoan đã. Đọc lại bốn mẩu giấy xem nào."
        },
        {
          "type": "question",
          "id": "q-v5-chia",
          "asker": {
            "speaker": "duy",
            "text": "Bốn mẩu giấy, một ngăn tủ khóa. Người viết để chìa ở đâu trong phòng này?"
          },
          "choices": [
            {
              "id": "bang",
              "text": "Sau tấm bảng nguyên tắc.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "player",
                  "text": "Mẩu cuối bảo \"mặt trước thì các em đọc mỗi buổi họp rồi\". Thứ cả nhóm đọc mỗi buổi họp là bảng nguyên tắc. Mình chưa bao giờ nhìn mặt sau."
                }
              ]
            },
            {
              "id": "gay-so",
              "text": "Trong gáy cuốn sổ CLB.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Cuốn ấy cả nhóm lật suốt mùa rồi. Có gì thì đã rơi ra hết."
                }
              ]
            },
            {
              "id": "cay-tu",
              "text": "Không có chìa đâu, cạy tủ thôi.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Người ta để giấy cho mình tìm, không phải để mình phá."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-nhan-linh-5"
            },
            {
              "kind": "hien-tai-lieu",
              "id": "doc-ho-so-vu-dau"
            }
          ]
        },
        {
          "type": "note",
          "text": "Bạn nhấc tấm bảng nguyên tắc. Một chiếc chìa nhỏ dán băng dính ở mặt sau, khẽ chạm vào tường."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trong ngăn tủ: một cuốn sổ bìa cứng, chữ viết tay đã ngả màu. Trang đầu ghi \"CLB Thám Tử Dữ Liệu: hồ sơ vụ thứ nhất\", ký tên Trịnh Quang."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thầy Quang? Thầy Quang lập CLB này á?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Trang kết luận có một cái tên, bị gạch đi. Cả cuốn không ghim một phiếu nào."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bên lề có hai chữ, mực xanh đã ngả màu: \"Xem lại.\""
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nét chữ này giống hệt bốn mẩu giấy. Giống cả chữ ký ở trang đầu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thế bốn mẩu giấy là thầy viết? Thầy tự gạch kết luận của chính mình à?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thầy hỏi \"căn cứ vào đâu\" từ bao giờ nhỉ?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Trang cuối có thêm một dòng, vẫn chữ thầy: \"Manh mối cũ, câu hỏi mới.\""
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Còn tiếp · Vụ 6: \"Xem lại\""
        },
        {
          "type": "image",
          "imageId": "cg-v5-ho-so-vu-dau"
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v5-phong-duy",
      "title": "Vụ 5: Duy mở laptop (việc chính)",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "serious",
          "text": "Sổ này không phải của CLB mình. Thầy Quang cho xem tới đâu, anh mở tới đó."
        }
      ]
    },
    {
      "id": "v5-phong-vy",
      "title": "Vụ 5: Hà Vy và câu hỏi trên bảng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Câu hỏi trên bảng: khoản chi nào ghi vào quỹ của mình?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tiền thì không nói dối, nhưng sổ ghi tiền là do người viết. Xem ai ký từng dòng."
        }
      ]
    },
    {
      "id": "v5-phong-minh-anh",
      "title": "Vụ 5: Minh Anh nhớ lại ba khoản chị duyệt",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Từ đầu kỳ chị duyệt đúng ba khoản: giấy in, mực, bìa hồ sơ. Khoản nào cũng dưới hai trăm nghìn."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Nếu sổ ghi nhiều hơn thế thì có khoản chị chưa từng nhìn thấy."
        }
      ]
    },
    {
      "id": "v5-bd-tra-da",
      "title": "Bản đồ Vụ 5 (tùy chọn): quán trà đá, \"cậu trà nóng\" giờ ở đâu",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "explore",
          "id": "kp-toi-v5-bd-tra-da",
          "diem": [
            {
              "sprite": "nv:ba-lua",
              "x": 46,
              "y": 100,
              "rong": 15,
              "chuoi": "v5-bd-tra-da-vao",
              "sau": [],
              "nhan": "Bà bán trà đá",
              "dau": "chinh"
            },
            {
              "sprite": "vung:xe-dap",
              "x": 62.5,
              "y": 53,
              "rong": 16,
              "chuoi": "v5-bd-tra-da-an",
              "sau": [],
              "nhan": "Chiếc xe đạp cũ"
            }
          ]
        }
      ]
    },
    {
      "id": "v5-bd-tra-da-vao",
      "title": "Tới nơi: Bản đồ Vụ 5 (tùy chọn): quán trà đá, \"cậu trà nóng\" giờ ở đâu",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Quán trà đá, đầu giờ chiều. Bà chủ quán đang tráng cốc."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Hôm nay mặt đứa nào cũng căng thế. Uống đi rồi hẵng tính."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bà ơi, ngày xưa có một anh sinh viên trông cái phòng tủ sắt của bọn cháu, hay ra đây gọi trà nóng. Sau này bà có gặp lại anh ấy không ạ?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Cậu trà nóng ấy hả? Gặp suốt. Giờ đi làm ngay trong trường, sơ mi cài kín cổ, tóc muối tiêu rồi. Sáng nào đi ngang cũng gật đầu chào bà, thỉnh thoảng vẫn ngồi xuống gọi cốc trà nóng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Người ấy vẫn ở trong trường ạ? Là ai hả bà?"
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "neutral",
          "text": "Bà nhớ cốc, không nhớ tên. Mà cậu ấy có một câu cửa miệng, sinh viên ra đây toàn nhại lại: \"Căn cứ vào đâu?\""
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mình vừa nghe đúng câu ấy xong."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là…"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đừng cá. Một lời kể với một câu cửa miệng thì chưa đủ để ghim tên ai lên bảng."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tớ ghi lại. Lời kể, chưa đối chiếu với gì cả."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tra-da-4"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Bà ơi, hôm nào xong việc, bà để dành cho cháu thêm một cái ghế nhé."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Cho con bé hay ôm cặp chứ gì. Mời được nó ra đây ngồi thì bà khao. Có câu mở đầu chưa?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Cháu có rồi ạ. Hai chữ."
        }
      ]
    },
    {
      "id": "v5-bd-tra-da-an",
      "title": "Chi tiết ẩn: Chiếc xe đạp cũ",
      "canh": "tra-da",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Giỏ xe đạp có một cuốn sổ mới tinh. Cuốn bìa xanh quăn mép không thấy đâu nữa."
        },
        {
          "type": "line",
          "speaker": "ba-lua",
          "expression": "smile",
          "text": "Sổ cũ hết trang rồi. Nợ ai chưa trả thì bà chép sang cả, đừng mừng."
        }
      ]
    },
    {
      "id": "v2-mo",
      "title": "Mở Vụ 2: hồ sơ cuối kỳ",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "vu1-ket-that"
          },
          "to": "v2-mo-that"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 01/11/2024 · Việc ở CLB"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hơn một tháng sau buổi họp rà soát. Phòng CLB vẫn sáng đèn mỗi chiều thứ Tư."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trên bảng ghim có thêm một tờ giấy kẻ ô, tiêu đề \"Sổ nợ của Tùng\", đã sang dòng thứ mười hai. Dòng mới nhất: \"Hai cốc trà đá. Chủ nợ: Hà Vy.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Dòng ấy không tính. Hôm đó cậu ấy tự mời."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Ghi rồi thì là nợ, cậu cãi cũng không được."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thầy Quang dặn rồi: muốn giữ phòng thì tháng nào cũng nộp báo cáo hoạt động. Tháng 10 là kỳ đầu tiên."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Mà chị không muốn chỉ nộp cho xong. Cuối kỳ trường rà soát lại, chị muốn mình có một bộ hồ sơ ai mở ra cũng tự kiểm được."
        },
        {
          "type": "goto",
          "to": "v2-giao-viec"
        }
      ]
    },
    {
      "id": "v2-mo-that",
      "title": "Mở Vụ 2 sau kết thật: không ai bắt nộp, vẫn làm",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 01/11/2024 · Việc ở CLB"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hơn một tháng sau buổi họp rà soát. Phòng CLB vẫn sáng đèn mỗi chiều thứ Tư."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chuyện lá thư thì thầy Quang vẫn đang cho hỏi lại. Chưa có gì mới."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Thầy không bắt CLB nộp báo cáo tháng. Nhưng cuối kỳ trường vẫn rà soát phòng, và chị muốn lúc ấy mình có một bộ hồ sơ ai mở ra cũng tự kiểm được."
        },
        {
          "type": "goto",
          "to": "v2-giao-viec"
        }
      ]
    },
    {
      "id": "v2-giao-viec",
      "title": "Minh Anh giao việc, Duy đưa bản xuất sổ phòng",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mục đầu tiên là sử dụng phòng. Chị cần ghi tháng 10 có bao nhiêu mục trong sổ, và mục nào có chữ ký xác nhận."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Không cần con số đẹp. Cần con số truy ngược được."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Sổ sử dụng phòng em giữ. Bản giấy đây, còn đây là bản xuất từ máy quản lý phòng của tòa nhà."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mã phòng trong bản xuất là do từng người trực gõ tay. Em chưa lọc, chưa bỏ dòng nào."
        },
        {
          "type": "show-document",
          "documentId": "doc-v2-raw-logs"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ma-phong-clb"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-da-xac-nhan"
            },
            {
              "kind": "dat-co",
              "co": "v2-log-mo"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bảy dòng. Hai dòng là của kho chung. Còn lại là phòng mình, nhưng mỗi dòng viết mã phòng một kiểu."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ừ. Có dòng viết hoa, có dòng viết thường, có dòng dính thêm dấu cách ở đuôi. Trong sổ giấy thì vẫn là một phòng thôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ, tháng 10 mình sinh hoạt đều mà. Sao đếm theo mã phòng lại thấy thiếu buổi?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoan đã. Viết khác kiểu chưa có nghĩa là có người sửa."
        },
        {
          "type": "branch",
          "id": "r-v2-huong",
          "asker": {
            "speaker": "tung",
            "text": "Tớ cá là có người sửa bản xuất để buổi sinh hoạt của mình biến mất. Đi hỏi xem ai đụng vào máy chứ?"
          },
          "choices": [
            {
              "id": "kiem-ma",
              "text": "Xem cột mã phòng trước đã.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "v2-tra"
                }
              ]
            },
            {
              "id": "tin-tung",
              "text": "Ừ, nghe cũng có lý. Ai là người xuất bản này?",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "v2-tin-tung"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "v2-tin-tung",
      "title": "Theo phỏng đoán của Tùng: Duy tự xuất, chưa đụng dòng nào",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Anh xuất. Sáng nay, từ máy quản lý phòng, trước mặt bác trực tòa nhà. Anh chưa đụng vào dòng nào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Ờ… thế thì không ai sửa cả."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đoán người thì phải hỏi từng người. Xem cột mã phòng thì chỉ cần mở máy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Rồi, tớ cá trượt. Mở máy đi."
        },
        {
          "type": "goto",
          "to": "v2-tra"
        }
      ]
    },
    {
      "id": "v2-tra",
      "title": "Laptop CLB: lọc các buổi đã ký của phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Tháng 10, phòng CLB có những buổi nào đã ký xác nhận?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cùng một phòng mà mỗi dòng viết mã một kiểu. Máy so từng chữ một."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Với mình thì \"CLB-THAM-TU\" hay \"clb-tham-tu\" là một phòng. Với máy thì đấy là hai cách viết khác nhau. Thêm một dấu cách ở đuôi cũng thành khác."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Lọc xong thì xếp theo ngày giúp anh. Sổ giấy ghi lần lượt từ đầu tháng, anh dò từng dòng cho nhanh."
        },
        {
          "type": "challenge",
          "challengeId": "v2-loc-buoi"
        },
        {
          "type": "notebook-note",
          "trang": "chuan-hoa"
        },
        {
          "type": "notebook-note",
          "trang": "sap-xep"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bốn buổi: mùng 2, mùng 9, 16 và 23 tháng 10. Buổi 30 vẫn ghi dự kiến, chưa ai ký nên không vào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thế là không buổi nào biến mất cả. Chỉ là mỗi người gõ một kiểu."
        },
        {
          "type": "image",
          "imageId": "chibi-phu-got-ma-phong"
        },
        {
          "type": "goto",
          "to": "v2-xac-nhan"
        }
      ]
    },
    {
      "id": "v2-xac-nhan",
      "title": "Duy dò sổ giấy; Quân hỏi hồ sơ ghi câu nào",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Bản xuất có khớp sổ giấy không?"
        },
        {
          "type": "note",
          "text": "Duy mở sổ giấy, dò từng dòng với phiếu kết quả."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mùng 2, họp thành viên: có chữ ký. Mùng 9, ôn SQL: có. 16, kiểm kê hồ sơ: có. 23, hướng dẫn tân thành viên: có."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Bốn mã buổi này đủ chữ ký trong sổ. Dòng 30/10 trong sổ còn để trống ô ký, chưa ai xác nhận buổi ấy."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-v2-so-giay"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bản xuất một nguồn, sổ giấy một nguồn. Hai nguồn riêng cùng ra bốn buổi."
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "quan"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Hội sinh viên cử tôi đi xem các CLB chuẩn bị hồ sơ cuối kỳ. Các bạn cứ làm tiếp, tôi chỉ hỏi một câu."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "chi-man",
          "text": "Bản ghi khớp bốn mục trong sổ có chữ ký, tôi thấy rồi. Nhưng nó chưa cho biết ai tới dự, cũng chưa cho biết buổi nào có ích."
        },
        {
          "type": "reminder",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Bốn dòng, năm cột: mã buổi, mã phòng, ngày, hoạt động, trạng thái."
        },
        {
          "type": "question",
          "id": "q-v2-ket-luan",
          "asker": {
            "speaker": "quan",
            "text": "Vậy mục hoạt động trong hồ sơ, các bạn định ghi câu nào?"
          },
          "choices": [
            {
              "id": "bon-muc",
              "text": "Tháng 10 có bốn mục sử dụng phòng CLB trong sổ, cả bốn có chữ ký xác nhận.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Câu ấy thì bản ghi và sổ giấy cùng đỡ được. Tôi không có ý kiến."
                }
              ]
            },
            {
              "id": "moi-nguoi",
              "text": "Cả bốn buổi, mọi thành viên CLB đều có mặt.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Khoan. Bảng có những cột nào? Có cột nào ghi ai tới dự không?"
                }
              ]
            },
            {
              "id": "hieu-qua",
              "text": "Bốn buổi cho thấy CLB chắc chắn hoạt động hiệu quả.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "day-kinh",
                  "text": "Bốn dòng nói được là có bốn buổi đã ký. Hiệu quả hay không thì cột nào đo?"
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "dat-co",
              "co": "v2-ket-luan-dung"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Vậy mục này chị ghi: tháng 10 có bốn mục sử dụng phòng trong sổ, cả bốn có chữ ký xác nhận. Kèm phiếu tra và số trang sổ giấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Ai tham dự, buổi nào có ích thì bản ghi này không nói. Hồ sơ cũng không nói thay nó."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Ghi thế thì bên tôi kiểm lại được. Hẹn các bạn ở mục tài sản."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Lần này tớ cá trượt hẳn hai lần."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Đừng cá nữa. Dò từng dòng đi."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Xong mục phòng. Giữa tháng tới lượt kiểm kê thiết bị cho buổi hướng dẫn cuối kỳ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Dữ liệu nhập tay ít khi sạch. Gọt cho các dòng về cùng một kiểu rồi mới so. Kết quả nói được đến đâu thì ghi đến đó."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "p-mic-mo",
      "title": "Duy kiểm kê thiết bị, thiếu chiếc micro không dây",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "image",
          "imageId": "obj-hop-banh-quy"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 15/11/2024 · Việc ở CLB"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều thứ Sáu. Duy bày thiết bị ra bàn để kiểm kê cho buổi hướng dẫn cuối kỳ, đếm đi đếm lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cuối bàn là một hộp bánh quy đã vơi nửa, nhãn ghi \"BQ-09\"."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "BQ-09 rồi á?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Luật là ai ăn cái cuối thì mua hộp mới. Anh kiểm kê sau cùng nên lần nào cũng là anh."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Micro không dây không ở ngăn dưới. Sổ tài sản vẫn ghi nó thuộc CLB mình, để ở tủ CLB."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là ai đó cầm đi rồi quên trả."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mình chưa có căn cứ để gọi là quên hay lấy. Tòa nhà có phiếu luân chuyển thiết bị, tìm trên phiếu trước."
        },
        {
          "type": "show-document",
          "documentId": "doc-mic-so-tai-san"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-mic-ten"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-mic-da-nhan"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Phiếu luân chuyển đây. Nhưng phiếu chỉ ghi mã tài sản với nơi chuyển tới, không ghi tên. Tên thì nằm ở sổ tài sản."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy phải ghép phiếu với sổ. Hai bảng có hai cột trùng tên, xem cột nào mới là của chính từng thiết bị."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mà phiếu có cái đã nhận, có cái mới đề xuất. Anh cần phiếu đã có người nhận."
        },
        {
          "type": "task",
          "text": "Phiếu nào đã có người nhận ghi chuyển chiếc micro không dây, và chuyển tới đâu?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu chỉ ghi mã, tên nằm ở sổ tài sản. Cần đúng chiếc micro không dây và phiếu đã có người nhận."
        },
        {
          "type": "challenge",
          "challengeId": "c-mic-phieu"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Một phiếu. PX-17, ngày 24 tháng 10, chuyển micro không dây sang tủ thiết bị dùng chung. Tổ thiết bị đã nhận."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tủ dùng chung ở cuối hành lang. Đi xem."
        },
        {
          "type": "note",
          "text": "Duy và Minh Anh mở tủ thiết bị dùng chung. Ngăn giữa có một chiếc micro không dây, đế sạc còn cắm điện, trên thân dán nhãn MIC-02."
        },
        {
          "type": "image",
          "imageId": "chibi-phu-tu-micro"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-mic-ma-dan"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mã trên micro là MIC-02, đúng mã trên phiếu. Tài sản không mất, chỗ để đã đổi. Về sửa lại sổ thôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ đoán sai rồi. May mà có mã, khỏi phải đoán người."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Phiếu còn lại của nó là chị đề xuất mượn sang phòng âm thanh cho buổi hướng dẫn. Chưa ai nhận nên micro vẫn nằm đây."
        },
        {
          "type": "stage",
          "action": "vao",
          "nhanVat": "quan"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi qua xem mục tài sản như đã hẹn. Tìm thấy rồi thì tốt. Tôi hỏi một câu thôi."
        },
        {
          "type": "question",
          "id": "q-mic-ket-luan",
          "asker": {
            "speaker": "quan",
            "text": "Sổ có hai chiếc đều tên là micro. Sao các bạn biết phiếu PX-17 nói về đúng chiếc này?"
          },
          "choices": [
            {
              "id": "ma",
              "text": "Phiếu ghi mã tài sản, bọn mình nối theo mã ấy; mã dán trên micro trong tủ cũng là MIC-02.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Mã trên phiếu, mã trong sổ, mã trên vật. Ba chỗ khớp nhau thì tôi không hỏi nữa."
                }
              ]
            },
            {
              "id": "ten",
              "text": "Vì tên giống nhau: phiếu nào có micro thì là của chiếc này.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Phiếu không ghi tên, chỉ ghi mã. Mà MIC-01 cũng là micro, cũng có phiếu sang tủ chung."
                }
              ]
            },
            {
              "id": "duy-biet",
              "text": "Vì Duy giữ thiết bị, Duy nói thế thì đúng.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Tớ là người vừa không tìm thấy nó đấy. Đừng lấy tớ làm căn cứ."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mục tài sản chị ghi: micro không dây đang ở tủ thiết bị dùng chung theo phiếu PX-17, đã đối chiếu mã trên vật. Kèm phiếu tra."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Ghi thế thì ai mở tủ ra cũng tự kiểm được."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Từ giờ tớ hỏi mã trước, cá sau."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Hỏi mã xong thì khỏi cá."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Tên có thể trùng, mã thì không. Nối hai bảng theo mã, rồi đi nhìn tận mắt cái mã trên vật."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "p-hoan-mo",
      "title": "Tổng hoàn tiền trong bảng cao hơn biên nhận",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 29/11/2024 · Việc ở CLB"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng CLB, sau buổi hướng dẫn SQL cho tân thành viên. Minh Anh ngồi với bản xuất thu chi và một xấp biên nhận."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Bảng cộng tiền hoàn ra một trăm năm mươi lăm nghìn. Biên nhận chị cầm cộng lại chỉ có chín mươi lăm. Lệch sáu mươi."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mình cần biết phiếu nào phải mở ra xem lại. Chưa phải tìm người chịu lỗi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá là có ai cộng nhầm."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Lần thứ ba mươi tám. Tớ ghi rồi, cậu cứ nói tiếp."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi ngồi nghe được chứ? Mục thu chi là mục cuối tôi phải xem."
        },
        {
          "type": "show-document",
          "documentId": "doc-hoan-ban-xuat"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-hoan-loai"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-hoan-mot-dong"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Lệch thì chắc có khoản hoàn hai lần?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chưa biết. Bảng lẫn cả dòng chi lẫn dòng hoàn. Lấy riêng dòng hoàn ra đã, ghim lại."
        },
        {
          "type": "task",
          "text": "Bản xuất có những dòng hoàn tiền nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Loại giao dịch ghi ở cột loai. Chỉ lấy dòng hoàn."
        },
        {
          "type": "challenge",
          "challengeId": "c-hoan-loc"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bốn dòng hoàn tiền."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Theo cách ghi sổ thì mỗi lần hoàn một dòng. Phiếu có hơn một dòng hoàn chưa chắc sai, có khi hoàn hai lần thật. Nhưng đấy là chỗ cần mở chứng từ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bốn dòng, ba phiếu. Hôm trước mình giữ nhóm theo tổng tiền. Lần này cái cần giữ là nhóm có nhiều dòng."
        },
        {
          "type": "task",
          "text": "Phiếu nào có hơn một dòng hoàn tiền, sổ ghi hoàn tổng cộng bao nhiêu?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu bốn dòng hoàn làm nguồn. Mỗi phiếu mấy dòng, cộng bao nhiêu tiền; chỉ giữ phiếu có hơn một dòng."
        },
        {
          "type": "challenge",
          "challengeId": "c-hoan-nhom"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Một phiếu. PH-04: hai dòng, cột tiền cộng ra âm một trăm hai mươi nghìn. Khoản hoàn ghi số âm, tức sổ đang ghi hoàn một trăm hai mươi nghìn cho phiếu này."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Hai dòng cùng một phiếu là tín hiệu cần kiểm, chưa phải kết luận. Mở chứng từ gốc."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Biên nhận ngân hàng của PH-04 đây."
        },
        {
          "type": "show-document",
          "documentId": "doc-hoan-bien-nhan"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Biên nhận ghi một giao dịch hoàn sáu mươi nghìn, mã tham chiếu NH-771. Trong bản xuất, cả hai dòng của PH-04 đều mang mã NH-771."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hoàn một lần sáu mươi nghìn mà sổ ghi hai dòng, thành một trăm hai mươi. Dư đúng sáu mươi nghìn đang lệch."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Đếm dòng là đếm bản ghi, không phải đếm lần chuyển tiền."
        },
        {
          "type": "image",
          "imageId": "chibi-phu-mot-bien-nhan"
        },
        {
          "type": "question",
          "id": "q-hoan-ket-luan",
          "asker": {
            "speaker": "quan",
            "text": "Vậy mục thu chi, các bạn ghi câu nào về phiếu PH-04?"
          },
          "choices": [
            {
              "id": "sua-bao-cao",
              "text": "Bản xuất có hai dòng hoàn cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Sửa báo cáo, giữ bản cũ.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Có phiếu, có biên nhận, có bản cũ. Câu ấy tôi kiểm lại được."
                }
              ]
            },
            {
              "id": "bien-thu",
              "text": "Có người cố tình nhập hai lần để rút sáu mươi nghìn.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Bảng có cột nào ghi ai nhập không? Tôi đánh dấu phiếu này để kiểm, không phải để kết tội."
                }
              ]
            },
            {
              "id": "hai-giao-dich",
              "text": "Hai dòng thì chắc chắn là hoàn hai lần.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Hai dòng cùng một mã tham chiếu ngân hàng. Biên nhận ghi mấy lần hoàn?"
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị sửa báo cáo: PH-04 hoàn một lần, sáu mươi nghìn. Bản cũ chị giữ nguyên, ghi thêm ngày sửa và lý do."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Chưa có căn cứ nói ai cố ý. Hồ sơ của các bạn tôi xem xong rồi. Mục nào cũng tự kiểm được."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Lần này tớ đoán đúng một nửa."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Nửa còn lại là biên nhận nói."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Gom nhóm chỉ ra chỗ cần mở chứng từ. Chứng từ mới nói chuyện gì đã xảy ra."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "p-lac-mo",
      "title": "Thư viện tối thứ Sáu: Tùng không học nổi",
      "canh": "thu-vien-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Sáu, 25/10/2024 · Việc của Tùng"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Gần mười một giờ đêm. Thư viện tầng ba giảng đường B còn lác đác vài bàn sáng đèn. Hà Vy đã về từ chín giờ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng ngồi đối diện bạn, giở tập bản đồ trường ra rồi lại gập vào. Trang vở trước mặt cậu ấy vẫn trắng."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu nhìn mỗi trang ấy nửa tiếng rồi đấy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ có đọc đâu. Hôm thứ Ba Hoài bảo tuần đầu tớ dẫn bạn ấy lạc sang tận nhà xe. Tớ còn cãi là \"chỉ sai tòa\". Về nghĩ lại thấy cãi thế kỳ quá."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tớ nói bừa về bạn ấy một lần rồi. Giờ muốn xin lỗi thì ít ra phải biết mình sai chỗ nào đã."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu không nhớ hôm ấy à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Tuần đầu tớ dẫn bao nhiêu lượt, nhớ sao nổi. Nhưng đội tình nguyện có sổ đón, lượt nào cũng ghi. Bản xuất nằm trong laptop tớ, ở phòng."
        },
        {
          "type": "note",
          "text": "Chuông báo thư viện đóng cửa. Đèn các dãy bàn tắt dần từ cuối phòng lên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Mười một giờ rồi á? Cổng ký túc đóng mười một giờ mười lăm!"
        },
        {
          "type": "task",
          "text": "Về kịp ký túc xá trước giờ đóng cổng"
        },
        {
          "type": "goto",
          "to": "p-lac-sanh"
        }
      ]
    },
    {
      "id": "p-lac-sanh",
      "title": "Sảnh giảng đường B đã tắt đèn: bác Thịnh soi đèn pin",
      "canh": "sanh-toa-b-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hai đứa lao xuống cầu thang. Sảnh tầng một vắng tanh, chỉ còn đèn hành lang."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Chết, tập bản đồ! Tớ để trên bàn!"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Mai lấy."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Trong ấy có cả sơ đồ tớ vẽ tay. Mười giây thôi!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng quay ngược lên cầu thang. Tiếng chân rầm rập ba tầng lầu, đi lên rồi đi xuống."
        },
        {
          "type": "goto",
          "to": "p-lac-den"
        }
      ]
    },
    {
      "id": "p-lac-den",
      "title": "Hoạt cảnh: vệt đèn pin bắt gặp Tùng trên cầu thang (nền là ảnh tách lớp, không hiện nhân vật đứng)",
      "canh": "sanh-den-pin",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đèn sảnh vụt tắt. Một vệt đèn pin quét ngang, dừng lại đúng chỗ Tùng đang nhảy hai bậc một."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Ai còn ở trên đấy? Thư viện đóng rồi, bác khóa sảnh bây giờ!"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Đứng lại bác xem thẻ! Mép bậc thang trơn đấy, đừng có chạy!"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Cháu chào bác ạ! Mai cháu lên trình thẻ!"
        },
        {
          "type": "image",
          "imageId": "chibi-chay"
        },
        {
          "type": "goto",
          "to": "p-lac-chay"
        }
      ]
    },
    {
      "id": "p-lac-chay",
      "title": "Ra tới sân: tám phút nữa đóng cổng (nền là ảnh cảnh chạy, không hiện nhân vật đứng)",
      "canh": "san-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hai đứa lách qua cánh cửa sảnh còn hé, lao ra sân. Tùng giơ tập bản đồ lên như giơ cúp, chân vẫn không dừng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cuối đường, chốt bảo vệ ký túc xá đã bật đèn pin. Chú Cường sắp kéo cổng."
        },
        {
          "type": "branch",
          "id": "r-chay",
          "asker": {
            "speaker": "narrator",
            "text": "Mười một giờ bảy phút. Cổng ký túc đóng mười một giờ mười lăm. Chạy đường nào?"
          },
          "choices": [
            {
              "id": "tat",
              "text": "Cắt qua sân bóng: tối nhưng gần.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "p-lac-tat"
                }
              ]
            },
            {
              "id": "chinh",
              "text": "Chạy đường chính: có đèn nhưng vòng.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "p-lac-chinh"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "p-lac-tat",
      "title": "Cổng KTX: kịp giờ, giày đầy bùn",
      "canh": "cong-ktx-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sân bóng tối om, cỏ ướt sương. Tùng chạy trước, tay cầm tập bản đồ mà không cần mở."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bên trái có vũng nước, tránh ra! Qua cột gôn là rẽ phải!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mười một giờ mười hai. Cổng ký túc còn mở một cánh. Chú Cường đứng cạnh chốt, soi đèn pin xuống hai đôi giày bê bết bùn."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Kịp giờ. Nhưng bùn thế kia thì đứng ngoài này chùi giày đã, rồi hẵng lên phòng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Chú ơi, cháu là cháu chú mà."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Cháu chú thì chùi cả phần bậc thềm."
        },
        {
          "type": "goto",
          "to": "p-lac-phong"
        }
      ]
    },
    {
      "id": "p-lac-chinh",
      "title": "Cổng KTX: muộn một phút",
      "canh": "cong-ktx-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đường chính sáng đèn nhưng vòng qua cả dãy nhà hành chính. Tùng vừa chạy vừa đếm giờ thành tiếng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mười một giờ mười sáu. Chú Cường đang kéo cánh cổng thứ hai, dừng tay khi thấy hai cái bóng lao tới."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Muộn một phút. Vào đi, rồi ghi tên vào sổ về muộn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Chú ơi, cháu là cháu chú mà."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Cháu chú thì ghi hai lần. Một lần cho chú, một lần cho mẹ cháu."
        },
        {
          "type": "goto",
          "to": "p-lac-phong"
        }
      ]
    },
    {
      "id": "p-lac-phong",
      "title": "Phòng 408: sổ đón của đội tình nguyện",
      "canh": "phong-ktx-dem",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng 408. Tùng bật laptop, ngồi khoanh chân trên giường, tóc còn bết mồ hôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Đây. Sổ đón tân sinh viên của đội tình nguyện. Mỗi lượt đón một dòng: ai đón, đón ai, đưa tới đâu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Mà nó dài lắm, của cả đội, mấy năm liền. Tớ thì chỉ biết kéo chuột từ trên xuống."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Để tớ. Cho tớ mã sinh viên của cậu."
        },
        {
          "type": "image",
          "imageId": "chibi-408-nam-bep"
        },
        {
          "type": "show-document",
          "documentId": "doc-so-don"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-ma-tung"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "SV240251. Trong sổ, tình nguyện viên ghi bằng mã, tân sinh viên cũng ghi bằng mã."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Điện thoại rung. Tin nhắn của Hà Vy trong nhóm: \"Hai ông tướng về tới phòng chưa? Tra gì thì gửi phiếu lên đây, tớ với anh Duy xem.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Sao Vy biết bọn mình định tra?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu kể với cả nhóm từ chiều rồi."
        },
        {
          "type": "task",
          "text": "Tìm các lượt đón do Tùng dẫn"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Sổ ghi tình nguyện viên bằng mã. Mã của tớ là SV240251."
        },
        {
          "type": "challenge",
          "challengeId": "c-don-tung"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chín lượt, trong hai ngày 7 và 8 tháng 9."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Chín lượt. Thế trong chín lượt ấy tớ đưa người ta tới những đâu?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Gom theo điểm đến rồi đếm là thấy."
        },
        {
          "type": "task",
          "text": "Gom chín lượt của Tùng theo điểm đến"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Chín lượt của tớ nằm trên phiếu rồi. Gom theo điểm đến, đếm mỗi nơi mấy lượt."
        },
        {
          "type": "challenge",
          "challengeId": "c-don-noi-den"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ký túc xá tám lượt. Nhà xe một lượt."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Một! Đúng một lượt nhà xe. Tớ có nhớ là mình đưa ai ra nhà xe đâu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Lọc tiếp trên chín lượt, lấy đúng lượt ấy, xem mã tân sinh viên."
        },
        {
          "type": "task",
          "text": "Lượt nào Tùng đưa tới nhà xe, và đón ai?"
        },
        {
          "type": "reminder",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Trong chín lượt của tớ, lượt nào ghi điểm đến là nhà xe? Tớ cần mã của người tớ đón."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-nha-xe"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-don-lac"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Lượt LD-0247, Chủ nhật 8 tháng 9. Mã tân sinh viên SV240317."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Mã này tớ thấy ở đâu rồi."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Trên phiếu hai mã hồi tháng Chín. Lê Thu Hoài, lớp BC24A."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Sáng Chủ nhật… Tớ nhớ rồi. Bạn ấy kéo cái vali to hơn người, hỏi đường nhỏ lắm. Tớ nghe ra \"nhà xe\", tưởng bạn ấy đi gửi xe, thế là dẫn thẳng ra đó. Tớ không hỏi lại."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tớ là cộng tác viên mượn áo, có ai tập huấn cho đâu. Tám lượt kia dẫn đúng nên tớ cứ yên trí."
        },
        {
          "type": "question",
          "id": "q-lac-ket-luan",
          "asker": {
            "speaker": "tung",
            "text": "Thế trong lời xin lỗi, tớ được viết gì cho chắc?"
          },
          "choices": [
            {
              "id": "mot-luot",
              "text": "Chín lượt cậu dẫn có đúng một lượt tới nhà xe, là lượt của Hoài. Sổ ghi nơi tới; vì sao tới đó là cậu tự nhớ ra.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "tung",
                  "expression": "thinking",
                  "text": "Sổ nói tớ sai ở lượt nào, tớ nói tớ sai vì sao. Hai phần ấy tớ viết riêng ra."
                }
              ]
            },
            {
              "id": "kem",
              "text": "Cậu dẫn đường kém, sổ ghi rõ rồi.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "tung",
                  "expression": "gai-dau",
                  "text": "Tám trên chín lượt tới đúng ký túc mà. Sai một lượt thì viết một lượt thôi."
                }
              ]
            },
            {
              "id": "noi-nho",
              "text": "Tại Hoài nói nhỏ quá, sổ cũng cho thấy thế.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "tung",
                  "expression": "worried",
                  "text": "Sổ có ghi ai nói to nói nhỏ đâu. Với lại người dẫn đường là tớ, hỏi lại là việc của tớ."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng xé một trang vở, kê lên tập bản đồ, vẽ. Cổng chính, hàng cây, ký túc xá, một mũi tên to. Góc dưới ghi: \"Lần này không qua nhà xe. Tớ xin lỗi vì hôm ấy không hỏi lại. Tùng, áo xanh.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Có sến quá không?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thiếu một thứ. Vẽ thêm đường ra quán trà đá."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trưa hôm sau, ở thư viện. Hoài mở tờ giấy, nhìn rất lâu, rồi gập lại kẹp vào vở."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "relieved",
          "text": "Tớ cảm ơn cậu. Hôm ấy tớ nói bé quá, mà tớ cũng không dám hỏi lại."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "Nhưng cậu vẽ thiếu cổng phụ. Đi cổng phụ gần hơn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Cậu thuộc đường hơn cả tớ rồi à?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "neutral",
          "text": "Lạc một lần thì nhớ lâu."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Cổng phụ chứ gì. Tớ đi một lần là thuộc."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều hôm ấy, nhóm chat CLB có tin nhắn mới của Tùng: \"Cho tớ hỏi, từ cổng phụ về ký túc thì rẽ bên nào? Tớ đang đứng ở nhà xe.\""
        },
        {
          "type": "image",
          "imageId": "chibi-lac-nha-xe"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Đếm cho biết mình sai mấy lần. Lọc cho biết sai ở lượt nào. Còn vì sao sai thì phải tự nhớ, và tự nói ra."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "p-hoc-mo",
      "title": "Sáng 20/11: bó hoa gói giấy báo",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Tư, 20/11/2024 · Việc của cô Hạnh"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tám giờ kém mười. Phòng CLB còn vương mùi giấy báo ướt. Tùng ôm bó cúc họa mi, Minh Anh đang nhét tấm thiệp vào giữa những cành hoa."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hai mươi tháng Mười Một mà. Tớ cá là cô nào nhận hoa cũng cười."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bó này sang Phòng Đào tạo trước. Cô Hạnh nghỉ hưu cuối năm. Hôm nay là hai mươi tháng Mười Một cuối cùng cô còn đi làm."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Cô vào trường từ hồi nào?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Gần ba mươi năm. Mấy năm đầu cô đứng lớp, sau mới về Phòng Đào tạo."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Thế thì hoa phải đưa tận tay cô mới được."
        },
        {
          "type": "goto",
          "to": "p-hoc-dao-tao"
        }
      ]
    },
    {
      "id": "p-hoc-dao-tao",
      "title": "Phòng Đào tạo đầu giờ sáng",
      "canh": "phong-dao-tao",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng Đào tạo đầu giờ còn vắng. Nắng chưa lên tới quầy, ấm trà trên bàn nhỏ vẫn bốc hơi."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô Hạnh mặc áo dài, tóc muối tiêu búi gọn sau gáy, đang cúi xuống gấp một tờ giấy khổ lớn. Cô chưa ngẩng lên."
        },
        {
          "type": "explore",
          "id": "kp-hoc-dao-tao",
          "diem": [
            {
              "sprite": "nv:co-hanh",
              "x": 40,
              "y": 100,
              "rong": 15,
              "chuoi": "p-hoc-co",
              "sau": [],
              "nhan": "Cô ở quầy",
              "dau": "chinh"
            },
            {
              "sprite": "vung:tap-cu",
              "x": 5.5,
              "y": 47,
              "rong": 5,
              "chuoi": "p-hoc-an",
              "sau": [],
              "nhan": "Tập giấy kẹp bìa xanh trên quầy"
            }
          ]
        },
        {
          "type": "goto",
          "to": "p-hoc-co"
        }
      ]
    },
    {
      "id": "p-hoc-an",
      "title": "Chi tiết ẩn: Tập giấy kẹp bìa xanh",
      "canh": "phong-dao-tao",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một tập giấy kẹp bìa xanh sờn gáy, nằm cạnh hộp bút. Tờ trên cùng là danh sách lớp năm học 1995–1996, đánh máy, giấy đã ngả màu cà phê sữa."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Dòng đầu bảng: Đỗ Văn Thịnh. Ghi chú: thôi học."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cô ơi, cái tên đầu tờ này…"
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Cậu ấy học giỏi lắm."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô gập tập giấy lại, đẩy nó vào sâu trong quầy, rồi cầm bó hoa lên ngắm."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Hoa đẹp quá. Cô cắm vào đâu nhỉ, cái bình này bé quá."
        }
      ]
    },
    {
      "id": "p-hoc-co",
      "title": "Cô Hạnh nhờ: danh sách lớp cũ",
      "canh": "phong-dao-tao",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Các em có lòng quá. Năm nào cũng có mấy bó, mà năm nay cô nhìn bó nào cũng thấy lâu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chúc cô mạnh khỏe ạ. Bọn em mang hoa sang, cô còn việc gì cần phụ không ạ?"
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Có. Chiều nay ba giờ cô mời mấy em học trò cũ về ngồi một chút, ở sảnh tòa B. Không hội trường, không loa đài."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Khổ nỗi cô chỉ còn danh sách lớp các năm. Nhập tay, mỗi năm một kiểu: chỗ viết hoa chỗ viết thường, chỗ thừa dấu cách. Cô cần những em đã ra trường, mỗi em một cái tên, để cô viết thiệp."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cô cho bọn em xem danh sách ấy ạ?"
        },
        {
          "type": "show-document",
          "documentId": "doc-hoc-danh-sach"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-hoc-ghi-chu"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Ừ, cô mở cho các em đúng cái danh sách ấy. Xong thì báo cô một tiếng."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bọn em chỉ cần tên, lớp, năm học và ghi chú thôi ạ."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Thế thì cô yên tâm."
        },
        {
          "type": "task",
          "text": "Lập danh sách học trò cũ đã ra trường, mỗi người một tên"
        },
        {
          "type": "goto",
          "to": "p-hoc-tra"
        }
      ]
    },
    {
      "id": "p-hoc-tra",
      "title": "Phòng CLB: gọt danh sách",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng CLB. Laptop mở bảng danh sách lớp cũ, bốn cột: năm học, lớp, họ tên, ghi chú."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ghi chú đủ thứ. Chỗ ghi \"ra trường\", chỗ \"Ra trường\", chỗ có dấu cách ở đuôi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cô cần người đã ra trường. Lấy riêng những dòng ấy ra, ghim lại."
        },
        {
          "type": "task",
          "text": "Những dòng nào ghi học trò đã ra trường?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cột ghi chú gõ tay. Chữ hoa, chữ thường, dấu cách thừa: gọt cho cùng một kiểu rồi mới so."
        },
        {
          "type": "challenge",
          "challengeId": "c-hoc-ra-truong"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba mươi dòng ra trường."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Có người ra trường mà đứng hai dòng thì cô viết hai thiệp. Cô cần mỗi người một tên. Gom theo tên đi."
        },
        {
          "type": "task",
          "text": "Ba mươi dòng đó gom lại còn bao nhiêu tên?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu ba mươi dòng ra trường làm nguồn. Gom theo họ tên, mỗi tên một nhóm."
        },
        {
          "type": "challenge",
          "challengeId": "c-hoc-ten"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Hai mươi sáu tên. Ba mươi dòng mà chỉ có hai mươi sáu tên."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Vậy có tên đứng hai dòng. Cô cần biết đó là một người hay hai."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mình đếm được số dòng của mỗi tên. Tên nào có hơn một dòng thì để cô nhìn."
        },
        {
          "type": "task",
          "text": "Tên nào xuất hiện hơn một dòng ra trường?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu ba mươi dòng làm nguồn. Mỗi tên mấy dòng; chỉ giữ tên có hơn một dòng."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-hoc-mot-dong"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-hoc-hai-dong"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bốn tên: Hoàng Minh Châu, Đinh Công Sơn, Hà Đức Long, Nguyễn Văn Hùng. Mỗi tên hai dòng."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Trùng tên chưa chắc trùng người. Mở phiếu ba mươi dòng ra xem năm học với lớp của từng dòng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Sơn với Long là cùng năm, cùng lớp. Châu thì hai lớp khác nhau. Hùng cách nhau bốn năm."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bảng chỉ cho biết trùng tên. Một người hay hai người thì chỉ cô nói được."
        },
        {
          "type": "goto",
          "to": "p-hoc-dua"
        }
      ]
    },
    {
      "id": "p-hoc-dua",
      "title": "Trả danh sách cho cô Hạnh",
      "canh": "phong-dao-tao",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cả nhóm mang bản in sang lại Phòng Đào tạo. Cô Hạnh đeo kính lão, ngón tay dò từng dòng, dừng lại ở bốn cái tên."
        },
        {
          "type": "question",
          "id": "q-hoc-ket-luan",
          "asker": {
            "speaker": "co-hanh",
            "text": "Vậy cô phải viết bao nhiêu cái thiệp?"
          },
          "choices": [
            {
              "id": "hai-muoi-sau",
              "text": "Hai mươi sáu tên không trùng. Bốn tên có hai dòng thì cô xem lại: cùng năm cùng lớp có thể là nhập hai lần, cách nhau bốn năm có thể là hai người.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "co-hanh",
                  "expression": "smile",
                  "text": "Đúng cái cô cần. Cô nhìn từng tên một."
                }
              ]
            },
            {
              "id": "ba-muoi",
              "text": "Ba mươi dòng là ba mươi người, mỗi dòng một thiệp.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "co-hanh",
                  "expression": "neutral",
                  "text": "Vậy cậu Sơn nhận hai thiệp giống hệt nhau, tưởng cô lẫn."
                }
              ]
            },
            {
              "id": "tru-trung",
              "text": "Tên trùng thì là một người, cô viết hai mươi sáu thiệp.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "co-hanh",
                  "expression": "neutral",
                  "text": "Cậu Hùng thì cô nhớ hai người. Bỏ sót một cậu là một cậu không có thiệp."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Châu thì cô nhớ, em chuyển lớp giữa năm nên vào hai danh sách. Sơn với Long là cô gõ hai lần. Còn Hùng thì hai cậu khác hẳn nhau, một cậu cao lênh khênh, một cậu hay làm rơi bút."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Hai mươi bảy cái thiệp. Cô viết nốt trước trưa."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bọn em xin phép. Chiều ba giờ bọn em qua phụ cô kê bàn ghế."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Bảng chỉ cho biết tên trùng. Một người hay hai người, người trong lớp nhận ra."
        },
        {
          "type": "goto",
          "to": "p-hoc-chieu"
        }
      ]
    },
    {
      "id": "p-hoc-chieu",
      "title": "Chiều 20/11: bàn trà nhỏ ở sảnh tòa B",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "image",
          "imageId": "cg-hoc-tro-cu"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chiều thứ Tư, 20/11/2024"
        },
        {
          "type": "note",
          "text": "Ảnh cg-hoc-tro-cu đã vẽ bàn ghép phủ khăn trắng, ấm trà, đĩa bánh, cô Hạnh rót trà, học trò cũ quanh bàn, bác Thịnh ngồi ghế đá cạnh cửa: lời dẫn không tả lại."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ba giờ chiều. Hai người vừa tới nhìn nhau một lúc, rồi cùng kêu lên: hai mươi lăm năm không gặp mà vẫn nhận ra nhau."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ông Hùng cao lênh khênh tới sớm nhất, ngồi tít cuối bàn. Mười lăm phút sau, một ông Hùng khác tới, thở hổn hển vì kẹt xe. Cô Hạnh nhìn hai người, không nói gì, chỉ rót thêm một chén trà."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô không phát biểu. Cô chỉ nói: \"Ngồi đi. Cô pha trà.\""
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bác Thịnh nhìn sang phía bàn trà một lúc lâu, rồi cúi xuống, lật sang trang sổ khác."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mình về thôi. Để cô ngồi với học trò."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Danh sách giúp cô nhớ ra ai để mời. Ai tới, tới để làm gì, là chuyện của từng người."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "p-tui-mo",
      "title": "Ghế đá cạnh lối đi: một chiếc túi không tên",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Tư, 30/10/2024 · Việc của Tùng"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Gần bốn giờ chiều. Bốn người ra khỏi tòa B, đi tắt lối có hàng cây để ra nhà xe."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ, túi ai bỏ quên đây này?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chai nước chưa ráo hơi nước. Chưa lâu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Không ghi tên. Chị đề nghị mang xuống nộp bác Thịnh. Bác trực sảnh tòa B, có sổ đồ thất lạc. Mất gì ở khu này người ta cũng ra chỗ bác hỏi đầu tiên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Khoan. CLB thám tử mà nộp luôn thì còn gì là thám tử! Tự tìm ra chủ túi, trả tận tay, chẳng hay hơn à?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bác ghi sổ, trả đúng người. Cách ấy không sai."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cách nào túi cũng về tay chủ. Chọn đi."
        },
        {
          "type": "branch",
          "id": "r-tui",
          "asker": {
            "speaker": "narrator",
            "text": "Chiếc túi không ghi tên ai. Làm gì với nó?"
          },
          "choices": [
            {
              "id": "bao-ve",
              "text": "Mang xuống nộp bác Thịnh ở sảnh tòa B.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "p-tui-nop"
                }
              ]
            },
            {
              "id": "tu-tim",
              "text": "Thử tự tìm ra chủ túi.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "p-tui-nhin"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "p-tui-nop",
      "title": "Sảnh tòa B: sổ đồ thất lạc của bác Thịnh",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sảnh tòa B giờ tan tiết. Bác Thịnh ngồi ở ghế đá cạnh cửa, cuốn sổ bìa cứng để trên đùi, mép bìa kẻ tay hai chữ \"Thất lạc\"."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bác ơi, bọn cháu nhặt được cái túi này ở ghế đá lối ra nhà xe."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Để đó."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bác mở nắp bút. Mỗi món một dòng: túi vải, giáo trình, hộp bút, vé xe, hóa đơn photo, tờ đơn trong bìa nhựa. Ví và điện thoại bác bỏ riêng vào túi áo."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Ai hỏi thì bác hỏi lại họ mất những gì. Nói đúng thì bác trả."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cuối dòng, bác ký một chữ: T. Rồi đóng sổ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tớ cá là chủ túi ra nhận ngay tối nay."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Đừng cá vội. Chưa chắc người ta biết mình mất túi ở đâu."
        },
        {
          "type": "goto",
          "to": "p-tui-sang"
        }
      ]
    },
    {
      "id": "p-tui-sang",
      "title": "Sáng hôm sau: trước cửa Phòng Công tác sinh viên",
      "canh": "phong-ctsv",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Sáng thứ Năm, 31/10/2024"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bảy giờ năm mươi. Phòng Công tác sinh viên vừa mở cửa. Trên quầy dựng tờ giấy: hồ sơ học bổng đợt này khóa lúc 17 giờ ngày 30 tháng 10."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Trước quầy có một người đứng. Hiếu, lớp BC24A. Chiếc túi vải đeo bên vai. Trong tay cậu ấy là tờ đơn trong bìa nhựa, dấu đỏ ở góc."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Cái bìa nhựa ấy. Đúng cái hôm qua trên ghế đá."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Hôm qua tớ bỏ quên túi ở ghế đá. Quay lại thì mất. Tớ tìm quanh nhà xe tới tối. Sáng nay bác bảo vệ gặp tớ ở cổng, hỏi tớ mất gì. Tớ kể đúng, bác trả."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô Lan từ phòng trong đi ra. Cô liếc tờ giấy trên quầy, rồi nhìn tờ đơn trong tay Hiếu."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Đợt này khóa từ năm giờ chiều qua rồi em. Cô không mở lại được."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Dạ, em biết. Em muốn nộp vào đợt sau cho đỡ phải viết lại."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "smile",
          "text": "Thế thì cô nhận để đó. Đợt sau cô báo."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Bọn chị nộp túi cho bác từ chiều qua."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Nộp bác là đúng cách rồi chị. Em mới là người để quên."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô Lan nhận tờ đơn, cất vào ngăn kéo. Hiếu gật đầu với cả nhóm rồi đi ra. Chiếc túi vải lắc nhẹ trên vai cậu ấy."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "p-tui-nhin",
      "title": "Ghế đá: chỉ nhìn những gì nằm ngoài",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Đấy! Tìm ra chủ túi trước, rồi mới tính!"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Được. Nhưng đồng hồ vẫn chạy. Hơn hai mươi phút chưa ra thì chị mang túi xuống bác Thịnh."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chỉ nhìn đồ đang để ngoài thôi. Ví với điện thoại thì đừng động vào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bốn người cúi xuống mặt ghế."
        },
        {
          "type": "task",
          "text": "Xem kỹ những món đang để ngoài trên ghế đá"
        },
        {
          "type": "explore",
          "id": "kp-tui-do",
          "diem": [
            {
              "sprite": "vung:nhan-sach",
              "x": 44,
              "y": 44,
              "rong": 6,
              "chuoi": "p-tui-nhan",
              "sau": [],
              "nhan": "Nhãn dán trên bìa giáo trình",
              "dau": "chinh"
            },
            {
              "sprite": "vung:ve-xe",
              "x": 51,
              "y": 66,
              "rong": 9,
              "chuoi": "p-tui-ve",
              "sau": [],
              "nhan": "Vé gửi xe màu xanh",
              "dau": "chinh"
            },
            {
              "sprite": "vung:hoa-don",
              "x": 58,
              "y": 55,
              "rong": 10,
              "chuoi": "p-tui-hoa-don",
              "sau": [],
              "nhan": "Hóa đơn quán photo",
              "dau": "chinh"
            },
            {
              "sprite": "vung:to-don",
              "x": 69,
              "y": 65,
              "rong": 17,
              "chuoi": "p-tui-to-don",
              "sau": [],
              "nhan": "Tờ đơn trong bìa nhựa",
              "dau": "chinh"
            },
            {
              "sprite": "vung:vi",
              "x": 67,
              "y": 47,
              "rong": 13,
              "chuoi": "p-tui-vi",
              "sau": [],
              "nhan": "Ví da nâu",
              "dau": "phu"
            },
            {
              "sprite": "vung:dien-thoai",
              "x": 77,
              "y": 40,
              "rong": 13,
              "chuoi": "p-tui-dien-thoai",
              "sau": [],
              "nhan": "Điện thoại úp mặt",
              "dau": "phu"
            },
            {
              "sprite": "vung:tui-vai",
              "x": 21,
              "y": 39,
              "rong": 28,
              "chuoi": "p-tui-tui-vai",
              "sau": [],
              "nhan": "Túi vải mở miệng"
            },
            {
              "sprite": "vung:hop-but",
              "x": 59,
              "y": 34,
              "rong": 19,
              "chuoi": "p-tui-hop-but",
              "sau": [],
              "nhan": "Hộp bút"
            },
            {
              "sprite": "vung:chai-nuoc",
              "x": 77,
              "y": 87,
              "rong": 6,
              "chuoi": "p-tui-chai",
              "sau": [],
              "nhan": "Chai nước dưới đất"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bấy nhiêu thứ là đủ để thu hẹp rồi."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mang túi về phòng CLB. Laptop ở đó."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng bê chiếc túi bằng hai tay, như bê một chậu cây dễ đổ."
        },
        {
          "type": "goto",
          "to": "p-tui-tra"
        }
      ]
    },
    {
      "id": "p-tui-nhan",
      "title": "Nhãn dán trên bìa giáo trình",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Nhãn dán trên bìa giáo trình Kinh tế vi mô bị bong một góc. Mã lớp học phần chỉ còn đọc được \"KTVM-0\", rồi một vệt keo. Chữ số cuối đã mất."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mã đứng đầu thì đọc được. Chữ số cuối thì không."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tui-nhan"
            }
          ]
        }
      ]
    },
    {
      "id": "p-tui-ve",
      "title": "Vé gửi xe màu xanh",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Vé gửi xe màu xanh, in hình chiếc xe máy. Nhà xe tòa B. Giờ vào: 07:12, ngày 30/10."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Bảy giờ mười hai sáng nay. Chủ túi đi sớm hơn tớ nhiều."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Nhà xe tòa B. Vé còn ở đây, vậy xe cậu ấy chưa lấy ra."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tui-toa-b"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-tui-sang"
            }
          ]
        }
      ]
    },
    {
      "id": "p-tui-hoa-don",
      "title": "Hóa đơn quán photo",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hóa đơn quán photo cổng trước, giấy nhiệt, chữ mờ dần: bốn mươi trang A4. Thứ Tư, ngày 30/10, 13 giờ 42."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hôm nay là thứ Tư. Photo lúc một giờ bốn mươi hai chiều. Vậy chủ túi vẫn còn ở trong trường."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tui-thu"
            }
          ]
        }
      ]
    },
    {
      "id": "p-tui-to-don",
      "title": "Tờ đơn trong bìa nhựa",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tờ đơn xin học bổng đã điền tay, kẹp trong bìa nhựa trong. Dấu đỏ ở góc ghi hạn nộp: 17 giờ 00, ngày 30/10/2024. Dòng đầu: \"Khoa Báo c…\", chữ cuối bị mép nhựa che. Họ tên người làm đơn nằm ở đúng chỗ nhựa dày nhất, đọc không ra."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hạn nộp mười bảy giờ. Hôm nay!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoa Báo c… chỉ có thể là Báo chí. Tên thì mình không rút tờ giấy ra để đọc. Tờ đơn là của người ta."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-tui-khoa"
            }
          ]
        }
      ]
    },
    {
      "id": "p-tui-vi",
      "title": "Ví da nâu",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng đưa tay về phía chiếc ví da nâu. Hà Vy giữ cổ tay cậu ấy lại, không nói."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Tớ chỉ xem có thẻ sinh viên không thôi mà."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chỉ xem thôi thì cũng là mở ví người ta rồi."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tùng rụt tay về, nhét vào túi quần."
        }
      ]
    },
    {
      "id": "p-tui-dien-thoai",
      "title": "Điện thoại úp mặt",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "(Ngón tay bạn đã chạm vào mép chiếc điện thoại úp mặt. Bạn rút tay lại.)"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Màn hình khóa cũng là chuyện riêng của người ta."
        }
      ]
    },
    {
      "id": "p-tui-tui-vai",
      "title": "Túi vải mở miệng",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Túi vải thô không móc khóa, không thẻ tên, không logo. Đáy túi có vết cà phê khô bằng đồng xu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Không có gì ghi tên người. Mình không thò tay xuống đáy."
        }
      ]
    },
    {
      "id": "p-tui-hop-but",
      "title": "Hộp bút",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hộp bút vải bò xanh, khóa kéo mở nửa chừng. Hai bút bi, một bút chì kim, một bút dạ quang vàng. Không tên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bút dạ quang cũng hết mực đúng lúc ôn thi giống tớ."
        }
      ]
    },
    {
      "id": "p-tui-chai",
      "title": "Chai nước dưới đất",
      "canh": "ghe-da-tui-do",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chai nước nắp xanh, còn quá nửa. Vỏ chai ngoài còn đọng một lớp hơi nước mỏng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "thinking",
          "text": "Còn mát này."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chủ túi rời chỗ này chưa lâu."
        }
      ]
    },
    {
      "id": "p-tui-tra",
      "title": "Phòng CLB: lịch học và danh sách đăng ký",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Phòng CLB, bốn giờ năm phút. Chiếc túi nằm trên bàn giữa sổ tài sản và tách trà nguội của Duy."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Cô Hạnh mở cho tài khoản CLB hai bảng này từ hồi làm phiếu tra cứu: lịch lớp học phần, và ai đăng ký lớp nào. Chỉ có mã, tên, lớp. Không số điện thoại, không điểm."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Còn chưa tới một tiếng nữa là hạn. Đi từ cái nhỏ nhất. Lớp học phần nào có thể là lớp của chủ túi?"
        },
        {
          "type": "show-document",
          "documentId": "doc-tui-lich-hoc"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nhãn giáo trình: mã lớp bắt đầu bằng \"KTVM-0\". Hóa đơn: thứ Tư. Vé xe: vào sáng nay. Vé còn ghi nhà xe tòa B."
        },
        {
          "type": "task",
          "text": "Những lớp học phần nào có thể là lớp của chủ túi?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mỗi món trên ghế đá cho một điều kiện: mã lớp, thứ, buổi, tòa. Phòng học ghi chữ tòa ở đầu mã phòng."
        },
        {
          "type": "challenge",
          "challengeId": "c-tui-lop"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba lớp. KTVM-03, KTVM-05, KTVM-07."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ba lớp mà mỗi lớp mấy chục sinh viên. Danh sách đăng ký chỉ ghi mã lớp học phần với mã sinh viên. Lớp sinh hoạt thì nằm ở bảng sinh viên."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tờ đơn ghi Khoa Báo chí. Lớp Báo chí mã bắt đầu bằng BC. Nối hai bảng, lấy ba lớp học phần trên phiếu."
        },
        {
          "type": "task",
          "text": "Trong ba lớp ấy, những ai là sinh viên Báo chí?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bảng đăng ký và bảng sinh viên có chung mã sinh viên. Nối theo mã ấy, rồi giữ ba lớp học phần trên phiếu và lớp sinh hoạt bắt đầu bằng BC."
        },
        {
          "type": "show-document",
          "documentId": "doc-tui-dang-ky"
        },
        {
          "type": "challenge",
          "challengeId": "c-tui-nguoi"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba người. Hiếu lớp BC24A, Hồng và Toàn lớp BC24B."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Hiếu? Cậu bàn bên hôm mình tra chữ H?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bảng chỉ nói ai đăng ký lớp nào. Chưa nói ai đánh rơi."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ba cái tên. Phải chọn tìm ai trước."
        },
        {
          "type": "goto",
          "to": "p-tui-hoi"
        }
      ]
    },
    {
      "id": "p-tui-hoi",
      "title": "Ba cái tên, một chiếc vé gửi xe",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vé xe ghi vào bãi lúc bảy giờ mười hai. Giờ bắt đầu của ba lớp nằm ngay trên phiếu lớp học phần."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "KTVM-03 vào học lúc bảy rưỡi. KTVM-05 và KTVM-07 chín rưỡi."
        },
        {
          "type": "question",
          "id": "q-tui-ket-luan",
          "asker": {
            "speaker": "tung",
            "text": "Ba người rồi. Tớ phải chạy đi tìm ai trước?"
          },
          "choices": [
            {
              "id": "hieu",
              "text": "Hiếu. Trong ba lớp chỉ lớp của Hiếu vào học lúc 07:30; vé gửi xe ghi vào bãi lúc 07:12. Hai người kia vào lớp 09:30.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "tung",
                  "expression": "happy",
                  "text": "Bảy giờ mười hai, vào bãi trước giờ học mười tám phút. Nghe khớp. Tớ đi tìm Hiếu."
                }
              ]
            },
            {
              "id": "ca-ba",
              "text": "Nhắn hỏi cả ba người, ai trả lời trước là chủ túi.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Cũng được, nhưng còn chưa tới một tiếng. Hai người kia sẽ đọc một tin về chuyện không phải của họ, còn trong ba người đã có một người khớp hơn."
                }
              ]
            },
            {
              "id": "mo-vi",
              "text": "Mở ví xem thẻ sinh viên cho nhanh.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Đã chốt từ đầu: không mở ví. Chưa cần. Vé gửi xe và bảng lớp nói được nhiều hơn tưởng."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người mất đồ ở tòa B thường ra hỏi bác bảo vệ trước. Mình xuống sảnh."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Cầm túi theo nhé. Còn có bốn mươi phút thôi."
        },
        {
          "type": "goto",
          "to": "p-tui-gap"
        }
      ]
    },
    {
      "id": "p-tui-gap",
      "title": "Sảnh tòa B: người đang hỏi bác bảo vệ",
      "canh": "sanh-toa-b",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sảnh tòa B, tan tiết cuối. Trước ghế đá chỗ bác Thịnh ngồi có một sinh viên đứng thở dốc, hai tay trống trơn. Hiếu."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Bác ơi, có ai nộp một cái túi vải không ạ? Có giáo trình Kinh tế vi mô với tờ đơn học bổng. Hạn nộp mười bảy giờ."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Hôm nay chưa ai nộp túi nào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Có rồi đây!"
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "surprised",
          "text": "Túi của tớ!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cậu nói xem trong túi còn gì ngoài tờ đơn."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Ví da nâu, điện thoại, hộp bút vải bò xanh, chai nước. Vé xe vào bãi lúc bảy giờ mười hai."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Đủ rồi. Ví với điện thoại bọn mình không mở. Cậu tự kiểm lại."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Còn nguyên cả. Nói thẳng nhé: mất tờ này là mất cả kỳ. Cảm ơn nhé."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Phòng hành chính đóng đúng năm giờ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Phòng Công tác sinh viên! Tớ chạy cùng!"
        },
        {
          "type": "goto",
          "to": "p-tui-ctsv"
        }
      ]
    },
    {
      "id": "p-tui-ctsv",
      "title": "Phòng Công tác sinh viên: mười sáu giờ năm mươi hai",
      "canh": "phong-ctsv",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mười sáu giờ năm mươi hai. Hiếu thở dốc, đặt tờ đơn lên quầy. Tùng đứng sau lưng cậu ấy, tay vẫn xách quai túi."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Còn tám phút. Đưa cô xem."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Cô Lan đọc từng dòng, mở ngăn kéo lấy con dấu, ấn xuống góc giấy. Mực đỏ nhòe nhẹ, dòng chữ nhỏ bên dưới: nhận 16 giờ 52."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "smile",
          "text": "Nhận rồi em."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Dạ. Cảm ơn cô. Cảm ơn mọi người."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Con dấu đỏ trên góc tờ đơn vẫn còn ướt."
        },
        {
          "type": "end"
        }
      ]
    }
  ],
  "thuThach": {
    "c-in": {
      "id": "c-in",
      "tieuDe": "Nhật ký máy in đêm Chủ nhật",
      "deBai": "Lá thư được đánh máy rồi in ra. Máy in nhớ ai đã in tệp nào.",
      "manhMoiLienQuan": [
        "clue-ten-tep"
      ],
      "mucTieuHoc": "0 dòng cũng là một câu trả lời; bỏ bớt điều kiện để thấy ai thật sự in.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep = 'kien-nghi-phong-clb.docx';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0,
            "cot": [
              "tai_khoan",
              "ten_tep"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Hai mã này chưa từng in tệp đó."
            },
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Thế thì ai in?"
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Con chó không sủa cũng là manh mối. Không dòng nào tức là có một điều mình đang tin mà sai."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 0,
            "cot": [
              "ten_tep"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không tệp nào tên đúng y mấy chữ ấy. Chân trang bị xén, mình mới chép được đoạn đầu tên tệp thôi mà."
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
              "text": "Nhật ký không có dòng nào như thế cả."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-nhat-ky-in",
        "title": "Nhật ký in 23:10 Chủ nhật",
        "description": "1 trang, tệp kien-nghi-phong-clb.docx, tài khoản clb_robotics: tài khoản dùng chung của CLB Robotics, không phải mã của một sinh viên. Tài khoản in thư không phải của người nộp.",
        "giaTri": [
          "clb_robotics"
        ]
      },
      "ghiChu": [
        "Lần chạy \"sai có ích\": mã Hoài/Hiếu + tên tệp → 0 dòng. Bỏ điều kiện mã → 1 dòng: clb_robotics, 23:10 Chủ nhật."
      ]
    },
    "c-bang-lop": {
      "id": "c-bang-lop",
      "tieuDe": "Bảng lớp sinh hoạt",
      "deBai": "Tài khoản CLB chỉ xem được một bảng. Chọn bảng ấy rồi chạy, xem nó ghi những gì.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Mỗi lần tra bắt đầu bằng việc chọn bảng. Chạy mà chưa lọc thì ra mọi dòng của bảng.",
      "soDongKyVong": 112,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat;",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "neutral",
              "text": "Một trăm mười hai lớp của bốn khóa, bốn cột. Ghim lại. Giờ mới biết mình có gì để lọc."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-bang-lop",
        "title": "Bảng lớp: 112 lớp, 4 cột",
        "description": "Cả bảng lớp sinh hoạt: một trăm mười hai lớp của bốn khóa. Mỗi dòng ghi mã lớp, ngành, khóa học và tòa nhà.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-cot-lop": {
      "id": "c-cot-lop",
      "tieuDe": "Lớp nào ở tòa nào",
      "deBai": "Bảng lớp có bốn cột. Lần này chỉ cần biết lớp nào ở tòa nào: bấm lấy hai cột ấy rồi chạy.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "SELECT chọn CỘT muốn xem; số dòng không đổi, bảng gọn lại.",
      "soDongKyVong": 112,
      "sqlChuan": "SELECT ma_lop, toa_nha FROM lop_sinh_hoat;",
      "chonCot": [],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "thieu-cot"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Vẫn đủ một trăm mười hai dòng, nhưng chưa thấy đủ cả lớp lẫn tòa. Cần cột mã lớp và cột tòa nhà."
            }
          ]
        },
        {
          "khi": {
            "kind": "thua-cot"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "neutral",
              "text": "Có đủ rồi, mà thừa. Mình chỉ hỏi lớp nào ở tòa nào, bỏ bớt cột kia cho bảng dễ đọc."
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
              "text": "Vẫn một trăm mười hai dòng, chỉ còn hai cột. Chọn cột thì bảng gọn lại chứ không mất dòng nào."
            }
          ]
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-lop": {
      "id": "c-lop",
      "tieuDe": "Lớp ở tòa B và học Báo chí",
      "deBai": "Hộp ở tòa B. Thẻ lịch của khoa Báo chí. Lớp nào khớp cả hai?",
      "manhMoiLienQuan": [
        "clue-toa-b",
        "clue-bao-chi-k24"
      ],
      "mucTieuHoc": "Hai điều kiện. VÀ giữ lớp khớp cả hai (2 lớp); HOẶC giữ lớp khớp một trong hai (33 lớp).",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 33
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "worried",
              "text": "Ơ, ba mươi ba lớp? Tớ tưởng thêm điều kiện thì phải ít đi chứ."
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Lớp nào ở tòa B cũng được lấy, lớp nào học Báo chí cũng được lấy. Rộng thật."
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
              "text": "Không lớp nào à? Lạ nhỉ, trường mình có lớp Báo chí mà."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 27,
            "cot": [
              "toa_nha"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Hai mươi bảy lớp ở tòa B, đủ mọi ngành. Còn tấm thẻ lịch của khoa Báo chí nữa."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 8,
            "cot": [
              "nganh"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Tám lớp Báo chí, nằm ở cả ba tòa. Mà cái hộp thì ở tòa B."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 112
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Vẫn cả trăm mười hai lớp. Chưa lọc được gì."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-hai-lop",
        "title": "Hai lớp: BC24A, BC23A",
        "description": "Lớp ở tòa B và học ngành Báo chí: đúng hai lớp.",
        "giaTri": [
          "BC24A",
          "BC23A"
        ]
      },
      "ghiChu": [
        "Tùng rủ nối HOẶC → 33 lớp. Đổi VÀ → 2 lớp (BC24A, BC23A) → phiếu kết quả vào hồ sơ."
      ]
    },
    "c-ten-h": {
      "id": "c-ten-h",
      "tieuDe": "Tên bắt đầu bằng H trong hai lớp",
      "deBai": "Chữ ký chỉ đọc được chữ H. Người ký học một trong hai lớp. Là ai?",
      "manhMoiLienQuan": [
        "clue-chu-ky-h"
      ],
      "mucTieuHoc": "\"=\" so khớp chính xác.",
      "soDongKyVong": 32,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop = 'BC24A';",
      "chonCot": [
        "ho_dem",
        "ten",
        "ma_lop"
      ],
      "bamO": "ma_sv",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 30
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ba mươi người lớp BC23A. Dò hết rồi, chẳng ai tên bắt đầu bằng chữ H."
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
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ba mươi hai người lớp BC24A. Dò từng tên một… Có Hiếu với Hoài."
            }
          ]
        },
        {
          "khi": {
            "kind": "thieu-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Thấy hai cái tên rồi. Nhưng trường gần bốn nghìn người, trùng tên là chuyện thường. Lên hàng LẤY CỘT bấm thêm ma_sv, phiếu này mới chỉ đúng người."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-hai-ma",
        "title": "Hai mã ứng viên kèm căn cứ",
        "description": "Kết quả truy vấn: hai sinh viên có tên bắt đầu bằng H, cùng lớp BC24A — Hiếu và Hoài.",
        "giaTri": [
          "SV240228",
          "SV240317"
        ]
      },
      "ghiChu": [
        "Lần chạy \"sai có ích\": kéo chọn lớp BC23A → 30 dòng (dò mắt không ai tên H). Lớp BC24A → 32 dòng (Hiếu, Hoài). Bẫy: quên chọn ma_sv."
      ]
    },
    "c-sua-or-quan": {
      "id": "c-sua-or-quan",
      "tieuDe": "Câu truy vấn trên màn chiếu",
      "deBai": "Câu của Quân đang chiếu trên màn: \"tên là Hoài hoặc lớp BC24A\". Hồ sơ CLB nộp chỉ có 1 người.",
      "manhMoiLienQuan": [
        "clue-chu-ky-h"
      ],
      "mucTieuHoc": "Phần hợp (OR) và phần giao (AND).",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "truyVanNapSan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';",
      "phanUng": [],
      "vatChung": {
        "id": "ev-mot-dong-sua",
        "title": "Một dòng sau khi sửa",
        "description": "Truy vấn của Quân sau khi đổi OR thành AND.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-da-duyet": {
      "id": "c-don-da-duyet",
      "tieuDe": "Sổ đặt linh kiện của xưởng",
      "deBai": "Sổ đặt linh kiện của xưởng Robotics ghi từ năm 2022, đơn các kỳ trước đã quyết toán. Những đơn nào đang ở trạng thái đã duyệt?",
      "manhMoiLienQuan": [
        "clue-da-duyet"
      ],
      "mucTieuHoc": "Lọc theo trạng thái để ghim thành phiếu; ôn gọt dữ liệu: ô gõ tay dính dấu cách thì phải bỏ dấu cách thừa trước khi so.",
      "soDongKyVong": 8,
      "sqlChuan": "SELECT ma_don, ngay, nguoi_dat, linh_kien, so_tien, ma_phien FROM don_linh_kien WHERE TRIM(trang_thai) = 'DA_DUYET';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Giá trị trạng thái viết hoa, gạch dưới, đúng như giấy nhớ."
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
              "text": "Hai dòng. Đây là hai đơn còn chờ, mình cần đơn đã duyệt."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Năm đơn? Giấy của Ban kiểm tra ghi kỳ này duyệt tám. Ba đơn kia vẫn trong sổ, chỉ là ô trạng thái không khớp."
            },
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Sổ gõ tay hay dính dấu cách ở đuôi lắm. Bỏ dấu cách thừa đi rồi hẵng so."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 156
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ, từ năm 2022 tới giờ. Đơn các năm trước quyết toán xong hết rồi, còn hai đơn kỳ này thì đang chờ duyệt."
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
              "text": "Tám đơn đã duyệt. Ghim lại, rồi gom."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-don-da-duyet",
        "title": "Tám đơn linh kiện đã duyệt",
        "description": "Kết quả truy vấn: tám đơn đã duyệt, mỗi đơn ghi ngày, người đứng tên, linh kiện, số tiền và mã phiên đăng nhập lúc tạo đơn.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-theo-nguoi": {
      "id": "c-don-theo-nguoi",
      "tieuDe": "Đơn đã duyệt, gom theo người đặt",
      "deBai": "Lấy phiếu tám đơn làm nguồn. Gom theo người đứng tên, đếm mỗi người mấy đơn.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Thống kê trước khi đọc từng dòng: con số bất thường chỉ ra chỗ cần xem.",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT nguoi_dat, COUNT(*) AS so_dong FROM @ev-don-da-duyet GROUP BY nguoi_dat;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-don-da-duyet",
      "nhomTheo": "nguoi_dat",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-don-theo-nguoi",
        "title": "Nam đứng tên 5 trong 8 đơn",
        "description": "Kết quả gom theo người đặt: Nam 5 đơn, Bách 1, Thảo 1, Khánh 1. Nam nói mình chỉ đặt hai.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-nam-may": {
      "id": "c-don-nam-may",
      "tieuDe": "Đơn của Nam nối với phiên đăng nhập",
      "deBai": "Sổ đặt hàng ghi mã phiên; bảng phiên đăng nhập ghi máy và giờ của mỗi phiên. Năm đơn đứng tên Nam được tạo từ máy nào, lúc mấy giờ?",
      "manhMoiLienQuan": [
        "clue-ma-phien",
        "clue-nguoi-dat-nam"
      ],
      "mucTieuHoc": "Nối hai bảng theo cột chung đúng nghĩa (mã phiên); nối theo cột trùng tên khác (ngày) thì mỗi đơn kéo theo cả phiên của người khác.",
      "soDongKyVong": 5,
      "sqlChuan": "SELECT ma_don, linh_kien, may, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE nguoi_dat = 'Nam';",
      "bangNoi": [
        "phien_dang_nhap"
      ],
      "bangChon": [
        "don_linh_kien",
        "phien_dang_nhap"
      ],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "loi-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Máy báo không có cột đó. Sổ đặt hàng không ghi máy; máy nằm ở bảng phiên đăng nhập. Phải nối hai bảng trước đã."
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
              "text": "Không dòng nào. Tên người đặt viết đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 8
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Tám dòng cho năm đơn? Đơn bánh xe ngày 02/10 hiện hai lần, một lần ở máy xưởng số 2, một lần ở máy văn phòng. Một đơn sao tạo ở hai máy được."
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Nối theo cột này thì đơn nào cũng dính mọi phiên cùng ngày, kể cả phiên của máy khác."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 180
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Một trăm tám mươi dòng, nhiều hơn cả số đơn trong sổ. Nối theo cột này thì ngày nào trùng là dính nhau hết."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 156
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Một trăm năm mươi sáu dòng. Cả sổ. Mình chỉ cần đơn của anh Nam."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "nam",
              "expression": "neutral",
              "text": "Năm đơn, mỗi đơn đúng một máy, một giờ. Hai cái buổi chiều là anh."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-don-nam-may",
        "title": "Năm đơn của Nam: máy và giờ tạo",
        "description": "Kết quả nối hai bảng: hai đơn tạo buổi chiều từ máy xưởng số 2, ba đơn tạo ban đêm từ máy văn phòng xưởng (21:50, 22:10, 22:05). Đơn 07/10 tạo lúc 22:05, khi Nam đang ở thư viện.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-nam-theo-may": {
      "id": "c-don-nam-theo-may",
      "tieuDe": "Đơn của Nam, gom theo máy",
      "deBai": "Lấy phiếu năm đơn làm nguồn. Gom theo máy, đếm mỗi máy mấy đơn.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Gom và đếm trên phiếu đã nối: cùng một thao tác, nguồn khác.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT may, COUNT(*) AS so_dong FROM @ev-don-nam-may GROUP BY may;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-don-nam-may",
      "nhomTheo": "may",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-don-nam-theo-may",
        "title": "3 đơn từ máy văn phòng xưởng, 2 từ máy xưởng số 2",
        "description": "Kết quả gom theo máy: ba đơn mang tên Nam tạo từ máy văn phòng xưởng (phòng khóa, chìa ban chủ nhiệm giữ), hai đơn từ máy xưởng số 2 là của Nam.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-may-vp": {
      "id": "c-may-vp",
      "tieuDe": "Mọi đơn từ máy văn phòng xưởng",
      "deBai": "Nối sổ đặt hàng với bảng phiên đăng nhập. Máy văn phòng xưởng đã tạo những đơn nào, đứng tên ai, lúc mấy giờ?",
      "manhMoiLienQuan": [
        "clue-may-vp",
        "clue-ma-phien"
      ],
      "mucTieuHoc": "Ôn nối bảng; đổi điều kiện lọc sang cột của bảng thứ hai.",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT ma_don, nguoi_dat, linh_kien, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE may = 'MAY-VP-XUONG';",
      "bangNoi": [
        "phien_dang_nhap"
      ],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "loi-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Máy báo không có cột đó. Cột máy nằm ở bảng phiên đăng nhập, nối rồi mới lọc được."
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
              "text": "Không dòng nào. Mã máy viết hoa, có gạch nối, đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Năm dòng, mà máy văn phòng chỉ có bốn phiên tạo đơn. Có đơn tạo ở máy xưởng dính vào, vì cùng ngày có một phiên ở máy văn phòng. Cột nối chưa đúng nghĩa."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 156
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ. Mình chỉ cần đơn từ máy văn phòng."
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
              "text": "Bốn đơn. Ba đơn đêm mang tên anh Nam, một đơn sáng mang tên anh Khánh."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-may-vp",
        "title": "Máy văn phòng xưởng: 3 đơn đêm mang tên Nam, 1 đơn ngày của Khánh",
        "description": "Kết quả: bốn đơn tạo từ máy văn phòng xưởng. Ba đơn ban đêm đứng tên Nam; một đơn ốc vít 10:15 sáng đứng tên Khánh, trưởng CLB, là người dùng máy đó hợp lệ ban ngày. Ba người có chìa phòng: Khánh, Bách, Thảo.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-tung": {
      "id": "c-don-tung",
      "tieuDe": "Sổ đón của đội tình nguyện",
      "deBai": "Sổ đón ghi tình nguyện viên bằng mã sinh viên. Tùng đã dẫn những lượt nào?",
      "manhMoiLienQuan": [
        "clue-ma-tung"
      ],
      "mucTieuHoc": "Ôn lọc theo mã để ghim thành phiếu riêng của một người.",
      "soDongKyVong": 9,
      "sqlChuan": "SELECT ma_luot, ngay, ma_sv, diem_den FROM luot_don WHERE tinh_nguyen_vien = 'SV240251';",
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
              "expression": "gai-dau",
              "text": "Không lượt nào. Mã của tớ viết đúng như trên giấy nhớ: SV240251."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 290
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ, của cả đội mấy năm liền. Tớ chỉ cần các lượt tớ dẫn."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "thinking",
              "text": "Chín lượt. Đúng hai ngày tớ mặc áo xanh."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-don-tung",
        "title": "Chín lượt đón do Tùng dẫn",
        "description": "Kết quả truy vấn: chín lượt Tùng dẫn trong hai ngày 07 và 08/09/2024, có mã tân sinh viên và điểm đến.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-noi-den": {
      "id": "c-don-noi-den",
      "tieuDe": "Lượt đón của Tùng, gom theo điểm đến",
      "deBai": "Lấy phiếu chín lượt làm nguồn. Gom theo điểm đến, đếm mỗi nơi mấy lượt.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Ôn gom và đếm: cái lạ hiện ra thành nhóm chỉ có một dòng.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT diem_den, COUNT(*) AS so_dong FROM @ev-don-tung GROUP BY diem_den;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-don-tung",
      "nhomTheo": "diem_den",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-don-noi-den",
        "title": "Ký túc xá 8 lượt, nhà xe 1 lượt",
        "description": "Kết quả gom theo điểm đến: tám lượt tới ký túc xá, một lượt tới nhà xe. Phiếu đếm được số lượt, chưa nói lượt nhà xe là của ai.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-don-lac": {
      "id": "c-don-lac",
      "tieuDe": "Lượt tới nhà xe",
      "deBai": "Trong chín lượt trên phiếu, lượt nào ghi điểm đến là nhà xe? Chép mã tân sinh viên ra giấy nhớ.",
      "manhMoiLienQuan": [
        "clue-nha-xe"
      ],
      "mucTieuHoc": "Ôn lọc tiếp trên phiếu đã ghim; bấm ô mã để mang sang lần đối chiếu sau.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_luot, ngay, ma_sv FROM @ev-don-tung WHERE diem_den = 'NHA_XE';",
      "kieuTrinhDung": "loc-tiep",
      "nguon": "ev-don-tung",
      "bamO": "ma_sv",
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
              "expression": "gai-dau",
              "text": "Không dòng nào. Trong sổ, nhà xe viết hoa, có gạch dưới, như trên giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 9
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Vẫn đủ chín lượt. Chưa tách được lượt nhà xe ra."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Còn đúng một lượt. Ngày Chủ nhật."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-don-lac",
        "title": "LD-0247: Tùng đưa SV240317 tới nhà xe",
        "description": "Kết quả lọc tiếp trên phiếu chín lượt: lượt LD-0247 ngày 08/09/2024, tân sinh viên SV240317, điểm đến nhà xe. Sổ ghi nơi tới, không ghi vì sao.",
        "giaTri": [
          "SV240317"
        ]
      },
      "ghiChu": []
    },
    "c-hoan-loc": {
      "id": "c-hoan-loc",
      "tieuDe": "Bản xuất thu chi của CLB",
      "deBai": "Bản xuất lẫn cả khoản thu, khoản chi lẫn khoản hoàn. Những dòng nào là hoàn tiền?",
      "manhMoiLienQuan": [
        "clue-hoan-loai"
      ],
      "mucTieuHoc": "Lọc trước rồi mới gom: chỉ đưa vào phiếu nguồn những dòng đúng loại.",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich WHERE loai = 'HOAN';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Loại giao dịch viết hoa, đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 68
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả bản xuất, sáu mươi tám dòng, lẫn cả khoản thu khoản chi."
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
              "text": "Bốn dòng hoàn. Ghim lại, rồi gom theo phiếu."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-hoan-loc",
        "title": "Bốn dòng hoàn tiền",
        "description": "Kết quả truy vấn: bốn dòng loại HOAN, thuộc ba phiếu PH-01, PH-04, PH-06. Cộng lại âm 155.000 đồng.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-hoan-nhom": {
      "id": "c-hoan-nhom",
      "tieuDe": "Dòng hoàn gom theo mã phiếu",
      "deBai": "Lấy phiếu bốn dòng hoàn làm nguồn. Gom theo mã phiếu, tính tổng số tiền, chỉ giữ nhóm có hơn một dòng.",
      "manhMoiLienQuan": [
        "clue-hoan-mot-dong"
      ],
      "mucTieuHoc": "Rèn lọc nhóm (HAVING) theo số dòng của nhóm, kèm tổng trên nhóm.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-hoan-loc GROUP BY ma_phieu HAVING COUNT(*) > 1;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-hoan-loc",
      "nhomTheo": null,
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-hoan-nhom",
        "title": "PH-04: hai dòng hoàn, tổng âm 120.000",
        "description": "Kết quả gom theo mã phiếu: chỉ PH-04 có hơn một dòng hoàn (hai dòng, tổng ghi âm 120.000 đồng). Đây là phiếu cần mở chứng từ gốc, chưa phải kết luận.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-hoc-ra-truong": {
      "id": "c-hoc-ra-truong",
      "tieuDe": "Danh sách lớp cũ của cô Hạnh",
      "deBai": "Danh sách lớp các khóa 1995–2005, nhập tay mỗi năm một kiểu. Những dòng nào ghi học trò đã ra trường?",
      "manhMoiLienQuan": [
        "clue-hoc-ghi-chu"
      ],
      "mucTieuHoc": "Ôn gọt dữ liệu: ô gõ tay lệch chữ hoa và dấu cách thì gọt cả hai trước khi so.",
      "soDongKyVong": 30,
      "sqlChuan": "SELECT nam_hoc, lop, ho_ten FROM danh_sach_lop_cu WHERE LOWER(TRIM(ghi_chu)) = 'ra trường';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Ghi chú viết thường, có dấu, đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 18
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Mười tám dòng. Cuối khóa gần như cả lớp ra trường, mà ở đây chỉ được chừng ấy."
            },
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Có ô viết hoa chữ đầu, có ô thừa dấu cách. Máy coi những ô ấy là chữ khác."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 23
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Hai mươi ba dòng. Vẫn còn thiếu: ô thừa dấu cách và ô viết hoa chữ đầu là hai lỗi khác nhau, mà đều có."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 400
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả bảng, bốn trăm dòng, kể cả người thôi học, người chuyển trường."
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
              "text": "Ba mươi dòng ra trường. Ghim lại, rồi gom theo tên."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-hoc-ra-truong",
        "title": "Ba mươi dòng ghi ra trường",
        "description": "Kết quả truy vấn: ba mươi dòng ghi học trò đã ra trường, từ các lớp 1997 đến 2005, mỗi dòng ghi năm học, lớp và họ tên.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-hoc-ten": {
      "id": "c-hoc-ten",
      "tieuDe": "Dòng ra trường gom theo họ tên",
      "deBai": "Lấy phiếu ba mươi dòng làm nguồn. Gom theo họ tên: mỗi tên một nhóm, đếm mỗi tên mấy dòng.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Gom và đếm để ra danh sách không trùng: cùng một thao tác, nguồn khác.",
      "soDongKyVong": 26,
      "sqlChuan": "SELECT ho_ten, COUNT(*) AS so_dong FROM @ev-hoc-ra-truong GROUP BY ho_ten;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-hoc-ra-truong",
      "nhomTheo": "ho_ten",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-hoc-ten",
        "title": "Hai mươi sáu tên không trùng",
        "description": "Kết quả gom theo họ tên: ba mươi dòng ra trường còn hai mươi sáu tên. Hai mươi hai tên có một dòng, bốn tên có hai dòng.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-hoc-hai-dong": {
      "id": "c-hoc-hai-dong",
      "tieuDe": "Tên có hơn một dòng",
      "deBai": "Lấy phiếu ba mươi dòng làm nguồn. Gom theo họ tên, chỉ giữ tên có hơn một dòng.",
      "manhMoiLienQuan": [
        "clue-hoc-mot-dong"
      ],
      "mucTieuHoc": "Ôn lọc nhóm (HAVING) theo số dòng của nhóm.",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT ho_ten, COUNT(*) AS so_dong FROM @ev-hoc-ra-truong GROUP BY ho_ten HAVING COUNT(*) > 1;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-hoc-ra-truong",
      "nhomTheo": null,
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-hoc-hai-dong",
        "title": "Bốn tên có hai dòng ra trường",
        "description": "Kết quả gom theo họ tên, chỉ giữ tên có hơn một dòng: Hoàng Minh Châu, Đinh Công Sơn, Hà Đức Long, Nguyễn Văn Hùng, mỗi tên hai dòng. Trùng tên chưa nói được là một người hay hai người.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-mic-phieu": {
      "id": "c-mic-phieu",
      "tieuDe": "Phiếu luân chuyển nối với sổ tài sản",
      "deBai": "Phiếu luân chuyển chỉ ghi mã tài sản; sổ tài sản mới ghi tên. Phiếu nào đã có người nhận ghi chuyển chiếc micro không dây, và chuyển tới đâu?",
      "manhMoiLienQuan": [
        "clue-mic-ten",
        "clue-mic-da-nhan"
      ],
      "mucTieuHoc": "Rèn nối hai bảng theo mã; cột trùng tên (vi_tri) chưa chắc cùng nghĩa; lọc trên cột của cả hai bảng.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_phieu, ten_tai_san, luan_chuyen.vi_tri, nguoi_nhan FROM luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN';",
      "bangNoi": [
        "tai_san"
      ],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "loi-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Máy báo không có cột đó. Phiếu luân chuyển không ghi tên thiết bị; tên nằm ở sổ tài sản. Phải nối hai bảng trước đã."
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
              "text": "Không dòng nào. Tên thiết bị và trạng thái viết đúng như trên giấy nhớ."
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
              "text": "Hai phiếu của micro không dây. Một cái mới là đề xuất, chưa ai nhận."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 3
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Ba dòng, mà là phiếu của loa, của máy ảnh, của chân máy, lại mang tên micro."
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Cột vi_tri ở phiếu là nơi chuyển tới, ở sổ là chỗ để đầu kỳ. Nối theo nó thì phiếu nào chuyển tới tủ CLB cũng ghép với chiếc micro từng để ở tủ CLB. Trùng tên cột, khác nghĩa."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 45
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Bốn mươi lăm dòng. Phiếu của CLB khác cũng dính vào đồ của mình, chỉ vì chuyển tới cùng một chỗ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 51
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Năm mươi mốt dòng, trong khi đồ của CLB mình chỉ có bảy phiếu. Một phiếu kéo theo mấy thiết bị liền: cột nối này không phải mã của thiết bị."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Năm phiếu đã nhận, của đủ mọi thiết bị. Mình chỉ tìm micro không dây."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 7
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Bảy phiếu có đồ của CLB mình. Mình chỉ tìm một chiếc micro."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Một phiếu. PX-17, sang tủ thiết bị dùng chung."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-mic-phieu",
        "title": "PX-17: micro không dây sang tủ thiết bị dùng chung",
        "description": "Kết quả nối phiếu luân chuyển với sổ tài sản: phiếu PX-17 đã nhận, chuyển micro không dây (MIC-02) tới tủ thiết bị dùng chung, tổ thiết bị nhận.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-tui-lop": {
      "id": "c-tui-lop",
      "tieuDe": "Lịch lớp học phần",
      "deBai": "Giáo trình ghi mã lớp học phần bị bong mất chữ số cuối, vé xe ghi nhà xe tòa B vào buổi sáng, hóa đơn ghi thứ Tư. Những lớp học phần nào khớp cả bốn điều?",
      "manhMoiLienQuan": [
        "clue-tui-nhan",
        "clue-tui-toa-b",
        "clue-tui-sang",
        "clue-tui-thu"
      ],
      "mucTieuHoc": "Ôn ghép nhiều điều kiện bằng AND; chỉ biết đầu mã thì dùng \"bắt đầu bằng\".",
      "soDongKyVong": 3,
      "sqlChuan": "SELECT ma_lhp, mon, phong, gio_bat_dau FROM lich_hoc WHERE ma_lhp LIKE 'KTVM-0%' AND thu = 'THU_TU' AND ca = 'SANG' AND phong LIKE 'B%';",
      "bamO": "ma_lhp",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không lớp nào. Nhãn bong mất chữ số cuối. Chỉ biết đầu mã thì không so bằng được."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 137
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả lịch của trường, một trăm ba mươi bảy lớp học phần. Mình chỉ cần lớp của chủ túi."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 9
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Chín lớp, lẫn lớp của môn khác hoặc của ngày khác. Có điều kiện chưa dùng tới."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 6
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Sáu lớp thứ Tư. Có lớp buổi chiều, có lớp ở tòa khác. Vé xe nói gì?"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Năm lớp. Vé xe chỉ nhà xe tòa B, hóa đơn chỉ thứ Tư. Còn một điều kiện chưa dùng."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 4
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "thinking",
              "text": "Bốn lớp, mà có một lớp học lúc mười ba rưỡi. Vé xe vào bãi lúc bảy giờ mười hai."
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
              "text": "Ba lớp. Ghim lại, rồi đi tìm người."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tui-lop",
        "title": "Ba lớp Kinh tế vi mô sáng thứ Tư ở tòa B",
        "description": "Kết quả truy vấn: KTVM-03 (B204, 07:30), KTVM-05 (B102, 09:30), KTVM-07 (B305, 09:30). Cả ba là lớp học sáng thứ Tư, tòa B, mã bắt đầu KTVM-0.",
        "giaTri": [
          "KTVM-03",
          "KTVM-05",
          "KTVM-07"
        ]
      },
      "ghiChu": []
    },
    "c-tui-nguoi": {
      "id": "c-tui-nguoi",
      "tieuDe": "Danh sách đăng ký nối với bảng sinh viên",
      "deBai": "Danh sách đăng ký chỉ ghi mã lớp học phần và mã sinh viên; tên và lớp sinh hoạt nằm ở bảng sinh viên. Trong ba lớp trên phiếu, những ai thuộc lớp Báo chí?",
      "manhMoiLienQuan": [
        "clue-tui-khoa"
      ],
      "mucTieuHoc": "Ôn nối hai bảng theo mã sinh viên; lấy nhiều lớp học phần từ phiếu (\"là một trong\"); lọc tiếp theo đầu mã lớp.",
      "soDongKyVong": 3,
      "sqlChuan": "SELECT dang_ky_hoc.ma_lhp, sinh_vien.ma_sv, ho_dem, ten, ma_lop FROM dang_ky_hoc JOIN sinh_vien ON dang_ky_hoc.ma_sv = sinh_vien.ma_sv WHERE ma_lhp IN ('KTVM-03', 'KTVM-05', 'KTVM-07') AND ma_lop LIKE 'BC%';",
      "bangNoi": [
        "sinh_vien"
      ],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "loi-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Máy báo không có cột đó. Bảng đăng ký không ghi tên, không ghi lớp sinh hoạt. Tên và lớp nằm ở bảng sinh viên. Phải nối hai bảng trước đã."
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
              "text": "Không ai. Lớp sinh hoạt là BC24A, BC24B… không có lớp nào tên đúng là BC. Chỉ biết đầu mã thì phải so theo đầu mã."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "thinking",
              "text": "Một người, mà tờ đơn chỉ ghi Khoa Báo c…, không ghi lớp nào. Đừng gán cho họ một lớp."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 11
          },
          "loi": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Mười một người của ba lớp, đủ khoa. Tờ đơn ghi Báo chí."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 231
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Hơn hai trăm người Báo chí, của đủ mọi lớp học phần. Mình chỉ xét ba lớp trên phiếu."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 2921
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Cả danh sách đăng ký của trường, gần ba nghìn dòng. Lọc đi."
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
              "text": "Ba người. Một người học lớp bảy rưỡi."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tui-nguoi",
        "title": "Ba sinh viên Báo chí trong ba lớp",
        "description": "Kết quả nối: Hiếu (BC24A) học KTVM-03 lúc 07:30; Hồng (BC24B) học KTVM-05 và Toàn (BC24B) học KTVM-07, cùng lúc 09:30. Bảng chỉ nói ai đăng ký lớp nào, chưa nói ai đánh rơi túi.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-dat-ma-khong-co": {
      "id": "c-dat-ma-khong-co",
      "tieuDe": "Sổ đặt hàng so với kiểm kê",
      "deBai": "Nối sổ đặt hàng với bảng kiểm kê của Nam. Đơn nào đặt mua thứ mà trong kho đang là số không?",
      "manhMoiLienQuan": [
        "clue-so-luong-co-0"
      ],
      "mucTieuHoc": "Ôn nối bảng với một bảng mới, khóa nối là tên linh kiện; lọc trên cột của bảng thứ hai.",
      "soDongKyVong": 3,
      "sqlChuan": "SELECT ma_don, nguoi_dat, so_tien, so_luong_co FROM don_linh_kien JOIN kiem_ke ON don_linh_kien.linh_kien = kiem_ke.linh_kien WHERE so_luong_co = 0;",
      "bangNoi": [
        "kiem_ke"
      ],
      "bangChon": [
        "don_linh_kien",
        "kiem_ke"
      ],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "loi-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Máy báo không có cột đó. Số lượng trong kho nằm ở bảng kiểm kê, nối rồi mới lọc được."
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
              "text": "Không dòng nào. Kho không có thì bảng kiểm kê ghi số 0, giấy nhớ cũng là số 0."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 156
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ, một trăm năm mươi sáu đơn. Mình chỉ cần thứ trong kho đang là số không."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "nam",
              "expression": "neutral",
              "text": "Ba đơn. Đúng ba đơn mang tên anh."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-dat-ma-khong-co",
        "title": "Ba đơn đặt mua thứ không có trong kho",
        "description": "Kết quả nối sổ đặt hàng với kiểm kê: động cơ servo, mạch điều khiển, khung nhôm — ba đơn đứng tên Nam từ máy văn phòng xưởng, ghi đã duyệt, mà kho không có một cái. Tiền có thật sự xuất khỏi quỹ nào thì phải xem sổ quỹ.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-chi-tham-tu": {
      "id": "c-chi-tham-tu",
      "tieuDe": "Sổ chi nối với bảng quỹ",
      "deBai": "Sổ chi ghi mã quỹ; bảng quỹ cho biết mã nào là quỹ của CLB nào. Khoản chi nào ghi vào quỹ CLB Thám Tử?",
      "manhMoiLienQuan": [
        "clue-quy-tham-tu"
      ],
      "mucTieuHoc": "Nối theo mã quỹ rồi lọc theo cột của bảng quỹ; ghim thành phiếu để gom.",
      "soDongKyVong": 6,
      "sqlChuan": "SELECT ma_chi, ma_don, so_tien, nguoi_duyet, ngay_chi FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';",
      "bangNoi": [
        "quy"
      ],
      "bangChon": [
        "khoan_chi",
        "quy"
      ],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "loi-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Máy báo không có cột đó. Tên CLB nằm ở bảng quỹ, nối rồi mới lọc được."
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
              "text": "Không dòng nào. Mã CLB viết hoa, gạch dưới, đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 200
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ chi các CLB, hai trăm khoản. Mình chỉ cần quỹ CLB mình."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Sáu khoản. Ba khoản chị duyệt, ba khoản chị chưa từng thấy."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-chi-tham-tu",
        "title": "Sáu khoản chi ghi vào quỹ CLB Thám Tử",
        "description": "Kết quả nối sổ chi với bảng quỹ: sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản văn phòng phẩm nhỏ do Minh Anh duyệt; ba khoản lớn gắn với ba đơn linh kiện, người duyệt ghi là Khánh, xuất ngày 10, 11 và 12 tháng 9.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-chi-theo-nguoi-duyet": {
      "id": "c-chi-theo-nguoi-duyet",
      "tieuDe": "Khoản chi gom theo người duyệt",
      "deBai": "Lấy phiếu sáu khoản làm nguồn. Gom theo người duyệt: đếm số khoản, tính tổng số tiền.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Tổng trên mỗi nhóm (SUM): đếm dòng chưa nói hết, phải cộng tiền.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-chi-tham-tu",
      "nhomTheo": null,
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-chi-theo-nguoi-duyet",
        "title": "Minh Anh 3 khoản, 450.000; Khánh 3 khoản, 2.400.000",
        "description": "Kết quả gom theo người duyệt: Minh Anh ba khoản, tổng 450.000; Khánh ba khoản, tổng 2.400.000. Cùng số khoản, tiền gấp hơn năm lần.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-chi-vuot-muc": {
      "id": "c-chi-vuot-muc",
      "tieuDe": "Chỉ giữ nhóm vượt ngưỡng giải trình",
      "deBai": "Gom theo người duyệt như vừa rồi, tính thêm trung bình mỗi khoản, nhưng chỉ giữ nhóm có tổng lớn hơn một triệu.",
      "manhMoiLienQuan": [
        "clue-han-muc"
      ],
      "mucTieuHoc": "Trung bình trên nhóm (AVG) và lọc nhóm sau khi gom (HAVING): điều kiện đặt lên con số của cả nhóm, không lên từng dòng.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien, AVG(so_tien) AS tb_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet HAVING SUM(so_tien) > 1000000;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-chi-tham-tu",
      "nhomTheo": null,
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-chi-vuot-muc",
        "title": "Khánh: 3 khoản, tổng 2.400.000, trung bình 800.000",
        "description": "Kết quả lọc nhóm: chỉ Khánh có tổng chi từ quỹ CLB Thám Tử vượt ngưỡng giải trình một triệu (2.400.000 cho ba khoản). Trung bình 800.000 một khoản; phiếu sáu khoản cho thấy từng khoản (800.000, 900.000, 700.000) đều dưới một triệu, mức chủ tịch Hội duyệt thẳng được. Ba khoản ấy là ba đơn linh kiện không có hàng.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-tin-bang": {
      "id": "c-tin-bang",
      "tieuDe": "Lọc bằng",
      "deBai": "Kênh sinh viên chuyền nhau câu tin đồn. Thử tìm xem có tin nào giống hệt câu đó không?",
      "manhMoiLienQuan": [
        "clue-noi-dung-tin"
      ],
      "mucTieuHoc": "Dùng phép = với chuỗi dài.",
      "cotNop": [
        "ma_tin"
      ],
      "soDongKyVong": 0,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung = 'CLB Thám Tử soi dữ liệu sinh viên';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 340
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả ba trăm bốn mươi tin của kênh từ tối qua. Có cả tin tìm ví với tin pass giáo trình."
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-cot-nop"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Mình cần tìm mã tin để nộp."
            }
          ]
        },
        {
          "khi": {
            "kind": "thua-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Thừa cột rồi. Chỉ lấy mã tin, thời điểm, tài khoản, loại và nội dung thôi."
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
              "expression": "thinking",
              "text": "Không có dòng nào. \"Bằng\" thì phải khớp y hệt cả câu; tin đồn chắc còn đoạn sau."
            }
          ]
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-tin-bat-dau": {
      "id": "c-tin-bat-dau",
      "tieuDe": "Bắt đầu bằng",
      "deBai": "Có thể người ta viết thêm nội dung phía sau. Tìm những tin bắt đầu bằng câu đó.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Dùng LIKE và % ở cuối chuỗi.",
      "cotNop": [
        "ma_tin"
      ],
      "soDongKyVong": 5,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu sinh viên%';",
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
              "expression": "gai-dau",
              "text": "Trắng bóc. Có khi nào người ta thêm chữ đằng trước không?"
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-cot-nop"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Chọn nhầm cột rồi, cậu chọn lại cột mã tin nhé."
            }
          ]
        },
        {
          "khi": {
            "kind": "thua-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Vẫn thừa cột."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "chi-tay",
              "text": "Có 5 tin! Bắt đầu lòi ra rồi."
            }
          ]
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-tin-chua": {
      "id": "c-tin-chua",
      "tieuDe": "Có chứa",
      "deBai": "Nhỡ ai đó viết thêm từ ở phía trước thì sao? Tìm những tin có chứa đoạn \"CLB Thám Tử soi\".",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Dùng LIKE và % ở cả hai đầu chuỗi.",
      "cotNop": [
        "ma_tin"
      ],
      "soDongKyVong": 8,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%CLB Thám Tử soi%';",
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
              "expression": "gai-dau",
              "text": "Trắng trơn. Cậu gõ đúng cụm ấy chưa?"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Vẫn năm tin ban nãy. Thế này thì tin nào có chữ đằng trước vẫn lọt mất."
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-cot-nop"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Cậu chưa chọn đúng cột mã tin kìa."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Lên tám tin. Nhìn kỹ xem, có tin không phải câu ấy."
            }
          ]
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-tin-sach": {
      "id": "c-tin-sach",
      "tieuDe": "Chứa cả đoạn dài",
      "deBai": "Tin chuyện khác cũng nhắc tới CLB. Tìm các tin có chứa đoạn \"soi dữ liệu sinh viên\", dù người gõ thêm chữ đằng trước hay đằng sau.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Chọn đoạn đủ dài cho LIKE '%…%' để bỏ tin chuyện khác mà vẫn giữ tin gõ thêm chữ.",
      "cotNop": [
        "ma_tin"
      ],
      "soDongKyVong": 7,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%soi dữ liệu sinh viên%';",
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
              "expression": "gai-dau",
              "text": "Lại trắng. Cậu chép đúng cả đoạn ấy chưa? (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 8
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Vẫn tám dòng, vẫn còn tin chuyện điểm. Đoạn này ngắn quá, tin nào nhắc tới CLB cũng dính. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Năm tin, hai tin gõ trả lời đâu mất rồi? Đoạn cần tìm nằm giữa câu của người ta cơ mà. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-cot-nop"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Đừng vội, nộp đúng cột mã tin đã."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "minh-anh",
              "expression": "serious",
              "text": "Bảy tin. Lòi ra thêm hai tài khoản lạ."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-don",
        "title": "Các tin mang câu tin đồn",
        "description": "Kết quả truy vấn: nhiều tin chép lại cùng một câu, từ các tài khoản khác nhau. Phiếu chưa nói tin nào có trước.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-tin-in": {
      "id": "c-tin-in",
      "tieuDe": "Một trong mấy giá trị",
      "deBai": "Trong các tin mới tìm thấy, có hai tài khoản lạ. Lọc xem có tin nào gửi từ một trong hai tài khoản đó không?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Sử dụng IN cho danh sách giá trị.",
      "cotNop": [
        "ma_tin"
      ],
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE tai_khoan IN ('SV240201', 'SV240207');",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Chắc gõ sai mã sinh viên."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 7
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Vẫn cả bảy tin ban nãy. Mình chỉ cần tin của hai mã kia thôi."
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-cot-nop"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Nộp nhầm cột rồi."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "chi-tay",
              "text": "Đây rồi! Đúng là hai cái mã này."
            }
          ]
        }
      ],
      "vatChung": null,
      "ghiChu": []
    },
    "c-tin-goc": {
      "id": "c-tin-goc",
      "tieuDe": "Tin gốc của tin đồn",
      "deBai": "Bỏ qua các tin chuyển tiếp, tìm duy nhất tin gốc từ những tin chép lại.",
      "manhMoiLienQuan": [
        "clue-tin-goc"
      ],
      "mucTieuHoc": "Kết hợp điều kiện VÀ.",
      "cotNop": [
        "ma_tin"
      ],
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%soi dữ liệu sinh viên%' AND loai = 'GOC';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không ra tin nào."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 7
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Bảy tin này lẫn cả tin bấm chuyển với tin trả lời. Giữ riêng tin tự viết thôi chứ."
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
              "text": "Hai tin tự viết, mà một tin là chuyện điểm. Đoạn cậu tìm ngắn quá rồi. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-cot-nop"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Nhớ chọn cột mã tin."
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
              "expression": "thinking",
              "text": "Còn lại đúng một tin. Đây chính là gốc gác của tin đồn."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-goc",
        "title": "Tin gốc: 22:40 tối 07/10",
        "description": "Kết quả truy vấn bảng gốc: một tin gốc, gửi 22:40 thứ Hai 07/10 từ tài khoản clb_robotics. Phiếu cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi.",
        "giaTri": [
          "clb_robotics"
        ]
      },
      "ghiChu": []
    },
    "c-tin-may": {
      "id": "c-tin-may",
      "tieuDe": "Nhật ký đăng nhập của kênh",
      "deBai": "Trong ngày tin được gửi, tài khoản kênh của Robotics đăng nhập những lần nào, từ máy nào?",
      "manhMoiLienQuan": [
        "clue-ngay-gui"
      ],
      "mucTieuHoc": "Dùng giá trị trên phiếu trước làm điều kiện cho bảng khác.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Giá trị này có đang nằm đúng cột của nó không nhỉ?"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 21
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Hai mươi mốt lần, của kênh suốt ba tuần. Mình cần đúng ngày mùng 7."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 42
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Bốn mươi hai lần trong ngày mùng 7, của đủ mọi tài khoản. Mình cần đúng tài khoản kênh Robotics."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1007
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Hơn một nghìn lần đăng nhập, của mọi tài khoản trong ba tuần."
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
              "text": "Hai lần trong ngày mùng 7. 15 giờ 10 từ máy xưởng số 2, 22 giờ 31 từ máy văn phòng xưởng."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-may",
        "title": "Hai lần đăng nhập ngày 07/10",
        "description": "Kết quả truy vấn: tài khoản clb_robotics đăng nhập 15:10 từ máy xưởng số 2 và 22:31 từ máy văn phòng xưởng. Tin gốc gửi lúc 22:40. Phiếu cho biết máy nào, chưa cho biết ai ngồi máy.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-tin-xuong": {
      "id": "c-tin-xuong",
      "tieuDe": "Sổ đặt phòng nhà văn hóa",
      "deBai": "Sổ đặt phòng của nhà văn hóa; mã phòng do người đặt tự gõ. Xưởng Robotics là phòng XR-01. Ngày 07/10 xưởng được đặt những buổi nào, cho việc gì?",
      "manhMoiLienQuan": [
        "clue-ngay-gui"
      ],
      "mucTieuHoc": "Làm sạch chữ gõ tay trước khi so bằng: LOWER và TRIM (bỏ cái nào cũng thiếu dòng).",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ngay, ma_phong, tu_gio, den_gio, muc_dich FROM dat_phong WHERE ngay = '2024-10-07' AND LOWER(TRIM(ma_phong)) = 'xr-01';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Mất cả buổi chiều lẫn buổi tối. Mã phòng trong sổ mỗi người gõ một kiểu, cậu nhìn lại từng dòng xem. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "chi-tay",
              "text": "Chỉ có buổi chiều sửa bàn hàn! Tối thứ Hai không ai đặt xưởng à? Thế anh Nam bảo đội ở lại tập là sao? (tạm)"
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Hoặc là có, mà người đặt gõ mã phòng khác cậu. Sổ này ai cũng tự gõ trên điện thoại. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 4
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Bốn buổi trong ngày mùng 7, đủ các phòng. Xưởng là XR-01 thôi. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 11
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Mười một buổi của xưởng trong hai tuần. Mình chỉ cần ngày mùng 7. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 20
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ đặt phòng nhà văn hóa hai tuần. Mình chỉ cần xưởng, ngày mùng 7. (tạm)"
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Hai dòng: chiều mùng 7 sửa bàn hàn, tối 19 giờ tới 23 giờ đội thi đấu tập. Dòng tối gõ mã phòng kiểu khác hẳn. (tạm)"
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-xuong",
        "title": "Tối 07/10 xưởng mở tới 23 giờ",
        "description": "Kết quả truy vấn sổ đặt phòng: thứ Hai 07/10, xưởng đặt chiều 14:00–17:00 sửa bàn hàn và tối 19:00 tới 23:00 cho đội thi đấu tập (dòng tối gõ mã phòng kiểu khác). Đây là lịch đăng ký, chưa cho biết ai thật sự có mặt.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-bai-dang": {
      "id": "c-bai-dang",
      "tieuDe": "Bài đăng của các kênh CLB",
      "deBai": "Bản xuất bài đăng của mọi kênh trong trường, chín ngày đầu tháng 10. Kênh Robotics đăng những bài nào?",
      "manhMoiLienQuan": [
        "clue-kenh-robotics"
      ],
      "mucTieuHoc": "Lọc ra một tập để ghim thành phiếu, chuẩn bị nhóm và đếm.",
      "soDongKyVong": 9,
      "sqlChuan": "SELECT ma_bai, ngay, buoi, thiet_bi FROM bai_dang_kenh WHERE kenh = 'clb_robotics';",
      "chonCot": [],
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Giá trị này có đang nằm đúng cột của nó không nhỉ?"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 301
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Bài của mọi kênh trong trường, ba trăm lẻ một bài. Mình chỉ cần kênh Robotics."
            }
          ]
        },
        {
          "khi": {
            "kind": "thieu-cot"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Chín bài đúng rồi, nhưng lát nữa phải gom theo thiết bị gửi. Lấy mã bài, ngày, buổi và thiết bị."
            }
          ]
        },
        {
          "khi": {
            "kind": "thua-cot"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Thừa cột. Tên kênh thì chín dòng như một, ghi làm gì. Mã bài, ngày, buổi, thiết bị là đủ."
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
              "text": "Chín bài. Ghim lại đã, rồi mình nhóm."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-bai-dang",
        "title": "Chín bài của kênh Robotics",
        "description": "Kết quả truy vấn: chín bài kênh Robotics đăng trong tháng 10, mỗi bài ghi ngày, buổi và thiết bị gửi.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-bai-thiet-bi": {
      "id": "c-bai-thiet-bi",
      "tieuDe": "Bài đăng nhóm theo thiết bị",
      "deBai": "Lấy phiếu chín bài làm nguồn. Gom theo thiết bị gửi, đếm mỗi nhóm bao nhiêu bài: kênh này hay đăng từ đâu?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Nhóm và đếm (GROUP BY, COUNT): cách nhóm quyết định mình thấy gì.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT thiet_bi, COUNT(*) AS so_dong FROM @ev-bai-dang GROUP BY thiet_bi;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-bai-dang",
      "nhomTheo": "thiet_bi",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-bai-thiet-bi",
        "title": "8 bài từ điện thoại trực, 1 bài từ máy văn phòng",
        "description": "Kết quả nhóm theo thiết bị: 8 bài gửi từ điện thoại trực kênh (Nam giữ), 1 bài gửi từ máy văn phòng xưởng. Bài tin đồn là bài duy nhất khác thói quen đăng của kênh.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-nam-thu-vien": {
      "id": "c-nam-thu-vien",
      "tieuDe": "Bản ghi quẹt thẻ thư viện",
      "deBai": "Bản ghi cửa từ thư viện của các thành viên tải về từ cổng sinh viên, gộp chung một tệp. Nam vào thư viện những ngày nào?",
      "manhMoiLienQuan": [
        "clue-ten-nam"
      ],
      "mucTieuHoc": "Lọc theo tên để ghim thành phiếu riêng của một người.",
      "soDongKyVong": 32,
      "sqlChuan": "SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Nam';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Tên trên bản ghi viết đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 72
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả tệp, bảy mươi hai lượt quẹt thẻ của cả mấy người từ trước tới giờ. Mình cần riêng của anh Nam."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "nam",
              "expression": "neutral",
              "text": "Ba mươi hai lần. Đúng là của anh từ năm ngoái tới giờ."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-nam-thu-vien",
        "title": "Ba mươi hai lần Nam quẹt thẻ thư viện",
        "description": "Kết quả truy vấn: ba mươi hai lần Nam vào thư viện từ năm ngoái đến nay, có ngày, thứ, giờ vào, giờ ra.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-nam-thu": {
      "id": "c-nam-thu",
      "tieuDe": "Thói quen của Nam, nhóm theo thứ",
      "deBai": "Lấy phiếu năm lần làm nguồn. Gom theo thứ trong tuần, đếm mỗi thứ mấy lần: Nam hay đi thư viện vào thứ mấy?",
      "manhMoiLienQuan": [],
      "mucTieuHoc": "Nhóm theo thứ trong tuần: thói quen là thứ đếm được.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT thu, COUNT(*) AS so_dong FROM @ev-nam-thu-vien GROUP BY thu;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-nam-thu-vien",
      "nhomTheo": "thu",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-nam-thu",
        "title": "Nam: tối thứ Hai 27 lần, thứ Năm 5 lần",
        "description": "Kết quả nhóm theo thứ: hai mươi bảy tối thứ Hai Nam đều ở thư viện từ lúc vào trường. Một thói quen bền bỉ đếm được; chưa phải bằng chứng cho riêng tối 07/10.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-toi-07": {
      "id": "c-toi-07",
      "tieuDe": "Thư viện tối 07/10",
      "deBai": "Trên bản ghi quẹt thẻ, tối 07/10 có ai, vào và ra lúc mấy giờ?",
      "manhMoiLienQuan": [
        "clue-toi-07"
      ],
      "mucTieuHoc": "Từ thói quen quay về một tối cụ thể: lọc đúng ngày.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Ngày trên bản ghi viết dạng năm-tháng-ngày."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Một dòng thôi à? Tối đó tớ cũng ở đấy mà."
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
              "expression": "gai-dau",
              "text": "Ba mươi hai lần. Mình chỉ cần tối mùng 7."
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
              "expression": "smile",
              "text": "Hai dòng. Tối mùng 7, cả hai đứa."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-toi-07",
        "title": "Tối 07/10: Hà Vy 20:00–23:00, Nam 21:50–23:05",
        "description": "Kết quả truy vấn: tối 07/10 Hà Vy quẹt thẻ vào 20:00, ra 23:00; Nam vào 21:50, ra 23:05. Tin gốc gửi lúc 22:40. Nguồn độc lập của thư viện, có giờ vào giờ ra.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-vy-thu-vien": {
      "id": "c-vy-thu-vien",
      "tieuDe": "Bản ghi quẹt thẻ của Hà Vy",
      "deBai": "Hà Vy vào thư viện những ngày nào?",
      "manhMoiLienQuan": [
        "clue-ten-vy"
      ],
      "mucTieuHoc": "Ôn lọc theo tên; thói quen của người làm chứng cũng phải đếm được (thẻ hỗ trợ ở đối chất).",
      "soDongKyVong": 5,
      "sqlChuan": "SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Hà Vy';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Tên tớ trên bản ghi có dấu cách, viết đúng như giấy nhớ."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 72
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả tệp. Mình cần riêng của Hà Vy."
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
              "text": "Năm lần. Bốn tối thứ Hai."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-vy-thu-vien",
        "title": "Năm lần Hà Vy quẹt thẻ thư viện",
        "description": "Kết quả truy vấn: bốn tối thứ Hai và một tối thứ Tư. Thói quen của Hà Vy trùng với thói quen của Nam.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "v2-loc-buoi": {
      "id": "v2-loc-buoi",
      "tieuDe": "Sổ sử dụng phòng tháng 10",
      "deBai": "Tháng 10, phòng CLB có những buổi nào đã ký xác nhận? Xếp theo ngày để dò với sổ giấy.",
      "manhMoiLienQuan": [
        "clue-ma-phong-clb",
        "clue-da-xac-nhan"
      ],
      "mucTieuHoc": "Gọt dữ liệu nhập tay về cùng một kiểu trước khi so (TRIM, LOWER); xếp kết quả theo một cột (ORDER BY).",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN' ORDER BY ngay;",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không dòng nào. Giá trị này có đang nằm đúng cột của nó không nhỉ?"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "surprised",
              "text": "Một buổi? Cả tháng 10 mình sinh hoạt có một buổi thôi á?"
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Dòng này mã phòng viết y hệt tờ giấy nhớ. Mấy dòng kia viết khác đi một tí."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 2,
            "cot": [
              "ma_phong"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Hai dòng viết đúng từng chữ như giấy nhớ. Mà một dòng trong đó mới là dự kiến."
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
              "speaker": "duy",
              "expression": "neutral",
              "text": "Hai buổi thôi à? Sổ giấy anh đếm được nhiều hơn."
            },
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Mới bắt được một kiểu viết lệch. Vẫn còn kiểu khác."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 3
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ba dòng. Vẫn còn kiểu viết lệch chưa bắt được. Mà trong này có dòng nào chưa ký không?"
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 5
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "serious",
              "text": "Buổi 30/10 vẫn ghi dự kiến. Chưa ai ký xác nhận."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 182
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "neutral",
              "text": "Một trăm tám mươi hai dòng đã ký, của đủ mọi phòng trong nhà văn hóa. Mình cần riêng phòng mình."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 267
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ, hai trăm sáu mươi bảy dòng. Đủ mọi phòng, có cả buổi chưa ai ký."
            }
          ]
        },
        {
          "khi": {
            "kind": "sai-thu-tu"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "neutral",
              "text": "Đủ bốn buổi rồi. Nhưng sổ giấy ghi lần lượt từ đầu tháng, thứ tự này anh dò từng dòng không kịp."
            }
          ]
        },
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "duy",
              "expression": "smile",
              "text": "Bốn buổi, từ mùng 2 tới 23, đúng thứ tự trong sổ. Để anh dò."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-v2-activities",
        "title": "Bốn buổi đã ký của phòng CLB",
        "description": "Kết quả truy vấn: BUOI-02 (02/10, họp thành viên), BUOI-04 (09/10, ôn SQL), BUOI-06 (16/10, kiểm kê hồ sơ), BUOI-08 (23/10, hướng dẫn tân thành viên). Bản ghi chỉ nói có bốn mục đã ký; không nói ai tới dự.",
        "giaTri": []
      },
      "ghiChu": [
        "Đường \"sai có ích\": [clb-tham-tu] vào ma_phong, [DA_XAC_NHAN] vào trang_thai, so y nguyên → 1 dòng. Gọt dấu cách → 2. Thêm chữ thường → 4, chưa xếp → \"sai thứ tự\". Xếp theo ngay → đúng."
      ]
    }
  },
  "hoSo": {
    "clue-chu-ky-h": {
      "id": "clue-chu-ky-h",
      "loai": "clue",
      "heading": "[H]",
      "fields": {
        "Tiêu đề": "Chữ ký tay (chỉ đọc được chữ H)",
        "Ảnh": "doc-chu-ky-h",
        "Giá trị cho trình dựng": "H",
        "Nguồn": "Bản chụp thư đã che thông tin, Phòng CTSV chuyển về",
        "Nội dung": "Chữ ký tay trên phiếu gửi: chữ H viết hoa rõ, phần sau là một nét lượn không đọc được; kèm dòng \"đề nghị phản hồi chính thức\". Không tên, không mã trên thư."
      },
      "quotes": {}
    },
    "clue-toa-b": {
      "id": "clue-toa-b",
      "loai": "clue",
      "heading": "[Tòa B]",
      "fields": {
        "Tiêu đề": "Hộp tòa B, mở 9h sáng thứ Hai",
        "Giá trị cho trình dựng": "B",
        "Nguồn": "Lời bác Thịnh, sảnh tòa B",
        "Nội dung": "Bác Thịnh và cô Lan mở hộp 9h sáng thứ Hai; thư nằm trên cùng. Từ 7 giờ tới lúc mở hộp, ra vào tòa B chỉ có sinh viên các lớp sinh hoạt ở tòa này."
      },
      "quotes": {}
    },
    "clue-bao-chi-k24": {
      "id": "clue-bao-chi-k24",
      "loai": "clue",
      "heading": "[Báo chí K24]",
      "fields": {
        "Tiêu đề": "Thẻ lịch khoa Báo chí K24 mắc ở khe hộp",
        "Giá trị cho trình dựng": "Báo chí · K24",
        "Nguồn": "Khe hộp kiến nghị, sảnh tòa B",
        "Nội dung": "Phần in còn nguyên \"Khoa Báo chí – Truyền thông · K24\"; dòng viết tay \"Họ tên / Lớp\" bị xé mất. Còn biết chủ thẻ học khoa Báo chí; lớp nào thì không."
      },
      "quotes": {}
    },
    "clue-quyen-du-lieu": {
      "id": "clue-quyen-du-lieu",
      "loai": "clue",
      "heading": "[Tài khoản CLB]",
      "fields": {
        "Tiêu đề": "Tài khoản CLB",
        "Nguồn": "Cô Hạnh, Phòng Đào tạo",
        "Nội dung": "Tài khoản clb_tham_tu trên laptop CLB chỉ xem được bảng lớp sinh hoạt: mã lớp, ngành, khóa, tòa nhà. Bảng có thông tin cá nhân phải có phiếu yêu cầu tra cứu. Tra gì máy cũng ghi lại."
      },
      "quotes": {}
    },
    "clue-can-ma-va-can-cu": {
      "id": "clue-can-ma-va-can-cu",
      "loai": "clue",
      "heading": "[Cần mã và căn cứ]",
      "fields": {
        "Tiêu đề": "Cần mã và căn cứ",
        "Nguồn": "Quy chế phiếu gửi, Phòng CTSV",
        "Nội dung": "Cô Lan chỉ trả lời có/không cho một mã cụ thể khi có căn cứ bằng văn bản."
      },
      "quotes": {}
    },
    "clue-phieu-tra-cuu": {
      "id": "clue-phieu-tra-cuu",
      "loai": "clue",
      "heading": "[Phiếu tra cứu]",
      "fields": {
        "Tiêu đề": "Phiếu yêu cầu tra cứu",
        "Nguồn": "Cô Lan ký, Quân giám sát, Phòng CTSV",
        "Nội dung": "Cô Lan ký, anh Quân (Hội sinh viên) ký giám sát. Căn cứ: hai lớp BC24A, BC23A. Mở bảng sinh viên, bốn cột: mã, họ đệm, tên, mã lớp. Chỉ để lập căn cứ; tra sổ niêm phong là việc của cô Lan."
      },
      "quotes": {}
    },
    "clue-loi-chu-cuong": {
      "id": "clue-loi-chu-cuong",
      "loai": "clue",
      "heading": "[Lời chú Cường]",
      "fields": {
        "Tiêu đề": "Phong bì nâu trao tay 6:45 sáng thứ Hai",
        "Nguồn": "Chú Cường, cổng KTX",
        "Nội dung": "Một cậu sinh viên, balo đeo huy hiệu bánh răng của CLB Robotics, đưa phong bì nâu cho một bạn nữ; bạn nữ cầm rồi đi thẳng về phía tòa B. Chú không nhìn rõ mặt, chỉ nhớ cái huy hiệu sứt mất một răng."
      },
      "quotes": {}
    },
    "clue-hoai-nguoi-nop": {
      "id": "clue-hoai-nguoi-nop",
      "loai": "clue",
      "heading": "[Hoài là người nộp]",
      "fields": {
        "Tiêu đề": "Sổ niêm phong: SV240317 có, SV240228 không",
        "Ảnh": "doc-so-niem-phong-trang",
        "Loại trừ": "ev-hai-ma",
        "Gạch": "SV240228",
        "Nguồn": "Cô Lan tra sổ niêm phong hộp kiến nghị, Phòng CTSV",
        "Nội dung": "Nguồn độc lập cho biết ai là người nộp; chưa cho biết ai viết."
      },
      "quotes": {}
    },
    "clue-ten-tep": {
      "id": "clue-ten-tep",
      "loai": "clue",
      "heading": "[Tên tệp]",
      "fields": {
        "Tiêu đề": "Chân trang lá thư: tên tệp",
        "Giá trị cho trình dựng": "kien-nghi",
        "Nguồn": "Cô Hạnh, Phòng Đào tạo",
        "Nội dung": "Bản in từ máy phòng máy có dòng chân trang ghi tên tệp. Chân trang bản chụp lá thư bị xén, chỉ đọc được đoạn đầu: \"kien-nghi-…\"."
      },
      "quotes": {}
    },
    "clue-loi-nhan-linh-1": {
      "id": "clue-loi-nhan-linh-1",
      "loai": "clue",
      "heading": "[Mẩu giấy trong sổ]",
      "fields": {
        "Tiêu đề": "Mẩu giấy rơi ra từ sổ CLB",
        "Nguồn": "Rơi ra từ cuốn sổ của CLB, phòng CLB",
        "Nội dung": "Mực xanh đã ngả màu, không rõ chữ ai, một dòng: \"Căn phòng này giữ nhiều hơn em nghĩ.\" Không ghi ngày, không ghi gửi cho ai."
      },
      "quotes": {}
    },
    "doc-the-lich-cua-toi": {
      "id": "doc-the-lich-cua-toi",
      "loai": "doc",
      "heading": "Thẻ lịch của khoa mình",
      "fields": {
        "Tiêu đề": "Thẻ lịch Tuần sinh hoạt công dân",
        "Ảnh": "doc-the-lich-cua-toi",
        "Nguồn": "Phát ở tuần sinh hoạt công dân",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Phần in theo khoa; dòng viết tay \"Họ tên / Lớp\"."
        ]
      }
    },
    "doc-so-chi-linh": {
      "id": "doc-so-chi-linh",
      "loai": "doc",
      "heading": "Sổ CLB",
      "fields": {
        "Tiêu đề": "Cuốn sổ của CLB, truyền từ khóa trước",
        "Ảnh": "doc-so-chi-linh",
        "Nguồn": "Ngăn dưới tủ hồ sơ phòng CLB",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "\"Kiểm hai lần, kết luận một lần.\""
        ]
      }
    },
    "doc-bao-cao-yeu": {
      "id": "doc-bao-cao-yeu",
      "loai": "doc",
      "heading": "Báo cáo năm ngoái",
      "fields": {
        "Tiêu đề": "Báo cáo hoạt động năm ngoái",
        "Ảnh": "doc-bao-cao-yeu",
        "Nguồn": "Tủ hồ sơ phòng CLB",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "CLB Thám Tử Dữ Liệu: hoạt động yếu."
        ]
      }
    },
    "doc-thu-che": {
      "id": "doc-thu-che",
      "loai": "doc",
      "heading": "Bản chụp thư đã che thông tin",
      "fields": {
        "Tiêu đề": "Lá thư (bản chụp, đã che)",
        "Ảnh": "doc-la-thu-nac-danh",
        "Nguồn": "Phòng CTSV chuyển về",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử, vì CLB không còn giải quyết được việc gì. Đề nghị Phòng phản hồi chính thức.",
          "Ký: (chữ ký tay — chữ H viết hoa rõ, phần sau là một nét lượn dài, không đọc được)",
          "Chân trang (chữ in nhỏ, bản chụp bị xén mất nửa): kien-nghi-…"
        ]
      }
    },
    "doc-thong-bao-hop": {
      "id": "doc-thong-bao-hop",
      "loai": "doc",
      "heading": "Thông báo lịch họp rà soát",
      "fields": {
        "Tiêu đề": "Thông báo họp rà soát phòng CLB",
        "Ảnh": "doc-thong-bao-hop",
        "Nguồn": "Dán cạnh hộp kiến nghị, sảnh tòa B",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Họp rà soát phòng sinh hoạt CLB: 16:00 thứ Hai 30/09/2024."
        ]
      }
    },
    "doc-van-ban-thay-quang": {
      "id": "doc-van-ban-thay-quang",
      "loai": "doc",
      "heading": "Văn bản cho phép lập căn cứ",
      "fields": {
        "Tiêu đề": "Văn bản của Thầy Quang",
        "Ảnh": "doc-van-ban-thay-quang",
        "Nguồn": "Phòng Đào tạo",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "CLB chỉ lập danh sách mã ứng viên kèm căn cứ; cô Lan tự tra sổ. Tài khoản CLB chỉ xem bảng lớp; bảng khác cần phiếu yêu cầu tra cứu của Phòng CTSV."
        ]
      }
    },
    "ev-the-lich": {
      "id": "ev-the-lich",
      "loai": "ev",
      "heading": "Thẻ lịch rách",
      "fields": {
        "Tiêu đề": "Thẻ lịch khoa Báo chí K24, rách dòng viết tay",
        "Ảnh": "doc-the-lich-rach",
        "Nội dung": "Mắc ở mép tôn khe hộp. Chưa chứng minh chủ thẻ là người bỏ thư."
      },
      "quotes": {}
    },
    "clue-tra-da-1": {
      "id": "clue-tra-da-1",
      "loai": "clue",
      "heading": "[Cậu trà nóng và cái tủ sắt]",
      "fields": {
        "Tiêu đề": "Chuyện bà bán trà đá kể, lần một",
        "Nguồn": "Lời kể của Bà bán trà đá, quán trà đá cổng trường",
        "Nội dung": "Phòng CLB từng là kho chổi. Một sinh viên xin được chìa, tự khuân cái tủ sắt lên, chiều nào cũng ra quán ngồi ghi chép, hè cũng gọi trà nóng. Bà không nhớ tên. Lời kể, chưa đối chiếu."
      },
      "quotes": {}
    },
    "clue-tra-da-2": {
      "id": "clue-tra-da-2",
      "loai": "clue",
      "heading": "[Hai cuốn sổ]",
      "fields": {
        "Tiêu đề": "Chuyện bà bán trà đá kể, lần hai",
        "Nguồn": "Lời kể của Bà bán trà đá, quán trà đá cổng trường",
        "Nội dung": "\"Cậu trà nóng\" có hai cuốn sổ, ngồi chép từ cuốn bìa cứng đã sờn sang cuốn mới suốt một tháng. Lý do cậu ấy nói: cuốn cũ có chỗ không muốn người sau chép theo. Lời kể, chưa đối chiếu."
      },
      "quotes": {}
    },
    "clue-tra-da-3": {
      "id": "clue-tra-da-3",
      "loai": "clue",
      "heading": "[Một kết luận sai, một cốc trà xin lỗi]",
      "fields": {
        "Tiêu đề": "Chuyện bà bán trà đá kể, lần ba",
        "Nguồn": "Lời kể của Bà bán trà đá, quán trà đá cổng trường",
        "Nội dung": "\"Cậu trà nóng\" từng kết luận sai cho một người, cả câu lạc bộ tin theo. Hôm sau cậu ấy dẫn người đó ra quán, mời trà, xin lỗi, rồi gạch một chỗ trong sổ mạnh tới rách giấy. Lời kể, chưa đối chiếu."
      },
      "quotes": {}
    },
    "clue-tra-da-4": {
      "id": "clue-tra-da-4",
      "loai": "clue",
      "heading": "[\"Căn cứ vào đâu?\"]",
      "fields": {
        "Tiêu đề": "Chuyện bà bán trà đá kể, lần bốn",
        "Nguồn": "Lời kể của Bà bán trà đá, quán trà đá cổng trường",
        "Nội dung": "\"Cậu trà nóng\" giờ làm việc ngay trong trường, sơ mi cài kín cổ, tóc muối tiêu, vẫn gọi trà nóng. Câu cửa miệng: \"Căn cứ vào đâu?\" Bà không nhớ tên. Một lời kể và một câu cửa miệng chưa đủ để ghim tên ai."
      },
      "quotes": {}
    },
    "doc-tin-don": {
      "id": "doc-tin-don",
      "loai": "doc",
      "heading": "Ảnh chụp tin đồn",
      "fields": {
        "Tiêu đề": "Tin đang lan trên kênh sinh viên",
        "Ảnh": "doc-tin-don",
        "Nguồn": "Cô Lan chuyển cho Minh Anh",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "\"CLB Thám Tử soi dữ liệu sinh viên\"",
          "Kênh sinh viên Chấn Hưng. Tin được chuyển tiếp nhiều lần từ tối thứ Hai 07/10."
        ]
      }
    },
    "clue-noi-dung-tin": {
      "id": "clue-noi-dung-tin",
      "loai": "clue",
      "heading": "[Câu tin đồn]",
      "fields": {
        "Tiêu đề": "Mấy chữ đầu của tin đồn",
        "Giá trị cho trình dựng": "CLB Thám Tử soi dữ liệu",
        "Nguồn": "Ảnh chụp tin, Phòng CTSV chuyển về",
        "Nội dung": "Tin bấm chuyển nào cũng mở đầu bằng mấy chữ này, nguyên văn, phần sau có thể dài hơn. Tin người ta gõ tay thì có thể thêm chữ đằng trước, đằng sau."
      },
      "quotes": {}
    },
    "clue-tin-goc": {
      "id": "clue-tin-goc",
      "loai": "clue",
      "heading": "[Tin gốc]",
      "fields": {
        "Tiêu đề": "Kênh ghi loại của từng tin",
        "Giá trị cho trình dựng": "GOC",
        "Nguồn": "Nam, người trực kênh của CLB Robotics",
        "Nội dung": "Mỗi tin có một loại: GOC là tin người đó tự viết, CHUYEN_TIEP là tin bấm chuyển lại. Chuyển tiếp thì ai cũng bấm được. TRA_LOI là tin gõ tay trả lời dưới một tin khác."
      },
      "quotes": {}
    },
    "clue-ngay-gui": {
      "id": "clue-ngay-gui",
      "loai": "clue",
      "heading": "[Ngày gửi tin gốc]",
      "fields": {
        "Tiêu đề": "Tin gốc gửi tối thứ Hai 07/10",
        "Giá trị cho trình dựng": "2024-10-07",
        "Nguồn": "Phiếu tin gốc",
        "Nội dung": "Tin gốc gửi lúc 22:40 thứ Hai 07/10/2024. Nhật ký đăng nhập của kênh ghi ngày theo dạng năm-tháng-ngày."
      },
      "quotes": {}
    },
    "doc-lich-xuong": {
      "id": "doc-lich-xuong",
      "loai": "doc",
      "heading": "Bảng đăng ký dùng xưởng",
      "fields": {
        "Tiêu đề": "Bảng đăng ký dùng xưởng, tuần 07/10",
        "Ảnh": "doc-lich-xuong",
        "Nguồn": "Dán cạnh cửa xưởng CLB Robotics",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Bảng viết tay dán cạnh cửa xưởng, góc ghi \"bản sao từ lịch đặt xưởng trên máy\". Tuần 07/10 kín chữ: đội thi đấu tập ba tối, sinh hoạt thành viên chiều thứ Ba, dọn xưởng sáng thứ Bảy."
        ]
      }
    },
    "clue-xuong-toi": {
      "id": "clue-xuong-toi",
      "loai": "clue",
      "heading": "[Xưởng mở tới 23 giờ]",
      "fields": {
        "Tiêu đề": "Tối 07/10 xưởng đăng ký mở tới 23 giờ",
        "Nguồn": "Bảng đăng ký dùng xưởng",
        "Nội dung": "Tối thứ Hai 07/10 xưởng đăng ký mở từ 19 giờ tới 23 giờ cho đội thi đấu tập. Tin gốc gửi lúc 22:40. Đây là lịch đăng ký, chưa cho biết ai thật sự có mặt, càng chưa cho biết ai ngồi máy."
      },
      "quotes": {}
    },
    "clue-loi-nhan-linh-2": {
      "id": "clue-loi-nhan-linh-2",
      "loai": "clue",
      "heading": "[Mẩu giấy trong sổ, mẩu thứ hai]",
      "fields": {
        "Tiêu đề": "Mẩu giấy kẹp ở trang \"Kiểm hai lần\"",
        "Nguồn": "Cuốn sổ của CLB, phòng CLB",
        "Nội dung": "Cùng nét chữ, cùng thứ mực xanh cũ: \"Sổ này chép lại từ một cuốn cũ hơn. Cuốn cũ vẫn nằm trong phòng này.\""
      },
      "quotes": {}
    },
    "clue-sao-ke-cuoi-ky": {
      "id": "clue-sao-ke-cuoi-ky",
      "loai": "clue",
      "heading": "[Sao kê quỹ về cuối kỳ]",
      "fields": {
        "Tiêu đề": "Sao kê quỹ CLB chỉ về vào cuối kỳ",
        "Nguồn": "Minh Anh nhắc",
        "Nội dung": "Phòng Kế hoạch gửi sao kê quỹ về các CLB một lần, vào cuối học kỳ, cùng đợt rà soát phòng. Chủ quỹ muốn xem giữa kỳ thì phải làm giấy, qua chủ tịch Hội sinh viên ký chuyển. Trước lúc đó không ai đọc sổ."
      },
      "quotes": {}
    },
    "clue-kenh-robotics": {
      "id": "clue-kenh-robotics",
      "loai": "clue",
      "heading": "[Kênh Robotics]",
      "fields": {
        "Tiêu đề": "Mã kênh của CLB Robotics",
        "Giá trị cho trình dựng": "clb_robotics",
        "Nguồn": "Phiếu tin gốc của Vụ 2",
        "Nội dung": "Kênh của CLB Robotics mang mã clb_robotics. Bản xuất bài đăng ghi mã kênh ở cột kenh."
      },
      "quotes": {}
    },
    "clue-ten-nam": {
      "id": "clue-ten-nam",
      "loai": "clue",
      "heading": "[Nam]",
      "fields": {
        "Tiêu đề": "Tên Nam trên bản ghi thư viện",
        "Giá trị cho trình dựng": "Nam",
        "Nguồn": "Nam tải bản ghi cửa từ của chính mình từ cổng sinh viên",
        "Nội dung": "Bản ghi cửa từ ghi tên chủ thẻ ở cột ten, giờ vào và giờ ra. Mỗi người chỉ tải được bản của chính mình; Nam và Hà Vy gộp hai bản vào một tệp."
      },
      "quotes": {}
    },
    "clue-toi-07": {
      "id": "clue-toi-07",
      "loai": "clue",
      "heading": "[Tối 07/10]",
      "fields": {
        "Tiêu đề": "Tối tin gốc được gửi",
        "Giá trị cho trình dựng": "2024-10-07",
        "Nguồn": "Phiếu tin gốc của Vụ 2",
        "Nội dung": "Tin gốc gửi lúc 22:40 thứ Hai 07/10/2024. Bản ghi thư viện ghi ngày theo dạng năm-tháng-ngày."
      },
      "quotes": {}
    },
    "clue-ten-vy": {
      "id": "clue-ten-vy",
      "loai": "clue",
      "heading": "[Hà Vy]",
      "fields": {
        "Tiêu đề": "Tên Hà Vy trên bản ghi thư viện",
        "Giá trị cho trình dựng": "Hà Vy",
        "Nguồn": "Hà Vy tải bản ghi cửa từ của chính mình",
        "Nội dung": "Hà Vy tải bản ghi cửa từ của mình, gộp chung tệp với Nam để lời chứng của mình cũng đếm được."
      },
      "quotes": {}
    },
    "clue-loi-nhan-linh-3": {
      "id": "clue-loi-nhan-linh-3",
      "loai": "clue",
      "heading": "[Mẩu giấy trong sổ, mẩu thứ ba]",
      "fields": {
        "Tiêu đề": "Mẩu giấy ở trang \"Kiểm hai lần\", lần hai",
        "Nguồn": "Cuốn sổ của CLB, phòng CLB",
        "Nội dung": "Vẫn nét chữ ấy: \"Vụ đầu tiên của CLB kết luận sai. Cuốn cũ ghi lại nó.\""
      },
      "quotes": {}
    },
    "clue-thao-in-so-do": {
      "id": "clue-thao-in-so-do",
      "loai": "clue",
      "heading": "[Lời chị Thảo: sơ đồ in tối Chủ nhật]",
      "fields": {
        "Tiêu đề": "Sơ đồ mạch của đội do Thảo in",
        "Nguồn": "Thảo, xưởng Robotics",
        "Nội dung": "Tối Chủ nhật nào Thảo cũng ra phòng máy in sơ đồ mạch cho đội. Lời kể về một thói quen, chưa nói về một tối cụ thể."
      },
      "quotes": {}
    },
    "doc-thu-hoi-don": {
      "id": "doc-thu-hoi-don",
      "loai": "doc",
      "heading": "Giấy yêu cầu giải trình ngân sách",
      "fields": {
        "Tiêu đề": "Giấy của Ban kiểm tra Hội sinh viên gửi xưởng Robotics",
        "Ảnh": "doc-thu-hoi-don",
        "Nguồn": "Nam mang tới phòng CLB",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Ban kiểm tra Hội sinh viên tạm dừng giải ngân cho xưởng Robotics, yêu cầu giải trình năm đơn linh kiện đứng tên Nam trong tháng 9 và 10, năm đơn cộng lại 2.670.000 đồng. Giấy đề ngày 01/11, lập theo danh sách chủ tịch Hội sinh viên chuyển xuống; Quân ký. Kèm bản sổ đặt hàng của xưởng.",
          "Nam nói mình chỉ đặt hai đơn: cảm biến dò line và bánh xe."
        ]
      }
    },
    "doc-phien-dang-nhap": {
      "id": "doc-phien-dang-nhap",
      "loai": "doc",
      "heading": "Bảng phiên đăng nhập do cô Hạnh xuất",
      "fields": {
        "Tiêu đề": "Bản xuất nguyên bản, có dấu xác nhận",
        "Ảnh": "doc-phien-dang-nhap",
        "Nguồn": "Cô Hạnh (Phòng Đào tạo, nơi quản lý máy chủ của trường), theo đề nghị của Thầy Quang",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Mỗi phiên đăng nhập của phần mềm đặt hàng: mã phiên, máy, ngày, giờ. Có cả phiên không tạo đơn.",
          "Tài khoản quản trị của Nam đang bị khóa; bảng này không qua tay Nam."
        ]
      }
    },
    "clue-da-duyet": {
      "id": "clue-da-duyet",
      "loai": "clue",
      "heading": "[Đã duyệt]",
      "fields": {
        "Tiêu đề": "Trạng thái đơn đã duyệt",
        "Giá trị cho trình dựng": "DA_DUYET",
        "Nguồn": "Sổ đặt hàng của xưởng",
        "Nội dung": "Sổ đặt hàng ghi trạng thái từng đơn ở cột trang_thai: DA_DUYET là đơn đã được duyệt chi, CHO_DUYET là đơn còn chờ. Đơn các kỳ trước ghi DA_QUYET_TOAN."
      },
      "quotes": {}
    },
    "clue-ma-phien": {
      "id": "clue-ma-phien",
      "loai": "clue",
      "heading": "[Mã phiên]",
      "fields": {
        "Tiêu đề": "Mỗi đơn có mã phiên đăng nhập",
        "Nguồn": "Duy nhìn thấy trong sổ đặt hàng",
        "Nội dung": "Cột ma_phien của sổ đặt hàng ghi phiên đăng nhập của máy lúc tạo đơn. Bảng phiên đăng nhập của phần mềm ghi mỗi phiên là máy nào, ngày nào, giờ nào. Hai bảng chung nhau cột ma_phien."
      },
      "quotes": {}
    },
    "clue-nguoi-dat-nam": {
      "id": "clue-nguoi-dat-nam",
      "loai": "clue",
      "heading": "[Nam]",
      "fields": {
        "Tiêu đề": "Tên Nam ở cột người đặt",
        "Giá trị cho trình dựng": "Nam",
        "Nguồn": "Sổ đặt hàng của xưởng",
        "Nội dung": "Cột nguoi_dat ghi tên người đứng tên đơn. Ai đăng nhập máy xưởng cũng gõ được tên vào cột này."
      },
      "quotes": {}
    },
    "clue-may-vp": {
      "id": "clue-may-vp",
      "loai": "clue",
      "heading": "[Máy văn phòng xưởng]",
      "fields": {
        "Tiêu đề": "Mã máy văn phòng xưởng",
        "Giá trị cho trình dựng": "MAY-VP-XUONG",
        "Nguồn": "Bảng phiên đăng nhập",
        "Nội dung": "Máy trong phòng văn phòng nhỏ của xưởng mang mã MAY-VP-XUONG. Phòng thường khóa, chìa ban chủ nhiệm giữ."
      },
      "quotes": {}
    },
    "clue-giao-chia": {
      "id": "clue-giao-chia",
      "loai": "clue",
      "heading": "[Tờ giao chìa: Khánh, Bách, Thảo]",
      "fields": {
        "Tiêu đề": "Tờ giao chìa dán ở cửa phòng văn phòng xưởng",
        "Ảnh": "doc-giao-chia",
        "Nguồn": "Tờ giấy dán ở cửa phòng, xem cùng Nam cuối Vụ 3",
        "Nội dung": "Tờ giao chìa phòng văn phòng xưởng Robotics ghi ba người giữ chìa: Khánh (trưởng CLB), Bách (phó CLB), Thảo (kỹ thuật). Tờ giấy nói ai có chìa, không nói ai mở cửa tối nào. Bách nói tối 07/10 về quê; Thảo nói chìa của mình để ngăn bàn ngoài xưởng, ai cũng lấy được."
      },
      "quotes": {}
    },
    "clue-huy-hieu-sut": {
      "id": "clue-huy-hieu-sut",
      "loai": "clue",
      "heading": "[Huy hiệu sứt: lỗi khuôn, Khánh giữ]",
      "fields": {
        "Tiêu đề": "Cái huy hiệu bánh răng sứt một răng",
        "Ảnh": "doc-huy-hieu-sut",
        "Nguồn": "Nam, sau khi Khánh ghé phòng CLB",
        "Nội dung": "Robotics làm ba chục huy hiệu hồi đầu năm; cái sứt một răng là lỗi khuôn, Khánh xin giữ và gắn trên balo. Balo hay để ở xưởng, ai cũng cầm được. Biết balo chưa phải biết người."
      },
      "quotes": {}
    },
    "clue-loi-nhan-linh-4": {
      "id": "clue-loi-nhan-linh-4",
      "loai": "clue",
      "heading": "[Mẩu giấy trong sổ, mẩu thứ tư]",
      "fields": {
        "Tiêu đề": "Mẩu giấy ở trang cuối sổ",
        "Nguồn": "Cuốn sổ của CLB, phòng CLB",
        "Nội dung": "Vẫn nét chữ mực xanh: \"Cái tên trên bản ghi và người ngồi ở đó là hai chuyện. Vụ đầu tiên, không ai hỏi câu ấy. Mặt trước thì các em đọc mỗi buổi họp rồi.\""
      },
      "quotes": {}
    },
    "doc-kiem-ke": {
      "id": "doc-kiem-ke",
      "loai": "doc",
      "heading": "Bảng kiểm kê xưởng của Nam",
      "fields": {
        "Tiêu đề": "Kiểm kê linh kiện xưởng, 18/10",
        "Ảnh": "doc-kiem-ke",
        "Nguồn": "Nam đếm tay từng loại, hai lần",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Ba mươi loại linh kiện từng có trong sổ đặt hàng, đếm thực tế trong kho. Ba loại đang là số không: động cơ servo, mạch điều khiển, bộ khung nhôm."
        ]
      }
    },
    "clue-so-luong-co-0": {
      "id": "clue-so-luong-co-0",
      "loai": "clue",
      "heading": "[Kho: 0]",
      "fields": {
        "Tiêu đề": "Trong kho không có một cái",
        "Giá trị cho trình dựng": "0",
        "Nguồn": "Bảng kiểm kê của Nam",
        "Nội dung": "Cột so_luong_co của bảng kiểm kê ghi số lượng đếm được trong kho. Không có một cái thì ghi 0."
      },
      "quotes": {}
    },
    "doc-so-quy": {
      "id": "doc-so-quy",
      "loai": "doc",
      "heading": "Bản xuất sổ quỹ khối CLB",
      "fields": {
        "Tiêu đề": "Sổ chi và bảng quỹ, Phòng Kế hoạch gửi theo yêu cầu của thầy Quang",
        "Ảnh": "doc-so-quy",
        "Nguồn": "Phòng Kế hoạch, Cô Hạnh gửi theo chữ ký của Thầy Quang; quy chế do Cô Lan in kèm (trang sau: CLB mất phòng thì vào diện chờ giải thể, sao kê quỹ gửi về Hội sinh viên thay vì chủ quỹ; giải thể thì chủ tịch Hội ký nhận bàn giao)",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Sổ chi: mỗi khoản có mã chi, mã đơn, mã quỹ, số tiền, người duyệt, ngày chi. Bảng quỹ: mã quỹ nào thuộc CLB nào.",
          "Ba khoản lớn là tạm ứng tiền mặt, người duyệt ký nhận; quy chế cho bổ sung chứng từ trong ba mươi ngày, nên mã đơn của ba khoản ấy được điền sau ngày chi.",
          "Chỉ gồm các khoản ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn đang xét."
        ]
      }
    },
    "clue-quy-tham-tu": {
      "id": "clue-quy-tham-tu",
      "loai": "clue",
      "heading": "[Quỹ CLB Thám Tử]",
      "fields": {
        "Tiêu đề": "Mã CLB trong bảng quỹ",
        "Giá trị cho trình dựng": "THAM_TU",
        "Nguồn": "Bảng quỹ",
        "Nội dung": "Bảng quỹ ghi CLB chủ quỹ ở cột clb: THAM_TU là CLB Thám Tử, ROBOTICS là CLB Robotics."
      },
      "quotes": {}
    },
    "clue-han-muc": {
      "id": "clue-han-muc",
      "loai": "clue",
      "heading": "[Ngưỡng giải trình 1.000.000]",
      "fields": {
        "Tiêu đề": "Ngưỡng rà soát tổng chi theo người duyệt",
        "Giá trị cho trình dựng": "1000000",
        "Nguồn": "Quy chế quỹ khối CLB, Minh Anh và Duy nhắc",
        "Nội dung": "Khoản dưới một triệu thì chủ tịch Hội sinh viên duyệt thẳng được, không cần trưởng CLB chủ quỹ ký. Nhưng tổng các khoản một người duyệt từ một quỹ trong một học kỳ vượt một triệu thì Phòng Kế hoạch yêu cầu người đó giải trình; ngưỡng này chỉ được soát lúc đối chiếu cuối kỳ, cùng lúc gửi sao kê. Bản giải trình phải có chủ quỹ ký xác nhận; quỹ đang chờ giải thể thì chủ tịch Hội ký thay. Đây là ngưỡng để tìm nhóm cần hỏi tiếp, không phải mức cấm."
      },
      "quotes": {}
    },
    "clue-loi-nhan-linh-5": {
      "id": "clue-loi-nhan-linh-5",
      "loai": "clue",
      "heading": "[Dòng cuối trong cuốn sổ cũ]",
      "fields": {
        "Tiêu đề": "Dòng viết thêm ở trang cuối cuốn sổ cũ",
        "Nguồn": "Ngăn dưới tủ hồ sơ phòng CLB",
        "Nội dung": "Cùng nét chữ với bốn mẩu giấy và với chữ ký trang đầu, chữ thầy Quang: \"Manh mối cũ, câu hỏi mới.\""
      },
      "quotes": {}
    },
    "doc-ho-so-vu-dau": {
      "id": "doc-ho-so-vu-dau",
      "loai": "doc",
      "heading": "Hồ sơ vụ thứ nhất của CLB",
      "fields": {
        "Tiêu đề": "Cuốn sổ bìa cứng trong ngăn tủ khóa",
        "Ảnh": "doc-ho-so-vu-dau",
        "Nguồn": "Ngăn dưới tủ hồ sơ phòng CLB, chìa dán sau bảng nguyên tắc",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "\"Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu\", chữ viết tay, ký tên Trịnh Quang.",
          "Cuốn sổ CLB đang dùng được chép lại từ cuốn này. Ở trang kết luận, một cái tên bị gạch; bên lề có hai chữ cùng thứ mực xanh đã ngả màu, cùng nét chữ với bốn mẩu giấy: \"Xem lại.\""
        ]
      }
    },
    "clue-so-phong-may": {
      "id": "clue-so-phong-may",
      "loai": "clue",
      "heading": "[Sổ ký phòng máy tối 15/9]",
      "fields": {
        "Tiêu đề": "Trang sổ ký vào phòng máy, tối Chủ nhật 15/9",
        "Nguồn": "Bác Thịnh giữ sổ; Thầy Quang ký cho bác mở đúng một trang sau khi phiếu sáu khoản cho thấy tiền bị lấy từ đúng quỹ của CLB bị lá thư đòi thu phòng",
        "Nội dung": "Tối Chủ nhật muốn vào phòng máy phải ký sổ. Tối 15/9 có bảy dòng: năm sinh viên vào in bài, và hai người của CLB Robotics: Thảo vào 20:10, ra 21:30; Khánh vào 22:40, ra 23:20. Nhật ký in ghi lá thư in lúc 23:10. Sổ nói ai ở trong phòng, không nói ai bấm in."
      },
      "quotes": {}
    },
    "clue-in-toi-15-9": {
      "id": "clue-in-toi-15-9",
      "loai": "clue",
      "heading": "[Nhật ký in tối 15/9: không có sơ đồ thứ hai]",
      "fields": {
        "Tiêu đề": "Các lệnh in của tài khoản clb_robotics tối Chủ nhật 15/9",
        "Nguồn": "Cô Hạnh (Phòng Đào tạo) gửi nhật ký in của phòng máy",
        "Nội dung": "Tối 15/9 tài khoản clb_robotics in đúng hai lệnh. 20:40: so-do-mach-xe-do-line.pdf, 3 trang. 23:10: kien-nghi-phong-clb.docx, 1 trang. Không có lệnh thứ ba. Cả phòng máy, từ 22:40 tới 23:20, có ba lệnh in: một đồ án và một báo cáo nhóm bằng tài khoản của hai sinh viên khác, và lá thư. Không có sơ đồ mạch nào."
      },
      "quotes": {}
    },
    "doc-v2-raw-logs": {
      "id": "doc-v2-raw-logs",
      "loai": "doc",
      "heading": "Bản xuất sổ sử dụng phòng",
      "fields": {
        "Tiêu đề": "Bản xuất sổ sử dụng phòng, tháng 10",
        "Ảnh": "doc-v2-raw-logs",
        "Nguồn": "Duy xuất từ máy quản lý phòng của tòa nhà",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Hai trăm sáu mươi bảy dòng của mọi phòng trong tòa nhà, năm cột: mã buổi, mã phòng, ngày, hoạt động, trạng thái.",
          "Mã phòng do người trực gõ tay: có dòng viết hoa, có dòng viết thường, có dòng dính dấu cách ở đuôi.",
          "Trạng thái DA_XAC_NHAN: buổi đã có chữ ký trong sổ giấy. DU_KIEN: lịch đặt trước, chưa ký."
        ]
      }
    },
    "clue-ma-phong-clb": {
      "id": "clue-ma-phong-clb",
      "loai": "clue",
      "heading": "[Mã phòng CLB]",
      "fields": {
        "Tiêu đề": "Mã phòng của CLB trong sổ",
        "Giá trị cho trình dựng": "clb-tham-tu",
        "Nguồn": "Sổ sử dụng phòng, Duy giữ",
        "Nội dung": "Sổ giấy ghi phòng CLB bằng mã clb-tham-tu. Trong bản xuất, mã này do người trực gõ tay nên mỗi dòng một kiểu."
      },
      "quotes": {}
    },
    "clue-da-xac-nhan": {
      "id": "clue-da-xac-nhan",
      "loai": "clue",
      "heading": "[Đã ký xác nhận]",
      "fields": {
        "Tiêu đề": "Trạng thái \"đã ký xác nhận\"",
        "Giá trị cho trình dựng": "DA_XAC_NHAN",
        "Nguồn": "Bản xuất sổ sử dụng phòng",
        "Nội dung": "Chỉ dòng có trạng thái DA_XAC_NHAN mới có chữ ký trong sổ giấy. DU_KIEN là lịch đặt trước, chưa diễn ra."
      },
      "quotes": {}
    },
    "clue-v2-so-giay": {
      "id": "clue-v2-so-giay",
      "loai": "clue",
      "heading": "[Sổ giấy khớp bốn buổi]",
      "fields": {
        "Tiêu đề": "Sổ giấy: bốn buổi đủ chữ ký",
        "Nguồn": "Duy dò sổ giấy với phiếu tra",
        "Nội dung": "Bốn mã buổi trên phiếu đều có chữ ký trong sổ giấy; dòng 30/10 còn để trống ô ký. Sổ giấy là nguồn riêng, khớp với bản xuất. Cả hai không ghi ai tới dự."
      },
      "quotes": {}
    },
    "doc-mic-so-tai-san": {
      "id": "doc-mic-so-tai-san",
      "loai": "doc",
      "heading": "Sổ tài sản và phiếu luân chuyển",
      "fields": {
        "Tiêu đề": "Sổ tài sản CLB và phiếu luân chuyển của tòa nhà",
        "Ảnh": "doc-mic-so-tai-san",
        "Nguồn": "Duy giữ sổ tài sản; phiếu luân chuyển do tổ thiết bị tòa nhà lập",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Sổ tài sản: mã tài sản, tên, chỗ để ghi lúc kiểm kê đầu kỳ. Mười ba thiết bị, trong đó có hai chiếc micro.",
          "Phiếu luân chuyển: mã phiếu, mã tài sản, nơi chuyển tới, người nhận, ngày, trạng thái. Tập phiếu là của cả tòa nhà, hơn trăm rưỡi phiếu của mọi CLB. Phiếu không ghi tên thiết bị.",
          "Cả hai bảng đều có cột vi_tri, nhưng ở sổ là chỗ để đầu kỳ, ở phiếu là nơi chuyển tới."
        ]
      }
    },
    "clue-mic-ten": {
      "id": "clue-mic-ten",
      "loai": "clue",
      "heading": "[Micro không dây]",
      "fields": {
        "Tiêu đề": "Tên thiết bị trong sổ tài sản",
        "Giá trị cho trình dựng": "Micro không dây",
        "Nguồn": "Sổ tài sản CLB",
        "Nội dung": "Sổ tài sản ghi tên thiết bị ở cột ten_tai_san. Chiếc cần kiểm kê là \"Micro không dây\"; sổ còn một chiếc \"Micro có dây\"."
      },
      "quotes": {}
    },
    "clue-mic-da-nhan": {
      "id": "clue-mic-da-nhan",
      "loai": "clue",
      "heading": "[Đã nhận]",
      "fields": {
        "Tiêu đề": "Trạng thái phiếu đã có người nhận",
        "Giá trị cho trình dựng": "DA_NHAN",
        "Nguồn": "Phiếu luân chuyển",
        "Nội dung": "Phiếu DA_NHAN là phiếu đã có chữ ký người nhận, thiết bị đã thật sự chuyển. DE_XUAT là phiếu mới đề xuất, chưa ai nhận."
      },
      "quotes": {}
    },
    "clue-mic-ma-dan": {
      "id": "clue-mic-ma-dan",
      "loai": "clue",
      "heading": "[Mã dán trên micro: MIC-02]",
      "fields": {
        "Tiêu đề": "Nhãn dán trên chiếc micro trong tủ dùng chung",
        "Nguồn": "Duy và Minh Anh mở tủ xem",
        "Nội dung": "Chiếc micro không dây trong tủ thiết bị dùng chung mang nhãn MIC-02, đúng mã trên phiếu PX-17. Phiếu và vật khớp nhau; không ai ghi vì sao sổ CLB chưa được sửa."
      },
      "quotes": {}
    },
    "doc-hoan-ban-xuat": {
      "id": "doc-hoan-ban-xuat",
      "loai": "doc",
      "heading": "Bản xuất thu chi của CLB",
      "fields": {
        "Tiêu đề": "Bản xuất giao dịch của CLB kỳ này, có buổi hướng dẫn SQL cho tân thành viên",
        "Ảnh": "doc-hoan-ban-xuat",
        "Nguồn": "Minh Anh xuất từ sổ thu chi CLB",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Sáu mươi tám dòng, năm cột: mã giao dịch, mã phiếu, loại, số tiền, mã tham chiếu.",
          "Loại THU là khoản thu vào, CHI là khoản đã chi; loại HOAN là khoản được hoàn lại, số tiền ghi âm.",
          "Đây là nguồn cần kiểm, chưa phải bằng chứng ai làm sai."
        ]
      }
    },
    "clue-hoan-loai": {
      "id": "clue-hoan-loai",
      "loai": "clue",
      "heading": "[Hoàn tiền]",
      "fields": {
        "Tiêu đề": "Loại giao dịch hoàn tiền",
        "Giá trị cho trình dựng": "HOAN",
        "Nguồn": "Bản xuất thu chi",
        "Nội dung": "Cột loai ghi CHI cho khoản chi, HOAN cho khoản hoàn lại."
      },
      "quotes": {}
    },
    "clue-hoan-mot-dong": {
      "id": "clue-hoan-mot-dong",
      "loai": "clue",
      "heading": "[Một dòng]",
      "fields": {
        "Tiêu đề": "Mỗi lần hoàn chỉ có một dòng",
        "Giá trị cho trình dựng": "1",
        "Nguồn": "Cách ghi sổ thu chi, Duy nhắc",
        "Nội dung": "Một lần hoàn tiền chỉ ghi một dòng. Phiếu có số dòng hoàn lớn hơn 1 thì cần mở chứng từ gốc ra xem."
      },
      "quotes": {}
    },
    "doc-hoan-bien-nhan": {
      "id": "doc-hoan-bien-nhan",
      "loai": "doc",
      "heading": "Biên nhận ngân hàng của phiếu PH-04",
      "fields": {
        "Tiêu đề": "Biên nhận hoàn tiền, phiếu PH-04",
        "Ảnh": "doc-hoan-bien-nhan",
        "Nguồn": "Ngân hàng gửi, Minh Anh giữ",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Phiếu PH-04. Một giao dịch hoàn: 60.000 đồng. Mã tham chiếu NH-771.",
          "Biên nhận không ghi ai nhập dòng nào vào sổ."
        ]
      }
    },
    "doc-so-don": {
      "id": "doc-so-don",
      "loai": "doc",
      "heading": "Sổ đón tân sinh viên",
      "fields": {
        "Tiêu đề": "Sổ đón tân sinh viên của đội tình nguyện",
        "Nguồn": "Tùng giữ bản xuất của đội tình nguyện trên laptop",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Mỗi lượt đón một dòng, năm cột: mã lượt, ngày, mã tình nguyện viên, mã tân sinh viên, điểm đến.",
          "Điểm đến ghi lúc bàn giao, là nơi tân sinh viên thật sự được đưa tới: KTX, NHA_XE hoặc HOI_TRUONG.",
          "Sổ của cả đội, ba đợt nhập học liền, gần ba trăm lượt. Sổ không ghi tân sinh viên muốn tới đâu."
        ]
      }
    },
    "clue-ma-tung": {
      "id": "clue-ma-tung",
      "loai": "clue",
      "heading": "[SV240251]",
      "fields": {
        "Tiêu đề": "Mã sinh viên của Tùng",
        "Giá trị cho trình dựng": "SV240251",
        "Nguồn": "Tùng đọc",
        "Nội dung": "Sổ đón ghi tình nguyện viên bằng mã sinh viên. Mã của Tùng là SV240251."
      },
      "quotes": {}
    },
    "clue-nha-xe": {
      "id": "clue-nha-xe",
      "loai": "clue",
      "heading": "[Nhà xe]",
      "fields": {
        "Tiêu đề": "Điểm đến ghi là nhà xe",
        "Giá trị cho trình dựng": "NHA_XE",
        "Nguồn": "Phiếu gom theo điểm đến",
        "Nội dung": "Trong chín lượt Tùng dẫn có một lượt ghi điểm đến NHA_XE. Tám lượt còn lại đều là KTX."
      },
      "quotes": {}
    },
    "doc-hoc-danh-sach": {
      "id": "doc-hoc-danh-sach",
      "loai": "doc",
      "heading": "Danh sách lớp cũ của cô Hạnh",
      "fields": {
        "Tiêu đề": "Danh sách lớp các khóa cô Hạnh đứng lớp, 1995–2005",
        "Nguồn": "Cô Hạnh mở riêng bảng này cho tài khoản CLB, các bảng khác không mở",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Mỗi dòng một học trò trong một danh sách lớp, bốn cột: năm học, lớp, họ tên, ghi chú.",
          "Danh sách nhập tay, mỗi năm một kiểu: chữ hoa chữ thường không thống nhất, có ô thừa dấu cách. Ghi chú có thể là ra trường, thôi học hoặc chuyển trường.",
          "Danh sách không ghi địa chỉ hay số điện thoại, và không cho biết ai còn liên lạc được."
        ]
      }
    },
    "clue-hoc-ghi-chu": {
      "id": "clue-hoc-ghi-chu",
      "loai": "clue",
      "heading": "[ra trường]",
      "fields": {
        "Tiêu đề": "Ghi chú học trò đã ra trường",
        "Giá trị cho trình dựng": "ra trường",
        "Nguồn": "Danh sách lớp cũ, Cô Hạnh giải thích",
        "Nội dung": "Cột ghi_chu của học trò đã ra trường viết \"ra trường\", nhưng mỗi năm gõ một kiểu: chữ hoa đầu câu, dấu cách thừa ở đầu hay cuối ô."
      },
      "quotes": {}
    },
    "clue-hoc-mot-dong": {
      "id": "clue-hoc-mot-dong",
      "loai": "clue",
      "heading": "[Một dòng]",
      "fields": {
        "Tiêu đề": "Mỗi người một dòng ra trường",
        "Giá trị cho trình dựng": "1",
        "Nguồn": "Cách lập danh sách mời, Duy nhắc",
        "Nội dung": "Mỗi người ra trường chỉ nên có một dòng. Tên có hơn một dòng thì cần người trong lớp nhận ra là một người hay hai người trùng tên."
      },
      "quotes": {}
    },
    "clue-tui-nhan": {
      "id": "clue-tui-nhan",
      "loai": "clue",
      "heading": "[KTVM-0]",
      "fields": {
        "Tiêu đề": "Mã lớp học phần trên nhãn giáo trình",
        "Giá trị cho trình dựng": "KTVM-0",
        "Nguồn": "Nhãn dán trên bìa giáo trình Kinh tế vi mô",
        "Nội dung": "Nhãn bong mất chữ số cuối. Còn đọc được \"KTVM-0\", tức mã lớp học phần từ KTVM-01 tới KTVM-09."
      },
      "quotes": {}
    },
    "clue-tui-toa-b": {
      "id": "clue-tui-toa-b",
      "loai": "clue",
      "heading": "[Tòa B]",
      "fields": {
        "Tiêu đề": "Nhà xe tòa B",
        "Giá trị cho trình dựng": "B",
        "Nguồn": "Vé gửi xe màu xanh",
        "Nội dung": "Vé ghi nhà xe tòa B. Mã phòng học bắt đầu bằng chữ tòa: phòng tòa B là B…"
      },
      "quotes": {}
    },
    "clue-tui-sang": {
      "id": "clue-tui-sang",
      "loai": "clue",
      "heading": "[Buổi sáng]",
      "fields": {
        "Tiêu đề": "Vào bãi lúc 07:12 sáng nay",
        "Giá trị cho trình dựng": "SANG",
        "Nguồn": "Vé gửi xe màu xanh",
        "Nội dung": "Giờ vào 07:12, ngày 30/10. Cột ca của lịch học ghi SANG cho các lớp buổi sáng, CHIEU cho buổi chiều."
      },
      "quotes": {}
    },
    "clue-tui-thu": {
      "id": "clue-tui-thu",
      "loai": "clue",
      "heading": "[Thứ Tư]",
      "fields": {
        "Tiêu đề": "Hôm nay là thứ Tư",
        "Giá trị cho trình dựng": "THU_TU",
        "Nguồn": "Hóa đơn quán photo",
        "Nội dung": "Hóa đơn photo ghi thứ Tư, ngày 30/10/2024, 13 giờ 42. Cột thu của lịch học ghi THU_TU cho thứ Tư."
      },
      "quotes": {}
    },
    "clue-tui-khoa": {
      "id": "clue-tui-khoa",
      "loai": "clue",
      "heading": "[Báo chí]",
      "fields": {
        "Tiêu đề": "Khoa Báo chí trên tờ đơn",
        "Giá trị cho trình dựng": "BC",
        "Nguồn": "Tờ đơn xin học bổng trong bìa nhựa",
        "Nội dung": "Dòng đầu tờ đơn còn đọc được \"Khoa Báo c…\", chữ cuối bị mép nhựa che. Mã lớp sinh hoạt của khoa Báo chí bắt đầu bằng BC."
      },
      "quotes": {}
    },
    "doc-tui-lich-hoc": {
      "id": "doc-tui-lich-hoc",
      "loai": "doc",
      "heading": "Lịch các lớp học phần",
      "fields": {
        "Tiêu đề": "Lịch lớp học phần học kỳ này",
        "Nguồn": "Phòng Đào tạo, tài khoản CLB được xem",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Mỗi lớp học phần một dòng, sáu cột: mã lớp, tên môn, phòng, thứ, ca, giờ bắt đầu.",
          "Thứ viết THU_HAI … THU_BAY; ca viết SANG hoặc CHIEU. Môn Kinh tế vi mô có nhiều lớp, mã từ KTVM-01.",
          "Chỉ là lịch. Bảng không ghi ai ngồi trong lớp nào."
        ]
      }
    },
    "doc-tui-dang-ky": {
      "id": "doc-tui-dang-ky",
      "loai": "doc",
      "heading": "Danh sách đăng ký lớp học phần",
      "fields": {
        "Tiêu đề": "Ai đăng ký lớp học phần nào",
        "Nguồn": "Phòng Đào tạo, tài khoản CLB được xem",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Hai cột: mã lớp học phần, mã sinh viên. Mỗi lượt đăng ký một dòng.",
          "Tên và lớp sinh hoạt không nằm ở đây; chúng nằm ở bảng sinh viên, nối theo mã sinh viên.",
          "Đăng ký lớp không có nghĩa là hôm ấy người đó có mặt."
        ]
      }
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
      "sql": "SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep = 'kien-nghi-phong-clb.docx';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-in.md:3 thẻ c-in, SQL chuẩn",
      "resultId": "ev-nhat-ky-in"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat;",
      "soDong": 112,
      "noi": "noi-dung-mua-1/thu-thach/c-lop.md:3 thẻ c-bang-lop, SQL chuẩn",
      "resultId": "ev-bang-lop"
    },
    {
      "sql": "SELECT ma_lop, toa_nha FROM lop_sinh_hoat;",
      "soDong": 112,
      "noi": "noi-dung-mua-1/thu-thach/c-lop.md:20 thẻ c-cot-lop, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/c-lop.md:37 thẻ c-lop, SQL chuẩn",
      "resultId": "ev-hai-lop"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop = 'BC24A';",
      "soDong": 32,
      "noi": "noi-dung-mua-1/thu-thach/c-ten-h.md:3 thẻ c-ten-h, SQL chuẩn",
      "resultId": "ev-hai-ma"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/c-ten-h.md:27 thẻ c-sua-or-quan, SQL chuẩn",
      "resultId": "ev-mot-dong-sua"
    },
    {
      "sql": "SELECT ma_don, ngay, nguoi_dat, linh_kien, so_tien, ma_phien FROM don_linh_kien WHERE TRIM(trang_thai) = 'DA_DUYET';",
      "soDong": 8,
      "noi": "noi-dung-mua-1/thu-thach/giup-nam.md:3 thẻ c-don-da-duyet, SQL chuẩn",
      "resultId": "ev-don-da-duyet"
    },
    {
      "sql": "SELECT nguoi_dat, COUNT(*) AS so_dong FROM @ev-don-da-duyet GROUP BY nguoi_dat;",
      "soDong": 4,
      "noi": "noi-dung-mua-1/thu-thach/giup-nam.md:25 thẻ c-don-theo-nguoi, SQL chuẩn",
      "resultId": "ev-don-theo-nguoi",
      "sourceResultId": "ev-don-da-duyet",
      "sourceGroupColumn": "nguoi_dat"
    },
    {
      "sql": "SELECT ma_don, linh_kien, may, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE nguoi_dat = 'Nam';",
      "soDong": 5,
      "noi": "noi-dung-mua-1/thu-thach/giup-nam.md:44 thẻ c-don-nam-may, SQL chuẩn",
      "resultId": "ev-don-nam-may"
    },
    {
      "sql": "SELECT may, COUNT(*) AS so_dong FROM @ev-don-nam-may GROUP BY may;",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/giup-nam.md:69 thẻ c-don-nam-theo-may, SQL chuẩn",
      "resultId": "ev-don-nam-theo-may",
      "sourceResultId": "ev-don-nam-may",
      "sourceGroupColumn": "may"
    },
    {
      "sql": "SELECT ma_don, nguoi_dat, linh_kien, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE may = 'MAY-VP-XUONG';",
      "soDong": 4,
      "noi": "noi-dung-mua-1/thu-thach/giup-nam.md:88 thẻ c-may-vp, SQL chuẩn",
      "resultId": "ev-may-vp"
    },
    {
      "sql": "SELECT ma_luot, ngay, ma_sv, diem_den FROM luot_don WHERE tinh_nguyen_vien = 'SV240251';",
      "soDong": 9,
      "noi": "noi-dung-mua-1/thu-thach/phu-dan-lac.md:3 thẻ c-don-tung, SQL chuẩn",
      "resultId": "ev-don-tung"
    },
    {
      "sql": "SELECT diem_den, COUNT(*) AS so_dong FROM @ev-don-tung GROUP BY diem_den;",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/phu-dan-lac.md:23 thẻ c-don-noi-den, SQL chuẩn",
      "resultId": "ev-don-noi-den",
      "sourceResultId": "ev-don-tung",
      "sourceGroupColumn": "diem_den"
    },
    {
      "sql": "SELECT ma_luot, ngay, ma_sv FROM @ev-don-tung WHERE diem_den = 'NHA_XE';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/phu-dan-lac.md:42 thẻ c-don-lac, SQL chuẩn",
      "resultId": "ev-don-lac",
      "sourceResultId": "ev-don-tung"
    },
    {
      "sql": "SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich WHERE loai = 'HOAN';",
      "soDong": 4,
      "noi": "noi-dung-mua-1/thu-thach/phu-hoan-tien.md:3 thẻ c-hoan-loc, SQL chuẩn",
      "resultId": "ev-hoan-loc"
    },
    {
      "sql": "SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-hoan-loc GROUP BY ma_phieu HAVING COUNT(*) > 1;",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/phu-hoan-tien.md:23 thẻ c-hoan-nhom, SQL chuẩn",
      "resultId": "ev-hoan-nhom",
      "sourceResultId": "ev-hoan-loc"
    },
    {
      "sql": "SELECT nam_hoc, lop, ho_ten FROM danh_sach_lop_cu WHERE LOWER(TRIM(ghi_chu)) = 'ra trường';",
      "soDong": 30,
      "noi": "noi-dung-mua-1/thu-thach/phu-hoc-tro-cu.md:3 thẻ c-hoc-ra-truong, SQL chuẩn",
      "resultId": "ev-hoc-ra-truong"
    },
    {
      "sql": "SELECT ho_ten, COUNT(*) AS so_dong FROM @ev-hoc-ra-truong GROUP BY ho_ten;",
      "soDong": 26,
      "noi": "noi-dung-mua-1/thu-thach/phu-hoc-tro-cu.md:25 thẻ c-hoc-ten, SQL chuẩn",
      "resultId": "ev-hoc-ten",
      "sourceResultId": "ev-hoc-ra-truong",
      "sourceGroupColumn": "ho_ten"
    },
    {
      "sql": "SELECT ho_ten, COUNT(*) AS so_dong FROM @ev-hoc-ra-truong GROUP BY ho_ten HAVING COUNT(*) > 1;",
      "soDong": 4,
      "noi": "noi-dung-mua-1/thu-thach/phu-hoc-tro-cu.md:44 thẻ c-hoc-hai-dong, SQL chuẩn",
      "resultId": "ev-hoc-hai-dong",
      "sourceResultId": "ev-hoc-ra-truong"
    },
    {
      "sql": "SELECT ma_phieu, ten_tai_san, luan_chuyen.vi_tri, nguoi_nhan FROM luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/phu-micro.md:3 thẻ c-mic-phieu, SQL chuẩn",
      "resultId": "ev-mic-phieu"
    },
    {
      "sql": "SELECT ma_lhp, mon, phong, gio_bat_dau FROM lich_hoc WHERE ma_lhp LIKE 'KTVM-0%' AND thu = 'THU_TU' AND ca = 'SANG' AND phong LIKE 'B%';",
      "soDong": 3,
      "noi": "noi-dung-mua-1/thu-thach/phu-tui-do.md:3 thẻ c-tui-lop, SQL chuẩn",
      "resultId": "ev-tui-lop"
    },
    {
      "sql": "SELECT dang_ky_hoc.ma_lhp, sinh_vien.ma_sv, ho_dem, ten, ma_lop FROM dang_ky_hoc JOIN sinh_vien ON dang_ky_hoc.ma_sv = sinh_vien.ma_sv WHERE ma_lhp IN ('KTVM-03', 'KTVM-05', 'KTVM-07') AND ma_lop LIKE 'BC%';",
      "soDong": 3,
      "noi": "noi-dung-mua-1/thu-thach/phu-tui-do.md:29 thẻ c-tui-nguoi, SQL chuẩn",
      "resultId": "ev-tui-nguoi"
    },
    {
      "sql": "SELECT ma_don, nguoi_dat, so_tien, so_luong_co FROM don_linh_kien JOIN kiem_ke ON don_linh_kien.linh_kien = kiem_ke.linh_kien WHERE so_luong_co = 0;",
      "soDong": 3,
      "noi": "noi-dung-mua-1/thu-thach/so-quy.md:3 thẻ c-dat-ma-khong-co, SQL chuẩn",
      "resultId": "ev-dat-ma-khong-co"
    },
    {
      "sql": "SELECT ma_chi, ma_don, so_tien, nguoi_duyet, ngay_chi FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';",
      "soDong": 6,
      "noi": "noi-dung-mua-1/thu-thach/so-quy.md:26 thẻ c-chi-tham-tu, SQL chuẩn",
      "resultId": "ev-chi-tham-tu"
    },
    {
      "sql": "SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet;",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/so-quy.md:49 thẻ c-chi-theo-nguoi-duyet, SQL chuẩn",
      "resultId": "ev-chi-theo-nguoi-duyet",
      "sourceResultId": "ev-chi-tham-tu"
    },
    {
      "sql": "SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien, AVG(so_tien) AS tb_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet HAVING SUM(so_tien) > 1000000;",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/so-quy.md:67 thẻ c-chi-vuot-muc, SQL chuẩn",
      "resultId": "ev-chi-vuot-muc",
      "sourceResultId": "ev-chi-tham-tu"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung = 'CLB Thám Tử soi dữ liệu sinh viên';",
      "soDong": 0,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:3 thẻ c-tin-bang, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu sinh viên%';",
      "soDong": 5,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:22 thẻ c-tin-bat-dau, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%CLB Thám Tử soi%';",
      "soDong": 8,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:40 thẻ c-tin-chua, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%soi dữ liệu sinh viên%';",
      "soDong": 7,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:58 thẻ c-tin-sach, SQL chuẩn",
      "resultId": "ev-tin-don"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE tai_khoan IN ('SV240201', 'SV240207');",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:80 thẻ c-tin-in, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%soi dữ liệu sinh viên%' AND loai = 'GOC';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:98 thẻ c-tin-goc, SQL chuẩn",
      "resultId": "ev-tin-goc"
    },
    {
      "sql": "SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07';",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:122 thẻ c-tin-may, SQL chuẩn",
      "resultId": "ev-tin-may"
    },
    {
      "sql": "SELECT ngay, ma_phong, tu_gio, den_gio, muc_dich FROM dat_phong WHERE ngay = '2024-10-07' AND LOWER(TRIM(ma_phong)) = 'xr-01';",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/tin-don.md:144 thẻ c-tin-xuong, SQL chuẩn",
      "resultId": "ev-tin-xuong"
    },
    {
      "sql": "SELECT ma_bai, ngay, buoi, thiet_bi FROM bai_dang_kenh WHERE kenh = 'clb_robotics';",
      "soDong": 9,
      "noi": "noi-dung-mua-1/thu-thach/tranh-cai.md:3 thẻ c-bai-dang, SQL chuẩn",
      "resultId": "ev-bai-dang"
    },
    {
      "sql": "SELECT thiet_bi, COUNT(*) AS so_dong FROM @ev-bai-dang GROUP BY thiet_bi;",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/tranh-cai.md:26 thẻ c-bai-thiet-bi, SQL chuẩn",
      "resultId": "ev-bai-thiet-bi",
      "sourceResultId": "ev-bai-dang",
      "sourceGroupColumn": "thiet_bi"
    },
    {
      "sql": "SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Nam';",
      "soDong": 32,
      "noi": "noi-dung-mua-1/thu-thach/tranh-cai.md:45 thẻ c-nam-thu-vien, SQL chuẩn",
      "resultId": "ev-nam-thu-vien"
    },
    {
      "sql": "SELECT thu, COUNT(*) AS so_dong FROM @ev-nam-thu-vien GROUP BY thu;",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/tranh-cai.md:65 thẻ c-nam-thu, SQL chuẩn",
      "resultId": "ev-nam-thu",
      "sourceResultId": "ev-nam-thu-vien",
      "sourceGroupColumn": "thu"
    },
    {
      "sql": "SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07';",
      "soDong": 2,
      "noi": "noi-dung-mua-1/thu-thach/tranh-cai.md:84 thẻ c-toi-07, SQL chuẩn",
      "resultId": "ev-toi-07"
    },
    {
      "sql": "SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Hà Vy';",
      "soDong": 5,
      "noi": "noi-dung-mua-1/thu-thach/tranh-cai.md:105 thẻ c-vy-thu-vien, SQL chuẩn",
      "resultId": "ev-vy-thu-vien"
    },
    {
      "sql": "SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN' ORDER BY ngay;",
      "soDong": 4,
      "noi": "noi-dung-mua-1/thu-thach/v2-loc-buoi.md:3 thẻ v2-loc-buoi, SQL chuẩn",
      "resultId": "ev-v2-activities"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE nganh = 'Du lịch' AND ten = 'Tùng';",
      "soDong": 1,
      "noi": "noi-dung-mua-1/kich-ban/00-mo-dau.md:202 [LỌC THỬ lt-ngay-hoi]"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';",
      "soDong": 32,
      "noi": "noi-dung-mua-1/kich-ban/06-hop-va-ket.md:18 [MÀN CHIẾU hop-chieu-or]"
    }
  ],
  "duLieu": {
    "bang": [
      {
        "ten": "lop_sinh_hoat",
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
            "ten": "toa_nha",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "KT24A",
            "Kế toán",
            2024,
            "B"
          ],
          [
            "KT24B",
            "Kế toán",
            2024,
            "A"
          ],
          [
            "QT24A",
            "Quản trị kinh doanh",
            2024,
            "C"
          ],
          [
            "QT24B",
            "Quản trị kinh doanh",
            2024,
            "B"
          ],
          [
            "BC24A",
            "Báo chí",
            2024,
            "B"
          ],
          [
            "BC24B",
            "Báo chí",
            2024,
            "C"
          ],
          [
            "TC24A",
            "Tài chính – Ngân hàng",
            2024,
            "A"
          ],
          [
            "MK24A",
            "Marketing",
            2024,
            "A"
          ],
          [
            "DL24A",
            "Du lịch",
            2024,
            "C"
          ],
          [
            "CT24A",
            "Công nghệ thông tin",
            2024,
            "A"
          ],
          [
            "TM24A",
            "Thương mại điện tử",
            2024,
            "C"
          ],
          [
            "BC23A",
            "Báo chí",
            2023,
            "B"
          ],
          [
            "KT22A",
            "Kế toán",
            2022,
            "A"
          ],
          [
            "QT23A",
            "Quản trị kinh doanh",
            2023,
            "C"
          ]
        ]
      },
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
            "ten": "ma_lop",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "SV240228",
            "Trần Minh",
            "Hiếu",
            "BC24A"
          ],
          [
            "SV240317",
            "Lê Thu",
            "Hoài",
            "BC24A"
          ],
          [
            "SV240105",
            "Hồ Ngọc",
            "Mai",
            "BC24A"
          ],
          [
            "SV240122",
            "Phạm Tiến",
            "Đạt",
            "BC24A"
          ],
          [
            "SV240131",
            "Vũ Hải",
            "Yến",
            "BC24A"
          ],
          [
            "SV240146",
            "Đỗ Gia",
            "Phúc",
            "BC24A"
          ],
          [
            "SV240412",
            "Đỗ Thu",
            "Hồng",
            "BC24B"
          ],
          [
            "SV240415",
            "Nguyễn Bảo",
            "Ngọc",
            "BC24B"
          ],
          [
            "SV240418",
            "Bùi Đức",
            "Toàn",
            "BC24B"
          ],
          [
            "SV240201",
            "Nguyễn Văn",
            "Hải",
            "KT24A"
          ],
          [
            "SV240204",
            "Phan Quốc",
            "Huy",
            "QT24B"
          ],
          [
            "SV240207",
            "Đinh Thị",
            "Hương",
            "KT24B"
          ],
          [
            "SV240210",
            "Lương Mạnh",
            "Hùng",
            "TC24A"
          ],
          [
            "SV240213",
            "Cao Văn",
            "Hậu",
            "MK24A"
          ],
          [
            "SV240216",
            "Tạ Thu",
            "Hằng",
            "DL24A"
          ],
          [
            "SV240219",
            "Kiều Minh",
            "Hưng",
            "TM24A"
          ],
          [
            "SV240251",
            "Trần",
            "Tùng",
            "DL24A"
          ],
          [
            "SV240254",
            "Nguyễn Thanh",
            "Tùng",
            "KT24B"
          ],
          [
            "SV240257",
            "Vũ Sơn",
            "Tùng",
            "CT24A"
          ],
          [
            "SV240301",
            "Hoàng Anh",
            "Tuấn",
            "QT24A"
          ],
          [
            "SV240304",
            "Trịnh Mỹ",
            "Châu",
            "KT24A"
          ],
          [
            "SV240307",
            "Mạc Văn",
            "Khoa",
            "QT24B"
          ],
          [
            "SV240310",
            "Lâm Thị",
            "Nga",
            "MK24A"
          ],
          [
            "SV240313",
            "Tô Bảo",
            "Long",
            "TC24A"
          ],
          [
            "SV240316",
            "Âu Minh",
            "Trang",
            "DL24A"
          ]
        ]
      },
      {
        "ten": "nhat_ky_in",
        "cot": [
          {
            "ten": "thoi_diem",
            "kieu": "TEXT"
          },
          {
            "ten": "tai_khoan",
            "kieu": "TEXT"
          },
          {
            "ten": "ten_tep",
            "kieu": "TEXT"
          },
          {
            "ten": "so_trang",
            "kieu": "INTEGER"
          }
        ],
        "dong": [
          [
            "2024-09-14 09:40",
            "SV240131",
            "lich-truc-nhat-lop.xlsx",
            1
          ],
          [
            "2024-09-14 15:05",
            "SV240317",
            "the-dang-ky-thu-vien.pdf",
            1
          ],
          [
            "2024-09-15 20:15",
            "SV240228",
            "bai-tap-kinh-te-vi-mo.pdf",
            6
          ],
          [
            "2024-09-15 20:40",
            "clb_robotics",
            "so-do-mach-xe-do-line.pdf",
            3
          ],
          [
            "2024-09-15 21:02",
            "SV240201",
            "slide-nguyen-ly-ke-toan.pdf",
            12
          ],
          [
            "2024-09-15 22:47",
            "SV220118",
            "do-an-mon-hoc.pdf",
            30
          ],
          [
            "2024-09-15 23:10",
            "clb_robotics",
            "kien-nghi-phong-clb.docx",
            1
          ],
          [
            "2024-09-15 23:18",
            "SV240146",
            "bao-cao-nhom-kinh-te-vi-mo.pdf",
            4
          ],
          [
            "2024-09-16 07:30",
            "SV240122",
            "danh-sach-lop-BC24A.xlsx",
            1
          ],
          [
            "2024-09-16 08:05",
            "clb_robotics",
            "don-xin-xuong-thuc-hanh.docx",
            2
          ]
        ]
      },
      {
        "ten": "nhat_ky_su_dung",
        "cot": [
          {
            "ten": "ma_buoi",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_phong",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "hoat_dong",
            "kieu": "TEXT"
          },
          {
            "ten": "trang_thai",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "BUOI-08",
            "clb-tham-tu",
            "2024-10-23",
            "Hướng dẫn tân thành viên",
            "DA_XAC_NHAN"
          ],
          [
            "BUOI-01",
            "P-KHO-CHUNG",
            "2024-10-01",
            "Nhận vật tư",
            "DA_XAC_NHAN"
          ],
          [
            "BUOI-06",
            "CLB-THAM-TU  ",
            "2024-10-16",
            "Kiểm kê hồ sơ",
            "DA_XAC_NHAN"
          ],
          [
            "BUOI-05",
            "clb-tham-tu",
            "2024-10-30",
            "Ôn SQL dự kiến",
            "DU_KIEN"
          ],
          [
            "BUOI-02",
            "CLB-THAM-TU",
            "2024-10-02",
            "Họp thành viên",
            "DA_XAC_NHAN"
          ],
          [
            "BUOI-04",
            "clb-tham-tu  ",
            "2024-10-09",
            "Ôn SQL",
            "DA_XAC_NHAN"
          ],
          [
            "BUOI-03",
            "P-KHO-CHUNG",
            "2024-10-06",
            "Nhận vật tư",
            "DA_XAC_NHAN"
          ]
        ]
      },
      {
        "ten": "tin_nhan",
        "cot": [
          {
            "ten": "ma_tin",
            "kieu": "TEXT"
          },
          {
            "ten": "thoi_diem",
            "kieu": "TEXT"
          },
          {
            "ten": "tai_khoan",
            "kieu": "TEXT"
          },
          {
            "ten": "loai",
            "kieu": "TEXT"
          },
          {
            "ten": "noi_dung",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "T-01",
            "2024-10-07 22:40",
            "clb_robotics",
            "GOC",
            "CLB Thám Tử soi dữ liệu sinh viên đấy"
          ],
          [
            "T-02",
            "2024-10-07 22:55",
            "SV240254",
            "CHUYEN_TIEP",
            "CLB Thám Tử soi dữ liệu sinh viên đấy"
          ],
          [
            "T-03",
            "2024-10-08 07:10",
            "SV230311",
            "CHUYEN_TIEP",
            "CLB Thám Tử soi dữ liệu sinh viên đấy"
          ],
          [
            "T-04",
            "2024-10-08 07:30",
            "SV240213",
            "GOC",
            "Ai nhặt được thẻ xe ở căng tin"
          ],
          [
            "T-05",
            "2024-10-08 08:02",
            "SV220118",
            "CHUYEN_TIEP",
            "CLB Thám Tử soi dữ liệu sinh viên đấy"
          ],
          [
            "T-06",
            "2024-10-08 09:15",
            "clb_robotics",
            "GOC",
            "Tuyển thành viên đội robot"
          ],
          [
            "T-07",
            "2024-10-08 11:40",
            "SV240131",
            "CHUYEN_TIEP",
            "CLB Thám Tử soi dữ liệu sinh viên đấy"
          ],
          [
            "T-08",
            "2024-10-08 12:05",
            "SV240412",
            "GOC",
            "Nghe nói CLB Thám Tử soi điểm"
          ],
          [
            "T-09",
            "2024-10-08 12:30",
            "SV240201",
            "TRA_LOI",
            "thấy bảo clb thám tử soi dữ liệu sinh viên đấy"
          ],
          [
            "T-10",
            "2024-10-08 13:15",
            "SV240207",
            "TRA_LOI",
            "Ơ thật à? CLB Thám Tử soi dữ liệu sinh viên á"
          ]
        ]
      },
      {
        "ten": "dang_nhap_kenh",
        "cot": [
          {
            "ten": "tai_khoan",
            "kieu": "TEXT"
          },
          {
            "ten": "may",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "gio",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "clb_robotics",
            "MAY-XUONG-02",
            "2024-10-07",
            "15:10"
          ],
          [
            "clb_robotics",
            "MAY-VP-XUONG",
            "2024-10-07",
            "22:31"
          ],
          [
            "clb_robotics",
            "MAY-XUONG-02",
            "2024-10-08",
            "09:05"
          ],
          [
            "SV240254",
            "DIEN-THOAI",
            "2024-10-07",
            "22:50"
          ],
          [
            "SV240213",
            "DIEN-THOAI",
            "2024-10-08",
            "07:25"
          ]
        ]
      },
      {
        "ten": "dat_phong",
        "cot": [
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_phong",
            "kieu": "TEXT"
          },
          {
            "ten": "tu_gio",
            "kieu": "TEXT"
          },
          {
            "ten": "den_gio",
            "kieu": "TEXT"
          },
          {
            "ten": "muc_dich",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "2024-09-30",
            "XR-01",
            "19:00",
            "21:00",
            "Đội thi đấu tập"
          ],
          [
            "2024-09-30",
            "HT-01",
            "08:00",
            "11:00",
            "Tập văn nghệ khoa"
          ],
          [
            "2024-10-01",
            "xr-01",
            "14:00",
            "17:00",
            "Sinh hoạt thành viên"
          ],
          [
            "2024-10-02",
            "Ph-03 ",
            "14:00",
            "16:00",
            "Họp Đoàn khoa Kế toán"
          ],
          [
            "2024-10-02",
            "Xr-01",
            "19:00",
            "21:00",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-03",
            "HT-01 ",
            "18:00",
            "21:00",
            "Tập văn nghệ khoa"
          ],
          [
            "2024-10-04",
            "XR-01",
            "19:00",
            "21:30",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-05",
            "pt-02",
            "08:00",
            "11:00",
            "Câu lạc bộ guitar"
          ],
          [
            "2024-10-07",
            "XR-01",
            "14:00",
            "17:00",
            "Sửa bàn hàn"
          ],
          [
            "2024-10-07",
            "Xr-01 ",
            "19:00",
            "23:00",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-07",
            "Ph-03 ",
            "14:00",
            "16:00",
            "Họp ban cán sự lớp"
          ],
          [
            "2024-10-07",
            "HT-01",
            "18:00",
            "20:00",
            "Tập văn nghệ chào mừng 15/10"
          ],
          [
            "2024-10-08",
            "XR-01",
            "14:00",
            "17:00",
            "Sinh hoạt thành viên"
          ],
          [
            "2024-10-09",
            "xr-01",
            "19:00",
            "21:00",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-10",
            "XR-01 ",
            "14:00",
            "16:00",
            "Hướng dẫn thành viên mới"
          ],
          [
            "2024-10-11",
            "Xr-01",
            "19:00",
            "21:30",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-12",
            "XR-01",
            "08:00",
            "11:00",
            "Dọn xưởng"
          ],
          [
            "2024-10-12",
            "HT-01",
            "08:00",
            "11:00",
            "Tổng duyệt lễ kỷ niệm 15/10"
          ],
          [
            "2024-10-14",
            "HT-01",
            "14:00",
            "17:00",
            "Tổng duyệt lễ kỷ niệm 15/10"
          ],
          [
            "2024-10-15",
            "HT-01",
            "07:00",
            "11:30",
            "Lễ kỷ niệm ngày truyền thống"
          ]
        ]
      },
      {
        "ten": "bai_dang_kenh",
        "cot": [
          {
            "ten": "ma_bai",
            "kieu": "TEXT"
          },
          {
            "ten": "kenh",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "buoi",
            "kieu": "TEXT"
          },
          {
            "ten": "thiet_bi",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "BD-01",
            "clb_robotics",
            "2024-10-01",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-02",
            "clb_van_nghe",
            "2024-10-01",
            "TOI",
            "DIEN-THOAI"
          ],
          [
            "BD-03",
            "clb_robotics",
            "2024-10-02",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-04",
            "clb_robotics",
            "2024-10-03",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-05",
            "clb_tham_tu",
            "2024-10-03",
            "CHIEU",
            "MAY-CLB"
          ],
          [
            "BD-06",
            "clb_robotics",
            "2024-10-04",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-07",
            "clb_robotics",
            "2024-10-05",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-08",
            "clb_van_nghe",
            "2024-10-06",
            "TOI",
            "DIEN-THOAI"
          ],
          [
            "BD-09",
            "clb_robotics",
            "2024-10-07",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-10",
            "clb_robotics",
            "2024-10-07",
            "TOI",
            "MAY-VP-XUONG"
          ],
          [
            "BD-11",
            "clb_robotics",
            "2024-10-08",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-12",
            "clb_tham_tu",
            "2024-10-08",
            "CHIEU",
            "MAY-CLB"
          ],
          [
            "BD-13",
            "clb_robotics",
            "2024-10-09",
            "CHIEU",
            "DIEN-THOAI-TRUC"
          ],
          [
            "BD-14",
            "clb_van_nghe",
            "2024-10-09",
            "TOI",
            "DIEN-THOAI"
          ]
        ]
      },
      {
        "ten": "quet_the_thu_vien",
        "cot": [
          {
            "ten": "ten",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "thu",
            "kieu": "TEXT"
          },
          {
            "ten": "gio_vao",
            "kieu": "TEXT"
          },
          {
            "ten": "gio_ra",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "Nam",
            "2024-09-16",
            "THU_HAI",
            "21:45",
            "23:00"
          ],
          [
            "Hà Vy",
            "2024-09-16",
            "THU_HAI",
            "20:00",
            "22:50"
          ],
          [
            "Nam",
            "2024-09-23",
            "THU_HAI",
            "21:50",
            "23:05"
          ],
          [
            "Hà Vy",
            "2024-09-23",
            "THU_HAI",
            "20:05",
            "23:00"
          ],
          [
            "Nam",
            "2024-09-26",
            "THU_NAM",
            "19:30",
            "21:00"
          ],
          [
            "Nam",
            "2024-09-30",
            "THU_HAI",
            "21:40",
            "23:00"
          ],
          [
            "Hà Vy",
            "2024-09-30",
            "THU_HAI",
            "20:00",
            "22:55"
          ],
          [
            "Hà Vy",
            "2024-10-02",
            "THU_TU",
            "19:00",
            "20:30"
          ],
          [
            "Nam",
            "2024-10-07",
            "THU_HAI",
            "21:50",
            "23:05"
          ],
          [
            "Hà Vy",
            "2024-10-07",
            "THU_HAI",
            "20:00",
            "23:00"
          ]
        ]
      },
      {
        "ten": "don_linh_kien",
        "cot": [
          {
            "ten": "ma_don",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "nguoi_dat",
            "kieu": "TEXT"
          },
          {
            "ten": "linh_kien",
            "kieu": "TEXT"
          },
          {
            "ten": "so_luong",
            "kieu": "INTEGER"
          },
          {
            "ten": "so_tien",
            "kieu": "INTEGER"
          },
          {
            "ten": "ma_phien",
            "kieu": "TEXT"
          },
          {
            "ten": "trang_thai",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "DLK-01",
            "2024-09-20",
            "Nam",
            "Cảm biến dò line",
            4,
            120000,
            "PH-11",
            "DA_DUYET"
          ],
          [
            "DLK-02",
            "2024-09-24",
            "Bách",
            "Pin 18650",
            10,
            200000,
            "PH-12",
            "DA_DUYET"
          ],
          [
            "DLK-03",
            "2024-09-27",
            "Nam",
            "Động cơ servo",
            8,
            800000,
            "PH-13",
            "DA_DUYET "
          ],
          [
            "DLK-04",
            "2024-10-01",
            "Thảo",
            "Dây nối",
            20,
            60000,
            "PH-14",
            "DA_DUYET"
          ],
          [
            "DLK-05",
            "2024-10-02",
            "Nam",
            "Bánh xe",
            6,
            150000,
            "PH-15",
            "DA_DUYET"
          ],
          [
            "DLK-06",
            "2024-10-04",
            "Nam",
            "Mạch điều khiển",
            3,
            900000,
            "PH-16",
            "DA_DUYET  "
          ],
          [
            "DLK-07",
            "2024-10-05",
            "Khánh",
            "Ốc vít",
            100,
            40000,
            "PH-17",
            "DA_DUYET"
          ],
          [
            "DLK-08",
            "2024-10-07",
            "Nam",
            "Bộ khung nhôm",
            2,
            700000,
            "PH-18",
            "DA_DUYET "
          ],
          [
            "DLK-09",
            "2024-10-08",
            "Thảo",
            "Keo dán",
            5,
            30000,
            "PH-19",
            "CHO_DUYET"
          ],
          [
            "DLK-10",
            "2024-10-08",
            "Bách",
            "Mỏ hàn",
            2,
            180000,
            "PH-20",
            "CHO_DUYET"
          ]
        ]
      },
      {
        "ten": "phien_dang_nhap",
        "cot": [
          {
            "ten": "ma_phien",
            "kieu": "TEXT"
          },
          {
            "ten": "may",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "gio",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "PH-11",
            "MAY-XUONG-02",
            "2024-09-20",
            "15:20"
          ],
          [
            "PH-12",
            "MAY-XUONG-01",
            "2024-09-24",
            "16:05"
          ],
          [
            "PH-13",
            "MAY-VP-XUONG",
            "2024-09-27",
            "21:50"
          ],
          [
            "PH-14",
            "MAY-XUONG-01",
            "2024-10-01",
            "14:40"
          ],
          [
            "PH-15",
            "MAY-XUONG-02",
            "2024-10-02",
            "15:45"
          ],
          [
            "PH-16",
            "MAY-VP-XUONG",
            "2024-10-04",
            "22:10"
          ],
          [
            "PH-17",
            "MAY-VP-XUONG",
            "2024-10-05",
            "10:15"
          ],
          [
            "PH-18",
            "MAY-VP-XUONG",
            "2024-10-07",
            "22:05"
          ],
          [
            "PH-19",
            "MAY-XUONG-01",
            "2024-10-08",
            "15:00"
          ],
          [
            "PH-20",
            "MAY-XUONG-01",
            "2024-10-08",
            "16:30"
          ],
          [
            "PH-21",
            "MAY-XUONG-01",
            "2024-10-07",
            "16:00"
          ],
          [
            "PH-22",
            "MAY-XUONG-02",
            "2024-09-27",
            "15:30"
          ],
          [
            "PH-23",
            "MAY-VP-XUONG",
            "2024-10-02",
            "10:40"
          ]
        ]
      },
      {
        "ten": "kiem_ke",
        "cot": [
          {
            "ten": "linh_kien",
            "kieu": "TEXT"
          },
          {
            "ten": "so_luong_co",
            "kieu": "INTEGER"
          }
        ],
        "dong": [
          [
            "Cảm biến dò line",
            4
          ],
          [
            "Pin 18650",
            9
          ],
          [
            "Động cơ servo",
            0
          ],
          [
            "Dây nối",
            18
          ],
          [
            "Bánh xe",
            6
          ],
          [
            "Mạch điều khiển",
            0
          ],
          [
            "Ốc vít",
            85
          ],
          [
            "Bộ khung nhôm",
            0
          ],
          [
            "Keo dán",
            3
          ],
          [
            "Mỏ hàn",
            2
          ]
        ]
      },
      {
        "ten": "quy",
        "cot": [
          {
            "ten": "ma_quy",
            "kieu": "TEXT"
          },
          {
            "ten": "clb",
            "kieu": "TEXT"
          },
          {
            "ten": "ten_quy",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "Q-TT",
            "THAM_TU",
            "Quỹ CLB Thám Tử Dữ Liệu"
          ],
          [
            "Q-RB",
            "ROBOTICS",
            "Quỹ CLB Robotics"
          ]
        ]
      },
      {
        "ten": "khoan_chi",
        "cot": [
          {
            "ten": "ma_chi",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_don",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_quy",
            "kieu": "TEXT"
          },
          {
            "ten": "so_tien",
            "kieu": "INTEGER"
          },
          {
            "ten": "nguoi_duyet",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay_chi",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "KC-01",
            "DLK-01",
            "Q-RB",
            120000,
            "Bách",
            "2024-09-20"
          ],
          [
            "KC-02",
            "DLK-02",
            "Q-RB",
            200000,
            "Bách",
            "2024-09-24"
          ],
          [
            "KC-03",
            "DLK-03",
            "Q-TT",
            800000,
            "Khánh",
            "2024-09-10"
          ],
          [
            "KC-04",
            "DLK-04",
            "Q-RB",
            60000,
            "Bách",
            "2024-10-01"
          ],
          [
            "KC-05",
            "DLK-05",
            "Q-RB",
            150000,
            "Bách",
            "2024-10-02"
          ],
          [
            "KC-06",
            "DLK-06",
            "Q-TT",
            900000,
            "Khánh",
            "2024-09-11"
          ],
          [
            "KC-07",
            "DLK-07",
            "Q-RB",
            40000,
            "Khánh",
            "2024-10-05"
          ],
          [
            "KC-08",
            "DLK-08",
            "Q-TT",
            700000,
            "Khánh",
            "2024-09-12"
          ],
          [
            "KC-09",
            "VPP-01",
            "Q-TT",
            150000,
            "Minh Anh",
            "2024-09-18"
          ],
          [
            "KC-10",
            "VPP-02",
            "Q-TT",
            120000,
            "Minh Anh",
            "2024-10-03"
          ],
          [
            "KC-11",
            "VPP-03",
            "Q-TT",
            180000,
            "Minh Anh",
            "2024-10-09"
          ]
        ]
      },
      {
        "ten": "tai_san",
        "cot": [
          {
            "ten": "ma_tai_san",
            "kieu": "TEXT"
          },
          {
            "ten": "ten_tai_san",
            "kieu": "TEXT"
          },
          {
            "ten": "vi_tri",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "MIC-01",
            "Micro có dây",
            "TU_CLB"
          ],
          [
            "MIC-02",
            "Micro không dây",
            "TU_CLB"
          ],
          [
            "CAM-01",
            "Máy ảnh CLB",
            "TU_CLB"
          ],
          [
            "LOA-01",
            "Loa kéo",
            "KHO_CHUNG"
          ],
          [
            "CHAN-01",
            "Chân máy ảnh",
            "TU_CLB"
          ]
        ]
      },
      {
        "ten": "luan_chuyen",
        "cot": [
          {
            "ten": "ma_phieu",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_tai_san",
            "kieu": "TEXT"
          },
          {
            "ten": "vi_tri",
            "kieu": "TEXT"
          },
          {
            "ten": "nguoi_nhan",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "trang_thai",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "PX-11",
            "MIC-01",
            "TU_THIET_BI_CHUNG",
            "Tổ thiết bị",
            "2024-10-22",
            "DA_NHAN"
          ],
          [
            "PX-14",
            "LOA-01",
            "TU_CLB",
            "Tùng",
            "2024-10-23",
            "DA_NHAN"
          ],
          [
            "PX-17",
            "MIC-02",
            "TU_THIET_BI_CHUNG",
            "Tổ thiết bị",
            "2024-10-24",
            "DA_NHAN"
          ],
          [
            "PX-19",
            "MIC-02",
            "PHONG_AM_THANH",
            "Minh Anh",
            "2024-10-31",
            "DE_XUAT"
          ],
          [
            "PX-20",
            "CAM-01",
            "TU_CLB",
            "Minh Anh",
            "2024-10-28",
            "DA_NHAN"
          ],
          [
            "PX-21",
            "MIC-01",
            "PHONG_AM_THANH",
            "Tùng",
            "2024-10-31",
            "DE_XUAT"
          ],
          [
            "PX-22",
            "CHAN-01",
            "TU_CLB",
            "Duy",
            "2024-10-28",
            "DA_NHAN"
          ]
        ]
      },
      {
        "ten": "giao_dich",
        "cot": [
          {
            "ten": "ma_gd",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_phieu",
            "kieu": "TEXT"
          },
          {
            "ten": "loai",
            "kieu": "TEXT"
          },
          {
            "ten": "so_tien",
            "kieu": "INTEGER"
          },
          {
            "ten": "ma_tham_chieu",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "GD-01",
            "PH-01",
            "CHI",
            250000,
            "CT-101"
          ],
          [
            "GD-02",
            "PH-01",
            "HOAN",
            -20000,
            "NH-770"
          ],
          [
            "GD-03",
            "PH-02",
            "CHI",
            180000,
            "CT-102"
          ],
          [
            "GD-04",
            "PH-03",
            "CHI",
            90000,
            "CT-103"
          ],
          [
            "GD-05",
            "PH-04",
            "CHI",
            350000,
            "CT-104"
          ],
          [
            "GD-06",
            "PH-04",
            "HOAN",
            -60000,
            "NH-771"
          ],
          [
            "GD-07",
            "PH-04",
            "HOAN",
            -60000,
            "NH-771"
          ],
          [
            "GD-08",
            "PH-06",
            "HOAN",
            -15000,
            "NH-776"
          ]
        ]
      },
      {
        "ten": "luot_don",
        "cot": [
          {
            "ten": "ma_luot",
            "kieu": "TEXT"
          },
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "tinh_nguyen_vien",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_sv",
            "kieu": "TEXT"
          },
          {
            "ten": "diem_den",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "LD-0231",
            "2024-09-07",
            "SV240251",
            "SV240118",
            "KTX"
          ],
          [
            "LD-0234",
            "2024-09-07",
            "SV240251",
            "SV240164",
            "KTX"
          ],
          [
            "LD-0238",
            "2024-09-07",
            "SV240251",
            "SV240203",
            "KTX"
          ],
          [
            "LD-0241",
            "2024-09-07",
            "SV240251",
            "SV240289",
            "KTX"
          ],
          [
            "LD-0244",
            "2024-09-08",
            "SV240251",
            "SV240342",
            "KTX"
          ],
          [
            "LD-0247",
            "2024-09-08",
            "SV240251",
            "SV240317",
            "NHA_XE"
          ],
          [
            "LD-0252",
            "2024-09-08",
            "SV240251",
            "SV240377",
            "KTX"
          ],
          [
            "LD-0256",
            "2024-09-08",
            "SV240251",
            "SV240415",
            "KTX"
          ],
          [
            "LD-0259",
            "2024-09-08",
            "SV240251",
            "SV240466",
            "KTX"
          ]
        ]
      },
      {
        "ten": "danh_sach_lop_cu",
        "cot": [
          {
            "ten": "nam_hoc",
            "kieu": "TEXT"
          },
          {
            "ten": "lop",
            "kieu": "TEXT"
          },
          {
            "ten": "ho_ten",
            "kieu": "TEXT"
          },
          {
            "ten": "ghi_chu",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "1995-1996",
            "TH95",
            "Đỗ Văn Thịnh",
            "thôi học"
          ],
          [
            "1995-1996",
            "TH95",
            "Phạm Quang Hòa",
            null
          ],
          [
            "1995-1996",
            "TH95",
            "Lê Thị Mai",
            null
          ],
          [
            "1995-1996",
            "TH95",
            "Vũ Đình Khoa",
            "chuyển trường"
          ],
          [
            "1995-1996",
            "TH95",
            "Nguyễn Thu Hằng",
            null
          ],
          [
            "1997-1998",
            "TH95",
            "Phạm Quang Hòa",
            "ra trường"
          ],
          [
            "1997-1998",
            "TH95",
            "Lê Thị Mai",
            "Ra trường"
          ],
          [
            "1997-1998",
            "TH95",
            "Nguyễn Thu Hằng",
            "ra trường "
          ],
          [
            "1997-1998",
            "th95",
            "Bùi Xuân Trường",
            "ra trường"
          ],
          [
            "1997-1998",
            "TH 95",
            "Hoàng Minh Châu",
            "Ra trường "
          ],
          [
            "1999-2000",
            "KT97",
            "Trần Bích Ngọc",
            "ra trường"
          ],
          [
            "1999-2000",
            "KT97",
            "Đặng Văn Phúc",
            "ra trường"
          ],
          [
            "1999-2000",
            "KT97",
            "Nguyễn Văn Hùng",
            " ra trường"
          ],
          [
            "1999-2000",
            "KT97",
            "Lương Thị Oanh",
            "thôi học"
          ],
          [
            "1999-2000",
            "kt97",
            "Phan Hữu Nghĩa",
            "Ra trường"
          ],
          [
            "1999-2000",
            "KT97",
            "Ngô Thanh Tâm",
            "ra trường"
          ],
          [
            "1999-2000",
            "KT97",
            "Hoàng Minh Châu",
            "ra trường"
          ],
          [
            "2001-2002",
            "TH99",
            "Đinh Công Sơn",
            "ra trường"
          ],
          [
            "2001-2002",
            "TH99",
            "Mai Phương Thảo",
            "Ra trường"
          ],
          [
            "2001-2002",
            "TH99",
            "Cao Thị Hiền",
            "ra trường "
          ],
          [
            "2001-2002",
            "TH99",
            "Vương Tiến Dũng",
            "chuyển trường"
          ],
          [
            "2001-2002",
            "TH99",
            "Lý Quốc Bảo",
            "ra trường"
          ],
          [
            "2001-2002",
            "TH 99",
            "Trịnh Ngọc Ánh",
            " Ra trường"
          ],
          [
            "2001-2002",
            "TH99",
            "Đinh Công Sơn",
            "ra trường"
          ],
          [
            "2003-2004",
            "KT01",
            "Nguyễn Văn Hùng",
            "ra trường"
          ],
          [
            "2003-2004",
            "KT01",
            "Tạ Thu Trang",
            "ra trường"
          ],
          [
            "2003-2004",
            "KT01",
            "Đoàn Việt Anh",
            "Ra trường"
          ],
          [
            "2003-2004",
            "KT01",
            "Kiều Thị Nhung",
            "ra trường "
          ],
          [
            "2003-2004",
            "kt01",
            "Chu Mạnh Cường",
            "ra trường"
          ],
          [
            "2003-2004",
            "KT01",
            "Lâm Gia Hân",
            "thôi học"
          ],
          [
            "2003-2004",
            "KT01",
            "Võ Thanh Sơn",
            "ra trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Bạch Thị Dung",
            "ra trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Hà Đức Long",
            "Ra trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Phùng Thị Vân",
            "ra trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Tô Quang Vinh",
            "ra trường "
          ],
          [
            "2004-2005",
            "TH02",
            "Trần Bích Ngọc",
            "chuyển trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Dương Hải Yến",
            "ra trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Lã Văn Tuấn",
            "ra trường"
          ],
          [
            "2004-2005",
            "TH02",
            "Hà Đức Long",
            "ra trường"
          ]
        ]
      },
      {
        "ten": "lich_hoc",
        "cot": [
          {
            "ten": "ma_lhp",
            "kieu": "TEXT"
          },
          {
            "ten": "mon",
            "kieu": "TEXT"
          },
          {
            "ten": "phong",
            "kieu": "TEXT"
          },
          {
            "ten": "thu",
            "kieu": "TEXT"
          },
          {
            "ten": "ca",
            "kieu": "TEXT"
          },
          {
            "ten": "gio_bat_dau",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "KTVM-01",
            "Kinh tế vi mô",
            "A205",
            "THU_HAI",
            "SANG",
            "07:30"
          ],
          [
            "KTVM-02",
            "Kinh tế vi mô",
            "B204",
            "THU_BA",
            "SANG",
            "07:30"
          ],
          [
            "KTVM-03",
            "Kinh tế vi mô",
            "B204",
            "THU_TU",
            "SANG",
            "07:30"
          ],
          [
            "KTVM-04",
            "Kinh tế vi mô",
            "B301",
            "THU_TU",
            "CHIEU",
            "13:30"
          ],
          [
            "KTVM-05",
            "Kinh tế vi mô",
            "B102",
            "THU_TU",
            "SANG",
            "09:30"
          ],
          [
            "KTVM-06",
            "Kinh tế vi mô",
            "C203",
            "THU_TU",
            "SANG",
            "07:30"
          ],
          [
            "KTVM-07",
            "Kinh tế vi mô",
            "B305",
            "THU_TU",
            "SANG",
            "09:30"
          ],
          [
            "KTVM-08",
            "Kinh tế vi mô",
            "A101",
            "THU_TU",
            "SANG",
            "09:30"
          ],
          [
            "KTVM-09",
            "Kinh tế vi mô",
            "B204",
            "THU_NAM",
            "SANG",
            "09:30"
          ],
          [
            "KTVM-11",
            "Kinh tế vi mô",
            "B204",
            "THU_TU",
            "SANG",
            "07:30"
          ],
          [
            "KTVM-12",
            "Kinh tế vi mô",
            "B102",
            "THU_TU",
            "SANG",
            "09:30"
          ]
        ]
      },
      {
        "ten": "dang_ky_hoc",
        "cot": [
          {
            "ten": "ma_lhp",
            "kieu": "TEXT"
          },
          {
            "ten": "ma_sv",
            "kieu": "TEXT"
          }
        ],
        "dong": [
          [
            "KTVM-03",
            "SV240228"
          ],
          [
            "KTVM-03",
            "SV240201"
          ],
          [
            "KTVM-03",
            "SV240204"
          ],
          [
            "KTVM-03",
            "SV240304"
          ],
          [
            "KTVM-03",
            "SV240307"
          ],
          [
            "KTVM-05",
            "SV240412"
          ],
          [
            "KTVM-05",
            "SV240207"
          ],
          [
            "KTVM-05",
            "SV240210"
          ],
          [
            "KTVM-07",
            "SV240418"
          ],
          [
            "KTVM-07",
            "SV240213"
          ],
          [
            "KTVM-07",
            "SV240216"
          ],
          [
            "KTVM-04",
            "SV240105"
          ],
          [
            "KTVM-04",
            "SV240122"
          ],
          [
            "KTVM-11",
            "SV240146"
          ],
          [
            "KTVM-06",
            "SV240131"
          ],
          [
            "KTVM-08",
            "SV240415"
          ],
          [
            "KTVM-01",
            "SV240310"
          ],
          [
            "KTVM-02",
            "SV240313"
          ],
          [
            "KTVM-09",
            "SV240316"
          ],
          [
            "KTVM-12",
            "SV240219"
          ]
        ]
      }
    ],
    "bangAo": [
      {
        "ten": "tra_cuu_k24",
        "sql": "SELECT s.ma_sv, s.ho_dem, s.ten, l.nganh FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop = l.ma_lop WHERE l.khoa_hoc = 2024"
      }
    ]
  }
} satisfies KichBanMvp;

/** Bảng dữ liệu = dòng của truyện (ở trên) + dữ liệu nền sinh lại lúc nạp (tools/noi-dung/nhieu-mvp.ts, hạt cố định). */
export const KICH_BAN_MUA_1 = { ...GOC, duLieu: GOC.duLieu ? themNhieuMvp(GOC.duLieu) : GOC.duLieu } satisfies KichBanMvp;
export const KICH_BAN_MVP = KICH_BAN_MUA_1;
