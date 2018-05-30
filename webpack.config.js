/**
 * @author: @AngularClass
 */

/**
 * Look in ./webpack folder for webpack.dev.js
 */
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
      module.exports = require('./webpack/webpack.prod')({env: 'production'});
      break;
    case 'test':
    case 'testing':
      module.exports = require('./webpack/webpack.test')({env: 'test'});
      break;
    case 'dev':
    case 'development':
    default:
      module.exports = require('./webpack/webpack.dev')({env: 'development'});
  }
  