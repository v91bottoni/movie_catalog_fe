import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(){
    if(localStorage.getItem("userName"))
    this.username = localStorage.getItem("userName");
  }

  username:string|null = null;
  backpage = "home";

}
