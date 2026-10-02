# Cắt lại miếng MẮT NHẮM từ ảnh Topview g2-<ảnh>--mat.png: căn khớp cục bộ quanh hộp mắt, lấy hai khối mí mắt.
import sys, os, pickle, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as nd
OUT=sys.argv[1]; G2='../art/nguon/topview-2026-10-01/g2'
def cat(r):
    src=f"{G2}/g2-{r['ten']}--mat.png"
    if not os.path.exists(src): return None
    B=np.asarray(Image.open(r['base']).convert('RGBA')).astype(float); E=np.asarray(Image.open(src).convert('RGB').resize((768,1360),Image.LANCZOS)).astype(float)
    ex,ey,ew,eh=r['eb']; X0,X1=max(0,ex-15),min(768,ex+ew+15); Y0,Y1=max(0,ey-15),min(1360,ey+eh+15)
    a=B[...,3]/255; g=lambda im: im[...,:3].mean(-1); wB=g(B)[Y0:Y1,X0:X1]; m=a[Y0:Y1,X0:X1]>0.95; best=None
    for dy in range(-10,11):
        for dx in range(-10,11):
            sl=g(E)[Y0-dy:Y1-dy, X0-dx:X1-dx]
            if sl.shape!=wB.shape: continue
            s=np.abs(sl-wB)[m].mean()
            if best is None or s<best[0]: best=(s,dx,dy)
    _,dx,dy=best; Es=np.roll(np.roll(E,dy,0),dx,1)
    d=nd.gaussian_filter(np.abs(Es[...,:3]-B[...,:3]).max(-1),1.5)*(a>0.6); w=d[Y0:Y1,X0:X1]; H,W=w.shape
    lum=lambda im: im[...,:3]@np.array([0.3,0.59,0.11])
    LB=lum(B)[Y0:Y1,X0:X1]; LE=lum(Es)[Y0:Y1,X0:X1]; aw=a[Y0:Y1,X0:X1]
    trong=(LB<115)&(LE-LB>45)&(aw>0.9); trong=nd.binary_opening(trong,iterations=1)
    lt,nt=nd.label(trong); kt=nd.sum(trong,lt,range(1,nt+1)) if nt else []
    trong=np.isin(lt,[i+1 for i,v in enumerate(kt) if v>=25])
    if trong.sum()>=50:
        lt,nt=nd.label(trong)
        vung=nd.binary_dilation(trong,iterations=18); lab,n=nd.label((w>28)&vung)
        chon=trong|((w>28)&vung)
        giu=nd.binary_fill_holes(nd.binary_dilation(chon,iterations=5)); mem=np.clip(nd.gaussian_filter(giu.astype(float),2.5)*1.3,0,1)
        full=np.zeros((1360,768)); full[Y0:Y1,X0:X1]=mem; alpha=full*a
        vanh=nd.binary_dilation(giu,iterations=10)&~nd.binary_dilation(giu,iterations=4); vf=np.zeros((1360,768),bool); vf[Y0:Y1,X0:X1]=vanh; vf&=a>0.95
        lech=(Es[...,:3][vf]-B[...,:3][vf]).mean(0) if vf.any() else np.zeros(3)
        ys,xs=np.where(alpha>0.02); y0,y1,x0,x1=ys.min()-2,ys.max()+3,xs.min()-2,xs.max()+3
        patch=np.dstack([np.clip(Es[y0:y1,x0:x1,:3]-lech,0,255), alpha[y0:y1,x0:x1]*255]).astype('uint8')
        return dict(img=Image.fromarray(patch,'RGBA'), box=[int(x0),int(y0),int(x1-x0),int(y1-y0)], so=f'trong {nt}', dx=dx, dy=dy)
    lab,n=nd.label(w>28); objs=nd.find_objects(lab); ung=[]
    for i,sl in enumerate(objs,1):
        ys,xs=sl; bw,bh=xs.stop-xs.start, ys.stop-ys.start; dt=int((lab[sl]==i).sum())
        if dt<40 or bw>W*0.55 or bh>H*0.75: continue
        ung.append((w[lab==i].sum()*(0.3+dt/(bw*bh)), i, (xs.start+xs.stop)/2))
    ung.sort(reverse=True)
    if not ung: return dict(loi='khong thay mat')
    hat=[ung[0]]
    for u in ung[1:]:
        if abs(u[2]-ung[0][2])>W*0.15: hat.append(u); break
    chon=np.isin(lab,[u[1] for u in hat]); gan=nd.binary_dilation(chon,iterations=7)
    for i,sl in enumerate(objs,1):
        ys,xs=sl
        if i not in [u[1] for u in hat] and (gan&(lab==i)).any() and (xs.stop-xs.start)<W*0.55: chon|=lab==i
    giu=nd.binary_fill_holes(nd.binary_dilation(chon,iterations=5)); mem=np.clip(nd.gaussian_filter(giu.astype(float),2.5)*1.3,0,1)
    full=np.zeros((1360,768)); full[Y0:Y1,X0:X1]=mem; alpha=full*a
    vanh=nd.binary_dilation(giu,iterations=10)&~nd.binary_dilation(giu,iterations=4); vf=np.zeros((1360,768),bool); vf[Y0:Y1,X0:X1]=vanh; vf&=a>0.95
    lech=(Es[...,:3][vf]-B[...,:3][vf]).mean(0) if vf.any() else np.zeros(3)
    ys,xs=np.where(alpha>0.02); y0,y1,x0,x1=ys.min()-2,ys.max()+3,xs.min()-2,xs.max()+3
    patch=np.dstack([np.clip(Es[y0:y1,x0:x1,:3]-lech,0,255), alpha[y0:y1,x0:x1]*255]).astype('uint8')
    return dict(img=Image.fromarray(patch,'RGBA'), box=[int(x0),int(y0),int(x1-x0),int(y1-y0)], so=len(hat), dx=dx, dy=dy)
