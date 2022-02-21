import { Component } from '../../utils/component';
import { IWords } from '../../interfaces/interface';
import { TextbookItem } from '../../components/textbook-container/textbook-item';
import { TextbookContainer } from '../../components/textbook-container/textbook-container';
import { TextbookHeader } from "../../components/textbook-container/textbook-header";
import { StaticsPage } from "../../pages/statistics/statistics";
import {
  getWords, getWordById
} from '../../api/api';
import { getUserAggrWord, createUserWord, getUserAggrWordHard,
         getUserAggrWordHardAll, updateUserWord, getUserWordById, getUserAggrWordById}
from "../../api/user-aggregated";
import { checkWrong } from "../../components/react/check-wrong";
import { getPaginat } from "../../components/react/get-paginat";
import { removePaginat } from "../../components/react/get-paginat";
import { getWordOptions, removeWordOptions } from "../../components/react/get-word-options";
import { reloadPageStatistics, reloadPageStatisticsTextbook } from "../../components/react/reload";

import {getUserStatistics , updateUserStatistics} from "../../api/statistics";

import { getDate } from '../../components/react/get-date';
import { checkDate } from '../../components/react/check-date';
import { renderBlockStatist } from '../../pages/statistics/statist-item';
import { body } from '../games/audio-call/audion-call-game/audio-call';



export class Textbook extends Component {
  onClickButton: () => void = () => {};
  private textbookContainer: TextbookContainer;
  private textbookHeader: TextbookHeader;
  textbookItem: TextbookItem;
  f: StaticsPage;
  group = 0;
  page = 0;


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['textbook', 'wrapper']);


    //reloadPageStatisticsTextbook();


    if (localStorage.getItem('group')) {
      this.group = +localStorage.getItem('group');
    }

    if (localStorage.getItem('page')) {
      this.page = +localStorage.getItem('page');
    } else {
      localStorage.setItem('group', "0");
      localStorage.setItem('page', "0");
    }

    //reloadPageStatistics();


    this.getAllWords(this.group, this.page);


    this.textbookHeader = new TextbookHeader(this.element);

    this.textbookContainer = new TextbookContainer(this.element);



const navPartTextbook = document.querySelector('.nav-part-textbook');
//const navPartTextbook = document.querySelector('body');

const btnT = document.querySelector('.textbook-container-block');

//const btnT = document.querySelector('body');


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

    }), 7500);

};



  btnT.addEventListener('click', async (event) => {

  let target = event.target as HTMLElement;

  let wordId = target.dataset.id;

  let nameId = target.dataset.name;

  if(target.classList.contains('btn-dif')) {

  const itemChange = document.getElementById(`${wordId}`);


  itemChange.classList.remove('easy-word');
  itemChange.classList.add('hard-word');



    let state = {
      userId: localStorage.getItem('userId'),
      wordId: wordId,
      word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: false} }
    }

    let state2 = {
      userId: localStorage.getItem('userId'),
      group:localStorage.getItem('group'),
      page: localStorage.getItem('page'),
    }

    let stateUser = {
      userId: localStorage.getItem('userId'),
      wordId: wordId,
    }


    //const wordPageId = await getWordById(wordId);

    //console.log(wordPageId)

    const wordById = await getUserWordById(stateUser) || null;

    // const wordByIdAggr = await getUserAggrWordById(stateUser) || null;

    // console.log(wordByIdAggr[0]._id)

    // console.log(wordById)



    if(wordById) {
      if(wordId === wordById.wordId) {
        updateUserWord(state);
      } else {
        createUserWord(state)
      }
    } else {
      createUserWord(state)
    }


    // }  else if(wordByIdAggr) {
    //       if(wordId === wordByIdAggr[0]._id) {
    //         updateUserWord(state);
    //       } else {
    //         createUserWord(state)
    //       }
    //     } else {
    //       createUserWord(state)
    //     }




    // else {
    //   createUserWord(state)
    // }


    // if(wordByIdAggr) {
    //     if(wordId === wordByIdAggr[0]._id) {
    //       updateUserWord(state);
    //     } else {
    //       createUserWord(state)
    //     }
    //   } else {
    //     createUserWord(state)
    //   }



    let userId = localStorage.getItem('userId');

    getUserAggrWordHard(state2);
    checkWrong();


  } else if(target.classList.contains('btn-rem')) {



    const itemChange = document.getElementById(`${wordId}`);
    itemChange.classList.remove('hard-word');
    itemChange.classList.add('easy-word');


    let state = {
      userId: localStorage.getItem('userId'),
      wordId: wordId,
      word: { "difficulty": "easy", "optional": {testFieldString: 'test', testFieldBoolean: false} }
    }



    const wordById = await getUserWordById(state);


    if(wordById) {
      if(wordId === wordById.wordId) {
        updateUserWord(state);
      } else {
        createUserWord(state)
      }
    } else {
      createUserWord(state)
    }




    // if(wordId === wordById.wordId) {
    //   updateUserWord(state);
    // } else {
    //   createUserWord(state)
    // }

    checkWrong();
  }

  else {
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
  //reloadPageStatisticsTextbook();

  let data;

  if(!localStorage.getItem('token')){
    data = await getWords(group, page);
    getPaginat();

  } else if (localStorage.getItem('group') == '6') {

    let userId = localStorage.getItem('userId');

    const data = await getUserAggrWordHardAll(userId);

    const words: {} = data;
    this.textbookContainer.addItems(words);

    removePaginat();

  }
  else {
    let userId = localStorage.getItem('userId');
    data = await getUserAggrWord({userId, group, page});

    getPaginat();

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


  const navPart = document.querySelector('.nav-container-of-part');

  navPart.addEventListener('click', (event) => {

    const target = event.target as HTMLElement;

    if(target.getAttribute('href') == "#/textbook") {
      this.getAllWords(this.group, this.page);
    }
  });

  checkWrong();
}

}



