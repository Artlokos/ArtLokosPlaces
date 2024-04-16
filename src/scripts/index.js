import addIcon from '../images/add-icon.svg';
import avatar from '../images/avatar.jpg';
import cardOne from '../images/card_1.jpg';
import cardTwo from '../images/card_2.jpg';
import cardThree from '../images/card_3.jpg';
import closeSvg from '../images/close.svg';
import deleteIcon from '../images/delete-icon.svg';
import editIcon from '../images/edit-icon.svg';
import likeActive from '../images/like-active.svg';
import likeInactive from '../images/like-inactive.svg';
import logo from '../images/logo.svg';

import fontInterBlack from '../vendor/fonts/Inter-Black.woff2';
import fontInterMedium from '../vendor/fonts/Inter-Medium.woff2';
import fontInterRegular from '../vendor/fonts/Inter-Regular.woff2';

import mainCss from '../pages/index.css';

import { initialCards } from './cards';

const imgForCards =[
{name:'addIcon' , link:addIcon},   
{name:'avatar' , link:avatar},
{name:'cardOne' , link:cardOne},
{name:'cardTwo' , link:cardTwo},
{name:'cardThree' , link:cardThree},
{name:'closeSvg' , link:closeSvg},
{name:'deleteIcon' , link:deleteIcon},
{name:'editIcon' , link:editIcon},
{name:'likeActive' , link:likeActive},
{name:'likeInactive' , link:likeInactive},
{name:'logo' , link:logo},
];

const fontsForProject = [
{name: 'fontInterBlack' , link:fontInterBlack},
{name: 'fontInterMedium' , link:fontInterMedium},
{name: 'fontInterRegular' , link:fontInterRegular},  
];


const popup = document.querySelector('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const nameFromHeader = document.querySelector('.profile__title');
const jobFromHeader = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const cardTemplate = document.querySelector("#card-template").content;
const addButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector('.popup__image');

initialCards.forEach((cardData) => placesList.append(createCard(cardData, handleDelete, toggleLikeButton, imgView)));

function createCard(cardData, handleDelete, toggleLikeButton, imgView) {
  const nextCard = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = nextCard.querySelector(".card__delete-button");
  const cardTitle = nextCard.querySelector(".card__title");
  const cardImage = nextCard.querySelector(".card__image");
  const cardLikeButton = nextCard.querySelector(".card__like-button");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места ${cardData.name}`;
  cardImage.addEventListener("click", ()=> imgView(cardImage));
  cardLikeButton.addEventListener("click", ()=> toggleLikeButton(cardLikeButton));
  delButton.addEventListener("click", () => handleDelete(nextCard));
  return nextCard;
}

function handleDelete(cardToDelete) {cardToDelete.remove();}

function toggleLikeButton (cardButtonToLike) {
  if (cardButtonToLike.classList.contains('card__like-button_is-active')) {
    cardButtonToLike.classList.remove('card__like-button_is-active');
  } else {
    cardButtonToLike.classList.add('card__like-button_is-active');
  }
}

function imgView(imgToView) {
  popupImage.src = imgToView.src;
  popupImage.alt = imgToView.alt;
  popupCaption.value = imgToView.alt;
  openPopupImg(popupTypeImage);
  }

function openPopup(elem) {
  elem.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeWithEsc);
  const popupContent = elem.querySelector('.popup__content');
  const formPopup = elem.querySelector('.popup__form');
  const popupCloseButton = popupContent.querySelector('.popup__close');
  const placeForNameToInput = formPopup.querySelector('.popup__input_type_name');
  const placeForJobToInput = formPopup.querySelector('.popup__input_type_description');
  placeForNameToInput.value = nameFromHeader.textContent;
  placeForJobToInput.value = jobFromHeader.textContent;

  popupCloseButton.addEventListener('click', ()=>{
    closePopup(popupTypeEdit);
  });
  popup.addEventListener('click', closeByClickOnOverlay);
  
  elem.classList.add('popup_is-opened');
  return elem;
};

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


  
  popup.addEventListener('click', closeByClickOnOverlay);
  
  formPopup.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const cardData = {
      name: placeForNameToInput.value,
      link: placeForUrlToInput.value,
    }
    placesList.prepend(createCard(cardData, handleDelete));
    placeForNameToInput.value = "";
    placeForUrlToInput.value = "";
    elem.classList.remove('popup_is-opened');
  });

  return elem.classList.add('popup_is-opened');
};


function closePopup(elem) {
  document.removeEventListener('keydown', closeWithEsc);
  return elem.classList.remove('popup_is-opened');
}
function closeWithEsc(evt) {
  if (evt.key==="Escape") {
      closePopup(document.querySelector('.popup_is-opened'));
  }
}
function closeByClickOnOverlay(evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
}
profileEditButton.addEventListener("click", ()=>{
  openPopup (popupTypeEdit);
});
popupTypeImage.addEventListener('click',()=>{
  openPopup(popupTypeEdit);
})

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    nameFromHeader.textContent = evt.target.children[0].value;
    jobFromHeader.textContent = evt.target.children[1].value; 
}

formElement.addEventListener('submit', handleFormSubmit); 

addButton.addEventListener("click", function () {
  openPopupNewCard(popupTypeNewCard);
});

function openPopupImg(elem) {
  document.addEventListener('keydown', closeWithEsc);
  const popupContent = elem.querySelector('.popup__content');
  const popupCloseButton = popupContent.querySelector('.popup__close');
  const popupImg = popupContent.querySelector('.popup__image');
  // popupImg.src =
  // popupImg.alt = 

  popupCloseButton.addEventListener('click', ()=>{
    closePopup(popupTypeEdit);
  });
  popup.addEventListener('click', closeByClickOnOverlay);
  elem.classList.add('popup_is-animated');
  elem.classList.add('popup_is-opened');
  return elem;
};