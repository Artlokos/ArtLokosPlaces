import '../pages/index.css'
import {initialCards} from './cards.js';
import {createCard} from '../components/сard.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';
// import { has } from 'core-js/core/dict';
// import {} from '../components/validate.js';
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
const editProfile = document.forms['edit-profile'];
const newPlace = document.forms['new-place'];
const inputTypeCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeURL = document.querySelector('.popup__input_type_url'); 

// --Добавляем слушатели событий на элементы
profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard),);

profileEditButton.addEventListener('click', () => {
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

editProfile.addEventListener('submit', changeProfile);

newPlace.addEventListener('submit', addNewCard); 
// ___________________________________________________________________
initialCards.forEach(cardData => {
  placesList.append(createCard(cardData, showImgView));
  });

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

// Код валидации _______________________________________________________________________________________
const formElement = document.querySelector('.popup__form');
const inputElement = formElement.querySelector('.popup__input');


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault;
    });
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) =>{
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList,buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement,inputElement);
      toggleButtonState(inputList,buttonElement);
    });
  });
};

const checkInputValidity = () => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  };

function showInputError(formElement,inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement,inputElement) => {
  let a = `.${inputElement.classList[1]}-error`;
  const errorElement = formElement.querySelector(a);
// inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function toggleButtonState(inputList,buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
};

function hasInvalidInput (inputList) {
  return inputList.some(function(inputElement){return !inputElement.validity.valid});
}



enableValidation();