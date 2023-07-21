//Определяем массив объектов, описывающих параметры фильтров по ТЗ
const Effects = [
  {
    NAME: 'none',
    FILTER: 'none',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT : ''
  },
  {
    NAME: 'chrome',
    FILTER: 'grayscale',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT : ''
  },
  {
    NAME: 'sepia',
    FILTER: 'sepia',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT : ''
  },
  {
    NAME: 'marvin',
    FILTER: 'invert',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT : '%'
  },
  {
    NAME: 'phobos',
    FILTER: 'blur',
    RANGE: {
      min: 0,
      max: 3,
    },
    STEP: 0.1,
    UNIT : 'px'
  },
  {
    NAME: 'heat',
    FILTER: 'brightness',
    RANGE: {
      min: 1,
      max: 3,
    },
    STEP: 0.1,
    UNIT : ''
  }
];

const DEFAULT_EFFECT = Effects[0];
let currentEffect = DEFAULT_EFFECT;

const previewImage = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.img-upload__effects');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');


const isDefault = () => currentEffect === DEFAULT_EFFECT;

const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevel.classList.add('hidden');
};

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: currentEffect.RANGE,
    step: currentEffect.STEP,
    start: currentEffect.RANGE.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

// Функция изменение эффекта

const onEffectChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = Effects.find((effect) => effect.NAME === evt.target.value);
  previewImage.className = `effects__preview--${currentEffect.NAME}`;
  updateSlider();
};


// Функция обновление слайлдера

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
  effectValue.value = sliderValue;
  if (isDefault()) {
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
hideSlider();

effectsContainer.addEventListener('change', onEffectChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export {resetEffect};
