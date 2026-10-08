"""Ảnh Topview gói B19 (Vụ 1 bản 6) → ảnh trong game.

Chạy: python art/nguon/xu-ly-anh-b19-2026-10-08.py [mã nguồn …]   (không đối số = mọi mục trong BANG có tệp nguồn)

Nguồn: art/nguon/topview-2026-10-08/<mã>.webp (ảnh Topview Credit Mode 2K, lưu webp q92 cho nhẹ; bản PNG gốc còn trên bảng Topview).
'-ghep' là ảnh đã sửa tay: thêm chiếc bánh thứ tư (trung-thu-4banh-ghep), xóa chiếc bánh thứ tư (trung-thu-nguoi-ghep), vì model vẽ sai số bánh.
Kiểu xử lý:
- bg    → assets/mvp/nen/<đích>.webp, 2048×1152 (nền mùa 1 vẽ 2K cho nét)
- cg    → assets/mvp/cg/<đích>.webp, 1360×768
- doc   → assets/mvp/giay/<đích>.webp, giữ tỉ lệ, cạnh dài 1184
- char  → assets/mvp/nhan-vat/<đích>.webp, tách nền hồng tím, 768×1360 (ảnh sửa từ chân dung cũ nên khung giữ nguyên)
- dau   → assets/mvp/giao-dien/<đích>.webp, tách nền trắng, cắt sát, cạnh dài 512
Tách nền dùng lại xu-ly-anh-2026-09-30.py.
"""
import importlib.util
import sys
from pathlib import Path

import numpy as np
from PIL import Image

GOC = Path(__file__).resolve().parents[2]
NGUON = GOC / 'art/nguon/topview-2026-10-08'
A = GOC / 'prototype/src/assets/mvp'

_spec = importlib.util.spec_from_file_location('xu_ly_cu', Path(__file__).with_name('xu-ly-anh-2026-09-30.py'))
cu = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cu)

# Chiều cao (px trên khung 768×1360) của nhân vật trẻ con vẽ cả người.
CAO_TRE_EM = {'char-be-na': 800}

# mã nguồn → (kiểu, tên đích)
BANG = {
    'trung-thu-4banh-ghep': ('bg', 'bg-mvp-san-ktx-trung-thu'),
    'trung-thu-4banh-b': ('bg', 'bg-mvp-san-ktx-trung-thu-ba-banh'),
    'cong-bong-mo-4': ('bg', 'bg-mvp-cong-ktx-bong-mo'),
    'phong-clb-dem-banh-mi-3': ('bg', 'bg-mvp-phong-clb-dem-banh-mi'),
    'khanh-ban-to-chuc': ('char', 'char-khanh-ban-to-chuc'),
    'char-tung-om-to-roi-2': ('char', 'char-tung-om-to-roi'),
    'char-duy-dan-chia-khoa-2': ('char', 'char-duy-dan-chia-khoa'),
    'char-be-na-2': ('char', 'char-be-na'),
    'phong-408': ('cg', 'cg-phong-408'),
    'ban-clb-vang-2': ('cg', 'cg-ban-clb-vang'),
    'phieu-trang-2': ('cg', 'cg-phieu-trang'),
    'thu-kien-nghi': ('doc', 'doc-thu-kien-nghi'),
    'phieu-gui-hoai-2': ('doc', 'doc-phieu-gui-hoai'),
    'so-thu-hop-2': ('doc', 'doc-so-thu-hop'),
    'the-lich-rach-2': ('doc', 'doc-the-lich-rach'),
    'nam-ghe-2': ('cg', 'cg-nam-ghe'),
    'so-ha-vy-gio': ('cg', 'cg-so-ha-vy-gio'),
    'bang-the-trang-2': ('cg', 'cg-bang-the-trang'),
    'so-tong-ket-2': ('cg', 'cg-so-tong-ket'),
    'dau-a': ('dau', 'dau-rank-a'),
    'dau-b': ('dau', 'dau-rank-b'),
    'dau-c': ('dau', 'dau-rank-c'),
}


def tach_muc_do(im: Image.Image) -> Image.Image:
    """Dấu mực đỏ trên giấy trắng → giữ màu đỏ, độ trong theo độ 'đỏ' (khoảng cách tới trắng)."""
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    dam = 255.0 - np.minimum(a[..., 1], a[..., 2])  # giấy trắng ~0, mực đỏ cao
    alpha = np.clip((dam - 25.0) / (150.0 - 25.0), 0, 1) * 255
    out = np.zeros((*a.shape[:2], 4), np.uint8)
    out[..., 0] = 200
    out[..., 1] = 28
    out[..., 2] = 36
    out[..., 3] = alpha.astype(np.uint8)
    return Image.fromarray(out, 'RGBA')


def xu_ly(ma: str) -> str:
    kieu, dich = BANG[ma]
    nguon = NGUON / f'{ma}.png'
    im = Image.open(nguon if nguon.exists() else nguon.with_suffix('.webp'))
    if kieu == 'bg':
        ra = A / 'nen' / f'{dich}.webp'
        im.convert('RGB').resize((2048, 1152), Image.LANCZOS).save(ra, quality=86)
    elif kieu == 'cg':
        ra = A / 'cg' / f'{dich}.webp'
        im.convert('RGB').resize((1360, 768), Image.LANCZOS).save(ra, quality=88)
    elif kieu == 'doc':
        ra = A / 'giay' / f'{dich}.webp'
        im = im.convert('RGB')
        im.thumbnail((1184, 1184), Image.LANCZOS)
        im.save(ra, quality=88)
    elif kieu == 'char':
        ra = A / 'nhan-vat' / f'{dich}.webp'
        trong = cu.tach_hong_tim(im.convert('RGB'))
        w, h = trong.size
        nho = trong.resize((768, round(h * 768 / w)), Image.LANCZOS)
        khung = Image.new('RGBA', (768, 1360), (0, 0, 0, 0))
        if dich in CAO_TRE_EM:
            # Trẻ con vẽ cả người: thu nhỏ cho chiều cao bằng CAO_TRE_EM[dich] px, chân chạm đáy khung, căn giữa,
            # để đứng trên dàn cạnh người lớn (khung người lớn chỉ tới đùi) không cao bằng họ.
            hop = cu.cat_sat(trong, 0)
            k = CAO_TRE_EM[dich] / hop.height
            hop = hop.resize((round(hop.width * k), CAO_TRE_EM[dich]), Image.LANCZOS)
            khung.paste(hop, ((768 - hop.width) // 2, 1360 - hop.height), hop)
        else:
            khung.paste(nho, (0, 0))
        khung.save(ra, quality=90)
    elif kieu == 'dau':
        ra = A / 'giao-dien' / f'{dich}.webp'
        cu.thu_nho(cu.cat_sat(tach_muc_do(im), 8), 512).save(ra, quality=90)
    else:
        raise ValueError(kieu)
    return str(ra.relative_to(GOC))


def main():
    mas = sys.argv[1:] or [m for m in BANG if (NGUON / f'{m}.png').exists() or (NGUON / f'{m}.webp').exists()]
    for m in mas:
        print(m, '→', xu_ly(m))


if __name__ == '__main__':
    main()
