var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/cart', function (req, res, next) {
    console.log('FOUND');

    return 'hiiii'


});

module.exports = router;
