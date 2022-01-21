import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NbAuthService } from '@nebular/auth';
import { NbAuthJWTToken } from '@nebular/auth';
import { NB_AUTH_INTERCEPTOR_HEADER } from '@nebular/auth';

import { User } from '../@core/data/users';
import { IWorkspace } from '../@core/data/workspace';
@Injectable()
export class SimpleInterceptor implements HttpInterceptor
{
  constructor(
    private injector: Injector,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER)
    protected headerName: string = 'X-Mx-Token'
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthJWTToken) =>
      {
        if (token && token.getValue())
        {

          const user: User = JSON.parse(localStorage.getItem('currentUser'));
          const workspace: IWorkspace = JSON.parse(localStorage.getItem('workspace'));

          if (user && user.id)
          {
            req = req.clone({
              setHeaders: {
                ['X-Mx-ReqToken']: user.id.toString(),
              },
            });
          }
          if (workspace)
          {
            req = req.clone({
              setHeaders: {
                ['workspace']: workspace.id,
              },
            });
          }

          if (!req.headers.has('Content-Type'))
          {
            req = req.clone({
              setHeaders: {
                ['Content-Type']: 'application/json',
              },
            });
          }
          if (!req.headers.has('Accept'))
          {
            req = req.clone({
              setHeaders: {
                ['Accept']: 'application/json',
              },
            });
          }
        }
        return next.handle(req);
      })
    );
  }

  protected get authService(): NbAuthService
  {
    return this.injector.get(NbAuthService);
  }
}
