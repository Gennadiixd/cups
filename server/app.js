const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Сессии
const session = require('express-session');
const redis   = require("redis");
const RedisStore = require('connect-redis')(session);
const client  = redis.createClient();
const {cookiesCleaner} = require('./middleware/auth');
//



mongoose.connect('mongodb://localhost/mysteryagent', {useNewUrlParser: true});

const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/users');

const app = express();


app.use(session({
  store: new RedisStore({
    client,
    host: 'localhost',
    port: 6379,
  }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly : false,
    expires: 86400000,
    maxAge: null
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cookiesCleaner);

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/users', userRouter);

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
  res.send('error');
});

module.exports = app;
