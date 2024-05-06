import '../pages/index.css'
import {initialCards} from './cards.js';
import {createCard} from '../components/сard.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';

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
const editProfile = document.forms['edit-profile'];
const newPlace = document.forms['new-place'];
const inputTypeCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeURL = document.querySelector('.popup__input_type_url'); 

profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard),);
profileEditButton.addEventListener('click', () => {
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});
editProfile.addEventListener('submit', changeProfile);
newPlace.addEventListener('submit', addNewCard); 

initialCards.forEach(cardData => {placesList.append(createCard(cardData, showImgView));});

popups.forEach(popup => {
    const popupClose = popup.querySelector('.popup__close')
    popupClose.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', closePopupWithOverlay);
  });

