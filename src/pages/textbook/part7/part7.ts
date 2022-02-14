
import { getUserAggrWord, createUserWord, getUserAggrWordHard, getUserAggrWordHardAll }
from '../../../api/user-aggregated';


export async function good(data): Promise<void> {

    let userId = localStorage.getItem('userId');

    //const data = await getUserAggrWordHardAll(userId);
    console.log(data);



  if (data) {
    const words = data;

  this.words = words.map((word) => {

    document.querySelector('.textbook-container-block').innerHTML = `<p>${word}</p>`;

  console.log(word.audio)
        return word;
      });
    }

  //   this.textbookContainer.addItems(words);

  //   this.textbookContainer7.pagination.updateNextButton(this.page, 28, 1);


  //   if(localStorage.getItem('token')) {

  //     const difBtn = document.querySelector('.btn.btn-dif');
  //     //difBtn.removeAttribute('disabled');
  //     //difBtn.classList.remove('non-event');

  //     const remBtn = document.querySelector('.btn.btn-rem');
  //     //remBtn.removeAttribute('disabled');
  //     //remBtn.classList.remove('non-event');

  //   } else {
  //     const difBtn = document.querySelector('.btn.btn-dif');
  //     //difBtn.setAttribute('disabled', 'true');
  //     //difBtn.classList.add('non-event');

  //     const remBtn = document.querySelector('.btn.btn-rem');
  //     //remBtn.setAttribute('disabled', 'true');
  //     //remBtn.classList.add('non-event');
  //   }

  // }
}

// if(localStorage.getItem('group') == '6' && `${window.location.hash.slice(-1)}` != '6' ) {
//   localStorage.setItem('group', `${window.location.hash.slice(-1)}`);
// } else {
//   localStorage.setItem('group', `0`);
// }

// if(localStorage.getItem('group') == '6' && `${window.location.hash.slice(-1)}` != '6' ) {
//   localStorage.setItem('group', `${window.location.hash.slice(-1)}`);
// } else {
//   localStorage.setItem('group', `0`);
// }

// export function good(data) {
//   document.querySelector('.textbook-container-block').innerHTML = `${data}`;
// }

