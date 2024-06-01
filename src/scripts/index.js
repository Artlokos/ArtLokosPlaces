import '../pages/index.css'
import {initialCards} from './cards.js';
import {createCard} from '../components/сard.js';
import {openPopup, closePopup, closePopupWithOverlay, closePopupWithEscape} from '../components/modal.js';
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    console.dir(inputElement.validity);
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // console.dir(hasInvalidInput(inputElement))
  debugger
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement) => {
  let a = inputElement.value
  // let b = inputElement.attributes.pattern.value
  if (!inputElement.validity.valid) {
    if(inputElement.validity.patternMismatch){
      inputElement.setCustomValidity(inputElement.dataset.errorMessagePatternMissmatch);
    }
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  // toggleButtonState(inputList,buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(validationConfig);