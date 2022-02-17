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

export class StaticsPage extends Component {




  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['statistics', "wrapper"]);


    //window.addEventListener('hashchange', window.location.reload);

    const titleStatist = new Component(this.element, 'h2', ["title-statist"], 'Статистика' );

    const notice = new Component(this.element, 'h3', ["notice-statist"], 'За сегодня Вы:' );

    const contantStatist = new Component(this.element, 'div', ["contant-statist"]);

    let count: number | string;

    let percentAnswerRightSprint = JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

    let longestAnswerRightSprint = +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

    let percentRightAudioCall = +localStorage.getItem('percentRightAudioCall') || 0;

    let LongestAnswerRightAudioCall = localStorage.getItem('LongestAnswerRightAudioCall') || 0;

    let percentAnswerForDay: Number = (percentAnswerRightSprint + percentRightAudioCall) / 2 || 0;



    let currentDate = getDate();

    let startDate = checkDate();

    reloadPageStatistics();


    if(!localStorage.getItem('token')){


      if(currentDate != startDate) {
        percentAnswerForDay = 0 ;
      }

    contantStatist.element.innerHTML = `
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


    // percentRightAudioCall = +localStorage.getItem('percentRightAudioCall');

    // LongestAnswerRightAudioCall = localStorage.getItem('LongestAnswerRightAudioCall');

    // percentAnswerForDay = (percentAnswerRightSprint + percentRightAudioCall) / 2;

    //localStorage.percentAnswerForDay = percentAnswerForDay;

    startDate = checkDate();


    let userId = localStorage.getItem('userId');

    reloadPageStatistics();

    const getDateAsyncCompare = async () => {

      let data = await checkDate();

      let percentAnswerRightSprint = data.optional.percentAnswerRightSprint || JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0;

      let longestAnswerRightSprint = data.optional.longestAnswerRightSprint || +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0;

      let percentRightAudioCall = data.optional.percentRightAudioCall || +localStorage.getItem('percentRightAudioCall') || 0;

      let LongestAnswerRightAudioCall = data.optional.LongestAnswerRightAudioCall || localStorage.getItem('LongestAnswerRightAudioCall') || 0;

      let percentAnswerForDay: Number = data.optional.percentAnswerForDay || (percentAnswerRightSprint + percentRightAudioCall) / 2 || 0;

      localStorage.percentAnswerForDay = percentAnswerForDay;


      currentDate = getDate();

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

      //console.log(data)

      console.log(currentDate)

      console.log(data.optional.startDate)

      if(currentDate != data.optional.startDate) {
        percentAnswerForDay = 0 ;
        localStorage.percentAnswerForDay = percentAnswerForDay;
        localStorage.startDate = currentDate;
        data.optional.startDate =  localStorage.startDate;
      }

      updateUserStatistics(state);

   // }

    //const renderStatistics = async () => {
      reloadPageStatistics();
      //getDateAsyncCompare();

      data = await getUserStatistics(userId);
      console.log(data);

      contantStatist.element.innerHTML = `
      ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', count)}
      ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', data.optional.percentAnswerRightSprint)}
      ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Спринт”', data.optional.longestAnswerRightSprint)}
      ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', count)}
      ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Аудиовызов”', data.optional.percentRightAudioCall)}
      ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Аудиовызов”', data.optional.LongestAnswerRightAudioCall)}
      ${renderBlockStatist('statist-item','Количество новых слов за день', count)}
      ${renderBlockStatist('statist-item','Количество изученных слов за день', count)}
      ${renderBlockStatist('statist-item','Процент правильных ответов за день', data.optional.percentAnswerForDay)}
  `


    reloadPageStatistics();

    //getDateAsyncCompare();

  }

  getDateAsyncCompare();
  //renderStatistics();
}


  }}
