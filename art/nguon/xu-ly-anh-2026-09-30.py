"""Xử lý ảnh Topview đợt 30/09 (art/nguon/topview-2026-09-30/<id>.png) thành ảnh cho game.

Chạy: python art/nguon/xu-ly-anh-2026-09-30.py [id …]   (không đối số = mọi ảnh trong thư mục nguồn)

- intro-*            → prototype/src/assets/art/intro-*.webp (1360×768, như 5 ảnh giới thiệu cũ)
- char-<nv>-<bc>     → prototype/src/assets/mvp/nhan-vat/char-<nv>-<bc>.png (tách nền hồng tím, giữ khung 768×1360)
- chibi-*            → prototype/src/assets/mvp/chibi/chibi-*.webp (tách nền, cắt sát, cạnh dài 640)
- obj-*              → prototype/src/assets/mvp/vat/obj-*.webp (tách nền, cắt sát)
- bg-*               → prototype/src/assets/mvp/nen/bg-*.webp
- doc-*              → art/mvp-vu1/giay/doc-*.webp (+ doc-chu-ky-h: nền trắng → trong suốt)
- cg-*               → prototype/src/assets/mvp/cg/cg-*.webp
Ảnh "<id>~2" (lượt sinh thứ hai) bị bỏ qua trừ khi gọi đích danh; chọn bản nào thì đổi tên tệp nguồn.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

GOC = Path(__file__).resolve().parents[2]
NGUON = GOC / 'art/nguon/topview-2026-09-30'
A = GOC / 'prototype/src/assets'


def tach_hong_tim(im: Image.Image) -> Image.Image:
    """Nền #FF00FF phẳng → trong suốt; viền mềm và khử ánh hồng ở mép."""
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    hong = np.minimum(r, b) - g  # 255 ở nền, ~0 trên da/áo
    alpha = 1.0 - np.clip((hong - 70.0) / (170.0 - 70.0), 0.0, 1.0)
    # khử ánh hồng: điểm còn "hồng" thì kéo r, b về phía g theo mức hồng
    tru = np.clip(hong, 0, None) * np.clip((hong - 25.0) / 60.0, 0.0, 1.0)
    r2 = np.clip(r - tru, 0, 255)
    b2 = np.clip(b - tru, 0, 255)
    out = np.dstack([r2, g, b2, alpha * 255.0]).astype(np.uint8)
    # bỏ đốm lẻ: điểm gần như trong suốt thì cho hẳn 0
    out[..., 3][out[..., 3] < 8] = 0
    return Image.fromarray(out, 'RGBA')


def tach_nen_trang(im: Image.Image) -> Image.Image:
    """Nét mực trên giấy trắng → mực đen, độ trong theo độ tối."""
    x = np.asarray(im.convert('L')).astype(np.float32)
    alpha = np.clip((235.0 - x) / (235.0 - 60.0), 0, 1) * 255
    out = np.zeros((*x.shape, 4), np.uint8)
    out[..., 0:3] = 20
    out[..., 3] = alpha.astype(np.uint8)
    return Image.fromarray(out, 'RGBA')


def cat_sat(im: Image.Image, le: int = 8) -> Image.Image:
    bbox = im.getchannel('A').point(lambda v: 255 if v > 16 else 0).getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    return im.crop((max(0, x0 - le), max(0, y0 - le), min(im.width, x1 + le), min(im.height, y1 + le)))


def thu_nho(im: Image.Image, canh: int) -> Image.Image:
    s = canh / max(im.size)
    return im if s >= 1 else im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)


def xu_ly(f: Path) -> str:
    id_ = f.stem
    im = Image.open(f)
    if id_.startswith('intro-'):
        dich = A / 'art' / f'{id_}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    elif id_.startswith('char-'):
        dich = A / 'mvp/nhan-vat' / f'{id_}.png'
        tach_hong_tim(im).resize((768, 1360), Image.LANCZOS).save(dich, optimize=True)
    elif id_.startswith('chibi-'):
        dich = A / 'mvp/chibi' / f'{id_}.webp'
        thu_nho(cat_sat(tach_hong_tim(im), 12), 640).save(dich, quality=90)
    elif id_.startswith('obj-'):
        dich = A / 'mvp/vat' / f'{id_}.webp'
        thu_nho(cat_sat(tach_hong_tim(im)), 900).save(dich, quality=90)
    elif id_.startswith('bg-'):
        dich = A / 'mvp/nen' / f'{id_}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    elif id_ == 'doc-chu-ky-h':
        dich = GOC / 'art/mvp-vu1/giay' / f'{id_}.png'
        cat_sat(tach_nen_trang(im), 16).save(dich, optimize=True)
    elif id_.startswith('doc-'):
        dich = GOC / 'art/mvp-vu1/giay' / f'{id_}.webp'
        im.convert('RGB').save(dich, quality=88)
    elif id_.startswith('cg-'):
        dich = A / 'mvp/cg' / f'{id_}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    else:
        return f'bỏ qua {id_}'
    return f'{id_} → {dich.relative_to(GOC)}'


def main():
    for d in ('mvp/chibi', 'mvp/cg'):
        (A / d).mkdir(parents=True, exist_ok=True)
    ids = sys.argv[1:]
    tep = [NGUON / f'{i}.png' for i in ids] if ids else sorted(p for p in NGUON.glob('*.png') if '~' not in p.stem)
    for f in tep:
        print(xu_ly(f))


if __name__ == '__main__':
    main()
