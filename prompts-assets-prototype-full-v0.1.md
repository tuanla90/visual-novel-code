# Prompt asset prototype — bản gộp đầy đủ, copy một lần (v0.1)

Bản này gộp `prompts-background-prototype-flow-v0.2.md` với `prompts-assets-prototype-v0.1.md`:
**mỗi khối là một prompt hoàn chỉnh**, chỉ cần copy nguyên khối vào Topview, không phải thay chữ
hay ghép đoạn. Lý do và kế hoạch tách layer xem `prompts-assets-prototype-v0.1.md` §1.

Cài đặt chung: GPT Image 2.5 Flare · Medium · Unlimited. Dòng **"Gắn ảnh"** trên mỗi khối cho biết
cần gắn ảnh nào (Select from Canvas) trước khi dán prompt. `img_1` = ảnh Minh Anh trên canvas.

| Loại | Khung | Độ phân giải |
|---|---|---|
| Nền, ảnh giới thiệu, vật phẩm | 16:9 | 1K để thử → Upscale / 2K khi chốt (đích 2560×1440) |
| Tài liệu | 4:3 | 1K → Upscale (đích 1600×1200) |
| Biểu tượng | 1:1 | 1K |

**Thứ tự chạy**: A1 → A2 → A3 → B1 → B2 → B3 → B4 → B5 → C1 → D (tuỳ chọn) → E1–E8 → F1–F3 → G1–G4.
Khối "sửa ảnh" phải chạy trên kết quả của khối trước nó.

---

## A. Phòng CLB (`clb-room`)

### A1. `bg-prototype-club-room-composite` — nền có lá thư (bản gốc, không đưa vào game)

Gắn ảnh: `img_1` (phong cách). Khung 16:9.

```text
[id: bg-prototype-club-room-composite]
[type: image]

Use case: production-asset
Asset type: production-ready 2D visual-novel game background
Primary request: create an empty student detective club room in a contemporary Vietnamese university, modest and well used but carefully maintained, where an anonymous letter can be examined
Style reference: match the attached image's art style only (clean 2D visual novel rendering, crisp thin lines, restrained soft cel shading); do not include the person from the reference
Visual reference translated into text: bright Vietnamese campus interiors with cream-white walls, cool gray ceramic tile, broad aluminum-frame windows, practical fluorescent or LED ceiling fixtures, occasional warm orange architectural accents, durable adult institutional furniture, potted tropical greenery, clean open circulation, and believable local public-university materials
Scene/backdrop: one full-size modular seminar worktable in the middle distance; six modern adult stackable chairs with molded backs and powder-coated legs; a waist-high office filing cabinet with hinged doors and drawers; a low open bookcase with folders; a cork principles board holding blank paper shapes; a compact lockable cupboard; a correctly mounted ceiling fan centered on a visible structural beam; broad windows with a small glimpse of red flamboyant foliage outside
Story object: on the near edge of the central worktable, slightly right of center, lies one clearly separated story object: a single folded cream A4 letter partly out of a plain white envelope, flat on the table, about the size of a hand, no readable writing, with a soft contact shadow. Nothing else is on the table except a closed pen and one neat folder pushed to the far end. Keep at least a palm's width of empty table surface around the letter on every side so it can be cleanly separated later
Composition/framing: 16:9 landscape, 2560x1440-ready, eye-level camera at 1.65 meters, three-quarter room view, worktable, letter and corkboard in the central 70 percent safe area and above the lower 35 percent dialogue zone, uncluttered center and lower foreground for two or three character sprites and a dialogue box
Lighting/mood: warm late-afternoon daylight, welcoming and thoughtful, a quiet sense of an old student club worth saving, no noir mood
Color/materials: warm cream, honey-brown laminate, faded teal, muted paper beige, small restrained orange and red-flamboyant accents; matte tile, powder-coated steel, cork, paper and maintained office cabinetry
Constraints: no people or silhouettes; no readable text; blank or abstract paper marks only; no logos; no UI; no watermark; adult university scale; practical Vietnamese campus architecture
Avoid: secondary-school classroom, rows of small desks, child-size chairs, Japanese club room or lockers, police office, Victorian study, luxury furniture, rust, torn upholstery, deep black shadows, photorealism, fisheye distortion, excessive clutter
```

