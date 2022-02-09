import {audioArray, pageNum} from "./audio-call";
/*проигрывание звука*/
export function playSound() {
    const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${audioArray[pageNum]}`);
    audio.play();
  };