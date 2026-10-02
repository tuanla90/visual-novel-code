"""Lớp của hoạt cảnh sảnh đêm (bác Thịnh soi đèn pin, Tùng lao xuống cầu thang): nền không người → nen/bg-mvp-sanh-den-pin.webp;
hai nhân vật cắt nền magenta, tách riêng → hoat-canh/hc-sanh-den-pin-tung.webp, hc-sanh-den-pin-bac.webp. In khung đặt lớp (% ảnh nền)."""
from PIL import Image
import numpy as np, os
M = '../../../prototype/src/assets/mvp/'
Image.open('sanh-dem-nen.png').convert('RGB').save(M + 'nen/bg-mvp-sanh-den-pin.webp', quality=84)
a = np.asarray(Image.open('sanh-dem-nv.png').convert('RGB')).astype(np.int32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
alpha = np.clip((150 - (np.minimum(r, b) - g)) / 90.0, 0, 1)
rgb = a.copy()
rgb[..., 0] = np.minimum(r, r * alpha + g * (1 - alpha)).astype(np.int32)
rgb[..., 2] = np.minimum(b, b * alpha + g * (1 - alpha)).astype(np.int32)
out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
H, W = alpha.shape
for ten, x0, x1 in [('tung', 0, 600), ('bac', 600, W)]:
    ys, xs = np.where(alpha[:, x0:x1] > 0.5)
    t, d, tr, ph = ys.min(), ys.max() + 1, xs.min() + x0, xs.max() + 1 + x0
    Image.fromarray(out[t:d, tr:ph], 'RGBA').save(M + f'hoat-canh/hc-sanh-den-pin-{ten}.webp', quality=90)
    print(ten, 'trai %.2f tren %.2f rong %.2f cao %.2f' % (tr / W * 100, t / H * 100, (ph - tr) / W * 100, (d - t) / H * 100))
