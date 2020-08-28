//import './staff.css';
// console.log(process.env);

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl.js';
import {GetCurDateTime} from '../js/utils/getCurDateTime.js';
import {FillingReferences} from '../js/components/fillingReferences.js';
import {StaffList} from '../js/components/staffList.js';
import {User} from '../js/components/user.js'
import {Api} from '../js/api/api.js';

import {API_OPTIONS} from '../js/constants/api-options.js';


(function () {

    const page = document.querySelector('.page');

    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');
    const curDate = document.querySelector('.date');



    const buttonNewStaff = document.querySelector('.staff-content__button');
    const formNewStaff = document.forms.form_new_staff;
    



    const api = new Api(API_OPTIONS);
    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();
    const getCurDateTime = new GetCurDateTime();
    const fillingReferences = new FillingReferences();
    const staffList = new StaffList();
    const user = new User(localStorage.getItem('firstName'), localStorage.getItem('secondName'));

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


    formNewStaff.addEventListener('submit', () => {
        event.preventDefault();

        api.addStaff()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    });
    



    for (const popup of popups) {
        const closeIcon = popup.querySelector('.popup__close-icon');

        closeIcon.addEventListener('click', () => {
            popupControl.close(popup);
        });
    };





    api.getAllPositions()
        .then((data) => {                      
            const input = document.querySelector('.form__select-position');                               
            fillingReferences.positions(input, data.result)                        
        })
        .catch(err => console.log(err));

    api.getAllDepartments()
        .then((data) => {            
            const input = document.querySelector('.form__select-department');            
            fillingReferences.departments(input, data.result)
        })
        .catch(err => console.log(err));

    api.getAllSchedules()
        .then((data) => {            
            const input = document.querySelector('.form__select-schedule');            
            fillingReferences.schedules(input, data.result)
        })
        .catch(err => console.log(err));

    api.getAllTypesWork()
        .then((data) => {            
            const input = document.querySelector('.form__select-type-work');            
            fillingReferences.typesWork(input, data.result)
        })
        .catch(err => console.log(err));

    api.getStaffList()
        .then((data) => {            
            console.log(data.staffList)
            staffList.render(data.staffList)
        })
        .catch(err => console.log(err));



    menuControl.open(menu);
    user.isAuth();
    curDate.textContent = `Сегодня: ${getCurDateTime.getCurDate()}`;
    












})();