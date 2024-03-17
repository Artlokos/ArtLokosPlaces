// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(DataForCardFromArray, handleDelete) {
  let nextCard = cardTemplate.querySelector(".card").cloneNode(true);
  let delButton = nextCard.querySelector(".card__delete-button");
  const cardTitle = nextCard.querySelector(".card__title");
  const cardImage = nextCard.querySelector(".card__image");
  cardTitle.textContent = DataForCardFromArray.name;
  cardImage.src = DataForCardFromArray.link;
  cardImage.alt = `Изображение места ${DataForCardFromArray.name}`;
  delButton.addEventListener("click", () => handleDelete(nextCard));
  return nextCard;
}

// @todo: Функция удаления карточки
const handleDelete = (cardToDelete) => cardToDelete.remove();
// @todo: Вывести карточки на страницу

addButton.addEventListener("click", function () {
  initialCards.forEach((DataForCardFromArray) => placesList.append(createCard(DataForCardFromArray, handleDelete)));
});
