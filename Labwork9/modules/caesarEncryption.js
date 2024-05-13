/*
4. Напишіть простий модуль шифрування, в якому використовується шифр Цезаря (додавання константи до кожної кодової точки). Використайте модуль логування із попередніх вправ, щоб протоколювати всі звернення до decrypt.
*/

import Logger from "./logger.js";

function caesarEncrypt(message, key) {
  let result = "";

  for (let i = 0; i < message.length; i++) {
    let c = message.charCodeAt(i);

    // Uppercase letters
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 + key) % 26) + 65);
    }

    // Lowercase letters
    else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 + key) % 26) + 97);
    } else {
      result += message.charAt(i);
    }
  }
  return result;
}

function caesarDecrypt(message, key) {
  Logger.log(Logger.LogLevel.INFO, `Decrypting message: ${message}`);

  let result = "";

  for (let i = 0; i < message.length; i++) {
    let c = message.charCodeAt(i);

    // Uppercase letters
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 - key + 26) % 26) + 65);
    }

    // Lowercase letters
    else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 - key + 26) % 26) + 97);
    }
    else {
      result += message.charAt(i);
    }
  }
  Logger.log(Logger.LogLevel.INFO, `Decrypted message: ${result}`);
  return result;
}

export { caesarEncrypt, caesarDecrypt };