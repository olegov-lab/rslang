type UserWord = {
  difficulty?: string,
  optional?: {
    testFieldBoolean?: boolean,
    testFieldString?: string,
  }
}
export interface IGameData {
    id: string,
    word: string,
    translate: string,
    correctTranslate: string,
    audio: string,
    answer: boolean,
    userAnswer?: boolean,
    userWord?: UserWord,
}

export const sprintData: {
    timerStatus: boolean,
    muted: boolean,
    inputActive: boolean,
    currentGroup: undefined|number,
    currentPage: undefined|number,
    currentNumberWord: number,
    currentWordsKit: Array<IGameData>} = {
      timerStatus: true,
      muted: false,
      inputActive: false,
      currentGroup: undefined,
      currentPage: undefined,
      currentWordsKit: [],
      currentNumberWord: 0,
    };
