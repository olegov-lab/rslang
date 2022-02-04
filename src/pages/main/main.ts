import { Component } from '../../utils/component';
import './main.css'
export class MainPage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['main-gretting']);

    const mainGuest = new Component(this.element, 'p', ['logo-gretting'], 'главная');

  }
}

/*разметка для команды*/ 
/*
body.insertAdjacentHTML('afterbegin', `
<section class="team-info">
<div class="container">
    <div class="team-info-title">наша команда</div>
  <div class="team-members">
          <div class="member-item">
              <img src=("../../assets/pasha.png") alt="Pasha" class="member-photo">
              <div class="member-description">
                <div class="member-name">Павел Чечелев</div>
                <a class="member-github" href="https://github.com/Chechelev">chechelev</a>
                <div class="member-position">Developer</div>
                <ul class="member-actions-block">
                    <li class="memeber-actions">Страница первая</li>
                    <li class="memeber-actions">Страница</li>
                    <li class="memeber-actions">Страница</li>
                    <li class="memeber-actions">Страница</li>
                </ul>
              </div>
          </div>

          <div class="member-item">
            <img src="../..assets/oleg.jpg" alt="" class="member-photo">
            <div class="member-description">
              <div class="member-name">Олег Кощетов</div>
              <a class="member-github" href="https://github.com/olegov-lab">olegov-lab</a>
              <div class="member-position">Team-lead</div>
              <ul class="member-actions-block">
                  <li class="memeber-actions">Страница первая</li>
                  <li class="memeber-actions">Страница</li>
                  <li class="memeber-actions">Страница</li>
                  <li class="memeber-actions">Страница</li>
              </ul>
            </div>
        </div>

        <div class="member-item">
            <img src="../..assets/ivan.jpg" alt="" class="member-photo">
            <div class="member-description">
              <div class="member-name">Иван Лащук</div>
              <a class="member-github" href="https://github.com/britva1910">britva1910</a>
              <div class="member-position">Developer</div>
              <ul class="member-actions-block">
                  <li class="memeber-actions">Страница первая</li>
                  <li class="memeber-actions">Страница</li>
                  <li class="memeber-actions">Страница</li>
                  <li class="memeber-actions">Страница</li>
              </ul>
            </div>
        </div>
  </div>
</div>
</section>
`);
*/