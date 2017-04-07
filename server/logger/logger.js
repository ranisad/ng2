var winston = require('winston');
var loggerInstance = null;

var config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta'
    }
};
class Logger {
  static initialize() {
      loggerInstance = new(winston.Logger)({
          transports: [
              new(winston.transports.File)({
                  name: 'info-file',
                  filename: 'logs/filelog-info.log',
                  level: 'info',
                  order: 'desc',
                  colorize: true,
                  'timestamp': true,
                  maxsize: 1024,
                  maxFiles: 5
              }),
              new(winston.transports.File)({
                  name: 'error-file',
                  filename: 'logs/filelog-error.log',
                  level: 'error',
                  order: 'desc',
                  colorize: true,
                  'timestamp': true,
                  maxsize: 1024,
                  maxFiles: 5
              }),
              new(winston.transports.Console)({
                  'timestamp': true,
                  level: 'debug'
              })
          ],
          levels: config.levels,
          colors: config.colors
      });
  }
  static instance() {
      return loggerInstance;
  };
}
module.exports.Logger = Logger;
