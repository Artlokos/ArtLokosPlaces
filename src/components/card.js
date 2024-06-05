import {config} from "./api.js";
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';

let cardForDelete = {};

export function createCard(cardData, showImgView, cardOwner){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const bigImage = document.querySelector('.popup_type_image'); 
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardLikeButton.addEventListener('click', () => rebindLike(cardLikeButton)); 
  cardImage.addEventListener('click', () => showImgView(cardData, bigImage));

if(cardData.owner._id == cardOwner) {
    cardDeleteButton.addEventListener('click', () => openPopupForDeleteCard(cardData));} 
      else {
        cardDeleteButton.hidden = true;
      }
return card;
}

export function rebindLike(cardLikeOnActive) {cardLikeOnActive.classList.toggle('card__like-button_is-active')}


//-----------------------------------------------------------------------------------------------------



const popupForDelete = document.querySelector('.popup_type_сonfirm-delete');
const popupButtonForDelete = popupForDelete.querySelector('.popup__button');

function confirmDeleteCard(cardElement) {
  deleteOwnCard(cardElement).then(()=> {
  cardElement.remove();
  closeModal(popupForDelete);
  }
  );
};


function openPopupForDeleteCard(cardData) {
  openPopup(popupForDelete);
  popupButtonForDelete.addEventListener('click', () => confirmDeleteCard(cardData));
}

function deleteOwnCard (cardData) {
  let a = `${config.baseUrl}/cards/${cardData._id}`;
    return fetch (a, {
    method: 'DELETE',
    headers: config.headers,
  })

//   .then(res => {if (res.OK) {
//     console.log(123);
//     return res.json();}
  
//     return Promise.reject(`Что-то пошло не так: ${res.status}`);})
//   .then((data) => {
//     console.log(data);
    
// })
//   .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)});
}