//import './staff.css';
console.log('test');

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl.js';
import {GetCurDateTime} from '../js/utils/getCurDateTime.js';


(function () {

    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');
    const curDate = document.querySelector('.date');

    const buttonNewStaff = document.querySelector('.staff-content__button');
    const formNewStaff = document.forms.form_new_staff;
    




    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();
    const getCurDateTime = new GetCurDateTime();

    menuHidingIcon.addEventListener('click', () => {
        menuControl.hide();        
    });

    menuShowingIcon.addEventListener('click', () => {
        menuControl.show();        
    });

    

    buttonNewStaff.addEventListener('click', () => {
        const popup = formNewStaff.closest('.popup');
        popupControl.open(popup);
    });
    



    for (const popup of popups) {
        const closeIcon = popup.querySelector('.popup__close-icon');

        closeIcon.addEventListener('click', () => {
            popupControl.close(popup);
        });
    };







    menuControl.open(menu);
    curDate.textContent = `Сегодня: ${getCurDateTime.getCurDate()}`;
    












})();