var express = require('express');
var router = express.Router();
const pool = require('../database');


/* /cart routes */

router.get('/', function (req, res) {
    console.log('FOUND cart');

   pool.query(`SELECT current_cart.quantity, items.name, items.price FROM current_cart INNER JOIN items on current_cart.item_id = items.id`, (err, results) => {
        if (err) {
            console.log(err)
            return res.send(err);
        } else {
            return res.send(results);
        }
    });


});

module.exports = router;
