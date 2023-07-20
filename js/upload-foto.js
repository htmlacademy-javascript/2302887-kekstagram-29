//Определяем допустимое количество хэштэгов
const MAX_HASHTAGS_COUNT = 5;
//Определяем правило написания хэштэга через регулярное выражение
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
//Определяем тексты сообщений об ошибке записи хэштэгов
const UNUNIQUE_TAGS_ERROR_TEXT = 'Ошибка хэштэга: повторяющийся хэштэг - уберите повтор в любом регистре !';
const INVALID_CONTENT_ERROR_TEXT = 'Ошибка хэштэга: неверное содержимое хэштэга - начать с #, плюс от 1  до 19 символов a-z,а-я, 0-9 !';
const INVALID_COUNT_ERROR_TEXT = 'Ошибка хэштэга: превышено допустимое количество хэштэгов - не более 5 !';

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


//Функция подключения и настройки внешней библиотеки валидации форм Pristine
const pristine = new Pristine(form, {
  //Задаём класс элемента, содержащего валидируемые поля формы (обязательная настройка)
  classTo: 'img-upload__field-wrapper',
  //Задаём класс элемента вывода сообщений об ошибках валидации (обязательная настройка)
  errorTextParent: 'img-upload__field-wrapper',
  //Задаём дополнительный класс для стилизации вывода текста ошибки валидации (необязательная настройка)
  errorTextClass: 'img-upload__error'
});

//Функция операций при открытии модального окна публикации фото
const showModal = () => {
  //Добавляем/удаляем нужные классы
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  //Добавляем обработчик события нажатия любой кнопки при окрытом окне для его закрытия
  document.addEventListener('keydown', onDocumentKeydown);
  //Добавляем обработчик события отпускания любой кнопки в поле добавления хэштэгов для блокировки отправки данных при невалидном поле хэштэгов
  hashtagField.addEventListener('keyup', onTextKeyUp);
  //Добавляем обработчик события отпускания любой кнопки в поле добавления комментариев для блокировки отправки данных при невалидном поле комментария
  descriptionField.addEventListener('keyup', onTextKeyUp);
};

//Функция операций при закрытии модального окна публикации фото
const hideModal = () => {
  //Очищаем возможное содержимое полей формы от предыдущих заполнений
  form.reset();
  //Сбрасываем возможные ошибки Pristine от предыдущих заполнений формы
  pristine.reset();
  //Добавляем/удаляем нужные классы и удаляем обработчики событий, связанных с открытым окном
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagField.removeEventListener('keyup', onTextKeyUp);
  descriptionField.removeEventListener('keyup', onTextKeyUp);
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

//Функция нормализации строки хэштэгов (обрезаем пробелы в начале и конце, разделяем на массив подстрок по пробелу и удаляем пустые подстроки)
const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

//Подфункция валидации правильности написания хэштэга
const isValidTag = (value) => normalizeTags(value).every((tag) => HASHTAGS_RULES.test(tag));

//Подфункция валидации допустимого количество хэштэгов
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;

//Подфункция валидации отсутствия одинаковых хэштэгов
const hasUniqueTags = (value) => {
  //Приводим хэштэг к нижнему регистру
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  //Сравниваем длину массива хэштэгов с длиной созданной коллекции Set (которая не сохраняет повторяющиеся элементы в массиве)
  //Возвращает true, если длины равны, т.е.повторы в изначальном массиве хэштэгов отсутствуют
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//Функция валидации отсутствия повторяющихся хэштэгов
pristine.addValidator(
  //Определяем поле подлежащее валидации
  hashtagField,
  //Вызыв функции необходимой собственной валидации поля хэштэгов
  hasUniqueTags,
  //Сообщение, выводимое Pristine при возникновении этой ошибки валидации поля хэштэгов
  UNUNIQUE_TAGS_ERROR_TEXT, 1, true
);

//Функция валидации символов хэштэга
pristine.addValidator(
  //Определяем поле подлежащее валидации
  hashtagField,
  //Вызыв функции необходимой собственной валидации поля хэштэгов
  isValidTag,
  //Сообщение, выводимое Pristine при возникновении этой ошибки валидации поля хэштэгов
  INVALID_CONTENT_ERROR_TEXT, 2, true
);

//Функция валидации максимального количества хэштэгов
pristine.addValidator(
  //Определяем поле подлежащее валидации
  hashtagField,
  //Вызыв функции необходимой собственной валидации поля хэштэгов
  hasValidCount,
  //Сообщение, выводимое Pristine при возникновении этой ошибки валидации поля хэштэгов
  INVALID_COUNT_ERROR_TEXT, 3, true
);

//Функция блокирования кнопки Опубликовать фото с комментариями, если валидация полей хэштэгов или комментариев не пройдена
function onTextKeyUp() {
  if (hasUniqueTags(hashtagField.value) && isValidTag(hashtagField.value) && hasValidCount(hashtagField.value) && descriptionField.value.length < 141) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
}

//Добавляет обработчик события change на кнопку Открыть фото в модальном окне
fileField.addEventListener('change', onOpenFileChange);
//Добавляет обработчик события click на кнопку Закрыть окно (крест) в модальном окне
cancelCross.addEventListener('click', onCancelCrossClick);
