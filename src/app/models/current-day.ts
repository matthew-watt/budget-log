import { Moment } from 'moment';
import { BudgetDate } from './budget-date';

export class CurrentDay {
    budgetDate: BudgetDate;
    earned: number;
    spent: number;
    date: Moment;
    saved: number;

    public constructor(init?:Partial<CurrentDay>) {
        Object.assign(this, init);
    }
}