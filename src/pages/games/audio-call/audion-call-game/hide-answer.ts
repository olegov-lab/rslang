/*скрытие ответа с картинкой*/
export function hideAnswer() {
    const imageBlock = document.querySelector('.audio-game-img');
    const sound = document.querySelector('.sound');
    const soundWord = document.querySelector('.sound-word');
    imageBlock.classList.remove('active');
    sound.classList.remove('active');
    soundWord.classList.remove('active');
  };