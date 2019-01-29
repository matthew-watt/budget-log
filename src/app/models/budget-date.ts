import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

export class BudgetDate {

    //moment: Moment;
    expenses: number;
    income: number;
    saved: number;
    format: string = 'MMMM Do YYYY';
    onServer: boolean = false; // apply on server
    // server
    date: string;

    private _moment: Moment;
    set moment(moment: Moment) {
        this._moment = moment;
        this.date = moment.toISOString();
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