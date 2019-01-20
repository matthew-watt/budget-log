import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';
import { Moment } from 'moment';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetTestService {

  constructor() { }

  getBudgetDates(startDate: string, endDate: string): Observable<BudgetDate[]> {

    let dates = this.datesOfRange(moment(startDate), moment(endDate));
    console.log('dates:', dates);

    let budgetDates: BudgetDate[] = [
      new BudgetDate({ moment: moment().subtract(1, 'd').startOf('d'), income: 100, expenses: 50, onServer: true }),
      new BudgetDate({ moment: moment().subtract(2, 'd').startOf('d'), income: 101, expenses: 51, onServer: true }),
      new BudgetDate({ moment: moment().subtract(3, 'd').startOf('d'), income: 102, expenses: 52, onServer: true }),
      new BudgetDate({ moment: moment().subtract(4, 'd').startOf('d'), income: 103, expenses: 53, onServer: true })
    ];
    
    const mockResults = function(observer: Observer<BudgetDate[]>) {
      observer.next(budgetDates);
      observer.error('...');
      observer.complete;
    };
    const update = new Observable(mockResults).pipe(
      catchError((error: any) => Observable.throw(error))
    );
    return update;
  }

  datesOfRange(start: Moment, end: Moment) {
    let day = start;
    let dates: Moment[] = [];
    while (day.isSameOrBefore(end)) {
      let cloneDay = day.clone();
      cloneDay.startOf('d');
      dates.push(cloneDay);
      day.add(1, 'd');
    }
    return dates;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      Observable.throw(error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        Observable.throw(error);
    }
    // return an observable with a user-facing error message
    Observable.throw(error);
  };

}
