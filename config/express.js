
const express 				= require('express');
const expressWinston 	= require('express-winston');
const expressValidation = require('express-validation');
const session         = require('express-session');

const logger   				= require('morgan');
const bodyParser			= require('body-parser');
const cookieParser		= require('cookie-parser');
const compress 				= require('compression');
const methodOverride 	= require('method-override');
const cors 				    = require('cors');
const httpStatus 			= require('http-status');
const helmet   				= require('helmet');
const winstonInstance	= require('./winston');

const routes   				= require('../routes/index.route');
const config 	  			= require('./config');
const APIError 				= require('../helpers/APIError');
const path 				    = require('path');
const appRoot 				= require('app-root-path');


const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());


// enable CORS - Cross Origin Resource Sharing
var whitelist = [
  'http://localhost:4200',      
  'http://localhost:4200/login',
  'http://localhost:3000',
  'http://localhost:3000/api',
];

var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors());
app.options('*', cors()) // include before other routes
app.use(cors(corsOptions));

// app.use(session({
//   secret : config.EXPRESS_SESSION_SECRET,
//   resave : true,
//   saveUninitialized : false
// }));

// Passport
require('./passport')(app);

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  // app.use(expressWinston.logger({
  //   winstonInstance,
  //   meta: true, // optional: log meta data about request (defaults to true)
  //   msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  //   colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  // }));
}
//app.use(express.static(path.join(appRoot.path, 'dist')));
app.use(express.static(path.join(appRoot.path, 'public')));

app.use('/api', routes);

// innograph.init('/api/graphql', app, {post: postCtrl});

app.get('*', (req, res) => {
  //res.sendFile(path.join(appRoot.path, 'dist/index.html'));
  const err = new APIError('Bad Request', httpStatus.BAD_REQUEST);
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

//export default app;
module.exports = app;