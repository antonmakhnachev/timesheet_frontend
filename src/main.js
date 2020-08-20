console.log('test');

import {MenuControl} from '../scripts/menuControl.js';


(function () {

    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');


    const menuControl = new MenuControl(menu);

    menuHidingIcon.addEventListener('click', () => {
        menuControl.hide();        
    });

    menuShowingIcon.addEventListener('click', () => {
        menuControl.show();        
    });





    menuControl.open(menu);













})();