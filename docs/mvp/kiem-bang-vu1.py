# Kiểm bằng máy cho bảng điều tra Vụ 1 "Chữ ký H" theo thiết kế mới (30/09/2026).
# 1) Chạy mọi truy vấn trên bảng (dữ liệu lấy từ docs/mvp/kiem-du-lieu-vu1.py + bảng nhật ký in mới) và in số dòng.
# 2) Kiểm "đáp án duy nhất": đủ mẩu tin thật → 1; bỏ từng mẩu then chốt → ≥ 2.
# 3) Duyệt MỌI cách xếp lịch ngày 3–6 (mỗi ngày một nơi) → đếm kết xấu / thường / thật; không có may rủi.
# Chạy: python docs/mvp/kiem-bang-vu1.py
import itertools, os, sqlite3, sys
sys.stdout.reconfigure(encoding='utf-8')

# --- dữ liệu gốc: dùng lại phần khai bảng của kiem-du-lieu-vu1.py ---
goc = open(os.path.join(os.path.dirname(__file__), 'kiem-du-lieu-vu1.py'), encoding='utf-8').read()
ns = {}
exec(goc[:goc.index('Q = [')], ns)
db = ns['db']

# --- bảng mới: nhật ký máy in phòng máy (thầy Khải cho xem khi đã có mã cần kiểm) ---
db.executescript("CREATE TABLE nhat_ky_in(thoi_diem TEXT, tai_khoan TEXT, ten_tep TEXT, so_trang INT);")
IN = [
    ('2024-09-14 09:40', 'SV240131', 'lich-truc-nhat-lop.xlsx', 1),
    ('2024-09-14 15:05', 'SV240317', 'the-dang-ky-thu-vien.pdf', 1),     # Hoài có in, nhưng không phải thư
    ('2024-09-15 20:15', 'SV240228', 'bai-tap-kinh-te-vi-mo.pdf', 6),    # Hiếu in bài tập tối CN
    ('2024-09-15 21:02', 'SV240201', 'slide-nguyen-ly-ke-toan.pdf', 12),
    ('2024-09-15 22:47', 'SV220118', 'do-an-mon-hoc.pdf', 30),
    ('2024-09-15 23:10', 'SV210745', 'kien-nghi-phong-clb.docx', 1),     # THƯ: tài khoản khóa 2021 = năm 4
    ('2024-09-15 23:18', 'SV240146', 'bao-cao-nhom-kinh-te-vi-mo.pdf', 4),  # nhiễu: cùng đêm, là bài tập
    ('2024-09-16 07:30', 'SV240122', 'danh-sach-lop-BC24A.xlsx', 1),
    ('2024-09-16 08:05', 'SV210745', 'don-xin-xuong-thuc-hanh.docx', 2),  # đơn Robotics, cùng tài khoản
]
db.executemany('INSERT INTO nhat_ky_in VALUES(?,?,?,?)', IN)

def q(sql):
    return db.execute(sql).fetchall()

TRUY_VAN = [
    # ngày 2 · phòng CLB: tìm lớp
    ('N2 Tùng cá OR', "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' OR nganh='Báo chí'"),
    ('N2 tòa B VÀ Báo chí', "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' AND nganh='Báo chí'"),
    ('N2 bẫy khoa_hoc = K24', "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' AND nganh='Báo chí' AND khoa_hoc='K24'"),
    ('N2 + khóa 2024', "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' AND nganh='Báo chí' AND khoa_hoc=2024"),
    # ngày CLB: tìm người tên H trong lớp
    ('C1 N3: hai lớp · tên bằng H', "SELECT ten FROM sinh_vien WHERE ma_lop IN ('BC24A','BC23A') AND ten = 'H'"),
    ('C1 N3: hai lớp · tên bắt đầu H', "SELECT ma_sv, ten FROM sinh_vien WHERE ma_lop IN ('BC24A','BC23A') AND ten LIKE 'H%'"),
    ('C1 Ngày hội: tên = Tùng', "SELECT s.ma_sv, s.ho_dem, l.nganh FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop=l.ma_lop WHERE s.ten='Tùng'"),
    ('lớp BC24A', "SELECT ten FROM sinh_vien WHERE ma_lop='BC24A'"),
    ('bẫy ten = H', "SELECT ten FROM sinh_vien WHERE ma_lop='BC24A' AND ten='H'"),
    ('ten bắt đầu H', "SELECT ma_sv, ten FROM sinh_vien WHERE ma_lop='BC24A' AND ten LIKE 'H%'"),
    ('bẫy cột ho_dem', "SELECT ho_dem, ten FROM sinh_vien WHERE ma_lop='BC24A' AND ho_dem LIKE 'H%'"),
    # phòng máy: nhật ký in
    ('in: hai mã đêm CN', "SELECT * FROM nhat_ky_in WHERE tai_khoan IN ('SV240228','SV240317') AND thoi_diem LIKE '2024-09-15%'"),
    ('in: hai mã + tệp kiến nghị', "SELECT * FROM nhat_ky_in WHERE tai_khoan IN ('SV240228','SV240317') AND ten_tep LIKE '%kien-nghi%'"),
    ('in: tệp kiến nghị', "SELECT * FROM nhat_ky_in WHERE ten_tep LIKE '%kien-nghi%'"),
    ('in: nhiễu đêm CN sau 23h', "SELECT * FROM nhat_ky_in WHERE thoi_diem >= '2024-09-15 23:00' AND thoi_diem < '2024-09-16'"),
    ('in: tài khoản khóa 2021', "SELECT * FROM nhat_ky_in WHERE tai_khoan LIKE 'SV21%'"),
    # buổi họp: câu của Quân
    ('Quân OR', "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop='BC24A'"),
    ('sửa AND', "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop='BC24A'"),
]
print('== Số dòng từng truy vấn ==')
for ten, sql in TRUY_VAN:
    r = q(sql)
    print(f'{ten}: {len(r)} -> {r if len(r) <= 5 else r[:5] + ["…"]}')

