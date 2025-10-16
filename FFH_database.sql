use banxedap;
drop database if exists reactnative_ff;
create database reactnative_ff;
use reactnative_ff;


create table nguoi_dung (
id int primary key auto_increment,
ten_nguoi_dung varchar(200),
email_nguoi_dung varchar(200),
mat_khau_nguoi_dung varchar(200),
vai_tro varchar(200),
sdt_nguoi_dung varchar(200),
dia_chi_nguoi_dung varchar(200),
anh_nguoi_dung varchar(200),
token text,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp
);

create table loai_san_pham (
id int primary key auto_increment,
ten_loai_san_pham varchar (200),
anh_loai_san_pham varchar(200),
url_loai_san_pham varchar(200),
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp
);

create table nha_cung_cap (
id int primary key auto_increment,
ten_nha_cung_cap varchar(200),
dia_chi_nha_cung_cap varchar(200),
sdt_nha_cung_cap varchar(200),
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp
);

create table san_pham(
id int primary key auto_increment,
ten_san_pham varchar(200),
gia_san_pham int,
anh_san_pham varchar(200),
mo_ta_san_pham varchar(500),
so_luong_ton int default 0,
ma_loai_san_pham int,
ma_nha_cung_cap int,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp,
foreign key (ma_loai_san_pham) references loai_san_pham(id) on delete set null on update cascade,
foreign key (ma_nha_cung_cap) references nha_cung_cap(id) on delete set null on update cascade
);

create table hoa_don_nhap(
id int primary key auto_increment,
ma_nha_cung_cap int,
ngay_nhap datetime,
tong_tien int,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp,
foreign key (ma_nha_cung_cap) references nha_cung_cap(id) on delete set null on update cascade
);

create table chi_tiet_hoa_don_nhap(
id int primary key auto_increment,
ma_san_pham int,
ma_hoa_don_nhap int,
so_luong int default 1,
gia_nhap float,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp,
foreign key (ma_san_pham) references san_pham(id) on delete set null on update cascade,
foreign key (ma_hoa_don_nhap) references hoa_don_nhap(id) on delete set null on update cascade
);
create table hoa_don_ban(
id int primary key auto_increment,
ma_nguoi_dung int,
ngay_ban datetime,
tong_tien int,
ghi_chu varchar(1000),
trang_thai varchar(200), -- Chưa thanh toán, đã thanh toán, đang vận chuyển, đã hoàn thành, đã bị hủy
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp,
foreign key (ma_nguoi_dung) references nguoi_dung(id) on delete set null on update cascade
);
create table chi_tiet_hoa_don_ban(
id int primary key auto_increment,
ma_san_pham int,
ma_hoa_don_ban int,
so_luong int default 1,
gia_ban float,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp,
foreign key (ma_san_pham) references san_pham(id) on delete set null on update cascade,
foreign key (ma_hoa_don_ban) references hoa_don_ban(id) on delete set null on update cascade
);

INSERT INTO nguoi_dung (ten_nguoi_dung, email_nguoi_dung, mat_khau_nguoi_dung, vai_tro)
VALUES 
('Nguyễn Hùng Anh', 'admin', '1', 'admin'),
('Tran Thi B', 'b@example.com', '123456', 'user'),
('Le Van C', 'c@example.com', '123456', 'user'),
('Pham Thi D', 'd@example.com', '123456', 'user'),
('Hoang Van E', 'e@example.com', '123456', 'admin');
INSERT INTO loai_san_pham (ten_loai_san_pham, anh_loai_san_pham, url_loai_san_pham)
VALUES 
('Hoa bó', 'hoa_trang_tri.jpg', 'hoa-trang-tri'),
('Hoa để bàn', 'hoa_su_kien.jpg', 'hoa-su-kien'),
('Hoa sự kiện', 'hoa_van_phong.jpg', 'hoa-van-phong'),
('Hoa tâm linh', 'hoa_nghe_thuat.jpg', 'hoa-nghe-thuat'),
('Combo quà tặng', 'hoa_cao_cap.jpg', 'hoa-cao-cap');

INSERT INTO nha_cung_cap (ten_nha_cung_cap, dia_chi_nha_cung_cap, sdt_nha_cung_cap)
VALUES 
('Công ty Hoa Việt', 'Hà Nội', '0901234567'),
('Cửa hàng Hoa Sài Gòn', 'TP.HCM', '0902345678'),
('Xưởng Hoa Giả Đà Nẵng', 'Đà Nẵng', '0903456789'),
('Hoa Decor', 'Cần Thơ', '0904567890'),
('Hoa Handmade', 'Huế', '0905678901');

