import { Component } from '../../utils/component';
import { IWords } from '../../interfaces/interface';
import { TextbookItem } from '../../components/textbook-container/textbook-item';
import { TextbookContainer } from '../../components/textbook-container/textbook-container';
import { TextbookHeader } from "../../components/textbook-container/textbook-header";
import {
  getWords
} from '../../api/api';



export class Textbook extends Component {
  private textbookContainer: TextbookContainer;
  private textbookHeader: TextbookHeader;
  textbookItem: TextbookItem;
  group = 0;
  page = 0;
  hashHref = 0;


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['textbook', 'wrapper']);

    this.getAllWords(this.group, this.page);

    this.textbookHeader = new TextbookHeader(this.element);

    this.textbookContainer = new TextbookContainer(this.element);

    const navPartTextbook = document.querySelector('.nav-part-textbook');


    navPartTextbook.addEventListener('click', (event) => {
       let target = event.target as HTMLElement;

       console.log(target.getAttribute('href').slice(-1));

       this.group = +target.getAttribute('href').slice(-1);

       this.getAllWords(this.group, this.page);

       Textbook.prototype.toLinkHref = +this.group;

    })

    this.textbookContainer.updatePage = (page) => {
      this.page = page;
      this.getAllWords(this.group, this.page);
    };

}


get toLinkHref(): number {
  console.log(this.group);
  return this.group;
}

set toLinkHref(value) {
  this.group = value;
}

private async getAllWords(group: number, page: number): Promise<void> {

  const data = await getWords(group, page);

  console.log(data);

  if (data) {
    const words: {} = data;
    //const carLength: string = data.count;
    this.textbookContainer.addItems(words);

    this.textbookContainer.pagination.updateNextButton(this.page,28,1);

    console.log(this.page);

    // this.garageContainer.pagination.updateNextButton(
    //   this.page,
    //   +carLength,
    //   7,
    // );
  }
}


}