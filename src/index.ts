import { App } from './app';
import './normalize.css';
import './index.css';
import { createUserWord, getUserAggrWord } from './api/user-aggregated';
import { getDate } from "./components/react/get-date";
import { checkDate } from "./components/react/check-date";

import {getWords} from "./api/api"

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.body;
  const app = new App(rootElement);

  //let startDate = getDate();

  checkDate();

  app.init();



  // createUserWord({
  //   userId: "62052493f646b800162199af",
  //   wordId: "5e9f5ee35eb9e72bc21af716",
  //   word: { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
  // });


  // getUserAggrWord({
  //   userId: "62052493f646b800162199af",
  //   group: 1,
  //   page: 0,
  // }
  // )
});





