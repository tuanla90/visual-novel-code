"""Cắt miếng MIỆNG MỞ / MẮT NHẮM từ ảnh Topview sửa so với ảnh chân dung gốc (01/10/2026).

Vào: art/nguon/nhep-moi-2026-10-01/<ảnh>--mieng.png và <ảnh>--mat.png (ảnh ra của Topview, 9:16, nền xám),
      ảnh gốc theo bảng ANH (PNG trong suốt 768×1360).
Ra:  prototype/src/mvp/ui/nhep/<ảnh>/mouth.webp, eyes.webp (miếng đã căn về khung ảnh gốc, mép làm mềm),
      art/nguon/nhep-moi-2026-10-01/toa-do.json (tọa độ hộp) và kiem-<ảnh>.jpg (ảnh soát: gốc · ghép miệng · ghép mắt).

Cách: GPT image-edit vẽ lại CẢ ảnh, nét viền lệch 1–3px khắp nơi → so chênh lệch thô thì bắt cả tóc, cổ áo. Nên:
(1) co ảnh sửa về cỡ gốc, căn dịch nhỏ theo vùng đầu, khớp màu nhẹ; (2) chênh lệch làm mờ mạnh (σ≈6) cho nét mảnh
tan đi, chỉ vệt lớn (khoang miệng mở, mí mắt khép) còn lại; (3) tìm thành phần liên thông trong DẢI tìm (miệng: nửa
dưới mặt, giữa; mắt: dải mắt, lấy tới 2 thành phần lớn); (4) miếng = ảnh sửa cắt theo hộp bao + đệm, alpha = thành phần
nở ra rồi làm mờ, nhân alpha gốc — ngoài vệt đổi thì alpha 0, nên nét tóc/cổ áo lệch không lọt vào miếng.

Chạy: python art/nguon/cat-mieng-mat.py [tên ảnh …]   (không tham số = tất cả).
"""
import json
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

GOC = Path(__file__).resolve().parents[2]
VAO = GOC / 'art/nguon/nhep-moi-2026-10-01'
RA = GOC / 'prototype/src/mvp/ui/nhep'

C = 'prototype/src/assets/characters/'
M = 'prototype/src/assets/mvp/nhan-vat/'
ANH = {
    'char-tung-anchor': C + 'char-tung-anchor.png',
    'char-tung-happy': M + 'char-tung-happy.png',
    'char-tung-worried': M + 'char-tung-worried.png',
    'char-tung-surprised': M + 'char-tung-surprised.png',
    'char-tung-thinking': M + 'char-tung-thinking.png',
    'char-tung-gai-dau': M + 'char-tung-gai-dau.png',
    'char-tung-chi-tay': M + 'char-tung-chi-tay.png',
    'char-ha-vy-day-kinh': M + 'char-ha-vy-day-kinh.png',
    'char-ha-vy-thinking': C + 'char-ha-vy-thinking.png',
    'char-minh-anh-khoanh-tay': M + 'char-minh-anh-khoanh-tay.png',
    'char-minh-anh-serious': M + 'char-minh-anh-serious.png',
    'char-quan-chi-man': M + 'char-quan-chi-man.png',
    'char-nguoi-choi': M + 'char-nguoi-choi.png',
}


def nap(p: Path) -> Image.Image:
    return Image.open(p).convert('RGBA')


def vung_dau(alpha: np.ndarray) -> tuple[int, int, int, int]:
    """Hộp bao phần đầu: từ đỉnh alpha xuống ~36% chiều cao thân hình."""
    ys = np.nonzero((alpha > 128).any(axis=1))[0]
    y0, y1 = int(ys.min()), int(ys.max())
    yd = y0 + int((y1 - y0) * 0.36)
    xs = np.nonzero((alpha[y0:yd] > 128).any(axis=0))[0]
    return int(xs.min()), y0, int(xs.max()), yd


def can_dich(goc: np.ndarray, sua: np.ndarray, hop: tuple[int, int, int, int], toi_da: int = 12) -> tuple[int, int]:
    x0, y0, x1, y1 = hop
    g = goc[y0:y1, x0:x1, :3].astype(np.float32).mean(axis=2)[::2, ::2]
    H, W = goc.shape[:2]
    best, tot = (0, 0), None
    for dy in range(-toi_da, toi_da + 1, 2):
        for dx in range(-toi_da, toi_da + 1, 2):
            if y0 + dy < 0 or x0 + dx < 0 or y1 + dy > H or x1 + dx > W:
                continue
            s = sua[y0 + dy:y1 + dy, x0 + dx:x1 + dx, :3].astype(np.float32).mean(axis=2)[::2, ::2]
            d = float(np.abs(g - s).mean())
            if tot is None or d < tot:
                tot, best = d, (dx, dy)
    return best


