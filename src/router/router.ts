import { IRouter } from '../interfaces/interface';
import { Component } from '../utils/component';
import { MainPage } from '../pages/main/main';
import { SprintGame } from '../pages/games/sprint/sprint-game/sprint';
import { SprintDescriptionPage }
from '../pages/games/sprint/sprint-description/sprint-description';
import { Form } from "../pages/form/form";
import { Textbook } from "../pages/textbook/textbook";


export class Router {
  mainPage: Component;

  sprintGame: SprintGame;

  form: Component;

  routs: Array<IRouter>;

  textbook: Component;

  constructor(private rootElement: HTMLElement) {
    this.mainPage = new MainPage(this.rootElement);
    this.sprintGame = new SprintGame(this.rootElement);
    this.form = new Form(this.rootElement);

    // let groupLoad;

    // if(typeof +window.location.href.slice(-1) === 'number') {

    // groupLoad = +window.location.href.slice(-1);
    // const page = document.querySelector('.pagination__title');

    // this.textbook = new Textbook(this.rootElement, groupLoad,1);

    // } else {
    //   let groupLoad = 0;
    // }

    this.textbook = new Textbook(this.rootElement);




    this.routs = [
      {
        name: '/',
        component: async () => {
          this.rootElement.append(this.mainPage.element);
        },
      },
      {
        name: '/textbook',
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/0`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/1`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/2`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/3`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/4`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/5`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: `/textbook/6`,
        component: async () => {
          this.rootElement.append(this.textbook.element);
        },
      },
      {
        name: '/games',
        component: () => {
          this.rootElement.insertAdjacentHTML('afterbegin', `
          <section class="games-page">
          <div class="container">
              <div class="games-page-title">Мини-игры</div>
              <div class="games">
                <a href="#/games/audio">
                  <div class="game-audio-call-select">
                      <div class="game-audio-call-title">Аудиовызов</div>
                  </div>
                </a>
                <a href="#/games/sprint">
                  <div class="game-sprint-select">
                      <div class="game-sprint-title">Спринт</div>
                  </div>
                </a>
              </div>
          </div>
          </section>`);
        },
      },
      {
        name: '/games/sprint',
        component: () => {
          this.sprintGame.renderDescription();
        },
      },
      {
        name: '/games/audio',
        component: () => {
          this.rootElement.insertAdjacentHTML('afterbegin', `
          <section class="game-audio-description"">
          <div class="container">
              <div class="audio-call-title">Аудиовызов</div>
              <div class="audio-call-description">
                  <div class="audio-call-main-text">«Аудиовызов» - это тренировка, которая <br> улучшает восприятие речи на слух</div>
                  <div class="audio-call-sub-text">
                      <ul>
                          <li>Используйте мышь, чтобы выбрать</li>
                          <li>Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
                          <li>Используйте пробел для повтроного звучания слова</li>
                          <li>Используйте клавишу Enter для подсказки или для перехода к следующему слову</li>
                        </ul>
                  </div>
              </div>
              <div class="audio-call-buttons">
                  <div class="audio-call-difficulty">
                      <select class="select-audio-play-difficulty">
                          <option>Выберите сложность</option>
                          <option value="0">Группа 1</option>
                          <option value="1">Группа 2</option>
                          <option value="2">Группа 3</option>
                          <option value="3">Группа 4</option>
                          <option value="4">Группа 5</option>
                          <option value="5">Группа 6</option>
                          <option value="6">Группа 7</option>
                        </select>
                  </div>
                  <div class="audio-call-start">
                      <button class="audio-call-start-btn">Начать игру</button>
                  </div>
              </div>
          </div>
          </section>`);
        },
      },
      {
        name: '/statistics',
        component: async () => {
          this.rootElement.innerText = 'статистика';
        },
      },
      {
        name: '/signin',
        component: async () => {
          this.rootElement.append(this.form.element);
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
