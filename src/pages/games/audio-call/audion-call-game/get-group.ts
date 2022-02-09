import { choosePage } from "./get-page";
import { getPageAndGroup } from "./get-page-and-group";

/*выбор группы слова*/
export function chooseGroup() {
    const gameAudioDesc = document.querySelector('.select-audio-play-difficulty') as HTMLInputElement;
    const group = +gameAudioDesc.value;
    getPageAndGroup(group, choosePage(0, 29));
  };