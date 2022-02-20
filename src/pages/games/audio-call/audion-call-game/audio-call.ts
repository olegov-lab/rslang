import './audio-call.css';
import { getWords } from "../../../../api/api";
import { choosePage} from "./get-page";
import {showAnswer} from "./show-answer";
import { renderGameAudioPage } from "./render-audio-call-page";
import {hideAnswer} from "./hide-answer";
import {playSound} from './play-word-audio';
import {getNewWords} from './get-new-words';
import { chooseGroup} from './get-group';
import { playWrongSound, playCorrectSound } from "./switch-sound";
import { renderAudioCallResults} from "./audio-call-results";
import { countingPercentAnswerRightAudioCall, resetLongestAnswerRightAudioCall } from "./audio-call-statistics";
import { startAudioCallStatistics, giveAudioCallStatistics, resultsAudioCall, countingLongestAnswerRightAudioCall } from './audio-call-statistics';
import { progressBar } from './progress-bar';


import { getUserStatistics, updateUserStatistics } from '../../../../api/statistics';

import { getDate } from '../../../../components/react/get-date';
import { checkDate } from '../../../../components/react/check-date';


import { getUserAggrWord, createUserWord, getUserAggrWordHard,
  getUserAggrWordHardAll, updateUserWord, getUserWordAll, getUserWordById, getUserAggrWordById, getUserAggrWordLearnAll }
from "../../../../api/user-aggregated";

import { reloadPageStatistics } from "../../../../components/react/reload"


//import { pressKeyBoard } from './keybord';

export const body = document.body;
export let audioArray: string [] = []; // исходный массив аудио
export let wordsEnArray: string [] = []; // исходный массив англ слов
export let wordsRusArray: string [] = []; // исходный массив русских слов
export let wordsImgArray: string [] = []; // исходный массив картинок
export let arrTrueAnswer: string [] = []; // массив правильных ответов(рус)
export let arrFalseAnswer: string [] = []; // массив неправильных ответов(рус)
export let arrTrueAnswerEn: string [] = []; // массив правильных ответов(англ для статистики)
export let arrFalseAnswerEn: string [] = []; // массив неправильных ответов(англ для статистики)
export let arrTrueAnswerAudio: string [] = []; // массив правильных ответов(звуки для статистики)
export let arrFalseAnswerAudio: string [] = [];  // массив неправильных ответов(звуки для статистики)
export let arrCopy: string [] = []; // рандомный массив для замешки с ответами

export let arrWordsID: string [] = []; // массив  ID слов
export let arrTrueWordsID: string [] = []; // массив правильных ID слов
export let arrFalseWordsID: string [] = [];  // массив неправильных ID слов




export let pageNum: number = 0; // номер текущей страницы
const lastPage: number = 19; // номер последней страницы
export let progressWidth: number  = 0;

/* получаем данные из другой группы для еще одного массива */
const getRandomAnswers = async () => {
  const words = await getWords(choosePage(0, 5), choosePage(0, 29));
  for (let i = 0; i < 20; i++) {
    arrCopy.push(words[i].wordTranslate);
  }
   arrCopy =  arrCopy.sort(() => Math.random() - 0.5)
};
getRandomAnswers();


/* полная очистка массивов () */
export function clearArrays() {
  audioArray = [];
  wordsEnArray = [];
  wordsRusArray = [];
  wordsImgArray = [];
  arrTrueAnswer = [];
  arrFalseAnswer = [];
  arrTrueAnswerEn = [];
  arrFalseAnswerEn = [];
  arrTrueAnswerAudio = [];
  arrFalseAnswerAudio = [];
}

/*очистка если пользователь захочет сыграть снова*/
export function clearArraysRepeat() {
  pageNum = 0;
  arrTrueAnswer = [];
  arrFalseAnswer = [];
  arrTrueAnswerEn = [];
  arrFalseAnswerEn = [];
  arrTrueAnswerAudio = [];
  arrFalseAnswerAudio = [];
}

export function resetProgressBar() {
  const progressBar = document.querySelector('.progress-bar') as HTMLElement;
  progressWidth = 0;
  return progressBar.style.width = `${progressWidth}%`;
}

