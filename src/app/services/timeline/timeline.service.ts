import { Injectable } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private editingBudgetDate: BudgetDate;
  private editBudgetDateSubject = new Subject<BudgetDate>();

  constructor() { }

  editBudgetDate(budgetDate: BudgetDate): void {
    console.log('edit = ' + budgetDate);
    this.editingBudgetDate = budgetDate;
    this.editBudgetDateSubject.next(this.editingBudgetDate);
  }

  getEditBudgetDate() {
    return this.editingBudgetDate;
  }

  onBudgetDateEdit(): Observable<BudgetDate> {
    return this.editBudgetDateSubject.asObservable();
  }

}
