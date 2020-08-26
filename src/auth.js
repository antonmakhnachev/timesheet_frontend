//import './auth.css';

import {Api} from './js/api/api.js';
import {API_OPTIONS} from './js/constants/api-options.js';

(function() {

    const formAuth = document.forms.form_auth;

    const api = new Api(API_OPTIONS);

    formAuth.addEventListener('submit', () => {
        event.preventDefault();

        const email = document.querySelector('.form__input-email');
        const pass = document.querySelector('.form__input-password');

        // console.log(email.value);
        // console.log(pass.value);

        api.login(email.value, pass.value)
            // .then((res) => console.log(res))
            .then(res => localStorage.setItem('token', res.token))
            .then(() => console.log(localStorage.getItem('token')))
            .catch(err => console.log({ err }));
    });

})();