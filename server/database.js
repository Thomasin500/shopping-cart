const mysql = require('mysql');
const SQL = require('sql-template-strings');

//TODO most of this should probably be in the docker image file
//init DB and tables
/*
tables:
items
users
orders (join table of users to items), maybe have a flag that shows if it is complete or not
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
