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

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupButtonClose = document.querySelector('.popup__close');


// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesList = document.querySelector(".places__list");

document.removeEventListener('keydown', closeEscape);
// @todo: Функция создания карточки

function createCard(cardData, handleDelete) {
  const nextCard = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = nextCard.querySelector(".card__delete-button");
  const cardTitle = nextCard.querySelector(".card__title");
  const cardImage = nextCard.querySelector(".card__image");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места ${cardData.name}`;
  delButton.addEventListener("click", () => handleDelete(nextCard));
  return nextCard;
}

// @todo: Функция удаления карточки
const handleDelete = (cardToDelete) => cardToDelete.remove();
// @todo: Вывести карточки на страницу

addButton.addEventListener("click", function () {
  initialCards.forEach((cardData) => placesList.append(createCard(cardData, handleDelete)));
});

function openPopup(elem) {
  return elem.classList.add('popup_is_opened');
};

function closePopup(elem) {
  return elem.classList.remove('popup_is_opened');
}

function closeEscape(evt) {
  if(evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

profileEditButton.addEventListener('click', ()=>{
  // return popupTypeEdit.classList.add('popup_is-opened');
  openPopup(popupTypeEdit);
});

popupButtonClose.addEventListener('click',()=>{
  return popupTypeEdit.classList.remove('popup_is-opened');
});