// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-mvp/**/*.md bởi `npm run noi-dung:sinh:mvp`
// (tools/noi-dung/sinh-mvp.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung:mvp` rồi
// `npm run noi-dung:sinh:mvp`, commit cả .md lẫn .gen.ts. Sửa tay ở đây → test "file sinh khớp nội dung" đỏ.
import type { KichBanMvp } from '../../mvp/types';

/** Kịch bản MVP (mở đầu + Vụ 1): noi-dung-mvp/. Chưa có runtime đọc (gói kiến trúc MVP, QĐ-077). */
export const KICH_BAN_MVP = {
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
      "vai": "Năm 1 Du lịch, bạn cùng phòng KTX 408 của người chơi, cháu chú Cường. Dẫn đường, nhắc lịch. \"Tớ cá là…\"",
      "bieuCam": [
        "neutral",
        "happy",
        "worried",
        "surprised",
        "thinking",
        "gai-dau",
        "chi-tay"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Bạn cùng phòng 408",
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
        "danhXung": "Thành viên mới của CLB Thám Tử",
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
        "danhXung": "Chủ nhiệm CLB Thám Tử",
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
        "danhXung": "Thành viên CLB, giữ tài sản",
        "nam": "Năm hai",
        "nganh": "Hành chính học",
        "cauNoi": "Chìa khóa, tủ hồ sơ với cái máy tính cũ đều tớ giữ.",
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
        "kind": "ngay",
        "ngay": 3,
        "khung": "sang"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Ban Pháp chế – Kiểm tra, Hội sinh viên",
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
        "danhXung": "Bảo vệ ký túc xá",
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
      "vai": "Bảo vệ giảng đường B. Cùng cô phụ trách mở hộp kiến nghị lúc 9h sáng thứ Hai.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Bảo vệ giảng đường B",
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
      "vai": "Phòng Đào tạo. Tạo tài khoản tra cứu của CLB trên laptop (ngày 2): chỉ xem bảng lớp; bảng có thông tin cá nhân phải có phiếu yêu cầu tra cứu.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Phòng Đào tạo",
        "nam": null,
        "nganh": null,
        "cauNoi": "Tài khoản này chỉ xem được bảng lớp. Muốn xem gì thêm thì mang phiếu sang.",
        "loi": "Cán bộ Phòng Đào tạo, phụ trách dữ liệu sinh viên. Cấp quyền rất chặt: xin gì cho nấy, dùng xong là khóa lại."
      }
    },
    {
      "id": "co-lan",
      "ten": "Cô Lan",
      "hoTen": null,
      "trongCau": "cô Lan",
      "vai": "Phòng Công tác sinh viên (CTSV). Gọi Minh Anh lên nhận thông báo; giải thích quy chế phiếu gửi.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Phòng Công tác sinh viên",
        "nam": null,
        "nganh": null,
        "cauNoi": "Sổ đó niêm phong. Cô cũng không được tự mở.",
        "loi": "Cán bộ Phòng Công tác sinh viên, người giải thích cho CLB các quy chế về phiếu gửi và hộp kiến nghị."
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
        "danhXung": "Phó hiệu trưởng phụ trách sinh viên",
        "nam": null,
        "nganh": null,
        "cauNoi": "Các em còn gì trình thêm không?",
        "loi": "Chủ trì buổi họp rà soát phòng CLB. Nghe hết các bên rồi mới quyết, và chỉ quyết dựa trên căn cứ."
      }
    },
    {
      "id": "thay-khai",
      "ten": "Thầy Khải",
      "hoTen": null,
      "trongCau": "thầy Khải",
      "vai": "Quản lý phòng máy.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Quản lý phòng máy",
        "nam": null,
        "nganh": null,
        "cauNoi": "Các em chỉ xem đúng dòng liên quan thôi nhé.",
        "loi": "Thầy quản lý phòng máy của trường. Máy nào ai ngồi, lệnh in nào của ai, thầy đều có nhật ký."
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
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Sinh viên lớp BC24A",
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
        "danhXung": "Sinh viên lớp BC24A",
        "nam": "Năm nhất",
        "nganh": null,
        "cauNoi": "Tôi nói thẳng vậy thôi.",
        "loi": "Sinh viên lớp BC24A, nói gì cũng thẳng. Nhóm của Hiếu vừa xin phòng làm bài nhóm mà không được."
      }
    },
    {
      "id": "co-phu-trach",
      "ten": "Cô phụ trách hộp kiến nghị",
      "hoTen": null,
      "trongCau": "cô phụ trách hộp kiến nghị",
      "vai": "Giữ sổ niêm phong. Chỉ xuất hiện qua lời kể và tài liệu.",
      "bieuCam": [],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": true,
      "gioiThieu": null
    }
  ],
  "canh": [
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
      "id": "ban-do",
      "ten": "Bản đồ trường",
      "anhNen": null
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
    "chuoiDau": "md-00-xe-buyt",
    "ngayMoDau": "2024-09-08",
    "ngay": [
      {
        "so": 1,
        "ten": "Sảnh tòa B",
        "kieu": "theo-truyen",
        "chuoi": "n1-mo",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 2,
        "ten": "Tài khoản CLB",
        "kieu": "theo-truyen",
        "chuoi": "n2-mo",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 3,
        "ten": "Phiếu tra cứu",
        "kieu": "theo-truyen",
        "chuoi": "n3-mo",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 4,
        "ten": "Sổ niêm phong",
        "kieu": "theo-truyen",
        "chuoi": "n4-mo",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 5,
        "ten": "Cổng KTX",
        "kieu": "theo-truyen",
        "chuoi": "n5-mo",
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
    }
  },
  "chuoi": [
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
          "text": "Tìm ký túc xá đã. Thông báo chỉ ghi: phòng 408."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chủ nhật, 08/09/2024 · Đại học Chấn Hưng"
        },
        {
          "type": "note",
          "text": "Xe buýt vừa chạy khỏi trạm; người chơi đứng trên vỉa hè cạnh vali. Nền: cổng hai trụ, thanh chắn, tòa mái ngói đỏ bên trái, tòa kính bên phải."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xe buýt dừng trước cổng trường. Cửa vừa mở, hơi nóng đầu giờ chiều hắt thẳng vào mặt."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Phòng 408. Cơ mà ký túc xá nằm đâu thì thông báo không ghi…)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Mấy bạn kéo vali vòng qua thanh chắn, đi thẳng theo con đường rợp bóng cây."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Chắc cùng về ký túc xá. Cứ bám theo đã.)"
        },
        {
          "type": "goto",
          "to": "md-00-cong-ktx"
        }
      ]
    },
    {
      "id": "md-00-cong-ktx",
      "title": "Kéo vali qua sân trường tới cổng ký túc xá",
      "canh": "cong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Qua dãy giảng đường sơn vàng, qua nhà để xe, cuối đường là một cổng sắt xanh kéo ngang. Bên trong là mấy dãy nhà bốn tầng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bánh vali kẹt vào ray cổng. Phải nhấc bổng cả cái vali lên mới qua được."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Phòng 408, tầng bốn. Mong là có thang máy.)"
        },
        {
          "type": "goto",
          "to": "md-00-sanh-ktx"
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
          "text": "Sảnh tầng một mát, vắng. Bên trái là thang máy, trên tường là bảng tin của khu nhà. Xem xong cả hai thì một cậu sinh viên áo sơ mi cam, cổ đeo thẻ, từ hành lang bên phải đi ra."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mát hẳn. Giờ lên tầng bốn kiểu gì đây…)"
        },
        {
          "type": "explore",
          "id": "kp-sanh-ktx",
          "diem": [
            {
              "sprite": "obj-thong-bao-thang-may",
              "x": 12,
              "y": 44,
              "rong": 4,
              "chuoi": "md-00-thang-may",
              "sau": [],
              "nhan": "Xem tờ giấy trên cửa thang máy"
            },
            {
              "sprite": "obj-so-do-ktx",
              "x": 44,
              "y": 40,
              "rong": 11,
              "chuoi": "md-00-so-do",
              "sau": [],
              "nhan": "Xem bảng tin"
            },
            {
              "sprite": "nv:tung",
              "x": 80,
              "y": 100,
              "rong": 17,
              "chuoi": "md-00-gap-tung",
              "sau": [
                "md-00-thang-may",
                "md-00-so-do"
              ],
              "nhan": "Hỏi đường cậu bạn áo cam"
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
          "text": "(Hết tuần… Tức là cả tuần leo bộ.)"
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
          "text": "(Phòng 408 ở dãy giữa, tầng bốn. Đúng nhà này rồi.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Sơ đồ chỉ vẽ ba dãy nhà nhìn từ trên xuống. Thang bộ ở đâu thì chịu.)"
        }
      ]
    },
    {
      "id": "md-00-gap-tung",
      "title": "Hỏi đường cậu bạn áo cam: tạo nhân vật",
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
          "expression": "happy",
          "text": "Khuất sau hành lang kia. Lần đầu ai cũng tìm không ra. Cậu lên tầng mấy?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tầng bốn, phòng 408."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Ơ, 408 là phòng tớ! Thế là cùng phòng rồi. Tớ Tùng, học Du lịch."
        },
        {
          "type": "create-character",
          "truong": "ten",
          "asker": {
            "speaker": "tung",
            "expression": "neutral",
            "text": "Thế cậu tên gì?"
          },
          "xucXac": "Ngại nghĩ thì để tớ gieo xúc xắc đặt hộ cho. Đảm bảo không xui.",
          "luaChon": []
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "{{nv.nguoi-choi}} à. Dễ gọi đấy."
        },
        {
          "type": "create-character",
          "truong": "nganh",
          "asker": {
            "speaker": "tung",
            "expression": "neutral",
            "text": "Cậu học ngành gì?"
          },
          "xucXac": null,
          "luaChon": [
            "Kế toán",
            "Quản trị kinh doanh",
            "Tài chính – Ngân hàng",
            "Marketing",
            "Thương mại điện tử"
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Lại dân kinh tế. Cả phòng chẳng ai học Toán, sau này thi biết mượn vở ai đây."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Toán thì chịu, chứ Excel thì được. File xếp phòng mấy nghìn dòng, tớ lọc cái là ra tên mình."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thế là chia việc được rồi. Cậu lo lọc, tớ lo đường. Đưa tớ một đầu vali. Tớ cá là ba phút là tới tầng bốn."
        },
        {
          "type": "goto",
          "to": "md-01-ktx"
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
          "expression": "happy",
          "text": "Cất đồ xong tớ dẫn đi một vòng trường."
        },
        {
          "type": "image",
          "imageId": "chibi-408-vali"
        },
        {
          "type": "note",
          "text": "Hai người khiêng vali lên tới tầng bốn, cùng thở dốc. Tùng đẩy cửa phòng 408."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tới nơi rồi. Cất đồ xong tớ dẫn đi một vòng trường, tuần sau vào học đỡ lạc."
        },
        {
          "type": "goto",
          "to": "md-03-toa-b"
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
          "type": "note",
          "text": "Hộp tôn xanh treo trên mảng tường gần cửa ra vào (bản CHƯA có thẻ lịch ở khe — DX-03 chưa làm: [KHÁM PHÁ] không có vật tĩnh). Bác Thịnh đứng ở chân cầu thang."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sảnh tòa B vắng tanh. Trên mảng tường gần cửa ra vào treo một cái hộp tôn xanh, biển ghi \"Hộp tiếp nhận kiến nghị\"."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Trường số hóa hết rồi mà vẫn treo cái hộp này nhỉ."
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
          "expression": "neutral",
          "text": "Dạ không ạ, cháu dẫn bạn đi xem trường thôi."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Xem thì xem. Mép hộp sắc đấy, đừng thò tay vào."
        },
        {
          "type": "goto",
          "to": "md-07-cong-ktx-toi"
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
          "text": "Lúc về tới cổng ký túc xá thì trời đã tối. Đèn phòng trực vẫn sáng."
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
          "expression": "happy",
          "text": "Bọn cháu đi xem trường ạ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Chú tớ đấy, {{nv.nguoi-choi}}. Chú trực cổng này lâu lắm rồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chú ơi, qua nhà văn hóa cháu thấy dán poster CLB Thám Tử. Chú biết CLB đấy không?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "À, CLB đấy ngày xưa ghê lắm. Vụ mất xe, vụ gian lận thi, chúng nó đều moi ra được bằng chứng. Chẳng thần thánh gì, chịu khó hỏi từng người rồi đối chiếu giấy tờ thôi."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Giờ cái gì cũng lên hệ thống, ai còn nhờ sinh viên đi hỏi từng người nữa. Thứ Bảy có Ngày hội CLB đấy, thích thì ra xem."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thứ Bảy đi với tớ nhé?"
        },
        {
          "type": "goto",
          "to": "md-08-tuan-cong-dan"
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
          "text": "Thứ Hai → thứ Sáu — Tuần sinh hoạt công dân"
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
          "type": "goto",
          "to": "md-09-ngay-hoi"
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
          "text": "Nền nhà văn hóa ngày hội (nền chưa vẽ người); gian Robotics bên trái, cờ in hình bánh răng (ảnh cần vẽ thêm — xem báo cáo rà soát A4/A5); bàn Thám Tử bên phải."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sân nhà văn hóa giăng cờ, bàn CLB kê kín lối đi. Gian Robotics rộng nhất, cờ in hình bánh răng, dán tấm bảng \"Đang xin mở rộng xưởng thực hành\". Bàn CLB Thám Tử ở góc, chỉ có một chị ngồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chị ơi, CLB mình đang điều tra vụ nào không ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Không có em ạ. Hồ sơ, đăng ký giờ tra trên hệ thống là ra hết. Mấy kiểu điều tra ngày xưa hết đất diễn rồi."
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
          "expression": "worried",
          "text": "Em ra đây để đùa thì bàn bên kia vui hơn đấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Muốn vào thì điền phiếu này. Nhớ ghi mã sinh viên."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thẻ bọn em đang đeo là thẻ tạm của ký túc xá, chưa in mã chị ạ."
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
          "text": "Tùng cúi xuống màn hình vài giây rồi điền một mạch."
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
          "text": "Dạ vâng, em Tùng Du lịch ạ… Tên trong này na ná nhau quá, em nhìn nhầm dòng."
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
          "sql": "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng';",
          "soDong": 3,
          "chon": {
            "cot": "nganh",
            "giaTri": "Du lịch"
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ba người tên Tùng. Ngành Du lịch chỉ có một người: mã SV240251."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "…Nhanh thật. Bốn giờ chiều thứ Hai tuần sau CLB họp đầu năm, hai em ghi tên đi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Dạ em thì lọc kém, chứ tìm đường với nhắc lịch là giỏi nhất ạ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Biết nhận là mình nhầm thì được rồi. Bắt đầu từ việc đến đúng giờ nhé."
        },
        {
          "type": "goto",
          "to": "md-10-phong-clb"
        }
      ]
    },
    {
      "id": "md-10-phong-clb",
      "title": "Phòng CLB, thứ Hai 16h: làm quen và dọn phòng",
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
          "text": "Bốn giờ chiều, họp đầu năm. Đến đúng giờ nhé."
        },
        {
          "type": "note",
          "text": "Có mặt: Minh Anh, Duy, Hà Vy, Tùng, người chơi. Bộ máy bàn cũ ở góc (nền vẽ sẵn); laptop CLB Duy cất trong tủ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bốn giờ chiều thứ Hai. Phòng CLB nhỏ, một bàn dài, một tủ hồ sơ, một bộ máy bàn phủ bụi ở góc."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Ơ, hôm Ngày hội tớ không thấy cậu nhỉ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tớ đăng ký qua form. Hà Vy, Toán ứng dụng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Toán! Thế là tớ có chỗ mượn vở rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mượn thì được, chép thì không."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thế cậu đoán được tớ học gì không?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Khỏi đoán. Cổ đeo thẻ, tay lúc nào cũng cầm bản đồ trường. Du lịch chứ gì."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "smile",
          "text": "Còn tớ là Duy, năm hai Hành chính học. Chìa khóa phòng, tủ hồ sơ, cả cái laptop cũ cất trong tủ, đều tớ giữ."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ngăn dưới tớ chưa kiểm kê tới. Cậu mở xem có gì trong đấy."
        },
        {
          "type": "reminder",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ngăn dưới tủ tớ chưa kiểm kê tới."
        },
        {
          "type": "image",
          "imageId": "chibi-clb-nhom"
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
          "text": "Sổ tự học của chị Linh khóa trước đấy. Em cứ giữ mà dùng."
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
      "id": "md-11-la-thu",
      "title": "Phòng CLB, 16h40: lá thư",
      "canh": "phong-clb",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Minh Anh ra ngoài rồi quay lại với hai tờ giấy: thông báo lịch họp rà soát và bản chụp thư đã che thông tin."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bốn rưỡi, cô Lan bên Phòng Công tác sinh viên gọi chị Minh Anh lên. Mười phút sau chị quay về, tay cầm hai tờ giấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Thứ Hai tuần sau, phòng CLB mình bị đưa ra họp rà soát."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Có người bỏ thư vào hộp kiến nghị ở tòa B, đề nghị thu hồi phòng. Tên người gửi bị che, CLB chỉ được xem nội dung."
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
          "text": "Giờ đủ năm người thì CLB chưa bị giải thể. Nhưng phòng vẫn bị xét: báo cáo năm ngoái đã yếu, giờ thêm lá thư này."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thầy Quang, phó hiệu trưởng, cho CLB một tuần tự tìm căn cứ, mang ra buổi họp."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Thế giờ bắt đầu từ đâu ạ?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Khoan, tính lại đã. Mình mới có một chữ H với một cái hộp."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Thì bắt đầu từ cái hộp. Nói có sách, mách có chứng. Mai ra tòa B."
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
      "id": "n1-mo",
      "title": "Sáng ngày 1: Tùng rủ ra tòa B",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Ngày 1 — Thứ Ba"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Hộp kiến nghị tòa B thì hôm Chủ nhật tớ với {{nv.nguoi-choi}} đi qua rồi. Cái hộp tôn treo gần cửa ra vào ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thế thì ra tận nơi. Ai mở hộp, mở lúc nào, trong hộp còn sót lại gì."
        },
        {
          "type": "goto",
          "to": "n1-toa-b"
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
          "text": "Chưa biết là ai, lớp nào. Quanh cái hộp này có gì không?"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều thứ Ba, sảnh tòa B lại vắng như hôm Chủ nhật. Bác bảo vệ đứng ở chân cầu thang. Cạnh cái hộp vừa có thêm một tờ giấy mới dán."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Cái hộp, bác bảo vệ, tờ giấy mới dán… Bắt đầu từ đâu nhỉ.)"
        },
        {
          "type": "explore",
          "id": "kp-toa-b",
          "diem": [
            {
              "sprite": "obj-hop-kien-nghi",
              "x": 28,
              "y": 50,
              "rong": 8,
              "chuoi": "n1-hop",
              "sau": [],
              "nhan": "Soi khe hộp kiến nghị"
            },
            {
              "sprite": "nv:bac-tu",
              "x": 78,
              "y": 100,
              "rong": 16,
              "chuoi": "n1-bac-thinh",
              "sau": [],
              "nhan": "Hỏi bác bảo vệ"
            },
            {
              "sprite": "obj-thong-bao-hop",
              "x": 35.5,
              "y": 42,
              "rong": 4,
              "chuoi": "n1-thong-bao-hop",
              "sau": [],
              "nhan": "Đọc tờ giấy dán cạnh hộp"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Hộp ở tòa B, sáng thứ Hai chỉ có sinh viên các lớp sinh hoạt ở đây ra vào. Thẻ lịch thì của khoa Báo chí."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Lớp nào vừa sinh hoạt ở tòa B, vừa học Báo chí? Tính ra được lớp là bớt được cả trường."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tính bằng gì? CLB mình có được xem dữ liệu đâu."
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
          "text": "Lớp nào vừa ở tòa B, vừa học Báo chí? Mai có tài khoản mới tính được."
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
          "text": "Mắc ở mép tôn khe hộp là một góc thẻ lịch. Phần in còn nguyên: \"Khoa Báo chí – Truyền thông · K24\". Dòng viết tay \"Họ tên / Lớp\" bị xé mất."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thẻ lịch Tuần sinh hoạt công dân… giống hệt thẻ của tớ, chỉ khác là in cho khoa Báo chí."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ cá tên chủ thẻ nằm đúng ở mẩu bị rách!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mẩu đó giờ ai biết ở đâu. Mà thẻ mắc ở khe chưa chắc đã là của người bỏ thư."
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
          "text": "Cháu hỏi cái hộp à? Sáng thứ Hai 9 giờ, bác với cô phụ trách mở. Lá thư ấy nằm trên cùng."
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
          "text": "Chắc thế. Tối Chủ nhật bác đi khóa cửa, ngó qua khe thì hộp còn trống. Bảy giờ sáng thứ Hai bác mới mở cửa tòa."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Từ bảy giờ tới lúc mở hộp, ra vào tòa này toàn sinh viên mấy lớp sinh hoạt đầu tuần ở đây thôi."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Còn ai bỏ thì bác chịu. Ngần ấy đứa, bác nhớ sao hết mặt."
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
          "text": "\"Họp rà soát phòng sinh hoạt CLB: bốn giờ chiều thứ Hai tuần sau.\" Dán ngay cạnh hộp luôn."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Ai đi qua cũng đọc được. Thế là cả trường biết CLB mình sắp bị xét phòng."
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
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Ngày 2 — Thứ Tư"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Đơn xin quyền tra cứu, thầy Quang duyệt rồi. Lát nữa sang Phòng Đào tạo, cô Hạnh cài tài khoản cho CLB."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Laptop của CLB tớ mang theo."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Có tài khoản là tra được hết hả chị?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Được đúng những gì người ta cho phép. Hỏi cô là biết."
        },
        {
          "type": "goto",
          "to": "n2-co-hanh"
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
          "text": "Được xem đúng những gì người ta cho phép. Nghe cô nói hết đã."
        },
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
          "text": "Bảng lớp thôi cũng đủ khoanh vùng rồi ạ. Em cảm ơn cô."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "smile",
          "text": "Khoanh vùng thôi đấy nhé. Lớp thì không bỏ thư được."
        },
        {
          "type": "goto",
          "to": "n2-laptop"
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
          "text": "Lớp nào vừa ở tòa B vừa học Báo chí?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Hai tờ giấy nhớ trên bàn: Tòa B, Báo chí K24. Lớp nào khớp?"
        },
        {
          "type": "note",
          "text": "Phòng CLB buổi chiều. Laptop CLB đã đăng nhập tài khoản mới. Giấy nhớ [Tòa B], [Báo chí K24] trên bàn."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Về tới phòng CLB. Cái laptop cũ khởi động mất gần hai phút."
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
          "text": "Đừng cá. Tính."
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
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Ngày 3 — Thứ Năm"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị gọi cho cô Lan rồi. Các em mang kết quả hai lớp hôm qua sang, đấy là căn cứ để xin phiếu tra cứu."
        },
        {
          "type": "goto",
          "to": "n3-ctsv"
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
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Người gửi muốn được trả lời thì phải ghi mã sinh viên của mình vào phiếu gửi. Mã đó được chép vào sổ niêm phong."
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
          "text": "Chỉ khi có căn cứ bằng văn bản cho một mã cụ thể, cô phụ trách hộp mới tra và trả lời có hoặc không."
        },
        {
          "type": "note",
          "text": "Một anh sinh viên khoác vest xanh đen, kẹp cái bìa da, đứng ở cửa từ lúc nào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Ở cửa có một anh sinh viên khoác vest xanh đen, kẹp cái bìa da, đứng từ lúc nào không ai để ý."
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
          "text": "Các bạn chỉ được lập căn cứ. Tra sổ là việc của cô phụ trách, không phải của CLB."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tức là mình cần mã, và cần căn cứ cho từng mã một."
        },
        {
          "type": "goto",
          "to": "n3-cang-tin"
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
          "text": "Đọc thông báo rà soát chưa? Cái CLB Thám Tử ấy giữ nguyên một phòng chả để làm gì."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Nhóm tôi vừa xin phòng làm bài nhóm, người ta bảo hết phòng. Phải ngồi ké thư viện."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nghe gắt thế… hay thư là cậu này gửi?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ghét CLB với gửi thư là hai chuyện khác nhau."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "annoyed",
          "text": "Nhìn gì? Tôi nói thẳng vậy thôi, có gì tôi nói trước mặt."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Có tiếng gọi từ quầy: \"Hiếu ơi, lấy cơm này!\" Cậu ta đứng dậy, bỏ đi."
        },
        {
          "type": "goto",
          "to": "n3-laptop"
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
          "speaker": "narrator",
          "text": "Về phòng CLB. Có phiếu tra cứu, laptop hiện thêm bảng sinh viên."
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
          "text": "Có cả Hoài nữa. Hai người này mới chỉ khớp chữ H với lớp thôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Thế giờ làm gì?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mai mang hai mã sang Phòng Công tác sinh viên. Cô phụ trách tra sổ, có hay không là biết."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Hiếu và Hoài, cùng BC24A. Mai mang hai mã sang Phòng Công tác sinh viên."
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
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Ngày 4 — Thứ Sáu"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hai mã, kèm căn cứ: hai lớp, chữ H, cách lọc ra. Chị ghi cả vào đơn rồi. Các em mang sang Phòng Công tác sinh viên nhé."
        },
        {
          "type": "goto",
          "to": "n4-ctsv"
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
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Cô phụ trách tra rồi. SV240317: có trong sổ. SV240228: không có."
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
          "text": "Cô chỉ nói được là mã đó có trong sổ niêm phong. Thế thôi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "SV240228 là Hiếu… không có à? Thế là tớ cá trượt rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Trượt cũng được. Loại được một người."
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
          "text": "Theo quy chế, người có mã trong sổ sẽ được mời đến buổi họp, ngồi chờ bên ngoài. Có mời vào hay không là do buổi họp."
        },
        {
          "type": "branch",
          "id": "r-phong-may",
          "asker": {
            "speaker": "tung",
            "text": "Mà thư đánh máy thì phải in ở đâu chứ nhỉ? Tiện đường, ghé phòng máy không?"
          },
          "choices": [
            {
              "id": "ghe",
              "text": "Ghé phòng máy hỏi thầy Khải.",
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
      "id": "n4-phong-may",
      "title": "Phòng máy: nhật ký in",
      "canh": "phong-may",
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
          "text": "Chân trang thư là tên tệp. Nhật ký in sẽ ghi ai in nó."
        },
        {
          "type": "line",
          "speaker": "thay-khai",
          "expression": "neutral",
          "text": "Máy in ở đây nhớ hết: tài khoản nào in, lúc nào, tệp gì, mấy trang."
        },
        {
          "type": "line",
          "speaker": "thay-khai",
          "expression": "neutral",
          "text": "Máy in là của phòng thầy, nên phiếu thì thầy ký. Thầy mở cho các em đúng bảng nhật ký in, chỉ để lập căn cứ."
        },
        {
          "type": "line",
          "speaker": "thay-khai",
          "expression": "neutral",
          "text": "Bản in từ máy ở đây có dòng chân trang ghi tên tệp. Thư của các em có không?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Có ạ. Nhưng bản chụp bị xén mép, chỉ đọc được đoạn đầu: kien-nghi…"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Hoài nộp thư thì chắc Hoài in chứ gì!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thử thì biết."
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
          "type": "line",
          "speaker": "player",
          "text": "23 giờ 10 tối Chủ nhật. Một trang, tệp kien-nghi-phong-clb.docx, tài khoản SV210745."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mã bắt đầu bằng 21: khóa 2021. Năm tư rồi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Năm tư á? Thế người in không phải Hoài."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người in là một anh chị năm tư. Người mang đi nộp là Hoài. Hai việc, có khi là hai người."
        },
        {
          "type": "line",
          "speaker": "thay-khai",
          "expression": "neutral",
          "text": "Tài khoản ấy là của ai thì thầy không nói. Các em cũng chưa cần biết, đúng không?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người in là khóa 2021. Người nộp là Hoài. Hai việc, có khi là hai người."
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
          "text": "Chị ơi, sổ niêm phong có mã của Hoài. Mã của Hiếu thì không."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nói có sách, mách có chứng: đến đây đủ để nói ai nộp, chưa đủ để nói ai viết."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Còn thư ấy in ở đâu thì vẫn chưa ai biết…"
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
          "text": "Ngày 5 — Thứ Bảy"
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
          "type": "reminder",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Sáng thứ Hai ai ra cổng sớm, chú tớ hay để ý lắm."
        },
        {
          "type": "branch",
          "id": "r-chu-cuong",
          "asker": {
            "speaker": "tung",
            "text": "Tuần này chú tớ trực ca sáng đấy. Hỏi chú xem sáng thứ Hai có gì lạ không?"
          },
          "choices": [
            {
              "id": "hoi",
              "text": "Hỏi chú Cường.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "di-toi",
                  "chuoi": "n5-chu-cuong"
                }
              ]
            },
            {
              "id": "di",
              "text": "Thôi, chú đang bận. Đi thôi.",
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
          "text": "Sáng thứ Hai à… 6 giờ 45, chú thấy một cậu lớn, dáng sinh viên khóa trên, balo đeo huy hiệu bánh răng, đứng ngoài cổng đưa phong bì nâu cho một bạn nữ."
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
          "text": "Còn anh kia, chú có nhìn rõ mặt không ạ?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Không. Cậu ấy đứng xa, trời lại mới sáng, chú chỉ để ý cái huy hiệu với dáng người thôi."
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
          "type": "goto",
          "to": "n5-toi"
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
          "expression": "neutral",
          "text": "Soát lại nhé. Hộp ở tòa B, thẻ lịch khoa Báo chí: ra hai lớp. Chữ H trong hai lớp: Hiếu với Hoài. Sổ niêm phong: chỉ có mã của Hoài."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thứ Hai họp, mình chỉ nói đúng những gì có chứng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thế nhỡ người ta hỏi ai viết thư thì sao?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Có chứng thì trình chứng. Không có thì nói là chưa biết."
        },
        {
          "type": "image",
          "imageId": "chibi-bang-ghim"
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
          "type": "note",
          "text": "Thầy Quang ngồi giữa; Cô Lan và Quân một bên, CLB một bên. Hoài ngồi chờ ngoài hành lang theo quy chế, chưa được mời vào."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Hai, bốn giờ chiều. Phòng họp tầng ba. Thầy Quang ngồi giữa, cô Lan và anh Quân một bên, CLB một bên. Ngoài hành lang, Hoài ngồi chờ."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Hôm nay thầy phải chốt phương án xếp lại phòng cho các CLB. Trước khi sang bên xưởng thực hành, thầy nghe phần của CLB Thám Tử. Mời các em trình bày căn cứ."
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
          "text": "Bên tôi lọc lại cho chắc: tên bắt đầu bằng H hoặc học lớp BC24A, ra mười bốn dòng. Hồ sơ các bạn nộp chỉ có hai người."
        },
        {
          "type": "projector",
          "id": "hop-chieu-or",
          "source": {
            "kind": "sql",
            "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';"
          },
          "run": true,
          "expectedRowCount": 14
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Ơ… mười bốn dòng thật."
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "day-kinh",
          "text": "Mười bốn dòng… câu của anh Quân lấy rộng ở chỗ nào?"
        },
        {
          "type": "note",
          "text": "Nhịp 1: người chơi chạm vào chữ HOẶC, đổi thành VÀ → 2 dòng. Nhịp 2: \"Số liệu đây!\". Chạm sai, chạy thử đều không phạt."
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
          "type": "image",
          "imageId": "chibi-so-lieu-day"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Anh đang lấy cả người tên H lẫn cả lớp BC24A, gộp làm một ạ. Bọn em chỉ cần người vừa tên H, vừa học lớp BC24A."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "…Hai dòng. Vâng. Mời các bạn nói tiếp."
        },
        {
          "type": "goto",
          "to": "hop-01"
        }
      ]
    },
    {
      "id": "hop-01",
      "title": "Nhịp 3: hai dòng này là người viết thư?",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-thu-pham",
          "asker": {
            "speaker": "thay-quang",
            "text": "Vậy hai bạn này là người viết thư?"
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
              "text": "Có ạ. Hai bạn ấy khớp cả tên lẫn lớp của người ký.",
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
              "text": "Mời bạn ấy vào, chiếu hai dòng lên để bạn ấy xác nhận luôn cho nhanh.",
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
          "text": "Hoài được mời vào. Bạn ấy đứng nép cạnh cửa, hai tay nắm chặt quai túi."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Hoài, em kể lại giúp thầy hôm em nộp thư."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ… sáng thứ Hai em mang phong bì bỏ vào hộp ở tòa B ạ."
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
          "text": "Được, em ngồi xuống ghế đi. Các em còn gì trình thêm không?"
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
          "text": "Hoài bước vào đúng lúc màn chiếu còn hiện hai dòng. Một dòng có tên bạn ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Khoan… chiếu tên bạn ấy lên rồi gọi vào thế này, khác gì hỏi cung."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Ở đây không ai đối chất với một bạn năm nhất. Thầy hỏi, các em nghe."
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
          "text": "Hoài cúi gằm, không nói thêm câu nào."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "smug",
          "text": "Vậy là chính bạn ấy mang thư tới hộp."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mang tới hộp thôi anh. Chưa biết bạn ấy viết hay chỉ mang hộ."
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
      "title": "True end: Hoài kể chuyện được nhờ",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "condition",
          "dieuKien": {
            "kind": "va",
            "cac": [
              {
                "kind": "co",
                "id": "ev-nhat-ky-in"
              },
              {
                "kind": "co",
                "id": "clue-loi-chu-cuong"
              }
            ]
          }
        },
        {
          "type": "note",
          "text": "Minh Anh đặt tập hồ sơ xuống bàn."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thưa thầy, bọn em có thêm nhật ký in của phòng máy ạ. Tệp kiến nghị đòi phòng, một trang, in lúc 23:10 tối Chủ nhật từ tài khoản một sinh viên năm 4."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Còn sáng thứ Hai, bọn tớ nghe kể có một anh khóa trên đưa phong bì cho một bạn nữ khóa mình. Hoài ơi, phong bì cậu bỏ vào hộp là có người nhờ à?"
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Dạ… có một anh khóa trên nhờ em nộp hộ bản kiến nghị. Anh ấy bảo đang gấp, cứ ký như bình thường vào phiếu gửi, rồi ghi mã sinh viên của em để thầy cô tiện phản hồi. Em không mở phong bì ra xem ạ."
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
          "text": "Nhật ký in và lời kể sáng thứ Hai là hai nguồn riêng, cả hai đều khớp với lời em. Vậy em không phải người soạn thư."
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
          "text": "Còn người soạn thư, thầy sẽ gặp riêng. Không cần nêu tên ở đây."
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
          "type": "line",
          "speaker": "quan",
          "expression": "stunned",
          "text": "…Hóa ra người nộp còn không biết trong thư viết gì. Em xin lỗi thầy, xin lỗi các bạn. Bên em lọc rộng rồi vội nghi cả một lớp ạ."
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
          "text": "Được. Tớ nhớ đấy nhé."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Lúc cả nhóm ra tới cổng trường, có một anh khóa trên đi lướt qua. Trên balo cài một cái huy hiệu hình bánh răng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Này… tớ cá là…"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Đừng cá. Chưa có gì để tính cả."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu."
        },
        {
          "type": "image",
          "imageId": "cg-bong-huy-hieu"
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
          "text": "Hai dòng chỉ cho ta chỗ cần đến. Phần còn lại cần thêm bằng chứng, và biết hỏi đúng lúc, đúng cách."
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
      "sqlChuan": "SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep LIKE 'kien-nghi%';",
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
        "description": "1 trang, tệp kien-nghi-phong-clb.docx, tài khoản SV210745 (khóa 2021, năm 4). Người in thư không phải người nộp.",
        "giaTri": [
          "SV210745"
        ]
      },
      "ghiChu": [
        "Lần chạy \"sai có ích\": mã Hoài/Hiếu + tên tệp → 0 dòng. Bỏ điều kiện mã → 1 dòng: SV210745, 23:10 Chủ nhật."
      ]
    },
    "c-lop": {
      "id": "c-lop",
      "tieuDe": "Lớp ở tòa B và học Báo chí",
      "deBai": "Hộp ở tòa B. Thẻ lịch của khoa Báo chí. Lớp nào khớp cả hai?",
      "manhMoiLienQuan": [
        "clue-toa-b",
        "clue-bao-chi-k24"
      ],
      "mucTieuHoc": "Hai điều kiện. VÀ giữ lớp khớp cả hai (2 lớp); HOẶC giữ lớp khớp một trong hai (5 lớp).",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
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
              "expression": "worried",
              "text": "Ơ, năm lớp? Tớ tưởng thêm điều kiện thì phải ít đi chứ."
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
        "Tùng rủ nối HOẶC → 5 lớp. Đổi VÀ → 2 lớp (BC24A, BC23A) → phiếu kết quả vào hồ sơ."
      ]
    },
    "c-ten-h": {
      "id": "c-ten-h",
      "tieuDe": "Tên bắt đầu bằng H trong hai lớp",
      "deBai": "Chữ ký chỉ đọc được chữ H. Người ký học một trong hai lớp. Là ai?",
      "manhMoiLienQuan": [
        "clue-chu-ky-h"
      ],
      "mucTieuHoc": "\"=\" so khớp chính xác, ra 0 dòng thì xem lại dữ liệu; \"bắt đầu bằng\" (LIKE 'H%') mới khớp một chữ cái.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 0,
            "cot": [
              "ma_lop",
              "ten"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không ai tên đúng một chữ H cả."
            },
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Ơ, không ai à? Rõ ràng chữ ký có chữ H mà."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 0,
            "cot": [
              "ten"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Không ai tên đúng một chữ H cả."
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
              "text": "Chẳng ra ai cả. Trong hai lớp ấy không ai khớp như thế."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 1,
            "cot": [
              "ma_lop",
              "ho_dem"
            ]
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Mai? Họ Hồ bắt đầu bằng H, nhưng tên thì không."
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
        "Lần chạy \"sai có ích\": kéo [H] với phép \"bằng\" → 0 dòng (không ai tên đúng một chữ \"H\"). Đổi \"bắt đầu bằng\" → 2 dòng (Hiếu, Hoài). Bẫy: lọc nhầm cột ho_dem → 1 dòng."
      ]
    },
    "c-sua-or-quan": {
      "id": "c-sua-or-quan",
      "tieuDe": "Câu truy vấn trên màn chiếu",
      "deBai": "Câu của Quân đang chiếu trên màn: \"tên bắt đầu bằng H hoặc lớp BC24A\", ra 14 dòng. Hồ sơ CLB nộp chỉ có 2.",
      "manhMoiLienQuan": [
        "clue-chu-ky-h"
      ],
      "mucTieuHoc": "Phần hợp (OR) và phần giao (AND).",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "truyVanNapSan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';",
      "phanUng": [],
      "vatChung": {
        "id": "ev-hai-dong-sua",
        "title": "Hai dòng sau khi sửa",
        "description": "Truy vấn của Quân sau khi đổi OR thành AND.",
        "giaTri": []
      },
      "ghiChu": []
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
        "Nội dung": "Bác và cô phụ trách mở hộp 9h sáng thứ Hai; thư nằm trên cùng. Từ 7 giờ tới lúc mở hộp, ra vào tòa B chỉ có sinh viên các lớp sinh hoạt ở tòa này."
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
        "Nội dung": "Cô phụ trách chỉ trả lời có/không cho một mã cụ thể khi có căn cứ bằng văn bản."
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
        "Nội dung": "Cô Lan ký, anh Quân (Hội sinh viên) ký giám sát. Căn cứ: hai lớp BC24A, BC23A. Mở bảng sinh viên, bốn cột: mã, họ đệm, tên, mã lớp. Chỉ để lập căn cứ; tra sổ niêm phong là việc của cô phụ trách."
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
        "Nội dung": "Một cậu dáng sinh viên khóa trên, balo đeo huy hiệu bánh răng, đưa phong bì nâu cho một bạn nữ; bạn nữ cầm rồi đi thẳng về phía tòa B. Chú không nhìn rõ mặt."
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
        "Nguồn": "Cô phụ trách hộp kiến nghị tra sổ, qua Phòng CTSV",
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
        "Nguồn": "Thầy Khải, phòng máy",
        "Nội dung": "Bản in từ máy phòng máy có dòng chân trang ghi tên tệp. Chân trang bản chụp lá thư bị xén, chỉ đọc được đoạn đầu: \"kien-nghi-…\"."
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
      "heading": "Sổ chị Linh",
      "fields": {
        "Tiêu đề": "Sổ tự học của chị Linh",
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
          "Họp rà soát phòng sinh hoạt CLB: bốn giờ chiều thứ Hai tuần sau."
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
          "CLB chỉ lập danh sách mã ứng viên kèm căn cứ; cô phụ trách tự tra sổ. Tài khoản CLB chỉ xem bảng lớp; bảng khác cần phiếu yêu cầu tra cứu của Phòng CTSV."
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
      "sql": "SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep LIKE 'kien-nghi%';",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/c-in.md:3 thẻ c-in, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-lop.md:3 thẻ c-lop, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-ten-h.md:3 thẻ c-ten-h, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-ten-h.md:26 thẻ c-sua-or-quan, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng';",
      "soDong": 3,
      "noi": "noi-dung-mvp/kich-ban/00-mo-dau.md:124 [LỌC THỬ lt-ngay-hoi]"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';",
      "soDong": 14,
      "noi": "noi-dung-mvp/kich-ban/06-hop-va-ket.md:15 [MÀN CHIẾU hop-chieu-or]"
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
            "SV210745",
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
            "SV210745",
            "don-xin-xuong-thuc-hanh.docx",
            2
          ]
        ]
      }
    ],
    "bangAo": [
      {
        "ten": "tra_cuu_k24",
        "sql": "SELECT s.ma_sv, s.ho_dem, s.ten, l.nganh FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop = l.ma_lop"
      }
    ]
  }
} satisfies KichBanMvp;
