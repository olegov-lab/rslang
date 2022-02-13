import {clearArrays, audioArray, wordsEnArray, wordsRusArray, wordsImgArray} from './audio-call';
import { getWords } from '../../../../api/api';

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
    console.log(wordsRusArray)
  };
  getPageAndGroup();