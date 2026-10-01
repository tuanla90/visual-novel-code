"""Cắt miếng MIỆNG MỞ / MẮT NHẮM từ ảnh Topview sửa so với ảnh chân dung gốc (01/10/2026).

Vào: art/nguon/nhep-moi-2026-10-01/<ảnh>--mieng.png và <ảnh>--mat.png (ảnh ra của Topview, 9:16, nền xám),
      ảnh gốc theo bảng ANH trong art/prompts/sinh-hang-doi-nhep-moi-2026-10-01.py (PNG trong suốt 768×1360).
Ra:  prototype/src/mvp/ui/nhep/<ảnh>/mouth.webp, eyes.webp (miếng đã căn về khung ảnh gốc, mép làm mềm),
      in ra bảng tọa độ để dán vào prototype/src/mvp/ui/nhep-moi-mvp.ts.

Cách: (1) co ảnh sửa về đúng kích thước ảnh gốc; (2) căn dịch nhỏ (±12px) theo vùng đầu để khớp; (3) khớp màu
nhẹ theo trung bình vùng mặt; (4) chênh lệch > ngưỡng trong vùng tìm (miệng: nửa dưới mặt; mắt: nửa trên mặt),
lấy hộp bao thành phần lớn nhất + đệm; (5) miếng = ảnh sửa cắt theo hộp, alpha = mặt nạ chênh lệch làm mờ mép,
nhân với alpha ảnh gốc (không lấn ra ngoài đầu).

Chạy: python art/nguon/cat-mieng-mat.py [tên ảnh …]   (không tham số = tất cả ảnh có đủ 2 tệp).
"""
import sys
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

GOC = Path(__file__).resolve().parents[2]
VAO = GOC / 'art/nguon/nhep-moi-2026-10-01'
RA = GOC / 'prototype/src/mvp/ui/nhep'
sys.path.insert(0, str(GOC / 'art/prompts'))

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
    """Hộp bao phần đầu: từ đỉnh alpha xuống ~38% chiều cao thân hình (đầu + cổ)."""
    ys, xs = np.nonzero(alpha > 128)
    y0 = ys.min()
    y1 = ys.max()
    cao = y1 - y0
    yd = y0 + int(cao * 0.38)
    cot = alpha[y0:yd] > 128
    xs2 = np.nonzero(cot.any(axis=0))[0]
    return int(xs2.min()), int(y0), int(xs2.max()), int(yd)


def can_dich(goc: np.ndarray, sua: np.ndarray, hop: tuple[int, int, int, int], toi_da: int = 12) -> tuple[int, int]:
    """Dịch (dx, dy) của ảnh sửa để khớp ảnh gốc nhất trong vùng đầu (so tổng |chênh| trên ảnh xám thu nhỏ 1/2)."""
    x0, y0, x1, y1 = hop
    g = goc[y0:y1, x0:x1, :3].astype(np.float32).mean(axis=2)
    tot = None
    best = (0, 0)
    H, W = goc.shape[:2]
    for dy in range(-toi_da, toi_da + 1, 2):
        for dx in range(-toi_da, toi_da + 1, 2):
            ys0, ys1 = y0 + dy, y1 + dy
            xs0, xs1 = x0 + dx, x1 + dx
            if ys0 < 0 or xs0 < 0 or ys1 > H or xs1 > W:
                continue
            s = sua[ys0:ys1, xs0:xs1, :3].astype(np.float32).mean(axis=2)
            d = np.abs(g[::2, ::2] - s[::2, ::2]).mean()
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


def thanh_phan_lon_nhat(mask: np.ndarray) -> np.ndarray:
    """Giữ thành phần liên thông lớn nhất (lan theo 8 hướng bằng vòng lặp nở dần — mask nhỏ nên đủ nhanh)."""
    from collections import deque
    H, W = mask.shape
    nhan = np.zeros((H, W), dtype=np.int32)
    k = 0
    kich = {}
    for y, x in zip(*np.nonzero(mask)):
        if nhan[y, x]:
            continue
        k += 1
        q = deque([(y, x)])
        nhan[y, x] = k
        n = 0
        while q:
            cy, cx = q.popleft()
            n += 1
            for ny in (cy - 1, cy, cy + 1):
                for nx in (cx - 1, cx, cx + 1):
                    if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not nhan[ny, nx]:
                        nhan[ny, nx] = k
                        q.append((ny, nx))
        kich[k] = n
    if not kich:
        return mask
    kmax = max(kich, key=kich.get)
    return nhan == kmax


