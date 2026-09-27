# Prompt chân dung nhân vật đã dùng trên Topview (v0.2)

Nguyên văn prompt của các ảnh **đang dùng trong game** (`prototype/src/assets/characters/`), lấy từ board
"My First Board" và canvas "CLB Thám Tử Dữ Liệu — Nhân vật" ngày 2026-09-27. Thay cho bộ
`prompts-characters-prototype-flow-v0.1.md` ở phần phong cách (bản v0.1 dùng khung 3:4 và mô tả cũ).

Cài đặt chung: khung **9:16** (768×1360 ở 1K); nền phẳng #E2E6EA để game tự tách nền. Trừ Minh Anh,
mọi ảnh đều là **sửa ảnh (image edit)** với **ảnh Minh Anh làm tham chiếu phong cách**.

| Tệp trong game | Model | Khung | Độ phân giải | Chất lượng |
|---|---|---|---|---|
| `char-minh-anh-anchor` | GPT Image 2.5 Flare | 9:16 | 2K | medium |
| `char-ha-vy-anchor` | GPT Image 2 | 9:16 | 1K | medium |
| `char-quan-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-hoai-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-bac-tu-neutral` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-tung-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-thay-quang-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-player-nam-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-player-nu-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |
| `char-thay-khai-anchor` | GPT Image 2.5 Flare | 9:16 | 1K | medium |

---

### `char-minh-anh-anchor` — Nguyễn Minh Anh

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

### `char-ha-vy-anchor` — Lê Hà Vy

```text
Create a production-ready 2D visual novel character sprite of Lê Hà Vy, a 20-year-old Vietnamese female university student majoring in Applied Mathematics and serving as the analytical assistant of the Data Detective Club.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, vibrant but controlled colors, subtle soft gradients in the hair, gentle warm rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in overall rendering quality, line weight, facial detail, eye rendering, cel-shading softness, lighting, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy Minh Anh’s face, hairstyle, body, pose, expression, or red clothing.
CHARACTER IDENTITY:
Lê Hà Vy is a 20-year-old Vietnamese woman with a quiet, highly analytical personality. She should look intelligent, observant, reserved, and slightly skeptical—not cold or unfriendly. She has a slim adult university-student build and realistic young-adult proportions.
FACE:
Distinct Vietnamese facial identity, softly oval face, refined but natural features, a slightly narrower jaw than Minh Anh, thoughtful dark-brown almond-shaped eyes, subtly focused eyebrows, a small natural nose, and a restrained neutral mouth. Her beauty should feel intelligent and understated rather than glamorous or doll-like.
EYEWEAR:
Delicate thin silver-wire rectangular glasses with softly rounded corners. The glasses must be subtle and elegant, with clearly visible eyes and minimal lens reflection. Do not use thick black frames.
HAIR:
Straight shoulder-length black hair, smooth and well-kept, with soft wispy bangs lightly framing her forehead. The ends curve gently inward near the shoulders. Natural black hair with restrained cool highlights. Her hairstyle and silhouette must remain clearly different from Minh Anh’s long high ponytail.
OUTFIT:
A neat light jade-green cardigan worn over a cream-colored button-up shirt. The cardigan is simple, contemporary, and appropriate for a Vietnamese university student. Use jade green as her signature color. No school-uniform elements, logos, badges, readable text, jewelry, or decorative patterns.
PROP:
She holds a slim navy-blue data notebook vertically against her chest with one arm. The notebook is plain, without text or logos. Her other hand lightly touches the side of the notebook or subtly adjusts the lower edge of her glasses.
EXPRESSION:
Neutral anchor expression: attentive, observant, quietly analytical, and mildly skeptical. Her eyes should suggest that she has noticed an inconsistency in the data. Keep the emotion subtle and reusable for normal dialogue scenes.
POSE AND COMPOSITION:
Waist-up visual novel character sprite.
Portrait orientation, 3:4 aspect ratio.
Centered composition with a slight three-quarter body angle while the face remains clearly visible.
Relaxed shoulders and composed posture.
Both hands should be anatomically correct and visible where practical.
Leave comfortable negative space around the hair, shoulders, elbows, and notebook for clean background removal.
Do not crop the top of the hair, shoulders, hands, or notebook.
LIGHTING AND SEPARATION:
Soft, even studio front lighting.
Gentle warm rim light along the outer hair and shoulders.
Clean silhouette with a subtle dark charcoal-brown outer keyline around the full character, thin and controlled—not a thick black sticker outline.
The character must remain clearly separated from the background while preserving the delicate Korean webtoon / modern visual-novel finish.
BACKGROUND:
Plain solid neutral light gray background, #E2E6EA.
No environment, furniture, texture, gradient, shadow cast on the background, or decorative effects.
The background must be easy to remove for a transparent visual novel sprite.
CONSISTENCY REQUIREMENTS:
Production-ready character anchor image.
Clean, coherent anatomy.
Symmetrical glasses.
Correct hands and fingers.
Consistent eye direction.
Clear silhouette at mobile-screen size.
The design must support future expression variants while preserving exactly the same face, hair, glasses, outfit, notebook, proportions, camera angle, and lighting.
AVOID:
chibi proportions, childish appearance, high-school uniform, thick black glasses, exaggerated anime eyes, overly glamorous makeup, seductive pose, photorealism, 3D or CGI rendering, painterly brush texture, sketch lines, heavy black outline, sticker-like border, neon rim light, excessive shine, complex background, text, logo, watermark, extra fingers, malformed hands, asymmetric glasses, duplicated objects, cropped hair, cropped hands.
```

