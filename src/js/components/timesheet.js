export class Timesheet {

    drawHead(items) {
        const rowHeadFirst = document.querySelector('.table__row_head-first');
        const rowHeadSecond = document.querySelector('.table__row_head-second');
        let classCell;

        for (const item of items) {
            if (item.IS_WORKDAY === 1) {
                classCell = 'table__cell table__cell_days'
            } else {
                classCell =' table__cell table__cell_days table__cell_red'
            }

            if (items.indexOf(item) <= 14) {
                rowHeadFirst.insertAdjacentHTML('beforeend', `<th class="${classCell}">${item.DATE_NAME_SHORT.slice(0,2)}</th>`)
            } else {
                rowHeadSecond.insertAdjacentHTML('beforeend', `<th class="${classCell}">${item.DATE_NAME_SHORT.slice(0,2)}</th>`)
            }
                    
        }

        if (items.length - 15 > 15) {            
            rowHeadFirst.insertAdjacentHTML('beforeend', `<th class="table__cell">X</th>`);
        } else if (items.length - 15 < 15) {           
            rowHeadSecond.insertAdjacentHTML('beforeend', `<th class="table__cell">X</th>`);
        }

        rowHeadFirst.insertAdjacentHTML('beforeend', `
            <th class="table__cell">Итого за 1 половину</th>                        
            <th rowspan="2" class="table__cell">Итого за месяц</th>
            `);

        rowHeadSecond.insertAdjacentHTML('beforeend', `
            <th class="table__cell">Итого за 2 половину</th>
            `);
    };

    setPeriod(dateFrom, dateTo) {
        const placePerion = document.querySelector('.timesheet__period');
        placePerion.textContent = `за период с ${dateFrom} по ${dateTo}`
    };


    drawBody(staff, timesheet, number) {
        const rowBodyFirst = document.querySelector('.table__row_body-first');
        const rowBodySecond = document.querySelector('.table__row_body-second');
        let totalDaysFirstHalf = 0;
        let totalHoursFirstHalf = 0;
        let totalDaysSecondHalf = 0;
        let totalHoursSecondHalf = 0;

        
        rowBodyFirst.insertAdjacentHTML('beforeend', `
            <td rowspan="2" class="table__cell table__caption">${number}.</td>
            <td rowspan="2" class="table__cell table__caption">${staff.EMPLOYEE_NUMBER}</td>
            <td rowspan="2" class="table__cell table__caption">${staff.STAFF_NAME}</td>            
        `)

        for (const item of timesheet) {
            console.log(item)
            const workTime = item.DURATION_DAY_HOURS + item.DURATION_DAY_MINUTES / 60;            
            
            if (timesheet.indexOf(item) <= 14) {
                if (item.INCIDENT_CODE_CHAR === 'Я') {
                    totalDaysFirstHalf = totalDaysFirstHalf + 1;
                    totalHoursFirstHalf = totalHoursFirstHalf + workTime;
                }

                rowBodyFirst.insertAdjacentHTML('beforeend', `
                    <td class="table__cell table__cell_days table__data">${item.INCIDENT_CODE_CHAR}${workTime}</td>            
                `)
            } else {
                if (item.INCIDENT_CODE_CHAR === 'Я') {
                    totalDaysSecondHalf = totalDaysSecondHalf + 1;
                    totalHoursSecondHalf = totalHoursSecondHalf + workTime;
                }

                rowBodySecond.insertAdjacentHTML('beforeend', `
                    <td class="table__cell table__cell_days table__data">${item.INCIDENT_CODE_CHAR}${workTime}</td>            
                `)
            }
            
        }

        if (timesheet.length - 15 > 15) {            
            rowBodyFirst.insertAdjacentHTML('beforeend', `<th class="table__cell">X</th>`);
        } else if (timesheet.length - 15 < 15) {           
            rowBodySecond.insertAdjacentHTML('beforeend', `<th class="table__cell">X</th>`);
        }

        rowBodyFirst.insertAdjacentHTML('beforeend', `
            <td class="table__cell table__data">${totalDaysFirstHalf} дн. / ${totalHoursFirstHalf} ч.</td>
            <td rowspan="2" class="table__cell table__data">${totalDaysFirstHalf + totalDaysSecondHalf} дн. / ${totalHoursFirstHalf + totalHoursSecondHalf} ч.</td>            
        `)
        rowBodySecond.insertAdjacentHTML('beforeend', `
            <td class="table__cell table__data">${totalDaysSecondHalf} дн. / ${totalHoursSecondHalf} ч.</td>            
        `)
        

    }
}