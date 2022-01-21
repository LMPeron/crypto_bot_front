import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { IComment } from '../data/comment';
import { IFilter } from '../data/filter';

const CONFIG = {
  apiUrlv4: environment.mainUrl + 'v4/ticket',
  apiUrlv3: environment.mainUrl + 'v3/ticket',
  dashboard: environment.mainUrl + '/api/v1/ticket',
};
@Injectable({
  providedIn: 'root',
})
export class TicketService extends AbstractRestService<ITicket> {
  constructor(http: HttpClient)
  {
    super(http, CONFIG.apiUrlv4);
  }

  getAllTickets(): Observable<ITicket[]>
  {
    return this.http.get<ITicket[]>(CONFIG.apiUrlv4 + '/allTicketList').pipe(catchError(this.handleError));
  }
  getAllTicketsWithFilter(filtro: Partial<IFilter>): Observable<ITicket[]>
  {
    const paramsFilter = {
      status: filtro.status,
      description: filtro.description ?? '',
      number: filtro.number ?? '',
      companyId: filtro.companyId ?? '',
      group: filtro.companyId ? 'ALL' : filtro.group ?? '',
      startDate: filtro.startDate ?? '',
      endDate: filtro.endDate ?? '',
      dateField: filtro.dateField ?? '',
    };
    const params = new HttpParams({ fromObject: paramsFilter });

    return this.http
      .get<ITicket[]>(CONFIG.apiUrlv4 + '/allTicketList', { params })
      .pipe(catchError(this.handleError));
  }

  getNoUrgent(): Observable<ITicket[]>
  {
    return this.http.get<ITicket[]>(CONFIG.apiUrlv4 + '/noUrgentList').pipe(catchError(this.handleError));
  }
  getCreateFields(): Observable<{ fields: [] }>
  {
    return this.http.get<{ fields: [] }>(CONFIG.apiUrlv4 + '/createFields').pipe(catchError(this.handleError));
  }

  getUrgent(): Observable<ITicket[]>
  {
    return this.http.get<ITicket[]>(CONFIG.apiUrlv4 + '/urgentList').pipe(catchError(this.handleError));
  }

  addTicket(ticket: ITicket): Observable<ITicket>
  {
    return this.http.post<ITicket>(CONFIG.apiUrlv4, ticket).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  getTicket(id): Observable<ITicket>
  {
    return this.http.get<ITicket>(CONFIG.apiUrlv4 + `/${id}`).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  getTaskByTicket(id): Observable<ITicket>
  {
    return this.http.get<ITicket>(CONFIG.apiUrlv3 + `/${id}`).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  getEventkByTicket(id): Observable<ITicket>
  {
    return this.http.get<ITicket>(CONFIG.apiUrlv3 + `/${id}`).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  getHistory(): Observable<any>
  {
    return this.http.get<any>(CONFIG.dashboard + `/history`).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  countTicket(): Observable<any>
  {
    return this.http.get<any>(CONFIG.dashboard + `/countTicket`).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  addComment(ticketId, comment: {}): Observable<IComment>
  {
    return this.http.post<IComment>(CONFIG.apiUrlv4 + `/${ticketId}/comment`, comment, this.httpOptions).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  classifyTicket(id: string, ticket: Partial<ITicket>, rev: string): Observable<ITicket>
  {
    const url = `${CONFIG.apiUrlv4}/${id}/classify`;
    const body = {
      rev,
      ...ticket,
    };
    return this.http.put<ITicket>(url, body).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  reclassifyTicket(id: string, ticket: Partial<ITicket>, rev: string): Observable<ITicket>
  {
    const url = `${CONFIG.apiUrlv4}/${id}/reclassify`;
    const body = {
      rev,
      ...ticket,
    };
    return this.http.put<ITicket>(url, body).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  cancelTicket(id: string, justification: string): Observable<ITicket>
  {
    const url = `${CONFIG.apiUrlv4}/${id}/cancel`;
    const body = {
      justification,
    };
    return this.http.put<ITicket>(url, body).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  closeTicket(id: string, resolution: string, ticketJustificationId: string, rev: string): Observable<ITicket>
  {
    const url = `${CONFIG.apiUrlv4}/${id}/close`;
    const body = {
      resolution,
      ticketJustificationId,
      rev,
    };
    return this.http.put<ITicket>(url, body).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  newDisplacement(ticket: Partial<ITicket>): Observable<ITicket>
  {
    return this.http
      .put<ITicket>(CONFIG.apiUrlv3 + `/${ticket.id}`, { ...ticket })
      .pipe(
        // tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }
}
