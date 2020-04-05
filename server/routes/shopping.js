const express = require('express');
const router = express.Router();
const pool = require('../database');

/* /shopping routes */

router.get('/', function (req, res) {
    pool.query(`select * from items`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

router.post('/additemtocart/:itemId', function (req, res) {

    const { itemId } = req.params;

    //TODO quantity
    const quantity = 1;

    pool.query(`select * from current_cart WHERE item_id = ${itemId}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            //need to check if it is already in the cart, if it is, just add the quantity
            if (results.length) {
                pool.query(`UPDATE current_cart SET quantity = quantity + 1 WHERE item_id = ${itemId}`, (err, results) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.send(results);
                    }
                });
            } else {
                pool.query(`INSERT INTO current_cart (item_id, quantity) VALUES (${itemId}, ${quantity});`, (err, results) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.send(results);
                    }
                });
            }
        }
    });
});

module.exports = router;
