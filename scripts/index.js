// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
let placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(initCards) {
  let nextCard = cardTemplate.querySelector(".card").cloneNode(true);
  let delButton = nextCard.querySelector(".card__delete-button");
  nextCard.querySelector(".card__title").textContent = initCards.name;
  nextCard.querySelector(".card__image").src = initCards.link;
  nextCard.querySelector(".card__image").alt = `Изображение места ${initCards.name}`;
  delButton.addEventListener("click", function () {
    handleDelete(nextCard);
  });
  return nextCard;
}

// @todo: Функция удаления карточки
function handleDelete(cardToDelete) {
  cardToDelete.remove();
}
// @todo: Вывести карточки на страницу

addButton.addEventListener("click", function () {
  initialCards.forEach((initCards) => {
    placesList.append(addCard(initCards));
  });
});