/* нажатие на не знаю */
export function nextPage() {
  const target = event.target as HTMLElement;
  const answers = document.querySelectorAll('.answer') as NodeList;

  if ((target as HTMLDivElement).closest('.audion-btn')) {
    if (target.innerText === 'Не знаю') {

      arrFalseAnswer.push(wordsRusArray[pageNum]);
      arrFalseAnswerEn.push(wordsEnArray[pageNum]);
      arrFalseAnswerAudio.push(audioArray[pageNum]);
      arrFalseWordsID.push(arrWordsID[pageNum]);
      resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);

      showAnswer(); // показываем ответ
      playWrongSound(); // проигрываем неправильный звук

      countingPercentAnswerRightAudioCall();
      resetLongestAnswerRightAudioCall();
      giveAudioCallStatistics();

      answers.forEach((el: any) => {
        if (el.innerText === wordsRusArray[pageNum]) {
          el.classList.add('active');
          el.style["pointer-events"] = "none";
        } else {
          el.style.opacity = '0.4';
          el.style["pointer-events"] = "none";
        }
      });

      target.innerText = 'Далее';

    } else if (pageNum < lastPage) {
      pageNum++;
      progressWidth += 5;
      target.innerText = 'Не знаю';
      answers.forEach((el: any) => {
        el.style.color = 'black';
        el.style.opacity = '1';
        el.style.textDecoration = 'none';
        el.classList.remove('active');
        el.classList.remove('event');
        el.style["pointer-events"] = "auto";
      });
      playSound();
      progressBar(progressWidth);
      hideAnswer();
      getNewWords();
    }

    else {
      resetProgressBar();
      renderAudioCallResults();
      getUzas();
    }
  }
};

/*проигрывание звука при нажатии на пробел*/
export function spaceSound(event: KeyboardEvent) {
  const keyPress = event.keyCode;
  if (keyPress === 32) {
    event.preventDefault();
    playSound();
  };
};


