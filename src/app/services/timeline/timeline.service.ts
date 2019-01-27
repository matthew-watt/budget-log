import { Injectable } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import { Observable, Observer, Subject } from 'rxjs';
import { nextContext } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private editingBudgetDate: BudgetDate;
  private editBudgetDateSubject = new Subject<BudgetDate>();

  constructor() { }

  editBudgetDate(budgetDate: BudgetDate): void {
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