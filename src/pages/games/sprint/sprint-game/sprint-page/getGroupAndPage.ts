import { sprintData } from './sprintData';

export const defineGroupAndPage = async () => {
  if (localStorage.getItem('gameSource') === 'dictionary') {
    sprintData.currentGroup = Number(localStorage.getItem('group'));
    sprintData.currentPage = Number(localStorage.getItem('page'));
  } else {
    sprintData.currentGroup = Math.floor(Math.random() * (6 - 0) + 0);
    sprintData.currentPage = Math.floor(Math.random() * (19 - 0) + 0);
  }
}