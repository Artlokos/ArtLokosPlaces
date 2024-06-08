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
    .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})}
 

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

export function sendNewCardData (cardData) {
  const url = `${config.baseUrl}/cards`
  const options = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
      // name: 'Архангельск',
      // link: 'https://travelsoul.ru/wp-content/uploads/e/d/3/ed341b39b377919be4cb4f960fd35db3.jpeg'
    })
  }
  return fetch (url, options )
  .then(handleResponse)
}

export function sendServerDeleteCard (cardData) {
  const url = `${config.baseUrl}/cards/${cardData._id}`
  const options = {
    method: 'DELETE',
    headers: config.headers
  }
  return fetch (url, options)
  .then(handleResponse)
}

export function addLikeOnCard(cardData) {
  const url = `${config.baseUrl}/cards/likes/${cardData._id}`
  const options = {
    method:'PUT',
    headers: config.headers
  }
  return fetch (url, options)
  .then(handleResponse)
}

export function deleteLikeOnCard(cardData) {
  const url = `${config.baseUrl}/cards/likes/${cardData._id}`
  const options = {
    method:'DELETE',
    headers: config.headers
  }
  return fetch (url, options )
  .then(handleResponse)
}

