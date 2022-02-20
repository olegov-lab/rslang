import { Component } from '../../utils/component';
import { renderBlockStatist } from './statist-item';
import { getDate } from '../../components/react/get-date';
import { checkDate } from '../../components/react/check-date';
import { reloadPageStatistics } from "../../components/react/reload";
import { updateUserStatistics, getUserStatistics } from "../../api/statistics"
//import { renderAboutCommand } from './main-our-command';
//import { renderAdvantageBlock } from './main-advantage';
import './statistics.css';
import { userId } from '../../api/user-authorization';


import { getUserAggrWord, createUserWord, getUserAggrWordHard,
  getUserAggrWordHardAll, updateUserWord, getUserAggrWordAll, getUserWordAll, getUserAggrWordLearnAll }
from "../../api/user-aggregated";

export class StaticsPage extends Component {




  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['statistics', "wrapper"]);

    const titleStatist = new Component(this.element, 'h2', ["title-statist"], 'Статистика' );

    const notice = new Component(this.element, 'h3', ["notice-statist"], 'За сегодня Вы:' );

    const contantStatist = new Component(this.element, 'div', ["contant-statist"]);

    let count: number | string;

    // let newWordSprintSum = 0 || +localStorage.getItem('newWordSprintSum');
    // let newWordForDaySum = 0 || +localStorage.getItem('newWordForDaySum');

    // +newWordSprintSum;
    // +newWordForDaySum;

    if(!localStorage.getItem('token')){


      let percentAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

      let longestAnswerRightSprint = +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

      let percentRightAudioCall = JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall || 0;

      let LongestAnswerRightAudioCall = +JSON.parse(localStorage.getItem('audioCallStatistics'))?.longestAnswerRightAudioCall  || 0;

      let midleAnswer = (percentAnswerRightSprint + percentRightAudioCall) / 2;

      let percentAnswerForDay: Number = (( percentAnswerRightSprint == 0) || (percentRightAudioCall == 0)) ? percentAnswerRightSprint || percentRightAudioCall : midleAnswer || 0;


      reloadPageStatistics();

    contantStatist.element.innerHTML =   `
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', percentAnswerRightSprint)}
    ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Спринт”', longestAnswerRightSprint)}
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Процент правильных ответов по игре “ Аудиовызов”', percentRightAudioCall)}
    ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Аудиовызов”', LongestAnswerRightAudioCall)}
    ${renderBlockStatist('statist-item','Количество новых слов за день', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Количество изученных слов за день', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Процент правильных ответов за день', percentAnswerForDay)}
`

  } else if(localStorage.getItem('token')) {



    const getDateAsyncCompare = async () => {

    let userId = localStorage.getItem('userId');

    let dataWordsServer = await getUserStatistics(userId);


    let dataLearn = await getUserAggrWordLearnAll(userId);


        //LearnWord = LearnWord.length dataWordsServer?.optional?.LearnWord || 0;

    let LearnWord = dataLearn.length || 0;

    console.log(LearnWord)

    let percentAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring
                                   || dataWordsServer?.optional?.percentAnswerRightSprint || 0;


    let longestAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint
                                   || dataWordsServer?.optional?.longestAnswerRightSprint || 0;

    let percentAnswerRightAudioCall = JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall
                                || dataWordsServer?.optional?.percentRightAudioCall || 0;

    let LongestAnswerRightAudioCall = JSON.parse(localStorage.getItem('audioCallStatistics'))?.LongestAnswerRightAudioCall
                                      || dataWordsServer?.optional?.LongestAnswerRightAudioCall || 0;

    //let percentAnswerForDay = +JSON.parse(localStorage.getItem('percentAnswerForDay')) || percentAnswerRightSprint || percentRightAudioCall ||  (percentAnswerRightSprint + percentRightAudioCall) / 2 || 0;
    let midleAnswer = (percentAnswerRightSprint + percentAnswerRightAudioCall) / 2;

    let percentAnswerForDay = dataWordsServer?.optional?.percentAnswerForDay || ((percentAnswerRightSprint == 0) || (percentAnswerRightAudioCall == 0)) ? percentAnswerRightSprint || percentAnswerRightAudioCall : midleAnswer || 0;

    //let newWordSprint = JSON.parse(localStorage.getItem('data'))?.optional?.newWordSprintSum;

    percentAnswerForDay =+ percentAnswerForDay;

    let newWordSprintNotServer = +JSON.parse(localStorage.getItem('SprintStatistics'))?.isUserWord || 0;

    let newWordSprintNotServerSum = 0;

    newWordSprintNotServerSum += newWordSprintNotServer;

   localStorage.newWordSprintNotServerSum = newWordSprintNotServerSum;

   newWordSprintNotServerSum = newWordSprintNotServer + +localStorage.newWordSprintNotServerSum;



  //  let newAudioCall = percentAnswerRightSprint / percentAnswerRightSprint * 5;

   let newAudioCallSum = 0;

   //newAudioCallSum += newAudioCall;



      document.querySelector('.statistics-btn-burger').addEventListener('click',  (event) => {

        const target = event.target as HTMLElement;

        if(target.getAttribute('href') == "#/statistics") {

          window.location.hash = "#/statistics";
          window.location.reload();

        } });



      reloadPageStatistics();

      contantStatist.element.innerHTML = `
      ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', newWordSprintNotServerSum)}
      ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', percentAnswerRightSprint)}
      ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Спринт”', longestAnswerRightSprint)}
      ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', newAudioCallSum)}
      ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Аудиовызов”', percentAnswerRightAudioCall)}
      ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Аудиовызов”', LongestAnswerRightAudioCall)}
      ${renderBlockStatist('statist-item','Количество новых слов за день', newWordSprintNotServerSum)}
      ${renderBlockStatist('statist-item','Количество изученных слов за день', LearnWord)}
      ${renderBlockStatist('statist-item','Процент правильных ответов за день', percentAnswerForDay)}
  `



  }
  getDateAsyncCompare();
  }


}
    //  renderStatistics() {
    //   return this;
    //  }
  }






