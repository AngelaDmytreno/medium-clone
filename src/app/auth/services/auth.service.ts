import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {environment} from 'src/environments/environment'
import {LoginRequestInterface} from 'src/app/auth/types/loginRequest.interface'
import {AuthResponseInterface} from 'src/app/auth/types/authResponse.interface'


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
    }
  


  getUser(response: AuthResponseInterface): CurrentUserInterface{
     return response.user;
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users/login'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/user'
    return this.http.get(url).pipe(map(this.getUser))
  }
}
