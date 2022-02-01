const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupCloseButton = document.querySelector('.popup__btn-close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_user-name');
const jobInput = formElement.querySelector('.popup__input_type_user-job');
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__user-job');
const profileOpenPopupAddButton = document.querySelector('.profile__add-button');
const popupAddPicture = document.querySelector('.popup__add-picture');
const popupCloseButtonAddPicture = document.querySelector('.popup__btn-close_add-picture');
const formElementPlace = document.querySelector('.popup__form_place');
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placePictureInput = document.querySelector('.popup__input_type_place-picture');
const placePictureLink = document.querySelector('.place__picture_link');
const placePictureName = document.querySelector('.place__picture_name');
const places = document.querySelector('.places');
const template = document.querySelector('.element__template').content;
const popupOpenPicture = document.querySelector('.popup__open-picture');
const popupPictureImage = document.querySelector('.popup__picture');
const popupPictureSubtitle = document.querySelector('.popup__subtitle-picture');

function openPopup() {
  popup.classList.add('popup_opened')
}
function openProfilePopup() {
  openPopup(profileOpenPopupButton)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function openAddPicturePopup() {
  popupAddPicture.classList.add('popup_opened')
}
function closePopup() {
  popup.classList.remove('popup_opened')
}
function closeAddPicturePopup() {
  popupAddPicture.classList.remove('popup_opened')
}
function formSubmitHandler (evt) {
    evt.preventDefault();
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closePopup()
}
function openPicturePopup(evt){
  openPopup(popupOpenPicture)
  popupPictureImage.src = evt.target.src
  popupPictureImage.alt = evt.target.alt
  popupPictureSubtitle.textContent = evt.target.alt
 }

formElement.addEventListener('submit', formSubmitHandler);
profileOpenPopupButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', closePopup);
formElementPlace.addEventListener('submit', createCard);
profileOpenPopupAddButton.addEventListener('click', openAddPicturePopup);
popupCloseButtonAddPicture.addEventListener('click', closeAddPicturePopup);


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

function renderinitialCards(item) {
  const newElement = template.cloneNode(true);
  const newImage = newElement.querySelector('.place__picture_link')
  newElement.querySelector('.place__picture_name').textContent = item.name;
  newImage.src = item.link;
  newImage.alt = item.name;
  newElement.querySelector('.place__button_delete').addEventListener('click', function (evt){
    evt.target.closest('.place').remove()
  });
  newElement.querySelector('.place__like').addEventListener('click', function (evt){
  evt.target.classList.toggle('place__like_type_active')
  });
  newImage.addEventListener('click', openPicturePopup);
  return newElement
}


function renderPlace(item){
  const cardCreated = renderinitialCards(item)
  places.prepend(cardCreated)
}


function createCard (evt) {
  evt.preventDefault();
  const cardInform = {};
  cardInform.name = placeNameInput.value;
  cardInform.link = placePictureInput.value;
  renderPlace(cardInform)
  closeAddPicturePopup()
}

initialCards.forEach(renderPlace)