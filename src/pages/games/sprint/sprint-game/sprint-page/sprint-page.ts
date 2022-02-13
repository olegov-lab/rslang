import { Component } from '../../../../../utils/component';
import { PlaySound } from '../PlaySound';
import { SprintGame } from '../sprint';
import { Results } from './results';
import './sprint-page.css';
import { sprintData } from './sprintData';
import { changeMuteIcon } from '../utils';

const sprintSection = `
<nav class="section-navigation">
<div class="nav-container">
  <button class="btn btn-sound unmuted"></button>
  <button class="btn">FS</button>
</div>
<button>Close</button>
</nav>
<div class="game-section">
  <div class="progress"></div>
  <div class="game-word"></div>
  <div class="game-translate"></div>
<div class="game-btn-container">
  <button class="btn game-button-false" id="game-button-false">&#10094 Не верно</button>
  <button class="btn game-button-true" id="game-button-true">Верно &#10095</button>
</div>
</div>`;

export class SprintPage extends Component {
  showNextWord: (event)=>void;

  showFirstWord: (words: any[])=>void;

  currentNumber: number;

  btnTrue: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', ['game-sprint']);

    const sprintGuest = new Component(this.element, 'div', ['sprint-wrapper'], '');
    sprintGuest.element.innerHTML = sprintSection;

    const btnTrue = sprintGuest.element.querySelector('.game-button-true');
    btnTrue.addEventListener('click', (event) => {
      this.showNextWord(event);
    });

    const btnFalse = sprintGuest.element.querySelector('.game-button-false');
    btnFalse.addEventListener('click', (event) => {
      this.showNextWord(event);
    });

    const btnSound = sprintGuest.element.querySelector('.btn-sound') as HTMLElement;
    btnSound.addEventListener('click', () => {
      PlaySound.changeMute();
      changeMuteIcon(btnSound);
    });
  }

  renderCard() {
    const wordFeld = this.element.querySelector('.game-word') as HTMLElement;
    const translateFeld = this.element.querySelector('.game-translate') as HTMLElement
    wordFeld.innerText = sprintData.currentWordsKit[sprintData.currentNumberWord].word;
    translateFeld.innerText = sprintData.currentWordsKit[sprintData.currentNumberWord].translate;
  }
}

