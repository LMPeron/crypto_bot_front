import { Injectable, ErrorHandler } from '@angular/core';

import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    Sentry.init({
      dsn: 'http://c96b70745c2441b09437ecb40732741c@129.0.0.221:9000/2',
      integrations: [
        new Integrations.BrowserTracing({
          tracingOrigins: ['localhost', 'https://yourserver.io/api'],
          routingInstrumentation: Sentry.routingInstrumentation,
        }),
      ],

      tracesSampleRate: 0.2,
    });
  }

  handleError(error) {
    Sentry.captureException(error?.originalError || error);
  }
}
export function getErrorHandler() {
  return new SentryErrorHandler();
}
