/*
1. Напишіть функцію invokeAfterDelay, яка повертає проміс, який викликає задану функцію із заданою затримкою. Продемонструйте її роботу, повертаючи проміс, що містить випадкове число від 0 до 10. Отриманий результат виведіть в консолі. 
*/

function invokeAfterDelay(fn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = fn();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }, delay);
  });
}

const randomNumPromise = invokeAfterDelay(() => Math.floor(Math.random() * 11), 5000);
randomNumPromise.then((num) => console.log(`Random number: ${num}`));


/*
2. Створивши на базі попередньої функції функцію produceRandomAfterDelay. Викличте функцію produceRandomAfterDelay двічі і надрукуйте суму, після того як будуть отримані обидва результати. 
*/

function produceRandomAfterDelay() {
  return invokeAfterDelay(() => Math.floor(Math.random() * 11), 2000);
}

async function printSumOfRandoms() {
  const randomNum1 = await produceRandomAfterDelay();
  const randomNum2 = await produceRandomAfterDelay();
  console.log(`The sum of two random numbers is ${randomNum1 + randomNum2}`);
}

printSumOfRandoms();


/*
3. Напишіть функцію sleep, яка повертає проміс, який можна викликати так: await sleep(1000) 
*/

function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function test() {
  console.log("Start");
  await sleep(3500);
  console.log("End");
}

test();


/*
4. Напишіть функцію getUser яка приймає id та повертає проміс який виконується через 1 секунду з обєктом користувача з полями імя, вік, місто, id. Підготуйте 4 обєкти користувача з id від 0 до 3 які повертатимуться функцією відповідно до id. Якщо незнайомий id отриманий – проміс має бути відхилений з помилкою ‘User not found’. 
*/

const userId = +prompt("Write user ID", "");

function getUser(id) {
  const users = [
    { id: 0, name: "Mary", age: 22, city: "London" },
    { id: 1, name: "Caroline", age: 25, city: "Sacramento" },
    { id: 2, name: "Josh", age: 30, city: "Toronto" },
    { id: 3, name: "Danny", age: 26, city: "Stockholm" }
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
}

getUser(userId)
  .then(user => console.log(`ID: ${user.id} \nName: ${user.name} \nAge: ${user.age} \nCity: ${user.city}`))
  .catch(error => console.error(error));


/*
5. Напишіть функцію loadUsers яка приймає масив ідентифікаторів та повертає масив обєктів користувача використовуючи попередню функцію. Обробіть ситуацію коли один з промісів був відхилений. 
*/

async function loadUsers(ids) {
  try {
    const promises = ids.map(id => getUser(id));
    const users = await Promise.all(promises);
    return users.map(user => `ID - ${user.id}, Name - ${user.name}, Age - ${user.age}, City - ${user.city}`).join("\n");
  } catch (e) {
    throw new Error("User not found");
  }
}

loadUsers([0, 1, 2, 3])
  .then(users => console.log(`Task 5 \n${users}`))
  .catch(error => console.error(error));


/*
6. Напишіть функцію logCall яка приймає функцію коллбек – викликає її через одну секунду та пише в консоль поточний час. Зробіть щоб дана функція повертала проміс. Зробіть 4 послідовних виклики даної функції використовуючи ланцюжок промісів. 
*/

function logCall(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(new Date().toLocaleTimeString());
      callback();
      resolve();
    }, 1000);
  });
}

logCall(() => console.log("Call 1 time"))
  .then(() => logCall(() => console.log("Call 2 time")))
  .then(() => logCall(() => console.log("Call 3 time")))
  .then(() => logCall(() => console.log("Call 4 time")))


/*
7. Напишіть функцію яка showUsers яка симулює завантаження користувачів використовуючи loadUsers.  Перед викликом loadUsers дана функція має вивести в консоль ‘loading’ при при успішному чи неуспішному завершенні виведе ‘loading finished’. Використайте синтаксис async/await при виконанні даного завдання. 
*/

async function showUsers(ids) {
  try {
    console.log("Loading...");
    const users = await loadUsers(ids);
    console.log(`Task 7 \n${users}`);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Loading finished");
  }
}

showUsers([0, 1, 2, 3]);