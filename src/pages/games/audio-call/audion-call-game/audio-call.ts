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

import { disable, enable } from './disable-keyboard';
import { getUserStatistics, updateUserStatistics } from '../../../../api/statistics';
import { getDate } from '../../../../components/react/get-date';
import { checkDate } from '../../../../components/react/check-date';
import { getUserAggrWord, createUserWord, getUserAggrWordHard,
  getUserAggrWordHardAll, updateUserWord, getUserWordAll, getUserWordById, getUserAggrWordById, getUserAggrWordLearnAll }
from "../../../../api/user-aggregated";

import { reloadPageStatistics } from "../../../../components/react/reload"


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
export async function nextPageEnter(event:KeyboardEvent) {
  const keyPress: number = event.keyCode;
  const answers = document.querySelectorAll('.answer') as NodeList;
  const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

  if (keyPress === 13 && knowBtn.innerText === 'Не знаю' ) {

      disable();

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
          el.classList.add('event');
        } else {
          el.style.opacity = '0.4';
          el.classList.add('event');
        };
      });

      knowBtn.innerText = 'Далее';
    }
    else if ( keyPress === 13 && knowBtn.innerText === 'Далее') {
      pageNum++;
      progressWidth += 5;
      knowBtn.innerText = 'Не знаю';
      answers.forEach((el: any) => {
        el.classList.remove('active');
        el.classList.remove('event');
        el.style.color = 'black';
        el.style.opacity = '1';
        el.style.textDecoration = 'none';
      });
      enable();
      playSound();
      progressBar(progressWidth);
      hideAnswer();
      getNewWords();
    }
    if (pageNum > lastPage ) {
      resetProgressBar();
      renderAudioCallResults();
      getUzas();
    }
  };



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
          el.classList.add('event');
        } else {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
      });

      target.innerText = 'Далее';

    } else if (pageNum < lastPage) {
      pageNum++;
      progressWidth += 5;
      target.innerText = 'Не знаю';
      answers.forEach((el: any) => {
        el.classList.remove('active');
        el.classList.remove('event');
        el.style.color = 'black';
        el.style.opacity = '1';
        el.style.textDecoration = 'none';
      });
      enable();
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

      let percentAnswerRightAudioCall = data.optional.percentAnswerRightAudioCall || +JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall || 0;

      let LongestAnswerRightAudioCall = data.optional.longestAnswerRightAudioCall || +JSON.parse(localStorage.getItem('audioCallStatistics'))?.longestAnswerRightAudioCall || 0;

      let percentAnswerForDay: Number = +data.optional.percentAnswerForDay || (( percentAnswerRightSprint == 0) || (percentAnswerRightAudioCall == 0)) ? +percentAnswerRightSprint ||  +percentAnswerRightAudioCall : ((percentAnswerRightSprint + percentAnswerRightAudioCall) / 2) || 0;

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

      //let newWordAudioCallSum = data?.optional?.newWordSprintSum || +JSON.parse(localStorage.getItem('SprintStatistics'))?.isUserWord || 0;
      //let newWordSprintSum = data?.optional?.newWordSprintSum;

      let newWordAudioCallSum = 0;
          let newWordSprint = 0;
      let newWordForDaySum = 0 || +localStorage.getItem('newWordForDaySum');
      //let newWordSprint = +JSON.parse(localStorage.getItem('SprintStatistics'))?.isUserWord || 0;


      // newWordSprintSum += +newWordSprint;

      //   let newWordForDay = +newWordSprintSum;

      //   newWordForDaySum += newWordForDay;

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
              percentAnswerRightAudioCall: +JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall || data.optional.percentAnswerRightAudioCall,
              LongestAnswerRightAudioCall: +JSON.parse(localStorage.getItem('audioCallStatistics'))?.longestAnswerRightAudioCall || data.optional.longestAnswerRightAudioCall,
              percentAnswerForDay: percentAnswerForDay || data.optional.percentAnswerForDay,
              newWordAudioCallSum: 0,
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
              percentAnswerRightAudioCall: +JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall || data.optional.percentAnswerRightAudioCall,
              LongestAnswerRightAudioCall: +JSON.parse(localStorage.getItem('audioCallStatistics'))?.longestAnswerRightAudioCall || data.optional.longestAnswerRightAudioCall,
              percentAnswerForDay: percentAnswerForDay || data.optional.percentAnswerForDay,
              newWordAudioCallSum: 0,
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
