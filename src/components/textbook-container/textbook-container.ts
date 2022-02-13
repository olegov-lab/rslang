import { Component } from '../../utils/component';
import { IWords } from '../../interfaces/interface';
import { TextbookItem } from './textbook-item';
import {
  getWords
} from '../../api/api';
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

    //this.title = new Component(this.element, 'h2');
    this.pagination = new Pagination(this.element);
    this.container = new Component(this.element, 'div', ['textbook-container-block']);

    this.pagination.updatePage = (page) => this.updatePage(page);
  }

  private clear() {
    this.container.element.innerHTML = '';
    // this.cars = [];
  }

  addItems(words): void {
    this.clear();

    //this.updateTitle(carsLength);
    this.words = words.map((word) => {
      const item = new TextbookItem(this.container.element, word);
      //item.removeCar = (carId) => this.removeCar(carId);
      //item.updateCar = (carId) => this.updateCar(carId);

      return item;
    });
  }
}