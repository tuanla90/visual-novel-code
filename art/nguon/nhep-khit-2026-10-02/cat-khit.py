# Cắt khít miếng nhép môi / chớp mắt: chỉ giữ vùng môi (hoặc hai mắt), loại mọi nét lệch nhỏ (cằm, cổ áo, tóc, tay, gọng kính).
# Dùng: python cat-khit.py <thư mục ra> [--ghi]   (không --ghi: chỉ tính và xuất ảnh soi)
import sys, os, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
from PIL import Image
from scipy import ndimage as nd
OUT=sys.argv[1]; GHI='--ghi' in sys.argv; NGUONG=22; LE=3
def khit(base, patch_path, box, loai):
    x,y,w,h=box; p=Image.open(patch_path).convert('RGBA')
    if p.size!=(w,h): raise SystemExit(f'co mieng {p.size} khac hop {(w,h)}: {patch_path}')
    B=np.asarray(base.crop((x,y,x+w,y+h))).astype(float); P=np.asarray(p).astype(float); a=P[...,3]/255
    C=B[...,:3]*(1-a[...,None])+P[...,:3]*a[...,None]
    d=nd.gaussian_filter(np.abs(C-B[...,:3]).max(-1),1.2); m=d>NGUONG
    lab,n=nd.label(m); obj=nd.find_objects(lab); ung=[]
    for i,sl in enumerate(obj,1):
        ys,xs=sl; cham=ys.start<LE or xs.start<LE or ys.stop>h-LE or xs.stop>w-LE
        dt=int((lab[sl]==i).sum()); bw,bh=xs.stop-xs.start, ys.stop-ys.start
        gon=dt/max(1,bw*bh)
        if cham or dt<12: continue
        ung.append(dict(i=i, tong=float(d[lab==i].sum()), gon=gon, cx=(xs.start+xs.stop)/2, cy=(ys.start+ys.stop)/2, dt=dt))
    if not ung: return None
    ung.sort(key=lambda u:-u['tong']*(0.4+u['gon']))
    if loai=='mieng': hat=[ung[0]]
    else:
        hat=[ung[0]]
        for u in ung[1:]:
            if abs(u['cx']-ung[0]['cx'])>w*0.18 and abs(u['cy']-ung[0]['cy'])<h*0.35: hat.append(u); break
    chon=np.isin(lab,[u['i'] for u in hat])
    # gộp mảnh sát hạt (môi trên/dưới, mi trên/dưới, răng)
    gan=nd.binary_dilation(chon,iterations=6)
    for u in ung:
        if u not in hat and (gan & (lab==u['i'])).any(): chon|= (lab==u['i'])
    giu=nd.binary_fill_holes(nd.binary_dilation(chon,iterations=5))
    mem=nd.gaussian_filter(giu.astype(float),2.5); mem=np.clip(mem/ max(mem.max(),1e-6)*1.25,0,1)
    a2=a*mem
    ys,xs=np.where(a2>0.02)
    y0,y1,x0,x1=max(0,ys.min()-2),min(h,ys.max()+3),max(0,xs.min()-2),min(w,xs.max()+3)
    P2=P.copy(); P2[...,3]=a2*255
    moi=Image.fromarray(P2[y0:y1,x0:x1].astype('uint8'),'RGBA')
    C2=B[...,:3]*(1-a2[...,None])+P[...,:3]*a2[...,None]; d2=nd.gaussian_filter(np.abs(C2-B[...,:3]).max(-1),1.2)
    ngoai_cu=int((m & ~giu).sum()); ngoai_moi=int(((d2>NGUONG) & ~giu).sum())
    return dict(img=moi, box=[int(x+x0),int(y+y0),int(x1-x0),int(y1-y0)], ngoai_cu=ngoai_cu, ngoai_moi=ngoai_moi, doi=int((d2>NGUONG).sum()), comp=(C,C2,B))
kq={}
soi=[]
for r in doc_rigs():
    base=Image.open(r['base']).convert('RGBA'); dong={}
    for loai,key,box in (('mieng','mouth',r['mb']),('mat','eyes',r['eb'])):
        k=khit(base, r[key], box, loai)
        if k is None: print('KHONG TIM DUOC', r['ten'], loai); continue
        dong[loai]=k
        if GHI:
            bk=os.path.join(OUT,'sao-luu',os.path.normpath(r[key]).replace(os.sep,'__'))
            os.makedirs(os.path.dirname(bk),exist_ok=True)
            if not os.path.exists(bk): Image.open(r[key]).save(bk.replace('.webp','.png'))
            k['img'].save(r[key], 'WEBP', quality=92)
    kq[r['ten']]=dict(tep=r['tep'], mb=dong['mieng']['box'], eb=dong['mat']['box'], cu_mb=r['mb'], cu_eb=r['eb'])
    print(f"{r['ten']:30s} mieng {r['mb'][2]}x{r['mb'][3]} -> {dong['mieng']['box'][2]}x{dong['mieng']['box'][3]}  lech ngoai {dong['mieng']['ngoai_cu']}->{dong['mieng']['ngoai_moi']} | mat {r['eb'][2]}x{r['eb'][3]} -> {dong['mat']['box'][2]}x{dong['mat']['box'][3]}  lech ngoai {dong['mat']['ngoai_cu']}->{dong['mat']['ngoai_moi']}")
    soi.append((r['ten'],dong))
json.dump(kq, open(os.path.join(OUT,'toa-do-moi.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=1)
# ảnh soi: [gốc | miếng cũ | miếng mới] cho miệng và mắt, phóng 1.5
from PIL import ImageDraw, ImageFont
font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 15)
def o(arr): 
    im=Image.fromarray(np.clip(arr,0,255).astype('uint8')); return im.resize((int(im.width*1.3),int(im.height*1.3)))
for t in range(0,len(soi),8):
    rows=[]
    for ten,dong in soi[t:t+8]:
        cells=[]
        for loai in ('mieng','mat'):
            C,C2,B=dong[loai]['comp']; cells += [o(B[...,:3]),o(C),o(C2)]
        Hh=max(c.height for c in cells); W=sum(c.width for c in cells)+6*len(cells)+170
        row=Image.new('RGB',(W,Hh+22),(30,30,34)); dr=ImageDraw.Draw(row); dr.text((4,4),ten,font=font,fill=(253,230,138)); xx=170
        for j,c in enumerate(cells): row.paste(c,(xx,20)); dr.text((xx+2,2),['goc','cu','moi'][j%3],font=font,fill=(200,200,200)); xx+=c.width+6
        rows.append(row)
    W=max(r_.width for r_ in rows); tong=Image.new('RGB',(W,sum(r_.height for r_ in rows)),(30,30,34)); yy=0
    for r_ in rows: tong.paste(r_,(0,yy)); yy+=r_.height
    tong.save(os.path.join(OUT,f'khit-{t//8+1}.jpg'),quality=85)
print('xong')
