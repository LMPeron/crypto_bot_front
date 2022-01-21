import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONFIG = {
  apiUrlv1: environment.mainFlask + 'analytics',
};
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService extends AbstractRestService<any> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

  getInvestment(): Observable<any> {
    return this.http.get<any>(CONFIG.apiUrlv1 + '/investment/monthly',).pipe(
      catchError(this.handleError)
    );
  }

  getProfit(): Observable<any> {
    return this.http.get<any>(CONFIG.apiUrlv1 + '/profit/monthly',).pipe(
      catchError(this.handleError)
    );
  }

  getTrades(): Observable<any> {
    return this.http.get<any>(`${CONFIG.apiUrlv1}/trades/monthly`).pipe(
      catchError(this.handleError)
    );
  }
}
