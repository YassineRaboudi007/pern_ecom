create database pern_ecomm;

create table IF NOT EXISTS products(
    prod_id serial primary key,
    name varchar(255),
    qty int,
    price numeric,
    description varchar(255),
    picture varchar(255)
);

create table IF NOT EXISTS users(
    id serial primary key,
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255) unique,
    password varchar(255),
    phone varchar(8),
    createdAt date not null default CURRENT_DATE
);