### A2. `bg-prototype-club-room` — nền sạch (đưa vào game)

Gắn ảnh: kết quả A1. Khung 16:9.

```text
[id: bg-prototype-club-room]
Edit this exact image. Remove only the folded letter and the white envelope on the near edge of the worktable completely, together with their contact shadow, and repaint the honey-brown laminate table surface behind them naturally, continuing the same material, grain, lighting and reflections. Keep every other pixel identical: same camera, perspective, framing, furniture positions, pen and folder, colors and lighting. Do not add any new object. No people, no text, no logo, no watermark.
```

### A3. `item-clb-letter` — lớp lá thư (sau đó chạy Remove Background)

Gắn ảnh: kết quả A1. Khung 16:9.

```text
[id: item-clb-letter]
Edit this exact image. Keep ONLY the folded cream letter and the white envelope on the table exactly as they are: same pixel position, same size, same perspective, same colors, same lighting and line art, including their soft contact shadow. Replace EVERYTHING else (room, table, chairs, walls, floor, windows) with one perfectly flat solid color #5E6B7D, no gradient, no texture, no shadow on the background. Do not move, resize, redraw or re-angle the letter or envelope. Same 16:9 canvas. No text, no logo, no watermark.
```

---

## B. Hành lang giảng đường B (`corridor-b`)

### B1. `bg-prototype-hallway-composite` — nền có hộp góp ý (bản gốc, không đưa vào game)

Gắn ảnh: `img_1` (phong cách). Khung 16:9.

```text
[id: bg-prototype-hallway-composite]
[type: image]

Use case: production-asset
Asset type: production-ready 2D visual-novel game background
Primary request: create an empty open-air corridor in a contemporary Vietnamese university teaching building, with a wall-mounted metal suggestion box that will be used as a story clue
Style reference: match the attached image's art style only (clean 2D visual novel rendering, crisp thin lines, restrained soft cel shading); do not include the person from the reference
Visual reference translated into text: a bright multi-level Vietnamese campus atrium and corridor system with white and cream concrete, bold but restrained orange soffit and beam accents, silver vertical-bar railings, large square columns, cool gray anti-slip tile, aluminum windows and doors, open cross-ventilation, tropical trees and a visible opposite building; simplify this language into a single believable teaching-floor corridor
Scene/backdrop: broad naturally ventilated corridor; waist-high metal railing; large square structural columns; wide lecture-room doors; linear lights fixed logically between beams; bulletin board with blank A4 shapes placed well away from the suggestion box; through the open side show red flamboyant branches, another faculty building, a covered motorbike-parking roof, and a small courtyard glimpse
Story object: a sturdy wall-mounted metal suggestion box painted muted institutional green, with a slot on top and a blank label plate, mounted at adult chest height on a plain cream wall section between two columns, slightly left of center. The tip of a torn paper bookmark (no text) sticks out of the edge of the slot, small but noticeable. Keep clean empty wall around the box on every side (no bulletin board or pipe touching it) so it can be cleanly separated later. Leave an open floor area to the right of the box where a building caretaker can stand
Composition/framing: 16:9 landscape, 2560x1440-ready, eye-level camera at 1.65 meters, medium-wide perspective with mild depth, suggestion box clearly recognizable within the central 70 percent safe area and above the lower 35 percent dialogue zone, clean center and lower foreground for two character sprites and dialogue UI, no extreme vanishing point
Lighting/mood: soft overcast morning after light rain, gentle reflections on tile, calm investigative mood, airy rather than gloomy
Color/materials: cream-white concrete, cool gray tile, faded institutional green, restrained orange architectural accent, muted red flamboyant blossoms, soft sky blue, matte painted metal
Constraints: no people or silhouettes; no fan anywhere in the corridor; no readable text or room numbers; no logos; no UI; no watermark; blank label plate on the suggestion box; adult Vietnamese university scale
Avoid: high-school corridor, Japanese or American lockers, cherry blossoms, hospital corridor, floating fixtures, horror lighting, dramatic storm, excessive wetness, photorealism, fisheye distortion
```

