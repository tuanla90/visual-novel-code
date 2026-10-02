"""Chèn ảnh minh họa Vụ 2–5 và nhiệm vụ phụ vào kịch bản (chạy tại prototype/noi-dung-mvp, một lần). Chỉ chèn ảnh đã có tệp."""
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
A = Path('../src/assets')


def co_anh(ten):
    return any(A.rglob(ten + '.webp')) or any(A.rglob(ten + '.png'))


def doc(p):
    raw = Path(p).read_bytes()
    return raw.decode('utf-8').replace('\r\n', '\n'), b'\r\n' in raw


def ghi(p, s, crlf):
    Path(p).write_bytes((s.replace('\n', '\r\n') if crlf else s).encode('utf-8'))


# (tệp, dòng [LỜI …] làm mốc, ảnh, 'sau' | 'truoc')
CHEN = [
    ('kich-ban/10-vu-2-tin-don.md', 'tin-mo.1', 'chibi-v2-hieu-cua', 'sau'),
    ('kich-ban/10-vu-2-tin-don.md', 'tin-gap-nam.2', 'chibi-v2-tung-chi-nam', 'sau'),
    ('kich-ban/10-vu-2-tin-don.md', 'tin-gap-nam.3', 'cg-v2-khanh-xuong', 'sau'),
    ('kich-ban/10-vu-2-tin-don.md', 'tin-ket-ky.2', 'chibi-v2-manh-giay-linh', 'sau'),
    ('kich-ban/11-vu-3-tranh-cai.md', 'v3-thu-vien.4', 'cg-v3-thu-vien-dem', 'sau'),
    ('kich-ban/11-vu-3-tranh-cai.md', 'v3-the-vy.2', 'chibi-v3-hai-cai-may', 'sau'),
    ('kich-ban/11-vu-3-tranh-cai.md', 'v3-ket-luan.1', 'chibi-v3-ghim-hai-moc', 'sau'),
    ('kich-ban/11-vu-3-tranh-cai.md', 'v3-chia.1', 'cg-v3-to-giao-chia', 'sau'),
    ('kich-ban/12-vu-4-giup-nam.md', 'v4-noi.3', 'chibi-v4-cung-mot-may', 'sau'),
    ('kich-ban/12-vu-4-giup-nam.md', 'v4-ket.1', 'cg-v4-huy-hieu-sut', 'sau'),
    ('kich-ban/12-vu-4-giup-nam.md', 'v4-ket.2', 'chibi-v4-khong-ca', 'sau'),
    ('kich-ban/13-vu-5-so-quy.md', 'v5-doi-chat.1', 'cg-v5-ao-xanh-don-hoai', 'truoc'),
    ('kich-ban/13-vu-5-so-quy.md', 'v5-nhan-tien.1', 'cg-v5-huy-hieu-hoai', 'sau'),
    ('kich-ban/13-vu-5-so-quy.md', 'v5-sau-hop.1', 'cg-v5-chia-va-huy-hieu', 'sau'),
    ('kich-ban/13-vu-5-so-quy.md', 'v5-ket-luan.1', 'chibi-v5-dong-dau', 'sau'),
    ('kich-ban/13-vu-5-so-quy.md', 'v5-ngan-tu.2', 'cg-v5-ho-so-vu-dau', 'sau'),
    ('kich-ban/20-phu-so-phong.md', 'v2-tra.2', 'chibi-phu-got-ma-phong', 'sau'),
    ('kich-ban/21-phu-micro.md', 'p-mic-mo.3', 'chibi-phu-tu-micro', 'sau'),
    ('kich-ban/22-phu-hoan-tien.md', 'p-hoan-mo.5', 'chibi-phu-mot-bien-nhan', 'sau'),
]
for tep, moc, anh, cho in CHEN:
    if not co_anh(anh):
        print('CHƯA CÓ ẢNH', anh); continue
    s, crlf = doc(tep)
    if f'[ẢNH {anh}]' in s:
        continue
    dong = s.split('\n'); vt = [i for i, d in enumerate(dong) if d.strip() == f'- [LỜI {moc}]']
    if len(vt) != 1:
        print('KHÔNG THẤY MỐC', tep, moc, len(vt)); continue
    i = vt[0]; thut = dong[i][:len(dong[i]) - len(dong[i].lstrip())]
    dong.insert(i + 1 if cho == 'sau' else i, f'{thut}- [ẢNH {anh}]')
    ghi(tep, '\n'.join(dong), crlf); print('chèn', anh, '→', tep)

# Cảnh mới: hành lang ngoài phòng họp (Vụ 5, sau buổi họp).
if co_anh('bg-mvp-hanh-lang-phong-hop'):
    s, crlf = doc('canh.md')
    if 'hanh-lang-phong-hop' not in s:
        s = s.replace('### phong-hop — Phòng họp rà soát\n', '### phong-hop — Phòng họp rà soát\n### hanh-lang-phong-hop — Hành lang ngoài phòng họp\n')
        ghi('canh.md', s, crlf)
    s, crlf = doc('kich-ban/13-vu-5-so-quy.md')
    a = '### v5-sau-hop — Hành lang sau buổi họp: chiếc chìa {cảnh: phong-hop}'
    if a in s:
        ghi('kich-ban/13-vu-5-so-quy.md', s.replace(a, a.replace('{cảnh: phong-hop}', '{cảnh: hanh-lang-phong-hop}')), crlf); print('đổi cảnh v5-sau-hop')

# Dòng ảnh nền lỗi thời của xưởng robot (đã có bg-mvp-xuong-robot riêng).
s, crlf = doc('canh.md')
b = '### xuong-robot — Xưởng CLB Robotics\n- Ảnh nền: bg-mvp-nha-van-hoa\n'
if b in s:
    ghi('canh.md', s.replace(b, '### xuong-robot — Xưởng CLB Robotics\n'), crlf); print('bỏ dòng ảnh nền cũ của xuong-robot')

# Tùng hôm nhập học mặc áo tình nguyện xanh, không còn áo cam.
s, crlf = doc('loi/00-mo-dau.md')
c = 'một cậu sinh viên áo sơ mi cam, cổ đeo thẻ,'
if c in s:
    ghi('loi/00-mo-dau.md', s.replace(c, 'một cậu sinh viên áo xanh tình nguyện, mũ tai bèo đeo sau lưng,'), crlf); print('sửa áo cam → áo xanh')
