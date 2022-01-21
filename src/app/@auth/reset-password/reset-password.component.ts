/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NbAuthResult, NbAuthService, NbResetPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResetPasswordComponent extends NbResetPasswordComponent {
  constructor(
    protected route: ActivatedRoute,
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    @Inject(NB_AUTH_OPTIONS) protected config = {}
  ) {
    super(service, config, cd, router);
  }
  redirectDelay: number;
  showMessages: any;
  strategy: string;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  token: string;

  setToken(): void {
    this.route.paramMap.subscribe((params) => {
      this.token = params.get('token');
    });
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.setToken();
    const userDTO: any = {};
    userDTO.token = this.token;
    userDTO.password = window.btoa(this.user.password);

    this.service.resetPassword(this.strategy, userDTO).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      console.log(result);
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => this.router.navigateByUrl(redirect), this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
