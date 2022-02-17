import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';
import { Results } from './sprint-page/results';
import { sprintData } from './sprint-page/sprintData';
import { PlaySound } from './PlaySound';
import { defineGroupAndPage } from './sprint-page/getGroupAndPage';
import { resultsSprint, giveSprintStatistics, startSprintStatistics, countingLongestAnswerRightSprint } from './returnStatidtics';

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
    document.querySelector('.game-sprint-description').remove();
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
    let timeLeft = 60;
    this.timerId = setInterval(() => {
      if (!sprintData.timerStatus) {
        this.stopGame();
      } else {
        // eslint-disable-next-line no-lonely-if
        if (timeLeft > 0) {
          this.timer.element.innerText = `${timeLeft}`;
          timeLeft -= 1;
        } else {
          this.stopGame();
        }
      }
    }, 1000);
  }
}
