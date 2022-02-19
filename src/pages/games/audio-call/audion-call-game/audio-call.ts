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
  getUserAggrWordHardAll, updateUserWord, getUserWordAll, getUserWordById, getUserAggrWordById}
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
export let progressWidth  = 0

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

/*нажатие на клавиши
 export function keyPressCheck(event: KeyboardEvent) {
  const keyPress = event.keyCode;
  const answers = document.querySelectorAll('.answer') as NodeList;
  const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

  if (knowBtn.innerHTML === 'Не знаю' && keyPress === 13) {
    event.preventDefault();
      arrFalseAnswer.push(wordsRusArray[pageNum]);
      showAnswer();
      playWrongSound();
      answers.forEach((el: any) => {
        if (el.innerText === wordsRusArray[pageNum]) {
          el.classList.add('active');
        } else {
          el.style.opacity = '0.4';
        }
      });
      knowBtn.innerText = 'Далее';
  }
  else if (pageNum < lastPage) {
    pageNum++;
    knowBtn.innerHTML = 'Не знаю';
    answers.forEach((el: any) => {
      el.style.color = 'black';
      el.style.opacity = '1';
      el.style.textDecoration = 'none';
      el.classList.remove('active');
      el.classList.remove('event');
    });
    playSound();
    hideAnswer();
    getNewWords();
  }
  else {
    renderAudioCallResults();
  }
}
*/

/*проигрывание звука при нажатии на пробел*/
export function spaceSound(event: KeyboardEvent) {
  const keyPress = event.keyCode;
  if( keyPress === 32) {
    event.preventDefault();
    playSound();
  }
}

/*
export function answersKeybord(event: KeyboardEvent) {
  const keyPress:any = event.key;
  const answers = document.querySelectorAll('.answer') as NodeList;
  const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

 if (keyPress == 1) {

  if (answers[0].textContent === wordsRusArray[pageNum] ) {

    (answers[0] as HTMLElement).style.color = 'green';
    console.log(answers[0]);
    console.log('true')

    arrTrueAnswer.push(wordsRusArray[pageNum]);

    playCorrectSound();

    answers.forEach((el: HTMLElement) => {
      if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
  });
}
else {
  (answers[0] as HTMLElement).style.color = 'red';
  //target.style.textDecoration = 'line-through';
  playWrongSound();

  answers.forEach((el: HTMLElement) => {
  if (el.innerText === wordsRusArray[pageNum]) {
    el.classList.add('active');
  }
  else if (el.innerText != wordsRusArray[pageNum]) {
    el.style.opacity = '0.4';
    el.classList.add('event');
  }
})
arrFalseAnswer.push(wordsRusArray[pageNum]);
}
 }
showAnswer();
knowBtn.innerText = 'Далее';
}

document.addEventListener('keypress', answersKeybord)


//body.addEventListener('keypress', keyPressCheck);
*/
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

      let data = await checkDate();

      let percentAnswerRightSprint = data.optional.percentAnswerRightSprint || JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

      let longestAnswerRightSprint = data.optional.longestAnswerRightSprint || +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

      let percentRightAudioCall = data.optional.percentRightAudioCall || +localStorage.getItem('percentRightAudioCall') || 0;

      let LongestAnswerRightAudioCall = data.optional.LongestAnswerRightAudioCall || localStorage.getItem('LongestAnswerRightAudioCall') || 0;

      let percentAnswerForDay: Number = data.optional.percentAnswerForDay || percentAnswerRightSprint || percentRightAudioCall ||  (percentAnswerRightSprint + percentRightAudioCall) / 2 || 0;

      localStorage.percentAnswerForDay = percentAnswerForDay;


      let currentDate = getDate();

      let stateStatist;

      //console.log(currentDate)



      data = await getUserStatistics(userId);

      //console.log(data.optional.startDate)

      if(currentDate != data.optional.startDate) {
        percentAnswerForDay = 0 ;
        localStorage.percentAnswerForDay = percentAnswerForDay;
        localStorage.startDate = currentDate;
        data.optional.startDate = localStorage.startDate;
      }



      let wordsCorrectAnswers = JSON.parse(localStorage.getItem('SprintStatistics'))?.wordsCorrectAnswers || [];
      let wordsWrongAnswers = JSON.parse(localStorage.getItem('SprintStatistics'))?.wordsWrongAnswers || [];

      localStorage.flagTry = 0;

      // let rightCount = 0;
      // let wrongCount = 0;

       let arrCountRight = [];

       let arrCountWrong = [];

      let currentCorrectWordUser = wordsCorrectAnswers.map(async item => {


        // if(JSON.parse(localStorage.getItem('arrCountRight'))) {
        //   for(let i = 0; i < JSON.parse(localStorage.getItem('arrCountRight')).length -1; i++) {
        //     if(item.id == JSON.parse(localStorage.getItem('arrCountRight'))[i].userId) {
        //      rightCount = JSON.parse(localStorage.getItem('arrCountRight'))[i].word.optional.rightCount;
        //      //flagTry = JSON.parse(localStorage.getItem('arrCountRight'))[i].word.optional.flagTry;
        //     }
        //   }
        // }


        let stateUser = {
          userId: localStorage.getItem('userId'),
          wordId: item.id,
        }

        //const wordUserCount = await getUserAggrWordById(stateUser);

        //let rightCount = wordUserCount?.userWord?.optional?.rightCount ?? 0;

        const wordUserCount = await getUserWordById(stateUser);

        let wrongCount = localStorage.getItem('wrongCount') || wordUserCount?.optional?.wrongCount;

        //let rightCount = localStorage.getItem('rightCount') ?? wordUserCount?.optional?.rightCount ?? 0;

        let rightCount = wordUserCount?.optional?.rightCount ?? 0;

        console.log(rightCount);

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
              // rightCount: rightCount,
              // wrongCount: wrongCount,
            }
          }
        };

        //  localStorage.rightCount = rightCount;

        let state;

            state = {
            userId: localStorage.getItem('userId'),
            wordId: item.id,
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
      })


      localStorage.arrCountRight = JSON.stringify(arrCountRight);



      let currentWrongWordUser = wordsWrongAnswers.map(async item => {


         let stateUser = {
          userId: localStorage.getItem('userId'),
          wordId: item.id,
        }

        //const wordUserCount = await getUserAggrWordById(stateUser);

        const wordUserCount = await getUserWordById(stateUser);

        let rightCount = localStorage.getItem('rightCount') || wordUserCount?.optional?.rightCount;



        let wrongCount = wordUserCount?.optional?.wrongCount ?? 0;

        console.log(wrongCount);

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
              // rightCount: rightCount,
              // wrongCount: wrongCount,
            }
          }
        };



        // if(JSON.parse(localStorage.getItem('arrCountWrong'))) {
        //   for(let i = 0; i < JSON.parse(localStorage.getItem('arrCountWrong')).length -1; i++) {
        //     if(item.id == JSON.parse(localStorage.getItem('arrCountWrong'))[i].userId) {
        //       wrongCount = JSON.parse(localStorage.getItem('arrCountWrong'))[i].word.optional.wrongCount;
        //     }
        //   }
        // }

            let state = {
            userId: localStorage.getItem('userId'),
            wordId: item.id,
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
      });

      localStorage.arrCountWrong = JSON.stringify(arrCountWrong);

     data = await getUserStatistics(userId);

     localStorage.data = JSON.stringify(data);

     console.log(data)

  console.log("uzas");

  }


  reloadPageStatistics();
  getDateAsyncCompare();

  }

  }