### B2. `bg-prototype-hallway-composite-with-bac-tu` — thêm Bác Tư vào cảnh (bản gốc)

Gắn ảnh: kết quả B1 (ảnh thứ nhất) + chân dung Bác Tư `img_6` (ảnh thứ hai). Khung 16:9.

```text
[id: bg-prototype-hallway-composite-with-bac-tu]
Edit the first attached image. Add the caretaker from the second attached image standing in the open floor area to the right of the suggestion box: full body from head to shoes, small in the scene at believable adult scale for the camera distance, holding a mop, pausing to look toward the viewer with a kindly expression. Preserve his exact face, gray hair, light-blue uniform shirt and navy tie. Match the scene's perspective, lighting and art style, with a soft contact shadow on the tile. Keep clear space between him and the suggestion box so they do not overlap. Change nothing else in the image. No text, no logo, no watermark.
```

### B3. `bg-prototype-hallway` — nền sạch (đưa vào game)

Gắn ảnh: kết quả B2. Khung 16:9.

```text
[id: bg-prototype-hallway]
Edit this exact image. Remove only the green suggestion box with its bookmark, and the caretaker with his mop, completely, together with their contact shadows. Repaint the plain cream wall behind the box and the gray tile floor behind the caretaker naturally, continuing the same material, joints, reflections and lighting. Keep every other pixel identical: same camera, perspective, framing, columns, railing, doors, lights, colors and lighting. Do not add any new object. No people, no text, no logo, no watermark.
```

### B4. `item-hallway-suggestion-box` — lớp hộp góp ý (sau đó chạy Remove Background)

Gắn ảnh: kết quả B2. Khung 16:9.

```text
[id: item-hallway-suggestion-box]
Edit this exact image. Keep ONLY the green wall-mounted suggestion box, including the torn bookmark tip in its slot and the box's soft shadow on the wall, exactly as it is: same pixel position, same size, same perspective, same colors, same lighting and line art. Replace EVERYTHING else (caretaker, walls, columns, floor, railing, sky, trees) with one perfectly flat solid color #E2E6EA, no gradient, no texture, no shadow on the background. Do not move, resize, redraw or re-angle the box. Same 16:9 canvas. No text, no logo, no watermark.
```

### B5. `char-bac-tu-scene-hallway` — lớp Bác Tư trong cảnh (sau đó chạy Remove Background)

Gắn ảnh: kết quả B2. Khung 16:9.

```text
[id: char-bac-tu-scene-hallway]
Edit this exact image. Keep ONLY the caretaker with his mop exactly as he is, including his soft contact shadow on the floor: same pixel position, same size, same pose, same colors, same lighting and line art. Replace EVERYTHING else (suggestion box, walls, columns, floor, railing, sky, trees) with one perfectly flat solid color #E2E6EA, no gradient, no texture, no shadow on the background. Do not move, resize, redraw or re-pose him. Same 16:9 canvas. No text, no logo, no watermark.
```

---

## C. Phòng giải trình (`debrief-room`)

### C1. `bg-prototype-hearing-room`

Gắn ảnh: `img_1` (phong cách). Khung 16:9.