### `char-quan-anchor` — Đặng Hoàng Quân

```text
Create a production-ready 2D visual novel character sprite of Đặng Hoàng Quân, a 21-year-old Vietnamese male university student majoring in Economic Statistics. He is the head of the Student Association’s Legal Affairs and Inspection Committee and serves as the player’s intellectual data rival.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, vibrant but controlled colors, subtle soft gradients, gentle rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, facial detail, eye rendering, cel-shading softness, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy Minh Anh’s face, hair, body, clothing, pose, or expression.
CHARACTER IDENTITY:
Vietnamese male, 21 years old, tall and lean with realistic adult university-student proportions. Quân is intelligent, disciplined, formal, and highly composed. He genuinely believes in procedure and evidence; he is an intellectual rival, not a villain.
FACE:
Distinct Vietnamese male facial identity. Refined angular face, defined jawline without looking excessively muscular, straight natural nose, calm dark-brown almond-shaped eyes, controlled eyebrows, and a reserved neutral mouth. Attractive in an understated, professional way. His gaze should feel sharp, observant, and difficult to unsettle.
HAIR:
Short, neat black hair with a modern side part. Clean silhouette, controlled volume, and a few natural strands near the forehead. No messy hair, fantasy spikes, undercut exaggeration, or dyed highlights.
OUTFIT:
Immaculate dark navy-blue blazer over a crisp light-gray collared shirt. The top collar button is open, with no tie. Contemporary university institutional style—not a business executive, military officer, or high-school student. Navy blue and charcoal are his signature colors.
PROP:
Hold a thin dark-brown leather document folder under one arm. The folder is plain, with no text or logo. His other hand rests naturally near the folder or remains relaxed at his side.
EXPRESSION:
Neutral anchor expression: calm, formal, analytical, slightly aloof, and strictly objective. No obvious smile. His expression should suggest quiet confidence and the belief that his reasoning is correct.
POSE AND COMPOSITION:
Waist-up visual novel sprite.
Portrait orientation, 3:4 aspect ratio.
Centered, slight three-quarter body angle with the face clearly visible.
Squared shoulders, upright dignified posture, chin level.
Leave clean negative space around the head, shoulders, arms, and folder.
Do not crop the hair, shoulders, hands, or folder.
LIGHTING AND SEPARATION:
Soft neutral indoor front light with a subtle cool rim light.
Clean silhouette with a thin, controlled dark navy-charcoal outer keyline.
The outline must remain delicate—not a thick black sticker border.
Subtle soft shadowing suitable for placement over visual-novel backgrounds.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No environment, furniture, gradient, texture, or cast shadow.
Easy to remove for a transparent sprite.
CONSISTENCY REQUIREMENTS:
Production-ready anchor image for future expression variants.
Correct masculine anatomy and hands.
Clear silhouette at mobile-screen size.
Preserve this exact face, hairstyle, outfit, proportions, camera angle, and lighting in all future variants.
AVOID:
villainous appearance, evil smirk, aggressive pose, military uniform, police uniform, business executive styling, high-school uniform, fantasy hairstyle, muscular superhero body, beard, photorealism, 3D CGI, chibi proportions, exaggerated anime eyes, thick black outline, text, logo, watermark, malformed hands, extra fingers, cropped hair or props.
```

