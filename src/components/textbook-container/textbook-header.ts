import { Component } from '../../utils/component';

//import './header.css';

export class TextbookHeader extends Component {
  linkForPart1: Component;

  linkForPart2: Component;

  linkForPart3: Component;

  linkForPart4: Component;

  linkForPart5: Component;

  linkForPart6: Component;

  linkForPart7: Component;

  contentBurger: Component;

  burgerBtn:Component;

  gamesBtn: Component;

  exiteBtn: Component;

  nav: Component[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['textbook-header', 'wrapper']);


    const containerPartOfHeader = new Component(this.element, 'div', ['nav-container-of-part']);
    const partOfHeader = new Component(containerPartOfHeader.element, 'div', ['nav-part-textbook']);
    this.linkForPart1 = new Component(partOfHeader.element, 'a', ['nav-link'], 'Раздел 1');
    this.linkForPart2 = new Component(partOfHeader.element, 'a', ['nav-link'], 'Раздел 2');
    this.linkForPart3 = new Component(partOfHeader.element, 'a', ['nav-link'], 'Раздел 3');
    this.linkForPart4 = new Component(partOfHeader.element, 'a', ['nav-link'], 'Раздел 4');
    this.linkForPart5 = new Component(partOfHeader.element, 'a', ['nav-link'], 'Раздел 5');
    this.linkForPart6 = new Component(partOfHeader.element, 'a', ['nav-link'], 'Раздел 6');
    this.linkForPart7 = new Component(partOfHeader.element, 'a', ['nav-link', 'disabled-link'], 'Раздел 7');

    if(localStorage.getItem('token')) {
      this.linkForPart7.element.classList.remove('disabled-link');
      this.linkForPart7.element.classList.add('red7');
    } else {
      this.linkForPart7.element.classList.add('disabled-link');
      this.linkForPart7.element.classList.remove('red7');
    }

    this.gamesBtn = new Component(containerPartOfHeader.element, 'a', ['nav-btn'], 'Мини-игры');


    const burgerMenu = new Component(containerPartOfHeader.element, 'div', ['burger'], '');
    const contentBurger = new Component(burgerMenu.element, 'div', ['sidepanel'], '');
    const burgerBtn = new Component(burgerMenu.element, 'button', ['openbtn'], '☰');


    this.linkForPart1.element.setAttribute('href', '#/textbook/0');
    this.linkForPart2.element.setAttribute('href', '#/textbook/1');
    this.linkForPart3.element.setAttribute('href', '#/textbook/2');
    this.linkForPart4.element.setAttribute('href', '#/textbook/3');
    this.linkForPart5.element.setAttribute('href', '#/textbook/4');
    this.linkForPart6.element.setAttribute('href', '#/textbook/5');
    this.linkForPart7.element.setAttribute('href', '#/textbook/6');
    this.gamesBtn.element.setAttribute('href', '#/games-mini');

    this.nav = [this.linkForPart1, this.linkForPart2,
                this.linkForPart3, this.linkForPart4,
                this.linkForPart5, this.linkForPart6,
                this.linkForPart7];

    window.addEventListener('hashchange', () => this.updateActiveOfLink(this.nav));

    window.addEventListener('load', () => this.updateActiveOfLink(this.nav));

    contentBurger.element.innerHTML = `
    <a href="javascript:void(0)" class="closebtn" ">&times;</a>
    <a href="#/">Главная</a>
    <a href="#/textbook">Учебник</a>
    <a href="#/games">Игры</a>
    <a href="#/statistics">Статистика</a>
    `;

    const changeBurger = document.querySelector('.openbtn');
    const changeMenu = document.querySelector('.sidepanel');
    const closeBtn = document.querySelector('.closebtn');
    const exiteBtn = document.querySelector('.nav-btnEx');

    changeBurger.addEventListener('click' , (event) => {
      changeMenu.classList.add('active-sidepanel');
    })

    closeBtn.addEventListener('click' , (event) => {
      changeMenu.classList.remove('active-sidepanel');
    })

    exiteBtn.addEventListener('click', () => {

      document.querySelector('.nav-btn').classList.remove('hidden');
      document.querySelector('.nav-btnEx').classList.add('hidden');
      window.location.hash = '#/signin';
      localStorage.clear();
    })

  }

  updateActiveOfLink(nav: Component[]): void {
    this.nav = nav.map((item) => {
      item.element.classList.remove('active-link');

      if (item.element.getAttribute('href') === window.location.hash) {
        item.element.classList.add('active-link');
      }

      return item;
    });
  }

}