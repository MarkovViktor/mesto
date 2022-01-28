let profileOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__btn-close')
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_user-name');
let jobInput = formElement.querySelector('.popup__input_type_user-job');
let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-job');

function openPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
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
formElement.addEventListener('submit', formSubmitHandler);
profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
//Закрытие попапа кликом на пустую область.
//popup.addEventListener('click', function(event) {
// if(event.target === event.currentTarget){
//closePopup()
//  }
//})
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

const card = ({name, link}) => {
  const placeCard = document.createElement("div");
  placeCard.classList.add('place');
  placeCard.insertAdjacentHTML(
    'afterBegin',
    `
    <div class="place">
      <img class="place__image" src=${link} alt=${name}>
      <h2 class="place__title">${name}</h2>
      <button class="place__like" type="button" aria-label="поставить лайк"></button>
      <button class="place__delete" type="button" aria-label="удалить"></button>
    </div>
 `
  );
  return placeCard;
};