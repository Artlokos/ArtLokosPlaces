import '../pages/index.css'
import {createCard} from '../components/card.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';
import {enableValidation} from '../components/validate.js';
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

const formCardDelete = document.forms['сonfirm-delete'];
const popupButtonForDelete = formCardDelete.querySelector('.popup__button');

const formUpdateAvatarIcon = document.forms['update-avatar-icon'];
const linkForUpdateAvatar = formUpdateAvatarIcon.querySelector('.popup__input_type_url_update-avatar-icon')
const buttonSaveAvatar = formUpdateAvatarIcon.querySelector('.popup__button');

let user = null

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
      addLikeOnCard,
      deleteLikeOnCard,
      showImgView,
      )
    placesList.prepend(cardTemplate)
  });
})
.catch((err) => console.log(err))

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
  profileTitle.textContent = inputTypeName.value
  profileDescription.textContent = inputTypeDescription.value
  sendServerChangeProfile(inputTypeName.value,inputTypeDescription.value)
  // closePopup(popupTypeEditProfile)
}

function sendServerChangeProfile(name, description) {
  labelForWaitingButton(buttonSaveAvatar,true)
    updateAccountData(name,description)
      .then((data)=>{
        profileTitle.textContent = data.name
        profileDescription.textContent = data.description
        closePopup(popupTypeEditProfile)
      })
    // closePopup(popupTypeEditProfile)
}

function addNewCard(evt) {
  evt.preventDefault()
  
  const cardData = {
    name: inputTypeCardName.value,
    link: inputTypeURL.value,
  }
  sendServerNewCard(cardData.name,cardData.link)
  evt.target.reset()
}

function sendServerNewCard(name, link) {
  labelForWaitingButton(buttonSaveAvatar,true)
  sendNewCardData(name, link)
    .then((data) => {
      const cardData = {
        name: data.name,
        link: data.link
      }
      const card = createCard(cardData, showImgView)
      const popupTypeNewCard = document.querySelector('.popup_type_new-card')
      placesList.prepend(card)
      closePopup(popupTypeNewCard)
    }) 
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
}

function confirmDeleteCard(cardElement) {
  deleteOwnCard(cardElement)
  .then(()=> {
  cardElement.remove();
  closeModal(popupForDelete)
    }
  )
}

// Вызов функции валидации _______________________________________________________________________________________

enableValidation(validationConfig)



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