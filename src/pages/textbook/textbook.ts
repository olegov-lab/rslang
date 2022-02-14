import { Component } from '../../utils/component';
import { IWords } from '../../interfaces/interface';
import { TextbookItem } from '../../components/textbook-container/textbook-item';
import { TextbookContainer } from '../../components/textbook-container/textbook-container';
import { TextbookHeader } from "../../components/textbook-container/textbook-header";
import {
  getWords
} from '../../api/api';
import { getUserAggrWord, createUserWord, getUserAggrWordHard, getUserAggrWordHardAll } from "../../api/user-aggregated";
//import { userId } from '../../api/user-authorization';
//import { good } from "../textbook/part7/part7";

export class Textbook extends Component {
  onClickButton: () => void = () => {};
  private textbookContainer: TextbookContainer;
  private textbookHeader: TextbookHeader;
  textbookItem: TextbookItem;
  group = 0;
  page = 0;


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['textbook', 'wrapper']);



    if (localStorage.getItem('group')) {
      this.group = +localStorage.getItem('group');
    }

    if (localStorage.getItem('page')) {
      this.page = +localStorage.getItem('page');
    } else {
      localStorage.setItem('group', "0");
      localStorage.setItem('page', "0");
    }


    this.getAllWords(this.group, this.page);

    this.textbookHeader = new TextbookHeader(this.element);

    this.textbookContainer = new TextbookContainer(this.element);

    const navPartTextbook = document.querySelector('.nav-part-textbook');

const btnT = document.querySelector('.textbook-container-block');

btnT.addEventListener('click', (event) => {

let target = event.target as HTMLElement;

if(target.classList.contains('play-word')) {
  playSound(target.dataset.audio);
} else {
  return;
}
})

function playSound(target) {
  const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${target}`);
  audio.play();
let arr = Array.from(target);

arr.splice(-4).join('');

let newArr = arr.join('');

  setTimeout(((target) => {
  const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${newArr}_meaning.mp3`);
  audio.play();
  console.log(audio)
  }), 2000);

  setTimeout(((target) => {
    const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${newArr}_example.mp3`);
    audio.play();
    console.log(audio)
    }), 7500);

};


 //!

  btnT.addEventListener('click', async (event) => {
  let target = event.target as HTMLElement;

  let wordId = target.dataset.id;

  if(target.classList.contains('btn-dif')) {
    console.log(wordId);

    let state = {
      userId: localStorage.getItem('userId'),
      wordId: wordId,
      word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: true} }
    }

    let state2 = {
      userId: localStorage.getItem('userId'),
      group:localStorage.getItem('group'),
      page: localStorage.getItem('page'),
    }

    let userId = localStorage.getItem('userId');

    createUserWord(state);

    getUserAggrWordHard(state2);

    // this.arrHard = await getUserAggrWordHardAll(userId);

    // console.log(this.arrHard);

  } else {
    return;
  }
  });


    navPartTextbook.addEventListener('click', (event) => {
       let target = event.target as HTMLElement;

       console.log(target.getAttribute('href').slice(-1));

       this.group = +target.getAttribute('href').slice(-1);

       localStorage.setItem('group', String(this.group));

       this.getAllWords(this.group, this.page);

       Textbook.prototype.toLinkHref = +this.group;

    })

    this.textbookContainer.updatePage = (page) => {
      this.page = page;
      localStorage.setItem('page', String(this.page));
      this.getAllWords(this.group, this.page);
    };
}


get toLinkHref(): number {
  return this.group;
}

set toLinkHref(value) {
  this.group = value;
}

private async getAllWords(group: number, page: number): Promise<void> {


  let data;

  if(!localStorage.getItem('token')){
    data = await getWords(group, page);
  } else if (localStorage.getItem('group') == '6') {

    let userId = localStorage.getItem('userId');

    const data = await getUserAggrWordHardAll(userId);

    const words: {} = data;
    this.textbookContainer.addItems(words);



  }
  else {
    let userId = localStorage.getItem('userId');
    data = await getUserAggrWord({userId, group, page});
  }

  if (data) {
    const words: {} = data;

    this.textbookContainer.addItems(words);

    this.textbookContainer.pagination.updateNextButton(this.page, 28, 1);


    if(localStorage.getItem('token')) {

      const difBtn = document.querySelector('.btn.btn-dif');
      //difBtn.removeAttribute('disabled');
      //difBtn.classList.remove('non-event');

      const remBtn = document.querySelector('.btn.btn-rem');
      //remBtn.removeAttribute('disabled');
      //remBtn.classList.remove('non-event');

    } else {
      const difBtn = document.querySelector('.btn.btn-dif');
      //difBtn.setAttribute('disabled', 'true');
      //difBtn.classList.add('non-event');

      const remBtn = document.querySelector('.btn.btn-rem');
      //remBtn.setAttribute('disabled', 'true');
      //remBtn.classList.add('non-event');
    }

  }
}


}