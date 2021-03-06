import { Injectable } from '@angular/core';
declare let ga: (arg0?: string, arg1?: string, arg2?: {}) => void;
@Injectable()
export class GoogleAnalyticsEventsService {
  public emitEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    ga('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }
}
