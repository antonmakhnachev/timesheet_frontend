export class Api {
    constructor(options) {
        this.options = options;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        // console.log(res.json())
        return res.json();
    };

    login(email, pass) {
        return fetch(`${this.options.baseUrl}/users/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                pass: pass
            })
        })
        .then(res => this._getResponseData(res))
    }


    getAllPositions() {

        return fetch(`${this.options.baseUrl}/getdata/getallpositions`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }               
        })
        .then(res => this._getResponseData(res))        
    };

    getAllDepartments() {

        return fetch(`${this.options.baseUrl}/getdata/getalldepartments`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }            
        })
        .then(res => this._getResponseData(res))        
    };

    getAllSchedules() {

        return fetch(`${this.options.baseUrl}/getdata/getallschedules`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }            
        })
        .then(res => this._getResponseData(res))        
    };

    getAllTypesWork() {

        return fetch(`${this.options.baseUrl}/getdata/getalltypeswork`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }            
        })
        .then(res => this._getResponseData(res))        
    };

    addStaff() {
        return fetch(`${this.options.baseUrl}/staff/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                employeeNumber: document.getElementById('employee_number').value,
                firstName: document.getElementById('first_name').value,
                secondName: document.getElementById('second_name').value,
                middleName: document.getElementById('middle_name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                gender: document.getElementById('gender').value,
                typeWork: document.getElementById('type_work').value,
                birthday: document.getElementById('birthday').value,      
                position: document.getElementById('position').value,
                department: document.getElementById('department').value,
                schedule: document.getElementById('schedule').value
            })
        })
        .then(res => this._getResponseData(res))
    }

    getStaffList() {

        return fetch(`${this.options.baseUrl}/getdata/getstafflist`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }               
        })
        .then(res => this._getResponseData(res))        
    };
    
};