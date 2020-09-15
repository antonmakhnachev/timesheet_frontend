import '../timesheet.css';

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl.js';
import {Timesheet} from '../js/components/timesheet.js';
import {User} from '../js/components/user.js'
import {GetCurDateTime} from '../js/utils/getCurDateTime.js';
import {FillingReferences} from '../js/components/fillingReferences.js';
import {Api} from '../js/api/api.js';
import {API_OPTIONS} from '../js/constants/api-options.js';
import {MONTHS, DAYS} from '../js/constants/arrays.js';
import {FormValidator} from '../js/components/formvalidator.js';


(function () {

    
    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');
    const curDate = document.querySelector('.date');

    
    const buttonSetPeriod = document.querySelector('.timesheet__button_set-period');

    const forms = document.querySelectorAll('.form');
    const formNewDoc = document.forms.form_new_doc;
    const formSetPeriod = document.forms.form_set_period;



    const api = new Api(API_OPTIONS);
    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();
    const timesheet = new Timesheet(api);
    const getCurDateTime = new GetCurDateTime(MONTHS, DAYS);
    const fillingReferences = new FillingReferences();
    const user = new User(localStorage.getItem('firstName'), localStorage.getItem('secondName'));
    const formValidator = new FormValidator();

    

    

    buttonSetPeriod.addEventListener('click', () => {
        const popup = formSetPeriod.closest('.popup');
        popupControl.open(popup);
    });

    


    formSetPeriod.addEventListener('submit', () => {
        event.preventDefault();
        const dateFrom = document.getElementById('period_date_from').value;
        const dateTo = document.getElementById('period_date_to').value;
        const popup = formSetPeriod.closest('.popup');        

        timesheet.getTimesheetData(dateFrom, dateTo)        
            .then(() => {
                timesheet.setPeriod(dateFrom, dateTo)
            })
            .then(() => {
                formSetPeriod.reset();
                popupControl.close(popup);
            })
            .catch(err => console.log(err));
    });



    timesheet.getTimesheetData();


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
    user.isAuth();
    curDate.textContent = `Сегодня: ${getCurDateTime.getCurDate()}`;

    for (const form of forms) {
        formValidator.setEventListener(form);
    }













})();