import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbAuthResult, NbRequestPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRequestPasswordComponent extends NbRequestPasswordComponent {
  redirectDelay: number;
  showMessages: any;
  strategy: string;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.requestPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = ['E-mail de redefinição de senha enviado.'];
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => this.router.navigateByUrl(redirect), 5000);
      }
      this.cd.detectChanges();
    });
  }
}
