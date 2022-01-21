import { Inject, Injectable } from '@angular/core';
import { Observable, of as observableOf, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { NB_AUTH_STRATEGIES } from '@nebular/auth';
import { NbAuthToken } from '@nebular/auth';
import { NbAuthResult } from '@nebular/auth';
import { NbAuthStrategy } from '@nebular/auth';

import { NbTokenService } from '@nebular/auth';

import { User } from '../@core/data/users';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const CONFIG = {
  apiUrlv3: environment.authUrl + 'v4/user',
};

@Injectable({
  providedIn: 'root',
})
export class NbAuthExtendedService
{
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    protected tokenService: NbTokenService,

    @Inject(NB_AUTH_STRATEGIES) protected strategies,
    private http: HttpClient
  )
  {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User
  {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    if (user)
    {
      user.picture =
        'data:image/png;base64,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';
    }

    return user;
  }

  checkPerm(PERM: string): boolean
  {
    return this.currentUserValue.perms.includes(PERM);
  }

  getToken(): Observable<NbAuthToken>
  {
    return this.tokenService.get();
  }

  isAuthenticated(): Observable<boolean>
  {
    return this.getToken().pipe(map((token: NbAuthToken) => token.isValid()));
  }

  isAuthenticatedOrRefresh(): Observable<boolean>
  {
    return this.getToken().pipe(
      switchMap((token) =>
      {
        if (token.getValue() && !token.isValid())
        {
          return this.refreshToken(token.getOwnerStrategyName(), token).pipe(
            switchMap((res) =>
            {
              if (res.isSuccess())
              {
                return this.isAuthenticated();
              } else
              {
                return observableOf(false);
              }
            })
          );
        } else
        {
          return observableOf(token.isValid());
        }
      })
    );
  }

  onTokenChange(): Observable<NbAuthToken>
  {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange(): Observable<boolean>
  {
    return this.onTokenChange().pipe(map((token: NbAuthToken) => token.isValid()));
  }

  authenticate(strategyName: string, data?: any): Observable<any>
  {
    if (strategyName === 'hash')
    {
      return this.getUserbyHash(data).pipe(
        tap((result) =>
        {
          this.processResultTokenRedirect(result);
        })
      );
    } else
    {
      return this.getStrategy(strategyName)
        .authenticate(data)
        .pipe(switchMap((result: NbAuthResult) => this.processResultToken(result)));
    }
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse)
  {
    let errorMessage = '';
    if (error?.error)
    {
      // Erro ocorreu no lado do client
      errorMessage = error.error?.msg;
    } else
    {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error?.status}, ` + `menssagem: ${error?.message}`;
    }

    return throwError(errorMessage);
  }
  /**
   * Registers with the selected strategy
   * Stores received token in the token storage
   *
   * Example:
   * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
   *
   */
  register(strategyName: string, data?: any): Observable<NbAuthResult>
  {
    return this.getStrategy(strategyName)
      .register(data)
      .pipe(switchMap((result: NbAuthResult) => this.processResultToken(result)));
  }

  /**
   * Sign outs with the selected strategy
   * Removes token from the token storage
   *
   * Example:
   * logout('email')
   *
   */
  logout(strategyName: string): Observable<NbAuthResult>
  {
    return this.getStrategy(strategyName)
      .logout()
      .pipe(
        switchMap((result: NbAuthResult) =>
        {
          if (result.isSuccess())
          {
            this.tokenService.clear().pipe(map(() => result));
          }
          return observableOf(result);
        })
      );
  }

  /**
   * Sends forgot password request to the selected strategy
   *
   * Example:
   * requestPassword('email', {email: 'email@example.com'})
   *
   */
  requestPassword(strategyName: string, data?: any): Observable<NbAuthResult>
  {
    return this.getStrategy(strategyName).requestPassword(data);
  }

  /**
   * Tries to reset password with the selected strategy
   *
   * Example:
   * resetPassword('email', {newPassword: 'test'})
   *
   */
  resetPassword(strategyName: string, data?: any): Observable<NbAuthResult>
  {
    return this.getStrategy(strategyName).resetPassword(data);
  }

  /**
   * Sends a refresh token request
   * Stores received token in the token storage
   *
   * Example:
   * refreshToken('email', {token: token})
   *
   */
  refreshToken(strategyName: string, data?: any): Observable<NbAuthResult>
  {
    return this.getStrategy(strategyName)
      .refreshToken(data)
      .pipe(switchMap((result: NbAuthResult) => this.processResultToken(result)));
  }

  /**
   * Get registered strategy by name
   *
   * Example:
   * getStrategy('email')
   *
   */
  protected getStrategy(strategyName: string): NbAuthStrategy
  {
    const found = this.strategies.find((strategy: NbAuthStrategy) => strategy.getName() === strategyName);

    if (!found)
    {
      throw new TypeError(`There is no Auth Strategy registered under '${strategyName}' name`);
    }

    return found;
  }

  private processResultToken(result: NbAuthResult)
  {
    if (result.isSuccess() && result.getToken())
    {
      return this.tokenService.set(result.getToken()).pipe(
        map((data) =>
        {
          const user = result.getResponse().body;
          // console.log(result);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject = new BehaviorSubject<User>(user);
          this.currentUser = this.currentUserSubject.asObservable();
          return result;
        })
      );
    }

    return observableOf(result);
  }

  private processResultTokenRedirect(result)
  {
    if (result)
    {
      const user = result;
      localStorage.setItem('currentUser', JSON.stringify(user));
      // this.currentUserSubject = new BehaviorSubject<User>(user);
      this.currentUser = this.currentUserSubject.asObservable();
    }

    return observableOf(result);
  }

  private getUserbyHash(id): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Mx-ReqToken': id }),
    };
    return this.http
      .get<any>(CONFIG.apiUrlv3 + `/${id}`, { ...httpOptions })
      .pipe(
        // tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }
}
