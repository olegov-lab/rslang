import './audio-call.css';
import { pageNum, wordsRusArray, arrCopy  } from './audio-call';
import { playSound } from './play-word-audio';
import { checkAnswer } from './check-answer';
import { choosePage } from './get-page';
import { nextPage } from './audio-call';

/*рендер страницы игры*/
export function renderGameAudioPage() {

  const target = event.target as HTMLElement;
  const gameAudioDesc = document.querySelector('.game-audio-description') as HTMLElement;

  if ((target as HTMLDivElement).closest('.audio-call-start')) {

    gameAudioDesc.style.display = "none";

    const section = document.createElement('section');
    section.className = 'game-audio';

    const container = document.createElement('div');
    container.className = 'container';

    const gameAudioPage = document.createElement('div');
    gameAudioPage.className = 'game-audio-page';

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

    section.appendChild(container);
    container.appendChild(gameAudioPage);
    gameAudioPage.appendChild(imageBlock);
    gameAudioPage.appendChild(soundBlock);
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