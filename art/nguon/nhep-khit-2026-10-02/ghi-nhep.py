# Bước 3: ghi miếng miệng/mắt mới (moi/mieng-moi.pkl, moi/mat-moi.pkl; Hoài dùng khit() của cat-khit.py) vào game và sửa tọa độ.
import sys, os, re, io, pickle, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
from PIL import Image
from scipy import ndimage as nd
SC=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(SC,'cat-khit.py'),encoding='utf-8').read()
exec(src[src.index('def khit('):src.index('kq={}')])   # hàm khit() của bản cắt khít (dùng cho Hoài)
NGUONG=22; LE=3
mieng=pickle.load(open(os.path.join(SC,'moi','mieng-moi.pkl'),'rb')); mat=pickle.load(open(os.path.join(SC,'moi','mat-moi.pkl'),'rb'))
moi={}
for r in doc_rigs():
    base=Image.open(r['base']).convert('RGBA'); kq={}
    for loai,key,box,bang in (('mieng','mouth',r['mb'],mieng),('mat','eyes',r['eb'],mat)):
        if r['ten'] in bang: img,b=bang[r['ten']]
        else:
            k=khit(base, r[key], box, loai); img,b=k['img'],k['box']
        img.save(r[key],'WEBP',quality=92,alpha_quality=100,method=6); kq[key]=b
    moi[r['ten']]=dict(tep=r['tep'],mouth=kq['mouth'],eyes=kq['eyes'],base=r['base'])
# cập nhật tọa độ
p='src/mvp/ui/nhep-moi-mvp.ts'; t=io.open(p,encoding='utf-8').read()
for ten,v in moi.items():
    if v['tep']!='mvp': continue
    m,e=v['mouth'],v['eyes']
    t,n=re.subn(r"(bo\('"+re.escape(ten)+r"', \w+, )\[\d+, \d+, \d+, \d+\](, \w+, )\[\d+, \d+, \d+, \d+\]", lambda mm: f"{mm.group(1)}[{m[0]}, {m[1]}, {m[2]}, {m[3]}]{mm.group(2)}[{e[0]}, {e[1]}, {e[2]}, {e[3]}]", t)
    assert n==1, ten
io.open(p,'w',encoding='utf-8',newline='\n').write(t)
p='src/shared/ui/visuals/talk-rigs.ts'; t=io.open(p,encoding='utf-8').read()
for ten,v in moi.items():
    if v['tep']!='talk': continue
    m,e=v['mouth'],v['eyes']; sf='/'+v['base'].replace(os.sep,'/')
    pat=r"(sourceFile: '"+re.escape(sf)+r"',\s*width: \d+,\s*height: \d+,\s*mouth: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+( \},\s*eyes: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+"
    t,n=re.subn(pat, lambda mm: f"{mm.group(1)}x: {m[0]}, y: {m[1]}, w: {m[2]}, h: {m[3]}{mm.group(2)}x: {e[0]}, y: {e[1]}, w: {e[2]}, h: {e[3]}", t)
    assert n==1, ten
io.open(p,'w',encoding='utf-8',newline='\n').write(t)
json.dump({k:{'mouth':v['mouth'],'eyes':v['eyes']} for k,v in moi.items()}, open(os.path.join(SC,'moi','toa-do-ghi.json'),'w'), indent=1)
print('ghi', len(moi), 'bo'); print('gai-dau mouth', moi['char-tung-gai-dau']['mouth'], 'quan-chi-man eyes', moi['char-quan-chi-man']['eyes'])
