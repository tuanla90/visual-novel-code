# Bộ prompt tạo cảnh nền prototype — CLB Thám Tử Dữ Liệu (v0.1)

> Phạm vi: ba cảnh nền của [`prototype-scope-down-v0.1.md`](../../docs/prototype/prototype-scope-down-v0.1.md), cộng một ảnh neo phong cách để giữ hình ảnh nhất quán.
>
> Định dạng mỗi job tuân theo mẫu `[id]`, `[type]`, `[ref]` như ví dụ cung cấp. Phần mô tả bên trong dùng schema prompt tạo ảnh: use case, asset type, scene, style, composition, lighting và constraints.

---

## 1. Cách chạy

Chạy theo đúng thứ tự:

1. `hoa-phuong-environment-style-anchor`
2. `bg-prototype-club-room`
3. `bg-prototype-hallway`
4. `bg-prototype-hearing-room`

Ba cảnh nền đều tham chiếu ảnh đầu tiên bằng:

```text
[ref: hoa-phuong-environment-style-anchor]
```

Ảnh neo chỉ dùng làm tham chiếu phong cách, không đưa vào game. Ba ảnh `bg-*` là asset có thể đưa vào prototype.

### Quy ước chung

- Tỉ lệ khung: 16:9 ngang.
- Kích thước đích khi xuất asset: 2560×1440.
- Không có nhân vật hoặc bóng người; nhân vật sẽ được ghép bằng sprite.
- Không tạo chữ có thể đọc được, logo, watermark hoặc giao diện game trong ảnh nền.
- Giữ vùng giữa và khoảng 35% phía dưới đủ sạch để đặt sprite và hộp thoại.
- Vật thể kể chuyện quan trọng không đặt sát mép vì ảnh có thể bị crop trên màn hình hẹp.
- Phối cảnh và chiều cao camera thống nhất giữa các cảnh: tầm mắt sinh viên trưởng thành đang đứng, khoảng 1,60–1,70 m.
- Cảnh nền chi tiết hơn sprite nhưng nhạt, ít bão hòa và tương phản thấp hơn nhân vật.
- Mọi đồ nội thất phải có kích thước dành cho người lớn và mang ngôn ngữ đại học: bàn seminar, ghế phòng họp, bàn làm việc CLB; không dùng bàn ghế học sinh phổ thông.

---

## 2. Ảnh neo phong cách

```text
[id: hoa-phuong-environment-style-anchor]
[type: image]

Use case: stylized-concept
Asset type: visual style anchor for a Vietnamese university mystery visual novel
Primary request: create one polished environment style sheet that establishes the shared visual language for the University of Hoa Phuong game backgrounds
Scene/backdrop: a coherent three-part environment study showing a contemporary student club room, a naturally ventilated open-air Vietnamese university corridor, and a formal student-affairs hearing room; all three spaces must feel like locations in the same mid-sized Vietnamese multidisciplinary university built or renovated between 2015 and 2025
Subject: environment design only, focused on recognizable university-level architecture and adult student life; full-size seminar tables, durable modern adult chairs, tiled floors, practical LED or fluorescent fixtures, cork noticeboards with blank paper shapes, wide windows, office filing storage, projector and campus wayfinding shapes without readable text, subtle red-flamboyant-tree motifs outside
Style/medium: original clean school-life anime background illustration; crisp shapes; restrained cel-shaded lighting; hand-painted environmental detail; thin or nearly invisible outlines; not photorealistic; not chibi; do not imitate any existing game, anime, studio, or artist
Composition/framing: 16:9 landscape style sheet with three clearly separated environment panels; eye-level camera; believable room scale; uncluttered foregrounds suitable for visual-novel character sprites
Lighting/mood: club room warm and welcoming; corridor warm natural daylight; hearing room cool, orderly, and serious
Color palette: muted cream, warm wood, faded teal, pale concrete gray, restrained red-phoenix accents, cool blue-gray reserved for the hearing room
Materials/textures: maintained painted walls with minor everyday wear, matte ceramic tiles, laminated plywood and powder-coated steel furniture, modern office filing cabinets, paper noticeboards; clean, functional and lived-in, neither brand-new nor shabby
Constraints: no people; no readable text; no logos; no UI; no speech bubbles; no watermark; consistent perspective, rendering density, line treatment, and material language across all three panels
Avoid: secondary-school or high-school atmosphere; rows of small classroom desks; chalkboards; school bells; child-scale furniture; Japanese shoe lockers; tall locker banks; Japanese sliding metal cabinets; Japanese shrine or anime-school motifs; corridor fans; exposed fans placed without a structural mounting point; Western courtroom architecture; futuristic technology; luxury private-school interiors; shabby broken furniture; rust; peeling upholstery; dramatic fisheye lens; heavy gradients; hyper-saturated colors; cinematic blur; excessive clutter
```

