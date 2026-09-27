# Prompt asset prototype — nền, cảnh giới thiệu nhân vật, vật phẩm bấm được (v0.1)

Bổ sung cho `prompts-background-prototype-flow-v0.2.md` (3 cảnh nền) và bộ chân dung đã có trong
`prototype/src/assets/characters/`. Tài liệu gồm 4 phần:

1. **Kế hoạch tách layer**: đọc trước, vì nó quyết định cách tạo nền và vật phẩm.
2. **Nền**: bản "có vật" và bản "sạch" cho các cảnh có điểm bấm.
3. **Cảnh giới thiệu nhân vật**: ảnh đầy khung 16:9.
4. **Vật phẩm và tài liệu**: lớp riêng, bấm được, hover hiện viền.

Cài đặt chung trên Topview: GPT Image 2.5 Flare · Medium · Unlimited. Gắn **ảnh Minh Anh (`img_1`)
làm tham chiếu phong cách** cho mọi ảnh. Với cảnh có nhân vật, gắn thêm chân dung của nhân vật đó
làm tham chiếu nhận diện.

- Nền và ảnh giới thiệu: khung **16:9**. Bản nháp tạo ở 1K (1360×768); bản chốt dùng nút **Upscale**
  (hoặc tạo lại ở 2K) để đạt 2560×1440, theo `src/assets/art/README.md`.
- Vật phẩm: tạo trên **cùng khung 16:9 với nền** (xem §1.3), không tạo ở khung vuông riêng.

---

## 1. Kế hoạch tách layer

### 1.1. Thứ tự lớp trong một cảnh (từ dưới lên)

| Lớp | Nội dung | Tệp | Bấm được |
|---|---|---|---|
| L0 — Nền sạch | Phòng/hành lang **không có** vật bấm được | `bg-<cảnh>.png` (2560×1440, không trong suốt) | không |
| L1 — Vật phẩm | Mỗi vật một tệp PNG trong suốt | `item-<cảnh>-<vật>.png` | **có** |
| L2 — Nhân vật trong cảnh | Người đứng trong cảnh (vd. Bác Tư lau sàn) | `char-<ai>-scene-<cảnh>.png` | có (nếu là điểm xem xét) |
| L3 — Tiền cảnh che (tuỳ chọn) | Mép bàn, lan can… nằm **trước** vật | `fg-<cảnh>.png` trong suốt | không, `pointer-events: none` |
| L4 — Chân dung hội thoại + UI | Sprite nửa người, hộp thoại, nhãn | có sẵn | — |

### 1.2. Quy tắc cho lớp vật phẩm

- **Không vẽ viền hover vào ảnh.** Viền do code sinh ra từ kênh alpha, nên đổi màu, độ dày hay
  trạng thái (hover / focus bàn phím / đã xem) mà không cần tạo lại ảnh:
  - Cách nhẹ nhất: xếp 4–8 lớp CSS `filter: drop-shadow(...)` lệch 2px quanh vật, màu nhấn của game.
  - Cách gọn: SVG `feMorphology operator="dilate" radius="2"` trên alpha rồi tô màu, đặt dưới vật.
- **Vùng bấm theo alpha, không theo hình chữ nhật**: khi di chuột, đọc alpha của PNG (vẽ sẵn một lần
  vào canvas ẩn), alpha > 0.5 mới tính là trúng. Vùng bấm tối thiểu vẫn giữ `--hotspot-min` để dễ
  bấm trên cảm ứng.
- **Bóng đổ**: vật mang theo **bóng tiếp xúc mờ** của chính nó trong PNG (alpha thấp, dưới 0.5), để
  khi gỡ vật khỏi cảnh thì bóng đi theo. Vì ngưỡng alpha 0.5 nên viền hover không ôm cả bóng.
- **Toạ độ**: mỗi vật khai báo `x0, y0, x1, y1` theo **phần của ảnh 2560×1440** (0–1), cùng cách với
  `HEARING_ROOM_SCREEN` trong `scene-geometry.ts`. Game quy đổi theo cách cắt `cover` của nền, nên
  vật luôn dính đúng chỗ khi đổi cỡ màn hình.
