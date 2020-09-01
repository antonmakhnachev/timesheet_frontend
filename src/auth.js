//import './auth.css';

import {Api} from './js/api/api.js';
import {LocalStorageControl} from './js/utils/LocalStorageControl.js'
import {API_OPTIONS} from './js/constants/api-options.js';

(function() {

    const formAuth = document.forms.form_auth;

    const api = new Api(API_OPTIONS);
    const localStorageControl = new LocalStorageControl();

    formAuth.addEventListener('submit', () => {
        event.preventDefault();

        const email = document.querySelector('.form__input-email');
        const pass = document.querySelector('.form__input-password');

        // console.log(email.value);
        // console.log(pass.value);

        api.login(email.value, pass.value)
            // .then((res) => console.log(res))
            .then((res) => {
                localStorageControl.setLocalstorage(res.token, res.userFirstName, res.userSecondName)
                // localStorage.setItem('token', res.token)
            })
            .then(() => {
                console.log(localStorage.getItem('token'))
                console.log(localStorage.getItem('firstName'))
                console.log(localStorage.getItem('secondName'))
            })
            .then(() => top.location.href = "./main/main.html")
            .catch(err => console.log({ err }));
    });

})();