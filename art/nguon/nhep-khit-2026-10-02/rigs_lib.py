# Đọc danh sách bộ nhép (tên ảnh, tệp miếng, hộp) từ nhep-moi-mvp.ts và talk-rigs.ts. Chạy các công cụ từ thư mục prototype/.
import re, glob, io, os
def doc(p): return io.open(p, encoding='utf-8').read()
def tim_anh(ten):
    for ext in ('webp','png','jpg'):
        g=glob.glob(f'src/assets/**/{ten}.{ext}', recursive=True)
        if g: return g[0]
def doc_rigs():
    rigs=[]
    t=doc('src/mvp/ui/nhep-moi-mvp.ts')
    imp={m.group(1): os.path.normpath(os.path.join('src/mvp/ui', m.group(2))) for m in re.finditer(r"import (\w+) from '(\./nhep/[^']+)';", t)}
    for m in re.finditer(r"bo\('([^']+)', (\w+), \[(\d+), (\d+), (\d+), (\d+)\], (\w+), \[(\d+), (\d+), (\d+), (\d+)\]\)", t):
        rigs.append(dict(tep='mvp', ten=m.group(1), base=tim_anh(m.group(1)), mouth=imp[m.group(2)], mb=[int(m.group(i)) for i in range(3,7)], eyes=imp[m.group(7)], eb=[int(m.group(i)) for i in range(8,12)]))
    t=doc('src/shared/ui/visuals/talk-rigs.ts')
    imp2={m.group(1): os.path.normpath(os.path.join('src/shared/ui/visuals', m.group(2))) for m in re.finditer(r"import (\w+) from '(\./talk/[^']+)';", t)}
    for m in re.finditer(r"sourceFile: '([^']+)',\s*width: \d+,\s*height: \d+,\s*mouth: \{ src: (\w+), x: (\d+), y: (\d+), w: (\d+), h: (\d+) \},\s*eyes: \{ src: (\w+), x: (\d+), y: (\d+), w: (\d+), h: (\d+) \}", t):
        rigs.append(dict(tep='talk', ten=os.path.basename(m.group(1)).rsplit('.',1)[0], base=m.group(1).lstrip('/'), mouth=imp2[m.group(2)], mb=[int(m.group(i)) for i in range(3,7)], eyes=imp2[m.group(7)], eb=[int(m.group(i)) for i in range(8,12)]))
    return rigs
