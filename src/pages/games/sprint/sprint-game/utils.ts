import { sprintData } from './sprint-page/sprintData';

export const changeMuteIcon = (element: HTMLElement): void => {
  if (sprintData.muted) {
    element.classList.add('muted');
    element.classList.remove('unmuted');
  } else {
    element.classList.add('unmuted');
    element.classList.remove('muted');
  }
};
