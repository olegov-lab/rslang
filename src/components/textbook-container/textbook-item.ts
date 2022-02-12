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
      <button class="play-word">play-word</button>
    </div>
    <p>${word.textMeaning} - ${word.textMeaningTranslate}</p>
    <p>${word.textExample} - ${word.textExampleTranslate}</p>
    `
    const wordTop = new Component(this.element, 'div', ['word-item-option']);

    const difficultWordBtn = new UIButton(wordTop.element, ['btn-nav'], 'сложное слово');

    const removeWordBtn = new UIButton(wordTop.element, ['btn-nav'], 'удалить слово');

    difficultWordBtn.setDisabled(true);
    removeWordBtn.setDisabled(true);
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

