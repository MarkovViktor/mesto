
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._handleSubmit = handleFormSubmit
    }

    _getInputValues() {
        const items = {}
        this._inputList.forEach((input) => {
          items[input.name] = input.value;
        })
        return items;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
          this._handleSubmit(this._getInputValues())
        })
    }

    close() {
        super.close()
        this._form.reset();
    }
}