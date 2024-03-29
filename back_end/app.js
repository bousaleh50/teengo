require("./config")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter=require("./routes/register");
var loginRouter=require("./routes/login");
var postsRouter=require("./routes/posts");
var likesRouter=require("./routes/likes");
var commentsRouter=require("./routes/comments");
var profileRouter=require("./routes/profile")
var followRouter=require("./routes/followings")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',registerRouter);
app.use('/',loginRouter);
app.use('/posts',postsRouter);
app.use('/',likesRouter);
app.use('/comments',commentsRouter)
app.use("/profile", profileRouter);
app.use("/followers",followRouter)
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
  res.render('error');
});

app.listen(4000,()=>{
  console.log('server runnign on port 4000')
});

module.exports = app;
