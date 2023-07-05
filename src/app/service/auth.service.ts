import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { loginUser, user } from '../models/user';
import { userres } from '../models/userres';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authApiUrl = environment.apiUrl + 'auth/';
  userApiUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  login(user: loginUser):Observable<userres>{
    return this.http.post<userres>(this.authApiUrl + 'login', user);
  }

  registerUser(user: user):Observable<user>{
    return this.http.post<user>(this.authApiUrl + 'register', user);
  }

  updateUser(user: user):Observable<user>{
    return this.http.put<user>(this.authApiUrl + 'update', user);
  }

  recoverPassword(email: string):Observable<string>{
    return this.http.post<string>(this.authApiUrl + 'recover-password', email);
  }

  recoverPasswordTok(token: string):Observable<userres>{
    return this.http.get<userres>(this.authApiUrl + 'recover-password/' + token);
  }

  changePassword(token: string, pwd: string):Observable<userres>{
    return this.http.post<userres>(this.authApiUrl + 'recover-password/' + token, pwd);
  }
}
