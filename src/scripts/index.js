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
const popupCloseButton = document.querySelector('.popup__close');
const nameFromHeader = document.querySelector('.profile__title');
const jobFromHeader = document.querySelector('.profile__description');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const placesList = document.querySelector(".places__list");

document.removeEventListener('keydown', closeWithEsc);
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
  openPopup(popupTypeNewCard,'popup_type_new-card');
});

function openPopup(elem) {
  document.addEventListener('keydown', closeWithEsc);
  // const nameInPopup = document.querySelector('.popup__input_type_name');
  // const descriptionInPopup = document.querySelector('.popup__input_type_description')
  // nameInPopup.value = nameFromHeader.textContent;
  // descriptionInPopup.value = jobFromHeader.textContent;
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

popupCloseButton.addEventListener('click', ()=>{
  closePopup(popupTypeEdit);
});

popupTypeImage.addEventListener('click',()=>{
  openPopup(popupTypeEdit)
})

popup.addEventListener('click', closeByClickOnOverlay);

// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_card-name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    nameFromHeader.textContent = evt.target.children[0].value // Получите значение полей jobInput и nameInput из свойства value
    jobFromHeader.textContent = evt.target.children[1].value  // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 