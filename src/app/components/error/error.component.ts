import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { errorMessages } from 'src/app/enums/errorMessages';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number = 30;
  color: string = "rgba(255,0,0,0.6)";
  message!:string;
constructor(private route:Router){
  let url = this.route.url;
  url.includes("errorPage")? this.message = errorMessages.errorMessage:
    url.includes("noContent")? this.message = errorMessages.noContentMessage:
      url.includes("searchError")? this.message = errorMessages.noSearchResultMessage : errorMessages.defaultMessage;


}
}
