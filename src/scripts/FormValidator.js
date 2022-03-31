
export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
    const { inputSelector, submitButtonSelector } = this._settings
    this._buttonElement = this._form.querySelector(submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
  }

  _showInputError(inputElement) {
    const { errorClass, inputErrorClass } = this._settings
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  
  _hideInputError(inputElement) {
    const { errorClass, inputErrorClass } = this._settings
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
  }

  disabledSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        this._setEventListeners();
  }

  resetErrors() {
    this._form.reset()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState()
  }
}