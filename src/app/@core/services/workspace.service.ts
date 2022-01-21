import { catchError, share, shareReplay } from 'rxjs/operators';
import { Observable, of, ReplaySubject } from 'rxjs';
import { IWorkspace } from './../data/workspace';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/workspace',
  dashboard: environment.mainUrl + '/api/v1/workspace',
};
@Injectable({
  providedIn: 'root',
})
export class WorkSpaceService extends AbstractRestService<IWorkspace> {
  public apiUrl = CONFIG.apiUrlv1;
  currentWorkspace: IWorkspace;
  workspaceList$: Observable<IWorkspace[]>;
  private workspaceChanges$ = new ReplaySubject(1);

  constructor(http: HttpClient)
  {
    super(http, CONFIG.apiUrlv1);

    this.workspaceList$ = this.http.get<IWorkspace[]>(CONFIG.apiUrlv1 + '/byUser')
      .pipe(
        catchError(() => of([])),
        shareReplay(1),
      );
  }

  getByUser(): Observable<IWorkspace[]>
  {
    return this.http.get<IWorkspace[]>(CONFIG.apiUrlv1 + '/byUser').pipe(
      catchError(this.handleError)
    );
  }


  changeWorkspace(workspaceId: IWorkspace)
  {
    this.workspaceChanges$.next({ workspaceId, previous: this.currentWorkspace });
    this.currentWorkspace = workspaceId;
    localStorage.setItem('workspace', JSON.stringify(workspaceId));
    return this.currentWorkspace
  }
  onWorkspaceChange(): Observable<any>
  {
    return this.workspaceChanges$.pipe(share());
  }

  private getCurrentWorkspaceStorage()
  {
    return JSON.parse(localStorage.getItem('workspace')) as IWorkspace;
  }


  getCurrentWorkspace(): IWorkspace
  {
    return this.getCurrentWorkspaceStorage();
  }

}

