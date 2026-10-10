"""Ảnh Topview 10/10/2026 (nhân vật chính cố định Nguyễn Minh Khoa) → ảnh trong game.

Chạy: python art/nguon/xu-ly-anh-2026-10-10.py
- khoa-cam-giay.png (sửa từ char-nguoi-choi: tay trái cầm giấy báo nhập học) → nhan-vat/char-nguoi-choi-giay-bao.webp, tách nền hồng tím, 768×1360.
- giay-bao-trong.png (giấy báo vẽ bằng chữ, ô họ tên để trống) + chữ "NGUYỄN MINH KHOA" in bằng Arial Bold → giay/doc-giay-bao-nhap-hoc.webp
  (chèn chữ bằng PIL vì model vẽ chữ tiếng Việt sai; bản đã chèn: giay-bao-khoa.png).
"""
import importlib.util
from pathlib import Path
from PIL import Image

GOC = Path(__file__).resolve().parents[2]
NGUON = GOC / 'art/nguon/topview-2026-10-10'
A = GOC / 'prototype/src/assets/mvp'
_spec = importlib.util.spec_from_file_location('xu_ly_cu', Path(__file__).with_name('xu-ly-anh-2026-09-30.py'))
cu = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cu)

trong = cu.tach_hong_tim(Image.open(NGUON / 'khoa-cam-giay.webp').convert('RGB'))
w, h = trong.size
nho = trong.resize((768, round(h * 768 / w)), Image.LANCZOS)
khung = Image.new('RGBA', (768, 1360), (0, 0, 0, 0))
khung.paste(nho, (0, 0))
khung.save(A / 'nhan-vat/char-nguoi-choi-giay-bao.webp', quality=90)

g = Image.open(NGUON / 'giay-bao-khoa.webp').convert('RGB')
# Cắt nửa trên (dấu trường, tiêu đề, ô họ tên) thành khung ngang ~1,7: ảnh chèn ở màn ngang mà để cả tờ dọc thì chữ tên quá nhỏ.
k = g.width / 700
g = g.crop([int(v * k) for v in (70, 95, 634, 425)])
g.thumbnail((1360, 1360), Image.LANCZOS)
g.save(A / 'giay/doc-giay-bao-nhap-hoc.webp', quality=88)
print('xong')
