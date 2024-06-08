import '../pages/index.css'
import {createCard} from '../components/card.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';
import {enableValidation} from '../components/validate.js';
import {validationConfig} from '../components/config.js';
import { getInitialCards, getUserInfo, SendNewAccountData, SendNewCardtData, deleteOwnCard, addLikeOnCard, deleteLikeOnCard,changeProfileImage } from '../components/api.js';
// --Объявляем константы--
const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupForm = document.querySelector('.popup__form');
const inputTypeName = popupForm.querySelector('.popup__input_type_name');
const inputTypeDescription = popupForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editProfile = document.forms['edit-profile'];
const newPlace = document.forms['new-place'];
const inputTypeCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeURL = document.querySelector('.popup__input_type_url');

const popupForDelete = document.querySelector('.popup_type_сonfirm-delete');
const popupButtonForDelete = popupForDelete.querySelector('.popup__button');

const updateAvatarIcon = document.forms['update-avatar-icon'];
const linkForUpdateAvatar = updateAvatarIcon.querySelector('.popup__input_type_url_update-avatar-icon')
const buttonSaveAvatar = updateAvatarIcon.querySelector('.popup__button');


let user = null

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
      openPopupForDeleteCard)
    placesList.prepend(cardTemplate)
  });
})
.catch((err) => console.log(err))

// --Добавляем слушатели событий на элементы
profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard));

profileEditButton.addEventListener('click', () => {
  inputTypeName.value = profileTitle.textContent
  inputTypeDescription.value = profileDescription.textContent
  openPopup(popupTypeEdit)
});

profileImage.addEventListener('click', () => {
  openPopup(popupTypeUpdateAvatarIcon)
  }
)

editProfile.addEventListener('submit', changeProfile)

newPlace.addEventListener('submit', addNewCard) 

function popupChangeProfileImage (event) {
  event.preventDefault()
  openPopup(popupTypeUpdateAvatarIcon)
  popupTypeUpdateAvatarIcon.addEventListener('submit', () => updateProfileImage(linkForUpdateAvatar.value))
}

// ___________________________________________________________________

popups.forEach(popup => {
    const popupClose = popup.querySelector('.popup__close')
    popupClose.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', closePopupWithOverlay);
    popup.addEventListener('click', closePopupWithEscape);
  });

// --Объявляем функции  
export function showImgView(cardData, popupTypeImage) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupTypeImage);
}



function changeProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;
  closePopup(popupTypeEdit);
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: inputTypeCardName.value,
    link: inputTypeURL.value,
  }
  const card = createCard(cardData, showImgView);
  const popupTypeNewCard = document.querySelector('.popup_type_new-card');
  placesList.prepend(card);
  evt.target.reset();
  closePopup(popupTypeNewCard);
}

function openPopupForDeleteCard(cardData) {
  openPopup(popupForDelete);
  popupButtonForDelete.addEventListener('click', () => confirmDeleteCard(cardData));
}

// Вызов функции валидации _______________________________________________________________________________________

enableValidation(validationConfig);



function labelForWaitingButton(button,condition) {
  if(condition) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

//Удаление карточки с сервера

function confirmDeleteCard(cardElement) {
  deleteOwnCard(cardElement).then(()=> {
  cardElement.remove();
  closeModal(popupForDelete);
    }
  )
}

function updateProfileImage (link) {
 
    labelForWaitingButton(buttonSaveAvatar,true);
  
    changeProfileImage(link)
    .then((data)=>{
      console.dir(data)
      profileImage.style.backgroundImage = ('url(' + data.avatar + ')')
      popupTypeUpdateAvatarIcon.reset()
      closePopup(popupTypeUpdateAvatarIcon);
    })
    .catch((err) => console.log(err))
    .finally(()=>{labelForWaitingButton(buttonSaveAvatar, false)})
  }

