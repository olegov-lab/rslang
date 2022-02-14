/*(import {wordsRusArray, pageNum, arrTrueAnswer, arrFalseAnswer } from './audio-call';
import { playCorrectSound, playWrongSound } from './switch-sound';
import {showAnswer } from './show-answer';

export function answersKeybord(event: KeyboardEvent) {
    const keyPress:any = event.keyCode;
    const answers = document.querySelectorAll('.answer') as NodeList;
    const knowBtn = document.querySelector('.audion-btn') as HTMLElement;
    const arr = Array.from(answers) as HTMLElement
   if(keyPress === 49) {
    if (answers[0].textContent === wordsRusArray[pageNum] ) {
      console.log('true')
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      playCorrectSound();
      arr.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
    });
  }
  else {
    //answers[0].textContent.style.color = 'red';
    //target.style.textDecoration = 'line-through';
    playWrongSound();
    answers.forEach((el: HTMLElement) => {
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
   }
   else if(keyPress === 50) {
    if (answers[1].textContent === wordsRusArray[pageNum] ) {
      console.log('true')
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      //playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
    });
  }
  else {
    //answers[0].textContent.style.color = 'red';
    //target.style.textDecoration = 'line-through';
    playWrongSound();
    answers.forEach((el: HTMLElement) => {
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
   }
   else if(keyPress === 51) {
    if (answers[2].textContent === wordsRusArray[pageNum] ) {
      console.log('true')
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      //playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
    });
  }
  else {
    //answers[0].textContent.style.color = 'red';
    //target.style.textDecoration = 'line-through';
    playWrongSound();
    answers.forEach((el: HTMLElement) => {
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
   }
  
   else if(keyPress === 52) {
    if (answers[2].textContent === wordsRusArray[pageNum] ) {
      console.log('true')
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      //playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
    });
  }
  else {
    //answers[0].textContent.style.color = 'red';
    //target.style.textDecoration = 'line-through';
    playWrongSound();
    answers.forEach((el: HTMLElement) => {
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
   }
   else if(keyPress === 53) {
    if (answers[2].textContent === wordsRusArray[pageNum] ) {
      console.log('true')
      arrTrueAnswer.push(wordsRusArray[pageNum]);
      //playCorrectSound();
      answers.forEach((el: HTMLElement) => {
        if (el.innerText != wordsRusArray[pageNum]) {
          el.style.opacity = '0.4';
          el.classList.add('event');
        }
    });
  }
  else {
    //answers[0].textContent.style.color = 'red';
    //target.style.textDecoration = 'line-through';
    playWrongSound();
    answers.forEach((el: HTMLElement) => {
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
   }
  showAnswer();
  knowBtn.innerText = 'Далее';
  }
  
  document.addEventListener('keypress', answersKeybord)*/