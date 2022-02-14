import { wordsEnArray } from "../../pages/games/audio-call/audion-call-game/audio-call";

export let checkWrong = function() {
const arrWords = document.querySelectorAll('.textbook-item');

let r = Array.from(arrWords).every(item => {
  if(item.classList.value == "textbook-item easy-word") {
    return true;
  }
  });

  if(r === true) {
    document.querySelector('.textbook-container').classList.add('page-right-answer');
    document.querySelector('.games-mini').classList.add('disabled-link');
    arrWords.forEach(item => {
      document.querySelector('.btn-prev').classList.add('easy-word-btn');
      document.querySelector('.btn-next').classList.add('easy-word-btn');
    })
  } else if (r === false) {
    document.querySelector('.textbook-container').classList.remove('page-right-answer');
    document.querySelector('.games-mini').classList.remove('disabled-link');
    arrWords.forEach(item => {
      document.querySelector('.btn-prev').classList.remove('easy-word-btn');
      document.querySelector('.btn-next').classList.remove('easy-word-btn');
    })
  }

}