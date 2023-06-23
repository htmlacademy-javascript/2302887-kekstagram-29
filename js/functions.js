//Декларативно объявленная функция для проверки длины строки с классическим синтаксисом
function checksLengthString(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

checksLengthString('Проверка длины строки', 21);


//Cтрелочная функция для проверки длины строки с сокращённым синтаксисом
const checksLengthString2 = (string, maxLength) => string.length <= maxLength;

checksLengthString2('Проверка длины строки', 21);

//Функция, объявленная через назначение переменной для проверки длины строк
const checksLengthString3 = function(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

checksLengthString3('Проверка длины строки', 21);


//Функция для проверки, является ли строка палиндромом, решение в лоб по инструкции в задании
const checksPalindromString = (string) => {
  let normalizeString = string.replaceAll(' ', '');
  normalizeString = normalizeString.toLowerCase();
  let reverseString = '';
  for(let i = normalizeString.length - 1; i >= 0; i --) {
    reverseString += normalizeString[i];
  }
  if (reverseString === normalizeString) {
    return true;
  }
  return false;
};

checksPalindromString('Лёша на полке клопа нашёл');

//Функция для проверки, является ли строка палиндромом, оптимальное решение по лайву
const isPalindrom = (string) => {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < normalizeString.length / 2; i++) {
    if (normalizeString[i] !== normalizeString[normalizeString.length - i - 1]) {
      return false;
    }
  }
  return true;
};

isPalindrom('Топот');

//Функция для преобразование строки с цифрами и символами в число по лайву
const getDigits = (date) => {
  const stringDate = date.toString();
  let digits = '';
  for (let i = 0; i < stringDate.length; i++) {
    if (!Number.isNaN(parseInt(stringDate[i], 10))) {
      digits += stringDate[i];
    }
  }
  return parseInt(digits, 10);
};

getDigits('1 кефир, 0.5 батона');

//Функция для получения случайного целого числа из диапозона, между аргументами
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция выбирает случайный элемент из заданного в аргументе массива
const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

/*Функция генератор-счётчик Id: начинает счёт с заданного значения и увеличивает Id на целое число
при каждом следующем использовании в цикле (требует внешнюю функцию)*/
const createIdGenerator = (start, up) => {
  let lastGeneratedId = start;

  return () => {
    lastGeneratedId += up;
    return lastGeneratedId;
  };
};

export {getRandomInteger};
export {createIdGenerator};
export {getRandomArrayElement};
