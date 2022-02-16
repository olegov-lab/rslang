import { wordsRusArray, wordsEnArray, pageNum, arrTrueAnswer, arrFalseAnswer, arrTrueAnswerEn, arrFalseAnswerEn,
   arrFalseAnswerAudio, audioArray, arrTrueAnswerAudio, arrWordsID, arrFalseWordsID, arrTrueWordsID
 } from "./audio-call";
import { showAnswer } from "./show-answer";
import { playCorrectSound, playWrongSound } from "./switch-sound";

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
      console.log('ID правильных слов ' + arrTrueWordsID)

      playCorrectSound();

      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
          el.style["pointer-events"] = "none";
        }
    });
    }
    else {
      target.style.color = 'red';
      target.style.textDecoration = 'line-through';
      playWrongSound();
      answers.forEach((el: HTMLElement) => {
      if (el.innerText === wordsRusArray[pageNum]) {
        el.classList.add('active');
        el.style["pointer-events"] = "none";
      }
      else if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
        el.style["pointer-events"] = "none";
      }
    })
    arrFalseAnswer.push(wordsRusArray[pageNum]);
    arrFalseAnswerEn.push(wordsEnArray[pageNum]);
    arrFalseAnswerAudio.push(audioArray[pageNum]);
    arrFalseWordsID.push(arrWordsID[pageNum]);
    console.log('ID неправильных слов ' + arrFalseWordsID)
}
showAnswer();
knowBtn.innerText = 'Далее';
}