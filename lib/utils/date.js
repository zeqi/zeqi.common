'use strict';

class DateUtil {
    constructor(time) {
        this.time = time;
    }

    set time(time) {
        this._time = time || new Date();
    }

    get time() {
        return this._time;
    }

    TYPE() {
        return {
            day: 'day',
            hour: 'hour'
        }
    }

    static addDays(time, days) {
        time = time || new Date();
        newTime = new Date(time);
        days = days || 0;
        newTime.setDate(newTime.getDate() + days);
        return newTime;
    }

    static timeSubtract(startTime, endTime) {
        return (new Date(startTime)).getTime() - (new Date(endTime)).getTime();
    }

    addDays(days) {
        return DateUtil.addDays(this.time, days);
    }

    static addHour(time, hours) {
        time = time || new Date();
        newTime = new Date(time);

    }

    addHour(hours) {

    }
}

module.exports = DateUtil;