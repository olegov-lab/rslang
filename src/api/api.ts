import { IWords, IUser } from "../interfaces/interface"



const baseUrl = 'https://rslang-node.herokuapp.com';


export const getWords = async (page = 0, group = 0):  Promise<IWords> => {
  try {
    const rawResponse = await fetch(`${baseUrl}/words?_limit=${page}&_page=${group}`);
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

export const createUser = async (user: {}): Promise<void> => {
  try{
    const rawResponse = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return rawResponse.json();
} catch (err) {
  if (err instanceof Error) {
    throw new Error(err.message);
  }
}
};



