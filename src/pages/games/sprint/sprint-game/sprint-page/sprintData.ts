export interface IGameData {
    id: string,
    word: string,
    translate: string,
    correctTranslate: string,
    audio: string,
    answer: boolean,
    userAnswer?: boolean,
}

export const sprintData: {
    timerStatus: boolean,
    muted: boolean,
    currentGroup: undefined|number,
    currentPage: undefined|number,
    currentNumberWord: number,
    currentWordsKit: Array<IGameData>} = {
      timerStatus: true,
      muted: false,
      currentGroup: undefined,
      currentPage: undefined,
      currentWordsKit: [],
      currentNumberWord: 0,
    };
