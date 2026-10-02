"""Hàng đợi Topview (9:16, 1K, medium, Unlimited free) cho ẢNH NEO MỚI của dàn nhân vật — bước 1, dáng thường (01/10/2026).

User chốt 01/10: dàn năm màu kiểu "năm anh em siêu nhân" — Minh Anh ĐỎ, Tùng LAM, Hà Vy LỤC, nhân vật chính VÀNG,
Duy XÁM THAN; Quân (ngoài nhóm) xanh than xỉn, đeo kính. Mỗi người một mảng màu tươi ở áo + một chi tiết trắng + quần tối;
không ai mặc màu của người khác; không huy hiệu; mỗi người một thế tay riêng (chỉ Hà Vy ôm sổ).
Tóc ba bạn nam phải khác hẳn nhau: Duy ngôi giữa hai mái, Quân vuốt ngược kiểu doanh nhân, nhân vật chính tóc phổ thông (giữ như cũ); Tùng undercut.
Quy trình: art/quy-trinh-dong-nhat-va-duyet-anh.md (khối gốc CHUNG giữ nguyên, mỗi ảnh một khối riêng).

TIÊU CHÍ DUYỆT (viết trước khi sinh)
Chung cho cả sáu ảnh:
 1. Khung 9:16, nửa người (đầu tới ngang hông), cỡ người ngang các ảnh neo cũ.
 2. Nền xám nhạt phẳng, không bóng đổ, không cảnh.
 3. Áo đúng màu chủ đạo của người đó; không có mảng màu tươi nào khác trên người.
 4. Không chữ, không logo, không huy hiệu.
 5. Nét vẽ khớp dàn cũ (anime tô phẳng, viền mảnh rõ), không tả thực.
 6. Thế tay đúng mô tả, bàn tay đủ ngón, không cầm thừa đồ.
Riêng:
 minh-anh: vẫn là Minh Anh cũ (mặt, đuôi ngựa cao); sơ mi đỏ xắn tay; ruy băng đỏ; đồng hồ nhỏ thấy rõ; một tay chống hông.
 tung: da rám rõ hơn cả nhóm; tóc undercut; vai rộng; băng cá nhân trên sống mũi; áo phông lam tươi viền trắng; hai tay không.
 ha-vy: vẫn là Hà Vy cũ (mặt, kính, tóc ngang vai); mái bằng; cardigan lục đậm kẻ ca rô kem; ôm sổ bìa kem.
 nguoi-choi: vẫn là nhân vật chính cũ (tóc nâu chỏm dựng, bút gài tai); chỉ hoodie vàng, không áo bò, không dây thẻ, không sổ; tai nghe quàng cổ; tay trong túi áo.
 duy: người tròn, mặt tròn hiền, nhìn là khác Quân; tóc rẽ ngôi giữa kiểu hai mái; hoodie xám than, áo trong trắng; hai tay ôm chồng hồ sơ.
 quan: vẫn là Quân cũ (mặt, blazer xanh than); kính gọng chữ nhật mảnh; tóc vuốt ngược bóng kiểu doanh nhân, lộ hẳn trán; hai tay chắp sau lưng.

Chạy: python art/prompts/sinh-hang-doi-dan-moi-2026-10-01.py → ghi dan-moi-hang-doi-2026-10-01.json cạnh tệp này.
Mỗi mục: id, khung, ref ("path|#màu" = làm phẳng lên nền màu; tải từ GitHub nhánh main), prompt (mở đầu "[id: …]").
"""
import json
from pathlib import Path

C = 'prototype/src/assets/characters/'
M = 'prototype/src/assets/mvp/nhan-vat/'
XAM = '|#D9DCE0'
MA = C + 'char-minh-anh-happy.png' + XAM  # cùng thân với ảnh neo, 768 px (ảnh neo 1536 px nặng)

CHUNG = (
    'Asset type: production-ready 2D visual-novel character sprite, 9:16 portrait, framed from the top of the head to the hips, '
    'character centered, slight three-quarter body turn facing the viewer, same figure scale as the reference image. '
    'Style: clean modern 2D visual novel illustration: crisp delicate line art, smooth soft cel shading, controlled colors, polished facial rendering; '
    'match the reference image in line weight, eye rendering and shading softness. '
    'Team color rule: exactly ONE large saturated signature color block on the torso, one small white detail, dark neutral charcoal trousers; '
    'no other saturated color anywhere on the character. '
    'Background: one perfectly flat solid light gray (#D9DCE0) filling the canvas, no gradient, no floor, no cast shadow, no scenery. '
    'Lighting: soft even studio front light, no rim glow. '
    'Constraints: Vietnamese university student with adult proportions; correct hands with five fingers; no text, no letters, no logo, no badge, no pin, '
    'no watermark, no speech bubble. '
    'Avoid: photorealism, 3D, chibi, school uniform, oversized anime eyes, extra props.'
)

