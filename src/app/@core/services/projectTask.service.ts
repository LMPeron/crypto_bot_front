import { IProjectTask, IProjectTaskDTO } from './../data/projectTask';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { IComment } from '../data/comment';
import { ITimesheet } from '../data/timesheet';
import { IFilter } from '../data/filter';
import { IRules } from '../data/rules';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/projectTask',
  apiUrlv1Timesheet: environment.mainUrl + 'v1/timesheet',
};
@Injectable({
  providedIn: 'root',
})
export class ProjectTaskService extends AbstractRestService<IProjectTask> {
  constructor(http: HttpClient)
  {
    super(http, CONFIG.apiUrlv1);
  }

  addProjectTask(project: IProjectTaskDTO): Observable<IProjectTask>
  {
    return this.http.post<IProjectTask>(CONFIG.apiUrlv1 + '/create', project).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  getTasksByProject(id): Observable<IProjectTask[]>
  {
    return this.http.get<IProjectTask[]>(CONFIG.apiUrlv1 + `/byProject/${id}`).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  assume(id: string, rev: string): Observable<IProjectTask>
  {
    const url = `${CONFIG.apiUrlv1}/${id}/assume`;
    const body = {
      rev,
    };

    return this.http.put<IProjectTask>(url, body).pipe(
      take(1),
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  close(id: string, rev: string): Observable<IProjectTask>
  {
    const body = {
      rev,
    };
    const url = `${CONFIG.apiUrlv1}/${id}/close`;

    return this.http.put<IProjectTask>(url, body).pipe(
      take(1),
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  execute(id: string, rev: string): Observable<IProjectTask | IRules>
  {
    const url = `${CONFIG.apiUrlv1}/${id}/execute`;
    const body = {
      rev,
    };
    return this.http.put<IProjectTask | IRules>(url, body).pipe(
      take(1),
      catchError(this.handleError)
    );
  }
  pause(id: string, task: Partial<IProjectTask>, rev: string): Observable<IProjectTask>
  {
    const url = `${CONFIG.apiUrlv1}/${id}/pause`;
    const body = {
      rev,
    };
    return this.http.put<IProjectTask>(url, body).pipe(
      take(1),
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  cancel(id: string, rev: string): Observable<IProjectTask>
  {
    const url = `${CONFIG.apiUrlv1}/${id}/cancel`;
    const body = {
      rev,
    };
    return this.http.put<IProjectTask>(url, body).pipe(
      take(1),
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  addComment(taskId, comment): Observable<IComment>
  {
    return this.http.post<IComment>(CONFIG.apiUrlv1 + `/${taskId}/comment`, comment, this.httpOptions).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  getTaskTimesheet(projectTaskId: string): Observable<ITimesheet[]>
  {
    return this.http.get<ITimesheet[]>(CONFIG.apiUrlv1Timesheet + `/${projectTaskId}/listTimeSheetProjectTask`).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getAllProjectTasksWithFilter(filter: Partial<IFilter>): Observable<IProjectTask[]>
  {
    const paramsFilter = {
      status: filter.status ?? '',
      description: filter.description ?? '',
      company: filter.companyId ?? '',
      // number: filter.number ?? '',
      startDate: filter.startDate ?? '',
      endDate: filter.endDate ?? '',
      dateField: filter.dateField ?? '',
    };
    const params = new HttpParams({ fromObject: paramsFilter })

    return this.http
      .get<IProjectTask[]>(CONFIG.apiUrlv1 + '/filter/projectTask', { params })
      .pipe(catchError(this.handleError));
  }
}
