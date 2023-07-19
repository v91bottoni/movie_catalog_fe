import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  username:string|null;
  role:string|null|undefined;
  drawerOpen:boolean = false;
  backpage = "home";

  constructor(){
    if(sessionStorage.getItem("userName"))
      this.username = sessionStorage.getItem("userName");
    else this.username = null;
    if(sessionStorage.getItem("role"))
      this.role = sessionStorage.getItem("role");
    else this.role = null;
  }
}
