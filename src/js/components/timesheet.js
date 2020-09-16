export class Timesheet {
    constructor(api) {
        this.api = api;
    };

    _clearTable(table, placePeriod) {
        
       const tableHead = document.getElementsByTagName('thead');
       const tableBody = document.getElementsByTagName('tbody');
       
       placePeriod.textContent = '';
        
       if (tableHead.length !== 0) {        
           table.removeChild(tableHead[0])
       };

       if (tableBody.length !== 0) {            
            table.removeChild(tableBody[0])
        };       
    };

    async getTimesheetData(dateFrom, dateTo) {
        const placePeriod = document.querySelector('.timesheet__period');
        const table = document.querySelector('.table');      

        this._clearTable(table, placePeriod);

        const preloader = document.querySelector('.preloader');        
        preloader.classList.add('preloader_is-opened');        

        const calendar = await this.api.getTimeSheetCalendar(dateFrom, dateTo);
        const staffList = await this.api.getStaffList();

        
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');      

        await this.createTableHead(tableHead, calendar.timesheetCalendar)
       
        for (const staff of staffList.staffList) {
            const number = staffList.staffList.indexOf(staff) + 1
            const staffTimesheet = await this.api.getStaffTimesheet(staff.ID_STAFF, dateFrom, dateTo)
           
            await this.createTableBody(tableBody, staff, staffTimesheet.staffTimesheet, calendar.timesheetCalendar.length, number)           
        };
        
        tableHead.classList.add('table__head');
        tableBody.classList.add('table__body');
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        
        preloader.classList.remove('preloader_is-opened');
        this.setPeriod(placePeriod, dateFrom, dateTo);
    };



    createTableHead(tableHead, calendar) {      

        const rowHeadFirst = document.createElement('tr');
        const rowHeadSecond = document.createElement('tr');
        const rowHeadThird = document.createElement('tr');

        rowHeadFirst.classList.add('table__row_head');
        rowHeadSecond.classList.add('table__row_head');
        rowHeadThird.classList.add('table__row_head');

        rowHeadFirst.insertAdjacentHTML('beforeend', `
            <th rowspan="2" class="table__cell"></th>
            <th rowspan="2" class="table__cell">Фамилия, имя, отчество</th>            
            <th rowspan="2" colspan="2" class="table__cell">Учетный номер</th>
            <th rowspan="2" class="table__cell">Должность (профессия)</th>
            <th colspan="${calendar.length + 2}" class="table__cell">Числа месяца</th>
        `);

        for (let i=0; i < 15; i++) {
            rowHeadSecond.insertAdjacentHTML('beforeend', `
                <th class="table__cell">${calendar[i].DATE_NAME_SHORT.slice(0,2)}</th>            
            `);
        };

        rowHeadSecond.insertAdjacentHTML('beforeend', `
                <th class="table__cell">Итого дней (часов) явок (неявок) с 1 по 15</th>            
            `);
        

        for (let i = 15; i < calendar.length; i++) {
            rowHeadSecond.insertAdjacentHTML('beforeend', `
                <th class="table__cell">${calendar[i].DATE_NAME_SHORT.slice(0,2)}</th>            
            `);
        };

        rowHeadSecond.insertAdjacentHTML('beforeend', `
            <th class="table__cell">Всего дней (часов) явок (неявок) за месяц</th>            
        `);        
         

        for (let i = 0; i < calendar.length + 7; i++) {
            rowHeadThird.insertAdjacentHTML('beforeend', `
            <th class="table__cell">${i + 1}</th>           
        `);
        };

        tableHead.appendChild(rowHeadFirst);
        tableHead.appendChild(rowHeadSecond);
        tableHead.appendChild(rowHeadThird);

        return tableHead;        
    };



    createTableBody(tableBody, staff, staffTimesheet, countDays, number) {
        let countWorkday = 0;
        let durationWorkday = 0;
        let durationWorkdayFirstHalf = 0;       

        const rowBodyFirst = document.createElement('tr');
        const rowBodySecond = document.createElement('tr');        

        rowBodyFirst.classList.add('table__row');
        rowBodySecond.classList.add('table__row');

        if (number % 2 === 0) {
            rowBodyFirst.classList.add('table__row_even-number');
            rowBodySecond.classList.add('table__row_even-number');            
        };

        rowBodyFirst.insertAdjacentHTML('beforeend', `
            <td rowspan="2" class="table__cell">${number}</td>
            <td rowspan="2" class="table__cell">${staff.STAFF_NAME}</td>
            <td rowspan="2" class="table__cell">${staff.EMPLOYEE_NUMBER}</td>
            <td rowspan="2" class="table__cell"></td>
            <td rowspan="2" class="table__cell">${staff.POSITION_NAME}</td>
        `);

        // первая половина месяца
        for (let i = 0; i < 15; i++) {
            if (staffTimesheet[i].DURATION_DAY_HOURS === 0 && staffTimesheet[i].DURATION_DAY_MINUTES === 0) {
                durationWorkday = '-'
            } else {
                durationWorkday = staffTimesheet[i].DURATION_DAY_HOURS + staffTimesheet[i].DURATION_DAY_MINUTES / 60;
                durationWorkdayFirstHalf += durationWorkday;
                countWorkday++;
            };

            rowBodyFirst.insertAdjacentHTML('beforeend', `
                <td class="table__cell table__cell_days">${durationWorkday}</td>
            `);

            rowBodySecond.insertAdjacentHTML('beforeend', `
                <td class="table__cell table__cell_days">${staffTimesheet[i].INCIDENT_CODE_CHAR}</td>
            `);
        };

        rowBodyFirst.insertAdjacentHTML('beforeend', `
                <td class="table__cell table__cell_total">Я ${countWorkday} / ${durationWorkdayFirstHalf}</td>                
        `);
        
        rowBodySecond.insertAdjacentHTML('beforeend', `            
            <td class="table__cell table__cell_total"></td>
        `);

        // вторая половина месяца
        for (let i = 15; i < countDays; i++) {
            if (staffTimesheet[i].DURATION_DAY_HOURS === 0 && staffTimesheet[i].DURATION_DAY_MINUTES === 0) {
                durationWorkday = '-'
            } else {
                durationWorkday = staffTimesheet[i].DURATION_DAY_HOURS + staffTimesheet[i].DURATION_DAY_MINUTES / 60;
                durationWorkdayFirstHalf += durationWorkday;
                countWorkday++;
            };

            rowBodyFirst.insertAdjacentHTML('beforeend', `
                <td class="table__cell table__cell_days">${durationWorkday}</td>
            `);

            rowBodySecond.insertAdjacentHTML('beforeend', `
                <td class="table__cell table__cell_days">${staffTimesheet[i].INCIDENT_CODE_CHAR}</td>
            `);
        };

        rowBodyFirst.insertAdjacentHTML('beforeend', `
                <td class="table__cell table__cell_total">Я ${countWorkday} / ${durationWorkdayFirstHalf}</td>                
        `);
        
        rowBodySecond.insertAdjacentHTML('beforeend', `            
            <td class="table__cell table__cell_total"></td>
        `);

        tableBody.appendChild(rowBodyFirst);
        tableBody.appendChild(rowBodySecond);      

        return tableBody;
    };   
    

    setPeriod(placePeriod, dateFrom, dateTo) {        
        placePeriod.textContent = `за период с ${dateFrom} по ${dateTo}`
    };    
};