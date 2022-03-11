import { FormValidator } from './FormValidator.js'
import {openPopup, closePopup, popupOpenPicture, popupPictureImage, popupPictureSubtitle} from './utils.js'
import { Card } from './Card.js'

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__btn-close');
const popupEditProfile = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_user-name');
const jobInput = formElement.querySelector('.popup__input_type_user-job');
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__user-job');
const profileOpenPopupAddButton = document.querySelector('.profile__add-button');
const popupAddPicture = document.querySelector('.popup_type_add-picture');
const popupCloseButtonAddPicture = document.querySelector('.popup__btn-close_add-picture');
const formElementPlace = document.querySelector('.popup__form_place');
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placePictureInput = document.querySelector('.popup__input_type_place-picture');
const places = document.querySelector('.places');
const popupPictureButtonClose = document.querySelector('.popup__btn-close_open-picture');
const popupButtonSaveAddPicture = document.querySelector('.popup__btn-save_add-picture');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const editProfileValidator = new FormValidator(validationConfig, formElement)
const addCardValidator = new FormValidator(validationConfig, formElementPlace)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

popupCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
})
profileOpenPopupAddButton.addEventListener('click', () => {
  openPopup(popupAddPicture);
})
popupCloseButtonAddPicture.addEventListener('click', () => {
  closePopup(popupAddPicture);
})
popupPictureButtonClose.addEventListener('click', () => {
  closePopup(popupOpenPicture);
})

function handleCardClick(name, link) {
  popupPictureImage.src = link
  popupPictureImage.alt = name
  popupPictureSubtitle.textContent = name
  openPopup(popupOpenPicture)
}

function disabledButtonAfterCreated() {
  popupButtonSaveAddPicture.setAttribute('disabled', '');
  popupButtonSaveAddPicture.classList.add('popup__btn-save_disabled');
}
function addFormInputProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile)
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

function renderPlace(item){
  const card = createNewCard(item)
  places.prepend(card)
}

function createNewCard(item) {
  const cardElement = new Card(item, '.element__template', handleCardClick)
  const card = cardElement.renderinitialCards()
  return card
}

function addCard (evt) {
  evt.preventDefault();
  const cardInform = {};
  cardInform.name = placeNameInput.value;
  cardInform.link = placePictureInput.value;
  renderPlace(cardInform)
  formElementPlace.reset()
  closePopup(popupAddPicture)
  disabledButtonAfterCreated()
}

formElement.addEventListener('submit', formSubmitHandler);
profileOpenPopupButton.addEventListener('click', addFormInputProfile);
formElementPlace.addEventListener('submit', addCard);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(renderPlace)
