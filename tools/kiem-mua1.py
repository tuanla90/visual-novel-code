#!/usr/bin/env python3
"""Check fixed SQL datasets and answer sets for docs/mvp/mua-1-*.md."""
import sqlite3


def db() -> sqlite3.Connection:
    c = sqlite3.connect(':memory:')
    c.executescript('''
    CREATE TABLE lop_sinh_hoat(ma_lop TEXT, nganh TEXT, khoa_hoc INTEGER, toa_nha TEXT);
    INSERT INTO lop_sinh_hoat VALUES
      ('KT26A','Kế toán',2026,'B'),('KT26B','Kế toán',2026,'A'),
      ('QT26A','Quản trị kinh doanh',2026,'C'),('QT26B','Quản trị kinh doanh',2026,'B'),
      ('BC26A','Báo chí',2026,'B'),('BC26B','Báo chí',2026,'C'),
      ('TC24A','Tài chính – Ngân hàng',2024,'A'),('MK24A','Marketing',2024,'A'),
      ('DL26A','Du lịch',2026,'C'),('CT26A','Công nghệ thông tin',2026,'A'),
      ('TM26A','Thương mại điện tử',2026,'C'),('BC25A','Báo chí',2025,'B'),
      ('KT24A','Kế toán',2024,'A'),('QT25A','Quản trị kinh doanh',2025,'C');

    CREATE TABLE nhat_ky_su_dung(ma_buoi TEXT, ma_phong TEXT, ngay TEXT, hoat_dong TEXT, trang_thai TEXT);
    INSERT INTO nhat_ky_su_dung VALUES
      ('BUOI-08','clb-tham-tu','2026-10-23','Hướng dẫn tân thành viên','DA_XAC_NHAN'),
      ('BUOI-01','P-KHO-CHUNG','2026-10-01','Nhận vật tư','DA_XAC_NHAN'),
      ('BUOI-06','CLB-THAM-TU  ','2026-10-16','Kiểm kê hồ sơ','DA_XAC_NHAN'),
      ('BUOI-05','clb-tham-tu','2026-10-30','Ôn SQL dự kiến','DU_KIEN'),
      ('BUOI-02','CLB-THAM-TU','2026-10-02','Họp thành viên','DA_XAC_NHAN'),
      ('BUOI-04','clb-tham-tu  ','2026-10-09','Ôn SQL','DA_XAC_NHAN'),
      ('BUOI-03','P-KHO-CHUNG','2026-10-06','Nhận vật tư','DA_XAC_NHAN');

    CREATE TABLE tai_san(ma_tai_san TEXT, ten_tai_san TEXT, vi_tri_so TEXT);
    INSERT INTO tai_san VALUES
      ('MIC-02','Micro không dây','TU_THIET_BI_CHUNG'),
      ('CAM-01','Máy ảnh CLB','TU_CLB'),
      ('MIC-01','Micro có dây','TU_THIET_BI_CHUNG');
    CREATE TABLE luan_chuyen(ma_phieu TEXT, ma_tai_san TEXT, den_vi_tri TEXT, nguoi_nhan TEXT, ngay TEXT, trang_thai TEXT);
    INSERT INTO luan_chuyen VALUES
      ('PX-19','MIC-02','PHONG_AM_THANH','Minh Anh','2026-11-03','DE_XUAT'),
      ('PX-11','MIC-01','TU_THIET_BI_CHUNG','Duy','2026-11-01','DA_NHAN'),
      ('PX-17','MIC-02','TU_THIET_BI_CHUNG','Duy','2026-10-31','DA_NHAN'),
      ('PX-20','CAM-01','PHONG_CLB','Minh Anh','2026-11-03','DA_NHAN');

    CREATE TABLE giao_dich(ma_gd TEXT, ma_phieu TEXT, loai TEXT, so_tien INTEGER, ma_tham_chieu TEXT);
    INSERT INTO giao_dich VALUES
      ('GD-01','PH-01','CHI',250000,'CT-101'),
      ('GD-02','PH-01','HOAN',-20000,'NH-770'),
      ('GD-03','PH-02','CHI',180000,'CT-102'),
      ('GD-04','PH-03','CHI',90000,'CT-103'),
      ('GD-05','PH-04','CHI',350000,'CT-104'),
      ('GD-06','PH-04','HOAN',-60000,'NH-771'),
      ('GD-07','PH-04','HOAN',-60000,'NH-771'),
      ('GD-08','PH-06','HOAN',-15000,'NH-776');

    CREATE TABLE ho_so_da_xac_minh(ma_vu TEXT, chu_de TEXT, ma_ho_so TEXT, so_ban_ghi INTEGER, trang_thai TEXT);
    INSERT INTO ho_so_da_xac_minh VALUES
      ('V2','HOAT_DONG','4_BUOI',4,'DA_XAC_NHAN'),
      ('V3','TAI_SAN','PX-17',1,'DA_XAC_NHAN'),
      ('V4','TAI_CHINH','PH-04',1,'DA_XAC_NHAN'),
      ('V5','TONG_HOP','BAN_NHAP',1,'CHO_XAC_MINH');

    CREATE TABLE luyen_dang_ky(ma_dang_ky TEXT, ten TEXT, trang_thai TEXT);
    INSERT INTO luyen_dang_ky VALUES ('DK-01','An','DANG_KY'),('DK-02','Binh','DA_HUY'),('DK-03','Chi','DANG_KY'),('DK-04','Dung','DANG_KY');
    CREATE TABLE luyen_nhan(ma_nhan TEXT, ten_nhan TEXT);
    INSERT INTO luyen_nhan VALUES ('N-01','but-chi'),('N-02','but-long'),('N-03','thuoc-ke'),('N-04','but-da');
    CREATE TABLE luyen_lich_truc(ma_ca TEXT, ma_ban TEXT, ngay TEXT);
    INSERT INTO luyen_lich_truc VALUES ('CA-04','ban-doc','2026-11-04'),('CA-02','BAN-DOC','2026-11-02'),('CA-01','ban-doc  ','2026-11-01'),('CA-03','  BAN-DOC','2026-11-03');
    CREATE TABLE luyen_mon(ma_mon TEXT, ten_mon TEXT);
    INSERT INTO luyen_mon VALUES ('M-01','Bánh mì'),('M-02','Sữa đậu'),('M-03','Xôi');
    CREATE TABLE luyen_don(ma_don TEXT, ma_mon TEXT, so_luong INTEGER, trang_thai TEXT);
    INSERT INTO luyen_don VALUES ('D-01','M-01',2,'DA_NHAN'),('D-02','M-02',1,'DA_NHAN'),('D-03','M-03',1,'DA_HUY');
    CREATE TABLE luyen_kho(ma_hang TEXT, loai_vat_tu TEXT, so_luong INTEGER);
    INSERT INTO luyen_kho VALUES ('K-01','GIAY',2),('K-02','GIAY',3),('K-03','MUC',1),('K-04','MUC',1),('K-05','BIA',4),('K-06','BIA',4);
    CREATE TABLE luyen_sach(ma_phieu TEXT, loai_sach TEXT, so_luong INTEGER, trang_thai TEXT);
    INSERT INTO luyen_sach VALUES ('S-01','THAM_KHAO',2,'DA_TRA'),('S-02','THAM_KHAO',1,'DA_TRA'),('S-03','VAN_HOC',4,'DA_TRA'),('S-04','VAN_HOC',2,'DANG_MUON'),('S-05','TRUYEN_NGAN',3,'DA_TRA');
    ''')
    return c


