import { Component } from '../../utils/component';
import { IWords } from '../../interfaces/interface';
import { TextbookItem } from './textbook-item';


import { Pagination } from '../pagination/pagination';

import './textbook-container.css';



export class TextbookContainer extends Component {

  updatePage: (page: number) => void = () => {};

  container: Component;

  pagination: Pagination;


  words: Array<TextbookItem>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['textbook-container']);
    this.words = [];

    this.pagination = new Pagination(this.element);
    this.container = new Component(this.element, 'div', ['textbook-container-block']);

    this.pagination.updatePage = (page) => this.updatePage(page);
  }

  private clear() {
    this.container.element.innerHTML = '';
  }

  addItems(words): void {
    this.clear();

    this.words = words.map((word) => {
      const item = new TextbookItem(this.container.element, word);

      return item;
    });
  }




}