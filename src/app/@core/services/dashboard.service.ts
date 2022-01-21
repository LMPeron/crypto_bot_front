import { Injectable } from '@angular/core';
import { User } from '../data/users';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';

const CONFIG = {
  dashBoardUrl: environment.mainUrl + 'api/v1/',
};
@Injectable({
  providedIn: 'root',
})
export class DashboardService extends AbstractRestService<User> {
  baseUrl = environment.mainUrl;

  constructor(http: HttpClient) {
    super(http, CONFIG.dashBoardUrl);
  }

  getTechnicalAnalyst(): Observable<any> {
    return this.http.get<any>(CONFIG.dashBoardUrl + 'user/getTechnicalAnalyst').pipe(
      // tap((analyst) => console.log('Leu os analistas')),
      catchError(this.handleError)
    );
  }
  getCountSatisfactionSurvey(): Observable<any> {
    return this.http.get<any>(CONFIG.dashBoardUrl + 'user/countSatisfactionSurvey').pipe(
      // tap((analyst) => console.log('Leu os analistas')),
      catchError(this.handleError)
    );
  }
}
