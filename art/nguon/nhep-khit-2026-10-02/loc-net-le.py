# Lọc nét lẻ: bỏ khỏi miếng những vệt mảnh (viền má, gọng kính, sống mũi) và đốm nhỏ xa mắt/miệng — chỉ giữ khối mắt/miệng.
# Bước 4. Dùng: python loc-net-le.py [tên ảnh…] [--ghi]   (không --ghi: chỉ xuất ảnh soi moi/loc-*.png: đỏ = giữ, xanh = bỏ)
import sys, os, json, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rigs_lib import doc_rigs
from PIL import Image
from scipy import ndimage as nd
SC=os.path.dirname(os.path.abspath(__file__))
GHI='--ghi' in sys.argv
NG=18
def dia(r):
    y,x=np.ogrid[-r:r+1,-r:r+1]; return x*x+y*y<=r*r
kq={}
TILES=[]
from PIL import ImageDraw
CHON=[a for a in sys.argv[1:] if not a.startswith('--')]
for r in doc_rigs():
    base=np.asarray(Image.open(r['base']).convert('RGBA')).astype(float)
    if CHON and r['ten'] not in CHON: continue
    kq[r['ten']]={}
    for k in ('mouth','eyes'):
        b=r['mb'] if k=='mouth' else r['eb']
        P=np.asarray(Image.open(r[k]).convert('RGBA')).astype(float)
        x,y,w,h=b; Bc=base[y:y+h,x:x+w]
        a=P[...,3:]/255
        comp=P[...,:3]*a+Bc[...,:3]*(1-a)
        d=(np.abs(comp-Bc[...,:3]).max(-1)>NG)
        MAT_DA_NHAM=('char-tung-happy','char-tung-ao-xanh-happy')
        if k=='eyes' and r['ten'] in MAT_DA_NHAM: d=np.zeros_like(d)  # ảnh cười híp mắt: mắt đã nhắm sẵn, không chớp
        # mắt: bỏ vệt mảnh (lông mày, tóc, gọng kính, viền má) bằng phép mở; miệng: viền môi mảnh là của miệng nên chỉ bỏ cụm rời
        if k=='eyes': d2=nd.binary_opening(d,structure=dia(3))
        else:  # miệng: viền môi mảnh là của miệng nên giữ hết, chỉ bỏ cụm rời; riêng Tùng áo xanh lo lắng có vệt sống mũi sát mép phải
            if r['ten']=='char-tung-ao-xanh-worried': d[:28,70:]=False
            d2=nd.binary_dilation(d,structure=dia(2))
        lab,n=nd.label(d2)
        if n==0: keep=np.zeros_like(d)
        else:
            s=nd.sum(d2,lab,range(1,n+1)); giu=[i+1 for i,v in enumerate(s) if v>=0.25*s.max()]
            keep=np.isin(lab,giu)
        # nới lại phần viền mềm của chính khối (chỉ trong vùng khác biệt gốc + 2px), rồi làm mềm
        vung=nd.binary_dilation(keep,structure=dia(4)) & nd.binary_dilation(d,structure=dia(2))
        vung=nd.binary_fill_holes(vung|keep)
        m=nd.gaussian_filter(nd.binary_dilation(vung,structure=dia(2)).astype(float),1.5)
        m=np.clip(m*1.6,0,1)
        na=P[...,3]*m
        bo=(d & ~(m>0.5)).sum()
        X=Bc[...,:3]*0+comp; v=np.clip(X,0,255).astype(np.uint8).copy()
        kept=(m>0.5)&d; rem=d&~(m>0.5)
        v[kept]=(v[kept]*0.4+np.array([255,0,0])*0.6).astype(np.uint8); v[rem]=(v[rem]*0.2+np.array([0,90,255])*0.8).astype(np.uint8)
        T=Image.fromarray(v); s=min(260/T.width,150/T.height); T=T.resize((int(T.width*s),int(T.height*s)),Image.NEAREST)
        TT=Image.new('RGB',(270,170),'white'); TT.paste(T,(5,15)); ImageDraw.Draw(TT).text((3,1),r['ten'][5:]+' '+k,fill='green'); TILES.append(TT)
        ys,xs=np.nonzero(na>3)
        if len(ys)==0:
            kq[r['ten']][k]=dict(trong=True, bo=int(bo)); continue
        x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
        out=P.copy(); out[...,3]=na
        out=out[y0:y1,x0:x1]
        nb=[int(x+x0),int(y+y0),int(x1-x0),int(y1-y0)]
        kq[r['ten']][k]=dict(cu=b,moi=nb,bo=int(bo))
        if GHI:
            Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA').save(r[k],'WEBP',quality=92,alpha_quality=100,method=6)
for t,v in kq.items(): print(t, {k:(vv.get('moi'),vv['bo'],'TRONG' if vv.get('trong') else '') for k,vv in v.items()})
json.dump(kq,open(os.path.join(SC,'moi','loc-net.json'),'w'),indent=1)

cols=4; rows=(len(TILES)+cols-1)//cols
S=Image.new('RGB',(270*cols,170*rows),'white')
for i,tt in enumerate(TILES): S.paste(tt,((i%cols)*270,(i//cols)*170))
h=(rows+1)//2*170
S.crop((0,0,S.width,h)).save(os.path.join(SC,'moi','loc-1.png')); S.crop((0,h,S.width,S.height)).save(os.path.join(SC,'moi','loc-2.png'))
