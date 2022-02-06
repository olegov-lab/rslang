import { IRouter } from '../interfaces/interface';
import { Component } from '../utils/component';
import { MainPage } from '../pages/main/main';


export class Router {
  mainPage: Component;

  winsPage: Component | undefined;

  routs: Array<IRouter>;

  constructor(private rootElement: HTMLElement) {
    this.mainPage = new MainPage(this.rootElement);

    this.routs = [
      {
        name: '/',
        component: () => {
          this.rootElement.append(this.mainPage.element);
        },
      },
      {
        name: '/dictionary',
        component: () => {
          this.rootElement.innerText = 'словарь';
        },
      },
      {
        name: '/games',
        component: () => {
          this.rootElement.innerText = 'игры';
        },
      },
      {
        name: '/statistics',
        component: () => {
          this.rootElement.innerText = 'статистика';
        },
      },
    ];
  }

  updateRouter(): void {
    this.rootElement.innerHTML = '';
    const currentRouteName = window.location.hash.slice(1);
    const currentRoute = this.routs.find(
      (page) => page.name === currentRouteName,
    );

    currentRoute.component();
  }

  initRouter(): void {
    if (window.location.hash === '') {
      window.location.hash = '#/';
    }

    window.onpopstate = () => this.updateRouter();
    this.updateRouter();
  }
}