- **Trạng thái**: bình thường → hover/focus (viền + nhấc nhẹ 1–2px) → đã xem (giảm bão hoà 30% và
  dấu "đã xem" do UI vẽ). Cả ba đều do code làm, không cần thêm ảnh.
- Nhãn chữ ("Lá thư", "Hộp góp ý") vẫn do UI vẽ, **ảnh không có chữ**.

### 1.3. Quy trình tạo để vật khớp đúng vị trí với nền

Vật và nền phải cùng phối cảnh, cùng ánh sáng, cùng toạ độ, nên **không** tạo vật riêng rồi dán
vào. Làm theo 4 bước:

1. **Bản có vật (composite)**: tạo cảnh nền có sẵn vật ở đúng chỗ (prompt §2, bản `-composite`).
   Đây là "bản gốc", không đưa vào game.
2. **Nền sạch**: sửa ảnh composite (Generate Image với ảnh composite làm đầu vào): *xoá vật, vẽ lại
   mặt bàn/tường phía sau*. Prompt: §2.4.
3. **Lớp vật**: sửa ảnh composite lần nữa: *giữ nguyên vật ở đúng vị trí, thay mọi thứ khác bằng nền
   phẳng một màu*. Prompt: §4.1. Sau đó chạy **Remove Background** của Topview để có PNG trong suốt,
   **giữ nguyên khung 2560×1440** (không cắt), nên toạ độ khớp tuyệt đối với nền.
4. **Kiểm**: chồng lớp vật lên nền sạch với độ mờ 50%. Lệch vài pixel thì dịch trong code; lệch
   nhiều hay đổi hình thì làm lại bước 3. Cuối cùng cắt sát vật (crop) và ghi `x0, y0, x1, y1`.

> Ảnh AI khi "sửa" đôi khi vẽ lại cả khung và xê dịch vài pixel. Bước 4 là bắt buộc. Nếu lệch
> nhiều, dùng **Inpaint** (tô vùng vật) thay cho sửa cả ảnh, vì Inpaint giữ nguyên phần ngoài vùng tô.

### 1.4. Danh sách lớp cần cho prototype

| Cảnh | Nền sạch | Vật phẩm bấm được | Nhân vật trong cảnh |
|---|---|---|---|
| `clb-room` | `bg-prototype-club-room` | `item-clb-letter` (lá thư + phong bì trên bàn) | — |
| `corridor-b` | `bg-prototype-hallway` | `item-hallway-suggestion-box` (hộp góp ý, có mẩu bookmark ló ở khe) | `char-bac-tu-scene-hallway` (Bác Tư cầm cây lau nhà) |
| `debrief-room` | `bg-prototype-hearing-room` | — (màn chiếu do UI chồng lên) | — |

> Việc cần làm ở code (chưa có): `ExploreScreen` hiện hiện điểm xem xét dạng **danh sách nút**. Để
> bấm thẳng vào vật trên ảnh cần thêm lớp L1/L2 vào `SceneBackdrop`, toạ độ trong `scene-geometry.ts`,
> hit-test theo alpha, và giữ danh sách nút làm phương án cho bàn phím/trình đọc màn hình.

---

## 2. Nền

Ba prompt cảnh nền trong `prompts-background-prototype-flow-v0.2.md` vẫn dùng được. Với hai cảnh có
vật bấm được, **đổi mô tả vật trong prompt** như dưới đây để vật nằm ở chỗ dễ tách và dễ bấm.

### 2.1. Phòng CLB — bản có vật

Dùng nguyên prompt `bg-prototype-club-room` (v0.2), **thêm** đoạn sau vào cuối `Scene/backdrop`:

```text
[id: bg-prototype-club-room-composite]
ADDITION to Scene/backdrop: on the near edge of the central worktable, slightly right of center, lies one clearly separated story object: a single folded cream A4 letter partly out of a plain white envelope, flat on the table, about the size of a hand, no readable writing, with a soft contact shadow. Nothing else is on the table except a closed pen and one neat folder pushed to the far end. Keep at least a palm's width of empty table surface around the letter on every side so it can be cleanly separated later. The letter sits inside the central 70 percent safe area and above the lower 35 percent dialogue zone.
```

