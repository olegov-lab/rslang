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



    if(word.userWord?.difficulty) {
      this.element.setAttribute('data-dif', `${word.userWord.difficulty}`);

      if(this.element.getAttribute('data-dif') === 'hard') {
        this.element.classList.add('hard-word');
      } else if (this.element.getAttribute('data-dif') === 'easy') {
        this.element.classList.add('easy-word');
      }
    }

    const imgItem = new Component(this.element, 'img', ['word-img']);
    imgItem.element.setAttribute('src', `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.image}`);

    const wordDesc = new Component(this.element, 'div', ['word-desc']);
    wordDesc.element.innerHTML = `
    <div class="word-translate" >
      <div class="word-options">
        <p>${word.word} - ${word.transcription} - ${word.wordTranslate}</p>
        <button class="play-word" data-audio="${word.audio}"></button>
      </div>


      <div class="likes-option">
      <div class="dislike">
        <img src="../../assets/dislike.png" />
        <span>0</span>
      </div>
      <di class="like">
        <span>0</span>
        <img src="../../assets/like.png" />
      </div>
      </div>

      <audio src="https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.audio}"></audio>

    </div>
    <p>${word.textMeaning} - ${word.textMeaningTranslate}</p>
    <p>${word.textExample} - ${word.textExampleTranslate}</p>
    `
    const optionContainer = new Component(wordDesc.element, 'div', ['option-container']);

    const wordTop = new Component(this.element, 'div', ['word-item-option']);

    const difficultWordBtn = new UIButton(optionContainer.element, ['btn-dif'], 'сложное слово');
    difficultWordBtn.element.setAttribute('data-id',`${word._id}`);

    const removeWordBtn = new UIButton(optionContainer.element, ['btn-rem'], 'изученное слово');
    removeWordBtn.element.setAttribute('data-id',`${word._id}`);

    this.element.setAttribute('id', `${word._id}`);

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

