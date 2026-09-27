# Google Flow prototype characters — prompt specification (v0.1)

Tài liệu prompt tạo nhân vật cho bản prototype **CLB Thám Tử Dữ Liệu** (Vũ trụ Hoa Phượng), tuân thủ định danh [QĐ-033](file:///d:/Users/tuanla2/game/learn-code-by-game/lich-su-quyet-dinh.md#L166-L178) và phong cách hội họa của dự án.

Shared art direction: original clean 2D anime visual-novel character sprite illustration; half-body / waist-up framing for visual novel dialog; clean crisp line art; restrained two-level cel-shading; contemporary Vietnamese university students (aged 18–21); adult proportions; simple solid neutral background (#E8ECEF or pure light gray) easy for sprite extraction; no logos; no readable text; no watermark; no imitation of named commercial studios or artists.

---

## 1. Danh sách Asset nhân vật (Manifest)

Thứ tự chạy tạo ảnh:
1. `char-minh-anh-anchor` — Nguyễn Minh Anh (Chủ nhiệm CLB, năm 3 Luật kinh tế) — Ảnh neo phong cách & biểu cảm Trung tính (`neutral`)
2. `char-minh-anh-worried` — Minh Anh biểu cảm Lo lắng (`worried`)
3. `char-minh-anh-happy` — Minh Anh biểu cảm Vui vẻ / Thở phào (`happy`)
4. `char-ha-vy-anchor` — Lê Hà Vy (Năm 2 Toán ứng dụng, trợ thủ) — Ảnh neo & biểu cảm Trung tính (`neutral`)
5. `char-ha-vy-thinking` — Hà Vy biểu cảm Suy ngẫm / Hoài nghi (`thinking`)
6. `char-ha-vy-smile` — Hà Vy biểu cảm Mỉm cười tự tin (`smile`)
7. `char-quan-anchor` — Đặng Hoàng Quân (Năm 3 Thống kê kinh tế, Trưởng ban Pháp chế) — Ảnh neo & biểu cảm Trung tính (`neutral`)
8. `char-quan-smug` — Quân biểu cảm Đắc ý / Tự tin (`smug`)
9. `char-quan-stunned` — Quân biểu cảm Bị bắt bài / Sững sờ (`stunned`)
10. `char-hoai-anchor` — Lê Thị Hoài (Năm nhất QT24B, nhân chứng) — Ảnh neo & biểu cảm Rụt rè (`nervous`)
11. `char-hoai-downcast` — Hoài biểu cảm Cúi đầu / Áy náy (`downcast`)
12. `char-hoai-relieved` — Hoài biểu cảm Thở phào nhẹ nhõm (`relieved`)
13. `char-bac-tu-neutral` — Bác Tư (Bảo vệ giảng đường) — Chân dung nhỏ, hiền hậu (`neutral`)

---

## 2. Prompts chi tiết

```text
[id: char-minh-anh-anchor]
[type: image]

Use case: production-asset
Asset type: 2D anime visual-novel character sprite, waist-up portrait
Primary request: create a 2D visual novel character sprite of Nguyen Minh Anh, a 21-year-old female Vietnamese university law student and detective club president
Character description: Vietnamese female student, 21 years old, neat high ponytail of natural straight black hair, determined brown eyes, mature and responsible demeanor; wearing a crisp tailored polo shirt in deep phoenix red (#C93B2B) with a neat white collar and small dark gray details, looking like an organized student leader
Expression: neutral, composed, attentive, ready to lead an investigation, calm slight smile
Pose/framing: 3:4 portrait aspect ratio (1536x2048), waist-up framing, centered, slight three-quarter body turn facing the viewer, hands resting naturally at waist level
Style/medium: clean modern 2D visual-novel sprite, crisp line art, restrained cel shading, subtle soft gradients in hair, vibrant character colors against a plain solid neutral light gray (#E2E6EA) backdrop
Lighting: soft even studio front-light, clean rim-light separating character from background
Constraints: no background environment, solid light gray background only; no text, no logos, no speech bubbles, no watermark, adult college proportion
Avoid: secondary-school uniform, sailor collar, oversized anime eyes, child proportions, heavy gothic elements, complex background props, photorealism
```

```text
[id: char-minh-anh-worried]
[type: image]
[ref: char-minh-anh-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify only the facial expression and slight posture of Nguyen Minh Anh from [ref: char-minh-anh-anchor] to show worry and stress over the club being shut down
Character: exact same character as [ref: char-minh-anh-anchor], same red polo shirt, same ponytail, identical face shape and hair
Expression: worried, furrowed brows, slightly parted lips with tense hesitation, eyes showing pressure and concern
Pose/framing: waist-up portrait, identical framing and camera distance as [ref: char-minh-anh-anchor], head tilted very slightly with shoulders slightly raised in subtle tension
Constraints: exact same clothing and character identity as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: comical sweat drops, crying tears, screaming expression, altered outfit, different hair length
```

```text
[id: char-minh-anh-happy]
[type: image]
[ref: char-minh-anh-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify only the facial expression of Nguyen Minh Anh from [ref: char-minh-anh-anchor] to show genuine relief and warm pride
Character: exact same character as [ref: char-minh-anh-anchor], same red polo shirt, same ponytail, identical face shape and hair
Expression: happy, warm gentle smile, relaxed eyebrows, bright confident eyes showing relief after evidence is cleared
Pose/framing: waist-up portrait, identical framing and scale as [ref: char-minh-anh-anchor], upright and relaxed shoulders
Constraints: exact same outfit and character identity as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: exaggerated chibiness, altered clothes, open laughing mouth, altered hair style
```

```text
[id: char-ha-vy-anchor]
[type: image]

Use case: production-asset
Asset type: 2D anime visual-novel character sprite, waist-up portrait
Primary request: create a 2D visual novel character sprite of Le Ha Vy, a 20-year-old female Vietnamese university applied mathematics student and analytical assistant
Character description: Vietnamese female student, 20 years old, delicate thin silver-wire glasses, shoulder-length straight black hair with soft bangs, thoughtful inquisitive dark eyes; wearing a neat light jade-green / teal cardigan over a cream button-up shirt, holding a slim navy data notebook against her chest
Expression: neutral, observant, slightly analytical and skeptical, sharp intelligent gaze
Pose/framing: 3:4 portrait aspect ratio (1536x2048), waist-up framing, centered, slight three-quarter angle, one hand lightly adjusting or holding the edge of her notebook
Style/medium: clean modern 2D visual-novel sprite, crisp clean lines, restrained cel shading, rich jade-teal tones, solid plain neutral light gray background (#E2E6EA)
Lighting: soft diffuse front light with subtle cool rim light
Constraints: solid light gray background only; no environment; no readable text; no logos; no watermark; adult college proportion
Avoid: thick black hipster glasses, school uniform, chibi features, childish scale, messy hair, photorealism
```

```text
[id: char-ha-vy-thinking]
[type: image]
[ref: char-ha-vy-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify the facial expression and gesture of Le Ha Vy from [ref: char-ha-vy-anchor] to show deep analytical thinking and scrutinizing data logic
Character: exact same character as [ref: char-ha-vy-anchor], identical glasses, hair, cream shirt and jade-green cardigan
Expression: thinking, one eyebrow slightly raised in skepticism, lips pursed, looking intently as if inspecting a flawed SQL query
Pose/framing: waist-up portrait, identical scale and framing as [ref: char-ha-vy-anchor], one finger lightly touching the temple of her glasses in thought
Constraints: identical character and costume as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: goofy caricature, anime swirl glasses, altered clothes, removed glasses
```

```text
[id: char-ha-vy-smile]
[type: image]
[ref: char-ha-vy-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify the facial expression of Le Ha Vy from [ref: char-ha-vy-anchor] to show her iconic "Có số liệu đây!" triumphant and supportive smile
Character: exact same character as [ref: char-ha-vy-anchor], identical glasses, hair, cream shirt and jade-green cardigan
Expression: satisfied confident smile, eyes shining with clarity behind glasses, subtle triumph of proving facts through structured data
Pose/framing: waist-up portrait, identical scale and framing as [ref: char-ha-vy-anchor], posture confident and upright
Constraints: identical character and costume as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: altered clothes, missing glasses, goofy meme face, open laughing mouth
```

```text
[id: char-quan-anchor]
[type: image]

Use case: production-asset
Asset type: 2D anime visual-novel character sprite, waist-up portrait
Primary request: create a 2D visual novel character sprite of Dang Hoang Quan, a 21-year-old male Vietnamese university student council inspection chief and data rival
Character description: Vietnamese male student, 21 years old, neat short modern parted black hair, sharp calm eyes, tall lean build; wearing an immaculate dark navy-blue blazer over a crisp light gray shirt with an unbuttoned collar, sharp and professional institutional look, holding a thin leather document folder under his arm
Expression: neutral, aloof, highly composed, formal and strictly objective
Pose/framing: 3:4 portrait aspect ratio (1536x2048), waist-up framing, centered, dignified standing posture with squared shoulders
Style/medium: clean modern 2D visual-novel sprite, crisp clean linework, restrained cel shading, deep navy and charcoal palette, solid plain neutral light gray background (#E2E6EA)
Lighting: cool neutral indoor lighting, sharp clean silhouette
Constraints: solid light gray background only; no environment; no readable text; no logos; no watermark; adult college proportion
Avoid: cartoonish villain smirk, military uniform, high-school uniform, fantasy spikes, messy hair, photorealism
```

```text
[id: char-quan-smug]
[type: image]
[ref: char-quan-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify the facial expression of Dang Hoang Quan from [ref: char-quan-anchor] to show his composed, slightly smug confidence when presenting his 24-row OR query
Character: exact same character as [ref: char-quan-anchor], identical hair, navy blazer, and gray shirt
Expression: confident smug smirk, one eyebrow slightly raised, self-assured look believing his query proves the clues are useless
Pose/framing: waist-up portrait, identical scale and framing as [ref: char-quan-anchor], slight aristocratic tilt of the chin
Constraints: identical character and clothes as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: evil villain grimace, altered costume, exaggerated teeth, comic sweat
```

```text
[id: char-quan-stunned]
[type: image]
[ref: char-quan-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify the facial expression and posture of Dang Hoang Quan from [ref: char-quan-anchor] to show astonishment and defeat when his OR logic is exposed and corrected
Character: exact same character as [ref: char-quan-anchor], identical hair, navy blazer, and gray shirt
Expression: stunned, wide eyes, slight pupil contraction, slightly parted lips in disbelief, speechless upon seeing the 2-row result
Pose/framing: waist-up portrait, identical scale and framing as [ref: char-quan-anchor], subtle lean backward in surprise, folder held tighter
Constraints: identical character and clothes as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: anime eyes popping out, falling over comic fall, altered clothing, tears
```

```text
[id: char-hoai-anchor]
[type: image]

Use case: production-asset
Asset type: 2D anime visual-novel character sprite, waist-up portrait
Primary request: create a 2D visual novel character sprite of Le Thi Hoai, an 18-year-old female Vietnamese university first-year student and reluctant witness
Character description: Vietnamese female student, 18 years old, soft shoulder-length black hair tied in a loose low side-knot, gentle anxious dark eyes, timid and shy first-year appearance; wearing a modest pastel-beige student sweater vest over a simple white short-sleeved collared shirt
Expression: nervous, timid, hesitant, eyes looking slightly downward with polite anxiety
Pose/framing: 3:4 portrait aspect ratio (1536x2048), waist-up framing, centered, slightly hunched shoulders, fingers lightly clasping the strap of her canvas tote bag
Style/medium: clean modern 2D visual-novel sprite, delicate line art, gentle cel shading, warm beige and soft white palette, solid plain neutral light gray background (#E2E6EA)
Lighting: soft warm diffuse light, gentle and non-threatening
Constraints: solid light gray background only; no environment; no readable text; no logos; no watermark; first-year college student appearance
Avoid: high-school sailor uniform, child appearance, glamorous makeup, flashy accessories, photorealism
```

```text
[id: char-hoai-downcast]
[type: image]
[ref: char-hoai-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify the facial expression of Le Thi Hoai from [ref: char-hoai-anchor] to show guilt and remorse when admitting she dropped the envelope for someone else
Character: exact same character as [ref: char-hoai-anchor], identical low side-knot hair, beige vest, and white shirt
Expression: downcast, gaze averted downwards, troubled apologetic eyebrows, lips tight in regret, genuinely remorseful
Pose/framing: waist-up portrait, identical scale and framing as [ref: char-hoai-anchor], head lowered slightly
Constraints: identical character and clothing as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: altered clothes, heavy sobbing, cartoon tears, horror lighting
```

```text
[id: char-hoai-relieved]
[type: image]
[ref: char-hoai-anchor]

Use case: precise-object-edit
Asset type: 2D anime visual-novel character sprite, expression variant
Primary request: modify the facial expression of Le Thi Hoai from [ref: char-hoai-anchor] to show relief and gratitude after being treated with respect and clearing the misunderstanding
Character: exact same character as [ref: char-hoai-anchor], identical low side-knot hair, beige vest, and white shirt
Expression: relieved, small timid genuine smile, eyes softened with gratitude, weight lifted from her shoulders
Pose/framing: waist-up portrait, identical scale and framing as [ref: char-hoai-anchor], shoulders relaxed
Constraints: identical character and clothing as reference; solid plain neutral light gray background (#E2E6EA); no text; no watermark
Avoid: altered clothes, missing side knot, boisterous laughter
```

```text
[id: char-bac-tu-neutral]
[type: image]

Use case: production-asset
Asset type: 2D anime visual-novel character portrait, bust/headshot
Primary request: create a 2D visual novel character portrait of Bac Tu, a 55-year-old male Vietnamese university building security guard
Character description: Vietnamese male, 55 years old, short graying black hair, warm laugh lines around gentle brown eyes, weathered but kind Vietnamese face; wearing a clean light sky-blue security guard uniform shirt with epaulettes and a simple dark blue necktie, practical and reliable campus elder
Expression: neutral, warm, friendly, helpful smile of a trusted campus security guard who knows the students well
Pose/framing: 3:4 portrait aspect ratio (1536x2048), bust/head-and-shoulders framing, centered, gentle direct gaze
Style/medium: clean modern 2D visual-novel sprite, crisp clean linework, soft cel shading, light blue and warm skin tones, solid plain neutral light gray background (#E2E6EA)
Lighting: warm natural daylight
Constraints: solid light gray background only; no real badge or emblem, no readable text on uniform, no weapon, no police gear; friendly campus guard only
Avoid: police officer, SWAT gear, stern scary guard, high-tech security armor, photorealism
```
