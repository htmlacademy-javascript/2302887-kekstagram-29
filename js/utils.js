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

//Функция устранения дребезга обращений

const debounce = (callback, timeoutDelay = 500) => {
  //Используем замыкание, чтобы id таймаута приклеился к возвращаемой функции с setTimeout для его перезаписи
  let timeoutId;

  return (...rest) => {
    //Удаляем предыдущий таймаут, чтобы не копились
    clearTimeout(timeoutId);
    //Устанавливаем новый таймаут с вызовом колбэка
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {getRandomInteger, createIdGenerator, getRandomArrayElement, debounce};
