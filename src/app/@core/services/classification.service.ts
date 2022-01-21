import { IClassification } from './../data/classification';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractRestService } from './abstractRest.service';

const CONFIG = {
  apiUrlv1: environment.mainUrl + 'v1/classification',
  dashboard: environment.mainUrl + '/api/v1/classification',
};
@Injectable({
  providedIn: 'root',
})
export class ClassificationService extends AbstractRestService<IClassification> {
  public apiUrl = CONFIG.apiUrlv1;
  constructor(http: HttpClient) {
    super(http, CONFIG.apiUrlv1);
  }

}
