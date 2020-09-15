import '../incidents.css';

import {MenuControl} from '../js/components/menuControl.js';
import {PopupControl} from '../js/components/popupControl.js';

import {User} from '../js/components/user.js'
import {GetCurDateTime} from '../js/utils/getCurDateTime.js';
import {FillingReferences} from '../js/components/fillingReferences.js';
import {Api} from '../js/api/api.js';
import {API_OPTIONS} from '../js/constants/api-options.js';
import {MONTHS, DAYS} from '../js/constants/arrays.js';
import {FormValidator} from '../js/components/formvalidator.js';
import {Incidents} from '../js/components/incidents.js';


(function () {

    
    const menu = document.querySelector('.popup-menu');
    const menuHidingIcon = document.querySelector('.popup-menu__close-icon');
    const menuShowingIcon = document.querySelector('.popup-menu__menu-icon');
    const popups = document.querySelectorAll('.popup');
    const curDate = document.querySelector('.date');
    const forms = document.querySelectorAll('.form');
    const table = document.querySelector('.table');

    const buttonNewDoc = document.getElementById('button_new_doc');   
    const formNewDoc = document.forms.form_new_doc;

    const formNewDocType = document.getElementById('form_new_doc_type');
    const formNewDocStaff = document.getElementById('form_new_doc_staff');

    const formSearchType = document.getElementById('form_search_type');
    const formSearchStaff = document.getElementById('form_search_staff');
    



    const api = new Api(API_OPTIONS);
    const menuControl = new MenuControl(menu);
    const popupControl = new PopupControl();
    
    const getCurDateTime = new GetCurDateTime(MONTHS, DAYS);
    const fillingReferences = new FillingReferences();
    const user = new User(localStorage.getItem('firstName'), localStorage.getItem('secondName'));
    const formValidator = new FormValidator();
    const incidents = new Incidents(api);




    buttonNewDoc.addEventListener('click', () => {
        const popup = formNewDoc.closest('.popup');
        popupControl.open(popup);
    });

    api.getAllIncidents()
        .then((data) => {
            fillingReferences.incidents(formNewDocType, data.result)
            fillingReferences.incidents(formSearchType, data.result)
        })
        .catch(err => console.log(err));

    api.getStaffList()
        .then((data) => {
            fillingReferences.staff(formNewDocStaff, data.staffList)
            fillingReferences.staff(formSearchStaff, data.staffList)
        })
        .catch(err => console.log(err));

    
    

    

    formNewDoc.addEventListener('submit', () => {
        event.preventDefault();

        const idIncident = document.getElementById('form_new_doc_type').value;        
        const dateFrom = document.getElementById('form_new_doc_date_from').value;
        const dateTo = document.getElementById('form_new_doc_date_to').value;
        const isDraft = Number(document.getElementById('is_draft').checked);
        const staffList = document.getElementById('form_new_doc_staff').getElementsByTagName('option');
        const popup = formNewDoc.closest('.popup');

        incidents.addDocument(staffList, idIncident, dateFrom, dateTo, isDraft)
            .then(() => {
                incidents.getAllDocuments()                
            })            
            .then(() => {
                formNewDoc.reset();
                popupControl.close(popup);
            })
            .catch(err => console.log(err));       
    });



    incidents.getAllDocuments();




























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