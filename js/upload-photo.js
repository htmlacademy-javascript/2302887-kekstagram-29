//Опредяляем допустимые типы файлов фото
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
//Находим элемент расположения скрытого поля выбора файла для загрузки
const fileChooser = document.querySelector('.img-upload__input');
//Находим элемент расположения файла для предварительного просмотра
const uploadPreview = document.querySelector('.img-upload__preview img');
//Подписываем кнопку Загрузить на событие change
fileChooser.addEventListener('change', () => {
  //И в случае нажатия записываем первый выбранный файл
  const file = fileChooser.files[0];
  //Переводим имя загружаемого файла в нижний регистр
  const fileName = file.name.toLowerCase();
  // Проверяем тип файла
  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));
  //Если тип верен
  if (matches) {
    //Заменяем в DOM путь дефолтного файла для предварительного просмотра на путь к выбранному файлу
    uploadPreview.src = URL.createObjectURL(file);
  }
});
