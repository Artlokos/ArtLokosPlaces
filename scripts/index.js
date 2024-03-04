// @todo: Темплейт карточки


// @todo: DOM узлы
let addButton = document.querySelector('.profile__add-button');
let pageSection = document.querySelector('.page__section');
let placesList = document.querySelector('.places__list');
let delButton = document.querySelector('card__delete-button');

// @todo: Функция создания карточки

function addCard (init) {
    let cardTemplate = document.querySelector('#card-template').content;
    let nextCard = cardTemplate.querySelector('.card').cloneNode(true);

    nextCard.querySelector('.card__title').textContent = init.name;
    nextCard.querySelector('.card__image').src = init.link;
    nextCard.querySelector('.card__image').alt = `Изображение места ${init.name}`;
    return nextCard;
};

// @todo: Функция удаления карточки
function del_card(cardToRemove) {
}
// @todo: Вывести карточки на страницу

addButton.addEventListener('click', 
function() 
{
    initialCards.forEach(init => 
        {
            console.log(addCard(init));
            placesList.append(addCard(init));
        });
});

delButton.addEventListener('click', function(){
    let currentCard = "q";
    // currentCard.remove();
    console.log(currentCard);
});

