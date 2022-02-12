
export function validateFormEmptyPass(value) {
  if (value == "" || value.length < 8) {
    document.querySelector('.correct-pass').textContent  = `Введите пароль: не менее 8 символов`;
  }
}

export function validateEmail(value) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let address = value;
  if(reg.test(address) == false || value == "") {
    document.querySelector('.correct-mail').textContent  = `Введи валидный e-mail`;
     return false;
  }
}