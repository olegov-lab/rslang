import { clearArrays, audioArray, wordsEnArray, wordsRusArray, wordsImgArray, arrWordsID} from './audio-call';
import {  getWords } from '../../../../api/api';

import { getUserAggrWord } from "../../../../api/user-aggregated";

/* получаем данные */
export const getPageAndGroup = async (group = 0, page = 0) => {

  /* данные из локала стоража */
  let userId: string = localStorage.getItem('userId');
  let storageGroup: string = localStorage.getItem('group');
  let storagePage: string = localStorage.getItem('page');

  /* локал стораж для авторизованного */
  let state = {
    userId: localStorage.getItem('userId'),
    group:  localStorage.getItem('group'),
    page: localStorage.getItem('page')
  }

  /*если путь через словарь */
  if (localStorage.getItem('gameSource') === 'dictionary') {
    /* для юзера */
    if (localStorage.getItem('token')) {

      const words = await getUserAggrWord(state);
      clearArrays();

      for (let i = 0; i < 20; i++) {
        arrWordsID.push(words[i]._id);
        audioArray.push(words[i].audio);
        wordsEnArray.push(words[i].word);
        wordsRusArray.push(words[i].wordTranslate);
        wordsImgArray.push(words[i].image);
      }
     console.log("есть токена, дикт " + arrWordsID)
    } else { // для анонима

      const words = await getWords(+storageGroup, +storagePage);
      clearArrays();

      for (let i = 0; i < 20; i++) {
        arrWordsID.push(words[i].id);
        audioArray.push(words[i].audio);
        wordsEnArray.push(words[i].word);
        wordsRusArray.push(words[i].wordTranslate);
        wordsImgArray.push(words[i].image);
      }
      console.log(`нет токена, дикт ${arrWordsID}`)
    }
  } else { // не через словарь
      /* для юзера */
    if (localStorage.getItem('token')) {

      const words = await getUserAggrWord({ userId, group, page });
      clearArrays();

      for (let i = 0; i < 20; i++) {
        arrWordsID.push(words[i]._id);
        audioArray.push(words[i].audio);
        wordsEnArray.push(words[i].word);
        wordsRusArray.push(words[i].wordTranslate);
        wordsImgArray.push(words[i].image);
      }
      console.log("есть токен, нав " + arrWordsID)
    }
      else { // для анонима
        const words = await getWords(group, page);
        clearArrays();
        for (let i = 0; i < 20; i++) {
          arrWordsID.push(words[i].id);
          audioArray.push(words[i].audio);
          wordsEnArray.push(words[i].word);
          wordsRusArray.push(words[i].wordTranslate);
          wordsImgArray.push(words[i].image);
        }
        console.log("нет токена, нав " + arrWordsID)
      }
    }
  };
  getPageAndGroup();