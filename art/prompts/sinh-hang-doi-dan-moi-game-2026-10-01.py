"""Hàng đợi Topview (GPT Image 2.5 Flare, 1K, medium, Unlimited free) thay TOÀN BỘ ảnh trong game của dàn nhân vật mới (01/10/2026).

Ảnh neo đã chốt: xem `sinh-hang-doi-dan-moi-2026-10-01.py` và art/README.md. Từ sáu ảnh neo đó sinh lại mọi ảnh đang có trong game:
  A. chân dung: bản thường + biểu cảm ("chỉ đổi mặt") + dáng ("chỉ đổi tay"), nền hồng tím để tách nền;
  B. chibi từng người, chibi gợi ý, chibi nhóm;
  C. ảnh giới thiệu 16:9;
  D. CG bìa và kết.
Ảnh tham chiếu: "T:<id>" = ảnh ra của task Topview mang [id: <id>] (mã task trong topview-task-2026-10-01.json, hoặc ảnh sinh ngay trong
hàng đợi này); "G:<đường dẫn>|#màu" = tệp trên GitHub nhánh main, làm phẳng lên nền màu.
Mỗi mục: id (= "g2-" + tên tệp đích), khung, ref, mau (khuôn câu lệnh), rieng (phần riêng). Câu lệnh = MAU[mau] với "{}" thay bằng rieng.

Chạy: python art/prompts/sinh-hang-doi-dan-moi-game-2026-10-01.py [thư mục ghi tệp .js rút gọn]
→ ghi dan-moi-game-hang-doi-2026-10-01.json cạnh tệp này (câu lệnh đầy đủ).
"""
import json
import sys
from pathlib import Path

AN = {
    'tung': 'T:char-tung-v2-anchor-l5',
    'ha-vy': 'T:char-ha-vy-v2-anchor-l3',
    'minh-anh': 'T:char-minh-anh-v2-anchor',
    'duy': 'T:char-duy-v2-anchor-l3',
    'quan': 'T:char-quan-v2-anchor-l2',
    'nguoi-choi': 'T:char-nguoi-choi-v2-anchor',
}
N = 'G:prototype/src/assets/mvp/nen/'
KIEU_CHIBI = 'G:prototype/src/assets/mvp/chibi/chibi-thay-quang.webp|#FF00FF'
KIEU_INTRO = 'G:prototype/src/assets/art/intro-thay-quang.webp'

NEN = ('Background: replace the gray background with one perfectly flat solid magenta (#FF00FF) filling the whole canvas, no gradient, no floor, no shadow; '
       'soft even studio front light, no rim light, no glow, no halo around the hair; no magenta or pink anywhere on the character. No text, no watermark.')
STYLE_VN = 'clean modern 2D visual novel illustration: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering'

MAU = {
    # chân dung
    'neo': 'Edit Image1. Keep the character completely identical: same face, expression, pose, body, hands, hair, outfit, colors, line art, framing, figure scale and canvas. '
           'Change ONLY the background. {}' + NEN,
    'mat': 'Edit Image1. Keep the same character with exactly the same pose, body, hands, hair, outfit, colors, line art, framing, figure scale and canvas; '
           'change ONLY the face to the expression described. Expression: {}. ' + NEN,
    'dang': 'Edit Image1. Keep the same character: same face shape, same head angle, head size and head position, same hair, outfit, colors, line art, framing, figure scale and canvas. '
            'Change ONLY the arms and hands and the facial expression as described. {} ' + NEN,
    # chibi
    'chibi': 'Primary request: {} Image references: the character images are the exact characters (keep each one\'s face features, hairstyle, glasses, outfit and colors, only simplified); '
             'the LAST image is a finished sticker from the same set: match its chibi style, outline and shading exactly, but do not copy its character. '
             'Style: cute chibi (super-deformed) 2D game sticker, about 2.5 heads tall, big head and small body, large expressive eyes, clean even dark-brown outline, '
             'flat soft cel shading with one soft highlight, bright but controlled colors. '
             'Framing: 1:1 square, everything fully inside the canvas, centered, generous margin. '
             'Background: one perfectly flat solid magenta (#FF00FF) filling the whole canvas, no gradient, no floor, no cast shadow; no magenta or pink on the characters or props. '
             'Constraints: no text, no letters, no numbers, no logo, no watermark, no speech bubbles, no frame.',
    # ảnh giới thiệu
    'intro': 'Primary request: {} Asset type: full-frame 2D visual-novel character introduction illustration (key visual). '
             'Identity: Image1 is the exact character. Preserve the same face, hairstyle, outfit, colors and proportions exactly. '
             'Image2 is a finished introduction splash from the same game: match its art style, rendering quality, lighting softness, depth of field and camera scale exactly, '
             'but do not copy its character or its room. Image3 is this game\'s background of the location: use it as the setting, simplified and slightly desaturated so the character stands out. '
             'Composition/framing: 16:9 landscape, character shown from head to knees, placed on the LEFT third of the frame, body turned slightly toward the right; '
             'the right 40 percent of the frame is calm, low-detail background with soft depth of field, reserved for a name card added later by the UI; '
             'the whole figure including both hands is inside the frame; horizon at eye level. Style: ' + STYLE_VN + '. '
             'Constraints: no readable text, no numbers, no name, no logo, no UI, no watermark, no speech bubbles, no other people. '
             'Avoid: photorealism, 3D, chibi, dramatic fisheye, cluttered background, changed outfit, different face.',
    # CG
    'cg': 'Asset type: full-frame 2D visual-novel event CG, 16:9 landscape. Identity: each attached character reference is the exact character; preserve faces, hairstyles, outfits and colors exactly. '
          'Style: ' + STYLE_VN + ', cinematic but calm composition, soft depth of field. {} '
          'Constraints: no readable text, no numbers, no logo, no UI, no watermark, no speech bubbles. Avoid: photorealism, 3D, chibi, fisheye, changed outfits.',
}

