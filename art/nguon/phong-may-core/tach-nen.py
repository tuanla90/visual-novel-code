"""Tách nền magenta (#FF00FF) của ảnh sinh từ Topview thành PNG trong suốt.

Chạy: python tach-nen.py  (đọc raw/, ghi ra thư mục hiện tại)
- Khóa màu mềm: pixel càng gần magenta càng trong suốt; khử viền hồng ở mép.
- Cắt sát vùng có hình; giấy nhớ tách thành 5 tệp theo từng mảng liền.
- Màn hình: ghi tọa độ mặt kính (vùng teal tối) ra man-hinh-mat-kinh.json để game lồng giao diện HTML đúng chỗ.
"""
import json, os
import numpy as np
from PIL import Image
from scipy import ndimage

RAW = os.path.join(os.path.dirname(__file__), 'raw')
OUT = os.path.dirname(__file__)
TEN = {  # mã Topview -> tên tệp
    '316ded21': 'bg-phong-may-core-ngay',
    'add56027': 'desk-phong-may-ngay',
    'bb079c23': 'obj-ban-phim',
    'b68da490': 'obj-man-hinh',
    '121ba39a': 'obj-so-chi-linh',
    '0db840f0': 'obj-ho-so-vu',
    '3e92c2cf': 'obj-den-ban',
    '859b9f3b': 'obj-giay-nho',
}


def khoa_magenta(im):
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    # "độ magenta": đỏ và lam cao, lục thấp
    m = np.clip((np.minimum(r, b) - g) / 255.0, 0, 1)
    alpha = np.clip((0.55 - m) / (0.55 - 0.25), 0, 1)  # m >= .55 -> trong suốt, m <= .25 -> đặc
    # khử viền hồng: kéo r, b về phía g theo mức magenta còn sót
    spill = np.clip(m / 0.55, 0, 1)[..., None]
    rgb = a.copy()
    lo = np.minimum(rgb[..., 0], rgb[..., 2])
    for c in (0, 2):
        rgb[..., c] = rgb[..., c] - spill[..., 0] * np.maximum(0, lo - g)
    out = np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')


def cat_sat(im, le=8):
    bb = im.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
    if not bb:
        return im
    x0, y0, x1, y1 = bb
    return im.crop((max(0, x0 - le), max(0, y0 - le), min(im.width, x1 + le), min(im.height, y1 + le)))


def main():
    for ma, ten in TEN.items():
        src = os.path.join(RAW, ma + '.png')
        if not os.path.exists(src):
            print('thiếu', ma, ten)
            continue
        im = Image.open(src)
        if ten.startswith('bg-'):
            im.convert('RGB').save(os.path.join(OUT, ten + '.png'))
            print('nền', ten, im.size)
            continue
        k = khoa_magenta(im)
        if ten.startswith('desk-'):
            k.save(os.path.join(OUT, ten + '.png'))  # giữ nguyên khung 16:9 để ghép thẳng lên nền
            print('bàn', ten, k.size)
            continue
        if ten == 'obj-giay-nho':
            A = np.asarray(k.getchannel('A')) > 40
            nhan, n = ndimage.label(A)
            vung = sorted(ndimage.find_objects(nhan), key=lambda s: s[1].start)
            vung = [s for s in vung if (s[0].stop - s[0].start) * (s[1].stop - s[1].start) > 2000]
            for i, s in enumerate(vung, 1):
                o = cat_sat(k.crop((s[1].start, s[0].start, s[1].stop, s[0].stop)))
                o.save(os.path.join(OUT, f'obj-giay-nho-{i}.png'))
            print('giấy nhớ', len(vung), 'tờ')
            continue
        o = cat_sat(k)
        o.save(os.path.join(OUT, ten + '.png'))
        print('vật', ten, o.size)
        if ten == 'obj-man-hinh':
            a = np.asarray(o.convert('RGB')).astype(int)
            # mặt kính: teal tối, phẳng
            mat = (a[..., 1] > a[..., 0] + 8) & (a[..., 2] > a[..., 0]) & (a.sum(-1) < 300)
            nhan, n = ndimage.label(mat)
            lon = max(range(1, n + 1), key=lambda i: (nhan == i).sum())
            ys, xs = np.where(nhan == lon)
            info = {'anh': [o.width, o.height], 'mat_kinh': {'x': int(xs.min()), 'y': int(ys.min()),
                    'w': int(xs.max() - xs.min() + 1), 'h': int(ys.max() - ys.min() + 1)}}
            json.dump(info, open(os.path.join(OUT, 'man-hinh-mat-kinh.json'), 'w'), indent=2)
            print('mặt kính', info)


if __name__ == '__main__':
    main()
