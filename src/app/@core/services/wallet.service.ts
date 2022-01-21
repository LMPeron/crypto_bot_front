import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONFIG = {
      apiUrlv1: environment.mainFlask + 'wallet',
};
@Injectable({
      providedIn: 'root',
})
export class WalletService extends AbstractRestService<any> {
      public apiUrl = CONFIG.apiUrlv1;
      constructor(http: HttpClient) {
            super(http, CONFIG.apiUrlv1);
      }

      getWalletHistory(): Observable<any> {
            return this.http.get<any>(`${CONFIG.apiUrlv1}/history`).pipe(
                  catchError(this.handleError)
            );
      }
}