hang = []


def them(ten, khung, ref, mau, rieng):
    hang.append({'id': 'g2-' + ten, 'khung': khung, 'ref': ref, 'mau': mau, 'rieng': rieng})


# ---------- A. Chân dung (9:16) ----------
CHAN_DUNG = [
    # (nhân vật, tên tệp đích, khuôn, phần riêng)
    ('tung', 'char-tung-anchor', 'neo', ''),
    ('tung', 'char-tung-happy', 'mat', 'a big bright open-mouthed laugh, eyes squinted shut with joy, eyebrows raised'),
    ('tung', 'char-tung-worried', 'mat', 'worried and sheepish: eyebrows drawn together and up, an awkward crooked closed smile, a small sweat drop at the temple'),
    ('tung', 'char-tung-surprised', 'mat', 'surprised: eyes wide open, eyebrows high, mouth in a small open "o"'),
    ('tung', 'char-tung-thinking', 'mat', 'thinking hard: eyes looking up to one side, lips pressed together, one eyebrow lowered'),
    ('tung', 'char-tung-gai-dau', 'dang', 'Pose: one hand scratching the back of his head with the elbow raised; the other hand lowers the folded map to his side. '
                                         'Expression: embarrassed sheepish smile, eyebrows tilted up, a small sweat drop at the temple.'),
    ('tung', 'char-tung-chi-tay', 'dang', 'Pose: one hand pointing its index finger forward toward the viewer at chest height, confident; the other hand holds the folded map down at his side. '
                                         'Expression: cocky playful grin, one eyebrow raised, as if making a bet.'),
    ('ha-vy', 'char-ha-vy-anchor', 'neo', ''),
    ('ha-vy', 'char-ha-vy-thinking', 'mat', 'thinking: eyes looking down to one side, lips slightly pursed, focused'),
    ('ha-vy', 'char-ha-vy-smile', 'mat', 'a small warm closed-mouth smile, eyes softened'),
    ('ha-vy', 'char-ha-vy-day-kinh', 'dang', 'Pose: one hand pushes her glasses up at the bridge with her fingertips while the other arm keeps hugging the cream notebook against her chest. '
                                            'Expression: sharp and calculating, a faint confident smile.'),
    ('minh-anh', 'char-minh-anh-anchor', 'neo', ''),
    ('minh-anh', 'char-minh-anh-worried', 'mat', 'worried: eyebrows drawn together and tilted up, lips pressed, eyes slightly lowered'),
    ('minh-anh', 'char-minh-anh-happy', 'mat', 'a bright genuine smile showing a little teeth, eyes slightly squinted'),
    ('minh-anh', 'char-minh-anh-serious', 'mat', 'serious and determined: level eyebrows, firm closed mouth, confident steady gaze'),
    ('minh-anh', 'char-minh-anh-khoanh-tay', 'dang', 'Pose: both arms crossed firmly over her chest, the small wristwatch still visible on her wrist. '
                                                    'Expression: stern, eyebrows lowered, mouth firm.'),
    ('duy', 'char-duy', 'neo', ''),
    ('duy', 'char-duy-smile', 'mat', 'a wide warm friendly smile showing a little teeth, relaxed happy eyes'),
    ('duy', 'char-duy-serious', 'mat', 'serious and focused: level eyebrows, steady gaze, mouth in a straight line'),
    ('quan', 'char-quan-anchor', 'neo', ''),
    ('quan', 'char-quan-smug', 'mat', 'smug: a one-sided smirk, chin slightly raised, eyes half-lidded and confident'),
    ('quan', 'char-quan-stunned', 'mat', 'stunned: eyes wide behind the glasses, eyebrows raised, mouth slightly open, a small sweat drop at the temple'),
    ('quan', 'char-quan-chi-man', 'dang', 'Pose: one arm raised, pointing with an open hand up and to the side toward a projector screen outside the frame; the other hand stays behind his back. '
                                         'Expression: cool and assured, a slight smirk.'),
    ('nguoi-choi', 'char-nguoi-choi', 'neo', ''),
]
for nv, ten, mau, rieng in CHAN_DUNG:
    them(ten, '9:16', [AN[nv]], mau, rieng)

