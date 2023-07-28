// Модуль сортировки фото в галерее

import { renderGallery } from './renders-gallery.js';
import { debounce, randomArraySort, removeElement } from './utils.js';

//Определяем время задержки запроса серверу для устранения "дребезга"
const DELAY_TIME = 500;
//Определяем количество случайных фото для отрисовки
const COUNT_RANDOM_PHOTOS = 10;

// Находим секцию сортировки фотоминиатюр
const photosSortsElement = document.querySelector('.img-filters');
//Находим кнопку вывода случайных фото
const sortRandomElement = document.querySelector('#filter-random');
//Находтм кнопку вывода самых комментируемых фото
const sortCommentElement = document.querySelector('#filter-discussed');

// Функция случайной сортировки фото
const sortRandom = (data) => randomArraySort(data).slice(0, COUNT_RANDOM_PHOTOS);

// Функция сортировки фото по количеству комментариев по убыванию
const sortComments = (data) => data.sort((a, b) => b.comments.length - a.comments.length);

// Функция перерисовки галереи в соответствии с выбранным методом сортировки фото
const updatePhotos = (targetElement, photos) => {
  //Делаем копию загруженного массива фото для операций сортировки
  let copyPhotos = photos.slice();
  //Если нажата кнопка Случайные
  if (targetElement === sortRandomElement) {
    //Сортируем массив случайным методом
    copyPhotos = sortRandom(copyPhotos);
  }
  ////Если нажата кнопка Обсуждаемые
  if (targetElement === sortCommentElement) {
    //Сортируем массив по убыванию количества комментариев
    copyPhotos = sortComments(copyPhotos);
  }
  //Удаляем все ранее отрисованные фото в галерее
  document.querySelectorAll('.picture').forEach(removeElement);
  //Вызываем функцию отрисовки фото с уже отсортированным массивом фото
  renderGallery(copyPhotos);
};

// Функция перерисовки галереи с использованием «устранение дребезга»
const renderPhotosDelay = debounce((targetElement, photos) => updatePhotos(targetElement, photos), DELAY_TIME);

// Функция инициализации работы методов сортировки изображений
const initSortPhotos = (loadedPhotos) => {
  // Открываем секцию сортировки фотоминиатюр
  photosSortsElement.classList.remove('img-filters--inactive');
  //Добавляем обработчик события click по любой кнопке сортировки
  photosSortsElement.addEventListener('click', (evt) => {
    //Если нажата какая то кнопка сортировки и она не является активной
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      //Находим активную кнопку
      const activeSortElement = photosSortsElement.querySelector('.img-filters__button--active');
      //Удаляем у неё класс активности
      activeSortElement.classList.remove('img-filters__button--active');
      //Перерисовываем галерею в соответствии с выбранным методом сортировки фото
      renderPhotosDelay(evt.target, loadedPhotos);
      //Добавляем класс активности этой кнопке
      evt.target.classList.add('img-filters__button--active');
    }
  });
};

export { initSortPhotos };
