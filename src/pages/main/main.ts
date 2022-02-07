import { Component } from '../../utils/component';
import { renderGreetingBlock } from './main-greeting';
import { renderAboutCommand } from './main-our-command';
import { renderAdvantageBlock } from './main-advantage';
import './main.css';

export class MainPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['main-greeting']);

    this.element.innerHTML = `
    ${renderGreetingBlock()}
    ${renderAdvantageBlock()}
    ${renderAboutCommand()}`;

  }
}
