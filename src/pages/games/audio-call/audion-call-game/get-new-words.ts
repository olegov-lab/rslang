import {choosePage} from './get-page';
import { arrCopy, wordsRusArray, pageNum } from './audio-call';
/*получение новых слов*/
export function getNewWords() {
    const answers = document.querySelectorAll('.answer');
    answers[0].innerHTML = arrCopy[choosePage(0, 19)];
    answers[1].innerHTML = arrCopy[choosePage(0, 19)];
    answers[2].innerHTML = arrCopy[choosePage(0, 19)];
    answers[3].innerHTML = arrCopy[choosePage(0, 19)];
    answers[4].innerHTML = arrCopy[choosePage(0, 19)];
    answers[choosePage(0, 4)].innerHTML = wordsRusArray[pageNum];
  };