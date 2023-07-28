import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from '../models/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Click_event } from '../models/click_event';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  username:string|null;
  role:string|null|undefined;
  backpage = "home";
  apiUrlclickEvent = environment.apiUrl+"clickevent/";


  constructor( private http: HttpClient){
    if(sessionStorage.getItem("userName"))
      this.username = sessionStorage.getItem("userName");
    else this.username = null;
    if(sessionStorage.getItem("role"))
      this.role = sessionStorage.getItem("role");
    else this.role = null;
  }

  saveEvent(clickevent:Click_event):Observable<Click_event>{
    return this.http.post<Click_event>(this.apiUrlclickEvent+"save/", clickevent);
  }
  getEventNumberByType(type:string):Observable<number>{
    return this.http.get<number>(this.apiUrlclickEvent+"number/"+type);
  }


}
