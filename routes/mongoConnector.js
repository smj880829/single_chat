var express = require('express');
var router = express.Router();
var db = require('../MongoConnector/DAO')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/insert_chatlog', function(req, res, next) {
  if(req.param('query') != ""){
    var getquery = req.param('query')
    getquery.insert_time = new Date()
    db.insert(getquery,function(re){
      res.send(re );
    }
    )}
    res.send("insert query!");
});

router.post('/find_chatlog', function(req, res, next) {
  db.find_sort_limit({},{'insert_time':-1},38,function(re){
    res.send(re );
  })
});

module.exports = router;
