import { clearArrays, audioArray, wordsEnArray, wordsRusArray, wordsImgArray, arrWordsID} from './audio-call';
import {  getWords } from '../../../../api/api';

import { getUserAggrWord } from "../../../../api/user-aggregated";

/* получаем данные */
export const getPageAndGroup = async (a = 0, b = 0) => {

/* сделано для перехода из учебника по мини играм */
  let storageGroup = localStorage.getItem('group'); 
  let storagePage = localStorage.getItem('page'); 
  
  /* для юзера */
  let state = {
    userId: 'string',
    group:  1,// попробовал так, но тоже что то ничего
    page: 2
  }

  /* для юзера */
  if(true) {
    const words = await getUserAggrWord(state) 
    clearArrays();
    for (let i = 0; i < 20; i++) {
      arrWordsID.push(words[i].id);
      audioArray.push(words[i].audio);
      wordsEnArray.push(words[i].word);
      wordsRusArray.push(words[i].wordTranslate);
      wordsImgArray.push(words[i].image);
    }
    console.log(arrWordsID)
    
  }
    /* для анонима */
  if (localStorage.getItem('gameSource') === 'dictionary') {
    const words = await getWords(+storageGroup, +storagePage);
   clearArrays();
    for (let i = 0; i < 20; i++) {
      arrWordsID.push(words[i].id);
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
      arrWordsID.push(words[i].id);
      audioArray.push(words[i].audio);
      wordsEnArray.push(words[i].word);
      wordsRusArray.push(words[i].wordTranslate);
      wordsImgArray.push(words[i].image);
    }
  }
    
  
  
};
getPageAndGroup();

