import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';
import { Results } from './sprint-page/results';
import { sprintData } from './sprint-page/sprintData';
import { PlaySound } from './PlaySound';

export class SprintGame extends Component {
  main: HTMLElement;

  resultArray: object[];

  sprintPage: SprintPage;

  wordFeld: HTMLElement;

  translateFeld: HTMLElement;

  sound: PlaySound;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.main = parentNode;
    // generateWordsForGame();
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
    } else {
      const sound = new PlaySound();
      sound.playWrongSound();
      const icon = new Component(this.main, 'div', ['answer-icon-false'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = false;
    }
  }

  renderSprintPage () {
    const sprintPage = new SprintPage(this.main);
    document.querySelector('.game-sprint-description').remove();
    sprintPage.renderCard();
    this.showTimer();

    sprintPage.showNextWord = (event) => {
      this.checkAnswer(event);
      sprintData.currentNumberWord += 1;
      sprintPage.renderCard();
      if ((sprintData.currentNumberWord % 20) === 19) {
        sprintData.currentPage -= 1;
        generateWordsForGame();
      }
    };
  }

  async renderGame() {
    await generateWordsForGame();
    await this.renderSprintPage();
  }

  static renderResults() {
    const root = document.querySelector('.main') as HTMLElement;
    const results = new Results(root);
    results.renderAnswers();
  }

  showTimer() {
    const timer = new Component(this.main, 'div', ['sprint-timer']);
    let timeLeft = 60;
    const timerId = setInterval(() => {
      if (!sprintData.timerStatus) {
        SprintGame.renderResults();
        timer.destroy();
        clearInterval(timerId);
        sprintData.timerStatus = true;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (timeLeft > 0) {
          timer.element.innerText = `${timeLeft}`;
          timeLeft -= 1;
        } else {
          SprintGame.renderResults();
          timer.destroy();
          clearInterval(timerId);
          sprintData.timerStatus = true;
        }
      }
    }, 1000);
  }
}
