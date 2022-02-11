import { Component } from '../../../../../utils/component';
import { SprintPage } from './sprint-page';

export class Results extends Component {
  correctAnswerSection: HTMLElement;

  wrongAnswerSection: HTMLElement;


  constructor(parentNode: HTMLElement) {
    document.querySelector('.game-sprint').remove();
    super(parentNode, 'div', ['game-sprint-results']);
    
}

renderAnswers(data) {
    //
    const main = document.querySelector('.main') as HTMLElement;
    const wrapper = new Component(this.element, 'div', ['results-wrapper'], '');
    const correctAnswerSection = new Component(this.element, 'div', ['correct-answer-wrapper'], '');
    const wrongAnswerSection = new Component(this.element, 'div', ['wrong-answer-wrapper'], '');
    const correctAnswerList = new Component(correctAnswerSection.element, 'div', ['correct-answer-list'], 'Правильно');
    const wrongtAnswerList = new Component(wrongAnswerSection.element, 'div', ['wrong-answer-list'], 'Не правильно');


    data.forEach(element => {
        const word = new Component(correctAnswerSection.element, 'div', ['result-word'], `${element.word} - ${element.translate}`)
    
    });
    
  }
}

