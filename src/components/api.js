export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
    headers: {
      authorization: '6b28206e-71e7-4482-87a1-4365b23174ad',
      'Content-Type': 'application/json'
    }
  }

  const handleResponse = (res) => {
    if (res.ok) {return res.json()}
    return res.json()
      .then ((err) => {
        err.httpResponseCode = res.status
        return Promise.reject(err)
      })
  }

  // Геттеры
  export function getUserInfo() {
    const url = `${config.baseUrl}/users/me`
    const options = {
      method: 'GET',
      headers: config.headers
    }
    return fetch (url, options)
      .then(handleResponse)
    }
    
    
export function getInitialCards() {
    const url = `${config.baseUrl}/cards`
    const options = {
      method: 'GET',
      headers: config.headers
    }
    return fetch (url, options)
      .then(handleResponse)
      .then( (dataInitialCards) => {return dataInitialCards;})
    } 

// Сеттеры  
export function updateAccountData (name, description) {
  const url = `${config.baseUrl}/users/me`
  const options = {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: description
    })
  }
  return fetch (url,options)
  .then(handleResponse)
}

export function updateProfileImage (imageLink) {
  const url = `${config.baseUrl}/users/me/avatar`
  const options = {
    method:'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageLink
    })
  }
  return fetch (url, options)
  .then(handleResponse)
}

export function  sendServerNewCard(cardData) {
  const url = `${config.baseUrl}/cards`
  const options = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  }
  return fetch (url, options )
  .then(handleResponse)
}

export function sendServerDeleteCard (cardData) {
  const url = `${config.baseUrl}/cards/${cardData}`
  const options = {
    method: 'DELETE',
    headers: config.headers
  }
  return fetch (url, options)
  .then(handleResponse)
}

export function sendServerCardLike(cardId, methodName) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`
  const options = {
    method:methodName,
    headers: config.headers
  }
  return fetch (url, options )
  .then(handleResponse)
}
