const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

// MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI,
(err) => err ? console.log('\x1b[31m', 'Failed to connect mongodb -> ', err) : console.log('\x1b[32m', 'Connect to mongoDB'));

// Service and Middlewares
const ResponseHandler = require('./src/middlewares/ResponseHandler')

// Routers
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const apiRouter = require('./src/routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.use(ResponseHandler)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
