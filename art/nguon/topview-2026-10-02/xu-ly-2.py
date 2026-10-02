"""Xử lý ba ảnh đợt hai 02/10/2026 thành tệp dùng trong game. Chạy: python xu-ly-2.py"""
from PIL import Image
import os
M = '../../../prototype/src/assets/mvp/'
Image.open('bg-tra-da.png').convert('RGB').save(M + 'nen/bg-mvp-tra-da.webp', quality=82)
Image.open('cg-chay-dem.png').convert('RGB').save(M + 'nen/bg-mvp-san-dem.webp', quality=82)
# Bà bán trà: nền magenta thành trong suốt, khử viền hồng.
im = Image.open('char-ba-tra.png').convert('RGBA')
px = im.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        m = min(r, b) - g
        if m > 150:
            px[x, y] = (r, g, b, 0)
        elif m > 60:
            k = (150 - m) / 90
            px[x, y] = (int(r * k), g, int(b * k), int(255 * k))
im.save(M + 'nhan-vat/char-ba-lua.png', optimize=True)

for n in ['nen/bg-mvp-tra-da.webp', 'nen/bg-mvp-san-dem.webp', 'nhan-vat/char-ba-lua.png']:
    print(n, os.path.getsize(M + n))
