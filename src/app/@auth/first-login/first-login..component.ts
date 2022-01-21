/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbAuthResult, NbResetPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-first-login',
  styleUrls: ['./first-login.component.scss'],
  templateUrl: './first-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxFirstLoginComponent extends NbResetPasswordComponent {
  redirectDelay: number;
  showMessages: any;
  strategy: string;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
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
