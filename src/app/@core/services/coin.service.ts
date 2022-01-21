import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONFIG = {
  apiUrlv1: environment.mainFlask + 'coin',
};
@Injectable({
  providedIn: 'root',
})
export class CoinService extends AbstractRestService<any> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

  getAllCoin(): Observable<any> {
    return this.http.get<any>(CONFIG.apiUrlv1 + '/get-all-coins',).pipe(
      catchError(this.handleError)
    );
  }

  updateSetup(setup: any): Observable<any> {
    return this.http.post<any>(`${CONFIG.apiUrlv1}/update-setup`, setup).pipe(
      catchError(this.handleError)
    );
  }

  setCoinActive(coin: any): Observable<any> {
    return this.http.put<any>(`${CONFIG.apiUrlv1}/update-active`, coin).pipe(
      catchError(this.handleError)
    );
  }

  addSetup(coinId: number): Observable<any> {
    return this.http.post<any>(`${CONFIG.apiUrlv1}/create-setup/${coinId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  deleteSetup(setupId: number): Observable<any> {
    return this.http.post<any>(`${CONFIG.apiUrlv1}/delete-setup/${setupId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  start(): Observable<any> {
    return this.http.post<any>(`${CONFIG.apiUrlv1}/start`, {}).pipe(
      catchError(this.handleError)
    );
  }

  stop(): Observable<any> {
    return this.http.post<any>(`${CONFIG.apiUrlv1}/stop`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getUSDTPrice(): Observable<any> {
    return this.http.get<any>(`${CONFIG.apiUrlv1}/usdt`).pipe(
      catchError(this.handleError)
    );
  }

  getBTCPrice(): Observable<any> {
    return this.http.get<any>(`${CONFIG.apiUrlv1}/btc`).pipe(
      catchError(this.handleError)
    );
  }


}
