class Element {
  constructor(tagName) {
    this._element = document.createElement(tagName);
  }

  get element() {
    return this._element;
  }

  addStyles(styles) {
    Object.keys(styles).forEach(property => {
      this._element.style[property] = styles[property];
    });
    return this;
  }
}

class Slide {
  constructor({url, image}) {
    this.url = url;
    this.image = image;
    this.element = this.init();
  }

  init() {
    const container = new Element('a');
    container.element.href = this.url;
    container.element.target = '_blank';
    return container.addStyles({
      display: 'block',
      height: '100%',
      backgroundColor: '#ccc',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url("${this.image}")`,
    }).element;
  }
}

export default class Carousel {
  constructor(config) {
    const { slides, height = '100%', speed = .6, interval = 3000, callback } = config;

    this.speed = speed;
    this.interval = interval;
    this.callback = callback;

    const slider = this.slider = new Element('div').addStyles({
      display: 'flex',
      width: `${100 * slides.length}%`,
      height: '100%',
      position: 'absolute',
      left: 0,
    }).element;
    this.slides = slides.map((s, index) => {
      const slide = new Slide(s);
      slide.element.style.width = 100 / slides.length + '%';
      slide.index = index;
      slider.appendChild(slide.element);
      return slide;
    });

    this.element = new Element('div')
    .addStyles({
      position: 'relative',
      overflowX: 'hidden',
      height,
    })
    .element;
    this.element.appendChild(slider);

    this.sliding = false;
  }

  /**
   * @private
   */
  reorderSlides() {
    const fragment = document.createDocumentFragment();
    this.slides.forEach(slide => {
      fragment.appendChild(slide.element);
    });
    this.slider.appendChild(fragment);
  }

  /**
   * @private
   */
  shiftPush() {
    const prevSlide = this.slides.shift();
    this.slides.push(prevSlide);
    this.reorderSlides();
    this.slider.style.left = 0;
  }

  /**
   * @private
   */
  popUnshift() {
    const lastSlide = this.slides.pop();
    this.slides.unshift(lastSlide);
    this.reorderSlides();
    this.slider.style.left = '-100%';
  }

  /**
   * @private
   */
  get slideWidth() {
    return parseFloat(window.getComputedStyle(this.slides[0].element).width);
  }

  /**
   * @private
   */
  get currentIndex() {
    return this.slides[0] && this.slides[0].index || 0;
  }

  /**
   * @private
   */
  _slide({from, to, before, after, speed = this.speed}) {
    return new Promise(resolve => {
      if (this.sliding || this.slides.length <= 1) {
        return;
      }
      this.sliding = true;
      const distance = to - from;
      const delta = distance / (speed * 60);
      if (before) {
        before();
      }
      let current = from;
      const next = () => {
        current += delta;
        if (current >= Math.max(from, to) || current <= Math.min(from, to)) {
          this.sliding = false;
          if (after) {
            after();
          }
          // reset left value
          this.slider.style.left = '0px';
          resolve();
          return;
        }
        this.slider.style.left = current + 'px';
        requestAnimationFrame(next);
      }
      requestAnimationFrame(next);
    });
  }

  /**
   * @private
   */
  slide(config) {
    return this._slide(config)
    .then(() => {
      this.restart();
      typeof this.callback === 'function' && this.callback(this.currentIndex)
    });
  }

  prev(speed) {
    return this.slide({
      from: -this.slideWidth,
      to: 0,
      before: () => {
        this.popUnshift();
      },
      speed,
    });
  }

  next(speed) {
    return this.slide({
      from: 0,
      to: -this.slideWidth,
      after: () => {
        this.shiftPush();
      },
      speed,
    });
  }

  to(slideIndex) {
    const index = this.slides.findIndex(slide => slide.index === slideIndex);
    // -1 找不到，0 目标slider正在显示
    if (index === -1 || index === 0) {
      return Promise.resolve();
    }
    this.pause();
    const method = slideIndex >= this.currentIndex ? 'next' : 'prev';
    const steps = Math.abs(this.currentIndex - slideIndex);
    const go = () => {
      return this[method](this.speed / steps)
      .then(() => {
        if (this.slides[0].index !== slideIndex) {
          return go();
        } else {
          this.start();
          return Promise.resolve();
        }
      });
    };
    return go();
  }

  start() {
    if (!this.interval) {
      return;
    }
    this.pause();
    this.intervalObj = setInterval(() => {
      this.next();
    }, this.interval);
  }

  pause() {
    if (this.intervalObj) {
      clearInterval(this.intervalObj);
    }
  }

  /**
   * @private
   */
  restart() {
    this.pause();
    this.start();
  }

  destroy() {
    this.pause();
  }
}
