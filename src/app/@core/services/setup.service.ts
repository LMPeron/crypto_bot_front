import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONFIG = {
  apiUrlv1: environment.mainFlask + 'setup',
};
@Injectable({
  providedIn: 'root',
})
export class SetupService extends AbstractRestService<any> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

  getSetupByCoinId(coinId: number): Observable<any> {
    return this.http.get<any>(CONFIG.apiUrlv1 + `/setup/get-by-coin/${coinId}`).pipe(
      catchError(this.handleError)
    );
  }

}