def dich(anh: np.ndarray, dx: int, dy: int) -> np.ndarray:
    ra = np.zeros_like(anh)
    H, W = anh.shape[:2]
    ys0, ys1 = max(0, -dy), min(H, H - dy)
    xs0, xs1 = max(0, -dx), min(W, W - dx)
    ra[ys0:ys1, xs0:xs1] = anh[ys0 + dy:ys1 + dy, xs0 + dx:xs1 + dx]
    return ra


def thanh_phan(mask: np.ndarray) -> list[np.ndarray]:
    """Các thành phần liên thông (8 hướng), lớn → nhỏ."""
    H, W = mask.shape
    nhan = np.zeros((H, W), dtype=np.int32)
    ra = []
    k = 0
    for y, x in zip(*np.nonzero(mask)):
        if nhan[y, x]:
            continue
        k += 1
        q = deque([(y, x)])
        nhan[y, x] = k
        while q:
            cy, cx = q.popleft()
            for ny in (cy - 1, cy, cy + 1):
                for nx in (cx - 1, cx, cx + 1):
                    if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not nhan[ny, nx]:
                        nhan[ny, nx] = k
                        q.append((ny, nx))
        ra.append(nhan == k)
    ra.sort(key=lambda m: -int(m.sum()))
    return ra


def mo(a: np.ndarray, sigma: float) -> np.ndarray:
    return np.asarray(Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(sigma)), dtype=np.float32)


