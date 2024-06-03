import {deleteOwnCard} from "./api.js";

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

 if(cardData.owner._id == cardOwner) {cardDeleteButton.addEventListener('click', () => deleteCard(card));} 
    else {
      cardDeleteButton.hidden = true;
    }

  return card;
}

export function deleteCard(card) {
  deleteOwnCard(cardData)
  card.remove();

}

export function rebindLike(cardLikeOnActive) {cardLikeOnActive.classList.toggle('card__like-button_is-active')}


