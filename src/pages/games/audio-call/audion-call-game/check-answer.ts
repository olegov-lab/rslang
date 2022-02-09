import {wordsRusArray, pageNum, arrTrueAnswer, arrFalseAnswer} from "./audio-call";
import {showAnswer} from "./show-answer";

/*проверка ответа*/
export function checkAnswer() {
    const target = event.target as HTMLElement;
    const answers = document.querySelectorAll('.answer') as NodeList;
    const knowBtn = document.querySelector('.audion-btn') as HTMLElement;
  
    answers.forEach((el: any) => {
      if (target.innerText === wordsRusArray[pageNum]) {
        target.classList.add('active');
        arrTrueAnswer.push(el);
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
        }
      } else {
        target.style.color = 'red';
        target.style.textDecoration = 'line-through';
        if (el.innerText === wordsRusArray[pageNum]) {
          el.classList.add('active');
        }
        else if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
        }
        arrFalseAnswer.push(el);
      }
    })
    showAnswer();
    knowBtn.innerText = 'Далее';
  };