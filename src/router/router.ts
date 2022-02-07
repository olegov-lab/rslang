import { IRouter } from '../interfaces/interface';
import { Component } from '../utils/component';
import { MainPage } from '../pages/main/main';
import { SprintDescriptionPage } from '../pages/games/sprint/sprint-description/sprint-description';

export class Router {
  mainPage: Component;

  sprintDescriptionPage: Component;

  winsPage: Component | undefined;

  routs: Array<IRouter>;

  constructor(private rootElement: HTMLElement) {
    this.mainPage = new MainPage(this.rootElement);
    this.sprintDescriptionPage = new SprintDescriptionPage(this.rootElement);

    this.routs = [
      {
        name: '/',
        component: async () => {
          this.rootElement.append(this.mainPage.element);
        },
      },
      {
        name: '/dictionary',
        component: async () => {
          this.rootElement.innerText = 'словарь';
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
          this.rootElement.append(this.sprintDescriptionPage.element);
        },
      },
      {
        name: '/games/audio',
        component: () => {
          this.rootElement.insertAdjacentHTML('afterbegin',  `
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
                          <option value="value1">Группа 1</option>
                          <option value="value2">Группа 2</option>
                          <option value="value3">Группа 3</option>
                          <option value="value1">Группа 4</option>
                          <option value="value2">Группа 5</option>
                          <option value="value3">Группа 6</option>
                          <option value="value3">Группа 7</option>
                        </select>
                  </div>
                  <div class="audio-call-start">
                      <button class="audio-call-start-btn">Начать игру</button>
                  </div>
              </div>
          </div>
          </section>`

          );
        },
      },
      {
        name: '/statistics',
        component: async () => {
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