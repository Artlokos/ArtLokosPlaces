
const popupForm = document.querySelector('.popup__form');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const inputTypeName = popupForm.querySelector('.popup__input_type_name');
const inputTypeDescription = popupForm.querySelector('.popup__input_type_description');
const inputTypeCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeURL = document.querySelector('.popup__input_type_url'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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
if(event.target.classList.contains('popup_is-opened')) {
  closePopup(event.target);
}
}
export function changeProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;

  closePopup(popupTypeEdit);
}
export function addNewCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputTypeCardName.value,
    link: inputTypeURL.value,
  }
  const card = createCard(cardData, ImgView);
  placesList.prepend(card);

  inputTypeCardName.value = "";
  inputTypeURL.value = "";

  closePopup(popupTypeNewCard);
}
