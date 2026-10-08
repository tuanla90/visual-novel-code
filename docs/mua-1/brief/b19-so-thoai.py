"""So thoại Vụ 1 trong game với bản thoại 6 user đã duyệt (gói B19, 08/10/2026).

Chạy ở gốc repo (hoặc bất kỳ đâu):  python docs/mua-1/brief/b19-so-thoai.py [--tam]

- Đọc mọi câu nói của bản 6 (dòng "**Tên:** …", kể cả trong khối ">" và câu nằm giữa dòng như "…nói nhỏ: **Hà Vy:** …").
- Đọc lời trong game: loi/*.md (thoại "- **mã** (biểu cảm): …", dòng "Khi …:", "Gợi ý …:" tách theo <br>), lời nằm trong
  khung kich-ban/*.md (người hỏi của [HỎI] / [ĐỐI CHẤT] / [RẼ NHÁNH], "phản hồi:" của lựa chọn), kể cả trong chú thích
  "<!-- MỚI: … -->" (lệnh mới của B19-MÁY, người điều phối gỡ chú thích khi gộp).
- Chuẩn hóa: NFC, ngoặc cong thành ngoặc thẳng, "..." thành "…", bỏ "✓", "(tạm)", dấu ** nhấn trong giả thuyết đối chất.
- Mỗi câu bản 6: KHỚP (đúng chữ, đúng người nói) / GỌT DẤU (chỉ khác dấu câu) / LỆCH CÓ LÝ DO (ngoại lệ ghi dưới) /
  LỆCH (gần giống, in chỗ khác) / THIẾU. Mã thoát 1 khi còn LỆCH hoặc THIẾU.
- Kiểm thêm tên tạm (thẻ tên trước khi tự xưng) với "Khi chưa quen:" trong nhan-vat.md.
- `--tam`: in thêm mọi câu "(tạm)" trong lời game (câu mới chờ user duyệt).
"""
import difflib
import io
import re
import sys
import unicodedata
from pathlib import Path

GOC = Path(__file__).resolve().parents[3]
BAN6 = GOC / 'docs/mua-1/brief/b19-ban-6-thoai.md'
ND = GOC / 'prototype/noi-dung-mua-1'

# Nhãn người nói trong bản 6 → mã nhân vật trong game.
NHAN = {
    'Tùng': 'tung', 'Cậu áo xanh': 'tung',
    'Hà Vy': 'ha-vy', 'Bạn đeo kính': 'ha-vy',
    'Minh Anh': 'minh-anh', 'Chị giữ bàn': 'minh-anh',
    'Duy': 'duy', 'Anh đeo kính': 'duy',
    'Người chơi': 'player',
    'Hoài': 'hoai', 'Bạn nữ kéo vali': 'hoai',
    'Anh sơ mi trắng': 'khanh',
    'Chú Cường': 'chu-cuong', 'Bác Thịnh': 'bac-tu', 'Cô Lan': 'co-lan', 'Cô Hạnh': 'co-hanh',
    'Quân': 'quan', 'Người ngồi sẵn': 'quan',
    'Thầy Quang': 'thay-quang', 'Bà bán trà đá': 'ba-lua',
}
# Tên tạm của bản 6 (thẻ tên trước khi tự xưng) → mã; so với "Khi chưa quen:" (khanh: tên hiển thị của thẻ).
TEN_TAM = {'Cậu áo xanh': 'tung', 'Bạn đeo kính': 'ha-vy', 'Chị giữ bàn': 'minh-anh', 'Anh đeo kính': 'duy',
           'Bạn nữ kéo vali': 'hoai', 'Anh sơ mi trắng': 'khanh', 'Người ngồi sẵn': 'quan'}
# Ngoại lệ tên tạm user đã duyệt.
TEN_TAM_DUYET = {'Anh đeo kính': ('Anh áo khoác đen', 'user 08/10: Duy không đeo kính, tên tạm ở Trung thu là "Anh áo khoác đen"')}

