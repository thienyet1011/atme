-- Category
CREATE TABLE Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    alt TEXT NOT NULL,
    image TEXT,
    price REAL DEFAULT 0 NOT NULL,
    discount REAL DEFAULT 0 NOT NULL,
    feature INTEGER DEFAULT 0 NOT NULL,
    categoryId INTEGER NOT NULL,
    showPrice INTEGER DEFAULT 1 NOT NULL,
    keywords TEXT,
    description TEXT,
    parent INT DEFAULT 0 NOT NULL,
    status INT DEFAULT 0 NOT NULL,
    quantity INT DEFAULT 0 NOT NULL,
    createdBy TEXT,
    createdDate DATE,
    modifiedBy TEXT,
    modifiedDate DATE,
    deleteFlag INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Thiết bị điều khiển thông minh từ xa bằng điện thoại', 
        'thiet_bi_dieu_khien_thong_minh_tu_xa_bang_dien_thoai', 
        '/products/PI/EU_PSU_WHITE-800x800.jpg', 1200000, 0, 1, 7, 0,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 150, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Main ESP32 WIFI điều khiển LED P5 Full Color - Giao tiếp RS485 Isolated', 
        'main_esp32_wifi_dieu_khien_led_p5_full_color_giao_tiep_rs485_isolated', 
        '/products/PI/EU_PSU_BLACK-800x800.jpg', 850000, 0, 1, 7, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 80, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Vỉ tạo ẩm phun sương 10 mắt (7L/H) có cảm biến', 
        'vi_tao_am_phun_suong_10_mat_7lh_co_cam_bien', 
        '/products/PI/FAN-0305-3008-800x800.jpg', 1850000, 0, 1, 2, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 95, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Quạt Sò Ly Tâm 220V 85W', 'quat_so_ly_tam_220v_85w', 
        '/products/PI/HAT-WIRELESS5-800x800.jpg', 750000, 0, 1, 2, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 34, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Vỉ tạo ẩm phun sương 12 mắt có cảm biến', 
        'vi_tao_am_phun_suong_12_mat_co_cam_bien', 
        '/products/PI/Pi-Camera-V2-1-800x800.jpg', 2150000, 0, 1, 2, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 0, 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Nguồn chống nước tiêu chuẩn IP67 48V - 400W', 
        'nguon_chong_nuoc_tieu_chuan_ip67_48v_400w', 
        '/products/PI/RPI-3USBLAN-HUB-800x800.jpg', 1050000, 0, 1, 2, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 0, 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('USB to RS232 Converter', 'usb_to_rs232_converter', 
        '/products/PI/RPI-400-US_main-800x800.jpg', 100000, 0, 1, 3, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 56, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('PLC FX2N-10MR', 'plc_fx2n_10mr', 
        '/products/PI/RPI-CASE-4W-800x800.jpg', 650000, 0, 1, 3, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 65, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('PLC FX2N-10MT', 'plc_fx2n_10mt', 
        '/products/PI/RPI-HDMI-MICRO-W-800x800.jpg', 650000, 0, 1, 3, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 34, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('PLC FX1N-20MR', 'plc_fx1n-20mr', 
        '/products/PI/RPI-LENS-6MM-800x800.jpg', 800000, 0, 1, 3, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 32, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('ARTISAN PROFILE điều khiển rang Cafe', 'artisan_profile_dieu_khien_rang_cafe', 
        '/products/PI/WR-RSCAM-30CM 01-800x800.jpg', 1200000, 0, 1, 4, 0,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 36, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('ARTISAN COFFEE WIFI kết nối giản đồ nhiệt', 'artisan_coffee_wifi_ket_noi_gian_do_nhiet', 
        '/products/PI/DS-RPI-7-800x800.jpg', 2890000, 0, 1, 4, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 43, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Thiết bị xuất PROFILE máy rang USB ISO (Hàng cách ly - Tốt)', 
        'thiet_bi_xuat_profile_may_rang_usb_iso_hang_cach_ly_tot', 
        '/products/PI/HAT-DIGIAMP-P_h-512x512.jpg', 950000, 0, 1, 4, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 23, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Bộ điều khiển nhiệt độ Hanyoung VX4-UMNA-A1C', 
        'bo_dieu_khien_nhiet_do_hanyyoung_vx4_umna_a1c', 
        '/products/PI/HAT-WIRELESS-800x800.jpg', 925000, 0, 1, 4, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 0, 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Thiết bị xuất PROFILE máy rang USB', 'thiet_bi_xuat_profile_may_rang_usb', 
        '/products/PI/HAT-MDD10-800x800.jpg', 650000, 0, 1, 4, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 0, 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Điều khiển máy rang Cafe', 'dieu_khien_may_rang_cafe', 
        '/products/PI/RPI-RETRO-GAMEPAD-800x800.jpg', 1200000, 0, 1, 4, 0,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 38, 'system', DATE('2021-07-04'), 0);

INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, description, 
        parent, status, quantity, createdBy, createdDate, deleteFlag) 
    VALUES('Đầu đọc nhiệt độ không tiếp xúc K3', 'dau_doc_nhiet_do_khong_tiep_xuc_k3', 
        '/products/PI/HAT-RJ45-USBH_main-800x800.jpg', 1890000, 0, 1, 5, 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 
        0, 1, 47, 'system', DATE('2021-07-04'), 0);

-- Down
DROP TABLE Product;