export function getPaginat() {
  const arrWords = document.querySelectorAll('.textbook-item');

arrWords.forEach(item => {
  document.querySelector('.pagination').classList.remove('hidden');

})
}

export function removePaginat() {
  const arrWords = document.querySelectorAll('.textbook-item');

arrWords.forEach(item => {
  document.querySelector('.pagination').classList.add('hidden');

})
}