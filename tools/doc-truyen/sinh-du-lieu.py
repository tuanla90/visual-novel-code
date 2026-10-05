# -*- coding: utf-8 -*-
"""Tách truyện chữ mùa 1 (docs/mua-1/truyen-chu/*.md) thành dữ liệu cho trang đọc truyện (tools/doc-truyen/doc-truyen.html).

Chạy ở gốc repo, SAU `npm run truyen-chu:mua1`:
    PYTHONIOENCODING=utf-8 python tools/doc-truyen/sinh-du-lieu.py <thư mục ra>
Ghi <thư mục ra>/du-lieu/muc-luc.json và <thư mục ra>/du-lieu/<vụ>-<n>.json (mỗi tệp dưới 40 KB, vì tệp chữ lớn
đăng lên Artifact hay lỗi). Trang chỉ đọc các tệp này; dữ liệu sinh ra không commit.
"""
import io
import json
import os
import re
import shutil
import sys

NGUON = 'docs/mua-1/truyen-chu'
TOI_DA = 40_000  # byte mỗi tệp dữ liệu

# Thứ tự và trạng thái hiện ở ô chọn vụ. "san-sang": đã làm lại theo khung mười vụ; "ban-cu": còn là bản năm vụ cũ.
DANH_SACH = [
    ('vu1', 'Vụ 1 · Chữ ký H', 'san-sang', 'Đã làm lại. Mới có 1 đối chất (chuẩn cần 3).'),
    ('vu-tin-don', 'Vụ 2 · Tin đồn', 'san-sang', 'Dựng lại 05/10/2026: 5 ngày, 8 màn tra, 3 đối chất. Lời mới còn đánh dấu "tạm".'),
    ('vu3', 'Vụ 3 cũ · Tranh cãi trong nhóm', 'ban-cu', 'Bản năm vụ cũ, chưa làm lại. Sẽ thành Vụ 4 "Nam ở đâu lúc 22:40".'),
    ('vu4', 'Vụ 4 cũ · Giúp Nam', 'ban-cu', 'Bản năm vụ cũ, chưa làm lại. Sẽ thành Vụ 6.'),
    ('vu5', 'Vụ 5 cũ · Sổ quỹ', 'ban-cu', 'Bản năm vụ cũ, chưa làm lại. Sẽ thành Vụ 8.'),
    ('so-phong', 'Việc phụ · Bốn mục trong sổ đã ký', 'ban-cu', 'Việc phụ, chưa rà lại theo khung mới.'),
    ('micro', 'Việc phụ · Chiếc micro', 'ban-cu', 'Việc phụ, chưa rà lại theo khung mới.'),
    ('hoan-tien', 'Việc phụ · Một lần hoàn tiền', 'ban-cu', 'Việc phụ, chưa rà lại theo khung mới.'),
    ('dan-lac', 'Việc phụ · Một lần dẫn lạc', 'ban-cu', 'Việc phụ, chưa rà lại theo khung mới.'),
    ('hoc-tro-cu', 'Việc phụ · Học trò cũ của cô', 'ban-cu', 'Việc phụ, chưa rà lại theo khung mới.'),
    ('tui-do', 'Việc phụ · Túi đồ trên ghế đá', 'ban-cu', 'Việc phụ, chưa rà lại theo khung mới.'),
]

RE_DOAN = re.compile(r'^### Đoạn (\d+): (.*)$', re.M)
RE_CHON = re.compile(r'^- \[(.+)\]\(#doan-(\d+)\)(.*)$')
RE_NGAY = re.compile(r'^((?:Thứ \S+|Chủ Nhật), \d{2}/\d{2}/\d{4})\b', re.M)


def tach(van_ban):
    """Trả về danh sách đoạn: so, tieuDe, md (thân, đã bỏ danh sách lựa chọn), chon, ngay."""
    moc = list(RE_DOAN.finditer(van_ban))
    doan = []
    for i, m in enumerate(moc):
        cuoi = moc[i + 1].start() if i + 1 < len(moc) else len(van_ban)
        than = van_ban[m.end():cuoi]
        dong_than, chon = [], []
        for dong in than.split('\n'):
            d = dong.rstrip()
            if re.fullmatch(r'<a id="doan-\d+"></a>', d) or d == '---' or d == '**Lựa chọn tiếp theo:**':
                continue
            c = RE_CHON.match(d)
            if c:
                chon.append({'nhan': c.group(1).strip(), 'toi': int(c.group(2)), 'them': c.group(3).strip()})
                continue
            dong_than.append(d)
        md = re.sub(r'\n{3,}', '\n\n', '\n'.join(dong_than)).strip()
        ngay = RE_NGAY.search(md)
        doan.append({
            'so': int(m.group(1)),
            'tieuDe': m.group(2).strip(),
            'md': md,
            'chon': chon,
            'ngay': ngay.group(1) if ngay else None,
        })
    return doan


