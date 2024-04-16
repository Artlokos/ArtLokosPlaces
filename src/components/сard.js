export function createCard(cardData, handleDelete, toggleLikeButton, imgView) {
    //Локальные константы для отдельной карточки
    const cardTemplate = document.querySelector("#card-template").content;
    const nextCard = cardTemplate.querySelector(".card").cloneNode(true);
    const delButton = nextCard.querySelector(".card__delete-button");
    const cardTitle = nextCard.querySelector(".card__title");
    const cardImage = nextCard.querySelector(".card__image");
    const cardLikeButton = nextCard.querySelector(".card__like-button");
    
    //Наполнение из cardData
    cardTitle.textContent = cardData.name;
    cardImage.name = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = `Изображение места ${cardData.name}`;

    //Слушатели
    cardImage.addEventListener("click", ()=> imgView(cardImage));
    cardLikeButton.addEventListener("click", ()=> toggleLikeButton(cardLikeButton));
    delButton.addEventListener("click", () => handleDelete(nextCard));
    
    return nextCard;
  };

 export function handleDelete(cardToDelete) {cardToDelete.remove();}

 export function toggleLikeButton (cardButtonToLike) {
    if (cardButtonToLike.classList.contains('card__like-button_is-active')) {
      cardButtonToLike.classList.remove('card__like-button_is-active');
    } else {
      cardButtonToLike.classList.add('card__like-button_is-active');
    }
  }

  export function imgView(imgToView) {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = imgToView.src;
    popupImage.alt = imgToView.alt;
    popupCaption.textContent = imgToView.name;
    return popupImage;
    }

  