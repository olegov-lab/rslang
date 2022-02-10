import './audio-call.css';


/*рендер страницы игры*/
export function renderGameAudioPage() {

    const target = event.target as HTMLElement;
    const gameAudioDesc = document.querySelector('.game-audio-description') as HTMLElement;
  
    if ((target as HTMLDivElement).closest('.audio-call-start')) {
  
      gameAudioDesc.style.display = "none";
  
      const section = document.createElement('section');
      section.className = 'game-audio';
  
      const container = document.createElement('div');
      container.className = 'container';
  
      const gameAudioPage = document.createElement('div');
      gameAudioPage.className = 'game-audio-page';
  
      const imageBlock = document.createElement('div');
      imageBlock.className = 'audio-game-img';
  
      const wordImage = document.createElement('img');
  
      const soundBlock = document.createElement('div');
      soundBlock.className = 'sound-block';
  
      const soundImage = document.createElement('div');
      soundImage.className = 'sound';
  
      const soundWord = document.createElement('div');
      soundWord.className = 'sound-word';
  
      const answersBlock = document.createElement('div');
      answersBlock.className = 'audio-game-answers';
  
      for (let i = 0; i < 5; i += 1) {
        const answer = document.createElement('div');
        answer.className = 'answer';
        answersBlock.append(answer);
      }
  
      const buttonBlock = document.createElement('div');
      buttonBlock.className = 'audion-btn';
  
      const knowButton = document.createElement('button');
      knowButton.className = 'know';
      knowButton.innerText = 'Не знаю';
  
      section.appendChild(container);
      container.appendChild(gameAudioPage);
      gameAudioPage.appendChild(imageBlock);
      gameAudioPage.appendChild(soundBlock);
      imageBlock.appendChild(wordImage);
      soundBlock.appendChild(soundImage);
      soundBlock.appendChild(soundWord);
      gameAudioPage.appendChild(answersBlock);
      gameAudioPage.appendChild(buttonBlock);
      buttonBlock.appendChild(knowButton);
  
      const main = document.querySelector('.main');
      main.appendChild(section);
    }
  };
  