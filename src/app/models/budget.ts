import { BudgetDate } from 'src/app/models/budget-date';

export class Budget {
    budgetDays: BudgetDate[];
    averageDailySpending: Number;

    constructor(budgetDates: BudgetDate[]) {

    }
}