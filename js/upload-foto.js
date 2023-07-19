//Определяем допустимое количество хэштэгов
const MAX_HASHTAGS_COUNT = 5;
//Определяем правило написания хэштэга через регулярное выражение
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
//Определяем текст сообщения об ошибке записи хэштэгов
const TAGS_ERROR_TEXT = 'Неправильно прописаны хештеги ! Начать с #, от 1 до 19 символов, до 5 тэгов через пробел !';

//Находим body элемент страницы
const body = document.querySelector('body');
//Находим форму редактирования загружаемого фото
const overlay = document.querySelector('.img-upload__overlay');
//Находим форму загрузки модального окна редактирования загружаемого фото
const form = document.querySelector('.img-upload__form');
//Находим окно выбора фото для загрузки в стандартном окне поиска ОС
const fileField = document.querySelector('#upload-file');
//Находим поле хэштэгов к фото
const hashtagField = document.querySelector('.text__hashtags');
//Находим поле комментариев к фото
const descriptionField = document.querySelector('.text__description');
//Находим кнопку Закрыть модальное окно загрузки фото (крест)
const cancelCross = document.querySelector('#upload-cancel');
//Находим кнопку Опубликовать фото с комментариями
const buttonSubmit = document.querySelector('#upload-submit');


//функция подключения и настройки внешней библиотеки валидпции форм Pristine
const pristine = new Pristine(form, {
  //Задаём класс элеиента, содержащего валидируемые поля формы (обязательная настройка)
  classTo: 'img-upload__field-wrapper',
  //Задаём класс элемента вывода сообщений об ошибках валидации (обязательная настройка)
  errorTextParent: 'img-upload__field-wrapper',
  //Задаём дополнительный класс для вывода текста ошибки валидации (необязательная настройка)
  errorTextClass: 'img-upload__error'
});

//Функция операций при открытии модального окна
const showModal = () => {
  //Добавляем/удаляем нужные классы и добавляем обработчик события
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//Функция операций при закрытии модального окна
const hideModal = () => {
  //Очищаем возможное содержимое полей формы от предыдущих заполнений
  form.reset();
  //Сбрасываем возможные ошибки Pristine от предыдущих заполнений формы
  pristine.reset();
  //Добавляем/удаляем нужные классы и удаляем обработчик события нажатия кнопки Escape
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//Функция условия блокирования закрытия модального окна при активном фокусе на поле хэштэга или комментария через свойство activeElement
const blockingСonditionOnFocus = () =>
  document.activeElement === hashtagField || document.activeElement === descriptionField;

//Функция закрытия модального окна при нажатии Escape и невыполнении условия блокировки закрытия
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !blockingСonditionOnFocus()) {
    evt.preventDefault();
    hideModal();
  }
}
//Функция исполнения открытия модального окна
const onOpenFileChange = () => {
  showModal();
};
//Функция исполнения закрытия модального окна
const onCancelCrossClick = () => {
  hideModal();
};

//Подфункция валидации правильности написания хэштэга
const isValidTag = (tag) => HASHTAGS_RULES.test(tag);

//Подфункция валидации допустимого количество хэштэгов
const hasValidCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

//Подфункция валидации отсутствия одинаковых хэштэгов
const hasUniqueTags = (tags) => {
  //Переводим хэштэг в нижний регистр
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  //Проверяем
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//Функция необходимой собственной валидации поля хэштэгов
const validateTags = (value) => {
  //Функция нормализации строки хэштэгов (обрезаем пробелы в начале и конце, разделяем на массив подстрок по пробелу и удаляем пустые подстроки )
  const tags = value.trim().split(' ').filter((tag) => Boolean(tag.length));
  //Возвращаем true, если если валидация пройдена по всем критериям или false, если хотя бы один критерий валидацию не прошёл
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

//Функция добавления собственных валидаторов для Pristine
pristine.addValidator(
  //Определяем поле подлежащее валидации
  hashtagField,
  //Вызыв функции необходимой собственной валидации поля хэштэгов
  validateTags,
  //Сообщение, выводимое Pristine при возникновении ошибки валидации поля хэштэгов
  TAGS_ERROR_TEXT
);

//Функция блокирования кнопки Опубликовать фото с комментариями, если валидация поля хэштэгов не пройдена
function onTagFieldKeyUp() {
  if (validateTags(hashtagField.value)) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
}

//Функция блокирования кнопки Опубликовать фото с комментариями, если количество символов в поле комментариев больше 140
function onTextAriaKeyUp() {
  if (descriptionField.value.length > 140) {
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }
}

//Добавляем обработчик события нажатия любой кнопки в поле добавления комментариев
hashtagField.addEventListener('keyup', onTagFieldKeyUp);
//Добавляем обработчик события нажатия любой кнопки в поле добавления комментариев
descriptionField.addEventListener('keyup', onTextAriaKeyUp);
//Добавляет обработчик события change на кнопку Открыть фото в модальном окне
fileField.addEventListener('change', onOpenFileChange);
//Добавляет обработчик события click на кнопку Закрыть окно (крест) в модальном окне
cancelCross.addEventListener('click', onCancelCrossClick);
