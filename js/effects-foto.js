//Определяем массив объектов, описывающих параметры фильтров по ТЗ
const Effects = [
  {
    NAME: 'none',
    FILTER: 'none',
    RANGE: { min: 0, max: 100 },
    STEP: 1,
    UNIT : ''
  },
  {
    NAME: 'chrome',
    FILTER: 'grayscale',
    RANGE: { min: 0, max: 1 },
    STEP: 0.1,
    UNIT : ''
  },
  {
    NAME: 'sepia',
    FILTER: 'sepia',
    RANGE: { min: 0, max: 1 },
    STEP: 0.1,
    UNIT : ''
  },
  {
    NAME: 'marvin',
    FILTER: 'invert',
    RANGE: { min: 0, max: 100 },
    STEP: 1,
    UNIT : '%'
  },
  {
    NAME: 'phobos',
    FILTER: 'blur',
    RANGE: { min: 0, max: 3 },
    STEP: 0.1,
    UNIT : 'px'
  },
  {
    NAME: 'heat',
    FILTER: 'brightness',
    RANGE: { min: 1, max: 3 },
    STEP: 0.1,
    UNIT : ''
  }
];

//Определяем эффект по умолчанию
const DEFAULT_EFFECT = Effects[0];
//Присваиваем текущему эффекту эффект по умолчанию
let currentEffect = DEFAULT_EFFECT;

//Находим изображение в элементе предварительного просмотра фото
const previewImage = document.querySelector('.img-upload__preview img');
//Находим форму, содержащую наложение эффектов
const effectsContainer = document.querySelector('.img-upload__effects');
//Находим элемент будущего расположения слайдера
const effectSlider = document.querySelector('.effect-level__slider');
//Находим элемент содержащий атрибут уровня эффекта
const effectValue = document.querySelector('.effect-level__value');
//Находим элемент содержащий поле слайдера
const effectLevel = document.querySelector('.img-upload__effect-level');

//Функция включения слайдера

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: currentEffect.RANGE,
    step: currentEffect.STEP,
    start: currentEffect.RANGE.max,
  });

  if (currentEffect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

// Функция изменения эффекта

const onEffectChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = Effects.find((effect) => effect.NAME === evt.target.value);
  previewImage.className = `effects__preview--${currentEffect.NAME}`;
  updateSlider();
};


// Функция обновления слайлдера

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
  effectValue.value = sliderValue;
  if (currentEffect === DEFAULT_EFFECT) {
    previewImage.style.filter = DEFAULT_EFFECT.FILTER;
  } else {
    previewImage.style.filter = `${currentEffect.FILTER}(${sliderValue}${currentEffect.UNIT})`;
  }
};

// Функция сброса эффекта

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(effectSlider, {
  range: DEFAULT_EFFECT.RANGE,
  step: DEFAULT_EFFECT.STEP,
  start: DEFAULT_EFFECT.RANGE.max,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
effectLevel.classList.add('hidden');

effectsContainer.addEventListener('change', onEffectChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export {resetEffect};