```text
[id: bg-prototype-hearing-room]
[type: image]

Use case: production-asset
Asset type: production-ready 2D visual-novel game background
Primary request: create an empty formal student-affairs hearing room at a Vietnamese university for a serious non-criminal evidence review between student groups and a faculty moderator
Style reference: match the attached image's art style only (clean 2D visual novel rendering, crisp thin lines, restrained soft cel shading); do not include the person from the reference
Visual reference translated into text: practical Vietnamese university meeting rooms with cream-white walls, cool white grid lighting, broad windows with blinds, dark wood-laminate conference surfaces, rows of intact black adult office chairs, projector and presentation equipment, low storage, and restrained institutional formality; borrow only the clear room logic of a mock-court training room, never its judge bench, rail, crest, emblem, or courtroom symbolism
Scene/backdrop: medium-sized administration meeting room renovated within the last decade; full-size wood-laminate tables arranged so two student groups can face each other; modern adult meeting chairs; one modest desk position for a faculty moderator at the far center; vertical blinds; ceiling fixtures aligned to the room grid; ceiling-mounted projector aimed at a large blank presentation screen that fills about 80 percent of the image width and 60 percent of its height, its top edge about 10 percent below the top of the image; low office cabinet with organized folders
Composition/framing: 16:9 landscape, 2560x1440-ready, centered eye-level establishing shot at 1.65 meters, balanced near-symmetry with slight three-quarter depth, moderator position at far center, clean standing zones at left and right middle foreground, blank screen clearly visible, lower area safe for dialogue UI
Lighting/mood: cool neutral fluorescent light softened by daylight through blinds; orderly, tense and serious, but humane and safe
Color/materials: cool blue-gray, pale cream, desaturated navy, medium walnut laminate, muted black chair upholstery, neutral metal accents
Constraints: no people or silhouettes; no judge bench, witness cage, gavel, rail, crest, flag or national emblem; no readable text; no logos; no UI; no watermark; presentation screen blank; believable Vietnamese university administration room
Avoid: courtroom, police interrogation room, corporate luxury boardroom, school classroom, rows of small desks, teacher podium, oppressive darkness, witness spotlight, futuristic screens, photorealism, fisheye distortion
```

---

## D. Phòng ký túc xá (tuỳ chọn, cho đoạn mở đầu của GDD)

Gắn ảnh: `img_1` (phong cách). Khung 16:9.

```text
[id: bg-dorm-room]
[type: image]

Use case: production-asset
Asset type: production-ready 2D visual-novel game background
Primary request: an empty shared dormitory room for two first-year students at a contemporary Vietnamese university, on the first evening of the semester
Style reference: match the attached image's art style only (clean 2D visual novel rendering, crisp thin lines, restrained soft cel shading, slightly desaturated background); do not include the person from the reference
Scene/backdrop: two single metal-frame beds on opposite walls, one freshly made and one with half-unpacked luggage and a rolled mattress; two simple study desks with desk lamps; a narrow wardrobe; a window with an aluminium frame showing a dusk campus and street lights; a small fan correctly mounted on the wall; a clothes line with a towel; plain cream walls
Composition/framing: 16:9 landscape, eye-level at 1.65 meters, three-quarter view, clean center and lower foreground for two character sprites and a dialogue box
Lighting/mood: warm lamp light mixed with blue dusk from the window, friendly, a fresh start
Constraints: no people or silhouettes; no readable text; no logos; no UI; no watermark; adult university scale
Avoid: luxury apartment, hotel room, high-school dorm, bunk-bed barracks, clutter, horror lighting, photorealism, fisheye
```

---

## E. Cảnh giới thiệu nhân vật (16:9, ảnh đầy khung)

Mỗi khối gắn **2 ảnh theo đúng thứ tự**: ảnh thứ nhất `img_1` (phong cách), ảnh thứ hai là chân dung
nhân vật (ghi ở dòng "Gắn ảnh").

### E1. `intro-minh-anh`

Gắn ảnh: `img_1` + `img_1` (Minh Anh vừa là phong cách vừa là nhân vật).

```text
[id: intro-minh-anh]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Nguyen Minh Anh, 21, detective club president, in the student detective club room
Identity: the attached image is the exact character. Preserve the same face, high ponytail, red polo shirt with white collar, black trousers, colors and proportions exactly, and use its art style
Pose/action: standing beside the worktable, one hand resting on a closed case folder, determined look toward the empty side of the frame
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the LEFT third of the frame, facing slightly toward the right; the right 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the folder is inside the frame; horizon at eye level
Background: the club room with a seminar worktable, cork board with blank papers and a window with red flamboyant foliage, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: warm late-afternoon window light, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, dramatic fisheye, cluttered background, changed outfit, different face
```

