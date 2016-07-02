var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var session =  require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// var users = require('./routes/users');


var mongoose = require('mongoose');
//connect to mongodb
var dbUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||"mongodb://localhost:27017/app";
mongoose.connect(dbUrl, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + dbUrl);
      }});
require('./models/models.js');

var api = require('./routes/api');
var auth = require('./routes/auth')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// entry point -- dir here
app.use(express.static(path.join(__dirname, 'public/app')));
// passport
app.use(session({
  secret: 'super duper secret'
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', api);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
