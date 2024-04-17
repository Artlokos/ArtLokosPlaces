export function closeByClickOnOverlay(evt) {
    if(evt.target.classList.contains('popup_is-opened')) {closePopup(evt.target);}
  }

 export function closePopup(evt) {
    document.removeEventListener('keydown', closeWithEsc);
    return evt.classList.remove('popup_is-opened');
  }
  
  export function closeWithEsc(evt) {
    if (evt.key==="Escape") {closePopup(document.querySelector('.popup_is-opened'));}
  }
  
  export function handleFormSubmit(evt) {
    evt.preventDefault();
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    profileTitle.textContent = evt.target.children[0].value;
    profileDescription.textContent = evt.target.children[1].value; 
}

export function openPopup(elem) {
  const popup = document.querySelector('.popup');
  elem.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeWithEsc);
  elem.addEventListener('click', closeByClickOnOverlay);

  const popupCloseButton = elem.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', ()=>{closePopup(elem);});
  
  elem.classList.add('popup_is-opened');
  return elem;
}