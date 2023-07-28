import { getData, showAlert } from './creates-api.js';
import { renderGallery } from './renders-gallery.js';
import { userFotoFormSubmit } from './upload-form.js';
import './upload-photo.js';


getData()
  .then((usersPhotos) => {
    renderGallery(usersPhotos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

userFotoFormSubmit();
