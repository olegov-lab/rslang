import './audio-call.css';
import {  pageNum, wordsRusArray, arrCopy, clearArraysRepeat } from './audio-call';
import { playSound } from './play-word-audio';
import { checkAnswer } from './check-answer';
import { choosePage } from './get-page';
import { nextPage } from './audio-call';
import { switchSound } from './switch-sound';
import { resetResultsAudioCall } from "./audio-call-statistics";
import { answersKeybord } from './audio-btns-controller';
import {spaceSound } from './space-btn-controller';
import { enable } from './disable-keyboard';
import { nextPageEnter } from './audio-call';


/*рендер страницы игры*/
export function renderGameAudioPage() {

  const target = event.target as HTMLElement;
  const gameAudioDesc = document.querySelector('.game-audio-description') as HTMLElement;

  if ((target as HTMLDivElement).closest('.audio-call-start')) {

    gameAudioDesc.style.display = "none";
    clearArraysRepeat();
    //resetResultsAudioCall();
    enable();

    const section = document.createElement('section');
    section.className = 'game-audio';

    const progressBar =  document.createElement('div');
    progressBar.className = 'progress-bar';

    const container = document.createElement('div');
    container.className = 'container';

    const gameAudioPage = document.createElement('div');
    gameAudioPage.className = 'game-audio-page';

    const soundSwitcher = document.createElement('div');
    soundSwitcher.className = 'switch-sound';
    soundSwitcher.addEventListener('click', switchSound);

    const gameImg = document.createElement('div');
    gameImg.className = 'game-image';

    const imageBlock = document.createElement('div');
    imageBlock.className = 'audio-game-img';

    const wordImage = document.createElement('img');

    const soundBlock = document.createElement('div');
    soundBlock.className = 'sound-block';
    soundBlock.addEventListener('click', playSound);
    playSound();

    const soundImage = document.createElement('div');
    soundImage.className = 'sound';

    const soundWord = document.createElement('div');
    soundWord.className = 'sound-word';

    const answersBlock = document.createElement('div');
    answersBlock.className = 'audio-game-answers';
    answersBlock.addEventListener('click', checkAnswer);

    for (let i = 0; i < 5; i += 1) {
      const answer = document.createElement('div');
      answer.className = 'answer';
      answer.innerText = arrCopy[i];
      answersBlock.append(answer);
    }
    answersBlock.childNodes[choosePage(0,4)].textContent = wordsRusArray[pageNum];

    const buttonBlock = document.createElement('div');
    buttonBlock.className = 'audion-btn';
    buttonBlock.addEventListener('click', nextPage)

    const knowButton = document.createElement('button');
    knowButton.className = 'know';
    knowButton.innerText = 'Не знаю';

    window.addEventListener('keydown', spaceSound);
    window.addEventListener('keypress', answersKeybord);
    window.addEventListener('keydown', nextPageEnter);

    section.appendChild(progressBar);
    section.appendChild(container);
    container.appendChild(gameAudioPage);
    gameAudioPage.appendChild(soundSwitcher);
    gameAudioPage.appendChild(gameImg);
    gameAudioPage.appendChild(soundBlock);
    gameImg.appendChild(imageBlock)
    imageBlock.appendChild(wordImage);
    soundBlock.appendChild(soundImage);
    soundBlock.appendChild(soundWord);
    gameAudioPage.appendChild(answersBlock);
    gameAudioPage.appendChild(buttonBlock);
    buttonBlock.appendChild(knowButton);

    const main = document.querySelector('.main');
    main.appendChild(section);
  }
};
