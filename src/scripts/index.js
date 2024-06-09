import '../pages/index.css'
import {createCard} from '../components/card.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';
import {enableValidation,clearValidation} from '../components/validate.js';
import {validationConfig} from '../components/config.js';
import { getInitialCards, getUserInfo, updateAccountData, sendNewCardData, deleteOwnCard, addLikeOnCard, deleteLikeOnCard,updateProfileImage } from '../components/api.js';
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

let user = null

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
      user._id,
      allDataForCardFromServer, 
      addLikeOnCard,
      deleteLikeOnCard,
      showImgView,
      )
    placesList.prepend(cardTemplate)
  });
})
.catch( (err) => {console.log('Ошибка. Запрос не выполнен: ', err)})


// --Добавляем слушатели событий на элементы открытия попапов

profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard)) // новая карточка

profileEditButton.addEventListener('click', () => { // изменение данных пользователя
  inputTypeName.value = profileTitle.textContent
  inputTypeDescription.value = profileDescription.textContent
  openPopup(popupTypeEditProfile)
});

profileImage.addEventListener('click', () => { // изменение аватара пользователя
  openPopup(popupTypeUpdateAvatarIcon)
  }
)

// --Вешаем слушатели сабмитов на отправку формы

formEditProfile.addEventListener('submit', changeProfile) // изменение профиля

formNewPlace.addEventListener('submit', addNewCard)  // добавление новой карточки

formUpdateAvatarIcon.addEventListener('submit', changeProfileImage) // изменение аватара

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
    likes: [],
    owner: user
  }
  sendServerNewCard(cardData)
  evt.target.reset()
  clearValidation(formNewPlace,validationConfig)
}

function sendServerNewCard(cardData) {
  labelForWaitingButton(buttonSaveAvatar,true)
  
  const card = createCard(
    user,
    cardData, 
    addLikeOnCard,
    deleteLikeOnCard,
    showImgView,
    )

  sendNewCardData(cardData)
    .then((data) => {
      const cardData = {
        name: data.name,
        link: data.link
      }
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