### `char-hoai-anchor` — Lê Thị Hoài

```text
Create a production-ready 2D visual novel character sprite of Lê Thị Hoài, an 18-year-old Vietnamese female first-year university student and a reluctant witness in the Data Detective Club investigation.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, vibrant but controlled colors, subtle soft gradients in the hair, gentle warm rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, facial detail, eye rendering, cel-shading softness, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy Minh Anh’s face, ponytail, body, clothing, pose, or expression.
CHARACTER IDENTITY:
Vietnamese female, 18 years old, with realistic first-year university-student proportions. Hoài is shy, polite, cautious, and visibly uncomfortable being questioned. She must look like a young adult—not a child or high-school student.
FACE:
Distinct Vietnamese facial identity. Soft rounded-oval face, gentle dark-brown almond-shaped eyes, naturally worried eyebrows, small natural nose, and restrained lips. Minimal makeup. Her appearance should feel sincere, modest, and approachable rather than glamorous.
HAIR:
Soft shoulder-length black hair gathered into a loose low side-knot behind one side of her neck. Several fine natural strands frame her cheeks. The hairstyle must have a recognizable silhouette and remain clearly different from Minh Anh and Hà Vy.
OUTFIT:
A modest pastel-beige sweater vest over a simple white short-sleeved collared shirt. Contemporary Vietnamese university clothing, neat but slightly ordinary. Beige and warm cream are her signature colors. No school-uniform ribbon, insignia, logo, jewelry, or decorative pattern.
PROP:
A natural off-white canvas tote bag hangs from one shoulder. Her fingers lightly clasp the tote strap near her chest, suggesting nervousness. The bag contains no text or logo.
EXPRESSION:
Nervous anchor expression: timid, hesitant, and politely anxious. Her eyes look slightly downward and to the side while remaining readable. Lips gently closed, eyebrows subtly troubled. Avoid melodrama or visible tears.
POSE AND COMPOSITION:
Waist-up visual novel sprite.
Portrait orientation, 3:4 aspect ratio.
Centered, slight three-quarter angle.
Shoulders subtly drawn inward, posture mildly guarded but anatomically natural.
Hands and tote strap should be clearly readable.
Leave negative space around the hair, shoulders, elbows, and bag.
Do not crop the hair, hands, or important parts of the tote strap.
LIGHTING AND SEPARATION:
Soft warm diffuse front light with a gentle warm rim light.
Thin, controlled dark brown-gray outer keyline around the silhouette.
No thick black sticker outline.
Soft shading that preserves her gentle appearance while separating her from the background.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No environment, gradient, texture, decorative effects, or cast shadow.
Easy to remove for a transparent visual-novel sprite.
CONSISTENCY REQUIREMENTS:
Production-ready anchor image for future emotional variants.
Correct hands and fingers gripping the tote strap.
Clear silhouette at mobile-screen size.
Preserve this exact face, side-knot hairstyle, clothes, tote bag, proportions, camera angle, and lighting in all future variants.
AVOID:
child appearance, middle-school or high-school styling, sailor uniform, chibi proportions, oversized anime eyes, glamorous makeup, seductive pose, flashy accessories, elaborate hairstyle, heavy crying, photorealism, 3D CGI, thick black outline, text, logo, watermark, malformed hands, extra fingers, missing side-knot, cropped hair or hands.
```

