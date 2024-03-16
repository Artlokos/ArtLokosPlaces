// @todo: Темплейт карточки
let cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
let addButton = document.querySelector('.profile__add-button');
let placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard (init, del_card) {
    let nextCard = cardTemplate.querySelector('.card').cloneNode(true);

    nextCard.querySelector('.card__title').textContent = init.name;
    nextCard.querySelector('.card__image').src = init.link;
    nextCard.querySelector('.card__image').alt = `Изображение места ${init.name}`;
    nextCard.querySelector('.card__delete-button').addEventListener('click',function(){
        del_card(nextCard);
    // nextCard.querySelector('.card__delete-button').addEventListener('click', function(evt){
    //     let cardToDelete = evt.target.closest('.card');
    //     cardToDelete.remove();
    });
    return nextCard;
};

// @todo: Функция удаления карточки
function del_card(evt) {
    let cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}
// @todo: Вывести карточки на страницу

addButton.addEventListener('click', function() {    
    initialCards.forEach (init => {
        placesList.append(addCard(init));
    });
});
