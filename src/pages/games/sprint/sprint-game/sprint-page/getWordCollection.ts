import { getWords } from '../../../../../api/api';

const getWordsCollection = async (group = 0, page = 0) => {
  const words = await getWords(group, page);
  return words;
};

export const generateWordsForGame = (groupe?: number, page?: number) => {
  const wordsForGame = getWordsCollection(groupe, page).then((words) => {
    const wordsCollection = [];
    for (const variable in words) {
      if ({}.hasOwnProperty.call(words, variable)) {
        const currentIndex = Number(variable);
        const randomBullean = Math.random() < 0.5;
        if (randomBullean) {
          wordsCollection.push({
            word: words[currentIndex].word,
            translate: words[currentIndex].wordTranslate,
            answer: true,
          });
        } else {
          const res = currentIndex < 19
            ? wordsCollection.push({
              word: words[currentIndex].word,
              translate: words[currentIndex + 1].wordTranslate,
              answer: false,
            })
            : wordsCollection.push({
              word: words[currentIndex].word,
              translate: words[currentIndex].wordTranslate,
              answer: false,
            });
        }
      }
    }
    return wordsCollection;
  });
  return wordsForGame; //  TODO сюда интерфейс
};