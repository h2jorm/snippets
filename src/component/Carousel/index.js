const prefix = s => ['carousel', s].join('-');

class Slide {
  constructor({url, image}) {
    this.url = url;
    this.image = image;
    this.element = this.init();
  }

  init() {
    const container = document.createElement('a');
    container.href = this.url;
    container.className = prefix('slide');
    container.style.backgroundImage = `url("${this.image}")`;
    container.target = '_blank';
    return container;
  }
}

export default class Carousel {
  constructor(config) {
    const { slides, height = '100%', speed = .6, interval = 3000, callback } = config;

    this.speed = speed;
    this.interval = interval;
    this.callback = callback;

    const slider = this.slider = document.createElement('div');
    slider.className = prefix('slider');
    slider.style.width = 100 * slides.length + '%';
    this.slides = slides.map((s, index) => {
      const slide = new Slide(s);
      slide.element.style.width = 100 / slides.length + '%';
      slide.index = index;
      slider.appendChild(slide.element);
      return slide;
    });

    const element = this.element = document.createElement('div');
    element.className = prefix('container');
    element.style.height = height;
    element.appendChild(slider);

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
