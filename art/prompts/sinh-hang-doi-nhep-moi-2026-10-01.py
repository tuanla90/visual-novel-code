"""Hàng đợi Topview (Image Edit, 9:16, 1K, Unlimited free) cho bộ nhép môi + chớp mắt của ảnh chân dung MVP (01/10/2026).

Mỗi ảnh chân dung cần 2 ảnh sửa: `mieng` (miệng mở đang nói) và `mat` (mắt nhắm). Ảnh ra → art/nguon/nhep-moi-2026-10-01/<id>.png,
rồi `python art/nguon/cat-mieng-mat.py` so với ảnh gốc để cắt miếng → prototype/src/mvp/ui/nhep/<ảnh>/{mouth,eyes}.webp
và sinh bảng tọa độ cho prototype/src/mvp/ui/nhep-moi-mvp.ts.

Chạy: python art/prompts/sinh-hang-doi-nhep-moi-2026-10-01.py → ghi nhep-moi-hang-doi-2026-10-01.json cạnh tệp này.
Mỗi mục: id, khung, ref ("path|#màu" = làm phẳng lên nền màu; tải từ GitHub nhánh main), prompt (mở đầu "[id: …]").
"""
import json
from pathlib import Path

C = 'prototype/src/assets/characters/'
M = 'prototype/src/assets/mvp/nhan-vat/'
XAM = '|#D9DCE0'

# Ảnh chân dung chưa có bộ nhép môi (talk-rigs.ts chỉ có Minh Anh / Hà Vy / Quân / Hoài bộ cũ).
ANH = {
    'char-tung-anchor': C + 'char-tung-anchor.png',
    'char-tung-happy': M + 'char-tung-happy.png',
    'char-tung-worried': M + 'char-tung-worried.png',
    'char-tung-surprised': M + 'char-tung-surprised.png',
    'char-tung-thinking': M + 'char-tung-thinking.png',
    'char-tung-gai-dau': M + 'char-tung-gai-dau.png',
    'char-tung-chi-tay': M + 'char-tung-chi-tay.png',
    'char-ha-vy-day-kinh': M + 'char-ha-vy-day-kinh.png',
    'char-ha-vy-thinking': C + 'char-ha-vy-thinking.png',
    'char-minh-anh-khoanh-tay': M + 'char-minh-anh-khoanh-tay.png',
    'char-minh-anh-serious': M + 'char-minh-anh-serious.png',
    'char-quan-chi-man': M + 'char-quan-chi-man.png',
    'char-nguoi-choi': M + 'char-nguoi-choi.png',
}

CHUNG = ('Edit Image1 only. This is a frame for a 2D talking animation: keep the exact same character, pose, body, hands, hair, '
         'eyebrows, outfit, colors, line art, shading, framing, canvas size and the flat light-gray background. '
         'Nothing may move or be redrawn except the part described. No text, no watermark.')
MIENG = ('Change ONLY the mouth: open it naturally as if speaking in the middle of a word — lips parted about one finger wide, '
         'a hint of upper teeth, the jaw lowered only very slightly; same lip color and line style. Eyes, eyebrows, nose, cheeks and chin outline stay identical. ' + CHUNG)
MAT = ('Change ONLY the eyes: both eyes fully closed in a soft relaxed blink — upper eyelids down drawn as a gentle curved line with lashes, '
       'no pupils visible; eyebrows, mouth, nose and everything else stay identical. ' + CHUNG)

hang = []
for ten, duong in ANH.items():
    hang.append({'id': f'{ten}--mieng', 'khung': '9:16', 'ref': [duong + XAM], 'prompt': f'[id: {ten}--mieng] {MIENG}'})
    hang.append({'id': f'{ten}--mat', 'khung': '9:16', 'ref': [duong + XAM], 'prompt': f'[id: {ten}--mat] {MAT}'})

out = Path(__file__).with_name('nhep-moi-hang-doi-2026-10-01.json')
out.write_text(json.dumps({'_ghi_chu': __doc__.strip(), 'hang_doi': hang}, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(hang), 'muc ->', out.name)
