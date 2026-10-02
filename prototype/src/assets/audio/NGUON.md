# Âm thanh — nguồn và cách dùng

Bộ phát: `src/shared/audio/sound-engine.ts`. Chọn nhạc theo cảnh: `src/mvp/engine/nhac.ts` (danh sách bài: `src/shared/audio/nhac-nen.ts`).
Thiếu tệp nào thì bộ phát dùng âm tổng hợp như trước, nên xóa/đổi tệp không làm vỡ game.

## Nhạc nền `bgm/` — Gemini (chế độ Music), 02/10/2026

Tạo ở gemini.google.com, công cụ "Create music", độ dài Standard, Instrumental; tải bằng "Download track → Audio only MP3"
(192 kbps, ~3 phút), rồi nén lại 128 kbps bằng ffmpeg (`-c:a libmp3lame -b:a 128k`) cho nhẹ (29,7 → 19,8 MB).
Nhạc do AI tạo, có thủy vân SynthID của Google.

| Tệp | Tên Gemini đặt | Dùng khi | Ý chính của lời mô tả (tiếng Anh, gửi nguyên văn) |
|---|---|---|---|
| `chu-de.mp3` | The Student's Inquiry | mở đầu, tạo nhân vật | main theme, hopeful/curious, piano + guitar + pizzicato, đàn tranh và sáo trúc, 92 BPM |
| `thuong-ngay.mp3` | Late Semester Afternoons | phòng CLB, đầu ngày, buổi tối | lo-fi Rhodes, guitar nylon, trống hip-hop nhẹ, 85 BPM |
| `dieu-tra.mp3` | Between the Bookstacks | bản đồ, khám phá, đi điều tra một nơi | pizzicato, piano tắt tiếng, contrabass đi bộ, clarinet, 100 BPM, giọng thứ kiểu jazz |
| `phan-tich.mp3` | The Late Desk | màn tra SQL, sửa truy vấn, lọc thư | synth arpeggio, Rhodes, tiếng lách cách như gõ phím, 88 BPM, tối giản |
| `doi-chat.mp3` | The Prosecutor's Gaze | buổi họp rà soát | piano ostinato, dây staccato, trống chặt, kèn đồng, 120 BPM |
| `cao-trao.mp3` | After the Last Clue | đối chất / trình chứng cứ, khoảnh khắc phản bác | dây nhanh, trống taiko, guitar điện, sáo trúc dẫn, 140 BPM |
| `ket.mp3` | (Gemini đặt "output") | kết vụ | piano, tứ tấu dây, cello, đàn tranh, 72 BPM |

Lời mô tả đầy đủ nằm trong cuộc trò chuyện Gemini "Campus Detective Visual Novel Theme" của tài khoản user.
Bài nào Gemini cũng tự thêm đoạn kết nhỏ dần + vài giây lặng; bộ phát lặp trước đoạn đó (bảng `VONG_LAP`).

## Hiệu ứng `sfx/` — BigSoundBank.com (Joseph SARDIN), giấy phép CC0

Tải ngày 02/10/2026 từ `https://bigsoundbank.com/UPLOAD/mp3/<mã>.mp3`. Giấy phép: https://bigsoundbank.com/licenses.html
(CC0 1.0 — dùng cả thương mại, không bắt buộc ghi công; tác giả mong được ghi "Additional sounds: Joseph SARDIN - BigSoundBank.com").

| Tệp (= loại SFX) | Mã | Tên trên BigSoundBank |
|---|---|---|
| `click.mp3` | 1742 | Apple Magic Mouse, Single Click |
| `select.mp3` | 2842 | Typewriter, Key |
| `tab.mp3` | 0164 | Turned Page |
| `page.mp3` | 2212 | Pages that Turn #5 |
| `cancel.mp3` | 1411 | Closed book #2 |
| `chime.mp3` | 2844 | Typewriter, Bell #1 |
| `clue_unlock.mp3` | 2086 | Chimes "Dream" #8 |
| `objection.mp3` | 1588 | Gavel, 1 blow |
| `shake.mp3` | 2460 | Punch #5 |
| `sai.mp3` | 1685 | Operation (Game) #4 |

Tiếng gõ chữ (`typewriter`, phát mỗi 2 ký tự) cố ý giữ âm tổng hợp. Độ lớn và đoạn lặng đầu của từng tệp được chỉnh trong
bảng `CHINH_SFX` của bộ phát (đo trên trình duyệt).

Pixabay (nguồn định dùng ban đầu) bị tường lửa công ty chặn, cùng với Kenney, Freesound, OpenGameArt, Mixkit, itch.io.
