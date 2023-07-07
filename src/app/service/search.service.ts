import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


const search$ :Subject<string> = new Subject<string>();

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  oldSearch:string=" ";
  constructor() { }
  nextParam(param:string){
    this.oldSearch = param;
    search$.next(param);
  }

  getObservableSearch(){
    return search$;
  }
}
