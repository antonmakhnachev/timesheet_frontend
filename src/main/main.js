// import './main.css';
console.log('test');

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl.js';
import {Timesheet} from '../js/components/timesheet.js';
import {User} from '../js/components/user.js'
import {GetCurDateTime} from '../js/utils/getCurDateTime.js';
import {Api} from '../js/api/api.js';
import {API_OPTIONS} from '../js/constants/api-options.js';


(function () {

    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');
    const curDate = document.querySelector('.date');

    const buttonNewDoc = document.querySelector('.timesheet__button_add-doc');
    const buttonSetPeriod = document.querySelector('.timesheet__button_set-period');

    const formNewDoc = document.forms.form_new_doc;
    const formSetPeriod = document.forms.form_set_period;



    const api = new Api(API_OPTIONS);
    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();
    const timesheet = new Timesheet();
    const getCurDateTime = new GetCurDateTime();
    const user = new User(localStorage.getItem('firstName'), localStorage.getItem('secondName'));

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

    buttonSetPeriod.addEventListener('click', () => {
        const popup = formSetPeriod.closest('.popup');
        popupControl.open(popup);
    });


    formSetPeriod.addEventListener('submit', () => {
        event.preventDefault();
        const dateFrom = document.getElementById('period_date_from').value;
        const dateTo = document.getElementById('period_date_to').value;
        const popup = formSetPeriod.closest('.popup');        

        Promise.all([
            api.getTimeSheetCalendar(dateFrom, dateTo),
            api.getStaffList()            
        ])
        .then((data) => {
            console.log(data)
            const [ timesheetCalendar, staffList ] = data;
            // console.log(staffList)

            timesheet.drawHead(timesheetCalendar.timesheetCalendar)

            for (const staff of staffList.staffList) {
                const number = staffList.staffList.indexOf(staff) + 1;
                console.log(staff)
                api.getStaffTimesheet(staff.ID_STAFF, dateFrom, dateTo)
                    .then((data) => {
                        timesheet.drawBody(staff, data.staffTimesheet, number);                        
                    })
            }

        })       
        .then(() => {
            timesheet.setPeriod(dateFrom, dateTo)
        })
        .then(() => {
            popupControl.close(popup);
        })
        .catch(err => console.log(err));
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













})();