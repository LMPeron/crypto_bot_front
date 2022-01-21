import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
// UTILIZADO PARA PASSAR FORA DO HTTP_INTERCEPTOR
@Injectable()
export class HttpBackendClient extends HttpClient {
  constructor(handler: HttpBackend) {
    super(handler);
  }
}
