export function getWordOptions() {
  const arrWords = document.querySelectorAll('.textbook-item');

arrWords.forEach(item => {
  document.querySelector('.likes-option').classList.remove('hidden');
  console.log(document.querySelector('.pagination'))
})
}

export function removeWordOptions() {
  const arrWords = document.getElementsByClassName('.textbook-item');

  console.log(arrWords)

Array.from(arrWords).forEach(item => {
  //console.log(item)
  document.querySelector('.likes-option').classList.add('hidden');
  console.log(item)
})
}