const express = require('express');
const router = express.Router();
const pool = require('../database');

/* /cart routes */

router.get('/', function (req, res) {
    console.log('cart')
    pool.query(`SELECT current_cart.id AS current_cart_id, current_cart.quantity, items.id as item_id, items.name, items.description, items.price FROM current_cart INNER JOIN items ON current_cart.item_id = items.id`, (err, results) => {
       console.log('after cart')
       if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

router.put('/changeitemquantity/:itemId/:amount', function (req, res) {

    const { amount, itemId } = req.params;

    pool.query(`UPDATE current_cart SET quantity = quantity + ${amount} WHERE item_id = ${itemId}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

router.post('/order', function (req, res) {

    pool.query(`SELECT * FROM orders ORDER BY id DESC LIMIT 1`, (err, results) => {

        if (err) {
            return res.send(err);
        } else {

            const orderNum = results.length === 1 ? parseInt(results[0].id) + 1 : '1'

            pool.query(`INSERT INTO orders (name, created_at) VALUES ('Order #${orderNum}', NOW())`, (order_err, order_results) => {

                if (order_err) {
                    return res.send(order_err);
                } else {

                    pool.query(`SELECT * FROM current_cart`, (cart_err, cart_results) => {

                        if (cart_err) {
                            return res.send(cart_err);
                        } else {

                            //TODO this could be optimized by pooling one big query and committing it at the end
                            cart_results.forEach(cartItem => {
                                pool.query(`INSERT INTO order_items (order_id, item_id, quantity) VALUES (${order_results.insertId}, ${cartItem.item_id}, ${cartItem.quantity})`, (order_item_err, order_item_results) => {
                                    if (order_item_err) {
                                        return res.send(order_item_err);
                                    }
                                });
                            });

                            pool.query(`TRUNCATE current_cart`, (trunc_cart_err, results) => {
                                if (trunc_cart_err) {
                                    return res.send(trunc_cart_err);
                                }
                            });
                        }

                        return res.send(order_results);
                    });
                }
            });
        }
    });
});

router.delete('/removefromcart/:itemId', function (req, res) {

    const { itemId } = req.params;

    pool.query(`DELETE FROM current_cart WHERE item_id = ${itemId}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

module.exports = router;
