// Модуль отрисовки страницы с галереей из миниатюр фото и открытием модального окна с фото

import { renderMiniPhotos } from './renders-miniphotos.js';
import { openModal } from './opens-photo.js';

// Находим элемент будущего расположения списка фото в DOM и записывем в контейнер
const container = document.querySelector('.pictures');

// Заводим рабочий массив фото
let pictures = [];

// Функция вызова модулей отрисовки миниатюр и окрытия модального окна с кликнутым фото

const onContainerClick = (evt) => {
  // По целевому событию клика ищем в ближайшем родителе кликнутой миниатюры и её элементов дата атрибут с индексом фото и записывам его
  const photo = evt.target.closest('[data-photo-index]');
  // Проверяем найден ли дата атрибут (был ли клик именно по миниатюре в галерее)
  if (photo === null) {
    // Если клик был не по миниатюре выходим и не открываем окно
    return;
  }
  // Если клик был по миниатюре
  // Отменяем действие браузера по умолчанию
  evt.preventDefault();
  // Находим в массиве и извлекаем индекс фото из дата атрибута через колбэк в аргументе функции со сравнением
  const picture = pictures.find((item) => item.id === +photo.dataset.photoIndex);
  // Вызываем функцию открытия модального окна с искомым фото и информацией о нём
  openModal(picture);
};


const renderGallery = (currentPictures) => {
  // Записываем текущиё массив фото в рабочий массив
  pictures = currentPictures;
  // Пока клика нет вызываем колбэк функции отрисовки фотоминиатюр и отрисовываем галерею
  renderMiniPhotos(pictures, container);
  // Подписываем общий контейнер галереи миниатюр на событие click
  container.addEventListener('click', onContainerClick);
};

export { renderGallery };