### 2.2. Hành lang giảng đường B — bản có vật

Dùng nguyên prompt `bg-prototype-hallway` (v0.2), **thay** câu về hộp góp ý bằng:

```text
[id: bg-prototype-hallway-composite]
REPLACEMENT for the suggestion box: a sturdy wall-mounted metal suggestion box painted muted institutional green, with a slot on top and a blank label plate, mounted at adult chest height on a plain cream wall section between two columns, slightly left of center. The tip of a torn paper bookmark (no text) sticks out of the edge of the slot, small but noticeable. Keep clean empty wall around the box on every side (no bulletin board or pipe touching it) so it can be cleanly separated later. Leave an open floor area to the right of the box where a building caretaker can stand. The box sits inside the central 70 percent safe area and above the lower 35 percent dialogue zone.
```

### 2.3. Phòng giải trình

Dùng nguyên `bg-prototype-hearing-room` (v0.2). Không có vật bấm được; chỉ cần màn chiếu **trống**
chiếm khoảng 80% ngang × 60% cao để khớp `HEARING_ROOM_SCREEN`.

### 2.4. Tạo nền sạch từ bản có vật (sửa ảnh, gắn ảnh composite làm đầu vào)

```text
[id: bg-<scene>-clean]
Edit this exact image. Remove only the [letter and envelope | suggestion box and its bookmark] completely and repaint the [table surface | cream wall] behind it naturally, continuing the same material, grain, lighting and shadows. Also remove its contact shadow. Keep every other pixel identical: same camera, perspective, framing, furniture positions, colors and lighting. Do not add any new object. No text, no logo, no watermark.
```

### 2.5. Nền bổ sung (ngoài prototype, cho phần mở đầu của GDD)

```text
[id: bg-dorm-room]
Use case: production-asset
Asset type: production-ready 2D visual-novel game background
Primary request: an empty shared dormitory room for two first-year students at a contemporary Vietnamese university, on the first evening of the semester
Scene/backdrop: two single metal-frame beds on opposite walls, one freshly made and one with half-unpacked luggage and a rolled mattress; two simple study desks with desk lamps; a narrow wardrobe; a window with an aluminium frame showing a dusk campus and street lights; a small fan correctly mounted on the wall; a clothes line with a towel; plain cream walls
Composition/framing: 16:9 landscape, eye-level at 1.65 meters, three-quarter view, clean center and lower foreground for two character sprites and a dialogue box
Lighting/mood: warm lamp light mixed with blue dusk from the window, friendly, a fresh start
Style: match the attached reference image's art style (clean 2D visual novel, crisp thin lines, restrained cel shading, slightly desaturated background)
Constraints: no people or silhouettes; no readable text; no logos; no UI; no watermark; adult university scale
Avoid: luxury apartment, hotel room, high-school dorm, bunk-bed barracks, clutter, horror lighting, photorealism, fisheye
```

---

## 3. Cảnh giới thiệu nhân vật (ảnh đầy khung 16:9)

Dùng khi nhân vật xuất hiện lần đầu: ảnh đầy màn hình, UI chồng **tên + một dòng giới thiệu** lên
khoảng trống. Ảnh **không có chữ**.

Gắn 2 ảnh tham chiếu: `img_1` (phong cách) + chân dung của nhân vật (nhận diện). Điền phần `[...]`
theo bảng dưới.

### 3.1. Khung prompt chung

```text
[id: intro-<character-id>]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of [NAME, age, role] in [LOCATION]
Identity: the SECOND attached image is the exact character. Preserve the same face, hairstyle, glasses/accessories, outfit, colors and proportions exactly. The FIRST attached image is the art-style reference only.
Pose/action: [POSE AND PROP]
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the [LEFT | RIGHT] third of the frame, facing slightly toward the empty side; the opposite 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for the name card and tagline added later by the UI; the whole figure including both hands and props is inside the frame; horizon at eye level
Background: [LOCATION DETAILS], contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: [LIGHT], gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, dramatic fisheye, cluttered background, changed outfit, different face
```

