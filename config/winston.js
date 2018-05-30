//import winston from 'winston';
var winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    })
  ]
});

//export default logger;
module.exports = winston;
