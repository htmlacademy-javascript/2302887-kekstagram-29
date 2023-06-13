const checksLengthString = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

// eslint-disable-next-line no-console
console.log(checksLengthString('Проверка длины строки', 21));

const checksLengthString2 = (string, maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-console
console.log(checksLengthString2('Проверка длины строки', 22));

const checksPalindromString = (string) => {
  let normalString = string;
  normalString = normalString.replaseAll(' ','');
  normalString = normalString.toLowerCase();
  let invertedString = '';
  for(let i = normalString.length - 1; i === 0; i --) {
    invertedString += normalString[i];
  }
  if (invertedString === normalString) {
    return true;
  } else {
    return false;
  }
};

// eslint-disable-next-line no-console
console.log(checksPalindromString('Лёша на полке клопа нашёл'));
