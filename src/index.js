import './index.css';

import {Api} from './js/api/api.js';
import {LocalStorageControl} from './js/utils/LocalStorageControl.js'
import {API_OPTIONS} from './js/constants/api-options.js';
import {FormValidator} from './js/components/formvalidator.js';

(function() {

    const formAuth = document.forms.form_auth;
    const forms = document.querySelectorAll('.form');

    const api = new Api(API_OPTIONS);
    const localStorageControl = new LocalStorageControl();
    const formValidator = new FormValidator();

    formAuth.addEventListener('submit', () => {
        event.preventDefault();

        const email = document.querySelector('.form__input-email');
        const pass = document.querySelector('.form__input-password');        

        api.login(email.value, pass.value)            
            .then((res) => {
                localStorageControl.setLocalstorage(res.token, res.userFirstName, res.userSecondName)                
            })
            .then(() => {
                console.log(localStorage.getItem('token'))
                console.log(localStorage.getItem('firstName'))
                console.log(localStorage.getItem('secondName'))
            })
            .then(() => window.location.href = './timesheet.html')
            .catch(err => console.log({ err }));
    });

    for (const form of forms) {
        formValidator.setEventListener(form);
    }

})();