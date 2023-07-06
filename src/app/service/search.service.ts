import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


const search$ :Subject<string> = new Subject<string>();

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() { }
  nextParam(param:string){
    search$.next(param);
  }

  getObservableSearch(){
    return search$;
  }
}
