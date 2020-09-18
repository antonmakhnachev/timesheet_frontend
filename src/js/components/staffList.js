export class StaffList {
    constructor(api) {
        this.api = api;
    };

    _clearTable(table) {        
        const tableHead = table.querySelector('.table__head');
        const tableBody = table.querySelector('.table__body');                
         
        if (tableHead) {        
            table.removeChild(tableHead[0])
        };
 
        if (tableBody) {            
             table.removeChild(tableBody[0])
         };       
     };

    async getStaffList() {

        const table = document.getElementById('staff_list');

        this._clearTable(table);

        


        const staffList = await this.api.getStaffList();

        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');

        await this.createTableHead(tableHead);

        for (const staff of staffList.staffList) {
            const number = staffList.staffList.indexOf(staff) + 1;
            await this.createTableBody(tableBody, number, staff)
        }

        tableHead.classList.add('table__head');
        tableBody.classList.add('table__body');
        table.appendChild(tableHead);
        table.appendChild(tableBody);
       
    };

    createTableHead(tableHead) {

        tableHead.insertAdjacentHTML('beforeend', `
            <tr>
                <th rowspan="2" class="table__cell"></th>
                <th rowspan="2" class="table__cell">№</th>
                <th rowspan="2" class="table__cell">Таб. номер</th>
                <th rowspan="2" class="table__cell">Сотрудник</th>
                <th class="table__cell">Должность</th>
                <th rowspan="2" class="table__cell">Тек. график</th>                    
                <th rowspan="2" class="table__cell">Ненорм.</th>
                <th class="table__cell">Дата приема</th>                    
            </tr>
            <tr>
                <th class="table__cell">Подразделение</th>                    
                <th class="table__cell">Дата увольн.</th>
            </tr>
        `);

        return tableHead;

    };

    createTableBody(tableBody, number, staff) {       

        const rowBodyFirst = document.createElement('tr');
        const rowBodySecond = document.createElement('tr');

        const isUnnormal = staff.IS_UNNORMAL === 0 ? 'Нет' : 'Да';
        const dateBeginningWork = staff.DATE_BEGINNING_WORK === null ? 'Нет данных' : staff.DATE_BEGINNING_WORK.slice(0,10);
        const dateEndingWork = staff.DATE_ENDING_WORK === null ? 'Нет данных' : staff.DATE_ENDING_WORK.slice(0,10);

        rowBodyFirst.classList.add('table__row');
        rowBodyFirst.setAttribute('id', staff.ID_STAFF)
        rowBodySecond.classList.add('table__row');

        if (number % 2 === 0) {
            rowBodyFirst.classList.add('table__row_even-number');
            rowBodySecond.classList.add('table__row_even-number');            
        };       

        rowBodyFirst.insertAdjacentHTML('beforeend', `
            <td rowspan="2" class="table__cell"><img class="table__edit" src="../images/icon_edit_blue.png"</td>
            <td class="table__cell" rowspan="2">${number}</td>
            <td class="table__cell" rowspan="2">${staff.EMPLOYEE_NUMBER}</td>
            <td class="table__cell" rowspan="2">${staff.STAFF_NAME}</td>
            <td class="table__cell">${staff.POSITION_NAME}</td>
            <td class="table__cell" rowspan="2">${staff.SCHEDULE_NAME}</td>
            <td class="table__cell" rowspan="2">${isUnnormal}</td>
            <td class="table__cell">${dateBeginningWork}</td>            
        `);

        rowBodySecond.insertAdjacentHTML('beforeend', `           
            <td class="table__cell">${staff.DEPARTMENT_NAME_MIDDLE}</td>
            <td class="table__cell">${dateEndingWork}</td>            
        `);

        const editIcon = rowBodyFirst.querySelector('.table__edit');
        editIcon.addEventListener('click', () => {
            const idStaff = editIcon.closest('.table__row')
        })
        

        tableBody.appendChild(rowBodyFirst);
        tableBody.appendChild(rowBodySecond);

        return tableBody;
    };
    
    editStaff() {

    }
};