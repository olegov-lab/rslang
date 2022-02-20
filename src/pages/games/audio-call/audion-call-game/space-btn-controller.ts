/*проигрывание звука при нажатии на пробел*/
import { playSound } from "./play-word-audio";

export function spaceSound(event: KeyboardEvent) {
    const keyPress = event.keyCode;
    if (keyPress === 32) {
      event.preventDefault();
      playSound();
    };
  };