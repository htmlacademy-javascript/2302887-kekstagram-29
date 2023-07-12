import { renderPhotos } from './renders-photos.js';
import { openPhoto } from './opens-photo.js';

const container = document.querySelector('.pictures');

const renderPage = (pictures) => {
  container.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-photo-index]');
    if (!photo) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +photo.dataset.photoIndex
    );
    openPhoto(picture);
  });

  renderPhotos(pictures, container);
};

export { renderPage };
