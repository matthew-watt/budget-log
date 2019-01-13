import { Moment } from 'moment';

export class BudgetDate {
    date: Moment;
    expenses: number;
    income: number;
    saved: number;

    public constructor(init?:Partial<BudgetDate>) {
        Object.assign(this, init);
    }

    isToday(): boolean {
        if (this.date.isSame(new Date(), 'day')) {
            return true;
        }
    }

}