import { getWords } from '../../../../../api/api';
import { getUserAggrWord } from '../../../../../api/user-aggregated';
import { sprintData } from './sprintData';

const getWordsCollection = async (group = 0, page = 0) => {
  const words = await getWords(group, page);
  return words;
};

export const generateWordsForGame = () => {
  if (sprintData.currentGroup === undefined) {
    sprintData.currentGroup = Math.floor(Math.random() * (6 - 0) + 0);
  }
  if (sprintData.currentPage === undefined) {
    sprintData.currentPage = Math.floor(Math.random() * (19 - 0) + 0);
  }
  console.log(sprintData.currentGroup, sprintData.currentPage);
  getWordsCollection(sprintData.currentGroup, sprintData.currentPage).then((words) => {
    for (const variable in words) {
      if ({}.hasOwnProperty.call(words, variable)) {
        const currentIndex = Number(variable);
        const randomBullean = Math.random() < 0.5;
        if (randomBullean) {
          sprintData.currentWordsKit.push({
            word: words[currentIndex].word,
            translate: words[currentIndex].wordTranslate,
            audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words[currentIndex].audio}`,
            answer: true,
          });
        } else {
          const res = currentIndex < 19
            ? sprintData.currentWordsKit.push({
              word: words[currentIndex].word,
              translate: words[currentIndex + 1].wordTranslate,
              audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words[currentIndex].audio}`,
              answer: false,
            })
            : sprintData.currentWordsKit.push({
              word: words[currentIndex].word,
              translate: words[currentIndex].wordTranslate,
              audio: `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${words[currentIndex].audio}`,
              answer: false,
            });
        }
      }
    }
  });
  console.log('получен массив');
};
