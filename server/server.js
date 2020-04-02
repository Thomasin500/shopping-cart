const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const shoppingCartRouter = require('./routes/cart');

const app = express();
const port = 3001;

//needed to serve up css and front end tests
app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
/////////////////////////////////////////
////////////////////////

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    //todo bring back process.env for docker
    console.log(`App server now listening on port ${port}`);
});

//TODO change this for docker
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test_schema',
});

console.log(pool)

app.use(cors());

//routes
app.get('/test', (req, res) => {
    const { table } = req.query;

    pool.query(`select * from ${table}`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

app.get('/', (req, res) => {
    console.log('hello')
    res.send('Hello World!');
});


//app.use('/', indexRouter);

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
    res.json({ error: 'error' });
});

module.exports = app;
