  
import {validationConfig} from './config.js';

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
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if(inputElement.value.length<1){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessagePatternMissmatch);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

export const clearValidation = (formElement, enableValidation) => {

  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, enableValidation.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(
      formElement, 
      inputElement, 
      enableValidation.inputErrorClass, 
      enableValidation.errorClass
      );
    inputElement.setCustomValidity("");
  });
};