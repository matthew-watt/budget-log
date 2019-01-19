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

    expenses: number;
    income: number;
    saved: number;
    moment: Moment;
    format: string = 'MMMM Do YYYY';
    onServer: boolean = true; // apply on server

    public constructor(init?:Partial<BudgetDate>) {
        Object.assign(this, init);
        //this.date = moment().format(this.format);
        let self = this;
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