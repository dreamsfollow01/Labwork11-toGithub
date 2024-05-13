/*
1. Реалізуйте клас Person з полями для імені, прізвища, статі та сімейного становища. Реалізуйте метод toLocaleString для форматування імені, наприклад, 'Ms. Smith', 'Frau Smith', 'Mme Smith'. Дізнайтесь, які форми ввічливості прийняті у різних мовах, і реалізуйти такі варіанти як Ms. або Mrs./Miss. 
*/

class Person {
  constructor(name, surname, gender, maritalStatus) {
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.maritalStatus = maritalStatus;
  }

  toLocaleString(lang) {
    let formattedName = "";
    let title;

    switch (lang) {
      case "en":
        if (this.gender === "female") {
          if (this.maritalStatus === "married")
            title = "Mrs.";
          else
            title = "Ms.";
        } else {
          title = "Mr.";
        }

        formattedName = `${title} ${this.surname}`;
        break;

      case "de":
        if (this.gender === "female") {
          if (this.maritalStatus === "married")
            title = "Frau";
          else
            title = "Fräulein";
        } else {
          title = "Herr";
        }

        formattedName = `${title} ${this.surname}`;
        break;

      case "fr":
        if (this.gender === "female") {
          if (this.maritalStatus === "married")
            title = "Mme";
          else
            title = "Mlle";
        } else {
          title = "M.";
        }

        formattedName = `${title} ${this.surname}`;
        break;

      case "es":
        if (this.gender === "female") {
          if (this.maritalStatus === "married")
            title = "Señorа";
          else
            title = "Señorita";
        } else {
          title = "Señor";
        }

        formattedName = `${title} ${this.surname}`;
        break;

      default:
        formattedName = `${this.name} ${this.surname}`;
    }

    return formattedName;
  }
}

let person1 = new Person("Jane", "Miller", "female", "single");
let person2 = new Person("Jakob", "Williams", "male", "married");

console.log("Task 1")
console.log(person1.toLocaleString("es"));
console.log(person2.toLocaleString("de"));


/*
2. Реалізуйте програму яка приймає число та друкує його у трьох версіях - англійських, арабських та тайських цифр.
*/

function printNumberInDifferentNumerals(num) {
  const arabicNumerals = num.toLocaleString("ar-EG-u-nu-arab")
  const englishNumerals = num.toLocaleString("en-US-u-nu-latn");
  const thaiNumerals = num.toLocaleString("th-TH-u-nu-thai");
  console.log(`Arabic numerals: ${arabicNumerals}`);
  console.log(`English numerals: ${englishNumerals}`);
  console.log(`Thai numerals: ${thaiNumerals}`);
}

console.log("Task 2")
printNumberInDifferentNumerals(120.781);


/*
3. Напишіть програму для демонстрації стилів форматування дати та часу у Франції, Китаї, Єгипті та Таїланді (з використанням тайських цифр).
*/

function formatDateAndTime(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  const franceDate = date.toLocaleString("fr-FR", options);
  const chinaDate = date.toLocaleString("zh-CN", options);
  const egyptDate = date.toLocaleString("ar-EG", options);
  const thailandDate = date.toLocaleString("th-TH-u-nu-thai", options);

  console.log(`France: ${franceDate}`);
  console.log(`China: ${chinaDate}`);
  console.log(`Egypt: ${egyptDate}`);
  console.log(`Thailand: ${thailandDate}`);
}

console.log("Task 3")
formatDateAndTime(new Date());


/*
4. Напишіть функцію порівняння двох текстових фрагментів відповідно до локалі. Вона повинна працювати в режимах ігнорування та врахування регістру.
*/

function compareStrings(str1, str2, locale, caseSensitive) {
  if (!caseSensitive) {
    str1 = str1.toLocaleLowerCase(locale);
    str2 = str2.toLocaleLowerCase(locale);
  }

  return str1.localeCompare(str2, locale);
}

const result = compareStrings("Dollar", "dollar", "fr-FR", true);

console.log("Task 4")
console.log(result);


/*
5. Розглянемо шаблон '{0} has {1} messages'. Його французька версія повинна мати вигляд 'Il y a {1} messages pour {0}'. При форматуванні повідомлення аргументи передаються у фіксованому порядку, що не залежить від мови. Напишіть функцію messageFormat, яка приймає шаблонний рядок та змінну кількість аргументів. Придумайте механізм який виставлятиме аргументи в шаблон відповідно до локалі.
*/

function messageFormat(template, locale, ...args) {
  const locales = {
    en: "{0} has {1} messages",
    fr: "Il y a {1} messages pour {0}",
    ua: "{0} має {1} повідомлень"
  };

  const formatString = locales[locale] || locales["en"];

  return formatString.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined"
      ? args[number]
      : match;
  });
}

console.log("Task 5");
console.log(messageFormat("{0} has {1} messages", "fr", "Mike", 7)); // Il y a 7 messages pour John
console.log(messageFormat("{0} has {1} messages", "ua", "Костя", 5)); // Костя має 5 повідомлень
console.log(messageFormat("{0} has {1} messages", "de", "Hans", 1)); // Hans has 1 messages


/*
6. Запропонуйте клас для відображення розмірів аркуша паперу, що залежить від локалі, з використанням бажаної одиниці вимірювання та розміру за умовчанням для даної локалі. У всіх країнах, окрім США та Канади, розміри аркушів паперу визначаються стандартом ISO 216. Лише три країни ще не перейшли офіційно на метричну систему: Ліберія, М'янма (Бірма) та США.
*/

class PaperSize {
  constructor(locale, unit) {
    this.locale = locale;
    this.unit = unit || this.getDefaultUnit();
    this.size = this.getDefaultSize();
  }

  getDefaultUnit() {
    const nonMetricCountries = ["LR", "MM", "US"];
    return nonMetricCountries.includes(this.locale.slice(-2)) ? "inch" : "mm";
  }

  getDefaultSize() {
    const iso216Countries = ["US", 'CA'];
    return iso216Countries.includes(this.locale.slice(-2)) ? "Letter" : "A4";
  }

  display() {
    console.log(`Default paper size for ${this.locale} is ${this.size} in ${this.unit}`);
  }
}

console.log("Task 6");

const paperSize1 = new PaperSize("en-US");
const paperSize2 = new PaperSize("en-CA");
const paperSize3 = new PaperSize("uk-UA");

paperSize1.display();
paperSize2.display();
paperSize3.display();