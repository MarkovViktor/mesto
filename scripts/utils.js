
export const popupOpenPicture = document.querySelector('.popup_type_open-picture');
export const popupPictureImage = document.querySelector('.popup__picture');
export const popupPictureSubtitle = document.querySelector('.popup__subtitle-picture');

export function openPopup(popup) {
  popup.classList.add('popup_opened')
  popup.addEventListener('mousedown', closePopupClickOverlay)
  document.addEventListener('keydown', closePopupPushEsc)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  popup.removeEventListener('click', closePopupClickOverlay)
  document.removeEventListener('keydown', closePopupPushEsc)
}  

export const closePopupClickOverlay = (event) => {
  if(event.target === event.currentTarget){
    closePopup(event.target);
  }
}
export const closePopupPushEsc = (event) => {
  if(event.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}