### Điều kiện duyệt ảnh neo

- Nhìn ra bối cảnh đại học Việt Nam mà không cần chữ giải thích.
- Ba không gian có cùng nét vẽ và chất liệu.
- Cảnh không giống trường cấp 3, trường Nhật, tòa án phương Tây hoặc văn phòng công ty hiện đại.
- Bàn ghế có kích thước người lớn, còn sử dụng tốt; tủ là tủ hồ sơ văn phòng thấp hoặc tủ cánh mở, không phải dãy locker.
- Có đủ chi tiết đời sống nhưng vẫn phù hợp làm nền cho sprite anime.

Nếu ảnh neo chưa đạt các điều kiện này, chỉnh ảnh neo trước khi tạo ba cảnh còn lại.

---

## 3. Cảnh phòng CLB

```text
[id: bg-prototype-club-room]
[type: image]
[ref: hoa-phuong-environment-style-anchor]

Use case: stylized-concept
Asset type: production-ready 2D visual-novel game background
Primary request: an empty student detective club room at a fictional Vietnamese university, modest and slightly old but cared for, where the prototype opens and the anonymous letter is examined
Input images: referenced image is the visual-style anchor; match its palette, rendering density, material treatment, camera height, and original anime-background style without copying its exact layout
Scene/backdrop: a university student-organization room renovated within the last decade, with a correctly centered ceiling fan mounted to a visible ceiling beam, clean cream walls with only subtle everyday wear, matte ceramic tile floor, one full-size modular seminar table assembled from two matching tables, durable adult stackable chairs with molded backs and powder-coated metal legs, one waist-high modern office filing cabinet with hinged doors and document drawers, a low open bookcase with folders and notebooks, a cork principles board with blank pinned paper shapes, one compact lockable office storage cupboard, broad aluminum-frame windows; a hint of red flamboyant leaves outside the windows
Subject: the room itself; visual focus on the shared worktable and the corkboard, with subtle clues that this club combines old paper evidence and modern data work
Style/medium: original clean school-life anime environment illustration; restrained two-level cel-shaded light; thin or nearly invisible outlines; more environmental detail than character sprites; slightly desaturated background colors
Composition/framing: 16:9 landscape, 2560×1440-ready; eye-level camera around 1.6 meters; three-quarter view into the room; shared worktable in the middle distance; open center and lower foreground for two or three character sprites and a dialogue box; important props kept inside the central 70% safe area
Lighting/mood: warm late-afternoon light entering through the windows, gentle amber bounce on wood, welcoming but carrying a quiet sense of an old club at risk of disappearing
Color palette: warm cream, honey-brown wood, faded teal accents, muted paper beige, small restrained red-phoenix accents
Materials/textures: maintained laminate table surfaces, clean molded chair shells, powder-coated metal frames, matte office cabinetry, stacked paper, cork, ceramic tile; subtle use marks only, no rust, torn upholstery, broken edges, or neglected dust
Constraints: no people; no character silhouettes; no readable text; all papers must be blank or abstract marks; no logos; no UI; no evidence highlighted with glow; no watermark; preserve practical Vietnamese campus architecture
Avoid: secondary-school classroom; rows of school desks; child-size chairs; antique or shabby chairs; torn upholstery; rusted furniture; detective-noir office clichés; police station; Victorian study; Japanese club-room signage; Japanese lockers or sliding steel storage; tall locker banks; luxury furniture; extreme clutter; deep black shadows; photorealism; dramatic wide-angle distortion
```

### Kiểm tra đầu ra

- Có chỗ đặt Minh Anh và Hà Vy mà không che vật thể chính.
- Bảng nguyên tắc, tủ và bàn làm việc đều nhìn thấy nhưng không giành tiêu điểm.
- Ánh sáng ấm, phòng có lịch sử nhưng nội thất còn tốt và không biến thành phòng thám tử noir.
- Ghế là ghế người lớn hiện đại, đồng bộ vừa đủ; không cũ rách hoặc giống bàn ghế lớp cấp 3.
- Tủ là tủ hồ sơ văn phòng thấp, không phải locker kiểu Nhật.

---

## 4. Cảnh hành lang giảng đường

