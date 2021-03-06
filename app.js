var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
var mc = require('./routes/mongoConnector');
var scio = require('./routes/socketio');

var app = express();

var http = require('http').Server(app);
var mysocket = require('./mysocketio')(http);

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'smj',
                            resave: true,
                            saveUninitialized: true
                            ,cookie: { maxAge: null}}));

app.use('/', routes);
app.use('/users', users);
app.use('/mc', mc);
app.use('/socket.io',scio);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

http.listen(80);

const options = {
  key: fs.readFileSync('./device.key'),
  cert: fs.readFileSync('./device.crt')
};

var https = require('https').Server(options,app);
var httpsmysocket = require('./mysocketio')(https);
https.listen(443)



module.exports = app;
