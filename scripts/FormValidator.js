
export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  _disabledSubmitButton(button) {
    button.classList.add(this._settings.inactiveButtonClass);
    button.disabled = true;
  }

  _enableSubmitButton(button) {
    button.classList.remove(this._settings.inactiveButtonClass);
    button.disabled = false;
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      this._disabledSubmitButton(button);
    } else {
      this._enableSubmitButton(button);
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const button = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(inputs, button);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
       this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, button);
      });
    });
  };

  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        this._setEventListeners();
    }
}

