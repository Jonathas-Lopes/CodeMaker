var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var estoqueRoutes = require('./routes/routes/estoque');
var validarOrigem = require('./middleware/csrfProtection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validarOrigem);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/estoque', estoqueRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  var isDevelopment = req.app.get('env') === 'development';
  res.locals.message = isDevelopment ? err.message : 'Ocorreu um erro interno.';
  res.locals.error = isDevelopment ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
