export function getPaginat() {
  const arrWords = document.querySelectorAll('.textbook-item');

arrWords.forEach(item => {
  document.querySelector('.pagination').classList.remove('hidden');
  console.log(document.querySelector('.pagination'))
})
}

export function removePaginat() {
  const arrWords = document.querySelectorAll('.textbook-item');

arrWords.forEach(item => {
  document.querySelector('.pagination').classList.add('hidden');
  console.log(document.querySelector('.pagination'))
})
}