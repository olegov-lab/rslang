import { clearArrays, audioArray, wordsEnArray, wordsRusArray, wordsImgArray} from './audio-call';
import {  getWords } from '../../../../api/api';

import { getUserAggrWord } from "../../../../api/user-aggregated";

/* получаем данные */
export const getPageAndGroup = async (a = 0, b = 0) => {

/* сделано для перехода из учебника по мини играм */
  console.log(localStorage.getItem('gameSource')); 
  let storageGroup = localStorage.getItem('group'); 
  let storagePage = localStorage.getItem('page'); 
  

  if (localStorage.getItem('gameSource') === 'dictionary') {
    const words = await getWords(+storageGroup, +storagePage);
    clearArrays();
    for (let i = 0; i < 20; i++) {
      audioArray.push(words[i].audio);
      wordsEnArray.push(words[i].word);
      wordsRusArray.push(words[i].wordTranslate);
      wordsImgArray.push(words[i].image);
    }
  }
  else {
    const words = await getWords(a, b);
    clearArrays();
    for (let i = 0; i < 20; i++) {
      audioArray.push(words[i].audio);
      wordsEnArray.push(words[i].word);
      wordsRusArray.push(words[i].wordTranslate);
      wordsImgArray.push(words[i].image);
    }
  }
};
getPageAndGroup();