# ---------- B. Chibi (1:1) ----------
CHIBI_NV = [
    ('tung', 'chibi-tung', 'a chibi sticker of the character in Image1, full body, alone. Pose: standing, one thumbs-up, a folded campus map in the other hand, big friendly grin, both feet on the ground. '
                           'He has a black undercut, a small bandage on his nose, a blue-and-white sports jersey.'),
    ('ha-vy', 'chibi-ha-vy', 'a chibi sticker of the character in Image1, full body, alone. Pose: pushing up her glasses with one finger, hugging a small cream notebook, confident little smile.'),
    ('minh-anh', 'chibi-minh-anh', 'a chibi sticker of the character in Image1, full body, alone. Pose: both hands on her hips, determined proud smile, red ribbon on her high ponytail, small wristwatch.'),
    ('duy', 'chibi-duy', 'a chibi sticker of the character in Image1, full body, alone. Pose: holding up a ring of keys with one hand, a stack of manila folders under the other arm, calm friendly smile.'),
    ('quan', 'chibi-quan', 'a chibi sticker of the character in Image1, full body, alone. Pose: arms crossed, cool composed face behind his glasses, slight smug smile.'),
    ('nguoi-choi', 'chibi-nguoi-choi-nam', 'a chibi sticker of the character in Image1, full body, alone. Pose: both hands in his yellow hoodie pocket, headphones around his neck, curious determined smile.'),
]
for nv, ten, rieng in CHIBI_NV:
    them(ten, '1:1', [AN[nv], KIEU_CHIBI], 'chibi', rieng)

CHIBI_CANH = [
    ('chibi-goi-y-ha-vy-kinh-lup', ['ha-vy'],
     'Image1 is Ha Vy. Chibi Ha Vy leaning forward peering through a big magnifying glass, one eye enlarged through the lens, a small glowing light bulb above her head.'),
    ('chibi-goi-y-ha-vy-tinh', ['ha-vy'],
     'Image1 is Ha Vy. Chibi Ha Vy writing in a small cream notebook with a pencil, tapping the pencil on her chin, thoughtful, a few abstract doodle marks floating around (no numbers, no letters).'),
    ('chibi-goi-y-tung-ca', ['tung'],
     'Image1 is Tung. Chibi Tung grinning confidently, index finger raised as if saying "I bet...", other hand on his hip, a sparkle next to his head.'),
    ('chibi-goi-y-tung-bi', ['tung'],
     'Image1 is Tung. Chibi Tung scratching the back of his head, sheepish crooked smile, a big sweat drop and a swirl above his head.'),
    ('chibi-goi-y-minh-anh-chi', ['minh-anh'],
     'Image1 is Minh Anh. Chibi Minh Anh pointing at an open case folder she holds, serious encouraging face, like a teacher giving a hint.'),
    ('chibi-goi-y-duy-chia-khoa', ['duy'],
     'Image1 is Duy. Chibi Duy holding up a key toward the viewer with a helpful smile, a manila folder under his arm.'),
    ('chibi-0-dong', ['tung', 'nguoi-choi'],
     'Image1 is Tung, Image2 is the player. Both chibi sitting side by side staring at an open laptop whose screen is completely blank, both with dot eyes, sweat drops and question marks above their heads, comedic.'),
    ('chibi-ra-ket-qua', ['ha-vy', 'nguoi-choi'],
     'Image1 is Ha Vy, Image2 is the player. Both chibi giving a joyful high-five next to an open laptop showing an abstract table of light rows (no text), sparkles and small stars around.'),
    ('chibi-bang-ghim', ['ha-vy', 'tung'],
     'Image1 is Ha Vy, Image2 is Tung. Chibi Ha Vy pinning a yellow sticky note on a small cork board connected by red string to other blank cards, chibi Tung holding the ball of red string and a push pin, both focused.'),
    ('chibi-so-lieu-day', ['nguoi-choi', 'quan'],
     'Image1 is the player, Image2 is Quan. Chibi player pointing forward dramatically with a sheet of paper in the other hand, speed lines, blank papers flying; chibi Quan on the other side leaning back stunned with a sweat drop. Courtroom-game energy but no courtroom.'),
    ('chibi-clb-nhom', ['minh-anh', 'duy', 'ha-vy', 'tung', 'nguoi-choi'],
     'Image1 is Minh Anh, Image2 is Duy, Image3 is Ha Vy, Image4 is Tung, Image5 is the player. A cheerful chibi group photo of the five members of the student detective club standing together like a team: '
     'Minh Anh (red shirt) in the center holding a magnifying glass, Duy (gray hoodie) with keys, Ha Vy (green check cardigan) with a notebook, Tung (blue jersey) with a thumbs-up, '
     'the player (yellow hoodie) with headphones. Arranged in two loose rows, all fully visible.'),
    ('chibi-408-vali', ['tung', 'nguoi-choi'],
     'Image1 is Tung, Image2 is the player. Chibi Tung and the player carrying one heavy blue suitcase together up a few stairs, Tung in front grinning, the player puffing, a rice cooker peeking out of the suitcase.'),
    ('chibi-la-thu', ['minh-anh', 'ha-vy', 'tung'],
     'Image1 is Minh Anh, Image2 is Ha Vy, Image3 is Tung. Chibi Minh Anh holding up an unfolded letter (blank paper, only one big handwritten-looking abstract flourish), chibi Ha Vy and Tung leaning in from both sides with wide curious eyes.'),
]
for ten, ds, rieng in CHIBI_CANH:
    them(ten, '1:1', [AN[d] for d in ds] + [KIEU_CHIBI], 'chibi', rieng)

