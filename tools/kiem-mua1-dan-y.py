#!/usr/bin/env python3
"""Chạy thật các câu SQL của dàn ý mùa 1 mới (docs/mvp/mua-1-dan-y-nam-khanh.md), Vụ 2 đến Vụ 5.

Dữ liệu ở đây là bản nháp để chứng minh mỗi câu tra ra đúng kết quả dàn ý ghi; khi dựng vào game thì chép sang
prototype/noi-dung-mvp/du-lieu.md, nơi bộ kiểm nội dung chạy lại trên chính dữ liệu game dùng.
"""
import sqlite3
import sys

SCHEMA = """
-- Vụ 2: tin đồn trên kênh sinh viên
CREATE TABLE tin_nhan(ma_tin TEXT, thoi_diem TEXT, tai_khoan TEXT, loai TEXT, noi_dung TEXT);
INSERT INTO tin_nhan VALUES
 ('T-01','2024-10-07 22:40','clb_robotics','GOC','CLB Thám Tử soi dữ liệu sinh viên'),
 ('T-02','2024-10-07 22:55','SV240254','CHUYEN_TIEP','CLB Thám Tử soi dữ liệu sinh viên'),
 ('T-03','2024-10-08 07:10','SV230311','CHUYEN_TIEP','CLB Thám Tử soi dữ liệu sinh viên'),
 ('T-04','2024-10-08 07:30','SV240213','GOC','Ai nhặt được thẻ xe ở căng tin'),
 ('T-05','2024-10-08 08:02','SV220118','CHUYEN_TIEP','CLB Thám Tử soi dữ liệu sinh viên'),
 ('T-06','2024-10-08 09:15','clb_robotics','GOC','Tuyển thành viên đội robot'),
 ('T-07','2024-10-08 11:40','SV240131','CHUYEN_TIEP','CLB Thám Tử soi dữ liệu sinh viên'),
 ('T-08','2024-10-08 12:05','SV240412','GOC','Nghe nói CLB Thám Tử soi điểm');
CREATE TABLE dang_nhap_kenh(tai_khoan TEXT, may TEXT, ngay TEXT, gio TEXT);
INSERT INTO dang_nhap_kenh VALUES
 ('clb_robotics','MAY-XUONG-02','2024-10-07','15:10'),
 ('clb_robotics','MAY-VP-XUONG','2024-10-07','22:31'),
 ('clb_robotics','MAY-XUONG-02','2024-10-08','09:05'),
 ('SV240254','DIEN-THOAI','2024-10-07','22:50'),
 ('SV240213','DIEN-THOAI','2024-10-08','07:25');

-- Vụ 3: sổ nhận chìa khóa xưởng (thành viên thường không được nhận chìa)
CREATE TABLE so_chia_khoa(ma_luot TEXT, ngay TEXT, ca TEXT, nguoi_nhan TEXT, vai_tro TEXT);
INSERT INTO so_chia_khoa VALUES
 ('CK-01','2024-10-01','CHIEU','Thảo','KY_THUAT'),
 ('CK-02','2024-10-01','TOI','Khánh','TRUONG_CLB'),
 ('CK-03','2024-10-02','CHIEU','Bách','PHO_CLB'),
 ('CK-04','2024-10-03','TOI','Bách','PHO_CLB'),
 ('CK-05','2024-10-04','CHIEU','Thảo','KY_THUAT'),
 ('CK-06','2024-10-04','TOI','Khánh','TRUONG_CLB'),
 ('CK-07','2024-10-07','CHIEU','Thảo','KY_THUAT'),
 ('CK-08','2024-10-07','TOI','Khánh','TRUONG_CLB'),
 ('CK-09','2024-10-07','TOI','Thảo','KY_THUAT'),
 ('CK-10','2024-10-08','CHIEU','Bách','PHO_CLB');

-- Vụ 3: bài đăng của kênh Robotics tháng 10 (điện thoại trực kênh do Nam giữ), và sổ quẹt thẻ thư viện
CREATE TABLE bai_dang_robotics(ma_bai TEXT, ngay TEXT, buoi TEXT, thiet_bi TEXT);
INSERT INTO bai_dang_robotics VALUES
 ('BD-01','2024-10-01','CHIEU','DIEN-THOAI-TRUC'),('BD-02','2024-10-02','CHIEU','DIEN-THOAI-TRUC'),
 ('BD-03','2024-10-03','CHIEU','DIEN-THOAI-TRUC'),('BD-04','2024-10-04','CHIEU','DIEN-THOAI-TRUC'),
 ('BD-05','2024-10-05','CHIEU','DIEN-THOAI-TRUC'),('BD-06','2024-10-07','CHIEU','DIEN-THOAI-TRUC'),
 ('BD-07','2024-10-07','TOI','MAY-VP-XUONG'),('BD-08','2024-10-08','CHIEU','DIEN-THOAI-TRUC'),
 ('BD-09','2024-10-09','CHIEU','DIEN-THOAI-TRUC');
CREATE TABLE quet_the_thu_vien(ten TEXT, ngay TEXT, thu TEXT, gio_vao TEXT, gio_ra TEXT);
INSERT INTO quet_the_thu_vien VALUES
 ('Nam','2024-09-16','THU_HAI','21:45','23:00'),('Hà Vy','2024-09-16','THU_HAI','20:00','22:50'),
 ('Nam','2024-09-23','THU_HAI','21:50','23:05'),('Hà Vy','2024-09-23','THU_HAI','20:05','23:00'),
 ('Nam','2024-09-26','THU_NAM','19:30','21:00'),
 ('Nam','2024-09-30','THU_HAI','21:40','23:00'),('Hà Vy','2024-09-30','THU_HAI','20:00','22:55'),
 ('Thảo','2024-10-02','THU_TU','14:00','16:10'),
 ('Nam','2024-10-07','THU_HAI','21:50','23:05'),('Hà Vy','2024-10-07','THU_HAI','20:00','23:00'),
 ('Hà Vy','2024-10-09','THU_TU','19:00','20:30');

-- Vụ 4: đơn đặt linh kiện đứng tên Nam, và phiên đăng nhập tạo đơn
CREATE TABLE don_linh_kien(ma_don TEXT, ngay TEXT, nguoi_dat TEXT, linh_kien TEXT, so_luong INTEGER, so_tien INTEGER, ma_phien TEXT);
INSERT INTO don_linh_kien VALUES
 ('DLK-01','2024-09-20','Nam','Cảm biến dò line',4,120000,'PH-11'),
 ('DLK-02','2024-09-24','Bách','Pin 18650',10,200000,'PH-12'),
 ('DLK-03','2024-09-27','Nam','Động cơ servo',8,800000,'PH-13'),
 ('DLK-04','2024-10-01','Thảo','Dây nối',20,60000,'PH-14'),
 ('DLK-05','2024-10-02','Nam','Bánh xe',6,150000,'PH-15'),
 ('DLK-06','2024-10-04','Nam','Mạch điều khiển',3,900000,'PH-16'),
 ('DLK-07','2024-10-05','Khánh','Ốc vít',100,40000,'PH-17'),
 ('DLK-08','2024-10-07','Nam','Bộ khung nhôm',2,700000,'PH-18'),
 ('DLK-09','2024-10-08','Thảo','Keo dán',5,30000,'PH-19'),
 ('DLK-10','2024-10-08','Bách','Mỏ hàn',2,180000,'PH-20');
CREATE TABLE phien_dang_nhap(ma_phien TEXT, may TEXT, gio TEXT);
INSERT INTO phien_dang_nhap VALUES
 ('PH-11','MAY-XUONG-02','15:20'),('PH-12','MAY-XUONG-01','16:05'),('PH-13','MAY-VP-XUONG','21:50'),
 ('PH-14','MAY-XUONG-01','14:40'),('PH-15','MAY-XUONG-02','15:45'),('PH-16','MAY-VP-XUONG','22:10'),
 ('PH-17','MAY-VP-XUONG','10:15'),('PH-18','MAY-VP-XUONG','22:05'),('PH-19','MAY-XUONG-01','15:00'),
 ('PH-20','MAY-XUONG-01','16:30');

-- Vụ 5: Nam kiểm kê xưởng (đếm tay từng loại), rồi khoản chi và quỹ
CREATE TABLE kiem_ke(linh_kien TEXT, so_luong_co INTEGER);
INSERT INTO kiem_ke VALUES
 ('Cảm biến dò line',4),('Pin 18650',9),('Động cơ servo',0),('Dây nối',18),('Bánh xe',6),
 ('Mạch điều khiển',0),('Ốc vít',85),('Bộ khung nhôm',0),('Keo dán',3),('Mỏ hàn',2);

CREATE TABLE quy(ma_quy TEXT, clb TEXT);
INSERT INTO quy VALUES ('Q-TT','THAM_TU'),('Q-RB','ROBOTICS');
CREATE TABLE khoan_chi(ma_chi TEXT, ma_don TEXT, ma_quy TEXT, so_tien INTEGER, nguoi_duyet TEXT);
INSERT INTO khoan_chi VALUES
 ('KC-01','DLK-01','Q-RB',120000,'Bách'),
 ('KC-02','DLK-02','Q-RB',200000,'Bách'),
 ('KC-03','DLK-03','Q-TT',800000,'Khánh'),
 ('KC-04','DLK-04','Q-RB',60000,'Bách'),
 ('KC-05','DLK-05','Q-RB',150000,'Bách'),
 ('KC-06','DLK-06','Q-TT',900000,'Khánh'),
 ('KC-07','DLK-07','Q-RB',40000,'Khánh'),
 ('KC-08','DLK-08','Q-TT',700000,'Khánh'),
 ('KC-09','VPP-01','Q-TT',150000,'Minh Anh'),
 ('KC-10','VPP-02','Q-TT',120000,'Minh Anh'),
 ('KC-11','VPP-03','Q-TT',180000,'Minh Anh');
"""