GIU = ('Edit Image1. Image1 is the exact character: preserve the same face, facial features, skin tone, age, body proportions, art style and figure scale. '
       'Apply ONLY the changes listed. ')
MOI = ('Image1 is another character from the same game: use it for ART STYLE ONLY (line weight, eye rendering, shading). '
       'Do NOT copy its face, hair, body, pose or clothes. Create a NEW character with a clearly different face and build as described. ')

DAN = [
    ('minh-anh', [MA], GIU +
     'Character: Minh Anh, 21, third-year law student, president of the detective club; decisive, punctual, a little tense. '
     'Keep her long black hair in the same HIGH ponytail. '
     'Changes: (1) outfit: a phoenix-red (#C93B2B) button-up shirt with small white buttons, collar open one button, sleeves neatly rolled up to just below the elbows, '
     'tucked into black high-waist trousers; no polo shirt; (2) a phoenix-red ribbon tied in a neat bow holding the ponytail; '
     '(3) a small slim wristwatch with a white dial on her left wrist, clearly visible; '
     '(4) pose: her left hand on her hip, right arm relaxed at her side, both hands empty; '
     '(5) expression: composed and sharp, steady confident eyes, a faint closed-mouth smile. '),
    ('tung', [MA], MOI +
     'Character: Tung, 18, first-year tourism student, sporty, cheerful and loud, a campus volunteer who knows every corner of the school. '
     'Build: athletic, broad shoulders, sturdy neck and forearms. Skin: clearly sun-tanned warm brown, noticeably darker than Image1. '
     'Face: squarer jaw, thick straight black eyebrows, lively dark eyes, a wide open grin showing teeth; one small beige adhesive bandage across the bridge of his nose. '
     'Hair: black undercut, sides and back clipped very short, short textured top brushed up, forehead fully visible, no fringe. '
     'Outfit: a bright cobalt-blue (#1E6FD9) short-sleeve crew-neck youth-volunteer T-shirt with a narrow white trim on the collar and sleeve cuffs, plain with no print; '
     'dark charcoal trousers. '
     'Pose: both hands empty, arms relaxed at his sides, shoulders open, leaning very slightly toward the viewer in a friendly way; holding nothing, no lanyard. '),
    ('ha-vy', [C + 'char-ha-vy-anchor.png' + XAM], GIU +
     'Character: Ha Vy, 18, first-year applied mathematics student; quiet, precise, skeptical bookworm who admires Sherlock Holmes. '
     'Keep her thin silver-wire glasses and straight shoulder-length black hair. '
     'Changes: (1) fringe: straight blunt full bangs cut evenly at eyebrow level; '
     '(2) outfit: a deep green (#2E7D4F) knit cardigan with a cream windowpane check pattern (detective-style check), worn open over the same cream button-up shirt; dark charcoal trousers; '
     '(3) prop and pose: she hugs one plain cream-colored hardcover notebook against her chest with both arms; no navy notebook; both hands on the notebook, not touching her glasses; '
     '(4) expression: calm, thoughtful, slightly doubtful, mouth closed. '),
    ('nguoi-choi', [C + 'char-player-nam-anchor.png' + XAM], GIU +
     'Character: the player character, 18, first-year business student who is good with computers. '
     'Keep his messy brown hair with the single upright tuft, the small mole under the eye and the yellow pencil tucked behind his ear. '
     'Changes: (1) remove the denim jacket, the lanyard with ID card and the notebook completely; '
     '(2) outfit: only a warm yellow (#F2B91F) pullover hoodie with white drawstrings and a front kangaroo pocket; dark charcoal jeans; '
     '(3) dark gray over-ear headphones with small white accents resting around his neck over the hood; '
     '(4) pose: both hands tucked inside the front hoodie pocket, relaxed shoulders; '
     '(5) expression: friendly curious half-smile. '),
    ('duy', [MA], MOI +
     'Character: Duy, 19, second-year public administration student who keeps the club keys, file cabinet and records; gentle, shy, dependable, a little clumsy, never the center of attention. '
     'Build: chubby and soft, round shoulders, a little shorter and wider than average. '
     'Face: round face with full cheeks, soft chin, small gentle slightly droopy eyes, short soft eyebrows, a shy warm closed-mouth smile. Skin: fair. '
     'Hair: black 1990s-style curtain haircut with a clean CENTER part: soft straight medium-length hair falling to both sides of the forehead down to about eyebrow level, like two curtains, ears partly covered; gentle and a bit old-fashioned. '
     'Outfit: a charcoal-gray (#4A4D52) zip hoodie worn open over a plain white T-shirt; dark trousers; a small ring of keys clipped to a belt loop. '
     'Pose: both arms hugging a tall stack of plain manila file folders against his chest, the top folder slightly slipping; no other props. '),
    ('quan', [C + 'char-quan-anchor.png' + XAM], GIU +
     'Character: Quan, 21, third-year statistics student, head of the student union inspection board; cold, meticulous, confident; he is the rival, NOT a team member, '
     'so his colors stay dark and muted: the same navy blazer, light gray shirt and dark trousers. '
     'Changes: (1) add thin rectangular dark-metal glasses, eyes clearly visible; '
     '(2) hair: a successful-businessman slicked-back style: medium-length black hair on top combed straight back with a little volume and a subtle side part, smooth and glossy as if styled with pomade, sides neat and close, forehead fully visible, no fringe at all; '
     '(3) pose: standing very straight, both hands clasped behind his back so the hands are not visible, chin slightly raised; remove the leather folder; '
     '(4) expression: cool, composed, a slight knowing half-smile. '
     'For this character the team color rule does not apply: no saturated color at all. '),
]

