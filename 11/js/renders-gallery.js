//Модуль отрисовки страницы с галереей из миниатюр фото и открытием модального окна с фото

import { renderMiniPhotos } from './renders-mini-photos.js';
import { openModal } from './opens-modal.js';

//Находим узел будущего расположения списка фото в DOM и записывем в контейнер
const container = document.querySelector('.pictures');

//Функция вызова модулей окрытия модального окна с фото и отрисовки миниатюр
const renderGallery = (pictures) => {
  //Подписываем общий контейнер галереи миниатюр на событие click
  container.addEventListener('click', (evt) => {
    //По целевому событию ищем в ближайшем родителе кликнутой миниатюры и её элементов дата атрибут с индексом фото
    const photo = evt.target.closest('[data-photo-index]');
    //Проверяем найден ли дата атрибут
    if (photo === null) {
      return;
    }
    //Отменяем действие браузера по умолчанию
    evt.preventDefault();
    //Находим в массиве и извлекаем индекс фото из дата атрибута через колбэк в аргументе функции со сравнением
    const picture = pictures.find((item) => item.id === +photo.dataset.photoIndex);
    //Вызываем функцию открытия модального окна с искомым фото и информацией о нём
    openModal(picture);
  });
  //Вызываем колбэк функции отрисовки фотоминиатюр
  renderMiniPhotos(pictures, container);
};

export { renderGallery };
