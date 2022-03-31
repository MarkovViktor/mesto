
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupCloseButton = 'popup__btn-close'
    this._popupOpen = 'popup_opened'
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._popupOpen);
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._popupOpen);
    document.removeEventListener('keyup', this._handleEscClose)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape'){
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains(this._popupOpen)) {
        this.close()
      }
      if (event.target.classList.contains(this._popupCloseButton)) {
        this.close()
      }
    })
  }
}