```text
[id: bg-prototype-hallway]
[type: image]
[ref: hoa-phuong-environment-style-anchor]

Use case: stylized-concept
Asset type: production-ready 2D visual-novel game background
Primary request: an empty open-air corridor in a fictional Vietnamese university teaching building, containing the suggestion box investigated in the prototype
Input images: referenced image is the visual-style anchor; match its palette, rendering density, material treatment, camera height, and original anime-background style
Scene/backdrop: a broad naturally ventilated corridor in a Vietnamese university faculty building, with pale cream concrete walls, waist-high open railing, large square structural columns, matte anti-slip tile floor, wide lecture-room doors, ceiling-mounted linear lights fixed logically between beams, emergency and campus-wayfinding plaque shapes without readable text, a simple bulletin board holding blank A4 paper shapes, and one sturdy metal suggestion box mounted at accessible height; through the open side, red flamboyant branches, a multi-storey faculty building, a covered motorbike-parking roof, and a small glimpse of the university courtyard are visible; no fan is installed in the corridor because cross-ventilation comes from the open side
Subject: the corridor and suggestion box; the box must be recognizable as an interactable story prop but remain naturally integrated into the environment
Style/medium: original clean school-life anime environment illustration; restrained cel-shading; thin or nearly invisible outlines; believable architectural detail; slightly desaturated to keep future character sprites prominent
Composition/framing: 16:9 landscape, 2560×1440-ready; eye-level camera around 1.6 meters; medium-wide corridor perspective with mild depth; suggestion box placed within the central 70% safe area, not against an edge; clean center and lower foreground for two character sprites and dialogue UI; avoid extreme vanishing-point perspective
Lighting/mood: soft overcast morning daylight after light rain, gentle reflections on the tile, calm investigative mood, not gloomy
Color palette: pale cream concrete, cool light gray tile, faded institutional green, muted red flamboyant blossoms, soft sky blue
Materials/textures: maintained concrete with light tropical-weather marks, matte painted metal, lightly damp anti-slip tile, paper noticeboard, functional contemporary campus fixtures
Constraints: no people; no silhouettes; no fan of any kind in the corridor; no readable room numbers or Vietnamese text; no logos; no UI; no watermark; the suggestion box has a blank label plate only; maintain Vietnamese tropical university cues and adult campus scale
Avoid: secondary-school corridor; narrow high-school classroom corridor; child-height railings; rows of identical classroom doors suggesting grade-school classes; Japanese shoe lockers; Japanese high-school architecture; cherry blossoms; American high-school lockers; ceiling fans or wall fans in the corridor; floating fixtures; exposed electrical devices without believable mounting; hospital corridor; futuristic campus; horror lighting; dramatic storm; excessive wetness; fisheye distortion; photorealism
```

### Kiểm tra đầu ra

- Hộp góp ý dễ nhận ra trong một giây nhưng không phát sáng hoặc trông như vật phẩm game.
- Kiến trúc có cảm giác nhiệt đới và thuộc một trường đại học Việt Nam.
- Có vùng trống để đặt nhân vật mà không che hộp góp ý.
- Không có quạt hành lang; đèn và thiết bị đều gắn vào dầm hoặc tường một cách hợp lý.
- Quy mô hành lang, cửa phòng học và tòa nhà phía xa phải tạo cảm giác campus đại học, không phải dãy lớp cấp 3.

---

## 5. Cảnh phòng giải trình

