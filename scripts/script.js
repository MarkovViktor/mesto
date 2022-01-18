let profileOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__btn-close')

function openPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)

popup.addEventListener('click', function(event) {
  if(event.target === event.currentTarget){
    closePopup()
  }
})

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');  // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__user-name');  // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__user-job');// Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-job');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

let userName = nameInput.value;    
let userJob = jobInput.value;
// Получите значение полей jobInput и nameInput из свойства value
let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-job');
    // Выберите элементы, куда должны быть вставлены значения полей
profileName.textContent = userName;
profileJob.textContent = userJob;
closePopup()
}

    // Вставьте новые значения с помощью textContent

formElement.addEventListener('submit', formSubmitHandler);
