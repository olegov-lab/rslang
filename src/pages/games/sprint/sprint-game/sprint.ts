import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';

export class SprintGame extends Component {
  main: HTMLElement;

  startGame: () => void;

  currentWords: number;

  words: any;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.main = parentNode;
    this.currentWords = 0;
    // eslint-disable-next-line no-unused-expressions
    this.words;
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
    const root = document.querySelector('.game-sprint') as HTMLElement;
    console.log(root);
    
    if (this.words[this.currentWords].answer === curentAnswer) {
      const icon = new Component(this.main, 'div', ['answer-icon-true'], '');
      setInterval(() => icon.destroy(), 500);
      console.log('correct'); // FIXME добавить значек правильно
    } else {
      const icon = new Component(this.main, 'div', ['answer-icon-false'], '');
      setInterval(() => icon.destroy(), 500);
      console.log('mistake'); // FIXME добавить значек не правильно
    }
  }

  renderGame() {
    const sprintPage = new SprintPage(this.main);
    const wordFeld = sprintPage.element.querySelector('.game-word') as HTMLElement;
    const translateFeld = sprintPage.element.querySelector('.game-translate') as HTMLElement;

    generateWordsForGame(0, 0).then((words) => {
      this.words = words;
      wordFeld.innerText = words[this.currentWords].word;
      translateFeld.innerText = words[this.currentWords].translate;
    });

    sprintPage.showNextWord = (event) => {
      this.checkAnswer(event);
      console.log('showNextWord');
      this.currentWords += 1;
      sprintPage.destroy();
      this.renderGame();
    };
  }
}
