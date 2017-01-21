import './style/snippets';

import Carousel from './component/Carousel';
import Gallery from './component/Gallery';

const slides = [...Array(5).keys()].map(index => ({
  url: '#',
  image: `public/images/${index + 1}.svg`,
}));

const carousel = new Carousel({
  height: '400px',
  slides,
});

document.querySelector('#carousel').appendChild(carousel.element);
const gallery = new Gallery({
  element: document.querySelector('#gallery'),
  displayNum: 3,
});

['prev', 'next'].map(direction => {
  document.querySelector(`#carousel [data-nav=${direction}]`)
  .addEventListener('click', e => {
    e.preventDefault();
    carousel[direction]();
  });
  document.querySelector(`#gallery [data-nav=${direction}]`)
  .addEventListener('click', e => {
    e.preventDefault();
    gallery[direction]();
  });
});
