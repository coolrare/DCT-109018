import { UserLoginInfo } from './interfaces/login-info';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from './interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(userLogin: UserLoginInfo): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(`${environment.apiUrl}/api/users/login`, {user: userLogin});
  }
}
