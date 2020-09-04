import './staff.css';

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl.js';
import {GetCurDateTime} from '../js/utils/getCurDateTime.js';
import {FillingReferences} from '../js/components/fillingReferences.js';
import {StaffList} from '../js/components/staffList.js';
import {User} from '../js/components/user.js'
import {Schedule} from '../js/components/schedule.js'
import {InfoMessage} from '../js/components/infoMessage.js';
import {Api} from '../js/api/api.js';

import {API_OPTIONS} from '../js/constants/api-options.js';
import {MONTHS, DAYS} from '../js/constants/arrays.js'


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
    const getCurDateTime = new GetCurDateTime(MONTHS, DAYS);
    const fillingReferences = new FillingReferences();
    const staffList = new StaffList();
    const user = new User(localStorage.getItem('firstName'), localStorage.getItem('secondName'));
    const schedule = new Schedule(api, getCurDateTime);
    const infoMessage = new InfoMessage(popupControl);

    menuHidingIcon.addEventListener('click', () => {
        menuControl.hide();        
    });

    menuShowingIcon.addEventListener('click', () => {
        menuControl.show();        
    });

    
    // форма добавления нового сотрудника
    buttonNewStaff.addEventListener('click', () => {
        const popup = formNewStaff.closest('.popup');
        const buttonAddStaff = popup.querySelector('.button-add-staff');
        const buttonNewSchedule = popup.querySelector('.button-new-schedule');
        const inputPos = popup.querySelector('.form__select-position');
        const inputDep = popup.querySelector('.form__select-department');
        const inputSched = popup.querySelector('.form__select-schedule');
        const inputTypeWork = popup.querySelector('.form__select-type-work');
        const formNewSchedule = document.forms.form_new_schedule; 

        // заполнение справочника должностей
        api.getAllPositions()
            .then(data => fillingReferences.positions(inputPos, data.result))                        
            .catch(err => console.log(err));
        
        // заполнение справочника подразделений
        api.getAllDepartments()
            .then(data => fillingReferences.departments(inputDep, data.result))
            .catch(err => console.log(err));

        // заполнение справочника графиков работы
        api.getAllSchedules()
            .then(data => fillingReferences.schedules(inputSched, data.result))
            .catch(err => console.log(err));
        
         // заполнение справочника видов работы
        api.getAllTypesWork()
            .then(data => fillingReferences.typesWork(inputTypeWork, data.result))
            .catch(err => console.log(err));

        // отправка формы
        buttonAddStaff.addEventListener('click', () => {
            event.preventDefault();            
            api.addStaff()
                // .then(() => infoMessage.show('Сотрудник добавлен'))
                // .then(() => formNewStaff.reset())
                .catch(err => console.log(err));
        });
        
        // открытие формы для добавления нового графика
        buttonNewSchedule.addEventListener('click', () => {
            event.preventDefault();
            const popup = formNewSchedule.closest('.popup');
            const isIndivid = document.getElementById('is_individ');
            const dateFrom = document.getElementById('period_date_from');
            const dateTo = document.getElementById('period_date_to');
            const buttonAddSchedule = popup.querySelector('.button-add-schedule');
            
            isIndivid.addEventListener('click', () => {
                schedule.getScheduleDays(dateFrom, dateTo);
            });

            buttonAddSchedule.addEventListener('click', () => {
                event.preventDefault();
                schedule.addSchedule(popup)
                
                // обновление справочника графиков работы
                api.getAllSchedules()
                .then(data => fillingReferences.schedules(inputSched, data.result))
                // .then(() => infoMessage.show('График добавлен'))
                // .then(() => formNewSchedule.reset())
                .catch(err => console.log(err));                
                
                popupControl.close(popup);
            });
            schedule.getScheduleDays();
            popupControl.open(popup);
        });
        popupControl.open(popup);
    });   



    for (const popup of popups) {
        const closeIcon = popup.querySelector('.popup__close-icon');

        closeIcon.addEventListener('click', () => {
            popupControl.close(popup);
        });
    };
    

    api.getStaffList()
        .then(data => staffList.render(data.staffList))
        .catch(err => console.log(err));



    menuControl.open(menu);
    user.isAuth();
    curDate.textContent = `Сегодня: ${getCurDateTime.getCurDate()}`;



})();