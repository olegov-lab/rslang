import { Component } from '../../utils/component';
import { UIButton } from '../UI/button/button';

import './pagination.css';

export class Pagination extends Component {
  updatePage: (page: number) => void = () => {};
  private page = 0;
  private title: Component;
  private optinBtnPrevNext: Component;
  nextButton: UIButton;
  prevButton: UIButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['pagination']);

    if (localStorage.getItem('page')) {
      this.page = +localStorage.getItem('page');

      this.title = new Component(
        this.element,
        'h3',
        ['pagination__title'],
        `Страница #${this.page+1}`,
      );
    } else {

      this.title = new Component(
        this.element,
        'h3',
        ['pagination__title'],
        `Страница #${this.page+1}`,
      );

    }

    const optionBtnPrevNext = new Component(this.element,'div',['option-prev-next']);

    this.prevButton = new UIButton(optionBtnPrevNext.element, ['btn-prev','btn-mod'], 'Назад', true);
    this.prevButton.onClickButton = () => this.switchPage('prev');

    this.nextButton = new UIButton(optionBtnPrevNext.element, ['btn-next','btn-mod'], 'Вперед');
    this.nextButton.onClickButton = () => this.switchPage('next');

    if(this.prevButton.element.hasAttribute('disabled')) {
      this.prevButton.element.removeAttribute('disabled');
    } else {
      this.prevButton.element.setAttribute('disabled', 'true');
    }

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
      //this.prevButton.element.classList.add('non-event');
    } else {
      this.prevButton.setDisabled(false);
      //this.prevButton.element.classList.remove('non-event');
    }
  }

  private switchPage(type: string) {
    if (type === 'prev') {
      if (this.page > 0) this.page--;
    }

    if (type === 'next') this.page++;

    this.title.element.innerHTML = `Страница #${this.page + 1}`;
    this.updatePage(this.page);
    this.updatePrevButton();
  }
}