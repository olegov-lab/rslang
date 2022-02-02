import './games-selector.css';

export const body = document.body;
body.insertAdjacentHTML('afterbegin', `
<section class="games-page" style="display: none;">
<div class="container">
    <div class="games-page-title">Мини-игры</div>
    <div class="games">
        <div class="game-audio-call-select">
            <div class="game-audio-call-title">Аудиовызов</div>
        </div>
        <div class="game-sprint-select">
            <div class="game-sprint-title">Спринт</div>
        </div>
    </div>
</div>
</section>`);