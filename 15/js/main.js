import { getData, showAlert } from './creates-api.js';
import { renderGallery } from './renders-gallery.js';
import { userFotoFormSubmit } from './upload-form.js';
import { initSortPhotos } from './sort-photos.js';
import './upload-photo.js';


getData()
  .then((usersPhotos) => {
    renderGallery(usersPhotos);
    initSortPhotos(usersPhotos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

userFotoFormSubmit();
