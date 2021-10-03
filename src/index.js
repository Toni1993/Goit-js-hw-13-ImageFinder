import './sass/main.scss';
import './js/apiService.js';
import { apiService } from './js/apiService.js';
import './js/flex-images.min.js'
import cards from './templates/cards.hbs';
import flexImages from './js/flex-images.min.js';
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.input-js');
const form = document.querySelector('.form');
const btnLoadMore = document.querySelector('.btn-load-more-js');
let page = 1;

btnLoadMore.hidden = true

form.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;
  getImage();
  gallery.innerHTML = '';
});

btnLoadMore.addEventListener('click', () => getImage(page+=1));

async function getImage(page) {
  let image = input.value.toLowerCase().trim();
  if(!image.length)return
  const data = await apiService(image, page);
  console.log(data);
  gallery.insertAdjacentHTML('beforeend', cards(data.hits));
  new flexImages({
    selector: '.flex-images',
    rowHeight: 250,
    truncate: true
  });

  btnLoadMore.hidden = false;
  if (page) {
    document.querySelector('.gallery').scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }
  if (data.hits.length < 12) {
    btnLoadMore.hidden = true;
  }
}
