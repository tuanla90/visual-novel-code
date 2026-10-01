"""Cắt miếng MIỆNG / MẮT cho chân dung của dàn nhân vật mới (01/10/2026), dùng lại thuật toán của cat-mieng-mat.py.

Vào: art/nguon/topview-2026-10-01/g2/g2-<ảnh>--mieng.png và g2-<ảnh>--mat.png (ảnh Topview sửa từ chính chân dung, nền hồng tím),
      chân dung đã xử lý trong prototype/src/assets (PNG trong suốt 768×1360).
Ra:  miếng mouth.webp / eyes.webp ghi vào đúng thư mục bộ nhép đang dùng:
        - ảnh thuộc bộ cũ của prototype (talk-rigs.ts)  → prototype/src/shared/ui/visuals/talk/<tên bộ>/
        - ảnh còn lại (nhep-moi-mvp.ts)                 → prototype/src/mvp/ui/nhep/<ảnh>/
      art/nguon/topview-2026-10-01/nhep/toa-do.json (tọa độ hộp, để dán vào hai tệp .ts) và kiem-<ảnh>.jpg (ảnh soát).

Chạy: python art/nguon/cat-mieng-mat-dan-moi-2026-10-01.py [tên ảnh …]   (không tham số = tất cả ảnh có đủ tệp vào).
"""
import importlib.util
import shutil
import sys
from pathlib import Path

GOC = Path(__file__).resolve().parents[2]
G2 = GOC / 'art/nguon/topview-2026-10-01/g2'
VAO = GOC / 'art/nguon/topview-2026-10-01/nhep'
C = 'prototype/src/assets/characters/'
M = 'prototype/src/assets/mvp/nhan-vat/'
TALK = GOC / 'prototype/src/shared/ui/visuals/talk'
NHEP = GOC / 'prototype/src/mvp/ui/nhep'

# ảnh → (tệp chân dung, thư mục miếng)
BO_CU = {  # bộ của talk-rigs.ts: tên thư mục khác tên ảnh
    'char-minh-anh-anchor': 'minh-anh-neutral', 'char-minh-anh-worried': 'minh-anh-worried', 'char-minh-anh-happy': 'minh-anh-happy',
    'char-ha-vy-anchor': 'ha-vy-neutral', 'char-ha-vy-smile': 'ha-vy-smile', 'char-ha-vy-thinking': 'ha-vy-thinking',
    'char-quan-anchor': 'quan-neutral', 'char-quan-smug': 'quan-smug', 'char-quan-stunned': 'quan-stunned',
    'char-tung-anchor': 'tung-neutral',
}
BO_MVP = ['char-tung-happy', 'char-tung-worried', 'char-tung-surprised', 'char-tung-thinking', 'char-tung-gai-dau', 'char-tung-chi-tay',
          'char-tung-ao-xanh', 'char-tung-ao-xanh-happy', 'char-tung-ao-xanh-worried', 'char-tung-ao-xanh-gai-dau', 'char-tung-ao-xanh-chi-tay',
          'char-ha-vy-day-kinh', 'char-minh-anh-serious', 'char-minh-anh-khoanh-tay', 'char-quan-chi-man', 'char-nguoi-choi']


def tep_chan_dung(ten: str) -> str:
    return (C if (GOC / C / f'{ten}.png').exists() else M) + f'{ten}.png'


_spec = importlib.util.spec_from_file_location('cat_cu', Path(__file__).with_name('cat-mieng-mat.py'))
cu = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cu)


def main(ten_anh):
    VAO.mkdir(parents=True, exist_ok=True)
    tat_ca = list(BO_CU) + BO_MVP
    chon = [t for t in (ten_anh or tat_ca) if (G2 / f'g2-{t}--mieng.png').exists() and (G2 / f'g2-{t}--mat.png').exists()]
    for t in chon:  # công cụ cũ đọc <VAO>/<ảnh>--mieng.png
        for loai in ('mieng', 'mat'):
            shutil.copyfile(G2 / f'g2-{t}--{loai}.png', VAO / f'{t}--{loai}.png')
    tam = VAO / '_mieng'
    cu.VAO, cu.RA, cu.ANH = VAO, tam, {t: tep_chan_dung(t) for t in chon}
    cu.main(chon)
    for t in chon:  # chuyển miếng về đúng thư mục bộ nhép
        dich = TALK / BO_CU[t] if t in BO_CU else NHEP / t
        dich.mkdir(parents=True, exist_ok=True)
        for f in ('mouth.webp', 'eyes.webp'):
            if (tam / t / f).exists():
                shutil.copyfile(tam / t / f, dich / f)
        for loai in ('mieng', 'mat'):
            (VAO / f'{t}--{loai}.png').unlink()
    shutil.rmtree(tam, ignore_errors=True)
    thieu = [t for t in tat_ca if t not in chon]
    if thieu:
        print('chưa có ảnh vào:', ', '.join(thieu))


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main(sys.argv[1:])
