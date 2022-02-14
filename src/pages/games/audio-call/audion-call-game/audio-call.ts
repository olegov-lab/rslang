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
//import { pressKeyBoard } from './keybord';

export const body = document.body;
export let audioArray: string [] = [];
export let wordsEnArray: string [] = [];
export let wordsRusArray: string [] = [];
export let wordsImgArray: string [] = [];
export let arrTrueAnswer: string [] = [];
export let arrFalseAnswer: string [] = [];
export let arrTrueAnswerEn: string [] = [];
export let arrFalseAnswerEn: string [] = [];
export let arrTrueAnswerAudio: string [] = [];
export let arrFalseAnswerAudio: string [] = [];
export let arrCopy: string [] = [];


export let pageNum: number = 0;
const lastPage: number = 19;


/* получаем данные из другой группы для еще одного массива */
const getRandomAnswers = async () => {
  const words = await getWords(choosePage(0, 5), choosePage(0, 29));
  for (let i = 0; i < 20; i++) {
    arrCopy.push(words[i].wordTranslate);
  }
   arrCopy =  arrCopy.sort(() => Math.random() - 0.5)
};
getRandomAnswers();


/* очистка массивов */
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
  arrFalseAnswerAudio= [];
}

/*очистка если пользователь заъочет сыграть снова*/ 
export function clearArraysRepeat() {
  pageNum = 0;
  arrTrueAnswer = [];
  arrFalseAnswer = [];
  arrTrueAnswerEn = [];
  arrFalseAnswerEn = [];
  arrTrueAnswerAudio = [];
  arrFalseAnswerAudio = [];
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
      showAnswer();
      playWrongSound();
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
      hideAnswer();
      getNewWords();
    }
    else {
      renderAudioCallResults();
    }
  }
};

/*нажатие на клавиши*/
 export function keyPressCheck(event: KeyboardEvent) {
  const keyPress = event.keyCode;
  const answers = document.querySelectorAll('.answer') as NodeList;
  const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

  if (knowBtn.innerHTML === 'Не знаю' && keyPress === 13) {
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
    console.log(pageNum)
  }
  else {
    renderAudioCallResults();
  }
}

/*проигрывание звука при нажатии на пробел*/
export function spaceSound(event: KeyboardEvent) {
  const keyPress = event.keyCode;
  if( keyPress === 32) {
    event.preventDefault();
    playSound();
  }
}


body.addEventListener('keypress', keyPressCheck);
body.addEventListener('change', chooseGroup);
body.addEventListener('click', renderGameAudioPage);
