/*
1. Напишіть простий модуль логування, який підтримує логування повідомлень, для яких рівень логування перевищує заданий поріг. Експортуйте функцію log, константи рівнів логування та функцію завдання рівня логування.  
*/

const LogLevel = {
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  TRACE: 5
};

let currentLogLevel = LogLevel.DEBUG;

function setLogLevel(logLevel) {
  currentLogLevel = logLevel;
}

function log(level, message) {
  if (level < currentLogLevel) return;

  const timestamp = new Date().toISOString();
  console.log(`${timestamp} [${level}] ${message}`);
}

module.exports = {
  LogLevel,
  setLogLevel,
  log,
};



/*
2. Повторіть попереднє завдання але тепер експортуйте весь класс по замовчуванню. 
*/

class Logger {
  static LogLevel = {
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5
  };

  currentLogLevel = Logger.LogLevel.WARN;

  static setLogLevel(logLevel) {
    Logger.currentLogLevel = logLevel;
  }

  static log(level, message) {
    if (level < Logger.currentLogLevel) return;

    const timestamp = new Date().toISOString();
    console.log(`${timestamp} [${level}] ${message}`);
  }
}

export default Logger;