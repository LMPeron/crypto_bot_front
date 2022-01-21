import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1',
};
@Injectable({
  providedIn: 'root',
})
export class AttachmentFileService {
  httpOptions = {
    // headers: new HttpHeaders({ 'X-Mx-ReqToken': environment.id }),
  };
  constructor(protected http: HttpClient) {}

  uploadFile(referenceType, referenceId, file, fileData): Observable<any> {
    const attachmentUrl = CONFIG.apiUrlv1 + '/attachment/' + referenceType + '/' + referenceId;
    console.log(file);
    const fileType = file.type.length > 3 ? file.type : 'application/octet-stream';
    console.log(fileType);
    return this.http
      .post<any>(attachmentUrl + '?type=' + fileType + '&name=' + file.name, btoa(fileData), {
        ...this.httpOptions,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', msg: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        }),
        // tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  deleteFile(attachmentId, referenceType, referenceId): Observable<any> {
    const attachmentUrl = `${CONFIG.apiUrlv1}/attachment/${attachmentId}/${referenceType}/${referenceId}`;

    return this.http.delete(attachmentUrl, this.httpOptions).pipe(catchError(this.handleError));
  }

  getLink(attachmentId) {
    return CONFIG.apiUrlv1 + '/attachment/' + attachmentId;
  }
  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
