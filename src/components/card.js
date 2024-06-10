export function createCard(user,cardDataFromServer,showImgView,openPopupForDeleteCard,handleLikeCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = card.querySelector('.card__title')
  const bigImage = document.querySelector('.popup_type_image')
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')
  const likesCount = card.querySelector('.card__likes-count')
  likesCount.textContent = cardDataFromServer.likes.length
  const likeButton = card.querySelector('.card__like-button')
  
  const cardImage = card.querySelector('.card__image')
  cardImage.src = cardDataFromServer.link
  cardImage.alt = cardDataFromServer.name
  cardTitle.textContent = cardDataFromServer.name

  cardLikeButton.addEventListener ('click', () => handleLikeCard(hasLike,cardDataFromServer))

  const hasLike =  cardDataFromServer.likes.some((like) => {
    return like._id === user._id
  })

  const changeLike = (data) => {
    const likesCount = card.querySelector('.card__likes-count')
    const likeButton = card.querySelector('.card__like-button')
    likesCount.textContent = data.likes.length
    rebindLike(likeButton)
  }

  const rebindLike = (likeButton) => {likeButton.classList.toggle('card__like-button_is-active')}
  
 cardImage.addEventListener('click', () => showImgView(cardDataFromServer, bigImage))

      if (cardDataFromServer.owner._id == user._id) 
      {cardDeleteButton.addEventListener('click', () => openPopupForDeleteCard(card, cardDataFromServer._id))} 
      else {cardDeleteButton.remove()}


return card
}