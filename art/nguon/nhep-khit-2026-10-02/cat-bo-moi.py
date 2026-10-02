# Cắt khít cho các bộ MVP mới thêm (chưa qua công cụ): miệng theo cat-mieng-moi.py, mắt theo cat-mat-moi.py, ghi tệp + tọa độ.
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


def nguon(ten):
    if not ten.startswith('char-duy'):
        return G2
    for loai in ('mieng', 'mat'):
        im = Image.open(f'{G2}/g2-{ten}--{loai}.png').convert('RGB').resize((768, 1360), Image.LANCZOS)
        nen = Image.new('RGB', (768, 1360), (255, 0, 255))
        nen.paste(xm.can_duy(im))
        nen.save(f'{TAM}/g2-{ten}--{loai}.png')
    return TAM


moi = {}
for r in doc_rigs():
    if r['tep'] != 'mvp' or r['ten'] not in CHON:
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
    moi[r['ten']] = (m['box'], e['box'])
    print(f"{r['ten']:26s} mieng {m['box']} mat {e['box']} dich ({m['dx']},{m['dy']})/({e['dx']},{e['dy']})")
p = 'src/mvp/ui/nhep-moi-mvp.ts'
t = io.open(p, encoding='utf-8').read()
for ten, (m, e) in moi.items():
    t, n = re.subn(r"(bo\('" + re.escape(ten) + r"', \w+, )\[\d+, \d+, \d+, \d+\](, \w+, )\[\d+, \d+, \d+, \d+\]",
                   lambda mm: f"{mm.group(1)}[{m[0]}, {m[1]}, {m[2]}, {m[3]}]{mm.group(2)}[{e[0]}, {e[1]}, {e[2]}, {e[3]}]", t)
    assert n == 1, ten
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('ghi', len(moi), '/', len(CHON))
