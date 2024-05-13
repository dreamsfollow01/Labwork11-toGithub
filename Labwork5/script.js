/*
1. Створіть функцію average, яка знаходить середнє значення із довільного числа аргументів, використайте  spread … оператор. 
*/

function average(...arguments) {
  let sum = 0;
  let average;

  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  average = sum / arguments.length;
  return average;
}

console.log(average(2, 4, 6, 8, 10, 10))


/*
2. Створіть функцію values(f, low, high), яка повертає масив значень [f(low), f(low + 1), ..., f(high)].
*/

function values(f, low, high) {
  let arr = [];

  for (let i = low; i <= high; i++) {
    arr.push(f(i));
  }

  return arr;
}

function doubling(a) {
  return a * 2;
}

console.log(values(doubling, 10, 13));


/*
3. Своріть функцію callWithContext як приймає обєкт та функцію коллбек яка викликається з контекстом переданого обєкта.Викличте цю функцію з об`єктом person з полями імя та вік та функцією яка виведе в консоль ‘Today is ${ date } !Happy birthday ${ name }.
*/

const person = {
  name: "Sophia",
  age: 30,
  city: "Los Angeles",
  birthdate: "10.02.1993"
};

function callWithContext(obj, callback) {
  callback.call(obj);
}

function happyBirthday() {
  const date = new Date().toLocaleDateString();
  console.log(`Сьогодні ${date}! З днем народження, ${this.name}!`);
}

callWithContext(person, happyBirthday);


/*
4. Створіть функцію, яка повертає об’єкт з двома методами: increment і getValue.Метод increment має збільшувати значення, яке зберігається в замиканні, а метод getValue має повертати поточне значення.
*/

function func() {
  let value = 0;

  function increment() {
    value++;
  }

  function getValue() {
    return value;
  }

  return {
    increment,
    getValue
  };
}

const counter = func();

counter.increment();
counter.increment();
counter.increment();

console.log(counter.getValue());


/*
5. Створіть функцію getGreeting яка приймає імя та повертає текстовий фрагмент типу ‘Hello name’. Зробіть щоб функція зберігала значення останнього виклику та якщо викликана знову з таким же аргументом – повертала кешовне значення.
*/

function getGreeting() {
  let cache = {};

  return function (name) {
    if (name in cache) {
      console.log(`Повернення кешованого результату для ${name}`);
      return cache[name];
    } else {
      console.log("Обчислення нового значення");
      let greeting = `Hello ${name}`;
      cache[name] = greeting;
      return greeting;
    }
  };
}

const greet = getGreeting();

console.log(greet('Tommy'));
console.log(greet('Jane'));
console.log(greet('Jane'));


/*
6. Створіть функцію, яка приймає число як аргумент і повертає функцію, яка приймає інше число як аргумент і повертає суму двох чисел. Перевірте функцію, викликавши її з різними номерами.
*/

function adder(a) {
  return function (b) {
    return a + b;
  };
}

const add = adder(8);

console.log(add(13));
console.log(add(-3));


/*
7. Створіть функцію, яка приймає масив текстових фрагментів як аргумент і повертає нову функцію, яка приймає текстовий фрагмент як аргумент і повертає логічне значення, яке вказує, чи існує текстовий фрагмент у вихідному масиві.
*/

function textCheck(textArray) {
  return function (txt) {
    return textArray.includes(txt);
  };
}

const textArray = ["Kyiv", "car", "speed", "JavaScript", "house"];
const check = textCheck(textArray);

console.log(check("car"));
console.log(check("house"));
console.log(check("CSS"));


/*
8. Створіть функцію, яка приймає масив об’єктів як аргумент і повертає новий масив об’єктів, де певна властивість написана з великої літери.Використовуйте стрілочну функцію.
*/

const persons = [
  john = { name: "john", age: 23, city: "Boston" },
  alex = { name: "alex", age: 20, city: "San Francisco" },
  anna = { name: "anna", age: 27, city: "New York City" }
];

const capitalize = (arr, prop) => {
  return arr.map(obj => ({
    ...obj, [prop]: obj[prop].charAt(0).toUpperCase() + obj[prop].slice(1)
  }));
};

const newPersons = capitalize(persons, "name");
console.log(newPersons);


/*
9. Напишіть приклад для демонстрації функцій call, apply, bind.
*/

const jake = {
  name: "Jake",
  age: 23,
  city: "Boston",
  userFrom() {
    console.log(`I'm from ${this.city}`);
  }
};

jake.userFrom();

// call()
const maria = {
  name: "Maria",
  age: 19,
  city: "Chicago"
};

jake.userFrom.call(maria);

// apply()
const tommy = {
  name: "Tommy",
  age: 27,
  city: "Dallas"
};

jake.userFrom.apply(tommy);

// bind()
const jessica = {
  name: "Jessica",
  age: 25,
  city: "Memphis"
};

const jessicaFrom = jake.userFrom.bind(jessica);
jessicaFrom();


/*
10. Створіть функцію яка приймає коллбек – викликає його з переданими аргументами та виводить в консоль імя функції, аргументи та час коли функція викликана. 
*/

function logger(callback, ...args) {
  const date = new Date();
  console.log(`Calling function "${callback.name}" with arguments: ${args} at ${date.toLocaleString()}`);
  return callback(...args);
}

function multiplying(a, b) {
  console.log(a * b);
}

logger(multiplying, 10, 13);


/*
11. Створіть функцію яка кешує останній виклик на 10 секунд. 
*/

function cacheLastCall(func) {
  let cachedArgs = null;
  let cachedResult = null;
  let cacheExpiration = 0;

  return function (...args) {
    const now = new Date().getTime();

    // якщо минуло менше 10 секунд з останнього виклику
    if (now - cacheExpiration < 10000 && cachedArgs) {
      console.log("Повернення кешованого результату");
      return cachedResult;
    }

    // інакше викликаємо передану функцію з новими аргументами
    cachedArgs = args;
    cachedResult = func(...args);
    cacheExpiration = now;

    return cachedResult;
  }
}

// Приклад використання
function sum(a, b) {
  console.log("Додавання");
  return a + b;
}

const cachedAdd = cacheLastCall(sum);

console.log(cachedAdd(2, 3)); // виконається add і поверне 5
console.log(cachedAdd(2, 3)); // поверне результат з кешу (5) без виклику add
setTimeout(() => console.log(cachedAdd(2, 3)), 5000); // поверне результат з кешу (5) через 5 секунд
setTimeout(() => console.log(cachedAdd(2, 3)), 15000); // виконається sum через 10 секундів і поверне 5