NOI_DUNG = 'prototype/noi-dung-mua-1'
KHO_ANH = 'prototype/src/assets'
RE_ANH = re.compile(r'\[(?:CG|CHIBI|ẢNH) ([a-z][a-z0-9-]+)')
RE_CHUOI = re.compile(r'^### ([a-z0-9-]+) — (.*?) \{cảnh: ([a-z0-9-]+)[^}]*\}\s*$', re.M)


def lap_kho_anh():
    """Tên ảnh (không đuôi) → đường dẫn tệp trong kho ảnh của game."""
    kho = {}
    for goc, _, tep in os.walk(KHO_ANH):
        for t in tep:
            ten, duoi = os.path.splitext(t)
            if duoi.lower() in ('.webp', '.png', '.jpg', '.jpeg'):
                kho.setdefault(ten, os.path.join(goc, t))
    return kho


def lap_canh():
    """(tên chuỗi → mã cảnh) đọc từ kich-ban/, và (mã cảnh → tên ảnh nền) đọc từ canh.md (mặc định bg-mvp-<mã cảnh>)."""
    chuoi = {}
    kb = os.path.join(NOI_DUNG, 'kich-ban')
    for t in sorted(os.listdir(kb)):
        for m in RE_CHUOI.finditer(io.open(os.path.join(kb, t), encoding='utf-8').read().replace('\r\n', '\n')):
            chuoi.setdefault(m.group(2).strip(), m.group(3))
    nen, ma = {}, None
    for dong in io.open(os.path.join(NOI_DUNG, 'canh.md'), encoding='utf-8').read().replace('\r\n', '\n').split('\n'):
        m = re.match(r'^### ([a-z0-9-]+) — ', dong)
        if m:
            ma = m.group(1)
            nen.setdefault(ma, 'bg-mvp-' + ma)
        m = re.match(r'^- Ảnh nền: ([a-z0-9-]+)', dong)
        if m and ma:
            nen[ma] = m.group(1)
    return chuoi, nen


def gan_anh(doan, kho, chuoi, nen, can_chep):
    """Gắn cho mỗi đoạn: ảnh nền của cảnh (nen) và các ảnh được chèn (anh: mã → đường dẫn đăng, None nếu chưa có tệp)."""
    for d in doan:
        ma_canh = chuoi.get(d['tieuDe'])
        ten_nen = nen.get(ma_canh) if ma_canh else None
        d['nen'] = None
        if ten_nen and ten_nen in kho:
            d['nen'] = 'anh/' + os.path.basename(kho[ten_nen])
            can_chep[kho[ten_nen]] = d['nen']
        d['anh'] = {}
        for ma in dict.fromkeys(RE_ANH.findall(d['md'])):
            if ma in kho:
                d['anh'][ma] = 'anh/' + os.path.basename(kho[ma])
                can_chep[kho[ma]] = d['anh'][ma]
            else:
                d['anh'][ma] = None


def danh_lai_so(doan):
    """Đánh lại số đoạn theo THỨ TỰ ĐỌC (đi sâu theo lựa chọn đầu trước), vì tệp .md đánh số theo lớp nên đọc bị nhảy cóc
    (1 → 10 → 24 → 54…). Số trong tệp .md giữ ở soGoc để tra ngược."""
    theo_so = {d['so']: d for d in doan}
    thu_tu, da = [], set()
    ngan = [doan[0]['so']] if doan else []
    while ngan:
        so = ngan.pop()
        if so in da or so not in theo_so:
            continue
        da.add(so)
        thu_tu.append(so)
        for c in reversed(theo_so[so]['chon']):
            if c['toi'] not in da:
                ngan.append(c['toi'])
    thu_tu += [d['so'] for d in doan if d['so'] not in da]  # đoạn không có đường vào: xếp cuối
    moi = {cu: i + 1 for i, cu in enumerate(thu_tu)}
    ra = []
    for cu in thu_tu:
        d = theo_so[cu]
        d['soGoc'] = cu
        d['so'] = moi[cu]
        d['md'] = re.sub(r'\(#doan-(\d+)\)', lambda m: '(#doan-%d)' % moi.get(int(m.group(1)), int(m.group(1))), d['md'])
        for c in d['chon']:
            c['toi'] = moi.get(c['toi'], c['toi'])
        ra.append(d)
    return ra


