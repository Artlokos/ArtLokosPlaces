import mainCss from '../pages/index.css';
import { initialCards } from './cards';
import { createCard, handleDelete, toggleLikeButton, imgView } from '../components/сard';
import { closeByClickOnOverlay, openPopup, closePopup, closeWithEsc, handleFormSubmit } from '../components/modal';

// Глобальные константы
// Попап (модальные окна)
const popup = document.querySelector('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupForm = document.querySelector('.popup__form');

// Элементы интерфейса
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesList = document.querySelector(".places__list");

// Выводим карточки в окно
initialCards.forEach((cardData) => placesList.append(createCard(cardData, handleDelete, toggleLikeButton, imgView)));

//----------------------------------------------------------------------------------------------

 // Вешаем глобальные слушатели клик
 profileAddButton.addEventListener("click", () => {openPopupNewCard(popupTypeNewCard);});
 profileEditButton.addEventListener("click", () => {openPopup (popupTypeEdit);});

 //Вешаем слушатели сабмит
 popupForm.addEventListener("submit", handleFormSubmit);




  // const popupContent = elem.querySelector('.popup__content');
  // const formPopup = elem.querySelector('.popup__form');
  // const placeForNameToInput = formPopup.querySelector('.popup__input_type_name');
  // const placeForJobToInput = formPopup.querySelector('.popup__input_type_description');
  // placeForNameToInput.value = profileTitle.textContent;
  // placeForJobToInput.value = profileDescription.textContent;


function openPopupNewCard(elem) {
  document.addEventListener('keydown', closeWithEsc);
  const popupContent = elem.querySelector('.popup__content');
  const formPopup = elem.querySelector('.popup__form');
  const popupCloseButton = popupContent.querySelector('.popup__close');
  const placeForNameToInput = formPopup.querySelector('.popup__input_type_card-name');
  const placeForUrlToInput = formPopup.querySelector('.popup__input_type_url');
  popupCloseButton.addEventListener('click', ()=>{
    closePopup(elem);
  });

  formPopup.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const cardData = {name: placeForNameToInput.value,link: placeForUrlToInput.value,}

    placesList.prepend(createCard(cardData, handleDelete));
    placeForNameToInput.value = "";
    placeForUrlToInput.value = "";
    elem.classList.remove('popup_is-opened');
  });

  return elem.classList.add('popup_is-opened');
}

function openPopupImg(elem) {
  document.addEventListener('keydown', closeWithEsc);
  const popupContent = elem.querySelector('.popup__content');
  const popupCloseButton = popupContent.querySelector('.popup__close');
  const popupImg = popupContent.querySelector('.popup__image');
  // popupImg.src =
  // popupImg.alt = 

  popupCloseButton.addEventListener('click', ()=>{closePopup(popupTypeEdit);});
  
  popup.addEventListener('click', closeByClickOnOverlay);
  elem.classList.add('popup_is-animated');
  elem.classList.add('popup_is-opened');
  return elem;
}