### 3.2. Bảng điền cho từng nhân vật

| id | Tên, tuổi, vai | Vị trí khung | Nơi chốn | Tư thế / đạo cụ | Ánh sáng |
|---|---|---|---|---|---|
| `intro-minh-anh` | Nguyen Minh Anh, 21, detective club president | LEFT | the club room: worktable, cork board, window with red flamboyant foliage | standing by the table, one hand resting on a closed case folder, determined look toward the empty side | warm late-afternoon window light |
| `intro-ha-vy` | Le Ha Vy, 20, applied-math student and club analyst | RIGHT | the club room corner by the bookcase | holding a thin notebook open with blank chart sketches, pushing her glasses up with one finger, confident small smile | warm daylight with cool fill |
| `intro-quan` | Dang Hoang Quan, 21, head of the student union's audit board | RIGHT | the hearing room, long table with neatly squared folders | standing straight behind the table, one hand squaring a stack of files, cool composed gaze | cool neutral fluorescent light |
| `intro-hoai` | Le Thi Hoai, 18, first-year student and reluctant witness | LEFT | corridor of lecture building B near the green suggestion box | clutching her tote bag strap with both hands, glancing sideways, shy and uneasy | soft overcast morning light |
| `intro-bac-tu` | Bac Tu, 55, building caretaker | LEFT | corridor of lecture building B, wet tile gleaming | leaning on a mop handle, key ring on belt, warm kindly smile | soft overcast morning light |
| `intro-tung` | Tran Tung, 18, tourism student and the player's roommate | LEFT | the shared dorm room at dusk, half-unpacked luggage | thumbs-up with one hand, campus map brochure in the other, big grin | warm lamp light plus blue dusk |
| `intro-thay-khai` | Do Khai, 38, information systems lecturer and club adviser | RIGHT | a small faculty computer lab, rows of monitors softly blurred | holding a closed silver laptop under one arm, other hand in pocket, knowing half-smile, eyebrow slightly raised | cool monitor glow with warm rim light |
| `intro-thay-quang` | Trinh Quang, 52, vice rector who chairs the hearings | RIGHT | the hearing room seen from the moderator's end, blank projector screen behind | seated upright at the head of the table, hands folded on a closed file, stern but fair gaze | cool neutral light, slight top light |

---

## 4. Vật phẩm và tài liệu

### 4.1. Tách lớp vật từ ảnh composite (sửa ảnh, gắn ảnh composite làm đầu vào)

Nền phẳng dùng màu **khác hẳn màu vật**, để Remove Background tách sạch: vật sáng (thư, giấy) dùng
`#5E6B7D` (xám xanh đậm); vật tối hoặc màu xanh (hộp góp ý) dùng `#E2E6EA`.

```text
[id: item-<scene>-<object>]
Edit this exact image. Keep ONLY the [letter and envelope | suggestion box with the bookmark tip in its slot | caretaker] exactly as it is: same pixel position, same size, same perspective, same colors, same lighting and line art, including its soft contact shadow. Replace EVERYTHING else (room, furniture, wall, floor, sky) with one perfectly flat solid color [#5E6B7D | #E2E6EA], no gradient, no texture, no shadow on the background. Do not move, resize, redraw or re-angle the kept object. Same 16:9 canvas. No text, no logo, no watermark.
```

### 4.2. Bác Tư trong cảnh hành lang (lớp L2, bấm được)

Tạo **trên ảnh composite hành lang** (gắn composite + chân dung Bác Tư làm tham chiếu), rồi tách
như §4.1.

```text
[id: bg-prototype-hallway-composite-with-bac-tu]
Edit this exact image. Add the caretaker from the second attached image standing in the open floor area to the right of the suggestion box: full body from head to shoes, small in the scene at believable adult scale for the camera distance, holding a mop, pausing to look toward the viewer with a kindly expression. Preserve his exact face, gray hair, light-blue uniform shirt and navy tie. Match the scene's perspective, lighting and art style, with a soft contact shadow on the tile. Keep clear space between him and the suggestion box so they do not overlap. Change nothing else in the image. No text, no logo, no watermark.
```

