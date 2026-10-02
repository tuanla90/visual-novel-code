"""Căn cỡ người và điểm cắt chân của ảnh neo dàn mới cho đồng bộ (01/10/2026).

Topview trả Tùng và Duy nhỏ hơn các bạn khác (đầu ~20% chiều cao khung thay vì ~23%) dù câu lệnh đã ghi cỡ; sửa bằng cắt, không sinh lại
(quy trình mục 3.2: lệch đều cả ảnh → script). Phóng quanh đỉnh đầu, đặt đỉnh tóc cách mép trên 4%, căn giữa theo đầu, nền xám giữ nguyên.
Chạy: python art/nguon/can-khung-2026-10-01.py → ghi <tên>-can.png cạnh ảnh gốc trong topview-2026-10-01/.
"""
from pathlib import Path
import numpy as np
from PIL import Image

D = Path(__file__).with_name('topview-2026-10-01')
DAU = 0.225  # chiều cao đầu (đỉnh tóc → cằm) trên chiều cao khung, đo ở nhân vật chính / Hà Vy / Quân
VIEC = {'char-tung-v2-anchor-l3': 0.197, 'char-duy-v2-anchor-l3': 0.205}  # tỉ lệ đầu đo được ở ảnh gốc

for ten, dau in VIEC.items():
    im = Image.open(D / f'{ten}.png').convert('RGB'); W, H = im.size
    a = np.asarray(im).astype(int); nen = a[5, 5]
    khac = np.abs(a - nen).sum(axis=2) > 40
    tren = int(np.argmax(khac.any(axis=1)))                      # hàng đầu tiên có người = đỉnh tóc
    cot = np.where(khac[tren:tren + int(H * dau)].any(axis=0))[0]  # bề ngang đầu
    cx = (cot[0] + cot[-1]) / 2; s = DAU / dau
    to = im.resize((round(W * s), round(H * s)), Image.LANCZOS)
    khung = Image.new('RGB', (W, H), tuple(int(v) for v in nen))
    khung.paste(to, (round(W / 2 - cx * s), round(H * 0.04 - tren * s)))
    khung.save(D / f'{ten}-can.png'); print(ten, 'x%.2f' % s)
