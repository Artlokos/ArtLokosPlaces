import '../pages/index.css'
import {createCard, changeLike,hasLike} from '../components/card.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';
import {enableValidation,clearValidation} from '../components/validate.js';
import {validationConfig} from '../components/config.js';
import {getInitialCards, getUserInfo, updateAccountData, sendServerNewCard,sendServerDeleteCard, addLikeOnCard, deleteLikeOnCard,updateProfileImage } from '../components/api.js';
import { data } from 'autoprefixer';
// --Объявляем константы--
const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEditProfile = document.querySelector('.popup_type_edit');
const popupTypeUpdateAvatarIcon = document.querySelector('.popup_type_update-avatar-icon');

const fullScreenImg = document.querySelector('.popup__image');
const imgLabel = document.querySelector('.popup__caption');

const formEditProfile = document.forms['edit-profile'];
const inputTypeName = formEditProfile.querySelector('.popup__input_type_name');
const inputTypeDescription = formEditProfile.querySelector('.popup__input_type_description');

const formNewPlace = document.forms['new-place'];
const inputTypeCardName = formNewPlace.querySelector('.popup__input_type_card-name');
const inputTypeURL = formNewPlace.querySelector('.popup__input_type_url');

const formUpdateAvatarIcon = document.forms['update-avatar-icon'];
const linkForUpdateAvatar = formUpdateAvatarIcon.querySelector('.popup__input_type_url_update-avatar-icon')
const buttonSaveAvatar = formUpdateAvatarIcon.querySelector('.popup__button');

const popupForDelete = document.querySelector('.popup_type_сonfirm-delete')
const formDeleteCard = document.forms['сonfirm-delete']

let user = null
let cardIdentificator = null
let cardForDelete = {}

// Вызов функции валидации _______________________________________________________________________________________

enableValidation(validationConfig)

// --Вешаем слушатели на попапы

popups.forEach(popup => {
  const popupButtonClose = popup.querySelector('.popup__close')
  popupButtonClose.addEventListener('click', () => closePopup(popup))
  popup.addEventListener('click', closePopupWithOverlay)
  popup.addEventListener('click', closePopupWithEscape)
})

// --Получаем информацию о пользователе и карточках с сервера

Promise.all([getUserInfo(), getInitialCards()])
.then(([userDataFromServer,cardsFromServer]) => {
  user = userDataFromServer
  profileTitle.textContent = user.name
  profileDescription.textContent = user.about
  profileImage.style.backgroundImage = ('url(' + user.avatar + ')');
  cardsFromServer.forEach((allDataForCardFromServer)=> {
    const cardTemplate = createCard(
      user,
      allDataForCardFromServer,
      showImgView,
      openPopupForDeleteCard,
      handleLikeCard
      )
    placesList.prepend(cardTemplate)
  });
})
.catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})

function labelForWaitingButton(button,condition) {
  if(condition) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

function showImgView(cardData, popupTypeImage) {
    fullScreenImg.src = cardData.link
    fullScreenImg.alt = cardData.name
    imgLabel.textContent = cardData.name
    openPopup(popupTypeImage)
}

// --Добавляем слушатели событий на элементы открытия попапов

profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard)) // новая карточка

profileEditButton.addEventListener('click', () => { // изменение данных пользователя
  inputTypeName.value = profileTitle.textContent
  inputTypeDescription.value = profileDescription.textContent
  openPopup(popupTypeEditProfile)
})

profileImage.addEventListener('click', () => {openPopup(popupTypeUpdateAvatarIcon)}) // изменение аватара пользователя

// --Вешаем слушатели сабмитов на отправку формы

formEditProfile.addEventListener('submit', changeProfile) // изменение профиля

formNewPlace.addEventListener('submit', addNewCard)  // добавление новой карточки

formUpdateAvatarIcon.addEventListener('submit', changeProfileImage) // изменение аватара

formDeleteCard.addEventListener('submit', deleteCard) // удаление карточки

// --Объявляем функции форм

function changeProfile(evt) {
  evt.preventDefault()
  sendServerChangeProfile(inputTypeName.value,inputTypeDescription.value)
  profileTitle.textContent = inputTypeName.value
  profileDescription.textContent = inputTypeDescription.value
  clearValidation(formEditProfile,validationConfig)
}

function sendServerChangeProfile(name, description) {
  labelForWaitingButton(buttonSaveAvatar,true)
    updateAccountData(name,description)
      .then((data)=>{
        profileTitle.textContent = data.name
        profileDescription.textContent = data.about
        closePopup(popupTypeEditProfile)
      })
      .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})
      .finally(labelForWaitingButton(buttonSaveAvatar,false))
}

function addNewCard(evt) {
  evt.preventDefault()
  const cardData = {
    name: inputTypeCardName.value,
    link: inputTypeURL.value,
  }
  sendNewCardData(cardData)
  evt.target.reset()
  clearValidation(formNewPlace,validationConfig)
}

function sendNewCardData (cardData) {
  labelForWaitingButton(buttonSaveAvatar,true)
  
   sendServerNewCard(cardData)
    .then((data) => {
      const card = createCard(
        user,
        data, 
        showImgView,
        openPopupForDeleteCard,
        handleLikeCard
        )

      placesList.prepend(card)
      closePopup(popupTypeNewCard)
    }) 
    .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})
}

function changeProfileImage (evt) {
  evt.preventDefault()
  const link = linkForUpdateAvatar.value
  sendServerUserAvatar(link)
 
}

function sendServerUserAvatar(link) {
  labelForWaitingButton(buttonSaveAvatar,true)
  updateProfileImage(link)
  .then((data) => {
    profileImage.style.backgroundImage = ('url(' + data.avatar + ')')
    formUpdateAvatarIcon.reset()
    closePopup(popupTypeUpdateAvatarIcon)
})
  .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})
}

function openPopupForDeleteCard(card, cardId) { //обработчик открытия модального окна удаления
    cardForDelete = card
    cardIdentificator=cardId
    openPopup(popupForDelete)
} 

function deleteCard(evt) {
    evt.preventDefault()
    deleteCardSubmit(cardForDelete,cardIdentificator)
}

function deleteCardSubmit(card,cardIdentificator) {
  sendServerDeleteCard(cardIdentificator)
  .then((data) =>{
    card.remove()
    closePopup(popupForDelete)
  })
  .catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})
}

function handleLikeCard(status,cardId,card,userId) {
    if (status) {deleteLikeOnCard(cardId).then(
      data => {
        let likes = data.likes
        changeLike(likes,card,userId)
      })
    .catch( err => {console.log('Ошибка. Запрос не выполнен: ', err)})      
     }
    else {addLikeOnCard(cardId).then(
      data => {
        let likes = data.likes
        changeLike(likes,card,userId)
      })
    .catch(err => {console.log('Ошибка. Запрос не выполнен: ', err)})
        }
}
 