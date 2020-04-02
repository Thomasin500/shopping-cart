var express = require('express');
var router = express.Router();
const pool = require('../database');

/* /shopping routes */

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

router.get('/items', function (req, res, next) {
    console.log('shopoing items');

    res.send('Hello shopping world!');


});

module.exports = router;