```text
[id: bg-prototype-hearing-room]
[type: image]
[ref: hoa-phuong-environment-style-anchor]

Use case: stylized-concept
Asset type: production-ready 2D visual-novel game background
Primary request: an empty formal student-affairs hearing room at a fictional Vietnamese university, used for a serious but non-criminal evidence review between a student club, a witness, and the student legal-review representative
Input images: referenced image is the visual-style anchor; match its rendering density, material treatment, camera height, and original anime-background style while shifting the lighting cooler and more formal
Scene/backdrop: a medium-sized university student-affairs meeting room renovated within the last decade, not a courtroom and not a school classroom; a full-size practical wood-laminate conference table arranged so two student groups can face each other, modern adult meeting chairs with intact molded or upholstered backs, one modest chair and desk position for the faculty moderator at the far center, pale walls, vertical blinds, ceiling fixtures aligned logically with the room grid, a ceiling-mounted projector aimed at a blank presentation screen, a wall clock without readable numbers, a low modern office cabinet with neatly stacked folders
Subject: the central confrontation space; room geometry should support visual-novel cuts between the club side, Quân's side, and the moderator without resembling a criminal trial
Style/medium: original clean school-life anime environment illustration; restrained cel-shaded lighting; thin or nearly invisible outlines; clean institutional detail; less saturated than character sprites
Composition/framing: 16:9 landscape, 2560×1440-ready; centered eye-level establishing shot around 1.6 meters; balanced near-symmetry with slight three-quarter depth; moderator position visible at the far center; leave clean standing zones in the left and right middle foreground for opposing character sprites; keep the central presentation screen visible; lower area must tolerate a dialogue box overlay
Lighting/mood: cool neutral fluorescent light with soft daylight through blinds; orderly, tense, and serious, but humane and safe; no menace
Color palette: cool blue-gray, pale cream, desaturated navy, medium walnut-brown, small neutral metal accents
Materials/textures: clean wood laminate, matte painted wall, powder-coated or brushed metal chair frames, intact muted fabric, fabric blinds, paper folders, maintained institutional furniture with minimal wear
Constraints: no people; no silhouettes; no judge bench; no witness cage; no gavel; no national emblems; no readable text; no logos; no UI; no watermark; presentation screen blank; believable Vietnamese university administration room
Avoid: secondary-school classroom; teacher's podium; rows of school desks; chalkboard; child-size furniture; shabby chairs; Japanese lockers or sliding steel storage; Western courtroom; police interrogation room; corporate boardroom luxury; television news studio; oppressive darkness; spotlight on a witness; futuristic screens; dramatic fisheye perspective; photorealism
```

### Kiểm tra đầu ra

- Người xem hiểu đây là phòng họp/giải trình của trường, không phải tòa án.
- Có hai vùng đặt sprite đối đầu ở trái và phải.
- Không khí lạnh và nghiêm hơn phòng CLB nhưng không đe dọa nhân chứng.
- Màn chiếu đủ rõ để sau này chồng UI truy vấn bằng code.

---

## 6. Prompt chỉnh sửa thường dùng

Các prompt dưới đây dùng sau khi đã có một ảnh gần đạt. Khi chạy, thay `[ref: ...]` bằng `id` của ảnh cần sửa.

### 6.1. Làm nền nhạt hơn để sprite nổi bật

```text
[id: <new-id>]
[type: image]
[ref: <source-image-id>]

Use case: precise-object-edit
Asset type: visual-novel game background refinement
Primary request: reduce only the background saturation and local contrast slightly so foreground anime character sprites will remain visually dominant
Constraints: preserve the exact room geometry, camera angle, composition, objects, lighting direction, materials, and crop; do not add or remove anything; no people; no text; no watermark
```

### 6.2. Tạo thêm vùng trống cho sprite

```text
[id: <new-id>]
[type: image]
[ref: <source-image-id>]

Use case: precise-object-edit
Asset type: visual-novel game background layout refinement
Primary request: simplify only the middle foreground by removing small clutter and creating clean standing space for two character sprites
Constraints: preserve the architecture, focal story prop, camera angle, perspective, lighting, palette, and all major furniture; do not redesign the scene; no people; no text; no watermark
```

### 6.3. Đổi ánh sáng nhưng giữ nguyên cảnh

```text
[id: <new-id>]
[type: image]
[ref: <source-image-id>]

Use case: lighting-weather
Asset type: visual-novel game background lighting variant
Primary request: change only the scene lighting to <warm late afternoon / cool overcast morning / neutral fluorescent interior>
Constraints: preserve exact geometry, framing, perspective, object placement, materials, and crop; do not add or remove props; no people; no text; no watermark
```

---

## 7. Ghi chú sản xuất

- Không yêu cầu model sinh bảng chữ tiếng Việt trong ảnh nền. Chữ, số phòng và nhãn hộp góp ý nên được chồng bằng UI hoặc chỉnh tay sau.
- Chọn một ảnh tốt nhất cho mỗi cảnh rồi dùng ảnh đó làm nguồn cho các lần chỉnh nhỏ; không tạo lại từ đầu khi chỉ cần đổi ánh sáng hoặc dọn vùng đặt sprite.
- Sau khi chọn ảnh cuối, kiểm tra ở cả khung 16:9 và crop dọc hẹp. Mọi vật thể quan trọng phải còn trong vùng trung tâm.
- Nếu hình nhân vật sau này có độ tương phản cao, giảm nhẹ saturation và contrast của nền bằng prompt chỉnh sửa 6.1 thay vì đổi toàn bộ phong cách.
- Không dùng tên họa sĩ, studio hoặc tên game cụ thể để mô tả phong cách. Bộ prompt đã mô tả trực tiếp các đặc điểm hình ảnh cần giữ.
