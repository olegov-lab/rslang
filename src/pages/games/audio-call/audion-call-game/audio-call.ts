import { getWords } from "../../../../api/api";
import { renderGameAudioPage } from "./render-audio-call-page";
import { choosePage} from "./get-page";

const body = document.body;
let audioArray = [];
let wordsEnArray = [];
let wordsRusArray = [];
let wordsImgArray = [];
let arrTrueAnswer = [];
let arrFalseAnswer = [];
let arrCopy = [];

let pageNum: number = 0;
const lastPage: number = 19;

const getPageAndGroup = async (a = 0, b = 0) => {
  const words = await getWords(a, b);
  for (let i = 0; i < 20; i++) {
    audioArray.push(words[i].audio);
    wordsEnArray.push(words[i].word);
    wordsRusArray.push(words[i].wordTranslate);
    wordsImgArray.push(words[i].image);
  }
};
getPageAndGroup();

const getRandomAnswers = async () => {
  const words = await getWords(choosePage(0, 5), choosePage(0, 29));
  for (let i = 0; i < 20; i++) {
    arrCopy.push(words[i].wordTranslate);
  }
};
getRandomAnswers();

/*выбор группы слова*/
function chooseGroup() {
  const gameAudioDesc = document.querySelector('.select-audio-play-difficulty') as HTMLInputElement;
  const group = +gameAudioDesc.value;

  getPageAndGroup(choosePage(0, 29), group);
};
body.addEventListener('change', chooseGroup);

body.addEventListener('click', renderGameAudioPage);