print('\n== Đáp án duy nhất ==')
# Mẩu tin thật: tòa B, Báo chí, K24 (khóa 2024), chữ ký H, sổ niêm phong (loại Hiếu tận mắt)
def ung_vien(toa=True, nganh=True, khoa=True, chu_h=True):
    dk = []
    if toa: dk.append("l.toa_nha='B'")
    if nganh: dk.append("l.nganh='Báo chí'")
    if khoa: dk.append('l.khoa_hoc=2024')
    if chu_h: dk.append("s.ten LIKE 'H%'")
    w = ' AND '.join(dk) or '1=1'
    return [r[0] for r in q(f'SELECT s.ma_sv FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop=l.ma_lop WHERE {w}')]
so_niem_phong = {'SV240317'}  # cô phụ trách tra sổ: chỉ mã của Hoài có trên phiếu gửi
day_du = [m for m in ung_vien() if m in so_niem_phong or True]
print('đủ mẩu tin (trước sổ niêm phong):', ung_vien(), '→ sau sổ niêm phong:', [m for m in ung_vien() if m in so_niem_phong])
for bo in ['toa', 'nganh', 'chu_h']:
    print(f'  bỏ {bo}:', len(ung_vien(**{bo: False})), 'người')
print('  bỏ khóa 2024 (lớp BC23A không có sinh viên nên vẫn 2): ', len(ung_vien(khoa=False)), 'người — K24 là mẩu tin "đúng nhưng không phân biệt" ở bước sinh viên, nhưng cần ở bước tìm lớp')

print('\n== Duyệt lịch ngày 3–6 ==')
# N3 thứ Năm · N4 thứ Sáu · N5 thứ Bảy · N6 Chủ nhật; thứ Hai (N7) họp rà soát.
NOI = ['CLB', 'CTSV', 'PHONG_MAY', 'CONG_KTX', 'CANG_TIN']
def choi(lich, an_tuong_tot=True):
    ma = hoai = log = cuong = dat = False
    han_ctsv = 5 if an_tuong_tot else 4       # cô Lan nhận mã đến thứ Bảy; ấn tượng xấu: đến thứ Sáu
    gia_han = False
    phi = 0
    for n, noi in zip(range(3, 7), lich):
        # quá hạn nộp mã mà chưa xong → cô Lan nhờ việc (gia hạn 1 ngày, một lần)
        if not hoai and n > han_ctsv and not gia_han:
            gia_han = True; han_ctsv += 1
        if noi == 'CLB':
            if not ma: ma = True
            else: phi += 1
        elif noi == 'CTSV':
            if ma and not hoai and n <= han_ctsv and n <= 6: hoai = True
            else: phi += 1
        elif noi == 'PHONG_MAY':
            if ma and not log: log = True               # thầy Khải trực cả Chủ nhật (mùa đăng ký học phần)
            else: phi += 1
        elif noi == 'CONG_KTX':
            if not cuong: cuong = True
            else: phi += 1
        elif noi == 'CANG_TIN':
            if n == 5 and hoai and not dat: dat = True  # Đạt: giờ ra chơi thứ Bảy, khi đã biết Hoài
            else: phi += 1
    ket = 'xấu' if not hoai else ('thật' if log and (cuong or dat) else 'thường')
    return ket, gia_han, phi

for tot in (True, False):
    dem = {'xấu': 0, 'thường': 0, 'thật': 0}; that = []; can_gia_han = 0
    for lich in itertools.product(NOI, repeat=4):
        ket, gh, _ = choi(lich, tot)
        dem[ket] += 1
        if gh and ket != 'xấu': can_gia_han += 1
        if ket == 'thật': that.append(' → '.join(lich))
    print(f"ấn tượng cô Lan {'tốt' if tot else 'xấu'}: {dem} (trong đó {can_gia_han} lịch phải nhờ gia hạn mới qua)")
    for t in that: print('   kết thật:', t)
