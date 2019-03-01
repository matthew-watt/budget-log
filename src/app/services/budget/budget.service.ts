import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BudgetDate } from 'src/app/models/budget-date';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Moment } from 'moment';
import { Budget } from 'src/app/models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  apiRoot = 'http://localhost:55253';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBudgetDays(startDate: string, finishDate: string): Observable<BudgetDate[]> {
    const params = new HttpParams();
    params.set('start_date', startDate);
    params.set('finish_date', finishDate);

    return this.http.get<Budget>(this.apiRoot + '/api/budgetdays', { params: params })
      .pipe(
        map(budget => budget.budgetDays),
        tap(budgetDays => console.log('fetched budget dates tap', budgetDays )),
        //catchError((error: any) => console.log(error))
        //catchError(this.handleError('getBudgetDates', []));
        //throw 
      );
  }

  // server expects date property, use BudgetDate.UTCDate get() set()
  postBudgetDay(budgetDay: BudgetDate) {
    return this.http.post<BudgetDate>(this.apiRoot + '/api/budgetdays', budgetDay, this.httpOptions)
      .pipe(
        catchError(this.handleError('postBudgetDay', []))
      );
  }

  putBudgetDay(budgetDate: BudgetDate) {
    return this.http.put<BudgetDate>(this.apiRoot + '/api/budgetdays', budgetDate, this.httpOptions)
      .pipe(
        catchError(this.handleError('putBudgetDay', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log('error caught in budget service');
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
