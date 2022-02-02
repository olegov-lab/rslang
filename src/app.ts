import { Component } from './utils/component';
import { Header } from './components/header/header';
import { Router } from './router/router';
import './pages/games/games-selector/games-selector';
import './pages/games/audio-call/audio-call-description/audio-call-description';

export class App {
  main: Component;

  router: Router;

  constructor(rootElement: HTMLElement) {
    const header = new Header(rootElement);

    this.main = new Component(rootElement, 'main', ['main']);
    this.router = new Router(this.main.element);
  }

  init(): void {
    this.router.initRouter();
  }
}