# -*- coding: utf-8 -*-
"""Tự kiểm các tờ dữ kiện nháp (gói B12, Vụ 1) trong thư mục này.

Chạy ở gốc repo:  PYTHONIOENCODING=utf-8 python docs/mua-1/hoi-dap-nhap/tu-kiem.py
(không đối số: kiểm mọi tệp *.json cùng thư mục; có đối số: chỉ kiểm các tệp ấy)

Luật lấy từ docs/mua-1/brief/b12-vu-1.md, tools/thu-hoi-dap/kiem-bien-the.py và
prototype/noi-dung-mua-1/giong/luat-giong.md (xưng hô, giọng miền Nam, gạch dài, ngoặc cong).
Mã thoát 1 nếu có lỗi.
"""
import glob
import io
import json
import os
import re
import sys

SO = r'(?:một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười một|mười hai|mười|\d{1,2})'
MOC_GIO = re.compile(r'(?<!\w)(?:' + SO + r' (?:giờ|rưỡi)(?: (?:sáng|trưa|chiều|tối|đêm))?|\d{1,2}:\d{2}|\d{1,2}h\d{0,2})(?!\w)', re.I)

Y_DINH_CHUNG = ['chao', 'cam-on', 'hoi-mo', 'tam-biet', 'khong-ro', 'ngoai-le', 'hoi-rieng-tu', 'pha-game', 'doi-dap-an']

# Xưng hô: từ mà nhân chứng không được nói (giong/luat-giong.md, mục "## Xưng hô"; Hiếu theo Vụ 1).
KHONG_NOI = {
    'bac-tu': ['tôi', 'tớ'],
    'chu-cuong': ['tôi', 'tớ'],
    'ba-lua': ['tôi', 'tớ'],
    'co-hanh': ['tôi', 'tớ', 'cháu'],
    'co-lan': ['tôi', 'tớ', 'cháu'],
    'hieu': ['tớ', 'các cậu'],
    'quan': ['tớ', 'cậu', 'các cậu'],
}
# "Không xưng tên: có" (nhan-vat.md): lời của chính nhân chứng không chứa tên mình.
TEN_RIENG = {'bac-tu': 'Thịnh', 'co-hanh': 'Hạnh', 'co-lan': 'Lan', 'ba-lua': 'Lụa'}
# Người ngoài CLB không nói từ nhà nghề (VH-22). Cô Hạnh, cô Lan tự nói "cột", "bảng" trong lời gốc nên không tính.
NGOAI_CLB_KHONG_NOI = {
    k: ['cột', 'truy vấn', 'SQL', 'câu lệnh', 'dữ liệu', 'cơ sở dữ liệu']
    for k in ['bac-tu', 'chu-cuong', 'ba-lua', 'hieu']
}
# Người chơi nói với cán bộ: xưng em, không "cháu", không từ nhà nghề (luat-giong.md, "## Xưng theo người có mặt").
CAN_BO = {'co-hanh', 'co-lan', 'thay-quang'}
NGUOI_CHOI_VOI_NGOAI = ['cột', 'truy vấn', 'SQL', 'câu lệnh', 'chạy lệnh']
MIEN_NAM = ['ủa', 'nè', 'hông', 'tui', 'nhen', 'nghen', 'dzậy', 'tùm lum', 'cha nội']
KY_TU_CAM = ['—', '“', '”', '‘', '’']
SQL = re.compile(r'(?<!\w)(SQL|SELECT|WHERE|JOIN|LIKE|AND|OR|VÀ|HOẶC|truy vấn|câu lệnh|cú pháp|mệnh đề)(?!\w)')
MO_CAM = re.compile(r'^\s*(Có|Không|Ừ|Vâng)(?!\w)')


def co_tu(chu, tu):
    """Có từ `tu` đứng riêng trong `chu` (không phân biệt hoa thường, ranh giới chữ Unicode)."""
    return re.search(r'(?<!\w)' + re.escape(tu) + r'(?!\w)', chu, re.I) is not None


def loi_nhan_chung(d):
    """Mọi câu do nhân chứng nói trong tờ: (chỗ, câu)."""
    ra = []
    for x in d.get('duKien', []):
        for k, c in x.get('bienThe', {}).items():
            ra.append(('%s/%s' % (x['ma'], k), c))
        for i, c in enumerate(x.get('tuChoi', [])):
            ra.append(('%s/tuChoi[%d]' % (x['ma'], i), c))
    for lop, v in d.get('lopKhac', {}).items():
        for i, c in enumerate(v.get('loi', [])):
            ra.append(('lopKhac.%s[%d]' % (lop, i), c))
        for i, c in enumerate(v.get('hetKe', [])):
            ra.append(('lopKhac.%s.hetKe[%d]' % (lop, i), c))
    for t in d.get('chuDeKhongBiet', []):
        for i, c in enumerate(t.get('loi', [])):
            ra.append(('chuDeKhongBiet.%s[%d]' % (t.get('ma'), i), c))
    g = d.get('gioiHan')
    if g:
        if g.get('baoTruoc'):
            ra.append(('gioiHan.baoTruoc', g['baoTruoc'].get('loi', '')))
        ra.append(('gioiHan.het', g.get('het', '')))
    return ra


