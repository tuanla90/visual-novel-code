"""Xử lý ba ảnh giao diện 02/10/2026 thành tệp dùng trong game (prototype/src/assets/mvp/giao-dien/). Chạy: python xu-ly.py"""
from PIL import Image
import os
DICH = '../../../prototype/src/assets/mvp/giao-dien/'
Image.open('ui-nen-quan-sat.png').convert('RGB').save(DICH + 'ui-nen-quan-sat.webp', quality=82)
Image.open('ui-bien-ban.png').convert('RGB').save(DICH + 'ui-bien-ban.webp', quality=84)
# Kính lúp: nền magenta (kể cả trong lòng kính) thành trong suốt; khử viền hồng.
im = Image.open('ui-kinh-lup.png').convert('RGBA')
px = im.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        # Độ "magenta": đỏ và lam cao, lục thấp.
        m = min(r, b) - g
        if m > 150:
            px[x, y] = (r, g, b, 0)
        elif m > 60:
            k = (150 - m) / 90
            px[x, y] = (int(r * k), g, int(b * k), int(255 * k))
im = im.resize((512, 512), Image.LANCZOS)
im.save(DICH + 'ui-kinh-lup.webp', quality=88)
for n in ['ui-nen-quan-sat', 'ui-bien-ban', 'ui-kinh-lup']:
    print(n, os.path.getsize(DICH + n + '.webp'))