### E2. `intro-ha-vy`

Gắn ảnh: `img_1` + `img_2` (Hà Vy).

```text
[id: intro-ha-vy]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Le Ha Vy, 20, applied-mathematics student and the club's data analyst, in the corner of the student detective club room
Identity: the SECOND attached image is the exact character. Preserve the same face, glasses, hairstyle, green cardigan, outfit, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: holding a thin notebook open with blank chart sketches, pushing her glasses up with one finger, confident small smile
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the RIGHT third of the frame, facing slightly toward the left; the left 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the notebook is inside the frame; horizon at eye level
Background: the club room corner with a low open bookcase of folders and a potted tropical plant, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: warm daylight with a cool fill, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no numbers, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, dramatic fisheye, cluttered background, changed outfit, different face
```

### E3. `intro-quan`

Gắn ảnh: `img_1` + `img_3` (Quân).

```text
[id: intro-quan]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Dang Hoang Quan, 21, economic statistics student and head of the student union's audit board, in a formal student-affairs hearing room
Identity: the SECOND attached image is the exact character. Preserve the same face, neat hairstyle, navy blazer, light shirt, outfit, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: standing straight behind a long table, one hand squaring a stack of neatly aligned folders, cool composed gaze toward the viewer
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the RIGHT third of the frame, facing slightly toward the left; the left 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the folders is inside the frame; horizon at eye level
Background: a formal university hearing room with wood-laminate tables, black meeting chairs, vertical blinds and a blank projector screen, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: cool neutral fluorescent light, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people, no courtroom symbols
Avoid: photorealism, 3D, chibi, villain smirk, dramatic fisheye, cluttered background, changed outfit, different face
```

### E4. `intro-hoai`

Gắn ảnh: `img_1` + `img_4` (Hoài).

```text
[id: intro-hoai]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Le Thi Hoai, 18, first-year student and a reluctant witness, in the open-air corridor of lecture building B
Identity: the SECOND attached image is the exact character. Preserve the same face, hairstyle, beige knitted vest, white blouse, tote bag, outfit, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: clutching her tote bag strap with both hands, glancing sideways, shy and uneasy, standing near a green wall-mounted suggestion box
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the LEFT third of the frame, facing slightly toward the right; the right 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the bag is inside the frame; horizon at eye level
Background: a naturally ventilated university corridor with cream concrete, large square columns, metal railing, gray tile and red flamboyant branches outside, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: soft overcast morning light, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, crying, dramatic fisheye, cluttered background, changed outfit, different face
```

### E5. `intro-bac-tu`

Gắn ảnh: `img_1` + `img_6` (Bác Tư).

```text
[id: intro-bac-tu]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Bac Tu, 55, the building caretaker, in the open-air corridor of lecture building B
Identity: the SECOND attached image is the exact character. Preserve the same face, gray hair, light-blue uniform shirt with epaulettes, navy tie, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: leaning on a mop handle, a ring of keys hanging on his belt, warm kindly smile toward the viewer
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the LEFT third of the frame, facing slightly toward the right; the right 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the mop is inside the frame; horizon at eye level
Background: a naturally ventilated university corridor with freshly mopped gleaming gray tile, cream concrete columns and a green wall-mounted suggestion box, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: soft overcast morning light, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, police uniform, dramatic fisheye, cluttered background, changed outfit, different face
```

### E6. `intro-tung`

Gắn ảnh: `img_1` + ảnh "Trần Tùng v2 (đủ tay)".

```text
[id: intro-tung]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Tran Tung, 18, tourism student and the player's cheerful roommate, in a shared university dormitory room at dusk
Identity: the SECOND attached image is the exact character. Preserve the same face, messy hair, orange open shirt over a white T-shirt, lanyard, dark trousers, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: thumbs-up with one hand, a folded campus map brochure in the other, big friendly grin
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the LEFT third of the frame, facing slightly toward the right; the right 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the brochure is inside the frame; horizon at eye level
Background: a shared dormitory room with two single metal beds, half-unpacked luggage, study desks with lamps and a window showing the campus at dusk, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: warm lamp light plus blue dusk from the window, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, dramatic fisheye, cluttered background, changed outfit, different face
```

