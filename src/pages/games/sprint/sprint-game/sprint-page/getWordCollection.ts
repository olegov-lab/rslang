/* eslint-disable no-underscore-dangle */
import { getWords } from '../../../../../api/api';
import { getUserAggrWord } from '../../../../../api/user-aggregated';
import { sprintData } from './sprintData';

const getWordsCollection = async (group = 0, page = 0) => {
  const words = await getWords(group, page);
  return words;
};

const getWordsCollectionUser = async (userId: string, group = 0, page = 0) => {
  const words = await getUserAggrWord({ userId, group, page });
  return words;
};

function createSprintData(words) {
  console.log(words);
  for (const variable in words) {
    if ({}.hasOwnProperty.call(words, variable)) {
      const currentIndex = Number(variable);
      const randomBullean = Math.random() < 0.5;
      if (randomBullean) {
        sprintData.currentWordsKit.push({
          id: words[currentIndex].id || words[currentIndex]._id,
          word: words[currentIndex].word,
          translate: words[currentIndex].wordTranslate,
          correctTranslate: words[currentIndex].wordTranslate,
          audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words[currentIndex].audio}`,
          answer: true,
          userWord: words[currentIndex].userWord,
        });
      } else {
        const res = currentIndex < 19
          ? sprintData.currentWordsKit.push({
            id: words[currentIndex].id || words[currentIndex]._id,
            word: words[currentIndex].word,
            translate: words[currentIndex + 1].wordTranslate,
            correctTranslate: words[currentIndex].wordTranslate,
            audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words[currentIndex].audio}`,
            answer: false,
            userWord: words[currentIndex].userWord,
          })
          : sprintData.currentWordsKit.push({
            id: words[currentIndex].id || words[currentIndex]._id,
            word: words[currentIndex].word,
            translate: words[currentIndex].wordTranslate,
            correctTranslate: words[currentIndex].wordTranslate,
            audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words[currentIndex].audio}`,
            answer: false,
            userWord: words[currentIndex].userWord,
          });
      };
/*       if (Object.prototype.hasOwnProperty.call(words[currentIndex], 'userWord')) {
        sprintData.currentWordsKit.userWord = words[currentIndex].userWord;
      }
 */    }
  }
}

export const generateWordsForGame = async () => {
  if (localStorage.getItem('token')) {
    const userId: string = localStorage.getItem('userId');
    await getWordsCollectionUser(userId, sprintData.currentGroup, sprintData.currentPage)
      .then((words) => createSprintData(words));
  } else {
    await getWordsCollection(sprintData.currentGroup, sprintData.currentPage)
      .then((words) => createSprintData(words));
  }
};
