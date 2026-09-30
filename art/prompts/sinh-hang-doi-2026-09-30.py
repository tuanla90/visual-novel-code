"""Sinh hàng đợi ảnh MVP chương 1 đợt 30/09 (ảnh giới thiệu, biểu cảm, chibi, ảnh còn thiếu theo trang duyệt kịch bản).

Chạy: python art/prompts/sinh-hang-doi-2026-09-30.py → ghi mvp-vu1-hang-doi-2026-09-30.json cạnh tệp này.
Mỗi mục: id, khung (tỉ lệ Topview), ref (đường dẫn trong repo, tải từ GitHub main; "path|#màu" = làm phẳng lên nền màu đó), prompt.
Prompt mở đầu bằng "[id: …]" để tìm lại ảnh trên board theo câu lệnh.
"""
import json
from pathlib import Path

C = 'prototype/src/assets/characters/'
M = 'prototype/src/assets/mvp/nhan-vat/'
N = 'prototype/src/assets/mvp/nen/'
V = 'prototype/src/assets/mvp/vat/'
G = 'art/mvp-vu1/giay/'
I = 'prototype/src/assets/art/'
XAM = '|#D9DCE0'
HONG = '|#FF00FF'

NV = {
    'tung': C + 'char-tung-anchor.png',
    'ha-vy': C + 'char-ha-vy-anchor.png',
    'minh-anh': C + 'char-minh-anh-happy.png',  # neo 1536px nặng; ảnh happy cùng thân, 768px
    'quan': C + 'char-quan-anchor.png',
    'hoai': C + 'char-hoai-anchor.png',
    'bac-tu': C + 'char-bac-tu-neutral.png',
    'thay-khai': C + 'char-thay-khai-anchor.png',
    'thay-quang': C + 'char-thay-quang-anchor.png',
    'duy': M + 'char-duy.png',
    'chu-cuong': M + 'char-chu-cuong.png',
    'co-hanh': M + 'char-co-hanh.png',
    'co-lan': M + 'char-co-lan.png',
    'hieu': M + 'char-hieu.png',
    'nguoi-choi-nam': C + 'char-player-nam-anchor.png',
    'nguoi-choi-nu': C + 'char-player-nu-anchor.png',
}

STYLE_VN = ('clean modern 2D visual novel illustration: crisp delicate line art, smooth soft cel shading, '
            'controlled colors, polished facial rendering')

INTRO = (
    'Asset type: full-frame 2D visual-novel character introduction illustration (key visual). '
    'Identity: Image1 is the exact character. Preserve the same face, hairstyle, outfit, colors and proportions exactly. '
    'Image2 is a finished introduction splash from the same game: match its art style, rendering quality, lighting softness, '
    'depth of field and camera scale exactly, but do not copy its character or its room. '
    'Image3 is this game\'s background of the location: use it as the setting, simplified and slightly desaturated so the character stands out. '
    'Composition/framing: 16:9 landscape, character shown from head to knees, placed on the LEFT third of the frame, body turned slightly toward the right; '
    'the right 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; '
    'the whole figure including both hands and any held object is inside the frame; horizon at eye level. '
    'Style: ' + STYLE_VN + '. '
    'Constraints: no readable text, no numbers, no name, no logo, no UI, no watermark, no speech bubbles, no other people. '
    'Avoid: photorealism, 3D, chibi, dramatic fisheye, cluttered background, changed outfit, different face.'
)

EXPR = (
    'Edit Image1 only. Keep the same character with exactly the same pose, body, hands, hair, outfit, colors, line art, framing and canvas; '
    'change ONLY the face to the expression described. Background: one perfectly flat solid magenta (#FF00FF) filling the canvas, no gradient; '
    'soft even studio front light, no rim light, no glow, no halo around the hair; no magenta or pink on the character. '
    'No text, no watermark.'
)

