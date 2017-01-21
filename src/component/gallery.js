export default class Gallery {
  constructor({ element, displayNum }) {
    this.element = element;
    element.style.overflow = 'hidden';
    this.container = element.firstElementChild;
    this.initContainer();

    if (!displayNum) {
      return;
    }
    this.displayNum = displayNum;

    this.initWidth();
    this.index = 0;

    this.resizeCb = this.initWidth.bind(this);
    window.addEventListener('resize', this.resizeCb);
  }

  destroy() {
    if (this.resizeCb) {
      window.removeEventListener('resize', this.resizeCb);
    }
  }

  /**
   * private
   */
  get elementW() {
    return parseFloat(window.getComputedStyle(this.element).width);
  }

  /**
   * private
   */
  get unit() {
    return this.elementW / this.displayNum;
  }

  /**
   * private
   */
  get itemLen() {
    return this.container.childElementCount;
  }

  /**
   * private
   */
  initContainer() {
    this.container.style.position = 'relative';
    this.container.style.display = 'flex';
    this.container.style.left = '0';
    this.container.style.transition = 'left .5s';
  }

  /**
   * private
   */
  initWidth() {
    this.container.style.width = `${this.unit * this.itemLen}px`;
    let item = this.container.firstElementChild;
    while (item) {
      item.style.width = `${this.unit}px`;
      item = item.nextElementSibling;
    }
    this.slide();
  }

  /**
   * private
   */
  slide() {
    this.container.style.left = `-${this.unit * this.index}px`;
  }

  // eslint-disable-next-line
  get minIndex() {
    return 0;
  }

  /**
   * `this.index`有可能的最大值
   */
  get maxIndex() {
    if (!this.displayNum || !this.itemLen) {
      return 0;
    }
    const sectionNum = Math.ceil(this.itemLen / this.displayNum);
    return (sectionNum - 1) * this.displayNum;
  }

  prev(cb) {
    if (!this.displayNum) {
      return;
    }
    this.index = Math.max(this.index - this.displayNum, this.minIndex);
    this.slide();
    if (typeof cb === 'function') {
      cb();
    }
  }

  next(cb) {
    if (!this.displayNum) {
      return;
    }
    this.index = Math.min(this.index + this.displayNum, this.maxIndex);
    this.slide();
    if (typeof cb === 'function') {
      cb();
    }
  }
}
