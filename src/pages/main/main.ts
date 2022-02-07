import { Component } from '../../utils/component';
import { renderAboutCommand } from './main-our-command'
import './main.css'

export class MainPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['main-gretting']);

    this.element.innerHTML = `${renderAboutCommand()}`;

  }
}
