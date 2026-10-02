
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidosRouter = require('./routes/pedidos');

var app = express();

// Configuração das views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pedidos', pedidosRouter);

// Erro 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Tratamento de erros
app.use(function(err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500).send(
        'Ocorreu um erro no servidor: ' + err.message
    );
});

module.exports = app;