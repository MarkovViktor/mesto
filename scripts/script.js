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
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
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