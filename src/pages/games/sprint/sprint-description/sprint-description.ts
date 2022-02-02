const rootElement = document.body;

const section = document.createElement('section');
section.className = 'game-sprint-description';

section.innerHTML = `<div class="container">
    <div class="sprint-title">Спринт</div>
    <div class="sprint-decription">
        <div class="sprint-main-text">«Спринт» - это тренировка, которая <br> позволяет увеличить словарный запас</div>
        <div class="sprint-sub-text">
            <ul>
                <li>Используйте мышь, чтобы выбрать</li>
                <li>Используйте цифровые клавиши влево и вправо для выбора ответа</li>
              </ul>
        </div>
    </div>
    <div class="sprint-buttons">
        <div class="sprint-difficulty">
            <select class="select-sprint-difficulty">
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
        <div class="sprint-start">
            <button class="sprint-start-btn">Начать игру</button>
        </div>
    </div>
</div>`;

export const renderSprintDescription = () => {
  rootElement.append(section);
};
