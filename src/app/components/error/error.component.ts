import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, map } from 'rxjs';
import { ErrorMessages } from 'src/app/enums/errorMessages';
import { SnackbarService } from 'src/app/service/snackbar.service';

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
  url = this.route.url;
constructor(private route:Router,private translate:TranslateService,private alert: SnackbarService,){
this.getMessage();
}
getMessage(){
  setTimeout(()=>{
    this.url.includes("errorPage")? this.message = this.translate.instant("errormessage.errorpage"):
    this.url.includes("noContent")? this.message = this.translate.instant("errormessage.nocontent"):
    this.url.includes("searchError")? this.message = this.translate.instant("errormessage.nosearchres") : this.message =  this.translate.instant("errormessage.default");
  },0);
}


}
