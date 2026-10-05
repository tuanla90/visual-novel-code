# DỰNG BẢNG PHÂN CẢNH từ kết quả của quay.mjs: một tệp chữ (từng bước: trên hình có ai, thẻ tên ghi gì, câu chữ) và các
# tấm ảnh ghép (mỗi tấm 6 khung, có số khung và chú thích) để người hay model khác xem như đang xem người ta chơi.
#
# Dùng: python tools/quay-van/dung-bang.py <thư mục quay> [--phan 3]
# Ra:   <thư mục quay>/xem/phan-<n>/phan-canh.md và tam-<nn>.jpg
import io, json, os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont

goc = sys.argv[1]
so_phan = int(sys.argv[sys.argv.index('--phan') + 1]) if '--phan' in sys.argv else 3
buoc = json.load(io.open(os.path.join(goc, 'buoc.json'), encoding='utf-8'))

def phong(co):
    for f in ('C:/Windows/Fonts/segoeui.ttf', 'C:/Windows/Fonts/arial.ttf'):
        if os.path.exists(f):
            return ImageFont.truetype(f, co)
    return ImageFont.load_default()

KIEU = {'line': 'lời', 'feedback': 'phản hồi', 'explore': 'cảnh bấm', 'branch': 'rẽ nhánh', 'question': 'câu hỏi', 'challenge': 'màn tra', 'fix-query': 'sửa câu tra',
        'hoi-dap': 'hỏi nhân chứng', 'image': 'ảnh chèn', 'show-document': 'tài liệu', 'create-character': 'đặt tên/ngành', 'doi-chat': 'đối chất', 'end': 'kết',
        'trial-filter': 'lọc thử', 'projector': 'màn chiếu', 'line-pick': 'chọn dòng', 'notebook-lookup': 'tra sổ', 'effect': 'hiệu ứng'}

def ta(b):
    """Một dòng chữ tả bước này."""
    k = b['kind']
    if k in ('line', 'feedback'):
        if b.get('the'):
            return 'THẺ "NHÂN VẬT MỚI" bật lên: ' + b.get('chuThe', '')
        if b.get('theChu'):
            return 'THẺ CHỮ giữa màn: "' + b.get('chu', '') + '"'
        ten = b.get('tenHien') or ('(lời dẫn)' if b.get('maNguoiNoi') == 'narrator' else '?')
        that = b.get('nguoiNoi', '')
        ghi = '' if ten in (that, 'Bạn', '(lời dẫn)') or not ten else f' [thật ra là {that}]'
        return f'{ten}{ghi}: {b.get("chu", "")}'
    if k == 'explore':
        diem = '; '.join(('(đã xem) ' if d['daXem'] else '') + d['nhan'] + (f' [{d["dau"]}]' if d.get('dau') else '') for d in b.get('diem', []))
        loai = {'ban-do': 'BẢN ĐỒ', 'quan-sat': 'MÀN QUAN SÁT một người'}.get(b.get('kieu'), 'CẢNH BẤM')
        return f'{loai}, các điểm bấm: {diem}' + (f' | nút rời: "{b["roi"]}"' if b.get('roi') else '')
    if k in ('branch', 'question'):
        return f'LỰA CHỌN: {b.get("hoi", "")} → ' + ' / '.join(b.get('luaChon', []))
    if k in ('challenge', 'fix-query'):
        return f'MÀN TRA "{b.get("tieuDe", "")}" ({b.get("thuThach", "")}). Đề: {b.get("deBai", "")}'
    if k == 'hoi-dap':
        nk = b.get('nhatKy', [])
        cuoi = f'{nk[-1]["ai"]}: {nk[-1]["chu"]}' if nk else ''
        ds = '; '.join(('[x] ' if d['xong'] else '[ ] ') + d['cau'] for d in b.get('danhSach', []))
        return f'KHUNG HỎI {b.get("nhanChung", "")} (cách: {b.get("cachChoi", "")}). Dòng mới nhất: {cuoi} | Cần làm rõ: {ds}'
    if k == 'image':
        return f'ẢNH CHÈN toàn màn: {b.get("anh", "")}'
    if k == 'show-document':
        return f'TÀI LIỆU hiện ra: {b.get("taiLieu", "")}'
    if k == 'create-character':
        return f'MÀN ĐẶT TÊN / CHỌN NGÀNH. Câu hỏi: {b.get("hoi", "")}'
    if k == 'doi-chat':
        return f'ĐỐI CHẤT. Giả thuyết: {b.get("giaThuyet", "")} | Câu hỏi: {b.get("cauHoi", "")}'
    if k == 'end':
        return f'MÀN KẾT ({b.get("ketQua", "")})'
    return KIEU.get(k, k)

