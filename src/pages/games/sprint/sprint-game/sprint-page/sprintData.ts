interface IGameData {
    word: string,
    translate: string,
    audio: string,
    answer: boolean,
}

export const sprintData: {
    currentGroup: undefined|number,
    currentPage: undefined|number,
    currentNumberWord: number,
    currentWordsKit: Array<IGameData>} = {
      currentGroup: undefined,
      currentPage: undefined,
      currentWordsKit: [],
      currentNumberWord: 0,
    };
