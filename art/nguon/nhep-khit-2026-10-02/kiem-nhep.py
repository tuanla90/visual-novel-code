# Kiểm từng bộ nhép môi: ghép miếng lên ảnh HIỆN TẠI, đo độ lệch nền và vệt mép, xuất ảnh ghép soi mắt.
import re, glob, io, os, sys, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT='.'; OUT=sys.argv[1]
def doc(p): return io.open(p, encoding='utf-8').read()
rigs=[]
# 1) nhep-moi-mvp.ts
t=doc('src/mvp/ui/nhep-moi-mvp.ts')
imp={m.group(1): os.path.normpath(os.path.join('src/mvp/ui', m.group(2))) for m in re.finditer(r"import (\w+) from '(\./nhep/[^']+)';", t)}
def tim_anh(ten):
    for ext in ('webp','png','jpg'):
        g=glob.glob(f'src/assets/**/{ten}.{ext}', recursive=True)
        if g: return g[0]
for m in re.finditer(r"bo\('([^']+)', (\w+), \[(\d+), (\d+), (\d+), (\d+)\], (\w+), \[(\d+), (\d+), (\d+), (\d+)\]\)", t):
    ten=m.group(1); rigs.append(dict(ten=ten, base=tim_anh(ten), mouth=imp[m.group(2)], mb=[int(m.group(i)) for i in range(3,7)], eyes=imp[m.group(7)], eb=[int(m.group(i)) for i in range(8,12)]))
# 2) talk-rigs.ts
t=doc('src/shared/ui/visuals/talk-rigs.ts')
imp2={m.group(1): os.path.normpath(os.path.join('src/shared/ui/visuals', m.group(2))) for m in re.finditer(r"import (\w+) from '(\./talk/[^']+)';", t)}
for m in re.finditer(r"sourceFile: '([^']+)',\s*width: \d+,\s*height: \d+,\s*mouth: \{ src: (\w+), x: (\d+), y: (\d+), w: (\d+), h: (\d+) \},\s*eyes: \{ src: (\w+), x: (\d+), y: (\d+), w: (\d+), h: (\d+) \}", t):
    rigs.append(dict(ten=os.path.basename(m.group(1)).rsplit('.',1)[0], base=m.group(1).lstrip('/'), mouth=imp2[m.group(2)], mb=[int(m.group(i)) for i in range(3,7)], eyes=imp2[m.group(7)], eb=[int(m.group(i)) for i in range(8,12)]))
print('so bo:', len(rigs))
font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 15)
bang=[]
def ghep(base, patch, box):
    x,y,w,h=box; p=patch.resize((w,h)) if patch.size!=(w,h) else patch
    out=base.copy(); out.alpha_composite(p,(x,y)); return out, p
for r in rigs:
    if not r['base'] or not os.path.exists(r['base']): print('THIEU ANH', r['ten'], r['base']); continue
    base=Image.open(r['base']).convert('RGBA')
    kq={'ten':r['ten'], 'co':base.size}
    pan=[]
    for loai in ('mouth','eyes'):
        box=r['mb'] if loai=='mouth' else r['eb']; patch=Image.open(r[loai]).convert('RGBA')
        comp,p=ghep(base,patch,box)
        x,y,w,h=box; B=np.asarray(base.crop((x,y,x+w,y+h))).astype(float); P=np.asarray(p).astype(float); a=P[...,3]/255
        d=np.abs(P[...,:3]-B[...,:3]).mean(-1)
        m=a>0.5
        # lệch nền: trung vị khác biệt ở phần miếng mờ dần (0.5<a) nhưng xa tâm: dùng phân vị 40% (vùng da không đổi phải gần 0)
        kq[loai+'_p40']=round(float(np.percentile(d[m],40)),1) if m.any() else None
        kq[loai+'_tb']=round(float((d*a).sum()/max(a.sum(),1)),1)
        # vệt mép: trong ảnh ghép, chênh lệch so với gốc ở vòng mép 4px của hộp
        C=np.asarray(comp.crop((x,y,x+w,y+h))).astype(float); dd=np.abs(C[...,:3]-B[...,:3]).mean(-1)
        ring=np.zeros_like(dd,bool); ring[:4,:]=ring[-4:,:]=ring[:,:4]=ring[:,-4:]=True
        kq[loai+'_mep']=round(float(dd[ring].mean()),1)
        kq[loai+'_alpha_mep']=round(float(a[ring].mean()),2)
        # khung soi: vùng quanh hộp ±50px, phóng 2x
        X0,Y0,X1,Y1=max(0,x-50),max(0,y-50),min(base.width,x+w+50),min(base.height,y+h+50)
        pan.append((loai,base.crop((X0,Y0,X1,Y1)),comp.crop((X0,Y0,X1,Y1))))
    bang.append((kq,pan))
    print(json.dumps(kq, ensure_ascii=False))
# xuất ảnh ghép: mỗi bộ một hàng: [gốc miệng | miệng mở | gốc mắt | mắt nhắm]
H=170
for i in range(0,len(bang),10):
    phan=bang[i:i+10]; hang=[]
    for kq,pan in phan:
        cells=[]
        for loai,b,c in pan:
            for im in (b,c):
                bg=Image.new('RGBA',im.size,(120,120,120,255)); bg.alpha_composite(im); s=H/im.height; cells.append(bg.convert('RGB').resize((max(1,int(im.width*s)),H)))
        w=sum(c.width for c in cells)+8*len(cells)+260
        row=Image.new('RGB',(w,H+6),(30,30,34)); d=ImageDraw.Draw(row); d.text((6,6),kq['ten'],font=font,fill=(253,230,138))
        d.text((6,30),f"mieng lech {kq['mouth_p40']} mep {kq['mouth_mep']}",font=font,fill=(220,220,220)); d.text((6,52),f"mat lech {kq['eyes_p40']} mep {kq['eyes_mep']}",font=font,fill=(220,220,220))
        x=260
        for c in cells: row.paste(c,(x,3)); x+=c.width+8
        hang.append(row)
    W=max(r.width for r in hang); tong=Image.new('RGB',(W,sum(r.height for r in hang)),(30,30,34)); y=0
    for r in hang: tong.paste(r,(0,y)); y+=r.height
    tong.save(os.path.join(OUT,f'nhep-{i//10+1}.jpg'),quality=85); print('luu', f'nhep-{i//10+1}.jpg', tong.size)
