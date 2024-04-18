export function createCard(cardData, showImgView){
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

  cardDeleteButton.addEventListener('click', () => deleteCard(card));
  cardLikeButton.addEventListener('click', () => rebindLike(cardLikeButton)); 
  cardImage.addEventListener('click', () => showImgView(cardData, bigImage));

  return card;
}

export function deleteCard(card) {card.remove();}

export function rebindLike(cardLikeOnActive) {cardLikeOnActive.classList.toggle('card__like-button_is-active')}


