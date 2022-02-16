import { Component } from '../../utils/component';
import { renderBlockStatist } from './statist-item';
//import { renderAboutCommand } from './main-our-command';
//import { renderAdvantageBlock } from './main-advantage';
import './statistics.css';

export class StaticsPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['statistics', "wrapper"]);

    const titleStatist = new Component(this.element, 'h2', ["title-statist"], 'Статистика' );

    const notice = new Component(this.element, 'h3', ["notice-statist"], 'За сегодня Вы:' );

    const contantStatist = new Component(this.element, 'div', ["contant-statist"]);

    let count: number | string;

    if(!localStorage.getItem('token')){

    contantStatist.element.innerHTML = `
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', count)}
    ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Спринт”', count)}
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Процент правильных ответов по игре “ Аудиовызов”', count)}
    ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “Аудиовызов”', count)}
    ${renderBlockStatist('statist-item','Количество новых слов за день', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Количество изученных слов за день', "нужна авторизация", "alarm-item-statist")}
    ${renderBlockStatist('statist-item','Процент правильных ответов за день', count)}
`
  } else if(localStorage.getItem('token')) {

    contantStatist.element.innerHTML = `
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Спринт”', count)}
    ${renderBlockStatist('statist-item','Процент правильных ответов по игре “Спринт”', count)}
    ${renderBlockStatist('statist-item','Самая длинная серия правильных ответов по игре “ Спринт”', count)}
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', count)}
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', count)}
    ${renderBlockStatist('statist-item','Количество новых слов по игре “Аудиовызов”', count)}
    ${renderBlockStatist('statist-item','Количество новых слов за день', count)}
    ${renderBlockStatist('statist-item','Количество изученных слов за день', count)}
    ${renderBlockStatist('statist-item','Процент правильных ответов за день', count)}
`
  }

}
  }

