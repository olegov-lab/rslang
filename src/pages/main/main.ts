import { Component } from '../../utils/component';

export class MainPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['main-gretting']);

    const mainGuest = new Component(this.element, 'p', ['logo-gretting'], 'главная');

  }
}