// @todo: Темплейт карточки
let cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
let addButton = document.querySelector(".profile__add-button");
let placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(init) {
  let nextCard = cardTemplate.querySelector(".card").cloneNode(true);
  let delButton = nextCard.querySelector(".card__delete-button");
  nextCard.querySelector(".card__title").textContent = init.name;
  nextCard.querySelector(".card__image").src = init.link;
  nextCard.querySelector(".card__image").alt = `Изображение места ${init.name}`;
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
  initialCards.forEach((init) => {
    placesList.append(addCard(init));
  });
});