# Ngoại lệ câu: câu bản 6 (đã chuẩn hóa) → (câu trong game, lý do). Chỉ ghi chỗ user / đề bài cho phép.
NGOAI_LE = {
    'CLB ra một dòng. Hội ra bốn mươi mốt. Vì sao?':
        ('CLB ra một dòng. Hội ra hai trăm bảy mươi sáu. Vì sao?',
         'đề bài B19 mục 3: 41 là số tạm; câu HOẶC của Quân chạy trên dữ liệu cỡ trường thật ra 276 dòng'),
    'Câu của anh Quân dùng HOẶC nên ra 41 dòng. Đổi thành VÀ thì còn một dòng. Số liệu đây ạ.':
        ('Câu của anh Quân dùng HOẶC nên ra 276 dòng. Đổi thành VÀ thì còn một dòng. Số liệu đây ạ.',
         'đề bài B19 mục 3: 41 là số tạm; dữ liệu thật ra 276 dòng'),
}


def chuan(s: str) -> str:
    s = unicodedata.normalize('NFC', s)
    s = s.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")
    s = s.replace('...', '…').replace('✓', '').replace('(tạm)', '').replace('**', '')
    return re.sub(r'\s+', ' ', s).strip()


def bo_dau(s: str) -> str:
    return ' '.join(re.sub(r'[^\w\s]', ' ', chuan(s)).lower().split())


def doc(p: Path) -> str:
    return io.open(p, encoding='utf-8').read()


# ---------- Bản 6 ----------
def cau_ban6():
    ra = []
    vao = False
    for so, dong in enumerate(doc(BAN6).splitlines(), 1):
        vao = vao or dong.startswith('## Cảnh')  # bỏ phần quy ước đầu tệp
        m = re.search(r'\*\*([^*:]+):\*\*\s*(.+)$', dong) if vao else None
        if not m:
            continue
        nhan = m.group(1).strip()
        ra.append({'so': so, 'nhan': nhan, 'ma': NHAN.get(nhan), 'chu': chuan(m.group(2)), 'nhanh': dong.lstrip().startswith('>')})
    return ra


# ---------- Lời trong game ----------
LOI = re.compile(r'^\*\*([a-z0-9-]+)\*\*(?: \(([a-z-]+)\))?:\s*(.*)$')


def tach_loi(chu: str):
    """'**a** (x): … <br> **b**: …' → [(mã, câu)]."""
    ra = []
    for phan in chu.split('<br>'):
        m = LOI.match(phan.strip())
        if m:
            ra.append((m.group(1), m.group(3)))
    return ra


def cau_game():
    ra = []

    def them(ma, chu, tep, so):
        ra.append({'ma': ma, 'chu': chuan(chu), 'tep': tep, 'so': so, 'tam': '(tạm)' in dong})

    for tep in sorted((ND / 'loi').glob('*.md')) + sorted((ND / 'kich-ban').glob('*.md')) + sorted((ND / 'thu-thach').glob('*.md')):
        ten = tep.relative_to(ND).as_posix()
        for so, dong in enumerate(doc(tep).splitlines(), 1):
            d = dong.strip()
            mm = re.match(r'^<!-- MỚI(?: \([^)]*\))?:\s*(.*?)\s*-->$', d)
            if mm:
                d = mm.group(1).strip()
            # thoại trong loi/
            m = re.match(r'^- (?:\[THẺ CHỮ\] )?(\*\*[a-z0-9-]+\*\*.*)$', d)
            if m:
                for ma, c in tach_loi(m.group(1)):
                    them(ma, c, ten, so)
                continue
            # "Khi …:" / "Gợi ý …:" (lời màn tra)
            m = re.match(r'^- (?:Khi|Gợi ý)[^:]*:\s*(.*)$', d)
            if m:
                for ma, c in tach_loi(m.group(1)):
                    them(ma, c, ten, so)
                continue
            # người hỏi của [HỎI] / [ĐỐI CHẤT] / [RẼ NHÁNH] / [TẠO NHÂN VẬT]
            m = re.match(r'^- \[(?:HỎI|ĐỐI CHẤT|RẼ NHÁNH|TẠO NHÂN VẬT)[^\]]*\] ([a-z0-9-]+)(?: \([a-z-]+\))?: "(.*)"$', d)
            if m:
                them(m.group(1), m.group(2), ten, so)
                continue
            # phản hồi của lựa chọn / thẻ đối chất
            m = re.search(r'phản hồi: (.*)$', d)
            if m:
                for ma, c in tach_loi(m.group(1)):
                    them(ma, c, ten, so)
    return ra


