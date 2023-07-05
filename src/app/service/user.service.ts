import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { userList } from '../models/userList';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  getUserById(id: number):Observable<user>{
    return this.http.get<user>(this.userApiUrl + 'details/' + id);
  }

  getAllUsers(page: number = 1):Observable<userList>{
    return this.http.get<userList>(this.userApiUrl + page);
  }

  disableUser(user: user):Observable<user>{
    return this.http.patch<user>(this.userApiUrl + 'disable', user);
  }
}
