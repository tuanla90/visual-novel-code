// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung/*.md bởi `npm run noi-dung:sinh`
// (tools/noi-dung/sinh.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung` rồi
// `npm run noi-dung:sinh`, commit cả .md lẫn .gen.ts. Sửa tay ở đây → test "file sinh khớp nội dung" đỏ.
import type { StoryContent } from '../../story/types';

/** Tên game: phần trước " — " của tiêu đề `# …` ở noi-dung/quy-uoc.md. */
export const TEN_GAME = "CLB Thám Tử Dữ Liệu";

/** Mạch chính: noi-dung/kich-ban/chinh/*.md, đúng thứ tự tệp và thứ tự chuỗi. */
export const COT_TRUYEN = {
  "startSequenceId": "intro-00",
  "sequences": [
    {
      "id": "intro-00",
      "part": "intro",
      "scene": "corridor-b",
      "title": "Dạo quanh khuôn viên cùng Trần Tùng",
      "nodes": [
        {
          "type": "task",
          "text": "Dạo quanh khuôn viên trường cùng Tùng"
        },
        {
          "type": "note",
          "text": "Cảnh hành lang thoáng đãng nhìn ra sân trường và hàng phượng vĩ. Tùng cầm cẩm nang bản đồ trường, hồ hởi dẫn đường."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tuần đầu tiên bước chân vào cổng trường Đại học Hoa Phượng."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Đi một vòng từ sáng tới giờ đã thấy trường mình rộng chưa? Phòng KTX tụi mình ở tầng 3 khu B là thoáng nhất rồi đấy!"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Công nhận, từ khu giảng đường A qua khu B mà hoa hết cả mắt."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Phía bên kia là Thư viện trung tâm bốn tầng điều hòa mát rượi, còn đằng sau là Căng tin với sân thể thao."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cảm ơn cậu đã làm hướng dẫn viên nhiệt tình suốt cả buổi sáng nhé."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Bạn cùng phòng với nhau cả, khách khí làm gì! Cơ mà nghe bảo cậu mới ghi danh vào CLB Thám tử Dữ liệu à?"
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Đúng rồi, hôm nay là buổi gặp mặt đầu tiên của CLB."
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Phòng CLB ở ngay cuối hành lang này này. Cậu vào đi kẻo muộn, tớ lượn sang căng tin làm cốc trà đá đây!"
        },
        {
          "type": "line",
          "speaker": "tung",
          "expression": "neutral",
          "text": "Chiều về KTX nhớ kể tớ nghe xem CLB thám tử có vụ án gì ly kỳ không nhé!"
        },
        {
          "type": "goto",
          "to": "intro-01"
        }
      ]
    },
    {
      "id": "intro-01",
      "part": "intro",
      "scene": "clb-room",
      "title": "Phòng CLB, lá thư và việc được nhờ",
      "nodes": [
        {
          "type": "task",
          "text": "Nghe Minh Anh kể về vụ việc"
        },
        {
          "type": "note",
          "text": "Cảnh phòng CLB (tông ấm): tủ hồ sơ cũ, bảng trắng, ba cái ghế. Chưa có điểm xem xét. Space/Enter để qua lời."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Tuần thứ hai năm nhất. Bạn vừa ghi danh vào CLB Thám Tử được ba ngày."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Rồi, việc hôm nay là… giữ lại cái phòng này."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ngày xưa CLB phá vụ bằng mắt và chân: quan sát hiện trường, hỏi nhân chứng, đọc dấu vết."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Rồi trường chuyển hết lên hệ thống số. Manh mối nằm trong dữ liệu, mà cả CLB không ai đọc nổi."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Thế là vụ giải được ít dần, người bỏ đi dần. Giờ còn ba người, tính cả cậu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Sáng nay, Phòng Công tác sinh viên chuyển cho CLB bản chụp một lá thư lấy từ hộp góp ý."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thư đề nghị thu hồi phòng của CLB, vì \"CLB không còn giải quyết được việc gì\"."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Câu này… hơi đau."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nhưng Phòng CTSV không nhờ mình tìm thủ phạm."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Họ nhờ xác minh ai đã trực tiếp bỏ lá thư, để hỏi nguồn gốc thư và làm rõ quy trình tiếp nhận."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Một CLB \"không giải quyết được việc gì\" mà làm xong việc này thì…"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "…thì lá thư tự bác chính nó."
        },
        {
          "type": "goto",
          "to": "intro-02"
        }
      ]
    },
    {
      "id": "intro-02",
      "part": "intro",
      "scene": "clb-room",
      "title": "Quyền xem dữ liệu trong một buổi",
      "nodes": [
        {
          "type": "line",
          "speaker": "player",
          "text": "Vậy mình sẽ được xem dữ liệu sinh viên ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Một view tối thiểu thôi em: mã sinh viên, họ đệm, tên, lớp, câu lạc bộ."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Không có ngày sinh, quê quán, số điện thoại hay chỗ ở KTX. Việc cần gì thì cấp nấy."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Quyền chỉ có trong buổi làm việc hôm nay. Hết buổi là hết."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Em quen Excel đúng không? Hà Vy chỉ cách đọc dữ liệu, em cầm máy."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Yên tâm. Bảng dữ liệu cũng chỉ là một cái sheet to thôi."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Nhưng trước khi đụng vào dữ liệu, xem kỹ lá thư đã."
        },
        {
          "type": "goto",
          "to": "inv-01"
        }
      ]
    },
    {
      "id": "inv-01",
      "part": "investigation",
      "scene": "clb-room",
      "title": "Phòng CLB: xem xét lá thư",
      "nodes": [
        {
          "type": "task",
          "text": "Xem xét lá thư"
        },
        {
          "type": "note",
          "text": "Một điểm xem xét trên bàn, có viền và nhãn rõ; đã xem thì đánh dấu (QĐ-027). Không có vật nào khác bấm được."
        },
        {
          "type": "explore",
          "hotspots": [
            {
              "id": "hs-letter",
              "label": "Lá thư",
              "unlocksClue": "clue-signature-h",
              "runSequence": "inv-letter"
            }
          ]
        },
        {
          "type": "gate",
          "requires": [
            "clue-signature-h"
          ],
          "to": "inv-02"
        }
      ]
    },
    {
      "id": "inv-letter",
      "part": "investigation",
      "scene": "clb-room",
      "title": "Chữ ký ngoài phong bì",
      "nodes": [
        {
          "type": "show-document",
          "documentId": "doc-letter"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Thư đánh máy, không có tên người viết. Ngoài phong bì có một chữ ký tay lượn dài, chỉ đọc được chữ H đầu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Chữ ký chỉ có một chữ cái. H là họ, hay là tên?"
        },
        {
          "type": "question",
          "question": {
            "id": "q-sig-h",
            "asker": {
              "speaker": "ha-vy",
              "expression": "thinking",
              "text": "Theo cậu, chữ H nhiều khả năng là chữ đầu của gì?"
            },
            "choices": [
              {
                "id": "ho",
                "text": "Họ, vì trong họ tên, họ đứng đầu tiên.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "ha-vy",
                    "expression": "neutral",
                    "text": "Họ đứng đầu thật. Nhưng người Việt được gọi bằng tên, và cũng hay ký bằng tên."
                  }
                ]
              },
              {
                "id": "ten",
                "text": "Tên gọi, vì người Việt hay ký bằng tên.",
                "correct": true,
                "feedback": [
                  {
                    "speaker": "ha-vy",
                    "expression": "smile",
                    "text": "Mình cũng nghĩ thế. Mình ký \"Vy.\", có bao giờ ký \"Lê.\" đâu."
                  }
                ]
              },
              {
                "id": "ma-lop",
                "text": "Mã lớp, vì giấy tờ ở trường hay ghi mã lớp.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "ha-vy",
                    "expression": "neutral",
                    "text": "Mã lớp thì ai lại ký tay. Thử nghĩ xem cậu hay ký bằng chữ gì."
                  }
                ]
              }
            ]
          }
        },
        {
          "type": "note",
          "text": "Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035)."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Vẫn chỉ là khả năng thôi. Nhưng là khả năng đáng thử trước."
        },
        {
          "type": "note",
          "text": "Vì sao giữ manh mối này: nó quyết định cấu trúc truy vấn — lọc cột `ten` (không phải `ho_dem`) bằng phép \"bắt đầu bằng\" (`LIKE 'H%'`); đây là điều kiện của c1 và điều kiện đầu tiên của c3. Sau chuỗi này, mục \"Từ manh mối\" của trình dựng có giá trị `H`."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Thư lấy ra từ hộp góp ý sáng nay. Mà trường có ba hộp, ở ba giảng đường."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Bác Tư lao công sáng nào cũng đi cả ba tòa. Hỏi bác là nhanh nhất."
        },
        {
          "type": "task",
          "text": "Tìm hộp góp ý đã chứa lá thư"
        }
      ]
    },
    {
      "id": "inv-02",
      "part": "investigation",
      "scene": "corridor-b",
      "title": "Hành lang giảng đường",
      "nodes": [
        {
          "type": "task",
          "text": "Hỏi bác Tư, xem xét hộp góp ý"
        },
        {
          "type": "note",
          "text": "Cảnh hành lang: bác Tư đang lau sàn cạnh hộp góp ý. Biển \"Giảng đường B\" nhỏ trên tường, không nhấn mạnh. Hai điểm xem xét, chọn theo thứ tự nào cũng được."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hành lang giảng đường. Bác Tư đang lau sàn cạnh một hộp góp ý."
        },
        {
          "type": "explore",
          "hotspots": [
            {
              "id": "hs-bac-tu",
              "label": "Bác Tư",
              "unlocksClue": "clue-box-building-b",
              "runSequence": "inv-bac-tu"
            },
            {
              "id": "hs-box",
              "label": "Hộp góp ý",
              "unlocksClue": "clue-bookmark-baochi",
              "runSequence": "inv-box"
            }
          ]
        },
        {
          "type": "gate",
          "requires": [
            "clue-signature-h",
            "clue-box-building-b",
            "clue-bookmark-baochi"
          ],
          "to": "ana-01"
        }
      ]
    },
    {
      "id": "inv-bac-tu",
      "part": "investigation",
      "scene": "corridor-b",
      "title": "Hộp nào được mở sáng nay",
      "nodes": [
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "CLB Thám Tử đấy à? Lâu lắm rồi mới thấy các cháu đi hỏi chuyện."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Dạ. Bác ơi, sáng nay hộp góp ý nào được mở ạ?"
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Mỗi hộp này thôi, hộp giảng đường B. Cô Lan mở, bác đứng lau ngay đây."
        },
        {
          "type": "line",
          "speaker": "bac-tu",
          "expression": "neutral",
          "text": "Hộp tòa A với tòa C tuần này chưa đến lượt mở."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Vậy người bỏ thư đã đến tòa B. Lớp nào sinh hoạt ở tòa B thì sinh viên lớp ấy hay qua lại đây."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Nhưng view của mình chỉ có lớp, làm gì có tòa nhà."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thì tìm xem lớp nào sinh hoạt ở tòa B. Chắc phải có bảng ghi chuyện đó."
        },
        {
          "type": "note",
          "text": "Vì sao giữ manh mối này: nó đổi câu hỏi và cấu trúc truy vấn — bảng `sinh_vien` không có cột tòa nhà, nên phải hỏi bảng `lop_sinh_hoat` trước (c2), rồi dùng kết quả làm điều kiện `ma_lop IN (…)` của c3. Câu \"cô Lan mở hộp\" cài sẵn nguồn xác minh độc lập cho cú lật ở deb-04 và end-01."
        }
      ]
    },
    {
      "id": "inv-box",
      "part": "investigation",
      "scene": "corridor-b",
      "title": "Mẩu bookmark ở khe hộp",
      "nodes": [
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Sát khe hộp góp ý có nửa mẩu bookmark bị xé, kẹt ở mép khe."
        },
        {
          "type": "show-document",
          "documentId": "doc-bookmark"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Nửa logo ngòi bút, còn mấy chữ \"…ÁO CHÍ\". Bookmark của CLB Báo chí, họ phát ở ngày hội CLB."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Kẹt ngay khe hộp. Có thể rơi ra lúc ai đó nhét thư vội."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Thám tử ngày xưa chắc cũng nhặt được mấy thứ kiểu này."
        },
        {
          "type": "note",
          "text": "Vì sao giữ manh mối này: nó thêm điều kiện `clb = 'Báo chí'` cho c3, và đổi cách diễn giải — bookmark cho biết câu lạc bộ, không cho biết ai làm rơi (ghi ở \"Lưu ý\" của thẻ, không nói trong thoại để giữ QĐ-023). Sau chuỗi này, mục \"Từ manh mối\" có giá trị `Báo chí`."
        }
      ]
    },
    {
      "id": "ana-01",
      "part": "analysis",
      "scene": "clb-room",
      "title": "Mở dữ liệu",
      "nodes": [
        {
          "type": "task",
          "text": "Tìm sinh viên có tên bắt đầu bằng H"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Về phòng CLB. Laptop đã mở sẵn trình dựng truy vấn, nối vào view dữ liệu."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Ba manh mối rồi. Giờ đến lượt hỏi dữ liệu."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "View có hai bảng: sinh_vien và lop_sinh_hoat. Bắt đầu từ manh mối dễ nhất: chữ H."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Lần đầu thì mình chỉ từng bước. Chạy sai cứ chạy lại, bao nhiêu lần cũng được."
        },
        {
          "type": "challenge",
          "challengeId": "c1"
        },
        {
          "type": "goto",
          "to": "ana-c2-intro"
        }
      ]
    },
    {
      "id": "ana-c2-intro",
      "part": "analysis",
      "scene": "clb-room",
      "title": "Manh mối tòa B",
      "nodes": [
        {
          "type": "task",
          "text": "Tìm các lớp sinh hoạt ở giảng đường B"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Mười người. Đi hỏi từng người thì hết buổi mất."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Thêm manh mối tòa B vào. Nhưng bảng sinh_vien không có cột tòa nhà."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Mở bảng mô tả cột ra xem. Cột tòa nhà nằm ở bảng nào?"
        },
        {
          "type": "note",
          "text": "Ô FROM để trống như mọi thử thách (QĐ-016): chọn đúng bảng là việc của người chơi."
        },
        {
          "type": "challenge",
          "challengeId": "c2"
        },
        {
          "type": "goto",
          "to": "ana-c3-intro"
        }
      ]
    },
    {
      "id": "ana-c3-intro",
      "part": "analysis",
      "scene": "clb-room",
      "title": "Ghép ba manh mối",
      "nodes": [
        {
          "type": "task",
          "text": "Tìm người khớp cả ba manh mối"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "KT24A và QT24B. Hai mã lớp này giờ cũng là manh mối."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Chữ ký, tòa B, bookmark. Ai khớp cả ba?"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Chọn nhiều lớp trong danh sách giống như tick chọn nhiều ô trong Filter của Excel vậy."
        },
        {
          "type": "note",
          "text": "Mục \"Từ manh mối\" của trình dựng lúc này có: `H` (chữ ký), danh sách `KT24A, QT24B` (vật chứng ev-c2-classes-b), `Báo chí` (bookmark) — QĐ-017."
        },
        {
          "type": "challenge",
          "challengeId": "c3"
        },
        {
          "type": "goto",
          "to": "ana-c3-done"
        }
      ]
    },
    {
      "id": "ana-c3-done",
      "part": "analysis",
      "scene": "clb-room",
      "title": "\"Tìm ra rồi!\"",
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Hai người! Tìm ra rồi! Gửi Phòng CTSV ngay thôi!"
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Minh Anh gửi kết quả đi. Vài phút sau, điện thoại rung: tin nhắn từ Phòng CTSV."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "\"Trước khi CTSV liên hệ ai, Ban Pháp chế – Kiểm tra Hội sinh viên sẽ thẩm tra cách CLB dùng dữ liệu.\""
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Ban của anh Quân. Người gọi CLB mình là \"hội trinh thám nghiệp dư\"."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Mười lăm phút nữa, ở phòng giải trình. Mang theo hồ sơ."
        },
        {
          "type": "note",
          "text": "Không nhân vật nào nói hai dòng này là gì trước màn giải trình (QĐ-023). Hà Vy không sửa câu \"Tìm ra rồi!\" của Minh Anh."
        },
        {
          "type": "task",
          "text": "Đến phòng giải trình"
        },
        {
          "type": "gate",
          "requires": [
            "ev-c3-shortlist"
          ],
          "to": "deb-01"
        }
      ]
    },
    {
      "id": "deb-01",
      "part": "debrief",
      "scene": "debrief-room",
      "title": "Ban Pháp chế thẩm tra",
      "nodes": [
        {
          "type": "task",
          "text": "Trình bày cách CLB dùng dữ liệu"
        },
        {
          "type": "note",
          "text": "Cảnh phòng giải trình (tông lạnh). Quân ngồi một bên bàn, hồ sơ xếp thẳng mép. Minh Anh, Hà Vy, người chơi ngồi bên kia. Màn chiếu sau lưng Quân. Bước 1 của QĐ-024."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi là Quân, Ban Pháp chế – Kiểm tra Hội sinh viên. Tôi không xét nội dung lá thư."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "CLB là bên bị đề nghị thu hồi phòng, lại tự tra người bỏ thư. Tôi cần xem CLB dùng dữ liệu thế nào."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "smug",
          "text": "Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi đã tự chạy lại ba manh mối của CLB, trên đúng view CLB được cấp."
        },
        {
          "type": "note",
          "text": "Màn chiếu hiện truy vấn của Quân nguyên văn (5 dòng, §4.4), chạy thật trên dataset chính: bảng kết quả 24 dòng, dòng đếm \"24 dòng\" (QĐ-012)."
        },
        {
          "type": "projector",
          "projector": {
            "id": "proj-quan-or",
            "source": {
              "kind": "sql",
              "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, clb\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n   OR ma_lop IN ('KT24A', 'QT24B')\n   OR clb = 'Báo chí';"
            },
            "run": true,
            "expectedRowCount": 24
          }
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "smug",
          "text": "Hai mươi tư người, hơn nửa số sinh viên trong view. Manh mối kiểu này thì vô dụng."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Vậy danh sách hai người của CLB từ đâu ra?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "worried",
          "text": "Hai mươi tư? Cùng ba manh mối mà sao lệch nhiều thế…"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Có gì đó sai. Đọc kỹ từng dòng truy vấn của anh ấy."
        },
        {
          "type": "task",
          "text": "Chỉ ra dòng lỗi trong truy vấn của Quân"
        },
        {
          "type": "note",
          "text": "Bước 2 của QĐ-024. Năm dòng SQL trên màn chiếu thành năm vùng chạm được. Dòng 4 và dòng 5 đều đúng (cùng một lỗi `OR`). Chạm sai không phạt, không giới hạn số lần."
        },
        {
          "type": "line-pick",
          "pick": {
            "id": "q-quan-lines",
            "lines": [
              {
                "index": 1,
                "sql": "SELECT ma_sv, ho_dem, ten, ma_lop, clb",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Đủ cột cả: mã, họ tên, lớp, câu lạc bộ."
                  },
                  {
                    "speaker": "ha-vy",
                    "expression": "thinking",
                    "text": "Cột thì ổn. Xem anh ấy nối ba manh mối bằng từ gì: \"và\" hay \"hoặc\"?"
                  }
                ]
              },
              {
                "index": 2,
                "sql": "FROM sinh_vien",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Người cần tìm nằm trong bảng này. Không sai."
                  },
                  {
                    "speaker": "ha-vy",
                    "expression": "thinking",
                    "text": "Bảng thì đúng. Xem anh ấy nối ba manh mối bằng từ gì: \"và\" hay \"hoặc\"?"
                  }
                ]
              },
              {
                "index": 3,
                "sql": "WHERE ten LIKE 'H%'",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Điều kiện này lấy đúng từ chữ ký CLB đưa ra."
                  },
                  {
                    "speaker": "ha-vy",
                    "expression": "thinking",
                    "text": "Điều kiện này đúng. Xem nó được nối với hai điều kiện kia bằng từ gì."
                  }
                ]
              },
              {
                "index": 4,
                "sql": "OR ma_lop IN ('KT24A', 'QT24B')",
                "correct": true,
                "feedback": []
              },
              {
                "index": 5,
                "sql": "OR clb = 'Báo chí';",
                "correct": true,
                "feedback": []
              }
            ]
          }
        },
        {
          "type": "goto",
          "to": "deb-02"
        }
      ]
    },
    {
      "id": "deb-02",
      "part": "debrief",
      "scene": "debrief-room",
      "title": "Có số liệu đây: bất kỳ hay đồng thời",
      "nodes": [
        {
          "type": "effect",
          "effectId": "co-so-lieu-day"
        },
        {
          "type": "note",
          "text": "Bước 3 của QĐ-024, lần dùng hiệu ứng thứ nhất (QĐ-025)."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Anh nối ba manh mối bằng OR. Chỉ cần khớp một manh mối là đã vào danh sách."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Tên bắt đầu bằng H, hoặc học lớp tòa B, hoặc ở CLB Báo chí. Bảo sao ra 24 người."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Người bỏ thư phải khớp cả ba cùng lúc. Phải nối bằng AND."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "stunned",
          "text": "…"
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Nói thì dễ. Sửa ngay trên truy vấn của tôi, rồi chạy cho mọi người cùng xem."
        },
        {
          "type": "task",
          "text": "Sửa truy vấn của Quân và chạy lại"
        },
        {
          "type": "note",
          "text": "Bước 4 của QĐ-024: trình dựng mở với truy vấn của Quân nạp sẵn (thẻ debrief-fix)."
        },
        {
          "type": "fix-query",
          "challengeId": "debrief-fix"
        },
        {
          "type": "goto",
          "to": "deb-03"
        }
      ]
    },
    {
      "id": "deb-03",
      "part": "debrief",
      "scene": "debrief-room",
      "title": "Hai dòng nghĩa là gì",
      "nodes": [
        {
          "type": "effect",
          "effectId": "co-so-lieu-day"
        },
        {
          "type": "note",
          "text": "Lần dùng hiệu ứng thứ hai, cũng là lần cuối (QĐ-025). Màn chiếu hiện truy vấn đã sửa và kết quả 2 dòng."
        },
        {
          "type": "projector",
          "projector": {
            "id": "proj-fixed",
            "source": {
              "kind": "evidence",
              "evidenceId": "ev-quan-fixed"
            },
            "run": true,
            "expectedRowCount": 2
          }
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Vẫn ba manh mối ấy, nối bằng AND: còn hai dòng."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "stunned",
          "text": "…Lần này là tôi đọc vội."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi công nhận truy vấn. Giờ đến câu quan trọng hơn."
        },
        {
          "type": "task",
          "text": "Giải thích hai dòng kết quả"
        },
        {
          "type": "note",
          "text": "Bước 5 của QĐ-024. Đây là lần đầu game hỏi ranh giới giữa nghi vấn và kết luận (QĐ-023)."
        },
        {
          "type": "question",
          "question": {
            "id": "q-two-rows",
            "asker": {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Hai dòng này nghĩa là gì?"
            },
            "choices": [
              {
                "id": "tim-ra-roi",
                "text": "Tìm ra rồi: người bỏ thư là một trong hai bạn này.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "ha-vy",
                    "expression": "thinking",
                    "text": "Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?"
                  }
                ]
              },
              {
                "id": "can-xac-minh",
                "text": "Hai người cần xác minh thêm, chưa phải người bỏ thư.",
                "correct": true,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Đúng. Khớp manh mối là một chuyện. Đã bỏ thư là chuyện khác."
                  }
                ]
              },
              {
                "id": "vo-dung",
                "text": "Chưa nói lên gì, vì manh mối nào cũng có thể trùng hợp.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "ha-vy",
                    "expression": "thinking",
                    "text": "Từ bốn mươi người còn hai. Thu hẹp được thế là có ích chứ. Nhưng ích đến đâu?"
                  }
                ]
              }
            ]
          }
        },
        {
          "type": "note",
          "text": "Ba lựa chọn dài 11–13 chữ, cùng giọng thường; lựa chọn `tim-ra-roi` nối tiếp câu \"Tìm ra rồi!\" của Minh Anh, `vo-dung` nối tiếp kết luận của Quân (QĐ-035). Phản hồi của `tim-ra-roi` là câu gợi ý chuẩn hint-ask-or-conclude (§5.2)."
        },
        {
          "type": "note",
          "text": "Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-two-rows: đo chỉ số \"trả lời đúng rằng kết quả truy vấn chưa tự chứng minh hành vi\" (§10)."
        },
        {
          "type": "goto",
          "to": "deb-04"
        }
      ]
    },
    {
      "id": "deb-04",
      "part": "debrief",
      "scene": "debrief-room",
      "title": "Cú lật: dựa vào đâu?",
      "nodes": [
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Vậy tôi hỏi thẳng."
        },
        {
          "type": "task",
          "text": "Trả lời câu hỏi của Quân"
        },
        {
          "type": "note",
          "text": "Bước 6 của QĐ-024, cú lật chính (§4.4). Câu hỏi của Quân giữ nguyên văn."
        },
        {
          "type": "question",
          "question": {
            "id": "q-verify",
            "asker": {
              "speaker": "quan",
              "expression": "neutral",
              "text": "Nếu dữ liệu chưa kết luận được, CLB dựa vào đâu để biết ai đã bỏ thư?"
            },
            "choices": [
              {
                "id": "them-dieu-kien",
                "text": "Thêm điều kiện vào truy vấn cho đến khi chỉ còn một dòng.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Thêm điều kiện nào? Không có manh mối đứng sau thì chỉ là cắt cho gọn. Cắt nhầm là mất người thật."
                  }
                ]
              },
              {
                "id": "chon-dang-ngo",
                "text": "Chọn bạn trông đáng ngờ hơn trong hai bạn để hỏi trước.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Đáng ngờ theo cột nào? Bảng này không có cột \"đáng ngờ\"."
                  }
                ]
              },
              {
                "id": "goi-ca-hai",
                "text": "Mời cả hai bạn lên, hỏi thẳng xem ai đã bỏ thư.",
                "correct": false,
                "feedback": [
                  {
                    "speaker": "minh-anh",
                    "expression": "worried",
                    "text": "Gọi cả hai lên thì người vô can cũng bị làm phiền. CLB tìm sự thật, không để làm ai bẽ mặt."
                  }
                ]
              },
              {
                "id": "nguon-khac",
                "text": "Tìm một nguồn khác ngoài dữ liệu để đối chiếu hai bạn này.",
                "correct": true,
                "feedback": [
                  {
                    "speaker": "quan",
                    "expression": "neutral",
                    "text": "Đó là câu tôi chờ. Nguồn nào?"
                  }
                ]
              }
            ]
          }
        },
        {
          "type": "note",
          "text": "Bốn lựa chọn dài 12–13 chữ, cùng giọng thường. Lựa chọn đúng không nêu nguồn cụ thể: người chơi tự nối với lời bác Tư ở inv-bac-tu (QĐ-035)."
        },
        {
          "type": "note",
          "text": "Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)…(D) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-verify (câu \"dữ liệu đã đủ kết luận chưa?\", §9.3); cho chọn lại không giới hạn."
        },
        {
          "type": "line",
          "speaker": "player",
          "text": "Cô Lan bên Công tác sinh viên. Bác Tư bảo sáng nay cô mở hộp B."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "CLB chỉ xin cô đối chiếu đúng hai mã này thôi, không hơn."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tôi sẽ chuyển đề nghị ngay."
        },
        {
          "type": "goto",
          "to": "end-01"
        }
      ]
    },
    {
      "id": "end-01",
      "part": "ending",
      "scene": "debrief-room",
      "title": "Sổ bàn giao niêm phong",
      "nodes": [
        {
          "type": "task",
          "text": "Đối chiếu với sổ bàn giao"
        },
        {
          "type": "note",
          "text": "Bước 7 của QĐ-024; theo §2.1, phần Kết bắt đầu từ bước xác minh độc lập. Cô Lan không lên hình ở cảnh này, chỉ xuất hiện qua lời kể và tài liệu. Không dùng hiệu ứng \"Có số liệu đây!\" ở đây: khoảnh khắc này dẫn tới nhân chứng, cần nhẹ nhàng."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Hai mươi phút sau, cô Lan gửi lên kết quả đối chiếu."
        },
        {
          "type": "show-document",
          "documentId": "doc-handover-log"
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "thinking",
          "text": "Sổ niêm phong, không ai được xem. Cô chỉ trả lời mã nào có, mã nào không."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "SV240317 có trong sổ. Phòng CTSV sẽ mời bạn ấy lên."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Nói trước: bạn ấy đến để kể lại, không phải để bị xét."
        },
        {
          "type": "goto",
          "to": "end-02"
        }
      ]
    },
    {
      "id": "end-02",
      "part": "ending",
      "scene": "debrief-room",
      "title": "Người bỏ hộ lá thư",
      "nodes": [
        {
          "type": "task",
          "text": "Nghe nhân chứng kể lại"
        },
        {
          "type": "note",
          "text": "Hoài xuất hiện lần đầu (một mẫu chân dung, ba biểu cảm), bước vào, ôm balo trước ngực. Không tiêu đề \"lời khai\", không nhạc thẩm vấn. Không ai gọi Hoài là thủ phạm."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Em là Hoài, lớp QT24B. Em… có làm gì sai không ạ?"
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Không ai trách em cả. Bọn chị chỉ muốn biết lá thư từ đâu đến."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "downcast",
          "text": "Em không viết thư đó. Em chỉ bỏ hộ thôi ạ."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "downcast",
          "text": "Chiều thứ Sáu, một anh năm cuối đeo huy hiệu Robotics nhờ em. Anh ấy đang vội."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "nervous",
          "text": "Phiếu gửi phải ký và ghi mã. Anh ấy bảo em ký giúp. Em không đọc thư."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "neutral",
          "text": "Cảm ơn em. Chuyện ký hộ là quy trình phải sửa, không phải lỗi của em."
        },
        {
          "type": "line",
          "speaker": "hoai",
          "expression": "relieved",
          "text": "Dạ… Em cứ tưởng mình bị gọi lên vì làm sai."
        },
        {
          "type": "goto",
          "to": "end-03"
        }
      ]
    },
    {
      "id": "end-03",
      "part": "ending",
      "scene": "debrief-room",
      "title": "Khép buổi làm việc",
      "nodes": [
        {
          "type": "note",
          "text": "Bước 8 của QĐ-024. Hoài cúi chào rồi ra về trước khi Quân nói về người còn lại."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Bạn Hiếu, SV240228, không có trong sổ. Bạn ấy vô can, CTSV sẽ không liên hệ."
        },
        {
          "type": "line",
          "speaker": "quan",
          "expression": "neutral",
          "text": "Tìm được người bỏ thư chưa phải là tìm được người viết thư, CLB Thám Tử."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "neutral",
          "text": "Chúng em biết."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "text": "Năm giờ chiều. Quyền xem dữ liệu của CLB hết hạn. Danh sách hai người được hủy."
        },
        {
          "type": "note",
          "text": "Thẻ ev-c1-names-h, ev-c3-shortlist và ev-quan-fixed được gắn chú thích sau giải trình (mục Hồ sơ vật chứng); tên và mã trong các thẻ bị làm mờ; nút mở trình dựng truy vấn bị khóa. Quân chứng kiến việc hủy."
        },
        {
          "type": "set-flag",
          "flag": "access-revoked"
        },
        {
          "type": "annotate-evidence",
          "evidenceId": "ev-c1-names-h",
          "note": "Dữ liệu cá nhân trong thẻ đã hủy khi quyền truy cập kết thúc.",
          "redact": true
        },
        {
          "type": "annotate-evidence",
          "evidenceId": "ev-c3-shortlist",
          "note": "Đây là danh sách người cần xác minh, chưa phải kết luận. Theo sổ bàn giao, một người trong danh sách đã ký gửi hộ lá thư; người còn lại vô can. Danh sách đã hủy khi quyền truy cập kết thúc.",
          "redact": true
        },
        {
          "type": "annotate-evidence",
          "evidenceId": "ev-quan-fixed",
          "note": "Dữ liệu cá nhân trong thẻ đã hủy khi quyền truy cập kết thúc.",
          "redact": true
        },
        {
          "type": "task",
          "text": "Về phòng CLB"
        },
        {
          "type": "gate",
          "requires": [
            "doc-handover-log"
          ],
          "to": "end-04"
        }
      ]
    },
    {
      "id": "end-04",
      "part": "ending",
      "scene": "clb-room",
      "title": "Phòng CLB, chiều muộn",
      "nodes": [
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Giá mà còn quyền, chị tra ngay CLB Robotics."
        },
        {
          "type": "line",
          "speaker": "ha-vy",
          "expression": "smile",
          "text": "Quyền cấp cho việc này thôi chị. Hết việc là hết quyền."
        },
        {
          "type": "line",
          "speaker": "narrator",
          "display": "card",
          "text": "SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu."
        },
        {
          "type": "note",
          "text": "Câu trên là thông điệp kết của §4.5, giữ nguyên văn, hiện dạng thẻ chữ lớn giữa màn hình."
        },
        {
          "type": "line",
          "speaker": "minh-anh",
          "expression": "happy",
          "text": "Rồi, việc hôm nay xong. Anh năm cuối đeo huy hiệu Robotics… để vụ sau. Em đi tiếp cùng CLB chứ?"
        },
        {
          "type": "note",
          "text": "Sau `[KẾT THÚC]`, gói khác hiện khảo sát cuối game (QĐ-031); kịch bản này không viết khảo sát."
        },
        {
          "type": "end"
        }
      ]
    }
  ]
} satisfies StoryContent;
