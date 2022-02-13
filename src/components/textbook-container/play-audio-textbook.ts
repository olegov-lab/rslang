

// btnPlayWord.addEventListener('click', () => {
//   const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word.audio}`);
//   audio.play();
// })


export function playSound(word) {
  const audio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${word}`);
  audio.play();
};