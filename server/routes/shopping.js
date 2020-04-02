var express = require('express');
var router = express.Router();
const pool = require('../database');

/* /shopping routes */

//TODO issue with asxiops requests being doubled

//returns all items available for shopping
router.get('/', function (req, res) {

    console.log('ROUTE: /shopping/');

    const { table } = req.query;

    pool.query(`select * from ${table}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

router.post('/additemtocart', function (req, res) {

    console.log('add');

    //const { itemID, quantity } = req.query;

    const itemID = 1;
    const quantity = 2;

    console.log(req.query)

    console.log(itemID)
    console.log(quantity)

    pool.query(`INSERT INTO currentcart (itemID, quantity) VALUES (${itemID}, ${quantity});`, (err, results) => {
        console.log(results)
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

module.exports = router;
