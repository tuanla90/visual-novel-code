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
        "worried"
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
        "smile"
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
        "happy"
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
        "neutral"
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
        "stunned"
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
        "neutral"
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
        "neutral"
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
        "loi": "Ngồi bàn trực cạnh cầu thang tòa B. Ít lời, giờ giấc đâu ra đấy, việc gì không tận mắt thấy thì không nói."
      }
    },
    {
      "id": "co-hanh",
      "ten": "Cô Hạnh",
      "hoTen": null,
      "trongCau": "cô Hạnh",
      "vai": "Phòng Đào tạo. Cấp quyền dữ liệu tạm (2 bảng, chỉ cột cần thiết), thu hồi sau buổi họp.",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Phòng Đào tạo",
        "nam": null,
        "nganh": null,
        "cauNoi": "Hai bảng thôi, chỉ những cột cần thiết.",
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
        "neutral"
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
        "neutral"
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
        "neutral"
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
        "loi": "Sinh viên lớp BC24A, nói gì cũng thẳng. Nhóm của Hiếu từng xin phòng làm bài nhóm nhiều lần mà không được."
      }
    },
    {
      "id": "dat",
      "ten": "Đạt",
      "hoTen": "Phạm Tiến Đạt",
      "trongCau": "Đạt",
      "vai": "Lớp trưởng BC24A. Kể lại lời Hoài sáng thứ Hai (chỉ ngày 5, giờ ra chơi).",
      "bieuCam": [
        "neutral"
      ],
      "xuatHienTu": {
        "kind": "ngay",
        "ngay": 5,
        "khung": "sang"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": {
        "danhXung": "Lớp trưởng BC24A",
        "nam": "Năm nhất",
        "nganh": null,
        "cauNoi": "Có thế thôi.",
        "loi": "Lớp trưởng lớp BC24A. Để ý chuyện trong lớp, nhưng chỉ kể đúng những gì mình nghe thấy."
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
      "id": "phong-clb",
      "ten": "Phòng CLB",
      "anhNen": "bg-clb-room"
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
  "diaDiem": [
    {
      "id": "phong-clb",
      "ten": "Phòng CLB",
      "canh": "phong-clb",
      "moTu": {
        "kind": "ngay",
        "ngay": 1,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 0,
        "moiDuKien": 1
      },
      "phanBiet": "Đối chiếu với lời cô Lan",
      "duKien": [
        {
          "id": "dk-so-chi-linh",
          "moTa": "Sổ chị Linh",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "clb-so-chi-linh"
          },
          "moManhMoi": [],
          "hienTaiLieu": [
            "doc-so-chi-linh"
          ],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-so-chi-linh",
            "x": 36,
            "y": 32.5,
            "rong": 2.8
          }
        },
        {
          "id": "dk-bao-cao-yeu",
          "moTa": "Báo cáo năm ngoái ghi \"hoạt động yếu\"",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "clb-bao-cao-yeu"
          },
          "moManhMoi": [],
          "hienTaiLieu": [
            "doc-bao-cao-yeu"
          ],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-bao-cao-nam-ngoai",
            "x": 58,
            "y": 48,
            "rong": 7
          }
        },
        {
          "id": "dk-bien-ban-kiem-ke",
          "moTa": "Biên bản kiểm kê tài sản hè của Duy",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "clb-bien-ban-kiem-ke"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-bien-ban-kiem-ke",
            "x": 93,
            "y": 37.5,
            "rong": 4.5
          }
        }
      ]
    },
    {
      "id": "toa-b",
      "ten": "Sảnh tòa B và hộp kiến nghị",
      "canh": "sanh-toa-b",
      "moTu": {
        "kind": "ngay",
        "ngay": 1,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 0,
        "moiDuKien": 1
      },
      "phanBiet": "Tờ rơi ở chân cầu thang, không kẹt trong khe; chỉ thẻ lịch mắc vào mép tôn",
      "duKien": [
        {
          "id": "dk-bac-thinh-the-lich",
          "moTa": "Bác Thịnh kể lúc mở hộp 9h sáng thứ Hai; thẻ lịch rách ở khe",
          "nhan": "chinh",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n1-bac-thinh"
          },
          "moManhMoi": [
            "clue-toa-b",
            "clue-bao-chi-k24"
          ],
          "hienTaiLieu": [],
          "luuBangChung": [
            "ev-the-lich"
          ],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-hop-kien-nghi",
            "x": 28,
            "y": 50,
            "rong": 8
          }
        },
        {
          "id": "dk-to-roi-guitar",
          "moTa": "Tờ rơi CLB Guitar dưới chân cầu thang",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n1-to-roi"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-to-roi-guitar",
            "x": 72,
            "y": 80,
            "rong": 6
          }
        },
        {
          "id": "dk-thong-bao-hop",
          "moTa": "Thông báo lịch họp rà soát dán cạnh hộp",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n1-thong-bao-hop"
          },
          "moManhMoi": [],
          "hienTaiLieu": [
            "doc-thong-bao-hop"
          ],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-thong-bao-hop",
            "x": 34.5,
            "y": 44,
            "rong": 4
          }
        }
      ]
    },
    {
      "id": "phong-dao-tao",
      "ten": "Phòng Đào tạo",
      "canh": "phong-dao-tao",
      "moTu": {
        "kind": "ngay",
        "ngay": 2,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 0,
        "moiDuKien": 1
      },
      "phanBiet": null,
      "duKien": [
        {
          "id": "dk-co-hanh-cap-quyen",
          "moTa": "Cô Hạnh cấp quyền tạm, kèm văn bản của thầy Quang",
          "nhan": "chinh",
          "moTu": {
            "kind": "ngay",
            "ngay": 2,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n2-co-hanh"
          },
          "moManhMoi": [
            "clue-quyen-du-lieu"
          ],
          "hienTaiLieu": [
            "doc-van-ban-thay-quang"
          ],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "nv:co-hanh",
            "x": 58,
            "y": 98,
            "rong": 17
          }
        },
        {
          "id": "dk-doi-phong-hoc",
          "moTa": "Thông báo đổi phòng học tuần này",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 2,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n2-doi-phong-hoc"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-thong-bao-doi-phong",
            "x": 80,
            "y": 32,
            "rong": 5
          }
        }
      ]
    },
    {
      "id": "phong-may",
      "ten": "Phòng máy",
      "canh": "phong-may",
      "moTu": {
        "kind": "ngay",
        "ngay": 2,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 1,
        "moiDuKien": 0
      },
      "phanBiet": "Tên tệp và giờ in khớp lúc thư có mặt sáng thứ Hai; dòng in kia là bài tập",
      "duKien": [
        {
          "id": "dk-loc-lop",
          "moTa": "Bàn làm việc: chuỗi bốn bài lọc lớp (khóa → tòa B → AND/OR → ba điều kiện)",
          "nhan": "chinh",
          "moTu": {
            "kind": "ngay",
            "ngay": 2,
            "khung": "sang"
          },
          "can": {
            "kind": "co",
            "id": "clue-quyen-du-lieu"
          },
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "pm2-lop"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-ban-may",
            "x": 60,
            "y": 78,
            "rong": 20
          }
        },
        {
          "id": "dk-ten-h",
          "moTa": "Bàn làm việc ngày 4: kéo [H] vào, tên bắt đầu bằng H trong lớp BC24A",
          "nhan": "chinh",
          "moTu": {
            "kind": "ngay",
            "ngay": 4,
            "khung": "sang"
          },
          "can": {
            "kind": "co",
            "id": "clue-can-ma-va-can-cu"
          },
          "hanhDong": {
            "kind": "thu-thach",
            "thuThach": "c-ten-h"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-ban-may",
            "x": 60,
            "y": 78,
            "rong": 20
          }
        },
        {
          "id": "dk-nhat-ky-in",
          "moTa": "Một dòng nhật ký in: 23:10 Chủ nhật, tệp kien-nghi-phong…, tài khoản năm 4",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 4,
            "khung": "sang"
          },
          "can": {
            "kind": "co",
            "id": "ev-hai-ma"
          },
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n4-nhat-ky-in"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [
            "ev-nhat-ky-in"
          ],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-may-in-nhat-ky",
            "x": 73,
            "y": 51,
            "rong": 7
          }
        },
        {
          "id": "dk-dong-in-bai-tap",
          "moTa": "Dòng in cùng đêm bao-cao-nhom-kinh-te-vi-mo.pdf",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 4,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n4-dong-in-bai-tap"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-may-in-nhat-ky",
            "x": 73,
            "y": 51,
            "rong": 7
          }
        }
      ]
    },
    {
      "id": "phong-ctsv",
      "ten": "Phòng Công tác sinh viên",
      "canh": "phong-ctsv",
      "moTu": {
        "kind": "ngay",
        "ngay": 3,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 0,
        "moiDuKien": 1
      },
      "phanBiet": "So đơn Robotics với \"huy hiệu bánh răng\" trong lời chú Cường",
      "duKien": [
        {
          "id": "dk-quy-che-so-niem-phong",
          "moTa": "Quy chế phiếu gửi và sổ niêm phong; Quân có mặt giám sát",
          "nhan": "chinh",
          "moTu": {
            "kind": "ngay",
            "ngay": 3,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n3-ctsv-quy-che"
          },
          "moManhMoi": [
            "clue-can-ma-va-can-cu"
          ],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-so-niem-phong",
            "x": 42,
            "y": 57,
            "rong": 8
          }
        },
        {
          "id": "dk-nop-hai-ma",
          "moTa": "Nộp 2 mã kèm căn cứ; cô phụ trách tra sổ: SV240317 có, SV240228 không",
          "nhan": "chinh",
          "moTu": {
            "kind": "ngay",
            "ngay": 5,
            "khung": "sang"
          },
          "can": {
            "kind": "co",
            "id": "ev-hai-ma"
          },
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n5-nop-hai-ma"
          },
          "moManhMoi": [
            "clue-hoai-nguoi-nop"
          ],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-so-niem-phong",
            "x": 42,
            "y": 57,
            "rong": 8
          }
        },
        {
          "id": "dk-don-robotics",
          "moTa": "Đơn xin phòng của Robotics, chữ ký \"Chủ nhiệm CLB Robotics\"",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 3,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n3-don-robotics"
          },
          "moManhMoi": [],
          "hienTaiLieu": [
            "doc-don-robotics"
          ],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-don-robotics",
            "x": 22,
            "y": 54,
            "rong": 8
          }
        },
        {
          "id": "dk-don-guitar",
          "moTa": "Đơn xin lịch phòng tập của CLB Guitar",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 3,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n3-don-guitar"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-don-guitar",
            "x": 76,
            "y": 40,
            "rong": 4
          }
        }
      ]
    },
    {
      "id": "cang-tin",
      "ten": "Căng tin",
      "canh": "cang-tin",
      "moTu": {
        "kind": "ngay",
        "ngay": 3,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 0,
        "moiDuKien": 1
      },
      "phanBiet": "Ý kiến không phải hành động; sổ niêm phong mới loại được Hiếu",
      "duKien": [
        {
          "id": "dk-hieu-y-kien",
          "moTa": "Hiếu: \"CLB chiếm phòng mà có làm gì đâu\"",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 3,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n3-hieu-cang-tin"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "nv:hieu",
            "x": 20,
            "y": 98,
            "rong": 15
          }
        },
        {
          "id": "dk-loi-dat",
          "moTa": "Đạt kể sáng thứ Hai Hoài nói \"đi gửi hộ anh khóa trên cái phong bì\"",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 5,
            "khung": "trua"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n5-dat"
          },
          "moManhMoi": [
            "clue-loi-dat"
          ],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "nv:dat",
            "x": 42,
            "y": 98,
            "rong": 15
          }
        },
        {
          "id": "dk-robotics-on",
          "moTa": "Sinh viên phàn nàn Robotics ồn ban đêm",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 3,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n3-robotics-on"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-ban-an-sinh-vien",
            "x": 80,
            "y": 82,
            "rong": 22
          }
        }
      ]
    },
    {
      "id": "cong-ktx",
      "ten": "Cổng KTX",
      "canh": "cong-ktx",
      "moTu": {
        "kind": "ngay",
        "ngay": 1,
        "khung": "sang"
      },
      "tonKhung": {
        "vao": 0,
        "moiDuKien": 1
      },
      "phanBiet": "Chú chỉ tả dáng người và huy hiệu, không nhận diện mặt",
      "duKien": [
        {
          "id": "dk-loi-chu-cuong",
          "moTa": "Chú Cường: 6:45 sáng thứ Hai thấy một anh năm cuối đeo huy hiệu bánh răng đưa phong bì nâu",
          "nhan": "phu",
          "moTu": {
            "kind": "ngay",
            "ngay": 3,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n3-chu-cuong"
          },
          "moManhMoi": [
            "clue-loi-chu-cuong"
          ],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "nv:chu-cuong",
            "x": 72,
            "y": 98,
            "rong": 16
          }
        },
        {
          "id": "dk-lich-cat-nuoc",
          "moTa": "Lịch cắt nước bảo trì",
          "nhan": "nhieu",
          "moTu": {
            "kind": "ngay",
            "ngay": 1,
            "khung": "sang"
          },
          "can": null,
          "hanhDong": {
            "kind": "chuoi",
            "chuoi": "n1-lich-cat-nuoc"
          },
          "moManhMoi": [],
          "hienTaiLieu": [],
          "luuBangChung": [],
          "lap": "mot-lan",
          "anh": {
            "sprite": "obj-lich-cat-nuoc",
            "x": 28,
            "y": 56,
            "rong": 5
          }
        }
      ]
    }
  ],
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
      "ten": "Cuối ngày"
    },
    "luat": {
      "chinhToiDaKhung": 2,
      "phuNhieuMin": 1,
      "phuNhieuMax": 3,
      "uyTin": 5
    },
    "chuoiDau": "md-00-xe-buyt",
    "ngay": [
      {
        "so": 1,
        "ten": "Ngày 1 — Thực địa",
        "duKienChinh": "dk-bac-thinh-the-lich",
        "moNgay": "n1-mo",
        "buoiToi": "toi-1"
      },
      {
        "so": 2,
        "ten": "Ngày 2 — Phòng máy",
        "duKienChinh": "dk-loc-lop",
        "moNgay": "n2-mo",
        "buoiToi": "toi-2"
      },
      {
        "so": 3,
        "ten": "Ngày 3 — Thực địa",
        "duKienChinh": "dk-quy-che-so-niem-phong",
        "moNgay": null,
        "buoiToi": "toi-3"
      },
      {
        "so": 4,
        "ten": "Ngày 4 — Phòng máy",
        "duKienChinh": "dk-ten-h",
        "moNgay": null,
        "buoiToi": "toi-4"
      },
      {
        "so": 5,
        "ten": "Ngày 5 — Thực địa",
        "duKienChinh": "dk-nop-hai-ma",
        "moNgay": null,
        "buoiToi": "toi-5"
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
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Chủ nhật, ngày nhận phòng"
        },
        {
          "type": "note",
          "text": "Xe buýt mở cửa, hơi nóng đầu giờ chiều hắt thẳng vào. Người chơi kéo vali xuống vỉa hè, bánh xe va mặt đường đánh cạch một cái."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Nóng thật… Cổng trường ngoài đời trông to hơn trên ảnh.)"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Thông báo xếp phòng ghi là phòng 408. Cơ mà ký túc xá nằm ở đâu nhỉ…)"
        },
        {
          "type": "note",
          "text": "Người chơi mở điện thoại, mạng xoay mãi, bản đồ không lên."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Pin còn mười hai phần trăm. Mấy bạn đằng trước cũng kéo vali, chắc cùng về ký túc xá. Cứ bám theo đã.)"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Một bạn phía trước vừa đi vừa gọi điện báo mẹ là đến nơi rồi."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Mẹ cũng dặn đến nơi thì nhắn. Lát vào phòng nhắn luôn.)"
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
          "text": "Qua dãy giảng đường sơn vàng, qua bãi để xe, cuối con đường là một cổng sắt nhỏ, trên biển đề \"Ký túc xá\"."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Đây rồi. Nhà nào cũng tận bảy tầng cơ à…)"
        },
        {
          "type": "note",
          "text": "Bánh vali vấp mép gạch, người chơi phải xách bổng lên bằng cả hai tay."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Phòng 408 là tầng bốn. Mong là có thang máy.)"
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
          "type": "note",
          "text": "Sảnh tầng một mát, vắng. Bên trái là thang máy, trên tường là bảng tin của khu nhà. Lần đầu người chơi tự bấm vật trên nền: vật chưa xem có viền trắng. Xem xong cả hai thì một cậu sinh viên đội mũ lưỡi trai từ hành lang bên phải đi ra."
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
              "x": 22,
              "y": 52,
              "rong": 5,
              "chuoi": "md-00-thang-may",
              "sau": [],
              "nhan": "Xem tờ giấy trên cửa thang máy"
            },
            {
              "sprite": "obj-so-do-ktx",
              "x": 50,
              "y": 50,
              "rong": 14,
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
              "nhan": "Hỏi đường cậu bạn đội mũ"
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
          "text": "(Sơ đồ vẽ mỗi thang máy, chẳng thấy thang bộ đâu cả.)"
        }
      ]
    },
    {
      "id": "md-00-gap-tung",
      "title": "Hỏi đường cậu bạn đội mũ: tạo nhân vật",
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
          "text": "Khuất sau hành lang kia, cạnh phòng giặt. Lần đầu ai cũng tìm không ra. Cậu lên tầng mấy?"
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
          "xucXac": "Ngại nghĩ thì bấm xúc xắc, tớ đặt hộ cho. Đảm bảo không xui.",
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
          "speaker": "tung",
          "expression": "happy",
          "text": "Đưa tớ một đầu vali. Hai đứa khiêng, bốn tầng thôi mà."
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
          "type": "note",
          "text": "Hai người khiêng vali lên tới tầng bốn, cùng thở dốc. Tùng đẩy cửa phòng 408."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tới nơi rồi. Giường trong sát cửa sổ là của tớ, cậu chọn giường nào thì chọn."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "(Nhắn mẹ cái đã: \"Con đến phòng rồi, mẹ ạ.\")"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Cất đồ xong tớ dẫn đi một vòng trường. Đi sớm cho biết đường, tuần sau vào học đỡ lạc."
        },
        {
          "type": "goto",
          "to": "md-02-ban-do"
        }
      ]
    },
    {
      "id": "md-02-ban-do",
      "title": "Ra bản đồ trường",
      "canh": "ban-do",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "task",
          "text": "Đi dạo trường cùng Tùng"
        },
        {
          "type": "note",
          "text": "Mở bản đồ lần đầu: hướng dẫn chọn điểm, di chuyển. Chỉ sáng điểm \"Sảnh tòa B\"."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tớ cá là mười phút là tới nhà văn hóa."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu thuộc đường thật à?"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Biết sơ sơ thôi. Lạc thì coi như biết thêm đường."
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
          "text": "Xem xét vật thể lần đầu: hộp tôn cũ treo tường, biển \"Hộp tiếp nhận kiến nghị\", mép khe sắc. Bác Thịnh ngồi bàn trực gần cầu thang."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Trường số hóa hết rồi mà vẫn treo cái hộp này nhỉ."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Mép khe sắc phết. Nhét phong bì dày vào chắc rách mất."
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
          "to": "md-04-cang-tin"
        }
      ]
    },
    {
      "id": "md-04-cang-tin",
      "title": "Căng tin: khung giờ",
      "canh": "cang-tin",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Dạy cơ chế khung giờ. Quầy bún cá đã đóng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Bún cá dọn mất rồi. Quầy này chỉ bán sáng với trưa, giờ còn mỗi bánh mì."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Ở đây mà lệch giờ một cái là mất phần ngay."
        },
        {
          "type": "goto",
          "to": "md-05-phong-may"
        }
      ]
    },
    {
      "id": "md-05-phong-may",
      "title": "Ngoài phòng máy",
      "canh": "ngoai-phong-may",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Địa điểm khóa: cửa kính, bên trong tối."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Phòng máy của thầy Khải đấy. Chưa có việc thì đứng ngoài ngó thôi."
        },
        {
          "type": "goto",
          "to": "md-06-bang-tin"
        }
      ]
    },
    {
      "id": "md-06-bang-tin",
      "title": "Nhà văn hóa, bảng tin",
      "canh": "nha-van-hoa",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Đọc bảng tin: hàng chục CLB; poster \"Đăng ký CLB năm nay: quét QR hoặc form online\"."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Ơ, có cả CLB Thám Tử này. Lạ nhỉ, chưa nghe bao giờ."
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
      "canh": "cong-ktx",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "note",
          "text": "Về muộn, quẹt thẻ ở phòng trực. Gợi ý lưu game khi về phòng."
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
          "expression": "neutral",
          "text": "Bọn cháu đi xem trường ạ. Chú ơi, trên bảng tin có CLB Thám Tử, chú biết không?"
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "À, CLB đấy ngày xưa ghê lắm. Vụ mất xe, vụ gian lận thi, chúng nó đều moi ra được bằng chứng."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Chẳng thần thánh gì đâu. Chịu khó hỏi từng người rồi đối chiếu giấy tờ thôi."
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
      "canh": "nha-van-hoa",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Thứ Hai → thứ Sáu tuần 1 — Tuần sinh hoạt công dân."
        },
        {
          "type": "note",
          "text": "Người chơi nhận thẻ lịch của khoa mình: phần in theo khoa, dòng viết tay \"Họ tên / Lớp\". Gieo cho ngày 1."
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
          "type": "note",
          "text": "Bàn Robotics đông, dán \"Đang xin mở rộng xưởng thực hành\". Bàn Thám Tử chỉ có Minh Anh."
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
          "speaker": "tung",
          "expression": "worried",
          "text": "Dạ em đùa hơi quá. Em xin lỗi chị."
        },
        {
          "type": "note",
          "text": "Phiếu đăng ký cần mã sinh viên; tân sinh viên chưa có thẻ. Đoàn trường phát cho mỗi bàn danh sách tra cứu tân sinh viên K24 (mã, họ tên, ngành)."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Danh sách này chỉ để tra mã thôi nhé. Điền xong trả chị."
        },
        {
          "type": "note",
          "text": "Tùng tự tin điền mã, nhưng ghi sai. Minh Anh bắt đầu dò bằng mắt."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Chị cho em lọc thử một lần được không ạ?"
        },
        {
          "type": "trial-filter",
          "id": "lt-ngay-hoi",
          "sql": "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng';",
          "soDong": 3,
          "chon": {
            "cot": "ma_sv",
            "giaTri": "SV240251"
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Có ba người tên Tùng. Nhìn cột ngành… Du lịch, đây rồi."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "…Em lọc nhanh phết. Chị đang cần người làm sổ hoạt động. Bốn giờ chiều thứ Hai tuần sau CLB họp đầu năm, hai em ghi tên đi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Dạ em thì… tìm đường với nhắc lịch là giỏi nhất ạ."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em biết xin lỗi là được rồi. Bắt đầu từ việc đến đúng giờ nhé."
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
          "type": "note",
          "text": "Có mặt: Minh Anh, Duy, Hà Vy, Tùng, người chơi."
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
          "text": "Tớ đăng ký qua form. Tớ mê Sherlock Holmes từ cấp hai, nghe tên CLB thám tử là đăng ký luôn."
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
          "text": "Khỏi đoán. Áo đội tình nguyện, balo cài huy hiệu khoa thế kia. Du lịch chứ gì."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thế ai giữ chìa khóa phòng này ạ?"
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tớ. Duy, năm hai Hành chính học. Chìa khóa, tủ hồ sơ với cái máy tính cũ đều tớ giữ."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Ngăn dưới tớ chưa kiểm kê tới. Cậu mở xem có gì trong đấy."
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
          "text": "Cô Lan gọi Minh Anh lên CTSV. 20 phút sau cô mang về thông báo lịch họp rà soát và bản chụp thư đã che thông tin. Bật bảng hồ sơ vụ."
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
          "type": "note",
          "text": "Người chơi tự tạo giấy nhớ đầu tiên."
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
          "text": "Đủ 5 người mới chỉ giữ được tư cách CLB thôi. Phòng vẫn bị xét vì báo cáo yếu, đơn của Robotics, giờ thêm lá thư này."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Người gửi muốn được trả lời thì phải có mã trong sổ niêm phong. Mà sổ đó không ai được mở."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thầy Quang cho CLB lập căn cứ. Cô phụ trách tự tra, Hội sinh viên giám sát."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khoan, tính lại đã. Mình mới có một chữ H với một cái hộp."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nói có sách, mách có chứng. Sáng mai bắt đầu."
        }
      ]
    },
    {
      "id": "n1-mo",
      "title": "Mở ngày 1",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Ngày 1 — Sáng"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Sáng nay bác bảo vệ tòa B trực đấy. Cái hộp ở ngay đó, mình ra hỏi bác trước đi."
        }
      ]
    },
    {
      "id": "n1-bac-thinh",
      "title": "Bác Thịnh kể lúc mở hộp; soi khe hộp",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "task",
          "text": "Hỏi bác bảo vệ tòa B về cái hộp"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Cháu hỏi cái hộp à? Sáng thứ Hai 9 giờ, bác với cô phụ trách mở. Lá thư ấy nằm trên cùng."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Nằm trên cùng… vậy là bỏ vào muộn nhất, hoặc từ sáng sớm thứ Hai."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Ai bỏ thì bác chịu. Bác chỉ có mặt lúc mở hộp thôi."
        },
        {
          "type": "note",
          "text": "Người chơi tự soi khe hộp: mắc ở mép tôn là một tấm thẻ lịch, phần in còn nguyên \"Khoa Báo chí – Truyền thông · K24\", dòng viết tay \"Họ tên / Lớp\" bị xé mất."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Thẻ lịch Tuần sinh hoạt công dân… giống hệt thẻ của tớ, mà in cho khoa Báo chí."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tớ cá tên chủ thẻ nằm đúng ở mẩu bị rách!"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Mẩu đó giờ ai biết ở đâu. Phần còn lại thì cả khóa Báo chí ai cũng có."
        },
        {
          "type": "note",
          "text": "Giấy nhớ [Tòa B], [Báo chí K24]; thẻ lịch thành bằng chứng (khai báo ở dữ kiện)."
        }
      ]
    },
    {
      "id": "n1-to-roi",
      "title": "Tờ rơi CLB Guitar",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Tờ rơi CLB Guitar. Nằm dưới chân cầu thang, có mắc trong khe đâu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Ừ, chắc ai đi qua đánh rơi. Không dính gì tới cái hộp."
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
          "text": "Thông báo họp rà soát phòng CLB, thứ Hai tuần 3. Dán ngay cạnh hộp luôn."
        }
      ]
    },
    {
      "id": "n1-lich-cat-nuoc",
      "title": "Lịch cắt nước bảo trì",
      "canh": "cong-ktx",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tối thứ Năm cắt nước đấy. Nhớ hứng sẵn một xô nhé."
        }
      ]
    },
    {
      "id": "toi-1",
      "title": "Cuối ngày 1: Tùng dẫn tới tòa B trước giờ giao ca",
      "canh": "sanh-toa-b",
      "mocSomNhat": 19,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cuối ngày"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Sắp tới giờ bác Thịnh giao ca rồi. Đi nhanh, tớ biết đường tắt."
        },
        {
          "type": "goto",
          "to": "n1-bac-thinh"
        }
      ]
    },
    {
      "id": "n2-mo",
      "title": "Mở ngày 2",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Ngày 2 — Sáng"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Hôm nay Cô Hạnh bên Đào tạo cấp quyền dữ liệu. Có quyền rồi mình mới vào phòng máy được."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Đơn xin quyền chị đứng tên, có gì chị chịu. Các em gõ, còn Duy ngồi cùng, ký sổ mượn máy."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Tớ chỉ ngồi cạnh thôi, bàn phím là của các cậu."
        }
      ]
    },
    {
      "id": "n2-co-hanh",
      "title": "Cô Hạnh cấp quyền tạm",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "task",
          "text": "Nhận quyền dữ liệu tạm ở Phòng Đào tạo"
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Đơn của em Minh Anh có Thầy Quang duyệt rồi. Hai bảng thôi, chỉ những cột cần thiết. Họp xong là cô khóa quyền lại nhé."
        },
        {
          "type": "line",
          "speaker": "co-hanh",
          "expression": "neutral",
          "text": "Bảng lớp sinh hoạt có mã lớp, ngành, tòa nhà. Bảng sinh viên có mã, họ đệm, tên, mã lớp. Ngoài ra không có gì khác đâu."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Dạ, thế là đủ để khoanh vùng rồi ạ. Em cảm ơn cô."
        },
        {
          "type": "note",
          "text": "Giấy nhớ [Quyền dữ liệu tạm] và văn bản của thầy Quang (khai báo ở dữ kiện)."
        }
      ]
    },
    {
      "id": "n2-doi-phong-hoc",
      "title": "Thông báo đổi phòng học",
      "canh": "phong-dao-tao",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Tuần này lớp tớ chuyển sang tòa C học. Chắc chẳng dính gì vụ mình đâu."
        }
      ]
    },
    {
      "id": "toi-2",
      "title": "Cuối ngày 2: Hà Vy dẫn vào phòng máy",
      "canh": "phong-may",
      "mocSomNhat": 29,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cuối ngày"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thầy Khải cho mượn phòng máy thêm một tiếng. Vào đi, tớ ngồi cạnh."
        },
        {
          "type": "goto",
          "to": "pm2-lop"
        }
      ]
    },
    {
      "id": "pm2-lop",
      "title": "Bàn làm việc: bốn bài lọc lớp",
      "canh": "phong-may",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "task",
          "text": "Lọc ra lớp của thẻ lịch"
        },
        {
          "type": "note",
          "text": "Ba manh mối trên tường: [K24], [Tòa B], [Báo chí]. Mỗi bài một ý; không tốn thêm khung giờ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thẻ lịch ghi K24. Lọc thử các lớp khóa đó trước đã."
        },
        {
          "type": "challenge",
          "challengeId": "c-loc-khoa"
        },
        {
          "type": "notebook-note",
          "trang": "where-so"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Giờ đến tòa B."
        },
        {
          "type": "challenge",
          "challengeId": "c-loc-toa"
        },
        {
          "type": "notebook-note",
          "trang": "where-chu"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Tòa B với Báo chí, tớ nối luôn cho nhanh."
        },
        {
          "type": "challenge",
          "challengeId": "c-loc-and"
        },
        {
          "type": "notebook-note",
          "trang": "and-or"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Còn hai lớp. Thẻ lịch còn một chữ nữa chưa dùng."
        },
        {
          "type": "challenge",
          "challengeId": "c-loc-lop"
        }
      ]
    },
    {
      "id": "clb-so-chi-linh",
      "title": "Sổ chị Linh",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "notebook-lookup",
          "trang": "kiem-hai-lan",
          "phan": "tâm đắc"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "\"Kiểm hai lần, kết luận một lần.\" Chị Linh ghi to đùng ở trang đầu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Câu này tớ thích. Chép vào sổ mình đi."
        }
      ]
    },
    {
      "id": "clb-bao-cao-yeu",
      "title": "Báo cáo năm ngoái",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Báo cáo năm ngoái ghi \"hoạt động yếu\". Cô Lan nhắc lại y như thế."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Yếu thật á? Nghe nản ghê."
        },
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Yếu vì cả năm có ba buổi sinh hoạt thôi, chứ không phải vì làm dở."
        }
      ]
    },
    {
      "id": "clb-bien-ban-kiem-ke",
      "title": "Biên bản kiểm kê tài sản hè",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "duy",
          "expression": "neutral",
          "text": "Biên bản kiểm kê hồi hè. Điều hòa số 2 hỏng, còn lại đủ cả."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cái này không liên quan tới lá thư."
        }
      ]
    },
    {
      "id": "n3-ctsv-quy-che",
      "title": "CTSV: quy chế sổ niêm phong, Quân giám sát",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "task",
          "text": "Hỏi Phòng CTSV về quy chế phiếu gửi"
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
          "text": "Một anh sinh viên áo sơ mi, kẹp tập hồ sơ, đứng ở cửa từ lúc nào."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi bên Ban Pháp chế – Kiểm tra Hội sinh viên, được cử xuống giám sát việc này."
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
          "type": "note",
          "text": "Giấy nhớ [Cần mã và căn cứ] (khai báo ở dữ kiện)."
        }
      ]
    },
    {
      "id": "n3-don-robotics",
      "title": "Đơn xin phòng của Robotics",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Đơn xin phòng làm xưởng, nộp từ tuần trước. Ký \"Chủ nhiệm CLB Robotics\", tên thì không đọc nổi."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chữ ký khó đọc thật. Nhưng nhìn mãi cũng chẳng thấy chữ H."
        }
      ]
    },
    {
      "id": "n3-don-guitar",
      "title": "Đơn xin lịch phòng tập của CLB Guitar",
      "canh": "phong-ctsv",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Guitar chỉ xin lịch phòng tập thôi. Không phải đơn xin phòng."
        }
      ]
    },
    {
      "id": "n3-hieu-cang-tin",
      "title": "Hiếu ở căng tin",
      "canh": "cang-tin",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Tôi đọc thông báo rà soát rồi. Nói thẳng nhé, CLB các cậu giữ cái phòng cả năm chả để làm gì."
        },
        {
          "type": "line",
          "speaker": "hieu",
          "expression": "neutral",
          "text": "Nhóm tôi xin phòng làm bài nhóm mấy lần, lần nào cũng bảo hết phòng. Toàn phải ngồi ké thư viện."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Nghe gắt thế, chắc cậu này gửi thư đấy."
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
          "expression": "neutral",
          "text": "Tôi nói thẳng vậy thôi. Còn thư ai viết thì tôi không biết."
        }
      ]
    },
    {
      "id": "n3-robotics-on",
      "title": "Sinh viên phàn nàn Robotics ồn",
      "canh": "cang-tin",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Bàn bên cạnh đang than Robotics chạy máy tới khuya, cả dãy không ngủ được."
        }
      ]
    },
    {
      "id": "n3-chu-cuong",
      "title": "Chú Cường kể chuyện sáng thứ Hai",
      "canh": "cong-ktx",
      "mocSomNhat": 31,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Tuần này chú tớ chuyển sang ca sáng rồi. Sáng ra cổng là gặp."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chú ơi, sáng thứ Hai chú có để ý ai ra cổng sớm không ạ? Bọn cháu đang tìm người bỏ thư vào hộp tòa B."
        },
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Sáng thứ Hai à… 6 giờ 45, chú thấy một anh năm cuối đeo huy hiệu bánh răng, đứng ngoài cổng đưa phong bì nâu cho một bạn nữ."
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
          "text": "Không. Anh ấy đứng xa, sáng sớm, chú chỉ để ý cái huy hiệu với dáng người thôi."
        },
        {
          "type": "note",
          "text": "Giấy nhớ [Lời chú Cường] (khai báo ở dữ kiện)."
        }
      ]
    },
    {
      "id": "toi-3",
      "title": "Cuối ngày 3",
      "canh": "phong-ctsv",
      "mocSomNhat": 39,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cuối ngày · 16:45"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Gần năm giờ rồi, CTSV sắp đóng cửa. Chạy nhanh kẻo các cô về!"
        },
        {
          "type": "goto",
          "to": "n3-ctsv-quy-che"
        }
      ]
    },
    {
      "id": "n4-nhat-ky-in",
      "title": "Nhật ký in 23:10 Chủ nhật",
      "canh": "phong-may",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-khai",
          "expression": "neutral",
          "text": "Nhật ký in của phòng máy đây. Các em chỉ xem đúng dòng liên quan thôi nhé."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "23:10 Chủ nhật. Một trang, tệp \"kien-nghi-phong…\", tài khoản SV21… Năm 4."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Năm 4 á? Thế không phải tân sinh viên rồi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Người in là năm 4. Nhưng in xong ai mang đi nộp thì chưa biết."
        }
      ]
    },
    {
      "id": "n4-dong-in-bai-tap",
      "title": "Dòng in bài tập cùng đêm",
      "canh": "phong-may",
      "mocSomNhat": 41,
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "\"bao-cao-nhom-kinh-te-vi-mo.pdf\". Bài tập nhóm thôi, không phải thư."
        }
      ]
    },
    {
      "id": "toi-4",
      "title": "Cuối ngày 4",
      "canh": "phong-may",
      "mocSomNhat": 49,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cuối ngày"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Vào phòng máy đi. Chữ H ấy mà dùng dấu bằng là không ra đâu."
        },
        {
          "type": "challenge",
          "challengeId": "c-ten-h"
        }
      ]
    },
    {
      "id": "n5-nop-hai-ma",
      "title": "Nộp hai mã kèm căn cứ",
      "canh": "phong-ctsv",
      "mocSomNhat": 51,
      "nodes": [
        {
          "type": "task",
          "text": "Nộp danh sách mã kèm căn cứ"
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
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nói có sách, mách có chứng. Đến đây là đủ rồi, không đoán thêm."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Biết ai nộp chưa có nghĩa là biết ai viết."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Vâng ạ. Bọn em mới biết ai nộp thôi."
        },
        {
          "type": "line",
          "speaker": "co-lan",
          "expression": "neutral",
          "text": "Theo quy chế, người có mã trong sổ sẽ được mời đến buổi họp, ngồi chờ bên ngoài. Có mời vào hay không là do buổi họp."
        },
        {
          "type": "note",
          "text": "Giấy nhớ [Hoài là người nộp] (khai báo ở dữ kiện)."
        }
      ]
    },
    {
      "id": "n5-dat",
      "title": "Đạt kể ở giờ ra chơi",
      "canh": "cang-tin",
      "mocSomNhat": 52,
      "nodes": [
        {
          "type": "line",
          "speaker": "dat",
          "expression": "neutral",
          "text": "Sáng thứ Hai tớ nghe Hoài bảo \"đi gửi hộ anh khóa trên cái phong bì\". Có thế thôi."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cậu nghe tận tai à?"
        },
        {
          "type": "line",
          "speaker": "dat",
          "expression": "neutral",
          "text": "Ừ, tớ đứng ngay cạnh. Nhưng anh khóa trên là ai thì tớ chịu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Đây là nghe kể lại. Lúc giải trình phải nói rõ như thế."
        }
      ]
    },
    {
      "id": "toi-5",
      "title": "Cuối ngày 5: nộp mã trước giờ CTSV đóng cửa",
      "canh": "phong-ctsv",
      "mocSomNhat": 59,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "Cuối ngày · 16:45"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Cái thẻ ở khe hộp mới khoanh vùng được thôi, chưa chứng minh được chủ thẻ là người bỏ thư. Cứ nộp mã trước khi CTSV đóng cửa đã, tối về soát lại hồ sơ sau."
        },
        {
          "type": "goto",
          "to": "n5-nop-hai-ma"
        }
      ]
    },
    {
      "id": "hop-00",
      "title": "Nhịp 0–2: câu OR của Quân",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "task",
          "text": "Buổi họp rà soát"
        },
        {
          "type": "note",
          "text": "Thầy Quang ngồi giữa; Cô Lan và Quân một bên, CLB một bên. Hoài ngồi chờ ngoài hành lang theo quy chế, chưa được mời vào."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Sáng nay thầy duyệt phương án xếp lại phòng cho các CLB. Trước khi sang bên xưởng thực hành, thầy nghe phần của CLB Thám Tử. Mời các em trình bày căn cứ."
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
          "expression": "smug",
          "text": "Phản ánh này đến từ sinh viên nói chung, nên phải lọc diện rộng. Tên bắt đầu bằng H hoặc học lớp BC24A: mười bốn dòng. Trong hồ sơ các bạn nộp lên chỉ liệt kê hai người."
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
          "expression": "worried",
          "text": "Ơ… mười bốn dòng thật."
        },
        {
          "type": "note",
          "text": "Nhịp 1: người chơi chạm vào OR (chạm sai mất 1 vạch). Nhịp 2: sửa thành AND → 2 dòng → \"Số liệu đây!\". Chạy thử không phạt."
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
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Anh đang gộp hai nhóm vào làm một rồi ạ. Bọn em cần người vừa có tên bắt đầu bằng H, vừa học lớp BC24A ạ."
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
      "title": "Nhịp 4–5: đọc hai dòng",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "question",
          "id": "q-hai-dong",
          "asker": {
            "speaker": "quan",
            "text": "Theo điều kiện trên màn hình, hai dòng này cho ta biết điều gì?"
          },
          "choices": [
            {
              "id": "thoa-dieu-kien",
              "text": "Hai người thỏa điều kiện lọc, cần kiểm tiếp.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "neutral",
                  "text": "Được. Tức là mới thỏa điều kiện lọc thôi."
                }
              ]
            },
            {
              "id": "da-bo-thu",
              "text": "Hai người đã bỏ thư.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Khoan. Điều kiện lọc là tên với lớp, có phải hành động đâu."
                }
              ]
            },
            {
              "id": "cung-dong-co",
              "text": "Hai người cùng động cơ.",
              "correct": false,
              "feedback": [
                {
                  "speaker": "ha-vy",
                  "expression": "thinking",
                  "text": "Dữ liệu này làm gì có cột động cơ."
                }
              ]
            }
          ],
          "truUyTin": true
        },
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
              "text": "Dạ, chưa nói được ạ. Người có mã trên phiếu chưa chắc đã là người soạn thư.",
              "correct": true,
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Tách được mã trên phiếu với người viết thư. Được, thầy ghi nhận."
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
          "truUyTin": true
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
              "text": "Mã trên phiếu mới cho biết mã của bạn ấy được ghi lên phiếu, chưa đủ để gọi bạn ấy vào. Xin dừng ở đây.",
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
                  "kind": "tru-uy-tin"
                },
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
          "text": "Hoài được mời vào, đứng nép cạnh cửa."
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
          "text": "Được, em cứ ngồi đó. Các em còn gì trình thêm không?"
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
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Khoan… chiếu tên bạn ấy lên rồi gọi vào thế này, khác gì hỏi cung."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
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
                "kind": "hoac",
                "cac": [
                  {
                    "kind": "co",
                    "id": "clue-loi-chu-cuong"
                  },
                  {
                    "kind": "co",
                    "id": "clue-loi-dat"
                  }
                ]
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
          "expression": "neutral",
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
          "text": "…Hóa ra người nộp còn không biết trong thư viết gì. Em xin lỗi thầy, xin lỗi các bạn. Bên em quy kết vội quá ạ."
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
          "expression": "worried",
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
    "c-loc-khoa": {
      "id": "c-loc-khoa",
      "tieuDe": "Các lớp khóa K24",
      "deBai": "Thẻ lịch ghi \"K24\". Lọc bảng lớp sinh hoạt lấy các lớp khóa đó.",
      "manhMoiLienQuan": [
        "clue-bao-chi-k24"
      ],
      "mucTieuHoc": "WHERE lọc dòng; so sánh với số thì viết đúng như dữ liệu đang lưu (2024, không phải K24).",
      "soDongKyVong": 11,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE khoa_hoc = 2024;",
      "truyVanNapSan": null,
      "vatChung": null,
      "ghiChu": [
        "Lần chạy \"sai có ích\": kéo [K24] vào cột khóa → `khoa_hoc = 'K24'` → 0 dòng. Hà Vy mô tả: cột khóa lưu số 2024. Người chơi ✎ gõ 2024."
      ]
    },
    "c-loc-toa": {
      "id": "c-loc-toa",
      "tieuDe": "Các lớp sinh hoạt ở tòa B",
      "deBai": "Hộp kiến nghị ở tòa B. Lọc các lớp sinh hoạt ở tòa B.",
      "manhMoiLienQuan": [
        "clue-toa-b"
      ],
      "mucTieuHoc": "So sánh với chữ phải đặt trong nháy đơn; thiếu nháy máy tưởng là tên cột.",
      "soDongKyVong": 4,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B';",
      "truyVanNapSan": null,
      "vatChung": null,
      "ghiChu": [
        "Lần chạy \"sai có ích\": gõ như số `toa_nha = B` → lỗi \"no such column: B\". Hà Vy mô tả: máy đang đi tìm một cột tên B."
      ]
    },
    "c-loc-and": {
      "id": "c-loc-and",
      "tieuDe": "Lớp ở tòa B và thuộc ngành Báo chí",
      "deBai": "Lớp cần tìm vừa ở tòa B, vừa thuộc ngành Báo chí.",
      "manhMoiLienQuan": [
        "clue-toa-b",
        "clue-bao-chi-k24"
      ],
      "mucTieuHoc": "AND giữ dòng thỏa cả hai điều kiện (phần giao); OR giữ dòng thỏa một trong hai (phần hợp).",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
      "truyVanNapSan": null,
      "vatChung": null,
      "ghiChu": [
        "Tùng nối bằng OR → 5 lớp. Hà Vy mô tả: lấy lớp nào thỏa một trong hai. Đổi AND → 2 lớp (BC24A, BC23A)."
      ]
    },
    "c-loc-lop": {
      "id": "c-loc-lop",
      "tieuDe": "Lớp ở tòa B, ngành Báo chí, khóa K24",
      "deBai": "Còn hai lớp. Thêm điều kiện khóa để chỉ còn lớp khớp cả ba manh mối.",
      "manhMoiLienQuan": [
        "clue-toa-b",
        "clue-bao-chi-k24"
      ],
      "mucTieuHoc": "Ghép ba điều kiện bằng AND.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí' AND khoa_hoc = 2024;",
      "truyVanNapSan": null,
      "vatChung": {
        "id": "ev-lop-bc24a",
        "title": "Lớp BC24A — tòa B, Báo chí, khóa 2024",
        "description": "Kết quả truy vấn ghép ba điều kiện (tòa B, ngành Báo chí, khóa 2024): đúng một lớp.",
        "giaTri": [
          "BC24A"
        ]
      },
      "ghiChu": [
        "Dừng ở 2 lớp: Hà Vy mô tả có một lớp khóa khác cũng ở tòa B. Thêm `khoa_hoc = 2024` → BC24A → \"Số liệu đây!\" lần đầu."
      ]
    },
    "c-ten-h": {
      "id": "c-ten-h",
      "tieuDe": "Tên bắt đầu bằng H trong lớp BC24A",
      "deBai": "Chữ ký tay trên phiếu gửi chỉ đọc được chữ H đầu; lớp đã thu hẹp còn BC24A. Những sinh viên nào khớp cả hai?",
      "manhMoiLienQuan": [
        "clue-chu-ky-h"
      ],
      "mucTieuHoc": "\"=\" so khớp chính xác, ra 0 dòng thì xem lại dữ liệu; \"bắt đầu bằng\" (LIKE 'H%') mới khớp một chữ cái.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "truyVanNapSan": null,
      "vatChung": {
        "id": "ev-hai-ma",
        "title": "Hai mã ứng viên kèm căn cứ",
        "description": "Kết quả truy vấn: hai sinh viên lớp BC24A có tên bắt đầu bằng H.",
        "giaTri": []
      },
      "ghiChu": [
        "Kéo [H] với phép \"bằng\" → 0 dòng (không ai tên đúng một chữ \"H\"). Tùng: \"Tra sổ chị Linh đi\" → trang lỗi thường gặp → đổi \"bắt đầu bằng\" → 2 dòng. Bẫy: `ma_lop LIKE 'BC%'` → 3 dòng; lọc nhầm cột ho_dem → 1 dòng."
      ]
    },
    "c-sua-or-quan": {
      "id": "c-sua-or-quan",
      "tieuDe": "Câu truy vấn trên màn chiếu",
      "deBai": "Câu của Quân lấy \"tên H hoặc lớp BC24A\". Sửa để chỉ còn những người khớp cả hai.",
      "manhMoiLienQuan": [
        "clue-chu-ky-h"
      ],
      "mucTieuHoc": "Phần hợp (OR) và phần giao (AND).",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "truyVanNapSan": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';",
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
        "Nội dung": "Bác và cô phụ trách mở hộp 9h sáng thứ Hai; thư nằm trên cùng."
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
        "Nội dung": "Phần in còn nguyên \"Khoa Báo chí – Truyền thông · K24\"; dòng viết tay \"Họ tên / Lớp\" bị xé mất. Chỉ ra cả một khóa (2 lớp)."
      },
      "quotes": {}
    },
    "clue-quyen-du-lieu": {
      "id": "clue-quyen-du-lieu",
      "loai": "clue",
      "heading": "[Quyền dữ liệu tạm]",
      "fields": {
        "Tiêu đề": "Quyền dữ liệu tạm",
        "Nguồn": "Cô Hạnh, Phòng Đào tạo",
        "Nội dung": "Hai bảng, chỉ cột cần thiết; thu hồi sau buổi họp."
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
    "clue-loi-chu-cuong": {
      "id": "clue-loi-chu-cuong",
      "loai": "clue",
      "heading": "[Lời chú Cường]",
      "fields": {
        "Tiêu đề": "Phong bì nâu trao tay 6:45 sáng thứ Hai",
        "Nguồn": "Chú Cường, cổng KTX",
        "Nội dung": "Một anh năm cuối đeo huy hiệu bánh răng đưa phong bì nâu cho một bạn nữ; bạn nữ cầm rồi đi thẳng về phía tòa B. Chú không nhận diện mặt."
      },
      "quotes": {}
    },
    "clue-loi-dat": {
      "id": "clue-loi-dat",
      "loai": "clue",
      "heading": "[Lời Đạt]",
      "fields": {
        "Tiêu đề": "Hoài nói \"đi gửi hộ anh khóa trên\"",
        "Nguồn": "Đạt, lớp trưởng BC24A, căng tin",
        "Nội dung": "Lời kể của người quen về câu Hoài nói sáng thứ Hai. Khi giải trình phải nói rõ giới hạn đó."
      },
      "quotes": {}
    },
    "clue-hoai-nguoi-nop": {
      "id": "clue-hoai-nguoi-nop",
      "loai": "clue",
      "heading": "[Hoài là người nộp]",
      "fields": {
        "Tiêu đề": "Sổ niêm phong: SV240317 có, SV240228 không",
        "Nguồn": "Cô phụ trách hộp kiến nghị tra sổ, qua Phòng CTSV",
        "Nội dung": "Nguồn độc lập cho biết ai là người nộp; chưa cho biết ai viết."
      },
      "quotes": {}
    },
    "doc-the-lich-cua-toi": {
      "id": "doc-the-lich-cua-toi",
      "loai": "doc",
      "heading": "Thẻ lịch của khoa mình",
      "fields": {
        "Tiêu đề": "Thẻ lịch Tuần sinh hoạt công dân",
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
        "Nguồn": "Phòng CTSV chuyển về",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử, vì CLB không còn giải quyết được việc gì. Đề nghị Phòng phản hồi chính thức.",
          "Ký: (chữ ký tay — chữ H viết hoa rõ, phần sau là một nét lượn dài, không đọc được)"
        ]
      }
    },
    "doc-thong-bao-hop": {
      "id": "doc-thong-bao-hop",
      "loai": "doc",
      "heading": "Thông báo lịch họp rà soát",
      "fields": {
        "Tiêu đề": "Thông báo họp rà soát phòng CLB",
        "Nguồn": "Dán cạnh hộp kiến nghị, sảnh tòa B",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Họp rà soát phòng sinh hoạt CLB: thứ Hai tuần 3."
        ]
      }
    },
    "doc-van-ban-thay-quang": {
      "id": "doc-van-ban-thay-quang",
      "loai": "doc",
      "heading": "Văn bản cho phép lập căn cứ",
      "fields": {
        "Tiêu đề": "Văn bản của Thầy Quang",
        "Nguồn": "Phòng Đào tạo",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "CLB chỉ lập danh sách mã ứng viên kèm căn cứ; cô phụ trách tự tra sổ; quyền dữ liệu tạm thu hồi sau buổi họp."
        ]
      }
    },
    "doc-don-robotics": {
      "id": "doc-don-robotics",
      "loai": "doc",
      "heading": "Đơn xin phòng của Robotics",
      "fields": {
        "Tiêu đề": "Đơn xin phòng làm xưởng",
        "Nguồn": "Phòng CTSV",
        "Nội dung hiển thị": ""
      },
      "quotes": {
        "Nội dung hiển thị": [
          "Ký: Chủ nhiệm CLB Robotics (không đọc được tên)."
        ]
      }
    },
    "ev-the-lich": {
      "id": "ev-the-lich",
      "loai": "ev",
      "heading": "Thẻ lịch rách",
      "fields": {
        "Tiêu đề": "Thẻ lịch khoa Báo chí K24, rách dòng viết tay",
        "Nội dung": "Mắc ở mép tôn khe hộp. Chưa chứng minh chủ thẻ là người bỏ thư."
      },
      "quotes": {}
    },
    "ev-nhat-ky-in": {
      "id": "ev-nhat-ky-in",
      "loai": "ev",
      "heading": "Dòng nhật ký in",
      "fields": {
        "Tiêu đề": "Nhật ký in 23:10 Chủ nhật",
        "Nội dung": "1 trang, tệp \"kien-nghi-phong…\", tài khoản SV21xx… (năm 4). Người in thư không phải người nộp."
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
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE khoa_hoc = 2024;",
      "soDong": 11,
      "noi": "noi-dung-mvp/thu-thach/c-loc-lop.md:3 thẻ c-loc-khoa, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B';",
      "soDong": 4,
      "noi": "noi-dung-mvp/thu-thach/c-loc-lop.md:18 thẻ c-loc-toa, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-loc-lop.md:33 thẻ c-loc-and, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí' AND khoa_hoc = 2024;",
      "soDong": 1,
      "noi": "noi-dung-mvp/thu-thach/c-loc-lop.md:48 thẻ c-loc-lop, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-ten-h.md:3 thẻ c-ten-h, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';",
      "soDong": 2,
      "noi": "noi-dung-mvp/thu-thach/c-ten-h.md:21 thẻ c-sua-or-quan, SQL chuẩn"
    },
    {
      "sql": "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng';",
      "soDong": 3,
      "noi": "noi-dung-mvp/kich-ban/00-mo-dau.md:145 [LỌC THỬ lt-ngay-hoi]"
    },
    {
      "sql": "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';",
      "soDong": 14,
      "noi": "noi-dung-mvp/kich-ban/06-hop-va-ket.md:11 [MÀN CHIẾU hop-chieu-or]"
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
            "KT25A",
            "Kế toán",
            2025,
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
