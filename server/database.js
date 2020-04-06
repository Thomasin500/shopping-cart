const mysql = require('mysql');
const SQL = require('sql-template-strings');

//TODO most of this should probably be in the docker image file
//TODO dont have this run every single time the app is served
//todo check camael case issue
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

/*  items TABLE  */
DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id int(255) NOT NULL,
    name varchar(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE items
ADD PRIMARY KEY(id);
ALTER TABLE items
MODIFY id int(255) NOT NULL AUTO_INCREMENT;

INSERT INTO items (name, price) VALUES
    ('Bread', 1.25),
    ('Milk', 2.25),
    ('Chicken', 14.99),
    ('Beef', 19.99);

/*  current_cart TABLE  */
DROP TABLE IF EXISTS current_cart;

CREATE TABLE current_cart (
    id int(255) NOT NULL,
    item_id varchar(100) NOT NULL,
    quantity int(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE current_cart
ADD PRIMARY KEY(id);
ALTER TABLE current_cart
MODIFY id int(255) NOT NULL AUTO_INCREMENT;

INSERT INTO current_cart (id, item_id, quantity) VALUES
    (1, 1, 2),
    (2, 2, 3);

/*  ORDERS TABLE  */
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id int(255) NOT NULL,
    name varchar(100) NOT NULL,
    created_at TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE orders
ADD PRIMARY KEY(id);
ALTER TABLE orders
MODIFY id int(255) NOT NULL AUTO_INCREMENT;

INSERT INTO orders (id, name) VALUES
    (1, 'Order One'),
    (2, 'Order Two');

/*  order_items TABLE  */
DROP TABLE IF EXISTS order_items;

CREATE TABLE order_items (
    id int(255) NOT NULL,
    order_id int(255) NOT NULL,
    item_id int(100) NOT NULL,
    quantity int(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE order_items
ADD PRIMARY KEY(id);
ALTER TABLE order_items
MODIFY id int(255) NOT NULL AUTO_INCREMENT;

INSERT INTO order_items (order_id, item_id, quantity) VALUES
    (1, 1, 2),
    (1, 2, 3),
    (2, 1, 1);

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
