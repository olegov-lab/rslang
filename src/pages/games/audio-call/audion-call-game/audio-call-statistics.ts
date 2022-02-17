import {arrTrueWordsID, arrFalseWordsID} from "./audio-call";
let  longestAnswerRightAudioCall: number = 0;

interface IAudioCallResults {
    wordsCorrectAnswers: string [],
    wordsWrongAnswers: string [],
    percentAnswerRightAudioCall: number,
    longestAnswerRightAudioCall: number,
  }
  
  export const resultsAudioCall: IAudioCallResults = {
    wordsCorrectAnswers: [],
    wordsWrongAnswers: [],
    percentAnswerRightAudioCall: 0,
    longestAnswerRightAudioCall: 0,
  };


export function countingPercentAnswerRightAudioCall() {
  const wordsCorrectAnswers = resultsAudioCall.wordsCorrectAnswers.length;
  const wordsWrongAnswers = resultsAudioCall.wordsWrongAnswers.length;
  resultsAudioCall.percentAnswerRightAudioCall = Math.floor((wordsCorrectAnswers * 100) / (wordsCorrectAnswers + wordsWrongAnswers));
}


export function countingLongestAnswerRightAudioCall() {
  longestAnswerRightAudioCall++;
      if (longestAnswerRightAudioCall > resultsAudioCall.longestAnswerRightAudioCall) {
        resultsAudioCall.longestAnswerRightAudioCall = longestAnswerRightAudioCall;
      }
}; 

export function resetLongestAnswerRightAudioCall () {
    return longestAnswerRightAudioCall = 0;
};
  
  // отдать статистику в виде
  export const startAudioCallStatistics = async () => {
    /* если игра первая и статистики в локале нет - отдаем туда пустой объект */
    if (localStorage.getItem('audioCallStatistics') === null) {
      const audioCallStatistics = JSON.stringify(resultsAudioCall);
      localStorage.setItem('audioCallStatistics', audioCallStatistics);
    } else { // если есть, подтягиваем данные из локала в приложение
      const localResultsAudioCall = await JSON.parse(localStorage.getItem('audioCallStatistics'));
      resultsAudioCall.wordsCorrectAnswers = localResultsAudioCall.wordsCorrectAnswers;
      resultsAudioCall.wordsWrongAnswers = localResultsAudioCall.wordsWrongAnswers;
      resultsAudioCall.percentAnswerRightAudioCall = localResultsAudioCall.percentAnswerRightAudioCall;
      resultsAudioCall.longestAnswerRightAudioCall = localResultsAudioCall.longestAnswerRightAudioCall;
    }
  };
  
  export const giveAudioCallStatistics = async () => {
    //await countingPercentAnswerRightAudioCall();
    const audioCallStatistics = JSON.stringify(resultsAudioCall);
    localStorage.setItem('audioCallStatistics', audioCallStatistics);
  };