CASES = {
    'v1-select-columns': ("SELECT ma_lop, nganh FROM lop_sinh_hoat WHERE toa_nha = 'B'", [
        ('KT26A','Kế toán'),('QT26B','Quản trị kinh doanh'),('BC26A','Báo chí'),('BC25A','Báo chí')]),
    'v1-loc-and': ("SELECT ma_lop, nganh FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí' AND khoa_hoc = 2026", [
        ('BC26A','Báo chí')]),
    'v2-loc-buoi': ('''SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung
WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN'
ORDER BY ngay''', [
        ('BUOI-02','2026-10-02','Họp thành viên'),
        ('BUOI-04','2026-10-09','Ôn SQL'),
        ('BUOI-06','2026-10-16','Kiểm kê hồ sơ'),
        ('BUOI-08','2026-10-23','Hướng dẫn tân thành viên')]),
    'v3-noi-phieu': ('''SELECT t.ma_tai_san, t.ten_tai_san, l.ma_phieu, l.den_vi_tri, l.trang_thai
FROM tai_san t JOIN luan_chuyen l ON t.ma_tai_san = l.ma_tai_san
WHERE t.ma_tai_san = 'MIC-02' AND l.trang_thai = 'DA_NHAN' ''', [
        ('MIC-02','Micro không dây','PX-17','TU_THIET_BI_CHUNG','DA_NHAN')]),
    'v4-nhom-hoan': ('''SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_ghi_nhan
FROM giao_dich WHERE loai = 'HOAN' GROUP BY ma_phieu HAVING COUNT(*) > 1''', [
        ('PH-04',2,-120000)]),
    'v4-chi-tiet': ('''SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich
WHERE ma_phieu = 'PH-04' AND loai = 'HOAN' ORDER BY ma_gd''', [
        ('GD-06','PH-04',-60000,'NH-771'),('GD-07','PH-04',-60000,'NH-771')]),
    'v5-cte-bao-cao': ('''WITH muc_da_xac_minh AS (
  SELECT ma_vu, chu_de, ma_ho_so, so_ban_ghi FROM ho_so_da_xac_minh WHERE trang_thai = 'DA_XAC_NHAN'
)
SELECT ma_vu, chu_de, ma_ho_so, so_ban_ghi FROM muc_da_xac_minh ORDER BY ma_vu, ma_ho_so''', [
        ('V2','HOAT_DONG','4_BUOI',4),('V3','TAI_SAN','PX-17',1),('V4','TAI_CHINH','PH-04',1)]),
    'side-01-danh-sach': ('''SELECT ma_dang_ky, ten FROM luyen_dang_ky WHERE trang_thai = 'DANG_KY' ''', [
        ('DK-01','An'),('DK-03','Chi'),('DK-04','Dung')]),
    'side-02-ten': ('''SELECT ma_nhan, ten_nhan FROM luyen_nhan WHERE ten_nhan LIKE 'but%' ''', [
        ('N-01','but-chi'),('N-02','but-long'),('N-04','but-da')]),
    'side-03-thu-tu': ('''SELECT ma_ca, ngay FROM luyen_lich_truc WHERE LOWER(TRIM(ma_ban)) = 'ban-doc' ORDER BY ngay''', [
        ('CA-01','2026-11-01'),('CA-02','2026-11-02'),('CA-03','2026-11-03'),('CA-04','2026-11-04')]),
    'side-04-noi-bang': ('''SELECT d.ma_don, m.ten_mon, d.so_luong FROM luyen_don d
JOIN luyen_mon m ON d.ma_mon = m.ma_mon WHERE d.trang_thai = 'DA_NHAN' ''', [
        ('D-01','Bánh mì',2),('D-02','Sữa đậu',1)]),
    'side-05-nhom': ('''SELECT loai_vat_tu, SUM(so_luong) AS tong_so FROM luyen_kho
GROUP BY loai_vat_tu HAVING SUM(so_luong) < 5''', [('MUC',2)]),
    'side-06-cte': ('''WITH sach_da_tra AS (
  SELECT loai_sach, so_luong FROM luyen_sach WHERE trang_thai = 'DA_TRA'
)
SELECT loai_sach, SUM(so_luong) AS tong_so FROM sach_da_tra GROUP BY loai_sach ORDER BY loai_sach''', [
        ('THAM_KHAO',3),('TRUYEN_NGAN',3),('VAN_HOC',4)]),
}


def main() -> None:
    c = db()
    for name, (sql, expected) in CASES.items():
        actual = c.execute(sql).fetchall()
        if actual != expected:
            raise SystemExit(f'{name}: expected {expected!r}, got {actual!r}')
        print(f'OK {name}: {len(actual)} rows')
    print(f'PASS {len(CASES)} SQL checks')


if __name__ == '__main__':
    main()
