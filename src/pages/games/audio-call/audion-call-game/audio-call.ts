import './audio-call.css';
import { getWords } from "../../../../api/api";
import { choosePage} from "./get-page";
import {showAnswer} from "./show-answer";
import { renderGameAudioPage } from "./render-audio-call-page";
import {hideAnswer} from "./hide-answer";
import {playSound} from './play-word-audio';
import {getNewWords} from './get-new-words';
import { chooseGroup} from './get-group';
import { playWrongSound } from "./switch-sound";

const body = document.body;
export let audioArray: string [] = [];
export let wordsEnArray: string [] = [];
export let wordsRusArray: string [] = [];
export let wordsImgArray: string [] = [];
export let arrTrueAnswer: string [] = [];
export let arrFalseAnswer: string [] = [];
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
}

/* нажатие на не знаю */
export function nextPage() {
  const target = event.target as HTMLElement;
  const answers = document.querySelectorAll('.answer') as NodeList;

  if ((target as HTMLDivElement).closest('.audion-btn')) {
    if (target.innerText === 'Не знаю') {
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
      target.innerText = 'Далее';
    } else if (pageNum < 19) {
      pageNum++;
      target.innerText = 'Не знаю';
      answers.forEach((el: any) => {
        el.style.color = 'black';
        el.style.opacity = '1';
        el.style.textDecoration = 'none';
        el.classList.remove('active');
        el.classList.remove('event');
      })
      playSound();
      hideAnswer();
      getNewWords();
    }
    else {
      console.log('end')
    }
  }
};


body.addEventListener('change', chooseGroup);
body.addEventListener('click', renderGameAudioPage);