### `char-bac-tu-neutral` — Bác Tư

```text
Create a production-ready 2D visual novel character portrait of Bác Tư, a 55-year-old Vietnamese male university building security guard and a trusted familiar elder on campus.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic adapted for an older adult character, crisp delicate line art, smooth soft cel-shading, controlled natural colors, subtle skin and hair gradients, gentle warm rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, cel-shading softness, lighting, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy Minh Anh’s facial structure, youthfulness, hair, body, clothing, or expression.
CHARACTER IDENTITY:
Vietnamese male, approximately 55 years old, average practical build. Bác Tư is a kind, observant, dependable campus security guard who remembers students and notices small details. He should feel warm and trustworthy, not foolish or comic.
FACE:
Distinct mature Vietnamese male facial identity. Slightly broad weathered face, warm brown eyes, natural laugh lines, mild forehead lines, subtle nasolabial folds, and realistic signs of age. His features should communicate patience, life experience, and quiet attentiveness. Do not make him look elderly, frail, or heavily wrinkled.
HAIR:
Short practical black hair with visible natural gray at the temples and scattered gray strands. Neatly maintained, slightly receding but not bald.
OUTFIT:
Clean light sky-blue campus security uniform shirt with simple epaulettes and a plain dark navy necktie. No real-world police insignia, badge, readable name tag, logo, medals, radio equipment, weapon, armor, or tactical accessories. He must read clearly as a friendly university building guard—not police or military personnel.
EXPRESSION:
Neutral anchor expression with a small, genuine, helpful smile. Gentle direct gaze, relaxed eyebrows, and subtle warmth around the eyes. He looks like someone students trust when they need help.
POSE AND COMPOSITION:
Bust or upper-torso visual novel portrait.
Portrait orientation, 3:4 aspect ratio.
Centered, slight three-quarter body angle with the face directed toward the viewer.
Relaxed shoulders and natural posture.
Leave clean negative space around the head and shoulders.
Do not crop the top of the hair or chin.
LIGHTING AND SEPARATION:
Soft warm natural daylight from the front.
Gentle warm rim light around the hair and shoulders.
Thin, controlled dark blue-gray outer keyline.
No thick black sticker outline.
Soft cel shading with enough facial detail to show his age naturally.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No guard booth, school gate, environment, gradient, texture, or cast shadow.
Easy to remove for a transparent visual-novel sprite.
CONSISTENCY REQUIREMENTS:
Production-ready anchor portrait for future expression variants.
Age must read clearly as approximately 55.
Clear silhouette at mobile-screen size.
Preserve this exact face, gray hair pattern, uniform, proportions, camera angle, and lighting in all future variants.
AVOID:
police officer appearance, military uniform, SWAT gear, weapon, handcuffs, tactical vest, intimidating guard, angry expression, corrupt-villain appearance, comic old man, exaggerated wrinkles, frail elderly body, photorealism, 3D CGI, chibi proportions, thick black outline, text, real badge, logo, watermark, cropped head.
```

### `char-tung-anchor` — Trần Tùng (bản gốc, trước khi sửa khung)

