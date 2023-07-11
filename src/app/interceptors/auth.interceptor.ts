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

    if(s.includes("auth")){
      return next.handle(req);
    }

    const jsonReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    if(!localStorage.getItem('token')) return EMPTY;

    return next.handle(jsonReq).pipe(
      tap({
        error: (error) => {
          if(localStorage.getItem('token')){
            // console.log(error.error);
            localStorage.removeItem('token');

            localStorage.clear();
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
