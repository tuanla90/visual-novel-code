"""Cắt miếng nhép môi / chớp mắt cho `src/shared/ui/visuals/talk-rigs.ts`.

Chạy: python art/nguon/cat-mieng-nhep-moi.py <ảnh gốc trong game> <ảnh đã sửa (Topview, nền hồng tím)> "<cx,cy,w,h>[;<cx,cy,w,h>…]" <tệp miếng ra .webp>
  Mỗi bộ (cx, cy, w, h) là một khung elip (miệng, hoặc từng mắt), tính theo điểm ảnh khung 768 bề ngang (ảnh gốc to hơn thì tự nhân).

Ảnh sửa bằng AI không giữ nguyên từng điểm ảnh (vẽ lại cả mắt khi chỉ bảo đổi miệng), nên KHÔNG dò vùng khác nhau
tự động: chỉ lấy đúng khung elip đã chỉ, căn lệch nhỏ theo vành quanh khung, làm mềm mép, khớp màu theo vành.
In ra `{ x, y, w, h }` theo điểm ảnh của ảnh gốc.
"""
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HONG = np.array([255, 0, 255], np.float32)


def main():
    goc_p, sua_p, khung_s, ra_p = sys.argv[1:5]
    khung = [tuple(float(v) for v in k.split(',')) for k in khung_s.split(';')]
    goc_im = Image.open(goc_p).convert('RGBA')
    W, H = goc_im.size
    s = W / 768.0
    khung = [(cx * s, cy * s, w * s, h * s) for cx, cy, w, h in khung]
    goc = np.asarray(goc_im).astype(np.float32)
    alpha = goc[..., 3] / 255.0
    phang = goc[..., :3] * alpha[..., None] + HONG * (1 - alpha[..., None])
    sua = np.asarray(Image.open(sua_p).convert('RGB').resize((W, H), Image.LANCZOS)).astype(np.float32)

    # Khung chữ nhật chứa elip + lề để so vành.
    le = int(14 * s)
    x0 = int(min(cx - w / 2 for cx, _, w, _ in khung)) - le
    y0 = int(min(cy - h / 2 for _, cy, _, h in khung)) - le
    x1 = int(max(cx + w / 2 for cx, _, w, _ in khung)) + le
    y1 = int(max(cy + h / 2 for _, cy, _, h in khung)) + le
    mask_im = Image.new('L', (x1 - x0, y1 - y0), 0)
    ve = ImageDraw.Draw(mask_im)
    for cx, cy, w, h in khung:
        ve.ellipse([cx - w / 2 - x0, cy - h / 2 - y0, cx + w / 2 - x0, cy + h / 2 - y0], fill=255)
    mask_im = mask_im.filter(ImageFilter.GaussianBlur(6 * s))
    m = np.asarray(mask_im).astype(np.float32) / 255.0
    vanh = (m > 0.02) & (m < 0.6)

    ref = phang[y0:y1, x0:x1]
    best = (1e18, 0, 0)
    r = int(12 * s)
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            cand = sua[y0 + dy:y1 + dy, x0 + dx:x1 + dx]
            c = float((((cand - ref) ** 2).sum(-1))[vanh].mean())
            if c < best[0]:
                best = (c, dx, dy)
    _, dx, dy = best
    manh_rgb = sua[y0 + dy:y1 + dy, x0 + dx:x1 + dx].copy()
    manh_rgb -= (manh_rgb[vanh] - ref[vanh]).mean(0)

    out = np.zeros((y1 - y0, x1 - x0, 4), np.float32)
    out[..., :3] = manh_rgb
    out[..., 3] = m * alpha[y0:y1, x0:x1] * 255
    Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), 'RGBA').save(ra_p, quality=92)
    print(f'dx={dx} dy={dy} {{ x: {x0}, y: {y0}, w: {x1 - x0}, h: {y1 - y0} }} (anh goc {W}x{H})')


if __name__ == '__main__':
    main()
