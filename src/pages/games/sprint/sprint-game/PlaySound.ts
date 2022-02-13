import { Component } from '../../../../utils/component';
import { sprintData } from './sprint-page/sprintData';

export class PlaySound {
  correctSound: HTMLAudioElement;

  wrongSound: HTMLAudioElement;

  constructor() {
    this.correctSound = new Audio('../../../../assets/correct-sound.mp3');
    this.wrongSound = new Audio('../../../../assets/wrong-sound.mp3');
  }

  static changeMute() {
    if (sprintData.muted === true) {
      sprintData.muted = false;
    } else {
      sprintData.muted = true;
    }
  }

  playCorrectSound() {
    const sound = sprintData.muted ? 0 : this.correctSound.play();
  }

  playWrongSound() {
    const sound = sprintData.muted ? 0 : this.wrongSound.play();
  }
}
