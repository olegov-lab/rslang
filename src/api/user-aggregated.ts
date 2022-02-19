//import { token, userId } from "./user-authorization";

import { IWords } from "../interfaces/interface";

import { baseUrl } from "./api";


//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzk5M2RmNGNhOWQ2MDAxNzg3NDBhZSIsImlhdCI6MTU5MDI2OTE1OCwiZXhwIjoxNTkwMjgzNTU4fQ.XHKmdY_jk1R7PUbgCZfqH8TxH6XQ0USwPBSKNHMdF6I';

const token = localStorage.getItem('token');

//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDkxNDc0NDY3MDk2MDAxNjAzYzFlZSIsImlhdCI6MTY0NDc2MjIzNCwiZXhwIjoxNjQ0Nzc2NjM0fQ.Si5p_eQR56qy-O_-Eu05alCg26REuc8BXRf9a3L29mg';

export const createUserWord = async ({ userId, wordId, word }) => {
  try {
  const rawResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });

  const content = await rawResponse.json();

  }  catch(err) {
    if (err.status === 417) {
      return;
     }
  }
};



export const updateUserWord = async ({ userId, wordId, word }) => {
  const rawResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  //onsole.log(content);
};



export const getUserWordById = async ({ userId, wordId}) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     return content;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return;
     }
  }
};


export const getUserAggrWord = async ({userId, group, page}): Promise<IWords> => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     return content[0].paginatedResults;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return ;
     }
  }
};


export const getUserAggrWordHard = async ({userId, group, page}) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter={"$and":[{"userWord.difficulty":"hard"}]}`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     return content[0].paginatedResults;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return ;
     }
  }
};


export const getUserAggrWordHardAll = async (userId) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=6000&filter={"$and":[{"userWord.difficulty":"hard"}]}`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     return content[0].paginatedResults;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return ;
     }
  }
};


export const getUserAggrWordAll = async (userId) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=6000`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     //return content[0].paginatedResults;
     return content;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return ;
     }
  }
};

export const getUserWordAll = async (userId) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/words`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     return content;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return;
     }
  }
};


export const getUserAggrWordById = async ({userId, wordId}) => {
  try {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content = await rawResponse.json();

    if (rawResponse.status === 200) {
     //console.log(content[0].paginatedResults);

     //console.log(content);
     //return content[0].paginatedResults;
     return content;
    }

    return null;
  } catch (err) {
    if (err.status === 417) {
      return ;
     }
  }
};
