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
    
    export function getInitialCards() {
      return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        })
        .then(res => {if (res.ok) { return res.json();}
        return Promise.reject(`Что-то пошло не так: ${res.status}`);})

        .then((result) => {
            console.log(result[0]);
      });
      }

//   export const getUserInfo = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//       headers: config.headers, 
//     })
//     .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//     // return Promise.reject(`Ошибка: ${res.status}`);
    
// })
     
//     .catch((err)=>{
//         console.log(err)
//     })
    
//   }



