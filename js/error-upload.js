//Модуль формирования сообщения об ошибке загрузки данных с сервера

//Определяем время показа сообщения
const ALERT_SHOW_TIME = 7000;

//Функция создания и стилизации сообщения

const showAlert = (message) => {
  //Создаём шаблон элемента сообщения об ошибке
  const alert = document.createElement('div');
  //Стилизуем сообщение об ошибке
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.background = '#df4115';
  //Добавляем текст сообщения об ошибке
  alert.textContent = message;
  //Добавляем шаблон в DOM
  document.body.append(alert);
  //Используем встроенную функцию задержки удаления сообщения
  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert };
