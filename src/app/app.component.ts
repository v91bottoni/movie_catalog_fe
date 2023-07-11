import { Component } from '@angular/core';
import { UtilityService } from './service/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-catalog-fe';
  constructor(protected util :UtilityService){}

  toggle(drawer:HTMLElement){
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
    }else{
      drawer.classList.add('hide');
    }

  }
}
