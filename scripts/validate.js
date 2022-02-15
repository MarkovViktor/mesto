
const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};


const hasInvalidInput=(inputs)=>{
  return inputs.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

const checkInputValidity = (config, formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(config, formElement, inputElement);
  } else {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
  }
};

const checkButtonValidity = (config, inputs, button)=> {
  if (hasInvalidInput(inputs)) {
    button.setAttribute('disabled','')
    button.classList.add(config.inactiveButtonClass);
  } else {
      button.classList.remove(config.inactiveButtonClass);
      button.removeAttribute('disabled')
  }
}

const setEventListeners = (config, formElement) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  checkButtonValidity(config, inputs, button);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement);
      checkButtonValidity(config, inputs, button);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    });
      setEventListeners(config, formElement);
    });
  }

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
})