CHIBI = (
    'Style: cute chibi (super-deformed) 2D game sticker, about 2.5 heads tall, big head and small body, large expressive eyes, '
    'clean even dark-brown outline, flat soft cel shading with one soft highlight, bright but controlled colors, '
    'polished and consistent like an official character sticker set. '
    'Every character keeps the face features, hairstyle, glasses, outfit and colors of their reference image, only simplified. '
    'Background: one perfectly flat solid magenta (#FF00FF) filling the whole canvas, no gradient, no floor, no cast shadow; '
    'no magenta or pink on the characters or props. '
    'Constraints: no text, no letters, no numbers, no logo, no watermark, no speech bubbles, no frame.'
)

BG = ('Original clean 2D visual-novel environment illustration of a contemporary Vietnamese university built or renovated between 2015 and 2025; '
      'adult scale; bright practical architecture; restrained cel shading; crisp shapes; subtle painted detail; thin or nearly invisible outlines; '
      'slightly desaturated background colors; no imitation of a named artist, studio, anime or game. Production-ready 2D visual-novel game background, '
      '16:9 landscape, eye-level camera at 1.65 meters, three-quarter view, clean center and lower foreground left free for two or three character sprites '
      'and a dialogue box. Constraints: no people or silhouettes; no readable text or numbers; blank paper shapes only; no logos; no UI; no watermark. '
      'Avoid: secondary-school classroom, Japanese school interiors, lockers, cherry blossoms, photorealism, fisheye distortion, excessive clutter, deep black shadows.')

OBJ = ('Single isolated 2D visual-novel prop sprite for a point-and-click hotspot. Style: clean 2D visual-novel illustration matching the attached background '
       '(Image1), restrained cel shading, thin or nearly invisible outlines, slightly desaturated colors. Camera: eye-level 1.65 meter three-quarter perspective, '
       'same light direction as Image1. Background: one perfectly flat solid magenta (#FF00FF) background filling the whole canvas, no gradient, no texture, '
       'no vignette. Framing: the prop centered and filling about 75 percent of the frame, fully inside the canvas, nothing cropped. Constraints: no cast shadow, '
       'no contact shadow, no glow, no rim light, no outline stroke around the prop, no magenta or pink anywhere on the prop; no readable text (blank or abstract '
       'marks only); no logos; no watermark.')

DOC = ('Flat top-down 2D illustration of a single blank paper document for a visual-novel document viewer, filling most of a 3:4 portrait frame, clean '
       'restrained cel shading, soft even light, subtle paper texture; all text areas are blank or abstract light gray lines only, no readable text, no numbers, '
       'no logos; plain dark neutral gray (#2B2F36) background around the paper; no hands, no people, no watermark.')

CG = ('Asset type: full-frame 2D visual-novel event CG, 16:9 landscape. Identity: each attached character reference is the exact character; preserve faces, '
      'hairstyles, outfits and colors exactly. Style: ' + STYLE_VN + ', cinematic but calm composition, soft depth of field. '
      'Constraints: no readable text, no numbers, no logo, no UI, no watermark, no speech bubbles. Avoid: photorealism, 3D, chibi, fisheye, changed outfits.')

hang = []


def them(id_, khung, ref, prompt):
    hang.append({'id': id_, 'khung': khung, 'ref': ref, 'prompt': f'[id: {id_}] {prompt}'})


