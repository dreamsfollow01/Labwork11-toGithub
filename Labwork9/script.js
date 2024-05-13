const logger = require("./modules/logger.js");


/*
1. Напишіть простий модуль логування, який підтримує логування повідомлень, для яких рівень логування перевищує заданий поріг. Експортуйте функцію log, константи рівнів логування та функцію завдання рівня логування.  
*/

// Рівень логування INFO
logger.setLogLevel(logger.LogLevel.INFO);

// Повідомлення з рівнем ERROR виведено не буде
logger.log(logger.LogLevel.ERROR, "This is an ERROR level message");

// Повідомлення з рівнем WARN виведено не буде
logger.log(logger.LogLevel.WARN, "This is an WARN level message");

// Повідомлення з рівнем INFO
logger.log(logger.LogLevel.INFO, "This is an INFO level message");

// Повідомлення з рівнем DEBUG
logger.log(logger.LogLevel.DEBUG, "This is an DEBUG level message");

// Повідомлення з рівнем TRACE
logger.log(logger.LogLevel.TRACE, "This is an TRACE level message");



/*
2. Повторіть попереднє завдання але тепер експортуйте весь класс по замовчуванню.
*/

// import Logger from "./modules/logger.js";

// Logger.setLogLevel(Logger.LogLevel.TRACE);

// Logger.log(Logger.LogLevel.ERROR, "This is an ERROR level message");

// Logger.log(Logger.LogLevel.DEBUG, "This is an DEBUG level message");

// Logger.log(Logger.LogLevel.TRACE, "This is an TRACE level message");



/*
4. Напишіть простий модуль шифрування, в якому використовується шифр Цезаря (додавання константи до кожної кодової точки). Використайте модуль логування із попередніх вправ, щоб протоколювати всі звернення до decrypt.
*/

// import { caesarEncrypt, caesarDecrypt } from "./modules/caesarEncryption.js";

// const message = "Kyiv is the capital of Ukraine";
// const key = 10;

// const encrypted = caesarEncrypt(message, key);
// console.log(`Encrypted message: ${encrypted}`);

// const decrypted = caesarDecrypt(encrypted, key);
// console.log(`Decrypted message: ${decrypted}`);


/*
5. Напишіть простий модуль, який включає функції як повертають: випадкові цілі числа, масиви цілих випадкових чисел і випадкові текстові фрагменти. Використовуйте якнайбільше синтаксичних форм export. 
*/

// import { randomInt, randomIntsArray, randomString } from "./modules/random.js";

// console.log(randomInt(13));
// console.log(randomIntsArray(10, -10, 13));
// console.log(randomString(18));