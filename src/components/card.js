import { sendServerDeleteCard } from "./api";
import { openPopup, closePopup } from "./modal";

export function createCard(user,allDataForCardFromServer, addLikeOnCard,deleteLikeOnCard, showImgView) {
  const cardTemplate = document.querySelector('#card-template').content
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = card.querySelector('.card__title')
  const bigImage = document.querySelector('.popup_type_image')
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')
  
  const cardLikesCountFromBrowser = card.querySelector('.card__likes-count')
  cardLikesCountFromBrowser.textContent = allDataForCardFromServer.likes.length
 
  const cardImage = card.querySelector('.card__image')
  cardImage.src = allDataForCardFromServer.link
  cardImage.alt = allDataForCardFromServer.name
  cardTitle.textContent = allDataForCardFromServer.name

  const popupForDelete = document.querySelector('.popup_type_сonfirm-delete')
  const formCardDelete = document.forms['сonfirm-delete']

  allDataForCardFromServer.likes.forEach(like => {
    if (like._id == user) {
     cardLikeButton.classList.add('card__like-button_is-active')
     }
   })

  cardLikeButton.addEventListener ('click', () =>
  {

  const hasLike =  allDataForCardFromServer.likes.some((like) => {
    return like._id === user
  })

      if (hasLike) {
        deleteLikeOnCard(allDataForCardFromServer)
        .then( (newCardData) => 
          {
            allDataForCardFromServer = newCardData
            cardLikesCountFromBrowser.textContent = allDataForCardFromServer.likes.length
            rebindLike(cardLikeButton)
          })
          .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})

      } else {
        addLikeOnCard(allDataForCardFromServer)
        .then( (newCardData) => 
            {
              allDataForCardFromServer = newCardData
              cardLikesCountFromBrowser.textContent = allDataForCardFromServer.likes.length
              rebindLike(cardLikeButton)
            })
            .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})
          }
  })

  cardImage.addEventListener('click', () => showImgView(allDataForCardFromServer, bigImage))

      if (allDataForCardFromServer.owner._id == user) {cardDeleteButton.addEventListener('click', () => openPopup(popupForDelete))} 
      else {cardDeleteButton.remove()}

  formCardDelete.addEventListener('submit', deleteCard)

const rebindLike= (cardLikeButton) => {cardLikeButton.classList.toggle('card__like-button_is-active')}

function deleteCard(evt) {
  evt.preventDefault()
  confirmDeleteCard()
  deleteCard(card)
}

function deleteCard(card) {
  sendServerDeleteCard(card)
  .then((data)=> {
  card.remove();
  closeModal(popupForDelete)
    }
  )
  .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})
}
return card;
}