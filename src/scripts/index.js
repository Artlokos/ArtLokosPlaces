import '../pages/index.css'
import {initialCards} from './cards.js';
import {createCard,deleteCard,rebindLike,ImgView} from '../components/сard.js';
import {openPopup, closePopup, closePopupWithOverlay,addNewCard, changeProfile, closePopupWithEscape} from '../components/modal.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupForm = document.querySelector('.popup__form');
const inputTypeName = popupForm.querySelector('.popup__input_type_name');
const inputTypeDescription = popupForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfile = document.forms['edit-profile'];
const newPlace = document.forms['new-place'];

profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard),);
profileEditButton.addEventListener('click', () => openPopup(popupTypeEdit));
editProfile.addEventListener('submit', changeProfile);
newPlace.addEventListener('submit', addNewCard); 

initialCards.forEach(cardData => {placesList.append(createCard(cardData, ImgView));});

inputTypeName.value = profileTitle.textContent;
inputTypeDescription.value = profileDescription.textContent;

popups.forEach(popup => {
    const popupClose = popup.querySelector('.popup__close')
    popupClose.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('click', closePopupWithOverlay);
  });