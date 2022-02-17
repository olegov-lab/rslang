import { Component } from '../../../../../utils/component';
import { sprintData } from './sprintData';
import './results.css';

export class Results extends Component {
  correctAnswerSection: HTMLElement;

  wrongAnswerSection: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['game-sprint-results']);
    document.querySelector('.game-sprint').remove();
  }

  renderAnswers() {
    const wrapper = new Component(this.element, 'div', ['game-sprint-results-wrapper'], '');
    const container = new Component(wrapper.element, 'div', ['game-sprint-answers'], '');
    const correctAnswerSection = new Component(container.element, 'div', ['correct-answer-wrapper'], '');
    const wrongAnswerSection = new Component(container.element, 'div', ['wrong-answer-wrapper'], '');
    const correctAnswerTitle = new Component(correctAnswerSection.element, 'div', ['correct-answer-title'], '');
    const wrongAnswerTitle = new Component(wrongAnswerSection.element, 'div', ['wrong-answer-title'], '');
    const correctAnswerList = new Component(correctAnswerSection.element, 'ul', ['correct-answer-list'], '');
    const wrongAnswerList = new Component(wrongAnswerSection.element, 'ul', ['wrong-answer-list'], '');
    const nav = new Component(wrongAnswerSection.element, 'div', ['sprint-result-btn-container'], '');
    const btnAgain = new Component(wrapper.element, 'button', ['sprint-result-btn'], 'Сыграть еще раз');


    let countCorrectAnswers = 0;
    let countWrongAnswers = 0;

    const correctAnswerTag = document.querySelector('.correct-answer-title') as HTMLElement;
    const wrongAnswerTag = document.querySelector('.wrong-answer-title') as HTMLElement;

    sprintData.currentWordsKit.forEach((element) => {
      if (typeof element.userAnswer === 'boolean') {
        if (element.userAnswer === true) {
          const word = new Component(correctAnswerList.element, 'li', ['result-word-string']);
          const resultIconSound = new Component(word.element, 'span', ['result-word-icon']);
          const resultWordText = new Component(word.element, 'span', ['result-word'], `${element.word} - ${element.correctTranslate}`);
          resultIconSound.element.addEventListener('click', () => this.sayWord(element));
          countCorrectAnswers += 1;
        } else if (element.userAnswer === false) {
          const word = new Component(wrongAnswerList.element, 'li', ['result-word-string']);
          const resultIconSound = new Component(word.element, 'span', ['result-word-icon']);
          const resultWordText = new Component(word.element, 'li', ['result-word'], `${element.word} - ${element.correctTranslate}`);
          resultIconSound.element.addEventListener('click', () => this.sayWord(element));
          countWrongAnswers += 1;
        }
      }
    });
    const correctAnswerTitleHTML = `
      <span>Знаю</span><span class="sprint-result-count-correct"> ${countCorrectAnswers}</span>
    `;
    const wrongAnswerTitleHTML = `
      <span>Ошибок</span><span class="sprint-result-count-wrong"> ${countWrongAnswers}</span>
    `;
    correctAnswerTag.innerHTML = correctAnswerTitleHTML;
    wrongAnswerTag.innerHTML = wrongAnswerTitleHTML;
  }

  sayWord(element) {
    const audio = new Audio(element.audio);
    audio.play();
  }
}
