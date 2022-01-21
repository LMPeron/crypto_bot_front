import { IPriority } from './../data/priority';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/priority',
  dashboard: environment.mainUrl + '/api/v1/priority',
};
@Injectable({
  providedIn: 'root',
})
export class PriorityService extends AbstractRestService<IPriority> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

}
