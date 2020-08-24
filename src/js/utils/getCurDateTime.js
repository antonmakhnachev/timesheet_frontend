export class GetCurDateTime {
    constructor() {
        this.fullDate = new Date();
        this.year = this.fullDate.getFullYear();
        this.month = this.fullDate.getMonth();
        this.date = this.fullDate.getDate();
        this.day = this.fullDate.getDay();
    };

    _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    _days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    get Month() {
        return this._months[this.month];
    };

    get Day() {
        return this._days[this.day];
    };

    getCurDate() {
        
        const curDate = `${this.Month}, ${this.date} ${this.year}, ${this.Day}`;

        return curDate;
    };
};