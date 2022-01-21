import { IProjectTask } from './../data/projectTask';
import { IProject } from 'src/app/@core/data/project';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

const CONFIG = {
  apiUrl: environment.mainUrl + 'v1/search',
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
  ) {}

  searchProject(seachQuery: string): Observable<IProject[]> {
    const url = `${CONFIG.apiUrl}/project`;
    const paramsFilter = {
      q: seachQuery,
    };
    const params = new HttpParams({ fromObject: paramsFilter });

    return this.http
      .get<IProject[]>(url, { params })
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        // tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }
  searchTask(seachQuery: string): Observable<IProjectTask[]> {
    const url = `${CONFIG.apiUrl}/task`;
    const paramsFilter = {
      q: seachQuery,
    };
    const params = new HttpParams({ fromObject: paramsFilter });

    return this.http
      .get<IProjectTask[]>(url, { params })
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        // tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.msg;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error.error);
  }
}