### E7. `intro-thay-khai`

Gắn ảnh: `img_1` + ảnh Thầy Khải bản laptop ("Image 12" trên canvas).

```text
[id: intro-thay-khai]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Do Khai, 38, information systems lecturer and the detective club's adviser, in a small faculty computer lab
Identity: the SECOND attached image is the exact character. Preserve the same face, thin black half-rim glasses, slightly wavy pushed-back hair, light stubble, blue-gray open shirt with rolled sleeves over a charcoal T-shirt, lanyard, brown leather wristwatch, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: holding a closed slim silver laptop (no logo) under one arm, other hand in his trouser pocket, knowing half-smile with one eyebrow slightly raised
Composition/framing: 16:9 landscape, character shown from head to knees, placed on the RIGHT third of the frame, facing slightly toward the left; the left 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; the whole figure including both hands and the laptop is inside the frame; horizon at eye level
Background: a small university computer lab with rows of desktop monitors showing only soft abstract glow, softly blurred, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: cool monitor glow with a warm rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no code on screens, no name, no logo, no UI, no watermark, no speech bubbles, no other people
Avoid: photorealism, 3D, chibi, mad scientist, lab coat, dramatic fisheye, cluttered background, changed outfit, different face
```

### E8. `intro-thay-quang`

Gắn ảnh: `img_1` + `img_8` (Thầy Quang).

```text
[id: intro-thay-quang]
Use case: production-asset
Asset type: full-frame 2D visual-novel character introduction illustration (key visual)
Primary request: a character introduction splash of Trinh Quang, 52, university vice rector who chairs the student-affairs hearings, in a formal hearing room
Identity: the SECOND attached image is the exact character. Preserve the same face, gray-streaked hair, charcoal suit, white shirt, burgundy tie, colors and proportions exactly. The FIRST attached image is the art-style reference only
Pose/action: seated upright at the head of a long table, hands folded on a closed dark document file, stern but fair gaze toward the viewer
Composition/framing: 16:9 landscape, character shown from head to waist while seated, placed on the RIGHT third of the frame, facing slightly toward the left; the left 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; both hands and the file are inside the frame; horizon at eye level
Background: the hearing room seen from the moderator's end, wood-laminate tables, black meeting chairs, vertical blinds and a blank projector screen behind him, contemporary Vietnamese university, simplified and slightly desaturated so the character stands out
Lighting/mood: cool neutral light with a slight top light, gentle rim light separating the character from the background
Style: clean modern 2D visual novel illustration matching the first reference: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering
Constraints: no readable text, no name, no logo, no UI, no watermark, no speech bubbles, no other people, no judge bench, gavel, crest or flag
Avoid: photorealism, 3D, chibi, angry caricature, courtroom, dramatic fisheye, cluttered background, changed outfit, different face
```

---

## F. Tài liệu phóng to (4:3, không chữ)

Gắn ảnh: `img_1` (phong cách). Khung 4:3.

### F1. `doc-letter`

```text
[id: doc-letter]
Use case: production-asset
Asset type: 2D visual-novel document close-up background, 4:3 landscape
Primary request: a top-down view of one unfolded cream A4 letter paper lying flat on a honey-brown laminate table, with its plain white envelope tucked partly under the lower-right corner
Details: two soft fold creases across the paper, slightly warm off-white paper tone, a faint coffee-ring mark near one corner, the central 70 percent of the paper completely clean and empty for overlaid UI text
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; gentle warm light from the upper left
Constraints: absolutely no writing, no letters, no numbers, no signature, no logo, no watermark
```

### F2. `doc-bookmark`