# ---------- 1. Ảnh giới thiệu (16:9) — nhân vật bên TRÁI, chữ bên phải (GioiThieuMvp mặc định) ----------
INTRO_NV = [
    ('duy', 'intro-tung.webp', 'bg-mvp-phong-clb.webp',
     'a character introduction splash of Nguyen Duc Duy, 19, second-year public administration student who keeps the detective club\'s keys, files and old computer, in the club room',
     'holding up a ring of keys in one hand and a thin hardbound asset ledger against his chest with the other, calm reliable half-smile',
     'warm late-afternoon window light, gentle rim light separating the character from the background'),
    ('chu-cuong', 'intro-tung.webp', 'bg-mvp-cong-ktx-dem.webp',
     'a character introduction splash of Uncle Cuong, about 50, the dormitory gate security guard, at the dormitory gate in the early evening',
     'standing relaxed by the guard booth, one hand holding a switched-off flashlight at his side, friendly knowing smile of someone who remembers every student',
     'early evening: warm light from the guard booth window plus blue dusk, gentle rim light'),
    ('bac-tu', 'intro-quan.webp', 'bg-mvp-sanh-toa-b.webp',
     'a character introduction splash of Uncle Thinh, about 58, the security guard of lecture building B, in the open lobby of building B',
     'standing upright with hands clasped in front, a ring of keys on his belt, reserved attentive gaze, faint polite smile',
     'soft cool morning light, gentle rim light'),
    ('co-hanh', 'intro-quan.webp', 'bg-mvp-phong-dao-tao.webp',
     'a character introduction splash of Ms. Hanh, about 35, the academic affairs officer who manages student data, in the academic affairs office',
     'holding a light-blue document folder closed against her arm, the other hand raised with two fingers as if saying "only two tables", polite but firm small smile',
     'bright neutral office light, gentle rim light'),
    ('co-lan', 'intro-quan.webp', 'bg-mvp-phong-ctsv.webp',
     'a character introduction splash of Ms. Lan, about 40, officer of the student affairs office, in the student affairs office',
     'holding a sealed kraft envelope with both hands in front of her, calm serious look, glasses',
     'bright neutral office light, gentle rim light'),
    ('thay-quang', 'intro-quan.webp', 'bg-mvp-phong-hop.webp',
     'a character introduction splash of Vice Rector Quang, 52, who chairs the student-affairs review meeting, in the formal meeting room',
     'standing at the head of a long table, one hand resting on a closed dark document file, stern but fair gaze toward the viewer',
     'cool neutral light with a slight top light, gentle rim light'),
    ('thay-khai', 'intro-tung.webp', 'bg-mvp-phong-may.webp',
     'a character introduction splash of Mr. Khai, 38, the lecturer who manages the computer lab and its print log, in the computer lab',
     'holding a closed slim silver laptop (no logo) under one arm, other hand in his trouser pocket, knowing half-smile with one eyebrow slightly raised',
     'cool monitor glow with a warm rim light'),
    ('hieu', 'intro-tung.webp', 'bg-mvp-cang-tin.webp',
     'a character introduction splash of Tran Minh Hieu, 18, blunt outspoken first-year journalism student, in the student canteen at noon',
     'holding a plastic cup of iced tea, other hand in his pocket, one eyebrow raised, frank unimpressed look toward the viewer',
     'bright noon light with ceiling fans, gentle rim light'),
]
NV['dat'] = M + 'char-dat.png'
INTRO_NV += [
    ('dat', 'intro-tung.webp', 'bg-mvp-sanh-toa-b.webp',
     'a character introduction splash of Pham Tien Dat, 18, the class monitor of journalism class BC24A, in the open lobby of lecture building B between classes',
     'holding a class attendance clipboard against his chest, other hand raised slightly as if recalling something, attentive honest look',
     'soft morning light, gentle rim light'),
    ('nguoi-choi-nam', 'intro-tung.webp', 'bg-mvp-phong-clb.webp',
     'a character introduction splash of the player character, 18, a first-year business student who just joined the student detective club, in the club room',
     'holding an open notebook and a pen, looking up from it with a curious determined half-smile',
     'warm late-afternoon window light, gentle rim light'),
    ('nguoi-choi-nu', 'intro-tung.webp', 'bg-mvp-phong-clb.webp',
     'a character introduction splash of the player character (female), 18, a first-year business student who just joined the student detective club, in the club room',
     'holding an open notebook and a pen, looking up from it with a curious determined half-smile',
     'warm late-afternoon window light, gentle rim light'),
]
for nv, style, nen, req, pose, light in INTRO_NV:
    them(f'intro-{nv}', '16:9', [NV[nv] + XAM, I + style, N + nen],
         f'Primary request: {req}. Pose/action: {pose}. Lighting/mood: {light}. ' + INTRO)

