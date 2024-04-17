import { openPopup } from "./modal";
const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export function ImgView(cardData, popupTypeImage) {
  
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(popupTypeImage);
}

export function createCard(cardData, ImgView){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title'); 

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const cardDeleteButton = card.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(card)); 

  const cardLikeButton = card.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => rebindLike(cardLikeButton)); 

  cardImage.addEventListener('click', () => ImgView(cardData, popupTypeImage));

  return card;
}

export function deleteCard(card) {
  card.remove();
}

export function rebindLike(cardLikeOnActive) {
  cardLikeOnActive.classList.toggle('card__like-button_is-active')
}


