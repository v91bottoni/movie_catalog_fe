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

  constructor(private router: Router, private util:UtilityService, private authservice:AuthService,public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const s = req.url.toLowerCase();

    if(s.includes("auth")){
      return next.handle(req);
    }

    if(!localStorage.getItem('token')) return EMPTY;

    const jsonReq = this.autenticatedRequest(req, localStorage.getItem('token')+"");



    //this.refresh(localStorage.getItem('token'));
    return next.handle(jsonReq).pipe(

      tap({

        error: (error) => {
          this.router.navigateByUrl('errorPage');
          console.log("Token Scaduto - Refresh");
          if(localStorage.getItem('refreshToken')){
            let refreshTok = localStorage.getItem('refreshToken')+"";
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
                this.dialog.open(ExpiredialogComponent,{width:'30%'})
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
    localStorage.clear();
    this.util.role = null;
    this.util.username = null;
    this.router.navigateByUrl('/login');
  }
  login(res:userres){
   // console.log("Refreshing Token, logging in");
    localStorage.setItem('role', res.user.role.role || '');
    localStorage.setItem('userID', res.user.id.toString() || '');
    localStorage.setItem('userName', res.user.name || '');
    localStorage.setItem('token', res.token || '');
    localStorage.setItem('refreshToken', res.refreshToken || '');
    this.util.role = res.user.role.role;
    this.util.username = res.user.name;
  }
}





/*if(localStorage.getItem('refreshToken')){
  let refreshTok = localStorage.getItem('refreshToken')+"";
  localStorage.removeItem('refreshToken');
  this.authservice.refreshTok(refreshTok).subscribe(res=>{
          //console.log(res);
        if(res != null){
          if(res.token){
            console.log("Refresh Avvenuto");
            localStorage.setItem('role', res.user.role.role || '');
            localStorage.setItem('userID', res.user.id.toString() || '');
            localStorage.setItem('userName', res.user.name || '');
            localStorage.setItem('token', res.token || '');
            localStorage.setItem('refreshToken', res.refreshToken || '');
            this.util.role = res.user.role.role;
            this.util.username = res.user.name;


          }else{
            console.log("Refresh Fallito");
            localStorage.clear();
            this.util.role = null;
            this.util.username = null;
            this.router.navigateByUrl('/login')
            setTimeout(() => console.log("Sessione scaduta"), 100);
        }
      }

  });
}*/
