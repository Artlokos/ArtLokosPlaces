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
