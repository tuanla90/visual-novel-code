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
      "id": "nam",
      "ten": "Nam",
      "hoTen": null,
      "trongCau": "Nam",
      "vai": "Thành viên CLB Robotics, trực kênh và giữ sổ sách của xưởng. Xuất hiện từ Vụ 2 (tin đồn): trông đáng ngờ vì là người trực kênh, tới Vụ 3 mới được gỡ nghi. Không nói học năm mấy (dàn ý mùa 1). Chưa có ảnh: chỉ dùng biểu cảm neutral.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Thành viên CLB Robotics",
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
      "vai": "Chủ tịch Hội sinh viên, kiêm trưởng CLB Robotics (năm 4). Người đứng sau lá thư, tin đồn và ba đơn mượn tên Nam: lấy tiền quỹ CLB Thám Tử cho việc riêng, ghi thành linh kiện. Chỉ lên hình ở Vụ 5 (phòng họp); tự nhận, không bị bêu, không nêu việc riêng. Không gọi họ tên đầy đủ. Chưa có ảnh: chỉ dùng biểu cảm neutral.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay-hop"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Chủ tịch Hội sinh viên, trưởng CLB Robotics",
        "nam": null,
        "nganh": null,
        "cauNoi": "Tôi duyệt là đúng thẩm quyền.",
        "loi": "Chủ tịch Hội sinh viên, trưởng CLB Robotics. Nói chắc, bám thẩm quyền, ít khi phải giải thích với ai."
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
    },
    {
      "id": "xuong-robot",
      "ten": "Xưởng CLB Robotics",
      "anhNen": "bg-mvp-nha-van-hoa"
    },
    {
      "id": "thu-vien",
      "ten": "Thư viện trường",
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
      },
      {
        "so": 6,
        "ten": "Từ phiếu đến pattern",
        "kieu": "theo-truyen",
        "chuoi": "v2-tong-hop",
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
        "id": "vu2",
        "ten": "Tin đồn",
        "chuoi": "tin-mo",
        "ngay": "2024-10-09",
        "tieuDeKet": "Một tài khoản, chưa phải một người",
        "loiKet": "Tin gốc đi từ tài khoản kênh của CLB Robotics, lúc 22:40 tối thứ Hai. Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi."
      },
      {
        "id": "vu3",
        "ten": "Tranh cãi trong nhóm",
        "chuoi": "v3-mo",
        "ngay": "2024-10-10",
        "tieuDeKet": "Nam ở thư viện lúc tin được gửi",
        "loiKet": "Bản ghi quẹt thẻ của thư viện và trí nhớ của Hà Vy là hai nguồn riêng, cùng đặt Nam ở thư viện lúc 22:40. Người gửi tin ngồi máy văn phòng xưởng, là ai thì chưa biết."
      },
      {
        "id": "vu4",
        "ten": "Giúp Nam",
        "chuoi": "v4-mo",
        "ngay": "2024-10-14",
        "tieuDeKet": "Có người mượn tên Nam",
        "loiKet": "Ba đơn đứng tên Nam được tạo ban đêm từ máy văn phòng xưởng, cùng cái máy đã gửi tin đồn, một đơn đúng tối Nam ở thư viện. Máy thì biết, tay thì chưa. Ba người có chìa phòng."
      },
      {
        "id": "vu5",
        "ten": "Sổ quỹ",
        "chuoi": "v5-mo",
        "ngay": "2024-10-18",
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
        "moSau": "vu2",
        "ngay": "2024-10-25",
        "tieuDeKet": "Bốn mục có trong sổ, không hơn",
        "loiKet": "Bản xuất và sổ giấy là hai nguồn riêng, cùng ra bốn buổi đã ký. Hồ sơ ghi đúng điều đó: không nói ai tới dự, không nói buổi nào có ích."
      },
      {
        "id": "micro",
        "ten": "Chiếc micro ở tủ chung",
        "chuoi": "p-mic-mo",
        "nguoiGiao": "duy",
        "moSau": "vu4",
        "ngay": "2024-11-01",
        "tieuDeKet": "Micro không mất, chỉ đổi chỗ",
        "loiKet": "Phiếu PX-17 đã có người nhận, chuyển micro không dây sang tủ thiết bị dùng chung; mã dán trên micro trong tủ khớp với mã trên phiếu. Bảng không nói ai quên báo, và hồ sơ cũng không nói thay."
      },
      {
        "id": "hoan-tien",
        "ten": "Một lần hoàn tiền, hai dòng ghi",
        "chuoi": "p-hoan-mo",
        "nguoiGiao": "minh-anh",
        "moSau": "vu5",
        "ngay": "2024-11-08",
        "tieuDeKet": "Một khoản hoàn, bản xuất ghi hai lần",
        "loiKet": "Phiếu PH-04 có hai dòng hoàn tiền cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Báo cáo được sửa, bản cũ được giữ. Ai nhập trùng thì bảng không ghi."
      }
    ]
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
          "text": "23 giờ 10 tối Chủ nhật. Một trang, tệp kien-nghi-phong-clb.docx, tài khoản clb_robotics."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Không phải mã sinh viên. Đây là tài khoản dùng chung của một CLB."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Robotics á? Thế người in không phải Hoài."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thư in từ tài khoản của CLB Robotics. Người mang đi nộp là Hoài. Hai việc, có khi là hai người."
        },
        {
          "type": "line",
          "speaker": "thay-khai",
          "expression": "neutral",
          "text": "Tài khoản ấy những ai dùng thì thầy không nói. Các em cũng chưa cần biết, đúng không?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thư in từ tài khoản CLB Robotics. Người nộp là Hoài. Hai việc, có khi là hai người."
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
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Tuần này chú tớ trực ca sáng đấy. Hỏi chú xem sáng thứ Hai có gì lạ không."
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
          "text": "Không. Cậu ấy đứng xa, trời lại mới sáng, chú chỉ để ý cái huy hiệu thôi."
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
          "text": "Huy hiệu bánh răng… Hôm Ngày hội, gian Robotics treo cờ in đúng hình ấy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Huy hiệu thì cả CLB đeo. Mới biết là một người của Robotics, chưa biết là ai."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thế Robotics thì dính gì tới phòng của mình?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chưa biết. Ghi lại đã."
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
            "text": "Mã trong sổ là của Hoài. Thư do Hoài mang tới hộp. Chữ ký bắt đầu bằng H, Hoài cũng H. Bên tôi kết luận: Hoài là người viết lá thư này."
          },
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
              "id": "ev-hai-dong-sua",
              "muc": "goi-y",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Hai dòng, hai người. Vẫn không nói ai viết."
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
      "title": "True end: Hoài kể chuyện được nhờ; lời nhắn của chị Linh",
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
          "text": "Dạ… có một anh em không quen nhờ em nộp hộ bản kiến nghị. Anh ấy bảo đang gấp, cứ ký như bình thường vào phiếu gửi, rồi ghi mã sinh viên của em để thầy cô tiện phản hồi. Em không mở phong bì ra xem ạ."
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
          "text": "Nhật ký in khớp với lời em. Vậy em không phải người soạn thư."
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
          "text": "Chiều muộn, cả nhóm về phòng CLB dọn bảng. Từ cuốn sổ của chị Linh rơi ra một mẩu giấy gấp tư."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Chữ chị Linh đây mà. Tớ giữ cuốn sổ này cả năm, chưa thấy tờ này bao giờ."
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
          "text": "Hai dòng chỉ cho ta chỗ cần đến. Phần còn lại cần thêm bằng chứng, và biết hỏi đúng lúc, đúng cách."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v2-tong-hop",
      "title": "Từ phiếu đến pattern",
      "canh": "phong-may",
      "mocSomNhat": 61,
      "nodes": [
        {
          "type": "task",
          "text": "Dùng kết quả đã lưu làm nguồn, rồi nhóm các lớp ở tòa B theo ngành."
        },
        {
          "type": "challenge",
          "challengeId": "c-v2-nguon-lop"
        },
        {
          "type": "challenge",
          "challengeId": "c-v2-nhom-lop"
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
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Vụ 2 — Thứ Tư, 9 tháng 10"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hơn hai tuần sau buổi họp rà soát. Chiều thứ Tư, phòng CLB."
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
          "type": "show-document",
          "documentId": "doc-tin-don"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-noi-dung-tin"
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
          "expression": "khoanh-tay",
          "text": "Thế nên chị mới cần biết tin này bắt đầu từ đâu. Cô Lan cho mình bản xuất các tin công khai của kênh, từ tối thứ Hai tới trưa hôm qua."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tin công khai, ai vào kênh cũng đọc được. Tớ nạp vào laptop rồi. Bản xuất ghi nguyên văn từng tin, kể cả tin bấm chuyển tiếp: bấm chuyển thì chữ giữ y nguyên."
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
          "type": "challenge",
          "challengeId": "c-tin-don"
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
          "type": "goto",
          "to": "tin-gap-nam"
        }
      ]
    },
    {
      "id": "tin-gap-nam",
      "title": "Xưởng Robotics: gặp Nam; lấy phiếu làm nguồn, tìm tin gốc",
      "canh": "xuong-robot",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Xưởng của CLB Robotics nằm cuối dãy nhà văn hóa. Một cậu đang ngồi dán nhãn hộp linh kiện, ngẩng lên khi thấy cả nhóm."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Các cậu tìm ai? Ban chủ nhiệm chiều nay đi họp cả rồi."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Bọn tớ bên CLB Thám Tử. Kênh của Robotics do ai trực thế?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tớ. Tớ là Nam. Bài tuyển thành viên, lịch xưởng, đều tớ đăng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thế cái tin \"CLB Thám Tử soi dữ liệu sinh viên\" cũng là cậu đăng à?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tin nào cơ? Cho tớ xem."
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
          "text": "Phiếu này mình ghim rồi. Năm tin ấy là đống đã thu hẹp; lọc tiếp ngay trên nó thì chắc chắn chỉ tìm trong đúng năm tin, không lạc sang tin khác của kênh."
        },
        {
          "type": "task",
          "text": "Trong năm tin đó, tin nào là tin gốc?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu vừa ghim dùng làm nguồn được. Lọc tiếp ra tin gốc."
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
          "text": "…Từ kênh của bọn tớ thật à."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Kênh của cậu, tài khoản của cậu. Cậu đăng chứ còn ai!"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tớ chỉ đăng bài buổi chiều. 22 giờ 40 thì tớ không ngồi kênh."
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
          "text": "Thế cậu tưởng mỗi mình tớ có mật khẩu à? Cả ban chủ nhiệm đều biết. Giờ đó xưởng còn mở, ai chả vào máy được, sao cứ đổ cho tớ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Xưởng mở giờ đó? Ngoài cửa dán rành rành cái bảng đăng ký kia kìa. Nói điêu là lộ ngay."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Còn mật khẩu nhiều người biết thì kênh có ghi ai đăng nhập không? Không có thì bọn tớ nhờ bên quản trị trường mở."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "…Khỏi nhờ. Tớ là quản trị kênh, tớ mở nhật ký đăng nhập được. Xem đi, xem cả bảng ngoài cửa luôn."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Vậy là hai chỗ kiểm được. Xem cả hai, hay xem một rồi về báo chị Minh Anh, tùy mình."
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
          "type": "branch",
          "id": "r-tin-tuyen",
          "asker": {
            "speaker": "ha-vy",
            "text": "Hai chỗ Nam vừa buột miệng nói ra. Xem chỗ nào trước?"
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
          "text": "Bảng này ghi tài khoản nào đăng nhập, từ máy nào, ngày nào, giờ nào. Tớ chỉ mở ra thôi, không lọc gì."
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
          "text": "Lần buổi chiều là tớ, tớ hay ngồi máy số 2. Lần buổi tối thì không phải tớ. Phòng văn phòng là phòng riêng, thường khóa, chìa thì ban chủ nhiệm giữ. Tớ có vào đó bao giờ đâu."
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
          "text": "Khoan! Bảng xưởng ghi tối đó đội thi đấu tập tới 23 giờ, cậu bảo cậu về sớm. Mà 22 giờ 31 tài khoản của cậu đăng nhập ngay trong phòng văn phòng xưởng. Giải thích đi!"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "…Tài khoản của kênh, không phải của tớ. Tớ về trước 22 giờ. Phòng văn phòng thường khóa, chìa ban chủ nhiệm giữ, tớ không có."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Hai nguồn khớp nhau ở một chỗ: 22 giờ 31, máy văn phòng xưởng, trong khung giờ lịch ghi xưởng đăng ký tới 23 giờ. Lịch là đăng ký, không phải điểm danh. Tùng, cậu đang ghép hai bảng với một người, mà bảng nào cũng không có tên người."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…Ừ thì chưa có tên."
        },
        {
          "type": "goto",
          "to": "tin-ket"
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
          "text": "Cạnh cửa xưởng có tấm bảng đăng ký dùng xưởng, kín chữ viết tay. Góc bảng ghi \"bản sao từ lịch đặt xưởng trên máy\"."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Khoan, góc bảng ghi \"bản sao từ lịch đặt xưởng trên máy\". Cổng tra cứu lịch của nhà văn hóa mở cho sinh viên, để tớ tải bản gốc về laptop tra cho chắc. Chữ tay dễ chép nhầm."
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
          "text": "Tối đó đội ở lại tập. Tớ cũng trong đội, nhưng tớ về sớm."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Về sớm thì ai làm chứng cho cậu?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Bọn nó cắm mặt hàn mạch, có ai ngẩng lên xem tớ về lúc nào. Với lại máy văn phòng đặt trong phòng riêng, thường khóa. Chìa do ban chủ nhiệm giữ, thành viên như tớ không có quyền đụng vào. Tớ về rồi thì ai vào đó ngồi, tớ chịu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tối đó xưởng có người tới 23 giờ, tin gửi 22:40. Nhưng đây là lịch đăng ký. Đăng ký chưa chắc là có mặt, có mặt cũng chưa chắc là ngồi máy, và ngồi máy trong phòng khóa thì phải có chìa."
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
          "text": "Khoan! Nhật ký kênh ghi 22 giờ 31 tài khoản đăng nhập từ máy văn phòng xưởng. Giờ bảng này ghi tối đó xưởng mở tới 23 giờ cho đội tập. Cậu bảo cậu về sớm?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Về trước 22 giờ. Còn phòng văn phòng thì thường khóa, chìa ban chủ nhiệm giữ, tớ không có."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Hai nguồn khớp nhau ở một chỗ: 22 giờ 31, máy văn phòng xưởng, trong khung giờ lịch ghi xưởng đăng ký tới 23 giờ. Lịch là đăng ký, không phải điểm danh. Tùng, cậu đang ghép hai bảng với một người, mà bảng nào cũng không có tên người."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "…Ừ thì chưa có tên."
        },
        {
          "type": "goto",
          "to": "tin-ket"
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
          "text": "Nam nói ra hai chỗ kiểm được. Bọn em mới xem một, chỗ kia chưa xem."
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
          "to": "tin-tuyen-xuong"
        },
        {
          "type": "goto",
          "to": "tin-tuyen-may"
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
          "text": "Nam nói ra hai chỗ kiểm được, bọn em xem cả hai. Giờ và chỗ khớp nhau, còn tên người thì không nguồn nào có."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hai nguồn riêng cùng khớp. Đến đây dữ liệu dừng, không phải mình non. Muốn biết ai ngồi máy thì phải hỏi người, không hỏi bảng. Cái nguyên tắc \"kiểm hai lần\" ấy chị học từ sổ chị Linh để lại."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nhắc mới nhớ. Trang \"Kiểm hai lần\" trong sổ… khoan đã."
        },
        {
          "type": "note",
          "text": "Duy lật sổ chị Linh. Nếu nhóm đi đủ hai hướng ngay từ đầu, một mẩu giấy rơi ra."
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "tin-ve-som"
          },
          "to": "tin-ket-luan"
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
          "text": "Kẹp ở trang \"Kiểm hai lần\". Một mẩu giấy, chữ chị Linh."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Sổ này chị chép lại từ một cuốn cũ hơn. Cuốn cũ không phải của chị.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thế cuốn cũ là của ai?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chưa biết. Cất vào hồ sơ đã."
        },
        {
          "type": "goto",
          "to": "tin-ket-luan"
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
          "text": "Nhưng mà Nam trực kênh. Tớ vẫn cá là Nam."
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
          "text": "Tớ thì chờ thêm một nguồn nữa rồi mới nói."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Một tài khoản chưa phải là một con người. Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi."
        },
        {
          "type": "end"
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
          "text": "Vụ 3 — Thứ Năm, 10 tháng 10"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều hôm sau. Phiếu tin gốc vẫn ghim giữa bảng. Bốn người, bốn cách đọc."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tài khoản kênh của Robotics. Nam trực kênh. Tối đó xưởng mở, Nam bảo về sớm mà chẳng ai làm chứng. Còn gì nữa?"
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
          "text": "Tớ thì chờ một nguồn nữa, ngoài kênh, rồi mới nói."
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
          "speaker": "nam",
          "expression": "neutral",
          "text": "Lại các cậu. Hôm nay định hỏi gì nữa?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Hỏi thẳng: tối thứ Hai cậu ở đâu?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Thư viện. Tối thứ Hai nào cũng thế, tới khi họ đóng cửa. Nhưng các cậu đâu có tin."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chưa tin, chưa không tin. Cậu cho bọn tớ xem bản xuất bài đăng của kênh được không? Cả tháng, mọi kênh cũng được, bọn tớ tự lọc."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Bản xuất của mục kênh thì ai quản trị cũng tải được. Đây. Lọc đi."
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
          "text": "Chín bài, chín dòng. Đọc từng dòng thì được, nhưng mình muốn biết kênh này hay đăng từ máy nào. Nhóm theo thiết bị, đếm mỗi nhóm."
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
          "text": "Điện thoại trực là cái tớ giữ. Tớ đăng toàn buổi chiều, bằng cái đó."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Điện thoại cậu giữ thì chứng minh được gì? Hôm đó cậu đổi sang máy bàn thì sao."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Thì tớ đã bảo tối đó tớ ở thư viện. Cửa từ thư viện ghi giờ vào giờ ra của từng thẻ. Trên cổng sinh viên, ai cũng tải được bản ghi của chính mình. Tớ tải rồi gửi vào nhóm cho các cậu."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Đấy. Một nguồn ngoài kênh. Đi thư viện."
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
          "text": "Thư viện trường, bàn cạnh cửa sổ. Nam mở cổng sinh viên trên điện thoại, tải bản ghi cửa từ của chính mình trong tháng 9 và tháng 10, gửi vào nhóm."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Tớ cũng tải bản của tớ, gộp chung vào một tệp cho dễ tra. Tên ai thì ghi tên người đó."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Lọc ra của tớ rồi xem."
        },
        {
          "type": "task",
          "text": "Nam vào thư viện những ngày nào?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tệp có cả hai tên. Lọc đúng tên Nam."
        },
        {
          "type": "challenge",
          "challengeId": "c-nam-thu-vien"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm lần. Ngày với thứ ghi sẵn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Năm dòng, nhìn là thấy thứ Hai nhiều. Nhưng \"nhiều\" là mấy? Thói quen thì phải đếm được."
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
          "text": "Thứ Hai bốn lần, tối nào có trong tệp cũng thế. Thứ Năm một lần."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tối thứ Hai thư viện vắng. Tớ ngồi bàn cạnh cửa sổ, làm bài tới khi họ đuổi."
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
          "text": "Tối thứ Hai nào tớ cũng ở thư viện. Tớ nhớ có một cậu tuần nào cũng tới muộn, ngồi bàn cạnh cửa sổ. Tớ không để ý mặt."
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
          "text": "Tối mùng 7 có hai người. Hà Vy vào 20 giờ, ra 23 giờ. Nam vào 21 giờ 50, ra 23 giờ 05."
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
          "text": "Tớ ngồi cách Nam hai bàn. Chuông 22 giờ 30 nhắc sắp đóng cửa, cậu ấy còn đang xếp sách. Tớ nhớ vì tớ cũng đang xếp."
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
          "text": "Tớ không nhầm, vì tối thứ Hai nào tớ cũng ngồi đó, quen tới mức biết hôm nào khác hôm nào. Không tin thì xem bản ghi của tớ."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tớ đã bảo mà."
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
          "text": "Được. Lời chứng của tớ cũng phải đếm được như của Nam. Bản của tớ có sẵn trong tệp."
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
          "text": "Hai đứa như nhau. Đúng là hai cái máy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thói quen đếm được thì lời chứng mới nặng. Về CLB."
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
            "text": "Tài khoản kênh của Robotics gửi tin lúc 22:40. Nam trực kênh. Tối đó xưởng mở, Nam bảo về sớm mà không ai làm chứng. Tớ cá là Nam gửi."
          },
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
                  "text": "Bốn tối thứ Hai có trong tệp, tối nào Nam cũng ở thư viện. Một thói quen. Thói quen thì chưa phải bằng chứng cho đúng tối đó."
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
          "text": "Tối mùng 7, 21 giờ 50 vào, 23 giờ 05 ra. Các cậu có cả tờ này rồi mà vẫn gọi tớ lên."
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
          "text": "Xin lỗi cậu."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Không sao. Lần sau các cậu đọc kỹ hồ sơ trước đã."
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
      "title": "Không mời Nam lên; Tùng xin lỗi; lời nhắn thứ ba của chị Linh",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
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
          "text": "Khỉ thật… tại cái tài khoản ghi lù lù tên kênh của cậu ấy. Tớ cá trượt, mà lần này trượt đau. Tớ xin lỗi Nam. Lần sau đợi đủ bài mới lật."
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
          "text": "Hai nguồn riêng cùng khớp một quãng giờ. Lại là \"kiểm hai lần\" của chị Linh."
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
          "text": "Nhắc mới nhớ. Trang \"Kiểm hai lần\" ấy… hôm trước có một mẩu, để tớ xem lại."
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
          "text": "Mẩu thứ ba. Chữ chị Linh."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Vụ đầu tiên của CLB kết luận sai. Chị tìm ra cuốn sổ ghi lại nó.\""
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
          "text": "Chưa biết. Nhưng chị ấy ghi \"kết luận sai\". Giống chuyện hôm nay."
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
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Không phải Nam. Thế thì ai ngồi máy văn phòng xưởng tối đó?"
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
          "text": "Và tên Nam vẫn nằm trên tài khoản kênh. Ai muốn người ta nghĩ là Nam, thì đã được như ý."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mai chị nói chuyện với Nam. Chuyện này không chỉ là tin đồn về mình nữa."
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
      "id": "v4-mo",
      "title": "Nam tới phòng CLB với một rắc rối của chính mình",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Vụ 4 — Thứ Hai, 14 tháng 10"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Đầu tuần. Lần này không phải nhóm sang xưởng, mà Nam tự tới phòng CLB, tay cầm một tờ giấy."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Các cậu nói đúng. Có người đang mượn tên tớ, mà không phải chỉ cái tin đồn."
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
          "text": "Ban kiểm tra của Hội sinh viên gửi giấy yêu cầu giải trình ngân sách xưởng. Họ tạm dừng giải ngân, vì tớ đứng tên năm đơn trong hai tháng, có đơn gần một triệu. Tớ đặt đúng hai: cảm biến với bánh xe, mấy trăm nghìn."
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
          "text": "Ba đơn lạ. Ai đặt?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Đơn đặt trên máy xưởng, ai đăng nhập cũng điền tên người đặt được. Ban kiểm tra gửi kèm bản sổ đặt hàng của xưởng, có cả đơn còn chờ duyệt. Các cậu xem hộ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chưa đọc tên vội. Đếm trước: mỗi người đứng tên mấy đơn, rồi mới xem đơn của Nam."
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
          "text": "Tám đơn, gom theo người đặt rồi đếm. Xem Nam đứng tên bao nhiêu so với người khác."
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
          "text": "Nam năm đơn. Bách, Thảo, Khánh mỗi người một."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Năm. Mà tớ đặt hai. Bách là phó CLB, Thảo lo kỹ thuật, Khánh là trưởng CLB."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Thế ba đơn kia ai gõ tên cậu vào?"
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
          "text": "Có. Phần mềm đặt hàng ghi mỗi phiên là máy nào, giờ nào. Nhưng tài khoản quản trị của tớ bị khóa từ sáng nay, chờ giải trình xong."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Khóa là phải. Bảng ấy mà do Nam xuất thì ai cũng bảo Nam sửa được. Chị nhờ thầy Quang xin Phòng Quản trị mạng xuất thẳng cho CLB mình."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy là hai bảng. Đơn thì ở sổ đặt hàng, máy thì ở bảng phiên. Chung nhau cái mã phiên."
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
          "text": "Chiều. Phòng Quản trị mạng gửi bảng phiên đăng nhập của phần mềm đặt hàng, có dấu xác nhận, kèm một dòng: \"Xuất nguyên bản theo đề nghị của thầy Trịnh Quang.\""
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
          "text": "Nối hai bảng thì phải chọn cột chung. Chọn sai cột là đơn kéo theo máy của người khác."
        },
        {
          "type": "challenge",
          "challengeId": "c-don-nam-may"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Năm đơn của Nam. Hai đơn buổi chiều từ máy xưởng số 2. Ba đơn còn lại từ máy văn phòng xưởng, 21 giờ 50, 22 giờ 10 và 22 giờ 05."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Máy xưởng số 2 buổi chiều là tớ. Máy văn phòng ban đêm thì tớ chưa bao giờ ngồi. Phòng đó khóa."
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
          "text": "Và đơn ngày 07/10 tạo lúc 22 giờ 05. Tối đó Nam ở thư viện tới 23 giờ 05, mình đã có bản ghi."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Vậy là cùng một chỗ, cùng một tối, có người vừa gửi tin đồn vừa đặt hàng bằng tên tớ."
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
          "text": "Tớ xin. Tên tớ, tớ phải tự đi tìm xem ai đang dùng."
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
          "text": "Bốn đơn. Ba đơn đứng tên Nam, ban đêm. Một đơn ốc vít đứng tên Khánh, 10 giờ 15 sáng."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ốc vít thì đúng là Khánh đặt, hôm đó tớ thấy. Trưởng CLB ngồi máy văn phòng ban ngày là chuyện thường."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy máy đó ban ngày có người dùng hợp lệ. Ban đêm có ba đơn đứng tên Nam, mà một trong ba tạo lúc Nam ở thư viện. Mình mới biết máy, chưa biết tay."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ba người có chìa phòng đó. Đừng vội."
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
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tên một người, tay một người khác… chị Linh có ghi một câu. Để tớ xem."
        },
        {
          "type": "note",
          "text": "Duy lật sổ chị Linh tới trang cuối."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Vụ đầu tiên, họ kết tội đúng cái tên trên bản ghi. Người mang tên đó không ở đấy.\""
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Giống hệt chuyện Nam."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chị ấy ghi từ năm ngoái. Cuốn sổ cũ mà chị ấy nhắc, chắc kể đúng chuyện này."
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
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ba người giữ chìa phòng văn phòng: Khánh, Bách, Thảo. Tớ không nghi ai cả. Nhưng tớ muốn biết là ai."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Muốn biết thì tìm tiếp bằng bảng, không bằng đoán. Ba đơn kia tiền ở đâu ra, trả bằng quỹ nào, ai duyệt. Sổ quỹ là nguồn tiếp theo."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "chi-tay",
          "text": "Tớ không cá nữa đâu. Hỏi sổ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Đúng rồi. Hỏi sổ."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Hai bảng nối nhau bằng một cột chung. Nối đúng cột thì mỗi dòng kéo theo đúng phần còn lại của nó. Nối sai cột thì ra một câu chuyện không có thật."
        },
        {
          "type": "end"
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
          "text": "Vụ 5 — Thứ Sáu, 18 tháng 10"
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
          "text": "Tớ đếm kho. Đếm tay từng loại, hai lần."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Rồi sao?"
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Ba đơn mang tên tớ: động cơ servo, mạch điều khiển, khung nhôm. Trong kho không có lấy một cái. Sổ ghi đã duyệt, mà hàng chưa từng về."
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
          "text": "Ba đơn. Đúng ba đơn đứng tên Nam từ máy văn phòng xưởng."
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
          "text": "Thì mang căn cứ đi."
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
            "text": "Các em muốn thầy cho xuất sổ quỹ của khối CLB, một sổ không thuộc CLB các em. Căn cứ vào đâu?"
          },
          "bangChung": [
            {
              "id": "ev-dat-ma-khong-co",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Thưa thầy, ba đơn linh kiện ghi đã duyệt, trên đơn tổng hai triệu tư, nhưng kiểm kê xưởng không có một cái nào. Đơn ghi đã chi mà hàng không về, nên bọn em cần xem tiền ấy có thật sự xuất khỏi quỹ nào không, ai duyệt."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Đơn ghi chi mà không có hàng. Căn cứ ấy đủ để mở sổ quỹ. Thầy cho xuất, các em chỉ được xem các khoản liên quan ba đơn này và quỹ CLB Thám Tử."
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
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-xin-so-quy-du"
          },
          "to": "v5-so-quy"
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
      "id": "v5-so-quy",
      "title": "Sổ quỹ khối CLB: khoản nào ghi vào quỹ CLB Thám Tử",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều, phòng CLB. Phòng Kế hoạch gửi bản xuất sổ quỹ khối CLB, chỉ gồm các khoản chi ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn."
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
          "type": "challenge",
          "challengeId": "c-chi-tham-tu"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản nhỏ chị Minh Anh duyệt. Ba khoản lớn người duyệt ghi là Khánh."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Ba khoản chị duyệt là văn phòng phẩm, chị nhớ. Ba khoản kia chị chưa từng thấy."
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
          "text": "Chị Minh Anh: ba khoản, tổng bốn trăm năm mươi nghìn. Khánh: ba khoản, tổng hai triệu tư."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "khoanh-tay",
          "text": "Quy chế quỹ khối CLB: khoản dưới một triệu thì chủ tịch Hội duyệt thẳng, không cần trưởng CLB chủ quỹ ký. Chị là chủ quỹ mà không biết ba khoản này, là vì thế."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Nhưng tổng các khoản do cùng một người duyệt mà vượt một triệu thì Phòng Kế hoạch đòi người đó giải trình. Ngưỡng ấy để tìm nhóm cần hỏi, không phải để kết tội. Để bảng tự lọc ra, đừng chỉ tay."
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
          "type": "line",
          "speaker": "player",
          "text": "Còn một dòng. Khánh: ba khoản, tổng hai triệu tư, trung bình tám trăm nghìn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Tám trăm nghìn một khoản. Khoản nào cũng dưới một triệu, vừa đủ để không cần chị Minh Anh ký."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Xé nhỏ để lọt. Chủ tịch Hội duyệt chi quỹ CLB khác… cho hàng không về."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Khánh. Trưởng CLB của tớ. Chủ tịch Hội sinh viên."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Bảng nói được tới đó: ai duyệt, bao nhiêu, chia thế nào. Vì sao thì bảng không nói. Chỉ có người mới nói được."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Chị gửi thầy Quang. Việc còn lại là của thầy."
        },
        {
          "type": "goto",
          "to": "v5-doi-chat"
        }
      ]
    },
    {
      "id": "v5-doi-chat",
      "title": "Phòng họp: Khánh trước thầy Quang",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thứ Hai tuần sau, phòng họp. Thầy Quang chủ trì. Khánh ngồi một bên, mặt không đổi. Nam ngồi cạnh nhóm CLB Thám Tử."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy mời em Khánh tới vì sổ quỹ. CLB Thám Tử trình bày trước. Em Khánh nghe, rồi trả lời."
        },
        {
          "type": "doi-chat",
          "id": "dc-khanh",
          "asker": {
            "speaker": "khanh",
            "text": "Ba khoản đó là chi cho đội robot trước giải quốc gia. Quỹ khối CLB thì tôi là chủ tịch Hội, tôi duyệt là đúng thẩm quyền. Các bạn có gì mà nói tôi sai?"
          },
          "bangChung": [
            {
              "id": "ev-chi-vuot-muc",
              "muc": "du",
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Ba khoản ấy không ghi vào quỹ Robotics. Chúng ghi vào quỹ CLB Thám Tử, mỗi khoản dưới một triệu nên không cần em ký, cộng lại hai triệu tư. Và ba đơn linh kiện ấy chưa có cái nào về xưởng."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Chi quỹ của CLB khác, cho hàng không về. Em Khánh, ba khoản đó có chi cho đội robot không?"
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "…Không ạ. Em dùng vào việc riêng. Em sẽ trả lại."
                },
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Còn lá thư gửi CLB Thám Tử, cái tin trong kênh, ba đơn đứng tên Nam?"
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Là để không ai mở sổ quỹ ấy ra. Em xin lỗi Nam. Em xin lỗi CLB Thám Tử."
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
                  "text": "Ba đơn đó không có cái linh kiện nào trong kho. Tớ đếm hai lần."
                },
                {
                  "speaker": "khanh",
                  "expression": "neutral",
                  "text": "Hàng về chậm thì đổ cho tôi à?"
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
                  "text": "Đơn đứng tên Nam thì hỏi Nam."
                },
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Đơn tạo từ máy trong phòng khóa, mà Nam không có chìa."
                }
              ]
            }
          ],
          "chuaDu": [
            {
              "speaker": "minh-anh",
              "expression": "neutral",
              "text": "Thưa thầy, bọn em chỉ nói được tới đây: ba khoản chi không có hàng, ghi vào quỹ CLB Thám Tử. Ai chi vào việc gì, bọn em không có căn cứ."
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
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "dc-khanh-du"
          },
          "to": "v5-ket-du"
        },
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
          "text": "Một tuần sau, chưa có kết luận. Khánh vẫn là chủ tịch Hội sinh viên. Phòng CLB thì thầy Quang nói: chờ."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tớ không biết cậu ấy sẽ nói gì với Phòng Kế hoạch. Nhưng tớ biết các cậu đã dừng ở đúng chỗ. Sổ sách của xưởng, từ giờ tớ giữ cho rõ."
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
      "id": "v5-ket-du",
      "title": "Khánh nhận; Nam nhận CLB Robotics",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Em Khánh nhận rồi. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên, không bàn ở đây. Việc riêng của em ấy, thầy không hỏi trước mọi người."
        },
        {
          "type": "line",
          "speaker": "khanh",
          "expression": "neutral",
          "text": "Robotics… tớ giao lại cho Nam. Cậu giữ sổ sách của xưởng tốt hơn tớ."
        },
        {
          "type": "line",
          "speaker": "nam",
          "expression": "neutral",
          "text": "Tớ nhận. Nhưng sổ sách thì ai cũng xem được, kể cả cậu."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Hai CLB dùng chung phòng tới hết học kỳ. Thầy nhận hồ sơ của CLB Thám Tử vào đợt rà soát cuối kỳ."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Giữ được phòng. Lần này tớ không cá nữa, tớ chắc."
        },
        {
          "type": "goto",
          "to": "v5-ket-luan"
        }
      ]
    },
    {
      "id": "v5-ket-luan",
      "title": "Chốt mùa: mình nói chắc được gì",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-v5-ket-luan",
          "asker": {
            "speaker": "minh-anh",
            "text": "Hồ sơ cuối kỳ, mục cuối cùng. Mình nói chắc được điều gì?"
          },
          "choices": [
            {
              "id": "dung",
              "text": "Ba khoản chi không có hàng được ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Mỗi bước đều có phiếu để ai cũng tự kiểm được.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "minh-anh",
                  "expression": "neutral",
                  "text": "Đúng chừng ấy. Phần \"vì sao\" là lời người nhận, không phải của bảng."
                }
              ]
            },
            {
              "id": "moi-nguoi",
              "text": "Cả Hội sinh viên và CLB Robotics cùng bao che cho Khánh.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Bảng ghi một người duyệt. \"Cả Hội\" thì cột nào nói?"
                }
              ]
            },
            {
              "id": "tu-dau",
              "text": "Khánh viết lá thư ngay từ đầu để chiếm phòng CLB.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "duy",
                  "expression": "neutral",
                  "text": "Lá thư để làm gì thì chỉ người viết nói được. \"Chiếm phòng\" là mình đoán thêm."
                }
              ]
            }
          ],
          "truUyTin": false
        },
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "va",
            "cac": [
              {
                "kind": "co",
                "id": "clue-loi-nhan-linh-1"
              },
              {
                "kind": "co",
                "id": "clue-loi-nhan-linh-2"
              },
              {
                "kind": "co",
                "id": "clue-loi-nhan-linh-3"
              },
              {
                "kind": "co",
                "id": "clue-loi-nhan-linh-4"
              }
            ]
          },
          "to": "v5-ngan-tu"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hồ sơ cuối kỳ xong. Mục nào cũng có phiếu, ai mở ra cũng tự kiểm được."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Từ một chữ H tới một sổ quỹ. Mỗi bước là một phiếu."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Và chị Linh để lại nhiều mẩu giấy hơn mình tưởng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Dữ liệu chỉ ra ai cần hỏi. Người trả lời mới là người nói \"vì sao\". Mùa 1 khép lại ở chỗ chứng cứ dừng."
        },
        {
          "type": "end"
        }
      ]
    },
    {
      "id": "v5-ngan-tu",
      "title": "Đủ bốn mẩu giấy: ngăn tủ khóa trong phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Bốn mẩu giấy. Mẩu nào cũng nhắc \"cuốn sổ cũ\" với \"vụ đầu tiên\". Mà ngăn dưới tủ hồ sơ thì khóa, tớ chưa bao giờ có chìa."
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
          "text": "Khoan. Mẩu đầu: \"Căn phòng này giữ nhiều hơn em nghĩ.\" Chị ấy không nói \"tủ\"."
        },
        {
          "type": "note",
          "text": "Hà Vy nhìn quanh phòng, dừng ở tấm bảng nguyên tắc. Sau bảng có một chìa khóa nhỏ dán băng dính."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "…Chìa ngăn dưới."
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
          "type": "line",
          "speaker": "narrator",
          "text": "Trong ngăn tủ: một cuốn sổ bìa cứng, chữ viết tay đã ngả màu. Trang đầu ghi \"Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu\", ký tên Trịnh Quang."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "surprised",
          "text": "Thầy Quang? Thầy Quang lập CLB này á?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Và vụ đầu tiên của CLB kết luận sai. Chị Linh tìm ra, chép lại, rồi để lại giấy cho mình."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Trang cuối có thêm một dòng mới, chữ chị Linh: \"Manh mối cũ, câu hỏi mới.\""
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mùa sau. Giờ thì cất đi, và đừng cá."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "gai-dau",
          "text": "Tớ có cá đâu."
        },
        {
          "type": "end"
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
          "text": "Việc ở CLB — Thứ Sáu, 25 tháng 10"
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
          "text": "Việc ở CLB — Thứ Sáu, 25 tháng 10"
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
          "text": "Sổ sử dụng phòng tớ giữ. Bản giấy đây, còn đây là bản xuất từ máy quản lý phòng của tòa nhà."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mã phòng trong bản xuất là do từng người trực gõ tay. Tớ chưa lọc, chưa bỏ dòng nào."
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
          "text": "Tớ xuất. Sáng nay, từ máy quản lý phòng, trước mặt bác trực tòa nhà. Tớ chưa đụng vào dòng nào."
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
          "text": "Với mình thì \"CLB-THAM-TU\" hay \"clb-tham-tu\" là một phòng. Với máy thì đấy là hai chuỗi khác nhau. Thêm một dấu cách ở đuôi cũng thành chuỗi khác."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Lọc xong thì xếp theo ngày giúp tớ. Sổ giấy ghi lần lượt từ đầu tháng, tớ dò từng dòng cho nhanh."
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
          "text": "Bốn buổi: mùng 2, mùng 9, 16 và 23 tháng 10. Buổi 30 mới là dự kiến nên không vào."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Thế là không buổi nào biến mất cả. Chỉ là mỗi người gõ một kiểu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Gọt cho các dòng về cùng một kiểu rồi mới so. Tớ ghi vào sổ rồi đấy."
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
          "text": "Bốn mã buổi này đủ chữ ký trong sổ. Dòng 30/10 trong sổ còn để trống ô ký, đúng là lịch dự kiến."
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
          "text": "Đừng cá. Dò."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Xong mục phòng. Tuần sau tớ kiểm kê thiết bị cho buổi hướng dẫn cuối kỳ."
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
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Việc ở CLB — Thứ Sáu, 1 tháng 11"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Chiều thứ Sáu. Duy bày thiết bị ra bàn để kiểm kê cho buổi hướng dẫn cuối kỳ, đếm đi đếm lại."
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
          "text": "Hai bảng cùng có mã tài sản. Nối theo mã đó thì mỗi phiếu kéo theo đúng tên thiết bị của nó."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Mà phiếu có cái đã nhận, có cái mới đề xuất. Tớ cần phiếu đã có người nhận."
        },
        {
          "type": "task",
          "text": "Phiếu nào đã nhận, chuyển chiếc micro không dây đi đâu?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nối phiếu luân chuyển với sổ tài sản theo mã tài sản. Lọc đúng tên thiết bị và phiếu đã nhận."
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
          "text": "Mã trên micro là MIC-02, đúng mã trên phiếu. Tài sản không mất, chỗ để đã đổi. Tớ sửa lại sổ."
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
          "text": "Việc ở CLB — Thứ Sáu, 8 tháng 11"
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
          "text": "Mỗi lần hoàn chỉ được có một dòng. Phiếu nào có hơn một dòng hoàn thì cần mở ra xem."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Gom theo mã phiếu, đếm dòng, cộng tiền. Rồi chỉ giữ nhóm có hơn một dòng. Lần này lọc nhóm theo số dòng, không theo tổng."
        },
        {
          "type": "task",
          "text": "Phiếu nào có hơn một dòng hoàn tiền, tổng ghi hoàn bao nhiêu?"
        },
        {
          "type": "reminder",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu bốn dòng hoàn làm nguồn. Gom theo mã phiếu, tính tổng, chỉ giữ nhóm có số dòng lớn hơn một."
        },
        {
          "type": "challenge",
          "challengeId": "c-hoan-nhom"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Một phiếu. PH-04: hai dòng, tổng ghi hoàn là âm một trăm hai mươi nghìn."
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
          "text": "Một lần hoàn mà ghi hai dòng. Đúng sáu mươi nghìn bị lệch."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Đếm dòng là đếm bản ghi, không phải đếm lần chuyển tiền."
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
        "description": "1 trang, tệp kien-nghi-phong-clb.docx, tài khoản clb_robotics: tài khoản dùng chung của CLB Robotics, không phải mã của một sinh viên. Tài khoản in thư không phải của người nộp.",
        "giaTri": [
          "clb_robotics"
        ]
      },
      "ghiChu": [
        "Lần chạy \"sai có ích\": mã Hoài/Hiếu + tên tệp → 0 dòng. Bỏ điều kiện mã → 1 dòng: clb_robotics, 23:10 Chủ nhật."
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
    },
    "c-don-da-duyet": {
      "id": "c-don-da-duyet",
      "tieuDe": "Sổ đặt linh kiện của xưởng",
      "deBai": "Sổ đặt linh kiện của xưởng Robotics, tháng 9 và 10. Những đơn nào đã duyệt?",
      "manhMoiLienQuan": [
        "clue-da-duyet"
      ],
      "mucTieuHoc": "Lọc theo trạng thái để ghim thành phiếu, chuẩn bị gom và đếm.",
      "soDongKyVong": 8,
      "sqlChuan": "SELECT ma_don, ngay, nguoi_dat, linh_kien, so_tien, ma_phien FROM don_linh_kien WHERE trang_thai = 'DA_DUYET';",
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
            "n": 10
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả mười đơn, có cả hai đơn chờ duyệt."
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
              "text": "Không dòng nào. Tên người đặt viết đúng như giấy nhớ: Nam."
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
              "text": "Tám dòng cho năm đơn. Có đơn kéo theo hai phiên: nối theo cột này thì mỗi đơn khớp mọi phiên cùng ngày, kể cả phiên của máy khác."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 13
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Mười ba dòng. Nối theo cột này thì ngày nào trùng là dính nhau hết."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 10
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Mười dòng. Cả sổ. Mình chỉ cần đơn của Nam."
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
              "text": "Năm đơn, mỗi đơn đúng một máy, một giờ. Hai cái buổi chiều là tớ."
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
            "n": 10
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
              "text": "Bốn đơn. Ba đơn đêm mang tên Nam, một đơn sáng mang tên Khánh."
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
    "c-hoan-loc": {
      "id": "c-hoan-loc",
      "tieuDe": "Bản xuất thu chi buổi hướng dẫn",
      "deBai": "Bản xuất lẫn cả khoản chi lẫn khoản hoàn. Những dòng nào là hoàn tiền?",
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
            "n": 8
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả bản xuất, lẫn cả khoản chi."
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
    "c-mic-phieu": {
      "id": "c-mic-phieu",
      "tieuDe": "Phiếu luân chuyển nối với sổ tài sản",
      "deBai": "Phiếu luân chuyển chỉ ghi mã tài sản; sổ tài sản mới ghi tên. Phiếu nào đã nhận, chuyển chiếc micro không dây đi đâu?",
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
              "text": "Ba dòng, mà phiếu của loa, của máy ảnh, của chân máy đều mang tên micro. Nối theo cột này thì thứ gì từng để ở tủ CLB cũng dính vào phiếu chuyển tới tủ CLB."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 12
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Mười hai dòng cho bảy phiếu. Một phiếu kéo theo mấy thiết bị liền: cột nối này không phải mã của thiết bị."
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
              "text": "Cả tập phiếu. Mình chỉ tìm một chiếc micro."
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
            "n": 10
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ. Mình chỉ cần thứ trong kho đang là số không."
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
              "text": "Ba đơn. Đúng ba đơn mang tên tớ."
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
      "sqlChuan": "SELECT ma_chi, ma_don, so_tien, nguoi_duyet FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';",
      "bangNoi": [
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
            "n": 11
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả sổ, có cả quỹ Robotics. Mình chỉ cần quỹ CLB mình."
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
        "description": "Kết quả nối sổ chi với bảng quỹ: sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản văn phòng phẩm nhỏ do Minh Anh duyệt; ba khoản lớn gắn với ba đơn linh kiện, người duyệt ghi là Khánh.",
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
        "description": "Kết quả lọc nhóm: chỉ Khánh có tổng chi từ quỹ CLB Thám Tử vượt ngưỡng giải trình một triệu (2.400.000 cho ba khoản). Trung bình 800.000 một khoản: khoản nào cũng dưới một triệu, mức chủ tịch Hội duyệt thẳng được. Ba khoản ấy là ba đơn linh kiện không có hàng.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-tin-don": {
      "id": "c-tin-don",
      "tieuDe": "Tin đồn trên kênh sinh viên",
      "deBai": "Kênh sinh viên chuyền nhau một câu về CLB. Những tin nào mang câu đó?",
      "manhMoiLienQuan": [
        "clue-noi-dung-tin"
      ],
      "mucTieuHoc": "Ôn \"bắt đầu bằng\"; kết quả nhiều dòng được ghim thành phiếu để dùng tiếp.",
      "soDongKyVong": 5,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%';",
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
              "text": "Không dòng nào. Tin trong kênh dài hơn mấy chữ trên giấy nhớ, còn đoạn sau nữa. \"Bằng\" thì phải khớp cả câu; mình chỉ có mấy chữ đầu thôi."
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
              "text": "Cả tám tin của kênh. Có cả tin tìm thẻ xe với tin tuyển thành viên."
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
              "text": "Năm tin cùng một câu. Ghim lại đã."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-don",
        "title": "Năm tin mang câu tin đồn",
        "description": "Kết quả truy vấn: năm tin cùng một câu, từ năm tài khoản. Bốn tài khoản là mã sinh viên, một là clb_robotics. Phiếu chưa nói tin nào có trước.",
        "giaTri": []
      },
      "ghiChu": [
        "Đường \"sai có ích\": [CLB Thám Tử soi dữ liệu] vào noi_dung với \"bằng\" → 0 dòng → đổi \"bắt đầu bằng\" → 5 dòng."
      ]
    },
    "c-tin-goc": {
      "id": "c-tin-goc",
      "tieuDe": "Tin gốc của tin đồn",
      "deBai": "Năm tin trên phiếu lẫn cả tin chuyển tiếp. Tin nào là tin gốc?",
      "manhMoiLienQuan": [
        "clue-tin-goc"
      ],
      "mucTieuHoc": "Lấy phiếu kết quả đã ghim làm nguồn cho lần tra kế tiếp (WITH … AS): lọc tiếp trên đống đã thu hẹp.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_tin, thoi_diem, tai_khoan FROM @ev-tin-don WHERE loai = 'GOC';",
      "kieuTrinhDung": "loc-tiep",
      "nguon": "ev-tin-don",
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
            "n": 5
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Vẫn đủ năm tin. Chưa tách được tin gốc ra."
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
              "text": "Còn đúng một tin. Phiếu năm tin vẫn nguyên trên bảng, mình chỉ lọc tiếp trên nó."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-goc",
        "title": "Tin gốc: 22:40 tối 07/10",
        "description": "Kết quả lọc tiếp trên phiếu năm tin: một tin gốc, gửi 22:40 thứ Hai 07/10 từ tài khoản clb_robotics. Phiếu cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi.",
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
            "n": 3
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Ba dòng. Bảng này ghi cả đăng nhập của tài khoản cá nhân khác, và cả ngày khác. Mình cần đúng tài khoản kênh, đúng ngày mùng 7."
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
              "text": "Cả năm lần đăng nhập của mọi tài khoản."
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
      "tieuDe": "Lịch đặt xưởng, tuần 07/10",
      "deBai": "Lịch đặt xưởng của nhà văn hóa. Tối 07/10 xưởng được đăng ký từ mấy giờ tới mấy giờ, cho hoạt động nào?",
      "manhMoiLienQuan": [
        "clue-ngay-gui"
      ],
      "mucTieuHoc": "Hai hướng điều tra, mỗi hướng một nguồn riêng; cùng một giá trị ngày dùng cho hai bảng.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ngay, tu_gio, den_gio, muc_dich FROM dat_xuong WHERE ngay = '2024-10-07';",
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
              "text": "Không dòng nào. Lịch ghi ngày theo dạng năm-tháng-ngày, giấy nhớ cũng vậy. Giá trị có nằm đúng cột không?"
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
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả tuần. Mình chỉ cần tối mùng 7."
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
              "text": "Một dòng: tối mùng 7, 19 giờ tới 23 giờ, đội thi đấu tập."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-tin-xuong",
        "title": "Tối 07/10 xưởng mở tới 23 giờ",
        "description": "Kết quả truy vấn: thứ Hai 07/10, xưởng đăng ký từ 19:00 tới 23:00 cho đội thi đấu tập. Đây là lịch đăng ký, chưa cho biết ai thật sự có mặt.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-bai-dang": {
      "id": "c-bai-dang",
      "tieuDe": "Bài đăng của các kênh CLB",
      "deBai": "Bản xuất bài đăng của mọi kênh CLB trong tháng 10. Kênh Robotics đăng những bài nào?",
      "manhMoiLienQuan": [
        "clue-kenh-robotics"
      ],
      "mucTieuHoc": "Lọc ra một tập để ghim thành phiếu, chuẩn bị nhóm và đếm.",
      "soDongKyVong": 9,
      "sqlChuan": "SELECT ma_bai, ngay, buoi, thiet_bi FROM bai_dang_kenh WHERE kenh = 'clb_robotics';",
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
            "n": 14
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả ba kênh. Mình chỉ cần kênh Robotics."
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
              "text": "Chín bài. Ghim lại, rồi nhóm."
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
      "deBai": "Bản ghi cửa từ thư viện do chính Nam và Hà Vy tải về từ cổng sinh viên, gộp chung một tệp. Nam vào thư viện những ngày nào?",
      "manhMoiLienQuan": [
        "clue-ten-nam"
      ],
      "mucTieuHoc": "Lọc theo tên để ghim thành phiếu riêng của một người.",
      "soDongKyVong": 5,
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
              "text": "Không dòng nào. Tên trên bản ghi viết đúng như giấy nhớ: Nam."
            }
          ]
        },
        {
          "khi": {
            "kind": "so-dong",
            "n": 10
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả tờ, của cả hai người. Mình cần riêng của Nam."
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
              "text": "Năm lần. Đúng là của tớ."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-nam-thu-vien",
        "title": "Năm lần Nam quẹt thẻ thư viện",
        "description": "Kết quả truy vấn: năm lần Nam vào thư viện trong tháng 9 và 10, có ngày, thứ, giờ vào, giờ ra.",
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
        "title": "Nam: tối thứ Hai 4 lần, thứ Năm 1 lần",
        "description": "Kết quả nhóm theo thứ: bốn tối thứ Hai liền Nam đều ở thư viện. Một thói quen đếm được; chưa phải bằng chứng cho riêng tối 07/10.",
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
            "n": 5
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Năm lần. Mình chỉ cần tối mùng 7."
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
            "n": 10
          },
          "loi": [
            {
              "speaker": "tung",
              "expression": "gai-dau",
              "text": "Cả tờ. Mình cần riêng của Hà Vy."
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
              "text": "Hai buổi thôi à? Sổ giấy tớ đếm được nhiều hơn."
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
              "text": "Buổi 30/10 chưa diễn ra. Dòng ấy mới là dự kiến, chưa ai ký."
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
              "expression": "neutral",
              "text": "Sáu dòng đã ký. Nhưng hai dòng là của kho chung, đâu phải phòng mình."
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
              "text": "Cả bảy dòng. Có cả kho chung lẫn buổi chưa diễn ra."
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
              "text": "Đủ bốn buổi rồi. Nhưng sổ giấy ghi lần lượt từ đầu tháng, thứ tự này tớ dò từng dòng không kịp."
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
              "text": "Bốn buổi, từ mùng 2 tới 23, đúng thứ tự trong sổ. Để tớ dò."
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
    },
    "c-v2-nguon-lop": {
      "id": "c-v2-nguon-lop",
      "tieuDe": "Danh sách lớp sinh hoạt",
      "deBai": "Lọc tiếp trên danh sách lớp để xem ngành nào có lớp ở tòa B.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": null,
      "soDongKyVong": 14,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat;",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": {
        "id": "ev-v2-danh-sach-lop",
        "title": "Phiếu danh sách lớp",
        "description": "Kết quả truy vấn danh sách lớp, gồm mã lớp, ngành, khóa học và tòa nhà.",
        "giaTri": []
      },
      "ghiChu": []
    },
    "c-v2-nhom-lop": {
      "id": "c-v2-nhom-lop",
      "tieuDe": "Số lớp tại tòa B theo ngành",
      "deBai": "Dùng phiếu danh sách lớp làm nguồn, lọc các lớp ở tòa B rồi đếm theo ngành.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": null,
      "soDongKyVong": 3,
      "sqlChuan": "SELECT nganh, COUNT(*) AS so_lop FROM @ev-v2-danh-sach-lop WHERE toa_nha = 'B' GROUP BY nganh;",
      "kieuTrinhDung": "tong-hop",
      "nguon": "ev-v2-danh-sach-lop",
      "nhomTheo": "nganh",
      "truyVanNapSan": null,
      "phanUng": [],
      "vatChung": null,
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
        "Nội dung": "Một cậu sinh viên, balo đeo huy hiệu bánh răng của CLB Robotics, đưa phong bì nâu cho một bạn nữ; bạn nữ cầm rồi đi thẳng về phía tòa B. Chú không nhìn rõ mặt."
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
    "clue-loi-nhan-linh-1": {
      "id": "clue-loi-nhan-linh-1",
      "loai": "clue",
      "heading": "[Lời nhắn chị Linh]",
      "fields": {
        "Tiêu đề": "Mẩu giấy trong sổ chị Linh",
        "Nguồn": "Rơi ra từ sổ tự học của chị Linh, phòng CLB",
        "Nội dung": "Chữ chị Linh, một dòng: \"Căn phòng này giữ nhiều hơn em nghĩ.\" Không ghi ngày, không ghi gửi cho ai."
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
    },
    "doc-tin-don": {
      "id": "doc-tin-don",
      "loai": "doc",
      "heading": "Ảnh chụp tin đồn",
      "fields": {
        "Tiêu đề": "Tin đang lan trên kênh sinh viên",
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
        "Nội dung": "Tin nào cũng mở đầu bằng mấy chữ này. Bản xuất của kênh ghi nguyên văn từng tin, nên phần sau có thể dài hơn."
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
        "Nội dung": "Mỗi tin có một loại: GOC là tin người đó tự viết, CHUYEN_TIEP là tin bấm chuyển lại. Chuyển tiếp thì ai cũng bấm được."
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
      "heading": "[Lời nhắn chị Linh, mẩu thứ hai]",
      "fields": {
        "Tiêu đề": "Mẩu giấy kẹp ở trang \"Kiểm hai lần\"",
        "Nguồn": "Sổ tự học của chị Linh, phòng CLB",
        "Nội dung": "Chữ chị Linh: \"Sổ này chị chép lại từ một cuốn cũ hơn. Cuốn cũ không phải của chị.\""
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
      "heading": "[Lời nhắn chị Linh, mẩu thứ ba]",
      "fields": {
        "Tiêu đề": "Mẩu giấy ở trang \"Kiểm hai lần\", lần hai",
        "Nguồn": "Sổ tự học của chị Linh, phòng CLB",
        "Nội dung": "Chữ chị Linh: \"Vụ đầu tiên của CLB kết luận sai. Chị tìm ra cuốn sổ ghi lại nó.\""
      },
      "quotes": {}
    },
    "doc-thu-hoi-don": {
      "id": "doc-thu-hoi-don",
      "loai": "doc",
      "heading": "Giấy yêu cầu giải trình ngân sách",
      "fields": {
        "Tiêu đề": "Giấy của Ban kiểm tra Hội sinh viên gửi xưởng Robotics",
        "Nguồn": "Nam mang tới phòng CLB",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Ban kiểm tra Hội sinh viên tạm dừng giải ngân cho xưởng Robotics, yêu cầu giải trình năm đơn linh kiện đứng tên Nam trong tháng 9 và 10, tổng ghi trên đơn hơn hai triệu đồng. Kèm bản sổ đặt hàng của xưởng.",
          "Nam nói mình chỉ đặt hai đơn: cảm biến dò line và bánh xe."
        ]
      }
    },
    "doc-phien-dang-nhap": {
      "id": "doc-phien-dang-nhap",
      "loai": "doc",
      "heading": "Bảng phiên đăng nhập do Phòng Quản trị mạng xuất",
      "fields": {
        "Tiêu đề": "Bản xuất nguyên bản, có dấu xác nhận",
        "Nguồn": "Phòng Quản trị mạng, theo đề nghị của Thầy Quang",
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
        "Nội dung": "Sổ đặt hàng ghi trạng thái từng đơn ở cột trang_thai: DA_DUYET là đơn đã được duyệt chi, CHO_DUYET là đơn còn chờ."
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
    "clue-loi-nhan-linh-4": {
      "id": "clue-loi-nhan-linh-4",
      "loai": "clue",
      "heading": "[Lời nhắn chị Linh, mẩu thứ tư]",
      "fields": {
        "Tiêu đề": "Mẩu giấy ở trang cuối sổ",
        "Nguồn": "Sổ tự học của chị Linh, phòng CLB",
        "Nội dung": "Chữ chị Linh: \"Vụ đầu tiên, họ kết tội đúng cái tên trên bản ghi. Người mang tên đó không ở đấy.\""
      },
      "quotes": {}
    },
    "doc-kiem-ke": {
      "id": "doc-kiem-ke",
      "loai": "doc",
      "heading": "Bảng kiểm kê xưởng của Nam",
      "fields": {
        "Tiêu đề": "Kiểm kê linh kiện xưởng, 18/10",
        "Nguồn": "Nam đếm tay từng loại, hai lần",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Mười loại linh kiện trong sổ đặt hàng, đếm thực tế trong kho. Ba loại đang là số không: động cơ servo, mạch điều khiển, bộ khung nhôm."
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
        "Nguồn": "Phòng Kế hoạch, qua Thầy Quang",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Sổ chi: mỗi khoản có mã chi, mã đơn, mã quỹ, số tiền, người duyệt. Bảng quỹ: mã quỹ nào thuộc CLB nào.",
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
        "Nội dung": "Khoản dưới một triệu thì chủ tịch Hội sinh viên duyệt thẳng được, không cần trưởng CLB chủ quỹ ký. Nhưng tổng các khoản do cùng một người duyệt vượt một triệu thì Phòng Kế hoạch yêu cầu người đó giải trình. Đây là ngưỡng để tìm nhóm cần hỏi tiếp, không phải mức cấm."
      },
      "quotes": {}
    },
    "clue-loi-nhan-linh-5": {
      "id": "clue-loi-nhan-linh-5",
      "loai": "clue",
      "heading": "[Lời nhắn chị Linh, mẩu cuối]",
      "fields": {
        "Tiêu đề": "Dòng viết thêm ở trang cuối cuốn sổ cũ",
        "Nguồn": "Ngăn dưới tủ hồ sơ phòng CLB",
        "Nội dung": "Chữ chị Linh, dưới nét chữ ngả màu của thầy Quang: \"Manh mối cũ, câu hỏi mới.\""
      },
      "quotes": {}
    },
    "doc-ho-so-vu-dau": {
      "id": "doc-ho-so-vu-dau",
      "loai": "doc",
      "heading": "Hồ sơ vụ thứ nhất của CLB",
      "fields": {
        "Tiêu đề": "Cuốn sổ bìa cứng trong ngăn tủ khóa",
        "Nguồn": "Ngăn dưới tủ hồ sơ phòng CLB, chìa dán sau bảng nguyên tắc",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "\"Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu\", chữ viết tay, ký tên Trịnh Quang.",
          "Chị Linh chép lại cuốn này vào sổ tự học. Vụ đầu tiên kết luận sai một người."
        ]
      }
    },
    "doc-v2-raw-logs": {
      "id": "doc-v2-raw-logs",
      "loai": "doc",
      "heading": "Bản xuất sổ sử dụng phòng",
      "fields": {
        "Tiêu đề": "Bản xuất sổ sử dụng phòng, tháng 10",
        "Nguồn": "Duy xuất từ máy quản lý phòng của tòa nhà",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Bảy dòng, năm cột: mã buổi, mã phòng, ngày, hoạt động, trạng thái.",
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
        "Nguồn": "Duy giữ sổ tài sản; phiếu luân chuyển do tổ thiết bị tòa nhà lập",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Sổ tài sản: mã tài sản, tên, chỗ để ghi lúc kiểm kê đầu kỳ. Năm thiết bị, trong đó có hai chiếc micro.",
          "Phiếu luân chuyển: mã phiếu, mã tài sản, nơi chuyển tới, người nhận, ngày, trạng thái. Phiếu không ghi tên thiết bị.",
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
        "Nội dung": "Sổ tài sản ghi tên thiết bị ở cột ten_tai_san. Chiếc đang tìm là \"Micro không dây\"; sổ còn một chiếc \"Micro có dây\"."
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
      "heading": "Bản xuất thu chi buổi hướng dẫn SQL",
      "fields": {
        "Tiêu đề": "Bản xuất giao dịch, buổi hướng dẫn SQL cho tân thành viên",
        "Nguồn": "Minh Anh xuất từ sổ thu chi CLB",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Tám dòng, năm cột: mã giao dịch, mã phiếu, loại, số tiền, mã tham chiếu.",
          "Loại CHI là khoản đã chi; loại HOAN là khoản được hoàn lại, số tiền ghi âm.",
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
        "Nguồn": "Ngân hàng gửi, Minh Anh giữ",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Phiếu PH-04. Một giao dịch hoàn: 60.000 đồng. Mã tham chiếu NH-771.",
          "Biên nhận không ghi ai nhập dòng nào vào sổ."
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
      "sql": "SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep LIKE 'kien-nghi%';",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/c-in.md:3 thẻ c-in, SQL chuẩn",
      "resultId": "ev-nhat-ky-in"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-lop.md:3 thẻ c-lop, SQL chuẩn",
      "resultId": "ev-hai-lop"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-ten-h.md:3 thẻ c-ten-h, SQL chuẩn",
      "resultId": "ev-hai-ma"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-ten-h.md:26 thẻ c-sua-or-quan, SQL chuẩn",
      "resultId": "ev-hai-dong-sua"
    },
    {
      "sql": "SELECT ma_don, ngay, nguoi_dat, linh_kien, so_tien, ma_phien FROM don_linh_kien WHERE trang_thai = 'DA_DUYET';",
      "soDong": 8,
      "noi": "noi-dung-mvp/thu-thach/giup-nam.md:3 thẻ c-don-da-duyet, SQL chuẩn",
      "resultId": "ev-don-da-duyet"
    },
    {
      "sql": "SELECT nguoi_dat, COUNT(*) AS so_dong FROM @ev-don-da-duyet GROUP BY nguoi_dat;",
      "soDong": 4,
      "noi": "noi-dung-mvp/thu-thach/giup-nam.md:24 thẻ c-don-theo-nguoi, SQL chuẩn",
      "resultId": "ev-don-theo-nguoi",
      "sourceResultId": "ev-don-da-duyet",
      "sourceGroupColumn": "nguoi_dat"
    },
    {
      "sql": "SELECT ma_don, linh_kien, may, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE nguoi_dat = 'Nam';",
      "soDong": 5,
      "noi": "noi-dung-mvp/thu-thach/giup-nam.md:43 thẻ c-don-nam-may, SQL chuẩn",
      "resultId": "ev-don-nam-may"
    },
    {
      "sql": "SELECT may, COUNT(*) AS so_dong FROM @ev-don-nam-may GROUP BY may;",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/giup-nam.md:67 thẻ c-don-nam-theo-may, SQL chuẩn",
      "resultId": "ev-don-nam-theo-may",
      "sourceResultId": "ev-don-nam-may",
      "sourceGroupColumn": "may"
    },
    {
      "sql": "SELECT ma_don, nguoi_dat, linh_kien, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE may = 'MAY-VP-XUONG';",
      "soDong": 4,
      "noi": "noi-dung-mvp/thu-thach/giup-nam.md:86 thẻ c-may-vp, SQL chuẩn",
      "resultId": "ev-may-vp"
    },
    {
      "sql": "SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich WHERE loai = 'HOAN';",
      "soDong": 4,
      "noi": "noi-dung-mvp/thu-thach/phu-hoan-tien.md:3 thẻ c-hoan-loc, SQL chuẩn",
      "resultId": "ev-hoan-loc"
    },
    {
      "sql": "SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-hoan-loc GROUP BY ma_phieu HAVING COUNT(*) > 1;",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/phu-hoan-tien.md:23 thẻ c-hoan-nhom, SQL chuẩn",
      "resultId": "ev-hoan-nhom",
      "sourceResultId": "ev-hoan-loc"
    },
    {
      "sql": "SELECT ma_phieu, ten_tai_san, luan_chuyen.vi_tri, nguoi_nhan FROM luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN';",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/phu-micro.md:3 thẻ c-mic-phieu, SQL chuẩn",
      "resultId": "ev-mic-phieu"
    },
    {
      "sql": "SELECT ma_don, nguoi_dat, so_tien, so_luong_co FROM don_linh_kien JOIN kiem_ke ON don_linh_kien.linh_kien = kiem_ke.linh_kien WHERE so_luong_co = 0;",
      "soDong": 3,
      "noi": "noi-dung-mvp/thu-thach/so-quy.md:3 thẻ c-dat-ma-khong-co, SQL chuẩn",
      "resultId": "ev-dat-ma-khong-co"
    },
    {
      "sql": "SELECT ma_chi, ma_don, so_tien, nguoi_duyet FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';",
      "soDong": 6,
      "noi": "noi-dung-mvp/thu-thach/so-quy.md:25 thẻ c-chi-tham-tu, SQL chuẩn",
      "resultId": "ev-chi-tham-tu"
    },
    {
      "sql": "SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet;",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/so-quy.md:47 thẻ c-chi-theo-nguoi-duyet, SQL chuẩn",
      "resultId": "ev-chi-theo-nguoi-duyet",
      "sourceResultId": "ev-chi-tham-tu"
    },
    {
      "sql": "SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien, AVG(so_tien) AS tb_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet HAVING SUM(so_tien) > 1000000;",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/so-quy.md:65 thẻ c-chi-vuot-muc, SQL chuẩn",
      "resultId": "ev-chi-vuot-muc",
      "sourceResultId": "ev-chi-tham-tu"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%';",
      "soDong": 5,
      "noi": "noi-dung-mvp/thu-thach/tin-don.md:3 thẻ c-tin-don, SQL chuẩn",
      "resultId": "ev-tin-don"
    },
    {
      "sql": "SELECT ma_tin, thoi_diem, tai_khoan FROM @ev-tin-don WHERE loai = 'GOC';",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/tin-don.md:24 thẻ c-tin-goc, SQL chuẩn",
      "resultId": "ev-tin-goc",
      "sourceResultId": "ev-tin-don"
    },
    {
      "sql": "SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/tin-don.md:47 thẻ c-tin-may, SQL chuẩn",
      "resultId": "ev-tin-may"
    },
    {
      "sql": "SELECT ngay, tu_gio, den_gio, muc_dich FROM dat_xuong WHERE ngay = '2024-10-07';",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/tin-don.md:68 thẻ c-tin-xuong, SQL chuẩn",
      "resultId": "ev-tin-xuong"
    },
    {
      "sql": "SELECT ma_bai, ngay, buoi, thiet_bi FROM bai_dang_kenh WHERE kenh = 'clb_robotics';",
      "soDong": 9,
      "noi": "noi-dung-mvp/thu-thach/tranh-cai.md:3 thẻ c-bai-dang, SQL chuẩn",
      "resultId": "ev-bai-dang"
    },
    {
      "sql": "SELECT thiet_bi, COUNT(*) AS so_dong FROM @ev-bai-dang GROUP BY thiet_bi;",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/tranh-cai.md:23 thẻ c-bai-thiet-bi, SQL chuẩn",
      "resultId": "ev-bai-thiet-bi",
      "sourceResultId": "ev-bai-dang",
      "sourceGroupColumn": "thiet_bi"
    },
    {
      "sql": "SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Nam';",
      "soDong": 5,
      "noi": "noi-dung-mvp/thu-thach/tranh-cai.md:42 thẻ c-nam-thu-vien, SQL chuẩn",
      "resultId": "ev-nam-thu-vien"
    },
    {
      "sql": "SELECT thu, COUNT(*) AS so_dong FROM @ev-nam-thu-vien GROUP BY thu;",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/tranh-cai.md:62 thẻ c-nam-thu, SQL chuẩn",
      "resultId": "ev-nam-thu",
      "sourceResultId": "ev-nam-thu-vien",
      "sourceGroupColumn": "thu"
    },
    {
      "sql": "SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/tranh-cai.md:81 thẻ c-toi-07, SQL chuẩn",
      "resultId": "ev-toi-07"
    },
    {
      "sql": "SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Hà Vy';",
      "soDong": 5,
      "noi": "noi-dung-mvp/thu-thach/tranh-cai.md:102 thẻ c-vy-thu-vien, SQL chuẩn",
      "resultId": "ev-vy-thu-vien"
    },
    {
      "sql": "SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN' ORDER BY ngay;",
      "soDong": 4,
      "noi": "noi-dung-mvp/thu-thach/v2-loc-buoi.md:3 thẻ v2-loc-buoi, SQL chuẩn",
      "resultId": "ev-v2-activities"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat;",
      "soDong": 14,
      "noi": "noi-dung-mvp/thu-thach/v2-tong-hop.md:3 thẻ c-v2-nguon-lop, SQL chuẩn",
      "resultId": "ev-v2-danh-sach-lop"
    },
    {
      "sql": "SELECT nganh, COUNT(*) AS so_lop FROM @ev-v2-danh-sach-lop WHERE toa_nha = 'B' GROUP BY nganh;",
      "soDong": 3,
      "noi": "noi-dung-mvp/thu-thach/v2-tong-hop.md:18 thẻ c-v2-nhom-lop, SQL chuẩn",
      "sourceResultId": "ev-v2-danh-sach-lop",
      "sourceGroupColumn": "nganh"
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
            "CLB Thám Tử soi dữ liệu sinh viên"
          ],
          [
            "T-02",
            "2024-10-07 22:55",
            "SV240254",
            "CHUYEN_TIEP",
            "CLB Thám Tử soi dữ liệu sinh viên"
          ],
          [
            "T-03",
            "2024-10-08 07:10",
            "SV230311",
            "CHUYEN_TIEP",
            "CLB Thám Tử soi dữ liệu sinh viên"
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
            "CLB Thám Tử soi dữ liệu sinh viên"
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
            "CLB Thám Tử soi dữ liệu sinh viên"
          ],
          [
            "T-08",
            "2024-10-08 12:05",
            "SV240412",
            "GOC",
            "Nghe nói CLB Thám Tử soi điểm"
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
        "ten": "dat_xuong",
        "cot": [
          {
            "ten": "ngay",
            "kieu": "TEXT"
          },
          {
            "ten": "thu",
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
            "2024-10-07",
            "THU_HAI",
            "19:00",
            "23:00",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-08",
            "THU_BA",
            "14:00",
            "17:00",
            "Sinh hoạt thành viên"
          ],
          [
            "2024-10-09",
            "THU_TU",
            "19:00",
            "21:00",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-10",
            "THU_NAM",
            "14:00",
            "16:00",
            "Hướng dẫn thành viên mới"
          ],
          [
            "2024-10-11",
            "THU_SAU",
            "19:00",
            "21:30",
            "Đội thi đấu tập"
          ],
          [
            "2024-10-12",
            "THU_BAY",
            "08:00",
            "11:00",
            "Dọn xưởng"
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
            "DA_DUYET"
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
            "DA_DUYET"
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
            "DA_DUYET"
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
          }
        ],
        "dong": [
          [
            "KC-01",
            "DLK-01",
            "Q-RB",
            120000,
            "Bách"
          ],
          [
            "KC-02",
            "DLK-02",
            "Q-RB",
            200000,
            "Bách"
          ],
          [
            "KC-03",
            "DLK-03",
            "Q-TT",
            800000,
            "Khánh"
          ],
          [
            "KC-04",
            "DLK-04",
            "Q-RB",
            60000,
            "Bách"
          ],
          [
            "KC-05",
            "DLK-05",
            "Q-RB",
            150000,
            "Bách"
          ],
          [
            "KC-06",
            "DLK-06",
            "Q-TT",
            900000,
            "Khánh"
          ],
          [
            "KC-07",
            "DLK-07",
            "Q-RB",
            40000,
            "Khánh"
          ],
          [
            "KC-08",
            "DLK-08",
            "Q-TT",
            700000,
            "Khánh"
          ],
          [
            "KC-09",
            "VPP-01",
            "Q-TT",
            150000,
            "Minh Anh"
          ],
          [
            "KC-10",
            "VPP-02",
            "Q-TT",
            120000,
            "Minh Anh"
          ],
          [
            "KC-11",
            "VPP-03",
            "Q-TT",
            180000,
            "Minh Anh"
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
