# Bước 5: ghi tọa độ sau khi lọc nét lẻ (moi/loc-net.json) vào nhep-moi-mvp.ts / talk-rigs.ts; ảnh mắt đã nhắm sẵn → miếng 1×1 trong suốt.
import sys, os, re, io, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
from PIL import Image
SC=os.path.dirname(os.path.abspath(__file__))
kq=json.load(open(os.path.join(SC,'moi','loc-net.json')))
rigs={r['ten']:r for r in doc_rigs()}
moi={}
for ten,v in kq.items():
    r=rigs[ten]; moi[ten]={}
    for k in ('mouth','eyes'):
        vv=v[k]
        if vv.get('trong'):
            b=r['eb'] if k=='eyes' else r['mb']
            Image.new('RGBA',(1,1),(0,0,0,0)).save(r[k],'WEBP',lossless=True); moi[ten][k]=[b[0],b[1],1,1]
        else: moi[ten][k]=vv['moi']
p='src/mvp/ui/nhep-moi-mvp.ts'; t=io.open(p,encoding='utf-8').read()
for ten,v in moi.items():
    if rigs[ten]['tep']!='mvp': continue
    m,e=v['mouth'],v['eyes']
    t,n=re.subn(r"(bo\('"+re.escape(ten)+r"', \w+, )\[\d+, \d+, \d+, \d+\](, \w+, )\[\d+, \d+, \d+, \d+\]", lambda mm: f"{mm.group(1)}[{m[0]}, {m[1]}, {m[2]}, {m[3]}]{mm.group(2)}[{e[0]}, {e[1]}, {e[2]}, {e[3]}]", t)
    assert n==1, ten
io.open(p,'w',encoding='utf-8',newline='\n').write(t)
p='src/shared/ui/visuals/talk-rigs.ts'; t=io.open(p,encoding='utf-8').read()
for ten,v in moi.items():
    if rigs[ten]['tep']!='talk': continue
    m,e=v['mouth'],v['eyes']; sf='/'+rigs[ten]['base'].replace(os.sep,'/')
    pat=r"(sourceFile: '"+re.escape(sf)+r"',\s*width: \d+,\s*height: \d+,\s*mouth: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+( \},\s*eyes: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+"
    t,n=re.subn(pat, lambda mm: f"{mm.group(1)}x: {m[0]}, y: {m[1]}, w: {m[2]}, h: {m[3]}{mm.group(2)}x: {e[0]}, y: {e[1]}, w: {e[2]}, h: {e[3]}", t)
    assert n==1, ten
io.open(p,'w',encoding='utf-8',newline='\n').write(t)
# kiểm: kích thước tệp khớp hộp
for r in doc_rigs():
    for k in ('mouth','eyes'):
        b=r['mb'] if k=='mouth' else r['eb']; im=Image.open(r[k])
        assert im.size==(b[2],b[3]), (r['ten'],k,im.size,b)
print('ok', len(moi)); print('gai-dau', moi['char-tung-gai-dau']['mouth'], 'quan-chi-man', moi['char-quan-chi-man']['eyes'])
