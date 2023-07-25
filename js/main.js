import { getData, showAlert } from './creates-api.js';
import { renderGallery } from './renders-gallery.js';
import {userFotoFormSubmit} from './upload-foto.js';


getData()
  .then((usersFoto) => {
    renderGallery(usersFoto);
  })
  .catch((err) => {
    showAlert(err.message);
  });

userFotoFormSubmit();