//  async f() {

//   console.log('ff');

//   let reloadPageStatistics = () => {

//     document.querySelector('.nav-part').addEventListener('click', (event) => {

//       const target = event.target as HTMLElement;

//       if(target.getAttribute('href') == "#/statistics") {

//         window.location.hash = "#/statistics";
//         window.location.reload();

//       }
//     })
//   }

//   // reloadPageStatistics();

//   const titleStatist = new Component(this.element, 'h2', ["title-statist"], 'Статистика' );

//     const notice = new Component(this.element, 'h3', ["notice-statist"], 'За сегодня Вы:' );

//     const contantStatist = new Component(this.element, 'div', ["contant-statist"]);

//     let count: number | string;

//     let percentAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

//     let longestAnswerRightSprint = +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

//     let percentRightAudioCall = +localStorage.getItem('percentRightAudioCall') || 0;

//     let LongestAnswerRightAudioCall = localStorage.getItem('LongestAnswerRightAudioCall') || 0;

//     let percentAnswerForDay: Number = (percentAnswerRightSprint + percentRightAudioCall) / 2 || percentAnswerRightSprint || percentRightAudioCall || 0;


//     let currentDate = getDate();

//     let startDate = checkDate();

//     reloadPageStatistics();


//     if(!localStorage.getItem('token')){


//       if(currentDate != startDate) {
//         percentAnswerForDay = 0 ;
//       }

//     contantStatist.element.innerHTML = `
//     ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', "нужна авторизация", "alarm-item-statist")}
//     ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', percentAnswerRightSprint)}
//     ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Спринт”', longestAnswerRightSprint)}
//     ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', "нужна авторизация", "alarm-item-statist")}
//     ${renderBlockStatist('statist-item','Процент правильных ответов по игре “ Аудиовызов”', percentRightAudioCall)}
//     ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Аудиовызов”', LongestAnswerRightAudioCall)}
//     ${renderBlockStatist('statist-item','Количество новых слов за день', "нужна авторизация", "alarm-item-statist")}
//     ${renderBlockStatist('statist-item','Количество изученных слов за день', "нужна авторизация", "alarm-item-statist")}
//     ${renderBlockStatist('statist-item','Процент правильных ответов за день', percentAnswerForDay)}
// `


//   } else if(localStorage.getItem('token')) {

