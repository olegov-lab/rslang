/* eslint-disable max-len */
import { IGameData } from './sprint-page/sprintData';

interface ISprintResults {
  wordsCorrectAnswers: Array<IGameData>,
  wordsWrongAnswers: Array<IGameData>,
  percentAnswerRightSpring: number,
  longestAnswerRightSprint: number,
}

export const resultsSprint: ISprintResults = {
  wordsCorrectAnswers: [],
  wordsWrongAnswers: [],
  percentAnswerRightSpring: 0,
  longestAnswerRightSprint: 0,
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

// отдать статистику в виде
export const startSprintStatistics = async () => {
  /* если игра первая и статистики в локале нет - отдаем туда пустой объект */
  if (localStorage.getItem('SprintStatistics') === null) {
    const sprintStatistics = JSON.stringify(resultsSprint);
    localStorage.setItem('SprintStatistics', sprintStatistics);
  } else { // если есть, подтягиваем данные из локала в приложение
    const localResultsSprint = await JSON.parse(localStorage.getItem('SprintStatistics'));
    resultsSprint.wordsCorrectAnswers = localResultsSprint.wordsCorrectAnswers;
    resultsSprint.wordsWrongAnswers = localResultsSprint.wordsWrongAnswers;
    resultsSprint.longestAnswerRightSprint = localResultsSprint.longestAnswerRightSprint;
    resultsSprint.percentAnswerRightSpring = localResultsSprint.percentAnswerRightSpring;
  }
};

export const giveSprintStatistics = async () => {
  await countingPercentAnswerRightSpring();
  const sprintStatistics = JSON.stringify(resultsSprint);
  localStorage.setItem('SprintStatistics', sprintStatistics);
};