/*нажатие на клавиши с не знаю*/
 export function keyPressCheck(event: KeyboardEvent) {
  const keyPress = event.key;
  const answers = document.querySelectorAll('.answer') as NodeList;
  const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

event.preventDefault();

  if (keyPress === '1') {

    if (answers[0].textContent === wordsRusArray[pageNum] ) {
  
      (answers[0] as HTMLElement).className = 'answer active';
      (answers[0] as HTMLElement).style["pointer-events"] = "none";
      
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      arrTrueAnswerEn.push(wordsEnArray[pageNum]);
      arrTrueAnswerAudio.push(audioArray[pageNum]);
      arrTrueWordsID.push(arrWordsID[pageNum]);
  
      resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
      countingLongestAnswerRightAudioCall();
  
      playCorrectSound();
  
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
          el.style["pointer-events"] = "none";
        }
    });
  }
  else {
    (answers[0] as HTMLElement).style.color = 'red';
    (answers[0] as HTMLElement).style.textDecoration = 'line-through';
  
    playWrongSound();
    resetLongestAnswerRightAudioCall();
  
    answers.forEach((el: HTMLElement) => {
    if (el.innerText === wordsRusArray[pageNum]) {
      el.classList.add('active');
      el.style["pointer-events"] = "none";
    }
    else if (el.innerText != wordsRusArray[pageNum]) {
      el.style.opacity = '0.4';
      el.classList.add('event');
      el.style["pointer-events"] = "none";
    }
  });
  arrFalseAnswer.push(wordsRusArray[pageNum]);
  arrFalseAnswerEn.push(wordsEnArray[pageNum]);
  arrFalseAnswerAudio.push(audioArray[pageNum]);
  arrFalseWordsID.push(arrWordsID[pageNum]);
  resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
      }
   
  }
  
  if (keyPress === '2') {
  
    if (answers[1].textContent === wordsRusArray[pageNum] ) {
  
      (answers[1] as HTMLElement).className = 'answer active';
      (answers[1] as HTMLElement).style["pointer-events"] = "none";
  
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      arrTrueAnswerEn.push(wordsEnArray[pageNum]);
      arrTrueAnswerAudio.push(audioArray[pageNum]);
      arrTrueWordsID.push(arrWordsID[pageNum]);
  
      resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
      countingLongestAnswerRightAudioCall();
  
      playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
          el.style["pointer-events"] = "none";
        }
    });
  }
  else {
    (answers[1] as HTMLElement).style.color = 'red';
    (answers[1] as HTMLElement).style.textDecoration = 'line-through';
  
    playWrongSound();
    resetLongestAnswerRightAudioCall();
  
    answers.forEach((el: HTMLElement) => {
    if (el.innerText === wordsRusArray[pageNum]) {
      el.classList.add('active');
      el.style["pointer-events"] = "none";
    }
    else if (el.innerText != wordsRusArray[pageNum]) {
      el.style.opacity = '0.4';
      el.classList.add('event');
      el.style["pointer-events"] = "none";
    }
  });
  arrFalseAnswer.push(wordsRusArray[pageNum]);
  arrFalseAnswerEn.push(wordsEnArray[pageNum]);
  arrFalseAnswerAudio.push(audioArray[pageNum]);
  arrFalseWordsID.push(arrWordsID[pageNum]);
  resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
    }
  }
  
  if (keyPress === '3') {
  
    if (answers[2].textContent === wordsRusArray[pageNum] ) {
  
      (answers[2] as HTMLElement).className = 'answer active';
      (answers[2] as HTMLElement).style["pointer-events"] = "none";
  
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      arrTrueAnswerEn.push(wordsEnArray[pageNum]);
      arrTrueAnswerAudio.push(audioArray[pageNum]);
      arrTrueWordsID.push(arrWordsID[pageNum]);
  
      resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
      countingLongestAnswerRightAudioCall();
  
      playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
          el.style["pointer-events"] = "none";
        }
    });
  }
  else {
    (answers[2] as HTMLElement).style.color = 'red';
    (answers[2] as HTMLElement).style.textDecoration = 'line-through';
  
    playWrongSound();
    resetLongestAnswerRightAudioCall();
  
    answers.forEach((el: HTMLElement) => {
    if (el.innerText === wordsRusArray[pageNum]) {
      el.classList.add('active');
      el.style["pointer-events"] = "none";
    }
    else if (el.innerText != wordsRusArray[pageNum]) {
      el.style.opacity = '0.4';
      el.classList.add('event');
      el.style["pointer-events"] = "none";
    }
  });
  arrFalseAnswer.push(wordsRusArray[pageNum]);
  arrFalseAnswerEn.push(wordsEnArray[pageNum]);
  arrFalseAnswerAudio.push(audioArray[pageNum]);
  arrFalseWordsID.push(arrWordsID[pageNum]);
  resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
    }
  }
  
  if (keyPress == '4') {
  
    if (answers[3].textContent === wordsRusArray[pageNum] ) {
  
      (answers[3] as HTMLElement).className = 'answer active';
      (answers[3] as HTMLElement).style["pointer-events"] = "none";
  
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      arrTrueAnswerEn.push(wordsEnArray[pageNum]);
      arrTrueAnswerAudio.push(audioArray[pageNum]);
      arrTrueWordsID.push(arrWordsID[pageNum]);
  
      resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
      countingLongestAnswerRightAudioCall();
  
      playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
          el.style["pointer-events"] = "none";
        }
    });
  }
  else {
    (answers[3] as HTMLElement).style.color = 'red';
    (answers[3] as HTMLElement).style.textDecoration = 'line-through';
  
    playWrongSound();
    resetLongestAnswerRightAudioCall();
  
    answers.forEach((el: HTMLElement) => {
    if (el.innerText === wordsRusArray[pageNum]) {
      el.classList.add('active');
      el.style["pointer-events"] = "none";
    }
    else if (el.innerText != wordsRusArray[pageNum]) {
      el.style.opacity = '0.4';
      el.classList.add('event');
      el.style["pointer-events"] = "none";
    }
  });
  arrFalseAnswer.push(wordsRusArray[pageNum]);
  arrFalseAnswerEn.push(wordsEnArray[pageNum]);
  arrFalseAnswerAudio.push(audioArray[pageNum]);
  arrFalseWordsID.push(arrWordsID[pageNum]);
  resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
    }
  }
  if (keyPress == '5') {
  
    if (answers[4].textContent === wordsRusArray[pageNum] ) {
  
      (answers[4] as HTMLElement).className = 'answer active';
      (answers[4] as HTMLElement).style["pointer-events"] = "none";
  
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      arrTrueAnswerEn.push(wordsEnArray[pageNum]);
      arrTrueAnswerAudio.push(audioArray[pageNum]);
      arrTrueWordsID.push(arrWordsID[pageNum]);
  
      resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
      countingLongestAnswerRightAudioCall();
  
      playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
          el.style["pointer-events"] = "none";
        }
    });
  }
  else {
    (answers[4] as HTMLElement).style.color = 'red';
    (answers[4] as HTMLElement).style.textDecoration = 'line-through';
  
    playWrongSound();
    resetLongestAnswerRightAudioCall();
  
    answers.forEach((el: HTMLElement) => {
    if (el.innerText === wordsRusArray[pageNum]) {
      el.classList.add('active');
      el.style["pointer-events"] = "none";
    }
    else if (el.innerText != wordsRusArray[pageNum]) {
      el.style.opacity = '0.4';
      el.classList.add('event');
      el.style["pointer-events"] = "none";
    }
  });
  arrFalseAnswer.push(wordsRusArray[pageNum]);
  arrFalseAnswerEn.push(wordsEnArray[pageNum]);
  arrFalseAnswerAudio.push(audioArray[pageNum]);
  arrFalseWordsID.push(arrWordsID[pageNum]);
  resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
    }
  }
  showAnswer();
  progressBar(progressWidth);
  countingPercentAnswerRightAudioCall();
  giveAudioCallStatistics();
  knowBtn.innerText = 'Далее';
};

