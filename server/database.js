const mysql = require('mysql');
const SQL = require('sql-template-strings');

//TODO most of this should probably be in the docker image file
//TODO dont have this run every single time the app is served
//init DB and tables
/*
tables:
items
    -name
    -price
currentcart
    -itemID
    -quantity
orders
    -name
    -time
orderitems
    -itemID
    -quantity

*/

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test_schema',
    debug: false,
    multipleStatements: true
});

connection.connect();

const initSQL = (SQL
`SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET AUTOCOMMIT = 0; 
START TRANSACTION;
SET time_zone = '+00:00';

/*  ITEMS TABLE  */
DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id int(255) NOT NULL,
    name varchar(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO items (id, name, price) VALUES
    (1, 'Bread', 1.25),
    (2, 'Milk', 2.25),
    (3, 'Chicken', 14.99),
    (4, 'Beef', 19.99);

ALTER TABLE items
ADD PRIMARY KEY(id);
ALTER TABLE items
MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 5;

/*  CURRENTCART TABLE  */
DROP TABLE IF EXISTS currentCart;

CREATE TABLE currentCart (
    id int(255) NOT NULL,
    itemID varchar(100) NOT NULL,
    quantity int(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE currentCart
ADD PRIMARY KEY(id);
ALTER TABLE currentCart
MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 5;

/*  ORDERS TABLE  */
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id int(255) NOT NULL,
    name varchar(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE orders
ADD PRIMARY KEY(id);
ALTER TABLE orders
MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 5;

/*  ORDERITEMS TABLE  */
DROP TABLE IF EXISTS orderItems;

CREATE TABLE orderItems (
    id int(255) NOT NULL,
    itemID int(100) NOT NULL,
    quantity int(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE orderItems
ADD PRIMARY KEY(id);
ALTER TABLE orderItems
MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 5;


COMMIT;`
);

connection.query(initSQL, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(results[0]);
    console.log(results[1]);
});

connection.end();

//TODO change this for docker
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test_schema',
});

module.exports = pool;