# ---------- C. Ảnh giới thiệu (16:9) ----------
INTRO_NV = [
    ('tung', 'intro-tung', 'bg-mvp-phong-ktx.webp',
     'a character introduction splash of Tran Tung, 18, cheerful sporty first-year tourism student and campus volunteer, in his dormitory room. '
     'Pose/action: giving a thumbs-up with one hand, a folded campus map in the other, big welcoming grin. Lighting/mood: warm morning window light, gentle rim light.'),
    ('ha-vy', 'intro-ha-vy', 'bg-mvp-phong-clb.webp',
     'a character introduction splash of Tran Ha Vy, 18, quiet analytical first-year applied mathematics student, in the detective club room. '
     'Pose/action: hugging her cream notebook with one arm, pushing up her glasses with one finger, calm analytical look. Lighting/mood: warm late-afternoon window light, gentle rim light.'),
    ('minh-anh', 'intro-minh-anh', 'bg-mvp-nha-van-hoa.webp',
     'a character introduction splash of Le Minh Anh, 21, third-year law student and president of the detective club, at the club fair in the culture house. '
     'Pose/action: one hand on her hip, the other arm relaxed, composed determined half-smile. Lighting/mood: bright morning light, gentle rim light.'),
    ('quan', 'intro-quan', 'bg-mvp-phong-ctsv.webp',
     'a character introduction splash of Dang Hoang Quan, 21, head of the student union inspection board, in the student affairs office. '
     'Pose/action: standing very straight with both hands clasped behind his back, cool confident half-smile. Lighting/mood: bright neutral office light, gentle rim light.'),
    ('duy', 'intro-duy', 'bg-mvp-phong-clb.webp',
     'a character introduction splash of Nguyen Duc Duy, 19, second-year public administration student who keeps the detective club\'s keys and files, in the club room. '
     'Pose/action: holding up a ring of keys in one hand, a stack of manila folders under the other arm, calm reliable half-smile. Lighting/mood: warm late-afternoon window light, gentle rim light.'),
    ('nguoi-choi', 'intro-nguoi-choi-nam', 'bg-mvp-phong-clb.webp',
     'a character introduction splash of the player character, 18, a first-year business student good with computers who just joined the detective club, in the club room. '
     'Pose/action: both hands in his yellow hoodie pocket, headphones around his neck, curious determined half-smile. Lighting/mood: warm late-afternoon window light, gentle rim light.'),
]
for nv, ten, nen, rieng in INTRO_NV:
    them(ten, '16:9', [AN[nv], KIEU_INTRO, N + nen], 'intro', rieng)

# ---------- D. CG bìa và kết (16:9) ----------
them('cg-bia', '16:9', [AN['minh-anh'], AN['ha-vy'], AN['tung'], AN['nguoi-choi'], N + 'bg-mvp-phong-clb.webp'], 'cg',
     'Image1 is Minh Anh, Image2 is Ha Vy, Image3 is Tung, Image4 is the player, Image5 is the club room background. Title key art: the four of them '
     'in the club room at golden hour around a cork board of pinned blank cards connected by red string, Minh Anh holding an unfolded letter, Ha Vy '
     'pointing at a card, Tung leaning in, the player in front center looking at the viewer with quiet determination. Leave the top 25 percent calm for a '
     'title added later by the UI.')
