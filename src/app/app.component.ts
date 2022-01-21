import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { AnalyticsService } from './@core/utils/analytics.service';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { NbMenuService } from '@nebular/theme';
import { NbAuthExtendedService } from './@auth/nb-auth-extended.service';

declare let ga: (arg0?: string, arg1?: string, arg2?: string) => void;
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: NbAuthExtendedService,
    private menuService: NbMenuService,
    protected router: Router,
    private snackbar: MatSnackBar,
    private swUpdate: SwUpdate
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngAfterViewInit() {
    this.swUpdate.available.subscribe(() => {
      this.swUpdate.activateUpdate().then(() => {
        const snack = this.snackbar.open(
          'Nova versão disponível',
          'Atualizar a página'
        );
        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    });
  }

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe((event) => {
      this.onContecxtItemSelection(event.item.data);
    });

    // if (this.authService.currentUserValue?.perms === undefined) {
    //   this.logout();
    // }
  }
  onContecxtItemSelection(data) {
    if (data === 'logout') {
      this.logout();
    }
  }
  logout() {
    // remover usuário do local storage para fazer logout do usuário
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('auth_app_token');
    this.authService.logout('email');
    this.router.navigateByUrl('/auth/login');
  }
}
