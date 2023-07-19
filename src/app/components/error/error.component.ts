import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ErrorMessages } from 'src/app/enums/errorMessages';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
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
  url.includes("errorPage")? this.message = ErrorMessages.errorMessage:
    url.includes("noContent")? this.message = ErrorMessages.noContentMessage:
      url.includes("searchError")? this.message = ErrorMessages.noSearchResultMessage : ErrorMessages.defaultMessage;


}
}
