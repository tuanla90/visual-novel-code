# -*- coding: utf-8 -*-
"""Kiểm tờ dữ kiện của một nhân chứng (tools/thu-hoi-dap/du-lieu/*.json) trước khi đưa cho người chơi.

Chạy ở gốc repo:  PYTHONIOENCODING=utf-8 python tools/thu-hoi-dap/kiem-bien-the.py tools/thu-hoi-dap/du-lieu/bac-thinh.json
Luật:
  1. Mọi biến thể lời của một dữ kiện chứa đủ "chữ bắt buộc" của dữ kiện đó (không phân biệt hoa thường).
  2. Biến thể không chứa mốc giờ nào ngoài mốc nằm trong chữ bắt buộc của chính nó (chống trôi dữ kiện).
  3. Đoạn "xem cả đoạn" (tuDong): câu gắn dữ kiện nào thì chứa đủ chữ bắt buộc của dữ kiện ấy.
  4. Danh sách cần làm rõ chỉ trỏ tới dữ kiện có thật; dữ kiện trong danh sách phải có lời gợi ý hai bậc.
  5. Lời gợi ý bậc 1 không chứa chữ bắt buộc (không lộ đáp án).
"""
import io
import json
import re
import sys

SO = r'(?:một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười một|mười hai|mười|\d{1,2})'
MOC_GIO = re.compile(r'\b' + SO + r' (?:giờ|rưỡi)(?: (?:sáng|trưa|chiều|tối|đêm))?', re.I)


def main(duong):
    d = json.load(io.open(duong, encoding='utf-8'))
    loi = []
    theo_ma = {x['ma']: x for x in d['duKien']}
    for x in d['duKien']:
        bat_buoc = [c.lower() for c in x['chuBatBuoc']]
        for kieu, cau in x['bienThe'].items():
            thap = cau.lower()
            for c in bat_buoc:
                if c not in thap:
                    loi.append('%s/%s: thiếu chữ bắt buộc "%s"' % (x['ma'], kieu, c))
            for m in MOC_GIO.finditer(cau):
                if not any(m.group(0).lower() in c for c in bat_buoc):
                    loi.append('%s/%s: có mốc giờ lạ "%s"' % (x['ma'], kieu, m.group(0)))
        if 'thang' not in x['bienThe'] or 'lai' not in x['bienThe']:
            loi.append('%s: phải có biến thể "thang" và "lai"' % x['ma'])
        if len(x['cauHoiMau']) < 4:
            loi.append('%s: cần ít nhất 4 câu hỏi mẫu' % x['ma'])
    for i, l in enumerate(d['tuDong']):
        for ma in l.get('duKien', []):
            for c in theo_ma[ma]['chuBatBuoc']:
                if c.lower() not in l['loi'].lower():
                    loi.append('tuDong[%d]: gắn "%s" nhưng thiếu "%s"' % (i, ma, c))
    for m in d['danhSach']:
        for ma in m['can']:
            if ma not in theo_ma:
                loi.append('danhSach %s: không có dữ kiện "%s"' % (m['ma'], ma))
                continue
            g = theo_ma[ma].get('goiY')
            if not g or not g.get('bac1') or not g.get('bac2'):
                loi.append('%s: nằm trong danh sách nhưng thiếu gợi ý hai bậc' % ma)
            elif any(c.lower() in g['bac1'].lower() for c in theo_ma[ma]['chuBatBuoc']):
                loi.append('%s: gợi ý bậc 1 lộ chữ bắt buộc' % ma)
    so_bt = sum(len(x['bienThe']) for x in d['duKien'])
    print('%s: %d dữ kiện, %d biến thể lời, %d câu hỏi mẫu — %s' % (
        duong, len(d['duKien']), so_bt, sum(len(x['cauHoiMau']) for x in d['duKien']), '%d lỗi' % len(loi) if loi else 'không lỗi'))
    for l in loi:
        print('  ' + l)
    return 1 if loi else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
