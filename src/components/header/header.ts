import { Component } from '../../utils/component';

import { reloadPageStatistics } from "../../components/react/reload";

import './header.css';

export class Header extends Component {
  linkForMain: Component;

  linkForDictionary: Component;

  linkForGames: Component;

  linkForStatistics: Component;

  contentBurger: Component;

  burgerBtn:Component;

  enterBtn: Component;

  exiteBtn: Component;

  nav: Component[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header', 'wrapper']);

    const logoHeader = new Component(this.element, 'a', ['nav-logo']);
    const containerPartOfHeader = new Component(this.element, 'div', ['nav-container-of-part']);
    const partOfHeader = new Component(containerPartOfHeader.element, 'div', ['nav-part']);
    this.linkForMain = new Component(partOfHeader.element, 'a', ['nav-link'], 'Главная');
    this.linkForDictionary = new Component(partOfHeader.element, 'a', ['nav-link'], 'Учебник');
    this.linkForGames = new Component(partOfHeader.element, 'a', ['nav-link'], 'Игры');
    this.linkForStatistics = new Component(partOfHeader.element, 'a', ['nav-link'], 'Статистика');

    this.enterBtn = new Component(containerPartOfHeader.element, 'a', ['nav-btn'], 'Войти');
    this.exiteBtn = new Component(containerPartOfHeader.element, 'a', ['nav-btnEx', 'hidden'], 'Выйти');

    const burgerMenu = new Component(containerPartOfHeader.element, 'div', ['burger'], '');
    const contentBurger = new Component(burgerMenu.element, 'div', ['sidepanel'], '');
    const burgerBtn = new Component(burgerMenu.element, 'button', ['openbtn'], '☰');

    logoHeader.element.setAttribute('href', '#/');
    this.linkForMain.element.setAttribute('href', '#/');
    this.linkForDictionary.element.setAttribute('href', '#/textbook');
    this.linkForGames.element.setAttribute('href', '#/games');
    this.linkForStatistics.element.setAttribute('href', '#/statistics');
    this.enterBtn.element.setAttribute('href', '#/signin');

    this.nav = [this.linkForMain, this.linkForDictionary,
                this.linkForGames, this.linkForStatistics];

    // слушатель сохраняет источник для игр в local storage
    this.linkForGames.element.addEventListener('click', () => localStorage.setItem('gameSource', 'nav'));

    window.addEventListener('hashchange', () => this.updateActiveOfLink(this.nav));

    window.addEventListener('load', () => this.updateActiveOfLink(this.nav));


    contentBurger.element.innerHTML = `
    <a href="javascript:void(0)" class="closebtn" ">&times;</a>
    <a class="main-btn-burger" href="#/">Главная</a>
    <a class="textbook-btn-burger" href="#/textbook">Учебник</a>
    <a class="games-btn-burger" href="#/games">Игры</a>
    <a class="statistics-btn-burger" href="#/statistics">Статистика</a>
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

    document.querySelector('.main-btn-burger').addEventListener('click', () => {
      changeMenu.classList.remove('active-sidepanel');
    })

    document.querySelector('.textbook-btn-burger').addEventListener('click', () => {
      //reloadPageStatistics();
      changeMenu.classList.remove('active-sidepanel');
    })

    document.querySelector('.statistics-btn-burger').addEventListener('click', () => {
    window.location.hash = '#/statistics';
     window.location.reload();
    })


    document.querySelector('.games-btn-burger').addEventListener('click', () => {
      changeMenu.classList.remove('active-sidepanel');
    })

    document.querySelector('.statistics-btn-burger').addEventListener('click', () => {
      changeMenu.classList.remove('active-sidepanel');
    })

    exiteBtn.addEventListener('click', () => {

      document.querySelector('.nav-btn').classList.remove('hidden');
      document.querySelector('.nav-btnEx').classList.add('hidden');
      window.location.hash = '#/';
      localStorage.clear();
      window.location.reload();
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