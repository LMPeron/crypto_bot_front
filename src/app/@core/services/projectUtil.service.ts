import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICompany } from '../data/company';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { IUserMini } from '../data/users';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/company',
  apiUrlCompany: environment.mainUrl + 'v1/company',
  apiUrlUser: environment.mainUrl + 'v1/user',
  dashboard: environment.mainUrl + '/api/v1/company',
};
@Injectable({
  providedIn: 'root',
})
export class ProjectUtilService extends AbstractRestService<any> {
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);

  }

  getParentActive(): Observable<ICompany[]> {
    return this.http
      .get<ICompany[]>(`${CONFIG.apiUrlCompany}`)
      .pipe(catchError(this.handleError));
  }

  getUsersByCompany(companyId: string): Observable<IUserMini[]> {
    return this.http
      .get<IUserMini[]>(`${CONFIG.apiUrlUser}/name/byCompany/${companyId}`)
      .pipe(catchError(this.handleError));
  }
}
