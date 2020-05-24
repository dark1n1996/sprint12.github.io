class formValidator {
    constructor(validationWords) {
      this.validationWords = validationWords;
    }

    checkInputValidity(element, error) {
        if (element.validity.valueMissing) {
          return error.textContent = this.validationWords.requiredText;
        }
        if (element.validity.tooLong) {
          return error.textContent = this.validationWords.validationLength;
        }
        if (element.validity.tooShort) {
          return error.textContent = this.validationWords.validationLength;
        }
        if (element.validity.typeMismatch) {
          return error.textContent = this.validationWords.requiredLink;
        }
        error.textContent = "";
      }

      setSubmitButtonState(form, button) {
        button.disabled = !form.checkValidity();
        if (!form.checkValidity()) {
          button.classList.add('popup__button_disabled');
        
        } else {
          button.classList.remove('popup__button_disabled');
        }
      }

      setEventListeners(popup, place) {
        const form = popup.querySelector('form');
        const button = form.querySelector('.button');
        form.addEventListener("input", function(event){
            place.checkInputValidity(event.target, event.target.closest('label').querySelector('.popup__error'));
            place.setSubmitButtonState(form, button);
        });
      }
}