var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', function(req, res, next) {
  res.render('main');
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

router.get('/ani', function(req, res, next) {
  res.render('ani');
});

router.get('/word', function(req, res, next) {
  res.render('word');
});

router.get('/error', function(req, res, next) {
  res.render('error');
});

module.exports = router;
