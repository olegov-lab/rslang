import { Component } from '../../utils/component';
import { UIButton } from '../UI/button/button';
import { IWords } from '../../interfaces/interface';



import './textbook-container.css';

export class TextbookItem extends Component {
  private difficultWordBtn: UIButton;
  private removeWordBtn: UIButton;
  public word: IWords;



  constructor(parentNode: HTMLElement, word: IWords) {

    super(parentNode, 'div', ['textbook-item']);
    this.word = word;

    const imgItem = new Component(this.element, 'img', ['word-img']);
    imgItem.element.setAttribute('src', `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.image}`);

    const wordDesc = new Component(this.element, 'div', ['word-desc']);
    wordDesc.element.innerHTML = `
    <div class="word-translate">
      <p>${word.word} - ${word.transcription} - ${word.wordTranslate}</p>
      <button class="play-word" data-audio="${word.audio}"></button>
      <audio src="https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.audio}"></audio>

    </div>
    <p>${word.textMeaning} - ${word.textMeaningTranslate}</p>
    <p>${word.textExample} - ${word.textExampleTranslate}</p>
    `
    const optionContainer = new Component(wordDesc.element, 'div', ['option-container']);

    const wordTop = new Component(this.element, 'div', ['word-item-option']);

    const difficultWordBtn = new UIButton(optionContainer.element, ['btn-dif'], 'сложное слово');

    const removeWordBtn = new UIButton(optionContainer.element, ['btn-rem'], 'удалить слово');

    if(localStorage.getItem('token')) {

      difficultWordBtn.setDisabled(false);
      difficultWordBtn.element.classList.remove('non-event');
      removeWordBtn.setDisabled(false);
      removeWordBtn.element.classList.remove('non-event');

      console.log('kol');

    } else {
      difficultWordBtn.setDisabled(true);
      difficultWordBtn.element.classList.add('non-event');
      removeWordBtn.setDisabled(true);
      removeWordBtn.element.classList.add('non-event');

    }


  }

  updateButtons(type = false): void {
    this.difficultWordBtn.setDisabled(type);
    this.removeWordBtn.setDisabled(!type);
  }

  disableAllButtons(): void {
    this.difficultWordBtn.setDisabled(true);
    this.removeWordBtn.setDisabled(false);
  }



}

