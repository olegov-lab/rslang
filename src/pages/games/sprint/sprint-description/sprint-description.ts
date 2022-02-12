import { Component } from '../../../../utils/component';
import './sprint-description.css';
import { sprintData } from '../sprint-game/sprint-page/sprintData';
import { SprintGame } from '../sprint-game/sprint';

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
                    <option value="0">Группа 1</option>
                    <option value="1">Группа 2</option>
                    <option value="2">Группа 3</option>
                    <option value="3">Группа 4</option>
                    <option value="4">Группа 5</option>
                    <option value="5">Группа 6</option>
                    <option value="6">Группа 7</option>
                </select>
            </div>
            <div class="sprint-start">
              
                <button class="sprint-start-btn" id="sprint-start-btn">Начать игру</button>
             
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
    const select = document.querySelector('.select-sprint-difficulty') as HTMLInputElement;
    select.addEventListener('change', () => {
      sprintData.currentGroup = Number(select.value);
      const newGame = new SprintGame(parentNode);
    });
  }
}
