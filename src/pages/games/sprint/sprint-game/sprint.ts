import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';
import { Results } from './sprint-page/results';
import { sprintData } from './sprint-page/sprintData';
import { PlaySound } from './PlaySound';
import { defineGroupAndPage } from './sprint-page/getGroupAndPage';
import {
  resultsSprint, giveSprintStatistics, startSprintStatistics, countingLongestAnswerRightSprint,
} from './returnStatidtics';

let countCorrectAnswers = 0;

export class SprintGame extends Component {
  main: HTMLElement;

  resultArray: object[];

  sprintPage: SprintPage;

  wordFeld: HTMLElement;

  translateFeld: HTMLElement;

  sound: PlaySound;

  private timer: Component;

  private timerId: NodeJS.Timer;

  static renderGame: any;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.main = parentNode;
  }

  renderDescription() {
    const sprintDescriptionPage = new SprintDescriptionPage(this.main);
    sprintDescriptionPage.startGame = () => {
      this.renderGame();
    };
  }

  checkAnswer(curentAnswer) {
    if (sprintData.currentWordsKit[sprintData.currentNumberWord].answer === curentAnswer) {
      const sound = new PlaySound();
      sound.playCorrectSound();
      const icon = new Component(this.main, 'div', ['answer-icon-true'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = true;
      resultsSprint.wordsCorrectAnswers.push(
        sprintData.currentWordsKit[sprintData.currentNumberWord],
      );
      countCorrectAnswers += 1;
    } else {
      const sound = new PlaySound();
      sound.playWrongSound();
      const icon = new Component(this.main, 'div', ['answer-icon-false'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = false;
      resultsSprint.wordsWrongAnswers.push(
        sprintData.currentWordsKit[sprintData.currentNumberWord],
      );
      countingLongestAnswerRightSprint(countCorrectAnswers);
      countCorrectAnswers = 0;
    }
  }

  async renderGame() {
    await startSprintStatistics();
    sprintData.currentWordsKit = [];
    await defineGroupAndPage();
    await generateWordsForGame();
    const sprintPage = new SprintPage(this.main);
    if (document.querySelector('.game-sprint-description')) {
      document.querySelector('.game-sprint-description').remove();
    }
    await sprintPage.renderCard();
    this.showTimer();

    sprintPage.showNextWord = (event) => {
      this.checkAnswer(event);
      sprintData.currentNumberWord += 1;
      sprintPage.renderCard();
      if ((sprintData.currentNumberWord % 20) === 0) {
        if (sprintData.currentPage >= 1) {
          sprintData.currentPage -= 1;
          generateWordsForGame();
        } else {
          this.stopGame();
        }
      }
    };
  }

  stopGame() {
    SprintGame.renderResults();
    this.timer.destroy();
    clearInterval(this.timerId);
    sprintData.timerStatus = true;
  }

  static renderResults() {
    const root = document.querySelector('.main') as HTMLElement;
    const results = new Results(root);
    results.renderAnswers();
    giveSprintStatistics();
  }

  showTimer() {
    this.timer = new Component(this.main, 'div', ['sprint-timer']);
    this.timer.element.innerHTML = `
    <span class="time"></span>
    <svg width=120 height=120 class="countdown-timer">
      <circle class="circle" cx=60 cy=60 r=42>
    </svg>
    `;
    const circle = document.querySelector('.circle') as HTMLElement;
    const time = document.querySelector('.time') as HTMLElement;
    const totalTime = 60;
    let curentTime = totalTime;
    this.timerId = setInterval(() => {
      if (!sprintData.timerStatus) {
        this.stopGame();
      } else {
        // eslint-disable-next-line no-lonely-if
        if (curentTime > 0) {
          time.innerText = `${curentTime}`;
          const ratio = (curentTime / totalTime);
          const rad = parseInt(circle.getAttribute('r'));
          const progress = Math.ceil(rad * (22 / 7) * 2 * (1 - ratio));
          curentTime -= 1;
          circle.style.strokeDashoffset = progress.toString();
        } else {
          this.stopGame();
        }
      }
    }, 1000);
  }
}
