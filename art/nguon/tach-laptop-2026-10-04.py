import sys
from PIL import Image, ImageDraw
src, out, kiem = sys.argv[1:4]
im = Image.open(src).convert('RGB'); W, H = im.size
C = 798  # tâm: webcam
trai = [(262, 15), (240, 19), (230, 30), (225, 100), (218, 400), (214, 650), (212, 700), (209, 720), (190, 750), (148, 800), (117, 850), (102, 880), (104, 892), (112, 896)]
phai = [(2 * C - x, y) for x, y in reversed(trai)]
K = 4
m = Image.new('L', (W * K, H * K), 0)
ImageDraw.Draw(m).polygon([(x * K, y * K) for x, y in trai + phai], fill=255)
m = m.resize((W, H), Image.LANCZOS)
rgba = im.copy(); rgba.putalpha(m)
rgba.save(out, 'WEBP', quality=90, alpha_quality=100, method=6)
nen = Image.new('RGB', (W, H), (40, 200, 90)); nen.paste(rgba, mask=m); nen.save(kiem)
