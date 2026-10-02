"""Dán tọa độ miếng nhép môi / chớp mắt của dàn nhân vật mới vào code (01/10/2026).

Đọc art/nguon/topview-2026-10-01/nhep/toa-do.json (do cat-mieng-mat-dan-moi-2026-10-01.py ghi) rồi:
- sửa tại chỗ các bộ trong prototype/src/shared/ui/visuals/talk-rigs.ts (kích thước ảnh + hộp miệng/mắt, tra theo sourceFile);
- viết lại phần import và bảng BO_NHEP_MOI_MVP trong prototype/src/mvp/ui/nhep-moi-mvp.ts theo danh sách BO_MVP.
Ảnh chưa có tọa độ thì bỏ qua (bộ cũ của talk-rigs giữ nguyên, bộ MVP không được đưa vào bảng) và in tên ra.

Chạy: python art/nguon/dan-toa-do-nhep-2026-10-01.py
"""
import importlib.util
import json
import re
import sys
from pathlib import Path

GOC = Path(__file__).resolve().parents[2]
TOA_DO = GOC / 'art/nguon/topview-2026-10-01/nhep/toa-do.json'
TALK_TS = GOC / 'prototype/src/shared/ui/visuals/talk-rigs.ts'
MVP_TS = GOC / 'prototype/src/mvp/ui/nhep-moi-mvp.ts'

_spec = importlib.util.spec_from_file_location('cat_moi', Path(__file__).with_name('cat-mieng-mat-dan-moi-2026-10-01.py'))
cat = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cat)


def hop(p):
    return f"{p['x']}, {p['y']}, {p['w']}, {p['h']}"


def bien(ten: str) -> str:
    """char-tung-ao-xanh-gai-dau → tungAoXanhGaiDau; char-nguoi-choi → nguoiChoi."""
    phan = ten.removeprefix('char-').split('-')
    return phan[0] + ''.join(p.capitalize() for p in phan[1:])


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    td = json.loads(TOA_DO.read_text(encoding='utf-8'))
    du = {t: v for t, v in td.items() if v.get('mouth') and v.get('eyes')}

    # ---- talk-rigs.ts ----
    s = TALK_TS.read_text(encoding='utf-8')
    for ten in cat.BO_CU:
        if ten not in du:
            print('talk-rigs: thiếu', ten)
            continue
        v = du[ten]
        mau = re.compile(
            r"(sourceFile: '/src/assets/characters/" + re.escape(ten) + r"\.png',\s*\n\s*)width: \d+,(\s*\n\s*)height: \d+,"
            r"(\s*\n\s*mouth: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+( \},\s*\n\s*eyes: \{ src: \w+, )x: \d+, y: \d+, w: \d+, h: \d+")
        m, e = v['mouth'], v['eyes']
        s, n = mau.subn(
            lambda k: (f"{k.group(1)}width: {v['width']},{k.group(2)}height: {v['height']},{k.group(3)}x: {m['x']}, y: {m['y']}, w: {m['w']}, h: {m['h']}"
                       f"{k.group(4)}x: {e['x']}, y: {e['y']}, w: {e['w']}, h: {e['h']}"), s)
        assert n == 1, (ten, n)
    TALK_TS.write_text(s, encoding='utf-8', newline='\n')

    # ---- nhep-moi-mvp.ts ----
    s = MVP_TS.read_text(encoding='utf-8')
    co = [t for t in cat.BO_MVP if t in du]
    for t in cat.BO_MVP:
        if t not in du:
            print('nhep-moi-mvp: thiếu', t)
    nhap = ''.join(f"import {bien(t)}Mouth from './nhep/{t}/mouth.webp';\nimport {bien(t)}Eyes from './nhep/{t}/eyes.webp';\n" for t in co)
    bang = ''.join(f"  bo('{t}', {bien(t)}Mouth, [{hop(du[t]['mouth'])}], {bien(t)}Eyes, [{hop(du[t]['eyes'])}]),\n" for t in co)
    s, n1 = re.subn(r"(import \{ anhTheoTen \} from './anh-mvp';\n)(?:import \w+ from './nhep/[^\n]+\n)+", lambda k: k.group(1) + nhap, s)
    s, n2 = re.subn(r"(new Map<string, TalkRig>\(\[\n)(?:  bo\([^\n]+\n)+", lambda k: k.group(1) + bang, s)
    assert n1 == 1 and n2 == 1, (n1, n2)
    MVP_TS.write_text(s, encoding='utf-8', newline='\n')
    print(f'talk-rigs: {sum(t in du for t in cat.BO_CU)}/{len(cat.BO_CU)} bộ; nhep-moi-mvp: {len(co)}/{len(cat.BO_MVP)} bộ')


if __name__ == '__main__':
    main()
