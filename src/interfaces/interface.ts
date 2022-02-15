export interface IWords {
  _id: "string",
  group: 0,
  page: 0,
  word: "string",
  image: "string",
  audio: "string",
  audioMeaning: "string",
  audioExample: "string",
  textMeaning: "string",
  textExample: "string",
  transcription: "string",
  wordTranslate: "string",
  textMeaningTranslate: "string",
  textExampleTranslate: "string",
  userWord?: {
    difficulty: "string"
  }
}

export interface IUser {
    name?: "string",
    email: "string",
    password: "string"
}

export interface IUserID {
  id: "string",
  email: "string",
}
export interface IRouter {
  name: string;
  component: () => void;
}

export interface IUserToken {
    message: "string",
    token: "string",
    refreshToken: "string",
    userId: "string",
    name: "string"
}