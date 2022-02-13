import { IUserID, IUser, IUserToken } from "../interfaces/interface";
import { baseUrl } from "./api";

export let token: string;
export let message: string;
export let refreshToken: string;
export let userId: string;



export const createUser = async (user: {}): Promise<IUser> => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (rawResponse.status === 200) {
    document.querySelector('.errors-status').textContent = 'Регистрация завершена, можете войти';
  }

  if (rawResponse.status === 417) {
    document.querySelector('.errors-status').textContent = 'Пользователь существует, попробуйте войти';
  }

  if (rawResponse.status === 422 || rawResponse.status === 403) {
    document.querySelector('.errors-status').textContent = 'Ошибка ввода данных';
  }



  return await rawResponse.json();

} catch (err) {
  if (err instanceof Error) {
    throw new Error(err.message);
  }

}
};

export const loginUser = async (user: {}): Promise<IUserToken> => {
  try {
  const rawResponse = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });


  if (rawResponse.status === 200) {
    //document.querySelector('.errors-status').textContent = 'Вход выполнен успешно';
    document.querySelector('.nav-btn').classList.add('hidden');
    document.querySelector('.nav-btnEx').classList.remove('hidden');
    window.location.hash = '#/';
    window.location.reload();
  }

  if (rawResponse.status === 422 || rawResponse.status === 403) {
    document.querySelector('.errors-status').textContent = 'Ошибка ввода данных';
  }

  if (rawResponse.status === 404) {
    document.querySelector('.errors-status').textContent = 'Такого пользователя не существует';
  }

  const content = await rawResponse.json();

  token = content.token;
  message = content.message;
  refreshToken = content.refreshToken;
  userId = content.userId;

 //Сохранение токена, данных пользователя
   localStorage.setItem('token', token);

   localStorage.setItem('message', message);
   localStorage.setItem('refreshToken', refreshToken);
   localStorage.setItem('userId', userId);

  return await rawResponse.json();

} catch (err) {
  if (err instanceof Error) {
    throw new Error(err.message);
  }
}

};


