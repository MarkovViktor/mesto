
export const profileOpenPopupButton = document.querySelector('.profile__edit-button');
export const profileForm = document.querySelector('.popup__form');
export const nameInput = profileForm.querySelector('.popup__input_type_user-name');
export const jobInput = profileForm.querySelector('.popup__input_type_user-job');
export const profileOpenPopupAddButton = document.querySelector('.profile__add-button');
export const formElementPlace = document.querySelector('.popup__form_place');
export const places = document.querySelector('.places');
export const openProfileAvatarButton = document.querySelector('.profile__avatar-button');
export const editAvatarForm = document.querySelector('.popup__form_edit-avatar');
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}