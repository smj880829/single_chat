var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
  if (req.session && req.session.flg === true)
    return next();
  else
    return   res.redirect('/login');
};

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.flg == true) {
    res.render('index');
}
else {
    res.render('login',{title:'welcome'});
}
  //res.render('index');
});

router.get('/main',auth, function(req, res, next) {
          res.render('main');
});

router.get('/profile',auth, function(req, res, next) {
          res.render('profile');
});

router.get('/chat', function(req, res, next) {
  res.render('chat');
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
      res.render('login',{title:'로그아웃 되었습니다.'});
  })
});

router.get('/login', function(req, res, next) {
      res.render('login',{title:'로그인해주세요!'});
});



router.post('/login', function(req, res, next) {
  if(req.body.email == '123' &&  req.body.password == '123'){
    req.session.flg = true;
    res.redirect('/');
  }else {
    res.render('login',{title:'잘못된 계정입니다 ㅠ.'});
  }
});

router.get('/error', function(req, res, next) {
  res.render('error');
});

module.exports = router;
