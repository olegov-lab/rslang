import {pageNum, wordsEnArray, wordsImgArray} from "./audio-call"
/*показ ответа с картинкой*/
export function showAnswer() {
    const imageBlock = document.querySelector('.audio-game-img') as HTMLElement;
    const image = document.querySelector('.audio-game-img > img') as HTMLImageElement;
    const sound = document.querySelector('.sound') as HTMLElement;
    const soundWord = document.querySelector('.sound-word') as HTMLElement;
    imageBlock.classList.add('active');
    image.src = `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${wordsImgArray[pageNum]}`;
    sound.classList.add('active');
    soundWord.classList.add('active');
    soundWord.innerText = wordsEnArray[pageNum];
  };