```text
Create a production-ready 2D visual novel character sprite of Trần Tùng, an 18-year-old Vietnamese male first-year university student majoring in Tourism and Travel Management. He is the player’s roommate, first close friend, campus guide, and cheerful companion.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, vibrant but controlled colors, subtle soft gradients, gentle warm rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, facial detail, eye rendering, cel-shading softness, lighting, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy her face, hair, body, clothes, pose, or expression.
CHARACTER IDENTITY:
Vietnamese male, 18 years old, realistic young-adult university proportions, medium height, slim and energetic build. Tùng is sociable, curious, playful, confident around people, fond of games, and frequently makes enthusiastic guesses before checking the evidence. He must feel lovable and useful—not foolish or childish.
FACE:
Friendly Vietnamese male facial identity with a slightly rounded youthful face, lively dark-brown eyes, expressive eyebrows, a natural nose, and an easy crooked smile. His face should be highly expressive and suitable for comedy, surprise, embarrassment, and sincere friendship.
HAIR:
Short slightly tousled black hair with a loose side-swept fringe. Naturally energetic silhouette, but still neat enough for a university student. No fantasy spikes, undercut, dyed hair, or overly fashionable idol styling.
OUTFIT:
Warm burnt-orange lightweight overshirt, worn open over a simple cream T-shirt. Casual dark trousers are only partially visible. A simple university volunteer lanyard may hang around his neck, but it must contain no readable text or real logo. Orange is his signature color.
PROP:
A compact campus map or folded orientation leaflet held loosely in one hand. The leaflet has simple colored blocks only, with no readable text. His other hand gives a relaxed thumbs-up.
EXPRESSION:
Neutral anchor expression with a bright, friendly, slightly mischievous smile. His eyes suggest that he is about to say, “Tui cá là…” He should appear welcoming and energetic without becoming cartoonishly excited.
POSE AND COMPOSITION:
Waist-up visual novel sprite.
Portrait orientation, 3:4 aspect ratio.
Centered, slight three-quarter body angle.
Relaxed posture leaning forward very slightly.
One hand gives a natural thumbs-up while the other holds the folded campus map.
Leave clean negative space around the hair, shoulders, elbows, hands, and prop.
Do not crop the top of the hair, thumbs-up hand, or map.
LIGHTING AND SEPARATION:
Soft warm front light with a gentle golden rim light.
Thin, controlled dark warm-brown outer keyline.
No thick black sticker outline.
Clear silhouette at mobile-screen size.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No campus environment, room, furniture, gradient, texture, text, or cast shadow.
Easy to remove for a transparent sprite.
CONSISTENCY REQUIREMENTS:
Production-ready anchor for future poses and expressions.
Correct masculine anatomy and hands.
Keep the exact same face, hairstyle, orange outfit, proportions, camera angle, and lighting in all future variants.
AVOID:
child appearance, high-school uniform, class clown caricature, foolish expression, exaggerated open mouth, chibi proportions, muscular hero body, glamorous idol styling, fantasy hair, photorealism, 3D CGI, thick black outline, text, logo, watermark, malformed hands, extra fingers.
```

### `char-thay-quang-anchor` — Thầy Trịnh Quang

```text
Create a production-ready 2D visual novel character sprite of Thầy Trịnh Quang, a 52-year-old Vietnamese male university vice rector who presides over formal investigation hearings.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic adapted for a mature authority figure, crisp delicate line art, smooth soft cel-shading, controlled natural colors, subtle facial and hair gradients, restrained rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, cel-shading softness, lighting, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy her face, body, clothing, pose, or youthful appearance.
CHARACTER IDENTITY:
Vietnamese male, approximately 52 years old, average-to-tall height, composed adult build. Thầy Quang is strict, economical with words, highly observant, and fundamentally fair. His authority should come from stillness and intelligence rather than anger or physical intimidation.
FACE:
Distinct mature Vietnamese male identity. Long balanced face, defined but not exaggerated jaw, calm dark-brown eyes, controlled eyebrows, visible forehead lines, subtle lines around the eyes and mouth, and a serious neutral mouth. His age must be clearly visible while remaining dignified and healthy.
HAIR:
Short neatly combed black hair with substantial gray at both temples and scattered silver strands across the top. Slightly receding mature hairline. No dyed appearance, dramatic hairstyle, or excessive volume.
OUTFIT:
Formal charcoal-gray suit jacket over a muted white shirt with a dark burgundy tie. Elegant but restrained university-administration clothing. No logo, medal, badge, robe, judicial costume, luxury accessories, or readable text. Dark gray is his signature color.
PROP:
A thin dark document file rests naturally in one hand or under his arm. No readable text or logo. The anchor sprite should remain usable for both standing dialogue and hearing-room scenes.
EXPRESSION:
Neutral anchor expression: serious, observant, restrained, and fair. Direct gaze, level chin, relaxed mouth. He should appear to be listening carefully before making a judgment, not angry or disapproving by default.
POSE AND COMPOSITION:
Waist-up visual novel sprite.
Portrait orientation, 3:4 aspect ratio.
Centered with a slight three-quarter body angle.
Upright composed posture with relaxed but authoritative shoulders.
Minimal gesture.
Leave clean negative space around the head, shoulders, arms, and document file.
Do not crop the hair, shoulders, hands, or prop.
LIGHTING AND SEPARATION:
Soft neutral institutional front light with a restrained cool-gray rim light.
Thin dark charcoal outer keyline.
No thick black sticker outline.
Controlled shadows that strengthen his authority without creating villainous lighting.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No hearing room, desk, chair, environment, gradient, texture, or cast shadow.
Easy to remove for a transparent visual-novel sprite.
CONSISTENCY REQUIREMENTS:
His age must read clearly as early fifties.
Production-ready anchor for serious, sideways-glance, softened, and subtly satisfied expression variants.
Preserve the exact face, gray hair pattern, suit, proportions, camera angle, and lighting in all future variants.
AVOID:
young handsome executive, elderly frail man, villain, angry principal caricature, judge robe, politician imagery, military posture, police uniform, exaggerated wrinkles, beard, muscular body, photorealism, 3D CGI, chibi proportions, thick black outline, dramatic horror lighting, text, logo, watermark.
```