def main():
    ra = sys.argv[1] if len(sys.argv) > 1 else '.'
    thu_muc = os.path.join(ra, 'du-lieu')
    os.makedirs(thu_muc, exist_ok=True)
    for cu in os.listdir(thu_muc):
        if cu.endswith('.json'):
            os.remove(os.path.join(thu_muc, cu))
    muc_luc = []
    kho = lap_kho_anh()
    chuoi, nen = lap_canh()
    can_chep = {}  # tệp ảnh trong kho → đường dẫn đăng (anh/<tên tệp>)
    for ma, ten, trang_thai, ghi_chu in DANH_SACH:
        duong = os.path.join(NGUON, ma + '.md')
        if not os.path.exists(duong):
            print('thiếu', duong)
            continue
        doan = danh_lai_so(tach(io.open(duong, encoding='utf-8').read().replace('\r\n', '\n')))
        gan_anh(doan, kho, chuoi, nen, can_chep)
        tep, lo, co = [], [], 2
        for d in doan:
            n = len(json.dumps(d, ensure_ascii=False).encode('utf-8')) + 1
            if lo and co + n > TOI_DA:
                tep.append(lo)
                lo, co = [], 2
            lo.append(d)
            co += n
        if lo:
            tep.append(lo)
        ten_tep = []
        for i, lo in enumerate(tep):
            t = '%s-%d.json' % (ma, i + 1)
            with io.open(os.path.join(thu_muc, t), 'w', encoding='utf-8', newline='\n') as f:
                json.dump(lo, f, ensure_ascii=False, separators=(',', ':'))
            ten_tep.append(t)
        muc_luc.append({
            'ma': ma, 'ten': ten, 'trangThai': trang_thai, 'ghiChu': ghi_chu, 'tep': ten_tep,
            'anhThieu': sorted({m for d in doan for m, p in d['anh'].items() if p is None}),
            'doan': [{'so': d['so'], 'soGoc': d['soGoc'], 'tieuDe': d['tieuDe'], 'ngay': d['ngay']} for d in doan],
        })
        print('%-11s %3d đoạn, %d tệp' % (ma, len(doan), len(ten_tep)))
    with io.open(os.path.join(thu_muc, 'muc-luc.json'), 'w', encoding='utf-8', newline='\n') as f:
        json.dump(muc_luc, f, ensure_ascii=False, separators=(',', ':'))
    lon = max(os.path.getsize(os.path.join(thu_muc, t)) for t in os.listdir(thu_muc))
    print('tệp lớn nhất: %d byte' % lon)
    # Số tệp của một vụ đổi theo độ dài nội dung (05/10: Vụ 1 từ 3 lên 4 tệp, đăng thiếu vu1-4.json nên trang không mở được Vụ 1).
    # Khi đăng, dán NGUYÊN danh sách dưới đây vào tham số `files`, đừng gõ tay.
    # Ảnh: chép các tệp được truyện nhắc tới sang <thư mục ra>/anh/ để đăng kèm; trang chỉ tải khi người đọc bấm "Xem ảnh".
    thu_muc_anh = os.path.join(ra, 'anh')
    os.makedirs(thu_muc_anh, exist_ok=True)
    for cu in os.listdir(thu_muc_anh):
        os.remove(os.path.join(thu_muc_anh, cu))
    for nguon, dich in can_chep.items():
        shutil.copyfile(nguon, os.path.join(ra, dich))
    tong = sum(os.path.getsize(os.path.join(thu_muc_anh, t)) for t in os.listdir(thu_muc_anh))
    thieu = sorted({m for v in muc_luc for m in v.get('anhThieu', [])})
    print('ảnh: %d tệp, %.1f MB; mã ảnh chưa có tệp: %s' % (len(can_chep), tong / 1e6, ', '.join(thieu) or 'không'))
    tep = ['du-lieu/' + t for t in sorted(os.listdir(thu_muc)) if t.endswith('.json')] + ['anh/' + t for t in sorted(os.listdir(thu_muc_anh))]
    with io.open(os.path.join(ra, 'files.json'), 'w', encoding='utf-8', newline='\n') as f:
        json.dump([{'path': t} for t in tep], f)
    print('files: %d tệp, danh sách ở %s (dán nguyên vào tham số `files`)' % (len(tep), os.path.join(ra, 'files.json')))


if __name__ == '__main__':
    main()
