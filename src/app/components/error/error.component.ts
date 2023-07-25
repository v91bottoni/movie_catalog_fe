import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, map } from 'rxjs';
import { ErrorMessages } from 'src/app/enums/errorMessages';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  errPage:boolean = false;
  errNoCont:boolean = false;
  errNoSearchRes:boolean = false;
  errDefault:boolean = false;

  radius: number = 40;
  color: string = "rgba(255,0,0,0.6)";
  message!:string;
  url = this.route.url;
constructor(private route:Router,private translate:TranslateService,private util: UtilityService){
this.getMessage();
}
getMessage(){
    this.url.includes("errorPage")? this.errPage = true:
      this.url.includes("noContent")? this.errNoCont = true:
        this.url.includes("searchError")? this.errNoSearchRes = true:
          this.errDefault =  true;
}
goBack(){
  this.route.navigate([this.util.backpage]);
}


}
