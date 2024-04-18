export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupWithEscape)
}

export function closePopup(popup) {
popup.classList.remove('popup_is-opened');
document.removeEventListener('keydown', closePopupWithEscape);
}

export function closePopupWithEscape(event) {
if(event.key === 'Escape') {
  const popup = document.querySelector('.popup_is-opened');
  closePopup(popup)
}
}
export function closePopupWithOverlay(event) {
if(event.target.classList.contains('popup_is-opened')) {closePopup(event.target);}
}
