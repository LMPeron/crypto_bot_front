import { IProjectTask } from './../data/projectTask';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISprint, SprintDTO } from './../data/sprint';
import { AbstractRestService } from './abstractRest.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const CONFIG = {
      apiUrlv1: environment.mainUrl + 'v1/sprint',
      dashboard: environment.mainUrl + '/api/v1/sprint',
};
@Injectable({
      providedIn: 'root',
})
export class SprintService extends AbstractRestService<ISprint> {
      public apiUrl = CONFIG.apiUrlv1;
      constructor(http: HttpClient) {
            super(http, CONFIG.apiUrlv1);
      }

      getByProject(projectId: string): Observable<ISprint[]> {
            return this.http.get<ISprint[]>(CONFIG.apiUrlv1 + `/byProject/${projectId}`).pipe(
                  catchError(this.handleError)
            );
      }

      getAllTasksFiltered(): Observable<IProjectTask[]> {
            return this.http.get<IProjectTask[]>(CONFIG.apiUrlv1 + '/task/getAll').pipe(
                  catchError(this.handleError)
            );
      }

      addSprint(sprint: SprintDTO): Observable<ISprint> {
            return this.http.post<ISprint>(CONFIG.apiUrlv1 + '/create', sprint).pipe(
                  catchError(this.handleError)
            );
      }

      closeSprint(sprint: ISprint): Observable<ISprint> {
            return this.http.put<ISprint>(CONFIG.apiUrlv1 + `/close`, { sprint }).pipe(
                  catchError(this.handleError)
            );
      }
}