### `char-player-nam-anchor` — Người chơi — nam

```text
Create a production-ready 2D visual novel protagonist sprite of a Vietnamese male first-year university student, 18 years old. He is the customizable player character and a new member of the Data Detective Club.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, vibrant but controlled colors, subtle soft gradients, gentle warm rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, eye detail, cel-shading softness, lighting, and visual-novel presentation. Use the reference for ART STYLE ONLY. Create a completely distinct male protagonist identity.
CHARACTER IDENTITY:
Vietnamese male, 18 years old, realistic young-adult proportions, average height and build. He is curious, observant, approachable, and inexperienced with SQL, but clearly capable of learning. His personality should remain visually neutral enough for different player choices.
FACE:
Natural Vietnamese male facial identity with a balanced oval face, dark-brown almond-shaped eyes, straight natural eyebrows, a modest nose, and a restrained neutral mouth. Attractive but not exceptionally glamorous. Avoid strongly aggressive, comic, arrogant, or romantic coding.
HAIR:
Simple short black hair with a clean natural side part and a few soft strands over the forehead. Distinct from Tùng and Quân. Easy silhouette for repeated costume layers.
BASE OUTFIT:
Simple plain off-white crew-neck T-shirt under a lightweight neutral-gray open jacket. No logo, writing, badge, jewelry, or decorative pattern. The design should allow the upper outfit to be replaced later by a department shirt, Detective Club shirt, or volunteer shirt.
EXPRESSION:
Neutral attentive expression with quiet curiosity. Slightly focused eyes and relaxed eyebrows, suitable for listening, investigating, learning, and responding to dialogue.
POSE AND COMPOSITION:
Waist-up visual novel sprite.
Portrait orientation, 3:4 aspect ratio.
Centered, mostly front-facing with a subtle three-quarter angle.
Natural relaxed shoulders and arms.
Hands resting neutrally near the lower frame without props.
Leave clean negative space around the body for costume replacement.
Do not crop the hair, shoulders, elbows, or visible hands.
LIGHTING AND SEPARATION:
Soft neutral front light with a subtle warm rim light.
Thin dark charcoal-brown outer keyline.
No thick black sticker outline.
Clean silhouette designed for costume layering.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No environment, furniture, texture, gradient, shadow, text, or logo.
Easy to remove for a transparent sprite.
PRODUCTION REQUIREMENTS:
Keep the torso shape and arm position simple for modular costume replacement.
No overlapping prop across the shirt or jacket.
The character must remain readable at mobile size.
Future expression variants must preserve the exact face, hairstyle, proportions, pose, camera angle, and lighting.
AVOID:
defined celebrity appearance, overly specific personality, arrogant smirk, heroic action pose, muscular body, child appearance, high-school uniform, fantasy outfit, chibi proportions, oversized anime eyes, photorealism, 3D CGI, thick black outline, text, logo, watermark, malformed anatomy.
```

