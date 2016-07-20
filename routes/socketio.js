var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('wow');
});

router.post('/', function(req, res, next) {
  res.send('wow');
});

module.exports = router;
