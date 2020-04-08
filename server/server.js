const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.REACT_APP_SERVER_PORT;


//todo probably get rid of this
app.get('/test', (req, res) => {
    console.log('hello')

    pool.query(`select * from items`, (err, results) => {
        if (err) {
            console.log(err)
            return res.send(err);
        } else {
            console.log('DATABASE')
            return res.send(results);
        }
    });


});

app.get('/', (req, res) => {
    console.log('hel11lo')

    pool.query(`select * from items`, (err, results) => {
        if (err) {
            console.log(6660)
            console.log(err)
            return res.send(err);
        } else {
            console.log('DAT11ABASE')
            return res.send(results);
        }
    });


});

//needed to serve up css and front end tests
app.use(express.static('public'));
app.use(cors());

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//routes
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const shoppingRouter = require('./routes/shopping');



app.use('/shopping', shoppingRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
