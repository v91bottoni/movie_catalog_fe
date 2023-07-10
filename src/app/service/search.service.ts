import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


const search$ :Subject<string> = new Subject<string>();

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  oldSearch:string=" ";
  oldSearchPage :number = 1;
  constructor() { }

  nextParam(param:string){
    this.oldSearch = param;
    this.oldSearchPage = 1;
    search$.next(param);
  }

  getObservableSearch(){
    return search$;
  }
}
