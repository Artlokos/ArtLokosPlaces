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
    profileTitle.textContent = evt.target.children[0].value;
    profileDescription.textContent = evt.target.children[1].value; 
}