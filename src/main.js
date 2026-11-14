import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.btn-load-more');

let page = 1;
let searchQuery = '';

const fetchImages = async () => {
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return false;
    }

    createGallery(data.hits);

    const loadedImages = page * 15;

    if (loadedImages < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
      });
      return true;
    }
  } catch (error) {
    iziToast.error({ message: error.message });
    return false;
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.currentTarget.elements['search-text'].value.trim();
  if (searchQuery === '') {
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  page = 1;

  fetchImages();
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;

  const success = await fetchImages();

  if (success === false) {
    page -= 1;
    showLoadMoreButton();
    return;
  }
  scrollAfterClickLoadMore();
});

function scrollAfterClickLoadMore() {
  const item = document.querySelector('.gallery-item');

  if (!item) {
    return;
  }
  const itemHeight = item.getBoundingClientRect().height;

  window.scrollBy({
    top: itemHeight * 2,
    behavior: 'smooth',
  });
}
