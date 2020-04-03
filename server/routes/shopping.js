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

    pool.query(`INSERT INTO current_cart (item_id, quantity) VALUES (${itemId}, ${quantity});`, (err, results) => {
        console.log(results)
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

module.exports = router;
