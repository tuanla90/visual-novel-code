"""Hai lớp của hoạt cảnh chạy đêm: nền không người → nen/bg-mvp-san-dem.webp; hai nhân vật cắt nền magenta, tách riêng từng người →
hoat-canh/hc-san-dem-tung.webp, hc-san-dem-ban.webp. In ra khung (trái, trên, rộng, cao theo % ảnh nền) để đặt lớp trong CSS. Chạy: python xu-ly-3.py"""
from PIL import Image
import numpy as np, os
M = '../../../prototype/src/assets/mvp/'
os.makedirs(M + 'hoat-canh', exist_ok=True)
Image.open('chay-dem-nen.png').convert('RGB').save(M + 'nen/bg-mvp-san-dem.webp', quality=84)
a = np.asarray(Image.open('chay-dem-nv.png').convert('RGB')).astype(np.int32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
m = np.minimum(r, b) - g                      # độ "magenta"
alpha = np.clip((150 - m) / 90.0, 0, 1)       # m > 150: trong suốt; m < 60: đặc
k = alpha[..., None]
rgb = a.copy()
rgb[..., 0] = (r * alpha).astype(np.int32) + (g * (1 - alpha) * 0).astype(np.int32)
rgb[..., 2] = (b * alpha).astype(np.int32)
out = np.dstack([np.where(alpha[..., None] < 1, np.minimum(rgb, a), a), (alpha * 255)]).astype(np.uint8)
H, W = alpha.shape
for ten, x0, x1 in [('tung', 0, 590), ('ban', 590, W)]:
    al = alpha[:, x0:x1] > 0.5
    ys, xs = np.where(al)
    t, d, tr, ph = ys.min(), ys.max() + 1, xs.min() + x0, xs.max() + 1 + x0
    Image.fromarray(out[t:d, tr:ph], 'RGBA').save(M + f'hoat-canh/hc-san-dem-{ten}.webp', quality=90)
    print(ten, 'left %.2f%% top %.2f%% width %.2f%% height %.2f%%' % (tr / W * 100, t / H * 100, (ph - tr) / W * 100, (d - t) / H * 100), os.path.getsize(M + f'hoat-canh/hc-san-dem-{ten}.webp'))
