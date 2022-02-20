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
    }
  }
};

/* нажатие на не знаю 
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
        }
      });

      knowBtn.innerText = 'Далее';

    }
    else if (pageNum < lastPage && keyPress === 13 &&  knowBtn.innerText === 'Далее') {
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
     enable()
      playSound();
      progressBar(progressWidth);
      hideAnswer();
      getNewWords();
    }

    else {
      resetProgressBar();
      renderAudioCallResults();
    }
  };
*/

body.addEventListener('change', chooseGroup);
body.addEventListener('click', renderGameAudioPage);
startAudioCallStatistics();
