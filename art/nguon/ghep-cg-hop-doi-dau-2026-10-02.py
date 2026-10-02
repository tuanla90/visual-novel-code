"""Ghép CG `cg-hop-doi-dau` (nhại khung JoJo: DIO – Jotaro) từ ba lớp sinh riêng, 02/10/2026.

Sửa cả khung một lượt thì mô hình tự vẽ lại dáng (Quân chúi về trước, chân nhân vật chính sai), nên mỗi người được sửa
riêng trên hình cắt lớn từ khung truyện gốc (chỉ đổi người và quần áo, nền hồng tím), nền làm riêng, rồi ghép ở đây theo
bố cục khung gốc: Quân lớn ở trái, tràn mép dưới; nhân vật chính nhỏ hơn ở phải; hào quang xanh quanh Quân.

Vào: art/nguon/topview-2026-10-01/jojo/g2-jj-quan-l2.png, g2-jj-nvc-l3.png (tham số 1 đổi tên lớp nhân vật chính), g2-jj-nen.png
Ra:  art/nguon/topview-2026-10-01/g2/g2-cg-hop-doi-dau.png (1360×768)
Chạy: python art/nguon/ghep-cg-hop-doi-dau-2026-10-02.py [tên lớp nhân vật chính]
"""
import importlib.util
import sys
from pathlib import Path

from PIL import Image, ImageFilter

GOC = Path(__file__).resolve().parents[2]
J = GOC / 'art/nguon/topview-2026-10-01/jojo'
_s = importlib.util.spec_from_file_location('xu_ly_cu', Path(__file__).with_name('xu-ly-anh-2026-09-30.py'))
xl = importlib.util.module_from_spec(_s)
_s.loader.exec_module(xl)

W, H = 1360, 768


def nguoi(ten: str) -> Image.Image:
    """Tách nền hồng tím, cắt sát người."""
    im = xl.tach_hong_tim(Image.open(J / f'{ten}.png'))
    return im.crop(im.getbbox())


def dat(nen: Image.Image, lop: Image.Image, cao: int, x_giua: float, y_dinh: float) -> None:
    """Đặt `lop` cao `cao` px, tâm ngang ở `x_giua` (tỉ lệ khung), đỉnh ở `y_dinh` (tỉ lệ khung)."""
    k = cao / lop.height
    lop = lop.resize((round(lop.width * k), cao), Image.LANCZOS)
    nen.alpha_composite(lop, (round(W * x_giua - lop.width / 2), round(H * y_dinh)))


def hao_quang(lop: Image.Image, cao: int, x_giua: float, y_dinh: float) -> Image.Image:
    """Lớp hào quang xanh: bóng của người, nở ra và làm nhòe."""
    k = cao / lop.height
    nho = lop.resize((round(lop.width * k), cao), Image.LANCZOS)
    khung = Image.new('L', (W, H), 0)
    khung.paste(nho.getchannel('A'), (round(W * x_giua - nho.width / 2), round(H * y_dinh)))
    ra = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    for ban_kinh, mau, do in ((34, (40, 190, 255), 150), (16, (120, 235, 255), 210), (5, (225, 250, 255), 235)):
        m = khung.filter(ImageFilter.MaxFilter(ban_kinh | 1)).filter(ImageFilter.GaussianBlur(ban_kinh * 0.55))
        ra.alpha_composite(Image.merge('RGBA', (*[Image.new('L', (W, H), c) for c in mau], m.point(lambda v: v * do // 255))))
    return ra


def main(ten_nvc: str) -> None:
    nen = Image.open(J / 'g2-jj-nen.png').convert('RGBA').resize((W, H), Image.LANCZOS)
    quan, nvc = nguoi('g2-jj-quan-l2'), nguoi(ten_nvc)
    # Bố cục khung gốc: người tiền cảnh chiếm nửa trái, đầu sát mép trên, chân tràn mép dưới; người kia ở 1/3 phải.
    q = dict(cao=round(H * 1.0), x_giua=0.335, y_dinh=0.0)
    nen.alpha_composite(hao_quang(quan, **q))
    dat(nen, nvc, cao=round(H * 0.68), x_giua=0.82, y_dinh=0.16)
    dat(nen, quan, **q)
    ra = GOC / 'art/nguon/topview-2026-10-01/g2/g2-cg-hop-doi-dau.png'
    nen.convert('RGB').save(ra, optimize=True)
    print(ra)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'g2-jj-nvc-l3')