them('cg-ket-that', '16:9', [AN['minh-anh'], AN['duy'], AN['ha-vy'], AN['tung'], AN['nguoi-choi'], N + 'bg-mvp-phong-clb.webp'], 'cg',
     'Image1 Minh Anh, Image2 Duy, Image3 Ha Vy, Image4 Tung, Image5 the player, Image6 the club room. True ending: sunset in the club room, the five '
     'members relaxed and smiling, Duy hanging the room key back on its hook, Tung raising a cup of iced tea, Ha Vy pinning one last card on the board, '
     'Minh Anh and the player shaking hands. Warm, relieved mood.')
them('cg-ket-thuong', '16:9', [AN['minh-anh'], AN['ha-vy'], AN['tung'], AN['nguoi-choi'], N + 'bg-mvp-phong-hop.webp'], 'cg',
     'Image1 Minh Anh, Image2 Ha Vy, Image3 Tung, Image4 the player, Image5 the meeting room. Normal ending: the four walking out of the formal meeting '
     'room into the corridor, relieved but thoughtful; Minh Anh looks back over her shoulder at the closing door, the player holds a folder. Cool light, '
     'bittersweet mood.')

# ---------- E. Ảnh còn thiếu cho Vụ 2–5 (kiểm kê 01/10: nền xưởng robot + thư viện; Nam, Khánh, Thảo, Bách; Hoài mặt thường; Tùng áo xanh tình nguyện) ----------
# TIÊU CHÍ DUYỆT nhân vật mới: (1) cỡ đầu và điểm cắt chân ngang dàn cũ; (2) mặt, tóc khác hẳn sáu nhân vật chính và khác nhau;
# (3) màu áo xỉn, không trùng năm màu của nhóm; (4) nền hồng tím phẳng; (5) không chữ; (6) đúng đạo cụ theo lời thoại
# (Khánh: sơ mi trắng, thẻ Hội sinh viên, ba lô một vai có huy hiệu bánh răng sứt một răng).
MAU['bg'] = ('Image1 and Image2 are backgrounds from the same game: match their art style, palette and rendering exactly. '
             'Original clean 2D visual-novel environment illustration of a contemporary Vietnamese university built or renovated between 2015 and 2025; '
             'adult scale; bright practical architecture; restrained cel shading; crisp shapes; subtle painted detail; thin or nearly invisible outlines; '
             'slightly desaturated background colors; no imitation of a named artist, studio, anime or game. Production-ready 2D visual-novel game background, '
             '16:9 landscape, eye-level camera at 1.65 meters, three-quarter view, clean center and lower foreground left free for two or three character sprites '
             'and a dialogue box. Constraints: no people or silhouettes; no readable text or numbers; blank paper shapes only; no logos; no UI; no watermark. '
             'Avoid: secondary-school classroom, Japanese school interiors, lockers, cherry blossoms, photorealism, fisheye distortion, excessive clutter, deep black shadows. Scene: {}')
MAU['nv'] = ('Image1 is another character from the same game: it defines the ART STYLE, the BODY SIZE and the FRAMING (use the same head size, head position, figure scale and crop point as Image1). '
             'Do NOT copy its face, hair, pose or clothes. Create a NEW character with a clearly different face: {} '
             'This character is NOT a member of the detective club: use muted, slightly desaturated clothing colors; no bright red, bright yellow, bright blue or bright green. '
             'Asset type: production-ready 2D visual-novel character sprite, 9:16 portrait, slight three-quarter body turn facing the viewer, character centered. Style: ' + STYLE_VN + '. '
             'Background: one perfectly flat solid magenta (#FF00FF) filling the whole canvas, no gradient, no floor, no shadow; soft even studio front light, no rim light, no glow; '
             'no magenta or pink anywhere on the character. Constraints: Vietnamese university student with adult proportions; correct hands with five fingers; no text, no letters, no logo, no watermark. '
             'Avoid: photorealism, 3D, chibi, school uniform, oversized anime eyes, villainous look.')
MAU['ao'] = ('Edit Image1. Keep the same character with exactly the same face, expression, hair, nose bandage, pose, hands, folded map, body, framing, figure scale and canvas. '
             'Change ONLY the shirt: {} ' + NEN)

them('bg-mvp-xuong-robot', '16:9', [N + 'bg-mvp-nha-van-hoa.webp', N + 'bg-mvp-phong-clb.webp'], 'bg',
     'the workshop room of a student robotics club at the end of the culture-house row: along the left wall tall metal shelving full of plastic parts boxes with blank labels; '
     'a long workbench with a small wheeled robot, a soldering station and neatly laid tools; a shelf of binders and files; next to the entrance door on the right a whiteboard sign-up sheet '
     'with an empty hand-drawn grid; at the back a closed door with a small glass panel leading to an inner office. Teal accents, gray floor, cream walls. '
     'Lighting: daylight from high windows plus white ceiling lights.')
