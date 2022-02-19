 let isPlay = true;

export function playCorrectSound() {
  const audio = new Audio("../../../../assets/correct-sound.mp3");
  if(isPlay){
    audio.play();
  };
};

export function playWrongSound() {
  const audio = new Audio(`../../../../assets/wrong-sound.mp3`);
  if(isPlay){
    audio.play();
  };
};

export function switchSound() {
  const image = document.querySelector('.switch-sound');
  if(isPlay) {
    isPlay = false; 
    image.classList.add('active');
  }
  else {
    isPlay = true;
    image.classList.remove('active');
  }
}
