import { Component } from '../../../../utils/component';
import { SprintPage } from './sprint-page/sprint-page';
import { generateWordsForGame } from './sprint-page/getWordCollection';
import { SprintDescriptionPage } from '../sprint-description/sprint-description';
import { Results } from './sprint-page/results';
import { sprintData } from './sprint-page/sprintData';
import { PlaySound } from './PlaySound';
import { defineGroupAndPage } from './sprint-page/getGroupAndPage';

import {getUserStatistics , updateUserStatistics} from "../../../../api/statistics";

import { getDate } from '../../../../components/react/get-date';
import { checkDate } from '../../../../components/react/check-date';

import { getUserAggrWord, createUserWord, getUserAggrWordHard,
  getUserAggrWordHardAll, updateUserWord }
from "../../../../api/user-aggregated";


import {
  resultsSprint, giveSprintStatistics, startSprintStatistics, countingLongestAnswerRightSprint,
} from './returnStatidtics';


let countCorrectAnswers = 0;

export class SprintGame extends Component {
  main: HTMLElement;

  resultArray: object[];

  sprintPage: SprintPage;

  wordFeld: HTMLElement;

  translateFeld: HTMLElement;

  sound: PlaySound;

  private timer: Component;

  private timerId: NodeJS.Timer;

  static renderGame: any;

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
    if (document.querySelector('.game-sprint-description')) {
      document.querySelector('.game-sprint-description').remove();
    }
    await sprintPage.renderCard();
    this.showTimer();



    sprintPage.showNextWord = (event) => {
      this.checkAnswer(event);
      sprintData.currentNumberWord += 1;
      sprintPage.renderCard();
      if ((sprintData.currentNumberWord % 20) === 0) {
        if (sprintData.currentPage >= 1) {
          sprintData.currentPage -= 1;
          generateWordsForGame();
        } else {
          this.stopGame();
        }
      }
    };
  }

  stopGame() {
    SprintGame.renderResults();
    this.timer.destroy();
    clearInterval(this.timerId);
    sprintData.timerStatus = true;
  }

  static renderResults() {
    const root = document.querySelector('.main') as HTMLElement;
    const results = new Results(root);
    results.renderAnswers();
    giveSprintStatistics();
  }


  showTimer() {
    this.timer = new Component(this.main, 'div', ['sprint-timer']);
    this.timer.element.innerHTML = `
    <span class="time"></span>
    <svg width=120 height=120 class="countdown-timer">
      <circle class="circle" cx=60 cy=60 r=42>
    </svg>
    `;
    const circle = document.querySelector('.circle') as HTMLElement;
    const time = document.querySelector('.time') as HTMLElement;
    const totalTime = 60;
    let curentTime = totalTime;
    this.timerId = setInterval(() => {
      if (!sprintData.timerStatus) {

        SprintGame.renderResults();
        this.getUzas();
        this.stopGame();

      } else {
        // eslint-disable-next-line no-lonely-if
        if (curentTime > 0) {
          time.innerText = `${curentTime}`;
          const ratio = (curentTime / totalTime);
          const rad = parseInt(circle.getAttribute('r'));
          const progress = Math.ceil(rad * (22 / 7) * 2 * (1 - ratio));
          curentTime -= 1;
          circle.style.strokeDashoffset = progress.toString();
        } else {

          SprintGame.renderResults();
          this.getUzas();
          this.timer.destroy();
          clearInterval(this.timerId);
          sprintData.timerStatus = true;
          this.stopGame();
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









