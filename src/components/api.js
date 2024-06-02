import {createCard} from '../components/сard.js';
import {showImgView, placesList} from '../scripts/index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
    headers: {
      authorization: '6b28206e-71e7-4482-87a1-4365b23174ad',
      'Content-Type': 'application/json'
    }
  }

  export function getUserInfo() {
    return fetch (`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
      .then(res => {if (res.ok) {return res.json();}
                                 return Promise.reject(`Что-то пошло не так: ${res.status}`);})
      .then((data) => {
                        console.log(data.name);
                        console.log(data.about);
                        console.log(data.avatar);
                        console.log(data._id);
                      });
    }
    
export function getInitialCards() 
  {  
    return fetch (`${config.baseUrl}/cards`, 
                  {
                    headers: config.headers,
                  }
                 )
                  .then ( res => {
                                  if (res.ok) { return res.json();}
                                  return Promise.reject(`Что-то пошло не так: ${res.status}`);
                                }
                        )

                  .then( (result) => {
                                      result.forEach(cardData => {
                                                                    placesList.append(createCard(cardData, showImgView));
                                                                 }
                                                    );
                                     }
                        )


                  .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)});
  };

  
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
    link: 'http://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-oboi-goroda-arkhangelsk-11.jpg'
  })
});
}