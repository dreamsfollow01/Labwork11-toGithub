/* 
1. Створіть клас для автомобіля з такими властивостями, як марка, модель і рік випуску. Потім створіть екземпляр автомобіля та встановіть його властивості. Виконайте дане завдання:
*/
//З використанням функції конструктора 
function Car1(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

let honda = new Car1("Honda", "Accord", 2017);
console.log(honda);

//З використанням синтаксису класс
class Car2 {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
}

let mazda = new Car2("Mazda", "6", 2014);
console.log(mazda);


/* 
2. Створіть два екземпляри даного класу користуючись методом Object.create() 
*/

let myCar = {
  brand: "",
  model: "",
  year: null
}

let volvo = Object.create(myCar);
volvo.brand = "Volvo";
volvo.model = "XC90";
volvo.year = 2022;

let audi = Object.create(myCar);
audi.brand = "Audi";
audi.model = "A8 L";
audi.year = 2021;

console.log(volvo);
console.log(audi);


/*
3. Створіть класс персона який містить поля імя, прізвище, рік народження. Створіть даний клас не використовуючи class синтаксис. Додайте в даний клас методи які виводитимуть вік та повне імя особи. 
*/

function Person(name, surname, yearOfBirth) {
  this.name = name;
  this.surname = surname;
  this.yearOfBirth = yearOfBirth;
}

Person.prototype.fullName = function () {
  return this.name + " " + this.surname;
}

Person.prototype.age = function () {
  let currYear = new Date().getFullYear();
  let age = currYear - this.yearOfBirth;

  return age;
}

// let user = new Person("Alex", "Smith", 1987);
// console.log(`Name: ${user.fullName()} \nAge: ${user.age()}`);


/*
4. Створіть субкласс класу персона який міститиме поле посада тп перевизначає метод виведення повного імені додаючи туди посаду особи. 
*/

function Employee(name, surname, yearOfBirth, position) {
  Person.call(this, name, surname, yearOfBirth);
  this.position = position;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.fullName = function () {
  return this.name + " " + this.surname + ", " + this.position;
}

let employee = new Employee("Alex", "Smith", 1987, "Senior Backend Developer");
console.log(`Name and Pos.: ${employee.fullName()} \nAge: ${employee.age()}`);


/*
5. Напишіть метод який приймає два обєкти та визначає чи вони обєкти одног класу та виводить в консоль фразу з іменами класів обєктів 
*/

function checkObjects(obj1, obj2) {
  if (obj1.constructor === obj2.constructor)
    console.log(`Objects belong to the class ${obj1.constructor.name}`);
  else
    console.log("Objects don't belong to the same class");
}

// class Person2 {
//   constructor(name, surname, yearOfBirth) {
//     this.name = name;
//     this.surname = surname;
//     this.yearOfBirth = yearOfBirth;
//   }
// }

const person1 = new Person("Michael", "Jordan", 1963);
const person2 = new Person("LeBron", "James", 1984);

checkObjects(person1, person2);


/*
6. Створіть метод який приймає екземпляр класу Person та перетворює його у екземпляр ObservedPerson. Екземпляр ObservedPerson має вести себе аналогічно до класу Person та при виклику його методів буде виводити в консоль кількість викликів.
*/

class ObservedPerson extends Person {
  constructor(name, surname, yearOfBirth) {
    super(name, surname, yearOfBirth);
    this.callCounts = {};
  }

  observeMethodCall(methodName) {
    if (!this.callCounts[methodName]) {
      this.callCounts[methodName] = 0;
    }
    this.callCounts[methodName]++;
    console.log(`${methodName} has been called ${this.callCounts[methodName]} times.`);
  }

  getFullName() {
    this.observeMethodCall("getFullName");
    return super.fullName();
  }

  getAge() {
    this.observeMethodCall("getAge");
    return super.age();
  }

  static observe(person) {
    return new ObservedPerson(person.name, person.surname, person.yearOfBirth);
  }
}

const person = new Person("James", "Bond", 1978);

console.log(person.fullName());
console.log(person.age());

const observedPerson = ObservedPerson.observe(person);

console.log(observedPerson.getFullName());
console.log(observedPerson.getAge());
console.log(observedPerson.getAge());

console.log(observedPerson.callCounts);


/*
7. Створіть абстрактний клас під назвою Shape, який визначає методи для обчислення площі та периметра. Змусьте дочірні класи імплементувати ці методи. 
*/

class Shape {
  getArea() { }
  getPerimeter() { }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return `Rect area: ${this.width * this.height}`;
  }

  getPerimeter() {
    return `Rect perimeter: ${(this.width + this.height) * 2}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getArea() {
    return `Circle area: ${Math.pow(this.radius, 2) * 3.14}`;
  }

  getPerimeter() {
    return `Circle perimeter ${2 * 3.14 * this.radius}`;
  }
}

class Square extends Shape {
  constructor(width) {
    super();
    this.width = width;
  }

  getArea() {
    return `Square area: ${Math.pow(this.width, 2)}`;
  }

  getPerimeter() {
    return `Square perimeter: ${this.width * 4}`;
  }
}

const rect = new Rectangle(8, 10)
const circle = new Circle(6);
const square = new Square(7);

// console.log(rect.getArea());
// console.log(rect.getPerimeter());


/*
8. Створіть масив фігур, що включає екземпляри кожного класу фігур. Перегляньте масив і викличте методи площі та периметра для кожної фігури. 
*/

const shapes = [
  new Rectangle(8, 10),
  new Circle(6),
  new Square(7)
];

shapes.forEach(shape => {
  console.log(shape.getArea());
  console.log(shape.getPerimeter());
});