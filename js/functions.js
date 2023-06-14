//Декларативно объявленная функция для проверки длины строки с классическим смнтаксисом
function checksLengthString(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

checksLengthString('Проверка длины строки', 21);

//стрелочная функция для проверки длины строки с сокращённым синтаксисом
const checksLengthString2 = (string, maxLength) => string.length <= maxLength;

checksLengthString2('Проверка длины строки 2', 23);


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
