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
    if(localStorage.getItem("userName"))
      this.username = localStorage.getItem("userName");
    else this.username = null;
    if(localStorage.getItem("role"))
      this.role = localStorage.getItem("role");
    else this.role = null;
  }
}
