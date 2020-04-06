const express = require('express');
const router = express.Router();
const pool = require('../database');

/* /orders routes */

router.get('/', function (req, res) {
    console.log('orders')
    pool.query(`SELECT * FROM orders`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

router.get('/:orderId', function (req, res) {

    const { orderId } = req.params;

    pool.query(`SELECT order_items.quantity, items.name, items.price FROM order_items INNER JOIN items ON order_items.item_id = items.id WHERE order_items.order_id = ${orderId}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            console.log(results)
            return res.send(results);
        }
    });
});

module.exports = router;
