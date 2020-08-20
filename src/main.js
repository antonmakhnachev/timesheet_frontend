console.log('test');

import {MenuControl} from '../scripts/menuControl.js';
import {PopupControl} from '../scripts/popupControl.js';


(function () {

    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');




    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();

    menuHidingIcon.addEventListener('click', () => {
        menuControl.hide();        
    });

    menuShowingIcon.addEventListener('click', () => {
        menuControl.show();        
    });


    



    for (const popup of popups) {
        const closeIcon = popup.querySelector('.popup__close-icon');

        closeIcon.addEventListener('click', () => {
            popupControl.close(popup);
        });
    };







    menuControl.open(menu);













})();