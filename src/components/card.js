export function createCard(user,allDataForCardFromServer, addLikeOnCard,deleteLikeOnCard, showImgView,openPopupForDeleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const bigImage = document.querySelector('.popup_type_image'); 
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  
  const cardLikesCountFromBrowser = card.querySelector('.card__likes-count');
  cardLikesCountFromBrowser.innerHTML = allDataForCardFromServer.likes.length;
 
  const cardImage = card.querySelector('.card__image');
  cardImage.src = allDataForCardFromServer.link;
  cardImage.alt = allDataForCardFromServer.name;
  cardTitle.textContent = allDataForCardFromServer.name;

  allDataForCardFromServer.likes.forEach(like => {
    if (like._id == user._id) {
     cardLikeButton.classList.add('card__like-button_is-active');       
     }
   });

  cardLikeButton.addEventListener ('click', () =>
  {

  const hasLike =  allDataForCardFromServer.likes.some((like) => {
    return like._id === user._id
  })

      if (hasLike) {
        deleteLikeOnCard(allDataForCardFromServer).then( (newCardData) => 
          {
            allDataForCardFromServer = newCardData;
            cardLikesCountFromBrowser.innerHTML = allDataForCardFromServer.likes.length;
            rebindLike(cardLikeButton);
          })

      } else {
              addLikeOnCard(allDataForCardFromServer).then( (newCardData)=> 
            {
              allDataForCardFromServer = newCardData;
              cardLikesCountFromBrowser.innerHTML = allDataForCardFromServer.likes.length;
              rebindLike(cardLikeButton);
            })
          }
  });

  cardImage.addEventListener('click', () => showImgView(allDataForCardFromServer, bigImage));

if(allDataForCardFromServer.owner._id == user._id) {
    cardDeleteButton.addEventListener('click', () => openPopupForDeleteCard(cardData));} 
      else {
        cardDeleteButton.hidden = true;
      }

const rebindLike= (cardLikeButton) => {cardLikeButton.classList.toggle('card__like-button_is-active');}
      
return card;
}