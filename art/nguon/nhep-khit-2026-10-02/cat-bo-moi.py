# Cắt khít cho các bộ mới thêm hoặc vẽ lại (MVP và talk-rigs) (chưa qua công cụ): miệng theo cat-mieng-moi.py, mắt theo cat-mat-moi.py, ghi tệp + tọa độ.
# Hộp cũ (to) trong nhep-moi-mvp.ts làm cửa sổ tìm. Dùng: python cat-bo-moi.py <tên ảnh> [<tên ảnh>…]
# rồi chạy loc-net-le.py <các tên> --ghi và ghi-toa-do.py.
import sys, os, re, io
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
HERE = os.path.dirname(os.path.abspath(__file__))
CHON = set(sys.argv[1:])


def nap(tep):
    src = io.open(os.path.join(HERE, tep), encoding='utf-8').read()
    ns = {'__file__': os.path.join(HERE, tep)}
    sys.argv = [tep, '.']
    exec(src[:src.index('kq={}')], ns)
    return ns


nsM = nap('cat-mieng-moi.py')
nsE = nap('cat-mat-moi.py')
catM, catE = nsM['cat'], nsE['cat']
G2 = nsM['G2']
# Chân dung Duy đã phóng 1,10 khi xử lý, ảnh nguồn Topview thì chưa: phóng nguồn y hệt (can_duy) vào thư mục tạm rồi mới cắt.
import importlib.util, tempfile
from PIL import Image
_s = importlib.util.spec_from_file_location('xm', os.path.join(HERE, '..', 'xu-ly-anh-dan-moi-2026-10-01.py'))
xm = importlib.util.module_from_spec(_s)
_s.loader.exec_module(xm)
TAM = tempfile.mkdtemp()


_s2 = importlib.util.spec_from_file_location('co_dau', os.path.join(HERE, '..', 'can-co-dau-2026-10-04.py'))
co_dau = importlib.util.module_from_spec(_s2)
_s2.loader.exec_module(co_dau)


def nguon(ten):
    """Khung nguồn đã qua đúng phép biến đổi như ảnh trong game: Duy phóng can_duy, cả dàn đổi cỡ đầu (co-dau)."""
    v = co_dau.tra(ten)
    if not ten.startswith('char-duy') and not v:
        return G2
    for loai in ('mieng', 'mat'):
        im = Image.open(f'{G2}/g2-{ten}--{loai}.png').convert('RGB').resize((768, 1360), Image.LANCZOS)
        if ten.startswith('char-duy'):
            im = xm.can_duy(im)
        if v:
            im = co_dau.doi_co(im, v)
        nen = Image.new('RGB', (768, 1360), (255, 0, 255))
        nen.paste(im, (0, 0), im if im.mode == 'RGBA' else None)
        nen.save(f'{TAM}/g2-{ten}--{loai}.png')
    return TAM


moi = {}
for r in doc_rigs():
    if r['ten'] not in CHON:  # cả bộ MVP lẫn bộ talk (talk-rigs.ts) cùng tên ảnh thì cắt cả hai
        continue
    nsM['G2'] = nsE['G2'] = nguon(r['ten'])
    e = catE(r)
    if not e or 'loi' in e:
        print(r['ten'], 'LOI mat', e and e.get('loi'))
        continue
    # miệng tìm theo tâm hai mắt vừa cắt (hộp cũ có khi nằm dưới cằm): giữa mặt, 35–175 px dưới tâm mắt
    ex, ey, ew, eh = e['box']
    cx, cy = ex + ew // 2, ey + eh // 2
    m = catM({**r, 'cua_so': [cx - 100, cy + 35, cx + 100, cy + 175]})
    if not m or 'loi' in m or not e or 'loi' in e:
        print(r['ten'], 'LOI', m and m.get('loi'), e and e.get('loi'))
        continue
    m['img'].save(r['mouth'], 'WEBP', quality=92, alpha_quality=100, method=6)
    e['img'].save(r['eyes'], 'WEBP', quality=92, alpha_quality=100, method=6)
    moi[(r['tep'], r['ten'])] = (m['box'], e['box'], r)
    print(f"{r['ten']:26s} mieng {m['box']} mat {e['box']} dich ({m['dx']},{m['dy']})/({e['dx']},{e['dy']})")
p = 'src/mvp/ui/nhep-moi-mvp.ts'
t = io.open(p, encoding='utf-8').read()
for (tep, ten), (m, e, r) in moi.items():
    if tep != 'mvp':
        continue
    t, n = re.subn(r"(bo\('" + re.escape(ten) + r"', \w+, )\[\d+, \d+, \d+, \d+\](, \w+, )\[\d+, \d+, \d+, \d+\]",
                   lambda mm: f"{mm.group(1)}[{m[0]}, {m[1]}, {m[2]}, {m[3]}]{mm.group(2)}[{e[0]}, {e[1]}, {e[2]}, {e[3]}]", t)
    assert n == 1, ten
io.open(p, 'w', encoding='utf-8', newline=chr(10)).write(t)
p = 'src/shared/ui/visuals/talk-rigs.ts'
t = io.open(p, encoding='utf-8').read()
for (tep, ten), (m, e, r) in moi.items():
    if tep != 'talk':
        continue
    sf = '/' + r['base'].replace(os.sep, '/')
    pat = (r"(sourceFile: '" + re.escape(sf) + r"',\s*width: \d+,\s*height: \d+,\s*mouth: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+"
           r"( \},\s*eyes: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+")
    t, n = re.subn(pat, lambda mm: f"{mm.group(1)}x: {m[0]}, y: {m[1]}, w: {m[2]}, h: {m[3]}{mm.group(2)}x: {e[0]}, y: {e[1]}, w: {e[2]}, h: {e[3]}", t)
    assert n == 1, ten
io.open(p, 'w', encoding='utf-8', newline=chr(10)).write(t)
print('ghi', len(moi), '/', len(CHON))