body.addEventListener('change', chooseGroup);
body.addEventListener('click', renderGameAudioPage);
startAudioCallStatistics();


function getUzas() {

  if(!localStorage.getItem('token')){

  let percentAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

  let longestAnswerRightSprint = +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

  let percentRightAudioCall = JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall || 0;

  let LongestAnswerRightAudioCall = +JSON.parse(localStorage.getItem('audioCallStatistics'))?.longestAnswerRightAudioCall || 0;

  let percentAnswerForDay: Number = (percentAnswerRightSprint + percentRightAudioCall) / 2 || percentAnswerRightSprint || percentRightAudioCall || 0;


    let currentDate = getDate();

    let startDate = checkDate();

    if(currentDate != startDate) {
      percentAnswerForDay = 0 ;
    }

   } if(localStorage.getItem('token')) {

    let startDate = checkDate();

    let userId = localStorage.getItem('userId');

    const getDateAsyncCompare = async () => {

      let LearnWord = await getUserAggrWordLearnAll(userId);



      let data = await checkDate();

      let percentAnswerRightSprint = data.optional.percentAnswerRightSprint || JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

      let longestAnswerRightSprint = data.optional.longestAnswerRightSprint || +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

      let percentRightAudioCall = data.optional.percentRightAudioCall || +localStorage.getItem('percentRightAudioCall') || 0;

      let LongestAnswerRightAudioCall = data.optional.LongestAnswerRightAudioCall || localStorage.getItem('LongestAnswerRightAudioCall') || 0;

      let percentAnswerForDay: Number = +data.optional.percentAnswerForDay || (( percentAnswerRightSprint == 0) || (percentRightAudioCall == 0)) ? +percentAnswerRightSprint ||  +percentRightAudioCall : ((percentAnswerRightSprint + percentRightAudioCall) / 2) || 0;

      //localStorage.percentAnswerForDay = percentAnswerForDay;


      let currentDate = getDate();

      let stateStatist;


      data = await getUserStatistics(userId);


      if(currentDate != data.optional.startDate) {
        percentAnswerForDay = 0 ;
        localStorage.percentAnswerForDay = percentAnswerForDay;
        localStorage.startDate = currentDate;
        data.optional.startDate = localStorage.startDate;
      }



      let wordsCorrectAnswers = JSON.parse(localStorage.getItem('audioCallStatistics'))?.wordsCorrectAnswers || [];
      let wordsWrongAnswers = JSON.parse(localStorage.getItem('audioCallStatistics'))?.wordsWrongAnswers || [];

      let newWordSprintSum = data?.optional?.newWordSprintSum;

      localStorage.flagTry = 0;


       let arrCountRight = [];

       let arrCountWrong = [];

       localStorage.data = JSON.stringify(data);

      let currentCorrectWordUser = wordsCorrectAnswers.map(async item => {


        let stateUser = {
          userId: localStorage.getItem('userId'),
          wordId: item._id,
        }

        const wordUserCount = await getUserWordById(stateUser);

        let wrongCount = localStorage.getItem('wrongCount') || wordUserCount?.optional?.wrongCount;


        let rightCount = wordUserCount?.optional?.rightCount ?? 0;


         stateStatist = {
          userId: localStorage.getItem('userId'),
          statistics: {
            "optional": {
              startDate: data.optional.startDate || startDate,
              percentAnswerRightSprint: JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || data.optional.percentAnswerRightSprint,
              longestAnswerRightSprint: +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || data.optional.longestAnswerRightSprint,
              percentRightAudioCall: +localStorage.getItem('percentRightAudioCall') || data.optional.percentRightAudioCall,
              LongestAnswerRightAudioCall: localStorage.getItem('LongestAnswerRightAudioCall') || data.optional.LongestAnswerRightAudioCall,
              percentAnswerForDay: percentAnswerForDay || data.optional.percentAnswerForDay,
              newWordSprintSum: newWordSprintSum || 0,
              LearnWord: LearnWord.length,
              // rightCount: rightCount,
              // wrongCount: wrongCount,
            }
          }
        };



        let state;

            state = {
            userId: localStorage.getItem('userId'),
            wordId: item._id,
            word: { "difficulty": "easy", "optional": {testFieldString: 'test', testFieldBoolean: true, rightCount: ++rightCount, wrongCount: wrongCount} }
           }

           localStorage.rightCount = state.word.optional.rightCount;

          localStorage.state = JSON.stringify(state);

          arrCountRight.push(state);

        if (createUserWord(state).then(reject => reject)) {
          updateUserWord(state);
        } else {
          createUserWord(state);
          updateUserWord(state);
        }
        updateUserStatistics(stateStatist);

        data = await getUserStatistics(userId);
        localStorage.data = JSON.stringify(data);
      })


      localStorage.arrCountRight = JSON.stringify(arrCountRight);

      let currentWrongWordUser = wordsWrongAnswers.map(async item => {


         let stateUser = {
          userId: localStorage.getItem('userId'),
          wordId: item._id,
        }

        const wordUserCount = await getUserWordById(stateUser);

        let rightCount = localStorage.getItem('rightCount') || wordUserCount?.optional?.rightCount;

        let wrongCount = wordUserCount?.optional?.wrongCount ?? 0;


        stateStatist = {
          userId: localStorage.getItem('userId'),
          statistics: {
            "optional": {
              startDate: data.optional.startDate || startDate,
              percentAnswerRightSprint: JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || data.optional.percentAnswerRightSprint,
              longestAnswerRightSprint: +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || data.optional.longestAnswerRightSprint,
              percentRightAudioCall: +localStorage.getItem('percentRightAudioCall') || data.optional.percentRightAudioCall,
              LongestAnswerRightAudioCall: localStorage.getItem('LongestAnswerRightAudioCall') || data.optional.LongestAnswerRightAudioCall,
              percentAnswerForDay: percentAnswerForDay || data.optional.percentAnswerForDay,
              newWordSprintSum: newWordSprintSum || 0,
              LearnWord: LearnWord.length,

              // rightCount: rightCount,
              // wrongCount: wrongCount,
            }
          }
        };



            let state = {
            userId: localStorage.getItem('userId'),
            wordId: item._id,
            word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: true, wrongCount: ++wrongCount , rightCount: rightCount} }
          }

          localStorage.wrongCount = state.word.optional.wrongCount;


           arrCountWrong.push(state);


        if (createUserWord(state).then(reject => reject)) {
          updateUserWord(state);
        } else {
          createUserWord(state);
          updateUserWord(state);
        }


        updateUserStatistics(stateStatist);
        data = await getUserStatistics(userId);
        localStorage.data = JSON.stringify(data);
      });

      localStorage.arrCountWrong = JSON.stringify(arrCountWrong);

     data = await getUserStatistics(userId);

     localStorage.data = JSON.stringify(data);

  }

  getDateAsyncCompare();

  }

  }
