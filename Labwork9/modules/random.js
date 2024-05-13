export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomIntsArray(length, min, max) {
  const arr = [];

  for (let i = 0; i < length; i++)
    arr.push(randomInt(min, max));

  return arr;
}

export function randomString(length) {
  let str = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    str += characters.charAt(Math.floor(Math.random() * characters.length));

  return str;
}