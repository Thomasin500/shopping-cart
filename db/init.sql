SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*  items TABLE  */
DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
    `id` int(255) NOT NULL,
    `name` varchar(100) NOT NULL,
    `description` varchar(256) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE `items`
ADD PRIMARY KEY(`id`);
ALTER TABLE `items`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

INSERT INTO `items` (`name`, `description`, `price`) VALUES
    ('Milk', 'A nutrient-rich, white liquid food produced by the mammary glands of mammals', 3.25),
    ('Cheese', 'A dairy product derived from milk that is produced in a wide range of flavors, textures, and forms by coagulation of the milk protein casein', 1.99),
    ('Beef', 'The culinary name for meat from cattle, particularly skeletal muscle', 14.99),
    ('Bread', 'A staple food prepared from a dough of flour and water, usually by baking', 5.99),
    ('Wine', 'An alcoholic drink typically made from fermented grapes', 2.25),
    ('Fish', 'Gill-bearing aquatic craniate animals that lack limbs with digits', 22.999);

/*  current_cart TABLE  */
DROP TABLE IF EXISTS `current_cart`;

CREATE TABLE `current_cart` (
    `id` int(255) NOT NULL,
    `item_id` varchar(100) NOT NULL,
    `quantity` int(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE `current_cart`
ADD PRIMARY KEY(`id`);
ALTER TABLE `current_cart`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

/*  ORDERS TABLE  */
DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
    `id` int(255) NOT NULL,
    `name` varchar(100) NOT NULL,
    `created_at` TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE `orders`
ADD PRIMARY KEY(`id`);
ALTER TABLE `orders`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

/*  order_items TABLE  */
DROP TABLE IF EXISTS `order_items`;

CREATE TABLE `order_items` (
    `id` int(255) NOT NULL,
    `order_id` int(255) NOT NULL,
    `item_id` int(100) NOT NULL,
    `quantity` int(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE `order_items`
ADD PRIMARY KEY(`id`);
ALTER TABLE `order_items`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

COMMIT;
