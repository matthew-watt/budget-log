import { Injectable } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  editingBudgetDate: BudgetDate;
  editSubscriptionHandler = function(observer: Observer<BudgetDate>) {
    observer.next(this.editingBudgetDate);
    observer.complete;
  };

  constructor() { }

  // subscribe to this
  // 
  onBudgetDateEdit(): Observable<BudgetDate> {
    const update = new Observable(this.editSubscriptionHandler);
    return update;
  }

  editBudgetDate(budgetDate: BudgetDate) {
    this.editingBudgetDate = budgetDate;

    const update = function(observer: Observer<BudgetDate>) {
      observer.next(this.editBudgetDate)
      observer.complete;
    };

    //this.editSubscriptionHandler.;

    //this.editSubscriptionHandler();
  }

}