### `char-player-nu-anchor` — Người chơi — nữ

```text
Create a production-ready 2D visual novel protagonist sprite of a Vietnamese female first-year university student, 18 years old. She is the customizable player character and a new member of the Data Detective Club.
STYLE:
Modern Clean Visual Novel — Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, vibrant but controlled colors, subtle soft gradients, gentle warm rim light, polished Korean webtoon-inspired facial rendering.
Match the attached Nguyễn Minh Anh reference image in rendering quality, line weight, eye detail, cel-shading softness, lighting, and visual-novel presentation. Use the reference for ART STYLE ONLY. Do not copy Minh Anh’s face, ponytail, body, outfit, pose, or expression.
CHARACTER IDENTITY:
Vietnamese female, 18 years old, realistic young-adult proportions, average height and build. She is curious, observant, approachable, and new to SQL. Her visual personality should remain adaptable to different player choices.
FACE:
Natural Vietnamese female facial identity with a balanced oval face, dark-brown almond-shaped eyes, straight softly defined eyebrows, a natural nose, and a restrained neutral mouth. Pleasant and approachable without looking glamorous, seductive, timid, or overly cute.
HAIR:
Straight black hair cut slightly below the chin in a practical soft bob, with a natural off-center part and light face-framing strands. No ponytail, glasses, side-knot, elaborate curls, hair ornaments, or dyed highlights. The silhouette must remain distinct from Minh Anh, Hà Vy, and Hoài.
BASE OUTFIT:
Simple plain cream blouse under a lightweight neutral-gray casual jacket. No logo, writing, jewelry, badge, ribbon, or decorative pattern. The torso and sleeves should support later replacement by department, Detective Club, and volunteer outfits.
EXPRESSION:
Neutral attentive expression with quiet curiosity and subtle determination. Suitable for investigation, learning, listening, and dialogue choices.
POSE AND COMPOSITION:
Waist-up visual novel sprite.
Portrait orientation, 3:4 aspect ratio.
Centered, mostly front-facing with a subtle three-quarter angle.
Natural relaxed shoulders.
Hands remain neutral near the lower frame without holding props.
Leave negative space around the torso and arms for modular costume replacement.
Do not crop the hair, shoulders, elbows, or visible hands.
LIGHTING AND SEPARATION:
Soft neutral front light with a subtle warm rim light.
Thin dark charcoal-brown outer keyline.
No thick black sticker outline.
Clean silhouette designed for modular costume layers.
BACKGROUND:
Plain solid neutral light gray, #E2E6EA.
No environment, furniture, gradient, texture, cast shadow, text, or logo.
Easy to remove for a transparent sprite.
PRODUCTION REQUIREMENTS:
Keep the base pose and torso construction compatible with the male protagonist sprite.
Clear silhouette at mobile-screen size.
Future variants must preserve the exact face, bob hairstyle, proportions, pose, camera angle, and lighting.
AVOID:
copying Minh Anh’s face, long ponytail, glamorous makeup, seductive pose, child appearance, high-school uniform, princess styling, overly cute expression, chibi proportions, oversized anime eyes, photorealism, 3D CGI, thick black outline, text, logo, watermark, malformed anatomy.
```

### `char-thay-khai-anchor` — Thầy Đỗ Khải

Tạo qua hai bước: tạo mới (v2), rồi **sửa ảnh** v2 thành bản đang dùng trong game (v3). Cài đặt:
GPT Image 2.5 Flare · 9:16 · 1K · Medium · Unlimited. Ảnh tham chiếu ở bước 1: Minh Anh; ở bước 2:
chính ảnh v2.

Bước 1 — tạo mới (v2):

