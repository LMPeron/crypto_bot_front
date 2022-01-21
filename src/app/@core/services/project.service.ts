import { IFilter } from './../data/filter';
import { IProject } from './../data/project';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ProjectDTO } from '../data/projectDTO';
import { IComment } from '../data/comment';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/project',
  apiUrlv1Timesheet: environment.mainUrl + 'v1/timesheet',
  dashboard: environment.mainUrl + '/api/v1/project',
  apiUrlv1Priority: environment.mainUrl + '/api/v1/priority',
};
@Injectable({
  providedIn: 'root',
})
export class ProjectService extends AbstractRestService<IProject> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

  addProject(project: ProjectDTO): Observable<IProject> {
    return this.http.post<IProject>(CONFIG.apiUrlv1, project).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  getByWorkspace(workspaceId: string): Observable<IProject[]> {
    const paramsFilter = {
      workspaceId: workspaceId
    };

    const params = new HttpParams({ fromObject: paramsFilter });

    return this.http.get<IProject[]>(CONFIG.apiUrlv1 + '/byWorkspace', { params }).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(project: ProjectDTO): Observable<IProject> {
    return this.http.put<IProject>(CONFIG.apiUrlv1, project).pipe(
      catchError(this.handleError)
    );
  }

  getAllProjectsList(): Observable<IProject[]> {
    return this.http.get<IProject[]>(CONFIG.apiUrlv1 + '/allProjectsList').pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  close(id: string, rev: string): Observable<IProject> {
    const body = {
      rev,
    };
    const url = `${CONFIG.apiUrlv1}/${id}/close`;

    return this.http.put<IProject>(url, body).pipe(
      take(1),
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  reopen(id: string, rev: string): Observable<IProject> {
    const body = {
      rev,
    };
    const url = `${CONFIG.apiUrlv1}/${id}/reopen`;

    return this.http.put<IProject>(url, body).pipe(
      take(1),
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  addComment(projectId, comment): Observable<IComment> {
    return this.http.post<IComment>(CONFIG.apiUrlv1 + `/${projectId}/comment`, comment, this.httpOptions).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  getProjectTotalTimesheet(projectId: string): Observable<number> {
    return this.http.get<number>(CONFIG.apiUrlv1Timesheet + `/${projectId}/totalHoursByProject`).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getAllProjectsWithFilter(filter: Partial<IFilter>): Observable<IProject[]> {
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
        .get<IProject[]>(CONFIG.apiUrlv1 + '/filter/project', { params })
        .pipe(catchError(this.handleError));
  }

}