them('bg-mvp-thu-vien', '16:9', [N + 'bg-mvp-sanh-toa-b.webp', N + 'bg-mvp-phong-may.webp'], 'bg',
     'the university library reading room on the third floor of lecture building B: rows of tall bookshelves on the left, wooden reading desks with small desk lamps along tall windows on the right '
     'overlooking treetops, and near the single entrance at the back a card-swipe turnstile gate beside a small librarian counter; ceiling fans, quiet and tidy. '
     'Lighting: soft warm late-afternoon light through the windows.')
QM, MM = AN['quan'], AN['minh-anh']  # mẫu cỡ người: nam theo Quân, nữ theo Minh Anh
them('char-nam', '9:16', [QM], 'nv',
     "Nam, about 19, a member of the robotics club who runs its chat channel and keeps the workshop's books; quiet, careful, a little guarded, trustworthy. "
     'Build: slim, slightly narrow shoulders. Face: gentle oval face, soft thoughtful eyes, straight eyebrows, calm neutral expression, mouth closed. No glasses. '
     'Hair: black soft wavy hair, slightly long, with a loose fringe swept to one side. '
     'Outfit: a muted teal-gray zip workshop jacket with a stand collar and sleeves pushed up, over a plain light-gray T-shirt; dark trousers; a plain lanyard with a blank ID card. '
     'Pose: holding a small open cardboard parts box against his hip with one hand, a marker pen in the other hand.')
them('char-khanh', '9:16', [QM], 'nv',
     'Khanh, 22, fourth-year student, president of the student union and head of the robotics club; polished, confident, persuasive and mature; he must look respectable and composed. '
     'Build: tall and upright. Face: mature handsome face, defined jaw, calm steady eyes, polite neutral expression with a faint practiced smile. No glasses. '
     'Hair: black, neat short side-part with some volume, forehead partly visible. '
     'Outfit: a crisp white long-sleeve shirt with the sleeves rolled once, a navy student-union lanyard with a blank ID card around his neck, dark trousers; '
     'a dark backpack carried on one shoulder, and on its strap a small metal gear-shaped pin badge with one tooth broken off. '
     'Pose: one hand holding the backpack strap at his shoulder, the other hand relaxed at his side.')
them('char-thao', '9:16', [MM], 'nv',
     'Thao, 21, a third-year female student, technical lead of the robotics club; blunt, practical, hands-on, a little careless. Build: average, relaxed posture. '
     'Face: sharp lively eyes, one eyebrow slightly raised, frank neutral expression, mouth closed. '
     'Hair: black short bob cut at jaw length, tucked behind one ear, a few loose strands; clear safety glasses pushed up on top of her head. '
     'Outfit: a muted olive-green work overshirt with rolled sleeves over a plain cream T-shirt, dark work trousers, a small screwdriver in the chest pocket, a single key on a short cord at her belt. '
     'Pose: one hand in her trouser pocket, the other hand holding a small multimeter at her side.')
them('char-bach', '9:16', [QM], 'nv',
     'Bach, 21, a third-year male student, vice-head of the robotics club; quiet, orderly, the kind who keeps every receipt. Build: sturdy, medium height, broad shoulders. '
     'Face: broad calm face, thick eyebrows, small serious eyes, reserved neutral expression, mouth closed. No glasses. Hair: black buzz cut, a very short crew cut. '
     'Outfit: a muted brown-gray bomber jacket zipped halfway over a plain white T-shirt, dark trousers. Pose: both hands in his jacket pockets, standing square.')
them('char-hoai-neutral', '9:16', ['G:prototype/src/assets/characters/char-hoai-anchor.png|#D9DCE0'], 'mat',
     'calm and neutral: relaxed eyebrows, eyes looking at the viewer, mouth closed and relaxed, no blush')
# Tùng áo xanh tình nguyện (Vụ 5, đón Hoài tới buổi họp): bộ thứ hai của Tùng, sửa từ ảnh neo; biểu cảm sửa tiếp từ chính ảnh áo xanh.
them('char-tung-ao-xanh', '9:16', [AN['tung']], 'ao',
     'replace the sports jersey with a Vietnamese youth-volunteer shirt: a bright blue short-sleeve polo shirt with a white collar and white button placket, one thin white horizontal stripe '
     'across the chest, and a small plain round white emblem on the left chest (no text, no letters); add a plain volunteer lanyard with a blank ID card around his neck.')
AX = 'T:g2-char-tung-ao-xanh'
them('char-tung-ao-xanh-happy', '9:16', [AX], 'mat', 'a big bright open-mouthed laugh, eyes squinted shut with joy, eyebrows raised')
them('char-tung-ao-xanh-worried', '9:16', [AX], 'mat', 'worried and sheepish: eyebrows drawn together and up, an awkward crooked closed smile, a small sweat drop at the temple')
them('char-tung-ao-xanh-gai-dau', '9:16', [AX], 'dang',
     'Pose: one hand scratching the back of his head with the elbow raised; the other hand lowers the folded map to his side. '
     'Expression: embarrassed sheepish smile, eyebrows tilted up, a small sweat drop at the temple.')