# ---------- Lượt 2 (user duyệt lượt 1: Minh Anh, Hà Vy, nhân vật chính đạt; sửa ba ảnh dưới) ----------
# Sinh lại từ ảnh neo CŨ / ảnh phong cách, không nối đuôi ảnh lượt 1 (quy trình mục 3.3).
#  quan: bỏ blazer (vest dành cho cán bộ, thầy cô) → sơ mi xám nhạt cài kín + gi lê len xanh than; tóc lượt 1 chưa ra kiểu vuốt ngược.
#  tung: lượt 1 quá vạm vỡ, da quá đậm, áo lam trơn viền trắng phối xấu → dáng thể thao gọn, da rám nhẹ, áo thể thao có mảng trắng, quần đùi.
#  duy: lượt 1 trông "đụt" (đầu nghiêng, mắt lim dim, mái che trán, má đỏ, rụt cổ) → đứng thẳng, mắt mở sáng, lộ trán, tươi tỉnh; vẫn tròn hiền.
LUOT_2 = [
    ('quan', [C + 'char-quan-anchor.png' + XAM], GIU +
     'Character: Quan, 21, third-year statistics student, head of the student union inspection board; cold, meticulous, confident; he is the rival, NOT a team member, '
     'so his colors stay dark and muted. He is a student, not staff: NO blazer, NO suit jacket, NO tie. '
     'Changes: (1) outfit: remove the navy blazer; a crisp light-gray long-sleeve dress shirt buttoned all the way up, cuffs buttoned, under a dark navy sleeveless V-neck knit vest; dark trousers with a black belt; '
     '(2) add thin rectangular dark-metal glasses, eyes clearly visible; '
     '(3) hair: change the hairstyle completely to a classic slicked-back businessman style: longer black hair on top swept straight BACK from the hairline over the crown with visible comb lines, '
     'slight height at the front, glossy pomade shine, a subtle side part, short tidy sides; the whole forehead and hairline are exposed; absolutely no fringe and no strands falling on the forehead; '
     '(4) pose: standing very straight, both hands clasped behind his back so the hands are not visible, chin slightly raised; remove the leather folder; '
     '(5) expression: cool, composed, a slight knowing half-smile. '
     'For this character the team color rule does not apply: no saturated color at all. '),
    ('tung', [MA], MOI +
     'Character: Tung, 18, first-year tourism student, sporty, cheerful and friendly, a campus volunteer who plays football after class. '
     'Build: lean and fit like a teenage footballer: slim waist, normal shoulders, slender toned arms; NOT muscular, NOT bulky, no bodybuilder chest or biceps. '
     'Skin: healthy light tan, only slightly darker than Image1, a natural outdoor glow, not dark brown. '
     'Face: youthful 18-year-old face, slightly angular jaw, straight black eyebrows, bright lively eyes, a wide friendly smile with a neat row of upper teeth; one small beige adhesive bandage across the bridge of his nose. '
     'Hair: black undercut, sides and back clipped short, short textured top brushed up, forehead visible. '
     'Outfit: a stylish short-sleeve sports jersey T-shirt: main color bright azure blue (#2F80ED), white raglan-style side panels running under the arms, thin white piping along the shoulder seams, '
     'a white V-neck trim, and one small plain white chevron stripe on the chest; no text, no number, no logo; '
     'knee-length athletic shorts in dark navy-charcoal with a single white side stripe. '
     'Framing for this character: from the top of the head down to just above the knees so the shorts are visible; the figure must be the SAME size as Image1, with clear empty gray space on both sides, not filling the frame. '
     'Pose: both hands empty, one hand resting loosely on his hip, the other arm relaxed at his side, weight on one leg, friendly and relaxed; holding nothing, no lanyard. '),
    ('duy', [MA], MOI +
     'Character: Duy, 19, second-year public administration student who keeps the club keys, file cabinet and records; kind, calm, dependable and tidy, the quiet reliable friend; likeable and pleasant to look at, not sleepy, not goofy. '
     'Build: pleasantly chubby and stocky, soft round cheeks, a visible neck, shoulders relaxed and level. '
     'Posture: standing upright, head straight (not tilted), looking directly at the viewer. '
     'Face: round friendly face, clear open bright dark eyes with a warm attentive look, neat natural eyebrows, a gentle confident closed-mouth smile; no heavy blush, no half-closed eyes. Skin: fair. '
     'Hair: neat black center-part hairstyle with a little volume: the fringe is parted in the middle and swept to both sides so most of the forehead is visible; hair ends above the eyebrows and above the ears; clean and well-groomed. '
     'Outfit: a well-fitted medium charcoal-gray (#5A5E64) zip hoodie worn open over a clean white T-shirt, hood lying flat; dark trousers; a small ring of keys clipped to a belt loop. '
     'Pose: holding a neat stack of three plain manila file folders against his side with one arm, the other hand relaxed at his side; no other props. '),
]