# ---------- 2. Biểu cảm (9:16, sửa từ ảnh neo, nền hồng tím) ----------
BIEU_CAM = [
    ('tung', 'happy', 'a big bright open-mouthed grin, eyes slightly squinted with joy, eyebrows raised'),
    ('tung', 'worried', 'worried and sheepish: eyebrows drawn together and up, an awkward crooked smile, a small sweat drop at the temple'),
    ('tung', 'surprised', 'surprised: eyes wide open, eyebrows high, mouth in a small open "o"'),
    ('tung', 'thinking', 'thinking hard: eyes looking up to one side, lips pressed, one eyebrow lowered'),
    ('hoai', 'nervous', 'nervous: eyes glancing sideways and down, eyebrows tilted up anxiously, lips pressed tight, a faint blush'),
    ('duy', 'smile', 'a warm friendly closed-mouth smile, relaxed eyes'),
    ('duy', 'serious', 'serious and focused: level eyebrows, steady gaze, mouth in a straight line'),
    ('hieu', 'annoyed', 'annoyed: one eyebrow lowered, eyes half-lidded, mouth in a flat frown'),
    ('hieu', 'surprised', 'caught off guard: eyes wide, eyebrows up, mouth slightly open'),
    ('chu-cuong', 'smile', 'a warm grandfatherly laugh, eyes creased with smile lines, mouth open in a chuckle'),
    ('co-lan', 'smile', 'a gentle approving smile, softened eyes'),
    ('co-hanh', 'smile', 'a polite pleased smile'),
    ('bac-tu', 'smile', 'a small kind smile under the mustache, eyes creased'),
    ('thay-quang', 'stern', 'stern: eyebrows lowered and drawn, firm closed mouth, piercing gaze'),
    ('thay-quang', 'smile', 'a rare approving smile, eyes softened'),
    ('minh-anh', 'serious', 'serious and determined: level eyebrows, firm mouth, confident steady gaze'),
]
for nv, bc, mo_ta in BIEU_CAM:
    them(f'char-{nv}-{bc}', '9:16', [NV[nv] + HONG], f'Expression: {mo_ta}. ' + EXPR)

# ---------- 3. Chibi từng nhân vật (1:1) — cho trang Nhân vật / Hồ sơ ----------
CHIBI_NV = [
    # Lượt 1 ("…one foot kicked up") ra tóc nâu, lệch bộ → lượt 2 ghi rõ tóc đen, đứng yên.
    ('tung', 'standing calmly like a character sticker set; hair: jet-black messy short hair exactly like Image1, NOT brown; '
             'one thumbs-up, holding a folded campus map in the other hand, big friendly grin, both feet on the ground'),
    ('ha-vy', 'pushing up her glasses with one finger, holding a small notebook, confident little smile'),
    ('minh-anh', 'hands on hips, holding a closed case folder under one arm, determined proud smile'),
    ('duy', 'holding up a ring of keys, a thin ledger under the arm, calm friendly smile'),
    ('quan', 'arms crossed holding a navy folder, cool composed face, slight smug smile'),
    ('hoai', 'clutching a tote bag strap with both hands, shy glance to the side, faint blush'),
    ('hieu', 'sipping iced tea through a straw, one hand in pocket, unimpressed look'),
    ('chu-cuong', 'waving hello with one hand, flashlight in the other, warm laugh'),
    ('bac-tu', 'standing straight, hands clasped, keys on belt, kind small smile'),
    ('co-hanh', 'holding a light-blue folder, raising two fingers, polite smile'),
    ('co-lan', 'holding a kraft envelope with both hands, calm look'),
    ('thay-khai', 'holding a slim laptop under the arm, pointing up with one finger like explaining'),
    ('thay-quang', 'standing tall with a document file, stern but fair face'),
    ('nguoi-choi-nam', 'holding an open notebook and a pen, curious determined smile'),
    ('nguoi-choi-nu', 'holding an open notebook and a pen, curious determined smile'),
]
for nv, pose in CHIBI_NV:
    them(f'chibi-{nv}', '1:1', [NV[nv] + XAM],
         f'Primary request: a chibi sticker of the character in Image1, full body, alone. Pose: {pose}. '
         'Framing: 1:1 square, full body centered, filling about 80 percent of the height, fully inside the canvas. ' + CHIBI)

# ---------- 4. Chibi cảnh gợi ý / hồ sơ (1:1, nhiều nhân vật) ----------
def refs(*ds):
    return [NV[d] + XAM for d in ds]


