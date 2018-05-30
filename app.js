//var createError = require('http-errors');
var app = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
//var bodyParser = require('body-parser');
//var session = require('express-session');



// var indexRouter = require('./routes/index');
// var auth = require('./routes/auth');
// var usersRouter = require('./routes/users');

//var app = express();
//import config from './config/config';

//import app from './config/express';
var app = require('./config/express');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({secret : 'anything'}));

//require('./config/passport')(app);

// routes
// app.use('/', indexRouter);
// app.use('/auth', auth)
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//export default express;
//export default app;
//module.exports = app;
module.exports = app;
