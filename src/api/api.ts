import { IWords, IUser } from "../interfaces/interface";

export const baseUrl = 'https://rslang-node.herokuapp.com';


export const getWords = async ( group = 0, page = 0): Promise<IWords> => {
  try {
    const rawResponse = await fetch(`${baseUrl}/words?group=${group}&page=${page}`);
    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
      return content;
    }

    return null;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};





