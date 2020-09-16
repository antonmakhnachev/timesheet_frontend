export class GetCurDateTime {
    constructor(months, days) {
        this.fullDate = new Date();
        this.year = this.fullDate.getFullYear();
        this.month = this.fullDate.getMonth();
        this.date = this.fullDate.getDate();
        this.day = this.fullDate.getDay();
        this.months = months;
        this.days = days;
    };

    // _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // _days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    get Month() {
        return this.months[this.month];
    };

    get Day() {
        return this.days[this.day];
    };

    getCurDate() {
        
        const curDate = `${this.Month}, ${this.date} ${this.year}, ${this.Day}`;

        return curDate;
    };

    getLastDayOfYear() {
        return `${this.year}-12-31`
    };

    getFirstDayOfMonth() {
        return `${this.year}-${this.month + 1}-01`
    };

    getLastDayOfMonth(year, month ) {
        const curYear = year || this.year;
        const curMonth = month || this.month + 1;
        const lastDay = new Date(curYear, curMonth, 0);

        return `${lastDay.getFullYear()}-${lastDay.getMonth() + 1}-${lastDay.getDate()}`
    }

    getDateDiff(dateFrom, dateTo) {
        return Math.ceil(Math.abs(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 3600 * 24) + 1);
    }
};