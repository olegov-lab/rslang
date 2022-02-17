import { IWords } from "../interfaces/interface";

import { baseUrl } from "./api";

const token = localStorage.getItem('token');

export const getUserStatistics = async (userId) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/statistics`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {

     //console.log(content);
     return content;
    }

    return null;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};


export const updateUserStatistics = async ({ userId, statistics }) => {
  const rawResponse = await fetch(`${baseUrl}/users/${userId}/statistics`, {
    method: 'PUT',
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(statistics)
  });
  const content = await rawResponse.json();

  return content;

};