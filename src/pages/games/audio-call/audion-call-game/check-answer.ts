import { wordsRusArray, pageNum, arrTrueAnswer, arrFalseAnswer } from "./audio-call";
import { showAnswer } from "./show-answer";
import { playCorrectSound, playWrongSound } from "./switch-sound";

/*проверка ответа*/
export function checkAnswer() {
    const target = event.target as HTMLElement;
    const answers = document.querySelectorAll('.answer') as NodeList;
    const knowBtn = document.querySelector('.audion-btn') as HTMLElement;

    if ((target.closest('.answer') as HTMLElement).innerText === wordsRusArray[pageNum]) {
      target.classList.add('active');
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      playCorrectSound();
      answers.forEach((el: any) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
    });
    }
    else {
      target.style.color = 'red';
      target.style.textDecoration = 'line-through';
      playWrongSound();
      answers.forEach((el: any) => {
      if (el.innerText === wordsRusArray[pageNum]) {
        el.classList.add('active');
      }
      else if (el.innerText != wordsRusArray[pageNum]) {
        el.style.opacity = '0.4';
        el.classList.add('event');
      }
    })
    arrFalseAnswer.push(wordsRusArray[pageNum]);
}
showAnswer();
knowBtn.innerText = 'Далее';
}