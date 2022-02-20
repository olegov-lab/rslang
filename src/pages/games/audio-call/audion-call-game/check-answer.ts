import { wordsRusArray, wordsEnArray, pageNum, arrTrueAnswer, arrFalseAnswer, arrTrueAnswerEn, arrFalseAnswerEn,
   arrFalseAnswerAudio, audioArray, arrTrueAnswerAudio, arrWordsID, arrFalseWordsID, arrTrueWordsID
 } from "./audio-call";
import { showAnswer } from "./show-answer";
import { playCorrectSound, playWrongSound } from "./switch-sound";
import { countingLongestAnswerRightAudioCall, giveAudioCallStatistics, resetLongestAnswerRightAudioCall, countingPercentAnswerRightAudioCall, resultsAudioCall } from "./audio-call-statistics";
import { progressWidth } from "./audio-call";
import { progressBar } from "./progress-bar";
import { disable } from "./disable-keyboard";


/*проверка ответа*/
export function checkAnswer(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const answers = document.querySelectorAll('.answer') as NodeList;
    const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

    if ((target.closest('.answer') as HTMLElement).innerText === wordsRusArray[pageNum]) {
      target.classList.add('active');

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
          //el.style["pointer-events"] = "none";
        }
    });
    }
    else {
      target.style.color = 'red';
      target.style.textDecoration = 'line-through';

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
        //el.style["pointer-events"] = "none";
      }
    })
    arrFalseAnswer.push(wordsRusArray[pageNum]);
    arrFalseAnswerEn.push(wordsEnArray[pageNum]);
    arrFalseAnswerAudio.push(audioArray[pageNum]);
    arrFalseWordsID.push(arrWordsID[pageNum]);
    resultsAudioCall.wordsWrongAnswers.push(arrWordsID[pageNum]);

}
disable();
showAnswer();
progressBar(progressWidth);
countingPercentAnswerRightAudioCall();
giveAudioCallStatistics();
knowBtn.innerText = 'Далее';
};