interface IGameData {
    word: string,
    translate: string,
    audio: string,
    answer: boolean,
    userAnswer?: boolean,
}

export const sprintData: {
    muted: boolean,
    currentGroup: undefined|number,
    currentPage: undefined|number,
    currentNumberWord: number,
    currentWordsKit: Array<IGameData>} = {
      muted: false,
      currentGroup: undefined,
      currentPage: undefined,
      currentWordsKit: [],
      currentNumberWord: 0,
    };
