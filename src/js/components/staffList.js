export class StaffList {

    createList(item, num) {
        const tableData = document.querySelector('.table__body');
        const isUnnormal = item.IS_UNNORMAL === 0 ? 'Нет' : 'Да';
        const dateBeginningWork = item.DATE_BEGINNING_WORK === null ? 'Нет данных' : item.DATE_BEGINNING_WORK.slice(0,10);
        const dateEndingWork = item.DATE_ENDING_WORK === null ? 'Нет данных' : item.DATE_ENDING_WORK.slice(0,10);
        

        tableData.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="table__cell" rowspan="2">${num}.</td>
                <td class="table__cell" rowspan="2">${item.EMPLOYEE_NUMBER}</td>
                <td class="table__cell" rowspan="2">${item.STAFF_NAME}</td>
                <td class="table__cell">${item.POSITION_NAME}</td>
                <td class="table__cell" rowspan="2">${item.SCHEDULE_NAME}</td>
                <td class="table__cell" rowspan="2">${isUnnormal}</td>
                <td class="table__cell">${dateBeginningWork}</td>
            </tr>
            <tr>
                <td class="table__cell">${item.DEPARTMENT_NAME_MIDDLE}</td>
                <td class="table__cell">${dateEndingWork}</td>
            </tr>
        `)
    }

    render(items) {
        let num = 1;
        for (const item of items) {
            this.createList(item, num);
            num++;
        }
    }
}