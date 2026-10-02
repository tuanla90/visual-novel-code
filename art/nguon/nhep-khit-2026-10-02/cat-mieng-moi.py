# Cắt lại miếng MIỆNG từ ảnh Topview "miệng mở" (g2-<ảnh>--mieng.png): căn khớp cục bộ quanh miệng, chỉ lấy khối môi/răng,
# khớp màu da, mép mềm. Ngoài miệng = ảnh gốc → cổ áo, cằm, tóc không giật khi nhép.
import sys, os, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
from PIL import Image
from scipy import ndimage as nd
OUT=sys.argv[1]; G2='../art/nguon/topview-2026-10-01/g2'
def cat(r):
    src=f"{G2}/g2-{r['ten']}--mieng.png"
    if not os.path.exists(src): return None
    B=np.asarray(Image.open(r['base']).convert('RGBA')).astype(float); E=np.asarray(Image.open(src).convert('RGB').resize((768,1360),Image.LANCZOS)).astype(float)
    ex,ey,ew,eh=r['eb']
    X0,X1=max(0,ex-10),min(768,ex+ew+10); Y0,Y1=int(ey+eh*0.7),min(1360,ey+eh+200)
    if 'cua_so' in r: X0,Y0,X1,Y1=r['cua_so']  # cửa sổ tìm miệng cho sẵn (x0, y0, x1, y1)
    a=B[...,3]/255; g=lambda im: im[...,:3].mean(-1)
    # căn khớp: dịch E trong ±10px cho khớp B ở cửa sổ (chỉ chỗ có người)
    best=None; wB=g(B)[Y0:Y1,X0:X1]; m=a[Y0:Y1,X0:X1]>0.95
    for dy in range(-10,11):
        for dx in range(-10,11):
            sl=g(E)[Y0-dy:Y1-dy, X0-dx:X1-dx]
            if sl.shape!=wB.shape: continue
            s=np.abs(sl-wB)[m].mean()
            if best is None or s<best[0]: best=(s,dx,dy)
    _,dx,dy=best
    Es=np.roll(np.roll(E,dy,0),dx,1)
    d=nd.gaussian_filter(np.abs(Es[...,:3]-B[...,:3]).max(-1),1.5)*(a>0.6)
    w=d[Y0:Y1,X0:X1]; mm=w>28
    lab,n=nd.label(mm); best_c=None
    H,W=w.shape
    for i,sl in enumerate(nd.find_objects(lab),1):
        ys,xs=sl; dt=int((lab[sl]==i).sum())
        if dt<40 or ys.start<2 or ys.stop>H-2 or xs.start<2 or xs.stop>W-2: continue
        gon=dt/((ys.stop-ys.start)*(xs.stop-xs.start)); sc=w[lab==i].sum()*(0.3+gon)
        if best_c is None or sc>best_c[0]: best_c=(sc,i)
    if best_c is None: return dict(loi='khong thay moi', dx=dx, dy=dy)
    chon=lab==best_c[1]
    gan=nd.binary_dilation(chon,iterations=7)
    for i in range(1,n+1):
        if i!=best_c[1] and (gan&(lab==i)).any() and (lab==i).sum()<3000: chon|=lab==i
    giu=nd.binary_fill_holes(nd.binary_dilation(chon,iterations=5))
    mem=np.clip(nd.gaussian_filter(giu.astype(float),2.5)*1.3,0,1)
    full=np.zeros((1360,768)); full[Y0:Y1,X0:X1]=mem
    alpha=full*a
    ys,xs=np.where(alpha>0.02); y0,y1,x0,x1=ys.min()-2,ys.max()+3,xs.min()-2,xs.max()+3
    # khớp màu: chênh lệch trung bình ở vành da quanh vùng giữ
    vanh=nd.binary_dilation(giu,iterations=10)&~nd.binary_dilation(giu,iterations=4)
    vf=np.zeros((1360,768),bool); vf[Y0:Y1,X0:X1]=vanh; vf&=a>0.95
    lech=(Es[...,:3][vf]-B[...,:3][vf]).mean(0) if vf.any() else np.zeros(3)
    rgb=np.clip(Es[y0:y1,x0:x1,:3]-lech,0,255)
    patch=np.dstack([rgb, alpha[y0:y1,x0:x1]*255]).astype('uint8')
    return dict(img=Image.fromarray(patch,'RGBA'), box=[int(x0),int(y0),int(x1-x0),int(y1-y0)], dx=dx, dy=dy, lech=[round(float(v),1) for v in lech], doi=int(chon.sum()))
kq={}; rows=[]
for r in doc_rigs():
    k=cat(r)
    if k is None: print(f"{r['ten']:30s} (khong co anh nguon)"); continue
    if 'loi' in k: print(f"{r['ten']:30s} LOI {k}"); continue
    kq[r['ten']]=k; print(f"{r['ten']:30s} hop {k['box']} dich ({k['dx']},{k['dy']}) mau {k['lech']} moi {k['doi']}px")
    B=Image.open(r['base']).convert('RGBA'); x,y,w,h=k['box']
    comp=B.copy(); comp.alpha_composite(k['img'],(x,y))
    # ô soi quanh miệng ±45px, nền xám
    X0,Y0,X1,Y1=max(0,x-45),max(0,y-45),min(768,x+w+45),min(1360,y+h+45)
    def o(im):
        bg=Image.new('RGBA',(X1-X0,Y1-Y0),(128,128,128,255)); bg.alpha_composite(im.crop((X0,Y0,X1,Y1))); return bg.convert('RGB').resize((int((X1-X0)*1.6),int((Y1-Y0)*1.6)))
    rows.append((r['ten'],o(B),o(comp)))
json.dump({t:{'box':v['box'],'dx':v['dx'],'dy':v['dy']} for t,v in kq.items()}, open(os.path.join(OUT,'mieng-moi.json'),'w'), indent=1)
import pickle; pickle.dump({t:(v['img'],v['box']) for t,v in kq.items()}, open(os.path.join(OUT,'mieng-moi.pkl'),'wb'))
from PIL import ImageDraw, ImageFont
font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 15)
for t in range(0,len(rows),10):
    part=rows[t:t+10]; cw=max(a.width+b.width for _,a,b in part)+16; ch=max(a.height for _,a,b in part)+22
    cols=5; out=Image.new('RGB',(cols*cw,((len(part)+cols-1)//cols)*ch),(30,30,34)); dr=ImageDraw.Draw(out)
    for j,(ten,a_,b_) in enumerate(part):
        X=(j%cols)*cw; Y=(j//cols)*ch; dr.text((X+4,Y+2),ten.replace('char-',''),font=font,fill=(253,230,138)); out.paste(a_,(X,Y+20)); out.paste(b_,(X+a_.width+6,Y+20))
    out.save(os.path.join(OUT,f'mieng-moi-{t//10+1}.jpg'),quality=86)
print('xong', len(kq))
