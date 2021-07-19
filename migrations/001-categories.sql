-- Category
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    alt TEXT NOT NULL,
    image TEXT,
    keywords TEXT,
    description TEXT,
    parent INT DEFAULT 0 NOT NULL,
    createdBy TEXT,
    createdDate DATE,
    modifiedBy TEXT,
    modifiedDate DATE,
    deleteFlag INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO Category (title, alt, image, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Mạch điện', 'mach-dien', '/categories/EU_PSU_WHITE-800x800.jpg', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, image, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Ví tạo ẩm phun sương', 'vi-tao-am-phun-suong', '/categories/RPI-400-US_main-800x800.jpg', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, image, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Board mạch PLC & HMI', 'board-mach-plc-hmi', '/categories/RPI-CASE-4W-800x800.jpg', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, image, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Thiết bị máy rang Cafe', 'thiet-bi-may-rang-cafe', '/categories/RPI-LENS-6MM-800x800.jpg', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, image, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Thiết bị y tế', 'thiet-bi-y-te', '/categories/RPI-3USBLAN-HUB-800x800.jpg', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 0, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Shield', 'shield', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 1, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Mạch điều khiển', 'mach-dieu-khien', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 1, 'system', DATE('2021-07-04'), 0);

INSERT INTO Category (title, alt, description, parent, createdBy, createdDate, deleteFlag) 
    VALUES('Bảng hiển thị LED', 'bang-hien-thi-led', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo', 1, 'system', DATE('2021-07-04'), 0);

-- Down
DROP TABLE Category;