import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(PopupSelector) {
      super(PopupSelector);
      this._popupImage = this._popup.querySelector('.popup__picture')
      this._popupSubtitle = this._popup.querySelector('.popup__subtitle-picture')
  }
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;
    super.open()
  }
}
