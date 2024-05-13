// 1. Виведіть число згенероване випадковим чином.  

let randomNum = Math.floor(Math.random() * 20)
console.log(randomNum)


//2. Створити змінні базових типів, виведіть їх на екран.  

let boolean = true;
console.log(boolean);

let number = 1029;
console.log(number);

const bigInt = 10293847n;
console.log(bigInt);

let bookName;  // undefined
console.log(bookName);

let age = null;
console.log(age);

let userName = 'Ілля';
alert(`Привіт, ${userName}!`);


//3. Збережіть суму двох чисел і збережіть її у третю змінну, виведіть її на екран. 

let firstNumber = +prompt('Введіть перше число', '');
let secondNumber = +prompt('Введіть друге число', '');
let numbersSum = firstNumber + secondNumber

console.log(numbersSum);


//4. Створіть файл script.js. Підключіть його в нижню частину файлу index.html. створіть три діалогових вікна з alert(), prompt(), confirm().

alert(`Привіт!`);
prompt("Як вас звуть?", "");
confirm("Хочете продовжити?");


//5. Запитайте у користувача його вік. Виведіть фразу “Ваш вік ____”

let userAge = prompt("Скільки вам років?", "");
console.log("Ваш вік - " + userAge);


//6. Ввести кількість купленого товару, ціну за одиницю. Виведіть суму покупки.

let product = prompt("Введіть кількість купленого товару", "1");
let price = prompt("Введіть ціну за одиницю", "");

console.log(`Сума покупки: ${product * price}`);


//7. Введіть число – визначте чи воно від’ємне.

let num = +prompt('Введіть число', '');
num < 0 ? console.log("Число від'ємне") : console.log("Число додатнє");


//8. Введіть номер дня тижня, виведіть його назву.

const daysWeek = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"];
let dayNumber = +prompt("Введіть номер дня тижня", "");
alert(daysWeek[dayNumber - 1]);


//9. Виведіть таблицю множення числа 6.

for (let i = 1; i <= 10; i++)
  console.log("6 x " + i + " = " + 6 * i);


//10. Задайте одномірний масив n=5. Виведіть квадрат третього числа, суму першого і останнього елемента суму квадратів від’ємних елементів.

let array = [];

const min = -10;
const max = 8;

let negativeSum;

for (let i = 0; i < 5; i++) {
  array.push(Math.floor(Math.random() * (max - min + 1) + min));
  if (array[i] < 0) {
    negativeSum += array[i] * array[i];
  }
}

console.log(array);

console.log(`Квадрат 3-го числа = ${Math.pow(array[2], 2)}`);
console.log(`Сума 1-го та останнього елементів = ${array[0] + array[4]}`);
console.log('Сума квадратів від’ємних елементів = ' + negativeSum);


//11. Створіть об’єкт машина. Поля: ім’я власника, назва моделі, об’єм двигуна. Створіть масив з кількома об’єктами, виведіть машину з мінімальним об’ємом двигуна.

let cars = [
  car1 = {
    owner: "Ілля",
    model: "Mazda6",
    engineCapacity: 2.5
  },
  car2 = {
    owner: "Женя",
    model: "Audi Q7",
    engineCapacity: 6
  },
  car3 = {
    owner: "Єгор",
    model: "Skoda Octavia",
    engineCapacity: 2
  }
];

let minEngineCapacity = cars.reduce((prev, curr) => {
  return prev.engineCapacity < curr.engineCapacity ? prev : curr;
});

console.log(minEngineCapacity);


//12. Введіть 4 числа, Знайти max{min(a, b), min(c, d)}

let enterNums = prompt("Введіть 4 числа через кому", "");

let numbers = enterNums.split(',');
console.log(numbers);

let minAB = Math.min(numbers[0], numbers[1]);
console.log(`min(${numbers[0]}, ${numbers[1]}) = ${minAB}`);

let minCD = Math.min(numbers[2], numbers[3]);
console.log(`min(${numbers[2]}, ${numbers[3]}) = ${minCD}`);

let maxMinNumber = Math.max(minAB, minCD);
console.log(`max{min(${numbers[0]}, ${numbers[1]}), min(${numbers[2]}, ${numbers[3]})} = ${maxMinNumber}`);



//13. Задайте слово, виведіть його довжину та запишіть його в зворотному порядку. 

let word = prompt("Введіть слово", "");
console.log(word.length);

let reverseWord = word.split("").reverse().join("");

// let reverseWord = "";
// for (let i = word.length - 1; i >= 0; i--)
//   reverseWord += word[i];

console.log(reverseWord);