them('char-tung-ao-xanh-chi-tay', '9:16', [AX], 'dang',
     'Pose: one hand pointing its index finger forward toward the viewer at chest height, confident; the other hand holds the folded map down at his side. '
     'Expression: cocky playful grin, one eyebrow raised, as if making a bet.')

# ---------- F. Ảnh thẻ hồ sơ Vụ 2–5 và nhiệm vụ phụ (3:4; thẻ thêm dòng "- Ảnh:" ở ho-so/*.md) ----------
MAU['doc'] = ('Image1 is a document image from the same game: match its flat top-down 2D illustration style, paper rendering, soft even light and plain dark neutral gray (#2B2F36) background; '
              'do NOT copy its content. Create a new image for a visual-novel evidence viewer, 3:4 portrait, the subject filling most of the frame: {} '
              'All writing is abstract: blank areas or light gray scribble lines only, no readable text, no readable numbers, no logos; no hands, no people, no watermark.')
KIEU_DOC = 'G:art/mvp-vu1/giay/doc-bao-cao-yeu.webp'
GIAY = [
    ('doc-tin-don', 'a smartphone lying flat, its screen showing a group chat channel: a column of message bubbles made of abstract gray lines, one bubble highlighted in pale yellow '
                    'with a small "forwarded" arrow icon beside it, several identical forwarded bubbles below it.'),
    ('doc-lich-xuong', 'a hand-drawn weekly sign-up sheet on white paper, taped at the corners: a grid of seven columns with rows filled by abstract handwritten scribbles in blue and black pen, '
                       'the first evening cell circled.'),
    ('doc-thu-hoi-don', 'a formal A4 letter from a student union: a blank two-column header area, a centered blank title area, faint gray body lines, '
                        'an abstract round red seal overlapping an ink signature at the bottom right.'),
    ('doc-phien-dang-nhap', 'a printed A4 system log sheet: a dense table of thin gray rows and columns like a login-session printout, two rows highlighted in pale yellow, '
                            'an abstract round blue stamp in the top right corner.'),
    ('doc-giao-chia', 'an old yellowed sheet of paper taped to a door panel: a short handwritten list of three rows, each row an abstract scribbled name followed by a small scribbled signature, '
                      'with a simple key drawn in pen beside each row.'),
    ('doc-huy-hieu-sut', 'a close-up of a small round metal gear-shaped pin badge fastened on a dark backpack strap; the gear has one tooth clearly broken off; '
                         'brushed steel with a teal enamel center, slightly worn.'),
    ('doc-kiem-ke', 'a hand-counted inventory sheet on a clipboard: a table with abstract item rows and tally marks in pencil, three cells in the last column circled in red pen.'),
    ('doc-so-quy', 'a printed club fund ledger sheet: a table of thin gray rows with date, description and amount columns as abstract lines, three rows highlighted in pale yellow, a paper clip at the top.'),
    ('doc-ho-so-vu-dau', 'an old hard-cover case notebook lying open: yellowed lined pages with abstract handwriting, one paragraph crossed out with a purple line, '
                         'a short faded blue pen note in the margin, a scribbled signature at the bottom.'),
    ('doc-v2-raw-logs', 'a printed room-usage log on continuous paper: a long table of monospaced-looking abstract gray rows, a few rows marked with a pencil tick in the margin.'),
    ('doc-mic-so-tai-san', 'an open asset ledger book with a table of abstract rows, a small transfer slip clipped to the page, and a black wireless microphone with a blank white label sticker lying across the corner.'),
    ('doc-hoan-ban-xuat', 'a printed transaction export sheet: a table of thin gray rows with amount columns as abstract lines, one row highlighted in pale green, the corner slightly folded.'),
    ('doc-hoan-bien-nhan', 'a small narrow bank refund receipt slip on thermal paper, slightly curled: abstract gray printed lines, a dashed separator, one bold abstract total line, a tiny round stamp.'),
]
for ten, rieng in GIAY:
    them(ten, '3:4', [KIEU_DOC], 'doc', rieng)

# ---------- G. Nhép môi + chớp mắt (9:16): mỗi chân dung hai ảnh sửa từ CHÍNH ảnh chân dung ở mục A/E (nền hồng tím) ----------
# Miếng miệng/mắt cắt bằng art/nguon/cat-mieng-mat-dan-moi-2026-10-01.py. Duy và bốn nhân vật Robotics chưa có bộ nhép.
CHUNG_NHEP = ('Edit Image1 only. This is a frame for a 2D talking animation: keep the exact same character, pose, body, hands, hair, eyebrows, outfit, colors, line art, shading, framing, '
              'canvas size and the flat magenta background. Nothing may move or be redrawn except the part described. No text, no watermark.')
