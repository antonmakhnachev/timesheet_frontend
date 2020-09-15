export class FormValidator {
    checkInputValidity (event) {
        const errMsg = document.getElementById(`${event.target.id}-err`);
        

        switch (true) {
            case event.target.validity.valueMissing:
                errMsg.textContent = 'Это обязательное поле';
                break;
            case event.target.validity.tooShort:
                errMsg.textContent=`Должно не менее ${event.target.getAttribute('minlength')} символов`;
                break;
            case event.target.validity.typeMismatch:
                errMsg.textContent='Некорректный email';
                break;
            default:
                errMsg.textContent = '';
        }

        
    }


    setEventListener (form) {        
        form.addEventListener('input', this.checkInputValidity);
        form.addEventListener('input', this.setSubmitButtonState);
    }

    setSubmitButtonState (event) {
        const form = event.currentTarget;
        const button = form.elements.button_submit;

        if (form.checkValidity()) {
            button.disabled = false;
            button.classList.remove('button_is-disabled');
        } else {
            button.disabled = true;
            button.classList.add('button_is-disabled');
        }

        
    }

};