//     startDate = checkDate();


//     let userId = localStorage.getItem('userId');

//     const getDateAsyncCompare = async () => {

//       let data = await checkDate();

//       let percentAnswerRightSprint = data.optional.percentAnswerRightSprint || JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

//       let longestAnswerRightSprint = data.optional.longestAnswerRightSprint || +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

//       let percentRightAudioCall = data.optional.percentRightAudioCall || +localStorage.getItem('percentRightAudioCall') || 0;

//       let LongestAnswerRightAudioCall = data.optional.LongestAnswerRightAudioCall || localStorage.getItem('LongestAnswerRightAudioCall') || 0;

//       let percentAnswerForDay: Number = data.optional.percentAnswerForDay || percentAnswerRightSprint || percentRightAudioCall ||  (percentAnswerRightSprint + percentRightAudioCall) / 2 || 0;

//       localStorage.percentAnswerForDay = percentAnswerForDay;


//       currentDate = getDate();

//       let state = {
//         userId: localStorage.getItem('userId'),
//         statistics: {
//           "optional": {
//             startDate: data.optional.startDate,
//             percentAnswerRightSprint: JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || data.optional.percentAnswerRightSprint,
//             longestAnswerRightSprint: +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || data.optional.longestAnswerRightSprint,
//             percentRightAudioCall: +localStorage.getItem('percentRightAudioCall') || data.optional.percentRightAudioCall,
//             LongestAnswerRightAudioCall: localStorage.getItem('LongestAnswerRightAudioCall') || data.optional.LongestAnswerRightAudioCall,
//             percentAnswerForDay: percentAnswerForDay || data.optional.percentAnswerForDay,
//             }
//         }
//       };

//       updateUserStatistics(state);

//       data = await getUserStatistics(userId);

//       if(currentDate != data.optional.startDate) {
//         percentAnswerForDay = 0 ;
//         localStorage.percentAnswerForDay = percentAnswerForDay;
//         localStorage.startDate = currentDate;
//         data.optional.startDate = localStorage.startDate;
//       }

//       updateUserStatistics(state);

//    // }


//       // reloadPageStatistics();
//       //getDateAsyncCompare();

//       data = await getUserStatistics(userId);

//       let wordsCorrectAnswers = JSON.parse(localStorage.getItem('SprintStatistics'))?.wordsCorrectAnswers || [];
//       let wordsWrongAnswers = JSON.parse(localStorage.getItem('SprintStatistics'))?.wordsWrongAnswers || [];

//       let currentCorrectWordUser = wordsCorrectAnswers.map(item => {

//         let state = {
//           userId: localStorage.getItem('userId'),
//           wordId: item.id,
//           word: { "difficulty": "easy", "optional": {testFieldString: 'test', testFieldBoolean: true} }
//         }

//         if (createUserWord(state).then(reject => reject)) {
//           updateUserWord(state);
//         } else {
//           createUserWord(state);
//           updateUserWord(state);
//         }

//       })


//       let currentWrongWordUser = wordsWrongAnswers.map(item => {

//         let state = {
//           userId: localStorage.getItem('userId'),
//           wordId: item.id,
//           word: { "difficulty": "hard", "optional": {testFieldString: 'test', testFieldBoolean: true} }
//         }


//         if (createUserWord(state).then(reject => reject)) {
//           updateUserWord(state);
//         } else {
//           createUserWord(state);
//           updateUserWord(state);
//         }


//       })

//       contantStatist.element.innerHTML = `
//       ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', count)}
//       ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', data.optional.percentAnswerRightSprint)}
//       ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Спринт”', data.optional.longestAnswerRightSprint)}
//       ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', count)}
//       ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Аудиовызов”', data.optional.percentRightAudioCall)}
//       ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Аудиовызов”', data.optional.LongestAnswerRightAudioCall)}
//       ${renderBlockStatist('statist-item','Количество новых слов за день', count)}
//       ${renderBlockStatist('statist-item','Количество изученных слов за день', count)}
//       ${renderBlockStatist('statist-item','Процент правильных ответов за день', data.optional.percentAnswerForDay)}
//   `


//     //getDateAsyncCompare();

//   }
// }
//  }
// }