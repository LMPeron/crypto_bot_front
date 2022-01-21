import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AbstractRestService } from './abstractRest.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IExternalTicket } from '../data/externalTicket';

const CONFIG = {
  apiAdmUrl: environment.admURL + 'v1/externalTicketConf',
};

@Injectable({
  providedIn: 'root',
})
export class ExternalTicketService extends AbstractRestService<IExternalTicket> {
  constructor(http: HttpClient) {
    super(http, CONFIG.apiAdmUrl);
  }

  getList(): Observable<IExternalTicket[]> {
    const url = `${CONFIG.apiAdmUrl}`;

    return this.http.get<IExternalTicket[]>(url).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
}