GOC_ND = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'prototype', 'noi-dung-mua-1'))
_LOI_CHUOI = None


def loi_cua_chuoi():
    """{mã chuỗi: toàn bộ lời viết sẵn (các [LỜI …] của chuỗi trong kich-ban/, lấy chữ ở loi/)}."""
    global _LOI_CHUOI
    if _LOI_CHUOI is not None:
        return _LOI_CHUOI
    doan = {}
    for p in glob.glob(os.path.join(GOC_ND, 'loi', '*.md')):
        ma = None
        for dong in io.open(p, encoding='utf-8'):
            m = re.match(r'^## (\S+)\s*$', dong)
            if m:
                ma = m.group(1)
                doan.setdefault(ma, [])
                continue
            m = re.match(r'^- \*\*[^*]+\*\*(?: \([^)]*\))?: (.*)$', dong)
            if ma and m:
                doan[ma].append(m.group(1))
    chuoi = {}
    for p in glob.glob(os.path.join(GOC_ND, 'kich-ban', '*.md')):
        ma = None
        for dong in io.open(p, encoding='utf-8'):
            m = re.match(r'^### (\S+) ', dong)
            if m:
                ma = m.group(1)
                chuoi.setdefault(ma, [])
                continue
            m = re.match(r'^- \[LỜI (\S+)\]', dong)
            if ma and m:
                chuoi[ma].extend(doan.get(m.group(1), []))
    _LOI_CHUOI = {k: '\n'.join(v) for k, v in chuoi.items()}
    return _LOI_CHUOI


