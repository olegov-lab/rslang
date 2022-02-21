import {wordsRusArray, pageNum, arrTrueAnswer, arrFalseAnswer, arrTrueAnswerEn,
   wordsEnArray, arrTrueAnswerAudio, audioArray, arrTrueWordsID, arrWordsID, arrFalseAnswerEn, arrFalseAnswerAudio, arrFalseWordsID } from './audio-call';
import { playCorrectSound, playWrongSound } from './switch-sound';
import { resultsAudioCall} from "./audio-call-statistics";
import { countingPercentAnswerRightAudioCall, countingLongestAnswerRightAudioCall, resetLongestAnswerRightAudioCall } from "./audio-call-statistics";
import { progressBar } from './progress-bar';
import {showAnswer } from './show-answer';
import { progressWidth } from './audio-call';
import {giveAudioCallStatistics} from './audio-call-statistics';
import { disable } from './disable-keyboard';

 /*ответ кнопками*/
export function answersKeybord(event: KeyboardEvent) {
  const keyPress:any = event.key;
  const answers = document.querySelectorAll('.answer') as NodeList;
  const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

 if (keyPress == 1) {

  if (answers[0].textContent === wordsRusArray[pageNum] ) {

    (answers[0] as HTMLElement).className = 'answer active';
    
    arrTrueAnswer.push(wordsRusArray[pageNum]);
    arrTrueAnswerEn.push(wordsEnArray[pageNum]);
    arrTrueAnswerAudio.push(audioArray[pageNum]);
    arrTrueWordsID.push(arrWordsID[pageNum]);

    resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
    countingLongestAnswerRightAudioCall();

    playCorrectSound();

    answers.forEach((el: HTMLElement) => {
      if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
  });
}
else {
  (answers[0] as HTMLElement).style.color = 'red';
  (answers[0] as HTMLElement).style.textDecoration = 'line-through';

  playWrongSound();
  resetLongestAnswerRightAudioCall();


  answers.forEach((el: HTMLElement) => {
  if (el.innerText === wordsRusArray[pageNum]) {
    el.classList.add('active');
    el.classList.add('event');
  }
  else if (el.innerText != wordsRusArray[pageNum]) {
    el.style.opacity = '0.4';
    el.classList.add('event');
  }
});
arrFalseAnswer.push(wordsRusArray[pageNum]);
arrFalseAnswerEn.push(wordsEnArray[pageNum]);
arrFalseAnswerAudio.push(audioArray[pageNum]);
arrFalseWordsID.push(arrWordsID[pageNum]);
resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
    }
 
}

if (keyPress == 2) {

  if (answers[1].textContent === wordsRusArray[pageNum] ) {

    (answers[1] as HTMLElement).className = 'answer active';

    arrTrueAnswer.push(wordsRusArray[pageNum]);
    arrTrueAnswerEn.push(wordsEnArray[pageNum]);
    arrTrueAnswerAudio.push(audioArray[pageNum]);
    arrTrueWordsID.push(arrWordsID[pageNum]);

    resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
    countingLongestAnswerRightAudioCall();

    playCorrectSound();
    answers.forEach((el: HTMLElement) => {
      if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
  });
}
else {
  (answers[1] as HTMLElement).style.color = 'red';
  (answers[1] as HTMLElement).style.textDecoration = 'line-through';

  playWrongSound();
  resetLongestAnswerRightAudioCall();

  answers.forEach((el: HTMLElement) => {
  if (el.innerText === wordsRusArray[pageNum]) {
    el.classList.add('active');
    el.classList.add('event');
  }
  else if (el.innerText != wordsRusArray[pageNum]) {
    el.style.opacity = '0.4';
    el.classList.add('event');
  }
});
arrFalseAnswer.push(wordsRusArray[pageNum]);
arrFalseAnswerEn.push(wordsEnArray[pageNum]);
arrFalseAnswerAudio.push(audioArray[pageNum]);
arrFalseWordsID.push(arrWordsID[pageNum]);
resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
  }
}

if (keyPress == 3) {

  if (answers[2].textContent === wordsRusArray[pageNum] ) {

    (answers[2] as HTMLElement).className = 'answer active';

    arrTrueAnswer.push(wordsRusArray[pageNum]);
    arrTrueAnswerEn.push(wordsEnArray[pageNum]);
    arrTrueAnswerAudio.push(audioArray[pageNum]);
    arrTrueWordsID.push(arrWordsID[pageNum]);

    resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
    countingLongestAnswerRightAudioCall();

    playCorrectSound();
    answers.forEach((el: HTMLElement) => {
      if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
  });
}
else {
  (answers[2] as HTMLElement).style.color = 'red';
  (answers[2] as HTMLElement).style.textDecoration = 'line-through';

  playWrongSound();
  resetLongestAnswerRightAudioCall();

  answers.forEach((el: HTMLElement) => {
  if (el.innerText === wordsRusArray[pageNum]) {
    el.classList.add('active');
    el.classList.add('event');
  }
  else if (el.innerText != wordsRusArray[pageNum]) {
    el.style.opacity = '0.4';
    el.classList.add('event');
  }
});
arrFalseAnswer.push(wordsRusArray[pageNum]);
arrFalseAnswerEn.push(wordsEnArray[pageNum]);
arrFalseAnswerAudio.push(audioArray[pageNum]);
arrFalseWordsID.push(arrWordsID[pageNum]);
resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
  }
}

if (keyPress == 4) {

  if (answers[3].textContent === wordsRusArray[pageNum] ) {

    (answers[3] as HTMLElement).className = 'answer active';

    arrTrueAnswer.push(wordsRusArray[pageNum]);
    arrTrueAnswerEn.push(wordsEnArray[pageNum]);
    arrTrueAnswerAudio.push(audioArray[pageNum]);
    arrTrueWordsID.push(arrWordsID[pageNum]);

    resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
    countingLongestAnswerRightAudioCall();

    playCorrectSound();
    answers.forEach((el: HTMLElement) => {
      if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
  });
}
else {
  (answers[3] as HTMLElement).style.color = 'red';
  (answers[3] as HTMLElement).style.textDecoration = 'line-through';

  playWrongSound();
  resetLongestAnswerRightAudioCall();

  answers.forEach((el: HTMLElement) => {
  if (el.innerText === wordsRusArray[pageNum]) {
    el.classList.add('active');
    el.classList.add('event');
  }
  else if (el.innerText != wordsRusArray[pageNum]) {
    el.style.opacity = '0.4';
    el.classList.add('event');
  }
});
arrFalseAnswer.push(wordsRusArray[pageNum]);
arrFalseAnswerEn.push(wordsEnArray[pageNum]);
arrFalseAnswerAudio.push(audioArray[pageNum]);
arrFalseWordsID.push(arrWordsID[pageNum]);
resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
  }
}
if (keyPress == 5) {

  if (answers[4].textContent === wordsRusArray[pageNum] ) {

    (answers[4] as HTMLElement).className = 'answer active';

    arrTrueAnswer.push(wordsRusArray[pageNum]);
    arrTrueAnswerEn.push(wordsEnArray[pageNum]);
    arrTrueAnswerAudio.push(audioArray[pageNum]);
    arrTrueWordsID.push(arrWordsID[pageNum]);

    resultsAudioCall.wordsCorrectAnswers.push(arrWordsID[pageNum]);
    countingLongestAnswerRightAudioCall();

    playCorrectSound();
    answers.forEach((el: HTMLElement) => {
      if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
  });
}
else {
  (answers[4] as HTMLElement).style.color = 'red';
  (answers[4] as HTMLElement).style.textDecoration = 'line-through';

  playWrongSound();
  resetLongestAnswerRightAudioCall();

  answers.forEach((el: HTMLElement) => {
  if (el.innerText === wordsRusArray[pageNum]) {
    el.classList.add('active');
    el.classList.add('event');
  }
  else if (el.innerText != wordsRusArray[pageNum]) {
    el.style.opacity = '0.4';
    el.classList.add('event');
  }
});
arrFalseAnswer.push(wordsRusArray[pageNum]);
arrFalseAnswerEn.push(wordsEnArray[pageNum]);
arrFalseAnswerAudio.push(audioArray[pageNum]);
arrFalseWordsID.push(arrWordsID[pageNum]);
resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);
  }
}
disable();
showAnswer();
progressBar(progressWidth);
countingPercentAnswerRightAudioCall();
giveAudioCallStatistics();
knowBtn.innerText = 'Далее';
};



