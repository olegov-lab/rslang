import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';
import { Results } from './sprint-page/results';
import { sprintData } from './sprint-page/sprintData';

export class SprintGame extends Component {
  main: HTMLElement;

  resultArray: object[];

  sprintPage: SprintPage;

  wordFeld: HTMLElement;

  translateFeld: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.main = parentNode;
    generateWordsForGame();
  }

  renderDescription() {
    const sprintDescriptionPage = new SprintDescriptionPage(this.main);
    sprintDescriptionPage.startGame = () => {
      console.log('start game');
      this.renderGame();
    };
  }

  checkAnswer(event) {
    let curentAnswer: boolean;
    if (event.target instanceof Element) {
      if (event.target.id === 'game-button-true') {
        curentAnswer = true;
      } else {
        curentAnswer = false;
      }
    }

    if (sprintData.currentWordsKit[sprintData.currentNumberWord].answer === curentAnswer) {
      const icon = new Component(this.main, 'div', ['answer-icon-true'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = true;
      console.log(sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer);
    } else {
      const icon = new Component(this.main, 'div', ['answer-icon-false'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = false;
      console.log(sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer);
    }
  }

  renderGame() {
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

  static renderResults() {
    const root = document.querySelector('.main') as HTMLElement;
    const results = new Results(root);
    results.renderAnswers();
  }

  showTimer() {
    const timer = new Component(this.main, 'div', ['sprint-timer']);
    let timeLeft = 60;
    const timerId = setInterval(() => {
      console.log(timeLeft);
      if (timeLeft > 0) {
        timer.element.innerText = `${timeLeft}`;
        timeLeft -= 1;
      } else {
        SprintGame.renderResults();
        timer.destroy();
        clearInterval(timerId);
      }
    }, 1000);
  }
}