### 4.3. Tài liệu phóng to (nền giấy, không chữ; 4:3, 1600×1200)

Chữ tiếng Việt do UI chồng lên, nên nền giấy phải **sáng và ít hoa văn ở giữa**. Không cần tách
layer: ảnh phủ kín khung tài liệu.

```text
[id: doc-letter]
Use case: production-asset
Asset type: 2D visual-novel document close-up background, 4:3 landscape
Primary request: a top-down view of one unfolded cream A4 letter paper lying flat on a honey-brown laminate table, with its plain white envelope tucked partly under the lower-right corner
Details: two soft fold creases across the paper, slightly warm off-white paper tone, a faint coffee-ring mark near one corner, the central 70 percent of the paper completely clean and empty for overlaid UI text
Style: match the attached reference's clean 2D visual novel rendering, soft cel shading, gentle warm light from the upper left
Constraints: absolutely no writing, no letters, no numbers, no signature, no logo, no watermark
```

```text
[id: doc-bookmark]
Use case: production-asset
Asset type: 2D visual-novel document close-up background, 4:3 landscape
Primary request: a close-up of half of a torn paper bookmark lying on a matte cream surface: a long narrow card with a rough torn edge at the bottom, a small punched hole with a short faded red ribbon at the top, and a simple abstract printed band in muted newsprint gray and phoenix red that suggests a student newspaper club without any readable letters
Composition: the bookmark lies diagonally across the center, large and clear; the upper-middle area of the bookmark and the surrounding surface stay plain for overlaid UI text
Style: match the attached reference's clean 2D visual novel rendering, soft cel shading, soft overcast light
Constraints: no readable text, no letters, no numbers, no logo, no watermark
```

```text
[id: doc-handover-log]
Use case: production-asset
Asset type: 2D visual-novel document close-up background, 4:3 landscape
Primary request: a top-down view of an open hardbound office logbook with ruled pages lying on a gray metal desk, a thin red seal sticker across the top edge of the right page, and a ballpoint pen resting at the gutter
Details: pale ruled lines only, empty table grid with 5 columns faintly drawn, slightly yellowed paper, a navy cloth cover visible at the edges
Style: match the attached reference's clean 2D visual novel rendering, cool neutral office light
Constraints: every line and cell must be empty; no handwriting, no letters, no numbers, no stamp text, no logo, no watermark
```

### 4.4. Biểu tượng manh mối cho Hồ sơ (tuỳ chọn, 1:1)

Dùng nếu muốn Hồ sơ vật chứng có hình nhỏ thay vì chỉ chữ. Tạo từng cái trên nền phẳng rồi
Remove Background.

```text
[id: icon-clue-<name>]
Use case: production-asset
Asset type: small inventory icon for a 2D visual novel evidence notebook, 1:1 square
Primary request: [a plain white envelope with a single elegant ink flourish on the flap (not a letter) | a small green wall-mounted suggestion box | half of a torn bookmark with a red ribbon | a closed navy logbook with a red seal sticker]
Composition: single object, centered, three-quarter top view, filling about 70 percent of the square, generous empty margin
Style: match the attached reference's clean 2D visual novel rendering, slightly bolder outline than backgrounds so it reads at 96 px, soft cel shading
Background: perfectly flat solid #5E6B7D, no gradient, no shadow on the background
Constraints: no readable text, no logo, no watermark
```

---

## 5. Thứ tự chạy gợi ý

1. `bg-prototype-club-room-composite` → `bg-prototype-club-room` (sạch) → `item-clb-letter`.
2. `bg-prototype-hallway-composite` → thêm Bác Tư → nền sạch → `item-hallway-suggestion-box` →
   `char-bac-tu-scene-hallway`.
3. `bg-prototype-hearing-room`.
4. `doc-letter`, `doc-bookmark`, `doc-handover-log`.
5. 8 ảnh `intro-*`.
6. (tuỳ chọn) `bg-dorm-room`, `icon-clue-*`.

Đặt tên tệp đúng id để game tự nhận (nền và tài liệu đã có ô sẵn; `item-*`, `intro-*`, `icon-*`
cần thêm ô trong code khi làm lớp bấm được).
