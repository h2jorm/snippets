import './style/snippets';

import Carousel from './component/Carousel';
import Gallery from './component/Gallery';

import $ from './query';

const slides = [...Array(5).keys()].map(index => ({
  url: '#',
  image: `public/images/${index + 1}.svg`,
}));

const carousel = new Carousel({
  height: '400px',
  slides,
});

$('#carousel').appendChild(carousel.element);
const gallery = new Gallery({
  element: $('#gallery'),
  displayNum: 3,
});

['prev', 'next'].map(direction => {
  $(`#carousel [data-nav=${direction}]`)
  .addEventListener('click', e => {
    e.preventDefault();
    carousel[direction]();
  });
  $(`#gallery [data-nav=${direction}]`)
  .addEventListener('click', e => {
    e.preventDefault();
    gallery[direction]();
  });
});

$('#bars2close').addEventListener('click', event => {
  event.currentTarget.classList.toggle('close');
});

class MainNav {
  constructor() {
    this.closed = false;
    this.nav = $('#mainNav');
    this.closeIcon = this.nav.querySelector('.bars2close');
    this.nav.querySelector('.nav-head')
    .addEventListener('click', () => this.toggle());
    this.close();
  }

  close() {
    this.closed = true;
    this.nav.classList.add('close');
    this.closeIcon.classList.add('close');
  }

  open() {
    this.closed = false;
    this.nav.classList.remove('close');
    this.closeIcon.classList.remove('close');
  }

  toggle() {
    if (this.closed) {
      this.open();
    } else {
      this.close();
    }
  }
}

new MainNav();
