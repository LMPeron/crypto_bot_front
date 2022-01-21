import { IExpenseType } from './../data/expenseType';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IExpense, ExpenseDTO } from './../data/expense';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';

const CONFIG = {
      apiUrlv1: environment.mainUrl + 'v1/expense',
      dashboard: environment.mainUrl + '/api/v1/expense',
};
@Injectable({
      providedIn: 'root',
})
export class ExpenseService extends AbstractRestService<IExpense> {
      public apiUrl = CONFIG.apiUrlv1;
      constructor(http: HttpClient) {
            super(http, CONFIG.apiUrlv1);
      }

      addExpense(expense: ExpenseDTO): Observable<IExpense> {
            return this.http.post<IExpense>(CONFIG.apiUrlv1 + '/create', expense).pipe(
                  catchError(this.handleError)
            );
      }

      inactivateExpense(expenseId: string): Observable<IExpense> {
            return this.http.post<IExpense>(CONFIG.apiUrlv1 + '/inactivate', expenseId).pipe(
                  catchError(this.handleError)
            );
      }

      getAllExpenseByProject(projectId: string): Observable<IExpense[]> {
            return this.http.get<IExpense[]>(CONFIG.apiUrlv1 + '/byProject/' + projectId).pipe(
                  catchError(this.handleError)
            );
      }

      getAllExpenseType(): Observable<IExpenseType[]> {
            return this.http.get<IExpenseType[]>(CONFIG.apiUrlv1 + '/types').pipe(
                  catchError(this.handleError)
            );
      }

}
