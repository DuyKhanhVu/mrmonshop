var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signInRouter = require('./routes/singin');
var logOutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');
var signUpRouter = require('./routes/singup');
var collectionsRouter = require('./routes/collections');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');
var validateRouter = require('./routes/validate')

var app = express();

require('./middlewares/session')(app);
require('./middlewares/passport')(app);


//app.use(require('./middlewares/auth_local.mdw'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.use('/', indexRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/collections', collectionsRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);

app.use('/logout', logOutRouter);
app.use('/profile', profileRouter);
app.use('/validate', validateRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.user=req.user;
  res.locals.session=req.session;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

module.exports = app;
