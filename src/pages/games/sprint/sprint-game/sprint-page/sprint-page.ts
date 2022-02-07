import { Component } from '../../../../../utils/component';
import './sprint-page.css';

const sprintSection = `
<nav class="section-navigation">
<div class="nav-container">
  <button class="btn">Sound</button>
  <button class="btn">FS</button>
</div>
<button>Close</button>
</nav>
<div class="game-section">
<div class="progress"></div>
<div class="game-word">sadfa</div>
<div class="game-translate">asdfasfas</div>
<div class="game-btn-container">
  <button class="btn game-button-false">&#10094 Не верно</button>
  <button class="btn game-button-true">Верно &#10095</button>
</div>
</div>`;

export class SprintPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', ['game-sprint']);

    const sprintGuest = new Component(this.element, 'div', ['sprint-wrapper'], '');
    sprintGuest.element.innerHTML = sprintSection;
  }
}