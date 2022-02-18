import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';
import { Results } from './sprint-page/results';
import { sprintData } from './sprint-page/sprintData';
import { PlaySound } from './PlaySound';
import { defineGroupAndPage } from './sprint-page/getGroupAndPage';
import { resultsSprint, giveSprintStatistics, startSprintStatistics, countingLongestAnswerRightSprint } from './returnStatidtics';
import {getUserStatistics , updateUserStatistics} from "../../../../api/statistics";

import { getDate } from '../../../../components/react/get-date';
import { checkDate } from '../../../../components/react/check-date';

import { getUserAggrWord, createUserWord, getUserAggrWordHard,
  getUserAggrWordHardAll, updateUserWord }
from "../../../../api/user-aggregated";


let countCorrectAnswers = 0;

export class SprintGame extends Component {
  main: HTMLElement;

  resultArray: object[];

  sprintPage: SprintPage;

  wordFeld: HTMLElement;

  translateFeld: HTMLElement;

  sound: PlaySound;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.main = parentNode;
  }

  renderDescription() {
    const sprintDescriptionPage = new SprintDescriptionPage(this.main);
    sprintDescriptionPage.startGame = () => {
      this.renderGame();

    };
  }

  checkAnswer(curentAnswer) {
    if (sprintData.currentWordsKit[sprintData.currentNumberWord].answer === curentAnswer) {
      const sound = new PlaySound();
      sound.playCorrectSound();
      const icon = new Component(this.main, 'div', ['answer-icon-true'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = true;
      resultsSprint.wordsCorrectAnswers.push(
        sprintData.currentWordsKit[sprintData.currentNumberWord],
      );
      countCorrectAnswers += 1;
    } else {
      const sound = new PlaySound();
      sound.playWrongSound();
      const icon = new Component(this.main, 'div', ['answer-icon-false'], '');
      setInterval(() => icon.destroy(), 500);
      sprintData.currentWordsKit[sprintData.currentNumberWord].userAnswer = false;
      resultsSprint.wordsWrongAnswers.push(
        sprintData.currentWordsKit[sprintData.currentNumberWord],
      );
      countingLongestAnswerRightSprint(countCorrectAnswers);
      countCorrectAnswers = 0;
    }
  }

  async renderGame() {
    await startSprintStatistics();
    sprintData.currentWordsKit = [];
    await defineGroupAndPage();
    await generateWordsForGame();
    const sprintPage = new SprintPage(this.main);
    document.querySelector('.game-sprint-description').remove();
    await sprintPage.renderCard();
    this.showTimer();



    sprintPage.showNextWord = (event) => {
      this.checkAnswer(event);
      sprintData.currentNumberWord += 1;
      sprintPage.renderCard();
      if ((sprintData.currentNumberWord % 20) === 15) {
        sprintData.currentPage -= 1; /* FIXME проверка на 0 страницу => завершить игру */
        // console.log('Новый набор данных', sprintData.currentPage, sprintData.currentWordsKit);
        generateWordsForGame();
      }
    };
  }

  static renderResults() {
    const root = document.querySelector('.main') as HTMLElement;
    const results = new Results(root);
    results.renderAnswers();
    giveSprintStatistics();
  }


  showTimer() {
    const timer = new Component(this.main, 'div', ['sprint-timer']);
    let timeLeft = 60;
    const timerId = setInterval(() => {
      if (!sprintData.timerStatus) {
        SprintGame.renderResults();
        this.getUzas()
        timer.destroy();
        clearInterval(timerId);
        sprintData.timerStatus = true;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (timeLeft > 0) {
          timer.element.innerText = `${timeLeft}`;
          timeLeft -= 1;
        } else {
          SprintGame.renderResults();
          this.getUzas();
          timer.destroy();
          clearInterval(timerId);
          sprintData.timerStatus = true;
        }
      }
    }, 1000);
  }

  getUzas() {

    if(!localStorage.getItem('token')){

    let percentAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

    let longestAnswerRightSprint = +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

    let percentRightAudioCall = +localStorage.getItem('percentRightAudioCall') || 0;

    let LongestAnswerRightAudioCall = localStorage.getItem('LongestAnswerRightAudioCall') || 0;

    let percentAnswerForDay: Number = (percentAnswerRightSprint + percentRightAudioCall) / 2 || percentAnswerRightSprint || percentRightAudioCall || 0;


      let currentDate = getDate();

      let startDate = checkDate();

      if(currentDate != startDate) {
        percentAnswerForDay = 0 ;
      }

     } if(localStorage.getItem('token')) {

      let startDate = checkDate();

      let userId = localStorage.getItem('userId');

      const getDateAsyncCompare = async () => {

        let data = await checkDate();

        let percentAnswerRightSprint = data.optional.percentAnswerRightSprint || JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

        let longestAnswerRightSprint = data.optional.longestAnswerRightSprint || +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

        let percentRightAudioCall = data.optional.percentRightAudioCall || +localStorage.getItem('percentRightAudioCall') || 0;

        let LongestAnswerRightAudioCall = data.optional.LongestAnswerRightAudioCall || localStorage.getItem('LongestAnswerRightAudioCall') || 0;

        let percentAnswerForDay: Number = data.optional.percentAnswerForDay || percentAnswerRightSprint || percentRightAudioCall ||  (percentAnswerRightSprint + percentRightAudioCall) / 2 || 0;

        localStorage.percentAnswerForDay = percentAnswerForDay;


        let currentDate = getDate();

        let state = {
          userId: localStorage.getItem('userId'),
          statistics: {
            "optional": {
              startDate: data.optional.startDate,
              percentAnswerRightSprint: JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || data.optional.percentAnswerRightSprint,
              longestAnswerRightSprint: +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || data.optional.longestAnswerRightSprint,
              percentRightAudioCall: +localStorage.getItem('percentRightAudioCall') || data.optional.percentRightAudioCall,
              LongestAnswerRightAudioCall: localStorage.getItem('LongestAnswerRightAudioCall') || data.optional.LongestAnswerRightAudioCall,
              percentAnswerForDay: percentAnswerForDay || data.optional.percentAnswerForDay,
              }
          }
        };

        updateUserStatistics(state);

        data = await getUserStatistics(userId);

        if(currentDate != data.optional.startDate) {
          percentAnswerForDay = 0 ;
          localStorage.percentAnswerForDay = percentAnswerForDay;
          localStorage.startDate = currentDate;
          data.optional.startDate = localStorage.startDate;
        }

        updateUserStatistics(state);

        data = await getUserStatistics(userId);

        let wordsCorrectAnswers = JSON.parse(localStorage.getItem('SprintStatistics'))?.wordsCorrectAnswers || [];
        let wordsWrongAnswers = JSON.parse(localStorage.getItem('SprintStatistics'))?.wordsWrongAnswers || [];

        let currentCorrectWordUser = wordsCorrectAnswers.map(item => {

          let state = {
            userId: localStorage.getItem('userId'),
            wordId: item.id,
            word: { "difficulty": "easy", "optional": {testFieldString: 'test', testFieldBoolean: true} }
          }

          if (createUserWord(state).then(reject => reject)) {
            updateUserWord(state);
          } else {
            createUserWord(state);
            updateUserWord(state);
          }

        })


        let currentWrongWordUser = wordsWrongAnswers.map(item => {

          let state = {
            userId: localStorage.getItem('userId'),
            wordId: item.id,
            word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: true} }
          }


          if (createUserWord(state).then(reject => reject)) {
            updateUserWord(state);
          } else {
            createUserWord(state);
            updateUserWord(state);
          }
        })

       localStorage.data = JSON.stringify(data);

    console.log("uzas");

    }

    getDateAsyncCompare();

    }

    }


//!


}









