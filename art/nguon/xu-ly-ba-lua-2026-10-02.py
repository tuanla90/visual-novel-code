"""Bà Lụa (bán trà đá) vẽ lại 02/10/2026 theo góp ý: già thật, thấp, lưng còng. Tách nền hồng tím rồi ghi chân dung
vào thư mục ảnh của một bản làm việc (mặc định: bản này). Chạy: python art/nguon/xu-ly-ba-lua-2026-10-02.py [thư mục gốc repo đích]"""
import importlib.util
import sys
from pathlib import Path

from PIL import Image

GOC = Path(__file__).resolve().parents[2]
_s = importlib.util.spec_from_file_location('xu_ly_cu', Path(__file__).with_name('xu-ly-anh-2026-09-30.py'))
xl = importlib.util.module_from_spec(_s)
_s.loader.exec_module(xl)
dich = Path(sys.argv[1]) if len(sys.argv) > 1 else GOC
for ten in ('char-ba-lua', 'char-ba-lua-smile'):
    f = GOC / f'art/nguon/topview-2026-10-01/g2/g2-{ten}.png'
    if not f.exists():
        print('chua co', f.name)
        continue
    ra = dich / f'prototype/src/assets/mvp/nhan-vat/{ten}.png'
    xl.tach_hong_tim(Image.open(f)).resize((768, 1360), Image.LANCZOS).save(ra, optimize=True)
    print(ra)
