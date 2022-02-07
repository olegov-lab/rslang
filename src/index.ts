import { App } from './app';
import './normalize.css';
import './index.css';

import {getWords} from "./api/api"

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.body;
  const app = new App(rootElement);

  app.init();

});





