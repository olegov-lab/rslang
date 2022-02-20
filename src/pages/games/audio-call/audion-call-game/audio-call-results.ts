import './audio-call-results';
import{ arrTrueAnswer , arrFalseAnswer, arrTrueAnswerEn, arrFalseAnswerEn, clearArraysRepeat, arrTrueAnswerAudio, arrFalseAnswerAudio } from './audio-call';
import { resetLongestAnswerRightAudioCall, resetResultsAudioCall } from "./audio-call-statistics";
import { resetProgressBar } from './audio-call';

export function renderAudioCallResults() {
    const fragment = document.createDocumentFragment();

    const popup = document.createElement('div');
    popup.className = 'popup popup-order';

    const popupWrapper = document.createElement('div');
    popupWrapper.className = 'popup_wrapper';

    const popupInner = document.createElement('div');
    popupInner.className = 'popup_inner';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup_content';

    const popupTitle = document.createElement('h2');
    popupTitle.className = 'popup-title';

    if (arrTrueAnswer.length <= 5) {
        popupTitle.innerHTML = 'Попробуйте еще раз!'
    } else if (arrTrueAnswer.length > 5 && arrTrueAnswer.length <= 14) {
        popupTitle.innerHTML = 'Хороший результат!'
    } else if (arrTrueAnswer.length > 14 && arrTrueAnswer.length <= 20) {
        popupTitle.innerHTML = 'Вы молодец!'
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';

    const leftResults = document.createElement('div');
    leftResults.className = 'left';

    const correctWordsNumber = document.createElement('div');
    correctWordsNumber.className = 'correct-words-number';
    correctWordsNumber.innerHTML = `Знаю: ${arrTrueAnswer.length}`;

    for (let i = 0; i < arrTrueAnswer.length; i += 1) {
        const wordBlock = document.createElement('div');
        wordBlock.className = 'word';
    
        const wordIcon = document.createElement('span');
        wordIcon.className = 'result-word-icon';

        const word = document.createElement('div');
        word.className = 'word-word';

        wordBlock.appendChild(wordIcon);

        word.innerText = `${arrTrueAnswer[i]} — ${arrTrueAnswerEn[i] }`;
        wordBlock.append(word);
        correctWordsNumber.append(wordBlock);
        wordIcon.onclick = () => {
            const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${arrTrueAnswerAudio[i]}`);
        audio.play();
        }
    }

    const line = document.createElement('hr');
    line.className = 'hr-style';

    const rightResults = document.createElement('div');
    rightResults.className = 'right';

    const wrongWordsNumber = document.createElement('div');
    wrongWordsNumber.className = 'wrong-words-number';
    wrongWordsNumber.innerHTML = `Ошибок: ${arrFalseAnswer.length}`;

    for (let i = 0; i < arrFalseAnswer.length; i += 1) {
        const wordBlock = document.createElement('div');
        wordBlock.className = 'word';
    
        const wordIcon = document.createElement('span');
        wordIcon.className = 'result-word-icon';

        const word = document.createElement('div');
        word.className = 'word-word';

        wordBlock.appendChild(wordIcon);

        word.innerText = `${arrFalseAnswer[i]} — ${arrFalseAnswerEn[i] }`;
        wordBlock.append(word);
        wrongWordsNumber.append(wordBlock);

        wordIcon.onclick = () => {
            const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${arrFalseAnswerAudio[i]}`);
        audio.play();
        }
    }

    const returnBtnContainer = document.createElement('a');
    returnBtnContainer.className = 'return-btn-container';
    returnBtnContainer.href = "#/games/audio";

    const returnBtn = document.createElement('div');
    returnBtn.className = 'return-btn';
    returnBtn.addEventListener('click', clearArraysRepeat);
    returnBtn.addEventListener('click', resetLongestAnswerRightAudioCall);
    returnBtn.addEventListener('click', resetProgressBar);
    //returnBtn.addEventListener('click', resetResultsAudioCall);

    const returnGame = document.createElement('div');
    returnGame.className = 'return';
    returnGame.innerHTML = 'Сыграть еще!';

    fragment.appendChild(popup);
    popup.appendChild(popupWrapper);
    popupWrapper.appendChild(popupInner);
    popupInner.appendChild(popupContent);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(resultsContainer);
    resultsContainer.appendChild(leftResults);
    resultsContainer.appendChild(line);
    resultsContainer.appendChild(rightResults);
    leftResults.append(correctWordsNumber);
    rightResults.append(wrongWordsNumber);
    popupContent.appendChild(returnBtnContainer);
    returnBtnContainer.appendChild(returnBtn);
    returnBtn.appendChild(returnGame);
    const main = document.querySelector('.main');
    main.appendChild(fragment);
};

