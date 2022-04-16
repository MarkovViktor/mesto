
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { validationConfig } from '../components/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { api } from '../components/Api.js';
import { 
  editAvatarForm,
  profileOpenPopupButton,
  formElement,
  nameInput,
  jobInput,
  profileOpenPopupAddButton,
  formElementPlace,
  openProfileAvatarButton
} from '../components/constants.js';
import '../pages/index.css'

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cardList]) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatarInfo(res.avatar)
    userId = res._id;
    console.log(cardList)
    section.renderPlace(cardList)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })

const popupModal = new PopupWithImage('.popup_type_open-picture');
popupModal.setEventListeners()
const userInfo = new UserInfo({ nameSelector: '.profile__user-name', jobSelector: '.profile__user-job', avatarSelector: '.profile__avatar' });

//Editing profile
const submitEditProfile = (item) => {
  popupEditProfile.renderLoading(true)
  const { username, userjob } = item
  api.editProfile(username, userjob)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about)
      popupEditProfile.close();
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

//Add new avatar
const submitChangeAvatar = (data) => {
  popupAvatar.renderLoading(true);
  const avatar = data.avatar;
  console.log(data.avatar)
  api.addAvatar(avatar)
    .then((res) => {
      userInfo.setAvatarInfo(res.avatar);
      popupAvatar.close()
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
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

//Add new card
const submitAddNewCard = (item) => {
  popupAddNewCard.renderLoading(true)
  api.addCard(item.name, item.picture)
    .then(res => {
      const card = createNewCard(res)
  section.addItem(card);
  popupAddNewCard.close();
  })
  .finally(() => {
    popupAddNewCard.renderLoading(false);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
}

const popupEditProfile = new PopupWithForm('.popup', submitEditProfile);
popupEditProfile.setEventListeners();
const popupAddNewCard = new PopupWithForm('.popup_type_add-picture', submitAddNewCard);
popupAddNewCard.setEventListeners();
const confirmPopup = new PopupWithForm('.popup_type_delete-picture');
confirmPopup.setEventListeners()
const popupAvatar = new PopupWithForm('.popup_type_edit-avatar', submitChangeAvatar);
popupAvatar.setEventListeners()

//Open popup with form for added avatar
openProfileAvatarButton.addEventListener('click', function () {
  popupAvatarValidator.resetErrors();
  popupAvatarValidator.disabledSubmitButton();
  popupAvatar.open();
});

//Open popup with form for added places
profileOpenPopupAddButton.addEventListener('click', function () {
  addCardValidator.resetErrors();
  popupAddNewCard.open();
});

const editProfileValidator = new FormValidator(validationConfig, formElement)
const addCardValidator = new FormValidator(validationConfig, formElementPlace)
const popupAvatarValidator = new FormValidator(validationConfig, editAvatarForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()
popupAvatarValidator.enableValidation()

const createNewCard = (item) => {
  const cardElement = new Card(
    { name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      userId: userId,
      ownerId: item.owner._id},
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
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
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

const section = new Section({ items: [], renderer: data => { section.addItem(createNewCard(data)) } }, '.places')