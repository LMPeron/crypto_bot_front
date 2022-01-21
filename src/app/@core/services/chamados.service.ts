import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  baseUrl = environment.mainUrl + 'api/v1/ticket/';

  constructor(private http: HttpClient) {}

  getOpenTicketCount(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'getOpenTicketCount').pipe(
      // tap((data) => console.log(data)),
      catchError((err) => {
        // this.toastrService.show(status, `Ops, houve algum erro!`, {
        //   preventDuplicates: true,
        //   status: 'danger',
        //   duration: 5000,
        //   icon: 'alert-circle-outline',
        // });
        console.warn('A API DASHBOARD está com algum problema!');
        return throwError(err);
      })
    );
  }
  getUrgentTicketCount(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'getOpenTicketCount/urgent').pipe(
      // tap((data) => console.log(data)),
      catchError((err) => {
        // this.toastrService.show(status, `Ops, houve algum erro!`, {
        //   preventDuplicates: true,
        //   status: 'danger',
        //   duration: 5000,
        //   icon: 'alert-circle-outline',
        // });
        console.warn('A API DASHBOARD está com algum problema!');

        return throwError(err);
      })
    );
  }

  getHoursConsumed(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'hoursConsumed/currentMonth').pipe(
      // tap((data) => console.log(data),
      catchError((err) => {
        // this.toastrService.show(status, `Ops, houve algum erro!`, {
        //   preventDuplicates: true,
        //   status: 'danger',
        //   duration: 5000,
        //   icon: 'alert-circle-outline',
        // });
        console.warn('A API DASHBOARD está com algum problema!');
        return throwError(err);
      })
    );
  }
}