INSERT INTO san_pham (ten_san_pham, gia_san_pham, anh_san_pham, so_luong_ton, ma_loai_san_pham, ma_nha_cung_cap)
VALUES
-- Hoa bó
('Bó hoa hồng đỏ lụa', 250000, 'hoa_hong_do.jpg', 15, 1, 1),
('Bó hoa baby trắng', 180000, 'hoa_baby.jpg', 20, 1, 2),

-- Hoa để bàn
('Chậu hoa lan hồ điệp', 320000, 'hoa_lan.jpg', 10, 2, 3),
('Chậu hoa sen trắng', 290000, 'hoa_sen.jpg', 8, 2, 4),

-- Hoa sự kiện
('Hoa trang trí backdrop', 450000, 'hoa_backdrop.jpg', 5, 3, 1),
('Hoa cổng cưới giả', 600000, 'hoa_cong_cuoi.jpg', 3, 3, 5),

-- Hoa tâm linh
('Bình hoa mẫu đơn vàng', 210000, 'hoa_mau_don.jpg', 12, 4, 2),
('Hoa cúc trắng bàn thờ', 190000, 'hoa_cuc_trang.jpg', 18, 4, 4),

-- Combo quà tặng
('Combo hoa + thiệp sinh nhật', 350000, 'combo_sinh_nhat.jpg', 10, 5, 3),
('Combo hoa + gấu bông', 420000, 'combo_gau_bong.jpg', 7, 5, 5);


-- INSERT INTO hoa_don_nhap (ma_nha_cung_cap, ngay_nhap, tong_tien)
-- VALUES 
-- (1, '2025-09-01 10:00:00', 1500000),
-- (2, '2025-09-02 11:30:00', 1200000),
-- (3, '2025-09-03 09:45:00', 1800000),
-- (4, '2025-09-04 14:20:00', 1000000),
-- (5, '2025-09-05 16:10:00', 1300000);

-- INSERT INTO chi_tiet_hoa_don_nhap (ma_san_pham, so_luong, gia_nhap)
-- VALUES 
-- (1, 10, 140000),
-- (2, 8, 190000),
-- (3, 15, 110000),
-- (4, 12, 95000),
-- (5, 6, 170000);

-- INSERT INTO hoa_don_ban (ma_nguoi_dung, ngay_ban, tong_tien)
-- VALUES 
-- (1, '2025-09-06 10:00:00', 300000),
-- (2, '2025-09-07 12:00:00', 450000),
-- (3, '2025-09-08 15:00:00', 600000),
-- (4, '2025-09-09 17:00:00', 250000),
-- (5, '2025-09-10 19:00:00', 500000);

-- INSERT INTO chi_tiet_hoa_don_ban (ma_san_pham, so_luong, gia_ban)
-- VALUES 
-- (1, 2, 150000),
-- (2, 1, 200000),
-- (3, 3, 120000),
-- (4, 2, 100000),
-- (5, 1, 180000);

update san_pham
set anh_san_pham = '/uploads/image-1757985174433.jpg', mo_ta_san_pham = 'Hoa giả chất lượng cao'
where id <11;

update loai_san_pham
set url_loai_san_pham = '/test'
where id < 11;

update loai_san_pham
set anh_loai_san_pham = '/uploads/image-1757985192206.jpg'
where id < 11;

update nguoi_dung
set token = 'my_token', dia_chi_nguoi_dung = 'thôn Đại Đồng, xã Đại Đồng, tỉnh Hưng Yên', sdt_nguoi_dung ='0865713676', anh_nguoi_dung='/uploads/image-1757748160166.jpg'
where id = '1';

SELECT * FROM nguoi_dung WHERE email_nguoi_dung = 'admin' AND mat_khau_nguoi_dung = '1';

use reactnative_ff;
-- INSERT INTO hoa_don_ban (
--   ma_nguoi_dung,
--   ngay_ban,
--   tong_tien,
--   ghi_chu,
--   trang_thai
-- ) VALUES (
--   1,
--   NOW(),
--   150000,
--   'Khách mua hoa tươi cho sinh nhật',
--   'Chưa thanh toán'
-- );
-- INSERT INTO chi_tiet_hoa_don_ban (
--   ma_san_pham,
--   ma_hoa_don_ban,
--   so_luong,
--   gia_ban
-- ) VALUES (
--   1,
--   6,
--   2,
--   75000
-- );

select * from hoa_don_ban;
select * from chi_tiet_hoa_don_ban
