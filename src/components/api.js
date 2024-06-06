export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
    headers: {
      authorization: '6b28206e-71e7-4482-87a1-4365b23174ad',
      'Content-Type': 'application/json'
    }
  }

  // Геттеры
  export function getUserInfo() {
    return fetch (`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
      .then(res => {if (res.ok) {return res.json();}
                                 return Promise.reject(`Что-то пошло не так: ${res.status}`);})
      .then((data) => {
                        return data;
                      });
    }
    
export function getInitialCards() 
  {return fetch (`${config.baseUrl}/cards`,{headers: config.headers})
    .then (res => {if (res.ok) { return res.json();}
                  return Promise.reject(`Что-то пошло не так: ${res.status}`);})
    .then( (dataInitialCards) => {return dataInitialCards;})
    .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})};

  

// Сеттеры  
export function SendNewAccountData () {
  return fetch (`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: 'Art Lokos',
    about: 'I am Art Lokos'
  })
});
}

export function SendNewCardtData () {
  return fetch (`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: 'Архангельск',
    link: 'https://travelsoul.ru/wp-content/uploads/e/d/3/ed341b39b377919be4cb4f960fd35db3.jpeg'
  })
});
}

export function deleteOwnCard (cardData) {
  let adress = `${config.baseUrl}/cards/${cardData._id}`;
    return fetch (adress, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(response => {
    return response.json();
  })
};

export function addLikeOnCard(cardData) {
  let adress = `${config.baseUrl}/cards/likes/${cardData._id}`;
  return fetch (adress, {
    method:'PUT',
    headers: config.headers
  })
  .then(response => {
    return response.json();
  })
};

export function deleteLikeOnCard(cardData) {
  let adress = `${config.baseUrl}/cards/likes/${cardData._id}`;
  return fetch (adress, {
    method:'DELETE',
    headers: config.headers
  })
  .then(response => {
    return response.json();
  })
};

export function changeProfileImage (imageLink) {
  let adress = `${config.baseUrl}/users/me/avatar`;
  return fetch (adress, {
    method:'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageLink
  })
  .then (response => {
    return response.json();
  })
})
}