def moi_chuoi(o, duong=''):
    if isinstance(o, str):
        yield duong, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from moi_chuoi(v, duong + '.' + k if duong else k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from moi_chuoi(v, '%s[%d]' % (duong, i))


def kiem(duong):
    loi = []
    try:
        d = json.load(io.open(duong, encoding='utf-8'))
    except Exception as e:  # JSON hỏng
        return ['JSON không hợp lệ: %s' % e], None
    ten_tep = os.path.splitext(os.path.basename(duong))[0]
    if d.get('ma') != ten_tep:
        loi.append('mã "%s" khác tên tệp "%s"' % (d.get('ma'), ten_tep))
    for k in ['ma', 'nhanChung', 'nguoiDiCung', 'moDau', 'tuDongDuKien', 'danhSach', 'duKien', 'lopKhac', 'chuDeKhongBiet', 'tuKhoaTrongChuyen', 'roiDi']:
        if k not in d:
            loi.append('thiếu trường "%s"' % k)
    nc = d.get('nhanChung')
    dk = d.get('duKien', [])
    theo_ma = {x['ma']: x for x in dk}
    if not 3 <= len(dk) <= 6:
        loi.append('cần 3 tới 6 dữ kiện, đang có %d' % len(dk))
    tat_ca_bat_buoc = [c.lower() for x in dk for c in x.get('chuBatBuoc', [])]

    # --- Danh sách cần làm rõ ---
    trong_ds = []
    for m in d.get('danhSach', []):
        if m.get('moManhMoi') and not m['moManhMoi'].startswith('clue-'):
            loi.append('danhSach %s: moManhMoi "%s" không phải mã clue-…' % (m['ma'], m['moManhMoi']))
        for ma in m.get('can', []):
            if ma not in theo_ma:
                loi.append('danhSach %s: không có dữ kiện "%s"' % (m['ma'], ma))
            elif ma not in trong_ds:
                trong_ds.append(ma)
    for ma in d.get('tuDongDuKien', []):
        if ma not in theo_ma:
            loi.append('tuDongDuKien: không có dữ kiện "%s"' % ma)
    for ma in trong_ds:
        if ma not in d.get('tuDongDuKien', []):
            loi.append('tuDongDuKien thiếu "%s" (dữ kiện trong danh sách)' % ma)
    # Cách "xem cả đoạn": lời viết sẵn của chuỗi phải nói ra đủ chữ bắt buộc của mọi dữ kiện trong tuDongDuKien.
    loi_goc = loi_cua_chuoi().get(d.get('ma'))
    if loi_goc is None:
        loi.append('không tìm thấy chuỗi "%s" trong kich-ban/' % d.get('ma'))
    else:
        for ma in d.get('tuDongDuKien', []):
            for c in theo_ma.get(ma, {}).get('chuBatBuoc', []):
                if c.lower() not in loi_goc.lower():
                    loi.append('tuDongDuKien "%s": lời viết sẵn của chuỗi không nói "%s"' % (ma, c))

    # --- Giới hạn ---
    g = d.get('gioiHan')
    if g:
        if g.get('soCau', 0) < len(trong_ds) + 3:
            loi.append('gioiHan.soCau = %s < %d dữ kiện trong danh sách + 3' % (g.get('soCau'), len(trong_ds)))
        if g.get('lyDo') not in ('ban', 'phien'):
            loi.append('gioiHan.lyDo phải là "ban" hoặc "phien"')
        if not g.get('het') or not (g.get('baoTruoc') or {}).get('loi'):
            loi.append('gioiHan thiếu "het" hoặc "baoTruoc.loi"')

    # --- Từng dữ kiện ---
    for x in dk:
        ma = x['ma']
        if not x.get('nguon'):
            loi.append('%s: thiếu "nguon"' % ma)
        if not x.get('giayNho'):
            loi.append('%s: thiếu "giayNho"' % ma)
        bat_buoc = [c.lower() for c in x.get('chuBatBuoc', [])]
        bt = x.get('bienThe', {})
        if 'thang' not in bt or 'lai' not in bt:
            loi.append('%s: phải có biến thể "thang" và "lai"' % ma)
        for kieu, cau in bt.items():
            thap = cau.lower()
            for c in bat_buoc:
                if c not in thap:
                    loi.append('%s/%s: thiếu chữ bắt buộc "%s"' % (ma, kieu, c))
            for m in MOC_GIO.finditer(cau):
                if not any(m.group(0).lower() in c for c in bat_buoc):
                    loi.append('%s/%s: có mốc giờ lạ "%s"' % (ma, kieu, m.group(0)))
        if 'co-khong' in bt and MO_CAM.match(bt['co-khong']):
            loi.append('%s/co-khong: mở bằng "%s"' % (ma, MO_CAM.match(bt['co-khong']).group(1)))
        if x.get('nhoRa') and 'nho' not in bt:
            loi.append('%s: nhoRa mà thiếu biến thể "nho"' % ma)
        if len(x.get('cauHoiMau', [])) < 6:
            loi.append('%s: cần ít nhất 6 câu hỏi mẫu, đang có %d' % (ma, len(x.get('cauHoiMau', []))))
        if x.get('canCo') and not x.get('tuChoi'):
            loi.append('%s: có canCo mà thiếu tuChoi' % ma)
        if ma in trong_ds:
            gy = x.get('goiY')
            if not gy or not gy.get('bac1') or not gy.get('bac2'):
                loi.append('%s: nằm trong danh sách nhưng thiếu gợi ý hai bậc' % ma)
            else:
                if any(c in gy['bac1'].lower() for c in bat_buoc):
                    loi.append('%s: gợi ý bậc 1 lộ chữ bắt buộc' % ma)
                if not gy['bac2'].rstrip().endswith('?'):
                    loi.append('%s: gợi ý bậc 2 phải là một câu hỏi' % ma)
                if x.get('cauHoiMau') and gy['bac2'] != x['cauHoiMau'][0]:
                    loi.append('%s: câu hỏi mẫu đầu tiên phải trùng gợi ý bậc 2' % ma)
                if gy.get('ai') not in ('ha-vy', 'tung'):
                    loi.append('%s: goiY.ai phải là ha-vy hoặc tung' % ma)
                for bac in ('bac1', 'bac2'):
                    m = SQL.search(gy[bac])
                    if m:
                        loi.append('%s: gợi ý %s có thuật ngữ SQL "%s"' % (ma, bac, m.group(1)))
                if gy.get('ai') == 'ha-vy' and 'cá là' in gy['bac1']:
                    loi.append('%s: "Tớ cá là" là câu của Tùng, không phải Hà Vy' % ma)
                if gy.get('ai') == 'tung' and 'cá là' not in gy['bac1']:
                    loi.append('%s: gợi ý của Tùng nên là kiểu đoán ("Tớ cá là…")' % ma)
                if co_tu(gy['bac1'], 'tôi') or co_tu(gy['bac2'], 'tôi'):
                    loi.append('%s: bạn đi cùng không xưng "tôi"' % ma)
        # Người chơi hỏi cán bộ: không "cháu", không từ nhà nghề.
        for cau in x.get('cauHoiMau', []):
            if nc in CAN_BO and co_tu(cau, 'cháu'):
                loi.append('%s: câu hỏi mẫu xưng "cháu" với cán bộ: "%s"' % (ma, cau))
            for tu in NGUOI_CHOI_VOI_NGOAI:
                if co_tu(cau, tu):
                    loi.append('%s: câu hỏi mẫu có từ nhà nghề "%s": "%s"' % (ma, tu, cau))

    # --- Ý định chung ---
    lk = d.get('lopKhac', {})
    for y in Y_DINH_CHUNG:
        if y not in lk:
            loi.append('lopKhac thiếu ý định "%s"' % y)
            continue
        if y == 'hoi-mo':
            if not lk[y].get('hoiTiep') or not 2 <= len(lk[y].get('hetKe', [])) <= 3:
                loi.append('lopKhac.hoi-mo cần hoiTiep và 2–3 câu hetKe')
        elif not 2 <= len(lk[y].get('loi', [])) <= 3:
            loi.append('lopKhac.%s cần 2–3 câu, đang có %d' % (y, len(lk[y].get('loi', []))))

    # --- Chủ đề không biết ---
    cd = d.get('chuDeKhongBiet', [])
    if not 3 <= len(cd) <= 6:
        loi.append('chuDeKhongBiet cần 3 tới 6 mục, đang có %d' % len(cd))
    for t in cd:
        if len(t.get('cauHoiMau', [])) < 3 or not t.get('loi'):
            loi.append('chuDeKhongBiet %s: cần ≥ 3 câu hỏi mẫu và ít nhất một lời' % t.get('ma'))

    # --- Lời của nhân chứng: xưng hô, tên riêng, từ nhà nghề, mốc giờ ---
    for cho, cau in loi_nhan_chung(d):
        for tu in KHONG_NOI.get(nc, []):
            if co_tu(cau, tu):
                loi.append('%s: %s không nói "%s": "%s"' % (cho, nc, tu, cau))
        ten = TEN_RIENG.get(nc)
        if ten and co_tu(cau, ten):
            loi.append('%s: %s không xưng tên ("%s"): "%s"' % (cho, nc, ten, cau))
        for tu in NGOAI_CLB_KHONG_NOI.get(nc, []):
            if co_tu(cau, tu):
                loi.append('%s: người ngoài CLB nói từ nhà nghề "%s"' % (cho, tu))
        if not cho.split('/')[0] in theo_ma or '/tuChoi' in cho:
            for m in MOC_GIO.finditer(cau):
                if not any(m.group(0).lower() in c for c in tat_ca_bat_buoc):
                    loi.append('%s: có mốc giờ lạ "%s"' % (cho, m.group(0)))
        if nc != 'hieu' and 'nói thẳng' in cau.lower():
            loi.append('%s: "nói thẳng" là cụm riêng của Hiếu' % cho)

    # --- Mọi chuỗi trong tờ: ký tự cấm, giọng miền Nam ---
    for cho, chu in moi_chuoi(d):
        for k in KY_TU_CAM:
            if k in chu:
                loi.append('%s: có ký tự cấm "%s"' % (cho, k))
        for tu in MIEN_NAM:
            if co_tu(chu, tu):
                loi.append('%s: có từ miền Nam "%s"' % (cho, tu))

    tk = {
        'du_kien': len(dk),
        'trong_ds': len(trong_ds),
        'bien_the': sum(len(x.get('bienThe', {})) for x in dk),
        'cau_hoi': sum(len(x.get('cauHoiMau', [])) for x in dk),
        'gioi_han': ('%s câu, %s' % (g['soCau'], g['lyDo'])) if g else 'không',
        'tu_choi': [x['ma'] for x in dk if x.get('canCo')],
    }
    return loi, tk


def main(tep):
    if not tep:
        tep = sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), '*.json')))
    tong = 0
    for duong in tep:
        loi, tk = kiem(duong)
        ten = os.path.basename(duong)
        if tk:
            print('%s: %d dữ kiện (%d trong danh sách), %d biến thể, %d câu hỏi mẫu, giới hạn: %s, từ chối: %s · %s' % (
                ten, tk['du_kien'], tk['trong_ds'], tk['bien_the'], tk['cau_hoi'], tk['gioi_han'],
                ', '.join(tk['tu_choi']) or 'không', ('%d lỗi' % len(loi)) if loi else 'không lỗi'))
        else:
            print('%s: %d lỗi' % (ten, len(loi)))
        for l in loi:
            print('  ' + l)
        tong += len(loi)
    print('Tổng: %d tệp, %d lỗi' % (len(tep), tong))
    return 1 if tong else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
