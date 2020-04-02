const createError = require('http-errors');
const express = require('express');
const cors = require('cors');

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

app.use(cors());

//routes
const cartRouter = require('./routes/cart');
const shoppingRouter = require('./routes/shopping');

app.get('/', (req, res) => {
    console.log('hello')
    res.send('Hello World!');
});

app.use('/shopping', shoppingRouter);
app.use('/cart', cartRouter);

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