CHIBI_CANH = [
    ('chibi-goi-y-ha-vy-kinh-lup', ['ha-vy'],
     'Image1 is Ha Vy. Chibi Ha Vy leaning forward peering through a big magnifying glass, one eye enlarged through the lens, a small glowing light bulb above her head.'),
    ('chibi-goi-y-ha-vy-tinh', ['ha-vy'],
     'Image1 is Ha Vy. Chibi Ha Vy writing in a small notebook with a pencil, tapping the pencil on her chin, thoughtful, a few abstract doodle marks floating around (no numbers, no letters).'),
    ('chibi-goi-y-tung-ca', ['tung'],
     'Image1 is Tung. Chibi Tung grinning confidently, index finger raised as if saying "I bet...", other hand on his hip, a sparkle next to his head.'),
    ('chibi-goi-y-tung-bi', ['tung'],
     'Image1 is Tung. Chibi Tung scratching the back of his head, sheepish crooked smile, a big sweat drop and a swirl above his head.'),
    ('chibi-goi-y-minh-anh-chi', ['minh-anh'],
     'Image1 is Minh Anh. Chibi Minh Anh pointing at an open case folder she holds, serious encouraging face, like a teacher giving a hint.'),
    ('chibi-goi-y-duy-chia-khoa', ['duy'],
     'Image1 is Duy. Chibi Duy holding up a key toward the viewer with a helpful smile, a ledger under his arm.'),
    ('chibi-0-dong', ['tung', 'nguoi-choi-nam'],
     'Image1 is Tung, Image2 is the player. Both chibi sitting side by side staring at an open laptop whose screen is completely blank, both with dot eyes, sweat drops and question marks above their heads, comedic.'),
    ('chibi-ra-ket-qua', ['ha-vy', 'nguoi-choi-nam'],
     'Image1 is Ha Vy, Image2 is the player. Both chibi giving a joyful high-five next to an open laptop showing an abstract table of light rows (no text), sparkles and small stars around.'),
    ('chibi-bang-ghim', ['ha-vy', 'tung'],
     'Image1 is Ha Vy, Image2 is Tung. Chibi Ha Vy pinning a yellow sticky note on a small cork board connected by red string to other blank cards, chibi Tung holding the ball of red string and a push pin, both focused.'),
    ('chibi-so-lieu-day', ['nguoi-choi-nam', 'quan'],
     'Image1 is the player, Image2 is Quan. Chibi player pointing forward dramatically with a sheet of paper in the other hand, speed lines, blank papers flying; chibi Quan on the other side leaning back stunned with a sweat drop. Courtroom-game energy but no courtroom.'),
    ('chibi-clb-nhom', ['minh-anh', 'duy', 'ha-vy', 'tung', 'nguoi-choi-nam'],
     'Image1 is Minh Anh, Image2 is Duy, Image3 is Ha Vy, Image4 is Tung, Image5 is the player. A cheerful chibi group photo of the five members of the student detective club standing together: Minh Anh in the center holding a magnifying glass, Duy with keys, Ha Vy with a notebook, Tung with a thumbs-up, the player with a notebook. Arranged in two loose rows, all fully visible.'),
    ('chibi-clb-nhom-nu', ['minh-anh', 'duy', 'ha-vy', 'tung', 'nguoi-choi-nu'],
     'Image1 is Minh Anh, Image2 is Duy, Image3 is Ha Vy, Image4 is Tung, Image5 is the player (female). A cheerful chibi group photo of the five members of the student detective club standing together: Minh Anh in the center holding a magnifying glass, Duy with keys, Ha Vy with a notebook, Tung with a thumbs-up, the player with a notebook. Arranged in two loose rows, all fully visible.'),
    ('chibi-408-vali', ['tung', 'nguoi-choi-nam'],
     'Image1 is Tung, Image2 is the player. Chibi Tung and the player carrying one heavy blue suitcase together up a few stairs, Tung in front grinning, the player puffing, a rice cooker peeking out of the suitcase.'),
    ('chibi-la-thu', ['minh-anh', 'ha-vy', 'tung'],
     'Image1 is Minh Anh, Image2 is Ha Vy, Image3 is Tung. Chibi Minh Anh holding up an unfolded letter (blank paper, only one big handwritten-looking abstract flourish), chibi Ha Vy and Tung leaning in from both sides with wide curious eyes.'),
]
# Lượt 1 các cảnh có Tùng ra tóc nâu → lượt 2 thêm câu tóc đen.
TOC_TUNG = ' Tung has jet-black messy short hair exactly like his reference image, NOT brown.'
for id_, ds, mo_ta in CHIBI_CANH:
    them(id_, '1:1', refs(*ds),
         f'Primary request: {mo_ta}{TOC_TUNG if "tung" in ds else ""} Framing: 1:1 square, all characters and props fully inside the canvas, centered, generous margin. ' + CHIBI)

