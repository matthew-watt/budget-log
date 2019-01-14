import { Moment } from 'moment';

export class BudgetDate {
    date: string;
    expenses: number;
    income: number;
    saved: number;
    moment: Moment;

    public constructor(init?:Partial<BudgetDate>) {
        Object.assign(this, init);
    }

    isToday(): boolean {
        //console.log(this);
        if (this.moment.isSame(new Date(), 'day')) {    
            return true;
        }    
    }

    // todo: refactor
    setDate(moment: Moment): void {
        this.date = moment.format('YYYY-MM-DD').toString();
        this.moment = moment;
    }

}