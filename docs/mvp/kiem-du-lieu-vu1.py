# Bộ dữ liệu minh họa Vụ 1 bản MVP (docs/mvp/kich-ban-vu1-mvp-khung.md) và các truy vấn trong kịch bản.
# Chạy: python docs/mvp/kiem-du-lieu-vu1.py — mọi số dòng in ra phải khớp bảng "Kiểm số dòng" trong kịch bản.
import sqlite3, sys
sys.stdout.reconfigure(encoding='utf-8')
db = sqlite3.connect(':memory:')
db.executescript("""
CREATE TABLE lop_sinh_hoat(ma_lop TEXT, nganh TEXT, khoa_hoc INT, toa_nha TEXT);
CREATE TABLE sinh_vien(ma_sv TEXT, ho_dem TEXT, ten TEXT, ma_lop TEXT);
""")
lop = [('KT24A','Kế toán',2024,'B'),('KT24B','Kế toán',2024,'A'),('QT24A','Quản trị kinh doanh',2024,'C'),
       ('QT24B','Quản trị kinh doanh',2024,'B'),('BC24A','Báo chí',2024,'B'),('BC24B','Báo chí',2024,'C'),
       ('TC24A','Tài chính – Ngân hàng',2024,'A'),('MK24A','Marketing',2024,'A'),('DL24A','Du lịch',2024,'C'),('CT24A','Công nghệ thông tin',2024,'A'),('TM24A','Thương mại điện tử',2024,'C'),
       # QĐ-092: 3 lớp khác khóa, không có sinh viên (bài lọc số / ghép 3 điều kiện ngày 2)
       ('BC23A','Báo chí',2023,'B'),('KT22A','Kế toán',2022,'A'),('QT23A','Quản trị kinh doanh',2023,'C')]
db.executemany('INSERT INTO lop_sinh_hoat VALUES(?,?,?,?)', lop)
sv = [
 # BC24A: 6 người
 ('SV240228','Trần Minh','Hiếu','BC24A'),('SV240317','Lê Thu','Hoài','BC24A'),('SV240105','Hồ Ngọc','Mai','BC24A'),
 ('SV240122','Phạm Tiến','Đạt','BC24A'),('SV240131','Vũ Hải','Yến','BC24A'),('SV240146','Đỗ Gia','Phúc','BC24A'),
 # BC24B
 ('SV240412','Đỗ Thu','Hồng','BC24B'),('SV240415','Nguyễn Bảo','Ngọc','BC24B'),('SV240418','Bùi Đức','Toàn','BC24B'),
 # tên H ở lớp khác (7 người)
 ('SV240201','Nguyễn Văn','Hải','KT24A'),('SV240204','Phan Quốc','Huy','QT24B'),('SV240207','Đinh Thị','Hương','KT24B'),
 ('SV240210','Lương Mạnh','Hùng','TC24A'),('SV240213','Cao Văn','Hậu','MK24A'),('SV240216','Tạ Thu','Hằng','DL24A'),
 ('SV240219','Kiều Minh','Hưng','TM24A'),
 # ba người tên Tùng (màn tra mã ở Ngày hội; Tùng Du lịch là Trần Tùng của truyện)
 ('SV240251','Trần','Tùng','DL24A'),('SV240254','Nguyễn Thanh','Tùng','KT24B'),('SV240257','Vũ Sơn','Tùng','CT24A'),
 # người khác (họ đệm bắt đầu H để làm bẫy cột)
 ('SV240301','Hoàng Anh','Tuấn','QT24A'),('SV240304','Trịnh Mỹ','Châu','KT24A'),('SV240307','Mạc Văn','Khoa','QT24B'),
 ('SV240310','Lâm Thị','Nga','MK24A'),('SV240313','Tô Bảo','Long','TC24A'),('SV240316','Âu Minh','Trang','DL24A'),
]
db.executemany('INSERT INTO sinh_vien VALUES(?,?,?,?)', sv)
Q = [
 ("Ngày hội: ten = 'Tùng' (đọc cột ngành)", "SELECT s.ma_sv, s.ho_dem, s.ten, l.nganh FROM sinh_vien s, lop_sinh_hoat l WHERE s.ma_lop=l.ma_lop AND s.ten='Tùng'"),
 ("N2.1 khoa_hoc = 2024", "SELECT ma_lop FROM lop_sinh_hoat WHERE khoa_hoc = 2024"),
 ("N2.1 bẫy 'K24'", "SELECT ma_lop FROM lop_sinh_hoat WHERE khoa_hoc = 'K24'"),
 ("N2.2 toa_nha = 'B'", "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B'"),
 ("N2 OR (Tùng)", "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' OR nganh='Báo chí'"),
 ("N2.4 ba điều kiện", "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' AND nganh='Báo chí' AND khoa_hoc = 2024"),
 ("N2 AND", "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha='B' AND nganh='Báo chí'"),
 ("N4 = 'H' (0 dòng)", "SELECT ten FROM sinh_vien WHERE ma_lop='BC24A' AND ten='H'"),
 ("N4 LIKE AND lớp", "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop='BC24A'"),
 ("Bẫy ma_lop LIKE 'BC%'", "SELECT ma_sv, ten, ma_lop FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop LIKE 'BC%'"),
 ("Bẫy cột ho_dem trong lớp", "SELECT ho_dem, ten FROM sinh_vien WHERE ho_dem LIKE 'H%' AND ma_lop='BC24A'"),
 ("Bẫy quên lớp", "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%'"),
 ("N6 OR của Quân", "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop='BC24A'"),
 ("N6 AND sửa", "SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop='BC24A'"),
 ("Sĩ số BC24A", "SELECT count(*) FROM sinh_vien WHERE ma_lop='BC24A'"),
]
for name, q in Q:
    rows = db.execute(q).fetchall()
    print(f"{name}: {len(rows)} dòng -> {rows if len(rows)<=6 else rows[:6]+['…']}")
