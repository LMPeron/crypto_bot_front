import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { NbAuthExtendedService } from './nb-auth-extended.service';
@Injectable({
  providedIn: 'root',
})
export class PermGuard implements CanActivate {
  constructor(
    private authService: NbAuthService,
    private router: Router,
    private authExtendedService: NbAuthExtendedService
  ) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        if (authenticated && !this.authExtendedService.currentUserValue.perms.includes('P_16')) {
          this.router.navigate(['projetos/dashboard']);
        }
      })
    );
  }
}
