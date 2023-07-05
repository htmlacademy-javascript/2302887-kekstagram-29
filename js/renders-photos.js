//Находим шаблон и записываем в созданную переменную
const pictureTemplate = document.querySelector('#picture');
//Получаем содержимое шаблона и записываем в переменную-объект
const photoTemplate = pictureTemplate.content.querySelector('.picture');
//Находим место размещения обработанных шаблонов - результат работы данного модуля
const container = document.querySelector('.pictures');

//Колбэкфункция создания одного элемента - фотоминиатюры по шаблону
//В параметрах функции деструктурируем нужные поля массива описания фотографий
const createPhoto = ({ comments, description, likes, url }) => {
  //Клонируем шаблон во внутреннюю переменную функции
  const photo = photoTemplate.cloneNode(true);

  //Находим поле ссылки на фото в копии шаблона и записываем туда реальную ссылку на фото
  photo.querySelector('.picture__img').src = url;
  //Находим поле описания фото в копии шаблона и записываем туда реальное описание фото
  photo.querySelector('.picture__img').alt = description;
  //Находим поле количества комментариев в копии шаблона и записываем туда реальную длину массива комментариев к фото
  photo.querySelector('.picture__comments').textContent = comments.length;
  //Находим поле количества лайков и записываем туда реальное количество лайков к фото
  photo.querySelector('.picture__likes').textContent = likes;
  //Возвращем объект - элемент фотоминиатюры
  return photo;
};

//Основная функция модуля - отрисовывает фото(добавляет массив данных о фото в заданное место DOM-дерева)
//В параметр функции принимаем массив элементов, содержащих данные о кокретном фото
const renderPhotos = (pictures) => {
  //Создаём временный массив-объект для хранения фрагмента DOM-дерева с помощью метода createDocumentFragment()
  const fragment = document.createDocumentFragment();
  //Проходим по массиву элементов фото
  pictures.forEach((picture) => {
    //Создаём элемент DOM-дерева для каждого фото с помощью колбэк-функции createThumbnail
    const photo = createPhoto(picture);
    //Записывем этот элемент в конец фрагмента DOM-элементов
    fragment.append(photo);
  });
  //Добавляем содержимое фрагмента DOM-дерева в DOM-дерево сайта
  container.append(fragment);
};

export { renderPhotos };
