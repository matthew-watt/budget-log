import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, observable } from 'rxjs';

export class BudgetDate {

    //moment: Moment;
    id: number;
    spent: number;
    earned: number;
    saved: number;
    todayFormat: string = 'MMMM Do';
    onServer: boolean = false; // apply on server
    // server
    date: string;
    dateFormatted: string;

    private _moment: Moment;
    set moment(m: Moment) {
        //console.log('moment = ', m.toString());
        //console.log('moment ISO = ', m.toISOString());
        //console.log('-------------');
        this._moment = m.clone();
        this._moment.startOf('d');
        let utcOffset = moment().utcOffset();
        //this.date = m.add(utcOffset, 'minutes').toISOString();
        this.date = m.format('YYYY-MM-DDT00:00:00');
        this.dateFormatted = m.format(this.todayFormat);
        //console.log('date = ' + this.date + ', moment = ' + this.moment.toISOString());
    }

    get moment(): Moment {
        return this._moment;
    }

    public constructor(init?:Partial<BudgetDate>) {
        Object.assign(this, init);
        //this.date = moment().format(this.format);
        let self = this;
        //this.date = moment().toString();
        //setInterval(() => self.date = moment().format('MMMM Do YYYY'), 1000 * 30);
    }

    isToday(): boolean {
        if (this.moment.isSame(new Date(), 'day')) {
            return true;
        }
    }

    momentNowObs(): Observable<Moment> {
        let obs = new Observable<Moment>(
            observer => {
                setInterval(() => observer.next(moment()), 1000)
            }
        );
        return obs;
    }

    setUTCDate(moment: Moment) {
        this.date = moment.toISOString();
    }

}