```text
[id: doc-bookmark]
Use case: production-asset
Asset type: 2D visual-novel document close-up background, 4:3 landscape
Primary request: a close-up of half of a torn paper bookmark lying on a matte cream surface: a long narrow card with a rough torn edge at the bottom, a small punched hole with a short faded red ribbon at the top, and a simple abstract printed band in muted newsprint gray and phoenix red that suggests a student newspaper club without any readable letters
Composition: the bookmark lies diagonally across the center, large and clear; the upper-middle area of the bookmark and the surrounding surface stay plain for overlaid UI text
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; soft overcast light
Constraints: no readable text, no letters, no numbers, no logo, no watermark
```

### F3. `doc-handover-log`

```text
[id: doc-handover-log]
Use case: production-asset
Asset type: 2D visual-novel document close-up background, 4:3 landscape
Primary request: a top-down view of an open hardbound office logbook with ruled pages lying on a gray metal desk, a thin red seal sticker across the top edge of the right page, and a ballpoint pen resting at the gutter
Details: pale ruled lines only, empty table grid with 5 columns faintly drawn, slightly yellowed paper, a navy cloth cover visible at the edges
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; cool neutral office light
Constraints: every line and cell must be empty; no handwriting, no letters, no numbers, no stamp text, no logo, no watermark
```

---

## G. Biểu tượng manh mối cho Hồ sơ (tuỳ chọn, 1:1; sau đó chạy Remove Background)

Gắn ảnh: `img_1` (phong cách). Khung 1:1.

### G1. `icon-clue-signature-h`

```text
[id: icon-clue-signature-h]
Use case: production-asset
Asset type: small inventory icon for a 2D visual novel evidence notebook, 1:1 square
Primary request: a plain white envelope with a single elegant abstract ink flourish on the flap (a decorative stroke, not a letter)
Composition: single object, centered, three-quarter top view, filling about 70 percent of the square, generous empty margin
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; slightly bolder outline than backgrounds so it reads at 96 px
Background: perfectly flat solid #5E6B7D, no gradient, no shadow on the background
Constraints: no readable text, no letters, no logo, no watermark
```

### G2. `icon-clue-box-building-b`

```text
[id: icon-clue-box-building-b]
Use case: production-asset
Asset type: small inventory icon for a 2D visual novel evidence notebook, 1:1 square
Primary request: a small muted-green wall-mounted metal suggestion box with a slot on top and a blank label plate
Composition: single object, centered, three-quarter view, filling about 70 percent of the square, generous empty margin
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; slightly bolder outline than backgrounds so it reads at 96 px
Background: perfectly flat solid #E2E6EA, no gradient, no shadow on the background
Constraints: no readable text, no letters, no logo, no watermark
```

### G3. `icon-clue-bookmark-baochi`

```text
[id: icon-clue-bookmark-baochi]
Use case: production-asset
Asset type: small inventory icon for a 2D visual novel evidence notebook, 1:1 square
Primary request: half of a torn paper bookmark with a rough torn edge, a short faded red ribbon through a punched hole, and an abstract printed band in newsprint gray and phoenix red
Composition: single object, centered, lying diagonally, filling about 70 percent of the square, generous empty margin
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; slightly bolder outline than backgrounds so it reads at 96 px
Background: perfectly flat solid #5E6B7D, no gradient, no shadow on the background
Constraints: no readable text, no letters, no logo, no watermark
```

### G4. `icon-clue-handover-log`

```text
[id: icon-clue-handover-log]
Use case: production-asset
Asset type: small inventory icon for a 2D visual novel evidence notebook, 1:1 square
Primary request: a closed navy hardbound office logbook with a thin red seal sticker across its edge
Composition: single object, centered, three-quarter top view, filling about 70 percent of the square, generous empty margin
Style: match the attached reference's art style only (clean 2D visual novel rendering, soft cel shading); do not include the person from the reference; slightly bolder outline than backgrounds so it reads at 96 px
Background: perfectly flat solid #E2E6EA, no gradient, no shadow on the background
Constraints: no readable text, no letters, no logo, no watermark
```
