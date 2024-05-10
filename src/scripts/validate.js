  // включение валидации вызовом enableValidation
// все настройки передаются при вызове

 enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');

const showInputError = (formElement,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement,inputElement) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage);
  } else {
    hideInputError(form, formInput);
  }
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});