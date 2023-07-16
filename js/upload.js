//Находим узел тела страницы
const body = document.querySelector('body');
//Находим узел формы редактирования загружаемого фото
const overlay = document.querySelector('.img-upload__overlay');
//Находим узел формы загрузки модального окна редактирования загружаемого фото
const form = document.querySelector('.img-upload__form');
//Находим узел окна выбора фото для загрузки в стандартном окне поиска ОС
const fileField = document.querySelector('#upload-file');
//Находим узел поля хэштэгов к фото
const hashtagField = document.querySelector('.text__hashtags');
//Находим узел поля комментариев к фото
const descriptionField = document.querySelector('.text__description');
//Находим узел кнопки Закрыть модальное окно загрузки фото (крест)
const cancelCross = document.querySelector('#upload-cancel');

//Функция операций при открытии модального окна
const showModal = () => {
  //Добавляем/удаляем нужные классы и добавляем обработчик события
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//Функция операций при закрытии модального окна
const hideModal = () => {
  //Очищаем возможное содержимое полей формы
  form.reset();
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

//Добавляет обработчик события change на кнопку Открыть фото в модальном окне
fileField.addEventListener('change', onOpenFileChange);
//Добавляет обработчик события click на кнопку Закрыть окно (крест) в модальном окне
cancelCross.addEventListener('click', onCancelCrossClick);
