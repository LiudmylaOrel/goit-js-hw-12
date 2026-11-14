import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.btn-load-more');
const lightbox = new SimpleLightbox('.gallery a');

export const createGallery = images => {
  const markup = images
    .map(
      image =>
        `<li class="gallery-item">
      <a href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}"></a>
      <div class="info">
      <p>Likes: <span>${image.likes}</span></p>
      <p>Views: <span>${image.views}</span></p> 
      <p>Comments: <span>${image.comments}</span></p>
      <p>Downloads: <span>${image.downloads}</span></p>
      </div>
      </li>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const showLoader = () => {
  loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  loader.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  loadMoreButton.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  loadMoreButton.classList.add('is-hidden');
};
