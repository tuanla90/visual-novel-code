"""Đồng bộ cỡ đầu của dàn nhân vật (04/10/2026).

Đo khoảng mắt → cằm trên ảnh neo của từng người (mắt lấy từ bộ nhép, cằm dò theo nét viền dưới miệng), phóng/thu cả người
quanh điểm (tâm mặt, đỉnh đầu) cho khoảng đó về 146 px (mức của Tùng, giữa nhóm chính). Giữ đỉnh đầu đứng yên nên ai thấp
(bà Lụa) vẫn thấp. Bác Tư, thầy Quang vẽ mặt dài theo tuổi nên đo mắt → cằm bị thừa: đặt tay 0,97 như nhóm chính.
Bảng hệ số ở co-dau-2026-10-04.json; xu-ly-anh-dan-moi-2026-10-01.py và cat-bo-moi.py dùng lại bảng này khi dựng lại ảnh.

Chạy một lần từ prototype/:  python ../art/nguon/can-co-dau-2026-10-04.py [--ghi]
(không --ghi: chỉ in việc sẽ làm). Đổi cỡ ảnh chân dung trong game và miếng nhép môi/chớp mắt, ghi lại tọa độ nhép.
"""
import io
import json
import os
import re
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
BANG = json.loads((HERE / 'co-dau-2026-10-04.json').read_text(encoding='utf-8'))


def tra(ten: str):
    """Hệ số của ảnh `char-<người>-…` (None nếu người đó không đổi cỡ)."""
    for nguoi, v in BANG.items():
        if re.match(rf'^char-{re.escape(nguoi)}(-|$)', ten):
            return v
    return None


def doi_co(im: Image.Image, v) -> Image.Image:
    s, cx, top = v['s'], v['cx'], v['top']
    W, H = im.size
    to = im.convert('RGBA').resize((round(W * s), round(H * s)), Image.LANCZOS)
    khung = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    khung.paste(to, (round(cx - cx * s), round(top - top * s)), to)
    return khung


def doi_hop(b, v):
    s, cx, top = v['s'], v['cx'], v['top']
    x, y, w, h = b
    return [round(cx + (x - cx) * s), round(top + (y - top) * s), max(1, round(w * s)), max(1, round(h * s))]


def main():
    sys.path.insert(0, str(HERE / 'nhep-khit-2026-10-02'))
    from rigs_lib import doc_rigs
    sys.stdout.reconfigure(encoding='utf-8')
    ghi = '--ghi' in sys.argv
    anh = sorted({p for d in ('src/assets/characters', 'src/assets/mvp/nhan-vat') for p in Path(d).glob('char-*.png')})
    for p in anh:
        v = tra(p.stem)
        if not v:
            continue
        print(f'{p.stem:34s} x{v["s"]:.3f}')
        if ghi:
            doi_co(Image.open(p), v).save(p, optimize=True)
    hop = {}
    for r in doc_rigs():
        v = tra(r['ten'])
        if not v:
            continue
        for k, b in (('mouth', r['mb']), ('eyes', r['eb'])):
            nb = doi_hop(b, v)
            hop[(r['tep'], r['ten'], k)] = nb
            if ghi and b[2] > 1:
                Image.open(r[k]).convert('RGBA').resize((nb[2], nb[3]), Image.LANCZOS).save(
                    r[k], 'WEBP', quality=92, alpha_quality=100, method=6)
            elif ghi:
                nb[2:] = [1, 1]  # miếng mắt 1×1 trong suốt (ảnh mắt đã híp sẵn): giữ nguyên
    if not ghi:
        return
    p = 'src/mvp/ui/nhep-moi-mvp.ts'
    t = io.open(p, encoding='utf-8').read()
    for (tep, ten, k), _ in list(hop.items()):
        if tep != 'mvp' or k != 'mouth':
            continue
        m, e = hop[(tep, ten, 'mouth')], hop[(tep, ten, 'eyes')]
        t, n = re.subn(r"(bo\('" + re.escape(ten) + r"', \w+, )\[\d+, \d+, \d+, \d+\](, \w+, )\[\d+, \d+, \d+, \d+\]",
                       lambda mm: f'{mm.group(1)}[{m[0]}, {m[1]}, {m[2]}, {m[3]}]{mm.group(2)}[{e[0]}, {e[1]}, {e[2]}, {e[3]}]', t)
        assert n == 1, ten
    io.open(p, 'w', encoding='utf-8', newline=chr(10)).write(t)
    p = 'src/shared/ui/visuals/talk-rigs.ts'
    t = io.open(p, encoding='utf-8').read()
    for r in doc_rigs():
        if r['tep'] != 'talk' or ('talk', r['ten'], 'mouth') not in hop:
            continue
        m, e = hop[('talk', r['ten'], 'mouth')], hop[('talk', r['ten'], 'eyes')]
        sf = '/' + r['base'].replace(os.sep, '/')
        pat = (r"(sourceFile: '" + re.escape(sf) + r"',\s*width: \d+,\s*height: \d+,\s*mouth: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+"
               r"( \},\s*eyes: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+")
        t, n = re.subn(pat, lambda mm: f'{mm.group(1)}x: {m[0]}, y: {m[1]}, w: {m[2]}, h: {m[3]}{mm.group(2)}x: {e[0]}, y: {e[1]}, w: {e[2]}, h: {e[3]}', t)
        assert n == 1, r['ten']
    io.open(p, 'w', encoding='utf-8', newline=chr(10)).write(t)
    print('ghi', len(hop) // 2, 'bộ nhép')


if __name__ == '__main__':
    main()
