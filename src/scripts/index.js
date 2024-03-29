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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

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
