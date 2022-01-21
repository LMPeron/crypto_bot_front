import { NgModule, Optional, SkipSelf, Injectable, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf, Observable } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { UserData } from './data/users';
import { UserService } from './services/user.service';
import { environment } from 'src/environments/environment';
import { HttpBackendClient } from './utils/HttpBackendClient';
import { NbAuthExtendedService } from '../@auth/nb-auth-extended.service';

// const NbOAuth2AuthStrategyOptions = {
//   name: 'email',
//   // baseEndpoint: 'http://10.0.0.105:8080/auth/realms/lb2/protocol/openid-connect/',

//   clientSecret: 'lb2_openid',
//   clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
//   clientId: 'lb2_openid',
//   baseEndpoint: 'http://10.0.0.105:8080/auth/realms/master/protocol/openid-connect/',

//   token: {
//     endpoint: 'token',
//     grantType: NbOAuth2GrantType.PASSWORD,
//     class: NbAuthOAuth2Token,
//     scope: 'email',
//   },
//   refresh: {
//     endpoint: 'token',
//     grantType: NbOAuth2GrantType.REFRESH_TOKEN,
//   },
// };

const simpleAuth = {
  name: 'email',
  token: {
    key: 'id',
  },

  baseEndpoint: environment.authUrl,
  login: {
    endpoint: 'v4/user/auth',
    defaultErrors: ['Usuário/Email incorreto, por favor tente novamente.'],
    defaultMessages: ['Você logou com sucesso.'],
  },

  requestPass: {
    endpoint: 'v4/user/resetPassword',
    method: 'post',
    defaultErrors: ['Algo deu errado, por favor tente novamente.'],
    defaultMessages: ['Email enviado com sucesso.'],
  },
  resetPass: {
    endpoint: 'v4/user/savePassword',
    method: 'post',
    defaultErrors: ['Token inválido ou expirado.'],
    defaultMessages: ['Senha alterada com sucesso.'],
  },
};

const DATA_SERVICES = [{ provide: UserData, useClass: UserService }];

@Injectable()
export class NbSimpleRoleProvider implements NbRoleProvider
{
  constructor(private authService: NbAuthExtendedService) { }

  getRole(): Observable<string>
  {
    return this.authService.currentUserValue.planId !== null ? observableOf('lb2Updrade') : observableOf('lb2Updrade');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    // NbOAuth2AuthStrategy
    strategies: [NbPasswordAuthStrategy.setup(simpleAuth)],
    forms: {
      login: {},
      register: {},
      loginRedirect: {},
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      lb2Updrade: {
        view: 'upgrade',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useValue: {
      getRole: () =>
        // here we simply return a list of roles for current user
        observableOf(['lb2Updrade', 'user', 'editor']),
    },
  },
];

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule
{
  constructor(@Optional() @SkipSelf() parentModule: CoreModule)
  {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule>
  {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS, HttpBackendClient],
    };
  }
}
