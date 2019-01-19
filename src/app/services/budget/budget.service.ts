import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BudgetDate } from 'src/app/models/budget-date';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Moment } from 'moment';

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

    return this.http.get<BudgetDate[]>(this.apiRoot + '/api/budgetdays', { params: params })
      .pipe(
        //tap(budgetDate => console.log('fetched budget dates tap', budgetDate)),
        catchError(this.handleError('getBudgetDates', []))
      );
  }

  postBudgetDay(budgetDay: BudgetDate) {
    return this.http.post<BudgetDate>(this.apiRoot + '/api/budgetdays', budgetDay, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
