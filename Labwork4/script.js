/* 
1. Створіть масив persons та додайте в нього 5 обєктів типу { name: ‘John’, age: 23, city: ‘Boston’}. Для масиву persons встановіть властивості  groupName=’A’, teacher=’Joan Doe’, year=’2023’. З допомогою різних версій циклу for виведіть елементи масиву та властивості масиву. 
*/

const persons = [
  john = { name: "John", age: 23, city: "Boston" },
  alex = { name: "Alex", age: 20, city: "San Francisco" },
  anna = { name: "Anna", age: 27, city: "New York City" },
  thomas = { name: "Thomas", age: 18, city: "Las Vegas" },
  sophia = { name: "Sophia", age: 30, city: "Los Angeles" }
];

persons.groupName = "A";
persons.teacher = "Joan Doe";
persons.year = "2023";

console.log("Виведення елементів масиву за допомогою for:");
for (let i = 0; i < persons.length; i++) {
  console.log(`Person ${i + 1}: name = ${persons[i].name}, age = ${persons[i].age}, city = ${persons[i].city}`);
}

// console.log(`Group Name = ${persons.groupName}, Teacher = ${persons.teacher}, Year = ${persons.year}`);

console.log("\nВиведення елементів масиву за допомогою for...of:");
for (let person of persons) {
  console.log(person);
}

console.log("\nВиведення властивостей масиву за допомогою for...in:");
for (let prop in persons) {
  console.log(`${prop}: ${persons[prop]}`);
}



/*
2. Створіть обєкт defaults призначений для збереження налаштувань програми який містить поля mode=test, debugLevel=error, logFolder=root. Створіть обєкт userSetting який містить поля mode=production, debugLevel=trace. Створіть функцію яка прийме як аргументи дані два обєкти та обєднає властивості цих двох обєктів в один обєкт надаючи пріоритет властивостям з обєкта userSetting. Запропонуєти як мінімум 3 способи для вирішення цієї задачі. 
*/

let defaults = {
  mode: "test",
  debugLevel: "error",
  logFolder: "root"
};

let userSetting = {
  mode: "production",
  debugLevel: "trace"
};

console.log("\nОб'єднання за допомогою оператора spread:");
function unifySettings(defaults, userSetting) {
  return { ...defaults, ...userSetting };
}

// console.log("\nОб'єднання за допомогою циклу for...in:");
// function unifySettings(defaults, userSetting) {
//   let unifiedSettings = {};
//   for (let key in defaults) {
//     if (key in userSetting) {
//       unifiedSettings[key] = userSetting[key];
//     } else {
//       unifiedSettings[key] = defaults[key];
//     }
//   }
//   return unifiedSettings;
// }

// console.log("\nОб'єднання за допомогою методу Object.assign():");
// function unifySettings(defaults, userSetting) {
//   return Object.assign({}, defaults, userSetting);
// }

let merged = unifySettings(defaults, userSetting);
console.log(merged);



/*
3. Для обєкта person із завдання 1 додайте можливість отримати рік народження не додаючи додаткової властивості до цього обєкта. Зробіть дане поле доступним тільки для читання. 
*/

sophia = {
  name: "Sophia",
  age: 30,
  city: "Los Angeles",
  get birthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
}

console.log(sophia.birthYear); //1993
sophia.birthYear = 2002;
console.log(sophia.birthYear); //Все одно значення 1993



/*
4. Якими способами можна обєднати два масиви? 
*/

const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8];

// 1. Оператор spread
const spreadArray = [...arr1, ...arr2];
console.log(`Оператор spread: ${spreadArray}`);

// 2. Метод push()
// arr2.forEach(el => {
//   arr1.push(el);
// });
// console.log(`\nМетод push(): ${arr1}`);

// // 3. Метод splice()
// arr1.splice(4, 0, arr2);
// console.log(`\nМетод splice(): ${arr1}`);

// 4. Метод concat()
const concatArray = arr1.concat(arr2);
console.log(`\nМетод concat(): ${concatArray}`);



/*
5. Напишіть алгоритм який перетворить масив persons у масив текстових фрагментів типу ’John from Boston born in 2000’ 
*/

const fragments = persons.map(person => `${person.name} from ${person.city} born in ${new Date().getFullYear() - person.age}`);
console.log(fragments);



/*
6. Напишіть алгоритм який з масиву persons вибере людей старше 20 років. 
*/

function getOlderPersons(persons) {
  let olderPersons = [];
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].age >= 20) {
      olderPersons.push(`${persons[i].name} from ${persons[i].city} born in ${new Date().getFullYear() - persons[i].age}`)
    }
  }
  return olderPersons;
}

console.log(getOlderPersons(persons));


/*
7. З допомогою деструктуризації присвойте значення полів name, city із обєкта person у окремі змінні. З допомогою деструктуризації присвойте перший елемен масиву persons у зокрему змінну. 
*/

const { name, city } = sophia;
console.log(`\n${name} live in ${city}`);

const [personFirst] = persons;
console.log(personFirst);



/*
8. Створіть функцію getUserData яка приймє аргументом імя користувача та повертає обєкт із масиву persons. Якщо обєкт з таким іменем не знайдений функція має згенерувати обєкт помилки new Error(‘Unable to find user’). Створіть функцію showUserInfo яка приймає аргументом імя, виводить в консоль текст ‘Loading’, викликає функцію getUserData, якщо користувач знайдений – виводить його поля в консоль і текст ‘Loading finished’, якщо користувач не знайдений виведіть текст помилки та текст ‘Loading finished’.
*/

function getUserData(userName) {
  const user = persons.find(person => person.name === userName);
  if (!user) {
    throw new Error("Unable to find user");
  }
  return user;
}

async function showUserInfo(name) {
  console.log("\nLoading...");
  try {
    const user = await getUserData(name);
    console.log(`Name - ${user.name}, Age - ${user.age}, City - ${user.city}`);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Loading finished")
  }
}

console.log(showUserInfo("Anna"));



/*
9. Напишіть функцію яка перетворить текстовий фрагмент у масив букв.
*/

function stringToArray(text) {
  return text.split("");
}

console.log(stringToArray("Loading"));


/*
10. Створіть функцію яка відобразить букви слова у зворотньому порядку.
*/

function reverseWord(word) {
  return word.split("").reverse().join("");
}

console.log(reverseWord("Hello, I'm from Ukraine"));


/*
11. Напишіть функцію яка визначатиме чи передане імя файлу файл формату ‘.js’
*/

function isJSFile(filename) {
  return filename.endsWith(".js");
}

console.log(isJSFile("index.html"));
console.log(isJSFile("script.js"));


/*
12. Напишіть функцію яка перетворить речення на масив слів
*/

function toWords(sentence) {
  return sentence.split(" ");
}

console.log(toWords("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, distinctio!"));


/*
13. Напишіть алгорим який замінить певне слово у текстовому фрагменті
*/

function wordReplace(text, wordToReplace, newWord) {
  let replacedText = "";
  const words = text.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i] === wordToReplace) {
      replacedText += newWord;
    } else {
      replacedText += words[i];
    }

    if (i !== words.length - 1) {
      replacedText += " ";
    }
  }

  return replacedText;
}

const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, distinctio!";
const newText = wordReplace(text, "dolor", "hryvnias");

console.log(newText);