# ---------- 5. Ảnh còn thiếu theo trang duyệt kịch bản (tools/duyet-kich-ban/ghi-chu.json) ----------
them('bg-mvp-sanh-ktx', '16:9', [N + 'bg-mvp-phong-ktx.webp', N + 'bg-mvp-cong-ktx.webp'],
     'Image1 and Image2 are backgrounds from the same game: match their art style, palette and rendering exactly. ' + BG +
     ' Scene: the ground-floor lobby of the middle dormitory block: on the left a closed metal elevator door with a plain empty wall panel beside it at eye level; '
     'in the middle of the back wall a large EMPTY cork notice board with nothing pinned on it; on the right an open-air corridor leading out toward trees; '
     'gray terrazzo tile floor, a row of potted plants, a wall fan, a mailbox rack of small blank compartments. '
     'Empty spots: the wall panel beside the elevator, the whole notice board. Lighting: warm late-afternoon light from the corridor. '
     'Colors: pale mint and cream walls, gray tile, blue-gray metal.')
them('bg-mvp-phong-clb-dem', '16:9', [N + 'bg-mvp-phong-clb.webp'],
     'Edit Image1: turn it into the same room in the evening. Keep the exact same layout, camera, furniture and every object in place. '
     'Outside the windows it is dark blue night with a few distant lit windows; the ceiling fluorescent lights and one warm desk lamp are on; '
     'warm-cool indoor evening light, soft shadows. No people, no text, no watermark.')
them('bg-mvp-hoi-truong', '16:9', [N + 'bg-mvp-nha-van-hoa.webp', N + 'bg-mvp-phong-hop.webp'],
     'Image1 and Image2 are backgrounds from the same game: match their art style, palette and rendering exactly. ' + BG +
     ' Scene: a large university assembly hall prepared for the first-year civic orientation week: rows of red folding seats seen from the side aisle, '
     'a wide stage with a plain maroon backdrop and a blank white banner, a lectern, ceiling fans and tall side windows. '
     'Lighting: bright morning light through the side windows. No people.')
them('obj-hop-kien-nghi-trong', '1:1', [V + 'obj-hop-kien-nghi.webp' + HONG],
     'Edit Image1: remove the torn paper card sticking out of the slot so the slot is empty and clean. Keep the box exactly the same shape, color, angle, '
     'size and style. Keep the perfectly flat solid magenta (#FF00FF) background. No shadow, no text, no watermark.')
them('obj-gian-robotics', '4:3', [N + 'bg-mvp-nha-van-hoa.webp'],
     OBJ + ' Primary request: a busy club-fair booth for a robotics club: a table covered with a teal cloth, a small wheeled robot model and gear-shaped '
     'models on it, a blank standing banner, and four or five university students crowding around seen from behind (backs only, no faces).')
them('obj-ban-tham-tu', '4:3', [N + 'bg-mvp-nha-van-hoa.webp'],
     OBJ + ' Primary request: a quiet, empty club-fair table for a student detective club: a white tablecloth, a neat stack of blank sign-up forms, '
     'a brass magnifying glass, a closed laptop, a small cup of pens. No people.')
