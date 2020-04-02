const express = require('express');
const router = express.Router();
const pool = require('../database');

/* /cart routes */

router.get('/', function (req, res) {
   pool.query(`SELECT current_cart.id as current_cart_id, current_cart.quantity, items.id as item_id, items.name, items.price FROM current_cart INNER JOIN items on current_cart.item_id = items.id`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

module.exports = router;
