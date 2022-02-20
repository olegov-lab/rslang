import { Component } from "../../utils/component";

import { createUser, loginUser } from "../../api/user-authorization";

import { validateFormEmptyPass, validateEmail } from "./validate-form"

import "./form.css";

import {getUserStatistics , updateUserStatistics} from "../../api/statistics"

export class Form extends Component{
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'form', ['form', 'wrapper']);

    this.element.innerHTML = `
    <div class="div-input">
    <ul>
     <li>
      <input type="email" id="mail" name="user_mail" placeholder="e-mail" class="text-field" required>
     </li>
     <p class="correct-mail"></p>
     <li>
      <input type="password" id="password" name="password" placeholder="password" minlength="8" class="pass-field" required>
     </li>
    </ul>
    <p class="correct-pass"></p>
    <div class="btns-form">
    <button type="button" class="enter-btn-form">Войти</button>
    <button type="button" class="registr-btn-form">Регистрация</button>
    </div>
    <div class="errors-status"></div>
</div>
    `;

    const correct = document.querySelector('.correct-mail');

    const correctPass = document.querySelector('.correct-pass');

    const mail = document.querySelectorAll('input')[0];

    const pass = document.querySelectorAll('input')[1];

    const registrBtn = document.querySelector('.registr-btn-form');

    const enterBtn = document.querySelector('.enter-btn-form');

    let content;

    registrBtn.addEventListener('click', async () => {
      document.querySelector('.errors-status').textContent = '';

     let user = {
       email: mail.value,
       password: pass.value,
     }

     validateEmail(user.email);

     validateFormEmptyPass(user.password);

     createUser(user);

    })

    mail.addEventListener('input', changeEventSignIn);

    pass.addEventListener('input', changeEventSignIn);

    enterBtn.addEventListener('click', async () => {

      document.querySelector('.errors-status').textContent = '';

      let user = {
        email: mail.value,
        password: pass.value,
      };

      validateEmail(user.email);

      validateFormEmptyPass(user.password);



      await loginUser(user);

    })

    function changeEventSignIn() {
      correct.textContent = '';
      correctPass.textContent = '';
      document.querySelector('.errors-status').textContent = '';
    }

    //Обновление состояния аккаунта, взятие токена
    if(localStorage.getItem('token')) {
      document.querySelector('.nav-btn').classList.add('hidden');
      document.querySelector('.nav-btnEx').classList.remove('hidden');
    }
  }

}

