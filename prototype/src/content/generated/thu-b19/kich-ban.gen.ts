// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-thu-b19/**/*.md (bộ thử của gói B19) bởi
// `npm run noi-dung:sinh:thu-b19` (tools/noi-dung/sinh-thu-b19.ts). Muốn đổi: sửa tệp .md, chạy lại lệnh, commit cả hai.
import type { KichBanMvp } from '../../mvp/types';

/** Bộ thử B19: noi-dung-thu-b19/. */
const GOC = {
  "tenGame": "CLB Thám Tử Dữ Liệu",
  "tenTruong": "Trường Đại học Chấn Hưng",
  "tenCam": [
    "Vương Khánh"
  ],
  "nhanVat": [
    {
      "id": "minh-anh",
      "ten": "Minh Anh",
      "hoTen": "Lê Minh Anh",
      "trongCau": "Minh Anh",
      "vai": "chủ nhiệm CLB, ngồi cạnh người chơi ở buổi họp, gạch vạch ở lề sổ.",
      "bieuCam": [
        "neutral",
        "worried",
        "serious",
        "happy"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "ha-vy",
      "ten": "Hà Vy",
      "hoTen": "Trần Hà Vy",
      "trongCau": "Hà Vy",
      "vai": "thành viên CLB, nhắc khi kéo sai thẻ.",
      "bieuCam": [
        "neutral",
        "thinking",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "tung",
      "ten": "Tùng",
      "hoTen": "Trần Tùng",
      "trongCau": "Tùng",
      "vai": "bạn cùng phòng.",
      "bieuCam": [
        "neutral",
        "worried",
        "happy"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "quan",
      "ten": "Quân",
      "hoTen": null,
      "trongCau": "Quân",
      "vai": "Ban Kiểm tra.",
      "bieuCam": [
        "neutral",
        "smug",
        "stunned"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "thay-quang",
      "ten": "Thầy Quang",
      "hoTen": null,
      "trongCau": "thầy Quang",
      "vai": "chủ trì họp rà soát.",
      "bieuCam": [
        "neutral",
        "stern",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    }
  ],
  "canh": [
    {
      "id": "san-ktx-trung-thu",
      "ten": "Sân ký túc xá, đêm Trung thu",
      "anhNen": "bg-mvp-san-ktx-trung-thu"
    },
    {
      "id": "phong-clb",
      "ten": "Phòng CLB",
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
      "id": "cong-ktx-bong-mo",
      "ten": "Cổng ký túc xá, gần bảy giờ",
      "anhNen": null
    },
    {
      "id": "tra-da",
      "ten": "Quán trà đá cổng trường",
      "anhNen": null
    }
  ],
  "diaDiem": [],
  "lich": {
    "vu": {
      "id": "vu1",
      "ten": "Vụ thử B19 — Chữ ký Hoài"
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
    "chuoiDau": "md-00",
    "ngayMoDau": "2024-09-17",
    "ngay": [
      {
        "so": 1,
        "ten": "Phòng CLB",
        "kieu": "theo-truyen",
        "chuoi": "n1-mo",
        "batDauO": "phong-clb",
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
      "id": "md-00",
      "title": "Trung thu: tập dượt dòng thời gian",
      "canh": "san-ktx-trung-thu",
      "mocSomNhat": 0,
      "nodes": [
        {
          "type": "create-character",
          "truong": "ten",
          "asker": {
            "speaker": "minh-anh",
            "expression": "neutral",
            "text": "Em tên gì?"
          },
          "xucXac": "Chị đặt tạm một tên nhé.",
          "luaChon": []
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Ba cái. Lúc bảy giờ chị đếm còn bốn."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Cậu xếp lại xem từng việc xảy ra lúc nào."
        },
        {
          "type": "dong-thoi-gian",
          "id": "dtg-banh"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Năm người. Sáng mai chị nộp danh sách."
        }
      ]
    },
    {
      "id": "n1-mo",
      "title": "Phòng CLB: thư kiến nghị",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "diem-luu-vu",
          "vu": "vu1"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Phòng nhận được thư kiến nghị thu hồi phòng của CLB."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "luu-bang-chung",
              "id": "ev-phieu-gui"
            },
            {
              "kind": "luu-bang-chung",
              "id": "ev-the-lich"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Phiếu gửi ký \"Hoài\". Tấm thẻ lịch là của khoa Báo chí, khóa 2024."
        },
        {
          "type": "ghep-mau",
          "nguoi": "minh-anh",
          "the": [
            "ev-phieu-gui",
            "ev-the-lich"
          ],
          "giayNho": "Hoài nào học Báo chí, khóa 2024?"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-co-lan"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-ra-cong"
            },
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-chu-cuong"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Thế người đưa phong bì là ai?"
        },
        {
          "type": "dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thứ Hai em trình dòng thời gian."
        }
      ]
    },
    {
      "id": "hop-00",
      "title": "Buổi họp: bốn câu tính vạch",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Bắt đầu."
        },
        {
          "type": "fix-query",
          "challengeId": "c-sua-or",
          "tinhVach": {
            "cau": {
              "so": 1,
              "tong": 4
            },
            "saiLanDau": [
              {
                "speaker": "ha-vy",
                "expression": "thinking",
                "text": "Nhìn lại chữ HOẶC trên màn chiếu."
              }
            ]
          }
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy nghe dòng thời gian của em."
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
            "text": "Phiếu gửi do ai ký?"
          },
          "cauHoi": "",
          "bangChung": [
            {
              "id": "clue-loi-co-lan",
              "muc": "dung",
              "feedback": []
            },
            {
              "id": "ev-the-lich",
              "muc": "sai",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "stern",
                  "text": "Tấm thẻ cho biết có một bạn Báo chí tới gần hộp. Thầy hỏi phiếu do ai ký."
                }
              ]
            }
          ],
          "chuaDu": [],
          "khac": [
            {
              "speaker": "thay-quang",
              "expression": "stern",
              "text": "Cái này không trả lời câu thầy hỏi."
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
                "speaker": "ha-vy",
                "expression": "thinking",
                "text": "Hôm ấy cô Lan nói gì về chữ ký nhỉ?"
              }
            ]
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Phiếu gửi do người nộp ký ạ."
        },
        {
          "type": "doi-chat",
          "id": "dc-ai-mang",
          "asker": {
            "speaker": "quan",
            "text": "Thư cũng do Hoài tự mang đi bỏ."
          },
          "cauHoi": "",
          "bangChung": [
            {
              "id": "clue-loi-chu-cuong",
              "muc": "dung",
              "feedback": [
                {
                  "speaker": "quan",
                  "expression": "stunned",
                  "text": "…Có người đưa phong bì?"
                }
              ]
            },
            {
              "id": "clue-ra-cong",
              "muc": "dung",
              "feedback": []
            },
            {
              "id": "ev-the-lich",
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
              "text": "Cái ấy không nói ai mang thư tới."
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "tinhVach": {
            "cau": {
              "so": 3,
              "tong": 4
            }
          }
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
                  "text": "Vừa nãy em nói Hoài chỉ là người nộp."
                }
              ]
            },
            {
              "id": "balo",
              "text": "Cậu đeo balo đen",
              "correct": false,
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "stern",
                  "text": "Chú Cường có nhìn thấy mặt không?"
                }
              ]
            },
            {
              "id": "chua-du",
              "text": "Chưa đủ căn cứ",
              "correct": true,
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Được."
                }
              ]
            }
          ],
          "truUyTin": false,
          "tinhVach": {
            "cau": {
              "so": 4,
              "tong": 4
            }
          }
        },
        {
          "type": "cham-vu",
          "vu": "vu1",
          "can": [
            "ev-phieu-gui",
            "clue-loi-chu-cuong",
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
      "title": "Kết thật",
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
          "type": "goto",
          "to": "bong-mo"
        }
      ]
    },
    {
      "id": "bong-mo",
      "title": "Cảnh bóng mờ ở cổng ký túc xá",
      "canh": "cong-ktx-bong-mo",
      "canhCat": true,
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Gần bảy giờ. Một bóng balo đen, một bóng nhỏ hơn cầm phong bì đi về phía tòa B."
        },
        {
          "type": "wait",
          "giay": 2
        },
        {
          "type": "goto",
          "to": "sau-hop"
        }
      ]
    },
    {
      "id": "ket-tam",
      "title": "Kết tạm",
      "canh": "phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "stern",
          "text": "Thầy chưa thể coi hồ sơ này là chắc. Phòng CLB giữ tới hết học kỳ, có điều kiện."
        },
        {
          "type": "goto",
          "to": "sau-hop"
        }
      ]
    },
    {
      "id": "sau-hop",
      "title": "Sau họp",
      "canh": "hanh-lang-phong-hop",
      "canhCat": true,
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "vu1-ket-tam"
          },
          "to": "sau-hop-tam"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tớ nói linh tinh một câu mà suýt làm Hoài mang tiếng."
        },
        {
          "type": "goto",
          "to": "sau-hop-hoi"
        }
      ]
    },
    {
      "id": "sau-hop-tam",
      "title": "Sau họp, kết tạm",
      "canh": "hanh-lang-phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Tớ nói linh tinh một câu, giờ Hoài mang tiếng thật rồi."
        },
        {
          "type": "goto",
          "to": "sau-hop-hoi"
        }
      ]
    },
    {
      "id": "sau-hop-hoi",
      "title": "Có nên xin lỗi Hoài?",
      "canh": "hanh-lang-phong-hop",
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "branch",
          "id": "r-xin-loi-hoai",
          "asker": {
            "speaker": "tung",
            "text": "Cậu bảo tớ có nên sang lớp Hoài xin lỗi không?"
          },
          "choices": [
            {
              "id": "nen",
              "text": "Nên. Sáng thứ Hai lớp Hoài học ở tòa B.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "dat-co",
                  "co": "xin-loi-som"
                }
              ]
            },
            {
              "id": "de-sau",
              "text": "Để Hoài bình tĩnh đã, mấy hôm nữa hẵng sang.",
              "khi": null,
              "hauQua": [
                {
                  "kind": "dat-co",
                  "co": "xin-loi-muon"
                }
              ]
            }
          ]
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Mà xin lỗi suông thì kỳ lắm."
        },
        {
          "type": "so-tong-ket",
          "vu": "vu1"
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
      "title": "Quán trà đá",
      "canh": "tra-da",
      "canhCat": true,
      "mocSomNhat": 1000,
      "nodes": [
        {
          "type": "line",
          "speaker": "tung",
          "expression": "happy",
          "text": "Bà ơi, cho cháu ba cốc trà đá! Hôm nay cháu khao."
        },
        {
          "type": "end"
        }
      ]
    }
  ],
  "thuThach": {
    "c-sua-or": {
      "id": "c-sua-or",
      "tieuDe": "Câu tra của Ban Kiểm tra",
      "deBai": "Câu trên màn chiếu ra sáu dòng. Sửa cho ra đúng một dòng rồi trình.",
      "manhMoiLienQuan": [],
      "mucTieuHoc": null,
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ten, nganh, khoa FROM ds_sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí';",
      "truyVanNapSan": "SELECT ma_sv, ten, nganh, khoa FROM ds_sinh_vien WHERE ten = 'Hoài' OR nganh = 'Báo chí';",
      "phanUng": [
        {
          "khi": {
            "kind": "so-dong",
            "n": 6
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "HOẶC giữ dòng nào khớp một trong hai điều kiện."
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
              "text": "Một dòng. Trình đi em."
            }
          ]
        }
      ],
      "khiTrinhSai": [
        {
          "speaker": "quan",
          "expression": "smug",
          "text": "Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?"
        }
      ],
      "vatChung": null,
      "ghiChu": []
    }
  },
  "hoSo": {
    "ev-phieu-gui": {
      "id": "ev-phieu-gui",
      "loai": "ev",
      "heading": "Phiếu gửi",
      "fields": {
        "Tiêu đề": "Phiếu gửi ký \"Hoài\"",
        "Nội dung": "Dòng người nộp ký một chữ: Hoài."
      },
      "quotes": {}
    },
    "ev-the-lich": {
      "id": "ev-the-lich",
      "loai": "ev",
      "heading": "Thẻ lịch rách",
      "fields": {
        "Tiêu đề": "Thẻ lịch Báo chí khóa 2024",
        "Nội dung": "Mắc ở khe hộp, dòng tên bị xé mất."
      },
      "quotes": {}
    },
    "clue-loi-co-lan": {
      "id": "clue-loi-co-lan",
      "loai": "clue",
      "heading": "[Lời cô Lan]",
      "fields": {
        "Tiêu đề": "Phiếu gửi do người nộp ký",
        "Nguồn": "Lời cô Lan, phòng Công tác sinh viên",
        "Nội dung": "Người viết thường tự đi nộp, nhưng vẫn có trường hợp nộp hộ."
      },
      "quotes": {}
    },
    "clue-ra-cong": {
      "id": "clue-ra-cong",
      "loai": "clue",
      "heading": "[6:44]",
      "fields": {
        "Tiêu đề": "Hoài ra cổng lúc 6:44",
        "Nguồn": "Sổ ra vào cổng ký túc xá",
        "Nội dung": "Sáng thứ Hai 16/09, mã SV240317 quẹt thẻ ra cổng lúc 6:44."
      },
      "quotes": {}
    },
    "clue-loi-chu-cuong": {
      "id": "clue-loi-chu-cuong",
      "loai": "clue",
      "heading": "[Lời chú Cường]",
      "fields": {
        "Tiêu đề": "Có người đưa phong bì cho Hoài ở cổng",
        "Nguồn": "Lời chú Cường, chốt cổng ký túc xá",
        "Nội dung": "Một cậu đeo balo đen gọi Hoài lại, đưa phong bì nâu, rồi đi luôn."
      },
      "quotes": {}
    }
  },
  "soTay": {},
  "loiChung": {
    "matUyTin": null
  },
  "soDongKhai": [
    {
      "sql": "SELECT ma_sv, ten, nganh, khoa FROM ds_sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí';",
      "soDong": 1,
      "noi": "noi-dung-thu-b19/thu-thach/c-sua-or.md:1 thẻ c-sua-or, SQL chuẩn"
    }
  ],
  "duLieu": {
    "bang": [
      {
        "ten": "ds_sinh_vien",
        "cot": [
          {
            "ten": "ma_sv",
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
            "ten": "khoa",
            "kieu": "INTEGER"
          }
        ],
        "dong": [
          [
            "SV240317",
            "Hoài",
            "Báo chí",
            2024
          ],
          [
            "SV240211",
            "Hoài",
            "Kế toán",
            2024
          ],
          [
            "SV230105",
            "Hoài",
            "Du lịch",
            2023
          ],
          [
            "SV240455",
            "Hoài",
            "Marketing",
            2024
          ],
          [
            "SV240101",
            "Lan",
            "Báo chí",
            2024
          ],
          [
            "SV230202",
            "Minh",
            "Báo chí",
            2023
          ],
          [
            "SV240303",
            "Tùng",
            "Du lịch",
            2024
          ],
          [
            "SV240404",
            "Vy",
            "Toán ứng dụng",
            2024
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
      "keoSai": null,
      "theTam": [
        {
          "id": "lk-dem-bon",
          "chu": "Minh Anh: \"Lúc bảy giờ chị đếm còn bốn.\""
        },
        {
          "id": "lk-tay-na",
          "chu": "Tay bé Na còn vụn bánh"
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
          "noi": null,
          "viec": "đĩa đủ bốn chiếc",
          "nhan": [
            "lk-dem-bon"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o2",
          "gio": "?",
          "noi": null,
          "viec": "bé Na cầm một chiếc",
          "nhan": [
            "lk-tay-na"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o3",
          "gio": "19:15",
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
              "text": "Lúc chia thì đã thiếu rồi. Chỗ này cần cái gì xảy ra lúc chia cơ."
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
          "text": "Thẻ này nói chuyện ở chỗ khác."
        }
      ],
      "theTam": [],
      "o": [
        {
          "id": "o1",
          "gio": "6:44",
          "noi": "cổng ký túc xá",
          "viec": "Hoài ra cổng",
          "nhan": [
            "clue-ra-cong"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o2",
          "gio": "?",
          "noi": "cổng ký túc xá",
          "viec": "[?] đưa phong bì nâu cho Hoài",
          "nhan": [
            "clue-loi-chu-cuong"
          ],
          "khoaSan": false,
          "khongDien": "ai",
          "keoSai": null,
          "keoVaoTrong": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Chưa ai biết người ấy. Cứ để trống."
            }
          ]
        },
        {
          "id": "o3",
          "gio": "7:00",
          "noi": "sảnh tòa B",
          "viec": "bác Thịnh mở sảnh",
          "nhan": [],
          "khoaSan": true,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o4",
          "gio": "trước 9:00",
          "noi": "sảnh tòa B",
          "viec": "Hoài bỏ thư, ký phiếu",
          "nhan": [
            "ev-phieu-gui"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o5",
          "gio": "9:00",
          "noi": "sảnh tòa B",
          "viec": "cô Lan thu hộp",
          "nhan": [
            "clue-loi-co-lan"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        }
      ]
    }
  }
} satisfies KichBanMvp;

export const KICH_BAN_THU_B19 = { ...GOC, dieuHuongTuDo: true } satisfies KichBanMvp;
