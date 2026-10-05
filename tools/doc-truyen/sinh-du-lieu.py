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
    for ma, ten, trang_thai, ghi_chu in DANH_SACH:
        duong = os.path.join(NGUON, ma + '.md')
        if not os.path.exists(duong):
            print('thiếu', duong)
            continue
        doan = danh_lai_so(tach(io.open(duong, encoding='utf-8').read().replace('\r\n', '\n')))
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
            'doan': [{'so': d['so'], 'soGoc': d['soGoc'], 'tieuDe': d['tieuDe'], 'ngay': d['ngay']} for d in doan],
        })
        print('%-11s %3d đoạn, %d tệp' % (ma, len(doan), len(ten_tep)))
    with io.open(os.path.join(thu_muc, 'muc-luc.json'), 'w', encoding='utf-8', newline='\n') as f:
        json.dump(muc_luc, f, ensure_ascii=False, separators=(',', ':'))
    lon = max(os.path.getsize(os.path.join(thu_muc, t)) for t in os.listdir(thu_muc))
    print('tệp lớn nhất: %d byte' % lon)


if __name__ == '__main__':
    main()
