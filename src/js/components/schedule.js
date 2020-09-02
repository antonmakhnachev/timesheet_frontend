// import { GetCurDateTime } from "../utils/getCurDateTime";

export class Schedule {
    constructor(api) {
        this.api = api;
    };

    getScheduleDays(dateFrom, dateTo) {
        const isIndivid = event.target;       
        if (isIndivid.checked) {
            if(dateFrom !== '' && dateTo !== '') {
                this.api.getTimeSheetCalendar(dateFrom.value, dateTo.value)
                    .then(res => this.drawScheduleIndivid(res.timesheetCalendar))
                    .catch(err => console.log(err));
            }
        } else {
            this.api.getDaysWeeks()
                .then(res => this.drawScheduleGeneral(res.daysweeks))
                .catch(err => console.log(err));            
        }        
    };

    drawScheduleGeneral(days) {
        const schedule = document.querySelector('.schedule');
        const scheduleDayPlaces = schedule.querySelectorAll('.schedule__day');
        for (const scheduleDayPlace of scheduleDayPlaces) {
            schedule.removeChild(scheduleDayPlace);
        }

        for (const day of days) {
            schedule.insertAdjacentHTML('beforeend', `
                <div class="schedule__day" id="${day.ID_DAY}">
                    <p class="schedule__text">${day.DAY_NAME_SHORT}</p>
                    <input type="time" class="schedule__time">
                </div>
            `)
        }
        this.arrayDays();
    };

    drawScheduleIndivid(days) {
        const schedule = document.querySelector('.schedule');
        const scheduleDayPlaces = schedule.querySelectorAll('.schedule__day');
        for (const scheduleDayPlace of scheduleDayPlaces) {
            schedule.removeChild(scheduleDayPlace);
        }

        for (const day of days) {
            schedule.insertAdjacentHTML('beforeend', `
                <div class="schedule__day" id="${day.ID_DATE}">
                    <p class="schedule__text">${day.DATE_NAME_SHORT.slice(0,5)}</p>
                    <input type="time" class="schedule__time">
                </div>
            `)
        }
        this.arrayDays();
    };

    arrayDays() {
        const schedule = document.querySelector('.schedule');
        const arrayDays = schedule.querySelectorAll('.schedule__day');

        for (const dayItem of arrayDays) {
            const dayDuration = dayItem.querySelector('.schedule__time');
            const dayName = dayItem.querySelector('.schedule__text');
            dayName.addEventListener('click', () => {
                dayItem.classList.toggle('schedule__day_is-select');
                dayDuration.classList.toggle('schedule__time_is-select');
            })
        }        
    };

    addSchedule(popup) {
        const scheduleName = document.getElementById('schedule_name').value;
        const dateEnd = '9999-12-31';
        const isUnnormal =  Number(document.getElementById('is_unnormal').checked);
        const isShort = Number(document.getElementById('is_short').checked);
        const isIndivid = Number(document.getElementById('is_individ').checked);
        const dateFrom = document.getElementById('period_date_from').value || new Date();
        const dateTo = document.getElementById('period_date_to').value || new Date('9999-12-31');        
        const startDayHours = document.getElementById('start_day_time').value.slice(0,2);
        const startDayMinutes = document.getElementById('start_day_time').value.slice(3,5);
        let durationDayHours;
        let durationDayMinutes;
        let isWorkday;
        let idDay;       

        this.api.addSchedule(scheduleName, dateEnd, isUnnormal, isShort, isIndivid)
         .then((result) => {
             const idSchedule = result.result[0].ID_SCHEDULE;
             const arrayDays = popup.querySelectorAll('.schedule__day');

             for (const day of arrayDays) {
                if (day.classList.contains('schedule__day_is-select')) {
                    isWorkday = 1;
                } else {
                    isWorkday = 0;
                };
                idDay = day.id;
                durationDayHours = day.querySelector('.schedule__time').value.slice(0,2) || 0;
                durationDayMinutes = day.querySelector('.schedule__time').value.slice(3,5) || 0;                
                this.api.addScheduleDays(idSchedule, idDay, startDayHours, startDayMinutes, durationDayHours, durationDayMinutes,
                    isWorkday, dateFrom, dateTo)
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
             }                        
         })
         .catch(err => console.log(err));
    }
};