var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sass = require('node-sass');
var route = require('./server/routes/index');
var users = require('./server/routes/users');
const flash = require('connect-flash');
// 몽구스 ODM
var mongoose = require('mongoose');
//데이터베이스 설정
var config = require('./server/config/config.js');
// 세션 저장용 모듈
var session = require('express-session');
var MongoStore = require('connect-mongo');

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');


// 데이터베이스 연결
mongoose.connect(config.url);
// 몽고DB가 실행 중인지 체크
mongoose.connection.on('error', function () {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    // express-session과 connect-mongo를 이용해 몽고DB에 세션 저장
    store: new MongoStore({
        mongoUrl: config.url,
        collection: 'sessions'
    })
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(sass({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(flash());

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
