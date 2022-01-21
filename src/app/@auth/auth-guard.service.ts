import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public version: string = environment.appVersion;
  constructor(
    private authService: NbAuthService,
    private router: Router // private authExtendedService: NbAuthExtendedService
  ) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        // Sentry.configureScope((scope) => {
        //   scope.setTag('version', this.version);
        //   scope.setUser({
        //     id: this.authExtendedService.currentUserValue.id,
        //     username: this.authExtendedService.currentUserValue.username,
        //   });
        // });

        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      })
    );
  }
}