kq={}; rows=[]
font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
for r in doc_rigs():
    k=cat(r)
    if k is None: print(f"{r['ten']:30s} (khong co anh nguon)"); continue
    if 'loi' in k: print(r['ten'], k); continue
    kq[r['ten']]=(k['img'],k['box']); print(f"{r['ten']:30s} hop {k['box']} so khoi {k['so']} dich ({k['dx']},{k['dy']})")
    B=Image.open(r['base']).convert('RGBA'); x,y,w,h=k['box']; comp=B.copy(); comp.alpha_composite(k['img'],(x,y))
    X0,Y0,X1,Y1=max(0,x-30),max(0,y-30),min(768,x+w+30),min(1360,y+h+30)
    def o(im):
        bg=Image.new('RGBA',(X1-X0,Y1-Y0),(128,128,128,255)); bg.alpha_composite(im.crop((X0,Y0,X1,Y1))); return bg.convert('RGB').resize((int((X1-X0)*0.8),int((Y1-Y0)*0.8)))
    rows.append((r['ten'],[o(B),o(comp)]))
pickle.dump(kq, open(os.path.join(OUT,'mat-moi.pkl'),'wb'))
for t in range(0,len(rows),16):
    part=rows[t:t+16]; cw=max(sum(c.width for c in cs)+10 for _,cs in part); ch=max(cs[0].height for _,cs in part)+18
    cols=4; out=Image.new('RGB',(cols*cw,((len(part)+cols-1)//cols)*ch),(30,30,34)); dr=ImageDraw.Draw(out)
    for j,(ten,cs) in enumerate(part):
        X=(j%cols)*cw; Y=(j//cols)*ch; dr.text((X+3,Y+1),ten.replace('char-',''),font=font,fill=(253,230,138)); xx=X
        for c in cs: out.paste(c,(xx,Y+17)); xx+=c.width+4
    out.save(os.path.join(OUT,f'mat-moi-{t//16+1}.jpg'),quality=86)
print('xong', len(kq))