def cat(ten: str, loai: str, goc_im: Image.Image, cua_so: tuple[int, int, int, int] | None = None) -> tuple[dict | None, np.ndarray | None]:
    """`cua_so` (x0, y0, x1, y1): vùng tìm vệt đổi; bỏ trống → suy từ vùng đầu (dùng cho mắt; miệng nên suy từ hộp mắt)."""
    sua_p = VAO / f'{ten}--{loai}.png'
    if not sua_p.exists():
        return None, None
    W, H = goc_im.size
    sua_im = nap(sua_p)
    if sua_im.size != (W, H):
        sua_im = sua_im.resize((W, H), Image.LANCZOS)
    goc = np.asarray(goc_im)
    sua = np.asarray(sua_im)
    alpha = goc[:, :, 3]
    hx0, hy0, hx1, hy1 = vung_dau(alpha)
    dx, dy = can_dich(goc, sua, (hx0, hy0, hx1, hy1))
    sua = dich(sua, dx, dy)

    dac = alpha > 200
    g_rgb = goc[:, :, :3].astype(np.float32)
    s_rgb = sua[:, :, :3].astype(np.float32)
    vung = np.zeros_like(dac)
    vung[hy0:hy1, hx0:hx1] = dac[hy0:hy1, hx0:hx1]
    lech = g_rgb[vung].mean(axis=0) - s_rgb[vung].mean(axis=0)
    s_rgb = np.clip(s_rgb + lech, 0, 255)

    # Chênh lệch làm mờ mạnh: nét mảnh lệch vài px tan đi, vệt lớn còn lại.
    d = np.abs(g_rgb - s_rgb).mean(axis=2)
    d[alpha < 128] = 0
    dm = mo(d, 6)
    cao = hy1 - hy0
    rong = hx1 - hx0
    if cua_so:
        # Miệng: đổi nhỏ (hé môi) nên nét mờ ít hơn (σ=3) và ngưỡng thấp; lấy MỌI vệt trong cửa sổ (môi trên/dưới có thể tách đôi).
        tx0, ty0, tx1, ty1 = cua_so
        dm = mo(d, 3)
        nguong = 9
    elif loai == 'mieng':
        ty0, ty1 = hy0 + int(cao * 0.52), hy0 + int(cao * 0.9)
        tx0, tx1 = hx0 + int(rong * 0.15), hx1 - int(rong * 0.15)
        nguong = 12
    else:
        ty0, ty1 = hy0 + int(cao * 0.3), hy0 + int(cao * 0.62)
        tx0, tx1 = hx0 + int(rong * 0.08), hx1 - int(rong * 0.08)
        nguong = 10
    mask = np.zeros((H, W), dtype=bool)
    mask[ty0:ty1, tx0:tx1] = dm[ty0:ty1, tx0:tx1] > nguong
    tp = thanh_phan(mask)
    tp = [m for m in tp if m.sum() >= (60 if cua_so else 150)]
    if not tp:
        print(f'  !! {ten} {loai}: không thấy vệt đổi đủ lớn (chênh trung bình vùng {float(dm[ty0:ty1, tx0:tx1].mean()):.1f}, max {float(dm[ty0:ty1, tx0:tx1].max()):.1f})')
        return None, None
    if cua_so:
        chon = tp
    elif loai == 'mieng':
        chon = tp[:1]
    else:
        # Hai mắt: lấy tới 2 thành phần, thành phần thứ hai phải ≥ 25% thành phần đầu và nằm ngang hàng.
        chon = [tp[0]]
        y_dau = np.nonzero(tp[0])[0].mean()
        for m in tp[1:3]:
            if m.sum() >= 0.25 * tp[0].sum() and abs(np.nonzero(m)[0].mean() - y_dau) < cao * 0.12:
                chon.append(m)
    vet = np.any(chon, axis=0)
    ys, xs = np.nonzero(vet)
    dem = 18
    y0, y1 = max(0, int(ys.min()) - dem), min(H, int(ys.max()) + dem + 1)
    x0, x1 = max(0, int(xs.min()) - dem), min(W, int(xs.max()) + dem + 1)

    # Alpha miếng: vệt nở 10px, mép mờ 5px, nhân alpha gốc.
    a = np.asarray(Image.fromarray((vet * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(21)).filter(ImageFilter.GaussianBlur(5)), dtype=np.float32) / 255
    a = np.clip(a * (alpha.astype(np.float32) / 255), 0, 1)
    mieng = np.dstack([s_rgb, a * 255]).astype(np.uint8)
    thu = RA / ten
    thu.mkdir(parents=True, exist_ok=True)
    Image.fromarray(mieng[y0:y1, x0:x1], 'RGBA').save(thu / ('mouth.webp' if loai == 'mieng' else 'eyes.webp'), quality=92, method=6)
    # Bản ghép để soát: gốc + miếng.
    ghep = goc.astype(np.float32).copy()
    a3 = a[y0:y1, x0:x1, None]
    ghep[y0:y1, x0:x1, :3] = ghep[y0:y1, x0:x1, :3] * (1 - a3) + s_rgb[y0:y1, x0:x1] * a3
    return {'x': x0, 'y': y0, 'w': x1 - x0, 'h': y1 - y0, 'dich': [dx, dy], 'px': int(vet.sum())}, ghep.astype(np.uint8)


def main(ten_anh: list[str]) -> None:
    ket = {}
    for ten in ten_anh or ANH:
        goc_im = nap(GOC / ANH[ten])
        W, H = goc_im.size
        # Mắt trước (mí khép là vệt lớn, bắt chắc); miệng tìm trong cửa sổ suy từ hộp mắt: ngang hẹp hơn hộp mắt 15% mỗi
        # bên (tránh tóc hai bên má), dọc từ dưới hộp mắt tới ~0,9 bề ngang hộp mắt.
        mat, g2 = cat(ten, 'mat', goc_im)
        cua_so = None
        if mat:
            ex0, ey1, ew = mat['x'] + 18, mat['y'] + mat['h'] - 18, mat['w'] - 36
            # Môi nằm quanh trục giữa hộp mắt, cách mép dưới hộp mắt ~0,15–0,6 bề ngang hộp mắt.
            gx = ex0 + ew / 2
            cua_so = (int(gx - ew * 0.3), ey1 + int(ew * 0.12), int(gx + ew * 0.3), ey1 + int(ew * 0.62))
        mieng, g1 = cat(ten, 'mieng', goc_im, cua_so)
        if not mieng and not mat:
            continue
        ket[ten] = {'width': W, 'height': H, 'mouth': mieng, 'eyes': mat}
        print(ten, json.dumps(ket[ten]))
        # Ảnh soát: ba khuôn mặt cạnh nhau (gốc · ghép miệng · ghép mắt), cắt vùng đầu.
        alpha = np.asarray(goc_im)[:, :, 3]
        hx0, hy0, hx1, hy1 = vung_dau(alpha)
        # Cắt sát mặt (từ trên hộp mắt tới dưới hộp miệng) để soát được miệng ở cỡ nhỏ.
        if mat and mieng:
            box = (max(0, min(mat['x'], mieng['x']) - 30), max(0, mat['y'] - 30), min(W, max(mat['x'] + mat['w'], mieng['x'] + mieng['w']) + 30), min(H, mieng['y'] + mieng['h'] + 30))
        else:
            box = (max(0, hx0 - 20), max(0, hy0 - 10), min(W, hx1 + 20), min(H, hy1 + 40))
        nen = Image.new('RGB', goc_im.size, (217, 220, 224))
        tam = []
        for arr in (np.asarray(goc_im), g1, g2):
            im = nen.copy()
            if arr is not None:
                im.paste(Image.fromarray(arr, 'RGBA'), (0, 0), Image.fromarray(arr, 'RGBA'))
            tam.append(im.crop(box))
        w, h = tam[0].size
        soat = Image.new('RGB', (w * 3, h), 'white')
        for i, t in enumerate(tam):
            soat.paste(t, (i * w, 0))
        soat.save(VAO / f'kiem-{ten}.jpg', quality=85)
    (VAO / 'toa-do.json').write_text(json.dumps(ket, ensure_ascii=False, indent=1), encoding='utf-8')


if __name__ == '__main__':
    main(sys.argv[1:])
