import { getWords } from "../../../../api/api";
import { renderGameAudioPage } from "./render-audio-call-page";

const main = async () => {
  const words = await getWords(0, 0);

  console.log(words);

};

main();

const body = document.body;
body.addEventListener('click', renderGameAudioPage);