import { IContact } from './../data/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/contact',
  dashboard: environment.mainUrl + '/api/v1/contact',
};
@Injectable({
  providedIn: 'root',
})
export class ContactService extends AbstractRestService<IContact> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

}