# ---------- Lượt 3 (user duyệt lượt 2: Quân đạt; áo Tùng đạt) ----------
# Ảnh tham chiếu "T:" là ảnh lượt trước lấy thẳng từ board Topview (tệp cùng tên trong art/nguon/topview-2026-10-01/), không qua GitHub.
# Ảnh lượt 2 của Tùng được duyệt phần áo quần nên thành ảnh neo mới cho bộ đồ (quy trình mục 2.1).
#  tung: giữ áo quần lượt 2; người khỏe hơn (giữa lượt 1 và lượt 2); undercut cạo trắng hai bên; cỡ người và điểm cắt chân ngang các bạn; hai tay buông (khỏi trùng thế chống hông của Minh Anh).
#  duy: user muốn mặt đẹp trai như Duy cũ, chỉ cần tóc ngôi giữa để phân biệt → mặt và vóc lấy từ ảnh Duy cũ, tóc + áo + thế tay lấy từ lượt 2; bỏ ý "người tròn".
#  ha-vy: thử thay quần bằng chân váy xếp ly.
T = 'T:art/nguon/topview-2026-10-01/'
KHUNG = ('Framing and scale (important, must match the other sprites of this game): the head from the top of the hair to the chin is about 20 percent of the canvas height; '
         'the top of the hair is about 4 percent below the top edge; the bottom edge of the canvas cuts the figure at mid-thigh; the figure is centered with a little empty gray space on both sides. ')
LUOT_3 = [
    ('tung', [T + 'char-tung-v2-anchor-l2.png'],
     'Edit Image1. Image1 is the exact character: keep the same face, friendly smile, nose bandage, the same blue-and-white sports jersey design and colors, the same dark shorts with the white side stripe, and the same art style. '
     'Changes: (1) build: healthier and stronger, halfway between slim and muscular: broader shoulders, a fuller chest, firmer arms with light athletic definition, a sturdier neck; he looks fit and strong, not skinny and not a bodybuilder; '
     '(2) hair: a skin-fade undercut: the sides and back are shaved down to the skin so the pale scalp shows clearly, with a sharp line up to the short textured black hair on top; '
     '(3) pose: both hands empty, both arms relaxed at his sides, open confident stance; no hand on the hip. '
     + KHUNG),
    ('duy', [M + 'char-duy.png' + XAM, T + 'char-duy-v2-anchor-l2.png'],
     'Image1 is the exact character Duy: preserve his face, handsome facial features, eyes, skin tone, slim build and age exactly. '
     'Image2 shows the new design: from Image2 take ONLY the neat black center-part hairstyle, the medium charcoal-gray zip hoodie worn open over a white T-shirt, the dark trousers with the key ring on the belt loop, '
     'and the pose (a neat stack of plain manila file folders held against his side with one arm, the other arm relaxed). Do NOT use the face or the body shape of Image2. '
     'Expression: calm, kind, a slight closed-mouth smile, head straight, looking at the viewer. '
     + KHUNG),
    ('ha-vy', [T + 'char-ha-vy-v2-anchor.png'],
     'Edit Image1. Keep everything exactly the same: face, glasses, blunt bangs, the green check cardigan, the cream shirt, the cream notebook, the pose, the framing and the figure scale. '
     'Change ONLY the lower garment: replace the dark trousers with a knee-length pleated skirt in dark charcoal gray with clearly visible vertical pleats, the cream shirt tucked into the skirt waistband. '),
]

