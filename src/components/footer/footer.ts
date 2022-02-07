import { Component } from '../../utils/component';

import './footer.css';

export class Footer extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', ['footer']);

    this.element.innerHTML = `<div class="wrapper footer-content">
        <a href="https://rs.school/js/" class="rss-logo" target="_blank"></a>
        <a href="https://github.com/Chechelev" target="_blank">Chechelev</a>
        <a href="https://github.com/olegov-lab" target="_blank">olegov-lab</a>
        <a href="https://github.com/Britva1910" target="_blank">Britva1910</a>
        <p class="footer-text">© 2022</p>
      </div>`
}
}