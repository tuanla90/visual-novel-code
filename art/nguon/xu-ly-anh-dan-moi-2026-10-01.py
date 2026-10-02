"""Xử lý ảnh Topview của dàn nhân vật mới (art/nguon/topview-2026-10-01/g2/<id>.png) thành ảnh cho game, GHI ĐÈ đúng tệp cũ.

Chạy: python art/nguon/xu-ly-anh-dan-moi-2026-10-01.py [id …]   (không đối số = mọi ảnh trong thư mục nguồn; id có hay không có "g2-" đều được)

- g2-char-<…>   → chân dung PNG trong suốt 768×1360, ghi vào đúng chỗ tệp cùng tên đang nằm (assets/characters/ hoặc assets/mvp/nhan-vat/);
                  ảnh Duy được phóng 1,10 lần quanh đỉnh đầu như ảnh neo đã căn (can-khung-2026-10-01.py) để cỡ người khớp cả dàn.
- g2-chibi-<…>  → assets/mvp/chibi/<…>.webp (tách nền, cắt sát, cạnh dài 640)
- g2-intro-<…>  → assets/art/<…>.webp (1360×768)
- g2-cg-<…>     → assets/mvp/cg/<…>.webp (1360×768)
- g2-bg-<…>     → assets/mvp/nen/<…>.webp (1360×768)
- g2-doc-<…>    → assets/mvp/giay/<…>.webp (880×1184, ảnh thẻ hồ sơ)
- g2-obj-<…>    → assets/mvp/vat/<…>.webp (tách nền, cắt sát, cạnh dài 900)
Tách nền hồng tím và các hàm cắt dùng lại từ xu-ly-anh-2026-09-30.py.
"""
import importlib.util
import sys
from pathlib import Path

import numpy as np
from PIL import Image

GOC = Path(__file__).resolve().parents[2]
NGUON = GOC / 'art/nguon/topview-2026-10-01/g2'
A = GOC / 'prototype/src/assets'

_spec = importlib.util.spec_from_file_location('xu_ly_cu', Path(__file__).with_name('xu-ly-anh-2026-09-30.py'))
cu = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cu)

# Ảnh Duy: cùng phép phóng với ảnh neo đã căn (tỉ lệ đầu 0,205 → 0,225; đỉnh tóc cách mép trên 4%; căn giữa theo đầu).
NEO_DUY = GOC / 'art/nguon/topview-2026-10-01/char-duy-v2-anchor-l3.png'


def phep_can_duy():
    im = Image.open(NEO_DUY).convert('RGB')
    W, H = im.size
    a = np.asarray(im).astype(int)
    khac = np.abs(a - a[5, 5]).sum(axis=2) > 40
    tren = int(np.argmax(khac.any(axis=1)))
    cot = np.where(khac[tren:tren + int(H * 0.205)].any(axis=0))[0]
    cx = (cot[0] + cot[-1]) / 2
    s = 0.225 / 0.205
    return s, W / 2 - cx * s, H * 0.04 - tren * s


def can_duy(im: Image.Image) -> Image.Image:
    s, dx, dy = phep_can_duy()
    W, H = im.size
    to = im.resize((round(W * s), round(H * s)), Image.LANCZOS)
    khung = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    khung.paste(to, (round(dx * W / 768), round(dy * H / 1360)))
    return khung


def dich_chan_dung(ten: str) -> Path:
    for thu_muc in ('characters', 'mvp/nhan-vat'):
        p = A / thu_muc / f'{ten}.png'
        if p.exists():
            return p
    return A / 'mvp/nhan-vat' / f'{ten}.png'


def xu_ly(f: Path) -> str:
    ten = f.stem.removeprefix('g2-')
    if '--' in ten:  # khung nhép môi / chớp mắt: để cat-mieng-mat-dan-moi-2026-10-01.py xử lý
        return f'bỏ qua {ten}'
    im = Image.open(f)
    if ten.startswith('char-'):
        ra = cu.tach_hong_tim(im).resize((768, 1360), Image.LANCZOS)
        if ten.startswith('char-duy'):
            ra = can_duy(ra)
        dich = dich_chan_dung(ten)
        ra.save(dich, optimize=True)
    elif ten.startswith('chibi-'):
        dich = A / 'mvp/chibi' / f'{ten}.webp'
        cu.thu_nho(cu.cat_sat(cu.tach_hong_tim(im), 12), 640).save(dich, quality=90)
    elif ten.startswith('obj-'):
        dich = A / 'mvp/vat' / f'{ten}.webp'
        cu.thu_nho(cu.cat_sat(cu.tach_hong_tim(im)), 900).save(dich, quality=90)
    elif ten.startswith('intro-'):
        dich = A / 'art' / f'{ten}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    elif ten.startswith('cg-'):
        dich = A / 'mvp/cg' / f'{ten}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    elif ten.startswith('doc-'):
        dich = A / 'mvp/giay' / f'{ten}.webp'
        im.convert('RGB').resize((880, 1184), Image.LANCZOS).save(dich, quality=88)
    elif ten.startswith('bgvn-'):  # nền cũ thêm chi tiết Việt Nam (02/10): ghi đè bg-mvp-<cảnh>
        dich = A / 'mvp/nen' / f"bg-mvp-{ten.removeprefix('bgvn-')}.webp"
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    elif ten.startswith('bg-'):
        dich = A / 'mvp/nen' / f'{ten}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(dich, quality=88)
    else:
        return f'bỏ qua {ten}'
    return f'{ten} → {dich.relative_to(GOC)}'


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ids = [i if i.startswith('g2-') else 'g2-' + i for i in sys.argv[1:]]
    tep = [NGUON / f'{i}.png' for i in ids] if ids else sorted(NGUON.glob('*.png'))
    for f in tep:
        print(xu_ly(f))


if __name__ == '__main__':
    main()
