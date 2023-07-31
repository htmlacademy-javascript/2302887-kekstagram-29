import { getData, showAlert } from './creates-api.js';
import { renderGallery } from './renders-gallery.js';
import { userFotoFormSubmit } from './upload-form.js';
import { sortingGallery } from './sort-photos.js';
import './upload-photo.js';

//Делаем запрос на получение массива объектов фото от сервера
getData()
  // Возвращаем объект promise с будущим ответом сервера и, когда он перейдёт в состояние fulfilled, вызываем метод then и передаём ему колбэк с массивом объектов ответа
  .then((usersPhotos) => {
    //Отрисовываем галерею однократно в порядке полученого от сервера массива
    renderGallery(usersPhotos);
    //Запускаем основную функцию циклической перерисовки галереи при выборе сортировки с устранением дребезга выбора
    sortingGallery(usersPhotos);
  })
  // А при переходе в состояние rejected (ошибки) вызываем метод catch и передаём ему колбэк с текстом ошибки
  .catch((err) => {
    showAlert(err.message);
  });
//Запускаем функцию вывода формы предварительного просмотра, редактирования и публикации фото на сервере
userFotoFormSubmit();
