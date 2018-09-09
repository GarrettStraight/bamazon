DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Pears", "Produce", 1.00, 65),
("Grapes", "Produce", 2.99, 24),
("Romaine lettuce", "Produce", 2.70, 36),
("Bannas", "Produce", 1.40, 73),
("Samsung LCD Tv's", "Elictronics", 279.99, 10),
("Screen Cleaner", "Electronics", 10.99, 30),
("250 gig SSD Drives", "Electronics", 89.99, 17),
("IPods", "electronics", 99.99, 7),
("Spam", "Grocery", 2.50, 50),
("Milk", "Grocery", 1.75, 25);



SELECT * FROM products;