let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup__edit-profile');
let popupCloseButton = document.querySelector('.popup__btn-close');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_user-name');
let jobInput = formElement.querySelector('.popup__input_type_user-job');
let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-job');
//находим элементы второго попапа place
let profileOpenPopupAddButton = document.querySelector('.profile__add-button');
let popupAddPicture = document.querySelector('.popup__add-picture');
let popupCloseButtonAddPicture = document.querySelector('.popup__btn-close_add-picture');
let formElementPlace = document.querySelector('.popup__form_place');
let placeNameInput = document.querySelector('.popup__input_type_place-name');
let placePictureInput = document.querySelector('.popup__input_type_place-picture');


function openPopup() {
  popup.classList.add('popup_opened')
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
// Обработчик «отправки» формы.
function formSubmitHandler (evt) {
    evt.preventDefault();
// Выберем элементы, куда должны быть вставлены значения полей
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closePopup()
}
// Вставим новые значения с помощью textContent
// Обработчик «отправки» формы.
function formPlaceSubmitHandler (evt) {
  evt.preventDefault();
// Выберем элементы, куда должны быть вставлены значения полей
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closePopup()
}
// Вставим новые значения с помощью textContent
formElement.addEventListener('submit', formSubmitHandler);
profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
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

    <div class="place">
      <img class="place__image" src=${link} alt=${name}>
      <h2 class="place__title">${name}</h2>
      <button class="place__like" type="button" aria-label="поставить лайк"></button>
      <button class="place__delete" type="button" aria-label="удалить"></button>
    </div>