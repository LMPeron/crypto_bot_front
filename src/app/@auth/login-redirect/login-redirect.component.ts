import { Component, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { User } from 'src/app/@core/data/users';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthExtendedService } from '../nb-auth-extended.service';

@Component({
  selector: 'ngx-login-redirect',
  templateUrl: './login-redirect.component.html',
})
export class NgxLoginRedirectComponent extends NbLoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router,
    private extendedService: NbAuthExtendedService
  ) {
    super(service, options, cd, router);
  }

  redirectDelay = 0;
  showMessages: any = {};
  strategy = 'hash';

  errors: string[] = [];
  messages: string[] = [];
  user: User;
  submited = false;
  data: any = {};

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.login(params.get('hash'));
    });
  }

  login(data?): void {
    this.errors = [];
    this.messages = [];
    this.submited = true;

    this.data = {
      hash: data,
    };

    const idDecoded = atob(this.data.hash).slice(0, -2);

    this.extendedService
      .authenticate(this.strategy, idDecoded)

      .subscribe((result: User) => {
        this.submited = false;
        if (result) {
          localStorage.setItem('token', window.btoa(this.data.hash));
          const user = result;

          localStorage.setItem('currentUser', JSON.stringify(user));

          const raw = JSON.stringify({
            name: 'nb:auth:simple:token',
            ownerStrategyName: 'hash',
            value: result.id,
          });

          localStorage.setItem('auth_app_token', raw);
        } else {
          this.errors = ['Houve algum erro, tente Novamente'];
        }

        this.router.navigateByUrl('/');

        this.cd.detectChanges();
      });
  }
}
