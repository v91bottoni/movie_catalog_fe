import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../service/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public spinnerHandler: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const s = request.url.toLowerCase();

    if(s.includes("title") || s.includes("genre") || s.includes("all")){
      return next.handle(request);
    }

    this.spinnerHandler.handleRequest('plus');
    
    return next
      .handle(request)
      .pipe(
        finalize(this.finalize.bind(this))
      );
  }

  finalize = (): void => this.spinnerHandler.handleRequest();
}
