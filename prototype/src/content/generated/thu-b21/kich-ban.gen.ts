// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-thu-b21/**/*.md (bộ thử của gói B21) bởi
// `npm run noi-dung:sinh:thu-b21` (tools/noi-dung/sinh-thu-b21.ts). Muốn đổi: sửa tệp .md, chạy lại lệnh, commit cả hai.
import type { KichBanMvp } from '../../mvp/types';

/** Bộ thử B21: noi-dung-thu-b21/. */
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
      "vai": "chủ nhiệm CLB, làm mẫu thao tác và gạch vạch ở lề sổ.",
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
      "vai": "thành viên CLB, nhắc khi đặt sai ô.",
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
      "id": "bac-thinh",
      "ten": "Bác Thịnh",
      "hoTen": null,
      "trongCau": "bác Thịnh",
      "vai": "bảo vệ sảnh tòa B, luôn có mặt ở sảnh; lời đổi khi người chơi đã có thẻ.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "chu-cuong",
      "ten": "Chú Cường",
      "hoTen": null,
      "trongCau": "chú Cường",
      "vai": "bảo vệ cổng ký túc xá.",
      "bieuCam": [
        "neutral",
        "smile"
      ],
      "xuatHienTu": {
        "kind": "mo-dau"
      },
      "chiQuaLoiKe": false,
      "gioiThieu": null
    },
    {
      "id": "khanh",
      "ten": "Khánh",
      "hoTen": null,
      "trongCau": "Khánh",
      "vai": "người hỏi ở buổi họp rà soát.",
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
      "vai": "điều phối và kết luận buổi họp.",
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
      "id": "phong-clb",
      "ten": "Phòng CLB",
      "anhNen": null
    },
    {
      "id": "sanh-toa-b",
      "ten": "Sảnh tòa B",
      "anhNen": null
    },
    {
      "id": "cong-ktx",
      "ten": "Cổng ký túc xá",
      "anhNen": null
    },
    {
      "id": "phong-hop",
      "ten": "Phòng họp rà soát",
      "anhNen": null
    },
    {
      "id": "hanh-lang",
      "ten": "Hành lang ngoài phòng họp",
      "anhNen": null
    }
  ],
  "diaDiem": [],
  "lich": {
    "vu": {
      "id": "vu1",
      "ten": "Vụ thử B21 — Chữ ký Hoài"
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
        "ten": "Hoài nào?",
        "chang": {
          "ngayTruyen": "2024-09-23",
          "gio": "16:30",
          "chotKhi": [
            "ev-hoai-bc24"
          ],
          "khiChot": "c1-chot",
          "coMat": [
            {
              "nhanVat": "minh-anh",
              "noi": "phong-clb"
            },
            {
              "nhanVat": "bac-thinh",
              "noi": "sanh-toa-b"
            }
          ]
        },
        "kieu": "theo-truyen",
        "chuoi": "c1-ban-do",
        "batDauO": "phong-clb",
        "duKienChinh": "",
        "moNgay": null,
        "buoiToi": ""
      },
      {
        "so": 2,
        "ten": "Hoài ra cổng lúc nào?",
        "chang": {
          "ngayTruyen": "2024-09-27",
          "gio": "15:00",
          "chotKhi": [],
          "khiChot": null,
          "coMat": [
            {
              "nhanVat": "chu-cuong",
              "noi": "cong-ktx"
            },
            {
              "nhanVat": "minh-anh",
              "noi": "phong-clb"
            }
          ]
        },
        "kieu": "theo-truyen",
        "chuoi": "c2-ban-do",
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
      "title": "Mở đầu: lá thư",
      "canh": "phong-clb",
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
          "type": "show-document",
          "documentId": "doc-thu"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Mình đi tìm xem Hoài nào đã bỏ thư."
        }
      ]
    },
    {
      "id": "c1-ban-do",
      "title": "Chặng 1: bản đồ",
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
              "x": 30,
              "y": 40,
              "rong": 5,
              "chuoi": "c1-phong-clb",
              "sau": [],
              "nhan": "Phòng CLB",
              "dau": "chinh",
              "co": [
                "minh-anh"
              ]
            },
            {
              "sprite": "ghim:sanh-toa-b",
              "x": 55,
              "y": 30,
              "rong": 5,
              "chuoi": "c1-sanh",
              "sau": [],
              "nhan": "Sảnh tòa B",
              "dau": "chinh"
            },
            {
              "sprite": "ghim:cong-ktx",
              "x": 75,
              "y": 60,
              "rong": 5,
              "chuoi": "c1-cong",
              "sau": [
                "c1-an-a"
              ],
              "nhan": "Cổng ký túc xá",
              "dau": "phu"
            },
            {
              "sprite": "vung:khe-ho",
              "x": 50,
              "y": 70,
              "rong": 5,
              "chuoi": "c1-an-a",
              "sau": [
                "c1-cong"
              ],
              "nhan": "Khe hộp"
            }
          ]
        }
      ]
    },
    {
      "id": "c1-phong-clb",
      "title": "Chặng 1: phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "serious",
          "text": "Thư không ký tên. Em nhìn thẻ lịch này đi."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-the-lich"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thẻ lịch ghi BC-24. BC là Báo chí, 24 là khóa 2024."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-bc24"
            }
          ]
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em thử nối hai tờ này thành một câu hỏi."
        },
        {
          "type": "cac-cau-noi",
          "cac": [
            {
              "id": "cau-hoai-nao",
              "the": [
                "clue-the-lich",
                "clue-bc24"
              ],
              "cau": "Hoài nào học Báo chí, khóa 2024?",
              "dich": {
                "kind": "tra",
                "thuThach": "c-hoai-bc"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "c1-sanh",
      "title": "Chặng 1: sảnh tòa B",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "jump-if",
          "dieuKien": {
            "kind": "co",
            "id": "clue-the-lich"
          },
          "to": "c1-sanh-co-the"
        },
        {
          "type": "line",
          "speaker": "bac-thinh",
          "expression": "neutral",
          "text": "Sảnh này bác mở từ bảy giờ. Cậu hỏi gì?"
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-thinh"
            }
          ]
        },
        {
          "type": "goto",
          "to": "c1-sanh-noi"
        }
      ]
    },
    {
      "id": "c1-sanh-co-the",
      "title": "Chặng 1: sảnh tòa B, đã có thẻ lịch",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "bac-thinh",
          "expression": "smile",
          "text": "Thẻ lịch Báo chí à? Bác nhớ rồi: bảy giờ bác mở sảnh, chín giờ có người thu hộp."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-thinh"
            }
          ]
        },
        {
          "type": "goto",
          "to": "c1-sanh-noi"
        }
      ]
    },
    {
      "id": "c1-sanh-noi",
      "title": "Chặng 1: sảnh tòa B, nối lời bác Thịnh",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lá thư vào hộp lúc nào nhỉ? Nối lời bác Thịnh với lá thư xem."
        },
        {
          "type": "cac-cau-noi",
          "cac": [
            {
              "id": "cau-ai-bo-thu",
              "the": [
                "clue-loi-thinh",
                "doc-thu"
              ],
              "cau": "Ai bỏ thư vào hộp, lúc nào?",
              "dich": {
                "kind": "hien-truong",
                "ghim": "cong-ktx",
                "chuoi": null
              }
            }
          ]
        }
      ]
    },
    {
      "id": "c1-cong",
      "title": "Chặng 1: cổng ký túc xá",
      "canh": "cong-ktx",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "smile",
          "text": "Cổng này sáng nào bác cũng đứng từ sớm."
        }
      ]
    },
    {
      "id": "c1-an-a",
      "title": "Chặng 1: khe hộp",
      "canh": "sanh-toa-b",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Khe hộp hẹp, tờ giấy này rơi vào chắc là tình cờ."
        }
      ]
    },
    {
      "id": "c1-chot",
      "title": "Chặng 1: chốt",
      "canh": "phong-clb",
      "mocSomNhat": 11,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Ra một dòng: Lê Thu Hoài, lớp BC24A. Chặng sau mình tìm xem Hoài ra khỏi ký túc xá lúc nào."
        }
      ]
    },
    {
      "id": "c2-ban-do",
      "title": "Chặng 2: bản đồ",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "explore",
          "id": "c2-bd",
          "kieu": "ban-do",
          "gio": "15:00",
          "diem": [
            {
              "sprite": "ghim:cong-ktx",
              "x": 75,
              "y": 60,
              "rong": 5,
              "chuoi": "c2-cong",
              "sau": [],
              "nhan": "Cổng ký túc xá",
              "dau": "chinh",
              "co": [
                "chu-cuong"
              ]
            },
            {
              "sprite": "ghim:phong-clb",
              "x": 30,
              "y": 40,
              "rong": 5,
              "chuoi": "c2-clb",
              "sau": [],
              "nhan": "Phòng CLB",
              "dau": "phu",
              "co": [
                "minh-anh"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c2-cong",
      "title": "Chặng 2: cổng ký túc xá",
      "canh": "cong-ktx",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "chu-cuong",
          "expression": "neutral",
          "text": "Gần bảy giờ có cậu balo đen đưa Hoài phong bì nâu."
        },
        {
          "type": "consequence",
          "hauQua": [
            {
              "kind": "mo-manh-moi",
              "id": "clue-loi-cuong"
            }
          ]
        },
        {
          "type": "challenge",
          "challengeId": "c-ra-vao"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Lời chú khớp sổ: 6:44 Hoài ra cổng, gần bảy giờ có người đưa phong bì."
        },
        {
          "type": "doi-loai",
          "the": "clue-loi-cuong"
        },
        {
          "type": "dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "het-chang"
        }
      ]
    },
    {
      "id": "c2-clb",
      "title": "Chặng 2: phòng CLB",
      "canh": "phong-clb",
      "mocSomNhat": 21,
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chị chờ em ở đây."
        }
      ]
    },
    {
      "id": "hop-00",
      "title": "Buổi họp: chỉ ô",
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
          "type": "hien-dong-thoi-gian",
          "id": "dtg-vu1"
        },
        {
          "type": "line",
          "speaker": "khanh",
          "text": "Hoài tự cầm thư từ phòng đi bỏ vào hộp."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "worried",
          "text": "Em cũng ký phiếu thang máy mà đâu có viết."
        },
        {
          "type": "line",
          "speaker": "thay-quang",
          "expression": "neutral",
          "text": "Thầy ghi nhận."
        },
        {
          "type": "doi-chat",
          "id": "dc-chi-o",
          "asker": {
            "speaker": "khanh",
            "text": "Hoài ra cổng lúc 6:44 rồi đưa luôn thư cho người ta."
          },
          "cauHoi": "",
          "bangChung": [
            {
              "id": "dtg-vu1:o1+dtg-vu1:o2",
              "muc": "dung",
              "feedback": [
                {
                  "speaker": "khanh",
                  "expression": "stunned",
                  "text": "…Có người đưa phong bì cho Hoài?"
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
                  "expression": "smug",
                  "text": "Bác bảo vệ mở sảnh thì liên quan gì tới Hoài?"
                }
              ],
              "o": [
                "dtg-vu1:o3"
              ]
            }
          ],
          "chuaDu": [],
          "khac": [
            {
              "speaker": "khanh",
              "expression": "neutral",
              "text": "Chỗ ấy không nói Hoài đưa thư cho ai."
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "chiO": true,
          "tinhVach": {
            "cau": {
              "so": 1,
              "tong": 2
            },
            "saiLanDau": [
              {
                "speaker": "ha-vy",
                "expression": "thinking",
                "text": "Chỉ vào ô cạnh giờ 6:44 xem."
              }
            ]
          }
        },
        {
          "type": "doi-chat",
          "id": "dc-trong",
          "asker": {
            "speaker": "khanh",
            "text": "Vậy người đứng sau lá thư là Hoài."
          },
          "cauHoi": "",
          "bangChung": [
            {
              "id": "dtg-vu1:?",
              "muc": "dung",
              "feedback": [
                {
                  "speaker": "thay-quang",
                  "expression": "neutral",
                  "text": "Chưa ai biết người ấy. Thầy ghi nhận."
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
              "expression": "smug",
              "text": "Em chỉ ô nào thế?"
            }
          ],
          "hetLuot": [],
          "truUyTin": false,
          "chiO": true,
          "tinhVach": {
            "cau": {
              "so": 2,
              "tong": 2
            },
            "saiLanDau": [
              {
                "speaker": "ha-vy",
                "expression": "thinking",
                "text": "Ô nào chưa có ai?"
              }
            ]
          }
        },
        {
          "type": "cham-vu",
          "vu": "vu1",
          "can": [
            "dtg-vu1",
            "ev-ra-cong"
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
          "text": "Thư này không đưa vào hồ sơ."
        },
        {
          "type": "end"
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
          "text": "Thầy chưa thể coi hồ sơ này là chắc."
        },
        {
          "type": "end"
        }
      ]
    }
  ],
  "thuThach": {
    "c-hoai-bc": {
      "id": "c-hoai-bc",
      "tieuDe": "Bảng sinh viên: Hoài, lớp BC24A",
      "deBai": "Trong năm bạn tên Hoài, bạn nào học lớp BC24A?",
      "manhMoiLienQuan": [
        "clue-the-lich",
        "clue-bc24"
      ],
      "mucTieuHoc": "Hai điều kiện nối bằng VÀ: đúng tên, đúng lớp.",
      "soDongKyVong": 1,
      "sqlChuan": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "minh-anh",
              "expression": "happy",
              "text": "Một dòng. Lê Thu Hoài, lớp BC24A."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-hoai-bc24",
        "title": "Lê Thu Hoài, lớp BC24A, ở ký túc xá",
        "description": "Bảng sinh viên: tên Hoài VÀ lớp BC24A ra một dòng, SV240317, ở ký túc xá.",
        "giaTri": [
          "SV240317"
        ],
        "chuTrenGiay": [
          "Lê Thu Hoài, mã **SV240317**, lớp BC24A"
        ]
      },
      "ghiChu": []
    },
    "c-ra-vao": {
      "id": "c-ra-vao",
      "tieuDe": "Sổ ra vào ký túc xá",
      "deBai": "Sáng thứ Hai 16/09, bạn Hoài mã SV240317 quẹt thẻ ra cổng lúc mấy giờ?",
      "manhMoiLienQuan": [
        "clue-loi-cuong"
      ],
      "mucTieuHoc": "Hai điều kiện nối bằng VÀ: đúng mã, đúng ngày.",
      "soDongKyVong": 2,
      "sqlChuan": "SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';",
      "truyVanNapSan": null,
      "phanUng": [
        {
          "khi": {
            "kind": "dung"
          },
          "loi": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Hai dòng: ra lúc 06:44, vào lúc 17:52."
            }
          ]
        }
      ],
      "vatChung": {
        "id": "ev-ra-cong",
        "title": "6:44 sáng 16/09, Hoài quẹt thẻ ra cổng ký túc xá",
        "description": "Sổ quẹt thẻ cổng ký túc xá, mã SV240317 VÀ ngày 16/09/2024: hai dòng. Sáng quẹt thẻ ra cổng lúc 06:44; tối 17:52 mới quẹt thẻ vào.",
        "giaTri": [
          "06:44"
        ],
        "chuTrenGiay": [
          "Sáng 16/09 Hoài quẹt thẻ ra cổng lúc **06:44**"
        ]
      },
      "ghiChu": []
    }
  },
  "hoSo": {
    "doc-thu": {
      "id": "doc-thu",
      "loai": "doc",
      "heading": "Lá thư kiến nghị",
      "fields": {
        "Loại": "sự thật",
        "Nguồn": "tài liệu",
        "Keyword": "hành động:thu hồi phòng",
        "Trên bảng": "Thư đòi thu hồi phòng CLB, không ký tên",
        "Tiêu đề": "Thư kiến nghị thu hồi phòng CLB",
        "Nội dung": "Thư không ghi tên người viết, đòi thu hồi phòng của CLB."
      },
      "quotes": {}
    },
    "clue-the-lich": {
      "id": "clue-the-lich",
      "loai": "clue",
      "heading": "Thẻ lịch BC-24",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "quan sát",
        "Keyword": "địa điểm:tòa B · thời gian:thứ Hai",
        "Trên bảng": "Thẻ lịch BC-24, thứ Hai, tòa B",
        "Tiêu đề": "Thẻ lịch BC-24 mắc ở khe hộp",
        "Nguồn trên bảng": "Nhặt ở sảnh tòa B",
        "Nội dung": "Thẻ lịch ghi BC-24, thứ Hai, tòa B, tiết 1."
      },
      "quotes": {}
    },
    "clue-bc24": {
      "id": "clue-bc24",
      "loai": "clue",
      "heading": "BC-24 là Báo chí khóa 2024",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "suy luận",
        "Keyword": "người:Báo chí khóa 2024",
        "Trên bảng": "BC-24 là Báo chí khóa 2024",
        "Tiêu đề": "BC-24 là Báo chí khóa 2024",
        "Nguồn trên bảng": "Hà Vy suy ra",
        "Nội dung": "Hai chữ đầu là ngành, hai số sau là khóa."
      },
      "quotes": {}
    },
    "clue-loi-thinh": {
      "id": "clue-loi-thinh",
      "loai": "clue",
      "heading": "Lời bác Thịnh",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "lời kể",
        "Keyword": "người:bác Thịnh · thời gian:7:00 · hành động:mở sảnh",
        "Trên bảng": "Bác Thịnh mở sảnh lúc 7:00",
        "Tiêu đề": "Bác Thịnh mở sảnh lúc bảy giờ",
        "Nguồn trên bảng": "Lời bác Thịnh",
        "Nội dung": "Bảy giờ bác mở sảnh tòa B, chín giờ có người tới thu hộp."
      },
      "quotes": {}
    },
    "clue-loi-cuong": {
      "id": "clue-loi-cuong",
      "loai": "clue",
      "heading": "Lời chú Cường",
      "fields": {
        "Loại": "manh mối",
        "Nguồn": "lời kể",
        "Keyword": "người:cậu balo đen · thời gian:gần 7:00 · hành động:đưa phong bì",
        "Trên bảng": "Gần 7:00 cậu balo đen đưa phong bì cho Hoài",
        "Tiêu đề": "Gần bảy giờ có cậu balo đen đưa phong bì cho Hoài",
        "Nguồn trên bảng": "Lời chú Cường",
        "Nội dung": "Chú Cường thấy một cậu đeo balo đen đưa Hoài phong bì nâu ở cổng."
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
      "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';",
      "soDong": 1,
      "noi": "noi-dung-thu-b21/thu-thach/c-hoai-bc.md:1 thẻ c-hoai-bc, SQL chuẩn",
      "resultId": "ev-hoai-bc24"
    },
    {
      "sql": "SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';",
      "soDong": 2,
      "noi": "noi-dung-thu-b21/thu-thach/c-ra-vao.md:1 thẻ c-ra-vao, SQL chuẩn",
      "resultId": "ev-ra-cong"
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
            "Người chơi",
            "Người chơi",
            "KT24A",
            "Ký túc xá"
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
            "MK24B",
            "Marketing",
            2024,
            "A",
            "Sáng thứ Ba"
          ],
          [
            "KT23A",
            "Kế toán",
            2023,
            "A",
            "Sáng thứ Tư"
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
            "KT24A",
            "Kế toán",
            2024,
            "A",
            "Sáng thứ Năm"
          ]
        ]
      },
      {
        "ten": "ra_vao_ktx",
        "nhan": "Sổ ra vào",
        "nhanCot": {
          "ma_sv": "Mã sinh viên",
          "ngay": "Ngày",
          "gio": "Giờ",
          "chieu": "Chiều"
        },
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
          "text": "Note này chưa khớp ô ấy. Xem lại nó nói chuyện lúc nào, ở đâu."
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
          "id": "bac-thinh",
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
            "ev-ra-cong"
          ],
          "khoaSan": false,
          "khongDien": null,
          "keoSai": null,
          "keoVaoTrong": null
        },
        {
          "id": "o2",
          "gio": "~6:50",
          "cot": "?",
          "noi": "cổng ký túc xá",
          "viec": "đưa phong bì nâu cho Hoài",
          "nhan": [
            "clue-loi-cuong"
          ],
          "khoaSan": false,
          "khongDien": "ai",
          "keoSai": null,
          "keoVaoTrong": [
            {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Người đưa phong bì là ai thì chưa có căn cứ nào. Chỗ ấy để trống."
            }
          ]
        },
        {
          "id": "o3",
          "gio": "7:00",
          "cot": "bac-thinh",
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
          "viec": "bỏ thư vào hộp",
          "nhan": [
            "doc-thu"
          ],
          "khoaSan": false,
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
        "clue-the-lich",
        "clue-bc24"
      ],
      "cau": "Hoài nào học Báo chí, khóa 2024?",
      "dich": {
        "kind": "tra",
        "thuThach": "c-hoai-bc"
      }
    },
    {
      "id": "cau-ai-bo-thu",
      "the": [
        "clue-loi-thinh",
        "doc-thu"
      ],
      "cau": "Ai bỏ thư vào hộp, lúc nào?",
      "dich": {
        "kind": "hien-truong",
        "ghim": "cong-ktx",
        "chuoi": null
      }
    }
  ]
} satisfies KichBanMvp;

export const KICH_BAN_THU_B21 = { ...GOC, dieuHuongTuDo: true } satisfies KichBanMvp;