them('doc-chu-ky-h', '3:2', [],
     'A single handwritten signature in black ballpoint ink on plain white paper, written fast in cursive. The first letter is a clearly legible capital H: '
     'two slightly slanted vertical strokes and a long horizontal crossbar that extends past the left stroke. After the H, the rest of the name trails off '
     'into small illegible wavy humps, then one tall looping stroke that dips below the baseline, ending in a long flat horizontal tail to the right. '
     'No other letter is readable. No printed text, no lines on the paper, no background objects. High contrast, centered, landscape 3:2.')
them('doc-the-lich-cua-toi', '3:4', [G + 'doc-the-lich-rach.webp'],
     'Edit Image1: show the same printed schedule card but WHOLE and undamaged: no tear, both halves complete, a clean straight bottom edge, same paper, '
     'same printed band colors and layout, the handwritten-name boxes empty. Keep the same background. No readable text, no watermark.')
them('doc-so-chi-linh', '3:4', [],
     DOC + ' Primary request: an open page of an old squared-grid notebook with slightly yellowed paper, a faded moss-green cloth edge, a few small colored '
     'sticky tabs on the side, faint abstract handwriting-like gray scribble lines only.')
them('doc-bao-cao-yeu', '3:4', [],
     DOC + ' Primary request: a typed A4 report page with a blank header area, faint abstract gray text lines, and an abstract round red stamp near the '
     'bottom right (no readable letters in the stamp).')
them('doc-thong-bao-hop', '3:4', [],
     DOC + ' Primary request: a plain white A4 notice sheet with four strips of transparent tape at the corners, a blank bold title area and faint gray lines.')
them('doc-van-ban-thay-quang', '3:4', [],
     DOC + ' Primary request: a formal Vietnamese administrative letter on A4: a blank two-column header area, a centered blank title area, faint gray body lines, '
     'an abstract round red seal overlapping an abstract ink signature at the bottom right (no readable letters).')
them('cg-bong-huy-hieu', '16:9', [N + 'bg-mvp-cong-truong.webp'],
     'Image1 is a background from the same game: match its art style and palette. Event CG: late afternoon on the campus main path, a lone senior '
     'student seen from far behind walking away under the trees, a small gear-shaped pin badge catching the light on his backpack strap; face never shown. '
     'Long shadows, quiet mysterious mood. No text, no watermark.')

# ---------- 6. CG bìa và kết (16:9) ----------
them('cg-bia', '16:9', refs('minh-anh', 'ha-vy', 'tung', 'nguoi-choi-nam') + [N + 'bg-mvp-phong-clb.webp'],
     CG + ' Image1 is Minh Anh, Image2 is Ha Vy, Image3 is Tung, Image4 is the player, Image5 is the club room background. Title key art: the four of them '
     'in the club room at golden hour around a cork board of pinned blank cards connected by red string, Minh Anh holding an unfolded letter, Ha Vy '
     'pointing at a card, Tung leaning in, the player in front center looking at the viewer with quiet determination. Leave the top 25 percent calm for a '
     'title added later by the UI.')
them('cg-ket-that', '16:9', refs('minh-anh', 'duy', 'ha-vy', 'tung', 'nguoi-choi-nam') + [N + 'bg-mvp-phong-clb.webp'],
     CG + ' Image1 Minh Anh, Image2 Duy, Image3 Ha Vy, Image4 Tung, Image5 the player, Image6 the club room. True ending: sunset in the club room, the five '
     'members relaxed and smiling, Duy hanging the room key back on its hook, Tung raising a cup of iced tea, Ha Vy pinning one last card on the board, '
     'Minh Anh and the player shaking hands. Warm, relieved mood.')
them('cg-ket-thuong', '16:9', refs('minh-anh', 'ha-vy', 'tung', 'nguoi-choi-nam') + [N + 'bg-mvp-phong-hop.webp'],
     CG + ' Image1 Minh Anh, Image2 Ha Vy, Image3 Tung, Image4 the player, Image5 the meeting room. Normal ending: the four walking out of the formal meeting '
     'room into the corridor, relieved but thoughtful; Minh Anh looks back over her shoulder at the closing door, the player holds a folder. Cool light, '
     'bittersweet mood.')

out = Path(__file__).with_name('mvp-vu1-hang-doi-2026-09-30.json')
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(hang), 'mục →', out.name)
