import { Component } from '@angular/core';
import {
  NbLoginComponent,
} from '@nebular/auth';
import { NbAuthResult } from '@nebular/auth';
import { User } from 'src/app/@core/data/users';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  redirectDelay = 0;
  showMessages: any = {};
  strategy = 'email';

  errors: string[] = [];
  messages: string[] = [];
  user: User;
  submited = false;
  // socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;
  data: any = {};

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submited = true;
    this.data = {
      username: this.user.login,
      password: window.btoa(this.user.senha),
    };

    this.service
      .authenticate(this.strategy, this.data)
      .subscribe((result: NbAuthResult) => {
        this.submited = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();

          const user = result.getResponse().body;

          localStorage.setItem('currentUser', JSON.stringify(user));
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
