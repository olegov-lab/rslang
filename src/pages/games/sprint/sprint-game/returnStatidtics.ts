/* eslint-disable max-len */
import { IGameData, sprintData } from './sprint-page/sprintData';

interface ISprintResults {
  wordsCorrectAnswers: Array<IGameData>,
  wordsWrongAnswers: Array<IGameData>,
  percentAnswerRightSpring: number,
  longestAnswerRightSprint: number,
  isUserWord: number,
  isTestFieldBoolean: number,
}

export const resultsSprint: ISprintResults = {
  wordsCorrectAnswers: [],
  wordsWrongAnswers: [],
  percentAnswerRightSpring: 0,
  longestAnswerRightSprint: 0,
  isUserWord: 0,
  isTestFieldBoolean: 0,
};

// подсчет процента правильных ответов
export const countingPercentAnswerRightSpring = async () => {
  const countCorrectAnswers = resultsSprint.wordsCorrectAnswers.length;
  const countWrongAnswers = resultsSprint.wordsWrongAnswers.length;
  resultsSprint.percentAnswerRightSpring = Math.floor((countCorrectAnswers * 100) / (countCorrectAnswers + countWrongAnswers));
};

// подсчет самой длинной серии праильных ответов
export const countingLongestAnswerRightSprint = (countAnswers) => {
  if (countAnswers > resultsSprint.longestAnswerRightSprint) {
    resultsSprint.longestAnswerRightSprint = countAnswers;
  }
};

// сбор статистики в виде
export const startSprintStatistics = async () => {
  /*
  if (localStorage.getItem('SprintStatistics') === null) {
    const sprintStatistics = JSON.stringify(resultsSprint);
    localStorage.setItem('SprintStatistics', sprintStatistics);
  } else {
    const localResultsSprint = await JSON.parse(localStorage.getItem('SprintStatistics'));
    resultsSprint.wordsCorrectAnswers = localResultsSprint.wordsCorrectAnswers;
    resultsSprint.wordsWrongAnswers = localResultsSprint.wordsWrongAnswers;
    resultsSprint.longestAnswerRightSprint = localResultsSprint.longestAnswerRightSprint;
    resultsSprint.percentAnswerRightSpring = localResultsSprint.percentAnswerRightSpring;
  } */
  const localResultsSprint = await JSON.parse(localStorage.getItem('SprintStatistics'));
  resultsSprint.isUserWord = localResultsSprint.isUserWord;
};

export const saveStat = (index: number): void => {
  if (typeof sprintData.currentWordsKit[index].userWord === 'undefined') {
    resultsSprint.isUserWord += 1;
    resultsSprint.isTestFieldBoolean += 1;
  } else if (sprintData.currentWordsKit[index].userWord.optional.testFieldBoolean === false) {
    resultsSprint.isTestFieldBoolean += 1;
  }
};

export const giveSprintStatistics = async (): Promise<void> => {
  await countingPercentAnswerRightSpring();
  const sprintStatistics = JSON.stringify(resultsSprint);
  localStorage.setItem('SprintStatistics', sprintStatistics);
};
