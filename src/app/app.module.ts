  import { DashboardModule } from './pages/dashboard/dashboard.module';
  import { BrowserModule, Title } from '@angular/platform-browser';
  import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
  import { CoreModule } from './@core/core.module';

  // NEBULAR
  import {
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbDatepickerModule,
    NbWindowModule,
  } from '@nebular/theme';
  import { NbEvaIconsModule } from '@nebular/eva-icons';

  // LB2
  import { ThemeModule } from './@theme/theme.module';

  // IMPORTS
  import { NgxMaskModule, IConfig } from 'ngx-mask';
  import { LOCALE_ID } from '@angular/core';
  import { registerLocaleData, CurrencyPipe } from '@angular/common';
  import localePt from '@angular/common/locales/pt';
  import { NbSecurityModule } from '@nebular/security';

  import { NbAuthSimpleInterceptor } from '@nebular/auth';
  import { DndDirective } from './directives/dnd.directive';

  import { SimpleInterceptor } from './@auth/http-interceptor.service';
  // import { AuthGuard } from './@auth/auth-guard.service';
  import { PipesModule } from './pipes/pipes.module';
  import { MatTableModule } from '@angular/material/table';
  import { MatSortModule } from '@angular/material/sort';
  import { MatPaginatorIntl } from '@angular/material/paginator';
  import { getBrPaginatorIntl } from './@core/utils/br-paginator-intl';
  import { ServiceWorkerModule } from '@angular/service-worker';
  import { environment } from '../environments/environment';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  import { ErrorHandler } from '@angular/core';

  registerLocaleData(localePt, 'pt-BR');

  // TODO RETIRAR ISSO
  export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  @NgModule({
    declarations: [AppComponent, DndDirective],
    imports: [
      BrowserModule,
      DashboardModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      CoreModule.forRoot(),
      ThemeModule.forRoot(),

      NgxMaskModule.forRoot(options),

      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbDatepickerModule.forRoot(),
      NbDialogModule.forRoot(),
      NbWindowModule.forRoot(),
      NbToastrModule.forRoot(),
      NbSecurityModule.forRoot(),
      NbEvaIconsModule,
      PipesModule,
      MatSnackBarModule,
      MatTableModule,
      MatSortModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        registrationStrategy: 'registerImmediately',
      }),
    ],

    bootstrap: [AppComponent],
    providers: [
      {
        provide: ErrorHandler,
        // useClass: environment.production ? SentryErrorHandler : ErrorHandler,
        useClass: ErrorHandler,
      },
      { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      {provide: CurrencyPipe},
      // {
      //   provide: Sentry.TraceService,
      //   deps: [Router],
      // },
      // {
      //   provide: APP_INITIALIZER,
      //   useFactory: () => () => {},
      //   deps: [Sentry.TraceService],
      //   multi: true,
      // },
      { provide: LOCALE_ID, useValue: 'pt-BR' },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: NbAuthSimpleInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: SimpleInterceptor,
        multi: true,
      },
      Title,
      { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },

      // {
      //   provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      //   useValue(req: HttpRequest<any>) {
      //     return req.url === '/auth/realms/master/protocol/openid-connect/token';
      //   },
      // },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class AppModule {}
