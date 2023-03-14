drop database if exists book;
create database book;
use book;
CREATE TABLE `role` (
  id int auto_increment primary key ,
  name VARCHAR(45) NULL
  );
  
CREATE TABLE `account` (
  id int auto_increment primary key,
  usename VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  gmail VARCHAR(45) NOT NULL
 );
  
  CREATE TABLE  `account_role` (
  id int  not null,
  id_role int,
  id_account int,
  FOREIGN KEY(id_role) REFERENCES `role`(id),
  FOREIGN KEY(id_account) REFERENCES `account`(id),
  PRIMARY KEY (`id_role`, `id_account`));
  
  create table customer(
  id int auto_increment primary key,
  adress varchar(255),
  email varchar(255),
  name varchar(45),
  phone varchar(45),
  account_id int,
  flag bit(1),
   FOREIGN KEY(account_id) REFERENCES `account`(id)
  );
  
  create table cart(
  id int auto_increment primary key,
  customer_id int,
  quantity int,
  book_id int,
  flag bit(1),
  `status`bit(1),
  `date` datetime,
  pay_date datetime,
  foreign key(customer_id) references customer(id),
  foreign key(book_id) references book(id)
  );
  
  create table orders(
  id int auto_increment primary key ,
  code varchar(45),
  delivery_address varchar(255),
  phone varchar(255),
  customer_id int,
  total_order int,
  `date` datetime,
  foreign key(customer_id) references customer(id)
  );
  
  create table category(
  id int auto_increment primary key ,
  name varchar(255)
  );
  
  create table author(
  id int auto_increment primary key,
  name varchar(45)
  );
  
  create table publishing_company(
  id int auto_increment primary key ,
  name varchar(45)
  );
  
   create table img(
  id int auto_increment primary key ,
  name varchar(45)
  );
  
  create table book(
  id int auto_increment primary key ,
  name varchar(255),
  publication_date date,
  cover_form varchar(45),
  pages int,
  category_id int,
  publishing_company_id int,
  author_id int,
  quanlity int,
  price int,
  img_id int,
  flag bit(1),
  foreign key(category_id) references category(id),
  foreign key(publishing_company_id) references publishing_company(id),
  foreign key(author_id) references author(id),
  foreign key(img_id) references img(id)
  );
  
  create table order_detail(
  id int auto_increment primary key ,
  flag bit(1),
  quantity_order_detail int,
  book_id int,
  orders_id int,
  price int,
  `date` datetime,
  foreign key(book_id) references book(id),
  foreign key(orders_id) references orders(id)
  );
