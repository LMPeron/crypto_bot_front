import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// ADICONAR ERRO
export abstract class AbstractRestService<T> {
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(protected http: HttpClient, protected actionUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.actionUrl).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getOne(id: string): Observable<T> {
    return this.http.get(`${this.actionUrl}/${id}`) as Observable<T>;
  }

  save(object: T): Observable<T> {
    return this.http.post<T>(`${this.actionUrl}`, object).pipe(
      // tap(data => console.log(data)),
      take(1),
      catchError(this.handleError)
    );
  }
  create(object: T): Observable<T> {
    return this.http.post<T>(`${this.actionUrl}/create`, object).pipe(
      // tap(data => console.log(data)),
      take(1),
      catchError(this.handleError)
    );
  }
  edit(object: T): Observable<T[]> {
    return this.http.put<T[]>(this.actionUrl, object).pipe(
      // tap(data => console.log(data)),
      take(1),
      catchError(this.handleError)
    );
  }
  editWithId(id: string, object: T): Observable<T[]> {
    return this.http.put<T[]>(`${this.actionUrl}/${id}`, object).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  delete(id: string): Observable<T[]> {
    return this.http.delete<T[]>(`${this.actionUrl}/${id}`).pipe(
      // tap(data => console.log(data)),
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
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error.error);
  }
}
