import { Injectable } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  editingBudgetDate: BudgetDate;

  constructor() { }

  editBudgetDate(budgetDate: BudgetDate): Observable<BudgetDate> {
    const editSubscription = function(observer: Observer<BudgetDate>) {
      observer.next(budgetDate);
      observer.complete;
    }
    const update = new Observable(editSubscription);
    return update;
  }

}