def cat(ten: str, loai: str) -> dict | None:
    goc_p = GOC / ANH[ten]
    sua_p = VAO / f'{ten}--{loai}.png'
    if not sua_p.exists():
        return None
    goc_im = nap(goc_p)
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

    # Khớp màu nhẹ: dịch trung bình RGB của vùng đầu (nơi alpha gốc đặc) về bằng ảnh gốc.
    mat_na = alpha[hy0:hy1, hx0:hx1] > 200
    g_rgb = goc[hy0:hy1, hx0:hx1, :3].astype(np.float32)
    s_rgb = sua[hy0:hy1, hx0:hx1, :3].astype(np.float32)
    lech = (g_rgb[mat_na].mean(axis=0) - s_rgb[mat_na].mean(axis=0))
    sua_rgb = np.clip(sua[:, :, :3].astype(np.float32) + lech, 0, 255)

    # Vùng tìm: miệng = 45–100% chiều cao vùng đầu; mắt = 20–65%.
    cao = hy1 - hy0
    if loai == 'mieng':
        ty0, ty1 = hy0 + int(cao * 0.45), hy1
    else:
        ty0, ty1 = hy0 + int(cao * 0.2), hy0 + int(cao * 0.65)
    d = np.abs(goc[:, :, :3].astype(np.float32) - sua_rgb).mean(axis=2)
    d = np.asarray(Image.fromarray(d.astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)), dtype=np.float32)
    mask = np.zeros((H, W), dtype=bool)
    mask[ty0:ty1, hx0:hx1] = (d[ty0:ty1, hx0:hx1] > 18) & (alpha[ty0:ty1, hx0:hx1] > 128)
    if mask.sum() < 40:
        print(f'  !! {ten} {loai}: chênh lệch quá nhỏ ({int(mask.sum())} px) — ảnh sửa có đổi gì không?')
        return None
    mask = thanh_phan_lon_nhat(mask)
    # Mắt: hai mắt là hai thành phần → lấy cả hai nếu thành phần thứ hai cũng lớn: nới hộp theo mọi chênh trong dải y của thành phần lớn.
    ys, xs = np.nonzero(mask)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    if loai == 'mat':
        dai = (d > 18) & (alpha > 128)
        dai[: max(ty0, y0 - 10)] = False
        dai[y1 + 10:] = False
        dai[:, :hx0] = False
        dai[:, hx1:] = False
        ys, xs = np.nonzero(dai)
        y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    dem = 22
    x0, y0 = max(0, x0 - dem), max(0, y0 - dem)
    x1, y1 = min(W, x1 + dem + 1), min(H, y1 + dem + 1)

    # Alpha miếng: mặt nạ chênh lệch nở + mờ mép, nhân alpha gốc.
    m = np.zeros((H, W), dtype=np.uint8)
    vung = (d > 10) & (alpha > 128)
    m[y0:y1, x0:x1] = vung[y0:y1, x0:x1] * 255
    m_im = Image.fromarray(m).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(4))
    m = np.asarray(m_im, dtype=np.float32) / 255
    a = np.clip(m * (alpha.astype(np.float32) / 255), 0, 1)
    mieng = np.dstack([sua_rgb, a * 255]).astype(np.uint8)[y0:y1, x0:x1]
    thu = RA / ten
    thu.mkdir(parents=True, exist_ok=True)
    ten_tep = 'mouth' if loai == 'mieng' else 'eyes'
    Image.fromarray(mieng, 'RGBA').save(thu / f'{ten_tep}.webp', quality=92, method=6)
    return {'x': int(x0), 'y': int(y0), 'w': int(x1 - x0), 'h': int(y1 - y0), 'dich': [dx, dy], 'px': int(mask.sum())}


def main(ten_anh: list[str]) -> None:
    ket = {}
    for ten in ten_anh or ANH:
        goc_im = Image.open(GOC / ANH[ten])
        W, H = goc_im.size
        mieng = cat(ten, 'mieng')
        mat = cat(ten, 'mat')
        if not mieng and not mat:
            continue
        ket[ten] = {'width': W, 'height': H, 'mouth': mieng, 'eyes': mat}
        print(ten, json.dumps(ket[ten]))
    (VAO / 'toa-do.json').write_text(json.dumps(ket, ensure_ascii=False, indent=1), encoding='utf-8')


if __name__ == '__main__':
    main(sys.argv[1:])