MAU['mieng'] = ('Change ONLY the mouth: open it naturally as if speaking in the middle of a word: lips parted about one finger wide, a hint of upper teeth, the jaw lowered only very slightly; '
                'same lip color and line style. If the mouth is already open, close it halfway instead. Eyes, eyebrows, nose, cheeks and chin outline stay identical. {}' + CHUNG_NHEP)
MAU['matn'] = ('Change ONLY the eyes: both eyes fully closed in a soft relaxed blink: upper eyelids down drawn as a gentle curved line with lashes, no pupils visible; '
               'eyebrows, mouth, nose, glasses and everything else stay identical. {}' + CHUNG_NHEP)
NHEP = ['char-tung-anchor', 'char-tung-happy', 'char-tung-worried', 'char-tung-surprised', 'char-tung-thinking', 'char-tung-gai-dau', 'char-tung-chi-tay',
        'char-tung-ao-xanh', 'char-tung-ao-xanh-happy', 'char-tung-ao-xanh-worried', 'char-tung-ao-xanh-gai-dau', 'char-tung-ao-xanh-chi-tay',
        'char-ha-vy-anchor', 'char-ha-vy-thinking', 'char-ha-vy-smile', 'char-ha-vy-day-kinh',
        'char-minh-anh-anchor', 'char-minh-anh-worried', 'char-minh-anh-happy', 'char-minh-anh-serious', 'char-minh-anh-khoanh-tay',
        'char-quan-anchor', 'char-quan-smug', 'char-quan-stunned', 'char-quan-chi-man', 'char-nguoi-choi']
for t in NHEP:
    them(t + '--mieng', '9:16', ['T:g2-' + t], 'mieng', '')
    them(t + '--mat', '9:16', ['T:g2-' + t], 'matn', '')

# ---------- H. Chibi và ảnh giới thiệu của nhân vật CLB Robotics (sau khi chân dung mục E đạt) ----------
XB = 'T:g2-bg-mvp-xuong-robot'
them('chibi-nam', '1:1', ['T:g2-char-nam', KIEU_CHIBI], 'chibi',
     'a chibi sticker of the character in Image1, full body, alone. Pose: holding a small cardboard parts box with both hands, a marker pen tucked behind his ear, calm careful little smile.')
them('intro-nam', '16:9', ['T:g2-char-nam', KIEU_INTRO, XB], 'intro',
     "a character introduction splash of Nam, about 19, the quiet careful member of the robotics club who keeps the workshop's books, in the robotics workshop. "
     'Pose/action: writing a label on a small cardboard parts box with a marker pen, looking up calmly. Lighting/mood: daylight from high windows, gentle rim light.')
them('intro-khanh', '16:9', ['T:g2-char-khanh', KIEU_INTRO, XB], 'intro',
     'a character introduction splash of Khanh, 22, president of the student union and head of the robotics club, in the robotics workshop. '
     'Pose/action: standing upright with one hand on his backpack strap, where a small gear-shaped pin badge with one broken tooth is visible, polite confident half-smile. '
     'Lighting/mood: daylight from high windows, gentle rim light.')
them('intro-thao', '16:9', ['T:g2-char-thao', KIEU_INTRO, XB], 'intro',
     'a character introduction splash of Thao, 21, the blunt hands-on technical lead of the robotics club, in the robotics workshop. '
     'Pose/action: one hand in her trouser pocket, the other holding a small multimeter, frank look with one eyebrow raised. Lighting/mood: daylight from high windows, gentle rim light.')
them('intro-bach', '16:9', ['T:g2-char-bach', KIEU_INTRO, XB], 'intro',
     'a character introduction splash of Bach, 21, the quiet orderly vice-head of the robotics club, in the robotics workshop. '
     'Pose/action: standing square with both hands in his jacket pockets, reserved steady look. Lighting/mood: daylight from high windows, gentle rim light.')

day_du = [{'id': h['id'], 'khung': h['khung'], 'ref': h['ref'], 'prompt': f"[id: {h['id']}] " + MAU[h['mau']].replace('{}', h['rieng'])} for h in hang]
out = Path(__file__).with_name('dan-moi-game-hang-doi-2026-10-01.json')
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': day_du}, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(hang), 'muc ->', out.name)
if len(sys.argv) > 1:
    js = 'window.__MAU=' + json.dumps(MAU) + ';window.__HANG=' + json.dumps([[h['id'], h['khung'], h['ref'], h['mau'], h['rieng']] for h in hang]) + ';'
    (Path(sys.argv[1]) / 'hang-a.js').write_text(js, encoding='utf-8')
    print(len(js), 'ky tu js')
