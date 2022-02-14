import {choosePage} from './get-page';
import { arrCopy, wordsRusArray, pageNum } from './audio-call';
/*получение новых слов*/
export function getNewWords() {
    const answers = document.querySelectorAll('.answer');
    answers[0].innerHTML = arrCopy[0];
    answers[1].innerHTML = arrCopy[1];
    answers[2].innerHTML = arrCopy[2];
    answers[3].innerHTML = arrCopy[3];
    answers[4].innerHTML = arrCopy[4];
    answers[choosePage(0, 4)].innerHTML = wordsRusArray[pageNum];
    shuffle(arrCopy);
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }