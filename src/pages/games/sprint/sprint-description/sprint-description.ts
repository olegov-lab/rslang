import { Component } from '../../../../utils/component';
import './sprint-description.css';

const sprintDescriptionSection = `
        <div class="sprint-title">Спринт</div>
        <div class="sprint-decription">
            <div class="sprint-main-text">«Спринт» - это тренировка, которая <br> позволяет увеличить словарный запас</div>
            <div class="sprint-sub-text">
                <ul>
                    <li>Используйте мышь, чтобы выбрать</li>
                    <li>Используйте цифровые клавиши влево и вправо для выбора ответа</li>
                  </ul>
            </div>
        </div>
        <div class="sprint-buttons">
            <div class="sprint-difficulty">
                <select class="select-sprint-difficulty">
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
            <div class="sprint-start">
              <a href="#/games/sprint/sprint-game">
                <button class="sprint-start-btn" id="sprint-start-btn">Начать игру</button>
              </a>
            </div>
        </div>
    `;
export class SprintDescriptionPage extends Component {
  showFirstWord: (words)=>void;

  startGame: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', ['game-sprint-description']);

    const sprintGuest = new Component(this.element, 'div', ['container'], '');
    sprintGuest.element.innerHTML = sprintDescriptionSection;

    const btnStartGame = sprintGuest.element.querySelector('.sprint-start-btn');
    btnStartGame.addEventListener('click', () => {
      console.log('btnStartGame');
      this.startGame();
    });
  }
}
