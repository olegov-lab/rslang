import {body} from "../../games-selector/games-selector";
import './audio-call-description.css';

body.insertAdjacentHTML('afterbegin',
    `<section class="game-audio-description" style ="display:none">
<div class="container">
    <div class="audio-call-title">Аудиовызов</div>
    <div class="audio-call-description">
        <div class="audio-call-main-text">«Аудиовызов» - это тренировка, которая <br> улучшает восприятие речи на слух</div>
        <div class="audio-call-sub-text">
            <ul>
                <li>Используйте мышь, чтобы выбрать</li>
                <li>Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
                <li>Используйте пробел для повтроного звучания слова</li>
                <li>Используйте клавишу Enter для подсказки или для перехода к следующему слову</li>
              </ul>
              
        </div>
    </div>
    <div class="audio-call-buttons">
        <div class="audio-call-difficulty">
            <select class="select-audio-play-difficulty">
                <option>Выберите сложность</option>
                <option value="value1">Группа 1</option>
                <option value="value2">Группа 2</option>
                <option value="value3">Группа 3</option>
                <option value="value1">Группа 4</option>
                <option value="value2">Группа 5</option>
                <option value="value3">Группа 6</option>
                <option value="value3">Группа 7</option>
              </select>
        </div>
        <div class="audio-call-start">
            <button class="audio-call-start-btn">Начать игру</button>
        </div>
    </div>
</div>
</section>`)