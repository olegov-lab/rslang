import { Component } from '../../utils/component';
import { UIButton } from '../UI/button/button';

import './pagination.css';

export class Pagination extends Component {
  updatePage: (page: number) => void = () => {};
  private page = 0;
  private title: Component;
  nextButton: UIButton;
  prevButton: UIButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['pagination']);

    this.title = new Component(
      this.element,
      'h3',
      ['pagination__title'],
      `Page #${this.page+1}`,
    );

    this.prevButton = new UIButton(this.element, ['btn-prev'], 'Prev', true);
    this.prevButton.onClickButton = () => this.switchPage('prev');

    this.nextButton = new UIButton(this.element, ['btn-next'], 'Next');
    this.nextButton.onClickButton = () => this.switchPage('next');
  }

  updateNextButton(page: number, totalCount: number, limit: number): void {
    if (page > totalCount / limit) {
      this.nextButton.setDisabled(true);
    } else {
      this.nextButton.setDisabled(false);
    }
  }

  private updatePrevButton(): void {
    if (this.page === 0) {
      this.prevButton.setDisabled(true);
    } else {
      this.prevButton.setDisabled(false);
    }
  }

  private switchPage(type: string) {
    if (type === 'prev') {
      if (this.page > 0) this.page--;
    }

    if (type === 'next') this.page++;

    this.title.element.innerHTML = `Page #${this.page + 1}`;
    this.updatePage(this.page);
    this.updatePrevButton();
  }
}