def main() -> int:
    in_tam = '--tam' in sys.argv
    b6 = cau_ban6()
    game = cau_game()
    theo_ma = {}
    for g in game:
        theo_ma.setdefault(g['ma'], []).append(g)
    khop, got, ly_do, lech, thieu = [], [], [], [], []
    for c in b6:
        ung = theo_ma.get(c['ma'], [])
        if any(g['chu'] == c['chu'] for g in ung):
            khop.append(c)
            continue
        if c['chu'] in NGOAI_LE:
            moi, why = NGOAI_LE[c['chu']]
            g = next((g for g in ung if g['chu'] == chuan(moi)), None)
            if g:
                ly_do.append((c, g, why))
                continue
        g = next((g for g in ung if bo_dau(g['chu']) == bo_dau(c['chu'])), None)
        if g:
            got.append((c, g))
            continue
        tot = max(ung, key=lambda g: difflib.SequenceMatcher(None, g['chu'], c['chu']).ratio(), default=None)
        r = difflib.SequenceMatcher(None, tot['chu'], c['chu']).ratio() if tot else 0
        (lech if r >= 0.6 else thieu).append((c, tot, r))

    print(f'Bản 6: {len(b6)} câu nói. Khớp đúng chữ: {len(khop)}. Chỉ khác dấu câu: {len(got)}. Lệch có lý do: {len(ly_do)}. Lệch: {len(lech)}. Thiếu: {len(thieu)}.')
    for c, g in got:
        print(f'  GỌT DẤU  bản 6:{c["so"]} [{c["nhan"]}] "{c["chu"]}"\n           game {g["tep"]}:{g["so"]} "{g["chu"]}"')
    for c, g, why in ly_do:
        print(f'  LỆCH CÓ LÝ DO  bản 6:{c["so"]} [{c["nhan"]}] → {g["tep"]}:{g["so"]}: {why}')
    for c, g, r in lech:
        print(f'  LỆCH  bản 6:{c["so"]} [{c["nhan"]}] "{c["chu"]}"\n        game {g["tep"]}:{g["so"]} ({r:.2f}) "{g["chu"]}"')
    for c, g, r in thieu:
        print(f'  THIẾU  bản 6:{c["so"]} [{c["nhan"]} → {c["ma"]}] "{c["chu"]}"')

    # Tên tạm
    nv = doc(ND / 'nhan-vat.md')
    loi_ten = 0
    for nhan, ma in TEN_TAM.items():
        khoi = re.search(rf'^### {re.escape(ma)} — (.+)$([\s\S]*?)(?=^### |\Z)', nv, re.M)
        if not khoi:
            print(f'  TÊN TẠM  không thấy nhân vật {ma}')
            loi_ten += 1
            continue
        cq = re.search(r'^- Khi chưa quen: (.+)$', khoi.group(2), re.M)
        hien = cq.group(1).strip() if cq else khoi.group(1).strip()
        if hien == nhan:
            continue
        if nhan in TEN_TAM_DUYET and TEN_TAM_DUYET[nhan][0] == hien:
            print(f'  TÊN TẠM CÓ LÝ DO  "{nhan}" → "{hien}": {TEN_TAM_DUYET[nhan][1]}')
            continue
        print(f'  TÊN TẠM LỆCH  bản 6 "{nhan}", game "{hien}" ({ma})')
        loi_ten += 1

    if in_tam:
        tam = [g for g in game if g['tam']]
        print(f'\nCâu "(tạm)" trong game: {len(tam)}')
        for g in tam:
            print(f'  {g["tep"]}:{g["so"]} [{g["ma"]}] {g["chu"]}')
    return 1 if (lech or thieu or loi_ten) else 0


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.exit(main())
