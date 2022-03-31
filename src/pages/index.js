
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { validationConfig } from '../components/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { 
  initialCards,
  profileOpenPopupButton,
  formElement,
  nameInput,
  jobInput,
  profileOpenPopupAddButton,
  formElementPlace,
  places
} from '../components/constants.js';
import '../pages/index.css'

const popupModal = new PopupWithImage('.popup_type_open-picture');
popupModal.setEventListeners()
const userInfo = new UserInfo({ nameSelector: '.profile__user-name', jobSelector: '.profile__user-job' });

//Editing profile
const submitEditProfile = (item) => {
  const { username, userjob } = item
  userInfo.setUserInfo(username, userjob);
  popupEditProfile.close();
}

//Open profile
profileOpenPopupButton.addEventListener('click', () => {
  editProfileValidator.resetErrors();
  const item = userInfo.getUserInfo();
  nameInput.value = item.name
  jobInput.value = item.job
  editProfileValidator.disabledSubmitButton();
  popupEditProfile.open() 
});

const submitAddNewCard = (item) => {
  const card = createNewCard({ name: item.name, link: item.picture})
  section.addItem(card);
  popupAddNewCard.close();
}

const popupEditProfile = new PopupWithForm('.popup', submitEditProfile);
popupEditProfile.setEventListeners();

const popupAddNewCard = new PopupWithForm('.popup_type_add-picture', submitAddNewCard);
popupAddNewCard.setEventListeners();

//Open popup with form for added places
profileOpenPopupAddButton.addEventListener('click', function () {
  addCardValidator.resetErrors();
  popupAddNewCard.open();
});

const editProfileValidator = new FormValidator(validationConfig, formElement)
const addCardValidator = new FormValidator(validationConfig, formElementPlace)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()


function renderPlace(item) {
  const card = createNewCard(item)
  section.addItem(card)
}

function createNewCard(item) {
  const cardElement = new Card(item, '.element__template', () => {
    popupModal.open(item.name, item.link)
  })
  const cardCreated = cardElement.renderinitialCards()
  return cardCreated
}

const section = new Section({ items: initialCards, renderer: renderPlace }, '.places')
section.renderPlace();