//Модуль вспомогательных функций

//Функция для получения случайного целого числа из диапозона, заданного аргументами

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция выбирает случайный элемент из переданного массива

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
