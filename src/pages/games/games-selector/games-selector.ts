import './games-selector.css';
import { resetLongestAnswerRightAudioCall } from "../audio-call/audion-call-game/audio-call-statistics";
import { resetProgressBar } from '../audio-call/audion-call-game/audio-call';

export function renderGameChoice() {

    const section = document.createElement('section');
    section.classList.add('games-page');

    const container = document.createElement('div');
    container.classList.add('container');

    const gamesPageTitle = document.createElement('div');
    gamesPageTitle.classList.add('games-page-title');
    gamesPageTitle.innerText = 'Мини-игры';

    const games = document.createElement('div');
    games.classList.add('games');

    const gameAudio = document.createElement('a');
    gameAudio.href = '#/games/audio';

    const gameAudioCallSelect = document.createElement('div');
    gameAudioCallSelect.classList.add('game-audio-call-select');
    gameAudioCallSelect.addEventListener('click', resetLongestAnswerRightAudioCall);
    gameAudioCallSelect.addEventListener('click', resetProgressBar);

    const gameAudioCallTitle = document.createElement('div');
    gameAudioCallTitle.classList.add('game-audio-call-title');
    gameAudioCallTitle.innerText = 'Аудиовызов';

    const gameSprint = document.createElement('a');
    gameSprint.href = '#/games/sprint';

    const gameSprintSelect = document.createElement('div');
    gameSprintSelect.classList.add('game-sprint-select');

    const gameSprintTitle = document.createElement('div');
    gameSprintTitle.classList.add('game-audio-call-title');
    gameSprintTitle.innerText = 'Спринт';

    section.append(container);
    container.append(gamesPageTitle);
    container.append(games);
    games.append(gameAudio);
    games.append(gameSprint);
    gameAudio.append(gameAudioCallSelect);
    gameAudioCallSelect.append(gameAudioCallTitle);
    gameSprint.append(gameSprintSelect);
    gameSprintSelect.append(gameSprintTitle);

    return section;
}
