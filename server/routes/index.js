var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder', message : req.flash('loginMessage')});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login', message : req.flash('loginMesage')});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'signup', message : req.flash('signupMessage')});
});

router.get('/profile', function(req, res, next) {
  res.render('index', { title: 'profile',user : req.user, avatar : gravatar.url(req.user.meail,{s:'100',r:'x',d:'retro'},true)});
});

router.get('/flash',function(req,res){
  req.session.message = '세션 메시지';
  req.flash('message', 'flash 메시지');
  res.redirect('/users/flash/result'); 
});


module.exports = router;
