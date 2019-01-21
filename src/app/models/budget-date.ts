import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

export class BudgetDate {
    
    private _date: string;
    get date(): string {
        return this._date;
    }
    set date(date: string) {
        this._date = date;
    }

    private _moment: Moment;
    set moment(m: Moment) {
        this._moment = m;
        this._date = this._moment.toString();
    }
    get moment(): Moment {
        return this._moment;
    }

    expenses: number;
    income: number;
    saved: number;
    format: string = 'MMMM Do YYYY';
    onServer: boolean = false; // apply on server

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

    // todo: refactor
    setDate(moment: Moment): void {
        this.date = moment.format('MMMM Do YYYY').toString();
        this.moment = moment;
    }

    momentNowObs(): Observable<Moment> {
        let obs = new Observable<Moment>(
            observer => {
                setInterval(() => observer.next(moment()), 1000)
            }
        );
        return obs;
    }

}