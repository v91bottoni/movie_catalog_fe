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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private util:UtilityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const s = req.url.toLowerCase();

    console.log(req);
    
    if(s.includes("i18n")){
      return next.handle(req);
    }

    if(s.includes("auth")){
      return next.handle(req);
    }

    const jsonReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
    if(!sessionStorage.getItem('token')) return EMPTY;

    return next.handle(jsonReq).pipe(
      tap({
        error: (error) => {
          if(sessionStorage.getItem('token')){
            // console.log(error.error);
            sessionStorage.removeItem('token');

            sessionStorage.clear();
            this.util.role = null;
            this.util.username = null;
            this.router.navigateByUrl('/login')
            setTimeout(() => console.log("Sessione scaduta"), 100);
          }
        }
      })
    )
  }
}
