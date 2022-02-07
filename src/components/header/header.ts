import { Component } from '../../utils/component';

import './header.css';

export class Header extends Component {
  linkForMain: Component;

  linkForDictionary: Component;

  linkForGames: Component;

  linkForStatistics: Component;

  enterBtn: Component;

  nav: Component[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header', 'wrapper']);

    const logoHeader = new Component(this.element, 'a', ['nav-logo']);
    const containerPartOfHeader = new Component(this.element, 'div', ['nav-container-of-part']);
    const partOfHeader = new Component(containerPartOfHeader.element, 'div', ['nav-part']);
    this.linkForMain = new Component(partOfHeader.element, 'a', ['nav-link'], 'Главная');
    this.linkForDictionary = new Component(partOfHeader.element, 'a', ['nav-link'], 'Словарь');
    this.linkForGames = new Component(partOfHeader.element, 'a', ['nav-link'], 'Игры');
    this.linkForStatistics = new Component(partOfHeader.element, 'a', ['nav-link'], 'Статистика');
    this.enterBtn = new Component(containerPartOfHeader.element, 'button', ['nav-btn'], 'Войти');

    logoHeader.element.setAttribute('href', '#/');
    this.linkForMain.element.setAttribute('href', '#/');
    this.linkForDictionary.element.setAttribute('href', '#/dictionary');
    this.linkForGames.element.setAttribute('href', '#/games');
    this.linkForStatistics.element.setAttribute('href', '#/statistics');

    this.nav = [this.linkForMain, this.linkForDictionary,
                this.linkForGames, this.linkForStatistics];

    window.addEventListener('hashchange', () => this.updateActiveOfLink(this.nav));

    window.addEventListener('load', () => this.updateActiveOfLink(this.nav));
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