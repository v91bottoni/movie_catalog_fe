import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { EMPTY, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UtilityService } from '../service/utility.service';
import { AuthService } from '../service/auth.service';
import { userres } from '../models/userres';
import { MatDialog } from '@angular/material/dialog';
import { ExpiredialogComponent } from '../dialogs/expiredialog/expiredialog.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshON : boolean=false;

  constructor(private router: Router, private util:UtilityService, private authservice:AuthService,public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const s = req.url.toLowerCase();

    //console.log(req);

    if(s.includes("i18n")){
      return next.handle(req);
    }

    if(s.includes("auth")){
      return next.handle(req);
    }

    if(!sessionStorage.getItem('token')) return EMPTY;

    const jsonReq = this.autenticatedRequest(req, sessionStorage.getItem('token')+"");


    if(!this.refreshON){
      this.refreshON = true;
      setTimeout(()=>{
        this.refresh(sessionStorage.getItem('refreshToken'));
        this.refreshON = false;
      }, 10000);
    }
    return next.handle(jsonReq).pipe(

      tap({

        error: (error) => {
          this.router.navigateByUrl('errorPage');
          if(sessionStorage.getItem('refreshToken') && error.status === 401){
            let refreshTok = sessionStorage.getItem('refreshToken')+"";
            this.authservice.refreshTok(refreshTok).subscribe(res=>{
            if(res != null){
              if(res.msg){
              this.logout();
              }
              if(res.msg){
                this.logout();
              }
              if(res.token){
                this.dialog.closeAll();
                this.dialog.open(ExpiredialogComponent,{width:'50%'})
                .afterClosed().subscribe(result=>{
                  if(result){
                   // console.log("Refresh Avvenuto");
                    this.login(res);
                    this.router.navigateByUrl('/home');
                  }else{
                    this.logout();
                  }
                });
              }else{
                this.logout();
              }
            }else{
              this.logout();
            }

          });
        }

        }
      })
    )


  }

  autenticatedRequest(req: HttpRequest<any>, token:string) : HttpRequest<any>{
   return  req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })

  }

  refresh(token:string | null){
    if(token){
      this.authservice.refreshTok(token).subscribe(res=>{
        if(res != null){
          if(res.token){
            console.log("Refresh Avvenuto");
           this.login(res);
          }
        }

      });
    }
  }
  logout(){
    //console.log("log out");
    this.refreshON = false;
    sessionStorage.clear();
    this.util.role = null;
    this.util.username = null;
    this.router.navigateByUrl('/login');
  }
  login(res:userres){
   console.log("Refreshing Token, logging in");
   sessionStorage.setItem('role', res.user.role.role || '');
   sessionStorage.setItem('userID', res.user.id.toString() || '');
   sessionStorage.setItem('userName', res.user.name || '');
   sessionStorage.setItem('token', res.token || '');
   sessionStorage.setItem('refreshToken', res.refreshToken || '');
    this.util.role = res.user.role.role;
    this.util.username = res.user.name;
  }
}
