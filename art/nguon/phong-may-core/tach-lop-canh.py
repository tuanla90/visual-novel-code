"""Tách lớp cho màn phòng máy theo phương án "ảnh cảnh đầy đủ" (29/09).

Ảnh nền là một ảnh cảnh hoàn chỉnh; vật bấm được (sổ, hồ sơ) KHÔNG vẽ lại mà lấy mặt nạ:
Topview sửa chính ảnh cảnh thành "giữ nguyên vật, còn lại magenta" -> lọc magenta ra mặt nạ -> dò độ lệch
(nếu ảnh sửa bị xê dịch vài điểm ảnh) -> áp mặt nạ lên CHÍNH ảnh cảnh. Hình vật khi rê chuột trùng khít với nền.

Chạy:  python tach-lop-canh.py
Đầu vào (raw/):  nen-sach-1-c9eac7a5.png (cảnh ngày), dem-*.png (cảnh đêm, nếu có), tach-so-*.png, tach-ho-so-*.png,
                 giay-nho-b5e10811.png (10 giấy nhớ trắng trên nền magenta)
Đầu ra (canh/):  phong-may-ngay.png, phong-may-dem.png, obj-so.png, obj-ho-so.png (cùng khung với cảnh, nền trong suốt),
                 giay-nho-01..10.png, lop.json (tọa độ mặt kính, khung bao từng vật, tính theo % khung cảnh)
"""
import glob, json, os
import numpy as np
from PIL import Image
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, 'raw')
OUT = os.path.join(HERE, 'canh')
os.makedirs(OUT, exist_ok=True)

# Phóng to cảnh: cắt bớt vòng ngoài (khung gốc 1360x768) cho màn hình chiếm nhiều diện tích hơn, rồi đưa về khung game
# 1600x900. Mép trái/phải giữ vừa đủ nhãn trắng trên sổ và hồ sơ; tỉ lệ vẫn 16:9. Mọi tọa độ ra (lop.json) theo khung 1600x900.
CAT = (48, 14, 1276, 705)
KHUNG = (1600, 900)


def phong(im):
    return im.crop(CAT).resize(KHUNG, Image.LANCZOS)


def mot(pattern):
    f = sorted(glob.glob(os.path.join(RAW, pattern)))
    return f[-1] if f else None


def do_magenta(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return np.clip((np.minimum(r, b) - g) / 255.0, 0, 1)


def khoa_magenta(im):
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    m = do_magenta(a)
    alpha = np.clip((0.55 - m) / 0.30, 0, 1)
    rgb = a.copy()
    lo = np.minimum(rgb[..., 0], rgb[..., 2])
    spill = np.clip(m / 0.55, 0, 1)
    for c in (0, 2):
        rgb[..., c] -= spill * np.maximum(0, lo - a[..., 1])
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8), 'RGBA')


def cat_sat(im, le=6):
    bb = im.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
    if not bb:
        return im
    x0, y0, x1, y1 = bb
    return im.crop((max(0, x0 - le), max(0, y0 - le), min(im.width, x1 + le), min(im.height, y1 + le)))


def mat_kinh(canh):
    """Mặt kính: vùng liền lớn nhất màu teal tối."""
    a = np.asarray(canh.convert('RGB')).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mask = (b > r + 15) & (g > r + 5) & (a.sum(-1) < 260)
    mask = ndimage.binary_opening(mask, iterations=2)
    nhan, n = ndimage.label(mask)
    lon = max(range(1, n + 1), key=lambda i: (nhan == i).sum())
    ys, xs = np.where(nhan == lon)
    # lấy khung trong (bỏ 1% mép để không đè viền)
    x0, x1 = np.percentile(xs, [0.5, 99.5]).astype(int)
    y0, y1 = np.percentile(ys, [0.5, 99.5]).astype(int)
    return int(x0), int(y0), int(x1 - x0 + 1), int(y1 - y0 + 1)


