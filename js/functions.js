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

//Функция для преобразования строки со временем дня в число минут с начала суток
const TimeInMinutes = (time) => {
  const [hour, minute] = time.split(':');
  return hour * 60 + Number(minute);
};

//Функция проверки реальности встречи в рабочее время
const realMeeting = (jobStart, jobEnd, meetingStart, meetingTime) => {
  const jobStartInMinutes = TimeInMinutes(jobStart);
  const jobEndInMinutes = TimeInMinutes(jobEnd);
  const meetingStartInMinutes = TimeInMinutes(meetingStart);
  return (
    meetingStartInMinutes >= jobStartInMinutes &&
    meetingStartInMinutes + meetingTime <= jobEndInMinutes
  );
};
