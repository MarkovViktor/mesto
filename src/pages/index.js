
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
import { api } from '../components/Api.js';
let userId

api.getProfile()
  .then(res => {
    console.log('ansver', res)
    userInfo.setUserInfo(res.name, res.about)
    userId = res._id
  })

  api.getInitialCards()
  .then(cardList => {
    console.log(cardList)
    cardList.forEach(item => {
      const card = createNewCard({
        name: item.name,
        link: item.link,
        likes: item.likes,
        id: item._id,
        userId: userId,
        ownerId: item.owner._id
      })
      section.addItem(card)
    })
  })



const popupModal = new PopupWithImage('.popup_type_open-picture');
popupModal.setEventListeners()
const userInfo = new UserInfo({ nameSelector: '.profile__user-name', jobSelector: '.profile__user-job' });

//Editing profile
const submitEditProfile = (item) => {
  const { username, userjob } = item
  api.editProfile(username, userjob)
    .then(() => {
      userInfo.setUserInfo(username, userjob)
      popupEditProfile.close();
    })
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
  api.addCard(item.name, item.picture)
    .then(res => {
      const card = createNewCard({ 
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
  section.addItem(card);
  popupAddNewCard.close();
  })
}

const popupEditProfile = new PopupWithForm('.popup', submitEditProfile);
popupEditProfile.setEventListeners();

const popupAddNewCard = new PopupWithForm('.popup_type_add-picture', submitAddNewCard);
popupAddNewCard.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_type_delete-picture');
confirmPopup.setEventListeners()

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
  const cardElement = new Card(
    item, 
    '.element__template', 
    () => {
    popupModal.open(item.name, item.link)
  }, 
  (id) => {
     console.log('id', id)
    confirmPopup.open()
    confirmPopup.changeSubmitHandler(() => {
      api.deleteCard(id)
        .then(res => {
         cardElement.deleteCard()
         confirmPopup.close()
         console.log(res) 
        })
    })
  },
  (id) => {
    if(cardElement.isLiked()) {
      api.deleteLike(id)
      .then(res => {
        cardElement.setLikes(res.likes)
      })
    } else {
      api.addLike(id)
      .then(res => {
        cardElement.setLikes(res.likes)
      })
    }
  }, 
  )
  const cardCreated = cardElement.renderinitialCards()
  return cardCreated
}


const section = new Section({ items: [], renderer: renderPlace }, '.places')
section.renderPlace();