CASES = {
    # Vụ 2: bước 1 lưu thành phiếu, bước 2 lấy phiếu làm nguồn (CTE)
    'v2-tin-don': ("SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%'", True, [
        ('T-01', '2024-10-07 22:40', 'clb_robotics', 'GOC'), ('T-02', '2024-10-07 22:55', 'SV240254', 'CHUYEN_TIEP'),
        ('T-03', '2024-10-08 07:10', 'SV230311', 'CHUYEN_TIEP'), ('T-05', '2024-10-08 08:02', 'SV220118', 'CHUYEN_TIEP'),
        ('T-07', '2024-10-08 11:40', 'SV240131', 'CHUYEN_TIEP')]),
    'v2-tin-goc': ("""WITH tin_don AS (SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%')
SELECT ma_tin, thoi_diem, tai_khoan FROM tin_don WHERE loai = 'GOC'""", True, [('T-01', '2024-10-07 22:40', 'clb_robotics')]),
    # Vụ 2, tuyến A: tài khoản chung đăng nhập từ máy nào tối 07/10
    'v2-may-gui': ("SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07' AND gio LIKE '22%'", True, [('MAY-VP-XUONG', '22:31')]),
    # Vụ 3: cùng một bảng bài đăng, nhóm hai cách đều tách riêng đúng một bài (tin đồn)
    'v3-theo-thiet-bi': ("SELECT thiet_bi, COUNT(*) AS so_bai FROM bai_dang_robotics GROUP BY thiet_bi", False, [('DIEN-THOAI-TRUC', 8), ('MAY-VP-XUONG', 1)]),
    'v3-theo-buoi': ("SELECT buoi, COUNT(*) AS so_bai FROM bai_dang_robotics GROUP BY buoi", False, [('CHIEU', 8), ('TOI', 1)]),
    # Vụ 3: nguồn độc lập — Nam ở thư viện lúc tin được gửi (22:40)
    # Vụ 3: thói quen — nhóm lượt quẹt thẻ thư viện theo người và thứ: tối thứ Hai nào Nam và Hà Vy cũng có mặt
    'v3-thoi-quen': ("SELECT ten, thu, COUNT(*) AS so_lan FROM quet_the_thu_vien GROUP BY ten, thu", False, [
        ('Hà Vy', 'THU_HAI', 4), ('Hà Vy', 'THU_TU', 1), ('Nam', 'THU_HAI', 4), ('Nam', 'THU_NAM', 1), ('Thảo', 'THU_TU', 1)]),
    # Vụ 3: đúng tối 07/10 (thứ Hai), hai người cùng ở thư viện lúc tin được gửi (22:40)
    'v3-thu-vien': ("SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07' ORDER BY ten", True, [('Hà Vy', '20:00', '23:00'), ('Nam', '21:50', '23:05')]),
    # Vụ 3 (hướng phụ): ai nhận chìa xưởng buổi tối, mấy lượt (không có Nam)
    'v3-chia-toi': ("SELECT nguoi_nhan, COUNT(*) AS so_luot FROM so_chia_khoa WHERE ca = 'TOI' GROUP BY nguoi_nhan", False, [('Bách', 1), ('Khánh', 3), ('Thảo', 1)]),
    'v3-toi-07': ("SELECT nguoi_nhan, vai_tro FROM so_chia_khoa WHERE ngay = '2024-10-07' AND ca = 'TOI'", False, [('Khánh', 'TRUONG_CLB'), ('Thảo', 'KY_THUAT')]),
    # Vụ 4: thống kê đơn theo người đặt; rồi nối sang phiên đăng nhập, đếm theo máy
    'v4-don-theo-nguoi': ("SELECT nguoi_dat, COUNT(*) AS so_don FROM don_linh_kien GROUP BY nguoi_dat", False, [('Bách', 2), ('Khánh', 1), ('Nam', 5), ('Thảo', 2)]),
    'v4-don-nam-theo-may': ("""SELECT p.may, COUNT(*) AS so_don FROM don_linh_kien d JOIN phien_dang_nhap p ON d.ma_phien = p.ma_phien
WHERE d.nguoi_dat = 'Nam' GROUP BY p.may""", False, [('MAY-VP-XUONG', 3), ('MAY-XUONG-02', 2)]),
    # Vụ 5: Nam đếm kho — đơn nào đặt mua thứ mà trong xưởng không có lấy một cái
    'v5-dat-ma-khong-co': ("SELECT d.ma_don, d.linh_kien, d.so_luong, k.so_luong_co FROM don_linh_kien d JOIN kiem_ke k ON d.linh_kien = k.linh_kien WHERE k.so_luong_co = 0 ORDER BY d.ma_don", True, [('DLK-03', 'Động cơ servo', 8, 0), ('DLK-06', 'Mạch điều khiển', 3, 0), ('DLK-08', 'Bộ khung nhôm', 2, 0)]),
    # Vụ 5: khoản ghi vào quỹ CLB Thám Tử, theo người duyệt; lọc nhóm vượt một triệu
    'v5-quy-theo-nguoi': ("""SELECT c.nguoi_duyet, COUNT(*) AS so_khoan, SUM(c.so_tien) AS tong, AVG(c.so_tien) AS trung_binh
FROM khoan_chi c JOIN quy q ON c.ma_quy = q.ma_quy WHERE q.clb = 'THAM_TU' GROUP BY c.nguoi_duyet""", False, [
        ('Khánh', 3, 2400000, 800000.0), ('Minh Anh', 3, 450000, 150000.0)]),
    'v5-vuot-muc': ("""SELECT c.nguoi_duyet, COUNT(*) AS so_khoan, SUM(c.so_tien) AS tong, AVG(c.so_tien) AS trung_binh
FROM khoan_chi c JOIN quy q ON c.ma_quy = q.ma_quy WHERE q.clb = 'THAM_TU' GROUP BY c.nguoi_duyet HAVING SUM(c.so_tien) > 1000000""", False, [
        ('Khánh', 3, 2400000, 800000.0)]),
    # Vụ 5: ba khoản đó chính là ba đơn "của Nam" tạo từ máy văn phòng xưởng ban đêm (nối ba bảng)
    'v5-noi-ve-vu-4': ("""SELECT c.ma_chi, d.nguoi_dat, p.may, p.gio FROM khoan_chi c JOIN don_linh_kien d ON c.ma_don = d.ma_don
JOIN phien_dang_nhap p ON d.ma_phien = p.ma_phien WHERE c.ma_quy = 'Q-TT' ORDER BY c.ma_chi""", True, [
        ('KC-03', 'Nam', 'MAY-VP-XUONG', '21:50'), ('KC-06', 'Nam', 'MAY-VP-XUONG', '22:10'), ('KC-08', 'Nam', 'MAY-VP-XUONG', '22:05')]),
}


def main() -> None:
    c = sqlite3.connect(':memory:')
    c.executescript(SCHEMA)
    for ten, (sql, thu_tu, mong) in CASES.items():
        that = c.execute(sql).fetchall()
        if (that if thu_tu else sorted(that)) != (mong if thu_tu else sorted(mong)):
            raise SystemExit(f'{ten}: mong {mong!r}, ra {that!r}')
        print(f'OK {ten}: {len(that)} dong')
    print(f'PASS {len(CASES)} cau')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