# Chia phần theo số khung ảnh, cắt ở chỗ đổi chuỗi.
co_anh = [i for i, b in enumerate(buoc) if b.get('anh')]
moi_phan = max(1, len(co_anh) // so_phan + 1)
cat = [0]
dem = 0
for i, b in enumerate(buoc):
    if b.get('anh'):
        dem += 1
    if dem >= moi_phan and i + 1 < len(buoc) and buoc[i + 1].get('chuoi') != b.get('chuoi'):
        cat.append(i + 1)
        dem = 0
cat.append(len(buoc))

RONG, CAO, CHU = 800, 450, 64
f_so, f_chu = phong(26), phong(17)
for p in range(len(cat) - 1):
    doan = buoc[cat[p]:cat[p + 1]]
    if not doan:
        continue
    ra = os.path.join(goc, 'xem', f'phan-{p + 1}')
    os.makedirs(ra, exist_ok=True)
    khung = [b for b in doan if b.get('anh')]
    # Tấm ảnh ghép: 3 cột x 2 hàng.
    tam_cua = {}
    for t in range(0, len(khung), 6):
        nhom = khung[t:t + 6]
        tam = Image.new('RGB', (RONG * 3, (CAO + CHU) * 2), (18, 18, 22))
        ve = ImageDraw.Draw(tam)
        for j, b in enumerate(nhom):
            x, y = (j % 3) * RONG, (j // 3) * (CAO + CHU)
            anh = Image.open(os.path.join(goc, 'anh', b['anh'])).convert('RGB').resize((RONG, CAO), Image.LANCZOS)
            tam.paste(anh, (x, y))
            ve.rectangle([x, y, x + 150, y + 36], fill=(200, 30, 30))
            ve.text((x + 8, y + 2), f'KHUNG {b["so"]}', font=f_so, fill=(255, 255, 255))
            chu = textwrap.shorten(ta(b), width=170, placeholder='…')
            for d, dong in enumerate(textwrap.wrap(chu, width=92)[:3]):
                ve.text((x + 8, y + CAO + 3 + d * 20), dong, font=f_chu, fill=(235, 235, 235))
        ten = f'tam-{t // 6 + 1:02d}.jpg'
        tam.save(os.path.join(ra, ten), quality=80)
        for b in nhom:
            tam_cua[b['so']] = ten
    # Tệp chữ.
    dong = [f'# Bảng phân cảnh, phần {p + 1} (bước {doan[0]["so"]} tới {doan[-1]["so"]})', '',
            'Mỗi dòng là một lần màn hình đổi. "KHUNG n" là ảnh chụp thật lúc đó (nằm trong tấm ảnh ghép ghi bên cạnh); bước không ghi khung thì hình giữ như khung gần nhất phía trên, chỉ đổi chữ trong hộp thoại.',
            '"Trên hình" là những nhân vật đang được vẽ đứng trên màn (chân dung lớn). Câu trong ngoặc đơn là người chơi nghĩ thầm.', '']
    chuoi = None
    for b in doan:
        if b.get('chuoi') != chuoi:
            chuoi = b.get('chuoi')
            dong += ['', f'## Đoạn `{chuoi}` · nơi: {b.get("tenCanh", "")} · ngày trong truyện: {b.get("ngayThang") or "?"}', '']
        khung_ghi = f'**KHUNG {b["so"]}** ({tam_cua.get(b["so"], "")})' if b.get('anh') else f'bước {b["so"]}'
        dan = ', '.join(b.get('dan') or []) or 'không ai'
        phu = f' · ô "Đi cùng": {", ".join(b["diCung"])}' if b.get('diCung') else ''
        dong.append(f'- {khung_ghi} · trên hình: {dan}{phu}\n  - {ta(b)}')
    io.open(os.path.join(ra, 'phan-canh.md'), 'w', encoding='utf-8', newline='\n').write('\n'.join(dong) + '\n')
    print(f'phần {p + 1}: {len(doan)} bước, {len(khung)} khung, {(len(khung) + 5) // 6} tấm → {ra}')