def mat_na_vat(canh, tach_path):
    """Mặt nạ vật từ ảnh 'tách' (vật + magenta), căn theo ảnh cảnh."""
    t = Image.open(tach_path).convert('RGB').resize(canh.size, Image.LANCZOS)
    ta = np.asarray(t).astype(np.float32)
    alpha = np.clip((0.55 - do_magenta(ta)) / 0.30, 0, 1)
    ca = np.asarray(canh.convert('RGB')).astype(np.float32)
    # dò độ lệch nhỏ (±12 px) để phần vật trong ảnh tách khớp ảnh cảnh
    ys, xs = np.where(alpha > 0.9)
    if len(xs) == 0:
        return None, (0, 0)
    sel = np.random.default_rng(0).choice(len(xs), min(6000, len(xs)), replace=False)
    ys, xs = ys[sel], xs[sel]
    best, bdx, bdy = 1e18, 0, 0
    H, W = alpha.shape
    for dy in range(-12, 13, 2):
        for dx in range(-12, 13, 2):
            y2, x2 = np.clip(ys + dy, 0, H - 1), np.clip(xs + dx, 0, W - 1)
            d = np.abs(ta[ys, xs] - ca[y2, x2]).mean()
            if d < best:
                best, bdx, bdy = d, dx, dy
    a2 = ndimage.shift(alpha, (bdy, bdx), order=0, mode='constant')
    # làm sạch: giữ mảng liền lớn nhất, lấp lỗ, mép mềm 1 px
    bin_ = a2 > 0.5
    nhan, n = ndimage.label(bin_)
    if n:
        lon = max(range(1, n + 1), key=lambda i: (nhan == i).sum())
        bin_ = ndimage.binary_fill_holes(nhan == lon)
    soft = ndimage.gaussian_filter(bin_.astype(np.float32), 0.8)
    out = np.dstack([ca, soft * 255]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA'), (bdx, bdy)


def main():
    info = {}
    ngay = mot('de-1-*.png') or mot('nen-sach-1-*.png')
    canh = phong(Image.open(ngay).convert('RGB'))
    W, H = canh.size
    canh.save(os.path.join(OUT, 'phong-may-ngay.png'))
    info['khung'] = [W, H]
    info['cat_tu_goc'] = list(CAT)
    x, y, w, h = mat_kinh(canh)
    info['mat_kinh'] = {'x': x, 'y': y, 'w': w, 'h': h,
                        'pct': [round(x / W * 100, 2), round(y / H * 100, 2), round(w / W * 100, 2), round(h / H * 100, 2)]}
    print('mat kinh', info['mat_kinh'])

    dem = mot('dem-*.png')
    if dem:
        phong(Image.open(dem).convert('RGB').resize((1360, 768), Image.LANCZOS)).save(os.path.join(OUT, 'phong-may-dem.png'))
        print('dem', os.path.basename(dem))

    for ten, pat in (('obj-so', 'tach-so-*.png'), ('obj-ho-so', 'tach-ho-so-*.png')):
        p = mot(pat)
        if not p:
            print('chua co', ten)
            continue
        im, lech = mat_na_vat(canh, p)
        if im is None:
            print('mat na rong', ten)
            continue
        im.save(os.path.join(OUT, ten + '.png'))
        bb = im.getchannel('A').point(lambda v: 255 if v > 60 else 0).getbbox()
        info[ten] = {'bbox': list(bb), 'lech_da_sua': list(lech),
                     'pct': [round(bb[0] / W * 100, 2), round(bb[1] / H * 100, 2), round((bb[2] - bb[0]) / W * 100, 2), round((bb[3] - bb[1]) / H * 100, 2)]}
        print(ten, info[ten])

    gn = mot('giay-nho-*.png')
    if gn:
        k = khoa_magenta(Image.open(gn))
        A = np.asarray(k.getchannel('A')) > 40
        nhan, n = ndimage.label(A)
        vung = [s for s in ndimage.find_objects(nhan) if (s[0].stop - s[0].start) * (s[1].stop - s[1].start) > 4000]
        vung.sort(key=lambda s: (round(s[0].start / 150), s[1].start))
        for i, s in enumerate(vung, 1):
            cat_sat(k.crop((s[1].start, s[0].start, s[1].stop, s[0].stop))).save(os.path.join(OUT, f'giay-nho-{i:02d}.png'))
        info['giay_nho'] = len(vung)
        print('giay nho', len(vung))

    json.dump(info, open(os.path.join(OUT, 'lop.json'), 'w'), indent=2)


if __name__ == '__main__':
    main()
