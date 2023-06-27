import {getRandomInteger} from './util.js';
import {createIdGenerator} from './util.js';
import {getRandomArrayElement} from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 5;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Не сезон.',
  'goToTheBeach = () =>',
  'Море, остров, пляж, релакс.',
  'Вы не могли бы меня снять?',
  'Два весёлых камикадзе...',
  'Бэтмобиль в ожидании Бэтмэна.',
  'Скромненько, но со вкусом...',
  'Цвет удовольствия.',
  'На пляже тесно и весело!',
  'Куда же он ушёл?!',
  'Дорожка на чил...',
  'Где это я? Что за глушь? Я потерялся! Включаю навигатор и еду в Сакраменто.',
  'Это будет вкусно - обещаю.',
  'Мяу, выпустите меняу!',
  'Тепло и тихо, лежу за книгой.',
  'Flybye: здравствуй и прощай!',
  'Лебеди, рак и щука тащат музыкальный воз.',
  'Купи меня и отпусти летать...',
  'Тише мыши - хозяйка ищет.',
  'Ночь, отель, фонарь и пальма, бессмысленный и яркий свет.',
  'Ням, ням and go go...',
  'Love and sunset - romantic!',
  'Крабы, они такие крабы!))',
  'Драйв! Круть! Огонь!',
  'Два бегемота из разных миров...'
];
const NAMES = ['Макар','Владислав','Артём','Михаил','Маргарита','Александр'];

//Функция генерации Id комментария
const generateCommentId = createIdGenerator(0, 1);

//Функция создаёт строку из одного или двух (разделённых пробелом) случайных элементов массива комментариев
const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENT_LINES)).join(' ');

//Функция создаёт объект кокретного комментария к фотографии от случайного автора
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

//Функция создаёт объект изображения фотографии с описанием и случайным количеством лайков и комментариев в пределах заданного количества
const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[index - 1],
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComment)
});

//Функция создаёт массив из подряд заданного  количества фотографий из директории photos
const getPhotos = () => Array.from(
  {length: PICTURE_COUNT},).map((_item, pictureIndex) => createPicture(pictureIndex + 1));

console.log(getPhotos());
