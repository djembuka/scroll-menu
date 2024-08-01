class TwpxScrollMenu {
  /*options = {
    arrowColor: '#fff',
    arrowHoverColor: '#fff',
    itemMarginRight: 20
  }
  /*
  this.sm - .twpx-scroll-menu
  this.wrapper - .twpx-scroll-menu-wrapper

  this.arrowLeft - .twpx-scroll-menu-arrow-left
  this.arrowRight - .twpx-scroll-menu-arrow-right
  */

  constructor(elem, options = {}) {
    this.elem = elem;
    this.options = options;

    this.itemMarginRight = this.options.itemMarginRight || 20;
    this.initialized = false;

    this.init();
  }

  init() {
    if (!this.initialized) {
      this.createHtml();
      this.createCss();
      this.arrowEvents();
      this.hoverEvent();
      this.initialized = true;
    }
  }

  createHtml() {
    this.elem.childNodes.forEach((item) => {
      if (item.classList) {
        item.classList.add('twpx-scroll-menu__item');
      }
    });
    this.sm = document.createElement('div');
    this.sm.className = 'twpx-scroll-menu';
    this.sm.innerHTML = `
      <div class="twpx-scroll-menu-overflow">
        <div class="twpx-scroll-menu-wrapper">${this.elem.innerHTML}</div>
      </div>
      <div class="twpx-scroll-menu-arrows">
        <div class="twpx-scroll-menu-arrow-right"></div>
        <div class="twpx-scroll-menu-arrow-left"></div>
      </div>
    `;
    this.wrapper = this.sm.querySelector('.twpx-scroll-menu-wrapper');
    this.arrowLeft = this.sm.querySelector('.twpx-scroll-menu-arrow-left');
    this.arrowRight = this.sm.querySelector('.twpx-scroll-menu-arrow-right');

    this.elem.parentNode.insertBefore(this.sm, this.elem);
    this.elem.remove();
    this.sm.classList.add('twpx-scroll-menu--no-right');
  }

  createCss() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
    .twpx-scroll-menu {
      position: relative;
    }
    .twpx-scroll-menu-overflow {
      overflow: hidden;
    }
    .twpx-scroll-menu-wrapper {
      display: flex;
      overflow: hidden;
      position: relative;
      transition: margin-left 0.5s ease;
      -webkit-transition: margin-left 0.5s ease-out;
    }
    .twpx-scroll-menu:before,
    .twpx-scroll-menu:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 100%;
      background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));
      z-index: 10;
    }
    .twpx-scroll-menu:after {
      left: auto;
      right: 0;
      background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
    }
    .twpx-scroll-menu.twpx-scroll-menu--no-right:before,
    .twpx-scroll-menu.twpx-scroll-menu--no-left:after,
    .twpx-scroll-menu:hover:before,
    .twpx-scroll-menu:hover:after {
      display: none;
    }
    .twpx-scroll-menu__item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      border-radius: 7px;
      background-color: #f0f5fc;
      padding: 5px 15px;
      height: 48px;
      cursor: pointer;
    }
    .twpx-scroll-menu__item:last-child {
      margin-right: 0;
    }
    .twpx-scroll-menu__item span {
      white-space: nowrap;
      font-size: 0.88rem;
      font-family: Roboto, sans-serif;
      color: #0a355a;
    }
    .twpx-scroll-menu__item i {
      white-space: nowrap;
      background: #5f7696;
      color: #fff;
      font-size: 0.88rem;
      border-radius: 10px;
      height: 20px;
      padding: 0 7px;
      margin-right: 8px;
      font-style: normal;
      display: flex;
      align-items: center;
    }
    .twpx-scroll-menu__item:hover {
      background-color: rgba(240, 245, 252, 0.867);
    }
    .twpx-scroll-menu__item:hover span {
      color: rgba(10, 53, 90, 0.867);
    }
    .twpx-scroll-menu__item.active {
      background-color: #8393aa;
      cursor: default;
      pointer-events: none;
    }
    .twpx-scroll-menu__item.active span {
      color: #fff;
    }
    
    .twpx-scroll-menu-arrows {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      -webkit-transition: opacity 0.3s ease;
      transition: opacity 0.3s ease;
      width: 100%;
    }
    .twpx-scroll-menu:hover .twpx-scroll-menu-arrows {
      opacity: 1;
    }
    .twpx-scroll-menu-arrow-left,
    .twpx-scroll-menu-arrow-right {
      content: '';
      position: absolute;
      top: calc((48px - 64px) / 2);
      left: -32px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0px 3px 6px #00000029;
      cursor: pointer;
      -webkit-transform: translateX(20px);
      transform: translateX(20px);
      -webkit-transition: background-color 0.3s ease, -webkit-transform 0.3s ease;
      transition: background-color 0.3s ease, transform 0.3s ease;
      z-index: 20;
    }
    .twpx-scroll-menu-arrow-right {
      right: -32px;
      left: auto;
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px);
    }
    .twpx-scroll-menu-arrow-left:after,
    .twpx-scroll-menu-arrow-right:after {
      content: '';
      position: absolute;
      top: 24px;
      right: 28px;
      width: 15px;
      height: 15px;
      border: 2px solid ${this.options.arrowColor || '#074b84'};
      border-bottom-color: transparent;
      border-left-color: transparent;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      z-index: 30;
    }
    .twpx-scroll-menu-arrow-left:after {
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
      left: 28px;
      right: auto;
    }
    .twpx-scroll-menu-arrow-right:hover,
    .twpx-scroll-menu-arrow-left:hover {
      background-color: ${this.options.arrowHoverColor || '#f2762e'};
    }
    .twpx-scroll-menu-arrow-right:hover:after,
    .twpx-scroll-menu-arrow-left:hover:after {
      border-top-color: #fff;
      border-right-color: #fff;
    }
    .twpx-scroll-menu:hover .twpx-scroll-menu-arrow-right,
    .twpx-scroll-menu:hover .twpx-scroll-menu-arrow-left {
      transform: translateX(0);
      -webkit-transform: translateX(0);
    }
    .twpx-scroll-menu.twpx-scroll-menu--no-left .twpx-scroll-menu-arrow-right,
    .twpx-scroll-menu.twpx-scroll-menu--no-right .twpx-scroll-menu-arrow-left {
      opacity: 0 !important;
    }
    @media(max-width: 767px) {
      .twpx-scroll-menu-wrapper {
        overflow: auto;
        padding-bottom: 5px;
      }
      .twpx-scroll-menu-arrows,
      .twpx-scroll-menu:after,
      .twpx-scroll-menu:before {
        display: none;
      }
    }
    `;
    document.querySelector('head').appendChild(styleElement);
  }

  hoverEvent() {
    this.sm.addEventListener('mouseenter', (e) => {
      if (this.calculateWidth() <= this.sm.clientWidth) {
        this.sm.classList.add(
          'twpx-scroll-menu--no-right',
          'twpx-scroll-menu--no-left'
        );
      } else {
        this.moveTo(0);
      }
    });
  }

  arrowEvents() {
    this.arrowLeft.addEventListener('click', (e) => {
      this.moveTo(this.sm.clientWidth);
    });

    this.arrowRight.addEventListener('click', (e) => {
      this.moveTo(-1 * this.sm.clientWidth);
    });
  }

  moveTo(dist) {
    this.sm.classList.remove(
      'twpx-scroll-menu--no-left',
      'twpx-scroll-menu--no-right'
    );
    let left = parseInt(this.wrapper.style.marginLeft, 10) || 0;
    left = left + dist;

    let width = this.calculateWidth();

    if (left >= 0) {
      left = 0;
      this.sm.classList.add('twpx-scroll-menu--no-right');
    } else if (left <= -1 * (width - this.sm.clientWidth)) {
      left = -1 * (width - this.sm.clientWidth);
      this.sm.classList.add('twpx-scroll-menu--no-left');
    }

    this.wrapper.style.marginLeft = left + 'px';
  }

  calculateWidth() {
    let result = 0;
    this.wrapper.childNodes.forEach((item) => {
      if (item.classList) {
        result += item.clientWidth;
        result += this.itemMarginRight;
      }
    });

    result -= this.itemMarginRight;

    return result;
  }
}
