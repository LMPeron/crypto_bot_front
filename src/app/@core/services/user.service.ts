import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONFIG = {
  apiUrlv1: environment.mainFlask + 'user',
};
@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractRestService<any> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(CONFIG.apiUrlv1 + '/all',).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(CONFIG.apiUrlv1 + '/new', user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(CONFIG.apiUrlv1 + '/update', user).pipe(
      catchError(this.handleError)
    );
  }

  inactivateUser(userId: any): Observable<any> {
    return this.http.put<any>(CONFIG.apiUrlv1 + '/inactivate', userId).pipe(
      catchError(this.handleError)
    );
  }

}
