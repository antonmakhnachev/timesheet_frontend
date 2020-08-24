// import './main.css';
console.log('test');

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl';


(function () {

    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');

    const buttonNewDoc = document.querySelector('.timesheet__button');
    const formNewDoc = document.forms.form_new_doc;




    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();

    menuHidingIcon.addEventListener('click', () => {
        menuControl.hide();        
    });

    menuShowingIcon.addEventListener('click', () => {
        menuControl.show();        
    });

    buttonNewDoc.addEventListener('click', () => {
        const popup = formNewDoc.closest('.popup');
        popupControl.open(popup);
    });


    



    for (const popup of popups) {
        const closeIcon = popup.querySelector('.popup__close-icon');

        closeIcon.addEventListener('click', () => {
            popupControl.close(popup);
        });
    };







    menuControl.open(menu);













})();