```text
[Ref — Minh Anh] is the ART STYLE reference only. Create a production-ready 2D visual novel character sprite of Thầy Đỗ Khải, a 38-year-old Vietnamese male Information Systems lecturer and faculty adviser to the Data Detective Club. STYLE: Modern Clean Visual Novel, Kyoto Animation aesthetic, crisp delicate line art, smooth soft cel-shading, controlled colors, gentle warm rim light, polished webtoon-inspired facial rendering. Match the reference in rendering quality, line weight, cel-shading softness and lighting, but create a completely distinct mature male identity. IDENTITY: intelligent, witty, approachable, slightly unconventional lecturer who answers with a question; trusted teacher, not a comedy character. SIGNATURE RECOGNITION MARKERS (must be clearly visible, these make him instantly distinguishable from the other young male characters): 1) thin black half-rim rectangular glasses resting slightly low on his nose; 2) slightly wavy, loosely pushed-back medium-short black hair with a soft side part and a few loose strands, NOT a neat student haircut; 3) light natural stubble shadow along the jaw and chin; 4) a capped marker tucked behind his right ear; 5) a brown leather-strap analog wristwatch. FACE: longer lean face with defined cheekbones, thoughtful dark-brown eyes, expressive slightly raised eyebrow, knowing half-smile; clearly late-30s with fine lines at the eye corners and faint nasolabial folds, noticeably older than a university student but younger than a 52-year-old vice rector. OUTFIT: muted blue-gray button-up shirt with sleeves rolled to the elbows, worn open over a plain charcoal T-shirt, dark trousers, simple lanyard with no readable text. PROPS: one hand loosely holds a piece of white chalk, the other holds a closed dark tablet against his side. EXPRESSION: attentive, mildly amused, intellectually curious. POSE: waist-up visual novel sprite, portrait, centered, relaxed three-quarter angle, one shoulder slightly lower; clean negative space around head, shoulders, elbows and props, elbows away from the image edges; do not crop hair, hands or props. LIGHTING: soft neutral front light, gentle warm rim light, thin dark blue-gray keyline, no thick black outline. BACKGROUND: plain solid flat light gray #E2E6EA, no gradient, texture, text or shadow. AVOID: college-student look, idol face, clean-shaven boyish face, neat short student haircut, elderly professor, lab coat, formal suit, arrogant smirk, photorealism, 3D, chibi, text, logo, watermark.
```

Bước 2 — sửa ảnh v2 (bỏ phấn và bút, cầm laptop, lùi khung cho đủ tay):

```text
[Thầy Đỗ Khải v2] Edit this exact image. Keep the same character identity, face, glasses, hair, stubble, expression, outfit colors, lanyard, wristwatch, art style, line weight, lighting and flat light gray background #E2E6EA. Change only these things: 1) Remove the marker tucked behind his ear completely; restore natural hair and ear there. 2) Remove the white chalk from his hand. 3) Replace the dark tablet with a closed slim silver aluminium laptop (MacBook-like, no visible logo, no text), held naturally under one arm against his side with that hand supporting it; the other hand relaxed, resting lightly on the laptop edge or at his side. 4) Reframe: zoom out slightly so his whole upper body from head to upper thighs fits inside the frame, BOTH arms, elbows, hands and the full laptop completely visible, nothing cropped at the left or right edges, with clear empty gray margin on both sides and above the hair. Keep portrait 9:16 composition, same camera angle and scale of face relative to body. No new objects, no text, no logo, no watermark.
```

### Sửa khung cho đủ tay — `char-tung-anchor` (bản đang dùng)

Sửa ảnh Tùng gốc (gắn ảnh Tùng làm đầu vào). Cùng prompt này dùng được cho nhân vật khác bị cắt tay:
đổi phần mô tả đồ vật/cử chỉ cho khớp.

```text
[Trần Tùng] Edit this exact image. Keep the same character identity, face, hair, expression, pose, thumbs-up gesture, orange shirt, white T-shirt, lanyard, brochure, colors, art style, line weight, lighting and flat light gray background #E2E6EA. Change only the framing: zoom out slightly so his whole upper body from head to upper thighs fits inside the frame, with BOTH arms, elbows and hands (including the thumbs-up hand and the hand holding the brochure) and the full brochure completely visible, nothing cropped at the left or right edges, and clear empty gray margin on both sides and above the hair. Keep portrait 9:16 composition and the same camera angle. No new objects, no text, no logo, no watermark.
```