# ---------- Lượt 4 (user duyệt lượt 3: Duy đạt, Hà Vy chọn bản váy; Tùng dáng khuỳnh khoàng) ----------
#  tung: quay về vóc người của Tùng CŨ (ảnh neo cũ làm Image1: vóc, cỡ người, khung), chỉ đô hơn một chút; mặt, tóc, băng cá nhân, áo quần lấy từ lượt 3.
LUOT_4 = [
    ('tung', [C + 'char-tung-anchor.png' + XAM, T + 'char-tung-v2-anchor-l3.png'],
     'Image1 defines the BODY and the FRAMING: use exactly the same body size, slim natural build, shoulder width, head size, head position, figure scale and crop point as Image1; '
     'only make him slightly more solid: a little more shoulder and upper-arm than Image1, still a normal slim student, no big muscles. '
     'Image2 defines the DESIGN: take the face, the friendly smile, the nose bandage, the skin-fade undercut hairstyle, the blue-and-white short-sleeve sports jersey and the dark shorts with a white side stripe from Image2. '
     'Do NOT use the orange shirt, the lanyard, the map or the thumbs-up of Image1. Do NOT use the body proportions of Image2. '
     'Pose: natural and relaxed, arms hanging close to the body, elbows in, not bowed outward: one hand in his shorts pocket, the other arm resting naturally at his side; both hands empty. '),
]

# ---------- Lượt 5 (user: thử lại Tùng, CHỈ dùng ảnh Tùng ban đầu làm tham chiếu, không đưa ảnh áo lam nào; chỉ bảo sửa tóc, áo, thêm băng cá nhân) ----------
# Câu lệnh ngắn, không kèm khối CHUNG: mọi thứ khác (mặt, dáng, tay giơ ngón cái, tờ bản đồ, dây thẻ, khung) giữ theo ảnh cũ.
TUNG_L5 = ('Edit Image1. Keep the same character, face, expression, body, pose, hands, framing, figure scale, art style and the plain light-gray background exactly as they are. '
           'Change ONLY three things: '
           '(1) hairstyle: a black skin-fade undercut: the sides and back shaved down to the skin so the pale scalp shows, short textured hair on top brushed up; '
           '(2) clothing: replace the orange shirt and the white T-shirt with one short-sleeve sports jersey T-shirt in bright azure blue (#2F80ED) with white side panels under the arms, '
           'thin white piping along the shoulder seams, a white V-neck trim and one small plain white chevron on the chest; no text, no number, no logo; bare arms below the short sleeves; '
           '(3) add one small beige adhesive bandage across the bridge of his nose. '
           'No text, no watermark.')

hang = [{'id': f'char-{ma}-v2-anchor', 'khung': '9:16', 'ref': ref, 'prompt': f'[id: char-{ma}-v2-anchor] {rieng}{CHUNG}'} for ma, ref, rieng in DAN]

out = Path(__file__).with_name('dan-moi-hang-doi-2026-10-01.json')
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
hang += [{'id': f'char-{ma}-v2-anchor-l2', 'khung': '9:16', 'ref': ref, 'prompt': f'[id: char-{ma}-v2-anchor-l2] {rieng}{CHUNG}'} for ma, ref, rieng in LUOT_2]
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
hang += [{'id': f'char-{ma}-v2-anchor-l3', 'khung': '9:16', 'ref': ref, 'prompt': f'[id: char-{ma}-v2-anchor-l3] {rieng}{CHUNG}'} for ma, ref, rieng in LUOT_3]
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
hang += [{'id': f'char-{ma}-v2-anchor-l4', 'khung': '9:16', 'ref': ref, 'prompt': f'[id: char-{ma}-v2-anchor-l4] {rieng}{CHUNG}'} for ma, ref, rieng in LUOT_4]
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
hang.append({'id': 'char-tung-v2-anchor-l5', 'khung': '9:16', 'ref': [C + 'char-tung-anchor.png' + XAM], 'prompt': '[id: char-tung-v2-anchor-l5] ' + TUNG_L5})
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(hang), 'muc ->', out.name)
