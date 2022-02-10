import './audio-call.css';
import { getWords } from "../../../../api/api";
import { choosePage} from "./get-page";
import {showAnswer} from "./show-answer";
import { renderGameAudioPage } from "./render-audio-call-page";
import {hideAnswer} from "./hide-answer";
import { chooseGroup} from './get-group'

const body = document.body;
export let audioArray = [];
export let wordsEnArray = [];
export let wordsRusArray = [];
export let wordsImgArray = [];
export let arrTrueAnswer = [];
export let arrFalseAnswer = [];
export let arrCopy = [];

export let pageNum: number = 0;
const lastPage: number = 19;

/* получаем данные */
export const getPageAndGroup = async (a = 0, b = 0) => {
  const words = await getWords(a, b);
  clearArrays();

  for (let i = 0; i < 20; i++) {
    audioArray.push(words[i].audio);
    wordsEnArray.push(words[i].word);
    wordsRusArray.push(words[i].wordTranslate);
    wordsImgArray.push(words[i].image);
  }
};
getPageAndGroup();

/* получаем данные из другой группы для еще одного массива */
const getRandomAnswers = async () => {
  const words = await getWords(choosePage(0, 5), choosePage(0, 29));
  for (let i = 0; i < 20; i++) {
    arrCopy.push(words[i].wordTranslate);
  }
};
getRandomAnswers();

/* очистка массивов */
function clearArrays() {
  audioArray = [];
  wordsEnArray = [];
  wordsRusArray = [];
  wordsImgArray = [];
  arrTrueAnswer = [];
  arrFalseAnswer = [];
}


body.addEventListener('change', chooseGroup);
body.addEventListener('click', renderGameAudioPage);

