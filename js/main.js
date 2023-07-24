import { getData } from './api.js';
import { renderGallery } from './renders-gallery.js';
import './upload-foto.js';
import { showAlert } from './error-upload.js';

getData()
  .then((usersPictures) => {
    renderGallery(usersPictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });
